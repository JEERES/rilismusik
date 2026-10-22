/* v1.1.0-dev.37 — Standar & Penanda dirancang ulang (rancangan disetujui 21 Okt 2026, mock std1).
   Tab Kamus (status semua menu, jumlah dari data asli) · Aturan waktu (Prosedur & Pengingat pindah ke sini: tenggat tahap,
   tindak lanjut, kalender; terbit sebagai versi baru lewat System115 dengan dampak nyata ke pekerjaan berjalan) · Syarat
   lencana (data.v9.standards, pratinjau siapa mendapat/kehilangan centang) · Standar layanan · Riwayat (versi sungguhan).
   Super Admin mengubah; staf membaca. Label tetap memakai halaman lama sampai ditinjau di Mode Label. */
(function(){
const STYLE=`.flow.f6{grid-template-columns:repeat(6,minmax(0,1fr))}
.cv{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;color:#fff;flex:none;background:linear-gradient(135deg,hsl(var(--h) 46% 64%),hsl(calc(var(--h) + 40) 40% 38%))}
#main .cv svg,.cv svg{width:16px;height:16px;opacity:.85}
.cv.big{width:88px;height:88px;border-radius:18px;box-shadow:0 14px 28px -14px #0007}
.cv.big svg{width:28px!important;height:28px!important}
.relhd{display:grid;grid-template-columns:88px minmax(0,1fr);gap:18px;align-items:center}
.relhd .k{margin-bottom:4px}.relhd h2{margin-bottom:6px!important}
.noart{color:var(--faint);font-weight:400}
.duet{font-size:12.5px;color:var(--muted);white-space:nowrap}
.lnk{color:inherit;text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--text) 25%,transparent);text-underline-offset:3px;font-size:inherit;padding:0;display:inline-flex;align-items:center;gap:6px}
.lnk svg{width:13px;height:13px}
.empty .lnk{margin-top:8px;color:var(--text)}
.mini.lbl{background:color-mix(in srgb,var(--blue) 18%,var(--card));color:var(--blue)}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 6px}
.pills button{font-size:13px;padding:7px 14px;border-radius:99px;background:var(--soft);color:var(--muted);display:flex;gap:7px;align-items:center}
.pills button b{font-weight:400;color:var(--faint)}
.pills button[aria-pressed=true]{background:var(--ink);color:var(--onink)}.pills button[aria-pressed=true] b{color:inherit;opacity:.65}
.more{width:100%;margin-top:10px;padding:12px;border-radius:14px;background:var(--soft);font-size:13.5px;color:var(--text)}
.more:hover{background:color-mix(in srgb,var(--text) 8%,transparent)}
.nextc{display:grid;gap:12px;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--blue) 7%,var(--card));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--blue) 16%,transparent)}
.nextc.ok{background:color-mix(in srgb,var(--green) 7%,var(--card));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--green) 16%,transparent)}
.nextc.mute{background:var(--soft);box-shadow:none}
.nextc p{margin:0;font-size:14.5px;line-height:1.55}.nextc p b{font-weight:500}
.nextc .where{font-size:12.5px}
.nextc .hrow{margin-top:0}
.btn[disabled]{opacity:.4;cursor:not-allowed}
.btn.dng{color:var(--red)}.btn.pri.dng{background:var(--red);color:#fff}
.btn.ghost{background:transparent;box-shadow:none;padding-left:8px;padding-right:8px}
.btn.ghost.dng{margin-left:auto}
button.ck{width:100%;text-align:left;cursor:pointer;background:var(--white);transition:background .15s}
button.ck span{display:grid;gap:2px}
.ck .sub{margin-left:0!important;text-align:left!important}
.ck.todo b{background:transparent;box-shadow:inset 0 0 0 1.5px var(--faint)}
button.ck:hover{background:color-mix(in srgb,var(--text) 4%,var(--white))}
button.ck:not(.todo) b{animation:tick .3s cubic-bezier(.2,.8,.2,1)}
@keyframes tick{from{transform:scale(.4)}}
.sub2{display:grid;gap:10px;padding-top:4px}
.sub2 h5{margin:0;font-size:12.5px;font-weight:400;color:var(--muted)}
.codes{display:flex;align-items:center;gap:22px;flex-wrap:wrap;padding:10px 14px;border-radius:14px;background:var(--white)}
.codes span{display:grid;gap:2px}.codes small{font-size:11.5px;color:var(--muted)}.codes b{font-size:13px;color:var(--text)}
.codes .lnk{margin-left:auto;font-size:13px}
.opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}
.opts button{padding:12px 14px;border-radius:14px;background:var(--white);box-shadow:inset 0 0 0 1px var(--line);text-align:left;font-size:14px;display:grid;gap:3px;transition:box-shadow .15s}
.opts button small{color:var(--muted);font-size:12px}
.opts button[aria-pressed=true]{box-shadow:inset 0 0 0 2px var(--text)}
.fld{display:grid;gap:6px;font-size:12.5px;color:var(--muted)}
.fld input,.fld textarea{font:inherit;font-size:14px;color:var(--text);background:var(--white);border:0;box-shadow:inset 0 0 0 1px var(--line);border-radius:12px;padding:10px 12px;outline:0;width:100%;box-sizing:border-box}
.fld textarea{min-height:76px;resize:vertical;line-height:1.5}
.fld input:focus,.fld textarea:focus{box-shadow:inset 0 0 0 2px var(--blue)}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.reveal{display:grid;gap:10px;animation:rise .35s cubic-bezier(.2,.8,.2,1) both}
.quote{padding:10px 14px;border-left:3px solid var(--orange);background:var(--white);border-radius:0 12px 12px 0;font-size:14px!important}
.whoc{display:grid;gap:10px}
.who{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:14px}
.who .mini{box-shadow:none;width:34px;height:34px;font-size:11px}
.who small{display:block;color:var(--muted);font-size:12px}
.dueline{margin-left:auto;font-size:13px;color:var(--muted)}.dueline b{font-weight:400;color:var(--text)}
.whoc .where{line-height:1.6}
.it.flash{animation:flash 1.2s ease}
@keyframes flash{0%,40%{background:color-mix(in srgb,var(--green) 16%,transparent)}}
.tr{grid-template-columns:28px minmax(0,1fr) auto}
.tr .mono{font-size:11.5px}
@media (max-width:820px){.flow.f6{grid-template-columns:repeat(6,minmax(96px,1fr))}.relhd{grid-template-columns:64px minmax(0,1fr);gap:14px}.cv.big{width:64px;height:64px;border-radius:14px}.f2{grid-template-columns:1fr}.dueline{margin-left:0;width:100%}.it .rgt .duet{display:none}}
.flow.f4{grid-template-columns:repeat(4,minmax(0,1fr))}
.btn.sm{font-size:13px;padding:8px 14px}
.amt{font-size:14.5px;white-space:nowrap}
.rank{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--soft);color:var(--muted);font-size:13px}
.it .rgt .duet{min-width:44px;text-align:right}
.relhd .lav.big{width:88px;height:88px;border-radius:22px;font-size:26px}
.big{font-size:32px;font-weight:300;letter-spacing:-.6px;line-height:1.1;margin-bottom:6px}
.up{color:var(--green)}.down{color:var(--red)}
.warnx{color:var(--orange)!important}
.f3{display:grid;grid-template-columns:1fr 1fr;gap:10px}.f3>:first-child{grid-column:1/-1}
.bars{display:grid;gap:4px}
.br{display:grid;grid-template-columns:minmax(0,1fr) auto 52px;grid-template-areas:"n v p" "b b b";gap:6px 12px;align-items:center;padding:9px 12px;border-radius:12px;font-size:13.5px;text-align:left;width:100%}
button.br:hover{background:var(--soft)}
.br .bn{grid-area:n;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.br b{grid-area:v;font-weight:400}.br small{grid-area:p;text-align:right;color:var(--muted);font-size:12px}
.br .bt{grid-area:b;height:5px;border-radius:99px;background:var(--line);overflow:hidden;display:block}
.br .bt i{display:block;height:100%;border-radius:99px;background:var(--blue);transform-origin:left;animation:grow .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes grow{from{transform:scaleX(0)}}
.cols{display:grid;grid-template-columns:repeat(var(--c,3),minmax(0,1fr));gap:12px;height:170px;align-items:end;grid-template-columns:repeat(3,1fr)}
.col{height:100%;display:grid;grid-template-rows:1fr auto auto;justify-items:center;gap:4px;padding:6px;border-radius:14px;font-size:12px}
.col i{align-self:end;width:min(64px,70%);border-radius:10px 10px 4px 4px;background:color-mix(in srgb,var(--blue) 30%,transparent);animation:rise2 .7s cubic-bezier(.2,.8,.2,1) both;transform-origin:bottom}
.col.on i{background:var(--blue)}
.col small{color:var(--muted)}.col b{font-weight:400;font-size:12.5px}
.col:hover{background:var(--soft)}
@keyframes rise2{from{transform:scaleY(0)}}
.ledger{display:grid;gap:4px}
.lg{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px}
.lg span{display:grid;gap:2px;min-width:0}.lg small{color:var(--muted);font-size:12px}
.lg b{margin-left:auto;font-weight:400;white-space:nowrap}
.lg b.pos{color:var(--green)}.lg b.neg{color:var(--red)}
.opts.two{grid-template-columns:1fr 1fr}
.adj{padding-top:6px;border-top:1px solid var(--line)}
@media (max-width:820px){.flow.f4{grid-template-columns:repeat(4,minmax(96px,1fr))}.f3{grid-template-columns:1fr}.relhd .lav.big{width:64px;height:64px;font-size:20px}.it .rgt .duet{display:none}}
.narrow{display:none!important}
@media (max-width:1240px){.narrow{display:inline-flex!important}}
.focus .gbtn{display:inline-flex;align-items:center;gap:6px}.gbtn svg{width:15px;height:15px}
.cps{display:grid;gap:6px}
.cp{display:flex;align-items:center;gap:12px;padding:10px 10px 10px 14px;border-radius:14px;background:var(--white)}
.cp span{display:grid;gap:2px;min-width:0}.cp small{font-size:11.5px;color:var(--muted)}.cp b{font-weight:400;font-size:14.5px;overflow-wrap:anywhere}
.cpb{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:7px 12px;border-radius:99px;background:var(--soft);color:var(--text);flex:none;transition:background .2s}
.cpb svg{width:14px;height:14px}.cpb em{font-style:normal}
.cpb:hover{background:color-mix(in srgb,var(--text) 10%,transparent)}
.cpb.done{background:color-mix(in srgb,var(--green) 18%,transparent)}.cpb.done em::after{content:" ✓"}
.it .t1 .mono{font-size:11.5px;color:var(--faint)}
@media (max-width:820px){.cpb em{display:none}}
.wk.docmode{grid-template-columns:minmax(0,.85fr) minmax(0,1.35fr)}
.meter{height:6px;border-radius:99px;background:var(--line);margin:10px 0 6px;max-width:260px;overflow:hidden}
.meter i{display:block;height:100%;border-radius:99px;background:var(--green)}
.chg{display:grid;gap:8px}
.chg>div{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;line-height:1.45;padding:10px 12px;border-radius:12px;background:var(--soft)}
.chg .chip{margin-top:1px}
.toc{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.toc button{font-size:12px;padding:5px 10px;border-radius:99px;background:var(--soft);color:var(--muted)}
.toc button:hover{color:var(--text)}
.pb.docbody{gap:20px}
.pb.docbody .sec{scroll-margin-top:90px}
.ph4{font-size:15px!important;color:var(--text)!important;font-weight:500!important;margin-bottom:8px!important}
.pb.docbody p{margin:0 0 8px;font-size:14.5px;line-height:1.65;color:var(--text)}
.pb.docbody p b{font-weight:500}
.ayat{color:var(--muted);margin-right:6px;font-variant-numeric:tabular-nums}
.sig-block{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px;border-radius:16px;background:var(--soft);margin-top:6px}
.sig-block.one{grid-template-columns:1fr}
.sig-block>div{display:grid;gap:4px;font-size:13.5px}.sig-block small{color:var(--muted);font-size:12px}.sig-block b{font-weight:400}
.sigimg{display:flex;align-items:center;gap:10px;height:84px}
.pv.sig{font-family:"Brush Script MT","Segoe Script",cursive;font-size:28px;color:#1d3f8f;transform:rotate(-6deg);background:none}
:host([data-theme=dark]) .pv.sig{color:#8fb0ff}
.pv.stamp{width:74px;height:74px;border-radius:50%;border:3px double #3156c8;color:#3156c8;display:grid;place-items:center;font-size:9px;text-align:center;letter-spacing:.5px;opacity:.85;transform:rotate(-12deg);background:none}
.evid{font-size:12px;color:var(--muted);padding:8px 10px;border-radius:10px;border:1px dashed var(--line)}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tile{border-radius:14px;padding:12px;background:var(--soft);display:grid;gap:6px;font-size:13.5px}
.tile .pv{height:84px;border-radius:10px;background:var(--white)!important;display:grid;place-items:center}
.tile .pv.stamp{width:auto;border:0;transform:none}
.tile .pv.stamp span{width:70px;height:70px;border-radius:50%;border:3px double #3156c8;display:grid;place-items:center;transform:rotate(-12deg)}
.tile b{font-weight:400}.tile small{color:var(--muted);font-size:12px}.tile .sbtn{justify-self:start}
.uses{display:grid;gap:8px}
.uses>div{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px}
.uses svg{width:18px;height:18px;color:var(--muted);flex:none}.uses small{display:block;color:var(--muted);font-size:12px}
.btn svg{width:15px;height:15px}
@media (max-width:1240px){.wk.docmode{grid-template-columns:minmax(0,1fr)}}
@media (max-width:820px){.sig-block{grid-template-columns:1fr}.tiles{grid-template-columns:1fr}}
.para{margin:0;font-size:14.5px;line-height:1.6}
.lead{margin:0;font-size:16px;line-height:1.55}
.bigchip .chip{font-size:15px;padding:7px 14px}
.it .t1 .mono{font-size:12px;color:var(--faint)}
.cnt{min-width:30px;height:26px;padding:0 9px;border-radius:99px;display:grid;place-items:center;font-size:13px;background:var(--soft);font-variant-numeric:tabular-nums}
.val{font-size:14px;white-space:nowrap;font-variant-numeric:tabular-nums}
.cal{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:var(--soft);font-size:13.5px;margin:10px 0 4px;flex-wrap:wrap}
.cal svg{width:18px;height:18px;color:var(--muted);flex:none}.cal b{font-weight:400}.cal span{flex:1;min-width:180px}
.stepper{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;background:var(--soft);align-self:flex-start;width:max-content;max-width:100%}
.stepper button{width:40px;height:40px;border-radius:12px;background:var(--white);box-shadow:inset 0 0 0 1px var(--line);font-size:20px;line-height:1;color:var(--text)}
.stepper button:hover{box-shadow:inset 0 0 0 1px var(--muted)}
.stepper>b{font-size:30px;font-weight:300;min-width:44px;text-align:center;font-variant-numeric:tabular-nums}
.stepper>span{font-size:13.5px;color:var(--muted)}
.stepper.ro{padding:12px 16px}.stepper.ro b{font-size:15px;font-weight:400}
.stepper.sm{gap:8px;padding:5px;border-radius:12px;background:var(--white)}
.stepper.sm button{width:30px;height:30px;border-radius:9px;font-size:16px;background:var(--soft);box-shadow:none}
.stepper.sm>b{font-size:17px;min-width:28px;font-weight:400}.stepper.sm>span{font-size:12.5px}
.impact{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 14px;border-radius:14px;font-size:13.5px;line-height:1.5;animation:rise .4s cubic-bezier(.2,.8,.2,1) both}
.impact b{font-weight:500}
.impact.r{background:color-mix(in srgb,var(--red) 9%,transparent)}
.impact.g{background:color-mix(in srgb,var(--green) 9%,transparent)}
.flowline{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.flowline>i{font-style:normal;color:var(--faint)}
.flowline>span{opacity:.55;transition:opacity .2s}.flowline>span.on{opacity:1}
.flowline>span.on .chip{box-shadow:0 0 0 2px var(--text)}
.crit{display:grid;gap:8px}
.crit>div{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 8px 8px 14px;border-radius:14px;background:var(--soft);font-size:13.5px;flex-wrap:wrap}
.okc{font-weight:400;font-size:12.5px;color:var(--green);padding:6px 10px}
.rules{margin:0;padding-left:20px;display:grid;gap:8px;font-size:14px;line-height:1.55}
.rules li::marker{color:var(--faint)}
.it .meter{margin:8px 0 4px;max-width:200px}
.uses>div[data-rule]:hover{box-shadow:inset 0 0 0 1px var(--line)}
@media (max-width:600px){.stepper>b{font-size:24px}.cal span{min-width:0}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Standar &amp; Penanda</h1><div class="sub">Buku aturan operasional: arti setiap status, kapan sesuatu dianggap terlambat, dan syarat lencana.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
/* kamus & standar layanan (isi teks dari rancangan std1; jumlah dihitung dari data asli) */
const AREAS=[
 ['work','Pekerjaan','Pekerjaan',[
  ['Baru','work.new','c-bl','Pekerjaan diterima dan belum ditangani.','Pekerjaan masuk antrean tanpa penanggung jawab.','Saat seseorang mengambil pekerjaan.',3],
  ['Prioritas','work.priority','c-or','Perlu didahulukan sesuai tenggat dan kebutuhan penanganan.','Aturan waktu tahap ini jatuh tempo hari ini.','Saat tahap diselesaikan.',2],
  ['Lewat tenggat','work.overdue','c-red','Tenggat tahap saat ini sudah lewat.','Tenggat dari Aturan waktu terlewati.','Saat tahap diselesaikan.',6],
  ['Perlu tindak lanjut','work.followup','c-or','Waktu menunggu telah melewati pengingat; periksa jawaban pihak terkait.','Menunggu pihak lain melewati batas pengingat.','Saat ada jawaban atau tindak lanjut tercatat.',1]]],
 ['rel','Rilisan','Rilisan',[
  ['Menunggu pemeriksaan','release.submitted','c-bl','Label sudah mengajukan; belum ada yang memeriksa.','Label mengirim pengajuan.','Saat petugas menekan Mulai pemeriksaan.',4],
  ['Dalam pemeriksaan','release.review','c-bl','Petugas memeriksa sampul, audio, metadata, hak, dan tanggal.','Pemeriksaan dimulai; petugas menjadi penanggung jawab.','Saat disetujui, diminta perbaikan, atau ditolak.',1],
  ['Menunggu perbaikan label','release.revision','c-or','Ada yang harus diperbaiki label sebelum lanjut.','Petugas menekan Minta perbaikan.','Saat label mengirim perbaikan.',1],
  ['Perlu penjelasan','release.clarification','c-or','Label meminta penjelasan atas permintaan perbaikan.','Label menekan Minta penjelasan.','Saat petugas menjawab.',0],
  ['Siap dikirim','release.approved','c-bl','Disetujui; menunggu dikirim ke Believe.','Pemeriksaan disetujui.','Saat pengiriman dikonfirmasi.',1],
  ['Dalam distribusi','release.delivered','c-bl','Sudah dikirim ke Believe; menunggu tampil di toko.','Pengiriman dikonfirmasi.','Saat ditandai Tayang atau belum ditemukan.',4],
  ['Tindak lanjut Believe','release.followup','c-or','Belum ditemukan di toko atau tanggalnya salah; sedang ditindaklanjuti.','Pemeriksaan toko mencatat belum ditemukan atau tanggal salah.','Saat ditemukan dan ditandai Tayang.',1],
  ['Tayang','release.live','c-gr','Rilisan sudah ditemukan di toko.','Petugas menandai Tayang dengan tautan toko.','Saat diturunkan atau penandaan dikoreksi.',72],
  ['Diturunkan','release.taken_down','','Rilisan sudah diturunkan dari toko; arsip.','Takedown dikonfirmasi distributor.','Tidak hilang · arsip.',9],
  ['Ditutup','release.closed','','Pengajuan ditolak atau dibatalkan; kredit dikembalikan sesuai aturan.','Petugas menolak atau label membatalkan.','Saat label mengajukan ulang.',0],
  ['Permintaan batal','release.cancel_requested','c-or','Label meminta pembatalan; proses dihentikan dulu.','Label menekan Batalkan pengajuan.','Saat pembatalan dikonfirmasi petugas.',0]]],
 ['wd','Penarikan','Penarikan',[
  ['Menunggu pemeriksaan','wd.review','c-bl','Pengajuan tercatat dan nominal telah disisihkan.','Label mengajukan penarikan (tanggal 1–14).','Saat diperiksa.',2],
  ['Menunggu pembayaran','wd.approved','c-bl','Disetujui, belum memulai transfer.','Pengajuan disetujui.','Saat transfer dimulai.',1],
  ['Pembayaran diproses','wd.processing','c-bl','Transfer sedang ditangani. Hasil belum berarti berhasil.','Transfer dimulai.','Saat transfer dipastikan berhasil atau tertunda.',0],
  ['Ditunda','wd.held','c-or','Kendala tercatat; nominal tetap disisihkan.','Ada kendala transfer atau data.','Saat kendala selesai.',0],
  ['Dibayarkan','wd.paid','c-gr','Petugas telah memastikan transfer berhasil.','Transfer dipastikan berhasil.','Tetap.',31],
  ['Koreksi pembayaran','wd.correction','c-red','Pencatatan pembayaran diperiksa; transfer ulang ditahan.','Ada selisih atau kesalahan pencatatan.','Saat koreksi selesai.',0],
  ['Pencairan terlambat','wd.late','c-red','Mulai tanggal 21 WIB untuk pencairan periode terkait yang belum dibayar.','Tanggal 21 tiba dan pengajuan belum dibayar.','Saat dibayar.',3]]],
 ['acc','Akses label','Manajemen Label',[
  ['Normal','access.normal','c-gr','Tindakan tersedia sesuai paket dan kewenangan.','Bawaan.','—',22],
  ['Dibatasi','access.limited','c-or','Sebagian tindakan dibatasi oleh paket berakhir atau keputusan Rilis Musik.','Paket berakhir atau keputusan Super Admin.','Saat paket diperpanjang atau pembatasan dicabut.',2],
  ['Ditangguhkan','access.blocked','c-red','Pembatasan karena keputusan Rilis Musik; pencatatan royalti tetap berlangsung.','Keputusan Super Admin.','Saat penangguhan dicabut.',1]]],
 ['act','Aktivitas label','Manajemen Label',[
  ['Aktif','activity.active','c-gr','Ada kegiatan pekerjaan dalam 90 hari terakhir.','Ada rilisan atau pekerjaan dalam 90 hari.','Setelah 90 hari tanpa kegiatan.',22],
  ['Belum aktif','activity.new','c-bl','Belum ada kegiatan pekerjaan yang memenuhi syarat.','Akun baru.','Saat kegiatan pertama tercatat.',1],
  ['Lama tidak beraktivitas','activity.dormant','c-or','Lebih dari 90 hari sampai satu tahun tanpa kegiatan pekerjaan.','90 hari tanpa kegiatan.','Saat ada kegiatan baru.',1],
  ['Nonoperasional','activity.nonoperational','c-red','Lebih dari satu tahun tanpa kegiatan, atau berhenti beroperasi terkonfirmasi.','Satu tahun tanpa kegiatan.','Saat ada kegiatan baru.',1]]],
 ['roy','Royalti','Royalti',[
  ['Perlu diperiksa','roy.review','c-or','Pemetaan, periode atau duplikasi belum selesai.','Laporan Believe diunggah.','Saat pemeriksaan selesai.',0],
  ['Siap diterbitkan','roy.ready','c-bl','Pemeriksaan selesai; belum terlihat oleh label.','Pemeriksaan selesai.','Saat diterbitkan.',1],
  ['Diterbitkan','roy.published','c-gr','Laporan terlihat; belum tentu tersedia untuk penarikan.','Super Admin menerbitkan.','Tetap.',12],
  ['Menunggu pencocokan','roy.matching','c-bl','Penerimaan tercatat tanpa membuka saldo otomatis.','Dana dari Believe tercatat.','Saat dicocokkan.',0],
  ['Koreksi memerlukan penyelesaian','roy.correction','c-red','Ada dampak terhadap penarikan atau saldo yang perlu keputusan petugas.','Koreksi laporan berdampak ke saldo.','Saat diputuskan.',0]]],
 ['wami','WAMI','Registrasi WAMI',[
  ['Menunggu pembayaran','wami.unpaid','c-bl','Belum masuk antrean petugas.','Pesanan dibuat.','Saat dibayar.',0],
  ['Menunggu pemeriksaan','wami.queued','c-bl','Pembayaran/benefit terpenuhi; menunggu petugas.','Dibayar.','Saat diperiksa.',0],
  ['Sedang diperiksa','wami.review','c-bl','Data dan kelengkapan diperiksa.','Petugas mulai memeriksa.','Saat lengkap atau perlu perbaikan.',0],
  ['Persiapan pendaftaran','wami.prep','c-bl','Pendaftaran website dan pengiriman dokumen.','Data lengkap.','Saat dikirim ke WAMI.',0],
  ['Perlu perbaikan','wami.fix','c-or','Tindak lanjut label atau petugas, pengajuan tetap sama.','Data kurang.','Saat diperbaiki.',0],
  ['Menunggu WAMI','wami.waiting','c-bl','Dua langkah pengiriman selesai, menunggu respons.','Dikirim ke WAMI.','Saat WAMI merespons.',0],
  ['Selesai','wami.done','c-gr','Petugas mencatat hasil penerimaan WAMI.','Hasil tercatat.','Tetap.',0]]],
 ['addon','Layanan tambahan','Layanan Tambahan',[
  ['Menunggu pembayaran','addon.unpaid','c-bl','Pembayaran belum berhasil; belum masuk antrean.','Pesanan dibuat.','Saat dibayar.',0],
  ['Menunggu pemeriksaan','addon.queued','c-bl','Pembayaran atau benefit terpenuhi; menunggu pemeriksaan.','Dibayar.','Saat diperiksa.',0],
  ['Lengkapi bahan','addon.materials','c-or','Label perlu melengkapi kebutuhan pesanan.','Bahan kurang.','Saat bahan lengkap.',0],
  ['Sedang dikerjakan','addon.working','c-bl','Bahan lengkap, pengerjaan berlangsung.','Bahan lengkap.','Saat hasil dikirim.',0],
  ['Menunggu tanggapan','addon.feedback','c-bl','Hasil telah dikirim, menunggu tanggapan label.','Hasil dikirim.','Saat label menanggapi.',0],
  ['Permintaan revisi','addon.revision','c-or','Petugas menilai permintaan perbaikan.','Label meminta revisi.','Saat revisi diputuskan.',0],
  ['Dalam penyelesaian','addon.resolution','c-or','Penyelesaian ditinjau bersama label.','Ada kendala hasil atau waktu.','Saat disepakati.',0],
  ['Selesai','addon.done','c-gr','Label telah menerima hasil.','Hasil diterima.','Tetap.',0],
  ['Ditutup','addon.closed','c-gr','Penyelesaian pengembalian telah dicatat.','Pengembalian dicatat.','Tetap.',0]]],
 ['tkt','Tiket bantuan','Pesan',[
  ['Diajukan','ticket.new','c-bl','Permintaan masuk antrean petugas.','Label mengirim permintaan.','Saat diambil petugas.',0],
  ['Dalam penanganan','ticket.working','c-bl','Petugas sedang memeriksa permintaan.','Petugas mengambil.','Saat perlu tanggapan atau diteruskan.',1],
  ['Perlu tanggapan label','ticket.label','c-or','Ada kelengkapan tertentu yang perlu dikirim label.','Petugas meminta kelengkapan.','Saat label menjawab.',1],
  ['Menunggu distributor','ticket.distributor','c-bl','Penerusan tercatat; petugas menunggu dan memantau hasil.','Diteruskan ke Believe.','Saat hasil tercatat.',1],
  ['Selesai','ticket.done','c-gr','Seluruh bagian memiliki hasil terkonfirmasi.','Semua bagian terkonfirmasi.','Tetap.',0],
  ['Perlu peninjauan','ticket.escalated','c-red','Kasus membutuhkan koordinasi Super Admin; bukan status selesai.','Petugas mengeskalasi.','Saat Super Admin memutuskan.',0]]],
 ['trx','Transaksi','Transaksi',[
  ['Menunggu pembayaran','trx.pending','c-bl','Pembayaran masih dapat dilanjutkan; belum membutuhkan tindakan petugas.','Tagihan dibuat.','Saat dibayar atau kedaluwarsa.',2],
  ['Berhasil','trx.paid','c-gr','Pembayaran terkonfirmasi, bukan berarti layanan selesai.','Pembayaran diterima.','Tetap.',40],
  ['Kedaluwarsa','trx.expired','c-or','Periksa dahulu jika sudah membayar, sebelum membuat pembayaran baru.','Batas bayar lewat.','—',1],
  ['Perlu tindak lanjut','trx.followup','c-or','Pembelian belum terpenuhi atau ada pemeriksaan terbuka.','Pembayaran berhasil tapi layanan belum diberikan.','Saat terpenuhi.',0],
  ['Dana dikembalikan','trx.refunded','c-gr','Pelaksanaan pengembalian terkonfirmasi dan tercatat.','Pengembalian dicatat.','Tetap.',0]]]];
const SERVICES=[
 ['addon','Layanan tambahan',false,['Pesanan terikat pada satu rilisan atau satu lagu sesuai satuan layanan.','Harga, lingkup, jatah revisi, dan benefit disimpan saat memesan.','Pembayaran rupiah atau benefit paket; kredit rilisan tidak digunakan. Benefit berlaku sampai pesanan selesai meskipun paket berakhir.','Waktu pengerjaan dimulai setelah bahan lengkap, mengikuti jam kerja dan hari libur. Menunggu kelengkapan label menjeda estimasi; kendala internal tidak menjedanya.','Draft hanya untuk petugas. Kesalahan pengerjaan tidak memotong jatah revisi.','Perubahan waktu, hasil pengganti, atau pengembalian harus disepakati label. Tidak ada pembatalan atau biaya tambahan otomatis.'],'addon',['queue','materials','work']],
 ['tkt','Tiket bantuan',false,['Draft/revisi diperbaiki di Rilisan. Perubahan setelah pengiriman ditangani melalui tiket. Pengajuan tidak langsung mengganti katalog.','Pesan biasa dan catatan internal tidak mengubah status.','Tindak lanjut jatuh tempo mengikuti pengingat, bukan jaminan penyelesaian.','Tidak ada selesai massal atau penutupan otomatis karena label belum merespons.','Ketentuan Content ID, penurunan parsial, biaya/benefit, target respons dan eskalasi masih menunggu verifikasi staf.'],'tkt',['support','distributor']],
 ['trx','Transaksi',false,['Status pembayaran, pemberian pembelian, dan proses layanan ditampilkan terpisah.','Pengembalian uang tidak sama dengan pengembalian kredit.'],'trx',[]],
 ['wami','Registrasi WAMI',true,['Pengajuan masuk antrean setelah pembayaran atau benefit terpenuhi.','Perbaikan oleh label tidak membuat pengajuan baru.','Hasil pihak luar (WAMI) tidak dihitung sebagai waktu kerja staf.'],'wami',['queue','external','addon']]];
let root=null,lastSig='',K=[],RL=[],BG=[],HS=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CLOCK=sv('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),SEAL=sv('<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>'),BOOK=sv('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h7"/>'),HIST_I=sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const U=U137,fd=U.fd;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const pname=id=>people.find(p=>p.id===id)?.name||(id?'Super Admin':'Sistem');
const pini=id=>people.find(p=>p.id===id)?.initials||'SY';
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const SA=()=>{try{return typeof protected9==='function'?!!protected9():!!me().super&&!state.preview;}catch(err){return false;}};
const S={tab:'kamus',q:'',sel:{},read:false,val:{},bval:{},form:null};
const wide=()=>innerWidth>1240;
const NAV={work:'work',rel:'releases',wd:'withdraw',acc:'labels',act:'labels',roy:'royalty',wami:'addons',addon:'addons',tkt:'tickets',trx:'transactions'};
const MENU={work:'Pekerjaan',rel:'Rilisan',wd:'Penarikan',acc:'Manajemen Label',act:'Manajemen Label',roy:'Royalti',wami:'Layanan Tambahan',addon:'Layanan Tambahan',tkt:'Tiket Bantuan',trx:'Transaksi'};
const store=()=>{ten.std137??={verified:{},history:[]};return ten.std137;};
/* ---------- Kamus: jumlah status dari data asli ---------- */
function counts(){const n={},add=k=>{if(k)n[k]=(n[k]||0)+1;},today=U.today();
 for(const t of data.tasks||[]){if(t.stage==='done')continue;const due=String(t.due||'').slice(0,10);if(t.stage==='queued'&&!t.handler)add('work.new');if(t.overdue||due&&due<today)add('work.overdue');else if(due===today)add('work.priority');}
 const RS={submitted:'submitted',review:'review',under_review:'review',revision:'revision',need_revision:'revision',clarification:'clarification',approved:'approved',delivered:'delivered',followup:'followup',live:'live',taken_down:'taken_down',closed:'closed',rejected:'closed',cancelled:'closed',cancel_requested:'cancel_requested'};
 for(const r of ten.releases||[])add(RS[r.status]&&'release.'+RS[r.status]);
 try{const W=model108();const WS={requested:'review',ready:'approved',processing:'processing',delayed:'held',paid:'paid',correction:'correction'};for(const w of W.requests||[]){add(WS[w.status]&&'wd.'+WS[w.status]);if(w.status!=='paid'&&Withdraw108.overdue(w,ten.now))add('wd.late');}}catch(err){}
 for(const l of data.v9?.labels||[]){add('access.'+(l.restriction==='blocked'||l.suspended?'blocked':l.restriction==='limited'?'limited':'normal'));const d=l.last?Math.floor((Date.parse(today)-Date.parse(String(l.last).slice(0,10)))/864e5):null;add('activity.'+(d===null?'new':d<=90?'active':d<=365?'dormant':'nonoperational'));}
 try{const m=model107();for(const b of m.batches||[]){if(b.archived||b.fingerprint==='sample131-legacy'||/saldo-awal-migrasi/i.test(b.name||''))continue;const per=new Set(b.rows.filter(r=>r.member).map(r=>r.member)),posted=per.size&&[...per].every(x=>b.posted.includes(x)),un=b.rows.some(r=>!r.matched||!r.member),pend=(m.ledger||[]).some(l=>l.ref===b.id&&l.bucket==='pending');add('roy.'+(!posted?(un?'review':'ready'):pend?'matching':'published'));}}catch(err){}
 const WM={unpaid:'unpaid',queued:'queued',review:'review',preparing:'prep',correction:'fix',waiting:'waiting',done:'done'};for(const o of ten.wami11?.orders||[])add(WM[o.status]&&'wami.'+WM[o.status]);
 const AM={unpaid:'unpaid',queued:'queued',materials:'materials',working:'working',response:'feedback',revision:'revision',resolution:'resolution',done:'done',closed:'closed'};for(const o of ten.addons111?.orders||[])add(AM[o.status]&&'addon.'+AM[o.status]);
 try{const TM={submitted:'new',handling:'working',label:'label',distributor:'distributor',done:'done'};for(const t of Tickets112.init(ten).tickets){add(t.escalated&&t.status!=='done'?'ticket.escalated':TM[t.status]&&'ticket.'+TM[t.status]);}}catch(err){}
 try{const c=Transactions113.init(ten);for(const o of c.orders){const done=c.refunds.some(r=>r.order===o.id&&r.status==='done');add(done?'trx.refunded':Transactions113.issue(ten,o)?'trx.followup':o.payment==='paid'?'trx.paid':o.payment==='expired'?'trx.expired':'trx.pending');}}catch(err){}
 return n;}
/* ---------- Aturan waktu dari policy115 (Sistem › Prosedur & Pengingat) ---------- */
const USE={approval:'Persetujuan · Pekerjaan',withdraw:'Penarikan · Dashboard',release:'Rilisan · Pekerjaan',delivery:'Rilisan · Pekerjaan',live:'Rilisan',support:'Tiket Bantuan · Pekerjaan',believe:'Rilisan · Pekerjaan',label:'Pekerjaan',claim:'Manajemen Label · Pekerjaan',addon:'Layanan Tambahan',refund:'Transaksi · Pekerjaan'};
const MODE={nextday:['Pergantian tanggal','tanggal berganti'],monthly:['Periode bulanan','1–14 / 15–20'],working:['Hari kerja','hari kerja'],release:['Menjelang tanggal rilis','hari kerja sebelum tanggal rilis']};
function rules(){const p=policy115(),w=p.wami||{},v=store().verified,out=p.rules.map(r=>{const m=MODE[r.mode]||[r.mode,''];const ed=['working','release'].includes(r.mode);
  return {id:r.id,kind:'rule',t:r.name[0],desc:r.desc[0],type:m[0],use:USE[r.id]||'',grp:'Tenggat tahap',fields:ed?[['value',m[1],1,Math.max(10,r.end||20)]]:[],vals:{value:r.value},show:ed?`${r.value} ${m[1]}`:m[1],draft:false};});
 const F=(id,t,desc,kind,fields,use)=>{const vals=Object.fromEntries(fields.map(f=>[f[0],kind==='wami'?w[f[0]]:p[f[0]]]));return {id,kind,t,desc,type:fields.length>1?'Bertahap':fields[0][1].includes('jam')?'Jam':'Hari kerja',use,grp:'Tindak lanjut',fields,vals,show:fields.map(f=>vals[f[0]]).join(' / ')+' '+fields.at(-1)[1].replace(/ ·.*/,''),draft:!v[id]};};
 out.push(F('queue','Antrean layanan & WAMI','Pengingat petugas, lalu batas antrean sebelum tampil sebagai perlu tindak lanjut.','wami',[['queueWarn','jam kerja · pengingat',1,48],['queueDue','jam kerja · batas',1,96]],'Layanan Tambahan · WAMI'),
  F('work','Pengerjaan layanan & WAMI','Pengingat dan batas pengerjaan setelah bahan lengkap.','wami',[['workWarn','hari kerja · pengingat',1,30],['workDue','hari kerja · batas',1,60]],'Layanan Tambahan · WAMI'),
  F('materials','Menunggu bahan label','Pengingat label, pengingat kedua, lalu tindak lanjut petugas.','wami',[['labelWarn','jam · pengingat',1,72],['labelSecond','jam · pengingat kedua',1,168],['labelDue','jam · tindak lanjut',1,336]],'Layanan Tambahan · WAMI'),
  F('external','Menunggu WAMI','Hasil pihak luar tidak dihitung sebagai waktu kerja staf; periksa kembali setelah jangka ini.','wami',[['externalDays','hari kerja',1,30]],'Layanan Tambahan · WAMI'),
  F('distributor','Tindak lanjut distributor','Tiket yang diteruskan dipantau dan dicatat hasilnya per bagian.','top',[['ticketDays','hari kerja',1,20]],'Tiket Bantuan'),
  F('revision','Batas perbaikan rilisan','Waktu label mengirim perbaikan sebelum pengajuan ditutup otomatis.','top',[['revisionHours','jam',1,168]],'Rilisan'));
 return out;}
const DAYS=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
function calText(c){const d=[...(c.days||[])].sort();const run=d.length===5&&d.join()==='1,2,3,4,5'?'Senin–Jumat':d.map(x=>DAYS[x]).join(', ');return `${run} ${c.start}–${c.end} WIB${(c.holidays||[]).length?` · libur ${c.holidays.map(h=>fd(h)).join(', ')}`:''}`;}
/* ---------- Syarat lencana (data.v9.standards) ---------- */
const BADGES=[{id:'label',t:'Verifikasi Label',sub:'Centang biru di nama label',crit:[['labelMonths','Masa bergabung','bulan',12,60],['releases','Rilisan berhasil yang berbeda (12 bulan)','rilisan',1,200],['activeMonths','Bulan aktif merilis (dari 12 bulan)','bulan',1,12]],fixed:['Data dan kontak terkonfirmasi','Tanpa pembatasan pelanggaran; enam bulan tanpa penangguhan'],note:'Login, royalti yang masuk otomatis, pengunggahan ulang, dan jumlah pengikut tidak dihitung sebagai aktivitas. Pencapaian yang sudah didapat dipertahankan.'},
 {id:'master',t:'Verifikasi Master Multi-label',sub:'Centang untuk label induk',crit:[['masterMonths','Usia master','bulan',1,60],['managedMonths','Masa pengelolaan','bulan',1,60],['masterCount','Label anak terverifikasi minimal','label',1,50],['masterPercent','Label anak terverifikasi (persen)','%',1,100]],fixed:['Hubungan pengelolaan dan data seluruh label terkonfirmasi'],note:'Label baru memunculkan penanda pemeriksaan. Masa kelola tidak mengikuti usia label; menghapus hubungan tidak menghapus riwayat pelanggaran.'}];
const isMaster=l=>!!l.master;
function meets(b,std){const keep=data.v9.standards;if(std)data.v9.standards=std;try{return data.v9.labels.filter(l=>(b.id==='master')===isMaster(l)&&verification9(l).status==='verified').map(l=>l.name);}catch(err){return [];}finally{data.v9.standards=keep;}}
function badges(){return BADGES.map(b=>({...b,total:data.v9.labels.filter(l=>(b.id==='master')===isMaster(l)).length,ok:meets(b)}));}
/* ---------- Riwayat (versi sungguhan) ---------- */
function history(){const a=area115('procedures'),out=[],v9v=data.v9.versions||[];
 out.push({id:'p'+a.version,k:'Aturan waktu',v:`Versi ${a.version}`,t:a.note&&a.version>1?a.note:'Aturan waktu awal prototipe',at:iso(a.appliedAt||ten.now),by:a.actor||'',cur:true,chg:a.version>1?['Berlaku untuk pekerjaan baru; tenggat pekerjaan berjalan ikut dihitung ulang bila disetujui saat terbit.']:['11 tenggat tahap, aturan tindak lanjut, dan kalender operasional.']});
 for(const h of a.history||[])out.push({id:h.id,k:'Aturan waktu',v:`Versi ${h.version}`,t:h.note||'Versi sebelumnya',at:iso(h.at),by:h.actor||'',chg:['Digantikan oleh versi berikutnya.']});
 const s=data.v9.standards;out.push({id:'s'+s.version,k:'Syarat lencana',v:`Versi ${s.version}`,t:s.version>1?'Syarat lencana diperbarui':'Syarat lencana awal prototipe',at:iso(s.at137||v9v.at(-1)?.at137||''),by:s.by137||'',cur:true,chg:[`Label: ${s.labelMonths} bulan bergabung, ${s.releases} rilisan, ${s.activeMonths} bulan aktif.`,`Master: ${s.masterMonths} bulan, kelola ${s.managedMonths} bulan, minimal ${s.masterCount} label, ${s.masterPercent}%.`]});
 for(const v of v9v.slice().reverse())out.push({id:'s'+v.version+'old',k:'Syarat lencana',v:`Versi ${v.version}`,t:'Versi sebelumnya',at:iso(v.at137||''),by:v.by137||'',chg:[`Label: ${v.standards.labelMonths} bulan, ${v.standards.releases} rilisan, ${v.standards.activeMonths} bulan aktif.`]});
 for(const h of store().history)out.push({id:'v'+h.at+h.id,k:'Aturan waktu',v:'Diverifikasi',t:h.text,at:iso(h.at),by:h.by,chg:['Nilai contoh dipastikan dan berlaku.']});
 return out.sort((a,b)=>(b.at||'').localeCompare(a.at||''));}
/* ---------- muat ---------- */
function load(){const n=counts();K=AREAS.flatMap(([a,an,menu,list])=>list.map(([t,key,c,mean,on,off])=>({id:key,a,an,menu:MENU[a]||menu,t,c,mean,on,off,n:n[key]||0})));RL=rules();BG=badges();HS=history();}
const TOP=()=>K.filter(s=>['c-red','c-or'].includes(s.c)&&s.n>0).sort((a,b)=>b.n-a.n).slice(0,5);
const drafts=()=>RL.filter(r=>r.draft).length;
function items(){
 if(S.tab==='kamus'){let r=K;if(S.q)r=r.filter(s=>(s.t+' '+s.id+' '+s.mean+' '+s.an).toLowerCase().includes(S.q));return r;}
 if(S.tab==='waktu'){let r=RL;if(S.q)r=r.filter(o=>(o.t+' '+o.desc).toLowerCase().includes(S.q));return r;}
 if(S.tab==='lencana')return BG;if(S.tab==='layanan')return SERVICES.map(x=>({id:x[0],x}));return HS;}
function tabs(){const TB=[['kamus','Kamus',K.length],['waktu','Aturan waktu',RL.length],['lencana','Syarat lencana',BG.length],['layanan','Standar layanan',SERVICES.length],['riwayat','Riwayat','']];$('tabs').innerHTML=TB.map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}${n!==''?`<b>${n}</b>`:''}</button>`).join('');}
function band(){const top=TOP(),a=area115('procedures'),d=drafts();
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Buku aturan · Aturan waktu versi ${a.version} · Syarat lencana versi ${data.v9.standards.version}</div>
  <h2>${K.length} status, ${RL.length} aturan waktu, ${BG.length} syarat lencana</h2>
  <p>Aturan waktu berlaku sejak ${a.appliedAt?fd(iso(a.appliedAt)):'awal prototipe'} · ${d?`${d} aturan tindak lanjut masih nilai contoh`:'semua nilai sudah diverifikasi'}</p>
  <div class="acts"><button class="wbtn" data-tab="waktu">Aturan waktu ${ARROW}</button><button class="gbtn" data-tab="riwayat">Riwayat perubahan</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${K.filter(s=>s.n>0).length}</b><span>status sedang dipakai</span></div><div class="sbox"><b class="n">${d}</b><span>nilai contoh</span></div></div></div>
  ${top.length?`<div class="flow">${top.map(s=>`<button class="fn${s.c==='c-red'?' hot':''}" data-status="${s.id}"><span class="dot n">${s.n}</span><span class="t">${E(s.t)}</span><span class="d">${E(s.an.toLowerCase())}</span></button>`).join('')}</div>`:''}`;}
const find=ph=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${ph}" value="${E(S.q)}"></label>`;
function list(){const r=items();let h='';
 if(S.tab==='kamus'){h+=`<div class="ch"><h3>Kamus status <small class="n">${r.length}</small></h3>${find('Cari status atau artinya')}</div>`;let cur='';
  r.forEach((s,i)=>{if(s.a!==cur){cur=s.a;h+=`<div class="gh"><i style="background:var(--muted)"></i><b style="font-weight:400;color:var(--text)">${E(s.an)}</b> · ${r.filter(x=>x.a===cur).length}</div>`;}
   h+=`<div class="it${S.sel.kamus===s.id?' sel':''}" data-id="${s.id}" style="--i:${i}"><span class="ty">${BOOK}</span><div style="min-width:0"><div class="t1">${chip(E(s.t),s.c)}<span class="mono">${s.id}</span></div><div class="t2">${E(s.mean)}</div></div><div class="rgt">${s.n?`<span class="cnt">${s.n}</span>`:''}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>Tidak ditemukan</b>Coba kata lain.</div>`;}
 else if(S.tab==='waktu'){const c=policy115().calendar;h+=`<div class="ch"><h3>Aturan waktu <small class="n">${r.length}</small></h3>${find('Cari aturan')}</div><div class="cal">${CLOCK}<span><b>Kalender operasional</b> · ${E(calText(c))}</span>${SA()?`<button class="sbtn" data-cal>Ubah</button>`:''}</div>`;let grp='';
  r.forEach((x,i)=>{if(x.grp!==grp){grp=x.grp;h+=`<div class="gh"><i style="background:var(--muted)"></i><b style="font-weight:400;color:var(--text)">${grp}</b></div>`;}const ch=S.val[x.id]&&Object.keys(S.val[x.id]).some(k=>S.val[x.id][k]!==x.vals[k]);
   h+=`<div class="it${S.sel.waktu===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${CLOCK}</span><div style="min-width:0"><div class="t1">${E(x.t)} ${x.draft?chip('Nilai contoh','c-or'):''}${ch?chip('Diubah','c-bl'):''}</div><div class="t2">${E(x.type)} · ${E(x.use)}</div></div><div class="rgt"><span class="val">${E(x.show)}</span></div></div>`;});}
 else if(S.tab==='lencana'){h+=`<div class="ch"><h3>Syarat lencana</h3></div>`;
  r.forEach((x,i)=>{h+=`<div class="it${S.sel.lencana===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty" style="color:#2d96e9">${SEAL}</span><div style="min-width:0"><div class="t1">${x.t}</div><div class="t2">${x.sub} · ${x.crit.length+x.fixed.length} syarat</div><div class="meter"><i style="width:${x.total?x.ok.length/x.total*100:0}%"></i></div><div class="t2">${x.ok.length} dari ${x.total} memenuhi</div></div></div>`;});}
 else if(S.tab==='layanan'){h+=`<div class="ch"><h3>Standar layanan</h3></div>`;
  r.forEach((o,i)=>{const x=o.x;h+=`<div class="it${S.sel.layanan===x[0]?' sel':''}" data-id="${x[0]}" style="--i:${i}"><span class="ty">${BOOK}</span><div style="min-width:0"><div class="t1">${E(x[1])} ${x[2]?chip('Draf','c-or'):''}</div><div class="t2">${x[3].length} ketentuan · ${(AREAS.find(a=>a[0]===x[4])||[,,,[]])[3].length} status · ${x[5].length} aturan waktu</div></div></div>`;});
  h+=`<div class="note" style="margin-top:14px">Penggunaan Kredit pindah ke Sistem › Paket & Layanan. <button class="lnk" data-credit>Buka panduan kredit</button></div>`;}
 else{h+=`<div class="ch"><h3>Riwayat perubahan <small class="n">${r.length}</small></h3></div>`;
  r.forEach((x,i)=>{h+=`<div class="it${S.sel.riwayat===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${HIST_I}</span><div style="min-width:0"><div class="t1">${E(x.k)} ${chip(x.v,x.cur?'c-gr':'')}</div><div class="t2">${E(x.t)}${x.at?` · ${fd(x.at)}`:''}</div></div><div class="rgt"><span class="mini">${E(x.by?pini(x.by):'SY')}</span></div></div>`;});}
 $('list').innerHTML=h;}
/* ---------- rincian ---------- */
function kamusPane(s){const sib=K.filter(x=>x.a===s.a);
 return `<div class="hd"><button class="back" data-back>${BACK}Kamus</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${BOOK}</span>${E(s.an)} · <span class="mono">${s.id}</span></div><div class="bigchip">${chip(E(s.t),s.c)}</div>
  <p class="lead">${E(s.mean)}</p><div class="hrow">${s.n?`<button class="btn pri" data-nav="${NAV[s.a]||''}">Lihat ${s.n} di ${E(s.menu)} ${ARROW}</button>`:`<span class="where">Saat ini tidak ada data berstatus ini.</span>`}</div></div>
  <div class="pb">${sec(0,'Kapan muncul',`<p class="para">${E(s.on)}</p>`)}${sec(1,'Kapan hilang',`<p class="para">${E(s.off)}</p>`)}
  ${sec(2,'Warna',`<p class="para">${{'c-red':'Merah · terlambat atau menghambat.','c-or':'Oranye · perlu perhatian atau perbaikan.','c-bl':'Biru · informasi untuk ditindaklanjuti.','c-gr':'Hijau · selesai atau normal.','':'Abu-abu · arsip, tidak perlu tindakan.'}[s.c]}</p>`)}
  ${sec(3,'Urutan dalam '+E(s.an),`<div class="flowline">${sib.map(x=>`<span class="${x.id===s.id?'on':''}">${chip(E(x.t),x.c)}</span>`).join('<i>›</i>')}</div>`)}
  ${sec(4,'Dipakai di',`<div class="uses"><div>${BOOK}<span>${E(s.menu)}<small>${s.n?`${s.n} saat ini`:'tidak ada saat ini'}</small></span></div>${s.a==='work'?`<div>${BOOK}<span>Dashboard<small>kartu Sorotan dan Siklus</small></span></div><div>${CLOCK}<span>Aturan waktu<small>menentukan kapan status ini muncul</small></span></div>`:''}</div>`)}</div>`;}
const cur=x=>({...x.vals,...(S.val[x.id]||{})});
const changed=x=>{const v=cur(x);return Object.keys(x.vals).some(k=>v[k]!==x.vals[k]);};
function nextPolicy(x,v){const p=System115.cp(policy115());if(x.kind==='rule')p.rules.find(r=>r.id===x.id).value=v.value;else if(x.kind==='wami')p.wami={...p.wami,...v};else if(x.kind==='top')Object.assign(p,v);else if(x.kind==='cal')p.calendar=v;return p;}
function impact(p){try{const now=ten.now,at=v=>typeof v==='number'?v:Date.parse(v);const r=impact115(p);return {n:r.length,late:r.filter(i=>at(i.newAt)<now&&!(at(i.oldAt)<now)).length,free:r.filter(i=>at(i.oldAt)<now&&!(at(i.newAt)<now)).length};}catch(err){return {n:0,late:0,free:0};}}
function impactHtml(x){if(!changed(x))return '';const m=impact(nextPolicy(x,cur(x)));return m.n?`<div class="impact ${m.late?'r':'g'}">${chip(`${m.n} pekerjaan`,m.late?'c-red':'c-gr')} tenggatnya ikut berubah${m.late?` · <b>${m.late}</b> menjadi terlambat hari ini`:''}${m.free?` · <b>${m.free}</b> tidak lagi terlambat`:''}.</div>`:`<div class="impact g">${chip('0 pekerjaan','c-gr')} Tidak ada pekerjaan berjalan yang tenggatnya berubah; berlaku untuk pekerjaan berikutnya.</div>`;}
function waktuPane(x){const v=cur(x),ch=changed(x),sa=SA(),a=area115('procedures');
 return `<div class="hd"><button class="back" data-back>${BACK}Aturan waktu</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${CLOCK}</span>${E(x.type)}</div><h2>${E(x.t)}</h2>
  <div class="meta">${x.draft?chip('Nilai contoh · perlu verifikasi','c-or'):chip(`Berlaku · versi ${a.version}`,'c-gr')}<span>dipakai di ${E(x.use)}</span></div>
  ${x.fields.length?x.fields.map(([k,u,mn,mx])=>`<div class="stepper${sa?'':' ro'}">${sa?`<button data-step="${k}|-1|${mn}|${mx}" aria-label="Kurangi">−</button>`:''}<b class="n">${v[k]}</b><span>${E(u)}</span>${sa?`<button data-step="${k}|1|${mn}|${mx}" aria-label="Tambah">+</button>`:''}</div>`).join(''):`<div class="stepper ro"><b>${E(x.show)}</b></div>`}
  ${impactHtml(x)}
  <div class="hrow">${sa&&ch?`<button class="btn pri" data-publish="${x.id}">Terbitkan sebagai versi ${a.version+1}</button><button class="btn" data-reset="${x.id}">Batal</button>`:sa&&x.draft?`<button class="btn pri" data-verify="${x.id}">Tandai sudah diverifikasi</button>`:''}</div></div>
  <div class="pb">${sec(0,'Cara kerja',`<p class="para">${E(x.desc)}</p>`)}${sec(1,'Status yang dipengaruhi',`<div class="flowline">${chip('Prioritas','c-or')}<i>›</i>${chip('Lewat tenggat','c-red')}${x.grp==='Tindak lanjut'?`<i>›</i>${chip('Perlu tindak lanjut','c-or')}`:''}</div>`)}
  ${sec(2,'Riwayat',`<div class="tl"><div><span class="mini">${E(pini(a.actor))}</span><span>Versi ${a.version}${a.note&&a.version>1?' · '+E(a.note):' · nilai awal'}<small>${a.appliedAt?fd(iso(a.appliedAt)):'awal prototipe'}</small></span></div>${store().verified[x.id]?`<div><span class="mini">${E(pini(store().verified[x.id].by))}</span><span>Diverifikasi<small>${fd(iso(store().verified[x.id].at))}</small></span></div>`:''}</div>`)}</div>`;}
function calPane(){if(!SA()){const c=policy115().calendar;return `<div class="hd"><button class="back" data-back>${BACK}Aturan waktu</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${CLOCK}</span>Kalender</div><h2>Kalender operasional</h2><div class="meta">${chip(`Berlaku · versi ${area115('procedures').version}`,'c-gr')}<span>dipakai semua aturan hari kerja</span></div></div><div class="pb">${sec(0,'Jadwal',`<p class="para">${E(calText(c))}</p>`)}</div>`;}const c=policy115().calendar,v=S.val.cal||{days:c.days.slice(),start:c.start,end:c.end,holidays:(c.holidays||[]).join(', ')};
 return `<div class="hd"><button class="back" data-back>${BACK}Aturan waktu</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${CLOCK}</span>Kalender</div><h2>Kalender operasional</h2><div class="meta">${chip(`Berlaku · versi ${area115('procedures').version}`,'c-gr')}<span>dipakai semua aturan hari kerja</span></div></div>
  <div class="pb">${sec(0,'Hari kerja',`<div class="opts">${[1,2,3,4,5,6,0].map(d=>`<button data-day="${d}" aria-pressed="${v.days.includes(d)}">${DAYS[d]}</button>`).join('')}</div>`)}
  ${sec(1,'Jam kerja',`<div class="f2"><label class="fld">Mulai<input id="c-start" type="time" value="${E(v.start)}"></label><label class="fld">Selesai<input id="c-end" type="time" value="${E(v.end)}"></label></div>`)}
  ${sec(2,'Hari libur',`<label class="fld">Tanggal (pisahkan dengan koma)<input id="c-hol" value="${E(v.holidays)}" placeholder="2026-12-25, 2027-01-01"></label>`)}
  <div class="hrow"><button class="btn pri" data-publish="cal">Terbitkan sebagai versi ${area115('procedures').version+1}</button><button class="btn" data-reset="cal">Batal</button></div></div>`;}
function lencanaPane(x){const sa=SA(),bv=S.bval[x.id]||{},std={...data.v9.standards,...bv},delta=Object.keys(bv).some(k=>bv[k]!==data.v9.standards[k]);let k=0;
 const after=delta?meets(x,std):x.ok,gain=after.filter(n=>!x.ok.includes(n)),lose=x.ok.filter(n=>!after.includes(n));
 return `<div class="hd"><button class="back" data-back>${BACK}Syarat lencana</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px;color:#2d96e9">${SEAL}</span>${x.sub}</div><h2>${x.t}</h2>
  <div class="meta">${chip(`Berlaku · versi ${data.v9.standards.version}`,'c-gr')}<span>${x.ok.length} dari ${x.total} memenuhi</span></div>
  <div class="hrow">${sa&&delta?`<button class="btn pri" data-bpublish="${x.id}">Terbitkan sebagai versi ${data.v9.standards.version+1}</button><button class="btn" data-breset="${x.id}">Batal</button>`:sa?`<span class="where">Ubah ambang di bawah untuk melihat dampaknya.</span>`:''}</div></div>
  <div class="pb">${sec(k++,'Syarat',`<div class="crit">${x.crit.map(([key,t,u,mn,mx])=>`<div><span>${E(t)}</span><div class="stepper sm${sa?'':' ro'}">${sa?`<button data-bstep="${x.id}|${key}|-1|${mn}|${mx}">−</button>`:''}<b class="n">${std[key]}</b><span>${E(u)}</span>${sa?`<button data-bstep="${x.id}|${key}|1|${mn}|${mx}">+</button>`:''}</div></div>`).join('')}${x.fixed.map(t=>`<div><span>${E(t)}</span><b class="okc">wajib</b></div>`).join('')}</div><p class="note">${E(x.note)}</p>`)}
  ${delta?sec(k++,'Dampak bila diterbitkan',gain.length||lose.length?`${gain.length?`<div class="impact g">${chip('+'+gain.length,'c-gr')} akan mendapat centang: <b>${E(gain.join(', '))}</b></div>`:''}${lose.length?`<div class="impact r">${chip('−'+lose.length,'c-red')} akan kehilangan centang: <b>${E(lose.join(', '))}</b></div>`:''}`:`<div class="impact g">${chip('0','c-gr')} Tidak ada label yang berubah status. Pencapaian yang sudah didapat dipertahankan.</div>`):''}
  ${sec(k++,'Saat ini memenuhi',x.ok.length?`<div class="subl">${x.ok.map(n=>`<div><span class="lav" style="--h:${hue(n)}">${E(n.split(' ').map(w=>w[0]).join('').slice(0,2))}</span>${E(n)}<small>terverifikasi</small></div>`).join('')}</div>`:'<p class="where">Belum ada.</p>')}</div>`;}
function layananPane(x){const area=AREAS.find(a=>a[0]===x[4]);
 return `<div class="hd"><button class="back" data-back>${BACK}Standar layanan</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${BOOK}</span>Standar layanan</div><h2>${E(x[1])}</h2>
  <div class="meta">${x[2]?chip('Draf · perlu verifikasi staf','c-or'):chip('Berlaku','c-gr')}<span>${x[3].length} ketentuan</span></div></div>
  <div class="pb">${sec(0,'Ketentuan',`<ol class="rules">${x[3].map(t=>`<li>${E(t)}</li>`).join('')}</ol>`)}
  ${area?sec(1,'Alur status',`<div class="flowline">${area[3].map(s=>chip(E(s[0]),s[2])).join('<i>›</i>')}</div>`):''}
  ${x[5].length?sec(2,'Aturan waktu terkait',`<div class="uses">${x[5].map(id=>{const r=RL.find(r=>r.id===id)||RL.find(r=>r.id===({feedback:'materials'}[id]||''));return r?`<div data-rule="${r.id}" style="cursor:pointer">${CLOCK}<span>${E(r.t)}<small>${E(r.show)}</small></span></div>`:'';}).join('')}</div>`):''}</div>`;}
function riwayatPane(x){return `<div class="hd"><button class="back" data-back>${BACK}Riwayat</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${HIST_I}</span>${E(x.k)}${x.at?' · '+fd(x.at):''}</div><h2>${E(x.t)}</h2><div class="meta">${chip(x.v,x.cur?'c-gr':'')}<span>oleh ${E(x.by?pname(x.by):'sistem')}</span></div></div>
  <div class="pb">${sec(0,'Isi',`<div class="chg">${x.chg.map(t=>`<div><span class="chip c-bl"><i></i>${x.cur?'Berlaku':'Arsip'}</span><span>${E(t)}</span></div>`).join('')}</div>`)}</div>`;}
let lastPane='';
function pane(){const r=items(),id=S.sel[S.tab];let html='';
 if(S.tab==='waktu'&&id==='cal')html=calPane();else{const o=r.find(z=>z.id===id);if(o)html=S.tab==='kamus'?kamusPane(o):S.tab==='waktu'?waktuPane(o):S.tab==='lencana'?lencanaPane(o):S.tab==='layanan'?layananPane(o.x):riwayatPane(o);}
 $('pin').innerHTML=html||`<div class="empty" style="padding:60px 20px"><b>Pilih item</b>Rinciannya tampil di sini.</div>`;
 const key=S.tab+id;if(key!==lastPane){$('pane').classList.remove('swap','play');void $('pane').offsetWidth;$('pane').classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function paint(){const a=root.activeElement,id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;const r=items();if(wide()&&(!S.sel[S.tab]||(S.sel[S.tab]!=='cal'&&!r.some(z=>z.id===S.sel[S.tab]))))S.sel[S.tab]=r[0]?.id;
 tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function toast(t){toast137(DEF,t);}
function open(){S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<80)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
/* ---------- terbitkan (fungsi asli Sistem › Prosedur) ---------- */
function publish(x,v,label){if(!SA()){toast('Hanya Super Admin');return false;}const a=area115('procedures');if(a.draft){toast('Ada draf di Sistem › Prosedur & Pengingat. Terapkan atau buang dulu.');return false;}
 const p=nextPolicy(x,v),imp=impact115(p),note=`Standar & Penanda · ${label}`;
 try{atomic115('save',{area:'procedures',version:a.version,draftVersion:a.draftVersion,value:p,note});}catch(err){toast(String(err?.message||err));return false;}
 const b=area115('procedures');try{atomic115('publish',{area:'procedures',version:b.version,draftVersion:b.draftVersion,note,ongoing:imp.length>0,confirmed:true,impactToken:JSON.stringify(impact115(b.draft))});}
 catch(err){try{const c=area115('procedures');atomic115('discard',{area:'procedures',version:c.version,draftVersion:c.draftVersion,note:'Batal terbit'});}catch(e){}toast(String(err?.message||err));return false;}
 return true;}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;paint();return;}
  const st=t.closest('[data-status]');if(st){S.tab='kamus';S.q='';S.sel.kamus=st.dataset.status;open();return;}
  const rl=t.closest('[data-rule]');if(rl){S.tab='waktu';S.q='';S.sel.waktu=rl.dataset.rule;open();return;}
  if(t.closest('[data-cal]')){S.tab='waktu';S.sel.waktu='cal';open();return;}
  const dy=t.closest('[data-day]');if(dy){const c=policy115().calendar;S.val.cal=S.val.cal||{days:c.days.slice(),start:c.start,end:c.end,holidays:(c.holidays||[]).join(', ')};S.val.cal.start=$('c-start')?.value||S.val.cal.start;S.val.cal.end=$('c-end')?.value||S.val.cal.end;S.val.cal.holidays=$('c-hol')?.value??S.val.cal.holidays;const d=+dy.dataset.day,ds=S.val.cal.days;S.val.cal.days=ds.includes(d)?ds.filter(x=>x!==d):[...ds,d].sort();pane();return;}
  const sp=t.closest('[data-step]');if(sp){const x=RL.find(r=>r.id===S.sel.waktu);const [k,d,mn,mx]=sp.dataset.step.split('|');const v=cur(x);S.val[x.id]={...(S.val[x.id]||{}),[k]:Math.min(+mx,Math.max(+mn,v[k]+ +d))};list();pane();return;}
  const bs=t.closest('[data-bstep]');if(bs){const [b,k,d,mn,mx]=bs.dataset.bstep.split('|');const curv=(S.bval[b]||{})[k]??data.v9.standards[k];S.bval[b]={...(S.bval[b]||{}),[k]:Math.min(+mx,Math.max(+mn,curv+ +d))};pane();return;}
  const pb=t.closest('[data-publish]');if(pb){const id=pb.dataset.publish;let ok=false,msg='';
   if(id==='cal'){const days=[...root.querySelectorAll('[data-day][aria-pressed="true"]')].map(b=>+b.dataset.day).sort(),start=$('c-start').value,end=$('c-end').value,hol=$('c-hol').value.split(',').map(s=>s.trim()).filter(Boolean);
    if(!days.length){toast('Pilih minimal satu hari kerja');return;}if(!start||!end||end<=start){toast('Jam selesai harus setelah jam mulai');return;}if(hol.some(h=>!/^\d{4}-\d{2}-\d{2}$/.test(h))){toast('Tulis tanggal libur dengan format 2026-12-25');return;}
    ok=publish({kind:'cal'},{days,start,end,holidays:hol},'Kalender operasional diubah');msg='Kalender diterbitkan · tenggat pekerjaan dihitung ulang';}
   else{const x=RL.find(r=>r.id===id),v=cur(x);ok=publish(x,v,`${x.t}: ${Object.keys(x.vals).filter(k=>x.vals[k]!==v[k]).map(k=>`${x.vals[k]} → ${v[k]}`).join(', ')}`);msg=`${x.t} diterbitkan sebagai versi ${area115('procedures').version}`;}
   if(ok){delete S.val[id];lastSig='';load();paint();toast(msg);}return;}
  const rs=t.closest('[data-reset]');if(rs){delete S.val[rs.dataset.reset];if(rs.dataset.reset==='cal'){S.sel.waktu=RL[0]?.id;}paint();return;}
  const vf=t.closest('[data-verify]');if(vf){if(!SA())return;const x=RL.find(r=>r.id===vf.dataset.verify);const s=store();const f=()=>{s.verified[x.id]={at:ten.now,by:state.user};s.history.push({id:x.id,text:`${x.t} diverifikasi (${x.show})`,at:ten.now,by:state.user});};typeof atomic10==='function'?atomic10(f):(f(),save10());lastSig='';load();paint();toast(`${x.t} ditandai sudah diverifikasi`);return;}
  const bp=t.closest('[data-bpublish]');if(bp){if(!SA())return;const b=bp.dataset.bpublish,draft={...data.v9.standards,...(S.bval[b]||{})};try{const f=()=>{data.v9.versions.push({version:data.v9.standards.version,date:typeof stamp8==='function'?stamp8():'',standards:JSON.parse(JSON.stringify(data.v9.standards)),at137:data.v9.standards.at137||null,by137:data.v9.standards.by137||null});data.v9.standards={...draft,version:data.v9.standards.version+1,at137:ten.now,by137:state.user};};typeof atomic10==='function'?atomic10(f):f();if(typeof save8==='function')save8();else save10();}catch(err){toast(String(err?.message||err));return;}
   delete S.bval[b];lastSig='';load();paint();toast(`Syarat lencana diterbitkan sebagai versi ${data.v9.standards.version}`);return;}
  const br=t.closest('[data-breset]');if(br){delete S.bval[br.dataset.breset];paint();return;}
  const nv=t.closest('[data-nav]');if(nv){if(!nv.dataset.nav||!go137(nv.dataset.nav))toast('Buka menu terkait');return;}
  if(t.closest('[data-credit]')){try{route11('credit-guide11');}catch(err){toast('Panduan kredit belum tersedia');}return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){S.sel[S.tab]=it.dataset.id;open();return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function intake(){if(window.stdTab137){S.tab=window.stdTab137;S.q='';S.read=false;window.stdTab137=null;lastSig='';}}
const sig=()=>K.map(s=>s.n).join(',')+'#'+area115('procedures').version+':'+area115('procedures').draftVersion+'#'+JSON.stringify(data.v9.standards)+'#'+store().history.length+'#'+U.today()+ten.role+state.user+(SA()?'s':'');
const staff=()=>!isLabel10()&&state.mode==='platform'&&!state.preview;
const DEF={id:'standards',css:STYLE,html:HTML,
 when:()=>staff()&&(state.page==='standards9'&&!!me().super||state.page==='module'&&typeof v4==='object'&&v4.module==='standards119'),
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
const pageBefore=standardsPage9;standardsPage9=function(){if(DEF.when())return '';return pageBefore.apply(this,arguments);};
if(typeof standardsPage119==='function'){const b119=standardsPage119;standardsPage119=function(){if(DEF.when())return '';return b119.apply(this,arguments);};}
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
})();
