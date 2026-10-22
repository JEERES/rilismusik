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
/* v1.1.0-dev.43 — dua bahasa: data di atas tetap bahasa Indonesia (kunci); EN = versi Inggris tiap teks, diambil saat dipakai lewat tr() */
const EN={
 'Pekerjaan':'Work','Baru':'New','Pekerjaan diterima dan belum ditangani.':'Work received and not yet handled.','Pekerjaan masuk antrean tanpa penanggung jawab.':'Work enters the queue with no assignee.','Saat seseorang mengambil pekerjaan.':'When someone takes the work.',
 'Prioritas':'Priority','Perlu didahulukan sesuai tenggat dan kebutuhan penanganan.':'Needs to go first based on its deadline and handling needs.','Aturan waktu tahap ini jatuh tempo hari ini.':'This stage’s time rule is due today.','Saat tahap diselesaikan.':'When the stage is completed.',
 'Lewat tenggat':'Overdue','Tenggat tahap saat ini sudah lewat.':'The current stage’s deadline has passed.','Tenggat dari Aturan waktu terlewati.':'The deadline from the time rules has passed.',
 'Perlu tindak lanjut':'Needs follow-up','Waktu menunggu telah melewati pengingat; periksa jawaban pihak terkait.':'The waiting time has passed the reminder; check for a reply from the other party.','Menunggu pihak lain melewati batas pengingat.':'Waiting on another party has passed the reminder limit.','Saat ada jawaban atau tindak lanjut tercatat.':'When a reply or follow-up is recorded.',
 'Rilisan':'Releases','Menunggu pemeriksaan':'Awaiting review','Label sudah mengajukan; belum ada yang memeriksa.':'The label has submitted; no one has reviewed it yet.','Label mengirim pengajuan.':'The label sends a submission.','Saat petugas menekan Mulai pemeriksaan.':'When the assignee presses Start review.',
 'Dalam pemeriksaan':'In review','Petugas memeriksa sampul, audio, metadata, hak, dan tanggal.':'The assignee checks the cover, audio, metadata, rights, and dates.','Pemeriksaan dimulai; petugas menjadi penanggung jawab.':'Review starts; the reviewer becomes the assignee.','Saat disetujui, diminta perbaikan, atau ditolak.':'When approved, sent back for revision, or rejected.',
 'Menunggu perbaikan label':'Awaiting label revision','Ada yang harus diperbaiki label sebelum lanjut.':'The label must fix something before it can continue.','Petugas menekan Minta perbaikan.':'The assignee presses Request revision.','Saat label mengirim perbaikan.':'When the label sends the revision.',
 'Perlu penjelasan':'Needs clarification','Label meminta penjelasan atas permintaan perbaikan.':'The label asked for clarification on a revision request.','Label menekan Minta penjelasan.':'The label presses Ask for clarification.','Saat petugas menjawab.':'When the assignee replies.',
 'Siap dikirim':'Ready to send','Disetujui; menunggu dikirim ke Believe.':'Approved; waiting to be sent to Believe.','Pemeriksaan disetujui.':'The review is approved.','Saat pengiriman dikonfirmasi.':'When delivery is confirmed.',
 'Dalam distribusi':'In distribution','Sudah dikirim ke Believe; menunggu tampil di toko.':'Sent to Believe; waiting to appear in stores.','Pengiriman dikonfirmasi.':'Delivery is confirmed.','Saat ditandai Tayang atau belum ditemukan.':'When marked Live or not found.',
 'Tindak lanjut Believe':'Believe follow-up','Belum ditemukan di toko atau tanggalnya salah; sedang ditindaklanjuti.':'Not found in stores or the date is wrong; being followed up.','Pemeriksaan toko mencatat belum ditemukan atau tanggal salah.':'A store check recorded not found or a wrong date.','Saat ditemukan dan ditandai Tayang.':'When found and marked Live.',
 'Tayang':'Live','Rilisan sudah ditemukan di toko.':'The release has been found in stores.','Petugas menandai Tayang dengan tautan toko.':'The assignee marks it Live with a store link.','Saat diturunkan atau penandaan dikoreksi.':'When taken down or the marking is corrected.',
 'Diturunkan':'Taken down','Rilisan sudah diturunkan dari toko; arsip.':'The release has been taken down from stores; archived.','Takedown dikonfirmasi distributor.':'The distributor confirms the takedown.','Tidak hilang · arsip.':'Does not clear · archived.',
 'Ditutup':'Closed','Pengajuan ditolak atau dibatalkan; kredit dikembalikan sesuai aturan.':'The submission was rejected or cancelled; credits are returned per the rules.','Petugas menolak atau label membatalkan.':'The assignee rejects it or the label cancels.','Saat label mengajukan ulang.':'When the label resubmits.',
 'Permintaan batal':'Cancellation requested','Label meminta pembatalan; proses dihentikan dulu.':'The label asked to cancel; processing is paused.','Label menekan Batalkan pengajuan.':'The label presses Cancel submission.','Saat pembatalan dikonfirmasi petugas.':'When the assignee confirms the cancellation.',
 'Penarikan':'Withdrawals','Pengajuan tercatat dan nominal telah disisihkan.':'The request is recorded and the amount has been set aside.','Label mengajukan penarikan (tanggal 1–14).':'The label requests a withdrawal (days 1–14).','Saat diperiksa.':'When reviewed.',
 'Menunggu pembayaran':'Awaiting payment','Disetujui, belum memulai transfer.':'Approved; the transfer has not started.','Pengajuan disetujui.':'The request is approved.','Saat transfer dimulai.':'When the transfer starts.',
 'Pembayaran diproses':'Payment in progress','Transfer sedang ditangani. Hasil belum berarti berhasil.':'The transfer is being handled. This does not yet mean it succeeded.','Transfer dimulai.':'The transfer starts.','Saat transfer dipastikan berhasil atau tertunda.':'When the transfer is confirmed successful or delayed.',
 'Ditunda':'Delayed','Kendala tercatat; nominal tetap disisihkan.':'An issue is recorded; the amount stays set aside.','Ada kendala transfer atau data.':'There is a transfer or data issue.','Saat kendala selesai.':'When the issue is resolved.',
 'Dibayarkan':'Paid','Petugas telah memastikan transfer berhasil.':'Staff have confirmed the transfer succeeded.','Transfer dipastikan berhasil.':'The transfer is confirmed successful.','Tetap.':'Permanent.',
 'Koreksi pembayaran':'Payment correction','Pencatatan pembayaran diperiksa; transfer ulang ditahan.':'The payment record is being checked; any re-transfer is on hold.','Ada selisih atau kesalahan pencatatan.':'There is a discrepancy or a recording error.','Saat koreksi selesai.':'When the correction is done.',
 'Pencairan terlambat':'Payout overdue','Mulai tanggal 21 WIB untuk pencairan periode terkait yang belum dibayar.':'From day 21 (WIB) for that period’s payouts that are still unpaid.','Tanggal 21 tiba dan pengajuan belum dibayar.':'Day 21 arrives and the request is still unpaid.','Saat dibayar.':'When paid.',
 'Akses label':'Label access','Manajemen Label':'Label Management','Tindakan tersedia sesuai paket dan kewenangan.':'Actions are available according to the plan and permissions.','Bawaan.':'Default.',
 'Dibatasi':'Limited','Sebagian tindakan dibatasi oleh paket berakhir atau keputusan Rilis Musik.':'Some actions are limited by an expired plan or a Rilis Musik decision.','Paket berakhir atau keputusan Super Admin.':'The plan expires, or a Super Admin decision.','Saat paket diperpanjang atau pembatasan dicabut.':'When the plan is renewed or the limit is lifted.',
 'Ditangguhkan':'Suspended','Pembatasan karena keputusan Rilis Musik; pencatatan royalti tetap berlangsung.':'Restricted by a Rilis Musik decision; royalty recording continues.','Keputusan Super Admin.':'A Super Admin decision.','Saat penangguhan dicabut.':'When the suspension is lifted.',
 'Aktivitas label':'Label activity','Aktif':'Active','Ada kegiatan pekerjaan dalam 90 hari terakhir.':'Work activity in the last 90 days.','Ada rilisan atau pekerjaan dalam 90 hari.':'A release or work within 90 days.','Setelah 90 hari tanpa kegiatan.':'After 90 days without activity.',
 'Belum aktif':'Not yet active','Belum ada kegiatan pekerjaan yang memenuhi syarat.':'No qualifying work activity yet.','Akun baru.':'New account.','Saat kegiatan pertama tercatat.':'When the first activity is recorded.',
 'Lama tidak beraktivitas':'Dormant','Lebih dari 90 hari sampai satu tahun tanpa kegiatan pekerjaan.':'More than 90 days and up to a year without work activity.','90 hari tanpa kegiatan.':'90 days without activity.','Saat ada kegiatan baru.':'When there is new activity.',
 'Nonoperasional':'Nonoperational','Lebih dari satu tahun tanpa kegiatan, atau berhenti beroperasi terkonfirmasi.':'More than a year without activity, or confirmed to have stopped operating.','Satu tahun tanpa kegiatan.':'One year without activity.',
 'Royalti':'Royalties','Perlu diperiksa':'Needs review','Pemetaan, periode atau duplikasi belum selesai.':'Mapping, period, or duplicate checks are not finished.','Laporan Believe diunggah.':'A Believe report is uploaded.','Saat pemeriksaan selesai.':'When the review is finished.',
 'Siap diterbitkan':'Ready to publish','Pemeriksaan selesai; belum terlihat oleh label.':'Review finished; not yet visible to labels.','Pemeriksaan selesai.':'The review is finished.','Saat diterbitkan.':'When published.',
 'Diterbitkan':'Published','Laporan terlihat; belum tentu tersedia untuk penarikan.':'The report is visible; not necessarily available for withdrawal yet.','Super Admin menerbitkan.':'Super Admin publishes it.',
 'Menunggu pencocokan':'Awaiting matching','Penerimaan tercatat tanpa membuka saldo otomatis.':'Receipt is recorded without releasing balances automatically.','Dana dari Believe tercatat.':'Funds from Believe are recorded.','Saat dicocokkan.':'When matched.',
 'Koreksi memerlukan penyelesaian':'Correction requires resolution','Ada dampak terhadap penarikan atau saldo yang perlu keputusan petugas.':'It affects withdrawals or balances and needs a staff decision.','Koreksi laporan berdampak ke saldo.':'A report correction affects balances.','Saat diputuskan.':'When decided.',
 'Registrasi WAMI':'WAMI Registration','Belum masuk antrean petugas.':'Not yet in the staff queue.','Pesanan dibuat.':'The order is created.','Pembayaran/benefit terpenuhi; menunggu petugas.':'Payment/benefit fulfilled; waiting for staff.','Dibayar.':'Paid.',
 'Sedang diperiksa':'Under review','Data dan kelengkapan diperiksa.':'Data and completeness are being checked.','Petugas mulai memeriksa.':'The assignee starts the review.','Saat lengkap atau perlu perbaikan.':'When complete or corrections are needed.',
 'Persiapan pendaftaran':'Preparing registration','Pendaftaran website dan pengiriman dokumen.':'Website registration and document submission.','Data lengkap.':'Data is complete.','Saat dikirim ke WAMI.':'When sent to WAMI.',
 'Perlu perbaikan':'Needs corrections','Tindak lanjut label atau petugas, pengajuan tetap sama.':'Follow-up by the label or staff; the request stays the same.','Data kurang.':'Data is missing.','Saat diperbaiki.':'When corrected.',
 'Menunggu WAMI':'Awaiting WAMI','Dua langkah pengiriman selesai, menunggu respons.':'Both submission steps are done; waiting for a response.','Dikirim ke WAMI.':'Sent to WAMI.','Saat WAMI merespons.':'When WAMI responds.',
 'Selesai':'Done','Petugas mencatat hasil penerimaan WAMI.':'Staff recorded the WAMI acceptance result.','Hasil tercatat.':'The result is recorded.',
 'Layanan tambahan':'Add-on services','Layanan Tambahan':'Add-on Services','Pembayaran belum berhasil; belum masuk antrean.':'Payment has not succeeded; not yet in the queue.','Pembayaran atau benefit terpenuhi; menunggu pemeriksaan.':'Payment or benefit fulfilled; awaiting review.',
 'Lengkapi bahan':'Complete materials','Label perlu melengkapi kebutuhan pesanan.':'The label needs to complete what the order requires.','Bahan kurang.':'Materials are missing.','Saat bahan lengkap.':'When materials are complete.',
 'Sedang dikerjakan':'In progress','Bahan lengkap, pengerjaan berlangsung.':'Materials complete; work is under way.','Bahan lengkap.':'Materials are complete.','Saat hasil dikirim.':'When the result is sent.',
 'Menunggu tanggapan':'Awaiting response','Hasil telah dikirim, menunggu tanggapan label.':'The result has been sent; awaiting the label’s response.','Hasil dikirim.':'The result is sent.','Saat label menanggapi.':'When the label responds.',
 'Permintaan revisi':'Revision requested','Petugas menilai permintaan perbaikan.':'Staff assess the revision request.','Label meminta revisi.':'The label requests a revision.','Saat revisi diputuskan.':'When the revision is decided.',
 'Dalam penyelesaian':'In resolution','Penyelesaian ditinjau bersama label.':'The resolution is reviewed together with the label.','Ada kendala hasil atau waktu.':'There is a result or timing issue.','Saat disepakati.':'When agreed.',
 'Label telah menerima hasil.':'The label has accepted the result.','Hasil diterima.':'The result is accepted.','Penyelesaian pengembalian telah dicatat.':'The refund settlement has been recorded.','Pengembalian dicatat.':'The refund is recorded.',
 'Tiket bantuan':'Support tickets','Pesan':'Messages','Diajukan':'Submitted','Permintaan masuk antrean petugas.':'The request enters the staff queue.','Label mengirim permintaan.':'The label sends a request.','Saat diambil petugas.':'When an assignee takes it.',
 'Dalam penanganan':'In progress','Petugas sedang memeriksa permintaan.':'The assignee is looking into the request.','Petugas mengambil.':'An assignee takes it.','Saat perlu tanggapan atau diteruskan.':'When a response is needed or it is forwarded.',
 'Perlu tanggapan label':'Needs label response','Ada kelengkapan tertentu yang perlu dikirim label.':'The label needs to send specific details.','Petugas meminta kelengkapan.':'The assignee asks for details.','Saat label menjawab.':'When the label replies.',
 'Menunggu distributor':'Waiting for distributor','Penerusan tercatat; petugas menunggu dan memantau hasil.':'Forwarding is recorded; the assignee waits and monitors the outcome.','Diteruskan ke Believe.':'Forwarded to Believe.','Saat hasil tercatat.':'When the outcome is recorded.',
 'Seluruh bagian memiliki hasil terkonfirmasi.':'Every part has a confirmed outcome.','Semua bagian terkonfirmasi.':'All parts confirmed.',
 'Perlu peninjauan':'Needs review','Kasus membutuhkan koordinasi Super Admin; bukan status selesai.':'The case needs Super Admin coordination; it is not a done status.','Petugas mengeskalasi.':'The assignee escalates.','Saat Super Admin memutuskan.':'When Super Admin decides.',
 'Transaksi':'Transactions','Pembayaran masih dapat dilanjutkan; belum membutuhkan tindakan petugas.':'Payment can still be completed; no staff action needed yet.','Tagihan dibuat.':'The invoice is created.','Saat dibayar atau kedaluwarsa.':'When paid or expired.',
 'Berhasil':'Successful','Pembayaran terkonfirmasi, bukan berarti layanan selesai.':'Payment confirmed; this does not mean the service is complete.','Pembayaran diterima.':'Payment received.',
 'Kedaluwarsa':'Expired','Periksa dahulu jika sudah membayar, sebelum membuat pembayaran baru.':'If already paid, check first before creating a new payment.','Batas bayar lewat.':'The payment deadline passed.',
 'Pembelian belum terpenuhi atau ada pemeriksaan terbuka.':'The purchase is not yet fulfilled or a check is open.','Pembayaran berhasil tapi layanan belum diberikan.':'Payment succeeded but the service has not been delivered.','Saat terpenuhi.':'When fulfilled.',
 'Dana dikembalikan':'Refunded','Pelaksanaan pengembalian terkonfirmasi dan tercatat.':'The refund is confirmed and recorded.',
 'Pesanan terikat pada satu rilisan atau satu lagu sesuai satuan layanan.':'Each order is tied to one release or one song, depending on the service unit.',
 'Harga, lingkup, jatah revisi, dan benefit disimpan saat memesan.':'Price, scope, revision allowance, and benefits are saved at the time of ordering.',
 'Pembayaran rupiah atau benefit paket; kredit rilisan tidak digunakan. Benefit berlaku sampai pesanan selesai meskipun paket berakhir.':'Paid in rupiah or with a plan benefit; release credits are not used. Benefits stay valid until the order is done, even if the plan ends.',
 'Waktu pengerjaan dimulai setelah bahan lengkap, mengikuti jam kerja dan hari libur. Menunggu kelengkapan label menjeda estimasi; kendala internal tidak menjedanya.':'Work time starts once materials are complete and follows working hours and holidays. Waiting for the label pauses the estimate; internal issues do not.',
 'Draft hanya untuk petugas. Kesalahan pengerjaan tidak memotong jatah revisi.':'Drafts are for staff only. Work mistakes do not use up the revision allowance.',
 'Perubahan waktu, hasil pengganti, atau pengembalian harus disepakati label. Tidak ada pembatalan atau biaya tambahan otomatis.':'Changes to timing, replacement results, or refunds must be agreed by the label. No automatic cancellations or extra charges.',
 'Draft/revisi diperbaiki di Rilisan. Perubahan setelah pengiriman ditangani melalui tiket. Pengajuan tidak langsung mengganti katalog.':'Drafts and revisions are fixed in Releases. Changes after delivery go through a ticket. A request does not change the catalogue directly.',
 'Pesan biasa dan catatan internal tidak mengubah status.':'Regular messages and internal notes do not change the status.',
 'Tindak lanjut jatuh tempo mengikuti pengingat, bukan jaminan penyelesaian.':'Follow-ups fall due based on reminders, not a resolution guarantee.',
 'Tidak ada selesai massal atau penutupan otomatis karena label belum merespons.':'No bulk completion or automatic closing because a label has not responded.',
 'Ketentuan Content ID, penurunan parsial, biaya/benefit, target respons dan eskalasi masih menunggu verifikasi staf.':'Terms for Content ID, partial takedowns, fees/benefits, response targets, and escalation are still awaiting staff verification.',
 'Status pembayaran, pemberian pembelian, dan proses layanan ditampilkan terpisah.':'Payment status, purchase fulfilment, and service progress are shown separately.',
 'Pengembalian uang tidak sama dengan pengembalian kredit.':'A money refund is not the same as a credit refund.',
 'Pengajuan masuk antrean setelah pembayaran atau benefit terpenuhi.':'A request enters the queue once payment or a benefit is fulfilled.',
 'Perbaikan oleh label tidak membuat pengajuan baru.':'Corrections by the label do not create a new request.',
 'Hasil pihak luar (WAMI) tidak dihitung sebagai waktu kerja staf.':'External results (WAMI) are not counted as staff working time.',
 'Verifikasi Label':'Label Verification','Centang biru di nama label':'Blue check next to the label name','Masa bergabung':'Time since joining','Rilisan berhasil yang berbeda (12 bulan)':'Distinct successful releases (12 months)','Bulan aktif merilis (dari 12 bulan)':'Months with releases (out of 12)',
 'Data dan kontak terkonfirmasi':'Details and contacts confirmed','Tanpa pembatasan pelanggaran; enam bulan tanpa penangguhan':'No violation restrictions; six months without suspension',
 'Login, royalti yang masuk otomatis, pengunggahan ulang, dan jumlah pengikut tidak dihitung sebagai aktivitas. Pencapaian yang sudah didapat dipertahankan.':'Logins, automatic royalty income, re-uploads, and follower counts do not count as activity. Badges already earned are kept.',
 'Verifikasi Master Multi-label':'Multi-label Master Verification','Centang untuk label induk':'Check for parent labels','Usia master':'Master age','Masa pengelolaan':'Management period','Label anak terverifikasi minimal':'Minimum verified sub-labels','Label anak terverifikasi (persen)':'Verified sub-labels (percent)',
 'Hubungan pengelolaan dan data seluruh label terkonfirmasi':'Management relationship and all label details confirmed',
 'Label baru memunculkan penanda pemeriksaan. Masa kelola tidak mengikuti usia label; menghapus hubungan tidak menghapus riwayat pelanggaran.':'A new label triggers a review indicator. The management period does not follow label age; removing a relationship does not erase violation history.',
 'bulan':'months','rilisan':'releases','label':'labels','jam':'hours',
 'Tiket Bantuan':'Support Tickets','Persetujuan · Pekerjaan':'Approvals · Work','Penarikan · Dashboard':'Withdrawals · Dashboard','Rilisan · Pekerjaan':'Releases · Work','Tiket Bantuan · Pekerjaan':'Support Tickets · Work','Manajemen Label · Pekerjaan':'Label Management · Work','Transaksi · Pekerjaan':'Transactions · Work',
 'Pergantian tanggal':'Date change','tanggal berganti':'at the date change','Periode bulanan':'Monthly period','Hari kerja':'Working days','hari kerja':'working days','Menjelang tanggal rilis':'Before the release date','hari kerja sebelum tanggal rilis':'working days before the release date',
 'Antrean layanan & WAMI':'Service & WAMI queue','Pengingat petugas, lalu batas antrean sebelum tampil sebagai perlu tindak lanjut.':'A staff reminder, then the queue limit before it shows as needing follow-up.','jam kerja · pengingat':'working hours · reminder','jam kerja · batas':'working hours · limit','Layanan Tambahan · WAMI':'Add-on Services · WAMI',
 'Pengerjaan layanan & WAMI':'Service & WAMI work','Pengingat dan batas pengerjaan setelah bahan lengkap.':'Reminder and work limit after materials are complete.','hari kerja · pengingat':'working days · reminder','hari kerja · batas':'working days · limit',
 'Menunggu bahan label':'Waiting for label materials','Pengingat label, pengingat kedua, lalu tindak lanjut petugas.':'A label reminder, a second reminder, then staff follow-up.','jam · pengingat':'hours · reminder','jam · pengingat kedua':'hours · second reminder','jam · tindak lanjut':'hours · follow-up',
 'Hasil pihak luar tidak dihitung sebagai waktu kerja staf; periksa kembali setelah jangka ini.':'External results are not counted as staff working time; check again after this period.',
 'Tindak lanjut distributor':'Distributor follow-up','Tiket yang diteruskan dipantau dan dicatat hasilnya per bagian.':'Forwarded tickets are monitored and their outcome is recorded per part.',
 'Batas perbaikan rilisan':'Release revision limit','Waktu label mengirim perbaikan sebelum pengajuan ditutup otomatis.':'Time for the label to send a revision before the submission closes automatically.'};
