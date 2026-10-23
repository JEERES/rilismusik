/* v1.1.0-dev.29 — Wadah rancangan baru (Shadow DOM).
   Menu yang dirancang ulang (mock yang sudah disetujui) dipasang di sini: tampilan persis mock karena CSS-nya
   terisolasi di Shadow DOM, sedangkan data dan tindakan memakai model prototipe yang asli.
   Setiap menu mendaftar lewat page137({id, when, css, html, init, draw, stub}). */
const M137={defs:[],hosts:{},base:null};
/* v1.1.0-dev.43 — dua bahasa: $t('teks Indonesia','English text') mengikuti tombol ID/EN (state.lang).
   Teks tetap di HTML rancangan diterjemahkan lewat def.i18n {'teks Indonesia':'English'} saat bahasa berganti. */
function $t(id,en){return state.lang==='en'&&en!=null?en:id;}
const en137=()=>state.lang==='en';
const BASE137=`:host{--bg:#f0f0f0;--card:#f8f8f8;--white:#fdfdfd;--text:#1b1d21;--muted:#6b7079;--faint:#9a9ea6;--line:#e4e4e6;--soft:#ececee;--green:#1eaa36;--blue:#2e689e;--orange:#cc6419;--red:#c83255;--ink:#1b1d21;--onink:#fff;
--g-top:#fefefe;--g-bot:#f8f8f8;--g-lens:#0000000b;--g-rimtop:#fff;--g-rimbot:#fff;--g-rimside:#00000012;--g-sh1:#0000000a;--g-sh2:#00000016;--tint:34%;--tint-r:9%}
:host([data-theme=dark]){--bg:#0a0a0b;--card:#141415;--white:#1c1c1e;--text:#ededef;--muted:#8e8e94;--faint:#6a6a70;--line:#ffffff14;--soft:#ffffff0d;--green:#3cc458;--blue:#5b9be0;--orange:#e88a3c;--red:#e5577a;--ink:#ededef;--onink:#0a0a0b;
--g-top:#ffffff10;--g-bot:#ffffff07;--g-lens:#00000030;--g-rimtop:#ffffff10;--g-rimbot:#ffffff05;--g-rimside:#ffffff00;--g-sh1:#00000066;--g-sh2:#00000099;--tint:55%;--tint-r:16%}
*{box-sizing:border-box}:host{display:block;color:var(--text);font-family:"RM Geist",system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-align:left;line-height:normal;letter-spacing:normal}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}svg{display:block}
.hdr{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:22px;height:66px;padding:0 28px;background:var(--card);border-bottom:1px solid var(--line)}
.logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#1aa0b8,#1d4f8f);display:grid;place-items:center;font-size:13px;color:#fff}
.brand{font-size:13px;font-weight:500;letter-spacing:.3px}
.hsearch{width:240px;height:34px;border-radius:10px;background:var(--soft);display:flex;align-items:center;gap:8px;padding:0 12px;font-size:13px;color:var(--muted)}
.nav{display:flex;gap:14px;margin:0 auto}.nav span{width:36px;height:36px;border-radius:50%;display:grid;place-items:center}.nav svg{width:18px;height:18px}
.rt{display:flex;align-items:center;gap:16px;font-size:13px}.av{width:34px;height:34px;border-radius:50%;background:var(--ink);color:var(--onink);display:grid;place-items:center;font-size:12px}
.tt{width:44px;height:24px;border-radius:99px;background:var(--soft);position:relative;box-shadow:inset 0 1px 2px #0002}.tt i{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--white);box-shadow:0 1px 2px #0003;transition:transform .25s}:host([data-theme=dark]) .tt i{transform:translateX(20px)}
.shell{display:grid;grid-template-columns:245px minmax(0,1fr);gap:20px;padding:20px 28px 60px 22px}
aside.side{position:sticky;top:86px;align-self:start}
.seg{display:flex;background:var(--soft);border-radius:99px;padding:3px;margin:0 22px 18px 24px}.seg button{flex:1;padding:8px 0;border-radius:99px;font-size:12px;color:var(--muted)}.seg .on{background:var(--white);color:var(--text);box-shadow:0 1px 3px #0000001a}
.menu a{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;font-size:14px;color:var(--muted)}.menu a.on{background:var(--soft);color:var(--text)}.menu svg{width:16px;height:16px;flex:none}
.menu b{margin-left:auto;font-weight:400;font-size:11px;min-width:20px;height:20px;padding:0 6px;border-radius:99px;display:grid;place-items:center;background:var(--ink);color:var(--onink)}
.chip{--tone:var(--c,var(--muted));position:relative;isolation:isolate;display:inline-flex;align-items:center;gap:5px;font-size:11px;line-height:1;padding:4px 8px 4px 7px;border-radius:99px;color:var(--text);white-space:nowrap;flex:none;
background:linear-gradient(90deg,var(--g-lens) 0,transparent 14px),linear-gradient(180deg,var(--g-top),var(--g-bot));box-shadow:0 1px 1px var(--g-sh1),0 1px 4px -1px var(--g-sh2)}
.chip::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;z-index:-1;background:linear-gradient(180deg,var(--g-rimtop) 0%,var(--g-rimtop) 14%,transparent 36%,transparent 68%,var(--g-rimbot) 92%),linear-gradient(90deg,color-mix(in srgb,var(--tone) var(--tint),transparent) 0%,color-mix(in srgb,var(--tone) 20%,transparent) 14%,var(--g-rimside) 32%,var(--g-rimside) 74%,color-mix(in srgb,var(--tone) var(--tint-r),transparent) 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.chip i{width:5px;height:5px;border-radius:50%;background:var(--tone)}
.c-red{--c:var(--red)}.c-or{--c:var(--orange)}.c-bl{--c:var(--blue)}.c-gr{--c:var(--green)}
aside.side{position:sticky;top:86px;align-self:start}
.menu a{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;font-size:14px;color:var(--muted)}.menu a.on{background:var(--soft);color:var(--text)}.menu svg{width:16px;height:16px;flex:none}
.menu b{margin-left:auto;font-weight:400;font-size:11px;min-width:20px;height:20px;padding:0 6px;border-radius:99px;display:grid;place-items:center;background:var(--ink);color:var(--onink)}
main{min-width:0;display:flex;flex-direction:column;gap:18px}
.n{font-variant-numeric:tabular-nums}
.mono{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;color:var(--muted)}
.ph{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.ph>div:first-child{flex:1;min-width:0}
.ph h1{margin:0;font-size:32px;font-weight:400;letter-spacing:-.6px}
.ph .sub{font-size:14px;color:var(--muted);margin-top:6px}
.donecard{margin-left:auto;display:flex;align-items:center;gap:14px;padding:10px 18px 10px 10px;border-radius:20px;background:var(--card);box-shadow:inset 0 0 0 1px #0000000a,0 1px 2px #0000000a}
:host([data-theme=dark]) .donecard{box-shadow:inset 0 0 0 1px #ffffff0f}
.dring{position:relative;width:52px;height:52px}
.dring svg{width:52px;height:52px;transform:rotate(-90deg)}
.dring .trk{fill:none;stroke:var(--line);stroke-width:5}
.dring .arc{fill:none;stroke:var(--green);stroke-width:5;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:calc(100 - var(--p));transition:stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)}
.dring b{position:absolute;inset:0;display:grid;place-items:center;font-weight:400;color:var(--green)}
.dring b svg{width:18px;height:18px;transform:none}
.donecard .big{font-size:24px;letter-spacing:-.6px;line-height:1}
.donecard .big small{font-size:14px;color:var(--muted);letter-spacing:0}
.donecard .lb{font-size:12.5px;color:var(--muted);margin-top:4px}
.band{border-radius:26px;position:relative;overflow:hidden;color:#fff;padding:24px 28px 22px;
background:radial-gradient(120% 120% at 80% 0%,#2a7cff 0%,#0d4fd6 40%,#0a3aa8 70%,#3f86ff 100%),#0d4fd6;box-shadow:0 18px 40px -26px #0a3aa8}
.band .top{display:flex;align-items:flex-start;gap:24px;justify-content:space-between;flex-wrap:wrap}
.focus .k{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#ffffffd9}
.focus .k i{width:8px;height:8px;border-radius:50%;background:#ff8aa5;box-shadow:0 0 0 4px #ff8aa533;animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{50%{box-shadow:0 0 0 8px #ff8aa500}}
.focus h2{margin:10px 0 6px;font-size:26px;font-weight:400;letter-spacing:-.4px}
.focus p{margin:0;font-size:14px;color:#ffffffd0}
.focus .acts{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.wbtn{background:#fff;color:#0d3fae;border-radius:99px;padding:9px 16px;font-size:13.5px;font-weight:500;display:inline-flex;gap:8px;align-items:center}
.wbtn svg{width:14px;height:14px}
.gbtn{border-radius:99px;padding:9px 16px;font-size:13.5px;color:#fff;background:#ffffff1f;box-shadow:inset 0 0 0 1px #ffffff40}
.statg{display:flex;gap:10px}
.sbox{border-radius:18px;padding:12px 16px;min-width:118px;background:linear-gradient(180deg,#ffffff2e,#ffffff14);box-shadow:inset 0 1px 0 #ffffff59,inset 0 0 0 1px #ffffff26}
.sbox b{display:block;font-weight:400;font-size:26px;letter-spacing:-.6px;line-height:1.05}
.sbox span{font-size:12px;color:#ffffffd0}
.flow{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:22px}
.flow:before{content:"";position:absolute;left:13px;right:13px;top:13px;height:2px;background:#ffffff40}
.fn{position:relative;text-align:left;color:#fff;padding:0 10px 0 0;display:grid;gap:4px;justify-items:start}
.fn .dot{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:12.5px;background:#0d4fd6;box-shadow:inset 0 0 0 2px #ffffff80;position:relative;z-index:1;transition:transform .2s,background .2s,box-shadow .2s}
.fn.hot .dot{background:#ff5d7d;box-shadow:inset 0 0 0 2px #ffffffb0,0 0 0 4px #ff5d7d40}
.fn.zero{opacity:.55}
.fn .t{font-size:13.5px;margin-top:6px}
.fn .d{font-size:12px;color:#ffffffbf}
.fn:hover .dot{transform:scale(1.08)}
.fn[aria-pressed=true] .dot{background:#fff;color:#0d3fae;box-shadow:0 0 0 5px #ffffff40}
.fn[aria-pressed=true] .t{font-weight:500}
.wk{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:18px;align-items:start;scroll-margin-top:84px}
.card{background:var(--card);border-radius:24px;box-shadow:inset 0 0 0 1px #0000000a,0 1px 2px #0000000a;padding:20px 22px;min-width:0;position:relative}
:host([data-theme=dark]) .card{box-shadow:inset 0 0 0 1px #ffffff0f}
.ch{display:flex;align-items:center;gap:12px;margin-bottom:6px;flex-wrap:wrap}
.ch h3{margin:0;font-size:20px;font-weight:400;letter-spacing:-.2px;display:flex;align-items:center;gap:10px;margin-right:auto}
.ch h3 small{font-size:13px;color:var(--muted)}
.find{width:230px;height:38px;border-radius:12px;background:var(--white);box-shadow:inset 0 0 0 1px var(--line);display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--muted);font-size:13.5px}
.find input{border:0;background:none;outline:0;font:inherit;color:var(--text);width:100%}
.flt{display:flex;align-items:center;gap:8px;margin:10px 0 2px;padding:8px 8px 8px 14px;border-radius:12px;background:var(--soft);font-size:13px}
.flt button{margin-left:auto;font-size:12.5px;padding:5px 12px;border-radius:99px;background:var(--white);box-shadow:0 1px 2px #0000001a}
.gh{display:flex;align-items:center;gap:8px;margin:18px 4px 6px;font-size:12.5px;color:var(--muted)}
.gh i{width:8px;height:8px;border-radius:50%;background:var(--c)}
.gh b{font-weight:400;color:var(--text)}
.it{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:14px;align-items:center;padding:14px 12px;border-radius:16px;cursor:pointer;position:relative;transition:background .15s,box-shadow .2s}
.it+.it:before{content:"";position:absolute;left:62px;right:12px;top:0;height:1px;background:var(--line)}
.it:hover{background:color-mix(in srgb,var(--text) 4%,transparent)}
.it.sel{background:var(--white);box-shadow:0 1px 2px #0000000f,0 10px 24px -16px #0005}
.it.sel:before,.it.sel+.it:before{display:none}
.it.sel:after{content:"";position:absolute;left:-1px;top:16px;bottom:16px;width:3px;border-radius:0 3px 3px 0;background:var(--text)}
.ty{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--soft);color:var(--muted)}
.ty svg{width:17px;height:17px}
.t1{font-size:15px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;line-height:1.3}
.t2{font-size:12.5px;color:var(--muted);margin-top:4px}
.t2 .due{margin-left:2px}
.due.late{color:var(--red)}.due.soon{color:var(--orange)}
.right{display:flex;align-items:center;gap:10px}
.qbtn{font-size:12.5px;padding:7px 14px;border-radius:99px;color:var(--text);white-space:nowrap;background:linear-gradient(90deg,var(--g-lens) 0,transparent 16px),linear-gradient(180deg,var(--g-top),var(--g-bot));box-shadow:0 1px 1px var(--g-sh1),0 2px 6px -2px var(--g-sh2),inset 0 0 0 1px var(--g-rimside),inset 0 1px 0 var(--g-rimtop);transition:transform .15s}
.qbtn:hover{transform:translateY(-1px)}
.mini{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:10.5px;background:color-mix(in srgb,var(--text) 10%,var(--card));color:var(--text);flex:none;box-shadow:0 0 0 2px var(--card)}
.mini.none{background:transparent;box-shadow:inset 0 0 0 1.5px var(--faint);color:var(--faint);font-size:15px}
.it.sel .mini{box-shadow:0 0 0 2px var(--white)}
.empty{padding:36px 16px;text-align:center;color:var(--muted);font-size:13.5px}.empty b{display:block;color:var(--text);font-weight:400;font-size:17px;margin-bottom:4px}
.donehd{display:flex;align-items:center;gap:10px;width:100%;margin-top:16px;padding:12px 14px;border-radius:14px;font-size:13.5px;color:var(--muted);background:var(--soft)}
.donehd .ok{width:22px;height:22px;border-radius:50%;background:var(--green);color:#fff;display:grid;place-items:center;font-size:11px}
.donehd svg{width:14px;height:14px;margin-left:auto;transition:transform .2s}.donehd[aria-expanded=true] svg{transform:rotate(180deg)}
.donel{display:grid;padding:6px 4px 2px}
.donel div{display:grid;grid-template-columns:26px 1fr auto;gap:10px;align-items:center;padding:8px;font-size:13px;color:var(--muted)}
.donel .mini{width:26px;height:26px;font-size:9.5px;box-shadow:none}
.pane{padding:0;display:flex;flex-direction:column}
.pane.stick{position:sticky;top:86px}
.pane.swap .pin{animation:swap .35s cubic-bezier(.2,.8,.2,1)}
@keyframes swap{from{opacity:0;transform:translateX(16px)}}
.pin{display:flex;flex-direction:column}
.hd{padding:22px 24px 18px;border-bottom:1px solid var(--line);display:grid;gap:10px}
.back{display:none;align-items:center;gap:6px;font-size:13px;color:var(--muted);justify-self:start}
.back svg{width:14px;height:14px}
.hd .k{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted)}
.hd .k .ty{width:26px;height:26px;border-radius:8px}.hd .k .ty svg{width:14px;height:14px}
.hd h2{margin:0;font-size:25px;font-weight:400;letter-spacing:-.4px;line-height:1.2}
.meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13.5px;color:var(--muted)}
.meta .sep{width:3px;height:3px;border-radius:50%;background:var(--faint)}
.hrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px}
.ownb{position:relative;margin-right:auto}
.ownb>button{display:flex;align-items:center;gap:8px;padding:3px 12px 3px 3px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);font-size:13.5px;background:var(--white)}
.ownb .mini{width:28px;height:28px;font-size:10px;box-shadow:none}
.ownb small{color:var(--muted);font-size:12px}
.ownb svg{width:12px;height:12px;color:var(--muted)}
.pop{position:absolute;left:0;top:40px;z-index:30;width:260px;padding:6px;border-radius:16px;background:var(--white);box-shadow:0 0 0 1px #0000000f,0 16px 34px -12px #0005;display:none}
.pop.on{display:block;animation:pop .16s ease}@keyframes pop{from{opacity:0;transform:translateY(-4px)}}
.pop small{display:block;padding:6px 8px 4px;color:var(--muted);font-size:11.5px}
.pop button{display:flex;align-items:center;gap:10px;width:100%;padding:8px;border-radius:12px;font-size:13.5px;text-align:left}.pop button:hover{background:var(--soft)}
.pop .mini{width:28px;height:28px;box-shadow:none}.pop em{font-style:normal;margin-left:auto;font-size:12px;color:var(--muted)}
.pop span small{display:block;padding:0;font-size:11.5px}
.btn{font-size:14px;padding:10px 18px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);background:var(--white);white-space:nowrap;display:inline-flex;align-items:center;gap:8px}
.btn.pri{background:var(--ink);color:var(--onink);box-shadow:none}.btn svg{width:15px;height:15px}
.where{margin:0;font-size:12.5px;color:var(--muted)}
.pb{padding:20px 24px 24px;display:grid;gap:24px}
.sec h4{margin:0 0 12px;font-size:12.5px;font-weight:400;color:var(--muted);display:flex;align-items:center;gap:8px}
.sec h4 em{font-style:normal;margin-left:auto}
.steps{position:relative;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr))}
.steps:before{content:"";position:absolute;left:11px;right:calc(100% / var(--n) - 11px);top:11px;height:2px;background:var(--line)}
.steps .prog{position:absolute;left:11px;top:11px;height:2px;background:var(--green);width:var(--w);transition:width .9s cubic-bezier(.2,.8,.2,1)}
.st{position:relative;padding-right:8px}
.st .b{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--card);box-shadow:inset 0 0 0 2px var(--line);position:relative;z-index:1}
.st.done .b{background:var(--green);box-shadow:none;color:#fff}.st.done .b svg{width:12px;height:12px}
.st.now .b{box-shadow:inset 0 0 0 2px var(--blue),0 0 0 4px color-mix(in srgb,var(--blue) 18%,transparent)}.st.now .b:after{content:"";width:8px;height:8px;border-radius:50%;background:var(--blue)}
.st.wait .b{box-shadow:inset 0 0 0 2px var(--orange),0 0 0 4px color-mix(in srgb,var(--orange) 18%,transparent)}.st.wait .b:after{content:"";width:8px;height:8px;border-radius:50%;background:var(--orange)}
.st span{display:block;font-size:12px;color:var(--muted);margin-top:8px;line-height:1.3}
.st.now span,.st.wait span{color:var(--text)}
.relb{display:grid;grid-template-columns:128px minmax(0,1fr);gap:20px;align-items:start}
.cover{width:128px;height:128px;border-radius:16px;background:var(--cv);box-shadow:0 14px 28px -14px #0007;display:grid;place-items:end start;padding:10px;color:#fff;font-size:12px;text-shadow:0 1px 4px #0006}
.facts{display:grid;grid-template-columns:auto 1fr;gap:9px 18px;font-size:14px}.facts span{color:var(--muted)}.facts b{font-weight:400}
.tracks{display:grid;gap:4px}
.tr{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:12px;align-items:center;padding:9px 12px;border-radius:12px;font-size:14px;background:var(--soft)}
.tr .num{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;color:var(--muted);background:var(--white)}
.tr small{color:var(--muted);font-size:12.5px}
.checks{display:grid;gap:8px}
.ck{display:flex;align-items:center;gap:12px;font-size:14px;padding:11px 14px;border-radius:14px;background:var(--soft)}
.ck b{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-weight:500;font-size:12px;flex:none;color:#fff;background:var(--green)}
.ck.warn b{background:var(--orange)}.ck.bad b{background:var(--red)}
.ck small{margin-left:auto;color:var(--muted);font-size:12.5px;text-align:right}
.tbl{width:100%;border-collapse:collapse;font-size:14px}
.tbl th{text-align:left;font-weight:400;font-size:12px;color:var(--muted);padding:0 10px 8px}
.tbl td{padding:12px 10px;border-top:1px solid var(--line)}
.tbl .r{text-align:right;font-variant-numeric:tabular-nums}.tbl tfoot td{font-weight:500}
.old{color:var(--muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--red) 60%,transparent)}
.new{background:color-mix(in srgb,var(--green) 14%,transparent);padding:2px 7px;border-radius:7px}
.fine{margin:10px 0 0;font-size:12.5px;color:var(--muted)}
.docs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.doc{border-radius:14px;padding:10px;background:var(--soft);display:grid;gap:8px;font-size:12.5px}
.doc .pv{height:80px;border-radius:10px;background:repeating-linear-gradient(135deg,color-mix(in srgb,var(--text) 6%,transparent) 0 8px,transparent 8px 16px),var(--white);display:grid;place-items:center;color:var(--muted);font-size:11px}
.doc small{color:var(--muted)}
.cash{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;background:color-mix(in srgb,var(--green) 10%,transparent);font-size:14px;margin-top:12px}
.cash b{font-weight:400;font-size:21px;margin-left:auto;font-variant-numeric:tabular-nums}
.thread{display:grid;gap:10px}
.bub{max-width:86%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.45;background:var(--soft)}
.bub small{display:block;color:var(--muted);font-size:11.5px;margin-top:4px}
.bub.me{justify-self:end;background:var(--ink);color:var(--onink);border-bottom-right-radius:6px}.bub.me small{color:color-mix(in srgb,var(--onink) 60%,transparent)}
.bub.them{border-bottom-left-radius:6px}
.hist{display:grid;gap:12px;font-size:13.5px}.hist div{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start}.hist .mini{width:26px;height:26px;font-size:9.5px;box-shadow:none}.hist small{color:var(--muted)}
.toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,10px);background:var(--ink);color:var(--onink);font-size:13.5px;padding:11px 18px;border-radius:12px;opacity:0;transition:.2s;z-index:50;pointer-events:none;max-width:calc(100vw - 32px)}
.toast.on{opacity:1;transform:translate(-50%,0)}
.rv{opacity:0;transform:translateY(14px)}
.rv.in{opacity:1;transform:none;transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1)}
.rv.in .it{animation:itin .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 35ms)}
@keyframes itin{from{opacity:0;transform:translateY(6px)}}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none}.rv.in .it,.pane.swap .pin,.focus .k i{animation:none}}
.nb{position:absolute;top:-9px;left:-9px;width:22px;height:22px;border-radius:50%;background:#ff4d6a;color:#fff;font-size:11px;display:grid;place-items:center;font-weight:500;box-shadow:0 2px 6px #ff4d6a66;z-index:3}
.rl{position:relative}
.ncard{background:var(--card);border-radius:22px;padding:22px 24px;border:1px dashed #ff4d6a66}
.ncard h3{font-size:16px;font-weight:500;margin:0 0 14px}
.nl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 28px;font-size:13.5px;line-height:1.55}
.nl div{display:flex;gap:10px}.nl i{font-style:normal;flex:none;width:20px;height:20px;border-radius:50%;background:#ff4d6a;color:#fff;font-size:11px;display:grid;place-items:center;margin-top:2px}.nl span{color:var(--muted)}
.vt{width:100%;border-collapse:collapse;font-size:13px;margin-top:18px}.vt th{text-align:left;font-weight:500;font-size:12px;color:var(--muted);padding:8px 10px;border-bottom:1px solid var(--line)}.vt td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
.v{display:inline-block;font-size:11.5px;padding:2px 8px;border-radius:99px;white-space:nowrap}.v.k{background:color-mix(in srgb,var(--green) 15%,transparent)}.v.h{background:color-mix(in srgb,var(--red) 15%,transparent)}.v.m{background:color-mix(in srgb,var(--blue) 15%,transparent)}.v.b{background:color-mix(in srgb,var(--orange) 18%,transparent)}
.ctl{position:fixed;left:18px;bottom:18px;z-index:40}.ctl button{background:var(--ink);color:var(--onink);border-radius:99px;padding:9px 14px;font-size:12px;box-shadow:0 6px 18px -6px #0006}
@media (max-width:1240px){
.wk{grid-template-columns:minmax(0,1fr)}
.wk .pane{display:none}.wk.reading .list{display:none}.wk.reading .pane{display:flex}
.back{display:flex}.pane.stick{position:static}
}
@media (max-width:1100px){.band .statg{display:none}}
@media (max-width:820px){
.shell{grid-template-columns:1fr!important;padding:14px 16px 70px!important}aside.side{display:none}
.hdr{gap:12px!important;padding:0 14px!important}.hsearch,.nav,.brand{display:none!important}.rt{margin-left:auto}
.donecard{margin-left:0;width:100%}.band{padding:20px 18px}.focus h2{font-size:22px}
.flow{overflow-x:auto;grid-template-columns:repeat(5,minmax(96px,1fr));scrollbar-width:none;padding-bottom:4px}
.find{width:100%}.it{grid-template-columns:32px minmax(0,1fr) auto;gap:10px;padding:12px 8px}.it .qbtn{display:none}
.relb{grid-template-columns:1fr}.docs{grid-template-columns:1fr 1fr}.nl{grid-template-columns:1fr}.vt{display:block;overflow-x:auto}
.hd,.pb{padding-left:16px;padding-right:16px}
}
.tabsx{display:flex;gap:4px;background:var(--soft);border-radius:99px;padding:4px;align-self:flex-start;box-shadow:inset 0 1px 2px #0000000f}
.tabsx button{font-size:14px;padding:9px 18px;border-radius:99px;color:var(--muted);display:flex;align-items:center;gap:8px}
.tabsx button b{font-weight:400;font-size:12px;min-width:22px;height:20px;padding:0 6px;border-radius:99px;display:grid;place-items:center;background:color-mix(in srgb,var(--text) 8%,transparent)}
.tabsx button[aria-pressed=true]{background:var(--white);color:var(--text);box-shadow:0 1px 3px #0000001a}
.tabsx button.hot b{background:var(--red);color:#fff}
.lav{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;color:#fff;font-size:13px;flex:none;background:linear-gradient(135deg,hsl(var(--h) 65% 55%),hsl(calc(var(--h) + 35) 60% 38%))}
.lav.big{width:64px;height:64px;border-radius:18px;font-size:20px;box-shadow:0 12px 24px -14px #0007}
.it{grid-template-columns:40px minmax(0,1fr) auto}
.vb{display:inline-grid;place-items:center;width:16px;height:16px;border-radius:50%;background:#2d96e9;color:#fff;font-size:9px;flex:none}
.plan{font-size:10.5px;letter-spacing:.4px;padding:3px 8px;border-radius:7px;color:#fff;font-weight:500;flex:none}
.plan.BASIC{background:#5b6b7f}.plan.STUDIO{background:#1d7a52}.plan.PRO{background:#2459c4}.plan.BUSINESS{background:#5b2ca8}.plan.FLEX{background:#8a8f98}
.why{font-size:12.5px;color:var(--red);margin-top:4px}
.why.o{color:var(--orange)}
.rgt{display:flex;align-items:center;gap:8px;justify-content:flex-end;flex-wrap:wrap}
.stats4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.stats4>div{border-radius:14px;padding:12px 14px;background:var(--soft)}
.stats4 b{display:block;font-weight:400;font-size:20px;letter-spacing:-.4px}
.stats4 span{font-size:12px;color:var(--muted)}
.attn{display:grid;gap:8px}
.attn>div{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--red) 8%,transparent);font-size:14px}
.attn>div.o{background:color-mix(in srgb,var(--orange) 10%,transparent)}
.attn>div i{width:8px;height:8px;border-radius:50%;background:var(--red);flex:none}.attn>div.o i{background:var(--orange)}
.attn>div button{margin-left:auto}
.sbtn{font-size:13px;padding:8px 14px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);background:var(--white);white-space:nowrap}
.sbtn.dan{color:var(--red)}
.sbtns{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.note{font-size:12.5px;color:var(--muted);margin:10px 0 0}
.bank{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;background:var(--soft)}
.bank .bi{width:40px;height:40px;border-radius:12px;background:var(--white);display:grid;place-items:center;font-size:11px;color:var(--muted);flex:none}
.bank b{font-weight:400;display:block}.bank small{color:var(--muted);font-size:12.5px}
.bank .chip{margin-left:auto}
.subl{display:grid;gap:6px}
.subl>div{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--soft);font-size:13.5px}
.subl .lav{width:28px;height:28px;border-radius:8px;font-size:10px}
.subl small{margin-left:auto;color:var(--muted);font-size:12px}
.tl{display:grid;gap:0}
.tl>div{display:grid;grid-template-columns:26px 1fr;gap:10px;position:relative;padding-bottom:14px;font-size:13.5px}
.tl>div:before{content:"";position:absolute;left:12px;top:24px;bottom:0;width:2px;background:var(--line)}.tl>div:last-child:before{display:none}
.tl .mini{width:26px;height:26px;font-size:9.5px;box-shadow:none}
.tl small{display:block;color:var(--muted);font-size:12px;margin-top:2px}
.cmp{display:grid;grid-template-columns:1fr 28px 1fr;gap:10px;align-items:center}
.cmp>div{border-radius:14px;padding:12px 14px;background:var(--soft);font-size:14px;min-width:0}
.cmp>div small{display:block;color:var(--muted);font-size:12px;margin-bottom:4px}
.cmp>div.nw{background:color-mix(in srgb,var(--green) 12%,transparent)}
.cmp>svg{width:18px;height:18px;color:var(--muted);justify-self:center}
.minis{display:flex;gap:4px;margin-top:8px}
.minis i{flex:1;height:5px;border-radius:99px;background:var(--line);max-width:44px}.minis i.d{background:var(--green)}.minis i.n{background:var(--blue)}
.ck b.no{background:var(--faint)}
.decide{display:flex;gap:8px;flex-wrap:wrap}
.it.out{opacity:0;transform:translateX(-24px);transition:opacity .3s,transform .3s}
@media (max-width:820px){.stats4{grid-template-columns:1fr 1fr}.tabsx{width:100%;overflow-x:auto}.tabsx button{padding:8px 12px;white-space:nowrap}.cmp{grid-template-columns:1fr}.cmp>svg{transform:rotate(90deg)}}
.it.sel{background:color-mix(in srgb,var(--text) 6%,transparent)!important;box-shadow:none!important}
.it.sel:after{left:0!important}
.st.now .b:before{content:"";position:absolute;inset:-4px;border-radius:50%;box-shadow:0 0 0 2px color-mix(in srgb,var(--blue) 45%,transparent);animation:beat 2.2s ease-out infinite}
@keyframes beat{0%{transform:scale(.85);opacity:.9}70%,100%{transform:scale(1.55);opacity:0}}
@keyframes rise{from{opacity:0;transform:translateY(14px)}}
@keyframes popn{from{opacity:0;transform:scale(.4)}}
@keyframes grow{from{width:0}}
.pane.play .hd>*{animation:rise .5s cubic-bezier(.2,.8,.2,1) both}
.pane.play .hd>:nth-child(2){animation-delay:.04s}.pane.play .hd>:nth-child(3){animation-delay:.08s}.pane.play .hd>:nth-child(4){animation-delay:.12s}.pane.play .hd>:nth-child(5){animation-delay:.16s}
.pane.play .sec{animation:rise .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(.18s + var(--k) * 70ms)}
.pane.play .prog{animation:grow 1s cubic-bezier(.2,.8,.2,1) .35s both}
.pane.play .st .b{animation:popn .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(.25s + var(--j) * .12s)}
.pane.play .lav.big{animation:popn .6s cubic-bezier(.3,1.5,.5,1) .05s both}
.pane.play .stats4>div{animation:rise .5s ease both}.pane.play .stats4>div:nth-child(2){animation-delay:.25s}.pane.play .stats4>div:nth-child(3){animation-delay:.3s}.pane.play .stats4>div:nth-child(4){animation-delay:.35s}
.pane.play .cmp .nw{animation:mark 1.2s ease .6s both}
@keyframes mark{from{background:color-mix(in srgb,var(--green) 40%,transparent)}}
@media (prefers-reduced-motion:reduce){.pane.play *{animation:none!important}.st.now .b:before{animation:none}}
.sbtn{display:inline-flex;align-items:center;gap:8px}.sbtn svg{width:14px;height:14px;flex:none}
.stats4{grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}
.nb,.ncard,.ctl,.mockbar{display:none!important}
.m137>main{gap:18px}
.pane.stick{top:var(--m137-top,96px)}
.wk{scroll-margin-top:96px}
.toast{z-index:1000}
.band,.ibstrip{color:#111113!important;background:var(--card)!important;border:0!important;border-radius:24px!important;box-shadow:inset 0 0 0 1px #0000000a!important}
.focus .k,.ibstrip .k{color:#5f5f67!important}
.focus .k i,.ibstrip .k i{--kp:rgba(17,17,19,.16);background:#111113!important;box-shadow:0 0 0 3px var(--kp);animation:pulse145 2.4s ease-in-out infinite}
@keyframes pulse145{50%{box-shadow:0 0 0 7px transparent}}
@media (prefers-reduced-motion:reduce){.focus .k i,.ibstrip .k i{animation:none}}
.focus h2{color:#111113!important}
.focus p,.ibstrip span{color:#55555d!important}
.band .wbtn,.band .lbtn{background:#111113!important;color:#fff!important}
.band .gbtn{background:#fff!important;color:#111113!important;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)!important}
.band .sbox{background:var(--soft)!important;box-shadow:none!important}
.band .sbox span{color:#63636b!important}
.band .flow:before{background:rgba(0,0,0,.1)!important}
.band .fn{color:#111113!important}
.band .fn .d{color:#6b6b73!important}
.band .fn .dot{background:#fff!important;color:#111113!important;box-shadow:inset 0 0 0 1.5px rgba(0,0,0,.2)!important}
.band .fn.hot .dot{background:var(--red)!important;color:#fff!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--red) 16%,transparent)!important}
.band .fn.hot.act .dot{background:var(--orange)!important;color:#111113!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--orange) 16%,transparent)!important}
.band .fn.hot.wait .dot{background:var(--blue)!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--blue) 16%,transparent)!important}
.band .fn[aria-pressed=true] .dot{background:#111113!important;color:#fff!important;box-shadow:0 0 0 5px rgba(17,17,19,.1)!important}
.band .fn.hot[aria-pressed=true] .dot{box-shadow:0 0 0 2px var(--card),0 0 0 4px #111113!important}
.band .eq{background:var(--soft)!important;box-shadow:none!important}
.band .eq small{color:#63636b!important}
.band .eq i{color:#66666e!important}
.ibstrip .pills button{background:#fff!important;color:#111113!important;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)!important}
.ibstrip .pills button b{color:#6b6b73!important}
.ibstrip .pills button[aria-pressed=true]{background:#111113!important;color:#fff!important;box-shadow:none!important}
.ibstrip .pills button[aria-pressed=true] b{color:rgba(255,255,255,.72)!important}
:host([data-theme=dark]) .band,:host([data-theme=dark]) .ibstrip{color:#fff!important;background:var(--card)!important;border:0!important;box-shadow:none!important}
:host([data-theme=dark]) .focus .k,:host([data-theme=dark]) .ibstrip .k{color:rgba(255,255,255,.7)!important}
:host([data-theme=dark]) .focus .k i,:host([data-theme=dark]) .ibstrip .k i{--kp:rgba(255,255,255,.2);background:#fff!important}
:host([data-theme=dark]) .focus h2{color:#fff!important}
:host([data-theme=dark]) .focus p,:host([data-theme=dark]) .ibstrip span{color:rgba(255,255,255,.76)!important}
:host([data-theme=dark]) .band .wbtn,:host([data-theme=dark]) .band .lbtn{background:#fff!important;color:#111113!important}
:host([data-theme=dark]) .band .gbtn{background:rgba(255,255,255,.1)!important;color:#fff!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)!important}
:host([data-theme=dark]) .band .sbox{background:var(--soft)!important;box-shadow:none!important}
:host([data-theme=dark]) .band .sbox span{color:rgba(255,255,255,.7)!important}
:host([data-theme=dark]) .band .flow:before{background:rgba(255,255,255,.16)!important}
:host([data-theme=dark]) .band .fn{color:#fff!important}
:host([data-theme=dark]) .band .fn .d{color:rgba(255,255,255,.64)!important}
:host([data-theme=dark]) .band .fn .dot{background:#1c1c1f!important;color:#fff!important;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.3)!important}
:host([data-theme=dark]) .band .fn.hot .dot{background:var(--red)!important;color:#111113!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--red) 22%,transparent)!important}
:host([data-theme=dark]) .band .fn.hot.act .dot{background:var(--orange)!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--orange) 22%,transparent)!important}
:host([data-theme=dark]) .band .fn.hot.wait .dot{background:var(--blue)!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--blue) 22%,transparent)!important}
:host([data-theme=dark]) .band .fn[aria-pressed=true] .dot{background:#fff!important;color:#111113!important;box-shadow:0 0 0 5px rgba(255,255,255,.14)!important}
:host([data-theme=dark]) .band .fn.hot[aria-pressed=true] .dot{box-shadow:0 0 0 2px var(--card),0 0 0 4px #fff!important}
:host([data-theme=dark]) .band .eq{background:var(--soft)!important;box-shadow:none!important}
:host([data-theme=dark]) .band .eq small{color:rgba(255,255,255,.7)!important}
:host([data-theme=dark]) .band .eq i{color:rgba(255,255,255,.55)!important}
:host([data-theme=dark]) .ibstrip .pills button{background:var(--soft)!important;color:#fff!important;box-shadow:none!important}
:host([data-theme=dark]) .ibstrip .pills button b{color:rgba(255,255,255,.66)!important}
:host([data-theme=dark]) .ibstrip .pills button[aria-pressed=true]{background:#fff!important;color:#111113!important}
:host([data-theme=dark]) .ibstrip .pills button[aria-pressed=true] b{color:#55555d!important}
:host([data-theme=dark]) .card,:host([data-theme=dark]) .pc.pc{box-shadow:none}
.nextc:not(.ok):not(.mute){background:var(--soft);box-shadow:none}`;
function sheet137(text){try{const s=new CSSStyleSheet();s.replaceSync(text);return s;}catch(err){return null;}}
function page137(def){M137.defs.push(def);if(def.stub)def.stub();}
const active137=()=>M137.defs.find(d=>{try{return d.when();}catch(err){return false;}});
function host137(def){
  let h=M137.hosts[def.id];
  if(!h){
    h=document.createElement('div');h.className='m137-host';h.dataset.m137=def.id;
    const root=h.attachShadow({mode:'open'});
    const base=M137.base||(M137.base=sheet137(BASE137)),own=sheet137(def.css||'');
    if(base&&own&&'adoptedStyleSheets' in root)root.adoptedStyleSheets=[base,own];
    else root.innerHTML=`<style>${BASE137}\n${def.css||''}</style>`;
    const box=document.createElement('div');box.className='m137';box.innerHTML=def.html;
    /* simpan teks tetap (asli bahasa Indonesia) untuk diterjemahkan saat bahasa berganti */
    def._static=[];const tw=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);for(let n=tw.nextNode();n;n=tw.nextNode())if(n.nodeValue.trim())def._static.push([n,null,n.nodeValue]);
    box.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>['placeholder','title','aria-label'].forEach(k=>{if(el.hasAttribute(k))def._static.push([el,k,el.getAttribute(k)]);}));const tst=document.createElement('div');tst.className='toast';tst.id='toast';tst.setAttribute('role','status');tst.setAttribute('aria-live','polite');root.append(box,tst);
    // Ketikan di kolom isian halaman baru tidak boleh memicu pintasan global prototipe.
    h.addEventListener('keydown',e=>{const t=e.composedPath()[0];if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))e.stopPropagation();});
    M137.hosts[def.id]=h;def.root=root;def.host=h;
    try{def.init(root,h);}catch(err){console.warn('m137 init',def.id,err);}
  }
  h.dataset.theme=document.documentElement.dataset.theme==='dark'?'dark':'light';
  return h;
}
/* Navigasi ke menu lain lewat tombol menu asli, supaya semua efek samping prototipe tetap berlaku. */
const NAV137={home:'[data-control126=home]',inbox:'[data-control126=inbox]',finance:'[data-control126=finance]',staff:'[data-control126=access]',settings:'[data-control126=settings]',work:'.side-scroll [data-page="mywork9"]',labels:'.side-scroll [data-page="labels9"]',standards:'.side-scroll [data-page="standards9"],[data-u11="standards"]',royalty:'.side-scroll [data-id="analytics"]',transactions:'.side-scroll [data-id="payments"]'};
function go137(id,then){
  const el=document.querySelector(NAV137[id]||`.side-scroll [data-id="${id}"]`);
  if(el){el.click();if(then)requestAnimationFrame(()=>then());return true;}
  return false;
}
function lang137(def){const l=en137()?'en':'id';if(def._lang===l)return;def._lang=l;const map=def.i18n||{};
  for(const [n,attr,id] of def._static||[]){const k=id.trim(),v=l==='en'&&map[k]?id.replace(k,map[k]):id;if(attr)n.setAttribute(attr,v);else if(n.nodeValue!==v)n.nodeValue=v;}
  def.host?.setAttribute('lang',l);}
