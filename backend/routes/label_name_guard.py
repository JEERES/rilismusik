"""Label names must stay unique: royalty CSV imports match rows to labels by
name, so a label that takes another label's name (or a former name kept as an
alias) would be credited that label's royalty."""
import re
from typing import Optional

from fastapi import HTTPException

from royalty_utils import label_name_key
from .deps import db


def _name_pattern(key: str) -> dict:
    words = "\\s+".join(re.escape(word) for word in key.split(" "))
    return {"$regex": f"^\\s*{words}\\s*$", "$options": "i"}


async def assert_label_name_available(name: Optional[str], *, exclude_label_id: Optional[str] = None) -> None:
    key = label_name_key(name)
    if not key:
        return
    pattern = _name_pattern(key)
    query: dict = {"$or": [{"label_name": pattern}, {"label_name_aliases.name": pattern}]}
    if exclude_label_id:
        query["id"] = {"$ne": exclude_label_id}
    if await db.labels.find_one(query, {"_id": 0, "id": 1}):
        raise HTTPException(
            status_code=409,
            detail="Nama label sudah dipakai label lain. Gunakan nama lain atau hubungi admin.",
        )