let root=null,lastSig='',K=[],RL=[],BG=[],HS=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CLOCK=sv('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),SEAL=sv('<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>'),BOOK=sv('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h7"/>'),HIST_I=sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const U=U137,fd=U.fd;
/* tr: teks data (AREAS/SERVICES/BADGES/MENU/USE/MODE) sesuai bahasa · LL: [id,en] dari model · one: satuan tunggal bahasa Inggris (1 working day) */
const tr=s=>U.en()&&s!=null&&EN[s]!=null?EN[s]:s;
const LL=x=>Array.isArray(x)?(U.en()?x[1]||x[0]:x[0]):x;
const one=(u,n)=>U.en()&&Number(n)===1?String(u).replace(/^(working hour|working day|hour|day|month|release|label)s\b/,'$1'):u;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const pname=id=>people.find(p=>p.id===id)?.name||(id?'Super Admin':$t('Sistem','System'));
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
  return {id:r.id,kind:'rule',t:LL(r.name),desc:LL(r.desc),type:tr(m[0]),use:tr(USE[r.id]||''),grp:$t('Tenggat tahap','Stage deadlines'),follow:false,fields:ed?[['value',tr(m[1]),1,Math.max(10,r.end||20)]]:[],vals:{value:r.value},show:ed?`${r.value} ${one(tr(m[1]),r.value)}`:tr(m[1]),draft:false};});
 const F=(id,t,desc,kind,fields,use)=>{const vals=Object.fromEntries(fields.map(f=>[f[0],kind==='wami'?w[f[0]]:p[f[0]]]));return {id,kind,t:tr(t),desc:tr(desc),type:fields.length>1?$t('Bertahap','Staged'):fields[0][1].includes('jam')?$t('Jam','Hours'):$t('Hari kerja','Working days'),use:tr(use),grp:$t('Tindak lanjut','Follow-ups'),follow:true,fields:fields.map(f=>[f[0],tr(f[1]),f[2],f[3]]),vals,show:fields.map(f=>vals[f[0]]).join(' / ')+' '+one(tr(fields.at(-1)[1]).replace(/ ·.*/,''),vals[fields.at(-1)[0]]),draft:!v[id]};};
 out.push(F('queue','Antrean layanan & WAMI','Pengingat petugas, lalu batas antrean sebelum tampil sebagai perlu tindak lanjut.','wami',[['queueWarn','jam kerja · pengingat',1,48],['queueDue','jam kerja · batas',1,96]],'Layanan Tambahan · WAMI'),
  F('work','Pengerjaan layanan & WAMI','Pengingat dan batas pengerjaan setelah bahan lengkap.','wami',[['workWarn','hari kerja · pengingat',1,30],['workDue','hari kerja · batas',1,60]],'Layanan Tambahan · WAMI'),
  F('materials','Menunggu bahan label','Pengingat label, pengingat kedua, lalu tindak lanjut petugas.','wami',[['labelWarn','jam · pengingat',1,72],['labelSecond','jam · pengingat kedua',1,168],['labelDue','jam · tindak lanjut',1,336]],'Layanan Tambahan · WAMI'),
  F('external','Menunggu WAMI','Hasil pihak luar tidak dihitung sebagai waktu kerja staf; periksa kembali setelah jangka ini.','wami',[['externalDays','hari kerja',1,30]],'Layanan Tambahan · WAMI'),
  F('distributor','Tindak lanjut distributor','Tiket yang diteruskan dipantau dan dicatat hasilnya per bagian.','top',[['ticketDays','hari kerja',1,20]],'Tiket Bantuan'),
  F('revision','Batas perbaikan rilisan','Waktu label mengirim perbaikan sebelum pengajuan ditutup otomatis.','top',[['revisionHours','jam',1,168]],'Rilisan'));
 return out;}
