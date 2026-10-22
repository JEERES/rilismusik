/* v1.1.0-dev.31 — Layanan Tambahan dirancang ulang + Registrasi WAMI digabung (rancangan disetujui 21 Okt 2026, mock lt1).
   Tab Dalam proses · Selesai, pita alur Perlu diperiksa → Menunggu bahan → Sedang dikerjakan → Menunggu tanggapan → Penyelesaian,
   pil per layanan + WAMI, rincian di samping dengan satu langkah berikutnya per tahap. Menu Registrasi WAMI tidak lagi di sidebar.
   Data & tindakan: ten.addons111 (act111 → Addons111.act) dan ten.wami11 (act11 → Wami11.act), fungsi asli prototipe,
   jadi Transaksi, paket, label, dan Pekerjaan ikut berubah. Pengajuan WAMI satu rilisan (satu rekaman per lagu) tampil satu baris. */
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
.songs{display:grid;gap:6px}
.sg{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:12px;align-items:center;padding:10px 12px;border-radius:14px;background:var(--white);font-size:14px}
.sg .num{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:12px;color:var(--muted);background:var(--soft)}
.sgt{display:grid;gap:2px;min-width:0}.sgt small{font-size:11px}
.sgr{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}.sgr small{font-size:11px}
.sgin{font:inherit;font-size:13px;width:150px;padding:7px 10px;border-radius:10px;border:0;box-shadow:inset 0 0 0 1px var(--line);background:var(--card);color:var(--text);outline:0}
.sgin:focus{box-shadow:inset 0 0 0 2px var(--blue)}
.ck2{font-size:12.5px;padding:7px 12px;border-radius:99px;background:var(--soft);color:var(--text)}
.ck2.on{background:color-mix(in srgb,var(--green) 18%,transparent)}
.draft{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;background:var(--white);font-size:14px}
.draft span:not(.ty){display:grid;gap:2px;min-width:0}.draft b{font-weight:400;overflow-wrap:anywhere}.draft small{color:var(--muted);font-size:12px}
.draft .lnk{margin-left:auto;font-size:13px}
.hrow.mini2 .btn{font-size:12.5px;padding:6px 10px}
@media (max-width:600px){.sg{grid-template-columns:28px minmax(0,1fr)}.sg>:last-child{grid-column:2;justify-self:start}.sgin{width:130px}}
.tg2{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted);margin:8px 0 2px}
.tg2 input{width:16px;height:16px;accent-color:var(--blue)}
.reveal .f2{grid-template-columns:minmax(0,1fr)}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Layanan Tambahan</h1><div class="sub">Kerjakan pesanan jasa label sampai hasilnya diterima: Konten Promosi, Video Visualizer, Smart Link, dan Registrasi WAMI.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,O=[],lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>'),FILE=sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>');
const ICON={promo:sv('<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.6"/><path d="m20 15-4.5-4.5L6 20"/>'),visualizer:sv('<rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2z"/>'),smartlink:sv('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),wami:sv('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),other:sv('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd,rp=n=>'Rp '+Math.round(Number(n)||0).toLocaleString('id-ID');
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const pname=id=>people.find(p=>p.id===id)?.name||'';
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':'Staf']]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="Belum ada petugas">–</span>`;};
const isSA=()=>!!me().super;
const wide=()=>innerWidth>1240;
/* tahap tampilan: status asli → [label, nada, kelompok alur] */
const ST={queued:['Perlu diperiksa','c-bl','check'],materials:['Menunggu bahan label','c-or','mat'],correction:['Perlu perbaikan','c-or','mat'],working:['Sedang dikerjakan','c-bl','work'],review:['Sedang diperiksa','c-bl','work'],preparing:['Persiapan pendaftaran','c-bl','work'],revision:['Revisi diminta','c-or','work'],response:['Menunggu tanggapan label','c-bl','wait'],waiting:['Menunggu WAMI','c-bl','wait'],resolution:['Penyelesaian · perlu Super Admin','c-red','res'],done:['Selesai','c-gr','done'],closed:['Ditutup','','done']};
const FLOW=[['check','Perlu diperiksa'],['mat','Menunggu bahan'],['work','Sedang dikerjakan'],['wait','Menunggu tanggapan'],['res','Penyelesaian']];
const S={tab:'proc',stage:null,svc:'all',q:'',sel:{},read:false,form:null,ck:{},rv:'',offer:'refund'};
/* ---------- data asli ---------- */
const safe=f=>{try{return f()||[];}catch(err){return [];}};
const txOf=o=>safe(()=>(typeof Transactions113==='object'?Transactions113.init(ten).orders:ten.commerce113?.orders||[])).find(t=>t.sourceKey===o);
function addonRow(o,mem){const m=mem[o.member]||mem[o.owner]||{},svc=o.service||{},kind=['promo','visualizer','smartlink'].includes(svc.id)?svc.id:'other';
 const tx=txOf('addon:'+o.id),hist=(o.history||[]).map(h=>[U.iso16(h.at),(typeof events111==='object'&&events111[h.action])||h.action,people.some(p=>p.id===h.actor)?ini(h.actor):'L',h.note||'',h.public!==false]);
 let dueMs=0;if(o.status==='working')dueMs=o.due;else if(o.status==='queued')dueMs=safe(()=>[Addons111.addHours?.(o.at,4,calendar11())])[0]||0;else if(o.status==='resolution'){const b=U.isoDay(o.progress||o.at);dueMs=Date.parse(U.addDay(b,1)+'T09:00:00+07:00');}
 const dueDate=dueMs?U.isoDay(dueMs):'',pay=o.payment==='benefit'||o.payment==='benefit_pending'||o.payment==='benefit_restored'?`Termasuk paket ${o.benefit||''}`.trim():o.amount?rp(o.amount):'—';
 return {id:o.id,kind,isW:false,svcName:svc.name||'Layanan',raw:o.status,st:o.status,title:o.title||'—',artist:o.artist||'',lab:m.name||o.owner,member:o.member||o.owner,release:o.release,handler:o.handler||'',h:ini(o.handler),ver:o.version,
  created:U.iso16(o.at),done:U.iso16(o.acceptedAt||o.closedAt||(['done','closed'].includes(o.status)?o.progress:0)),dueDate,due:dueDate?U.workDiff(U.today(),dueDate):null,dueMs,
  payTxt:pay,payment:o.payment,amount:o.amount||0,refunded:o.refunded||0,tx:tx?.id||'',brief:o.brief||'',need:o.message||'',internal:o.internal||'',draft:o.draft||null,deliveries:o.deliveries||[],revUsed:o.revisions||0,revMax:svc.revisions??1,
  revisionPending:o.revisionPending||null,reason:o.resolutionReason||'',offer:o.offer||null,result:svc.result||'',needs:svc.needs||'',hours:svc.hours||0,hist,songs:null,orders:[o]};}
const wSong=o=>o.status==='done'?'done':o.status==='correction'?'fix':o.status==='waiting'?'wait':o.status==='preparing'?'ok':'';
const WORDER=['queued','review','correction','preparing','waiting','done'];
function wamiRows(list,mem){const g={};for(const o of list){const k=o.member+'|'+o.release+'|'+Math.round((o.created||0)/60000);(g[k]||(g[k]=[])).push(o);}
 return Object.values(g).map(os=>{os.sort((a,b)=>String(a.id).localeCompare(String(b.id)));const o=os[0],m=mem[o.member]||{};
  const st=WORDER.find(s=>os.some(x=>x.status===s))||'done';
  const evs=[];for(const x of os)for(const e of x.events||[])evs.push([U.iso16(e.at),((typeof event11==='object'&&event11[e.action])||e.action)+(os.length>1&&!['submitted'].includes(e.action)?` · ${x.title}`:''),people.some(p=>p.id===e.actor)?ini(e.actor):'L',e.note||'',e.public!==false]);
  evs.sort((a,b)=>a[0].localeCompare(b[0]));const hist=evs.filter((v,i)=>!evs.slice(0,i).some(w=>w[0]===v[0]&&w[1].split(' · ')[0]===v[1].split(' · ')[0]&&os.length>1&&/^Pengajuan dibuat/.test(v[1])));
  let dueMs=0;try{const ms=os.filter(x=>x.status===st).map(x=>deadline115({source:'wami',o:x},x.systemStage115||policy115())).filter(Boolean);dueMs=ms.length?Math.min(...ms):0;}catch(err){}
  const dueDate=dueMs?U.isoDay(dueMs):'',tx=txOf('wami:'+o.id),corr=os.find(x=>x.status==='correction');
  return {id:o.id,kind:'wami',isW:true,svcName:'Registrasi WAMI',raw:st,st,title:o.releaseTitle||o.title,artist:o.artist||'',lab:m.name||o.account,member:o.member,release:o.release,handler:o.handler||'',h:ini(o.handler),ver:os.map(x=>x.version).join('.'),
   created:U.iso16(o.created),done:U.iso16(Math.max(...os.map(x=>x.completed||x.progress||0))),dueDate,due:dueDate?U.workDiff(U.today(),dueDate):null,dueMs,target:corr?.target||'',
   payTxt:o.amount?`${rp(os.reduce((n,x)=>n+(x.amount||0),0))}`:`Termasuk paket ${o.benefit||''}`.trim(),tx:tx?.id||'',need:corr?.message||'',internal:os.map(x=>x.internal).filter(Boolean).join(' · '),
   web:os.every(x=>x.web),documents:os.every(x=>x.documents),next:os.map(x=>x.nextFollowup).filter(Boolean).sort()[0]||0,
   result:'Lagu tercatat di WAMI dengan nomor registrasi',needs:'Data pencipta sesuai KTP, ISRC, dan pernyataan hak.',hist,
   songs:os.map(x=>({id:x.id,t:x.title,isrc:x.isrc||'',s:wSong(x),raw:x.status,no:x.reference||'',composer:x.composer||''})),orders:os};});}
function load(){const mem=Object.fromEntries((ten.members||[]).map(m=>[m.id,m]));
 const a=safe(()=>typeof orders111==='function'?orders111():[]).filter(o=>o.status!=='unpaid').map(o=>addonRow(o,mem));
 const w=wamiRows(safe(()=>typeof orders11==='function'?orders11():[]).filter(o=>o.status!=='unpaid'),mem);
 O=[...a,...w];}
/* ---------- izin ---------- */
const PERM_A={claim:'claim',start:'handle',materials:'request',obstacle:'handle',resolution:'handle','draft-result':'finish','send-result':'finish','review-revision':'handle',offer:'handle',refund:'handle'};
const PERM_W={start:'claim',ready:'handle',correction:'request',web:'send',documents:'send',accepted:'finish',followup:'send','staff-fixed':'handle',obstacle:'handle'};
function can(o,a){if(['offer','refund','assign'].includes(a)&&!isSA())return false;
 if(!['claim','start'].includes(a)&&o.handler&&o.handler!==state.user&&!isSA())return false;
 if(a==='start'&&!o.isW&&o.handler&&o.handler!==state.user&&!isSA())return false;
 try{return typeof may114!=='function'||may114(o.isW?'wami':'services',(o.isW?PERM_W:PERM_A)[a]||'handle',o.member);}catch(err){return true;}}
/* ---------- tampilan (port dari mock lt1) ---------- */
const grp=o=>ST[o.st]?.[2]||'work';
const isOpen=o=>grp(o)!=='done';
const dueChip=o=>o.due==null?'':o.due<0?chip(`Terlambat ${-o.due} hari`,'c-red'):o.due===0?chip(o.dueMs&&o.dueMs<ten.now?'Lewat tenggat':'Hari ini',o.dueMs&&o.dueMs<ten.now?'c-red':'c-or'):`<span class="duet">${U.dlabel(o.dueDate)}</span>`;
const match=o=>!S.q||[o.id,o.title,o.artist,o.lab,o.svcName,...(o.songs||[]).map(s=>s.t+' '+s.isrc)].join(' ').toLowerCase().includes(S.q);
function items(){let r=O.filter(o=>(S.tab==='proc')===isOpen(o)).filter(match);if(S.svc!=='all')r=r.filter(o=>o.kind===S.svc);if(S.tab==='proc'&&S.stage)r=r.filter(o=>grp(o)===S.stage);const g=FLOW.map(f=>f[0]);
 return S.tab==='proc'?r.sort((a,b)=>(a.st==='resolution'?-1:0)-(b.st==='resolution'?-1:0)||g.indexOf(grp(a))-g.indexOf(grp(b))||(a.dueMs||9e15)-(b.dueMs||9e15)):r.sort((a,b)=>String(b.done).localeCompare(String(a.done)));}
function tabs(){$('tabs').innerHTML=[['proc','Dalam proses',O.filter(isOpen).length],['done','Selesai',O.filter(o=>!isOpen(o)).length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=O.filter(isOpen),late=P.filter(o=>o.dueMs&&o.dueMs<ten.now).length,res=P.filter(o=>o.st==='resolution').length,wsongs=P.filter(o=>o.isW).reduce((n,o)=>n+o.songs.filter(s=>s.s!=='done').length,0),inc=P.filter(o=>/^Termasuk/.test(o.payTxt)).length;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Layanan Tambahan · hari ini ${U.todayLabel()}</div><h2>${P.length?`${P.length} pesanan berjalan`:'Tidak ada pesanan berjalan'}</h2>
  <p>${late} lewat tenggat · ${res} menunggu keputusan Super Admin · WAMI: ${wsongs} lagu belum punya nomor</p>
  <div class="acts">${P.length?`<button class="wbtn" data-urgent>Buka yang berikutnya ${ARROW}</button>`:''}<button class="gbtn" data-go="settings">Katalog & harga</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${inc}</b><span>termasuk paket</span></div><div class="sbox"><b class="n">${P.length-inc}</b><span>dibayar</span></div></div></div>
  <div class="flow">${FLOW.map(([k,t])=>{const g=P.filter(o=>grp(o)===k),l=g.filter(o=>(o.dueMs&&o.dueMs<ten.now)||o.st==='resolution').length;return `<button class="fn${l?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${k==='wait'?(g.length?g.map(o=>o.isW?'WAMI':'label').filter((v,i,a)=>a.indexOf(v)===i).join(' · '):'kosong'):l?l+(k==='res'?' perlu keputusan':' terlambat'):g.length?'tepat waktu':'kosong'}</span></button>`;}).join('')}</div>`;}
function pills(){const cat=safe(()=>Addons111.init(ten).catalogue).filter(c=>c.active!==false);const list=[['all','Semua'],...cat.filter(c=>['promo','visualizer','smartlink'].includes(c.id)).map(c=>[c.id,c.name]),...(cat.some(c=>!['promo','visualizer','smartlink'].includes(c.id))?[['other','Layanan lain']]:[]),['wami','WAMI']];return list;}
function list(){const r=items();let h='';const base=O.filter(o=>(S.tab==='proc')===isOpen(o)).filter(match),cnt=k=>k==='all'?base.length:base.filter(o=>o.kind===k).length;
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari rilisan, lagu, label, nomor" value="${E(S.q)}"></label>`;
 h+=`<div class="ch"><h3>${S.tab==='proc'?'Dalam proses':'Selesai'} <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${pills().map(([k,t])=>`<button data-svc="${k}" aria-pressed="${S.svc===k}">${E(t)}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
 if(S.stage&&S.tab==='proc')h+=`<div class="flt"><span>Hanya <b style="font-weight:500">${FLOW.find(f=>f[0]===S.stage)[1]}</b></span><button data-stage-clear>Tampilkan semua</button></div>`;
 let cur='';r.forEach((o,i)=>{const g=S.tab==='proc'?(o.st==='resolution'?'res':grp(o)):'done';if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${{check:'blue',mat:'orange',work:'blue',wait:'blue',res:'red',done:'green'}[g]})"></i><b>${g==='done'?'Selesai':FLOW.find(f=>f[0]===g)[1]}</b> · ${r.filter(x=>(S.tab==='proc'?(x.st==='resolution'?'res':grp(x)):'done')===g).length}</div>`;}
  const songs=o.isW?` · ${o.songs.length} lagu`:'';
  h+=`<div class="it${S.sel[S.tab]===o.id?' sel':''}" data-id="${E(o.id)}" style="--i:${i}"><span class="ty">${ICON[o.kind]||ICON.other}</span><div style="min-width:0"><div class="t1">${E(o.title)} ${chip(ST[o.st]?.[0]||o.st,ST[o.st]?.[1]||'')}</div><div class="t2">${E(o.svcName)}${songs} · ${E(o.lab)} · <span class="mono">${E(o.id)}</span></div></div><div class="rgt">${S.tab==='proc'?dueChip(o)+mini(o.h):`<span class="duet">${fd(String(o.done).slice(0,10))}</span>`}</div></div>`;});
 if(!r.length)h+=`<div class="empty"><b>Tidak ada pesanan</b>${S.q||S.svc!=='all'||S.stage?'Coba ubah pencarian atau pil layanan.':S.tab==='proc'?'Pesanan layanan & pengajuan WAMI dari label muncul di sini setelah dibayar.':'Belum ada pesanan selesai.'}</div>`;
 $('list').innerHTML=h;}
/* ---------- langkah berikutnya ---------- */
const reveal=(label,ph,doName,doLabel,cls='pri',extra='')=>`<div class="reveal"><label class="fld">${label}<textarea id="f-note" placeholder="${ph}"></textarea></label>${extra}<div class="hrow">${btn(doLabel,`data-do="${doName}"`,cls)}${btn('Batal','data-form=""')}</div></div>`;
const small=o=>S.form==='mat'?reveal('Bahan yang perlu dilengkapi label','Mis. kirim arahan teks dan warna utama','ask-mat','Minta kelengkapan'):S.form==='obs'?reveal('Kendala · hanya petugas','Mis. audio rusak di detik 1:42','obstacle','Catat kendala','pri',`<p class="where">Usulkan penyelesaian bila pesanan tidak bisa dikerjakan sesuai janji.</p>`)+`<div class="hrow mini2">${btn('Usulkan penyelesaian ke Super Admin','data-do="propose"','ghost')}</div>`:`<div class="hrow mini2">${can(o,'materials')&&['queued','working'].includes(o.raw)?btn('Minta kelengkapan','data-form="mat"','ghost'):''}${can(o,'obstacle')?btn('Catat kendala','data-form="obs"','ghost'):''}</div>`;
function songRows(o,mode){const ck=S.ck[o.id]||{};return `<div class="songs">${o.songs.map((s,i)=>`<div class="sg"><span class="num">${i+1}</span><span class="sgt">${E(s.t)}<small class="mono">${E(s.isrc||'ISRC belum ada')}${s.composer?` · ${E(s.composer)}`:''}</small></span>${s.s==='done'?`<span class="sgr">${chip('Terdaftar','c-gr')}<small class="mono">${E(s.no)}</small></span>`:s.s==='fix'?chip('Perlu perbaikan','c-or'):s.s==='wait'?(mode==='wno'&&can(o,'accepted')?`<span class="sgr"><input class="sgin" id="wn-${i}" placeholder="Nomor WAMI"><button class="btn sm" data-wno="${i}">Catat</button></span>`:chip('Menunggu WAMI','c-bl')):s.s==='ok'?chip('Data sesuai','c-gr'):(mode==='check'&&s.raw==='review'?`<button class="ck2${ck[i]?' on':''}" data-sck="${i}">${ck[i]?'✓ Sesuai':'Tandai sesuai'}</button>`:chip(s.raw==='queued'?'Belum diperiksa':'Sedang diperiksa',''))}</div>`).join('')}</div>`;}
function next(o){const w=o.isW;
 if(o.st==='resolution'){const off=o.offer;const money=o.payment==='paid'&&o.amount>0;
  if(o.payment==='refund_pending')return `<div class="nextc"><p>Label menyetujui pengembalian ${rp(o.amount-o.refunded)}. Uangnya diproses di <b>Transaksi › Pengembalian</b>.</p><div class="hrow">${btn('Buka Transaksi '+ARROW,'data-go="transactions"','pri')}</div></div>`;
  if(o.payment==='benefit_pending')return `<div class="nextc"><p>Label menyetujui pengembalian benefit paket. Pesanan berikutnya untuk layanan & rilisan yang sama kembali gratis.</p><div class="hrow">${can(o,'refund')?btn('Kembalikan benefit paket','data-do="refund"','pri'):''}</div></div>`;
  if(off)return `<div class="nextc"><p>Usulan penyelesaian sudah dikirim ke label: <b>${{refund:'pengembalian',schedule:'jadwal baru',replacement:'pengganti',addition:'pesanan tambahan'}[off.kind]||off.kind}</b>${off.amount?` ${rp(off.amount)}`:''}. Menunggu jawaban label.</p>${off.note?`<p class="quote">${E(off.note)}</p>`:''}</div>`;
  if(!isSA())return `<div class="nextc"><p><b>${E(pname(o.handler)||'Petugas')}</b> mengusulkan penyelesaian. Menunggu keputusan Super Admin.</p><p class="quote">${E(o.reason)}</p></div>`;
  const form=S.form==='offer'?`<div class="reveal"><div class="opts">${[['refund',money?'Pengembalian uang':'Kembalikan benefit','label menyetujui, lalu diproses'],['schedule','Jadwal baru','pengerjaan berlanjut']].map(([k,t,m])=>`<button data-offer="${k}" aria-pressed="${S.offer===k}">${t}<small>${m}</small></button>`).join('')}</div>${S.offer==='refund'?(money?`<label class="fld">Jumlah dikembalikan<input id="f-amt" value="${o.amount-o.refunded}"></label>`:''):`<label class="fld">Tenggat baru<input id="f-due" type="date" value="${U.addWork(U.today(),3)}"></label>`}<label class="fld">Penjelasan untuk label<textarea id="f-note">${E(o.reason)}</textarea></label><div class="hrow">${btn('Kirim usulan ke label','data-do="offer"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p><b>${E(pname(o.handler)||'Petugas')}</b> mengusulkan penyelesaian:</p><p class="quote">${E(o.reason)}</p>${S.form?'':`<div class="hrow">${btn('Putuskan penyelesaian '+ARROW,'data-form="offer"','pri')}</div>`}${form}<p class="where">Label menyetujui usulan dari sisi label; uang dikembalikan lewat Transaksi › Pengembalian. Keputusan ini hanya oleh Super Admin.</p></div>`;}
 if(o.st==='queued'&&!w)return `<div class="nextc"><p>Pesanan baru. ${E(o.brief)}</p><div class="checks"><div class="ck"><b>✓</b>Bahan dari katalog<small>${E(o.title)}</small></div><div class="ck${o.brief?'':' warn'}"><b>${o.brief?'✓':'!'}</b>Arahan dari label<small>${o.brief?'terisi':'belum ada'}</small></div></div><div class="hrow">${can(o,'start')?btn('Mulai pengerjaan '+ARROW,'data-do="start"','pri'):''}</div><p class="where">Menekan Mulai pengerjaan menjadikanmu petugasnya; tenggat ${o.hours} jam kerja.</p>${small(o)}</div>`;
 if(o.st==='queued'&&w)return `<div class="nextc"><p>Pengajuan baru ${o.songs.length} lagu. Mulai pemeriksaan data pencipta, ISRC, dan pernyataan hak.</p><div class="hrow">${can(o,'start')?btn('Mulai pemeriksaan '+ARROW,'data-do="w-start"','pri'):''}</div><p class="where">Menekan Mulai pemeriksaan menjadikanmu petugasnya.</p></div>`;
 if(o.st==='review'){const ck=S.ck[o.id]||{},rev=o.songs.map((s,i)=>s.raw!=='review'||ck[i]),all=rev.every(Boolean);
  return `<div class="nextc"><p>Periksa tiap lagu: pencipta sesuai KTP, ISRC benar, pernyataan hak ada.</p>${songRows(o,'check')}<div class="hrow">${can(o,'ready')?btn('Siap didaftarkan','data-do="w-ready"','pri',!all):''}${can(o,'correction')&&!S.form?btn('Minta perbaikan','data-form="fix"'):''}</div>${S.form==='fix'?reveal('Yang perlu diperbaiki label','Mis. nama pencipta belum sesuai KTP','w-fix','Kirim ke label'):''}</div>`;}
 if(o.st==='materials'||o.st==='correction'){const staffFix=w&&o.target==='staff';
  return `<div class="nextc"><p>${staffFix?'Perbaikan oleh petugas':w?'Menunggu perbaikan dari label':'Menunggu bahan dari label'}.</p>${o.need?`<p class="quote">${E(o.need)}</p>`:''}${w?songRows(o,''):''}<p class="where">${staffFix?'Catat bila perbaikan sudah dilakukan.':'Pengingat otomatis ke label berjalan; tahap lanjut otomatis saat label mengirim kelengkapan.'}</p>${staffFix&&can(o,'staff-fixed')?(S.form==='sfix'?reveal('Yang sudah diperbaiki','Mis. ISRC dikoreksi','w-sfix','Simpan & periksa lagi'):`<div class="hrow">${btn('Perbaikan selesai · periksa lagi','data-form="sfix"','pri')}</div>`):''}</div>`;}
 if(o.st==='working'||o.st==='revision'){const rv=o.st==='revision',d=o.draft;
  if(rv)return `<div class="nextc"><p>Label meminta revisi (${o.revUsed} dari ${o.revMax} jatah dipakai):</p>${o.revisionPending?.note?`<p class="quote">${E(o.revisionPending.note)}</p>`:''}${can(o,'review-revision')?`<div class="opts">${[['included','Pakai jatah revisi','sisa '+Math.max(0,o.revMax-o.revUsed)],['error','Kesalahan petugas','tidak mengurangi jatah'],['scope','Di luar cakupan','jadi penyelesaian']].map(([k,t,m])=>`<button data-rv="${k}" aria-pressed="${S.rv===k}">${t}<small>${m}</small></button>`).join('')}</div>${S.rv?`<label class="fld">Catatan untuk label<textarea id="f-note"></textarea></label><div class="hrow">${btn('Simpan keputusan','data-do="review-rev"','pri')}</div>`:''}`:''}</div>`;
  const draftBox=d?`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(d.file?.name||d.url||'Draf hasil')}</b><small>Draf · hanya petugas yang bisa melihat</small></span>${can(o,'draft-result')?'<button class="lnk" data-form="draft">Ganti</button>':''}</div><div class="hrow">${can(o,'send-result')?btn('Kirim ke label '+ARROW,'data-do="send"','pri'):''}</div>`:`<div class="hrow">${can(o,'draft-result')?btn('Simpan draf hasil','data-form="draft"','pri'):''}</div>`;
  const draftForm=S.form==='draft'?`<div class="reveal"><label class="fld">Tautan hasil (https)<input id="f-url" placeholder="https://drive.google.com/…" value="${E(d?.url||'')}"></label><label class="fld">Catatan · hanya petugas<textarea id="f-note">${E(d?.note||'')}</textarea></label><div class="hrow">${btn('Simpan draf','data-do="draft"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>Sedang dikerjakan.${o.dueMs?` Tenggat ${fd(U.iso16(o.dueMs))}.`:''}</p>${S.form==='draft'?'':draftBox}${draftForm}<p class="where">Yang dijanjikan: ${E(o.result)}.</p>${small(o)}</div>`;}
 if(o.st==='preparing'){const web=o.web,doc=o.documents;return `<div class="nextc"><p>Dua langkah pengiriman ke WAMI.</p><div class="checks"><div class="ck${web?'':' todo'}"><b>${web?'✓':''}</b>1 · Pendaftaran dikirim lewat portal WAMI<small>${o.songs.length} lagu</small></div><div class="ck${doc?'':' todo'}"><b>${doc?'✓':''}</b>2 · Dokumen pendukung dikirim<small>pernyataan hak & KTP pencipta</small></div></div><div class="hrow">${!web&&can(o,'web')?btn('Tandai pendaftaran terkirim','data-do="w-web"','pri'):''}${web&&!doc&&can(o,'documents')?btn('Tandai dokumen terkirim','data-do="w-doc"','pri'):''}</div></div>`;}
 if(o.st==='waiting'){const left=o.songs.filter(x=>x.s!=='done').length,late=o.dueMs&&o.dueMs<ten.now;
  return `<div class="nextc"><p>Dikirim ke WAMI. ${left} lagu belum punya nomor.${late?' Sudah lewat jadwal tindak lanjut — tanyakan ke WAMI.':''}</p>${songRows(o,'wno')}<div class="hrow">${can(o,'followup')&&!S.form?btn('Catat tindak lanjut ke WAMI','data-form="wfu"',late?'pri':''):''}</div>${S.form==='wfu'?`<div class="reveal"><label class="fld">Catatan tindak lanjut<textarea id="f-note" placeholder="Mis. sudah ditanyakan lewat email"></textarea></label><label class="fld">Periksa lagi pada<input id="f-next" type="date" value="${U.addWork(U.today(),2)}"></label><div class="hrow">${btn('Simpan','data-do="w-followup"','pri')}${btn('Batal','data-form=""')}</div></div>`:''}</div>`;}
 if(o.st==='response'){const last=o.deliveries[o.deliveries.length-1];return `<div class="nextc"><p>Hasil dikirim${last?.sent?` ${fd(U.iso16(last.sent))}`:''}. Menunggu label menerima atau minta revisi (sisa ${Math.max(0,o.revMax-o.revUsed)} revisi).</p>${last?`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(last.file?.name||last.url||'Hasil')}</b><small>Terlihat oleh label</small></span></div>`:''}<p class="where">Pengingat otomatis ke label 24 dan 48 jam; di 72 jam menjadi tindak lanjut petugas.</p></div>`;}
 if(o.st==='done'||o.st==='closed')return `<div class="nextc ok"><p>${o.st==='closed'?'Ditutup':'Selesai'} ${fd(o.done)}.${o.payment==='refunded'?` Biaya dikembalikan ${rp(o.refunded)}.`:o.payment==='benefit_restored'?' Benefit paket dikembalikan.':''}</p>${w?songRows(o,''):''}</div>`;
 return `<div class="nextc mute"><p>${ST[o.st]?.[0]||o.st}.</p></div>`;}
function steps(o){const w=o.isW,L=w?['Diperiksa','Persiapan','Dikirim ke WAMI','Terdaftar']:['Pesanan','Pengerjaan','Hasil','Diterima'];
 const at=w?{queued:0,review:0,correction:0,preparing:1,waiting:2,done:4}[o.st]:{queued:0,materials:1,working:1,revision:1,resolution:1,response:2,done:4,closed:1}[o.st];const wait=['materials','correction','revision','resolution'].includes(o.st);
 return `<div class="steps" style="--n:4"><i class="prog" style="--w:calc(100% * ${Math.min(at??0,3)} / 4)"></i>${L.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function pane(){const o=items().find(x=>x.id===S.sel[S.tab]);if(!o){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>Pilih pesanan</b>Rinciannya tampil di sini.</div>`;return;}
 let i=0;const pay=o.tx?`${E(o.payTxt)} · <button class="lnk" data-go="transactions">${E(o.tx)}</button>`:E(o.payTxt);const St=STAFF();
 const ini2=String(o.lab).split(' ').map(z=>z[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?'Dalam proses':'Selesai'}</button><div class="k"><span class="ty">${ICON[o.kind]||ICON.other}</span>${E(o.svcName)} · <span class="mono">${E(o.id)}</span></div><h2>${E(o.title)}</h2><div class="meta">${E(o.artist)}${o.release?`<span class="sep"></span><button class="lnk" data-rel="${E(o.release)}">Rilisan</button>`:''}<span class="sep"></span>${chip(ST[o.st]?.[0]||o.st,ST[o.st]?.[1]||'')}</div></div>
 <div class="pb">${sec(i++,isOpen(o)?'Langkah berikutnya':'Keadaan',next(o),isOpen(o)?dueChip(o):'')}
 ${sec(i++,'Tahapan',steps(o))}
 ${sec(i++,'Pesanan',`<div class="facts"><span>Label</span><b>${E(o.lab)}</b><span>Biaya</span><b>${pay}</b><span>Petugas</span><b>${o.handler?E(pname(o.handler)):'<span class="noart">belum ada · terisi saat mulai</span>'}</b><span>Masuk</span><b>${fd(o.created)}</b>${isOpen(o)&&o.dueDate?`<span>Tenggat</span><b>${fd(U.iso16(o.dueMs))}${o.isW?' · Persiapan WAMI':` · ${o.hours} jam kerja`}</b>`:''}${!o.isW?`<span>Revisi</span><b>${o.revUsed} dari ${o.revMax} dipakai · kesalahan petugas tidak mengurangi jatah</b>`:''}<span>Yang dijanjikan</span><b>${E(o.result)}</b><span>Bahan</span><b>${E(o.needs)}</b>${o.internal?`<span>Catatan petugas</span><b>${E(o.internal)}</b>`:''}</div>`)}
 ${o.songs&&!['review','waiting','correction','done'].includes(o.st)?sec(i++,'Lagu',songRows(o,''),o.songs.length+' lagu'):''}
 ${sec(i++,'Riwayat',`<div class="hist">${o.hist.slice().reverse().map(([w,x,who,note,pub])=>`<div>${who==='L'?`<span class="mini lbl">${E(ini2)}</span>`:mini(who)}<span>${E(x)}${note?` · ${E(String(note).slice(0,90))}`:''}${pub===false?' <small class="where" style="display:inline">· internal</small>':''}<small style="display:block">${who==='L'?E(o.lab):E(St[who]?.[0]||'Petugas')} · ${fd(w)}</small></span></div>`).join('')||'<p class="where">Belum ada riwayat.</p>'}</div>`)}</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea,#pin select').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(x){toast137(DEF,x);}
function open(id,keepStage){S.sel[S.tab]=id;S.form=null;S.rv='';S.read=true;if(!keepStage)S.stage=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
/* ---------- tindakan: act111 / act11 (fungsi asli) ---------- */
const ver=(id,w)=>(w?Wami11.init(ten).orders:Addons111.init(ten).orders).find(x=>x.id===id)?.version;
function runA(o,k,p={}){const fn=()=>act111(k,{id:o.id,version:ver(o.id,false),...p});typeof atomic10==='function'?atomic10(fn):fn();}
function runW(id,k,p={}){const fn=()=>act11(k,{id,version:ver(id,true),...p});typeof atomic10==='function'?atomic10(fn):fn();}
function act(a,arg){const o=O.find(x=>x.id===S.sel[S.tab]);if(!o)return;let msg='',moved=false;const note=val('f-note');
 try{
  if(a==='start'){if(!o.handler)runA(o,'claim');runA(o,'start',{checked:true});msg='Dimulai · kamu petugasnya';}
  else if(a==='ask-mat'){if(!note){toast('Tulis bahan yang diminta');return;}runA(o,'materials',{note});msg='Permintaan bahan dikirim ke label';}
  else if(a==='obstacle'){if(!note){toast('Tulis kendalanya');return;}runA(o,'obstacle',{note});msg='Kendala dicatat';}
  else if(a==='propose'){const n=note||o.internal||'Pengerjaan tidak dapat diselesaikan sesuai janji.';runA(o,'resolution',{note:n});msg='Penyelesaian diusulkan · menunggu Super Admin';}
  else if(a==='draft'){const url=val('f-url');if(!/^https:\/\//.test(url)){toast('Isi tautan hasil yang diawali https://');return;}runA(o,'draft-result',{url,note,file:null});msg='Draf tersimpan · belum terlihat label';}
  else if(a==='send'){runA(o,'send-result',{checked:true});msg='Hasil dikirim ke label';}
  else if(a==='review-rev'){if(!S.rv){toast('Pilih keputusan revisi');return;}if(!note){toast('Tulis catatan untuk label');return;}runA(o,'review-revision',{kind:S.rv,note});msg=S.rv==='scope'?'Masuk penyelesaian · menunggu Super Admin':'Revisi diterima · lanjut dikerjakan';S.rv='';}
  else if(a==='offer'){if(!note){toast('Tulis penjelasan untuk label');return;}const p={kind:S.offer,note};
   if(S.offer==='refund'){p.amount=o.payment==='paid'&&o.amount>0?Number(String(val('f-amt')).replace(/[^\d]/g,''))||0:0;}
   else{const d=val('f-due');if(!d){toast('Pilih tenggat baru');return;}p.due=Date.parse(d+'T16:00:00+07:00');}
   runA(o,'offer',p);msg='Usulan dikirim · menunggu jawaban label';}
  else if(a==='refund'){runA(o,'refund',{note:'Benefit paket dikembalikan.',checked:true});msg='Benefit paket dikembalikan';moved=true;}
  else if(a==='w-start'){for(const s of o.songs)if(s.raw==='queued')runW(s.id,'start');msg='Pemeriksaan dimulai · kamu petugasnya';}
  else if(a==='w-ready'){for(const s of o.songs)if(s.raw==='review')runW(s.id,'ready',{checked:true});delete S.ck[o.id];msg='Siap didaftarkan · lakukan dua langkah pengiriman';}
  else if(a==='w-fix'){if(!note){toast('Tulis yang perlu diperbaiki');return;}const ck=S.ck[o.id]||{};const ids=o.songs.filter((s,i)=>s.raw==='review'&&!ck[i]).map(s=>s.id);for(const id of (ids.length?ids:o.songs.filter(s=>s.raw==='review').map(s=>s.id)))runW(id,'correction',{target:'label',note});msg='Permintaan perbaikan dikirim ke label';}
  else if(a==='w-sfix'){if(!note){toast('Tulis yang sudah diperbaiki');return;}for(const s of o.songs)if(s.raw==='correction')runW(s.id,'staff-fixed',{note});msg='Perbaikan dicatat · diperiksa lagi';}
  else if(a==='w-web'){for(const s of o.songs)if(s.raw==='preparing')runW(s.id,'web',{checked:true});msg='Pendaftaran ditandai terkirim';}
  else if(a==='w-doc'){for(const s of o.songs)if(s.raw==='preparing')runW(s.id,'documents',{checked:true});msg='Dokumen terkirim · menunggu WAMI';}
  else if(a==='w-followup'){if(!note){toast('Tulis catatan tindak lanjut');return;}const d=val('f-next')||U.addWork(U.today(),2);const next=Date.parse(d+'T09:00:00+07:00');if(!(next>ten.now)){toast('Pilih tanggal setelah hari ini');return;}for(const s of o.songs)if(s.raw==='waiting')runW(s.id,'followup',{note,next});msg=`Tindak lanjut dicatat · periksa lagi ${U.dlabel(d)}`;}
  else if(a==='wno'){const s=o.songs[+arg];const n=val('wn-'+arg);if(!n){toast('Isi nomor WAMI');return;}runW(s.id,'accepted',{note:'Nomor WAMI dicatat.',reference:n,checked:true});msg=`Nomor dicatat untuk ${s.t}`;if(o.songs.filter(x=>x.s!=='done').length===1){msg='Semua lagu terdaftar · selesai';moved=true;}}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;if(S.stage&&!moved)S.stage=null;lastSig='';lastPane='';
 if(moved){load();const r=items();S.sel[S.tab]=r[0]?.id;}
 render();toast(msg);}
function openRelease(id){try{if(typeof ui105==='object'){ui105.view='detail';ui105.id=id;}}catch(err){}if(!go137('releases'))toast('Buka Rilisan');}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.stage=null;paint();return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='proc';S.q='';S.svc='all';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.tab='proc';S.q='';S.svc='all';S.stage=null;const r=items();if(r[0])open(r[0].id);return;}
  const sv2=t.closest('[data-svc]');if(sv2){S.svc=sv2.dataset.svc;paint();return;}
  const sc=t.closest('[data-sck]');if(sc){const id=S.sel[S.tab];const ck=S.ck[id]||(S.ck[id]={});ck[+sc.dataset.sck]=!ck[+sc.dataset.sck];repane();return;}
  const wn=t.closest('[data-wno]');if(wn){act('wno',wn.dataset.wno);return;}
  const rv=t.closest('[data-rv]');if(rv){S.rv=rv.dataset.rv;repane();$('f-note')?.focus();return;}
  const of=t.closest('[data-offer]');if(of){S.offer=of.dataset.offer;repane();return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;repane();(root.querySelector('.reveal input,.reveal textarea'))?.focus();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const rl=t.closest('[data-rel]');if(rl){openRelease(rl.dataset.rel);return;}
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast('Buka menu '+go.dataset.go);return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id,true);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
/* Masuk dari Pekerjaan / notifikasi / Transaksi / Studio: detail111 & detail11 memilih pesanan di halaman baru. */
let pending=null,lastMod='';
function intake(){if(!pending)return;const id=pending;pending=null;load();const o=O.find(x=>x.id===id||(x.songs||[]).some(s=>s.id===id));if(!o)return;
 S.tab=isOpen(o)?'proc':'done';S.stage=null;S.q='';S.svc='all';S.sel[S.tab]=o.id;S.read=true;S.form=null;lastSig='';}
const sig=()=>O.map(o=>[o.id,o.st,o.ver,o.h,o.dueDate,o.payment||''].join(':')).join('|')+'|'+U.today()+'|r:'+ten.role+state.user;
const DEF={id:'addons',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&['addons','wami'].includes(v4.module)&&!state.preview,
 init(r){root=r;bind();},
 draw(){if(v4.module!==lastMod){S.svc=v4.module==='wami'?'wami':'all';S.stage=null;lastMod=v4.module;lastSig='';}intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
const intercept=name=>{if(typeof window[name]!=='function')return;const before=window[name];window[name]=function(id){if(isLabel10()||state.preview)return before.apply(this,arguments);pending=id;if(DEF.when()){lastSig='';render();}else if(!go137('addons'))return before.apply(this,arguments);};};
intercept('detail111');intercept('detail11');
/* Registrasi WAMI bergabung ke Layanan Tambahan: hapus tombolnya dari sidebar staf & Super Admin. */
const renderBefore=render;render=function(){const out=renderBefore.apply(this,arguments);try{if(!isLabel10())document.querySelectorAll('.side-scroll [data-id="wami"]').forEach(el=>el.remove());}catch(err){}return out;};
})();