function toast137(def,text){const el=def.root?.getElementById('toast');if(!el)return;el.textContent=text;el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2800);}
const renderBefore137=render;
render=function(){
  // Prototipe menggambar ulang #main (juga tiap menit karena jam simulasi). Halaman baru dipindah ulang ke #main,
  // jadi fokus, posisi ketik, dan posisi gulir dikembalikan seperti semula.
  const before=active137(),a=before?.root?.activeElement,keep=before?{el:a,s:a?.selectionStart,e:a?.selectionEnd,y:scrollY}:null;
  const out=renderBefore137.apply(this,arguments);
  try{
    const main=document.querySelector('#main'),def=active137();
    document.body.classList.toggle('m137-on',!!def);
    if(def&&main){
      const h=host137(def);
      if(main.lastElementChild!==h||[...main.children].some(c=>c!==h&&!c.classList.contains('maint-banner131')))main.replaceChildren(h);
      // Banner pemeliharaan biasanya menempel pada judul halaman lama; di halaman baru taruh di atas isi.
      document.querySelectorAll('.maint-banner131').forEach(b=>{if(!main.contains(b))main.insertBefore(b,h);});
      main.classList.add('m137-main');
      lang137(def);
      def.draw();
      if(keep&&def===before){
        if(Math.abs(scrollY-keep.y)>2)scrollTo({top:keep.y,behavior:'instant'});
        if(keep.el&&keep.el.isConnected&&def.root.activeElement!==keep.el){keep.el.focus({preventScroll:true});try{if(keep.s!=null)keep.el.setSelectionRange(keep.s,keep.e);}catch(err){}}
      }
    }else main?.classList.remove('m137-main');
  }catch(err){console.warn('m137',err);}
  return out;
};
new MutationObserver(()=>{const t=document.documentElement.dataset.theme==='dark'?'dark':'light';Object.values(M137.hosts).forEach(h=>h.dataset.theme=t);}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
/* Alat bersama untuk halaman baru: waktu WIB, kalender kerja & aturan waktu dari Pengaturan › Prosedur. */
const U137=(()=>{const H=3600000;
  const iso16=ms=>ms?new Date(Number(ms)+7*H).toISOString().slice(0,16):'';
  const isoDay=ms=>iso16(ms).slice(0,10);
  const policy=()=>{try{return typeof policy115==='function'?policy115():null;}catch(err){return null;}};
  const cal=()=>{const c=policy()?.calendar||{};return {days:c.days||[1,2,3,4,5],holidays:c.holidays||[]};};
  const isWork=(d,c)=>c.days.includes(new Date(d+'T00:00:00Z').getUTCDay())&&!c.holidays.includes(d);
  const addDay=(d,n)=>{const t=new Date(d+'T00:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10);};
  const addWork=(d,n,c=cal())=>{let x=d,k=n;while(k>0){x=addDay(x,1);if(isWork(x,c))k--;}return x;};
  const workDiff=(from,to,c=cal())=>{if(from===to)return 0;const dir=to>from?1:-1;let d=from,k=0;while(d!==to){d=addDay(d,dir);if(isWork(d,c))k++;}return dir*Math.max(1,k);};
  const en=()=>state.lang==='en';
  const rule=(id,fb)=>{const r=(policy()?.rules||[]).find(x=>x.id===id),fn=Array.isArray(fb[0])?fb[0][en()?1:0]:fb[0];return {name:r?(Array.isArray(r.name)?(r.name[en()?1:0]||r.name[0]):r.name):fn,mode:r?.mode||fb[1],value:Number(r?.value??fb[2])};};
  /* nama bulan & hari, angka, rupiah — selalu baca bahasa saat dipanggil (jangan disalin ke konstanta modul) */
  const MS={id:['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
  const MF={id:['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
  const DY={id:['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
  const L=()=>en()?'en':'id';
  const mon=i=>MS[L()][i],month=i=>MF[L()][i],dayName=i=>DY[L()][i];
  const monthP=p=>{if(!p)return '';const [y,m]=String(p).split('-').map(Number);return `${MF[L()][m-1]} ${y}`;};
  const hm=s=>en()?String(s).slice(0,5):String(s).slice(0,5).replace(':','.');
  const dlabel=iso=>{const t=new Date(String(iso).slice(0,10)+'T00:00:00Z');return `${dayName(t.getUTCDay())}, ${t.getUTCDate()} ${mon(t.getUTCMonth())}`;};
  const today=()=>day();
  const todayLabel=()=>{const t=new Date(day()+'T00:00:00Z');return `${dayName(t.getUTCDay())}, ${t.getUTCDate()} ${mon(t.getUTCMonth())} ${t.getUTCFullYear()}`;};
  const fd=s=>{if(!s)return en()?'Just now':'Baru saja';const [y,m,d]=s.slice(0,10).split('-').map(Number);return `${d} ${mon(m-1)} ${y}`+(s.length>10?` · ${hm(s.slice(11,16))}`:'');};
  const loc=()=>en()?'en-US':'id-ID';
  const num=(n,d=0)=>Number(n||0).toLocaleString(loc(),{maximumFractionDigits:d});
  const rp=n=>(n<0?'−':'')+'Rp '+Math.round(Math.abs(n||0)).toLocaleString(loc());
  const rps=n=>{const a=Math.abs(n||0),s=n<0?'−':'';return a>=1e9?`${s}Rp ${num(a/1e9,2)}${en()?'B':' M'}`:a>=1e6?`${s}Rp ${num(a/1e6,1)}${en()?'M':' jt'}`:s+rp(a);};
  return {iso16,isoDay,policy,cal,isWork,addDay,addWork,workDiff,rule,get MON(){return MS[L()];},get DAY(){return DY[L()];},get MONTHS(){return MF[L()];},mon,month,dayName,monthP,hm,dlabel,today,todayLabel,fd,loc,num,rp,rps,en};})();
