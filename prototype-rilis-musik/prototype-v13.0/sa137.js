/* v1.1.0-dev.40 — Staff & Akses dirancang ulang (rancangan disetujui 22 Okt 2026, mock sa1).
   Tab Tim (orang: Akses · Pekerjaan aktif · Kehadiran · Riwayat akses · Akun; Kinerja hanya di Beranda Staf sejak dev.52) · Peran & Izin (Super Admin tetap;
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
/* v1.1.0-dev.43 — dua bahasa: teks peta berisi [id,en] dan diambil saat dipakai (L). Katalog izin Staff114, nama peran
   bawaan, nama kejadian (events114) dan pesan galat model hanya berbahasa Indonesia → padanan Inggris lokal di bawah. */
const L=x=>Array.isArray(x)?$t(x[0],x[1]):x;
const GL={'Rilisan':'Releases','Identitas Label':'Label Identity','Tiket Bantuan':'Support Tickets','Layanan Tambahan':'Add-on Services','Registrasi WAMI':'WAMI Registration','Transaksi':'Transactions','Royalti':'Royalties','Pembayaran Royalti':'Royalty Payments','Migrasi & Klaim':'Migration & Claims','Ringkasan Tim':'Team Summary'};
const PL={'Lihat daftar dan detail':'View list and details','Ambil pekerjaan':'Take work','Periksa materi':'Check materials','Minta perbaikan':'Request revision','Setujui hasil pemeriksaan':'Approve review results','Teruskan pengiriman':'Forward delivery','Catat hasil tayang':'Record live result','Alihkan penanganan':'Reassign handling','Periksa identitas':'Check identity','Buka dokumen identitas':'Open identity documents','Lihat rekening lengkap':'View full bank account','Ekspor data':'Export data','Tangani permintaan':'Handle requests','Minta kelengkapan':'Request missing details','Teruskan ke distributor':'Forward to distributor','Catat hasil':'Record result','Tangani layanan':'Handle services','Minta bahan':'Request materials','Kirim hasil':'Send result','Mulai pemeriksaan':'Start review','Siapkan pendaftaran':'Prepare registration','Catat pengiriman':'Record submission','Periksa pembayaran':'Check payments','Tangani pemeriksaan':'Handle reviews','Selesaikan pembelian':'Fulfill purchases','Ajukan pengembalian dana':'Request refunds','Impor laporan':'Import reports','Periksa laporan':'Check reports','Periksa permintaan':'Check requests','Catat pelaksanaan pembayaran':'Record payment execution','Tangani pencocokan':'Handle matching','Minta informasi':'Request information','Lihat profil kerja tim':'View team work profiles'};
const RNAME={'Operasional':'Operations','Pemantauan':'Monitoring'};
const EV114={invite:'Invitation created',resend:'Invitation resent','revoke-invite':'Invitation revoked',activate:'Account activated','save-access':'Staff access updated','save-role':'Role permissions updated','archive-role':'Role archived',disable:'Account deactivated',reactivate:'Account reactivated',handoff:'Work reassigned','review-new':'New permissions reviewed'};
const ERR={'Pengelolaan akses khusus Super Admin.':'Access management is for Super Admins only.','Pengelolaan akses khusus Super Admin aktif.':'Access management is for active Super Admins only.','Pengaturan telah berubah. Tinjau versi terbaru sebelum menyimpan.':'Settings have changed. Review the latest version before saving.','Tuliskan alasan perubahan.':'Write a reason for the change.','Pilih pengganti atau konfirmasikan daftar Perlu pengalihan.':'Choose a replacement or confirm the Needs reassignment list.','Pengganti tidak memiliki akses yang diperlukan setelah perubahan.':'The replacement will not have the required access after the change.','Pengganti tidak memiliki izin dan cakupan yang sesuai.':'The replacement lacks the required permission and scope.','Isi nama dan email yang valid.':'Enter a valid name and email.','Pilih peran aktif.':'Choose an active role.','Pilih minimal satu label.':'Select at least one label.','Akun tidak sedang menunggu aktivasi.':'The account is not awaiting activation.','Kewenangan Super Admin tidak diubah melalui peran staff.':'Super Admin authority is not changed through staff roles.','Isi nama peran.':'Enter a role name.','Nama Super Admin digunakan untuk kewenangan akun khusus.':'The Super Admin name is reserved for the special account authority.','Nama peran sudah digunakan.':'Role name already in use.','Peran telah diarsipkan.':'The role has been archived.','Peran tidak tersedia.':'Role unavailable.','Akun tidak aktif.':'The account is inactive.','Kamu tidak bisa menonaktifkan akunmu sendiri.':'You cannot deactivate your own account.','Super Admin aktif terakhir tidak dapat dinonaktifkan.':'The last active Super Admin cannot be deactivated.','Akun bukan akun nonaktif.':'The account is not inactive.','Tinjau peran aktif sebelum mengaktifkan akun.':'Review an active role before activating the account.','Pilih cakupan label.':'Choose a label scope.','Pengalihan telah berubah.':'The reassignment has changed.','Pekerjaan telah selesai atau memiliki penanggung jawab baru.':'The work is done or has a new owner.','Tindakan tidak dikenal.':'Unknown action.'};
const tg=s=>U.en()&&GL[s]||s,tp=s=>U.en()&&PL[s]||s,rn=s=>U.en()&&RNAME[s]||s,terr=s=>U.en()&&ERR[s]||s;
const ev=k=>U.en()&&EV114[k]||typeof events114==='object'&&events114[k]||k;
/* catatan otomatis yang ditulis modul ini / model (tetap bahasa Indonesia di data) diterjemahkan saat ditampilkan */
const NOTE114={'Undangan simulasi; masa berlaku produksi belum ditetapkan.':'Simulated invitation; production validity period not set yet.','Akun lama mempertahankan izin yang dapat dipetakan. Tidak ada pemindahan akun otomatis.':'Existing accounts keep the permissions that could be mapped. No accounts were moved automatically.','Simulasi penghentian akses mendesak.':'Simulated urgent access removal.','Simulasi pergantian tugas.':'Simulated duty handover.'};
const autoT=s=>{if(!s||!U.en())return s;if(NOTE114[s])return NOTE114[s];let m;if((m=/^Ditinjau dan dinyatakan sesuai · versi (\d+)$/.exec(s)))return `Reviewed and confirmed · version ${m[1]}`;
 if((m=/^Matriks diubah \((.*)\)$/.exec(s)))return `Matrix changed (${m[1].replace(/(\d+) izin/g,(x,n)=>n+(n==='1'?' permission':' permissions'))})`;if(s==='Diaktifkan kembali dari Staff & Akses')return 'Reactivated from Staff & Access';return s;};
