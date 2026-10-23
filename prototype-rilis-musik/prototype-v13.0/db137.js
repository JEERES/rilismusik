/* v1.1.0-dev.42 (dua bahasa sejak dev.43) — Dashboard dirancang ulang (rancangan disetujui, mock db1), tiga tampilan:
   Super Admin: Sorotan di header → Uang (siklus + kewajiban + 4 kotak) → Perlu keputusan Anda + Kondisi menu → Pertumbuhan.
   Staf: Berikutnya untukmu di header → Pekerjaanku per waktu · Hasilku & kehadiran · Pengumuman (tanpa angka bisnis).
   Label: Sorotan di header → Royalti & penarikan · Kredit · Rilisan · Pesan & layanan · Pembaruan.
   Tidak ada angka sendiri: setiap baris dibaca dari ringkasan menu (DEF.sum) yang sama dengan pita birunya, atau dari model aslinya. */
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
main{display:grid;gap:20px;align-content:start;min-width:0}
.mockbar{display:flex;align-items:center;justify-content:flex-end;gap:12px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);padding:6px 8px;border:1px dashed var(--line);border-radius:16px}
.seg3{display:flex;background:var(--soft);border-radius:99px;padding:3px}.seg3 button{padding:7px 14px;border-radius:99px;font-size:13px;color:var(--muted)}.seg3 button[aria-pressed=true]{background:var(--white);color:var(--text);box-shadow:0 1px 3px #0000001a}
.hb{position:absolute;top:-2px;right:-4px;min-width:17px;height:17px;padding:0 5px;border-radius:99px;background:#ff4d6a;color:#fff;font-size:10.5px;font-style:normal;display:grid;place-items:center;box-shadow:0 0 0 2px var(--card)}
.hdr .nav span{position:relative;cursor:pointer}
.lx{display:flex;align-items:center;gap:10px}.lx button{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 12px;border-radius:99px;background:var(--soft);font-size:12.5px;position:relative}
.hplan b{font-weight:500;font-size:11px;letter-spacing:.4px;padding:2px 7px;border-radius:99px;background:linear-gradient(135deg,#2a73ff,#7a5cff);color:#fff}
.hcred svg{width:15px;height:15px;color:var(--orange)}.hcred i{font-style:normal;width:18px;height:18px;border-radius:50%;background:var(--ink);color:var(--onink);display:grid;place-items:center;font-size:12px}
.hchat{width:32px;padding:0!important;justify-content:center}.hchat svg{width:16px;height:16px}
.band .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,440px);gap:26px;align-items:stretch}
.hero .focus h2{font-size:34px;letter-spacing:-.8px;line-height:1.1;margin-top:14px}
.hero .focus p{margin-top:10px;max-width:520px}
.spot{border-radius:20px;padding:18px 20px;background:linear-gradient(180deg,#ffffff2e,#ffffff12);box-shadow:inset 0 1px 0 #ffffff59,inset 0 0 0 1px #ffffff26;display:grid;gap:8px;align-content:start}
.spot .sk{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#ffffffd9}.spot .sk svg{width:14px;height:14px}
.spot>b{font-weight:400;font-size:21px;letter-spacing:-.3px;line-height:1.25}
.spot p{margin:0;font-size:13.5px;color:#ffffffd0;line-height:1.45}
.spot .sa{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:6px}.spot .sa span{font-size:12.5px;color:#ffffffc8}
.wbtn svg{width:14px;height:14px}
.ch h3 small{font-size:13px;color:var(--muted);font-weight:400}.ch h3 small.n{font-size:14px}
.gsub{font-size:12.5px;color:var(--muted)}
.lnk2{display:inline-flex;align-items:center;gap:4px;font-size:13.5px}.lnk2 svg{width:14px;height:14px}
.btn.sm{font-size:13px;padding:7px 14px}
.where{font-size:12.5px;color:var(--muted);margin:6px 0 0;line-height:1.45}
.money .ch{margin-bottom:2px}.mring{display:flex;align-items:center;gap:10px}.mring span{font-size:14px;display:grid}.mring small{font-size:12px;color:var(--muted)}
.mring .dring .arc{stroke:var(--orange)}.mring .dring b{color:var(--orange);font-size:16px}
.mdone{display:flex;align-items:center;gap:8px;margin:2px 0 16px;font-size:13px;color:var(--muted)}.mdone svg{width:15px;height:15px;color:var(--green);flex:none}
.cyc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));position:relative}
.cyc:before{content:"";position:absolute;left:12px;right:12px;top:11px;height:2px;background:var(--line)}
.cs{text-align:left;display:grid;gap:3px;padding:0 12px 0 0;position:relative;justify-items:start;align-content:start}
.cs .cd{width:24px;height:24px;border-radius:50%;background:var(--card);box-shadow:inset 0 0 0 2px var(--line);display:grid;place-items:center;position:relative;z-index:1;margin-bottom:8px}
.cs.now .cd{box-shadow:inset 0 0 0 2px var(--orange),0 0 0 5px color-mix(in srgb,var(--orange) 16%,transparent)}.cs.now .cd:after{content:"";width:8px;height:8px;border-radius:50%;background:var(--orange)}
.cs .cl{font-size:12.5px;color:var(--muted)}.cs b{font-weight:400;font-size:16px}.cs small{font-size:12px;color:var(--muted)}
.cs.now small{color:var(--orange)}
.mbar{display:flex;height:14px;border-radius:99px;overflow:hidden;margin:18px 0 10px;background:var(--soft);gap:2px}
.mbar i{width:var(--w);height:100%;outline:0;transition:filter .15s}.mbar i:hover,.mbar i:focus{filter:brightness(1.12)}
.mbar .proc,.mleg i.proc{background:var(--blue)}
.mbar .ready,.mleg i.ready{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--orange) 70%,transparent) 0 6px,color-mix(in srgb,var(--orange) 45%,transparent) 6px 12px)}
.mbar .low,.mleg i.low{background:repeating-linear-gradient(135deg,var(--line) 0 6px,color-mix(in srgb,var(--text) 6%,transparent) 6px 12px)}
.mleg{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:12.5px;color:var(--muted)}.mleg span{display:inline-flex;align-items:center;gap:6px}.mleg i{width:9px;height:9px;border-radius:50%}.mleg b{font-weight:400;color:var(--text)}.mleg .tot{margin-left:auto}
.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:16px}
.tile{text-align:left;display:grid;gap:4px;align-content:start;justify-items:start;padding:14px 16px;border-radius:18px;background:var(--soft);transition:background .15s,transform .15s}
.tile:hover{background:color-mix(in srgb,var(--text) 8%,var(--card));transform:translateY(-1px)}
.tile .tm{display:flex;align-items:center;gap:4px;font-size:12.5px;color:var(--muted)}.tile .tm svg{width:13px;height:13px}
.tile b{font-weight:400;font-size:24px;letter-spacing:-.4px}.tile .tt2{font-size:12.5px;color:var(--muted);line-height:1.4;margin-bottom:4px}.tile small{font-size:11.5px;color:var(--faint)}
.dgrid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:20px;align-items:start}
.dtabs{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 8px}.dtabs button{padding:7px 13px;border-radius:99px;font-size:13px;color:var(--muted);background:var(--soft)}.dtabs button b{font-weight:400;margin-left:3px;color:var(--faint)}
.dtabs button[aria-pressed=true]{background:var(--ink);color:var(--onink)}.dtabs button[aria-pressed=true] b{color:inherit;opacity:.7}
.drs{display:grid}
.dr{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:14px;align-items:center;padding:13px 10px;border-radius:16px;cursor:pointer;position:relative;transition:background .15s,opacity .3s,transform .3s}
.dr+.dr:before{content:"";position:absolute;left:60px;right:10px;top:0;height:1px;background:var(--line)}
.dr:hover,.dr:focus-visible{background:color-mix(in srgb,var(--text) 4%,transparent);outline:0}
.dr.out{opacity:0;transform:translateX(24px)}
.dm{min-width:0}.dm .t1{font-size:14.5px}.dm .t2{line-height:1.4}
.da{display:flex;align-items:center;gap:10px}
@media (hover:hover){.da .btn{opacity:0;transform:translateX(6px);transition:opacity .15s,transform .15s}.dr:hover .da .btn,.dr:focus-within .da .btn{opacity:1;transform:none}}
.pk{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.pk button{font-size:12.5px;padding:6px 10px;border-radius:99px;background:var(--ink);color:var(--onink)}
.dfoot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:10px;font-size:12px;color:var(--muted)}
.empty2{display:flex;align-items:center;gap:10px;padding:22px 12px;color:var(--muted);font-size:14px}.empty2 svg{width:18px;height:18px;color:var(--green)}.empty2 b{font-weight:400}
.krs{display:grid;margin-top:6px}
.kr{display:grid;grid-template-columns:10px minmax(0,1fr) 14px;gap:12px;align-items:center;text-align:left;padding:11px 8px;border-radius:14px}
.kr+.kr{border-top:1px solid var(--line);border-radius:0}.kr:hover{background:color-mix(in srgb,var(--text) 4%,transparent)}
.kr span{display:grid;gap:2px;min-width:0}.kr b{font-weight:400;font-size:14px}.kr small{font-size:12.5px;color:var(--muted);line-height:1.4}.kr svg{width:14px;height:14px;color:var(--faint)}
.kdot{width:9px;height:9px;border-radius:50%;background:var(--faint)}.kdot.r{background:var(--red)}.kdot.o{background:var(--orange)}.kdot.b{background:var(--blue)}.kdot.g{background:var(--green)}
.gt{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:10px 0 16px}
.gt button{text-align:left;display:grid;gap:2px;padding:12px 14px;border-radius:16px;background:var(--soft);transition:background .2s,color .2s}
.gt button span{font-size:12.5px;color:var(--muted)}.gt button b{font-weight:400;font-size:22px;letter-spacing:-.4px}.gt button small{font-size:12px;color:var(--muted)}
.gt button[aria-pressed=true]{background:var(--ink);color:var(--onink)}.gt button[aria-pressed=true] span,.gt button[aria-pressed=true] small{color:inherit;opacity:.75}
.gh2{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}.gh2 b{font-weight:400;font-size:30px;letter-spacing:-.6px}.gh2 span{font-size:14px;color:var(--muted)}
.delta{font-size:12.5px!important;padding:3px 8px;border-radius:99px}.delta.down{color:var(--red)!important;background:color-mix(in srgb,var(--red) 10%,transparent)}.delta.up{color:var(--green)!important;background:color-mix(in srgb,var(--green) 10%,transparent)}
.gd{margin:2px 0 14px;font-size:13px;color:var(--muted)}
.bars{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;height:190px;align-items:end}
.bc{display:grid;grid-template-rows:auto 1fr auto;height:100%;gap:6px;text-align:center;min-width:0}
.bc em{font-style:normal;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bw{display:flex;align-items:flex-end;justify-content:center;min-height:0}
.bw i{display:block;width:min(56px,100%);border-radius:10px 10px 4px 4px;background:var(--blue);transition:height .7s cubic-bezier(.2,.8,.2,1),background .3s}
.bc.pend .bw i{background:transparent;box-shadow:inset 0 0 0 2px var(--blue);background-image:repeating-linear-gradient(135deg,color-mix(in srgb,var(--blue) 18%,transparent) 0 5px,transparent 5px 10px)}
.bc.ex .bw i{background:repeating-linear-gradient(135deg,var(--line) 0 6px,color-mix(in srgb,var(--text) 7%,transparent) 6px 12px)}
.bc.none .bw i{background:var(--line)}
.bc>span{font-size:12.5px;color:var(--muted)}
.gleg{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:14px;font-size:12px;color:var(--muted)}.gleg span{display:inline-flex;align-items:center;gap:6px}.gleg i{width:12px;height:12px;border-radius:4px;background:var(--blue)}
.gleg i.pend{background:transparent;box-shadow:inset 0 0 0 2px var(--blue)}.gleg i.ex{background:repeating-linear-gradient(135deg,var(--line) 0 3px,color-mix(in srgb,var(--text) 12%,transparent) 3px 6px)}.gleg i.none{background:var(--line)}
.ftip{position:fixed;z-index:60;max-width:300px;padding:8px 12px;border-radius:12px;background:var(--ink);color:var(--onink);font-size:12.5px;line-height:1.4;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .15s,transform .15s}.ftip.on{opacity:1;transform:none}
.lane{margin-top:8px}.lane+.lane,.take+.lane,.lane+.take{margin-top:14px}
.lh{display:flex;align-items:baseline;gap:8px;padding:0 10px;margin-bottom:2px}.lh b{font-weight:400;font-size:13.5px}.lh span{font-size:12.5px;color:var(--muted)}.lh small{font-size:12px;color:var(--faint);margin-left:auto}
.lane .where{padding:0 10px 4px;margin:2px 0 0}
.take{border-radius:16px;background:color-mix(in srgb,var(--orange) 7%,transparent);padding:10px 0 4px;margin-top:14px}
.side2{display:grid;gap:20px}
.perf{display:flex;align-items:center;gap:14px;margin:8px 0 12px}.perf b{font-weight:400;font-size:15px}.perf small{display:block;font-size:12.5px;color:var(--muted)}
.dring.big{width:64px;height:64px}.dring.big svg{width:64px;height:64px}.dring.big b{font-size:15px}
.news{display:grid;gap:6px;margin-top:6px}.nw{text-align:left;display:grid;gap:3px;padding:12px 14px;border-radius:14px;background:var(--soft)}.nw b{font-weight:400;font-size:14px}.nw small{font-size:12.5px;color:var(--muted);line-height:1.4}
.facts b small{font-size:12px;color:var(--muted)}
.lgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;align-items:start}
.lgrid .lnews{grid-column:1/-1}
.big2{display:grid;gap:2px;margin:6px 0 12px}.big2 b{font-weight:400;font-size:30px;letter-spacing:-.6px}.big2 small{font-size:12.5px;color:var(--muted)}
.steps3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));position:relative;margin:4px 0 6px}
.steps3:before{content:"";position:absolute;left:11px;right:11px;top:10px;height:2px;background:var(--line)}
.s3{display:grid;gap:2px;justify-items:start;position:relative}.s3 i{width:22px;height:22px;border-radius:50%;background:var(--card);box-shadow:inset 0 0 0 2px var(--line);display:grid;place-items:center;margin-bottom:6px;z-index:1}
.s3.done i{background:var(--green);box-shadow:none;color:#fff}.s3 i svg{width:12px;height:12px}.s3.now i{box-shadow:inset 0 0 0 2px var(--blue),0 0 0 5px color-mix(in srgb,var(--blue) 16%,transparent)}
.s3 b{font-weight:400;font-size:13.5px}.s3 small{font-size:12px;color:var(--muted)}
.crs{display:grid;gap:6px}.crr{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:11px 14px;border-radius:14px;background:var(--soft);font-size:13.5px}.crr b{font-weight:400}.crr span{color:var(--muted)}.crr .chip{margin-left:auto}
.okline{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--green) 8%,transparent);margin:6px 0 12px}.okline svg{width:18px;height:18px;color:var(--green);flex:none}.okline span{display:grid}.okline b{font-weight:400;font-size:14px}.okline small{font-size:12.5px;color:var(--muted)}
.lgrid .dr{grid-template-columns:36px minmax(0,1fr)}
.still,.still .it{animation:none!important;transition:none!important}
@media (max-width:1240px){.band .hero{grid-template-columns:1fr}.spot{max-width:620px}}
@media (max-width:1100px){.dgrid,.lgrid{grid-template-columns:1fr}.tiles,.gt{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:820px){.cyc{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:16px}.cyc:before{display:none}.mleg .tot{margin-left:0}.hero .focus h2{font-size:28px}.bars{height:160px;gap:6px}.bc em{font-size:10.5px}.mockbar{justify-content:space-between}.lx .hplan{display:none}}
@media (max-width:560px){.dr{grid-template-columns:32px minmax(0,1fr)}.dr .da{grid-column:2;justify-content:flex-start}.tile b{font-size:20px}.lx .hcred{padding:0 9px}.steps3 small{font-size:11px}}
#view{display:grid;gap:20px;min-width:0}
.mring{flex:none}.mring span{white-space:nowrap}
.lmore{padding:6px 10px 0}
@media (max-width:560px){.dr{align-items:start}.dr .da{justify-self:start;justify-content:flex-start}.dr .da .mini.none{display:none}.dr .ty{margin-top:2px}}
@media (hover:none){.da .btn{opacity:1!important;transform:none!important}}
#view{display:grid;gap:20px;min-width:0}
.cs.warn small{color:var(--red)}
.cs:hover .cl{color:var(--text)}
.mbar .held,.mleg i.held{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--red) 40%,transparent) 0 6px,color-mix(in srgb,var(--red) 18%,transparent) 6px 12px)}
.okline.warn{background:color-mix(in srgb,var(--orange) 9%,transparent)}.okline.warn svg{color:var(--orange)}
.lroy .hrow:empty{display:none}
.lnews .ch{display:flex;align-items:center;justify-content:space-between;gap:12px}
.lgrid .dr{cursor:pointer}
.tile{cursor:pointer}
@media (max-width:560px){.money .ch{flex-wrap:wrap;gap:10px}}
.lroy .facts{margin-top:12px}
.lroy .where+.facts{margin-top:8px}
.tile{min-width:0}.tile .chip{max-width:100%;white-space:normal;height:auto;line-height:1.35;padding-top:3px;padding-bottom:3px}
.dr .t1 .chip{white-space:nowrap}
.mring .dring .arc{stroke:var(--blue)}.mring .dring b{color:var(--blue)}
.mring.o .dring .arc{stroke:var(--orange)}.mring.o .dring b{color:var(--orange)}
.mring.r .dring .arc{stroke:var(--red)}.mring.r .dring b{color:var(--red)}
.cs.now .cd{box-shadow:inset 0 0 0 2px var(--blue),0 0 0 5px color-mix(in srgb,var(--blue) 16%,transparent)}.cs.now .cd:after{background:var(--blue)}.cs.now small{color:var(--blue)}
.cs.now.act .cd{box-shadow:inset 0 0 0 2px var(--orange),0 0 0 5px color-mix(in srgb,var(--orange) 16%,transparent)}.cs.now.act .cd:after{background:var(--orange)}.cs.now.act small{color:var(--orange)}
.cs.now.warn .cd{box-shadow:inset 0 0 0 2px var(--red),0 0 0 5px color-mix(in srgb,var(--red) 16%,transparent)}.cs.now.warn .cd:after{background:var(--red)}.cs.warn small{color:var(--red)}
.mbar .ready,.mleg i.ready{background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--blue) 55%,transparent) 0 6px,color-mix(in srgb,var(--blue) 28%,transparent) 6px 12px)}
.dgrid,.lgrid{align-items:stretch}
.dgrid>.card{display:flex;flex-direction:column}
.dgrid>.card>.dfoot{margin-top:auto;padding-top:10px}
.side2{display:flex;flex-direction:column}.side2>.card:last-child{flex:1}`;const HTML=`<main><div id="view"></div></main>`;
let root=null,lastHtml='',V=null,VK='',REV=0;
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC={disc:sv('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'),ticket:sv('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/>'),spark:sv('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),shield:sv('<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>'),people:sv('<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><path d="M16 11a3 3 0 1 0 0-6M21 19c0-2.5-1.8-4.4-4.5-4.9"/>'),chat:sv('<path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A8 8 0 0 1 4 12z"/>'),wallet:sv('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12.5h2"/><path d="M3 9h18"/>'),doc:sv('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'),card:sv('<rect x="4" y="6" width="16" height="13" rx="2"/><path d="M4 10h16M8 15h3"/>'),gear:sv('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),check:sv('<path d="m5 12 5 5 9-10"/>'),chev:sv('<path d="m9 6 6 6-6 6"/>'),arrow:sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),clock:sv('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),info:sv('<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8v.5"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${E(t)}</span>`;
const U=U137;
/* dua bahasa: tanggal, bulan, rupiah lewat U137 (dibaca saat dipanggil) */
const rp=n=>U.rp(n);
const rps=n=>U.rps(n);
const month=p=>U.monthP(p);
const monOf=p=>U.month(+String(p).slice(5,7)-1)||'';
const monS=p=>U.mon(+String(p).slice(5,7)-1)||'';
const dl=iso=>U.dlabel(String(iso).slice(0,10));
const fdd=iso=>{if(!iso)return '';const [,m,d]=String(iso).slice(0,10).split('-').map(Number);return `${d} ${U.mon(m-1)}`;};
const addM=(ym,n)=>{let [y,m]=ym.split('-').map(Number);m+=n;while(m>12){m-=12;y++;}while(m<1){m+=12;y--;}return `${y}-${String(m).padStart(2,'0')}`;};
const days=(a,b)=>Math.round((Date.parse(String(b).slice(0,10)+'T00:00:00Z')-Date.parse(String(a).slice(0,10)+'T00:00:00Z'))/864e5);
const clock=()=>U.hm(U.iso16(ten.now).slice(11,16));
const pname=id=>people.find(p=>p.id===id)?.name||'';
const pini=id=>people.find(p=>p.id===id)?.initials||'';
const tl=s=>{const p=String(s||'').split(' / ');return (U.en()&&p[1])||p[0];};
const nd=n=>n===1?$t('1 hari','1 day'):$t(`${n} hari`,`${n} days`);
const cut=(s,n)=>{s=String(s||'');return s.length>n?s.slice(0,n-1).trim()+'…':s;};
const safe=(f,d)=>{try{return f();}catch(err){console.warn('db137',err);return d;}};
const mode=()=>isLabel10()?'label':me().super?'sa':'staf';
const on=()=>state.page==='dashboard'&&!state.preview&&(isLabel10()||state.mode==='platform');
window.db137On=on;
const S={tab:'all',more:false,pick:null,growth:'releases',waitAll:false,seen:new Set()};
const sum=(id,...a)=>{const d=M137.defs.find(x=>x.id===id);if(!d?.sum)return null;try{return d.sum(...a);}catch(err){console.warn('db137 sum',id,err);return null;}};
const dueChip=d=>d==null?'':d<0?chip($t(`Lewat ${-d} hari`,`${nd(-d)} overdue`),'c-red'):d===0?chip($t('Hari ini','Today'),'c-or'):d===1?chip($t('Besok','Tomorrow'),'c-bl'):chip($t(`${d} hari lagi`,`In ${d} days`),'c-bl');
const mini=(id,title)=>id?`<span class="mini" title="${E(title||pname(id))}">${E(pini(id)||String(id).slice(0,2).toUpperCase())}</span>`:`<span class="mini none" title="${$t('Belum ada petugas','Unassigned')}"></span>`;
const toast=t=>toast137(DEF,t);
/* tombol aksi asli prototipe (atribut data-*) dijalankan lewat tombol tersembunyi, supaya modal & halaman tujuan tidak berubah */
function fire(attrs){const b=document.createElement('button');b.type='button';b.tabIndex=-1;b.setAttribute('aria-hidden','true');b.style.cssText='opacity:0;width:1px;height:1px;padding:0;border:0;margin:0;overflow:hidden';for(const [k,v] of Object.entries(attrs))b.setAttribute(k,v);document.body.append(b);try{b.click();}finally{b.remove();}}
const cycle=t=>{const [y,m,d]=t.split('-').map(Number),cur=t.slice(0,7),nxt=addM(cur,1),end=new Date(Date.UTC(y,m,0)).getUTCDate();
 if(d<=14)return {phase:'win',cy:cur,n:14-d,date:cur+'-14',p:Math.round(d/14*100)};
 if(d<=20)return {phase:'pay',cy:cur,n:20-d,date:cur+'-20',p:Math.round((d-14)/6*100)};
 return {phase:'next',cy:nxt,n:end-d+1,date:nxt+'-01',p:Math.max(4,Math.round((d-20)/(end-20)*100))};};