const DAYS={id:['Min','Sen','Sel','Rab','Kam','Jum','Sab'],en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']};
const dayS=i=>DAYS[U.en()?'en':'id'][i];
function calText(c){const d=[...(c.days||[])].sort();const run=d.length===5&&d.join()==='1,2,3,4,5'?$t('Senin–Jumat','Monday–Friday'):d.map(x=>dayS(x)).join(', ');return `${run} ${c.start}–${c.end} WIB${(c.holidays||[]).length?`${$t(' · libur ',' · holidays ')}${c.holidays.map(h=>fd(h)).join(', ')}`:''}`;}
/* ---------- Syarat lencana (data.v9.standards) ---------- */
const BADGES=[{id:'label',t:'Verifikasi Label',sub:'Centang biru di nama label',crit:[['labelMonths','Masa bergabung','bulan',12,60],['releases','Rilisan berhasil yang berbeda (12 bulan)','rilisan',1,200],['activeMonths','Bulan aktif merilis (dari 12 bulan)','bulan',1,12]],fixed:['Data dan kontak terkonfirmasi','Tanpa pembatasan pelanggaran; enam bulan tanpa penangguhan'],note:'Login, royalti yang masuk otomatis, pengunggahan ulang, dan jumlah pengikut tidak dihitung sebagai aktivitas. Pencapaian yang sudah didapat dipertahankan.'},
 {id:'master',t:'Verifikasi Master Multi-label',sub:'Centang untuk label induk',crit:[['masterMonths','Usia master','bulan',1,60],['managedMonths','Masa pengelolaan','bulan',1,60],['masterCount','Label anak terverifikasi minimal','label',1,50],['masterPercent','Label anak terverifikasi (persen)','%',1,100]],fixed:['Hubungan pengelolaan dan data seluruh label terkonfirmasi'],note:'Label baru memunculkan penanda pemeriksaan. Masa kelola tidak mengikuti usia label; menghapus hubungan tidak menghapus riwayat pelanggaran.'}];
const isMaster=l=>!!l.master;
function meets(b,std){const keep=data.v9.standards;if(std)data.v9.standards=std;try{return data.v9.labels.filter(l=>(b.id==='master')===isMaster(l)&&verification9(l).status==='verified').map(l=>l.name);}catch(err){return [];}finally{data.v9.standards=keep;}}
function badges(){return BADGES.map(b=>({...b,t:tr(b.t),sub:tr(b.sub),crit:b.crit.map(([key,t,u,mn,mx])=>[key,tr(t),tr(u),mn,mx]),fixed:b.fixed.map(tr),note:tr(b.note),total:data.v9.labels.filter(l=>(b.id==='master')===isMaster(l)).length,ok:meets(b)}));}
/* ---------- Riwayat (versi sungguhan) ---------- */
function history(){const a=area115('procedures'),out=[],v9v=data.v9.versions||[];
 const KW=$t('Aturan waktu','Time rules'),KB=$t('Syarat lencana','Badge requirements'),VV=n=>$t(`Versi ${n}`,`Version ${n}`);
 out.push({id:'p'+a.version,k:KW,v:VV(a.version),t:a.note&&a.version>1?a.note:$t('Aturan waktu awal prototipe','Initial prototype time rules'),at:iso(a.appliedAt||ten.now),by:a.actor||'',cur:true,chg:a.version>1?[$t('Berlaku untuk pekerjaan baru; tenggat pekerjaan berjalan ikut dihitung ulang bila disetujui saat terbit.','Applies to new work; deadlines of ongoing work are recalculated too if approved when publishing.')]:[$t('11 tenggat tahap, aturan tindak lanjut, dan kalender operasional.','11 stage deadlines, follow-up rules, and the operating calendar.')]});
 /* catatan bawaan model System115 untuk versi pertama hanya berbahasa Indonesia → tampilkan versi Inggrisnya */
 for(const h of a.history||[])out.push({id:h.id,k:KW,v:VV(h.version),t:h.note?(h.note==='Versi awal'?$t('Versi awal','Initial version'):h.note):$t('Versi sebelumnya','Previous version'),at:iso(h.at),by:h.actor||'',chg:[$t('Digantikan oleh versi berikutnya.','Replaced by the next version.')]});
 const s=data.v9.standards;out.push({id:'s'+s.version,k:KB,v:VV(s.version),t:s.version>1?$t('Syarat lencana diperbarui','Badge requirements updated'):$t('Syarat lencana awal prototipe','Initial prototype badge requirements'),at:iso(s.at137||v9v.at(-1)?.at137||''),by:s.by137||'',cur:true,chg:[$t(`Label: ${s.labelMonths} bulan bergabung, ${s.releases} rilisan, ${s.activeMonths} bulan aktif.`,`Label: ${s.labelMonths} months since joining, ${s.releases} releases, ${s.activeMonths} active months.`),$t(`Master: ${s.masterMonths} bulan, kelola ${s.managedMonths} bulan, minimal ${s.masterCount} label, ${s.masterPercent}%.`,`Master: ${s.masterMonths} months, managed ${s.managedMonths} months, at least ${s.masterCount} labels, ${s.masterPercent}%.`)]});
 for(const v of v9v.slice().reverse())out.push({id:'s'+v.version+'old',k:KB,v:VV(v.version),t:$t('Versi sebelumnya','Previous version'),at:iso(v.at137||''),by:v.by137||'',chg:[$t(`Label: ${v.standards.labelMonths} bulan, ${v.standards.releases} rilisan, ${v.standards.activeMonths} bulan aktif.`,`Label: ${v.standards.labelMonths} months, ${v.standards.releases} releases, ${v.standards.activeMonths} active months.`)]});
 for(const h of store().history)out.push({id:'v'+h.at+h.id,k:KW,v:$t('Diverifikasi','Verified'),t:h.text,at:iso(h.at),by:h.by,chg:[$t('Nilai contoh dipastikan dan berlaku.','Sample value confirmed and in effect.')]});
 return out.sort((a,b)=>(b.at||'').localeCompare(a.at||''));}
/* ---------- muat ---------- */
function load(){const n=counts();K=AREAS.flatMap(([a,an,menu,list])=>list.map(([t,key,c,mean,on,off])=>({id:key,a,an:tr(an),menu:tr(MENU[a]||menu),t:tr(t),c,mean:tr(mean),on:tr(on),off:tr(off),n:n[key]||0})));RL=rules();BG=badges();HS=history();}
const TOP=()=>K.filter(s=>['c-red','c-or'].includes(s.c)&&s.n>0).sort((a,b)=>b.n-a.n).slice(0,5);
const drafts=()=>RL.filter(r=>r.draft).length;
function items(){
 if(S.tab==='kamus'){let r=K;if(S.q)r=r.filter(s=>(s.t+' '+s.id+' '+s.mean+' '+s.an).toLowerCase().includes(S.q));return r;}
 if(S.tab==='waktu'){let r=RL;if(S.q)r=r.filter(o=>(o.t+' '+o.desc).toLowerCase().includes(S.q));return r;}
 if(S.tab==='lencana')return BG;if(S.tab==='layanan')return SERVICES.map(x=>({id:x[0],x}));return HS;}
function tabs(){const TB=[['kamus',$t('Kamus','Dictionary'),K.length],['waktu',$t('Aturan waktu','Time rules'),RL.length],['lencana',$t('Syarat lencana','Badge requirements'),BG.length],['layanan',$t('Standar layanan','Service standards'),SERVICES.length],['riwayat',$t('Riwayat','History'),'']];$('tabs').innerHTML=TB.map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}${n!==''?`<b>${n}</b>`:''}</button>`).join('');}
function band(){const top=TOP(),a=area115('procedures'),d=drafts();
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t(`Buku aturan · Aturan waktu versi ${a.version} · Syarat lencana versi ${data.v9.standards.version}`,`Rulebook · Time rules version ${a.version} · Badge requirements version ${data.v9.standards.version}`)}</div>
  <h2>${$t(`${K.length} status, ${RL.length} aturan waktu, ${BG.length} syarat lencana`,`${K.length} ${K.length===1?'status':'statuses'}, ${RL.length} ${RL.length===1?'time rule':'time rules'}, ${BG.length} ${BG.length===1?'badge requirement':'badge requirements'}`)}</h2>
  <p>${$t('Aturan waktu berlaku sejak ','Time rules in effect since ')}${a.appliedAt?fd(iso(a.appliedAt)):$t('awal prototipe','the start of the prototype')} · ${d?$t(`${d} aturan tindak lanjut masih nilai contoh`,`${d} follow-up ${d===1?'rule still uses a sample value':'rules still use sample values'}`):$t('semua nilai sudah diverifikasi','all values verified')}</p>
  <div class="acts"><button class="wbtn" data-tab="waktu">${$t('Aturan waktu','Time rules')} ${ARROW}</button><button class="gbtn" data-tab="riwayat">${$t('Riwayat perubahan','Change history')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${K.filter(s=>s.n>0).length}</b><span>${$t('status sedang dipakai','statuses in use')}</span></div><div class="sbox"><b class="n">${d}</b><span>${$t('nilai contoh','sample values')}</span></div></div></div>
  ${top.length?`<div class="flow">${top.map(s=>`<button class="fn${s.c==='c-red'?' hot':''}" data-status="${s.id}"><span class="dot n">${s.n}</span><span class="t">${E(s.t)}</span><span class="d">${E(s.an.toLowerCase())}</span></button>`).join('')}</div>`:''}`;}
