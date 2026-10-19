"""Release A security regressions: no seeded passwords, reset disabled, legacy imports idempotent."""
import io
import os
import unittest
from pathlib import Path
from unittest.mock import AsyncMock, patch

import test_vercel_preview  # Configures offline environment before real router imports.
from fastapi import HTTPException, UploadFile
from fastapi.testclient import TestClient
from mongomock_motor import AsyncMongoMockClient

from auth_utils import hash_password, verify_password
import server
import storage_service
from routes import deps, file_access, migrate, royalty, seed

SUPER = {"id": "super", "role": "super_admin", "is_admin": True, "admin_role_active": True, "permissions": [], "name": "Super"}
STAFF_EMAILS = {"support1@rilismusik.com", "finance1@rilismusik.com", "release1@rilismusik.com",
                "marketing1@rilismusik.com", "content1@rilismusik.com"}
SEED_ENV = ("ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_PASSWORD_RESET", "SEED_STAFF_FIXTURES", "SEED_STAFF_PASSWORD")


def csv_upload(text: str) -> UploadFile:
    return UploadFile(file=io.BytesIO(text.encode("utf-8")), filename="withdraws.csv")


class SeedPasswordTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.db = AsyncMongoMockClient().test
        self.patches = [patch.object(seed, "db", self.db), patch.object(seed, "db_bg", self.db),
                        patch.dict(os.environ, {}, clear=False)]
        for item in self.patches:
            item.start()
        self.addCleanup(lambda: [item.stop() for item in reversed(self.patches)])
        for key in SEED_ENV:
            os.environ.pop(key, None)

    def test_seed_source_has_no_passwords(self):
        source = Path(seed.__file__).read_text(encoding="utf-8")
        for secret in ("SuperAdmin#2026", "Support#2026", "Finance#2026", "Release#2026", "Marketing#2026", "Content#2026"):
            self.assertNotIn(secret, source)

    async def test_without_env_nothing_is_seeded(self):
        await seed.seed_indexes_and_admins()
        self.assertEqual(await self.db.users.count_documents({}), 0)

    async def test_super_admin_created_from_env_and_kept_after_rotation(self):
        os.environ["ADMIN_PASSWORD"] = "Env#Secret-1"
        await seed.seed_indexes_and_admins()
        admin = await self.db.users.find_one({"email": "superadmin@rilismusik.com"})
        self.assertTrue(verify_password("Env#Secret-1", admin["password_hash"]))
        # A password rotated in the app survives the next cold start.
        await self.db.users.update_one({"id": admin["id"]}, {"$set": {"password_hash": hash_password("Rotated#2")}})
        await seed.seed_indexes_and_admins()
        admin = await self.db.users.find_one({"email": "superadmin@rilismusik.com"})
        self.assertTrue(verify_password("Rotated#2", admin["password_hash"]))

    async def test_explicit_reset_restores_env_password(self):
        os.environ["ADMIN_PASSWORD"] = "Env#Secret-1"
        await self.db.users.insert_one({"id": "sa", "email": "superadmin@rilismusik.com", "role": "super_admin",
                                        "password_hash": hash_password("Lost#password")})
        os.environ["ADMIN_PASSWORD_RESET"] = "1"
        await seed.seed_indexes_and_admins()
        admin = await self.db.users.find_one({"id": "sa"})
        self.assertTrue(verify_password("Env#Secret-1", admin["password_hash"]))

    async def test_staff_are_never_seeded_or_reset_by_default(self):
        await self.db.users.insert_one({"id": "fin", "email": "finance1@rilismusik.com", "role": "admin_finance",
                                        "password_hash": hash_password("Own#password")})
        await seed.seed_indexes_and_admins()
        self.assertEqual(await self.db.users.count_documents({"email": {"$in": list(STAFF_EMAILS)}}), 1)
        staff = await self.db.users.find_one({"id": "fin"})
        self.assertTrue(verify_password("Own#password", staff["password_hash"]))

    async def test_staff_fixtures_need_explicit_opt_in_and_password(self):
        os.environ["SEED_STAFF_FIXTURES"] = "1"
        await seed.seed_indexes_and_admins()
        self.assertEqual(await self.db.users.count_documents({}), 0)
        os.environ["SEED_STAFF_PASSWORD"] = "Fixture#Pass"
        await seed.seed_indexes_and_admins()
        emails = {u["email"] async for u in self.db.users.find({}, {"email": 1})}
        self.assertEqual(emails, STAFF_EMAILS)


class ResetDemoDataTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.db = AsyncMongoMockClient().test
        self.patches = [patch.object(royalty, "db", self.db), patch.object(royalty, "db_bg", self.db),
                        patch.object(royalty, "run_background", new_callable=AsyncMock),
                        patch.dict(os.environ, {}, clear=False)]
        for item in self.patches:
            item.start()
        self.addCleanup(lambda: [item.stop() for item in reversed(self.patches)])
        os.environ.pop("ROYALTY_RESET_ENABLED", None)

    async def test_reset_is_disabled_by_default(self):
        with self.assertRaises(HTTPException) as ctx:
            await royalty.admin_reset_demo_royalty_data(confirm="RESET", user=SUPER)
        self.assertEqual(ctx.exception.status_code, 403)
        self.assertEqual(await self.db.migrate_jobs.count_documents({}), 0)
        royalty.run_background.assert_not_awaited()

    async def test_reset_only_runs_when_server_opts_in(self):
        os.environ["ROYALTY_RESET_ENABLED"] = "1"
        with self.assertRaises(HTTPException) as ctx:
            await royalty.admin_reset_demo_royalty_data(confirm="reset", user=SUPER)
        self.assertEqual(ctx.exception.status_code, 400)
        result = await royalty.admin_reset_demo_royalty_data(confirm="RESET", user=SUPER)
        self.assertEqual(result["status"], "queued")


class LegacyWithdrawImportTests(unittest.IsolatedAsyncioTestCase):
    CSV = (
        "label_name,amount_idr,request_date,payment_date,status,bank_ref,notes\n"
        "Senja Records,1500000,2024-01-05,2024-01-10,paid,TRX-1,\n"
        "Senja Records,2000000,2024-02-05,2024-02-10,paid,,\n"
        "Senja Records,2000000,2024-02-05,2024-02-10,paid,,\n"
    )

    async def asyncSetUp(self):
        self.db = AsyncMongoMockClient().test
        self.patches = [patch.object(migrate, "db", self.db), patch.object(migrate, "db_bg", self.db),
                        patch.object(migrate, "log_activity", new_callable=AsyncMock),
                        patch.object(migrate, "run_background", new_callable=AsyncMock)]
        for item in self.patches:
            item.start()
        self.addCleanup(lambda: [item.stop() for item in reversed(self.patches)])
        await self.db.labels.insert_one({"id": "senja", "label_name": "Senja Records"})
        await self.db.withdraw_requests.create_index("legacy_bulk_key", unique=True, sparse=True)

    async def test_same_csv_twice_books_each_payout_once(self):
        first = await migrate.bulk_import_withdraws(file=csv_upload(self.CSV), dry_run=False, user=SUPER)
        self.assertEqual((first["inserted"], first["duplicates"]), (2, 1))
        self.assertEqual(first["report"][2]["status"], "SKIP")
        second = await migrate.bulk_import_withdraws(file=csv_upload(self.CSV), dry_run=False, user=SUPER)
        self.assertEqual((second["inserted"], second["duplicates"]), (0, 3))
        self.assertEqual(await self.db.withdraw_requests.count_documents({}), 2)
        self.assertEqual(await self.db.balance_transactions.count_documents({}), 2)

    async def test_dry_run_reports_duplicates_without_writing(self):
        await migrate.bulk_import_withdraws(file=csv_upload(self.CSV), dry_run=False, user=SUPER)
        preview = await migrate.bulk_import_withdraws(file=csv_upload(self.CSV), dry_run=True, user=SUPER)
        self.assertEqual(preview["inserted"], 0)
        self.assertEqual({row["reason"] for row in preview["report"]} & {"Sudah pernah diimpor"}, {"Sudah pernah diimpor"})
        self.assertEqual(await self.db.withdraw_requests.count_documents({}), 2)

    async def test_period_import_refuses_parallel_commit(self):
        csv = "nama_label,period_end\nSenja Records,2024-03\n"
        await self.db.migrate_jobs.insert_one({"id": "j1", "kind": "withdraws_legacy_period", "dry_run": False,
                                               "status": "processing", "submitted_at": migrate.now_iso()})
        with self.assertRaises(HTTPException) as ctx:
            await migrate.bulk_import_withdraws_legacy_period(file=csv_upload(csv), dry_run=False, user=SUPER)
        self.assertEqual(ctx.exception.status_code, 409)
        # A dry run (preview) is still allowed while a commit is running.
        queued = await migrate.bulk_import_withdraws_legacy_period(file=csv_upload(csv), dry_run=True, create_history_docs=True,
                                                                     flip_royalty_lines=True, adjust_balances=True, user=SUPER)
        self.assertEqual(queued["status"], "queued")