const sortDue=a=>a.slice().sort((x,y)=>(x.due??999)-(y.due??999));
const short=t=>String(t).split(' · ').slice(-1)[0];
const tasksOpen=()=>(data.tasks||[]).filter(t=>!t.linked102&&!(ten.inbox137?.moved||{})[t.id]&&t.stage!=='done');
const taskRow=t=>{const today=U.today(),late=!!t.due&&t.due<today;return {id:t.id,src:'task',menu:$t('Pekerjaan','Work'),ic:'disc',t:tl(t.title),l:t.label||'',st:t.handler?$t('Dikerjakan','In progress'):$t('Belum ada petugas','Unassigned'),due:t.due?(late?-days(t.due,today):days(today,t.due)):null,dueDate:t.due||'',over:late,who:t.handler||'',wait:t.stage==='believe'?'Believe':''};};
const nudged=id=>(data.chats?.internal||[]).some(x=>x.who===state.user&&x.ref137===id&&U.isoDay(x.ts||0)===U.today());

/* ================= Super Admin ================= */
function dataSA(){const g={rel:sum('releases'),tk:sum('tickets'),lt:sum('addons'),roy:sum('royalty'),wd:sum('withdraw'),trx:sum('transactions'),pk:sum('finance'),ct:sum('contracts'),std:sum('standards'),upd:sum('updates'),ib:sum('inbox'),sa:sum('staff'),ps:sum('settings')};
 const today=U.today(),me_=state.user,cy=cycle(today),go=[],G=d=>go.push(d)-1,dec=[];
 const add=o=>dec.push({cat:'lain',due:null,chip:null,wait:'',...o});
 for(const t of g.tk?.P||[])if(t.esc)add({id:'tk:'+t.id,cat:'tiket',ic:'ticket',menu:$t('Tiket Bantuan','Support Tickets'),t:$t(`Eskalasi tiket · ${t.t}`,`Ticket escalation · ${t.t}`),s:`${t.l} · ${cut(t.esc.note||t.st,70)}${t.esc.by?$t(` · dieskalasikan ${pname(t.esc.by)}`,` · escalated by ${pname(t.esc.by)}`)+(t.esc.at?' '+fdd(t.esc.at):''):''}`,due:t.due,wait:t.esc.by&&t.esc.by!==me_?t.esc.by:'',act:$t('Tinjau','Review'),go:G({fn:'ticket',id:t.id})});
 for(const o of g.lt?.P||[])if(o.res)add({id:'lt:'+o.id,cat:'uang',ic:'spark',menu:$t('Layanan Tambahan','Add-on Services'),t:$t(`Penyelesaian layanan · ${o.t.split(' · ').slice(1).join(' · ')}`,`Service resolution · ${o.t.split(' · ').slice(1).join(' · ')}`),s:`${o.l} · ${o.t.split(' · ')[0]} · ${cut(o.res.note||$t('usulan penyelesaian','proposed resolution'),70)}`,due:o.due,wait:o.res.by&&o.res.by!==me_?o.res.by:'',act:$t('Putuskan','Decide'),go:G({fn:o.src,id:o.id})});
 const ver=safe(()=>typeof ver136==='function'?ver136():[],[]);
 if(ver.length)add({id:'ver',cat:'label',ic:'shield',menu:$t('Manajemen Label › Verifikasi','Label Management › Verification'),t:$t(`${ver.length} verifikasi menunggu`,`${ver.length} verification${ver.length>1?'s':''} waiting`),s:ver.slice(0,3).map(v=>`${v.kind} ${v.m.name}`).join(' · ')+(ver.length>3?$t(` · ${ver.length-3} lainnya`,` · ${ver.length-3} more`):''),chip:[$t('Perlu diperiksa','To check'),'c-or'],act:$t('Periksa','Check'),go:G({fn:'labels',tab:'ver'})});
 const all=safe(()=>typeof all136==='function'?all136():[],[]),at=all.filter(x=>x.why.length).sort((a,b)=>b.score-a.score);
 if(at.length)add({id:'lab',cat:'label',ic:'people',menu:$t('Manajemen Label','Label Management'),t:$t(`${at.length} label butuh perhatian`,`${at.length} label${at.length>1?'s':''} need attention`),s:at.slice(0,3).map(x=>{const w=x.why[0][0].split(' · ')[0];return `${x.m.name} · ${w.charAt(0).toLowerCase()+w.slice(1)}`;}).join(' · '),chip:at.some(x=>x.why.some(w=>w[1]==='r'))?[$t('Perlu keputusan','Decision needed'),'c-red']:[$t('Perlu perhatian','Needs attention'),'c-or'],act:$t('Tinjau','Review'),go:G({fn:'labels',seg:'attn'})});
 for(const o of (data.ops||[]).filter(o=>['pending','approved'].includes(o.status)&&o.kind!=='withdraw'&&!String(o.id).startsWith('RF-')&&!/identitas|identity/i.test(L(o.title))))
  add({id:'op:'+o.id,cat:'label',ic:'shield',menu:$t('Pekerjaan › Persetujuan','Work › Approvals'),t:tl(L(o.title)),s:`${o.id} · ${cut(L(o.detail),96)}`,due:o.created?days(today,U.addDay(o.created,1)):null,act:$t('Tinjau','Review'),go:G({fn:'op',id:o.id})});
 if(g.ib?.reply.length){const r=g.ib.reply;add({id:'ib',cat:'tiket',ic:'chat',menu:$t('Kotak Masuk','Inbox'),t:$t(`${r.length} pesan menunggu jawabanmu`,`${r.length} message${r.length>1?'s':''} waiting for your reply`),s:`${r[0].who} · ${cut(r[0].title,60)}${r[0].at?` (${r[0].at.slice(0,10)===today?U.hm(r[0].at.slice(11,16)):fdd(r[0].at)})`:''}${r.length>1?$t(` dan ${r.length-1} lainnya`,` and ${r.length-1} more`):''}`,due:0,act:$t('Balas','Reply'),go:G({fn:'nav',to:'inbox'})});}
 const k=g.pk;if(k&&!(k.lastAt&&k.lastAt.slice(0,10)===today))add({id:'kas',cat:'uang',ic:'wallet',menu:$t('Pemantauan Keuangan','Financial Monitoring'),t:$t('Catat posisi kas hari ini','Record today’s cash position'),s:k.known?$t(`Catatan terakhir ${fdd(k.lastAt)} · ${k.cash>=k.owe?`cadangan ${rps(k.cash-k.owe)} di atas`:`kas ${rps(k.owe-k.cash)} di bawah`} kewajiban ke label`,`Last recorded ${fdd(k.lastAt)} · ${k.cash>=k.owe?`reserve ${rps(k.cash-k.owe)} above`:`cash ${rps(k.owe-k.cash)} below`} what is owed to labels`):$t(`Kas belum pernah dicatat · kewajiban ke label ${rps(k.owe)}`,`Cash never recorded · owed to labels ${rps(k.owe)}`),due:0,chip:k.st,act:$t('Catat','Record'),go:G({fn:'nav',to:'finance'})});
 const R=g.roy;if(R&&(R.review.length||R.ready.length)){const rr=[...R.review,...R.ready];add({id:'roy',cat:'uang',ic:'doc',menu:$t('Royalti › Laporan','Royalties › Reports'),t:R.review.length?$t(`${R.review.length} laporan royalti perlu diperiksa`,`${R.review.length} royalty report${R.review.length>1?'s':''} to check`):$t(`${R.ready.length} laporan royalti siap diterbitkan`,`${R.ready.length} royalty report${R.ready.length>1?'s':''} ready to publish`),s:rr.map(b=>`${b.month}${R.lag.includes(b.month)?$t(' tertinggal',' overdue'):''} · ${rps(b.total)}`).join(' · '),chip:R.lag.length?[$t('Tertinggal','Behind'),'c-red']:R.review.length?[$t('Perlu diperiksa','To check'),'c-or']:[$t('Siap terbit','Ready to publish'),'c-or'],act:R.review.length?$t('Periksa','Check'):$t('Terbitkan','Publish'),go:G({fn:'royalty',id:rr[0].id})});}
 const W=g.wd;if(W?.open.length){const O=W.open,rd=O.filter(w=>w.status==='ready'),rq=O.filter(w=>w.status==='requested'),lt=O.filter(w=>w.late),cys=[...new Set(O.map(w=>w.cycle))].sort(),pay=cys[0]+'-20',other=O.length-rd.length-rq.length;
  add({id:'wd',cat:'uang',ic:'card',menu:$t('Penarikan','Withdrawals'),t:$t(`${O.length} penarikan ${cys.length===1?'siklus '+monOf(cys[0]):'berjalan'} · ${rps(W.tot)}`,`${O.length} withdrawal${O.length>1?'s':''} ${cys.length===1?'in the '+monOf(cys[0])+' cycle':'in progress'} · ${rps(W.tot)}`),s:[rd.length?$t(`${rd.length} siap ditransfer (${rd[0].name} ${rps(rd[0].amount)}${rd.length>1?', …':''})`,`${rd.length} ready to transfer (${rd[0].name} ${rps(rd[0].amount)}${rd.length>1?', …':''})`):'',rq.length?$t(`${rq.length} menunggu pemeriksaan`,`${rq.length} awaiting review`):'',other?$t(`${other} sedang ditransfer / ditunda`,`${other} transferring / on hold`):''].filter(Boolean).join(' · '),due:days(today,pay),chip:lt.length?[$t(`${lt.length} terlambat`,`${lt.length} overdue`),'c-red']:[$t(`Bayar s.d. ${fdd(pay)}`,`Pay by ${fdd(pay)}`),'c-bl'],act:$t('Periksa','Check'),go:G({fn:'withdraw',id:(rd[0]||O[0]).id})});}
 for(const r of g.trx?.rf||[])add({id:'rf:'+r.id,cat:'uang',ic:'card',menu:$t('Transaksi › Pengembalian','Transactions › Refunds'),t:r.src==='legacy'?$t(`Pengembalian paket lama · ${r.lab}`,`Legacy plan refund · ${r.lab}`):$t(`Pengembalian · ${r.lab}`,`Refund · ${r.lab}`),s:`${r.id} · ${r.plan||r.kind} · ${rp(r.amount)}${r.src==='legacy'?$t(' · pindah ke Basic',' · moves to Basic'):''} · ${r.stn}`,due:r.due?days(today,r.due):null,chip:r.due?[$t(`Batas ${fdd(r.due)}`,`Deadline ${fdd(r.due)}`),'c-bl']:null,act:['approved','processing'].includes(r.st)?$t('Proses','Process'):$t('Tinjau','Review'),go:G({fn:'refund',id:r.id})});
 if(g.trx?.iss.length){const I=g.trx.iss,by={};I.forEach(t=>by[t.name]=(by[t.name]||0)+1);add({id:'tx',cat:'uang',ic:'card',menu:$t('Transaksi','Transactions'),t:$t(`${I.length} transaksi perlu dicocokkan · ${rps(I.reduce((n,t)=>n+t.amount,0))}`,`${I.length} transaction${I.length>1?'s':''} to reconcile · ${rps(I.reduce((n,t)=>n+t.amount,0))}`),s:Object.entries(by).map(([a,n])=>`${n} ${a.toLowerCase()}`).join(' · '),chip:g.trx.chk?[$t(`Dicek ${U.hm(g.trx.chk.slice(11,16))}`,`Checked ${U.hm(g.trx.chk.slice(11,16))}`),'']:null,act:$t('Cocokkan','Reconcile'),go:G({fn:'nav',to:'transactions'})});}
 for(const r of g.sa?.unrev||[])add({id:'role:'+r.id,ic:'people',menu:$t('Staff & Akses','Staff & Access'),t:$t(`Tinjau peran ${r.name}`,`Review the ${r.name} role`),s:`${r.rv?$t('Berubah sejak terakhir ditinjau','Changed since last review'):$t('Dibawa dari pengaturan lama','Carried over from the old settings')} · ${$t(`${r.users} staf`,`${r.users} staff`)}${r.sens?$t(` · ${r.sens} izin sensitif aktif`,` · ${r.sens} sensitive permission${r.sens>1?'s':''} on`):''}`,chip:[$t('Belum ditinjau','Not reviewed'),'c-or'],act:$t('Tinjau','Review'),go:G({fn:'role',id:r.id})});
 if(g.ps?.n){const p=g.ps;add({id:'ps',ic:'gear',menu:$t('Pengaturan Platform','Platform Settings'),t:$t(`${p.n} hal perlu ditetapkan sebelum produksi`,`${p.n} item${p.n>1?'s':''} to set before production`),s:[p.plans?$t('harga & paket kredit','prices & credit packs'):'',p.id?$t('identitas perusahaan','company identity'):'',p.nav?$t('susunan menu','menu order'):'',p.web?'website':''].filter(Boolean).join(' · '),chip:[$t('Sebelum produksi','Before production'),'c-or'],act:$t('Tetapkan','Set'),go:G({fn:'nav',to:'settings'})});}
 const up=g.upd;if(up?.need)add({id:'upd',ic:'spark',menu:$t('Pembaruan','Updates'),t:$t(`${up.need} butir pembaruan menunggu keputusanmu`,`${up.need} update item${up.need>1?'s':''} waiting for your decision`),s:[up.hold?$t(`${up.hold} kalimat ditahan`,`${up.hold} on hold`):'',up.suggest?$t(`${up.suggest} usulan dari rilis dev ${up.sugRange}`,`${up.suggest} suggestion${up.suggest>1?'s':''} from dev releases ${up.sugRange}`):'',up.draft?$t(`${up.draft} draf`,`${up.draft} draft${up.draft>1?'s':''}`):'',up.br?$t(`${up.br.t} dibaca ${up.br.r} dari ${up.br.n} label`,`${up.br.t} read by ${up.br.r} of ${up.br.n} labels`):''].filter(Boolean).join(' · '),chip:up.hold?[$t('Ada yang ditahan','Some on hold'),'c-red']:[$t('Menunggu','Waiting'),''],act:$t('Buka','Open'),go:G({fn:'nav',to:'updates'})});
 /* Terlambat di tim — pengawasan; dikerjakan di menunya */
 const late=[...(g.rel?.P||[]),...(g.tk?.P||[]).filter(t=>!t.esc),...(g.lt?.P||[]).filter(o=>!o.res),...tasksOpen().map(taskRow)].filter(x=>x.over).map(x=>({...x,late:x.due!=null&&x.due<0?-x.due:0,go:G({fn:x.src,id:x.id})})).sort((a,b)=>b.late-a.late);
 /* Sorotan */
 const o=sortDue(dec),blocked=o.filter(d=>d.wait&&d.due!=null&&d.due<0),mine=late.filter(l=>l.who===me_);
 const mineTxt=mine.length?$t(`${mine.length} pekerjaanmu terlambat`,`${mine.length} of your tasks overdue`)+`: ${mine.slice(0,2).map(m=>short(m.t)).join(', ')}${mine.length>2?', …':''}`:'';
 let spot;
 if(blocked.length){const ws=[...new Set(blocked.map(b=>pname(b.wait)))],mx=Math.max(...blocked.map(b=>-b.due)),nb=o.find(d=>!blocked.includes(d));spot={k:$t('Ditunggu rekan tim','Teammates are waiting'),h:$t(`${blocked.length} keputusan ditunggu ${ws.join(' & ')}`,`${ws.join(' & ')} ${ws.length>1?'are':'is'} waiting on ${blocked.length} decision${blocked.length>1?'s':''}`),p:`${blocked.slice(0,2).map(b=>short(b.t)).join($t(' dan ',' and '))} · ${$t(`lewat tenggat ${mx} hari`,`${nd(mx)} overdue`)}`,b:[$t('Putuskan yang pertama','Decide the first one'),blocked[0].go],n:mineTxt||(nb?$t(`Berikutnya: ${nb.t}`,`Next: ${nb.t}`):'')};}
 else if(mine.length)spot={k:$t('Pekerjaanmu','Your work'),h:mineTxt.split(':')[0],p:mine.slice(0,2).map(m=>`${short(m.t)} · ${m.l}`).join(' · '),b:[$t('Buka ','Open ')+cut(short(mine[0].t),28),mine[0].go],n:o[0]?$t(`Berikutnya: ${o[0].t}`,`Next: ${o[0].t}`):''};
 else if(o.length)spot={k:$t('Keputusan berikutnya','Next decision'),h:o[0].t,p:o[0].s,b:[o[0].act,o[0].go],n:o[1]?$t(`Setelah itu: ${o[1].t}`,`After that: ${o[1].t}`):''};
 else spot={k:$t('Semua beres','All clear'),h:$t('Tidak ada keputusan yang menunggu','No decisions waiting'),p:$t('Dashboard memberi tahu bila ada yang baru.','The dashboard will tell you when something new comes in.'),b:null,n:''};
 const cyTxt=cy.phase==='next'?$t(`pengajuan penarikan ${monOf(cy.cy)} dibuka ${cy.n} hari lagi`,`${monOf(cy.cy)} withdrawal requests open in ${nd(cy.n)}`):cy.phase==='win'?(cy.n?$t(`pengajuan penarikan ${monOf(cy.cy)} ditutup ${cy.n} hari lagi`,`${monOf(cy.cy)} withdrawal requests close in ${nd(cy.n)}`):$t(`pengajuan penarikan ${monOf(cy.cy)} ditutup hari ini`,`${monOf(cy.cy)} withdrawal requests close today`)):(cy.n?$t(`batas bayar penarikan ${cy.n} hari lagi`,`withdrawal payment due in ${nd(cy.n)}`):$t('batas bayar penarikan hari ini','withdrawal payment due today'));
 const hero={k:spot.k,h:spot.h,p:spot.p,b:spot.b,n:spot.n,line:$t(`${dec.length} keputusan menunggu · ${late.length} pekerjaan tim terlambat`,`${dec.length} decision${dec.length===1?'':'s'} waiting · ${late.length} team task${late.length===1?'':'s'} overdue`)+` · ${cyTxt}`};
 /* Kondisi menu */
 const atR=at.some(x=>x.why.some(w=>w[1]==='r'));
 const kond=[['releases',$t('Rilisan','Releases'),g.rel],['addons',$t('Layanan Tambahan','Add-on Services'),g.lt],['tickets',$t('Tiket Bantuan','Support Tickets'),g.tk],['labels',$t('Manajemen Label','Label Management'),{line:$t(`${all.length} label · ${at.length} butuh perhatian · ${ver.length} verifikasi`,`${all.length} labels · ${at.length} need attention · ${ver.length} verification${ver.length===1?'':'s'}`),tone:atR?'r':at.length||ver.length?'o':'g'}],['contracts',$t('Kontrak Label','Label Contracts'),g.ct],['standards',$t('Standar & Penanda','Standards & Indicators'),g.std],['updates',$t('Pembaruan','Updates'),g.upd],['staff',$t('Staff & Akses','Staff & Access'),g.sa]].filter(x=>x[2]).map(([id,t,s])=>({t,line:s.line,tone:s.tone,go:G({fn:'nav',to:id})}));
 return {mode:'sa',go,hero,dec,late,cy,money:money(g,cy,today,G),kond,grow:grow(g,all,today)};}
