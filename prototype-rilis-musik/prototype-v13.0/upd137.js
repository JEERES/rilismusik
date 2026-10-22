/* v1.1.0-dev.38 — Pembaruan dirancang ulang (rancangan disetujui 21 Okt 2026, mock up1).
   Tab Pembaruan fitur (butir yang dikelola: Draf · Ditahan · Usulan dari rilis · Terbit · Ditarik, audiens Semua label /
   Tim internal / Label paket lama) · Pengumuman (Berita dari Kotak Masuk pindah ke sini: draf, terjadwal, terbit, wajib baca
   dengan daftar yang sudah membaca; jadwal pemeliharaan ikut tampil). Halaman Pembaruan label membaca butir yang sama.
   Data: ten.updates137 (butir & tanda "Baru" per label), tr132().news (pengumuman), system115 maintenance (jadwal). */
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
const AUD={all:'Semua label',internal:'Tim internal',legacy:'Label paket lama'};
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
const KIND={baru:['Baru','c-gr'],berubah:['Berubah','c-or'],dihapus:['Dihapus','c-red']};
const FST={pub:['Terbit','c-gr'],draft:['Draf','c-bl'],hold:['Ditahan · perlu keputusan','c-red'],suggest:['Usulan dari rilis','c-or'],off:['Ditarik','']};
const AST={pub:['Terbit','c-gr'],sched:['Terjadwal','c-bl'],draft:['Draf',''],maint:['Pemeliharaan','c-or']};
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
function load(){const s=store();F=s.items;
 A=newsAll().map(n=>{const st=!n.st||n.st==='pub'?'pub':n.st==='sched'&&msOf(n.at)<=ten.now?'pub':n.st;const rc=n.must?recipients(n):[];
  return {id:n.id,n,st,aud:audOf(n),must:!!n.must,title:(n.title||[])[0]||'',body:(n.body||[])[0]||'',at:iso(n.at),reads:rc.map(k=>[k,rname(k),n.reads?.[k]?iso(n.reads[k]):'']),hist:n.hist137||[{at:n.at,text:n.must?'Diterbitkan · wajib baca':'Diterbitkan',by:n.by}]};});
 try{for(const w of (system115().areas.maintenance?.published?.windows||[])){const stt=maintState131(w);if(stt==='cancelled')continue;A.push({id:w.id,w,st:'maint',aud:'all',must:false,title:w.title,body:w.message||'',at:iso(w.startAt),end:iso(w.endAt),wst:stt,reads:[],hist:[]});}}catch(err){}}
const match=x=>!S.q||[x.id,x.title,x.text||x.body,GRP[x.g]||'',AUD[x.aud]].join(' ').toLowerCase().includes(S.q);
const unread=()=>A.filter(a=>a.st==='pub'&&a.must).reduce((n,a)=>n+a.reads.filter(r=>!r[2]).length,0);
const WORK=['hold','suggest','draft'];
function items(){if(S.tab==='fe'){let r=F.filter(match);if(S.filter==='work')r=r.filter(x=>WORK.includes(x.st));if(S.filter==='pub')r=r.filter(x=>x.st==='pub'&&x.aud!=='internal');if(S.filter==='internal')r=r.filter(x=>x.aud==='internal');const o=['hold','suggest','draft','pub','off'];return r.slice().sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||Object.keys(GRP).indexOf(a.g)-Object.keys(GRP).indexOf(b.g)||(a.st==='suggest'?b.id.localeCompare(a.id,'en',{numeric:true}):0));}
 const o=['draft','sched','maint','pub'];return A.filter(match).sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||(b.at||'').localeCompare(a.at||''));}