const nLabel=n=>$t(n+' label',`${n} label${n===1?'':'s'}`),nPerm=n=>$t(`${n} izin`,`${n} permission${n===1?'':'s'}`),nJob=n=>$t(`${n} pekerjaan`,`${n} job${n===1?'':'s'}`);
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const iniOf=n=>String(n).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(p,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(p.name)}">${E(p.ini)}</span>`;
const M=()=>model114();
const pname=id=>M().users.find(u=>u.id===id)?.name||people.find(p=>p.id===id)?.name||id||$t('Sistem','System');
const pini=id=>people.find(p=>p.id===id)?.initials||iniOf(pname(id));
const mname=id=>RM10.getMember(ten,id)?.name||id;
const S={tab:'team',pill:'all',q:'',sel:{team:null,roles:null},read:false,form:null,draft:null,exp:{},acc:null,dis:{},inv:null};
const wide=()=>innerWidth>1240;
const store=()=>{ten.staff137??={reviewed:{},hist:[]};return ten.staff137;};
/* menu baru → kelompok izin Staff114; keputusan khusus Super Admin dikunci (ditegakkan di model masing-masing) */
const ROWS=[['releases',['Rilisan','Releases'],['releases'],{on:['releases.approve'],label:['Setujui hasil pemeriksaan','Approve review results']}],['labels',['Manajemen Label','Label Management'],['labels','claims'],{sa:['Setujui klaim, rekening & tarif','Approve claims, bank accounts & rates']}],['tickets',['Tiket Bantuan','Support Tickets'],['tickets'],{sa:['Peninjauan eskalasi','Escalation review']}],['services',['Layanan Tambahan (+ WAMI)','Add-on Services (+ WAMI)'],['services','wami'],{sa:['Penyelesaian & pengembalian','Resolution & refunds']}],['transactions',['Transaksi','Transactions'],['transactions'],{sa:['Setujui pengembalian','Approve refunds']}],['royalty',['Royalti','Royalties'],['royalty'],{sa:['Terbitkan laporan, sesuaikan saldo','Publish reports, adjust balances']}],['withdraw',['Penarikan','Withdrawals'],['withdraw'],{sa:['Mulai transfer & tandai dibayar','Start transfers & mark paid']}],['team',['Ringkasan Tim','Team Summary'],['team'],{sa:'—'}]];
const SAONLY=[['Kontrak Label','Label Contracts'],['Pemantauan Keuangan','Financial Monitoring'],['Staff & Akses','Staff & Access'],['Pengaturan Platform','Platform Settings'],['Pembaruan (terbitkan)','Updates (publish)']];
const isSens=id=>/\.(bank|export)$/.test(id);
const SENS=[['bank',['Lihat rekening lengkap','View full bank account'],['Nomor rekening penuh; di tempat lain ditampilkan ••••1234.','Full account number; shown as ••••1234 elsewhere.']],['export',['Ekspor data','Export data'],['Mengunduh data identitas, transaksi, atau royalti label.','Downloads label identity, transaction, or royalty data.']]];
const CAT=()=>Staff114.catalog;
const permsOf=(groups,kind,row)=>CAT().filter(p=>groups.includes(p.group)&&(kind==='v'?p.id.endsWith('.view'):kind==='d'?(row[3].on||[]).includes(p.id):!p.id.endsWith('.view')&&!isSens(p.id)&&!(row[3].on||[]).includes(p.id))).map(p=>p.id);
const plabel=id=>{const p=CAT().find(x=>x.id===id);return p?`${tg(p.groupLabel)} · ${tp(p.label)}`:id;};
/* ---------- data asli ---------- */
const STG={submitted:['Menunggu pemeriksaan','Awaiting review'],review:['Dalam pemeriksaan','In review'],revision:['Perbaikan label','Label revision'],approved:['Siap dikirim','Ready to send'],delivered:['Di Believe','At Believe'],followup:['Tindak lanjut Believe','Believe follow-up'],handling:['Dalam penanganan','Being handled'],label:['Menunggu label','Waiting for label'],distributor:['Menunggu distributor','Waiting for distributor'],believe:['Tindak lanjut Believe','Believe follow-up'],correction:['Koreksi','Correction'],queued:['Antrean','Queued'],working:['Dikerjakan','In progress'],materials:['Lengkapi bahan','Materials needed'],resolution:['Penyelesaian','Resolution']};
const SRC={release:['Rilisan','Release'],ticket:['Tiket','Ticket'],task:['Pekerjaan','Task'],service:['Layanan','Service'],wami:'WAMI',transaction:['Transaksi','Transaction'],operation:['Keputusan','Decision']};
function load(){const s=M();let J=[];try{J=jobs114();}catch(err){}JOBS=J.filter(j=>!j.closed);
 const title=j=>{const t=String(j.title||j.id);return t.split(' / ')[0];};
 P=s.users.map(u=>{const pp=people.find(x=>x.id===u.id)||{},jobs=JOBS.filter(j=>j.handler===u.id).map(j=>({...j,label:title(j),where:`${L(SRC[j.source])||j.source} · ${L(STG[j.stage])||j.stage||''}`}));let pf={total:0,on:0,corrections:0};try{pf=perf(u.id,state.period)||pf;}catch(err){}
  const tr=(data.timeRecords||{})[u.id+':'+day()]||null;
  const hist=s.audit.filter(a=>a.target===u.id||(a.staffTargets||[]).includes(u.id)).map(a=>[iso(a.at),ev(a.kind)+(a.note?' · '+autoT(a.note):''),a.actor]);
  return {id:u.id,u,ini:pp.initials||iniOf(u.name),name:u.name,email:u.email||'',sa:!!u.super,role:u.role,scope:u.scope,labels:u.labels||[],status:u.status==='invited'&&u.invite?.status==='revoked'?'revoked':u.status,joined:u.joined||'',self:u.id===state.user,jobs,perf:[pf.total||0,pf.on||0,pf.corrections||0],tr,hist};});
 RO=s.roles.filter(r=>!r.archived).map(r=>{const rv=store().reviewed[r.id];return {id:r.id,r,name:r.name,perms:new Set(r.permissions),reviewed:!!rv&&rv.version===r.version,rv,users:s.users.filter(u=>u.role===r.id&&!u.super)};});}