function money(g,cy,today,G){const W=g.wd||{open:[],tot:0,thisPaid:{n:0}},R=g.roy||{review:[],ready:[],funds:[],lag:[],done:[]},K=g.pk,T=g.trx,cur=today.slice(0,7);
 const inCy=W.open.filter(w=>w.cycle===cy.cy),inSum=inCy.reduce((n,w)=>n+w.amount,0),lateN=W.open.filter(w=>w.late).length,rdy=W.open.filter(w=>w.status==='ready');
 const curOpen=W.open.filter(w=>w.cycle===cur).length,tp=W.thisPaid;
 const curM=U.month(+cur.slice(5)-1),cyS=U.mon(+cy.cy.slice(5)-1);
 const done=tp.n?$t(`${curM} ${curOpen?'berjalan':'selesai'}: ${tp.n} penarikan dibayar ${rps(tp.sum)}`,`${curM} ${curOpen?'in progress':'done'}: ${tp.n} withdrawal${tp.n>1?'s':''} paid ${rps(tp.sum)}`)+(tp.last?$t(` · terakhir ${fdd(tp.last)}`,` · last on ${fdd(tp.last)}`):''):'';
 const s1=R.review.length?$t(`${R.review.length} perlu diperiksa`,`${R.review.length} to check`):R.ready.length?$t(`${R.ready.length} siap diterbitkan`,`${R.ready.length} ready to publish`):R.funds.length?$t(`${R.funds.length} menunggu dana`,`${R.funds.length} awaiting funds`):$t('Semua sudah terbit','All published');
 const steps=[
  {l:$t('Laporan terbit','Reports published'),b:s1,s:R.lag.length?$t(`${R.lag.join(', ')} tertinggal`,`${R.lag.join(', ')} behind`):R.done[0]?$t(`terakhir ${R.done[0].month}`,`latest ${R.done[0].month}`):'',st:R.review.length||R.ready.length?'now':'done',act:true,warn:!!R.lag.length,go:G({fn:'royalty',id:(R.review[0]||R.ready[0])?.id})},
  {l:$t(`Pengajuan 1–14 ${cyS}`,`Requests 1–14 ${cyS}`),b:inCy.length?$t(`${inCy.length} sudah masuk · ${rps(inSum)}`,`${inCy.length} received · ${rps(inSum)}`):$t('Belum ada pengajuan','No requests yet'),s:cy.phase==='win'?(cy.n?$t(`ditutup ${cy.n} hari lagi`,`closes in ${nd(cy.n)}`):$t('ditutup hari ini','closes today')):cy.phase==='next'?$t(`dibuka ${cy.n} hari lagi`,`opens in ${nd(cy.n)}`):$t('sudah ditutup','closed'),st:cy.phase==='win'?'now':cy.phase==='pay'?'done':'wait',go:G({fn:'nav',to:'withdraw'})},
  {l:$t(`Pembayaran s.d. 20 ${cyS}`,`Payment by 20 ${cyS}`),b:inSum?$t(`${rps(inSum)} wajib dibayar`,`${rps(inSum)} to pay`):$t('Belum ada yang wajib dibayar','Nothing to pay yet'),s:lateN?$t(`${lateN} terlambat dari siklus sebelumnya`,`${lateN} overdue from the previous cycle`):rdy.length?$t(`${rdy.length} siap ditransfer`,`${rdy.length} ready to transfer`):inCy.length?$t('menunggu pemeriksaan','awaiting review'):'',st:lateN||cy.phase==='pay'?'now':'wait',act:true,warn:!!lateN,go:G({fn:'withdraw',id:(rdy[0]||W.open[0])?.id})},
  {l:$t('Kewajiban royalti','Royalty owed'),b:K?$t(`${rps(K.readySum)} belum diajukan`,`${rps(K.readySum)} not yet requested`):'—',s:K?$t(`${K.ready.length} label sudah bisa cair`,`${K.ready.length} label${K.ready.length===1?'':'s'} can withdraw`):'',st:'wait',go:G({fn:'royalty',tab:'bal'})}];
 const segs=K?[[$t('Sedang dicairkan','Being paid out'),K.pr,'proc',$t(`${K.openWd.length} penarikan berjalan`,`${K.openWd.length} withdrawal${K.openWd.length===1?'':'s'} in progress`)+(K.openWd.length?` · ${K.openWd[0]}${K.openWd.length>1?'–'+K.openWd.at(-1):''}`:'')],[$t('Siap cair, belum diajukan','Ready, not yet requested'),K.readySum,'ready',$t(`${K.ready.length} label dengan saldo ≥ Rp 1 jt`,`${K.ready.length} label${K.ready.length===1?'':'s'} with a balance ≥ Rp 1M`)],[$t('Di bawah Rp 1 jt','Under Rp 1M'),K.low,'low',$t(`${K.lowN} label · bergulir ke bulan berikutnya`,`${K.lowN} label${K.lowN===1?'':'s'} · rolls over to next month`)],[$t('Tertahan','Held'),Math.max(0,K.av-K.readySum-K.low),'held',$t('saldo label yang masih punya penarikan berjalan atau ditahan','balances of labels with a withdrawal in progress or on hold')]].filter(x=>x[1]>0):[];
 const pay=W.open.length?[...new Set(W.open.map(w=>w.cycle))].sort()[0]+'-20':'';
 const lastRep=R.done[0];
 const tiles=[
  {m:$t('Royalti','Royalties'),n:lastRep?rps(lastRep.total):'—',t:lastRep?$t(`Laporan ${monOf(lastRep.period)}`,`${monOf(lastRep.period)} report`)+(lastRep.rc?(String(lastRep.rc.date).slice(0,10)<=today?$t(` · dana Believe diterima ${fdd(lastRep.rc.date)}`,` · Believe funds received ${fdd(lastRep.rc.date)}`):$t(` · dana Believe tercatat masuk ${fdd(lastRep.rc.date)}`,` · Believe funds recorded for ${fdd(lastRep.rc.date)}`)):lastRep.st==='funds'?$t(' · menunggu dana Believe',' · awaiting Believe funds'):''):$t('Belum ada laporan terbit','No report published yet'),c:R.review.length?[$t(`${R.review.length} perlu diperiksa`,`${R.review.length} to check`),'c-or']:R.ready.length?[$t(`${R.ready.length} siap terbit`,`${R.ready.length} ready to publish`),'c-or']:[$t('Semua terbit','All published'),'c-gr'],go:G({fn:'royalty'})},
  {m:$t('Penarikan','Withdrawals'),n:rps(W.tot),t:W.open.length?$t(`${W.open.length} berjalan · bayar paling lambat ${dl(pay)}`,`${W.open.length} in progress · pay by ${dl(pay)}`):$t('Tidak ada penarikan berjalan','No withdrawals in progress'),c:lateN?[$t(`${lateN} terlambat`,`${lateN} overdue`),'c-red']:rdy.length?[$t(`${rdy.length} siap ditransfer`,`${rdy.length} ready to transfer`),'c-bl']:[$t('Tidak ada antrean','No queue'),''],go:G({fn:'nav',to:'withdraw'})},
  K?{m:$t('Pemantauan Keuangan','Financial Monitoring'),n:K.known?rps(K.cash-K.owe):$t('Belum dicatat','Not recorded'),t:K.known?$t(`cadangan: kas ${rps(K.cash)} − kewajiban ke label ${rps(K.owe)}`,`reserve: cash ${rps(K.cash)} − owed to labels ${rps(K.owe)}`):$t(`kewajiban ke label ${rps(K.owe)}`,`owed to labels ${rps(K.owe)}`),c:K.st,x:K.known?$t(`kas dicatat ${fdd(K.lastAt)}`,`cash recorded ${fdd(K.lastAt)}`):'',go:G({fn:'nav',to:'finance'})}:null,
  T?{m:$t('Transaksi','Transactions'),n:rps(T.rec),t:$t(`diterima penyedia ${curM}`,`received by the provider in ${curM}`),c:T.rfOpen.n?[$t(`${T.rfOpen.n} pengembalian · ${rps(T.rfOpen.sum)}`,`${T.rfOpen.n} refund${T.rfOpen.n>1?'s':''} · ${rps(T.rfOpen.sum)}`),'c-bl']:T.work?[$t(`${T.work} perlu ditangani`,`${T.work} to handle`),'c-or']:[$t('Beres','All clear'),'c-gr'],go:G({fn:'nav',to:'transactions'})}:null].filter(Boolean);
 return {done,steps,segs,total:K?.owe||0,tiles,tone:lateN?'r':cy.phase==='pay'&&inSum?'o':'b'};}