const legacyN=()=>{try{return lifeIds132().length;}catch(err){return 0;}};
const allN=()=>ten.members.filter(m=>m.active).length;
function tabs(){$('tabs').innerHTML=[['fe','Pembaruan fitur',F.length],['an','Pengumuman',A.length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const c=s=>F.filter(x=>x.st===s).length,pub=c('pub'),sched=A.filter(a=>a.st==='sched').length,ad=A.filter(a=>a.st==='draft').length,need=c('hold')+c('suggest')+c('draft')+ad,br=A.find(a=>a.id==='BR-1');
 const nodes=[['suggest','Usulan dari rilis',c('suggest'),F.filter(x=>x.st==='suggest').length?`dev ${F.filter(x=>x.st==='suggest').map(x=>x.ver.replace('dev.','')).sort((a,b)=>a-b).filter((x,i,a)=>i===0||i===a.length-1).join('–')}`:'kosong'],['draft','Draf',c('draft')+c('hold')+ad,c('hold')?`termasuk ${c('hold')} ditahan`:'menunggu terbit'],['sched','Terjadwal',sched,sched?'tampil otomatis':'kosong'],['pub','Terbit',pub+A.filter(a=>a.st==='pub').length,'fitur & pengumuman'],['unread','Wajib baca, belum dibaca',unread(),'per label']];
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Komunikasi ke label · hari ini ${E(U.todayLabel())}</div><h2>${need?`${need} butir menunggu keputusanmu`:'Semua butir sudah diputuskan'}</h2>
  <p>${c('hold')?`${c('hold')} kalimat ditahan · `:''}${c('suggest')} usulan dari rilis dev${br?` · ${br.title} dibaca ${br.reads.filter(r=>r[2]).length} dari ${br.reads.length} label`:''}</p>
  <div class="acts"><button class="wbtn" data-urgent>Buka yang berikutnya ${ARROW}</button><button class="gbtn" data-preview>${S.preview?'Tutup pratinjau':'Pratinjau sebagai label'}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${pub}</b><span>butir terbit</span></div><div class="sbox"><b class="n">${unread()}</b><span>belum membaca</span></div></div></div>
  <div class="flow">${nodes.map(([k,t,n,d])=>`<button class="fn${n&&(k==='unread'||k==='suggest')?' hot':''}${n?'':' zero'}" data-node="${k}"><span class="dot n">${n}</span><span class="t">${t}</span><span class="d">${E(d)}</span></button>`).join('')}</div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari butir atau pengumuman" value="${E(S.q)}"></label>`;
function list(){const r=items();let h='';
 if(S.tab==='fe'){const cnt=k=>({all:F.length,work:F.filter(x=>WORK.includes(x.st)).length,pub:F.filter(x=>x.st==='pub'&&x.aud!=='internal').length,internal:F.filter(x=>x.aud==='internal').length})[k];
  h+=`<div class="ch"><h3>Pembaruan fitur <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all','Semua'],['work','Perlu keputusan'],['pub','Terbaca label'],['internal','Tim internal']].map(([k,t])=>`<button data-filter="${k}" aria-pressed="${S.filter===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  const grp=x=>WORK.includes(x.st)?'work':x.st==='pub'?'g:'+x.g:'off';let cur='';
  r.forEach((x,i)=>{const g=grp(x);if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${g==='work'?'orange':g==='off'?'faint':'green'})"></i><b>${g==='work'?'Perlu keputusan':g==='off'?'Ditarik':GRP[x.g]}</b> · ${r.filter(y=>grp(y)===g).length}</div>`;}
   h+=`<div class="it${S.sel.fe===x.id?' sel':''}" data-id="${x.id}" style="--i:${i}"><span class="ty">${SPARK}</span><div style="min-width:0"><div class="t1">${chip(...KIND[x.kind])} ${E(x.title)}</div><div class="t2">${AUD[x.aud]} · ${E(x.st==='suggest'?x.src:x.ver)}${x.ref?' · merujuk Standar & Penanda':''}</div></div><div class="rgt">${x.st==='pub'?'':chip(...FST[x.st])}</div></div>`;});}
 else{h+=`<div class="ch"><h3>Pengumuman <small class="n">${r.length}</small></h3>${find()}</div>${SA()?`<div class="hrow" style="margin:0 0 10px">${btn('Tulis pengumuman','data-do="an-new"','pri')}</div>`:''}`;let cur='';
  r.forEach((a,i)=>{if(a.st!==cur){cur=a.st;h+=`<div class="gh"><i style="--c:var(--${{draft:'faint',sched:'blue',pub:'green',maint:'orange'}[cur]})"></i><b>${AST[cur][0]}</b> · ${r.filter(y=>y.st===cur).length}</div>`;}
   const rd=a.reads.length?`${a.reads.filter(z=>z[2]).length}/${a.reads.length} dibaca`:'';
   h+=`<div class="it${S.sel.an===a.id?' sel':''}" data-id="${a.id}" style="--i:${i}"><span class="ty">${a.st==='maint'?TOOL:MEGA}</span><div style="min-width:0"><div class="t1">${E(a.title)} ${a.must?chip('Wajib baca','c-or'):''}</div><div class="t2">${a.st==='maint'?`${fd(a.at)} – ${a.end.slice(11,16).replace(':','.')} · ${{scheduled:'terjadwal',active:'sedang berlangsung',completed:'selesai'}[a.wst]||a.wst}`:`${AUD[a.aud]} · ${a.at?(a.st==='sched'?'tampil ':'')+fd(a.at):'belum dijadwalkan'}`}</div></div><div class="rgt">${rd?`<span class="duet">${rd}</span>`:chip(...AST[a.st])}</div></div>`;});}
 if(!r.length)h+=`<div class="empty"><b>Tidak ada butir</b>Coba ubah pencarian atau pil.</div>`;
 $('list').innerHTML=h;}
/* ---------- tampilan label (dipakai halaman label dan Pratinjau) ---------- */
function labelView(member,{mark=false}={}){const key=typeof key132==='function'?key132(member):member,legacy=(()=>{try{return lifeIds132().includes(key);}catch(err){return false;}})();
 const seen=store().seen[member]||((store().since||1)-1),vis=F.filter(x=>x.st==='pub'&&(x.aud==='all'||x.aud==='legacy'&&legacy)),isNew=x=>msOf(x.pubAt)>seen;
 const ann=newsAll().filter(n=>live(n)&&(n.audience==='lifetime'?legacy:n.aud137!=='internal')).slice().reverse();
 const out=`${ann.length?sec(0,'Pengumuman',ann.map(n=>`<div class="lprev"><div class="lph">${n.must?chip('Wajib dibaca','c-or'):chip('Pengumuman','c-bl')}<small>${fd(iso(n.at))}${n.reads?.[n.audience==='lifetime'?key:member]?' · sudah dibaca':''}</small></div><b>${E((n.title||[])[0])}</b><p>${E((n.body||[])[0])}</p></div>`).join('')):''}
  ${Object.keys(GRP).filter(g=>vis.some(x=>x.g===g)).map((g,i)=>sec(i+1,GRP[g],vis.filter(x=>x.g===g).map(x=>`<div class="lrow">${isNew(x)?'<span class="ldot" title="Baru"></span>':''}${chip(...KIND[x.kind])}<span>${E(x.text)}${x.ref?` <button class="lnk" data-go="standards">Lihat aturan</button>`:''}</span></div>`).join(''))).join('')}
  ${!vis.length&&!ann.length?'<div class="empty"><b>Belum ada pembaruan</b>Perubahan fitur dan pengumuman dari tim Rilis Musik tampil di sini.</div>':''}`;
 if(mark&&vis.some(isNew)){store().seen[member]=ten.now;try{save10();}catch(err){}}
 return {html:out,count:vis.length,fresh:vis.filter(isNew).length};}
/* ---------- rincian ---------- */
const audPick=(x,lock)=>`<div class="seg2 aud">${Object.entries(AUD).map(([k,t])=>`<button data-aud="${k}" aria-pressed="${x.aud===k}"${lock?' disabled':''}>${t}</button>`).join('')}</div>`;
const audNote=a=>a==='all'?`Terlihat oleh ${allN()} label aktif.`:a==='legacy'?`Hanya ${legacyN()} label paket lama (Annual/VIP).`:'Hanya Super Admin dan staf.';
function labelCard(x){if(x.aud==='internal')return `<div class="lprev off"><p class="where">Tidak terlihat oleh label · hanya tim internal.</p></div>`;
 return `<div class="lprev"><div class="lph"><span class="ldot"></span>${chip(...KIND[x.kind])}<small>${GRP[x.g]}${x.aud==='legacy'?' · hanya label paket lama':''}</small></div><p>${E(x.text)}</p>${x.ref?`<button class="lnk" data-go="standards">Lihat aturannya</button>`:''}</div>`;}
function nextFe(x){const sa=SA(),edit=S.form==='edit'?`<div class="reveal"><label class="fld">Judul<input id="f-title" value="${E(x.title)}"></label><label class="fld">Kalimat untuk label · bahasa sederhana<textarea id="f-text">${E(x.text)}</textarea></label><div class="hrow">${btn('Simpan','data-do="save"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
 if(!sa)return `<div class="nextc mute"><p>${FST[x.st][0]}${x.pubAt?' · sejak '+fd(x.pubAt):''}.</p><p class="where">Hanya Super Admin yang menulis dan menerbitkan.</p></div>`;
 if(x.st==='hold')return `<div class="nextc"><p class="quote">${E(x.hold)}</p>${S.form==='edit'?edit:`<div class="hrow">${btn('Tulis bunyi final','data-form="edit"','pri')}${btn('Tetap tahan','data-do="keep"')}</div>`}<div class="hrow">${btn('Terbitkan','data-do="publish"','',!x.decided)}</div>${x.decided?'':'<p class="where">Terbitkan aktif setelah bunyi final ditulis.</p>'}</div>`;
 if(x.st==='suggest')return `<div class="nextc"><p>Catatan rilis <b>${E(x.src)}</b> (bahasa tim):</p><p class="quote">${E(x.text)}</p><p class="where">Bila perubahannya hanya di tampilan Super Admin dan staf, cukup dicatat untuk tim internal.</p><div class="hrow">${btn('Jadikan draf untuk label','data-do="to-draft"')}${btn('Catat untuk tim internal','data-do="internal"','pri')}</div></div>`;
 if(x.st==='draft')return `<div class="nextc"><p>${E(x.note||'Draf')}</p>${edit||`<div class="hrow">${btn('Terbitkan sekarang','data-do="publish"','pri')}${btn('Ubah kalimat','data-form="edit"')}</div>`}<p class="where">Terbitkan bersama pemasangan fiturnya, supaya label tidak membaca fitur yang belum ada.</p></div>`;
 if(x.st==='off')return `<div class="nextc mute"><p>Ditarik dari tampilan label.</p><div class="hrow">${btn('Terbitkan lagi','data-do="publish"')}</div></div>`;
 return `<div class="nextc ok"><p>Terbit · terlihat oleh <b>${AUD[x.aud].toLowerCase()}</b> sejak ${fd(x.pubAt||'2026-09-01T09:00')}.</p>${edit||`<div class="hrow">${btn('Ubah kalimat','data-form="edit"')}${btn('Tarik dari tampilan','data-do="unpublish"','ghost dng')}</div>`}</div>`;}
const histH=h=>`<div class="hist">${h.slice().reverse().map(z=>`<div><span class="mini">${E(z.by?pini(z.by):'SY')}</span><span>${E(z.text)}<small style="display:block">${E(z.by?pname(z.by):'Sistem')} · ${fd(iso(z.at))}</small></span></div>`).join('')}</div>`;
function paneFe(x){let i=0;return `<div class="hd"><button class="back" data-back>${BACK}Pembaruan fitur</button><div class="k"><span class="ty">${SPARK}</span>${GRP[x.g]} · <span class="mono">${x.id}</span></div><h2>${E(x.title)}</h2><div class="meta">${chip(...KIND[x.kind])}<span class="sep"></span>${chip(...FST[x.st])}<span class="sep"></span>${E(x.st==='suggest'?x.src:x.ver)}</div></div>
 <div class="pb">${sec(i++,x.st==='pub'?'Keadaan':'Langkah berikutnya',nextFe(x))}
 ${sec(i++,'Pratinjau sebagai label',labelCard(x))}
 ${sec(i++,'Audiens',audPick(x,!SA())+`<p class="where" style="margin-top:8px">${audNote(x.aud)}</p>`)}
 ${x.was?sec(i++,'Dirapikan dari versi lama',`<div class="cmpw"><table class="cmpt"><tbody><tr><th>Sebelumnya</th><td class="old">${E(x.was)}</td></tr><tr><th>Sekarang</th><td><span class="new">${E(x.text)}</span></td></tr></tbody></table></div>`):''}
 ${x.ref?sec(i++,'Rujukan',`<div class="uses"><div data-go="standards" style="cursor:pointer">${SPARK}<span>${E(x.ref)}<small>angka aturan selalu diambil dari sini</small></span></div></div>`):''}
 ${sec(i++,'Riwayat',histH(x.hist||[]))}</div>`;}
function nextAn(a){const sa=SA();
 if(a.st==='maint')return `<div class="nextc"><p>${E(a.body)}</p><p class="where">${fd(a.at)} – ${fd(a.end)} · tampil otomatis sebagai pita di halaman terdampak, untuk semua pengguna.</p>${sa?`<div class="hrow">${btn(`Atur di Pengaturan Platform ${ARROW}`,'data-do="maint"')}</div>`:''}</div>`;
 if(a.st==='pub'){if(!a.must)return `<div class="nextc ok"><p>Terbit ${fd(a.at)} untuk ${AUD[a.aud].toLowerCase()} · tampil di Pembaruan label.</p></div>`;const n=a.reads.filter(r=>r[2]).length;
  return `<div class="nextc"><p>Terbit ${fd(a.at)} · <b>wajib baca</b>. ${n} dari ${a.reads.length} sudah membaca.</p><div class="meter" style="max-width:none"><i style="width:${a.reads.length?n/a.reads.length*100:0}%"></i></div><div class="parts">${a.reads.map(([k,l,t])=>`<div class="pt"><b class="pb2 ${t?'ok':''}">${t?'✓':''}</b><span><span class="pn">${E(l)}</span><small>${t?'dibaca '+fd(t):'belum membaca · tampil saat masuk aplikasi'}</small></span>${!t&&sa?`<span class="pa">${btn('Ingatkan',`data-resend="${E(k)}"`,'sm')}</span>`:''}</div>`).join('')}</div>${a.n.kind==='transition'?`<p class="where">Batas 30 hari pengembalian dihitung sejak tanggal dibaca · kasus berjalan ada di <button class="lnk" data-go="transactions">Transaksi › Pengembalian</button>.</p>`:''}</div>`;}
 if(!sa)return `<div class="nextc mute"><p>${AST[a.st][0]}.</p></div>`;
 if(a.st==='sched')return `<div class="nextc"><p>Tampil otomatis <b>${fd(a.at)}</b> untuk ${AUD[a.aud].toLowerCase()}.</p><div class="hrow">${btn('Terbitkan sekarang','data-do="an-publish"','pri')}${btn('Batalkan jadwal','data-do="an-unsched"','ghost')}</div></div>`;
 const def=U.iso16(ten.now+864e5).slice(0,10)+'T09:00';
 return `<div class="nextc"><p>Draf pengumuman.</p><label class="fld">Judul<input id="f-title" maxlength="90" value="${E(a.title)}"></label><label class="fld">Isi<textarea id="f-body" maxlength="1200">${E(a.body)}</textarea></label><label class="tg"><input type="checkbox" id="f-must" ${a.must?'checked':''}> Wajib baca · tampil sekali dengan tombol "Saya sudah membaca"</label><label class="fld">Jadwal tampil · WIB<input id="f-at" type="datetime-local" value="${def}"></label><div class="hrow">${btn('Terbitkan sekarang','data-do="an-publish"','pri')}${btn('Jadwalkan','data-do="an-sched"')}${btn('Hapus draf','data-do="an-delete"','ghost dng')}</div></div>`;}
function paneAn(a){let i=0;return `<div class="hd"><button class="back" data-back>${BACK}Pengumuman</button><div class="k"><span class="ty">${a.st==='maint'?TOOL:MEGA}</span>${a.st==='maint'?'Pemeliharaan':'Pengumuman'} · <span class="mono">${E(a.id)}</span></div><h2>${E(a.title)}</h2><div class="meta">${chip(...AST[a.st])}${a.must?'<span class="sep"></span>'+chip('Wajib baca','c-or'):''}<span class="sep"></span>${AUD[a.aud]}</div></div>
 <div class="pb">${sec(i++,a.st==='pub'||a.st==='maint'?'Keadaan':'Langkah berikutnya',nextAn(a))}
 ${a.st!=='maint'?sec(i++,'Pratinjau sebagai label',`<div class="modalprev"><div class="mp"><small>${a.must?'Wajib dibaca':'Pengumuman'} · Rilis Musik</small><b>${E(a.title||'(judul)')}</b><p>${E(a.body||'(isi)')}</p>${a.must?`<span class="btn pri sm" style="justify-self:start">Saya sudah membaca</span>`:''}</div></div>`):''}
 ${a.st!=='maint'?sec(i++,'Audiens',(a.st==='draft'?audPick({aud:a.aud==='internal'?'all':a.aud},!SA()):`<p class="para">${AUD[a.aud]}</p>`)+`<p class="where" style="margin-top:8px">${audNote(a.aud)}</p>`):''}
 ${a.hist.length?sec(i++,'Riwayat',histH(a.hist)):''}</div>`;}
function panePreview(){const m=ten.members.find(x=>x.active)||{},v=labelView(m.id);
 return `<div class="hd"><button class="back" data-preview>${BACK}Tutup pratinjau</button><div class="k"><span class="ty">${EYE}</span>Pratinjau sebagai label · contoh: ${E(m.name)}</div><h2>Pembaruan</h2><div class="meta">${v.count} butir · ${v.fresh} baru sejak kunjungan terakhir</div></div>
 <div class="pb">${v.html}<p class="where">Butir "Di balik layar", draf, usulan, dan kalimat yang ditahan tidak terlihat oleh label.</p></div>`;}
let lastPane='';
function pane(){if(S.preview){$('pin').innerHTML=panePreview();return;}const x=items().find(z=>z.id===S.sel[S.tab]);$('pin').innerHTML=x?(S.tab==='fe'?paneFe(x):paneAn(x)):`<div class="empty" style="padding:60px 20px"><b>Pilih butir</b>Rinciannya tampil di sini.</div>`;
 const key=S.tab+S.sel[S.tab]+S.preview,p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input:not([type=checkbox]),#pin textarea').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&(S.read||S.preview)&&!!S.sel[S.tab]);stick();});}
function toast(t){toast137(DEF,t);}
function open(id){S.preview=false;S.sel[S.tab]=id;S.form=null;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
function commit(fn){if(typeof atomic10==='function')atomic10(fn);else{fn();save10();}}
function act(a,arg){if(!SA()){toast('Hanya Super Admin');return;}let msg='';
 try{
 if(S.tab==='fe'){const x=F.find(z=>z.id===S.sel.fe);if(!x)return;const log=t=>(x.hist||(x.hist=[])).push({at:ten.now,text:t,by:state.user});
  if(a==='save'){const t=val('f-text'),ti=val('f-title');if(!t){toast('Kalimat tidak boleh kosong');return;}commit(()=>{x.text=t;if(ti)x.title=ti;if(x.st==='hold')x.decided=true;log('Kalimat diubah');});msg='Tersimpan';}
  else if(a==='keep'){msg='Tetap ditahan · tidak terbaca label';}
  else if(a==='publish'){commit(()=>{x.st='pub';x.pubAt=U.iso16(ten.now);log('Diterbitkan');});msg=x.aud==='internal'?'Terbit untuk tim internal':`Terbit · ${x.aud==='legacy'?legacyN()+' label paket lama':allN()+' label'} melihat tanda "Baru"`;}
  else if(a==='unpublish'){commit(()=>{x.st='off';log('Ditarik dari tampilan label');});msg='Ditarik · tidak terlihat label';}
  else if(a==='to-draft'){commit(()=>{x.st='draft';x.aud='all';x.ver='v1.1';x.g=x.g==='team'?'start':x.g;x.note='Draf dari catatan rilis · tulis ulang dengan bahasa label sebelum terbit.';log('Dijadikan draf untuk label');});msg='Jadi draf · tulis ulang sebelum terbit';}
  else if(a==='internal'){commit(()=>{x.st='pub';x.aud='internal';x.pubAt=U.iso16(ten.now);log('Dicatat untuk tim internal');});msg='Tercatat untuk tim internal · tidak terlihat label';}}
 else{if(a==='an-new'){const s=tr132();let id;commit(()=>{let k=s.news.length+1;while(s.news.some(n=>n.id==='BR-'+k))k++;id='BR-'+k;s.news.push({id,kind:'news',audience:'all',must:false,at:ten.now,by:state.user,reads:{},title:['',''],body:['',''],st:'draft',hist137:[{at:ten.now,text:'Draf dibuat',by:state.user}]});});S.tab='an';S.sel.an=id;S.read=true;lastSig='';load();paint();toast('Draf pengumuman dibuat');return;}
  const x=A.find(z=>z.id===S.sel.an);if(!x)return;const n=x.n,log=t=>(n.hist137||(n.hist137=[{at:n.at,text:n.must?'Diterbitkan · wajib baca':'Diterbitkan',by:n.by}])).push({at:ten.now,text:t,by:state.user});
  const fill=()=>{const ti=val('f-title'),bo=val('f-body');if(!ti||!bo){toast('Isi judul dan isi pengumuman');return false;}n.title=[ti,ti];n.body=[bo,bo];n.must=!!$('f-must')?.checked;return true;};
  if(a==='maint'){try{goControl126('settings');ui115.tab='maintenance';render();}catch(err){toast('Buka Pengaturan Platform › Pemeliharaan');}return;}
  if(a==='an-publish'){if(n.st==='draft'&&!fill())return;commit(()=>{n.st='pub';n.at=ten.now;n.by=state.user;log('Diterbitkan'+(n.must?' · wajib baca':''));});msg=`Terbit untuk ${AUD[audOf(n)].toLowerCase()}${n.must?' · tampil sekali saat label masuk':''}`;}
  else if(a==='an-sched'){if(!fill())return;const at=$('f-at')?.value;const ms=at?Date.parse(at+':00+07:00'):0;if(!ms||ms<=ten.now){toast('Pilih waktu tampil setelah sekarang');return;}commit(()=>{n.st='sched';n.at=ms;log('Dijadwalkan tampil '+fd(U.iso16(ms)));});msg=`Dijadwalkan · tampil otomatis ${fd(U.iso16(ms))}`;}
  else if(a==='an-unsched'){commit(()=>{n.st='draft';log('Jadwal dibatalkan');});msg='Kembali menjadi draf';}
  else if(a==='an-delete'){commit(()=>{const s=tr132();s.news=s.news.filter(z=>z!==n);});S.sel.an=null;msg='Draf dihapus';}
  else if(a==='resend'){const k=arg,m=typeof mem132==='function'?mem132(k):RM10.getMember(ten,k);if(!m){toast('Label tidak ditemukan');return;}commit(()=>{ten.notifications.unshift({id:++ten.serial,member:m.id,key:'news137',ref:n.id,at:ten.now});log('Pengingat dikirim ke '+m.name);});msg=`Pengingat dikirim ke ${m.name}`;}
  else if(a==='aud'){commit(()=>{n.audience=arg==='legacy'?'lifetime':'all';log('Audiens: '+AUD[arg]);});msg='Audiens: '+AUD[arg];}}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;lastSig='';load();paint();if(msg)toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.filter='all';S.read=false;S.form=null;S.preview=false;paint();return;}
  const nd=t.closest('[data-node]');if(nd){const k=nd.dataset.node;S.preview=false;S.q='';if(k==='suggest'||k==='draft'){S.tab='fe';S.filter='work';}else if(k==='pub'){S.tab='fe';S.filter='pub';}else{S.tab='an';S.filter='all';}paint();const r=items();const pick=k==='suggest'?r.find(x=>x.st==='suggest'):k==='sched'?r.find(x=>x.st==='sched'):k==='unread'?r.find(x=>x.must&&x.st==='pub'&&x.reads.some(z=>!z[2])):r[0];if(pick)open(pick.id);return;}
  if(t.closest('[data-urgent]')){S.tab='fe';S.filter='work';S.q='';const r=items();if(r[0])open(r[0].id);else{S.tab='an';const d=items().find(x=>x.st==='draft');if(d)open(d.id);else toast('Semua butir sudah diputuskan');}return;}
  if(t.closest('[data-preview]')){S.preview=!S.preview;S.read=S.preview;lastPane='';paint();if(S.preview)$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const fl=t.closest('[data-filter]');if(fl){S.filter=fl.dataset.filter;paint();return;}
  const au=t.closest('[data-aud]');if(au&&!au.disabled){if(!SA())return;if(S.tab==='fe'){const x=F.find(z=>z.id===S.sel.fe);commit(()=>{x.aud=au.dataset.aud;(x.hist||(x.hist=[])).push({at:ten.now,text:'Audiens diubah: '+AUD[x.aud],by:state.user});});lastSig='';load();paint();toast('Audiens: '+AUD[x.aud]);}else act('aud',au.dataset.aud);return;}
  const rs=t.closest('[data-resend]');if(rs){act('resend',rs.dataset.resend);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;paint();$('f-text')?.focus();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const go=t.closest('[data-go]');if(go){if(go.dataset.go==='standards')window.stdTab137='waktu';if(!go137(go.dataset.go))toast('Buka menu terkait');return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
const sig=()=>F.map(x=>x.id+x.st+x.aud+(x.hist||[]).length).join('|')+'#'+A.map(a=>a.id+a.st+a.reads.filter(r=>r[2]).length+a.title+a.must+a.aud).join('|')+'#'+U.today()+ten.role+state.user;
const DEF={id:'updates',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='updates'&&!state.preview,
 init(r){root=r;bind();},
 draw(){load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
/* halaman Pembaruan label: butir terbit + pengumuman, tanda "Baru" sejak kunjungan terakhir */
const LHTML='<main><div class="ph rl"><div><h1>Pembaruan</h1><div class="sub">Perubahan fitur dan pengumuman dari tim Rilis Musik.</div></div></div><section class="card rl" id="lbody" style="padding:22px 24px"></section><div class="toast" id="toast"></div></main>';
let lvisit='';
const LDEF={id:'updates-label',css:STYLE,html:LHTML,
 when:()=>isLabel10()&&state.page==='module'&&typeof v4==='object'&&v4.module==='updates',
 init(r){lroot=r;r.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){window.stdTab137='waktu';go137('standards');}});},
 draw(){F=store().items;const key=ten.member+':'+ten.now;const first=lvisit!==ten.member;const v=labelView(ten.member,{mark:false});const s=v.html+ten.member;if(s===lastL&&!first)return;lastL=s;lroot.getElementById('lbody').innerHTML=v.html;if(first){lvisit=ten.member;setTimeout(()=>{if(LDEF.host?.isConnected){labelView(ten.member,{mark:true});}},1500);}}};
page137(LDEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when()||LDEF.when())return '';return modBefore.apply(this,arguments);};
/* pengumuman: hanya yang terbit / sudah waktunya tampil yang sampai ke label */
if(typeof pendingNews132==='function'){const pb=pendingNews132;pendingNews132=function(id){return pb.apply(this,arguments).filter(n=>live(n));};}
if(typeof audience132==='function'){const ab=audience132;audience132=function(n){return n&&!live(n)?[]:ab.apply(this,arguments);};}
})();