const roleOf=p=>p.status==='invited'?[$t('Menunggu aktivasi','Awaiting activation'),'c-or']:p.status==='revoked'?[$t('Undangan dicabut','Invitation revoked'),'']:p.status!=='active'?[$t('Nonaktif','Inactive'),'']:p.sa?['Super Admin','c-bl']:[$t('Staf · ','Staff · ')+rn(RO.find(r=>r.id===p.role)?.name||p.role),''];
const pct=p=>p.perf[0]?Math.round(p.perf[1]/p.perf[0]*100):0;
const activeSA=()=>P.filter(p=>p.sa&&p.status==='active');
const sensOn=()=>RO.reduce((n,r)=>n+SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length,0);
function items(){if(S.tab==='team'){let r=P.filter(p=>!S.q||[p.name,p.email].join(' ').toLowerCase().includes(S.q));const f={sa:p=>p.sa&&p.status==='active',staf:p=>!p.sa&&p.status==='active',inv:p=>p.status==='invited',off:p=>!['active','invited'].includes(p.status)}[S.pill];if(f)r=r.filter(f);return r;}return [{id:'sa'},...RO.map(r=>({id:r.id}))];}
function tabs(){$('tabs').innerHTML=[['team',$t('Tim','Team'),P.filter(p=>p.status!=='inactive').length],['roles',$t('Peran & Izin','Roles & Permissions'),RO.length+1]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
const monthName=()=>{const [y,m]=String(state.period||'').split('-').map(Number);return m?`${U.month(m-1)} ${y}`:'';};
const revChip=r=>r.reviewed?chip($t('Ditinjau','Reviewed'),'c-gr'):chip($t('Belum ditinjau','Not reviewed'),'c-or'),fixed=()=>chip($t('Tetap','Fixed'),'c-bl');
function band(){const act=P.filter(p=>p.status==='active'),jobs=act.reduce((n,p)=>n+p.jobs.length,0),st=act.filter(p=>!p.sa),tw=st.reduce((n,p)=>n+p.perf[1],0),tt=st.reduce((n,p)=>n+p.perf[0],0),present=st.filter(p=>p.tr?.in).length,unrev=RO.filter(r=>!r.reviewed&&r.users.length).length,inv=P.filter(p=>p.status==='invited').length,sens=sensOn();
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Tim hari ini','Team today')} · ${E(U.todayLabel())}</div><h2>${$t(`${act.length} orang aktif · ${jobs} pekerjaan berjalan`,`${act.length} ${act.length===1?'person':'people'} active · ${jobs} ${jobs===1?'job':'jobs'} in progress`)}</h2>
  <p>${$t(`Kehadiran staf hari ini ${present}/${st.length} tercatat`,`Staff attendance today ${present}/${st.length} recorded`)} · ${unrev?$t(`${unrev} peran belum ditinjau`,`${unrev} ${unrev===1?'role':'roles'} not reviewed`):$t('semua peran sudah ditinjau','all roles reviewed')} · ${sens?$t(`${sens} izin sensitif aktif pada peran staf`,`${sens} sensitive ${sens===1?'permission':'permissions'} active on staff roles`):$t('tidak ada izin sensitif aktif','no sensitive permissions active')}${inv?$t(` · ${inv} undangan menunggu aktivasi`,` · ${inv} ${inv===1?'invitation':'invitations'} awaiting activation`):''}</p>
  <div class="acts"><button class="wbtn" data-invite>${$t('Undang staf','Invite staff')} ${ARROW}</button>${unrev?`<button class="gbtn" data-review>${$t(`Tinjau peran ${E(RO.find(r=>!r.reviewed&&r.users.length).name)}`,`Review ${E(rn(RO.find(r=>!r.reviewed&&r.users.length).name))} role`)}</button>`:''}</div></div>
  <div class="statg"><div class="sbox"><b class="n">${sens}</b><span>${$t('izin sensitif aktif','sensitive permissions active')}</span></div></div></div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari nama atau email','Search name or email')}" value="${E(S.q)}"></label>`;
function list(){let h='';
 if(S.tab==='team'){const r=items(),cnt=k=>({all:P.length,sa:P.filter(p=>p.sa&&p.status==='active').length,staf:P.filter(p=>!p.sa&&p.status==='active').length,inv:P.filter(p=>p.status==='invited').length,off:P.filter(p=>!['active','invited'].includes(p.status)).length})[k];
  h+=`<div class="ch"><h3>${$t('Tim','Team')} <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all',['Semua','All']],['sa','Super Admin'],['staf',['Staf','Staff']],['inv',['Menunggu aktivasi','Awaiting activation']],['off',['Nonaktif','Inactive']]].filter(([k])=>['all','sa','staf'].includes(k)||cnt(k)).map(([k,t])=>`<button data-pill="${k}" aria-pressed="${S.pill===k}">${L(t)}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  r.forEach((p,i)=>{const ro=roleOf(p);h+=`<div class="it${S.sel.team===p.id&&S.form!=='invite'?' sel':''}" data-id="${E(p.id)}" style="--i:${i}">${lav(p)}<div style="min-width:0"><div class="t1">${E(p.name)}${p.self?` <span class="mono">${$t('kamu','you')}</span>`:''} ${chip(...ro)}</div><div class="t2">${E(p.email)}${p.status==='invited'?$t(' · diundang',' · invited'):p.joined?$t(' · bergabung ',' · joined ')+fd(p.joined):''}${p.scope!=='all'&&!p.sa?' · '+nLabel(p.labels.length):''}</div></div><div class="rgt">${p.status==='active'?`<span class="amt n">${p.jobs.length}</span><span class="duet">${$t('pekerjaan',p.jobs.length===1?'job':'jobs')}</span>`:''}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada','None')}</b>${$t('Coba kata lain.','Try another word.')}</div>`;}
 else{h+=`<div class="ch"><h3>${$t('Peran &amp; Izin','Roles &amp; Permissions')}</h3></div>
  <div class="it${S.sel.roles==='sa'?' sel':''}" data-id="sa" style="--i:0"><span class="ty">${LOCK}</span><div style="min-width:0"><div class="t1">Super Admin ${fixed()}</div><div class="t2">${$t(`${activeSA().length} orang · semua izin & keputusan · tidak bisa diubah`,`${activeSA().length} ${activeSA().length===1?'person':'people'} · all permissions & decisions · cannot be changed`)}</div></div></div>
  ${RO.map((r,i)=>`<div class="it${S.sel.roles===r.id?' sel':''}" data-id="${E(r.id)}" style="--i:${i+1}"><span class="ty">${KEY}</span><div style="min-width:0"><div class="t1">${E(rn(r.name))} ${revChip(r)}</div><div class="t2">${$t(`${r.users.filter(u=>u.status==='active').length} staf`,`${r.users.filter(u=>u.status==='active').length} staff`)} · ${nPerm(r.perms.size)} · ${$t(`${SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length} sensitif`,`${SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length} sensitive`)}</div></div></div>`).join('')}`;}
 $('list').innerHTML=h;}
/* ---------- pengalihan pekerjaan (dipakai ubah akses, ubah peran, nonaktifkan) ---------- */
function targetsFor(job,exclude,futureRole){const s=M();return s.users.filter(u=>u.status==='active'&&u.id!==exclude&&u.id!==job.handler&&(u.super||Staff114.can(s,u.id,job.permission,job.member))&&(!futureRole||u.super||u.role!==futureRole.id||futureRole.permissions.includes(job.permission)));}
function handover(jobs,exclude,futureRole){if(!jobs.length)return '';return `<div class="ledger">${jobs.map(j=>{const ts=targetsFor(j,exclude,futureRole),cur=S.dis[j.key]||ts[0]?.id||'';if(!S.dis[j.key]&&cur)S.dis[j.key]=cur;return `<div class="ho"><span>${E(String(j.title||j.id).split(' / ')[0])}<small>${E(L(SRC[j.source])||j.source)} · ${E(L(STG[j.stage])||j.stage||'')} · <span class="mono">${E(j.id)}</span></small></span><div class="seg2">${ts.map(o=>`<button data-ho="${E(j.key)}|${E(o.id)}" aria-pressed="${cur===o.id}" title="${E(o.name)}">${E(pini(o.id))}</button>`).join('')||`<span class="where">${$t('tidak ada pengganti','no replacement available')}</span>`}</div></div>`;}).join('')}</div>`;}
const transfers=jobs=>Object.fromEntries(jobs.map(j=>[j.key,S.dis[j.key]||null]).filter(([,v])=>v));
/* ---------- rincian orang ---------- */
const labelOpts=()=>ten.members.filter(m=>m.active).map(m=>[m.id,m.name]);
function accessImpact(p){const a=S.acc,r=RO.find(x=>x.id===a.role);if(!r)return [];try{return Staff114.impact(M(),p.u,{permissions:[...r.perms],scope:a.scope,labels:a.labels},JOBS);}catch(err){return [];}}
function accessForm(p){const a=S.acc,out=accessImpact(p),r=RO.find(x=>x.id===a.role);
 return `<div class="reveal nextc"><div class="fld">${$t('Peran','Role')}<div class="opts two">${RO.map(x=>`<button data-arole="${E(x.id)}" aria-pressed="${a.role===x.id}">${$t('Staf · ','Staff · ')}${E(rn(x.name))}<small>${nPerm(x.perms.size)}</small></button>`).join('')}</div></div>
  <div class="fld">${$t('Cakupan label','Label scope')}<div class="seg2">${SCOPE().map(([v,t])=>`<button data-ascope="${v}" aria-pressed="${a.scope===v}">${t}</button>`).join('')}</div>${a.scope==='selected'?`<div class="pills" style="margin-top:6px">${labelOpts().map(([id,n])=>`<button data-alab="${E(id)}" aria-pressed="${a.labels.includes(id)}">${E(n)}</button>`).join('')}</div>`:''}</div>
  <div class="impact2"><b>${$t('Dampak bila disimpan','Impact if saved')}</b><ul>${a.scope==='selected'?`<li>${$t(`Hanya melihat ${a.labels.length} label.`,`Sees only ${nLabel(a.labels.length)}.`)}</li>`:''}${r&&r.id!==p.role?`<li>${$t(`Izin mengikuti peran ${E(r.name)} (${r.perms.size} izin).`,`Permissions follow the ${E(rn(r.name))} role (${nPerm(r.perms.size)}).`)}</li>`:''}${out.length?`<li class="w">${$t(`${out.length} pekerjaan di luar akses baru perlu dialihkan.`,`${nJob(out.length)} outside the new access need reassigning.`)}</li>`:''}${!out.length&&a.scope===p.scope&&a.role===p.role&&a.labels.join()===p.labels.join()?`<li>${$t('Tidak ada perubahan izin.','No permission changes.')}</li>`:''}</ul></div>
  ${handover(out,p.id)}${WHY('Mis. fokus menangani label Utara Music','E.g. focus on the Utara Music label')}
  <div class="hrow">${btn($t('Simpan perubahan','Save changes'),'data-do="acc-save"','pri',a.scope==='selected'&&!a.labels.length)}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`;}
const SCOPE=()=>[['all',$t('Seluruh label','All labels')],['selected',$t('Label tertentu','Selected labels')]];
const WHY=(id,en)=>`<label class="fld">${$t('Alasan · tercatat di riwayat akses','Reason · recorded in access history')}<input id="f-note" placeholder="${$t(id,en)}"></label>`;
const noJobs=()=>`<p class="where">${$t('Tidak ada pekerjaan aktif.','No active work.')}</p>`;
function disableForm(p){return `<div class="reveal nextc"><p>${$t(`Nonaktifkan <b>${E(p.name)}</b>. Pekerjaan aktifnya dialihkan dulu, supaya tahap dan tenggatnya tidak hilang.`,`Deactivate <b>${E(p.name)}</b>. Their active work is reassigned first, so stages and deadlines are kept.`)}</p>${p.jobs.length?handover(p.jobs,p.id):noJobs()}${WHY('Mis. kontrak kerja berakhir','E.g. employment contract ended')}<div class="hrow">${btn(p.jobs.length?$t('Alihkan & nonaktifkan','Reassign & deactivate'):$t('Nonaktifkan','Deactivate'),'data-do="disable"','pri dng')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`;}
function attendance(p){if(p.sa)return `<div class="lg"><span>${$t('Tidak diwajibkan','Not required')}<small>${$t('Super Admin tidak dinilai kehadirannya','Super Admin attendance is not assessed')}</small></span></div>`;const t=p.tr;return t?.in?`<div class="lg"><span>${$t('Masuk','In')} ${E(t.in)}${t.out?$t(' · pulang ',' · out ')+E(t.out):$t(' · belum pulang',' · not checked out')}<small>${$t('dicatat sendiri di mode Staff','self-recorded in Staff mode')}</small></span></div>`:`<div class="lg"><span>${$t('Belum tercatat','Not recorded')}<small>${$t('absensi dicatat sendiri di mode Staff','attendance is self-recorded in Staff mode')}</small></span></div>`;}
function panePerson(p){let i=0;const ro=roleOf(p),rev=p.status==='revoked',inv=p.status==='invited'||rev,off=!['active','invited','revoked'].includes(p.status),r=RO.find(x=>x.id===p.role);
 const accessLine=p.sa?$t('Semua izin & keputusan','All permissions & decisions'):`${E(rn(r?.name||p.role))} · ${nPerm(r?.perms.size||0)}`,allL=()=>$t('Seluruh label','All labels');
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Tim','Team')}</button><div class="relhd">${lav(p,1)}<div style="min-width:0"><div class="k">${E(p.email)}</div><h2>${E(p.name)}</h2><div class="meta">${chip(...ro)}<span class="sep"></span>${p.sa||p.scope==='all'?allL():nLabel(p.labels.length)}${!p.sa&&p.status==='active'?`<span class="sep"></span><button class="lnk" data-preview="${E(p.id)}">${EYE} ${$t('Pratinjau akses','Preview access')}</button>`:''}</div></div></div></div>
 <div class="pb">${rev?sec(i++,$t('Undangan','Invitation'),`<div class="nextc mute"><p>${$t('Undangan dicabut; tautan aktivasi lama tidak berlaku.','Invitation revoked; the old activation link no longer works.')}</p><div class="hrow">${btn($t('Kirim ulang undangan','Resend invitation'),'data-do="resend"')}</div></div>`):''}${inv&&!rev?sec(i++,$t('Undangan','Invitation'),`<div class="nextc"><p>${$t(`Undangan sudah dibuat. Akses baru aktif setelah ${E(p.name)} menyelesaikan aktivasi.`,`Invitation created. Access becomes active after ${E(p.name)} completes activation.`)}</p><div class="hrow">${btn($t('Kirim ulang','Resend'),'data-do="resend"')}${btn($t('Cabut undangan','Revoke invitation'),'data-do="revoke"','ghost dng')}</div></div>`):''}
 ${sec(i++,$t('Akses','Access'),S.form==='acc'?accessForm(p):`<div class="facts"><span>${$t('Peran','Role')}</span><b>${p.sa?'Super Admin':$t('Staf · ','Staff · ')+E(rn(r?.name||p.role))}</b><span>${$t('Izin','Permissions')}</span><b>${accessLine}${!p.sa&&r?` · <button class="lnk" data-gorole="${E(r.id)}">${$t('lihat matriks','view matrix')}</button>`:''}</b><span>${$t('Cakupan','Scope')}</span><b>${p.sa||p.scope==='all'?allL():E(p.labels.map(mname).join(', '))}</b></div>${!inv&&!off?`<div class="hrow" style="margin-top:10px">${p.self?`<span class="where">${$t('Akses sendiri diubah oleh Super Admin lain.','Your own access is changed by another Super Admin.')}</span>`:p.sa?`<span class="where">${$t('Peran Super Admin tetap; tidak diubah dari sini.','The Super Admin role is fixed; it is not changed here.')}</span>`:btn($t('Ubah akses','Change access'),'data-form="acc"')}</div>`:''}`)}
 ${!inv?sec(i++,$t('Pekerjaan aktif','Active work'),p.jobs.length?`<div class="ledger">${p.jobs.map(j=>`<button class="lg jl" data-job="${E(j.key)}"><span>${E(j.label)}<small>${E(j.where)} · <span class="mono">${E(j.id)}</span></small></span>${ARROW}</button>`).join('')}</div>`:noJobs(),$t(p.jobs.length+' berjalan',p.jobs.length+' in progress')):''}
 ${!inv?sec(i++,$t('Kehadiran hari ini','Attendance today'),attendance(p)):''}
 ${sec(i++,$t('Riwayat akses','Access history'),p.hist.length?`<div class="hist">${p.hist.slice(0,12).map(([t,x,w])=>`<div><span class="mini">${E(pini(w))}</span><span>${E(x)}<small style="display:block">${E(pname(w))} · ${fd(t)}</small></span></div>`).join('')}</div>`:`<p class="where">${$t('Belum ada perubahan sejak akun dibuat.','No changes since the account was created.')}</p>`)}
 ${!inv&&!off?sec(i++,$t('Akun','Account'),S.form==='dis'?disableForm(p):p.self?`<p class="where">${$t('Kamu tidak bisa menonaktifkan akunmu sendiri.','You cannot deactivate your own account.')}</p>`:p.sa&&activeSA().length<=1?`<p class="where">${$t('Super Admin terakhir tidak bisa dinonaktifkan.','The last Super Admin cannot be deactivated.')}</p>`:`<div class="hrow">${btn($t('Nonaktifkan akun','Deactivate account'),'data-form="dis"','ghost dng')}</div>`):''}
 ${off?sec(i++,$t('Akun','Account'),`<div class="nextc mute"><p>${$t('Nonaktif. Pekerjaannya sudah dialihkan.','Inactive. Their work has been reassigned.')}</p>${WHY('Mis. kembali bekerja','E.g. back at work')}<div class="hrow">${btn($t('Aktifkan kembali','Reactivate'),'data-do="reactivate"')}</div><p class="where">${$t(`Akses lama ditinjau ulang: peran ${E(r?.name||'staf')}, cakupan ${p.scope==='all'?'seluruh label':p.labels.length+' label'}.`,`Previous access is reviewed again: role ${E(r?rn(r.name):'staff')}, scope ${p.scope==='all'?'all labels':nLabel(p.labels.length)}.`)}</p></div>`):''}</div>`;}
function paneInvite(){const f=S.inv;return `<div class="hd"><button class="back" data-back>${BACK}${$t('Tim','Team')}</button><div class="k"><span class="ty">${KEY}</span>${$t('Undangan baru','New invitation')}</div><h2>${$t('Undang staf','Invite staff')}</h2></div>
 <div class="pb">${sec(0,$t('Data','Details'),`<div class="f2"><label class="fld">${$t('Nama','Name')}<input id="i-name" value="${E(f.name)}" placeholder="${$t('Nama lengkap','Full name')}"></label><label class="fld">Email<input id="i-email" value="${E(f.email)}" placeholder="${$t('nama@contoh.test','name@example.test')}"></label></div>`)}
 ${sec(1,$t('Peran & cakupan','Role & scope'),`<div class="opts two">${RO.map(x=>`<button data-irole="${E(x.id)}" aria-pressed="${f.role===x.id}">${$t('Staf · ','Staff · ')}${E(rn(x.name))}<small>${nPerm(x.perms.size)}</small></button>`).join('')}<button disabled>Super Admin<small>${$t('tidak lewat undangan','not by invitation')}</small></button></div><div class="seg2" style="margin-top:10px">${SCOPE().map(([v,t])=>`<button data-iscope="${v}" aria-pressed="${f.scope===v}">${t}</button>`).join('')}</div>${f.scope==='selected'?`<div class="pills" style="margin-top:6px">${labelOpts().map(([id,n])=>`<button data-ilab="${E(id)}" aria-pressed="${f.labels.includes(id)}">${E(n)}</button>`).join('')}</div>`:''}`)}
 ${sec(2,$t('Kirim','Send'),`<p class="where">${$t('Undangan tidak membuat akses aktif sebelum penerima menyelesaikan aktivasi. Email yang sudah terdaftar diarahkan ke akun yang ada.','An invitation grants no access until the recipient completes activation. Emails already registered go to the existing account.')}</p><div class="hrow">${btn($t('Kirim undangan','Send invitation'),'data-do="invite"','pri')}${btn($t('Batal','Cancel'),'data-back')}</div>`)}</div>`;}
/* ---------- rincian peran ---------- */
function cell(row,col,draft){const perms=permsOf(row[2],col,row);if(col==='d'&&row[3].sa)return `<span class="cell lock">${LOCK}<small>${E(L(row[3].sa))}</small></span>`;if(!perms.length)return `<span class="cell none">—</span>`;
 const on=perms.filter(x=>draft.has(x)).length;return `<button class="cell ${on===perms.length?'on':on?'part':'off'}" data-cell="${row[0]}|${col}">${on===perms.length?'✓':on?on+'/'+perms.length:'—'}${col==='d'?`<small>${E(L(row[3].label))}</small>`:''}</button>`;}
function roleImpact(r,draft){const s=M(),perms=[...draft];return r.users.filter(u=>u.status==='active').flatMap(u=>{try{return Staff114.impact(s,u,{permissions:perms},JOBS);}catch(err){return [];}});}
function paneRole(id){let i=0;
 if(id==='sa')return `<div class="hd"><button class="back" data-back>${BACK}${$t('Peran','Roles')}</button><div class="k"><span class="ty">${LOCK}</span>${$t('Peran tetap','Fixed role')}</div><h2>Super Admin</h2><div class="meta">${fixed()}<span class="sep"></span>${activeSA().map(p=>E(p.name)).join(' · ')}</div></div>
 <div class="pb">${sec(0,$t('Aturan','Rules'),`<div class="checks"><div class="ck"><b>✓</b>${$t('Semua izin dan semua keputusan 🔒','All permissions and all decisions 🔒')}</div><div class="ck"><b>✓</b>${$t('Peran Super Admin tidak diberikan lewat undangan atau peran staf','The Super Admin role is never granted by invitation or a staff role')}</div><div class="ck"><b>✓</b>${$t('Super Admin terakhir tidak bisa dinonaktifkan','The last Super Admin cannot be deactivated')}</div><div class="ck"><b>✓</b>${$t('Tidak bisa mengubah atau menonaktifkan akun sendiri','Cannot change or deactivate your own account')}</div></div>`)}
 ${sec(1,$t('Keputusan khusus Super Admin','Super Admin-only decisions'),`<div class="lockl">${ROWS.filter(m=>m[3].sa&&m[3].sa!=='—').map(m=>`<div>${LOCK}<span>${E(L(m[1]))}<small>${E(L(m[3].sa))}</small></span></div>`).join('')}${SAONLY.map(n=>`<div>${LOCK}<span>${E(L(n))}<small>${$t('seluruh menu','entire menu')}</small></span></div>`).join('')}</div>`)}</div>`;
 const r=RO.find(x=>x.id===id);if(!r)return '';if(!S.draft||S.draft.role!==r.id)S.draft={role:r.id,set:new Set(r.perms)};const d=S.draft.set,add=[...d].filter(x=>!r.perms.has(x)),rem=[...r.perms].filter(x=>!d.has(x)),dirty=add.length+rem.length;
 const noStaff=()=>$t('belum ada staf','no staff yet');
 let next='';if(dirty){const needWhy=add.some(isSens),hit=roleImpact(r,d),names=r.users.filter(u=>u.status==='active').map(u=>u.name).join(', ')||noStaff();next=`<div class="nextc"><p>${$t(`<b>Tinjau perubahan</b> · berlaku untuk ${E(names)}.`,`<b>Review changes</b> · applies to ${E(names)}.`)}</p><div class="chg2">${add.map(x=>`<div><span class="chip c-gr"><i></i>${$t('Tambah','Add')}</span>${E(plabel(x))}</div>`).join('')}${rem.map(x=>`<div><span class="chip c-red"><i></i>${$t('Cabut','Revoke')}</span>${E(plabel(x))}</div>`).join('')}</div>${hit.length?`<p class="where" style="margin-top:8px">${$t(`${hit.length} pekerjaan tidak lagi bisa ditangani pemegangnya · pilih pengganti:`,`${nJob(hit.length)} can no longer be handled by the current holder · choose a replacement:`)}</p>${handover(hit,null,{id:r.id,permissions:[...d]})}`:''}<label class="fld">${needWhy?$t('Alasan menyalakan izin sensitif · wajib','Reason for turning on sensitive permissions · required'):$t('Alasan · tercatat di riwayat','Reason · recorded in history')}<input id="f-why" placeholder="${needWhy?$t('Mis. staf keuangan perlu mencocokkan rekening','E.g. finance staff need to match bank accounts'):$t('Mis. staf tidak menangani klaim lagi','E.g. staff no longer handle claims')}"></label><div class="hrow">${btn($t('Simpan perubahan','Save changes'),'data-do="role-save"','pri')}${btn($t('Batalkan','Discard'),'data-do="role-reset"')}</div></div>`;}
 else if(!r.reviewed)next=`<div class="nextc"><p>${$t(`Peran ini dibawa dari pengaturan lama dan <b>belum ditinjau</b> sejak versi ${r.r.version}. Periksa matriks dan izin sensitif di bawah, lalu tandai sudah ditinjau.`,`This role was carried over from the old settings and <b>has not been reviewed</b> since version ${r.r.version}. Check the matrix and sensitive permissions below, then mark it as reviewed.`)}</p><div class="hrow">${btn($t('Tandai sudah ditinjau','Mark as reviewed'),'data-do="role-reviewed"','pri')}</div></div>`;
 else next=`<div class="nextc ok"><p>${$t(`Ditinjau ${fd(iso(r.rv.at))} oleh ${E(pname(r.rv.by))} · versi ${r.r.version}.`,`Reviewed ${fd(iso(r.rv.at))} by ${E(pname(r.rv.by))} · version ${r.r.version}.`)}</p></div>`;
 const hist=[...M().audit.filter(a=>a.target===r.id).map(a=>[iso(a.at),ev(a.kind)+(a.note?' · '+autoT(a.note):''),a.actor]),...store().hist.filter(h=>h.role===r.id).map(h=>[iso(h.at),autoT(h.text),h.by])].sort((a,b)=>b[0].localeCompare(a[0]));
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Peran','Roles')}</button><div class="k"><span class="ty">${KEY}</span>${$t('Peran staf','Staff role')}</div><h2>${E(rn(r.name))}</h2><div class="meta">${revChip(r)}<span class="sep"></span>${nPerm(r.perms.size)}<span class="sep"></span>${E(r.users.map(u=>u.name).join(', ')||noStaff())}</div></div>
 <div class="pb">${sec(i++,dirty?$t('Perubahan belum disimpan','Unsaved changes'):$t('Langkah berikutnya','Next step'),next)}
 ${sec(i++,$t('Matriks izin','Permission matrix'),`<div class="mx"><div class="mxh"><span>Menu</span><span>${$t('Lihat','View')}</span><span>${$t('Kerjakan','Work')}</span><span>${$t('Putuskan','Decide')}</span></div>${ROWS.map(m=>{const all=[...permsOf(m[2],'v',m),...permsOf(m[2],'w',m),...permsOf(m[2],'d',m)];return `<div class="mxr"><button class="mxn" data-exp="${m[0]}">${E(L(m[1]))}<small>${S.exp[m[0]]?$t('tutup rincian','hide details'):$t('rincian izin','permission details')}</small></button>${cell(m,'v',d)}${cell(m,'w',d)}${cell(m,'d',d)}</div>${S.exp[m[0]]?`<div class="mxd">${all.map(x=>`<label class="tg"><input type="checkbox" data-perm="${x}" ${d.has(x)?'checked':''}> ${E(plabel(x))}</label>`).join('')}</div>`:''}`;}).join('')}<div class="mxr sa"><span class="mxn">${$t('Kontrak, Pemantauan Keuangan, Staff &amp; Akses, Pengaturan, Pembaruan','Contracts, Financial Monitoring, Staff &amp; Access, Settings, Updates')}</span><span class="cell lock" style="grid-column:span 3">${LOCK}<small>${$t('Hanya Super Admin','Super Admin only')}</small></span></div></div><p class="where">${$t('Klik sel untuk menyalakan/mematikan semua izin di kolom itu; buka "rincian izin" untuk mengatur satu per satu. Izin "Kerjakan" otomatis menyalakan "Lihat".','Click a cell to turn every permission in that column on or off; open "permission details" to set them one by one. "Work" permissions turn on "View" automatically.')}</p>`)}
 ${sec(i++,$t('Izin sensitif','Sensitive permissions'),`<div class="sens">${SENS.map(([k,t,m])=>{const ids=CAT().filter(p=>p.id.endsWith('.'+k)).map(p=>p.id),on=ids.filter(x=>d.has(x)).length;return `<div class="sr"><span><b>${E(L(t))}</b> ${chip($t('Sensitif','Sensitive'),'c-red')}<small>${E(L(m))} ${on?$t(`· menyala di ${on} dari ${ids.length} menu`,`· on in ${on} of ${ids.length} menus`):''}</small></span><button class="sw ${on?'on':''}" data-sens="${k}" aria-label="${E(L(t))}"><i></i></button></div>`;}).join('')}</div><p class="where">${$t('Usulan: matikan untuk staf. Menyalakan kembali wajib disertai alasan.','Suggestion: turn off for staff. Turning it back on requires a reason.')}</p>`)}
 ${sec(i++,$t('Riwayat perubahan','Change history'),hist.length?`<div class="hist">${hist.slice(0,12).map(([t,x,w])=>`<div><span class="mini">${E(pini(w))}</span><span>${E(x)}<small style="display:block">${E(pname(w))} · ${fd(t)}</small></span></div>`).join('')}</div>`:`<p class="where">${$t('Dibawa dari pengaturan lama (migrasi); belum ada perubahan.','Carried over from the old settings (migration); no changes yet.')}</p>`)}</div>`;}
let lastPane='';
function pane(){let h='';if(S.tab==='team'){if(S.form==='invite')h=paneInvite();else{const p=P.find(x=>x.id===S.sel.team&&items().includes(x));h=p?panePerson(p):'';}}else h=paneRole(S.sel.roles);$('pin').innerHTML=h||`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih orang','Select a person')}</b>${$t('Rinciannya tampil di sini.','Their details appear here.')}</div>`;
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
 const moved=n=>$t(`${n} pekerjaan dialihkan`,`${nJob(n)} reassigned`);
 if(a==='acc-save'){const A=S.acc,why=val('f-note');if(!why){toast($t('Tulis alasan perubahan','Write a reason for the change'));return;}const out=accessImpact(p);res=atomic114('save-access',{user:p.id,role:A.role,scope:A.scope,labels:A.scope==='all'?[]:A.labels,version:p.u.version,note:why,transfers:transfers(out)});msg=res?.moves?.length?`${$t('Akses diperbarui','Access updated')} · ${moved(res.moves.length)}`:$t('Akses diperbarui · tercatat di riwayat akses','Access updated · recorded in access history');}
 else if(a==='disable'){const why=val('f-note');if(!why){toast($t('Alasan wajib diisi','A reason is required'));return;}if(p.self){toast($t('Kamu tidak bisa menonaktifkan akunmu sendiri','You cannot deactivate your own account'));return;}res=atomic114('disable',{user:p.id,version:p.u.version,note:why,transfers:transfers(p.jobs)});msg=res?.moves?.length?`${moved(res.moves.length)} · ${$t('akun nonaktif','account deactivated')}`:$t('Akun nonaktif','Account deactivated');}
 else if(a==='reactivate'){const why=val('f-note')||'Diaktifkan kembali dari Staff & Akses';res=atomic114('reactivate',{user:p.id,version:p.u.version,note:why,role:p.sa?null:(p.role||RO[0]?.id),scope:p.scope||'all',labels:p.labels});msg=$t('Aktif kembali','Reactivated');}
 else if(a==='resend'){atomic114('resend',{user:p.id,version:p.u.version});msg=$t('Undangan dikirim ulang','Invitation resent');}
 else if(a==='revoke'){atomic114('revoke-invite',{user:p.id,version:p.u.version});S.sel.team=state.user;msg=$t('Undangan dicabut','Invitation revoked');}
 else if(a==='invite'){const f=S.inv,name=val('i-name'),email=val('i-email').toLowerCase();if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){toast($t('Isi nama dan email yang benar','Enter a valid name and email'));return;}if(f.scope==='selected'&&!f.labels.length){toast($t('Pilih minimal satu label','Select at least one label'));return;}res=atomic114('invite',{name,email,role:f.role,scope:f.scope,labels:f.scope==='all'?[]:f.labels});if(res?.existing){S.form=null;S.sel.team=res.existing;lastSig='';load();paint();toast($t('Email sudah terdaftar · diarahkan ke akun yang ada','Email already registered · opened the existing account'));return;}S.sel.team=res?.id||S.sel.team;msg=$t('Undangan dibuat · akses aktif setelah aktivasi','Invitation created · access starts after activation');}
 else if(a==='role-save'){const r=RO.find(x=>x.id===S.draft.role),d=S.draft.set,add=[...d].filter(x=>!r.perms.has(x)),rem=[...r.perms].filter(x=>!d.has(x)),why=val('f-why');if(add.some(isSens)&&!why){toast($t('Alasan wajib untuk izin sensitif','A reason is required for sensitive permissions'));return;}
  const note=why||`Matriks diubah (${[add.length?'+'+add.length+' izin':'',rem.length?'−'+rem.length+' izin':''].filter(Boolean).join(', ')})`;const hit=roleImpact(r,d);res=atomic114('save-role',{role:r.id,name:r.name,description:r.r.description||'',permissions:[...d],version:r.r.version,note,transfers:transfers(hit)});S.draft=null;msg=`${$t('Perubahan peran disimpan','Role changes saved')}${res?.moves?.length?` · ${moved(res.moves.length)}`:''} · ${$t('peran perlu ditinjau ulang','the role needs another review')}`;}
 else if(a==='role-reset'){S.draft=null;msg=$t('Perubahan dibatalkan','Changes discarded');}
 else if(a==='role-reviewed'){const r=RO.find(x=>x.id===S.sel.roles);const st=store();const f=()=>{st.reviewed[r.id]={version:r.r.version,at:ten.now,by:state.user};st.hist.push({role:r.id,text:'Ditinjau dan dinyatakan sesuai · versi '+r.r.version,at:ten.now,by:state.user});};typeof atomic10==='function'?atomic10(f):(f(),save10());msg=$t(`Peran ${r.name} ditandai sudah ditinjau`,`${rn(r.name)} role marked as reviewed`);}
 }catch(err){toast(terr(String(err?.message||err)));return;}
 S.form=null;S.dis={};lastSig='';load();paint();if(msg)toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.draft=null;paint();return;}
  const pl=t.closest('[data-pill]');if(pl){S.pill=pl.dataset.pill;paint();return;}
  if(t.closest('[data-invite]')){S.tab='team';S.form='invite';S.inv={name:'',email:'',role:RO[0]?.id,scope:'all',labels:[]};S.read=true;paint();$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(t.closest('[data-review]')){open('roles',RO.find(r=>!r.reviewed&&r.users.length)?.id||RO[0]?.id);return;}
  const gr=t.closest('[data-gorole]');if(gr){open('roles',gr.dataset.gorole);return;}
  const pv=t.closest('[data-preview]');if(pv){try{previewUser114(pv.dataset.preview);}catch(err){toast(terr(String(err?.message||err)));}return;}
  const jb=t.closest('[data-job]');if(jb){try{openJob114(jb.dataset.job);}catch(err){toast($t('Pekerjaan tidak tersedia','Work item unavailable'));}return;}
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
const sig=()=>{const s=M();return s.revision+':'+s.users.map(u=>u.id+u.status+u.version).join(',')+':'+s.roles.map(r=>r.id+r.version).join(',')+':'+JOBS.length+JOBS.map(j=>j.handler).join('')+':'+JSON.stringify(store().reviewed)+':'+U.today()+state.user+state.lang;};
const DEF={id:'staff',css:STYLE,html:HTML,
 i18n:{'Staff & Akses':'Staff & Access','Siapa di tim, apa yang sedang dikerjakan, dan apa yang boleh dilakukan — satu tempat untuk orang dan izinnya.':'Who is on the team, what they are working on, and what they may do — one place for people and their permissions.'},
 when:()=>!isLabel10()&&state.page==='access'&&(()=>{try{return super114();}catch(err){return false;}})(),
 init(r){root=r;bind();},
 draw(){if(window.saRole137){const id=window.saRole137;window.saRole137=null;S.tab='roles';S.sel.roles=id;S.read=true;S.form=null;S.draft=null;lastSig='';}load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Staff & Akses */
DEF.sum=function(){load();const act=P.filter(p=>p.status==='active'),st=act.filter(p=>!p.sa),jobs=act.reduce((n,p)=>n+p.jobs.length,0),present=st.filter(p=>p.tr?.in).length,unrev=RO.filter(r=>!r.reviewed&&r.users.length);
 return {act:act.length,jobs,present,staff:st.length,unrev:unrev.map(r=>({id:r.id,name:rn(r.name),users:r.users.length,sens:SENS.filter(([k])=>[...r.perms].some(x=>x.endsWith('.'+k))).length,rv:r.rv||null})),sens:sensOn(),inv:P.filter(p=>p.status==='invited').length,
  people:act.map(p=>({id:p.id,name:p.name,ini:p.ini,sa:p.sa})),line:$t(`${act.length} aktif · ${jobs} pekerjaan berjalan · kehadiran staf ${present}/${st.length} tercatat`,`${act.length} active · ${jobs} ${jobs===1?'job':'jobs'} in progress · staff attendance ${present}/${st.length} recorded`),tone:unrev.length?'o':'g'};};
page137(DEF);
if(typeof accessPage==='function'){const ab=accessPage;accessPage=function(){if(DEF.when())return '';return ab.apply(this,arguments);};}
})();