function grow(g,all,today){const cur=today.slice(0,7),win=(end,n)=>Array.from({length:n},(_,i)=>addM(end,i-n+1)),M=p=>monS(p);
 const out={};
 if(g.rel){const nxt=addM(cur,1),ms=win(nxt,6),c={};for(const r of g.rel.all){const k=String(r.d||'').slice(0,7);if(k)c[k]=(c[k]||0)+1;}const mx=Math.max(...ms.map(m=>c[m]||0));
  out.releases={t:$t('Rilisan','Releases'),big:String(c[nxt]||0),unit:$t(`terjadwal ${monOf(nxt)}`,`scheduled for ${monOf(nxt)}`),d:(c[nxt]||0)&&(c[nxt]||0)===mx?$t('tertinggi dalam 6 bulan','highest in 6 months'):$t(`${monOf(cur)}: ${c[cur]||0} rilisan`,`${monOf(cur)}: ${c[cur]||0} release${(c[cur]||0)===1?'':'s'}`),src:$t('Sumber: Rilisan · menurut tanggal rilis','Source: Releases · by release date'),m:ms.map(m=>[M(m),c[m]||0,m>cur?'pend':'ok'])};}
 if(g.roy){const by={};for(const r of g.roy.rep){if(!r.period)continue;const x=by[r.period]||(by[r.period]={v:0,ok:false});x.v+=r.total;if(['done','funds'].includes(r.st))x.ok=true;}
  const ps=Object.keys(by).sort(),end=ps.at(-1)||cur,ms=win(end,6),okP=ps.filter(p=>by[p].ok),last=okP.at(-1),prev=okP.at(-2),pend=ms.filter(m=>by[m]&&!by[m].ok);
  out.royalty={t:$t('Pendapatan royalti','Royalty income'),big:last?rps(by[last].v):'—',unit:last?monOf(last):$t('belum ada laporan terbit','no report published yet'),delta:last&&prev&&by[prev].v?(by[last].v-by[prev].v)/by[prev].v*100:null,d:prev?$t(`dibanding ${monOf(prev)} ${rps(by[prev].v)}`,`vs ${monOf(prev)} ${rps(by[prev].v)}`):$t('laporan pertama yang terbit','first published report'),src:$t('Sumber: laporan royalti yang terbit','Source: published royalty reports')+(pend.length?$t(` · ${pend.map(m=>monOf(m)).join(', ')} belum terbit`,` · ${pend.map(m=>monOf(m)).join(', ')} not yet published`):''),m:ms.map(m=>[M(m),by[m]?by[m].v/1e6:0,!by[m]?'none':by[m].ok?'ok':'pend']),fmt:'jt'};}
 if(g.trx){const ms=win(cur,6),by=g.trx.byM,first=Object.keys(by).sort()[0];
  out.service={t:$t('Pendapatan layanan','Service income'),big:rps(by[cur]||0),unit:monOf(cur),d:first?(first===cur?$t('bulan pertama yang tercatat di Transaksi','first month recorded in Transactions'):$t(`tercatat sejak ${month(first)}`,`recorded since ${month(first)}`)):$t('belum ada transaksi tercatat','no transactions recorded yet'),src:$t('Sumber: Transaksi · uang diterima penyedia','Source: Transactions · money received by the provider')+(first&&first>ms[0]?$t(` · sebelum ${monOf(first)} belum ada transaksi tercatat`,` · nothing recorded before ${monOf(first)}`):''),m:ms.map(m=>[M(m),(by[m]||0)/1e6,first&&m>=first?'ok':'none']),fmt:'jt'};}
 {const ms=win(cur,6),c={};let first='';for(const x of all){const j=String(x.m.joined||'').slice(0,7);if(!j)continue;c[j]=(c[j]||0)+1;if(!first||j<first)first=j;}const act=all.filter(x=>x.m.active).length,pros=all.length-act;
  out.labels={t:$t('Label','Labels'),big:String(act),unit:$t(`aktif dari ${all.length} label`,`active of ${all.length} labels`),d:pros?$t(`${pros} calon member`,`${pros} prospective member${pros===1?'':'s'}`):$t('tidak ada calon member','no prospective members'),src:$t('Sumber: Manajemen Label · menurut tanggal bergabung','Source: Label Management · by join date')+(first?$t(` · tercatat sejak ${month(first)}`,` · recorded since ${month(first)}`):''),m:ms.map(m=>[M(m),c[m]||0,first&&m>=first?'ok':'none'])};}
 return out;}