const find=ph=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${ph}" value="${E(S.q)}"></label>`;
function list(){const r=items();let h='';
 if(S.tab==='kamus'){h+=`<div class="ch"><h3>${$t('Kamus status','Status dictionary')} <small class="n">${r.length}</small></h3>${find($t('Cari status atau artinya','Search statuses or meanings'))}</div>`;let cur='';
  r.forEach((s,i)=>{if(s.a!==cur){cur=s.a;h+=`<div class="gh"><i style="background:var(--muted)"></i><b style="font-weight:400;color:var(--text)">${E(s.an)}</b> · ${r.filter(x=>x.a===cur).length}</div>`;}
   h+=`<div class="it${S.sel.kamus===s.id?' sel':''}" data-id="${s.id}" style="--i:${i}"><span class="ty">${BOOK}</span><div style="min-width:0"><div class="t1">${chip(E(s.t),s.c)}<span class="mono">${s.id}</span></div><div class="t2">${E(s.mean)}</div></div><div class="rgt">${s.n?`<span class="cnt">${s.n}</span>`:''}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ditemukan','Nothing found')}</b>${$t('Coba kata lain.','Try another word.')}</div>`;}
 else if(S.tab==='waktu'){const c=policy115().calendar;h+=`<div class="ch"><h3>${$t('Aturan waktu','Time rules')} <small class="n">${r.length}</small></h3>${find($t('Cari aturan','Search rules'))}</div><div class="cal">${CLOCK}<span><b>${$t('Kalender operasional','Operating calendar')}</b> · ${E(calText(c))}</span>${SA()?`<button class="sbtn" data-cal>${$t('Ubah','Edit')}</button>`:''}</div>`;let grp='';
  r.forEach((x,i)=>{if(x.grp!==grp){grp=x.grp;h+=`<div class="gh"><i style="background:var(--muted)"></i><b style="font-weight:400;color:var(--text)">${grp}</b></div>`;}const ch=S.val[x.id]&&Object.keys(S.val[x.id]).some(k=>S.val[x.id][k]!==x.vals[k]);
   h+=`<div class="it${S.sel.waktu===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${CLOCK}</span><div style="min-width:0"><div class="t1">${E(x.t)} ${x.draft?chip($t('Nilai contoh','Sample value'),'c-or'):''}${ch?chip($t('Diubah','Changed'),'c-bl'):''}</div><div class="t2">${E(x.type)} · ${E(x.use)}</div></div><div class="rgt"><span class="val">${E(x.show)}</span></div></div>`;});}
 else if(S.tab==='lencana'){h+=`<div class="ch"><h3>${$t('Syarat lencana','Badge requirements')}</h3></div>`;
  r.forEach((x,i)=>{const nc=x.crit.length+x.fixed.length;h+=`<div class="it${S.sel.lencana===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty" style="color:#2d96e9">${SEAL}</span><div style="min-width:0"><div class="t1">${x.t}</div><div class="t2">${x.sub} · ${nc} ${$t('syarat',nc===1?'requirement':'requirements')}</div><div class="meter"><i style="width:${x.total?x.ok.length/x.total*100:0}%"></i></div><div class="t2">${$t(`${x.ok.length} dari ${x.total} memenuhi`,`${x.ok.length} of ${x.total} qualify`)}</div></div></div>`;});}
 else if(S.tab==='layanan'){h+=`<div class="ch"><h3>${$t('Standar layanan','Service standards')}</h3></div>`;
  r.forEach((o,i)=>{const x=o.x,ns=(AREAS.find(a=>a[0]===x[4])||[,,,[]])[3].length;h+=`<div class="it${S.sel.layanan===x[0]?' sel':''}" data-id="${x[0]}" style="--i:${i}"><span class="ty">${BOOK}</span><div style="min-width:0"><div class="t1">${E(tr(x[1]))} ${x[2]?chip($t('Draf','Draft'),'c-or'):''}</div><div class="t2">${$t(`${x[3].length} ketentuan · ${ns} status · ${x[5].length} aturan waktu`,`${x[3].length} ${x[3].length===1?'term':'terms'} · ${ns} ${ns===1?'status':'statuses'} · ${x[5].length} ${x[5].length===1?'time rule':'time rules'}`)}</div></div></div>`;});
  h+=`<div class="note" style="margin-top:14px">${$t('Penggunaan Kredit pindah ke Sistem › Paket & Layanan. ','Credit usage moved to System › Plans & Services. ')}<button class="lnk" data-credit>${$t('Buka panduan kredit','Open the credit guide')}</button></div>`;}
 else{h+=`<div class="ch"><h3>${$t('Riwayat perubahan','Change history')} <small class="n">${r.length}</small></h3></div>`;
  r.forEach((x,i)=>{h+=`<div class="it${S.sel.riwayat===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${HIST_I}</span><div style="min-width:0"><div class="t1">${E(x.k)} ${chip(x.v,x.cur?'c-gr':'')}</div><div class="t2">${E(x.t)}${x.at?` · ${fd(x.at)}`:''}</div></div><div class="rgt"><span class="mini">${E(x.by?pini(x.by):'SY')}</span></div></div>`;});}
 $('list').innerHTML=h;}
/* ---------- rincian ---------- */
function kamusPane(s){const sib=K.filter(x=>x.a===s.a);
 const COL={'c-red':['Merah · terlambat atau menghambat.','Red · overdue or blocking.'],'c-or':['Oranye · perlu perhatian atau perbaikan.','Orange · needs attention or a fix.'],'c-bl':['Biru · informasi untuk ditindaklanjuti.','Blue · information to act on.'],'c-gr':['Hijau · selesai atau normal.','Green · done or normal.'],'':['Abu-abu · arsip, tidak perlu tindakan.','Grey · archived, no action needed.']}[s.c];
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Kamus','Dictionary')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${BOOK}</span>${E(s.an)} · <span class="mono">${s.id}</span></div><div class="bigchip">${chip(E(s.t),s.c)}</div>
  <p class="lead">${E(s.mean)}</p><div class="hrow">${s.n?`<button class="btn pri" data-nav="${NAV[s.a]||''}">${$t(`Lihat ${s.n} di ${E(s.menu)}`,`View ${s.n} in ${E(s.menu)}`)} ${ARROW}</button>`:`<span class="where">${$t('Saat ini tidak ada data berstatus ini.','Nothing has this status right now.')}</span>`}</div></div>
  <div class="pb">${sec(0,$t('Kapan muncul','When it appears'),`<p class="para">${E(s.on)}</p>`)}${sec(1,$t('Kapan hilang','When it clears'),`<p class="para">${E(s.off)}</p>`)}
  ${sec(2,$t('Warna','Colour'),`<p class="para">${COL?LL(COL):COL}</p>`)}
  ${sec(3,$t('Urutan dalam ','Order in ')+E(s.an),`<div class="flowline">${sib.map(x=>`<span class="${x.id===s.id?'on':''}">${chip(E(x.t),x.c)}</span>`).join('<i>›</i>')}</div>`)}
  ${sec(4,$t('Dipakai di','Used in'),`<div class="uses"><div>${BOOK}<span>${E(s.menu)}<small>${s.n?$t(`${s.n} saat ini`,`${s.n} now`):$t('tidak ada saat ini','none now')}</small></span></div>${s.a==='work'?`<div>${BOOK}<span>Dashboard<small>${$t('kartu Sorotan dan Siklus','Highlights and Cycle cards')}</small></span></div><div>${CLOCK}<span>${$t('Aturan waktu','Time rules')}<small>${$t('menentukan kapan status ini muncul','decide when this status appears')}</small></span></div>`:''}</div>`)}</div>`;}
const cur=x=>({...x.vals,...(S.val[x.id]||{})});
const changed=x=>{const v=cur(x);return Object.keys(x.vals).some(k=>v[k]!==x.vals[k]);};
function nextPolicy(x,v){const p=System115.cp(policy115());if(x.kind==='rule')p.rules.find(r=>r.id===x.id).value=v.value;else if(x.kind==='wami')p.wami={...p.wami,...v};else if(x.kind==='top')Object.assign(p,v);else if(x.kind==='cal')p.calendar=v;return p;}
function impact(p){try{const now=ten.now,at=v=>typeof v==='number'?v:Date.parse(v);const r=impact115(p);return {n:r.length,late:r.filter(i=>at(i.newAt)<now&&!(at(i.oldAt)<now)).length,free:r.filter(i=>at(i.oldAt)<now&&!(at(i.newAt)<now)).length};}catch(err){return {n:0,late:0,free:0};}}
function impactHtml(x){if(!changed(x))return '';const m=impact(nextPolicy(x,cur(x)));return m.n?`<div class="impact ${m.late?'r':'g'}">${chip($t(`${m.n} pekerjaan`,`${m.n} ${m.n===1?'work item':'work items'}`),m.late?'c-red':'c-gr')}${$t(' tenggatnya ikut berubah',' with a changed deadline')}${m.late?$t(` · <b>${m.late}</b> menjadi terlambat hari ini`,` · <b>${m.late}</b> become overdue today`):''}${m.free?$t(` · <b>${m.free}</b> tidak lagi terlambat`,` · <b>${m.free}</b> no longer overdue`):''}.</div>`:`<div class="impact g">${chip($t('0 pekerjaan','0 work items'),'c-gr')}${$t(' Tidak ada pekerjaan berjalan yang tenggatnya berubah; berlaku untuk pekerjaan berikutnya.',' No deadlines of ongoing work change; it applies to upcoming work.')}</div>`;}
function waktuPane(x){const v=cur(x),ch=changed(x),sa=SA(),a=area115('procedures');
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Aturan waktu','Time rules')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${CLOCK}</span>${E(x.type)}</div><h2>${E(x.t)}</h2>
  <div class="meta">${x.draft?chip($t('Nilai contoh · perlu verifikasi','Sample value · needs verification'),'c-or'):chip($t(`Berlaku · versi ${a.version}`,`In effect · version ${a.version}`),'c-gr')}<span>${$t('dipakai di','used in')} ${E(x.use)}</span></div>
  ${x.fields.length?x.fields.map(([k,u,mn,mx])=>`<div class="stepper${sa?'':' ro'}">${sa?`<button data-step="${k}|-1|${mn}|${mx}" aria-label="${$t('Kurangi','Decrease')}">−</button>`:''}<b class="n">${v[k]}</b><span>${E(one(u,v[k]))}</span>${sa?`<button data-step="${k}|1|${mn}|${mx}" aria-label="${$t('Tambah','Increase')}">+</button>`:''}</div>`).join(''):`<div class="stepper ro"><b>${E(x.show)}</b></div>`}
  ${impactHtml(x)}
  <div class="hrow">${sa&&ch?`<button class="btn pri" data-publish="${x.id}">${$t('Terbitkan sebagai versi','Publish as version')} ${a.version+1}</button><button class="btn" data-reset="${x.id}">${$t('Batal','Cancel')}</button>`:sa&&x.draft?`<button class="btn pri" data-verify="${x.id}">${$t('Tandai sudah diverifikasi','Mark as verified')}</button>`:''}</div></div>
  <div class="pb">${sec(0,$t('Cara kerja','How it works'),`<p class="para">${E(x.desc)}</p>`)}${sec(1,$t('Status yang dipengaruhi','Affected statuses'),`<div class="flowline">${chip(tr('Prioritas'),'c-or')}<i>›</i>${chip(tr('Lewat tenggat'),'c-red')}${x.follow?`<i>›</i>${chip(tr('Perlu tindak lanjut'),'c-or')}`:''}</div>`)}
  ${sec(2,$t('Riwayat','History'),`<div class="tl"><div><span class="mini">${E(pini(a.actor))}</span><span>${$t(`Versi ${a.version}`,`Version ${a.version}`)}${a.note&&a.version>1?' · '+E(a.note):$t(' · nilai awal',' · initial values')}<small>${a.appliedAt?fd(iso(a.appliedAt)):$t('awal prototipe','start of the prototype')}</small></span></div>${store().verified[x.id]?`<div><span class="mini">${E(pini(store().verified[x.id].by))}</span><span>${$t('Diverifikasi','Verified')}<small>${fd(iso(store().verified[x.id].at))}</small></span></div>`:''}</div>`)}</div>`;}
function calPane(){const calHd=()=>`<div class="hd"><button class="back" data-back>${BACK}${$t('Aturan waktu','Time rules')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${CLOCK}</span>${$t('Kalender','Calendar')}</div><h2>${$t('Kalender operasional','Operating calendar')}</h2><div class="meta">${chip($t(`Berlaku · versi ${area115('procedures').version}`,`In effect · version ${area115('procedures').version}`),'c-gr')}<span>${$t('dipakai semua aturan hari kerja','used by all working-day rules')}</span></div></div>`;
 if(!SA()){const c=policy115().calendar;return `${calHd()}<div class="pb">${sec(0,$t('Jadwal','Schedule'),`<p class="para">${E(calText(c))}</p>`)}</div>`;}const c=policy115().calendar,v=S.val.cal||{days:c.days.slice(),start:c.start,end:c.end,holidays:(c.holidays||[]).join(', ')};
 return `${calHd()}
  <div class="pb">${sec(0,$t('Hari kerja','Working days'),`<div class="opts">${[1,2,3,4,5,6,0].map(d=>`<button data-day="${d}" aria-pressed="${v.days.includes(d)}">${dayS(d)}</button>`).join('')}</div>`)}
  ${sec(1,$t('Jam kerja','Working hours'),`<div class="f2"><label class="fld">${$t('Mulai','Start')}<input id="c-start" type="time" value="${E(v.start)}"></label><label class="fld">${$t('Selesai','End')}<input id="c-end" type="time" value="${E(v.end)}"></label></div>`)}
  ${sec(2,$t('Hari libur','Holidays'),`<label class="fld">${$t('Tanggal (pisahkan dengan koma)','Dates (separate with commas)')}<input id="c-hol" value="${E(v.holidays)}" placeholder="2026-12-25, 2027-01-01"></label>`)}
  <div class="hrow"><button class="btn pri" data-publish="cal">${$t('Terbitkan sebagai versi','Publish as version')} ${area115('procedures').version+1}</button><button class="btn" data-reset="cal">${$t('Batal','Cancel')}</button></div></div>`;}
function lencanaPane(x){const sa=SA(),bv=S.bval[x.id]||{},std={...data.v9.standards,...bv},delta=Object.keys(bv).some(k=>bv[k]!==data.v9.standards[k]);let k=0;
 const after=delta?meets(x,std):x.ok,gain=after.filter(n=>!x.ok.includes(n)),lose=x.ok.filter(n=>!after.includes(n));
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Syarat lencana','Badge requirements')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px;color:#2d96e9">${SEAL}</span>${x.sub}</div><h2>${x.t}</h2>
  <div class="meta">${chip($t(`Berlaku · versi ${data.v9.standards.version}`,`In effect · version ${data.v9.standards.version}`),'c-gr')}<span>${$t(`${x.ok.length} dari ${x.total} memenuhi`,`${x.ok.length} of ${x.total} qualify`)}</span></div>
  <div class="hrow">${sa&&delta?`<button class="btn pri" data-bpublish="${x.id}">${$t('Terbitkan sebagai versi','Publish as version')} ${data.v9.standards.version+1}</button><button class="btn" data-breset="${x.id}">${$t('Batal','Cancel')}</button>`:sa?`<span class="where">${$t('Ubah ambang di bawah untuk melihat dampaknya.','Change the thresholds below to see the impact.')}</span>`:''}</div></div>
  <div class="pb">${sec(k++,$t('Syarat','Requirements'),`<div class="crit">${x.crit.map(([key,t,u,mn,mx])=>`<div><span>${E(t)}</span><div class="stepper sm${sa?'':' ro'}">${sa?`<button data-bstep="${x.id}|${key}|-1|${mn}|${mx}">−</button>`:''}<b class="n">${std[key]}</b><span>${E(one(u,std[key]))}</span>${sa?`<button data-bstep="${x.id}|${key}|1|${mn}|${mx}">+</button>`:''}</div></div>`).join('')}${x.fixed.map(t=>`<div><span>${E(t)}</span><b class="okc">${$t('wajib','required')}</b></div>`).join('')}</div><p class="note">${E(x.note)}</p>`)}
  ${delta?sec(k++,$t('Dampak bila diterbitkan','Impact if published'),gain.length||lose.length?`${gain.length?`<div class="impact g">${chip('+'+gain.length,'c-gr')}${$t(' akan mendapat centang: ',' will gain the check: ')}<b>${E(gain.join(', '))}</b></div>`:''}${lose.length?`<div class="impact r">${chip('−'+lose.length,'c-red')}${$t(' akan kehilangan centang: ',' will lose the check: ')}<b>${E(lose.join(', '))}</b></div>`:''}`:`<div class="impact g">${chip('0','c-gr')}${$t(' Tidak ada label yang berubah status. Pencapaian yang sudah didapat dipertahankan.',' No label changes status. Badges already earned are kept.')}</div>`):''}
  ${sec(k++,$t('Saat ini memenuhi','Currently qualifying'),x.ok.length?`<div class="subl">${x.ok.map(n=>`<div><span class="lav" style="--h:${hue(n)}">${E(n.split(' ').map(w=>w[0]).join('').slice(0,2))}</span>${E(n)}<small>${$t('terverifikasi','verified')}</small></div>`).join('')}</div>`:`<p class="where">${$t('Belum ada.','None yet.')}</p>`)}</div>`;}
function layananPane(x){const area=AREAS.find(a=>a[0]===x[4]);
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Standar layanan','Service standards')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${BOOK}</span>${$t('Standar layanan','Service standards')}</div><h2>${E(tr(x[1]))}</h2>
  <div class="meta">${x[2]?chip($t('Draf · perlu verifikasi staf','Draft · needs staff verification'),'c-or'):chip($t('Berlaku','In effect'),'c-gr')}<span>${x[3].length} ${$t('ketentuan',x[3].length===1?'term':'terms')}</span></div></div>
  <div class="pb">${sec(0,$t('Ketentuan','Terms'),`<ol class="rules">${x[3].map(t=>`<li>${E(tr(t))}</li>`).join('')}</ol>`)}
  ${area?sec(1,$t('Alur status','Status flow'),`<div class="flowline">${area[3].map(s=>chip(E(tr(s[0])),s[2])).join('<i>›</i>')}</div>`):''}
  ${x[5].length?sec(2,$t('Aturan waktu terkait','Related time rules'),`<div class="uses">${x[5].map(id=>{const r=RL.find(r=>r.id===id)||RL.find(r=>r.id===({feedback:'materials'}[id]||''));return r?`<div data-rule="${r.id}" style="cursor:pointer">${CLOCK}<span>${E(r.t)}<small>${E(r.show)}</small></span></div>`:'';}).join('')}</div>`):''}</div>`;}
function riwayatPane(x){return `<div class="hd"><button class="back" data-back>${BACK}${$t('Riwayat','History')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${HIST_I}</span>${E(x.k)}${x.at?' · '+fd(x.at):''}</div><h2>${E(x.t)}</h2><div class="meta">${chip(x.v,x.cur?'c-gr':'')}<span>${$t('oleh','by')} ${E(x.by?pname(x.by):$t('sistem','system'))}</span></div></div>
  <div class="pb">${sec(0,$t('Isi','Contents'),`<div class="chg">${x.chg.map(t=>`<div><span class="chip c-bl"><i></i>${x.cur?$t('Berlaku','In effect'):$t('Arsip','Archived')}</span><span>${E(t)}</span></div>`).join('')}</div>`)}</div>`;}
let lastPane='';
function pane(){const r=items(),id=S.sel[S.tab];let html='';
 if(S.tab==='waktu'&&id==='cal')html=calPane();else{const o=r.find(z=>z.id===id);if(o)html=S.tab==='kamus'?kamusPane(o):S.tab==='waktu'?waktuPane(o):S.tab==='lencana'?lencanaPane(o):S.tab==='layanan'?layananPane(o.x):riwayatPane(o);}
 $('pin').innerHTML=html||`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih item','Select an item')}</b>${$t('Rinciannya tampil di sini.','Details appear here.')}</div>`;
 const key=S.tab+id;if(key!==lastPane){$('pane').classList.remove('swap','play');void $('pane').offsetWidth;$('pane').classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function paint(){const a=root.activeElement,id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;const r=items();if(wide()&&(!S.sel[S.tab]||(S.sel[S.tab]!=='cal'&&!r.some(z=>z.id===S.sel[S.tab]))))S.sel[S.tab]=r[0]?.id;
 tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function toast(t){toast137(DEF,t);}
function open(){S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<80)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
/* ---------- terbitkan (fungsi asli Sistem › Prosedur) ---------- */
function publish(x,v,label){if(!SA()){toast($t('Hanya Super Admin','Super Admin only'));return false;}const a=area115('procedures');if(a.draft){toast($t('Ada draf di Sistem › Prosedur & Pengingat. Terapkan atau buang dulu.','There is a draft in System › Procedures & Reminders. Apply or discard it first.'));return false;}
 const p=nextPolicy(x,v),imp=impact115(p),note=`${$t('Standar & Penanda','Standards & Indicators')} · ${label}`;
 try{atomic115('save',{area:'procedures',version:a.version,draftVersion:a.draftVersion,value:p,note});}catch(err){toast(String(err?.message||err));return false;}
 const b=area115('procedures');try{atomic115('publish',{area:'procedures',version:b.version,draftVersion:b.draftVersion,note,ongoing:imp.length>0,confirmed:true,impactToken:JSON.stringify(impact115(b.draft))});}
 catch(err){try{const c=area115('procedures');atomic115('discard',{area:'procedures',version:c.version,draftVersion:c.draftVersion,note:$t('Batal terbit','Publishing cancelled')});}catch(e){}toast(String(err?.message||err));return false;}
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
    if(!days.length){toast($t('Pilih minimal satu hari kerja','Select at least one working day'));return;}if(!start||!end||end<=start){toast($t('Jam selesai harus setelah jam mulai','The end time must be after the start time'));return;}if(hol.some(h=>!/^\d{4}-\d{2}-\d{2}$/.test(h))){toast($t('Tulis tanggal libur dengan format 2026-12-25','Write holiday dates in the format 2026-12-25'));return;}
    ok=publish({kind:'cal'},{days,start,end,holidays:hol},$t('Kalender operasional diubah','Operating calendar changed'));msg=$t('Kalender diterbitkan · tenggat pekerjaan dihitung ulang','Calendar published · work deadlines recalculated');}
   else{const x=RL.find(r=>r.id===id),v=cur(x);ok=publish(x,v,`${x.t}: ${Object.keys(x.vals).filter(k=>x.vals[k]!==v[k]).map(k=>`${x.vals[k]} → ${v[k]}`).join(', ')}`);msg=$t(`${x.t} diterbitkan sebagai versi ${area115('procedures').version}`,`${x.t} published as version ${area115('procedures').version}`);}
   if(ok){delete S.val[id];lastSig='';load();paint();toast(msg);}return;}
  const rs=t.closest('[data-reset]');if(rs){delete S.val[rs.dataset.reset];if(rs.dataset.reset==='cal'){S.sel.waktu=RL[0]?.id;}paint();return;}
  const vf=t.closest('[data-verify]');if(vf){if(!SA())return;const x=RL.find(r=>r.id===vf.dataset.verify);const s=store();const f=()=>{s.verified[x.id]={at:ten.now,by:state.user};s.history.push({id:x.id,text:$t(`${x.t} diverifikasi (${x.show})`,`${x.t} verified (${x.show})`),at:ten.now,by:state.user});};typeof atomic10==='function'?atomic10(f):(f(),save10());lastSig='';load();paint();toast($t(`${x.t} ditandai sudah diverifikasi`,`${x.t} marked as verified`));return;}
  const bp=t.closest('[data-bpublish]');if(bp){if(!SA())return;const b=bp.dataset.bpublish,draft={...data.v9.standards,...(S.bval[b]||{})};try{const f=()=>{data.v9.versions.push({version:data.v9.standards.version,date:typeof stamp8==='function'?stamp8():'',standards:JSON.parse(JSON.stringify(data.v9.standards)),at137:data.v9.standards.at137||null,by137:data.v9.standards.by137||null});data.v9.standards={...draft,version:data.v9.standards.version+1,at137:ten.now,by137:state.user};};typeof atomic10==='function'?atomic10(f):f();if(typeof save8==='function')save8();else save10();}catch(err){toast(String(err?.message||err));return;}
   delete S.bval[b];lastSig='';load();paint();toast($t(`Syarat lencana diterbitkan sebagai versi ${data.v9.standards.version}`,`Badge requirements published as version ${data.v9.standards.version}`));return;}
  const br=t.closest('[data-breset]');if(br){delete S.bval[br.dataset.breset];paint();return;}
  const nv=t.closest('[data-nav]');if(nv){if(!nv.dataset.nav||!go137(nv.dataset.nav))toast($t('Buka menu terkait','Open the related menu'));return;}
  if(t.closest('[data-credit]')){try{route11('credit-guide11');}catch(err){toast($t('Panduan kredit belum tersedia','The credit guide is not available yet'));}return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){S.sel[S.tab]=it.dataset.id;open();return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function intake(){if(window.stdTab137){S.tab=window.stdTab137;S.q='';S.read=false;window.stdTab137=null;lastSig='';}}
const sig=()=>K.map(s=>s.n).join(',')+'#'+area115('procedures').version+':'+area115('procedures').draftVersion+'#'+JSON.stringify(data.v9.standards)+'#'+store().history.length+'#'+U.today()+ten.role+state.user+(SA()?'s':'')+state.lang;
const staff=()=>!isLabel10()&&state.mode==='platform'&&!state.preview;
const DEF={id:'standards',css:STYLE,html:HTML,
 i18n:{'Standar & Penanda':'Standards & Indicators','Buku aturan operasional: arti setiap status, kapan sesuatu dianggap terlambat, dan syarat lencana.':'The operating rulebook: what each status means, when something counts as overdue, and badge requirements.'},
 when:()=>staff()&&(state.page==='standards9'&&!!me().super||state.page==='module'&&typeof v4==='object'&&v4.module==='standards119'),
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Standar & Penanda */
DEF.sum=function(){load();const d=drafts();return {K:K.length,RL:RL.length,BG:BG.length,d,line:$t(`${K.length} status · ${RL.length} aturan waktu · ${d?`${d} aturan tindak lanjut masih nilai contoh`:'semua nilai sudah diverifikasi'}`,`${K.length} statuses · ${RL.length} time rules · ${d?`${d} follow-up ${d===1?'rule still uses a sample value':'rules still use sample values'}`:'all values verified'}`),tone:d?'o':'g'};};
page137(DEF);
const pageBefore=standardsPage9;standardsPage9=function(){if(DEF.when())return '';return pageBefore.apply(this,arguments);};
if(typeof standardsPage119==='function'){const b119=standardsPage119;standardsPage119=function(){if(DEF.when())return '';return b119.apply(this,arguments);};}
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
})();
