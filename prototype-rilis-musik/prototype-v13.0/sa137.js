/* v1.1.0-dev.40 — Staff & Akses dirancang ulang (rancangan disetujui 22 Okt 2026, mock sa1).
   Tab Tim (orang: Akses · Pekerjaan aktif · Kinerja · Kehadiran · Riwayat akses · Akun) · Peran & Izin (Super Admin tetap;
   peran staf dengan matriks Lihat · Kerjakan · Putuskan per menu, keputusan khusus Super Admin terkunci, izin sensitif,
   "Belum ditinjau" + Tandai sudah ditinjau). Ubah akses, ubah peran, undang, nonaktifkan & aktifkan kembali memakai
   Staff114 lewat atomic114 (asli) dengan pengalihan pekerjaan per orang. Hanya Super Admin. */
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
@media (max-width:820px){.shell.noside{padding:14px 16px 70px!important}.kpi{grid-template-columns:1fr}.mxh{display:none}.mxr{grid-template-columns:1fr 1fr 1fr}.mxr .mxn{grid-column:1/-1}.mxd,.lockl{grid-template-columns:1fr}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Staff &amp; Akses</h1><div class="sub">Siapa di tim, apa yang sedang dikerjakan, dan apa yang boleh dilakukan — satu tempat untuk orang dan izinnya.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,lastSig='',P=[],RO=[],JOBS=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),KEY=sv('<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>'),LOCK=sv('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),EYE=sv('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const MON=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const iniOf=n=>String(n).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(p,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(p.name)}">${E(p.ini)}</span>`;
const M=()=>model114();
const pname=id=>M().users.find(u=>u.id===id)?.name||people.find(p=>p.id===id)?.name||id||'Sistem';
const pini=id=>people.find(p=>p.id===id)?.initials||iniOf(pname(id));
const mname=id=>RM10.getMember(ten,id)?.name||id;
const S={tab:'team',pill:'all',q:'',sel:{team:null,roles:null},read:false,form:null,draft:null,exp:{},acc:null,dis:{},inv:null};
const wide=()=>innerWidth>1240;
const store=()=>{ten.staff137??={reviewed:{},hist:[]};return ten.staff137;};
/* menu baru → kelompok izin Staff114; keputusan khusus Super Admin dikunci (ditegakkan di model masing-masing) */
const ROWS=[['releases','Rilisan',['releases'],{on:['releases.approve'],label:'Setujui hasil pemeriksaan'}],['labels','Manajemen Label',['labels','claims'],{sa:'Setujui klaim, rekening & tarif'}],['tickets','Tiket Bantuan',['tickets'],{sa:'Peninjauan eskalasi'}],['services','Layanan Tambahan (+ WAMI)',['services','wami'],{sa:'Penyelesaian & pengembalian'}],['transactions','Transaksi',['transactions'],{sa:'Setujui pengembalian'}],['royalty','Royalti',['royalty'],{sa:'Terbitkan laporan, sesuaikan saldo'}],['withdraw','Penarikan',['withdraw'],{sa:'Mulai transfer & tandai dibayar'}],['team','Ringkasan Tim',['team'],{sa:'—'}]];
const SAONLY=['Kontrak Label','Pemantauan Keuangan','Staff & Akses','Pengaturan Platform','Pembaruan (terbitkan)'];
const isSens=id=>/\.(bank|export)$/.test(id);
const SENS=[['bank','Lihat rekening lengkap','Nomor rekening penuh; di tempat lain ditampilkan ••••1234.'],['export','Ekspor data','Mengunduh data identitas, transaksi, atau royalti label.']];
const CAT=()=>Staff114.catalog;
const permsOf=(groups,kind,row)=>CAT().filter(p=>groups.includes(p.group)&&(kind==='v'?p.id.endsWith('.view'):kind==='d'?(row[3].on||[]).includes(p.id):!p.id.endsWith('.view')&&!isSens(p.id)&&!(row[3].on||[]).includes(p.id))).map(p=>p.id);
const plabel=id=>{const p=CAT().find(x=>x.id===id);return p?`${p.groupLabel} · ${p.label}`:id;};
/* ---------- data asli ---------- */
const STG={submitted:'Menunggu pemeriksaan',review:'Dalam pemeriksaan',revision:'Perbaikan label',approved:'Siap dikirim',delivered:'Di Believe',followup:'Tindak lanjut Believe',handling:'Dalam penanganan',label:'Menunggu label',distributor:'Menunggu distributor',believe:'Tindak lanjut Believe',correction:'Koreksi',queued:'Antrean',working:'Dikerjakan',materials:'Lengkapi bahan',resolution:'Penyelesaian'};
const SRC={release:'Rilisan',ticket:'Tiket',task:'Pekerjaan',service:'Layanan',wami:'WAMI',transaction:'Transaksi',operation:'Keputusan'};
function load(){const s=M();let J=[];try{J=jobs114();}catch(err){}JOBS=J.filter(j=>!j.closed);
 const title=j=>{const t=String(j.title||j.id);return t.split(' / ')[0];};
 P=s.users.map(u=>{const pp=people.find(x=>x.id===u.id)||{},jobs=JOBS.filter(j=>j.handler===u.id).map(j=>({...j,label:title(j),where:`${SRC[j.source]||j.source} · ${STG[j.stage]||j.stage||''}`}));let pf={total:0,on:0,corrections:0};try{pf=perf(u.id,state.period)||pf;}catch(err){}
  const tr=(data.timeRecords||{})[u.id+':'+day()]||null;
  const hist=s.audit.filter(a=>a.target===u.id||(a.staffTargets||[]).includes(u.id)).map(a=>[iso(a.at),(typeof events114==='object'&&events114[a.kind]||a.kind)+(a.note?' · '+a.note:''),a.actor]);
  return {id:u.id,u,ini:pp.initials||iniOf(u.name),name:u.name,email:u.email||'',sa:!!u.super,role:u.role,scope:u.scope,labels:u.labels||[],status:u.status==='invited'&&u.invite?.status==='revoked'?'revoked':u.status,joined:u.joined||'',self:u.id===state.user,jobs,perf:[pf.total||0,pf.on||0,pf.corrections||0],tr,hist};});
 RO=s.roles.filter(r=>!r.archived).map(r=>{const rv=store().reviewed[r.id];return {id:r.id,r,name:r.name,perms:new Set(r.permissions),reviewed:!!rv&&rv.version===r.version,rv,users:s.users.filter(u=>u.role===r.id&&!u.super)};});}
const roleOf=p=>p.status==='invited'?['Menunggu aktivasi','c-or']:p.status==='revoked'?['Undangan dicabut','']:p.status!=='active'?['Nonaktif','']:p.sa?['Super Admin','c-bl']:['Staf · '+(RO.find(r=>r.id===p.role)?.name||p.role),''];
const pct=p=>p.perf[0]?Math.round(p.perf[1]/p.perf[0]*100):0;
const activeSA=()=>P.filter(p=>p.sa&&p.status==='active');
const sensOn=()=>RO.reduce((n,r)=>n+SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length,0);
function items(){if(S.tab==='team'){let r=P.filter(p=>!S.q||[p.name,p.email].join(' ').toLowerCase().includes(S.q));const f={sa:p=>p.sa&&p.status==='active',staf:p=>!p.sa&&p.status==='active',inv:p=>p.status==='invited',off:p=>!['active','invited'].includes(p.status)}[S.pill];if(f)r=r.filter(f);return r;}return [{id:'sa'},...RO.map(r=>({id:r.id}))];}
function tabs(){$('tabs').innerHTML=[['team','Tim',P.filter(p=>p.status!=='inactive').length],['roles','Peran & Izin',RO.length+1]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
const monthName=()=>{const [y,m]=String(state.period||'').split('-').map(Number);return m?`${MON[m-1]} ${y}`:'';};
function band(){const act=P.filter(p=>p.status==='active'),jobs=act.reduce((n,p)=>n+p.jobs.length,0),st=act.filter(p=>!p.sa),tw=st.reduce((n,p)=>n+p.perf[1],0),tt=st.reduce((n,p)=>n+p.perf[0],0),present=st.filter(p=>p.tr?.in).length,unrev=RO.filter(r=>!r.reviewed&&r.users.length).length,inv=P.filter(p=>p.status==='invited').length,sens=sensOn();
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Tim hari ini · ${E(U.todayLabel())}</div><h2>${act.length} orang aktif · ${jobs} pekerjaan berjalan</h2>
  <p>Kehadiran staf hari ini ${present}/${st.length} tercatat · ${unrev?`${unrev} peran belum ditinjau`:'semua peran sudah ditinjau'} · ${sens?`${sens} izin sensitif aktif pada peran staf`:'tidak ada izin sensitif aktif'}${inv?` · ${inv} undangan menunggu aktivasi`:''}</p>
  <div class="acts"><button class="wbtn" data-invite>Undang staf ${ARROW}</button>${unrev?`<button class="gbtn" data-review>Tinjau peran ${E(RO.find(r=>!r.reviewed&&r.users.length).name)}</button>`:''}</div></div>
  <div class="statg"><div class="sbox"><b class="n">${tt?Math.round(tw/tt*100):0}%</b><span>tepat waktu · staf, ${E(monthName())}</span></div><div class="sbox"><b class="n">${sens}</b><span>izin sensitif aktif</span></div></div></div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari nama atau email" value="${E(S.q)}"></label>`;
function list(){let h='';
 if(S.tab==='team'){const r=items(),cnt=k=>({all:P.length,sa:P.filter(p=>p.sa&&p.status==='active').length,staf:P.filter(p=>!p.sa&&p.status==='active').length,inv:P.filter(p=>p.status==='invited').length,off:P.filter(p=>!['active','invited'].includes(p.status)).length})[k];
  h+=`<div class="ch"><h3>Tim <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all','Semua'],['sa','Super Admin'],['staf','Staf'],['inv','Menunggu aktivasi'],['off','Nonaktif']].filter(([k])=>['all','sa','staf'].includes(k)||cnt(k)).map(([k,t])=>`<button data-pill="${k}" aria-pressed="${S.pill===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  r.forEach((p,i)=>{const ro=roleOf(p);h+=`<div class="it${S.sel.team===p.id&&S.form!=='invite'?' sel':''}" data-id="${E(p.id)}" style="--i:${i}">${lav(p)}<div style="min-width:0"><div class="t1">${E(p.name)}${p.self?' <span class="mono">kamu</span>':''} ${chip(...ro)}</div><div class="t2">${E(p.email)}${p.status==='invited'?' · diundang':p.joined?' · bergabung '+fd(p.joined):''}${p.scope!=='all'&&!p.sa?' · '+p.labels.length+' label':''}</div></div><div class="rgt">${p.status==='active'?`<span class="amt n">${p.jobs.length}</span><span class="duet">pekerjaan</span>`:''}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>Tidak ada</b>Coba kata lain.</div>`;}
 else{h+=`<div class="ch"><h3>Peran &amp; Izin</h3></div>
  <div class="it${S.sel.roles==='sa'?' sel':''}" data-id="sa" style="--i:0"><span class="ty">${LOCK}</span><div style="min-width:0"><div class="t1">Super Admin ${chip('Tetap','c-bl')}</div><div class="t2">${activeSA().length} orang · semua izin & keputusan · tidak bisa diubah</div></div></div>
  ${RO.map((r,i)=>`<div class="it${S.sel.roles===r.id?' sel':''}" data-id="${E(r.id)}" style="--i:${i+1}"><span class="ty">${KEY}</span><div style="min-width:0"><div class="t1">${E(r.name)} ${r.reviewed?chip('Ditinjau','c-gr'):chip('Belum ditinjau','c-or')}</div><div class="t2">${r.users.filter(u=>u.status==='active').length} staf · ${r.perms.size} izin · ${SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length} sensitif</div></div></div>`).join('')}`;}
 $('list').innerHTML=h;}
/* ---------- pengalihan pekerjaan (dipakai ubah akses, ubah peran, nonaktifkan) ---------- */
function targetsFor(job,exclude,futureRole){const s=M();return s.users.filter(u=>u.status==='active'&&u.id!==exclude&&u.id!==job.handler&&(u.super||Staff114.can(s,u.id,job.permission,job.member))&&(!futureRole||u.super||u.role!==futureRole.id||futureRole.permissions.includes(job.permission)));}
function handover(jobs,exclude,futureRole){if(!jobs.length)return '';return `<div class="ledger">${jobs.map(j=>{const ts=targetsFor(j,exclude,futureRole),cur=S.dis[j.key]||ts[0]?.id||'';if(!S.dis[j.key]&&cur)S.dis[j.key]=cur;return `<div class="ho"><span>${E(String(j.title||j.id).split(' / ')[0])}<small>${E(SRC[j.source]||j.source)} · ${E(STG[j.stage]||j.stage||'')} · <span class="mono">${E(j.id)}</span></small></span><div class="seg2">${ts.map(o=>`<button data-ho="${E(j.key)}|${E(o.id)}" aria-pressed="${cur===o.id}" title="${E(o.name)}">${E(pini(o.id))}</button>`).join('')||'<span class="where">tidak ada pengganti</span>'}</div></div>`;}).join('')}</div>`;}
const transfers=jobs=>Object.fromEntries(jobs.map(j=>[j.key,S.dis[j.key]||null]).filter(([,v])=>v));
/* ---------- rincian orang ---------- */
const labelOpts=()=>ten.members.filter(m=>m.active).map(m=>[m.id,m.name]);
function accessImpact(p){const a=S.acc,r=RO.find(x=>x.id===a.role);if(!r)return [];try{return Staff114.impact(M(),p.u,{permissions:[...r.perms],scope:a.scope,labels:a.labels},JOBS);}catch(err){return [];}}
function accessForm(p){const a=S.acc,out=accessImpact(p),r=RO.find(x=>x.id===a.role);
 return `<div class="reveal nextc"><div class="fld">Peran<div class="opts two">${RO.map(x=>`<button data-arole="${E(x.id)}" aria-pressed="${a.role===x.id}">Staf · ${E(x.name)}<small>${x.perms.size} izin</small></button>`).join('')}</div></div>
  <div class="fld">Cakupan label<div class="seg2">${[['all','Seluruh label'],['selected','Label tertentu']].map(([v,t])=>`<button data-ascope="${v}" aria-pressed="${a.scope===v}">${t}</button>`).join('')}</div>${a.scope==='selected'?`<div class="pills" style="margin-top:6px">${labelOpts().map(([id,n])=>`<button data-alab="${E(id)}" aria-pressed="${a.labels.includes(id)}">${E(n)}</button>`).join('')}</div>`:''}</div>
  <div class="impact2"><b>Dampak bila disimpan</b><ul>${a.scope==='selected'?`<li>Hanya melihat ${a.labels.length} label.</li>`:''}${r&&r.id!==p.role?`<li>Izin mengikuti peran ${E(r.name)} (${r.perms.size} izin).</li>`:''}${out.length?`<li class="w">${out.length} pekerjaan di luar akses baru perlu dialihkan.</li>`:''}${!out.length&&a.scope===p.scope&&a.role===p.role&&a.labels.join()===p.labels.join()?'<li>Tidak ada perubahan izin.</li>':''}</ul></div>
  ${handover(out,p.id)}<label class="fld">Alasan · tercatat di riwayat akses<input id="f-note" placeholder="Mis. fokus menangani label Utara Music"></label>
  <div class="hrow">${btn('Simpan perubahan','data-do="acc-save"','pri',a.scope==='selected'&&!a.labels.length)}${btn('Batal','data-form=""')}</div></div>`;}
function disableForm(p){return `<div class="reveal nextc"><p>Nonaktifkan <b>${E(p.name)}</b>. Pekerjaan aktifnya dialihkan dulu, supaya tahap dan tenggatnya tidak hilang.</p>${p.jobs.length?handover(p.jobs,p.id):'<p class="where">Tidak ada pekerjaan aktif.</p>'}<label class="fld">Alasan · tercatat di riwayat akses<input id="f-note" placeholder="Mis. kontrak kerja berakhir"></label><div class="hrow">${btn(p.jobs.length?'Alihkan & nonaktifkan':'Nonaktifkan','data-do="disable"','pri dng')}${btn('Batal','data-form=""')}</div></div>`;}
function attendance(p){if(p.sa)return '<div class="lg"><span>Tidak diwajibkan<small>Super Admin tidak dinilai kehadirannya</small></span></div>';const t=p.tr;return t?.in?`<div class="lg"><span>Masuk ${E(t.in)}${t.out?' · pulang '+E(t.out):' · belum pulang'}<small>dicatat sendiri di mode Staff</small></span></div>`:'<div class="lg"><span>Belum tercatat<small>absensi dicatat sendiri di mode Staff</small></span></div>';}
function panePerson(p){let i=0;const ro=roleOf(p),rev=p.status==='revoked',inv=p.status==='invited'||rev,off=!['active','invited','revoked'].includes(p.status),r=RO.find(x=>x.id===p.role);
 const accessLine=p.sa?'Semua izin & keputusan':`${E(r?.name||p.role)} · ${r?.perms.size||0} izin`;
 return `<div class="hd"><button class="back" data-back>${BACK}Tim</button><div class="relhd">${lav(p,1)}<div style="min-width:0"><div class="k">${E(p.email)}</div><h2>${E(p.name)}</h2><div class="meta">${chip(...ro)}<span class="sep"></span>${p.sa||p.scope==='all'?'Seluruh label':p.labels.length+' label'}${!p.sa&&p.status==='active'?`<span class="sep"></span><button class="lnk" data-preview="${E(p.id)}">${EYE} Pratinjau akses</button>`:''}</div></div></div></div>
 <div class="pb">${rev?sec(i++,'Undangan',`<div class="nextc mute"><p>Undangan dicabut; tautan aktivasi lama tidak berlaku.</p><div class="hrow">${btn('Kirim ulang undangan','data-do="resend"')}</div></div>`):''}${inv&&!rev?sec(i++,'Undangan',`<div class="nextc"><p>Undangan sudah dibuat. Akses baru aktif setelah ${E(p.name)} menyelesaikan aktivasi.</p><div class="hrow">${btn('Kirim ulang','data-do="resend"')}${btn('Cabut undangan','data-do="revoke"','ghost dng')}</div></div>`):''}
 ${sec(i++,'Akses',S.form==='acc'?accessForm(p):`<div class="facts"><span>Peran</span><b>${p.sa?'Super Admin':'Staf · '+E(r?.name||p.role)}</b><span>Izin</span><b>${accessLine}${!p.sa&&r?` · <button class="lnk" data-gorole="${E(r.id)}">lihat matriks</button>`:''}</b><span>Cakupan</span><b>${p.sa||p.scope==='all'?'Seluruh label':E(p.labels.map(mname).join(', '))}</b></div>${!inv&&!off?`<div class="hrow" style="margin-top:10px">${p.self?'<span class="where">Akses sendiri diubah oleh Super Admin lain.</span>':p.sa?'<span class="where">Peran Super Admin tetap; tidak diubah dari sini.</span>':btn('Ubah akses','data-form="acc"')}</div>`:''}`)}
 ${!inv?sec(i++,'Pekerjaan aktif',p.jobs.length?`<div class="ledger">${p.jobs.map(j=>`<button class="lg jl" data-job="${E(j.key)}"><span>${E(j.label)}<small>${E(j.where)} · <span class="mono">${E(j.id)}</span></small></span>${ARROW}</button>`).join('')}</div>`:'<p class="where">Tidak ada pekerjaan aktif.</p>',p.jobs.length+' berjalan'):''}
 ${!inv?sec(i++,`Kinerja ${E(monthName())}`,p.perf[0]?`<div class="kpi"><div class="ring" style="--p:${pct(p)}"><b class="n">${pct(p)}%</b><small>tepat waktu</small></div><div class="facts"><span>Tahap selesai</span><b class="n">${p.perf[0]}</b><span>Tepat waktu</span><b class="n">${p.perf[1]}</b><span>Perlu koreksi internal</span><b class="n">${p.perf[2]}</b></div></div>${p.sa?'<p class="where">Super Admin tercatat, tidak dinilai.</p>':''}`:'<p class="where">Belum ada tahap selesai pada bulan ini.</p>'):''}
 ${!inv?sec(i++,'Kehadiran hari ini',attendance(p)):''}
 ${sec(i++,'Riwayat akses',p.hist.length?`<div class="hist">${p.hist.slice(0,12).map(([t,x,w])=>`<div><span class="mini">${E(pini(w))}</span><span>${E(x)}<small style="display:block">${E(pname(w))} · ${fd(t)}</small></span></div>`).join('')}</div>`:'<p class="where">Belum ada perubahan sejak akun dibuat.</p>')}
 ${!inv&&!off?sec(i++,'Akun',S.form==='dis'?disableForm(p):p.self?'<p class="where">Kamu tidak bisa menonaktifkan akunmu sendiri.</p>':p.sa&&activeSA().length<=1?'<p class="where">Super Admin terakhir tidak bisa dinonaktifkan.</p>':`<div class="hrow">${btn('Nonaktifkan akun','data-form="dis"','ghost dng')}</div>`):''}
 ${off?sec(i++,'Akun',`<div class="nextc mute"><p>Nonaktif. Pekerjaannya sudah dialihkan.</p><label class="fld">Alasan · tercatat di riwayat akses<input id="f-note" placeholder="Mis. kembali bekerja"></label><div class="hrow">${btn('Aktifkan kembali','data-do="reactivate"')}</div><p class="where">Akses lama ditinjau ulang: peran ${E(r?.name||'staf')}, cakupan ${p.scope==='all'?'seluruh label':p.labels.length+' label'}.</p></div>`):''}</div>`;}
function paneInvite(){const f=S.inv;return `<div class="hd"><button class="back" data-back>${BACK}Tim</button><div class="k"><span class="ty">${KEY}</span>Undangan baru</div><h2>Undang staf</h2></div>
 <div class="pb">${sec(0,'Data',`<div class="f2"><label class="fld">Nama<input id="i-name" value="${E(f.name)}" placeholder="Nama lengkap"></label><label class="fld">Email<input id="i-email" value="${E(f.email)}" placeholder="nama@contoh.test"></label></div>`)}
 ${sec(1,'Peran & cakupan',`<div class="opts two">${RO.map(x=>`<button data-irole="${E(x.id)}" aria-pressed="${f.role===x.id}">Staf · ${E(x.name)}<small>${x.perms.size} izin</small></button>`).join('')}<button disabled>Super Admin<small>tidak lewat undangan</small></button></div><div class="seg2" style="margin-top:10px">${[['all','Seluruh label'],['selected','Label tertentu']].map(([v,t])=>`<button data-iscope="${v}" aria-pressed="${f.scope===v}">${t}</button>`).join('')}</div>${f.scope==='selected'?`<div class="pills" style="margin-top:6px">${labelOpts().map(([id,n])=>`<button data-ilab="${E(id)}" aria-pressed="${f.labels.includes(id)}">${E(n)}</button>`).join('')}</div>`:''}`)}
 ${sec(2,'Kirim',`<p class="where">Undangan tidak membuat akses aktif sebelum penerima menyelesaikan aktivasi. Email yang sudah terdaftar diarahkan ke akun yang ada.</p><div class="hrow">${btn('Kirim undangan','data-do="invite"','pri')}${btn('Batal','data-back')}</div>`)}</div>`;}
/* ---------- rincian peran ---------- */
function cell(row,col,draft){const perms=permsOf(row[2],col,row);if(col==='d'&&row[3].sa)return `<span class="cell lock">${LOCK}<small>${E(row[3].sa)}</small></span>`;if(!perms.length)return `<span class="cell none">—</span>`;
 const on=perms.filter(x=>draft.has(x)).length;return `<button class="cell ${on===perms.length?'on':on?'part':'off'}" data-cell="${row[0]}|${col}">${on===perms.length?'✓':on?on+'/'+perms.length:'—'}${col==='d'?`<small>${E(row[3].label)}</small>`:''}</button>`;}
function roleImpact(r,draft){const s=M(),perms=[...draft];return r.users.filter(u=>u.status==='active').flatMap(u=>{try{return Staff114.impact(s,u,{permissions:perms},JOBS);}catch(err){return [];}});}
function paneRole(id){let i=0;
 if(id==='sa')return `<div class="hd"><button class="back" data-back>${BACK}Peran</button><div class="k"><span class="ty">${LOCK}</span>Peran tetap</div><h2>Super Admin</h2><div class="meta">${chip('Tetap','c-bl')}<span class="sep"></span>${activeSA().map(p=>E(p.name)).join(' · ')}</div></div>
 <div class="pb">${sec(0,'Aturan',`<div class="checks"><div class="ck"><b>✓</b>Semua izin dan semua keputusan 🔒</div><div class="ck"><b>✓</b>Peran Super Admin tidak diberikan lewat undangan atau peran staf</div><div class="ck"><b>✓</b>Super Admin terakhir tidak bisa dinonaktifkan</div><div class="ck"><b>✓</b>Tidak bisa mengubah atau menonaktifkan akun sendiri</div></div>`)}
 ${sec(1,'Keputusan khusus Super Admin',`<div class="lockl">${ROWS.filter(m=>m[3].sa&&m[3].sa!=='—').map(m=>`<div>${LOCK}<span>${E(m[1])}<small>${E(m[3].sa)}</small></span></div>`).join('')}${SAONLY.map(n=>`<div>${LOCK}<span>${E(n)}<small>seluruh menu</small></span></div>`).join('')}</div>`)}</div>`;
 const r=RO.find(x=>x.id===id);if(!r)return '';if(!S.draft||S.draft.role!==r.id)S.draft={role:r.id,set:new Set(r.perms)};const d=S.draft.set,add=[...d].filter(x=>!r.perms.has(x)),rem=[...r.perms].filter(x=>!d.has(x)),dirty=add.length+rem.length;
 let next='';if(dirty){const needWhy=add.some(isSens),hit=roleImpact(r,d),names=r.users.filter(u=>u.status==='active').map(u=>u.name).join(', ')||'belum ada staf';next=`<div class="nextc"><p><b>Tinjau perubahan</b> · berlaku untuk ${E(names)}.</p><div class="chg2">${add.map(x=>`<div><span class="chip c-gr"><i></i>Tambah</span>${E(plabel(x))}</div>`).join('')}${rem.map(x=>`<div><span class="chip c-red"><i></i>Cabut</span>${E(plabel(x))}</div>`).join('')}</div>${hit.length?`<p class="where" style="margin-top:8px">${hit.length} pekerjaan tidak lagi bisa ditangani pemegangnya · pilih pengganti:</p>${handover(hit,null,{id:r.id,permissions:[...d]})}`:''}<label class="fld">${needWhy?'Alasan menyalakan izin sensitif · wajib':'Alasan · tercatat di riwayat'}<input id="f-why" placeholder="${needWhy?'Mis. staf keuangan perlu mencocokkan rekening':'Mis. staf tidak menangani klaim lagi'}"></label><div class="hrow">${btn('Simpan perubahan','data-do="role-save"','pri')}${btn('Batalkan','data-do="role-reset"')}</div></div>`;}
 else if(!r.reviewed)next=`<div class="nextc"><p>Peran ini dibawa dari pengaturan lama dan <b>belum ditinjau</b> sejak versi ${r.r.version}. Periksa matriks dan izin sensitif di bawah, lalu tandai sudah ditinjau.</p><div class="hrow">${btn('Tandai sudah ditinjau','data-do="role-reviewed"','pri')}</div></div>`;
 else next=`<div class="nextc ok"><p>Ditinjau ${fd(iso(r.rv.at))} oleh ${E(pname(r.rv.by))} · versi ${r.r.version}.</p></div>`;
 const hist=[...M().audit.filter(a=>a.target===r.id).map(a=>[iso(a.at),(events114?.[a.kind]||a.kind)+(a.note?' · '+a.note:''),a.actor]),...store().hist.filter(h=>h.role===r.id).map(h=>[iso(h.at),h.text,h.by])].sort((a,b)=>b[0].localeCompare(a[0]));
 return `<div class="hd"><button class="back" data-back>${BACK}Peran</button><div class="k"><span class="ty">${KEY}</span>Peran staf</div><h2>${E(r.name)}</h2><div class="meta">${r.reviewed?chip('Ditinjau','c-gr'):chip('Belum ditinjau','c-or')}<span class="sep"></span>${r.perms.size} izin<span class="sep"></span>${E(r.users.map(u=>u.name).join(', ')||'belum ada staf')}</div></div>
 <div class="pb">${sec(i++,dirty?'Perubahan belum disimpan':'Langkah berikutnya',next)}
 ${sec(i++,'Matriks izin',`<div class="mx"><div class="mxh"><span>Menu</span><span>Lihat</span><span>Kerjakan</span><span>Putuskan</span></div>${ROWS.map(m=>{const all=[...permsOf(m[2],'v',m),...permsOf(m[2],'w',m),...permsOf(m[2],'d',m)];return `<div class="mxr"><button class="mxn" data-exp="${m[0]}">${E(m[1])}<small>${S.exp[m[0]]?'tutup rincian':'rincian izin'}</small></button>${cell(m,'v',d)}${cell(m,'w',d)}${cell(m,'d',d)}</div>${S.exp[m[0]]?`<div class="mxd">${all.map(x=>`<label class="tg"><input type="checkbox" data-perm="${x}" ${d.has(x)?'checked':''}> ${E(plabel(x))}</label>`).join('')}</div>`:''}`;}).join('')}<div class="mxr sa"><span class="mxn">Kontrak, Pemantauan Keuangan, Staff &amp; Akses, Pengaturan, Pembaruan</span><span class="cell lock" style="grid-column:span 3">${LOCK}<small>Hanya Super Admin</small></span></div></div><p class="where">Klik sel untuk menyalakan/mematikan semua izin di kolom itu; buka "rincian izin" untuk mengatur satu per satu. Izin "Kerjakan" otomatis menyalakan "Lihat".</p>`)}
 ${sec(i++,'Izin sensitif',`<div class="sens">${SENS.map(([k,t,m])=>{const ids=CAT().filter(p=>p.id.endsWith('.'+k)).map(p=>p.id),on=ids.filter(x=>d.has(x)).length;return `<div class="sr"><span><b>${E(t)}</b> ${chip('Sensitif','c-red')}<small>${E(m)} ${on?`· menyala di ${on} dari ${ids.length} menu`:''}</small></span><button class="sw ${on?'on':''}" data-sens="${k}" aria-label="${E(t)}"><i></i></button></div>`;}).join('')}</div><p class="where">Usulan: matikan untuk staf. Menyalakan kembali wajib disertai alasan.</p>`)}
 ${sec(i++,'Riwayat perubahan',hist.length?`<div class="hist">${hist.slice(0,12).map(([t,x,w])=>`<div><span class="mini">${E(pini(w))}</span><span>${E(x)}<small style="display:block">${E(pname(w))} · ${fd(t)}</small></span></div>`).join('')}</div>`:'<p class="where">Dibawa dari pengaturan lama (migrasi); belum ada perubahan.</p>')}</div>`;}
let lastPane='';
function pane(){let h='';if(S.tab==='team'){if(S.form==='invite')h=paneInvite();else{const p=P.find(x=>x.id===S.sel.team&&items().includes(x));h=p?panePerson(p):'';}}else h=paneRole(S.sel.roles);$('pin').innerHTML=h||`<div class="empty" style="padding:60px 20px"><b>Pilih orang</b>Rinciannya tampil di sini.</div>`;
 const key=S.tab+S.sel[S.tab]+(S.form==='invite'),p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input:not([type=checkbox])').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(S.tab==='team'&&wide()&&S.form!=='invite'&&(!S.sel.team||!r.some(z=>z.id===S.sel.team)))S.sel.team=r[0]?.id;if(S.tab==='roles'&&(!S.sel.roles||!r.some(z=>z.id===S.sel.roles)))S.sel.roles=RO.find(x=>!x.reviewed)?.id||RO[0]?.id||'sa';tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&S.read);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(t){toast137(DEF,t);}
const val=id=>($(id)?.value||'').trim();
function open(tab,id){S.tab=tab;S.sel[tab]=id;S.form=null;S.read=true;S.dis={};if(tab==='roles')S.draft=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
function setCol(row,col,on){const d=S.draft.set,perms=permsOf(row[2],col,row);perms.forEach(x=>on?d.add(x):d.delete(x));if(on&&col!=='v')permsOf(row[2],'v',row).forEach(x=>d.add(x));if(!on&&col==='v')[...permsOf(row[2],'w',row),...permsOf(row[2],'d',row),...CAT().filter(p=>row[2].includes(p.group)&&isSens(p.id)).map(p=>p.id)].forEach(x=>d.delete(x));}
function act(a){const p=P.find(x=>x.id===S.sel.team);let msg='',res=null;
 try{
 if(a==='acc-save'){const A=S.acc,why=val('f-note');if(!why){toast('Tulis alasan perubahan');return;}const out=accessImpact(p);res=atomic114('save-access',{user:p.id,role:A.role,scope:A.scope,labels:A.scope==='all'?[]:A.labels,version:p.u.version,note:why,transfers:transfers(out)});msg=res?.moves?.length?`Akses diperbarui · ${res.moves.length} pekerjaan dialihkan`:'Akses diperbarui · tercatat di riwayat akses';}
 else if(a==='disable'){const why=val('f-note');if(!why){toast('Alasan wajib diisi');return;}if(p.self){toast('Kamu tidak bisa menonaktifkan akunmu sendiri');return;}res=atomic114('disable',{user:p.id,version:p.u.version,note:why,transfers:transfers(p.jobs)});msg=res?.moves?.length?`${res.moves.length} pekerjaan dialihkan · akun nonaktif`:'Akun nonaktif';}
 else if(a==='reactivate'){const why=val('f-note')||'Diaktifkan kembali dari Staff & Akses';res=atomic114('reactivate',{user:p.id,version:p.u.version,note:why,role:p.sa?null:(p.role||RO[0]?.id),scope:p.scope||'all',labels:p.labels});msg='Aktif kembali';}
 else if(a==='resend'){atomic114('resend',{user:p.id,version:p.u.version});msg='Undangan dikirim ulang';}
 else if(a==='revoke'){atomic114('revoke-invite',{user:p.id,version:p.u.version});S.sel.team=state.user;msg='Undangan dicabut';}
 else if(a==='invite'){const f=S.inv,name=val('i-name'),email=val('i-email').toLowerCase();if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){toast('Isi nama dan email yang benar');return;}if(f.scope==='selected'&&!f.labels.length){toast('Pilih minimal satu label');return;}res=atomic114('invite',{name,email,role:f.role,scope:f.scope,labels:f.scope==='all'?[]:f.labels});if(res?.existing){S.form=null;S.sel.team=res.existing;lastSig='';load();paint();toast('Email sudah terdaftar · diarahkan ke akun yang ada');return;}S.sel.team=res?.id||S.sel.team;msg='Undangan dibuat · akses aktif setelah aktivasi';}
 else if(a==='role-save'){const r=RO.find(x=>x.id===S.draft.role),d=S.draft.set,add=[...d].filter(x=>!r.perms.has(x)),rem=[...r.perms].filter(x=>!d.has(x)),why=val('f-why');if(add.some(isSens)&&!why){toast('Alasan wajib untuk izin sensitif');return;}
  const note=why||`Matriks diubah (${[add.length?'+'+add.length+' izin':'',rem.length?'−'+rem.length+' izin':''].filter(Boolean).join(', ')})`;const hit=roleImpact(r,d);res=atomic114('save-role',{role:r.id,name:r.name,description:r.r.description||'',permissions:[...d],version:r.r.version,note,transfers:transfers(hit)});S.draft=null;msg=`Perubahan peran disimpan${res?.moves?.length?` · ${res.moves.length} pekerjaan dialihkan`:''} · peran perlu ditinjau ulang`;}
 else if(a==='role-reset'){S.draft=null;msg='Perubahan dibatalkan';}
 else if(a==='role-reviewed'){const r=RO.find(x=>x.id===S.sel.roles);const st=store();const f=()=>{st.reviewed[r.id]={version:r.r.version,at:ten.now,by:state.user};st.hist.push({role:r.id,text:'Ditinjau dan dinyatakan sesuai · versi '+r.r.version,at:ten.now,by:state.user});};typeof atomic10==='function'?atomic10(f):(f(),save10());msg=`Peran ${r.name} ditandai sudah ditinjau`;}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;S.dis={};lastSig='';load();paint();if(msg)toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.draft=null;paint();return;}
  const pl=t.closest('[data-pill]');if(pl){S.pill=pl.dataset.pill;paint();return;}
  if(t.closest('[data-invite]')){S.tab='team';S.form='invite';S.inv={name:'',email:'',role:RO[0]?.id,scope:'all',labels:[]};S.read=true;paint();$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(t.closest('[data-review]')){open('roles',RO.find(r=>!r.reviewed&&r.users.length)?.id||RO[0]?.id);return;}
  const gr=t.closest('[data-gorole]');if(gr){open('roles',gr.dataset.gorole);return;}
  const pv=t.closest('[data-preview]');if(pv){try{previewUser114(pv.dataset.preview);}catch(err){toast(String(err?.message||err));}return;}
  const jb=t.closest('[data-job]');if(jb){try{openJob114(jb.dataset.job);}catch(err){toast('Pekerjaan tidak tersedia');}return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;S.dis={};const p=P.find(x=>x.id===S.sel.team);if(S.form==='acc')S.acc={role:p.role||RO[0]?.id,scope:p.scope==='selected'?'selected':'all',labels:(p.labels||[]).slice()};repane();return;}
  const ar=t.closest('[data-arole]');if(ar){S.acc.role=ar.dataset.arole;S.dis={};repane();return;}
  const as=t.closest('[data-ascope]');if(as){S.acc.scope=as.dataset.ascope;S.dis={};repane();return;}
  const al=t.closest('[data-alab]');if(al){const l=al.dataset.alab,L=S.acc.labels;L.includes(l)?L.splice(L.indexOf(l),1):L.push(l);S.dis={};repane();return;}
  const ho=t.closest('[data-ho]');if(ho){const [k,id]=ho.dataset.ho.split('|');S.dis[k]=id;repane();return;}
  const ir=t.closest('[data-irole]');if(ir){S.inv.name=val('i-name');S.inv.email=val('i-email');S.inv.role=ir.dataset.irole;repane();return;}
  const is=t.closest('[data-iscope]');if(is){S.inv.name=val('i-name');S.inv.email=val('i-email');S.inv.scope=is.dataset.iscope;repane();return;}
  const il=t.closest('[data-ilab]');if(il){S.inv.name=val('i-name');S.inv.email=val('i-email');const l=il.dataset.ilab,L=S.inv.labels;L.includes(l)?L.splice(L.indexOf(l),1):L.push(l);repane();return;}
  const ce=t.closest('[data-cell]');if(ce){const [rid,col]=ce.dataset.cell.split('|'),row=ROWS.find(x=>x[0]===rid),perms=permsOf(row[2],col,row);setCol(row,col,!perms.every(x=>S.draft.set.has(x)));S.dis={};repane();return;}
  const ex=t.closest('[data-exp]');if(ex){S.exp[ex.dataset.exp]=!S.exp[ex.dataset.exp];repane();return;}
  const se=t.closest('[data-sens]');if(se){const k=se.dataset.sens,ids=CAT().filter(p=>p.id.endsWith('.'+k)).map(p=>p.id),d=S.draft.set,on=ids.some(x=>d.has(x));ids.forEach(x=>{if(on)d.delete(x);else{d.add(x);d.add(x.split('.')[0]+'.view');}});S.dis={};repane();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  if(t.closest('[data-back]')){S.read=false;S.form=null;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(S.tab,it.dataset.id);return;}
 });
 root.addEventListener('change',e=>{const pm=e.target.closest('[data-perm]');if(pm){const x=pm.dataset.perm,d=S.draft.set;pm.checked?d.add(x):d.delete(x);if(pm.checked&&!x.endsWith('.view'))d.add(x.split('.')[0]+'.view');S.dis={};repane();}});
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
const sig=()=>{const s=M();return s.revision+':'+s.users.map(u=>u.id+u.status+u.version).join(',')+':'+s.roles.map(r=>r.id+r.version).join(',')+':'+JOBS.length+JOBS.map(j=>j.handler).join('')+':'+JSON.stringify(store().reviewed)+':'+U.today()+state.user;};
const DEF={id:'staff',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.page==='access'&&(()=>{try{return super114();}catch(err){return false;}})(),
 init(r){root=r;bind();},
 draw(){if(window.saRole137){const id=window.saRole137;window.saRole137=null;S.tab='roles';S.sel.roles=id;S.read=true;S.form=null;S.draft=null;lastSig='';}load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Staff & Akses */
DEF.sum=function(){load();const act=P.filter(p=>p.status==='active'),st=act.filter(p=>!p.sa),jobs=act.reduce((n,p)=>n+p.jobs.length,0),present=st.filter(p=>p.tr?.in).length,unrev=RO.filter(r=>!r.reviewed&&r.users.length);
 return {act:act.length,jobs,present,staff:st.length,unrev:unrev.map(r=>({id:r.id,name:r.name,users:r.users.length,sens:SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length,rv:r.rv||null})),sens:sensOn(),inv:P.filter(p=>p.status==='invited').length,
  people:act.map(p=>({id:p.id,name:p.name,ini:p.ini,sa:p.sa})),line:`${act.length} aktif · ${jobs} pekerjaan berjalan · kehadiran staf ${present}/${st.length} tercatat`,tone:unrev.length?'o':'g'};};
page137(DEF);
if(typeof accessPage==='function'){const ab=accessPage;accessPage=function(){if(DEF.when())return '';return ab.apply(this,arguments);};}
})();