/* ================= Staf ================= */
const laneOf=x=>x.wait==='Super Admin'?'wait':x.over?'late':x.due===0?'today':x.wait?'wait':x.due!=null&&x.due<=7?'week':'later';
function dataStaf(){const me_=state.user,today=U.today(),g={rel:sum('releases'),tk:sum('tickets'),lt:sum('addons'),upd:sum('updates')},go=[],G=d=>go.push(d)-1;
 const pool=[...(g.rel?.P||[]),...(g.tk?.P||[]),...(g.lt?.P||[]),...tasksOpen().map(taskRow)];
 const can=x=>{try{return typeof may114!=='function'||may114(x.src==='release'?'releases':x.src==='ticket'?'tickets':x.src==='wami'?'wami':'services',x.src==='release'?'review':'claim',x.m);}catch(err){return true;}};
 const mine=pool.filter(x=>x.who===me_).map(x=>({...x,lane:laneOf(x),go:G({fn:x.src,id:x.id})})).sort((a,b)=>(a.due??99)-(b.due??99));
 const take=pool.filter(x=>!x.who&&x.src!=='task'&&!x.wait&&can(x)).sort((a,b)=>(a.due??99)-(b.due??99)).map(x=>({...x,go:G({fn:x.src,id:x.id})}));
 const L=k=>mine.filter(x=>x.lane===k),nx=L('late')[0]||L('today')[0]||L('week')[0]||L('later')[0],after=[...L('late'),...L('today'),...L('week'),...L('later')].filter(x=>x!==nx)[0];
 let pf={total:0,on:0,corrections:0};try{pf=perf(me_,state.period)||pf;}catch(err){}
 /* langkah yang tercatat atas namamu hari ini (riwayat asli rilisan, tiket, penarikan) */
 let steps=0;try{steps+=(ten.events||[]).filter(e=>e.actorId102===me_&&U.isoDay(e.at)===today).length;for(const t of ten.tickets112?.tickets||[])steps+=(t.history||[]).filter(h=>h.actor===me_&&U.isoDay(h.at)===today).length;for(const w of model108().requests||[])steps+=(w.events||[]).filter(e=>e.actor===me_&&U.isoDay(typeof e.at==='number'?e.at:Date.parse(e.at))===today).length;}catch(err){}
 const tr=(data.timeRecords||{})[me_+':'+today]||null;
 const news=[...(g.upd?.maint||[]).map(w=>({t:$t('Pemeliharaan','Maintenance')+` ${dl(w.at)} · ${U.hm(w.at.slice(11,16))}–${U.hm(String(w.end).slice(11,16))}`,d:w.d||w.t,r:w.id})),...(g.upd?.internal||[]).slice(0,3).map(x=>({t:x.t,d:x.d||'',r:x.ver||x.id}))].map(x=>({...x,go:G({fn:'nav',to:'updates'})}));
 const when=x=>x.over?(x.due!=null&&x.due<0?$t(`terlambat ${-x.due} hari`,`${nd(-x.due)} overdue`):$t('lewat tenggat','overdue')):x.due===0?$t('jatuh tempo hari ini','due today'):x.due===1?$t('besok','tomorrow'):x.due!=null?$t(`${x.due} hari lagi`,`in ${nd(x.due)}`):$t('tanpa tenggat dekat','no near deadline');
 const hero=nx?{k:$t('Berikutnya untukmu','Next for you'),h:nx.t,p:`${nx.l} · ${when(nx)} · ${nx.st}`,b:[$t(`Buka di ${nx.menu.split(' › ')[0]}`,`Open in ${nx.menu.split(' › ')[0]}`),nx.go],n:after?$t(`Setelah itu: ${after.t}`,`After that: ${after.t}`):''}
  :take.length?{k:$t('Bisa kamu ambil','You can take'),h:take[0].t,p:`${take[0].l} · ${$t('belum ada petugas','unassigned')} · ${take[0].over?$t('lewat tenggat','overdue'):take[0].due===0?$t('jatuh tempo hari ini','due today'):take[0].due!=null?$t(`tenggat ${fdd(take[0].dueDate)}`,`deadline ${fdd(take[0].dueDate)}`):$t('tanpa tenggat','no deadline')}`,b:[$t('Lihat','View'),take[0].go],n:take.length>1?$t(`${take.length-1} lainnya bisa diambil`,`${take.length-1} more you can take`):''}
  :{k:$t('Berikutnya untukmu','Next for you'),h:$t('Tidak ada pekerjaan yang menunggumu','Nothing is waiting for you'),p:$t('Pekerjaan baru tampil di sini begitu ditugaskan kepadamu.','New work shows up here as soon as it is assigned to you.'),b:null,n:''};
 hero.line=$t(`${mine.length} pekerjaan berjalan · ${L('late').length} terlambat · ${L('wait').length} menunggu pihak lain`,`${mine.length} task${mine.length===1?'':'s'} in progress · ${L('late').length} overdue · ${L('wait').length} waiting on others`);
 return {mode:'staf',go,hero,mine,take,pf,steps,tr,news,period:month(state.period)};}

/* ================= Label ================= */
function dataLabel(){const m=member10(),id=m.id,today=U.today(),go=[],G=d=>go.push(d)-1;
 const plan=safe(()=>typeof Packages122!=='undefined'&&Packages122.name?Packages122.name(m.plan):m.plan,m.plan)||m.plan;
 /* kredit */
 const bal=safe(()=>RM10.balance(ten,m),{paid:0,daily:0,replacement:0}),daily=safe(()=>typeof RM10.daily==='function'?RM10.daily(ten,m):!!RM10.daily,false),rules=safe(()=>Credit11.active(ten).rules,{});
 const lots=(m.lots||[]).filter(x=>x.available>0&&(!x.expires||x.expires>ten.now)&&(x.type!=='daily'||daily)).sort((a,b)=>(a.expires||9e15)-(b.expires||9e15));
 const credits=bal.paid+bal.daily+bal.replacement,soon=lots.filter(x=>x.expires&&x.expires-ten.now<=2*864e5);
 /* rilisan */
 const rs=sum('releases'),mineR=(rs?.all||[]).filter(r=>r.m===id),drafts=(ten.releases||[]).filter(r=>r.member===id&&r.status==='draft').length,fix=mineR.filter(r=>r.s==='revision');
 const live=mineR.filter(r=>['live','partial_closed'].includes(r.s)).length,next=mineR.filter(r=>r.p&&r.s!=='revision').sort((a,b)=>String(a.d).localeCompare(String(b.d)));
 /* royalti & penarikan */
 const r7=model107(),acc=safe(()=>Withdraw108.owner(r7,id)?.id||Withdraw108.owner(r7,id),id),tot=safe(()=>Withdraw108.totals(r7,typeof acc==='string'?acc:id),{available:0,pending:0,processing:0,paid:0});
 const wd=(model108().requests||[]).filter(w=>w.account===acc&&w.status!=='paid').sort((a,b)=>String(a.created).localeCompare(String(b.created)))[0]||null;
 const ws=wd?sum('withdraw')?.open.find(x=>x.id===wd.id):null;
 const reps=(r7.batches||[]).filter(b=>!b.archived&&b.fingerprint!=='sample131-legacy'&&(b.posted||[]).includes(id)).map(b=>{const period=b.sample131?.period||b.rows[0]?.period||'',amt=b.rows.filter(r=>r.member===id).reduce((n,r)=>n+r.amount,0),h=(r7.history||[]).filter(h=>h.ref===b.id&&h.kind==='publish').at(-1);return {id:b.id,period,amt,at:h?String(h.at).slice(0,10):''};}).filter(x=>x.amt).sort((a,b)=>b.period.localeCompare(a.period));
 const bank=m.bank?.pending?{b:m.bank.pending,st:[$t('Sedang diverifikasi','Being verified'),'c-bl']}:m.bank?.approved?{b:m.bank.approved,st:[$t('Terverifikasi','Verified'),'c-gr']}:null;
 /* pesan & layanan */
 const tk=(sum('tickets')?.P||[]).filter(t=>t.m===id),lt=(sum('addons')?.P||[]).filter(o=>o.m===id);
 const tgt=x=>x.dueDate&&!x.wait?` · target ${x.due===0?$t('hari ini','today'):x.due===1?$t('besok','tomorrow'):fdd(x.dueDate)}`:'';
 const talk=[...tk.map(t=>({id:t.id,t:t.t.split(' · ').slice(1).join(' · ')||t.t,m:$t('Pesan','Messages'),msg:true,s:`${t.st}${tgt(t)}`,c:t.wait==='Label'?'c-or':'c-bl',go:G({fn:'fire',attrs:{'data-p133':'open'}})})),...lt.map(o=>({id:o.id,t:o.t.split(' · ').slice(1).join(' · '),m:o.menu,s:`${o.st}${tgt(o)}`,c:o.wait==='Label'?'c-or':'c-bl',go:G({fn:o.src,id:o.id})}))];
 /* pembaruan */
 const up=sum('updates-label',id)||{ann:[],maint:[],feat:[],fresh:0};
 const loc=safe(()=>Planning121.legacyStatus(ten,m,ten.now),{});const locNeed=loc.legacy&&!loc.complete,locTxt=locNeed?safe(()=>{const d=document.createElement('div');d.innerHTML=legacyBanner121(m);return d.querySelector('p')?.textContent||'';},''):'';
 const life=safe(()=>typeof life132==='function'?life132(id):null,null),req=life?safe(()=>request132(id),null):null,left=life?safe(()=>daysLeft132(id),0):0;
 /* sorotan: yang paling perlu dilakukan label */
 const cand=[];
 if(life&&!req&&left>0)cand.push({k:$t('Layanan Anda berubah','Your service is changing'),h:$t(`Sisa ${left} hari untuk mengajukan pengembalian dana`,`${nd(left)} left to request a refund`),p:$t(`${life.plan} → paket baru gratis 1 tahun · pengembalian penuh ${rp(life.amount)}`,`${life.plan} → new plan free for 1 year · full refund ${rp(life.amount)}`),b:[$t('Lihat rincian','View details'),G({fn:'fire',attrs:{'data-tr132':'open'}})]});
 if(fix.length)cand.push({k:$t('Perlu kamu perbaiki','Needs your fix'),h:$t(`${fix.length} rilisan perlu diperbaiki`,`${fix.length} release${fix.length>1?'s':''} need${fix.length>1?'':'s'} a fix`),p:`${fix[0].t}${fix[0].dueDate?$t(` · batas ${fdd(fix[0].dueDate)}`,` · deadline ${fdd(fix[0].dueDate)}`):''}`,b:[$t('Buka rilisan','Open release'),G({fn:'fire',attrs:{'data-ten':'release','data-id':fix[0].id}})]});
 if(soon.length){const n=soon.reduce((a,x)=>a+x.available,0);cand.push({k:$t('Kredit','Credits'),h:$t(`${n} kredit berakhir ${dl(U.isoDay(soon[0].expires))}`,`${n} credit${n>1?'s':''} expire ${dl(U.isoDay(soon[0].expires))}`),p:$t('Pakai untuk rilisan berikutnya · kredit yang paling cepat berakhir dipakai lebih dulu.','Use them for your next release · credits that expire first are used first.'),b:[$t('Buat rilisan','Create release'),G({fn:'fire',attrs:{'data-ten':'newrelease','data-id':''}})]});}
 const must=up.ann.filter(a=>a.must&&!a.read&&!(life&&!req&&a.life));if(must.length)cand.push({k:$t('Wajib dibaca','Must-read'),h:must[0].t,p:cut(must[0].b,110),b:[$t('Baca','Read'),G({fn:'fire',attrs:{'data-tr132':'news','data-id':must[0].id}})]});
 if(wd)cand.push({k:$t('Penarikan','Withdrawals'),h:$t(`Penarikan ${rp(wd.amount)} sedang diproses`,`Withdrawal of ${rp(wd.amount)} in progress`),p:`${wd.id} · ${$t('dibayar paling lambat','paid by')} ${dl((ws?.cycle||today.slice(0,7))+'-20')}`,b:[$t('Lihat penarikan','View withdrawal'),G({fn:'fire',attrs:{'data-w108':'detail','data-id':wd.id}})]});
 if(locNeed)cand.push({k:$t('Profil label','Label profile'),h:$t('Lengkapi data lokasi label','Complete your label location'),p:locTxt.split(' · ')[0]||$t('Akun tetap aktif','Your account stays active'),b:[$t('Identitas Label','Label Identity'),G({fn:'fire',attrs:{'data-u121':'identity','data-id':''}})]});
 const hero=cand[0]?{...cand[0],n:cand[1]?$t(`Berikutnya: ${cand[1].h}`,`Next: ${cand[1].h}`):''}:{k:$t('Sorotan','Highlight'),h:$t('Semua beres','All clear'),p:next[0]?$t(`${next[0].t} tayang ${fdd(next[0].d)}`,`${next[0].t} goes live ${fdd(next[0].d)}`):$t('Tidak ada yang perlu kamu lakukan hari ini.','Nothing to do today.'),b:[$t('Buat rilisan','Create release'),G({fn:'fire',attrs:{'data-ten':'newrelease','data-id':''}})],n:''};
 const nD=next[0]?.d,sameDay=next.filter(r=>r.d===nD).length;
 hero.line=$t(`Paket ${plan} · ${mineR.length} rilisan, ${live} tayang`,`${plan} plan · ${mineR.length} release${mineR.length===1?'':'s'}, ${live} live`)+(nD?$t(` · ${sameDay} tayang ${fdd(nD)}`,` · ${sameDay} going live ${fdd(nD)}`):'');
 return {mode:'label',go,hero,name:m.name,plan,credits,lots,daily,rules,drafts,fix,live,total:mineR.length,next,tot,wd,ws,reps,bank,talk,up,locNeed,locTxt,
  goRep:reps[0]?G({fn:'fire',attrs:{'data-r107':'report','data-id':reps[0].period}}):null,goWd:wd?G({fn:'fire',attrs:{'data-w108':'detail','data-id':wd.id}}):null,goNew:G({fn:'fire',attrs:{'data-ten':'newrelease','data-id':''}}),goPlan:G({fn:'fire',attrs:{'data-ten':'plans','data-id':''}}),goCredit:G({fn:'fire',attrs:{'data-ten':'page','data-id':'credits'}}),goRel:G({fn:'fire',attrs:{'data-ten':'page','data-id':'releases'}}),goMsg:G({fn:'fire',attrs:{'data-p133':'open'}}),goUpd:G({fn:'fire',attrs:{'data-ten':'page','data-id':'updates'}}),goLoc:G({fn:'fire',attrs:{'data-u121':'identity','data-id':''}}),
  relGo:next.slice(0,3).map(r=>G({fn:'fire',attrs:{'data-ten':'release','data-id':r.id}}))};}

