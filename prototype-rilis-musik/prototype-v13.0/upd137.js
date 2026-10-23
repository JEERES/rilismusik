/* v1.1.0-dev.38 — Pembaruan dirancang ulang (rancangan disetujui 21 Okt 2026, mock up1).
   Tab Pembaruan fitur (butir yang dikelola: Draf · Ditahan · Usulan dari rilis · Terbit · Ditarik, audiens Semua label /
   Tim internal / Label paket lama) · Pengumuman (Berita dari Kotak Masuk pindah ke sini: draf, terjadwal, terbit, wajib baca
   dengan daftar yang sudah membaca; jadwal pemeliharaan ikut tampil). Halaman Pembaruan label membaca butir yang sama.
   Data: ten.updates137 (butir & tanda "Baru" per label), tr132().news (pengumuman), system115 maintenance (jadwal).
   v1.1.0-dev.43 — dua bahasa: teks UI lewat $t(); butir awal punya teks Inggris (TXT) yang dipakai selama kalimatnya belum
   diubah Super Admin; pengumuman [id,en] dan usulan dari RM_CHANGELOG tampil sesuai bahasa. Data yang ditulis tetap seperti semula. */
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
.cmpw{border-radius:14px;background:var(--soft);padding:4px 12px}
.cmpt{width:100%;border-collapse:collapse;font-size:13.5px}
.cmpt th{font-weight:400;color:var(--muted);font-size:12px;text-align:left;padding:9px 8px 9px 0}
.cmpt thead th{font-size:12px}
.cmpt td{padding:9px 8px 9px 0;border-top:1px solid var(--line);overflow-wrap:anywhere}
.cmpt tbody th{border-top:1px solid var(--line)}
.cmpt td.mono{font-size:11.5px}
.cmpt td.df{color:var(--red)}
.pickrow{width:100%;text-align:left;cursor:pointer}
.pickrow:hover{box-shadow:inset 0 0 0 1px var(--line)}
.parts{display:grid;gap:6px}
.pt{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;background:var(--white);font-size:14px;flex-wrap:wrap}
.pt>span:not(.pa){display:grid;gap:2px;min-width:0;flex:1}.pt small{color:var(--muted);font-size:12px}.pt small .mono{font-size:11px}
.pb2{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:500;flex:none;color:#fff;background:transparent;box-shadow:inset 0 0 0 1.5px var(--faint)}
.pb2.ok{background:var(--green);box-shadow:none}.pb2.fail{background:var(--red);box-shadow:none}
.pa{display:flex;gap:6px;margin-left:auto}
.files{display:grid;gap:6px;margin-top:10px}
.cmpt td.old{color:var(--muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--red) 60%,transparent)}
.thread .bub{max-width:88%}
.bub.me2{justify-self:end;background:color-mix(in srgb,var(--blue) 12%,var(--soft));border-bottom-right-radius:6px}
.bub.int{justify-self:end;background:transparent;box-shadow:inset 0 0 0 1.5px var(--line);border-style:dashed;border-bottom-right-radius:6px}
.bub .bw{display:block;margin:0 0 3px!important;font-size:11.5px;color:var(--muted)}
.comp{display:grid;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.comp textarea{font:inherit;font-size:14px;color:var(--text);background:var(--white);border:0;box-shadow:inset 0 0 0 1px var(--line);border-radius:12px;padding:10px 12px;min-height:64px;resize:vertical;outline:0}
.comp textarea:focus{box-shadow:inset 0 0 0 2px var(--blue)}
.seg2{display:inline-flex;gap:4px;background:var(--soft);border-radius:99px;padding:3px;justify-self:start}
.seg2 button{font-size:12.5px;padding:6px 12px;border-radius:99px;color:var(--muted)}
.seg2 button[aria-pressed=true]{background:var(--white);color:var(--text);box-shadow:0 1px 2px #0000001a}
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
.lprev{display:grid;gap:8px;padding:14px 16px;border-radius:16px;background:var(--white);box-shadow:inset 0 0 0 1px var(--line);font-size:14px;line-height:1.55}
.lprev+.lprev{margin-top:8px}
.lprev p{margin:0}.lprev b{font-weight:500}
.lprev.off{background:var(--soft);box-shadow:none}
.lph{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.lph small{color:var(--muted);font-size:12px}
.ldot{width:8px;height:8px;border-radius:50%;background:#ff4d6a;box-shadow:0 0 0 3px #ff4d6a33;flex:none}
.lrow{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:14px;line-height:1.5}
.lrow+.lrow{margin-top:6px}.lrow .chip{margin-top:2px}.lrow .ldot{margin-top:7px}
.seg2.aud{flex-wrap:wrap}
.modalprev{padding:22px;border-radius:18px;background:color-mix(in srgb,var(--text) 30%,transparent);display:grid;place-items:center}
.mp{display:grid;gap:8px;max-width:360px;width:100%;padding:18px;border-radius:16px;background:var(--white);box-shadow:0 18px 40px -18px #0008;font-size:14px;line-height:1.55}
.mp small{color:var(--muted);font-size:12px}.mp b{font-weight:500;font-size:16px}.mp p{margin:0}
.tg{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:var(--text);line-height:1.45}
.tg input{margin-top:3px}
.fld input{font:inherit}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Pembaruan</h1><div class="sub">Satu tempat berbicara ke semua label: perubahan fitur yang menetap sebagai panduan, dan pengumuman yang bisa diwajibkan untuk dibaca.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
/* butir awal (18 butir panduan lama, istilah dirapikan) & draf keputusan batch dari rancangan up1 */
const GRP={start:'Mulai & aktivasi',claim:'Klaim label lama',plan:'Paket & kredit',money:'Penarikan & royalti',ticket:'Tiket & bantuan',team:'Di balik layar'};
const GRPEN={start:'Getting started & activation',claim:'Legacy label claims',plan:'Plans & credits',money:'Withdrawals & royalties',ticket:'Tickets & support',team:'Behind the scenes'};
const AUD={all:'Semua label',internal:'Tim internal',legacy:'Label paket lama'};
const AUDEN={all:'All labels',internal:'Internal team',legacy:'Legacy-plan labels'};
const FE=[
 {id:'U-01',kind:'baru',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Sambutan setelah masuk',text:'Popup sambutan setelah masuk: member baru memilih bahasa dan tema lalu menjelajah dashboard; member lama diarahkan ke klaim label.'},
 {id:'U-02',kind:'berubah',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Aktivasi tanpa menunggu pembayaran',text:'Aktivasi akun tidak lagi menunggu pembayaran — cukup identitas label, kontrak, pemeriksaan admin, dan rekening.'},
 {id:'U-03',kind:'baru',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Kontrak otomatis',text:'Kontrak dibuat otomatis, tanggal kesepakatan tercatat, dan dapat diunduh dari menu Kontrak.'},
 {id:'U-04',kind:'baru',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Mode coba paket',text:'Member baru dapat merasakan manfaat tiap paket (Basic, Studio, Pro, Business) dari dashboard tanpa mengubah langganan.'},
 {id:'U-05',kind:'berubah',g:'claim',st:'pub',aud:'all',ver:'v1.1',title:'Klaim berbasis pernyataan',text:'Klaim label berbasis kejujuran: pernyataan kepemilikan wajib dan bukti pendukung opsional — tanpa kode OTP.'},
 {id:'U-06',kind:'baru',g:'claim',st:'pub',aud:'all',ver:'v1.1',title:'Klaim disetujui Super Admin',text:'Persetujuan klaim hanya oleh Super Admin; akses label yang bermasalah dapat dicabut kembali oleh Super Admin.'},
 {id:'U-07',kind:'baru',g:'claim',st:'pub',aud:'all',ver:'v1.1',title:'Klaim ganda jadi sengketa',text:'Klaim ganda pada satu label menjadi sengketa, dan saldo lama ditahan sampai Super Admin mengesahkan saldo awal.'},
 {id:'U-08',kind:'berubah',g:'plan',st:'pub',aud:'all',ver:'v1.1',title:'Empat jenjang paket',text:'Empat jenjang paket: Basic, Studio, Pro, dan Business.',was:'Empat jenjang paket: Basic, Studio, Pro, dan Business. Harga final ditentukan terakhir.'},
 {id:'U-09',kind:'baru',g:'plan',st:'pub',aud:'all',ver:'v1.1',title:'Harga per layanan',text:'Harga layanan dipatok per layanan; penawaran kredit hanya tampil bila tidak lebih mahal dari harga satuan.',was:'Harga layanan dipatok per layanan; penawaran token hanya tampil bila lebih murah dari vonis.'},
 {id:'U-10',kind:'baru',g:'plan',st:'pub',aud:'all',ver:'v1.1',title:'Aturan pengembalian kredit',text:'Kredit hangus bila rilisan gagal di distributor, kembali bila ditolak sebelum pengiriman, dan kembali atau diganti bila terjadi kesalahan sistem.',ref:'Standar & Penanda › Standar layanan › Kredit',was:'Aturan token: gagal dari distributor = token hangus; ditolak sebelum pengiriman = kembali; kesalahan sistem = kembali atau masuk pool ganti.'},
 {id:'U-11',kind:'berubah',g:'money',st:'pub',aud:'all',ver:'v1.1',title:'Jadwal penarikan',text:'Pengajuan penarikan tanggal 1–14, pencairan tanggal 15–20.',ref:'Standar & Penanda › Aturan waktu › Pencairan royalti'},
 {id:'U-12',kind:'berubah',g:'money',st:'pub',aud:'all',ver:'v1.1',title:'Verifikasi rekening',text:'Verifikasi rekening hanya disetujui oleh Super Admin.'},
 {id:'U-13',kind:'baru',g:'money',st:'hold',aud:'all',ver:'v1.1',title:'Tarif royalti per label',text:'Tarif royalti per label: label lama mempertahankan tarifnya, label baru menggunakan 60%.',hold:'Bunyi kalimat ini terbaca semua label. Tetapkan dulu agar sama dengan Pasal 8 kontrak CT-1 (masih "[Diisi oleh Super Admin]") dan dengan tarif yang dibayar sistem.'},
 {id:'U-14',kind:'baru',g:'ticket',st:'pub',aud:'all',ver:'v1.1',title:'Kategori tiket baru',text:'Kategori tiket baru: "Masalah Royalti" dan "Permintaan Lainnya".'},
 {id:'U-15',kind:'baru',g:'team',st:'pub',aud:'internal',ver:'v1.1',title:'Halaman Sistem',text:'Halaman Sistem untuk Super Admin: konten website, navigasi, dan jadwal pemeliharaan — dengan draf, tinjauan, dan riwayat versi. Prosedur & pengingat kini di Standar & Penanda.',was:'Halaman Sistem untuk Super Admin: konten website, navigasi, prosedur, dan jadwal pemeliharaan — dengan draf, tinjauan, dan riwayat versi.'},
 {id:'U-16',kind:'baru',g:'team',st:'pub',aud:'internal',ver:'v1.1',title:'Tabel tarif khusus',text:'Pemantauan Keuangan menampilkan tabel tarif khusus di luar tarif bawaan.'},
 {id:'U-17',kind:'dihapus',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Emblem & level dihapus',text:'Emblem dan level pencapaian label dihapus.'},
 {id:'U-18',kind:'baru',g:'start',st:'pub',aud:'all',ver:'v1.1',title:'Menu Pembaruan',text:'Menu Pembaruan: panduan perubahan dan pengumuman dari tim Rilis Musik.'},
 {id:'D-01',kind:'baru',g:'plan',st:'draft',aud:'legacy',ver:'v1.2',title:'Pengembalian paket lama',text:'Paket lama Annual/VIP diganti paket baru gratis 1 tahun. Bila tidak berkenan, nilai pembelian dikembalikan penuh dalam 30 hari sejak pemberitahuan dibaca, lalu akun memakai paket Basic.',note:'Terbit setelah fitur pengembalian di Transaksi dipasang.'},
 {id:'D-02',kind:'berubah',g:'ticket',st:'draft',aud:'all',ver:'v1.2',title:'Layanan Tambahan & WAMI satu menu',text:'Layanan Tambahan dan Registrasi WAMI kini satu menu. Perkembangan WAMI tetap dicatat per lagu.',note:'Terbit setelah batch menu dipasang.'},
 {id:'D-03',kind:'baru',g:'ticket',st:'draft',aud:'all',ver:'v1.2',title:'Tiket serupa digabung',text:'Pengajuan serupa untuk rilisan yang masih punya tiket terbuka otomatis digabung ke tiket itu, agar penanganannya tidak terpecah.',note:'Terbit setelah batch menu dipasang.'},
 {id:'S-28',kind:'berubah',g:'team',st:'suggest',aud:'internal',ver:'dev.28',title:'Manajemen Label dirancang ulang',text:'Manajemen Label dirancang ulang: kondisi label, rincian lengkap di samping, tab Verifikasi.',src:'v1.1 · dev 28 · 21 Okt 2026'},
 {id:'S-27',kind:'berubah',g:'team',st:'suggest',aud:'internal',ver:'dev.27',title:'Pekerjaan dirancang ulang',text:'Pekerjaan dirancang ulang: satu daftar semua pekerjaan, alur waktu, dan rincian di samping.',src:'v1.1 · dev 27 · 21 Okt 2026'}];
/* keadaan sekarang: fitur D-01 & D-02 sudah dipasang; tarif khusus pindah ke Manajemen Label (dev.35) */
FE.find(x=>x.id==='D-01').note='Fiturnya sudah dipasang di Transaksi › Pengembalian (dev.34) — siap diterbitkan.';
FE.find(x=>x.id==='D-02').note='Sudah dipasang (dev.31) — siap diterbitkan.';
FE.find(x=>x.id==='D-03').note='Terbit setelah penggabungan otomatis pengajuan serupa dipasang.';
{const u=FE.find(x=>x.id==='U-16');u.was=u.text;u.title='Tarif khusus di Manajemen Label';u.text='Tarif khusus per label diatur dari rincian label di Manajemen Label (Ubah tarif); Pemantauan Keuangan kini menampilkan posisi kas.';}
/* teks Inggris butir awal, dicari dari kalimat Indonesia yang tersimpan: bila Super Admin sudah mengubah kalimatnya, yang tampil kalimat itu apa adanya */
const TXT={
 'Sambutan setelah masuk':'Welcome after sign-in',
 'Popup sambutan setelah masuk: member baru memilih bahasa dan tema lalu menjelajah dashboard; member lama diarahkan ke klaim label.':'Welcome prompt after sign-in: new members pick language and theme then explore the dashboard; returning members are guided to label claims.',
 'Aktivasi tanpa menunggu pembayaran':'Activation without waiting for payment',
 'Aktivasi akun tidak lagi menunggu pembayaran — cukup identitas label, kontrak, pemeriksaan admin, dan rekening.':'Account activation no longer waits for payment — it needs label identity, the contract, admin review, and a bank account.',
 'Kontrak otomatis':'Automatic contract',
 'Kontrak dibuat otomatis, tanggal kesepakatan tercatat, dan dapat diunduh dari menu Kontrak.':'The contract is generated automatically, its acceptance date is recorded, and it can be downloaded from Contracts.',
 'Mode coba paket':'Plan trial mode',
 'Member baru dapat merasakan manfaat tiap paket (Basic, Studio, Pro, Business) dari dashboard tanpa mengubah langganan.':'New members can experience each plan’s benefits (Basic, Studio, Pro, Business) from the dashboard without changing their subscription.',
 'Klaim berbasis pernyataan':'Statement-based claims',
 'Klaim label berbasis kejujuran: pernyataan kepemilikan wajib dan bukti pendukung opsional — tanpa kode OTP.':'Label claims are honesty-based: a required ownership statement plus optional supporting evidence — no OTP code.',
 'Klaim disetujui Super Admin':'Claims approved by Super Admin',
 'Persetujuan klaim hanya oleh Super Admin; akses label yang bermasalah dapat dicabut kembali oleh Super Admin.':'Claim approval is Super Admin only; problematic label access can be revoked by Super Admin.',
 'Klaim ganda jadi sengketa':'Duplicate claims become disputes',
 'Klaim ganda pada satu label menjadi sengketa, dan saldo lama ditahan sampai Super Admin mengesahkan saldo awal.':'Duplicate claims on one label become a dispute, and the old balance is held until Super Admin approves the opening balance.',
 'Empat jenjang paket':'Four plan tiers',
 'Empat jenjang paket: Basic, Studio, Pro, dan Business.':'Four plan tiers: Basic, Studio, Pro, and Business.',
 'Empat jenjang paket: Basic, Studio, Pro, dan Business. Harga final ditentukan terakhir.':'Four plan tiers: Basic, Studio, Pro, and Business. Final pricing is decided last.',
 'Harga per layanan':'Price per service',
 'Harga layanan dipatok per layanan; penawaran kredit hanya tampil bila tidak lebih mahal dari harga satuan.':'Service pricing is fixed per service; credit offers appear only when they are not more expensive than the single price.',
 'Harga layanan dipatok per layanan; penawaran token hanya tampil bila lebih murah dari vonis.':'Service pricing is fixed per service; token offers appear only when cheaper than the stated price.',
 'Aturan pengembalian kredit':'Credit return rules',
 'Kredit hangus bila rilisan gagal di distributor, kembali bila ditolak sebelum pengiriman, dan kembali atau diganti bila terjadi kesalahan sistem.':'Credits are forfeited if a release fails at the distributor, returned if it is rejected before delivery, and returned or replaced if a system error occurs.',
 'Aturan token: gagal dari distributor = token hangus; ditolak sebelum pengiriman = kembali; kesalahan sistem = kembali atau masuk pool ganti.':'Token rules: distributor failure burns the token; rejection before delivery returns it; platform errors return it or go to the replacement pool.',
 'Standar & Penanda › Standar layanan › Kredit':'Standards & Indicators › Service standards › Credits',
 'Jadwal penarikan':'Withdrawal schedule',
 'Pengajuan penarikan tanggal 1–14, pencairan tanggal 15–20.':'Withdrawal requests on the 1st–14th, payouts on the 15th–20th.',
 'Standar & Penanda › Aturan waktu › Pencairan royalti':'Standards & Indicators › Time rules › Royalty payout',
 'Verifikasi rekening':'Bank account verification',
 'Verifikasi rekening hanya disetujui oleh Super Admin.':'Bank account verification is approved by Super Admin only.',
 'Tarif royalti per label':'Royalty rate per label',
 'Tarif royalti per label: label lama mempertahankan tarifnya, label baru menggunakan 60%.':'Per-label royalty rate: existing labels keep their rate, new labels use 60%.',
 'Bunyi kalimat ini terbaca semua label. Tetapkan dulu agar sama dengan Pasal 8 kontrak CT-1 (masih "[Diisi oleh Super Admin]") dan dengan tarif yang dibayar sistem.':'Every label reads this sentence. First make it match Article 8 of contract CT-1 (still "[Diisi oleh Super Admin]") and the rate the system pays.',
 'Kategori tiket baru':'New ticket categories',
 'Kategori tiket baru: "Masalah Royalti" dan "Permintaan Lainnya".':'New ticket categories: "Royalty Issue" and "Other Requests".',
 'Halaman Sistem':'System page',
 'Halaman Sistem untuk Super Admin: konten website, navigasi, dan jadwal pemeliharaan — dengan draf, tinjauan, dan riwayat versi. Prosedur & pengingat kini di Standar & Penanda.':'A System page for Super Admin: website content, navigation, and maintenance windows — with drafts, review, and version history. Procedures & reminders are now in Standards & Indicators.',
 'Halaman Sistem untuk Super Admin: konten website, navigasi, prosedur, dan jadwal pemeliharaan — dengan draf, tinjauan, dan riwayat versi.':'A System page for Super Admin: website content, navigation, procedures, and maintenance windows — with drafts, review, and version history.',
 'Tabel tarif khusus':'Special rate table',
 'Pemantauan Keuangan menampilkan tabel tarif khusus di luar tarif bawaan.':'Financial Monitoring includes a table of special rates outside the default rate.',
 'Tarif khusus di Manajemen Label':'Special rates in Label Management',
 'Tarif khusus per label diatur dari rincian label di Manajemen Label (Ubah tarif); Pemantauan Keuangan kini menampilkan posisi kas.':'Special per-label rates are set from the label details in Label Management (Change rate); Financial Monitoring now shows the cash position.',
 'Emblem & level dihapus':'Emblems & levels removed',
 'Emblem dan level pencapaian label dihapus.':'Label achievement emblems and levels were removed.',
 'Menu Pembaruan':'Updates menu',
 'Menu Pembaruan: panduan perubahan dan pengumuman dari tim Rilis Musik.':'Updates menu: a guide to changes and announcements from the Rilis Musik team.',
 'Pengembalian paket lama':'Legacy plan refund',
 'Paket lama Annual/VIP diganti paket baru gratis 1 tahun. Bila tidak berkenan, nilai pembelian dikembalikan penuh dalam 30 hari sejak pemberitahuan dibaca, lalu akun memakai paket Basic.':'Legacy Annual/VIP plans are replaced by a new plan free for 1 year. If you do not agree, the purchase value is refunded in full within 30 days of reading the notice, and the account then uses the Basic plan.',
 'Terbit setelah fitur pengembalian di Transaksi dipasang.':'Publish after the refund feature in Transactions is installed.',
 'Fiturnya sudah dipasang di Transaksi › Pengembalian (dev.34) — siap diterbitkan.':'The feature is installed in Transactions › Refunds (dev.34) — ready to publish.',
 'Layanan Tambahan & WAMI satu menu':'Add-on Services & WAMI in one menu',
 'Layanan Tambahan dan Registrasi WAMI kini satu menu. Perkembangan WAMI tetap dicatat per lagu.':'Add-on Services and WAMI Registration are now one menu. WAMI progress is still recorded per track.',
 'Terbit setelah batch menu dipasang.':'Publish after the menu batch is installed.',
 'Sudah dipasang (dev.31) — siap diterbitkan.':'Installed (dev.31) — ready to publish.',
 'Tiket serupa digabung':'Similar tickets merged',
 'Pengajuan serupa untuk rilisan yang masih punya tiket terbuka otomatis digabung ke tiket itu, agar penanganannya tidak terpecah.':'Similar requests for a release that still has an open ticket are merged into that ticket automatically, so handling is not split.',
 'Terbit setelah penggabungan otomatis pengajuan serupa dipasang.':'Publish after automatic merging of similar requests is installed.',
 'Draf dari catatan rilis · tulis ulang dengan bahasa label sebelum terbit.':'Draft from a release note · rewrite it in label-friendly language before publishing.'};
let root=null,lroot=null,lastSig='',lastL='',F=[],A=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),SPARK=sv('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),MEGA=sv('<path d="M4 10v4h3l6 4V6L7 10z"/><path d="M16 9a4 4 0 0 1 0 6"/>'),EYE=sv('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>'),TOOL=sv('<path d="M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2z"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const msOf=v=>!v?0:typeof v==='number'?v:Date.parse(String(v).length===16?v+':00+07:00':v);
const pname=id=>people.find(p=>p.id===id)?.name||'Super Admin';
const pini=id=>people.find(p=>p.id===id)?.initials||'SY';
const SA=()=>!!me().super&&!state.preview;
/* ---------- dua bahasa ---------- */
const pl=(n,a,b)=>n===1?a:b;
const grp=k=>$t(GRP[k],GRPEN[k]),aud=k=>$t(AUD[k],AUDEN[k]);
const L2=a=>Array.isArray(a)?(en137()&&a[1]?a[1]:a[0])||'':String(a??'');
/* usulan dari rilis: judul & ringkasan Inggris diambil dari RM_CHANGELOG (sisi en) */
let CLM=null;
const clm=()=>{if(CLM)return CLM;CLM={};try{for(const v of window.RM_CHANGELOG||[]){const e=v.entries?.[0]?.title,s=v.summary||{},ti=(e?.id||s.id||'').slice(0,90),te=e?.id?e.en:s.en;if(ti&&te)CLM[ti]=te;if(s.id&&s.en)CLM[s.id]=s.en;}}catch(err){}return CLM;};
const tx=s=>en137()&&s?TXT[s]||clm()[s]||s:s;
/* tanggal yang sudah tersimpan sebagai teks Indonesia ("23 Okt 2026 · 09.00") ditampilkan dengan bulan Inggris */
const MID=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const dT=s=>en137()&&s?String(s).replace(/(\d{1,2}) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})(?: · (\d\d)\.(\d\d))?/g,(m,d,mo,y,h,mi)=>`${d} ${U.mon(MID.indexOf(mo))} ${y}`+(h?` · ${h}:${mi}`:'')):s;
/* riwayat tetap ditulis seperti semula; saat ditampilkan dalam bahasa Inggris diterjemahkan */
const HT={'Draf dibuat dari keputusan batch':'Draft created from a batch decision','Terbit bersama V1.1':'Published with V1.1','Istilah dirapikan':'Terms tidied up','Kalimat diubah':'Sentence edited','Diterbitkan':'Published','Diterbitkan · wajib baca':'Published · must-read','Ditarik dari tampilan label':'Withdrawn from the label view','Dijadikan draf untuk label':'Made a draft for labels','Dicatat untuk tim internal':'Recorded for the internal team','Draf dibuat':'Draft created','Jadwal dibatalkan':'Schedule cancelled'};
const audName=t=>{const k=Object.keys(AUD).find(z=>AUD[z]===t);return k?AUDEN[k]:t;};
const histT=s=>{if(!en137()||!s)return s;if(HT[s])return HT[s];let m;
 if((m=/^Diusulkan dari rilis dev (\d+)$/.exec(s)))return `Suggested from release dev ${m[1]}`;
 if((m=/^Dijadwalkan tampil (.+)$/.exec(s)))return 'Scheduled to show '+dT(m[1]);
 if((m=/^Pengingat dikirim ke (.+)$/.exec(s)))return 'Reminder sent to '+m[1];
 if((m=/^Audiens diubah: (.+)$/.exec(s)))return 'Audience changed: '+audName(m[1]);
 if((m=/^Audiens: (.+)$/.exec(s)))return 'Audience: '+audName(m[1]);
 if((m=/^Draf dibuat dari jadwal pemeliharaan (.+)$/.exec(s)))return 'Draft created from maintenance schedule '+m[1];
 return s;};
const KIND={baru:['Baru','c-gr','New'],berubah:['Berubah','c-or','Changed'],dihapus:['Dihapus','c-red','Removed']};
const FST={pub:['Terbit','c-gr','Published'],draft:['Draf','c-bl','Draft'],hold:['Ditahan · perlu keputusan','c-red','On hold · needs a decision'],suggest:['Usulan dari rilis','c-or','Release suggestion'],off:['Ditarik','','Withdrawn']};
const AST={pub:['Terbit','c-gr','Published'],sched:['Terjadwal','c-bl','Scheduled'],draft:['Draf','','Draft'],maint:['Pemeliharaan','c-or','Maintenance']};
const lab=(M,k)=>$t(M[k][0],M[k][2]),cp=(M,k)=>chip(lab(M,k),M[k][1]),kd=k=>[lab(KIND,k),KIND[k][1]];
const S={tab:'fe',filter:'all',q:'',sel:{},read:false,form:null,preview:false};
const wide=()=>innerWidth>1240;
/* ---------- data ---------- */
function store(){if(!ten.updates137){const at0='2026-09-01T09:00';ten.updates137={seen:{},since:ten.now,items:FE.filter(x=>x.st!=='suggest').map(x=>({...x,pubAt:x.st==='pub'?at0:'',hist:[{at:x.st==='pub'||x.st==='hold'?at0:'2026-09-24T10:00',text:x.st==='draft'?'Draf dibuat dari keputusan batch':'Terbit bersama V1.1',by:'jeck'},...(x.was?[{at:'2026-09-25T08:00',text:'Istilah dirapikan',by:'jeck'}]:[])]}))};}
 const s=ten.updates137;
 /* setiap dev release yang dipasang menjadi usulan (sekali) */
 try{for(const v of window.RM_CHANGELOG||[]){const n=+String(v.version).split('dev.')[1];if(!(n>=29))continue;const id='S-'+n;if(s.items.some(x=>x.id===id))continue;
   s.items.push({id,kind:'berubah',g:'team',st:'suggest',aud:'internal',ver:'dev.'+n,title:(v.entries?.[0]?.title?.id||v.summary?.id||'').slice(0,90),text:v.summary?.id||'',src:`v1.1 · dev ${n} · ${fd(v.date)}`,pubAt:'',hist:[{at:v.date+'T09:00',text:`Diusulkan dari rilis dev ${n}`,by:''}]});}}catch(err){}
 return s;}
const newsAll=()=>typeof tr132==='function'?tr132().news:[];
const live=n=>!n.st||n.st==='pub'||n.st==='sched'&&msOf(n.at)<=ten.now;
const audOf=n=>n.audience==='lifetime'?'legacy':n.aud137==='internal'?'internal':'all';
const recipients=n=>{try{return audience132(n);}catch(err){return [];}};
const rname=k=>typeof memberName132==='function'?memberName132(k):k;
/* title/body: sisi sesuai bahasa untuk dibaca; t0/b0: sisi Indonesia untuk formulir draf (yang disimpan tetap sama) */
function load(){const s=store();F=s.items;
 A=newsAll().map(n=>{const st=!n.st||n.st==='pub'?'pub':n.st==='sched'&&msOf(n.at)<=ten.now?'pub':n.st;const rc=n.must?recipients(n):[];
  return {id:n.id,n,st,aud:audOf(n),must:!!n.must,title:L2(n.title),body:L2(n.body),t0:(n.title||[])[0]||'',b0:(n.body||[])[0]||'',at:iso(n.at),reads:rc.map(k=>[k,rname(k),n.reads?.[k]?iso(n.reads[k]):'']),hist:n.hist137||[{at:n.at,text:n.must?'Diterbitkan · wajib baca':'Diterbitkan',by:n.by}]};});
 try{for(const w of (system115().areas.maintenance?.published?.windows||[])){const stt=maintState131(w);if(stt==='cancelled')continue;A.push({id:w.id,w,st:'maint',aud:'all',must:false,title:w.title,body:w.message||'',at:iso(w.startAt),end:iso(w.endAt),wst:stt,reads:[],hist:[]});}}catch(err){}}
const match=x=>!S.q||[x.id,tx(x.title),tx(x.text)||x.body,x.g?grp(x.g):'',aud(x.aud)].join(' ').toLowerCase().includes(S.q);
const unread=()=>A.filter(a=>a.st==='pub'&&a.must).reduce((n,a)=>n+a.reads.filter(r=>!r[2]).length,0);
const WORK=['hold','suggest','draft'];
function items(){if(S.tab==='fe'){let r=F.filter(match);if(S.filter==='work')r=r.filter(x=>WORK.includes(x.st));if(S.filter==='pub')r=r.filter(x=>x.st==='pub'&&x.aud!=='internal');if(S.filter==='internal')r=r.filter(x=>x.aud==='internal');const o=['hold','suggest','draft','pub','off'];return r.slice().sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||Object.keys(GRP).indexOf(a.g)-Object.keys(GRP).indexOf(b.g)||(a.st==='suggest'?b.id.localeCompare(a.id,'en',{numeric:true}):0));}
 const o=['draft','sched','maint','pub'];return A.filter(match).sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||(b.at||'').localeCompare(a.at||''));}
const legacyN=()=>{try{return lifeIds132().length;}catch(err){return 0;}};
const allN=()=>ten.members.filter(m=>m.active).length;
function tabs(){$('tabs').innerHTML=[['fe',$t('Pembaruan fitur','Feature updates'),F.length],['an',$t('Pengumuman','Announcements'),A.length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const c=s=>F.filter(x=>x.st===s).length,pub=c('pub'),sched=A.filter(a=>a.st==='sched').length,ad=A.filter(a=>a.st==='draft').length,need=c('hold')+c('suggest')+c('draft')+ad,br=A.find(a=>a.id==='BR-1');
 const nodes=[['suggest',$t('Usulan dari rilis','Release suggestions'),c('suggest'),F.filter(x=>x.st==='suggest').length?`dev ${F.filter(x=>x.st==='suggest').map(x=>x.ver.replace('dev.','')).sort((a,b)=>a-b).filter((x,i,a)=>i===0||i===a.length-1).join('–')}`:$t('kosong','empty')],['draft',$t('Draf','Drafts'),c('draft')+c('hold')+ad,c('hold')?$t(`termasuk ${c('hold')} ditahan`,`incl. ${c('hold')} on hold`):$t('menunggu terbit','awaiting publication')],['sched',$t('Terjadwal','Scheduled'),sched,sched?$t('tampil otomatis','shows automatically'):$t('kosong','empty')],['pub',$t('Terbit','Published'),pub+A.filter(a=>a.st==='pub').length,$t('fitur & pengumuman','features & announcements')],['unread',$t('Wajib baca, belum dibaca','Must-read, unread'),unread(),'per label']];
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Komunikasi ke label · hari ini','Communication to labels · today')} ${E(U.todayLabel())}</div><h2>${need?$t(`${need} butir menunggu keputusanmu`,`${need} ${pl(need,'item','items')} awaiting your decision`):$t('Semua butir sudah diputuskan','All items decided')}</h2>
  <p>${c('hold')?$t(`${c('hold')} kalimat ditahan · `,`${c('hold')} ${pl(c('hold'),'sentence','sentences')} on hold · `):''}${$t(`${c('suggest')} usulan dari rilis dev`,`${c('suggest')} ${pl(c('suggest'),'suggestion','suggestions')} from dev releases`)}${br?$t(` · ${br.title} dibaca ${br.reads.filter(r=>r[2]).length} dari ${br.reads.length} label`,` · ${br.title} read by ${br.reads.filter(r=>r[2]).length} of ${br.reads.length} labels`):''}</p>
  <div class="acts"><button class="wbtn" data-urgent>${$t('Buka yang berikutnya','Open the next one')} ${ARROW}</button><button class="gbtn" data-preview>${S.preview?$t('Tutup pratinjau','Close preview'):$t('Pratinjau sebagai label','Preview as label')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${pub}</b><span>${$t('butir terbit','items published')}</span></div><div class="sbox"><b class="n">${unread()}</b><span>${$t('belum membaca','not yet read')}</span></div></div></div>
  <div class="flow">${nodes.map(([k,t,n,d])=>`<button class="fn${n&&k==='suggest'?' hot act':n&&k==='unread'?' hot wait':''}${n?'':' zero'}" data-node="${k}"><span class="dot n">${n}</span><span class="t">${t}</span><span class="d">${E(d)}</span></button>`).join('')}</div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari butir atau pengumuman',S.tab==='fe'?'Search feature updates':'Search announcements')}" value="${E(S.q)}"></label>`;
function list(){const r=items();let h='';
 if(S.tab==='fe'){const cnt=k=>({all:F.length,work:F.filter(x=>WORK.includes(x.st)).length,pub:F.filter(x=>x.st==='pub'&&x.aud!=='internal').length,internal:F.filter(x=>x.aud==='internal').length})[k];
  h+=`<div class="ch"><h3>${$t('Pembaruan fitur','Feature updates')} <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all',$t('Semua','All')],['work',$t('Perlu keputusan','Needs a decision')],['pub',$t('Terbaca label','Visible to labels')],['internal',$t('Tim internal','Internal team')]].map(([k,t])=>`<button data-filter="${k}" aria-pressed="${S.filter===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  const grpOf=x=>WORK.includes(x.st)?'work':x.st==='pub'?'g:'+x.g:'off';let cur='';
  r.forEach((x,i)=>{const g=grpOf(x);if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${g==='work'?'orange':g==='off'?'faint':'green'})"></i><b>${g==='work'?$t('Perlu keputusan','Needs a decision'):g==='off'?$t('Ditarik','Withdrawn'):grp(x.g)}</b> · ${r.filter(y=>grpOf(y)===g).length}</div>`;}
   h+=`<div class="it${S.sel.fe===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${SPARK}</span><div style="min-width:0"><div class="t1">${chip(...kd(x.kind))} ${E(tx(x.title))}</div><div class="t2">${aud(x.aud)} · ${E(x.st==='suggest'?dT(x.src):x.ver)}${x.ref?$t(' · merujuk Standar & Penanda',' · refers to Standards & Indicators'):''}</div></div><div class="rgt">${x.st==='pub'?'':cp(FST,x.st)}</div></div>`;});}
 else{h+=`<div class="ch"><h3>${$t('Pengumuman','Announcements')} <small class="n">${r.length}</small></h3>${find()}</div>${SA()?`<div class="hrow" style="margin:0 0 10px">${btn($t('Tulis pengumuman','Write announcement'),'data-do="an-new"','pri')}</div>`:''}`;let cur='';
  r.forEach((a,i)=>{if(a.st!==cur){cur=a.st;h+=`<div class="gh"><i style="--c:var(--${{draft:'faint',sched:'blue',pub:'green',maint:'orange'}[cur]})"></i><b>${lab(AST,cur)}</b> · ${r.filter(y=>y.st===cur).length}</div>`;}
   const rd=a.reads.length?`${a.reads.filter(z=>z[2]).length}/${a.reads.length} ${$t('dibaca','read')}`:'';
   h+=`<div class="it${S.sel.an===a.id?' sel':''}" data-id="${a.id}" style="--i:${i}"><span class="ty">${a.st==='maint'?TOOL:MEGA}</span><div style="min-width:0"><div class="t1">${E(a.title)} ${a.must?chip($t('Wajib baca','Must-read'),'c-or'):''}</div><div class="t2">${a.st==='maint'?`${fd(a.at)} – ${U.hm(a.end.slice(11,16))} · ${{scheduled:$t('terjadwal','scheduled'),active:$t('sedang berlangsung','in progress'),completed:$t('selesai','done')}[a.wst]||a.wst}`:`${aud(a.aud)} · ${a.at?(a.st==='sched'?$t('tampil ','shows '):'')+fd(a.at):$t('belum dijadwalkan','not scheduled yet')}`}</div></div><div class="rgt">${rd?`<span class="duet">${rd}</span>`:cp(AST,a.st)}</div></div>`;});}
 if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada butir','No items')}</b>${$t('Coba ubah pencarian atau pil.','Try changing the search or filter.')}</div>`;
 $('list').innerHTML=h;}
/* ---------- tampilan label (dipakai halaman label dan Pratinjau) ---------- */
function labelView(member,{mark=false}={}){const key=typeof key132==='function'?key132(member):member,legacy=(()=>{try{return lifeIds132().includes(key);}catch(err){return false;}})();
 const seen=store().seen[member]||((store().since||1)-1),vis=F.filter(x=>x.st==='pub'&&(x.aud==='all'||x.aud==='legacy'&&legacy)),isNew=x=>msOf(x.pubAt)>seen;
 const ann=newsAll().filter(n=>live(n)&&(n.audience==='lifetime'?legacy:n.aud137!=='internal')).slice().reverse();
 const out=`${ann.length?sec(0,$t('Pengumuman','Announcements'),ann.map(n=>`<div class="lprev"><div class="lph">${n.must?chip($t('Wajib dibaca','Must-read'),'c-or'):chip($t('Pengumuman','Announcement'),'c-bl')}<small>${fd(iso(n.at))}${n.reads?.[n.audience==='lifetime'?key:member]?$t(' · sudah dibaca',' · read'):''}</small></div><b>${E(L2(n.title))}</b><p>${E(L2(n.body))}</p></div>`).join('')):''}
  ${Object.keys(GRP).filter(g=>vis.some(x=>x.g===g)).map((g,i)=>sec(i+1,grp(g),vis.filter(x=>x.g===g).map(x=>`<div class="lrow">${isNew(x)?`<span class="ldot" title="${$t('Baru','New')}"></span>`:''}${chip(...kd(x.kind))}<span>${E(tx(x.text))}${x.ref?` <button class="lnk" data-go="standards">${$t('Lihat aturan','See the rule')}</button>`:''}</span></div>`).join(''))).join('')}
  ${!vis.length&&!ann.length?`<div class="empty"><b>${$t('Belum ada pembaruan','No updates yet')}</b>${$t('Perubahan fitur dan pengumuman dari tim Rilis Musik tampil di sini.','Feature changes and announcements from the Rilis Musik team appear here.')}</div>`:''}`;
 if(mark&&vis.some(isNew)){store().seen[member]=ten.now;try{save10();}catch(err){}}
 return {html:out,count:vis.length,fresh:vis.filter(isNew).length};}
/* ---------- rincian ---------- */
const audPick=(x,lock)=>`<div class="seg2 aud">${Object.keys(AUD).map(k=>`<button data-aud="${k}" aria-pressed="${x.aud===k}"${lock?' disabled':''}>${aud(k)}</button>`).join('')}</div>`;
const audNote=a=>a==='all'?$t(`Terlihat oleh ${allN()} label aktif.`,`Visible to ${allN()} active labels.`):a==='legacy'?$t(`Hanya ${legacyN()} label paket lama (Annual/VIP).`,`Only ${legacyN()} legacy-plan labels (Annual/VIP).`):$t('Hanya Super Admin dan staf.','Super Admin and staff only.');
function labelCard(x){if(x.aud==='internal')return `<div class="lprev off"><p class="where">${$t('Tidak terlihat oleh label · hanya tim internal.','Not visible to labels · internal team only.')}</p></div>`;
 return `<div class="lprev"><div class="lph"><span class="ldot"></span>${chip(...kd(x.kind))}<small>${grp(x.g)}${x.aud==='legacy'?$t(' · hanya label paket lama',' · legacy-plan labels only'):''}</small></div><p>${E(tx(x.text))}</p>${x.ref?`<button class="lnk" data-go="standards">${$t('Lihat aturannya','See the rule')}</button>`:''}</div>`;}
function nextFe(x){const sa=SA(),edit=S.form==='edit'?`<div class="reveal"><label class="fld">${$t('Judul','Title')}<input id="f-title" value="${E(x.title)}"></label><label class="fld">${$t('Kalimat untuk label · bahasa sederhana','Sentence for labels · plain language')}<textarea id="f-text">${E(x.text)}</textarea></label>${en137()&&tx(x.text)!==x.text?'<p class="where">This sentence is stored in Indonesian; labels reading in English see the English version until you change it. After a change, every label sees your new wording.</p>':''}<div class="hrow">${btn($t('Simpan','Save'),'data-do="save"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
 if(!sa)return `<div class="nextc mute"><p>${lab(FST,x.st)}${x.pubAt?$t(' · sejak ',' · since ')+fd(x.pubAt):''}.</p><p class="where">${$t('Hanya Super Admin yang menulis dan menerbitkan.','Only Super Admin writes and publishes.')}</p></div>`;
 if(x.st==='hold')return `<div class="nextc"><p class="quote">${E(tx(x.hold))}</p>${S.form==='edit'?edit:`<div class="hrow">${btn($t('Tulis bunyi final','Write the final wording'),'data-form="edit"','pri')}${btn($t('Tetap tahan','Keep on hold'),'data-do="keep"')}</div>`}<div class="hrow">${btn($t('Terbitkan','Publish'),'data-do="publish"','',!x.decided)}</div>${x.decided?'':`<p class="where">${$t('Terbitkan aktif setelah bunyi final ditulis.','Publish becomes available once the final wording is written.')}</p>`}</div>`;
 if(x.st==='suggest')return `<div class="nextc"><p>${$t('Catatan rilis','Release note')} <b>${E(dT(x.src))}</b> ${$t('(bahasa tim):','(team wording):')}</p><p class="quote">${E(tx(x.text))}</p><p class="where">${$t('Bila perubahannya hanya di tampilan Super Admin dan staf, cukup dicatat untuk tim internal.','If the change only affects what Super Admin and staff see, recording it for the internal team is enough.')}</p><div class="hrow">${btn($t('Jadikan draf untuk label','Make a draft for labels'),'data-do="to-draft"')}${btn($t('Catat untuk tim internal','Record for the internal team'),'data-do="internal"','pri')}</div></div>`;
 if(x.st==='draft')return `<div class="nextc"><p>${E(tx(x.note)||$t('Draf','Draft'))}</p>${edit||`<div class="hrow">${btn($t('Terbitkan sekarang','Publish now'),'data-do="publish"','pri')}${btn($t('Ubah kalimat','Edit sentence'),'data-form="edit"')}</div>`}<p class="where">${$t('Terbitkan bersama pemasangan fiturnya, supaya label tidak membaca fitur yang belum ada.','Publish together with the feature itself, so labels never read about a feature that is not there yet.')}</p></div>`;
 if(x.st==='off')return `<div class="nextc mute"><p>${$t('Ditarik dari tampilan label.','Withdrawn from the label view.')}</p><div class="hrow">${btn($t('Terbitkan lagi','Publish again'),'data-do="publish"')}</div></div>`;
 return `<div class="nextc ok"><p>${$t('Terbit · terlihat oleh','Published · visible to')} <b>${aud(x.aud).toLowerCase()}</b> ${$t('sejak','since')} ${fd(x.pubAt||'2026-09-01T09:00')}.</p>${edit||`<div class="hrow">${btn($t('Ubah kalimat','Edit sentence'),'data-form="edit"')}${btn($t('Tarik dari tampilan','Withdraw from view'),'data-do="unpublish"','ghost dng')}</div>`}</div>`;}
const histH=h=>`<div class="hist">${h.slice().reverse().map(z=>`<div><span class="mini">${E(z.by?pini(z.by):'SY')}</span><span>${E(histT(z.text))}<small style="display:block">${E(z.by?pname(z.by):$t('Sistem','System'))} · ${fd(iso(z.at))}</small></span></div>`).join('')}</div>`;
function paneFe(x){let i=0;return `<div class="hd"><button class="back" data-back>${BACK}${$t('Pembaruan fitur','Feature updates')}</button><div class="k"><span class="ty">${SPARK}</span>${grp(x.g)} · <span class="mono">${x.id}</span></div><h2>${E(tx(x.title))}</h2><div class="meta">${chip(...kd(x.kind))}<span class="sep"></span>${cp(FST,x.st)}<span class="sep"></span>${E(x.st==='suggest'?dT(x.src):x.ver)}</div></div>
 <div class="pb">${sec(i++,x.st==='pub'?$t('Keadaan','Status'):$t('Langkah berikutnya','Next step'),nextFe(x))}
 ${sec(i++,$t('Pratinjau sebagai label','Preview as label'),labelCard(x))}
 ${sec(i++,$t('Audiens','Audience'),audPick(x,!SA())+`<p class="where" style="margin-top:8px">${audNote(x.aud)}</p>`)}
 ${x.was?sec(i++,$t('Dirapikan dari versi lama','Tidied up from the old version'),`<div class="cmpw"><table class="cmpt"><tbody><tr><th>${$t('Sebelumnya','Before')}</th><td class="old">${E(tx(x.was))}</td></tr><tr><th>${$t('Sekarang','Now')}</th><td><span class="new">${E(tx(x.text))}</span></td></tr></tbody></table></div>`):''}
 ${x.ref?sec(i++,$t('Rujukan','Reference'),`<div class="uses"><div data-go="standards" style="cursor:pointer">${SPARK}<span>${E(tx(x.ref))}<small>${$t('angka aturan selalu diambil dari sini','rule numbers always come from here')}</small></span></div></div>`):''}
 ${sec(i++,$t('Riwayat','History'),histH(x.hist||[]))}</div>`;}
function nextAn(a){const sa=SA();
 if(a.st==='maint')return `<div class="nextc"><p>${E(a.body)}</p><p class="where">${fd(a.at)} – ${fd(a.end)} · ${$t('tampil otomatis sebagai pita di halaman terdampak, untuk semua pengguna.','shows automatically as a banner on affected pages, for all users.')}</p>${sa?`<div class="hrow">${btn(`${$t('Atur di Pengaturan Platform','Manage in Platform Settings')} ${ARROW}`,'data-do="maint"')}</div>`:''}</div>`;
 if(a.st==='pub'){if(!a.must)return `<div class="nextc ok"><p>${$t(`Terbit ${fd(a.at)} untuk ${aud(a.aud).toLowerCase()} · tampil di Pembaruan label.`,`Published ${fd(a.at)} for ${aud(a.aud).toLowerCase()} · shown on the label Updates page.`)}</p></div>`;const n=a.reads.filter(r=>r[2]).length;
  return `<div class="nextc"><p>${$t('Terbit','Published')} ${fd(a.at)} · <b>${$t('wajib baca','must-read')}</b>. ${$t(`${n} dari ${a.reads.length} sudah membaca.`,`${n} of ${a.reads.length} have read it.`)}</p><div class="meter" style="max-width:none"><i style="width:${a.reads.length?n/a.reads.length*100:0}%"></i></div><div class="parts">${a.reads.map(([k,l,t])=>`<div class="pt"><b class="pb2 ${t?'ok':''}">${t?'✓':''}</b><span><span class="pn">${E(l)}</span><small>${t?$t('dibaca ','read ')+fd(t):$t('belum membaca · tampil saat masuk aplikasi','not read yet · shows at the next sign-in')}</small></span>${!t&&sa?`<span class="pa">${btn($t('Ingatkan','Remind'),`data-resend="${E(k)}"`,'sm')}</span>`:''}</div>`).join('')}</div>${a.n.kind==='transition'?`<p class="where">${$t('Batas 30 hari pengembalian dihitung sejak tanggal dibaca · kasus berjalan ada di','The 30-day refund window counts from the read date · open cases are in')} <button class="lnk" data-go="transactions">${$t('Transaksi › Pengembalian','Transactions › Refunds')}</button>.</p>`:''}</div>`;}
 if(!sa)return `<div class="nextc mute"><p>${lab(AST,a.st)}.</p></div>`;
 if(a.st==='sched')return `<div class="nextc"><p>${$t('Tampil otomatis','Shows automatically')} <b>${fd(a.at)}</b> ${$t('untuk','for')} ${aud(a.aud).toLowerCase()}.</p><div class="hrow">${btn($t('Terbitkan sekarang','Publish now'),'data-do="an-publish"','pri')}${btn($t('Batalkan jadwal','Cancel schedule'),'data-do="an-unsched"','ghost')}</div></div>`;
 const def=U.iso16(ten.now+864e5).slice(0,10)+'T09:00';
 return `<div class="nextc"><p>${$t('Draf pengumuman.','Announcement draft.')}</p><label class="fld">${$t('Judul','Title')}<input id="f-title" maxlength="90" value="${E(a.t0)}"></label><label class="fld">${$t('Isi','Message')}<textarea id="f-body" maxlength="1200">${E(a.b0)}</textarea></label><label class="tg"><input type="checkbox" id="f-must" ${a.must?'checked':''}> ${$t('Wajib baca · tampil sekali dengan tombol "Saya sudah membaca"','Must-read · shown once with an "I have read this" button')}</label><label class="fld">${$t('Jadwal tampil · WIB','Show at · WIB')}<input id="f-at" type="datetime-local" value="${def}"></label><div class="hrow">${btn($t('Terbitkan sekarang','Publish now'),'data-do="an-publish"','pri')}${btn($t('Jadwalkan','Schedule'),'data-do="an-sched"')}${btn($t('Hapus draf','Delete draft'),'data-do="an-delete"','ghost dng')}</div></div>`;}
function paneAn(a){let i=0;return `<div class="hd"><button class="back" data-back>${BACK}${$t('Pengumuman','Announcements')}</button><div class="k"><span class="ty">${a.st==='maint'?TOOL:MEGA}</span>${a.st==='maint'?$t('Pemeliharaan','Maintenance'):$t('Pengumuman','Announcement')} · <span class="mono">${E(a.id)}</span></div><h2>${E(a.title)}</h2><div class="meta">${cp(AST,a.st)}${a.must?'<span class="sep"></span>'+chip($t('Wajib baca','Must-read'),'c-or'):''}<span class="sep"></span>${aud(a.aud)}</div></div>
 <div class="pb">${sec(i++,a.st==='pub'||a.st==='maint'?$t('Keadaan','Status'):$t('Langkah berikutnya','Next step'),nextAn(a))}
 ${a.st!=='maint'?sec(i++,$t('Pratinjau sebagai label','Preview as label'),`<div class="modalprev"><div class="mp"><small>${a.must?$t('Wajib dibaca','Must-read'):$t('Pengumuman','Announcement')} · Rilis Musik</small><b>${E(a.title||$t('(judul)','(title)'))}</b><p>${E(a.body||$t('(isi)','(message)'))}</p>${a.must?`<span class="btn pri sm" style="justify-self:start">${$t('Saya sudah membaca','I have read this')}</span>`:''}</div></div>`):''}
 ${a.st!=='maint'?sec(i++,$t('Audiens','Audience'),(a.st==='draft'?audPick({aud:a.aud==='internal'?'all':a.aud},!SA()):`<p class="para">${aud(a.aud)}</p>`)+`<p class="where" style="margin-top:8px">${audNote(a.aud)}</p>`):''}
 ${a.hist.length?sec(i++,$t('Riwayat','History'),histH(a.hist)):''}</div>`;}
function panePreview(){const m=ten.members.find(x=>x.active)||{},v=labelView(m.id);
 return `<div class="hd"><button class="back" data-preview>${BACK}${$t('Tutup pratinjau','Close preview')}</button><div class="k"><span class="ty">${EYE}</span>${$t('Pratinjau sebagai label · contoh:','Preview as label · example:')} ${E(m.name)}</div><h2>${$t('Pembaruan','Updates')}</h2><div class="meta">${$t(`${v.count} butir · ${v.fresh} baru sejak kunjungan terakhir`,`${v.count} ${pl(v.count,'item','items')} · ${v.fresh} new since the last visit`)}</div></div>
 <div class="pb">${v.html}<p class="where">${$t('Butir "Di balik layar", draf, usulan, dan kalimat yang ditahan tidak terlihat oleh label.','"Behind the scenes" items, drafts, suggestions and sentences on hold are not visible to labels.')}</p></div>`;}
let lastPane='';
function pane(){if(S.preview){$('pin').innerHTML=panePreview();return;}const x=items().find(z=>z.id===S.sel[S.tab]);$('pin').innerHTML=x?(S.tab==='fe'?paneFe(x):paneAn(x)):`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih butir','Select an item')}</b>${$t('Rinciannya tampil di sini.','Its details appear here.')}</div>`;
 const key=S.tab+S.sel[S.tab]+S.preview,p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input:not([type=checkbox]),#pin textarea').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&(S.read||S.preview)&&!!S.sel[S.tab]);stick();});}
function toast(t){toast137(DEF,t);}
function open(id){S.preview=false;S.sel[S.tab]=id;S.form=null;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
function commit(fn){if(typeof atomic10==='function')atomic10(fn);else{fn();save10();}}
function act(a,arg){if(!SA()){toast($t('Hanya Super Admin','Super Admin only'));return;}let msg='';
 try{
 if(S.tab==='fe'){const x=F.find(z=>z.id===S.sel.fe);if(!x)return;const log=t=>(x.hist||(x.hist=[])).push({at:ten.now,text:t,by:state.user});
  if(a==='save'){const t=val('f-text'),ti=val('f-title');if(!t){toast($t('Kalimat tidak boleh kosong','The sentence cannot be empty'));return;}commit(()=>{x.text=t;if(ti)x.title=ti;if(x.st==='hold')x.decided=true;log('Kalimat diubah');});msg=$t('Tersimpan','Saved');}
  else if(a==='keep'){msg=$t('Tetap ditahan · tidak terbaca label','Still on hold · not visible to labels');}
  else if(a==='publish'){commit(()=>{x.st='pub';x.pubAt=U.iso16(ten.now);log('Diterbitkan');});msg=x.aud==='internal'?$t('Terbit untuk tim internal','Published for the internal team'):$t(`Terbit · ${x.aud==='legacy'?legacyN()+' label paket lama':allN()+' label'} melihat tanda "Baru"`,`Published · ${x.aud==='legacy'?legacyN()+' legacy-plan labels':allN()+' labels'} see the "New" mark`);}
  else if(a==='unpublish'){commit(()=>{x.st='off';log('Ditarik dari tampilan label');});msg=$t('Ditarik · tidak terlihat label','Withdrawn · not visible to labels');}
  else if(a==='to-draft'){commit(()=>{x.st='draft';x.aud='all';x.ver='v1.1';x.g=x.g==='team'?'start':x.g;x.note='Draf dari catatan rilis · tulis ulang dengan bahasa label sebelum terbit.';log('Dijadikan draf untuk label');});msg=$t('Jadi draf · tulis ulang sebelum terbit','Now a draft · rewrite before publishing');}
  else if(a==='internal'){commit(()=>{x.st='pub';x.aud='internal';x.pubAt=U.iso16(ten.now);log('Dicatat untuk tim internal');});msg=$t('Tercatat untuk tim internal · tidak terlihat label','Recorded for the internal team · not visible to labels');}}
 else{if(a==='an-new'){const s=tr132();let id;commit(()=>{let k=s.news.length+1;while(s.news.some(n=>n.id==='BR-'+k))k++;id='BR-'+k;s.news.push({id,kind:'news',audience:'all',must:false,at:ten.now,by:state.user,reads:{},title:['',''],body:['',''],st:'draft',hist137:[{at:ten.now,text:'Draf dibuat',by:state.user}]});});S.tab='an';S.sel.an=id;S.read=true;lastSig='';load();paint();toast($t('Draf pengumuman dibuat','Announcement draft created'));return;}
  const x=A.find(z=>z.id===S.sel.an);if(!x)return;const n=x.n,log=t=>(n.hist137||(n.hist137=[{at:n.at,text:n.must?'Diterbitkan · wajib baca':'Diterbitkan',by:n.by}])).push({at:ten.now,text:t,by:state.user});
  const fill=()=>{const ti=val('f-title'),bo=val('f-body');if(!ti||!bo){toast($t('Isi judul dan isi pengumuman','Fill in the announcement title and message'));return false;}n.title=[ti,ti];n.body=[bo,bo];n.must=!!$('f-must')?.checked;return true;};
  if(a==='maint'){try{window.psSel137='mw';goControl126('settings');}catch(err){toast($t('Buka Pengaturan Platform › Pemeliharaan','Open Platform Settings › Maintenance'));}return;}
  if(a==='an-publish'){if(n.st==='draft'&&!fill())return;commit(()=>{n.st='pub';n.at=ten.now;n.by=state.user;log('Diterbitkan'+(n.must?' · wajib baca':''));});msg=$t(`Terbit untuk ${AUD[audOf(n)].toLowerCase()}${n.must?' · tampil sekali saat label masuk':''}`,`Published for ${AUDEN[audOf(n)].toLowerCase()}${n.must?' · shown once when labels sign in':''}`);}
  else if(a==='an-sched'){if(!fill())return;const at=$('f-at')?.value;const ms=at?Date.parse(at+':00+07:00'):0;if(!ms||ms<=ten.now){toast($t('Pilih waktu tampil setelah sekarang','Pick a show time later than now'));return;}commit(()=>{n.st='sched';n.at=ms;log('Dijadwalkan tampil '+fd(U.iso16(ms)));});msg=$t(`Dijadwalkan · tampil otomatis ${fd(U.iso16(ms))}`,`Scheduled · shows automatically ${fd(U.iso16(ms))}`);}
  else if(a==='an-unsched'){commit(()=>{n.st='draft';log('Jadwal dibatalkan');});msg=$t('Kembali menjadi draf','Back to draft');}
  else if(a==='an-delete'){commit(()=>{const s=tr132();s.news=s.news.filter(z=>z!==n);});S.sel.an=null;msg=$t('Draf dihapus','Draft deleted');}
  else if(a==='resend'){const k=arg,m=typeof mem132==='function'?mem132(k):RM10.getMember(ten,k);if(!m){toast($t('Label tidak ditemukan','Label not found'));return;}commit(()=>{ten.notifications.unshift({id:++ten.serial,member:m.id,key:'news137',ref:n.id,at:ten.now});log('Pengingat dikirim ke '+m.name);});msg=$t(`Pengingat dikirim ke ${m.name}`,`Reminder sent to ${m.name}`);}
  else if(a==='aud'){commit(()=>{n.audience=arg==='legacy'?'lifetime':'all';log('Audiens: '+AUD[arg]);});msg=$t('Audiens: '+AUD[arg],'Audience: '+AUDEN[arg]);}}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;lastSig='';load();paint();if(msg)toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.filter='all';S.read=false;S.form=null;S.preview=false;paint();return;}
  const nd=t.closest('[data-node]');if(nd){const k=nd.dataset.node;S.preview=false;S.q='';if(k==='suggest'||k==='draft'){S.tab='fe';S.filter='work';}else if(k==='pub'){S.tab='fe';S.filter='pub';}else{S.tab='an';S.filter='all';}paint();const r=items();const pick=k==='suggest'?r.find(x=>x.st==='suggest'):k==='sched'?r.find(x=>x.st==='sched'):k==='unread'?r.find(x=>x.must&&x.st==='pub'&&x.reads.some(z=>!z[2])):r[0];if(pick)open(pick.id);return;}
  if(t.closest('[data-urgent]')){S.tab='fe';S.filter='work';S.q='';const r=items();if(r[0])open(r[0].id);else{S.tab='an';const d=items().find(x=>x.st==='draft');if(d)open(d.id);else toast($t('Semua butir sudah diputuskan','All items decided'));}return;}
  if(t.closest('[data-preview]')){S.preview=!S.preview;S.read=S.preview;lastPane='';paint();if(S.preview)$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const fl=t.closest('[data-filter]');if(fl){S.filter=fl.dataset.filter;paint();return;}
  const au=t.closest('[data-aud]');if(au&&!au.disabled){if(!SA())return;if(S.tab==='fe'){const x=F.find(z=>z.id===S.sel.fe);commit(()=>{x.aud=au.dataset.aud;(x.hist||(x.hist=[])).push({at:ten.now,text:'Audiens diubah: '+AUD[x.aud],by:state.user});});lastSig='';load();paint();toast($t('Audiens: '+AUD[x.aud],'Audience: '+AUDEN[x.aud]));}else act('aud',au.dataset.aud);return;}
  const rs=t.closest('[data-resend]');if(rs){act('resend',rs.dataset.resend);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;paint();$('f-text')?.focus();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const go=t.closest('[data-go]');if(go){if(go.dataset.go==='standards')window.stdTab137='waktu';if(!go137(go.dataset.go))toast($t('Buka menu terkait','Open the related menu'));return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
const sig=()=>F.map(x=>x.id+x.st+x.aud+(x.hist||[]).length).join('|')+'#'+A.map(a=>a.id+a.st+a.reads.filter(r=>r[2]).length+a.title+a.must+a.aud).join('|')+'#'+U.today()+ten.role+state.user+state.lang;
const DEF={id:'updates',css:STYLE,html:HTML,
 i18n:{'Pembaruan':'Updates','Satu tempat berbicara ke semua label: perubahan fitur yang menetap sebagai panduan, dan pengumuman yang bisa diwajibkan untuk dibaca.':'One place to talk to every label: feature changes that stay as a guide, and announcements that can be made must-read.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='updates'&&!state.preview,
 init(r){root=r;bind();},
 draw(){load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Pembaruan */
DEF.sum=function(){load();const c=s=>F.filter(x=>x.st===s).length,ad=A.filter(a=>a.st==='draft').length,need=c('hold')+c('suggest')+c('draft')+ad,br=A.find(a=>a.id==='BR-1'),brr=br?{t:br.title,r:br.reads.filter(r=>r[2]).length,n:br.reads.length}:null;
 const sug=F.filter(x=>x.st==='suggest').map(x=>+String(x.ver).replace('dev.','')).filter(Boolean).sort((a,b)=>a-b);
 return {need,hold:c('hold'),suggest:c('suggest'),sugRange:sug.length?(sug[0]===sug.at(-1)?`${sug[0]}`:`${sug[0]}–${sug.at(-1)}`):'',draft:c('draft')+ad,br:brr,
  internal:F.filter(x=>x.st==='pub'&&x.aud==='internal').sort((a,b)=>String(b.pubAt).localeCompare(String(a.pubAt))).map(x=>({id:x.id,t:x.title?tx(x.title):tx(x.text),d:x.title?tx(x.text):'',at:x.pubAt||'',ver:x.ver||''})),
  maint:A.filter(a=>a.st==='maint'&&['scheduled','active'].includes(a.wst)).map(a=>({id:a.id,t:a.title,d:a.body,at:a.at,end:a.end,wst:a.wst})),
  line:$t(`${need?`${need} butir menunggu keputusan`:'Semua butir sudah diputuskan'}${brr?` · ${brr.t} dibaca ${brr.r} dari ${brr.n} label`:''}`,`${need?`${need} ${pl(need,'item','items')} awaiting a decision`:'All items decided'}${brr?` · ${brr.t} read by ${brr.r} of ${brr.n} labels`:''}`),tone:need||c('hold')?'o':'g'};};
page137(DEF);
/* halaman Pembaruan label: butir terbit + pengumuman, tanda "Baru" sejak kunjungan terakhir */
const LHTML='<main><div class="ph rl"><div><h1>Pembaruan</h1><div class="sub">Perubahan fitur dan pengumuman dari tim Rilis Musik.</div></div></div><section class="card rl" id="lbody" style="padding:22px 24px"></section><div class="toast" id="toast"></div></main>';
let lvisit='';
const LDEF={id:'updates-label',css:STYLE,html:LHTML,
 i18n:{'Pembaruan':'Updates','Perubahan fitur dan pengumuman dari tim Rilis Musik.':'Feature changes and announcements from the Rilis Musik team.'},
 when:()=>isLabel10()&&state.page==='module'&&typeof v4==='object'&&v4.module==='updates',
 init(r){lroot=r;r.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){window.stdTab137='waktu';go137('standards');}});},
 draw(){F=store().items;const key=ten.member+':'+ten.now;const first=lvisit!==ten.member;const v=labelView(ten.member,{mark:false});const s=v.html+ten.member;if(s===lastL&&!first)return;lastL=s;lroot.getElementById('lbody').innerHTML=v.html;if(first){lvisit=ten.member;setTimeout(()=>{if(LDEF.host?.isConnected){labelView(ten.member,{mark:true});}},1500);}}};
/*sum137 — ringkasan untuk Dashboard label: pengumuman & pembaruan yang sama dengan halaman Pembaruan label */
LDEF.sum=function(member){F=store().items;const key=typeof key132==='function'?key132(member):member,legacy=(()=>{try{return lifeIds132().includes(key);}catch(err){return false;}})();
 const v=labelView(member,{mark:false}),seen=store().seen[member]||((store().since||1)-1);
 const ann=newsAll().filter(n=>live(n)&&(n.audience==='lifetime'?legacy:n.aud137!=='internal')).slice().reverse().map(n=>({id:n.id,t:L2(n.title),b:L2(n.body),must:!!n.must,life:n.audience==='lifetime',read:!!n.reads?.[n.audience==='lifetime'?key:member],at:iso(n.at)}));
 const vis=F.filter(x=>x.st==='pub'&&(x.aud==='all'||x.aud==='legacy'&&legacy)).sort((a,b)=>String(b.pubAt).localeCompare(String(a.pubAt)));
 let maint=[];try{maint=(system115().areas.maintenance?.published?.windows||[]).filter(w=>['scheduled','active'].includes(maintState131(w))).map(w=>({id:w.id,t:w.title,b:w.message||'',at:iso(w.startAt),end:iso(w.endAt)}));}catch(err){}
 return {fresh:v.fresh,count:v.count,ann,maint,feat:vis.slice(0,3).map(x=>({id:x.id,g:grp(x.g)||'',t:tx(x.text),isNew:msOf(x.pubAt)>seen}))};};
page137(LDEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when()||LDEF.when())return '';return modBefore.apply(this,arguments);};
/* pengumuman: hanya yang terbit / sudah waktunya tampil yang sampai ke label */
if(typeof pendingNews132==='function'){const pb=pendingNews132;pendingNews132=function(id){return pb.apply(this,arguments).filter(n=>live(n));};}
if(typeof audience132==='function'){const ab=audience132;audience132=function(n){return n&&!live(n)?[]:ab.apply(this,arguments);};}
})();
