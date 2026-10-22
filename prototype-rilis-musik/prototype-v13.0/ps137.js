/* v1.1.0-dev.41 — Pengaturan Platform dirancang ulang (rancangan disetujui 22 Okt 2026, mock ps1).
   Pita "Kesiapan produksi" menghitung nilai yang belum ditetapkan; bagian Paket & Harga (satu versi untuk paket, isi paket,
   harga layanan, harga & paket kredit — berlaku untuk pembelian baru), Website, Pemeliharaan, Navigasi, Tampilan, Riwayat
   aktivitas. Prosedur & Pengingat sudah di Standar & Penanda; Identitas Perusahaan di Kontrak Label › Penandatangan.
   Data & tindakan asli: Packages122.configure, act111('catalogue'), settings11 (WAMI), RM10 catalogue_save (kredit),
   System115 save/publish (content, navigation, maintenance), save130 (kartu header), activity115. Hanya Super Admin. */
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
.shell.noside{grid-template-columns:minmax(0,1fr)!important;padding:20px 28px 60px;max-width:1440px;margin:0 auto;width:100%;box-sizing:border-box}
.ibicon{background:var(--ink);color:var(--onink)}
.it .t1 .mono{font-size:11px;color:var(--faint)}
.lg.jl{width:100%;text-align:left;cursor:pointer}.lg.jl svg{width:14px;height:14px;margin-left:auto;color:var(--muted)}
.kpi{display:grid;grid-template-columns:120px minmax(0,1fr);gap:18px;align-items:center}
.ring{width:110px;height:110px;border-radius:50%;display:grid;place-content:center;text-align:center;background:radial-gradient(closest-side,var(--card) 78%,transparent 80% 100%),conic-gradient(var(--blue) calc(var(--p) * 1%),var(--line) 0)}
.ring b{font-weight:300;font-size:26px;line-height:1}.ring small{font-size:11px;color:var(--muted)}
.impact2{padding:12px 14px;border-radius:14px;background:var(--white);font-size:13.5px}.impact2 b{font-weight:500}.impact2 ul{margin:6px 0 0;padding-left:18px;display:grid;gap:4px}.impact2 li.w{color:var(--red)}
.ho{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;border-radius:12px;background:var(--white);font-size:13.5px}.ho>span{display:grid;gap:2px;margin-right:auto}.ho small{color:var(--muted);font-size:12px}
.mx{display:grid;gap:4px}
.mxh,.mxr{display:grid;grid-template-columns:minmax(0,1.3fr) repeat(3,minmax(0,1fr));gap:6px;align-items:stretch}
.mxh span{font-size:12px;color:var(--muted);padding:0 4px}
.mxn{display:grid;gap:2px;text-align:left;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px}.mxn small{font-size:11.5px;color:var(--muted)}
.cell{display:grid;place-content:center;gap:2px;text-align:center;min-height:46px;border-radius:12px;font-size:15px;background:var(--soft);color:var(--muted)}
.cell small{font-size:10.5px;line-height:1.25;color:var(--muted);padding:0 4px}
button.cell.on{background:color-mix(in srgb,var(--green) 16%,var(--card));color:var(--green);font-weight:500}
button.cell.part{background:color-mix(in srgb,var(--orange) 14%,var(--card));color:var(--orange)}
button.cell.off{background:transparent;box-shadow:inset 0 0 0 1px var(--line)}
button.cell:hover{box-shadow:inset 0 0 0 1.5px var(--text)}
.cell.lock{background:color-mix(in srgb,var(--blue) 9%,var(--card));color:var(--blue)}.cell.lock svg{width:14px;height:14px;justify-self:center}
.cell.none{opacity:.5}
.mxr.sa .mxn{background:transparent;box-shadow:inset 0 0 0 1px var(--line)}
.mxd{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 14px;padding:10px 12px 12px;margin:-2px 0 4px;border-radius:12px;background:var(--white)}
.sens{display:grid;gap:6px}
.sr{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:var(--soft);font-size:14px}.sr>span{display:grid;gap:4px;margin-right:auto}.sr b{font-weight:400}.sr small{color:var(--muted);font-size:12px}
.sw{width:46px;height:26px;border-radius:99px;background:var(--line);position:relative;flex:none;transition:background .2s}
.sw i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #0003;transition:transform .2s}
.sw.on{background:var(--green)}.sw.on i{transform:translateX(20px)}
.chg2{display:grid;gap:6px}.chg2>div{display:flex;align-items:center;gap:10px;font-size:13.5px;padding:8px 10px;border-radius:10px;background:var(--white)}
.lockl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.lockl>div{display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px}.lockl svg{width:15px;height:15px;color:var(--blue);flex:none}.lockl span{display:grid;gap:2px}.lockl small{color:var(--muted);font-size:12px}
.opts button[disabled]{opacity:.45;cursor:not-allowed}
@media (max-width:820px){.shell.noside{padding:14px 16px 70px!important}.kpi{grid-template-columns:1fr}.mxh{display:none}.mxr{grid-template-columns:1fr 1fr 1fr}.mxr .mxn{grid-column:1/-1}.mxd,.lockl{grid-template-columns:1fr}}
.mvl{display:grid;gap:6px}.mvl .mvi{width:100%}
.mvi{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:var(--soft);text-align:left;font-size:13px}
.mvi svg{width:14px;height:14px;color:var(--muted);flex:none}.mvi b{font-weight:400}
.old2{color:var(--muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--red) 60%,transparent)}
.todo{margin:0;padding-left:18px;display:grid;gap:4px;font-size:13.5px}
.cin{font:inherit;font-size:13.5px;width:100%;max-width:150px;padding:7px 10px;border-radius:10px;border:0;box-shadow:inset 0 0 0 1px var(--line);background:var(--white);color:var(--text);outline:0;box-sizing:border-box}
.cin.sm{max-width:60px}.cin.miss{box-shadow:inset 0 0 0 1.5px var(--orange)}
.cin:focus{box-shadow:inset 0 0 0 2px var(--blue)}
.ptbl th small{display:block;font-size:11.5px;color:var(--muted);font-weight:400}
.ptbl tbody th{color:var(--text);font-size:14px}
.bmx .mxh,.bmx .mxr{grid-template-columns:minmax(0,1.4fr) repeat(4,minmax(0,1fr))}
.cell2{max-width:none;text-align:center;min-height:46px;border-radius:12px}
.basek{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13.5px;color:var(--muted)}.basek .cin{max-width:130px}
.cmps{display:block;font-size:11.5px;color:var(--muted);margin-top:3px}
.kp{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.kp .cin{max-width:none}
.lp{border-radius:18px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--line);background:var(--white)}
.lph2{padding:22px;color:#fff;background:linear-gradient(120deg,#0b3fbf,#2a73ff 60%,#7aa8ff);display:grid;gap:8px}.lph2 b{font-weight:400;font-size:22px;letter-spacing:-.3px}.lph2 p{margin:0;font-size:13px;color:#ffffffd8;line-height:1.5}
.lbtn{justify-self:start;padding:8px 14px;border-radius:99px;background:#fff;color:#0d3fae;font-size:13px}
.lpp{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:14px}.lpp>div{display:grid;gap:2px;padding:10px;border-radius:12px;background:var(--soft);font-size:13px}.lpp b{font-weight:400;font-size:15px}.lpp small{color:var(--muted);font-size:11.5px}
.lpc{padding:0 14px 14px;font-size:13px;display:grid;gap:2px}.lpc small{color:var(--muted);font-size:11.5px}
.mwc{display:grid;gap:10px;padding:14px;border-radius:16px;background:var(--soft)}.mwc+.mwc{margin-top:8px}.mwh{display:flex;align-items:center;gap:10px;justify-content:space-between}.mwh b{font-weight:400;font-size:15px}
.navg{display:grid;gap:10px}.ng{display:grid;gap:4px}.ng>small{font-size:12px;color:var(--muted);padding-left:2px}
.nr{display:flex;align-items:center;gap:6px;padding:8px 8px 8px 12px;border-radius:12px;background:var(--soft);font-size:14px}.nr>span{margin-right:auto}.nr.hid>span{color:var(--faint);text-decoration:line-through}
.ib2{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--white);color:var(--muted)}.ib2 svg{width:14px;height:14px}.ib2[disabled]{opacity:.3}.ib2.lk{background:transparent;font-size:12px}
.nhead{display:flex;flex-wrap:wrap;gap:6px}.nhead span{font-size:13px;padding:7px 12px;border-radius:99px;background:var(--ink);color:var(--onink)}
.hero{position:relative;overflow:hidden;border-radius:20px;min-height:170px;padding:22px;color:#fff;background:linear-gradient(115deg,#0a3bb5,#2a73ff);display:flex;align-items:flex-end}
.hero .art{position:absolute;inset:0;background:radial-gradient(circle at calc(70% + var(--x)) calc(40% + var(--y)),#ffffff55 0,#ffffff00 calc(var(--sz) * .35));transition:background .1s}
.hero .art.img{background:radial-gradient(circle at calc(70% + var(--x)) calc(40% + var(--y)),#ffd27a 0,#ff7aa8 calc(var(--sz) * .18),#7a5cff calc(var(--sz) * .34),#ffffff00 calc(var(--sz) * .5))}
.hero>div{position:relative;display:grid;gap:2px;text-shadow:0 2px 12px rgba(0,0,0,var(--sh))}.hero small{font-size:13px;opacity:.85}.hero b{font-weight:400;font-size:26px}.hero span{font-size:12.5px;opacity:.85}
.rg{display:grid;grid-template-columns:150px minmax(0,1fr) 52px;align-items:center;gap:10px;font-size:13.5px;color:var(--muted);margin-top:8px}.rg b{font-weight:400;color:var(--text);text-align:right}
@media (max-width:820px){.bmx .mxh{display:grid;grid-template-columns:repeat(4,1fr)}.bmx .mxh span:first-child{display:none}.bmx .mxr{grid-template-columns:repeat(4,1fr)}.bmx .mxr .mxn{grid-column:1/-1}.kp,.lpp{grid-template-columns:1fr 1fr}.rg{grid-template-columns:1fr 52px}.rg input{grid-column:1/-1;grid-row:2}}
.cmpt{width:100%;border-collapse:collapse;font-size:13.5px}
.cmpt th{font-weight:400;color:var(--muted);font-size:12px;text-align:left;padding:9px 8px 9px 0;vertical-align:middle}
.cmpt td{padding:8px 8px 8px 0;border-top:1px solid var(--line);vertical-align:middle}
.cmpt tbody th{border-top:1px solid var(--line);color:var(--text);font-size:13.5px}
.ptbl tbody th{font-size:14px}
.cmpw{border-radius:14px;background:var(--soft);padding:4px 12px;overflow-x:auto}
@media (max-width:600px){.cmpw{overflow:visible}.rt thead{display:none}.rt,.rt tbody{display:block}
.rt tr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 10px;padding:12px 0;border-top:1px solid var(--line)}.rt tr:first-child{border-top:0}
.rt th,.rt td{border:0!important;padding:0!important}.rt th{grid-column:1/-1}.rt td.full{grid-column:1/-1;display:flex;align-items:center;gap:8px}.rt td.full .cmps{margin:0}
.rt td[data-l]::before{content:attr(data-l);display:block;font-size:11.5px;color:var(--muted);margin-bottom:4px}.rt .cin,.rt .cin.sm{max-width:none}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Pengaturan Platform</h1><div class="sub">Aturan main yang jarang diubah tapi berdampak luas: paket &amp; harga, website, pemeliharaan, menu, tampilan, dan jejak audit.</div></div>
 </div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,lastSig='',D=null;
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),UP=sv('<path d="m6 15 6-6 6 6"/>'),DOWN=sv('<path d="m6 9 6 6 6-6"/>'),EYE=sv('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>');
const IC={plans:sv('<path d="M3 7h18v10H3z"/><circle cx="12" cy="12" r="2.5"/><path d="M7 7V5h10v2"/>'),web:sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>'),mw:sv('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),nav:sv('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),look:sv('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 15-5-5L5 19"/>'),act:sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='',id='')=>`<div class="sec" style="--k:${i}"${id?` id="${id}"`:''}><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const rp=n=>n==null||n===''?'—':'Rp '+Math.round(n).toLocaleString('id-ID');
const num=v=>{const t=String(v??'').trim();if(t==='')return null;const n=+t.replace(/[^\d]/g,'');return Number.isFinite(n)?n:null;};
const pname=id=>people.find(p=>p.id===id)?.name||RM10.getMember(ten,id)?.name||(id?id:'Sistem');
const pini=id=>people.find(p=>p.id===id)?.initials||(RM10.getMember(ten,id)?String(RM10.getMember(ten,id).name).split(' ').map(w=>w[0]).join('').slice(0,2):'SY');
const S={sel:'plans',read:false,form:null,nt:'sa',pd:null,nd:null,web:null,mwf:null,look:null,apill:'Semua',q:''};
const wide=()=>innerWidth>1240;
const store=()=>{ten.platform137??={priceVersion:1,annualFinal:false,packsFinal:false,priceHist:[{at:'2026-09-01T09:00',text:'Versi 1 · nilai uji dari katalog sebelumnya',by:'jeck'}],nav:null};return ten.platform137;};
const SVC=['promo','smartlink','visualizer'];
/* ---------- data asli ---------- */
function load(){const pk=Packages122.init(ten),c104=catalogue104(),cr=ten.credit11?.versions?.at(-1)?.rules||{},wami=settings11(),ad=ten.addons111,sys=system115();
 D={plans:pk.plans.map(p=>({...p})),pver:pk.version,credit:{price:c104.creditPrice,offers:JSON.parse(JSON.stringify(c104.offers))},rules:cr,services:[...SVC.map(id=>ad.catalogue.find(s=>s.id===id)).filter(Boolean).map(s=>({id:s.id,name:s.name,price:s.price,included:(s.included||[]).slice(),unit:s.unit,src:s})),{id:'wami',name:'Registrasi WAMI',price:wami.price,included:(wami.included||[]).slice(),unit:'lagu',src:wami}],
  content:sys.areas.content,nav:sys.areas.navigation,mw:sys.areas.maintenance,signer:ten.signer137?.entity||{},hdr:config130()};}
function ready(){const st=store(),out=[];D.plans.filter(p=>p.id!=='Basic').forEach(p=>{if(p.monthly==null)out.push(['plans',`Harga bulanan ${p.name} belum ditetapkan`,'plan-tbl']);});if(!st.annualFinal)out.push(['plans','Harga tahunan masih nilai uji','plan-tbl']);if(!st.packsFinal)out.push(['plans','Paket kredit masih contoh','kpack']);
 [['email','Email'],['phone','Telepon'],['address','Alamat']].forEach(([k,t])=>{if(!String(D.signer[k]||'').trim())out.push(['id',`${t} perusahaan kosong (Kontrak › Penandatangan)`,'']);});
 if(!(st.nav&&st.nav.version===D.nav.version))out.push(['nav','Susunan menu belum diverifikasi','']);if(!webLive())out.push(['web','Website belum terbit',''])
 return out;}
const webLive=()=>D.content.version>1||!!D.content.appliedAt;
const mwSched=()=>(D.mw?.published?.windows||[]).filter(w=>{try{return ['scheduled','active'].includes(maintState131(w));}catch(err){return w.status==='scheduled';}});
const SECS=()=>[['Komersial',[['plans','Paket & Harga',`versi ${store().priceVersion}${dirtyPlans()?' · ada perubahan belum terbit':''}`,(()=>{const n=ready().filter(r=>r[0]==='plans').length;return n?chip(n+' belum final','c-or'):chip('Final','c-gr');})()]]],
 ['Publik',[['web','Website','landing page Rilis Musik',webLive()?chip('Terbit','c-gr'):chip('Draf','')],['mw','Pemeliharaan',`${mwSched().length} jadwal · pengumuman di Pembaruan`,mwSched().length?chip(`Terjadwal ${fd(iso(mwSched()[0].startAt).slice(0,10)).replace(/ \d{4}$/,'')}`,'c-bl'):chip('Tidak ada','')]]],
 ['Aplikasi',[['nav','Navigasi','menu Super Admin, Staf, Label',store().nav&&store().nav.version===D.nav.version?chip('Diverifikasi','c-gr'):chip('Belum diverifikasi','c-or')],['look','Tampilan','kartu header Dashboard','']]],
 ['Audit',[['act','Riwayat aktivitas','semua perubahan, siapa & kapan','']]]];
function band(){const r=ready(),c=k=>r.filter(x=>x[0]===k).length,mw=mwSched();
 const nodes=[['plans','Paket & Harga',c('plans')],['id','Identitas resmi',c('id')],['nav','Navigasi',c('nav')],['web','Website',c('web')],['mw','Pemeliharaan',mw.length]];
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Kesiapan produksi · hari ini ${E(U.todayLabel())}</div><h2>${r.length?`${r.length} hal perlu ditetapkan sebelum produksi`:'Siap untuk produksi'}</h2>
  <p>${[c('plans')?'harga paket belum final':'',c('id')?'identitas resmi belum lengkap':'',c('nav')?'menu belum diverifikasi':'',c('web')?'website belum terbit':''].filter(Boolean).join(' · ')||'semua nilai sudah ditetapkan'}</p>
  <div class="acts"><button class="wbtn" data-next>Isi yang berikutnya ${ARROW}</button><button class="gbtn" data-sel="act">Riwayat aktivitas</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">v${store().priceVersion}</b><span>Paket & Harga</span></div><div class="sbox"><b class="n">${mw.length}</b><span>pemeliharaan terjadwal</span></div></div></div>
  <div class="flow">${nodes.map(([k,t,n])=>`<button class="fn${n&&k!=='mw'?' hot':''}${n?'':' zero'}" data-node="${k}"><span class="dot n">${n}</span><span class="t">${t}</span><span class="d">${k==='mw'?(n?'terjadwal':'kosong'):n?'perlu ditetapkan':'siap'}</span></button>`).join('')}</div>`;}
function list(){let h='<div class="ch"><h3>Bagian</h3></div>';
 SECS().forEach(([g,items])=>{h+=`<div class="gh"><i style="--c:var(--faint)"></i><b>${g}</b></div>`;items.forEach(([id,t,sub,st],i)=>{h+=`<div class="it${S.sel===id?' sel':''}" data-sel="${id}" style="--i:${i}"><span class="ty">${IC[id]}</span><div style="min-width:0"><div class="t1">${t} ${st}</div><div class="t2">${E(sub)}</div></div></div>`;});});
 h+=`<div class="gh"><i style="--c:var(--faint)"></i><b>Dipindah dari sini</b></div><div class="mvl">${[['Prosedur & Pengingat','Standar & Penanda › Aturan waktu','standards'],['Identitas Perusahaan','Kontrak Label › Penandatangan','contracts']].map(([a,b,n])=>`<button class="mvi" data-go="${n}"><span class="old2">${a}</span>${ARROW}<span><b>${b}</b></span></button>`).join('')}</div>`;
 $('list').innerHTML=h;}
/* ---------- Paket & Harga (satu versi) ---------- */
function pd(){if(!S.pd)S.pd={plans:D.plans.map(p=>({id:p.id,monthly:p.monthly,annual:p.annual})),services:D.services.map(s=>({id:s.id,price:s.price,included:s.included.slice()})),credit:JSON.parse(JSON.stringify(D.credit)),annualFinal:store().annualFinal,packsFinal:store().packsFinal};return S.pd;}
function changes(){const d=pd(),out=[];d.plans.forEach(p=>{const o=D.plans.find(x=>x.id===p.id);if(o.monthly!==p.monthly)out.push(`${o.name} bulanan ${rp(o.monthly)} → ${rp(p.monthly)}`);if(o.annual!==p.annual)out.push(`${o.name} tahunan ${rp(o.annual)} → ${rp(p.annual)}`);});
 d.services.forEach(s=>{const o=D.services.find(x=>x.id===s.id);if(o.price!==s.price)out.push(`${o.name} ${rp(o.price)} → ${rp(s.price)}`);if(o.included.slice().sort().join()!==s.included.slice().sort().join())out.push(`${o.name} termasuk di ${s.included.join(', ')||'tidak ada paket'}`);});
 if(d.credit.price!==D.credit.price)out.push(`Harga 1 kredit ${rp(D.credit.price)} → ${rp(d.credit.price)}`);for(const k of ['single','ep','album']){const a=D.credit.offers[k],b=d.credit.offers[k];if(a.quantity!==b.quantity||a.bonus!==b.bonus)out.push(`Paket kredit ${PACK[k]} ${a.quantity}+${a.bonus} → ${b.quantity}+${b.bonus}`);}
 if(d.annualFinal!==store().annualFinal)out.push(d.annualFinal?'Harga tahunan dinyatakan final':'Harga tahunan kembali nilai uji');if(d.packsFinal!==store().packsFinal)out.push(d.packsFinal?'Paket kredit dinyatakan final':'Paket kredit kembali contoh');return out;}
const dirtyPlans=()=>!!S.pd&&changes().length>0;
const PACK={single:'Single',ep:'EP',album:'Album'};
function panePlans(){let i=0;const d=pd(),ch=changes(),r=ready().filter(x=>x[0]==='plans'),st=store(),plans=D.plans,cost=D.rules.cost||{};
 const next=ch.length?`<div class="nextc"><p><b>Versi ${st.priceVersion+1}</b> siap diterbitkan. Berlaku untuk <b>pembelian baru</b>; label yang sudah membeli tetap memakai ketentuan lamanya.</p><div class="chg2">${ch.map(t=>`<div><span class="chip c-bl"><i></i>Berubah</span>${E(t)}</div>`).join('')}</div><label class="fld">Catatan versi · wajib<input id="f-note" placeholder="Mis. harga bulanan ditetapkan"></label><div class="hrow">${btn(`Terbitkan versi ${st.priceVersion+1}`,'data-do="publish"','pri')}${btn('Batalkan perubahan','data-do="discard"')}</div></div>`
  :r.length?`<div class="nextc"><p>${r.length} nilai belum final:</p><ul class="todo">${r.map(x=>`<li><button class="lnk" data-jump="${x[2]}">${E(x[1])}</button></li>`).join('')}</ul><p class="where">Isi langsung di tabel di bawah; semua perubahan dikumpulkan menjadi satu versi baru.</p></div>`:`<div class="nextc ok"><p>Semua nilai final · versi ${st.priceVersion}.</p></div>`;
 return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.plans}</span>Komersial · versi ${st.priceVersion} berlaku ${fd(iso(st.priceHist.at(-1).at).slice(0,10))}</div><h2>Paket &amp; Harga</h2><div class="meta">${st.annualFinal?chip('Harga tahunan final','c-gr'):chip('Draf · nilai uji','c-or')}${ch.length?'<span class="sep"></span>'+chip(`Versi ${st.priceVersion+1} belum terbit`,'c-bl'):''}<span class="sep"></span>Satu mata uang: kredit</div></div>
 <div class="pb">${sec(i++,'Langkah berikutnya',next)}
 ${sec(i++,'Paket',`<div class="cmpw"><table class="cmpt ptbl rt"><thead><tr><th>Paket</th><th>Tahunan</th><th>Bulanan</th></tr></thead><tbody>${plans.map((p,k)=>{const q=d.plans[k];return `<tr><th>${E(p.name)}<small>${p.id==='Basic'?'Tanpa langganan · bayar per rilisan':'Langganan'}</small></th><td data-l="Tahunan">${p.id==='Basic'?'Rp 0':`<input class="cin" data-plan="${k}|annual" value="${q.annual?.toLocaleString('id-ID')??''}" placeholder="belum">`}</td><td data-l="Bulanan">${p.id==='Basic'?'—':`<input class="cin${q.monthly==null?' miss':''}" data-plan="${k}|monthly" placeholder="belum" value="${q.monthly?.toLocaleString('id-ID')??''}">`}</td></tr>`;}).join('')}</tbody></table></div><label class="tg" style="margin-top:8px"><input type="checkbox" id="f-final" ${d.annualFinal?'checked':''}> Harga tahunan sudah final (bukan nilai uji)</label>`,'','plan-tbl')}
 ${sec(i++,'Isi paket',`<div class="mx bmx"><div class="mxh"><span></span>${plans.map(p=>`<span>${E(p.name)}</span>`).join('')}</div><div class="mxr"><span class="mxn">Kredit harian<small>kredit/hari · Aturan Penggunaan</small></span>${plans.map(p=>`<span class="cell none">${p.id==='Basic'?'—':E(D.rules.daily??'—')}</span>`).join('')}</div>${d.services.map((s,k)=>`<div class="mxr"><span class="mxn">${E(D.services[k].name)}<small>termasuk dalam paket</small></span>${plans.map(p=>p.id==='Basic'?'<span class="cell none">—</span>':`<button class="cell ${s.included.includes(p.id)?'on':'off'}" data-inc="${k}|${E(p.id)}">${s.included.includes(p.id)?'✓':'—'}</button>`).join('')}</div>`).join('')}</div><p class="where">Klik sel untuk menyertakan layanan dalam paket. Benefit berlaku untuk pembelian baru.</p>`)}
 ${sec(i++,'Harga layanan',`<div class="cmpw"><table class="cmpt rt"><thead><tr><th>Layanan</th><th>Rupiah</th><th>Kredit</th></tr></thead><tbody>${Object.entries(cost).map(([k,n])=>`<tr><th>Rilisan · ${E(k)}</th><td data-l="Rupiah">${rp(n*d.credit.price)}<small class="cmps"> setara</small></td><td data-l="Kredit">${n} kredit</td></tr>`).join('')}${d.services.map((s,k)=>`<tr><th>${E(D.services[k].name)}<small>per ${E(D.services[k].unit||'satuan')}</small></th><td data-l="Rupiah"><input class="cin" data-svc="${k}" value="${s.price.toLocaleString('id-ID')}"></td><td data-l="Kredit"><small class="cmps">rupiah atau benefit paket</small></td></tr>`).join('')}</tbody></table></div><p class="where">Kredit dipakai untuk rilisan (Standard · Express · MAX) dengan nilai yang sama dengan harga rupiahnya. Layanan tambahan dibayar rupiah atau benefit paket.</p>`)}
 ${sec(i++,'Paket kredit',`<div class="basek">Harga 1 kredit <input class="cin" data-base value="${d.credit.price.toLocaleString('id-ID')}"></div><div class="kp">${['single','ep','album'].map(k=>`<label class="fld">${PACK[k]} · jumlah kredit<input class="cin" data-pack="${k}|quantity" value="${d.credit.offers[k].quantity}"></label><label class="fld">${PACK[k]} · bonus<input class="cin" data-pack="${k}|bonus" value="${d.credit.offers[k].bonus}"></label>`).join('')}</div><label class="tg" style="margin-top:8px"><input type="checkbox" id="f-packs" ${d.packsFinal?'checked':''}> Isi paket kredit sudah final (bukan contoh)</label>`,'','kpack')}
 ${sec(i++,'Aturan kredit & bonus',`<div class="facts"><span>Kredit harian</span><b>${E(D.rules.daily??'—')} kredit/hari · berlaku ${E(D.rules.temporaryHours??48)} jam</b><span>Kredit yang dipakai lebih dulu</span><b>yang paling cepat berakhir</b><span>Biaya layanan rilis</span><b>${Object.entries(cost).map(([k,n])=>`${E(k)} ${n}`).join(' · ')} kredit</b><span>Gagal di distributor</span><b>kredit hangus</b><span>Ditolak sebelum pengiriman</span><b>kredit kembali</b><span>Kesalahan sistem</span><b>kredit kembali atau diganti</b><span>Bonus kredit</span><b>diberikan per label, wajib alasan (alat bonus di Pemantauan Keuangan)</b></div>`)}
 ${sec(i++,'Riwayat versi',`<div class="hist">${st.priceHist.slice().reverse().map(h=>`<div><span class="mini">${E(pini(h.by))}</span><span>${E(h.text)}<small style="display:block">${E(pname(h.by))} · ${fd(iso(h.at))}</small></span></div>`).join('')}</div>`)}</div>`;}
/* ---------- Website ---------- */
function paneWeb(){let i=0;const c=D.content,bl=(c.draft||c.published).blocks,w=S.web||(S.web={title:bl.hero?.title||'',text:bl.hero?.text||'',cta:bl.hero?.cta||''}),plansDraft=!store().annualFinal||D.plans.some(p=>p.id!=='Basic'&&p.monthly==null),sg=D.signer,contact=['email','phone','address'].every(k=>String(sg[k]||'').trim());
 const C=[[!plansDraft,'Harga paket final',plansDraft?'masih draf di Paket & Harga':'otomatis dari Paket & Harga'],[contact,'Kontak perusahaan lengkap',contact?'dari Kontrak › Penandatangan':'email, telepon, atau alamat kosong'],[!!w.title.trim(),'Hero terisi',w.title.trim()?'judul & tombol':'kosong'],[(bl.faq?.items||[]).length>0,'FAQ',`${(bl.faq?.items||[]).length} pertanyaan`]];
 const live=webLive();return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.web}</span>Publik · landing page</div><h2>Website</h2><div class="meta">${live?chip(`Terbit · versi ${c.version}`,'c-gr'):chip('Draf','')}${c.draft?'<span class="sep"></span>'+chip('Ada draf','c-bl'):''}</div></div>
 <div class="pb">${sec(i++,'Langkah berikutnya',`<div class="nextc">${live?`<p>Terbit ${c.appliedAt?fd(iso(c.appliedAt)):''}. Perubahan hero berikutnya terbit sebagai versi baru.</p>`:''}<div class="checks">${C.map(([g,t,m])=>`<div class="ck ${g?'':'warn'}"><b>${g?'✓':'!'}</b>${t}<small>${E(m)}</small></div>`).join('')}</div><div class="hrow">${btn(live?'Terbitkan perubahan':'Terbitkan website','data-do="web-publish"','pri')}${contact?'':btn('Lengkapi kontak di Kontrak › Penandatangan','data-go="contracts"')}</div><p class="where">Boleh terbit dengan peringatan; peringatannya tercatat di catatan versi.</p></div>`)}
 ${sec(i++,'Hero',`<label class="fld">Judul<input id="w-title" maxlength="160" value="${E(w.title)}"></label><label class="fld">Subjudul<textarea id="w-text">${E(w.text)}</textarea></label><label class="fld">Tombol<input id="w-cta" maxlength="60" value="${E(w.cta)}"></label>`)}
 ${sec(i++,'Pratinjau',`<div class="lp"><div class="lph2"><b>${E(w.title)}</b><p>${E(w.text)}</p><span class="lbtn">${E(w.cta)}</span></div><div class="lpp">${D.plans.map(p=>`<div><small>${E(p.name)}</small><b>${p.annual?rp(p.annual):'Rp 0'}</b><small>${p.annual?'/ tahun':'bayar per rilisan'}${p.monthly?` · ${rp(p.monthly)}/bln`:''}</small></div>`).join('')}</div><div class="lpc"><small>Kontak</small>${E(sg.name||'Rilis Musik')} · ${contact?E([sg.email,sg.phone].join(' · ')):'<span class="noart">email &amp; telepon belum diisi</span>'}</div></div><p class="where">Harga paket dan kontak diambil otomatis; tidak diketik ulang di sini.</p>`)}
 ${sec(i++,'FAQ',`<div class="ledger">${(bl.faq?.items||[]).map(x=>`<div class="lg"><span>${E(x.title)}<small>${E(x.text)}</small></span></div>`).join('')||'<p class="where">Belum ada pertanyaan.</p>'}</div>`)}</div>`;}
/* ---------- Pemeliharaan ---------- */
const MODS=[['releases','Rilisan'],['payments','Pembayaran & layanan'],['royalty','Royalti & penarikan'],['all','Seluruh aplikasi']];
const modName=m=>({releases:'Rilisan',payments:'Pembayaran & layanan',royalty:'Royalti & penarikan',all:'Seluruh aplikasi',tickets:'Tiket',wami:'WAMI',addons:'Layanan Tambahan',account:'Akun'}[m]||m);
function paneMw(){let i=0;const W=(D.mw?.published?.windows||[]),f=S.mwf;
 return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.mw}</span>Publik · jeda layanan</div><h2>Pemeliharaan</h2><div class="meta">${mwSched().length} terjadwal · versi ${D.mw?.version||1}</div></div>
 <div class="pb">${sec(i++,'Jadwal',W.length?W.map(w=>{let s='scheduled';try{s=maintState131(w);}catch(err){}return `<div class="mwc"><div class="mwh"><b>${E(w.title)}</b>${{scheduled:chip('Terjadwal','c-bl'),active:chip('Berlangsung','c-or'),completed:chip('Selesai','c-gr'),cancelled:chip('Dibatalkan','')}[s]||chip(s,'')}</div><div class="facts"><span>Waktu</span><b>${fd(iso(w.startAt))} – ${iso(w.endAt).slice(11,16).replace(':','.')} WIB</b><span>Modul</span><b>${(w.modules||[]).map(modName).join(' · ')}</b><span>Mode</span><b>${w.mode==='readonly'?'Baca-saja':'Pengumuman saja'}</b><span>Pengumuman</span><b>pita otomatis di halaman terdampak · <button class="lnk" data-go="updates">Pembaruan › Pengumuman</button></b></div>${['scheduled','active'].includes(s)?`<div class="hrow">${btn('Batalkan jadwal',`data-mwc="${E(w.id)}"`,'ghost dng')}</div>`:''}</div>`;}).join(''):'<p class="where">Belum ada jadwal.</p>')}
 ${sec(i++,'Jadwalkan baru',S.form==='mw'?`<div class="reveal nextc"><label class="fld">Judul<input id="m-title" placeholder="Mis. Pemeliharaan server"></label><label class="fld">Mulai · WIB<input id="m-from" type="datetime-local" value="${E(f.from)}"></label><div class="fld">Durasi<div class="seg2">${[1,2,4].map(h=>`<button data-mdur="${h}" aria-pressed="${f.dur===h}">${h} jam</button>`).join('')}</div></div><div class="fld">Modul terdampak<div class="pills">${MODS.map(([k,x])=>`<button data-mmod="${k}" aria-pressed="${f.mods.includes(k)}">${x}</button>`).join('')}</div></div><div class="fld">Mode<div class="seg2">${[['info','Pengumuman saja'],['readonly','Baca-saja']].map(([k,x])=>`<button data-mmode="${k}" aria-pressed="${f.mode===k}">${x}</button>`).join('')}</div></div><label class="fld">Pesan untuk pengguna<input id="m-msg" placeholder="Mis. Rilisan tidak bisa dikirim selama pemeliharaan."></label><div class="hrow">${btn('Jadwalkan & buat draf pengumuman','data-do="mw-new"','pri')}${btn('Batal','data-form=""')}</div></div>`:`<div class="hrow">${btn('+ Jadwalkan pemeliharaan','data-form="mw"')}</div><p class="where">Setiap jadwal membuat draf pengumuman di Pembaruan; pita di aplikasi tampil otomatis sesuai waktu.</p>`)}</div>`;}
/* ---------- Navigasi ---------- */
const TGT={sa:'super-platform',staf:'admin-platform',label:'label-platform'};
const STALE={wami:'digabung ke Layanan Tambahan',cleanup:'dihapus untuk Super Admin (dev.28)',monitor:'pindah ke header: Pemantauan Keuangan',system:'menjadi Pengaturan Platform di header',plans:'digabung ke Pengaturan Platform › Paket & Harga',access:'pindah ke header: Staff & Akses',settings:'menjadi Pengaturan Platform di header'};
const RENAME={work:'Pekerjaan',tickets:'Tiket Bantuan'};
function navItems(t){const cfg=(S.nd&&S.nt==='sa'?S.nd:D.nav.published).targets[TGT[t]]||{items:[],groups:[]};return {cfg,items:cfg.items.filter(x=>!x.parent&&!(t!=='label'&&STALE[x.id]&&x.id!=='settings'))};}
const nname=(t,x)=>t==='label'&&x.id==='tickets'?'Pesan':RENAME[x.id]||x.name;
function paneNav(){let i=0;const st=store(),ver=st.nav&&st.nav.version===D.nav.version,edit=S.nt==='sa',{cfg,items}=navItems(S.nt),dirty=!!S.nd;
 const groups=[...(cfg.groups||[]).map(g=>[g.id,g.name]),['','Lainnya']];
 return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.nav}</span>Aplikasi · versi ${D.nav.version}</div><h2>Navigasi</h2><div class="meta">${ver?chip('Diverifikasi','c-gr'):chip('Belum diverifikasi','c-or')}${dirty?'<span class="sep"></span>'+chip('Susunan belum disimpan','c-bl'):''}</div></div>
 <div class="pb">${sec(i++,'Langkah berikutnya',dirty?`<div class="nextc"><p>Susunan menu Super Admin berubah.</p><label class="fld">Catatan versi · wajib<input id="f-note" placeholder="Mis. Transaksi dipindah ke atas"></label><div class="hrow">${btn(`Simpan sebagai versi ${D.nav.version+1}`,'data-do="nav-save"','pri')}${btn('Batalkan','data-do="nav-reset"')}</div></div>`:ver?`<div class="nextc ok"><p>Diverifikasi ${fd(iso(st.nav.at))} oleh ${E(pname(st.nav.by))} · versi ${D.nav.version}.</p></div>`:`<div class="nextc"><p>Periksa susunan menu tiap jenis akun, lalu tandai diverifikasi.</p><div class="hrow">${btn('Tandai sudah diverifikasi','data-do="nav-verify"','pri')}</div></div>`)}
 ${sec(i++,'Jenis akun',`<div class="seg2">${[['sa','Super Admin'],['staf','Staf'],['label','Label']].map(([k,t])=>`<button data-nt="${k}" aria-pressed="${S.nt===k}">${t}</button>`).join('')}</div><p class="where" style="margin-top:8px">${edit?'Ubah urutan dan sembunyikan menu; nama dan isi menu mengikuti aplikasi.':S.nt==='staf'?'Mengikuti izin peran di Staff & Akses — tidak diatur di sini.':'Menu label sesuai aplikasi saat ini. Registrasi WAMI untuk label akan bergabung ke Layanan Tambahan saat Mode Label ditinjau.'}</p>`)}
 ${sec(i++,'Sidebar',`<div class="navg">${groups.map(([gid,gn])=>{const its=items.filter(x=>(x.group||'')===gid);if(!its.length)return '';return `<div class="ng"><small>${E(gn)}</small>${its.map((x,ii)=>`<div class="nr${x.visible===false?' hid':''}"><span>${E(nname(S.nt,x))}</span>${edit?`<button class="ib2" data-mv="${E(x.id)}|-1" ${ii?'':'disabled'} aria-label="Naik">${UP}</button><button class="ib2" data-mv="${E(x.id)}|1" ${ii<its.length-1?'':'disabled'} aria-label="Turun">${DOWN}</button>${x.protected?'<span class="ib2 lk" title="Selalu tampil">🔒</span>':`<button class="ib2" data-hide="${E(x.id)}" aria-label="Tampil/sembunyi">${EYE}</button>`}`:''}</div>`).join('')}</div>`;}).join('')}</div>${S.nt==='sa'?`<div class="ng" style="margin-top:10px"><small>Header</small><div class="nhead">${['Kotak Masuk','Pemantauan Keuangan','Staff & Akses','Pengaturan Platform'].map(h=>`<span>${h}</span>`).join('')}</div></div>`:S.nt==='staf'?`<div class="ng" style="margin-top:10px"><small>Header</small><div class="nhead"><span>Kotak Masuk</span></div></div>`:''}`)}
 ${sec(i++,'Dibersihkan otomatis',`<div class="ledger">${Object.entries(STALE).filter(([k])=>k!=='settings').map(([k,b])=>`<div class="lg"><span><span class="old2">${E((D.nav.published.targets[TGT.sa]?.items||[]).find(x=>x.id===k)?.name||k)}</span><small>${E(b)}</small></span></div>`).join('')}</div>`)}</div>`;}
/* ---------- Tampilan ---------- */
function paneLook(){let i=0;const c=D.hdr,v=c.value;
 return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.look}</span>Aplikasi · versi ${c.version||1}</div><h2>Tampilan</h2><div class="meta">Kartu header Dashboard · ${c.asset?.kind==='image'?E(c.asset.name):'desain bawaan'}</div></div>
 <div class="pb">${sec(i++,'Desain saat ini',`<div class="facts"><span>Desain</span><b>${c.asset?.kind==='image'?E(c.asset.name)+' · '+c.asset.width+'×'+c.asset.height:'Bawaan Rilis Musik'}</b><span>Ukuran</span><b>${v.size}%</b><span>Posisi</span><b>horizontal ${v.x}% · vertikal ${v.y}%</b><span>Berlaku untuk</span><b>Super Admin, Staf, dan Label</b></div>`)}
 ${sec(i++,'Atur',`<p class="where">Editor tampilan: unggah desain, geser langsung, ubah ukuran dari sudut, slider presisi, dan simpan. Perubahan tercatat tanpa menyalin gambar ke riwayat.</p><div class="hrow">${btn('Buka editor tampilan '+ARROW,'data-look-editor','pri')}</div>`)}</div>`;}
/* ---------- Riwayat aktivitas ---------- */
const MOD={work:'Pekerjaan',contracts:'Kontrak Label',updates:'Pembaruan',inbox:'Kotak Masuk',finance:'Pemantauan Keuangan',releases:'Rilisan',tickets:'Tiket',services:'Layanan Tambahan',wami:'Layanan Tambahan',transactions:'Transaksi',royalty:'Royalti',withdraw:'Penarikan',staff:'Staff & Akses',system:'Pengaturan',labels:'Manajemen Label',credits:'Kredit',cleanup:'Data lama'};
const KND={created:'Dibuat',message:'Pesan dikirim',internal:'Catatan internal',claim:'Mulai ditangani',assign:'Dialihkan',send:'Diteruskan',results:'Hasil dicatat',finish:'Diselesaikan',request:'Kelengkapan diminta',publish:'Diterbitkan','draft-save':'Draf disimpan','draft-discard':'Draf dibuang',approve:'Disetujui',paid:'Dibayar',submit:'Diajukan',live:'Ditandai tayang',deliver:'Dikirim'};
let ACTC=null,ACTK='';
function acts(){const k=(ten.events?.length||0)+':'+(system115().audit?.length||0)+':'+(model114().audit?.length||0)+':'+U.today();if(ACTK!==k||!ACTC){try{ACTC=activity115();}catch(err){ACTC=[];}ACTK=k;}return ACTC;}
const rowOf=a=>[iso(a.at),a.actor,MOD[a.module]||(a.module?a.module[0].toUpperCase()+a.module.slice(1):'Lainnya'),(KND[a.kind]||KND[a.title]||a.title||a.kind||'')+(a.note?' · '+String(a.note).slice(0,90):''),a.target||''];
const actRows=()=>acts().map(rowOf).filter(r=>(S.apill==='Semua'||r[2]===S.apill)&&(!S.q||[...r,pname(r[1])].join(' ').toLowerCase().includes(S.q))).sort((a,b)=>b[0].localeCompare(a[0]));
function paneAct(){const all=acts(),menus=['Semua',...new Set(all.map(a=>MOD[a.module]||(a.module?a.module[0].toUpperCase()+a.module.slice(1):'Lainnya')))],r=actRows();
 return `<div class="hd"><button class="back" data-back>${BACK}Bagian</button><div class="k"><span class="ty">${IC.act}</span>Audit</div><h2>Riwayat aktivitas</h2><div class="meta">${all.length} catatan · nama aksi berbahasa Indonesia · pelaku bernama</div></div>
 <div class="pb">${sec(0,'Saring',`<div class="pills">${menus.map(m=>`<button data-apill="${E(m)}" aria-pressed="${S.apill===m}">${E(m)}</button>`).join('')}</div><label class="find" style="width:100%;margin-top:8px"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="aq" placeholder="Cari aksi, nama, atau referensi" value="${E(S.q)}"></label>`)}
 ${sec(1,'Aktivitas',`<div class="hist">${r.slice(0,40).map(([t,w,m,x,ref])=>`<div><span class="mini${people.some(p=>p.id===w)?'':' lbl'}">${E(pini(w))}</span><span>${E(x)}${ref?` · <span class="mono">${E(ref)}</span>`:''}<small style="display:block">${E(pname(w))} · ${E(m)} · ${fd(t)}</small></span></div>`).join('')||'<p class="where">Tidak ada aktivitas.</p>'}</div>`,`${Math.min(40,r.length)} dari ${r.length} tampil`)}
 ${sec(2,'Audit',`<div class="hrow">${btn('Unduh CSV','data-do="csv"','pri')}</div><p class="where">CSV berisi semua baris sesuai saringan.</p>`)}</div>`;}
let lastPane='';
function pane(){$('pin').innerHTML={plans:panePlans,web:paneWeb,mw:paneMw,nav:paneNav,look:paneLook,act:paneAct}[S.sel]();const p=$('pane');if(S.sel!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=S.sel;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input[id]:not([type=checkbox]):not([type=file]):not([type=range]),#pin textarea[id]').forEach(el=>{vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{band();list();pane();$('wk').classList.toggle('reading',!wide()&&S.read);stick();});}
function repane(){keep(()=>{band();list();pane();stick();});}
function toast(t){toast137(DEF,t);}
function open(id){S.sel=id;S.form=null;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
const sysPublish=(area,value,note)=>{const a=area115(area);if(a.draft&&area!=='content')throw Error('Ada draf lama di bagian ini; buang atau terapkan dulu.');atomic115('save',{area,version:a.version,draftVersion:a.draftVersion,value,note});const b=area115(area);try{atomic115('publish',{area,version:b.version,draftVersion:b.draftVersion,note});}catch(err){try{const c=area115(area);atomic115('discard',{area,version:c.version,draftVersion:c.draftVersion,note:'Batal terbit'});}catch(e){}throw err;}};
async function act(a){let msg='';
 try{
 if(a==='publish'){const note=val('f-note');if(!note){toast('Tulis catatan versi');return;}const d=pd(),ch=changes(),st=store(),actor={role:ten.role,id:state.user,authorized:super114()};
  atomic10(()=>{for(const q of d.plans){const o=D.plans.find(x=>x.id===q.id);if(o.monthly===q.monthly&&o.annual===q.annual)continue;const cur=Packages122.init(ten).plans.find(x=>x.id===q.id);const values={name:cur.name,monthly:q.monthly,annual:q.annual,discount:cur.discount,until:cur.until||'',limited:!!cur.limited,enabled:!!cur.enabled,colors:cur.colors,planning:!!cur.planning,campaign:!!cur.campaign,wami:cur.wami,design:cur.design,notes:cur.notes||''};Packages122.configure(ten,actor,{version:Packages122.init(ten).version,id:q.id,values});}
   for(const q of d.services){const o=D.services.find(x=>x.id===q.id);if(o.price===q.price&&o.included.join()===q.included.join())continue;if(q.id==='wami'){const w=settings11(),before={price:w.price,included:w.included.slice()};w.price=q.price;w.included=q.included.slice();w.version++;(w.history||(w.history=[])).unshift({at:ten.now,actor:state.user,before,after:{price:w.price,included:w.included.slice()}});}else{const svc=ten.addons111.catalogue.find(x=>x.id===q.id);act111('catalogue',{version:ten.addons111.version,service:{...JSON.parse(JSON.stringify(svc)),price:q.price,included:q.included.slice()}});}}
   if(d.credit.price!==D.credit.price||JSON.stringify(d.credit.offers)!==JSON.stringify(D.credit.offers))RM10.act(ten,'catalogue_save',{kind:'credits',price:d.credit.price,offers:d.credit.offers});
   st.annualFinal=d.annualFinal;st.packsFinal=d.packsFinal;st.priceVersion++;st.priceHist.push({at:ten.now,text:`Versi ${st.priceVersion} diterbitkan · ${note} · ${ch.length} perubahan · berlaku untuk pembelian baru`,by:state.user});});
  S.pd=null;msg=`Versi ${store().priceVersion} terbit · pembelian lama tetap memakai ketentuannya`;}
 else if(a==='discard'){S.pd=null;msg='Perubahan dibatalkan';}
 else if(a==='web-publish'){const c=D.content,base=JSON.parse(JSON.stringify(c.draft||c.published)),t=val('w-title'),x=val('w-text'),cta=val('w-cta');if(!t){toast('Isi judul hero');return;}base.blocks.hero={...base.blocks.hero,title:t,text:x,cta};const warn=[];if(!store().annualFinal||D.plans.some(p=>p.id!=='Basic'&&p.monthly==null))warn.push('harga paket draf');if(!['email','phone','address'].every(k=>String(D.signer[k]||'').trim()))warn.push('kontak belum lengkap');sysPublish('content',base,'Website diterbitkan dari Pengaturan Platform'+(warn.length?' · peringatan: '+warn.join(', '):''));S.web=null;msg='Website terbit'+(warn.length?` · ${warn.length} peringatan tercatat`:'');}
 else if(a==='mw-new'){const f=S.mwf,t=val('m-title'),from=val('m-from'),m=val('m-msg')||`${t}. Beberapa fitur sementara tidak tersedia.`;if(t.length<3){toast('Isi judul pemeliharaan');return;}const st=Date.parse(from+':00+07:00');if(!st||st<=ten.now){toast('Pilih waktu mulai setelah sekarang');return;}if(!f.mods.length){toast('Pilih modul terdampak');return;}
  const W=JSON.parse(JSON.stringify(D.mw.published)),ids=W.windows.map(w=>+String(w.id).replace(/\D/g,'')||0),id='MW-'+String(Math.max(0,...ids)+1).padStart(2,'0');W.windows.push({id,title:t,kind:'scheduled',mode:f.mode,status:'scheduled',startAt:new Date(st).toISOString(),endAt:new Date(st+f.dur*3600000).toISOString(),modules:f.mods.slice(),message:m,notify:'24h',note:''});
  sysPublish('maintenance',W,`Jadwal ${id} ditambahkan`);
  if(typeof tr132==='function'){const s=tr132();let k=s.news.length+1;while(s.news.some(n=>n.id==='BR-'+k))k++;s.news.push({id:'BR-'+k,kind:'news',audience:'all',must:false,at:ten.now,by:state.user,reads:{},title:[t,t],body:[m+` (${fd(U.iso16(st))} WIB, ${f.dur} jam)`,m],st:'draft',hist137:[{at:ten.now,text:`Draf dibuat dari jadwal pemeliharaan ${id}`,by:state.user}]});save10();}
  S.form=null;msg='Terjadwal · draf pengumuman dibuat di Pembaruan';}
 else if(a==='nav-save'){const note=val('f-note');if(!note){toast('Tulis catatan versi');return;}sysPublish('navigation',S.nd,note);S.nd=null;try{navSession115=null;}catch(err){}render();msg=`Susunan menu versi ${area115('navigation').version} disimpan`;}
 else if(a==='nav-reset'){S.nd=null;msg='Perubahan dibatalkan';}
 else if(a==='nav-verify'){const st=store();atomic10(()=>{st.nav={version:D.nav.version,at:ten.now,by:state.user};});msg='Susunan menu ditandai diverifikasi';}
 else if(a==='csv'){const rows=[['Waktu','Pelaku','Menu','Aksi','Referensi'],...actRows().map(r=>[fd(r[0]),pname(r[1]),r[2],r[3],r[4]])];try{const l=document.createElement('a');l.href=URL.createObjectURL(new Blob(['\ufeff'+rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n')],{type:'text/csv'}));l.download='riwayat-aktivitas.csv';document.body.append(l);l.click();l.remove();}catch(e){}msg=`Riwayat diunduh (${rows.length-1} baris)`;}
 }catch(err){toast(String(err?.message||err));return;}
 lastSig='';load();paint();if(msg)toast(msg);}
function moveNav(id,d){const n=S.nd||(S.nd=JSON.parse(JSON.stringify(D.nav.published))),t=n.targets[TGT.sa],arr=t.items,i=arr.findIndex(x=>x.id===id),g=arr[i].group||'';let j=i+d;while(j>=0&&j<arr.length&&((arr[j].group||'')!==g||arr[j].parent||STALE[arr[j].id]))j+=d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const nd=t.closest('[data-node]');if(nd){const k=nd.dataset.node;if(k==='id'){go('contracts');return;}open(k);return;}
  if(t.closest('[data-next]')){const r=ready().find(x=>x[0]!=='id')||ready()[0];if(!r)return;if(r[0]==='id'){go('contracts');return;}open(r[0]);if(r[2])setTimeout(()=>$(r[2])?.scrollIntoView({behavior:'smooth',block:'center'}),400);return;}
  const sl=t.closest('[data-sel]');if(sl){open(sl.dataset.sel);return;}
  const gg=t.closest('[data-go]');if(gg){go(gg.dataset.go);return;}
  const jp=t.closest('[data-jump]');if(jp){$(jp.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'center'});return;}
  const ic=t.closest('[data-inc]');if(ic){const [k,p]=ic.dataset.inc.split('|');const L=pd().services[+k].included;L.includes(p)?L.splice(L.indexOf(p),1):L.push(p);repane();return;}
  const ntb=t.closest('[data-nt]');if(ntb){S.nt=ntb.dataset.nt;repane();return;}
  const mv=t.closest('[data-mv]');if(mv&&!mv.disabled){const [id,d]=mv.dataset.mv.split('|');moveNav(id,+d);repane();return;}
  const hd=t.closest('[data-hide]');if(hd){const n=S.nd||(S.nd=JSON.parse(JSON.stringify(D.nav.published))),x=n.targets[TGT.sa].items.find(z=>z.id===hd.dataset.hide);if(x&&!x.protected)x.visible=x.visible===false;repane();return;}
  const mc=t.closest('[data-mwc]');if(mc){try{const W=JSON.parse(JSON.stringify(D.mw.published));const w=W.windows.find(z=>z.id===mc.dataset.mwc);w.status='cancelled';sysPublish('maintenance',W,`Jadwal ${w.id} dibatalkan`);lastSig='';load();paint();toast('Jadwal dibatalkan · pita tidak tampil');}catch(err){toast(String(err?.message||err));}return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;if(S.form==='mw')S.mwf={dur:2,mods:[],mode:'info',from:U.iso16(ten.now+2*864e5).slice(0,10)+'T22:00'};repane();return;}
  const md=t.closest('[data-mdur]');if(md){S.mwf.dur=+md.dataset.mdur;S.mwf.from=val('m-from')||S.mwf.from;repane();return;}
  const mm=t.closest('[data-mmod]');if(mm){const x=mm.dataset.mmod,L=S.mwf.mods;L.includes(x)?L.splice(L.indexOf(x),1):L.push(x);S.mwf.from=val('m-from')||S.mwf.from;repane();return;}
  const mo=t.closest('[data-mmode]');if(mo){S.mwf.mode=mo.dataset.mmode;S.mwf.from=val('m-from')||S.mwf.from;repane();return;}
  const ap=t.closest('[data-apill]');if(ap){S.apill=ap.dataset.apill;repane();return;}
  if(t.closest('[data-look-editor]')){window.ps137Legacy=true;ui115.tab='appearance';render();scrollTo({top:0,behavior:'instant'});return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
 });
 root.addEventListener('change',async e=>{const t=e.target,d=S.sel==='plans'?pd():null;
  if(t.dataset.plan){const [k,f]=t.dataset.plan.split('|');d.plans[+k][f]=num(t.value);repane();}
  else if(t.dataset.svc){d.services[+t.dataset.svc].price=num(t.value)??0;repane();}
  else if(t.hasAttribute('data-base')){d.credit.price=num(t.value)||d.credit.price;repane();}
  else if(t.dataset.pack){const [k,f]=t.dataset.pack.split('|');d.credit.offers[k][f]=num(t.value)??0;repane();}
  else if(t.id==='f-final'){d.annualFinal=t.checked;repane();}
  else if(t.id==='f-packs'){d.packsFinal=t.checked;repane();}
});
 root.addEventListener('input',e=>{const t=e.target;if(t.id==='aq'){S.q=t.value.toLowerCase();repane();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function go(n){if(n==='standards')window.stdTab137='waktu';if(n==='contracts')window.ctTab137='ttd';if(!go137(n))toast('Buka menu terkait');}
function intake(){if(window.psSel137){S.sel=window.psSel137;window.psSel137=null;S.read=true;lastSig='';return;}try{if(typeof ui115==='object'&&ui115.tab==='packages'){S.sel='plans';ui115.tab='content';lastSig='';}else if(typeof ui115==='object'&&ui115.tab==='maintenance'){S.sel='mw';ui115.tab='content';lastSig='';}}catch(err){}}
const sig=()=>[store().priceVersion,store().annualFinal,store().packsFinal,JSON.stringify(store().nav),D.pver,JSON.stringify(D.credit),D.services.map(s=>s.price+s.included.join()).join('|'),D.content.version,D.content.draftVersion,D.nav.version,D.nav.draftVersion,D.mw?.version,D.mw?.draftVersion,D.hdr.version,JSON.stringify(D.signer),U.today(),state.user].join('#');
const DEF={id:'settings',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.page==='module'&&typeof v4==='object'&&v4.module==='cms'&&!(window.ps137Legacy&&ui115.tab==='appearance')&&(()=>{try{return super114();}catch(err){return false;}})(),
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
/* tombol Pengaturan di header selalu membuka halaman baru; editor tampilan lengkap dibuka dari bagian Tampilan */
if(typeof goControl126==='function'){const gb=goControl126;goControl126=function(id){if(id==='settings'||id==='packages')window.ps137Legacy=false;return gb.apply(this,arguments);};}
if(typeof page115==='function'){const pb=page115;page115=function(){if(DEF.when())return '';return pb.apply(this,arguments);};}
})();