/* ================= data & tanda perubahan ================= */
try{const sv10=save10;save10=function(){REV++;return sv10.apply(this,arguments);};}catch(err){}
const key=()=>[REV,ten.serial,ten.now,state.user,ten.role,ten.member,state.lang,state.period,(data.chats?.internal||[]).length,Object.keys(data.timeRecords||{}).length,day()].join('|');
function view(){const k=key();if(V&&k===VK)return V;VK=k;const t0=performance.now(),md=mode();V=md==='label'?dataLabel():md==='sa'?dataSA():dataStaf();V.ms=Math.round(performance.now()-t0);return V;}
function goTo(i){const d=V?.go?.[i];if(!d)return;try{switch(d.fn){
 case 'nav':if(!go137(d.to))toast($t('Menu belum tersedia untuk akunmu','This menu is not available for your account'));break;
 case 'release':ui105.view='detail';ui105.id=d.id;if(!go137('releases'))toast($t('Buka Rilisan','Open Releases'));break;
 case 'ticket':detail112(d.id);break;
 case 'service':detail111(d.id);break;
 case 'wami':detail11(d.id);break;
 case 'task':typeof openJob114==='function'?openJob114('task:'+d.id):taskModal(d.id);break;
 case 'op':opModal(d.id);break;
 case 'withdraw':if(d.id&&typeof ui108==='object')ui108.detail=d.id;go137('withdraw');break;
 case 'royalty':window.royTab137=d.tab||'rep';if(d.id&&typeof ui107==='object')ui107.batch=d.id;go137('royalty');break;
 case 'refund':if(typeof ui113==='object')ui113.tab='refunds';go137('transactions');break;
 case 'labels':if(typeof l136==='object'){l136.tab=d.tab||'all';l136.seg=d.seg||'';l136.q='';l136.sel=null;l136.read=false;}go137('labels');break;
 case 'role':window.saRole137=d.id;go137('staff');break;
 case 'fire':fire(d.attrs);break;}}catch(err){console.warn('db137 go',err);toast($t('Tidak bisa dibuka dari sini','Can’t be opened from here'));}}

/* ================= header: sapaan + sorotan (kartu header asli) ================= */
function heroHTML(v){const h=v.hero,name=v.mode==='label'?v.name:me().name;
 return `<section class="dashboard-hero122 hero124 hero134 hero137" aria-label="${$t('Ringkasan dashboard','Dashboard overview')}"><div class="hero-copy122"><h1>${greeting124()},<br><span>${E(name)}.</span></h1><p class="hero-context122"><span class="k137">${E(U.todayLabel())}${v.mode==='label'?'':' · '+clock()}</span><br>${E(h.line)}</p></div>
 <div class="hero-insight-wrap122"><div class="hero-insight122 spot134"><span class="insight-title122">${IC.spark}${E(v.mode==='sa'?$t('Sorotan hari ini · ','Today’s highlight · ')+h.k:h.k)}</span><strong class="spot-h134">${E(h.h)}</strong><small class="spot-s134">${E(h.p)}</small><span class="spot-row134">${h.b?`<button type="button" class="spot-btn134" data-db137-go="${h.b[1]}">${E(h.b[0])} ${IC.arrow}</button>`:''}<small>${E(h.n||'')}</small></span></div></div></section>`;}
const heroBefore=hero122;
hero122=function(){if(!on())return heroBefore.apply(this,arguments);try{return heroHTML(view());}catch(err){console.warn('db137 hero',err);return heroBefore.apply(this,arguments);}};
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-db137-go]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();goTo(+b.dataset.db137Go);},true);

/* ================= tampilan Super Admin ================= */
function moneyCard(v){const M=v.money,cy=v.cy,tot=M.total||1;
 const left=cy.n?(cy.n===1?$t('hari lagi','day left'):$t('hari lagi','days left')):$t('hari ini','today');
 const ring=cy.phase==='next'?[left,$t(`pengajuan dibuka ${dl(cy.date)}`,`requests open ${dl(cy.date)}`)]:cy.phase==='win'?[left,$t(`pengajuan ditutup ${dl(cy.date)}`,`requests close ${dl(cy.date)}`)]:[left,$t(`batas bayar ${dl(cy.date)}`,`pay by ${dl(cy.date)}`)];
 return `<section class="card money rv rl"><div class="ch"><h3>${$t('Uang','Money')} <small>${$t(`siklus ${monOf(cy.cy)}`,`${monOf(cy.cy)} cycle`)}</small></h3><div class="mring ${M.tone}"><div class="dring" style="--p:${cy.p}"><svg viewBox="0 0 36 36"><circle class="trk" cx="18" cy="18" r="15.9" pathLength="100"/><circle class="arc" cx="18" cy="18" r="15.9" pathLength="100"/></svg><b>${cy.n}</b></div><span>${ring[0]}<small>${E(ring[1])}</small></span></div></div>
 ${M.done?`<p class="mdone">${IC.check}${E(M.done)}</p>`:''}
 <div class="cyc">${M.steps.map(s=>`<button class="cs ${s.st}${s.act?' act':''}${s.warn?' warn':''}" data-go="${s.go}"><span class="cd">${s.st==='done'?IC.check:''}</span><span class="cl">${E(s.l)}</span><b>${E(s.b)}</b><small>${E(s.s)}</small></button>`).join('')}</div>
 ${M.segs.length?`<div class="mbar">${M.segs.map(([t,n,k,d])=>`<i class="${k}" style="--w:${(n/tot*100).toFixed(2)}%" data-tip="${E(`${t} · ${rps(n)} — ${d}`)}" tabindex="0"></i>`).join('')}</div>
 <div class="mleg">${M.segs.map(([t,n,k])=>`<span><i class="${k}"></i>${E(t)} <b>${rps(n)}</b></span>`).join('')}<span class="tot">${$t('Kewajiban ke label','Owed to labels')} <b>${rps(M.total)}</b></span></div>`:''}
 <div class="tiles">${M.tiles.map(t=>`<button class="tile" data-go="${t.go}"><span class="tm">${E(t.m)}${IC.chev}</span><b>${E(t.n)}</b><span class="tt2">${E(t.t)}</span>${chip(t.c[0],t.c[1])}${t.x?`<small>${E(t.x)}</small>`:''}</button>`).join('')}</div></section>`;}
const CATS=()=>[['all',$t('Semua','All')],['late',$t('Terlambat di tim','Team overdue')],['uang',$t('Uang','Money')],['label','Label'],['tiket',$t('Tiket','Tickets')]];
function rowDec(d){return `<div class="dr" data-go="${d.go}" tabindex="0"><span class="ty">${IC[d.ic]||IC.doc}</span><div class="dm"><div class="t1">${E(d.t)} ${d.chip?chip(d.chip[0],d.chip[1]):dueChip(d.due)}</div><div class="t2">${E(d.menu)} · ${E(d.s)}</div></div>
 <div class="da"><button class="btn sm" data-go="${d.go}">${E(d.act)}</button>${d.wait?mini(d.wait,$t('Ditunggu ','Waiting: ')+pname(d.wait)):'<span class="mini none"></span>'}</div></div>`;}
/* aksi baris "Terlambat di tim": kode tetap (assign/open/remind), labelnya sesuai bahasa */
const LATEACT={assign:['Tugaskan','Assign'],open:['Buka','Open'],remind:['Ingatkan','Remind']};
function rowLate(l){const me_=state.user,act=!l.who?'assign':l.who===me_?'open':'remind',pick=S.pick===l.src+':'+l.id,sent=nudged(l.id);
 const team=(V.people||[]).filter(p=>p.id!==l.who);
 const sub=`${E(l.menu)} · ${l.who===me_?$t('Kamu · ','You · '):l.who?E(pname(l.who))+' · ':$t('Belum ada petugas · ','Unassigned · ')}${E(l.l)}${l.st?' · '+E(l.st):''}`;
 return `<div class="dr" data-go="${l.go}" tabindex="0"><span class="ty">${IC[l.ic]||IC.disc}</span><div class="dm"><div class="t1">${E(l.t)} ${chip(l.late?$t(`Terlambat ${l.late} hari`,`${nd(l.late)} overdue`):$t('Lewat tenggat','Overdue'),'c-red')}${sent?chip($t('Pengingat terkirim','Reminder sent'),'c-gr'):''}</div><div class="t2">${sub}</div></div>
 <div class="da">${pick?`<span class="pk">${team.map(p=>`<button data-assign="${E(l.src+':'+l.id)}|${E(p.id)}">${p.id===me_?$t('Saya','Me'):E(p.name)}</button>`).join('')}</span>`:`<button class="btn sm" data-late="${E(l.src+':'+l.id)}|${act}">${$t(...LATEACT[act])}</button>`}${l.who?mini(l.who):`<span class="mini none" title="${$t('Belum ada petugas','Unassigned')}"></span>`}</div></div>`;}