LABEL_USER = {"id": "u-label", "role": "label", "email": "label@test.dev"}
OTHER_USER = {"id": "u-other", "role": "label", "email": "other@test.dev"}


class CsrfOriginTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bootstrap = patch.object(server, "_bootstrap_async", new_callable=AsyncMock)
        cls.bootstrap.start()
        cls.client = TestClient(server.app)

    @classmethod
    def tearDownClass(cls):
        cls.bootstrap.stop()

    def post(self, origin=None):
        headers = {"Origin": origin} if origin else {}
        return self.client.post("/api/auth/login", json={}, headers=headers)

    def test_untrusted_origin_mutation_rejected(self):
        response = self.post("https://evil.example")
        self.assertEqual(response.status_code, 403)
        self.assertIn("Origin", response.json()["detail"])

    def test_trusted_and_same_host_origins_pass(self):
        for origin in ("https://preview.example.invalid", "https://rilismusik.com", "http://testserver"):
            self.assertNotEqual(self.post(origin).status_code, 403, origin)

    def test_requests_without_origin_and_reads_are_unaffected(self):
        self.assertNotEqual(self.post().status_code, 403)
        self.assertNotEqual(self.client.get("/api/", headers={"Origin": "https://evil.example"}).status_code, 403)


class FileAccessTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.db = AsyncMongoMockClient().test
        self.user = None
        async def current_user(request):
            if self.user is None:
                raise HTTPException(status_code=401, detail="Not authenticated")
            return self.user
        self.patches = [patch.object(deps, "db", self.db), patch.object(file_access, "db", self.db),
                        patch.object(deps, "get_current_user", current_user),
                        patch.object(storage_service, "is_configured", lambda: True),
                        patch.object(storage_service, "head_object", AsyncMock(return_value={"size": 1})),
                        patch.object(storage_service, "generate_presigned_url", AsyncMock(return_value="https://r2.example/signed"))]
        for item in self.patches:
            item.start()
        self.addCleanup(lambda: [item.stop() for item in reversed(self.patches)])
        await self.db.labels.insert_many([{"id": "lab-1", "user_id": "u-label", "created_at": "1"},
                                          {"id": "lab-2", "user_id": "u-other", "created_at": "1"}])
        await self.db.contracts.insert_one({"id": "c1", "label_id": "lab-1", "file_url": "/api/files/contract/c1.pdf"})
        await self.db.releases.insert_one({"id": "r1", "label_id": "lab-1"})
        await self.db.tracks.insert_one({"id": "t1", "release_id": "r1"})

    async def fetch(self, path):
        return await server.serve_file(request=None, path=path)

    async def test_private_file_needs_login(self):
        with self.assertRaises(HTTPException) as ctx:
            await self.fetch("contract/c1.pdf")
        self.assertEqual(ctx.exception.status_code, 401)

    async def test_owner_gets_file_other_label_does_not(self):
        self.user = LABEL_USER
        self.assertEqual((await self.fetch("contract/c1.pdf")).status_code, 302)
        self.assertEqual((await self.fetch("audio/t1.wav")).status_code, 302)
        self.user = OTHER_USER
        for path in ("contract/c1.pdf", "audio/t1.wav", "csv/import.csv"):
            with self.assertRaises(HTTPException) as ctx:
                await self.fetch(path)
            self.assertEqual(ctx.exception.status_code, 404, path)

    async def test_admin_allowed_and_public_prefix_open(self):
        self.user = SUPER
        self.assertEqual((await self.fetch("csv/import.csv")).status_code, 302)
        self.user = None
        self.assertEqual((await self.fetch("cover/r1.jpg")).status_code, 302)

    async def test_path_tricks_do_not_skip_the_check(self):
        self.user = OTHER_USER
        with self.assertRaises(HTTPException):
            await self.fetch("cover/../contract/c1.pdf")


if __name__ == "__main__":
    unittest.main()