function decCard(v){const late=S.tab==='late',rows=late?v.late:sortDue(v.dec.filter(d=>S.tab==='all'||d.cat===S.tab)),max=S.more?999:7,shown=rows.slice(0,max);
 const cnt=k=>k==='late'?v.late.length:k==='all'?v.dec.length:v.dec.filter(d=>d.cat===k).length;
 return `<div class="ch"><h3>${$t('Perlu keputusan Anda','Needs your decision')} <small class="n">${v.dec.length}</small></h3><button class="lnk2" data-nav="work">${$t('Semua pekerjaan','All work')} ${IC.chev}</button></div>
 <div class="dtabs">${CATS().map(([k,t])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t} <b>${cnt(k)}</b></button>`).join('')}</div>
 ${late?`<p class="where">${$t('Pengawasan: pekerjaan tim yang lewat tenggat. Dikerjakan di menunya; dari sini cukup Tugaskan atau Ingatkan.','Oversight: team work past its deadline. It is done in its own menu; from here you only Assign or Remind.')}</p>`:''}
 <div class="drs">${shown.map(late?rowLate:rowDec).join('')||`<div class="empty2">${IC.check}<b>${late?$t('Tidak ada pekerjaan tim yang terlambat.','No team work is overdue.'):$t('Tidak ada yang menunggu di sini.','Nothing waiting here.')}</b></div>`}</div>
 <div class="dfoot">${rows.length>max?`<button class="btn sm" data-more>${$t(`Tampilkan ${rows.length-max} lainnya`,`Show ${rows.length-max} more`)}</button>`:S.more&&rows.length>7?`<button class="btn sm" data-more>${$t('Tampilkan lebih sedikit','Show less')}</button>`:'<span></span>'}<span>${$t('Urut: lewat tenggat dulu · klik baris untuk membuka di menunya','Sorted: overdue first · click a row to open it in its menu')}</span></div>`;}
function kondCard(v){return `<section class="card kond rv rl"><div class="ch"><h3>${$t('Kondisi menu','Menu health')}</h3></div><p class="where">${$t('Kalimat yang sama dengan pita ringkasan di tiap menu.','The same sentence as the summary band in each menu.')}</p>
 <div class="krs">${v.kond.map(k=>`<button class="kr" data-go="${k.go}"><i class="kdot ${k.tone}"></i><span><b>${E(k.t)}</b><small>${E(k.line)}</small></span>${IC.chev}</button>`).join('')}</div></section>`;}
function growCard(v){const keys=Object.keys(v.grow);if(!keys.includes(S.growth))S.growth=keys[0];
 return `<section class="card grow rv rl" id="grow"><div class="ch"><h3>${$t('Pertumbuhan','Growth')}</h3><small class="gsub">${$t('6 bulan · hanya data yang tercatat','6 months · recorded data only')}</small></div>
 <div class="gt">${keys.map(k=>{const g=v.grow[k];return `<button data-growth="${k}" aria-pressed="${S.growth===k}"><span>${E(g.t)}</span><b>${E(g.big)}</b><small>${E(g.unit)}</small></button>`;}).join('')}</div>
 <div class="gc"><div class="gh2"><b id="gbig"></b><span id="gunit"></span><span id="gdelta"></span></div><p class="gd" id="gd"></p><div class="bars" id="bars">${Array.from({length:6},()=>'<div class="bc"><em></em><div class="bw"><i></i></div><span></span></div>').join('')}</div>
 <div class="gleg"><span><i class="ok"></i>${$t('tercatat','recorded')}</span><span><i class="pend"></i>${$t('belum terbit / terjadwal','not yet published / scheduled')}</span><span><i class="none"></i>${$t('belum ada data','no data yet')}</span></div><p class="where" id="gsrc"></p></div></section>`;}
function drawGrow(){const g=V?.grow?.[S.growth];if(!g||!$('bars'))return;const mx=Math.max(...g.m.map(x=>x[1]))||1;
 $('gbig').textContent=g.big;$('gunit').textContent=g.unit;$('gdelta').innerHTML=g.delta!=null?`<span class="delta ${g.delta<0?'down':'up'}">${g.delta<0?'▼':'▲'} ${U.num(Math.abs(g.delta),1)}%</span>`:'';$('gd').textContent=g.d;$('gsrc').textContent=g.src;
 [...$('bars').children].forEach((c,i)=>{const [m,val,k]=g.m[i];c.className='bc '+k;c.querySelector('i').style.height=(k==='none'?4:Math.max(6,val/mx*100))+'%';c.querySelector('span').textContent=m;c.querySelector('em').textContent=k==='none'?'—':(g.fmt==='jt'?U.num(val,1):val)+(k==='pend'?(S.growth==='royalty'?$t(' · belum terbit',' · not published'):$t(' · terjadwal',' · scheduled')):'');});
 root.querySelectorAll('[data-growth]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.growth===S.growth));}
const viewSA=v=>moneyCard(v)+`<div class="dgrid"><section class="card dec rv rl" id="dec">${decCard(v)}</section>${kondCard(v)}</div>`+growCard(v);

/* ================= tampilan Staf ================= */
function viewStaf(v){const L=k=>v.mine.filter(x=>x.lane===k);
 const row=x=>`<div class="dr" data-go="${x.go}" tabindex="0"><span class="ty">${IC[x.ic]||IC.disc}</span><div class="dm"><div class="t1">${E(x.t)} ${x.lane==='wait'?chip(x.wait,'c-bl'):x.over&&!(x.due<0)?chip($t('Lewat tenggat','Overdue'),'c-red'):dueChip(x.due)}</div><div class="t2">${E(x.menu)} · ${E(x.l)} · ${E(x.st)}</div></div><div class="da"><button class="btn sm" data-go="${x.go}">${$t('Buka','Open')}</button></div></div>`;
 const grp=(k,t,sub,empty,hide)=>{const r=L(k);if(hide&&!r.length)return '';const c=k==='wait'&&!S.waitAll&&r.length>3,sh=c?r.slice(0,3):r;return `<div class="lane"><div class="lh"><b>${t}</b><span>${r.length}</span>${sub?`<small>${sub}</small>`:''}</div>${r.length?sh.map(row).join(''):`<p class="where">${empty}</p>`}${k==='wait'&&r.length>3?`<div class="lmore"><button class="btn sm" data-waitall>${c?$t(`Tampilkan ${r.length-3} lainnya`,`Show ${r.length-3} more`):$t('Tampilkan lebih sedikit','Show less')}</button></div>`:''}</div>`;};
 const p=v.pf.total?Math.round(v.pf.on/v.pf.total*100):0,tr=v.tr;
 return `<div class="dgrid"><section class="card rv rl"><div class="ch"><h3>${$t('Pekerjaanku','My work')} <small class="n">${v.mine.length}</small></h3><button class="lnk2" data-nav="work">${$t('Buka Pekerjaan','Open Work')} ${IC.chev}</button></div>
 ${grp('late',$t('Terlambat','Overdue'),$t('kerjakan dulu','do these first'),$t('Tidak ada yang terlambat.','Nothing overdue.'))}
 ${grp('today',$t('Hari ini','Today'),'',$t('Tidak ada pekerjaanmu yang jatuh tempo hari ini.','None of your work is due today.'))}
 ${v.take.length?`<div class="take"><div class="lh"><b>${$t('Bisa kamu ambil','You can take')}</b><span>${v.take.length}</span><small>${$t('belum ada petugas · urut tenggat','unassigned · by deadline')}</small></div>${v.take.slice(0,4).map(o=>`<div class="dr" data-go="${o.go}" tabindex="0"><span class="ty">${IC[o.ic]||IC.disc}</span><div class="dm"><div class="t1">${E(o.t)} ${o.over&&!(o.due<0)?chip($t('Lewat tenggat','Overdue'),'c-red'):dueChip(o.due)}</div><div class="t2">${E(o.menu)} · ${E(o.l)} · ${E(o.st)}</div></div><div class="da"><button class="btn sm pri" data-take="${E(o.src+':'+o.id)}">${$t('Ambil','Take')}</button></div></div>`).join('')}</div>`:''}
 ${grp('week',$t('7 hari ke depan','Next 7 days'),'',$t('Kosong.','Empty.'))}
 ${grp('later',$t('Nanti','Later'),$t('tanpa tenggat dekat','no near deadline'),'',true)}
 ${grp('wait',$t('Menunggu pihak lain','Waiting on others'),$t('bola di pihak lain','with someone else'),$t('Kosong.','Empty.'))}</section>
 <div class="side2"><section class="card rv rl"><div class="ch"><h3>${$t('Hasilku','My results')}</h3><small class="gsub">${E(v.period)}</small></div>
  <div class="perf"><div class="dring big" style="--p:${p}"><svg viewBox="0 0 36 36"><circle class="trk" cx="18" cy="18" r="15.9" pathLength="100"/><circle class="arc" cx="18" cy="18" r="15.9" pathLength="100"/></svg><b>${v.pf.total?p+'%':'—'}</b></div><div><b>${$t('tepat waktu','on time')}</b><small>${$t(`${v.pf.on} dari ${v.pf.total} tahapan · ${v.pf.corrections||0} perlu koreksi`,`${v.pf.on} of ${v.pf.total} steps · ${v.pf.corrections||0} needed correction`)}</small></div></div>
  <div class="facts"><span>${$t('Hari ini','Today')}</span><b>${$t(`${v.steps} langkah tercatat`,`${v.steps} step${v.steps===1?'':'s'} recorded`)}</b><span>${$t('Kehadiran','Attendance')}</span><b>${tr?.in?$t(`Masuk ${E(U.hm(tr.in))}`,`In ${E(U.hm(tr.in))}`)+(tr.out?$t(` · pulang ${E(U.hm(tr.out))}`,` · out ${E(U.hm(tr.out))}`):''):$t('Belum tercatat','Not recorded')}</b></div>
  ${tr?.in?'':`<div class="hrow"><button class="btn" data-att>${IC.clock}${$t('Catat kehadiran','Record attendance')}</button></div>`}</section>
  <section class="card rv rl"><div class="ch"><h3>${$t('Pengumuman','Announcements')}</h3></div>${v.news.length?`<div class="news">${v.news.map(n=>`<button class="nw" data-go="${n.go}"><b>${E(n.t)}</b><small>${E(n.d)}</small></button>`).join('')}</div>`:`<p class="where">${$t('Belum ada pengumuman untuk tim.','No announcements for the team yet.')}</p>`}</section></div></div>`;}

/* ================= tampilan Label ================= */
function viewLabel(v){const wd=v.wd,ws=v.ws,created=ws?.created||U.iso16(+wd?.created||Date.parse(wd?.created)),stp=wd?[[$t('Diajukan','Requested'),fdd(created),'done'],[$t('Diperiksa','Checked'),$t('tim Rilis Musik','Rilis Musik team'),wd.status==='requested'?'now':'done'],[$t('Dibayar','Paid'),$t(`paling lambat ${fdd((ws?.cycle||U.today().slice(0,7))+'-20')}`,`by ${fdd((ws?.cycle||U.today().slice(0,7))+'-20')}`),['ready','processing'].includes(wd.status)?'now':'wait']]:[];
 const r0=v.reps[0],r1=v.reps[1],R=v.rules||{},cr=n=>n===1?$t('1 kredit','1 credit'):$t(`${n} kredit`,`${n} credits`);
 return `<div class="lgrid">
 <section class="card rv rl lroy"><div class="ch"><h3>${$t('Royalti &amp; penarikan','Royalties &amp; withdrawals')}</h3></div>
  ${wd?`<div class="big2"><b>${rp(wd.amount)}</b><small>${$t('sedang diproses','in progress')} · ${E(wd.id)} · ${$t('diajukan','requested')} ${E(U.fd(created))}</small></div>
  <div class="steps3">${stp.map(([a,b,c])=>`<div class="s3 ${c}"><i>${c==='done'?IC.check:''}</i><b>${a}</b><small>${E(b)}</small></div>`).join('')}</div>
  ${ws?.outside?`<p class="where">${$t('Diajukan di luar tanggal 1–14, jadi masuk siklus berikutnya.','Requested outside the 1st–14th, so it joins the next cycle.')}</p>`:''}`:`<div class="big2"><b>${rp(v.tot.available)}</b><small>${$t('saldo tersedia · pengajuan penarikan tanggal 1–14, dibayar paling lambat tanggal 20','available balance · request withdrawals on the 1st–14th, paid by the 20th')}</small></div>`}
  <div class="facts">${wd?`<span>${$t('Saldo tersedia','Available balance')}</span><b>${rp(v.tot.available)}</b>`:''}${r0?`<span>${$t('Laporan terakhir','Latest report')}</span><b>${month(r0.period)} · ${rp(r0.amt)}${r0.at?` <small>${$t('terbit','published')} ${fdd(r0.at)}</small>`:''}</b>`:''}${r1?`<span>${$t('Sebelumnya','Previous')}</span><b>${month(r1.period)} · ${rp(r1.amt)}</b>`:''}<span>${$t('Rekening','Bank account')}</span><b>${v.bank?`${E(v.bank.b.bank)} ••••${E(String(v.bank.b.number||'').replace(/\D/g,'').slice(-4))} ${chip(v.bank.st[0],v.bank.st[1])}`:$t('Belum ada rekening','No bank account yet')}</b></div>
  <div class="hrow">${v.goRep!=null?`<button class="btn" data-go="${v.goRep}">${$t('Lihat laporan terakhir','View latest report')}</button>`:''}${v.goWd!=null?`<button class="btn" data-go="${v.goWd}">${$t('Rincian penarikan','Withdrawal details')}</button>`:''}</div></section>
 <section class="card rv rl"><div class="ch"><h3>${$t('Kredit','Credits')}</h3></div><div class="big2"><b>${cr(v.credits)}</b><small>${$t(`Paket ${E(v.plan)}`,`${E(v.plan)} plan`)}${v.daily&&R.daily?$t(` · ${R.daily} kredit setiap hari · berlaku ${R.temporary||48} jam`,` · ${R.daily} credits every day · valid for ${R.temporary||48} hours`):''}</small></div>
  ${v.lots.length?`<div class="crs">${v.lots.slice(0,4).map((x,i)=>`<div class="crr${i||!x.expires?'':' soon'}"><b>${cr(x.available)}</b><span>${x.type==='daily'?$t('harian','daily'):x.type==='replacement'?$t('pengganti','replacement'):$t('dibeli','purchased')} · ${x.expires?$t('berakhir ','expires ')+E(dl(U.isoDay(x.expires))):$t('tidak berakhir','never expires')}</span>${!i&&x.expires?chip($t('Paling cepat berakhir','Expires first'),'c-or'):''}</div>`).join('')}</div>
  <p class="where">${$t('Yang paling cepat berakhir dipakai lebih dulu.','Credits that expire first are used first.')}</p>`:`<p class="where">${$t('Belum ada kredit. Beli kredit atau ubah paket untuk membuat rilisan.','No credits yet. Buy credits or change your plan to create a release.')}</p>`}
  <div class="hrow"><button class="btn pri" data-go="${v.goNew}">${$t('Buat rilisan','Create release')}</button><button class="btn" data-go="${v.goCredit}">${$t('Beli kredit','Buy credits')}</button><button class="btn" data-go="${v.goPlan}">${$t('Ubah paket','Change plan')}</button></div></section>
 <section class="card rv rl"><div class="ch"><h3>${$t('Rilisan','Releases')}</h3><small class="gsub">${$t(`${v.total} rilisan · ${v.live} tayang`,`${v.total} release${v.total===1?'':'s'} · ${v.live} live`)}</small></div>
  ${v.fix.length?`<div class="okline warn">${IC.info}<span><b>${$t(`${v.fix.length} rilisan perlu kamu perbaiki`,`${v.fix.length} release${v.fix.length>1?'s':''} need${v.fix.length>1?'':'s'} your fix`)}</b><small>${E(v.fix.map(r=>r.t).slice(0,2).join(' · '))}</small></span></div>`:`<div class="okline">${IC.check}<span><b>${$t('Tidak ada yang perlu kamu perbaiki','Nothing for you to fix')}</b><small>${$t(`Draf ${v.drafts} · perlu perbaikan 0`,`Drafts ${v.drafts} · needing a fix 0`)}</small></span></div>`}
  ${v.next.length?`<div class="lh"><b>${$t('Segera tayang','Going live soon')}</b><span>${v.next.length}</span></div>${v.next.slice(0,3).map((r,i)=>`<div class="dr" data-go="${v.relGo[i]}" tabindex="0"><span class="ty">${IC.disc}</span><div class="dm"><div class="t1">${E(r.t)} ${chip(r.st,'c-bl')}</div><div class="t2">${E(r.id)} · ${$t('tayang','live')} ${E(fdd(r.d))}</div></div></div>`).join('')}`:''}
  <div class="hrow"><button class="btn" data-go="${v.goRel}">${$t('Lihat semua','View all')}</button></div></section>
 <section class="card rv rl"><div class="ch"><h3>${$t('Pesan &amp; layanan','Messages &amp; services')}</h3></div>${v.talk.length?v.talk.slice(0,4).map(x=>`<div class="dr" data-go="${x.go}" tabindex="0"><span class="ty">${x.msg?IC.chat:IC.spark}</span><div class="dm"><div class="t1">${E(x.t)}</div><div class="t2">${E(x.m)} · ${chip(x.s,x.c)}</div></div></div>`).join(''):`<div class="okline">${IC.check}<span><b>${$t('Tidak ada pesan atau layanan berjalan','No messages or services in progress')}</b><small>${$t('Pertanyaan tentang rilisan, royalti, atau akun bisa dikirim lewat Pesan.','Questions about releases, royalties or your account can be sent through Messages.')}</small></span></div>`}
  <div class="hrow"><button class="btn" data-go="${v.goMsg}">${$t('Kirim pesan','Send a message')}</button></div></section>
 <section class="card rv rl lnews"><div class="ch"><h3>${$t('Pembaruan','Updates')}</h3><button class="lnk2" data-go="${v.goUpd}">${$t('Semua pembaruan','All updates')} ${IC.chev}</button></div>
  ${(()=>{const must=v.up.ann.filter(a=>a.must&&!a.read);return must.length?`<div class="okline warn">${IC.info}<span><b>${$t(`${must.length} pengumuman wajib dibaca`,`${must.length} must-read announcement${must.length>1?'s':''}`)}</b><small>${E(must[0].t)}</small></span></div>`:`<div class="okline">${IC.check}<span><b>${$t('Tidak ada pengumuman wajib baca','No must-read announcements')}</b><small>${v.up.maint[0]?E($t('Pemeliharaan','Maintenance')+` ${dl(v.up.maint[0].at)} · ${U.hm(v.up.maint[0].at.slice(11,16))}`):$t('Semua pengumuman sudah dibaca','All announcements read')}</small></span></div>`;})()}
  ${v.locNeed?`<div class="dr" data-go="${v.goLoc}" tabindex="0"><span class="ty">${IC.info}</span><div class="dm"><div class="t1">${$t('Lengkapi data lokasi label','Complete your label location')} ${chip($t('Profil label','Label profile'),'c-or')}</div><div class="t2">${E(v.locTxt||$t('Akun tetap aktif','Your account stays active'))}</div></div></div>`:''}
  <div class="news">${[...v.up.ann.slice(0,2).map(a=>[a.t,a.b]),...v.up.feat.slice(0,Math.max(0,3-Math.min(2,v.up.ann.length))).map(f=>[f.g||$t('Pembaruan','Updates'),f.t])].map(([t,d])=>`<button class="nw" data-go="${v.goUpd}"><b>${E(t)}</b><small>${E(cut(d,150))}</small></button>`).join('')}</div></section></div>`;}

/* ================= gambar ================= */
function page(v){return v.mode==='sa'?viewSA(v):v.mode==='staf'?viewStaf(v):viewLabel(v);}
function reveal(){const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -40px 0px'}):null;
 root.querySelectorAll('#view .rv:not(.in)').forEach((el,i)=>{const k=V.mode+':'+i;if(S.seen.has(k)){el.classList.add('in','still');return;}S.seen.add(k);io?io.observe(el):el.classList.add('in');});}
function paint(){const v=view();if(v.mode==='sa')v.people=safe(()=>model114().users.filter(u=>u.status==='active').map(u=>({id:u.id,name:u.name})),[]);const html=page(v);if(html===lastHtml&&$('view').firstElementChild)return;lastHtml=html;$('view').innerHTML=html;reveal();drawGrow();}
function redec(){const d=$('dec');if(!d)return;d.innerHTML=decCard(V);}
/* ================= tindakan ================= */
function itemOf(k){const [src,...r]=k.split(':'),id=r.join(':');return [...(V.late||[]),...(V.mine||[]),...(V.take||[])].find(x=>x.src===src&&x.id===id)||{src,id};}
function bump(msg){REV++;lastHtml='';VK='';render();if(msg)toast(msg);}
function assign(k,p){const x=itemOf(k);try{
 if(x.src==='release'){if(!assignRelease137(x.id,p))throw Error($t('Petugas sama','Same assignee'));}
 else if(x.src==='ticket'){const t=Tickets112.init(ten).tickets.find(y=>y.id===x.id);run112('assign',{id:x.id,version:t?.version,handler:p,note:$t(`Ditugaskan ke ${pname(p)} oleh Super Admin dari Dashboard.`,`Assigned to ${pname(p)} by a Super Admin from the Dashboard.`)});}
 else if(x.src==='task'){const t=(data.tasks||[]).find(y=>y.id===x.id);if(!t)throw Error($t('Pekerjaan tidak ditemukan','Task not found'));t.handler=p;save10();}
 else if(x.src==='service'){const fn=()=>act111('assign',{id:x.id,version:Addons111.init(ten).orders.find(y=>y.id===x.id)?.version,handler:p});typeof atomic10==='function'?atomic10(fn):fn();save10();}
 else{goTo(x.go);return;}
 S.pick=null;bump($t(`${x.id} ditugaskan ke ${p===state.user?'kamu':pname(p)} · tercatat di ${x.menu}`,`${x.id} assigned to ${p===state.user?'you':pname(p)} · recorded in ${x.menu}`));}catch(err){toast(String(err?.message||err));}}
/* pengingat = catatan internal yang menyebut namanya; disimpan dua bahasa supaya tampil sesuai bahasa penerima */
function nudge(k){const x=itemOf(k),who=x.who;if(!who)return;const first=pname(who).split(' ')[0];
 const id=`@${first} pengingat: ${x.id} · ${x.t} sudah lewat tenggat${x.late?` ${x.late} hari`:''}. Mohon ditindaklanjuti di ${x.menu}.`,en=`@${first} reminder: ${x.id} · ${x.t} is overdue${x.late?` by ${nd(x.late)}`:''}. Please follow up in ${x.menu}.`;
 (data.chats.internal||(data.chats.internal=[])).push({who:state.user,text:[id,en],at:$t('baru saja','just now'),ts:ten.now,ref137:x.id});bump($t(`Pengingat terkirim ke ${pname(who)} · tampil di Kotak Masuk-nya`,`Reminder sent to ${pname(who)} · it shows in their Inbox`));}
function take(k){const x=itemOf(k),me_=state.user;try{
 if(x.src==='release'){if(!assignRelease137(x.id,me_))throw Error($t('Sudah ada petugas','Already assigned'));}
 else if(x.src==='ticket'){const t=Tickets112.init(ten).tickets.find(y=>y.id===x.id);run112('claim',{id:x.id,version:t?.version});}
 else if(x.src==='service'){const fn=()=>act111('claim',{id:x.id,version:Addons111.init(ten).orders.find(y=>y.id===x.id)?.version});typeof atomic10==='function'?atomic10(fn):fn();save10();}
 else{goTo(x.go);return;}
 bump($t(`Kamu sekarang petugas ${x.id} · tercatat di ${x.menu}`,`You are now the assignee for ${x.id} · recorded in ${x.menu}`));}catch(err){toast(String(err?.message||err));}}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.more=false;S.pick=null;redec();return;}
  if(t.closest('[data-more]')){S.more=!S.more;redec();return;}
  const lt=t.closest('[data-late]');if(lt){const [k,a]=lt.dataset.late.split('|');if(a==='assign'){S.pick=k;redec();return;}if(a==='remind'){nudge(k);return;}goTo(itemOf(k).go);return;}
  const as=t.closest('[data-assign]');if(as){const [k,p]=as.dataset.assign.split('|');assign(k,p);return;}
  const tk=t.closest('[data-take]');if(tk){take(tk.dataset.take);return;}
  const gr=t.closest('[data-growth]');if(gr){S.growth=gr.dataset.growth;drawGrow();return;}
  if(t.closest('[data-waitall]')){S.waitAll=!S.waitAll;lastHtml='';paint();return;}
  if(t.closest('[data-att]')){try{timeCorrectionForm(me().id);}catch(err){toast($t('Buka Absensi di mode Staf','Open Attendance in Staff mode'));}return;}
  const nv=t.closest('[data-nav]');if(nv){if(!go137(nv.dataset.nav))toast($t('Menu belum tersedia','Menu not available'));return;}
  const g=t.closest('[data-go]');if(g){goTo(+g.dataset.go);return;}});
 root.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches?.('.dr[tabindex]')){e.target.click();}});
 /* keterangan batang kewajiban */
 const tip=document.createElement('div');tip.className='ftip';root.append(tip);
 const show=el=>{const r=el.getBoundingClientRect();tip.textContent=el.dataset.tip;tip.classList.add('on');const w=tip.offsetWidth;tip.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+'px';tip.style.top=(r.top-tip.offsetHeight-8)+'px';};
 root.addEventListener('mouseover',e=>{const t=e.target.closest('[data-tip]');t?show(t):tip.classList.remove('on');});
 root.addEventListener('focusin',e=>{const t=e.target.closest('[data-tip]');t?show(t):tip.classList.remove('on');});
 addEventListener('scroll',()=>tip.classList.remove('on'),{passive:true});}
const DEF={id:'dashboard',css:STYLE,html:HTML,
 when:()=>on(),
 init(r){root=r;bind();},
 draw(){paint();},
 view:()=>V};
page137(DEF);
/* isi dashboard lama tidak lagi digambar saat halaman baru aktif (lebih ringan) */
if(typeof dashboard==='function'){const db=dashboard;dashboard=function(){if(DEF.when())return '';return db.apply(this,arguments);};}
})();
