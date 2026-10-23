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
const U=U137,fd=U.fd,rp=n=>'Rp '+Math.round(Number(n)||0).toLocaleString(U.loc());
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const pname=id=>people.find(p=>p.id===id)?.name||'';
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':$t('Staf','Staff')]]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="${$t('Belum ada petugas','Unassigned')}">–</span>`;};
const isSA=()=>!!me().super;
const wide=()=>innerWidth>1240;
const pS=n=>n===1?'':'s';
/* "Termasuk paket X" — pita biru menghitungnya lewat /^(Termasuk|Included)/ */
const incl=b=>$t(`Termasuk paket ${b||''}`.trim(),b?`Included in ${b} plan`:'Included in plan');
/* tahap tampilan: status asli → [label, nada, kelompok alur, label English] — stl(k) memberi label sesuai bahasa */
const ST={queued:['Perlu diperiksa','c-bl','check','Needs review'],materials:['Menunggu bahan label','c-or','mat','Waiting for label materials'],correction:['Perlu perbaikan','c-or','mat','Needs correction'],working:['Sedang dikerjakan','c-bl','work','Being worked on'],review:['Sedang diperiksa','c-bl','work','In review'],preparing:['Persiapan pendaftaran','c-bl','work','Preparing registration'],revision:['Revisi diminta','c-or','work','Revision requested'],response:['Menunggu tanggapan label','c-bl','wait','Waiting for label response'],waiting:['Menunggu WAMI','c-bl','wait','Waiting for WAMI'],resolution:['Penyelesaian · perlu Super Admin','c-red','res','Resolution · needs Super Admin'],done:['Selesai','c-gr','done','Done'],closed:['Ditutup','','done','Closed']};
const stl=k=>ST[k]?$t(ST[k][0],ST[k][3]):k;
const FLOW=[['check','Perlu diperiksa','Needs review'],['mat','Menunggu bahan','Waiting for materials'],['work','Sedang dikerjakan','Being worked on'],['wait','Menunggu tanggapan','Waiting for response'],['res','Penyelesaian','Resolution']];
const fln=k=>{const f=FLOW.find(x=>x[0]===k);return $t(f[1],f[2]);};
/* nama kejadian dari model (events111 / event11 hanya bahasa Indonesia) → English per jenis tindakan */
const EVA_EN={created:'Order created',pay:'Payment received',claim:'Assignee set',assign:'Handling reassigned',materials:'Materials requested','complete-materials':'Materials sent',start:'Work started','draft-result':'Result draft saved','send-result':'Result sent',accept:'Result accepted',revision:'Revision requested','review-revision':'Revision reviewed',obstacle:'Internal obstacle recorded',resolution:'Resolution proposed',offer:'Resolution suggestion sent','offer-accept':'Suggestion accepted','offer-decline':'Suggestion needs adjustment',refund:'Refund completed',escalate:'Review requested',acknowledge:'Refund seen by label'};
const EVW_EN={submitted:'Request created',pay:'Payment received',start:'Review started',ready:'Data ready to register',web:'Registration sent',documents:'Documents sent',correction:'Correction needed',resubmit:'Label correction sent','staff-fixed':'Assignee correction recorded',accepted:'WAMI acceptance recorded',followup:'Follow-up recorded',obstacle:'Obstacle recorded','correct-log':'Sending record corrected'};
const evA=k=>{const id=(typeof events111==='object'&&events111[k])||k;return $t(id,EVA_EN[k]||id);};
const evW=k=>{const id=(typeof event11==='object'&&event11[k])||k;return $t(id,EVW_EN[k]||id);};
const S={tab:'proc',stage:null,svc:'all',q:'',sel:{},read:false,form:null,ck:{},rv:'',offer:'refund'};
/* ---------- data asli ---------- */
const safe=f=>{try{return f()||[];}catch(err){return [];}};
const txOf=o=>safe(()=>(typeof Transactions113==='object'?Transactions113.init(ten).orders:ten.commerce113?.orders||[])).find(t=>t.sourceKey===o);
function addonRow(o,mem){const m=mem[o.member]||mem[o.owner]||{},svc=o.service||{},kind=['promo','visualizer','smartlink'].includes(svc.id)?svc.id:'other';
 const tx=txOf('addon:'+o.id),hist=(o.history||[]).map(h=>[U.iso16(h.at),evA(h.action),people.some(p=>p.id===h.actor)?ini(h.actor):'L',h.note||'',h.public!==false]);
 let dueMs=0;if(o.status==='working')dueMs=o.due;else if(o.status==='queued')dueMs=safe(()=>[Addons111.addHours?.(o.at,4,calendar11())])[0]||0;else if(o.status==='resolution'){const b=U.isoDay(o.progress||o.at);dueMs=Date.parse(U.addDay(b,1)+'T09:00:00+07:00');}
 const dueDate=dueMs?U.isoDay(dueMs):'',pay=o.payment==='benefit'||o.payment==='benefit_pending'||o.payment==='benefit_restored'?incl(o.benefit):o.amount?rp(o.amount):'—';
 return {id:o.id,kind,isW:false,svcName:(U137.en()&&{'Konten Promosi':'Promotional Content'}[svc.name])||svc.name||$t('Layanan','Service'),raw:o.status,st:o.status,title:o.title||'—',artist:o.artist||'',lab:m.name||o.owner,member:o.member||o.owner,release:o.release,handler:o.handler||'',h:ini(o.handler),ver:o.version,
  created:U.iso16(o.at),done:U.iso16(o.acceptedAt||o.closedAt||(['done','closed'].includes(o.status)?o.progress:0)),dueDate,due:dueDate?U.workDiff(U.today(),dueDate):null,dueMs,
  payTxt:pay,payment:o.payment,amount:o.amount||0,refunded:o.refunded||0,tx:tx?.id||'',brief:o.brief||'',need:o.message||'',internal:o.internal||'',draft:o.draft||null,deliveries:o.deliveries||[],revUsed:o.revisions||0,revMax:svc.revisions??1,
  revisionPending:o.revisionPending||null,reason:o.resolutionReason||'',offer:o.offer||null,result:svc.result||'',needs:svc.needs||'',hours:svc.hours||0,hist,songs:null,orders:[o]};}
const wSong=o=>o.status==='done'?'done':o.status==='correction'?'fix':o.status==='waiting'?'wait':o.status==='preparing'?'ok':'';
const WORDER=['queued','review','correction','preparing','waiting','done'];
function wamiRows(list,mem){const g={};for(const o of list){const k=o.member+'|'+o.release+'|'+Math.round((o.created||0)/60000);(g[k]||(g[k]=[])).push(o);}
 return Object.values(g).map(os=>{os.sort((a,b)=>String(a.id).localeCompare(String(b.id)));const o=os[0],m=mem[o.member]||{};
  const st=WORDER.find(s=>os.some(x=>x.status===s))||'done';
  const evs=[];for(const x of os)for(const e of x.events||[])evs.push([U.iso16(e.at),evW(e.action)+(os.length>1&&!['submitted'].includes(e.action)?` · ${x.title}`:''),people.some(p=>p.id===e.actor)?ini(e.actor):'L',e.note||'',e.public!==false]);
  evs.sort((a,b)=>a[0].localeCompare(b[0]));const hist=evs.filter((v,i)=>!evs.slice(0,i).some(w=>w[0]===v[0]&&w[1].split(' · ')[0]===v[1].split(' · ')[0]&&os.length>1&&/^(Pengajuan dibuat|Request created)/.test(v[1])));
  let dueMs=0;try{const ms=os.filter(x=>x.status===st).map(x=>deadline115({source:'wami',o:x},x.systemStage115||policy115())).filter(Boolean);dueMs=ms.length?Math.min(...ms):0;}catch(err){}
  const dueDate=dueMs?U.isoDay(dueMs):'',tx=txOf('wami:'+o.id),corr=os.find(x=>x.status==='correction');
  return {id:o.id,kind:'wami',isW:true,svcName:$t('Registrasi WAMI','WAMI Registration'),raw:st,st,title:o.releaseTitle||o.title,artist:o.artist||'',lab:m.name||o.account,member:o.member,release:o.release,handler:o.handler||'',h:ini(o.handler),ver:os.map(x=>x.version).join('.'),
   created:U.iso16(o.created),done:U.iso16(Math.max(...os.map(x=>x.completed||x.progress||0))),dueDate,due:dueDate?U.workDiff(U.today(),dueDate):null,dueMs,target:corr?.target||'',
   payTxt:o.amount?`${rp(os.reduce((n,x)=>n+(x.amount||0),0))}`:incl(o.benefit),tx:tx?.id||'',need:corr?.message||'',internal:os.map(x=>x.internal).filter(Boolean).join(' · '),
   web:os.every(x=>x.web),documents:os.every(x=>x.documents),next:os.map(x=>x.nextFollowup).filter(Boolean).sort()[0]||0,
   result:$t('Lagu tercatat di WAMI dengan nomor registrasi','Tracks recorded at WAMI with a registration number'),needs:$t('Data pencipta sesuai KTP, ISRC, dan pernyataan hak.','Songwriter data matching the ID card, ISRC, and rights statement.'),hist,
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
const dueChip=o=>o.due==null?'':o.due<0?chip($t(`Terlambat ${-o.due} hari`,`${-o.due} day${pS(-o.due)} overdue`),'c-red'):o.due===0?chip(o.dueMs&&o.dueMs<ten.now?$t('Lewat tenggat','Overdue'):$t('Hari ini','Today'),o.dueMs&&o.dueMs<ten.now?'c-red':'c-or'):`<span class="duet">${U.dlabel(o.dueDate)}</span>`;
const match=o=>!S.q||[o.id,o.title,o.artist,o.lab,o.svcName,...(o.songs||[]).map(s=>s.t+' '+s.isrc)].join(' ').toLowerCase().includes(S.q);
function items(){let r=O.filter(o=>(S.tab==='proc')===isOpen(o)).filter(match);if(S.svc!=='all')r=r.filter(o=>o.kind===S.svc);if(S.tab==='proc'&&S.stage)r=r.filter(o=>grp(o)===S.stage);const g=FLOW.map(f=>f[0]);
 return S.tab==='proc'?r.sort((a,b)=>(a.st==='resolution'?-1:0)-(b.st==='resolution'?-1:0)||g.indexOf(grp(a))-g.indexOf(grp(b))||(a.dueMs||9e15)-(b.dueMs||9e15)):r.sort((a,b)=>String(b.done).localeCompare(String(a.done)));}
function tabs(){$('tabs').innerHTML=[['proc',$t('Dalam proses','In progress'),O.filter(isOpen).length],['done',$t('Selesai','Done'),O.filter(o=>!isOpen(o)).length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=O.filter(isOpen),late=P.filter(o=>o.dueMs&&o.dueMs<ten.now).length,res=P.filter(o=>o.st==='resolution').length,wsongs=P.filter(o=>o.isW).reduce((n,o)=>n+o.songs.filter(s=>s.s!=='done').length,0),inc=P.filter(o=>/^(Termasuk|Included)/.test(o.payTxt)).length;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Layanan Tambahan · hari ini','Add-on Services · today')} ${U.todayLabel()}</div><h2>${P.length?$t(`${P.length} pesanan berjalan`,`${P.length} order${pS(P.length)} in progress`):$t('Tidak ada pesanan berjalan','No orders in progress')}</h2>
  <p>${$t(`${late} lewat tenggat · ${res} menunggu keputusan Super Admin · WAMI: ${wsongs} lagu belum punya nomor`,`${late} overdue · ${res} awaiting Super Admin decision · WAMI: ${wsongs} track${pS(wsongs)} without a number`)}</p>
  <div class="acts">${P.length?`<button class="wbtn" data-urgent>${$t('Buka yang berikutnya','Open the next one')} ${ARROW}</button>`:''}<button class="gbtn" data-go="settings">${$t('Katalog & harga','Catalogue & prices')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${inc}</b><span>${$t('termasuk paket','included in plan')}</span></div><div class="sbox"><b class="n">${P.length-inc}</b><span>${$t('dibayar','paid')}</span></div></div></div>
  <div class="flow">${FLOW.map(([k,ti,te])=>{const g=P.filter(o=>grp(o)===k),late=g.filter(o=>o.dueMs&&o.dueMs<ten.now).length,l=late||g.filter(o=>o.st==='resolution').length;return `<button class="fn${late?' hot':l?' hot act':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${$t(ti,te)}</span><span class="d">${k==='wait'?(g.length?g.map(o=>o.isW?'WAMI':'label').filter((v,i,a)=>a.indexOf(v)===i).join(' · '):$t('kosong','empty')):l?l+(k==='res'?$t(' perlu keputusan',l===1?' needs a decision':' need a decision'):$t(' terlambat',' overdue')):g.length?$t('tepat waktu','on time'):$t('kosong','empty')}</span></button>`;}).join('')}</div>`;}
function pills(){const cat=safe(()=>Addons111.init(ten).catalogue).filter(c=>c.active!==false);const list=[['all',$t('Semua','All')],...cat.filter(c=>['promo','visualizer','smartlink'].includes(c.id)).map(c=>[c.id,c.name]),...(cat.some(c=>!['promo','visualizer','smartlink'].includes(c.id))?[['other',$t('Layanan lain','Other services')]]:[]),['wami','WAMI']];return list;}
function list(){const r=items();let h='';const base=O.filter(o=>(S.tab==='proc')===isOpen(o)).filter(match),cnt=k=>k==='all'?base.length:base.filter(o=>o.kind===k).length;
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari rilisan, lagu, label, nomor','Search release, track, label, number')}" value="${E(S.q)}"></label>`;
 h+=`<div class="ch"><h3>${S.tab==='proc'?$t('Dalam proses','In progress'):$t('Selesai','Done')} <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${pills().map(([k,t])=>`<button data-svc="${k}" aria-pressed="${S.svc===k}">${E(t)}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
 if(S.stage&&S.tab==='proc')h+=`<div class="flt"><span>${$t('Hanya','Showing only')} <b style="font-weight:500">${fln(S.stage)}</b></span><button data-stage-clear>${$t('Tampilkan semua','Show all')}</button></div>`;
 let cur='';r.forEach((o,i)=>{const g=S.tab==='proc'?(o.st==='resolution'?'res':grp(o)):'done';if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${{check:'blue',mat:'orange',work:'blue',wait:'blue',res:'red',done:'green'}[g]})"></i><b>${g==='done'?$t('Selesai','Done'):fln(g)}</b> · ${r.filter(x=>(S.tab==='proc'?(x.st==='resolution'?'res':grp(x)):'done')===g).length}</div>`;}
  const songs=o.isW?$t(` · ${o.songs.length} lagu`,` · ${o.songs.length} track${pS(o.songs.length)}`):'';
  h+=`<div class="it${S.sel[S.tab]===o.id?' sel':''}" data-id="${E(o.id)}" style="--i:${i}"><span class="ty">${ICON[o.kind]||ICON.other}</span><div style="min-width:0"><div class="t1">${E(o.title)} ${chip(stl(o.st),ST[o.st]?.[1]||'')}</div><div class="t2">${E(o.svcName)}${songs} · ${E(o.lab)} · <span class="mono">${E(o.id)}</span></div></div><div class="rgt">${S.tab==='proc'?dueChip(o)+mini(o.h):`<span class="duet">${fd(String(o.done).slice(0,10))}</span>`}</div></div>`;});
 if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada pesanan','No orders')}</b>${S.q||S.svc!=='all'||S.stage?$t('Coba ubah pencarian atau pil layanan.','Try changing the search or the service pill.'):S.tab==='proc'?$t('Pesanan layanan & pengajuan WAMI dari label muncul di sini setelah dibayar.','Service orders and WAMI requests from labels appear here once paid.'):$t('Belum ada pesanan selesai.','No completed orders yet.')}</div>`;
 $('list').innerHTML=h;}
/* ---------- langkah berikutnya ---------- */
const reveal=(label,ph,doName,doLabel,cls='pri',extra='')=>`<div class="reveal"><label class="fld">${label}<textarea id="f-note" placeholder="${ph}"></textarea></label>${extra}<div class="hrow">${btn(doLabel,`data-do="${doName}"`,cls)}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`;
const small=o=>S.form==='mat'?reveal($t('Bahan yang perlu dilengkapi label','Materials the label needs to provide'),$t('Mis. kirim arahan teks dan warna utama','E.g. send the text brief and main colours'),'ask-mat',$t('Minta kelengkapan','Request materials')):S.form==='obs'?reveal($t('Kendala · hanya petugas','Obstacle · assignee only'),$t('Mis. audio rusak di detik 1:42','E.g. the audio is corrupted at 1:42'),'obstacle',$t('Catat kendala','Record obstacle'),'pri',`<p class="where">${$t('Usulkan penyelesaian bila pesanan tidak bisa dikerjakan sesuai janji.','Suggest a resolution if the order cannot be delivered as promised.')}</p>`)+`<div class="hrow mini2">${btn($t('Usulkan penyelesaian ke Super Admin','Suggest a resolution to Super Admin'),'data-do="propose"','ghost')}</div>`:`<div class="hrow mini2">${can(o,'materials')&&['queued','working'].includes(o.raw)?btn($t('Minta kelengkapan','Request materials'),'data-form="mat"','ghost'):''}${can(o,'obstacle')?btn($t('Catat kendala','Record obstacle'),'data-form="obs"','ghost'):''}</div>`;
function songRows(o,mode){const ck=S.ck[o.id]||{};return `<div class="songs">${o.songs.map((s,i)=>`<div class="sg"><span class="num">${i+1}</span><span class="sgt">${E(s.t)}<small class="mono">${E(s.isrc||$t('ISRC belum ada','No ISRC yet'))}${s.composer?` · ${E(s.composer)}`:''}</small></span>${s.s==='done'?`<span class="sgr">${chip($t('Terdaftar','Registered'),'c-gr')}<small class="mono">${E(s.no)}</small></span>`:s.s==='fix'?chip($t('Perlu perbaikan','Needs correction'),'c-or'):s.s==='wait'?(mode==='wno'&&can(o,'accepted')?`<span class="sgr"><input class="sgin" id="wn-${i}" placeholder="${$t('Nomor WAMI','WAMI number')}"><button class="btn sm" data-wno="${i}">${$t('Catat','Record')}</button></span>`:chip($t('Menunggu WAMI','Waiting for WAMI'),'c-bl')):s.s==='ok'?chip($t('Data sesuai','Data verified'),'c-gr'):(mode==='check'&&s.raw==='review'?`<button class="ck2${ck[i]?' on':''}" data-sck="${i}">${ck[i]?$t('✓ Sesuai','✓ Verified'):$t('Tandai sesuai','Mark verified')}</button>`:chip(s.raw==='queued'?$t('Belum diperiksa','Not reviewed yet'):$t('Sedang diperiksa','In review'),''))}</div>`).join('')}</div>`;}
function next(o){const w=o.isW;
 if(o.st==='resolution'){const off=o.offer;const money=o.payment==='paid'&&o.amount>0;
  if(o.payment==='refund_pending')return `<div class="nextc"><p>${$t(`Label menyetujui pengembalian ${rp(o.amount-o.refunded)}. Uangnya diproses di <b>Transaksi › Pengembalian</b>.`,`The label accepted a refund of ${rp(o.amount-o.refunded)}. The money is processed in <b>Transactions › Refunds</b>.`)}</p><div class="hrow">${btn($t('Buka Transaksi ','Open Transactions ')+ARROW,'data-go="transactions"','pri')}</div></div>`;
  if(o.payment==='benefit_pending')return `<div class="nextc"><p>${$t('Label menyetujui pengembalian benefit paket. Pesanan berikutnya untuk layanan & rilisan yang sama kembali gratis.','The label accepted restoring the plan benefit. The next order for the same service & release is free again.')}</p><div class="hrow">${can(o,'refund')?btn($t('Kembalikan benefit paket','Restore plan benefit'),'data-do="refund"','pri'):''}</div></div>`;
  if(off){const kind=$t({refund:'pengembalian',schedule:'jadwal baru',replacement:'pengganti',addition:'pesanan tambahan'},{refund:'refund',schedule:'new schedule',replacement:'replacement',addition:'additional order'})[off.kind]||off.kind;
   return `<div class="nextc"><p>${$t('Usulan penyelesaian sudah dikirim ke label:','Resolution suggestion sent to the label:')} <b>${kind}</b>${off.amount?` ${rp(off.amount)}`:''}. ${$t('Menunggu jawaban label.','Waiting for the label’s answer.')}</p>${off.note?`<p class="quote">${E(off.note)}</p>`:''}</div>`;}
  if(!isSA())return `<div class="nextc"><p><b>${E(pname(o.handler)||$t('Petugas','Assignee'))}</b> ${$t('mengusulkan penyelesaian. Menunggu keputusan Super Admin.','suggested a resolution. Waiting for the Super Admin’s decision.')}</p><p class="quote">${E(o.reason)}</p></div>`;
  const form=S.form==='offer'?`<div class="reveal"><div class="opts">${[['refund',money?$t('Pengembalian uang','Money refund'):$t('Kembalikan benefit','Restore benefit'),$t('label menyetujui, lalu diproses','label accepts, then it is processed')],['schedule',$t('Jadwal baru','New schedule'),$t('pengerjaan berlanjut','work continues')]].map(([k,t,m])=>`<button data-offer="${k}" aria-pressed="${S.offer===k}">${t}<small>${m}</small></button>`).join('')}</div>${S.offer==='refund'?(money?`<label class="fld">${$t('Jumlah dikembalikan','Refund amount')}<input id="f-amt" value="${o.amount-o.refunded}"></label>`:''):`<label class="fld">${$t('Tenggat baru','New deadline')}<input id="f-due" type="date" value="${U.addWork(U.today(),3)}"></label>`}<label class="fld">${$t('Penjelasan untuk label','Explanation for the label')}<textarea id="f-note">${E(o.reason)}</textarea></label><div class="hrow">${btn($t('Kirim usulan ke label','Send suggestion to label'),'data-do="offer"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p><b>${E(pname(o.handler)||$t('Petugas','Assignee'))}</b> ${$t('mengusulkan penyelesaian:','suggested a resolution:')}</p><p class="quote">${E(o.reason)}</p>${S.form?'':`<div class="hrow">${btn($t('Putuskan penyelesaian ','Decide resolution ')+ARROW,'data-form="offer"','pri')}</div>`}${form}<p class="where">${$t('Label menyetujui usulan dari sisi label; uang dikembalikan lewat Transaksi › Pengembalian. Keputusan ini hanya oleh Super Admin.','The label accepts the suggestion from their side; money is refunded via Transactions › Refunds. Only the Super Admin makes this decision.')}</p></div>`;}
 if(o.st==='queued'&&!w)return `<div class="nextc"><p>${$t('Pesanan baru.','New order.')} ${E(o.brief)}</p><div class="checks"><div class="ck"><b>✓</b>${$t('Bahan dari katalog','Materials from catalogue')}<small>${E(o.title)}</small></div><div class="ck${o.brief?'':' warn'}"><b>${o.brief?'✓':'!'}</b>${$t('Arahan dari label','Brief from label')}<small>${o.brief?$t('terisi','filled in'):$t('belum ada','none yet')}</small></div></div><div class="hrow">${can(o,'start')?btn($t('Mulai pengerjaan ','Start work ')+ARROW,'data-do="start"','pri'):''}</div><p class="where">${$t(`Menekan Mulai pengerjaan menjadikanmu petugasnya; tenggat ${o.hours} jam kerja.`,`Pressing Start work makes you the assignee; deadline ${o.hours} working hour${pS(o.hours)}.`)}</p>${small(o)}</div>`;
 if(o.st==='queued'&&w)return `<div class="nextc"><p>${$t(`Pengajuan baru ${o.songs.length} lagu. Mulai pemeriksaan data pencipta, ISRC, dan pernyataan hak.`,`New request for ${o.songs.length} track${pS(o.songs.length)}. Start reviewing songwriter data, ISRC, and rights statement.`)}</p><div class="hrow">${can(o,'start')?btn($t('Mulai pemeriksaan ','Start review ')+ARROW,'data-do="w-start"','pri'):''}</div><p class="where">${$t('Menekan Mulai pemeriksaan menjadikanmu petugasnya.','Pressing Start review makes you the assignee.')}</p></div>`;
 if(o.st==='review'){const ck=S.ck[o.id]||{},rev=o.songs.map((s,i)=>s.raw!=='review'||ck[i]),all=rev.every(Boolean);
  return `<div class="nextc"><p>${$t('Periksa tiap lagu: pencipta sesuai KTP, ISRC benar, pernyataan hak ada.','Check each track: songwriter matches the ID card, ISRC is correct, rights statement is present.')}</p>${songRows(o,'check')}<div class="hrow">${can(o,'ready')?btn($t('Siap didaftarkan','Ready to register'),'data-do="w-ready"','pri',!all):''}${can(o,'correction')&&!S.form?btn($t('Minta perbaikan','Request correction'),'data-form="fix"'):''}</div>${S.form==='fix'?reveal($t('Yang perlu diperbaiki label','What the label needs to fix'),$t('Mis. nama pencipta belum sesuai KTP','E.g. songwriter name does not match the ID card'),'w-fix',$t('Kirim ke label','Send to label')):''}</div>`;}
 if(o.st==='materials'||o.st==='correction'){const staffFix=w&&o.target==='staff';
  return `<div class="nextc"><p>${staffFix?$t('Perbaikan oleh petugas','Correction by assignee'):w?$t('Menunggu perbaikan dari label','Waiting for the label’s correction'):$t('Menunggu bahan dari label','Waiting for materials from the label')}.</p>${o.need?`<p class="quote">${E(o.need)}</p>`:''}${w?songRows(o,''):''}<p class="where">${staffFix?$t('Catat bila perbaikan sudah dilakukan.','Record it once the correction is done.'):$t('Pengingat otomatis ke label berjalan; tahap lanjut otomatis saat label mengirim kelengkapan.','Automatic reminders to the label are running; the stage moves on automatically when the label sends the materials.')}</p>${staffFix&&can(o,'staff-fixed')?(S.form==='sfix'?reveal($t('Yang sudah diperbaiki','What was fixed'),$t('Mis. ISRC dikoreksi','E.g. ISRC corrected'),'w-sfix',$t('Simpan & periksa lagi','Save & review again')):`<div class="hrow">${btn($t('Perbaikan selesai · periksa lagi','Correction done · review again'),'data-form="sfix"','pri')}</div>`):''}</div>`;}
 if(o.st==='working'||o.st==='revision'){const rv=o.st==='revision',d=o.draft;
  if(rv)return `<div class="nextc"><p>${$t(`Label meminta revisi (${o.revUsed} dari ${o.revMax} jatah dipakai):`,`The label requested a revision (${o.revUsed} of ${o.revMax} allowance used):`)}</p>${o.revisionPending?.note?`<p class="quote">${E(o.revisionPending.note)}</p>`:''}${can(o,'review-revision')?`<div class="opts">${[['included',$t('Pakai jatah revisi','Use revision allowance'),$t('sisa '+Math.max(0,o.revMax-o.revUsed),Math.max(0,o.revMax-o.revUsed)+' left')],['error',$t('Kesalahan petugas','Assignee error'),$t('tidak mengurangi jatah','does not use the allowance')],['scope',$t('Di luar cakupan','Out of scope'),$t('jadi penyelesaian','becomes a resolution')]].map(([k,t,m])=>`<button data-rv="${k}" aria-pressed="${S.rv===k}">${t}<small>${m}</small></button>`).join('')}</div>${S.rv?`<label class="fld">${$t('Catatan untuk label','Note for the label')}<textarea id="f-note"></textarea></label><div class="hrow">${btn($t('Simpan keputusan','Save decision'),'data-do="review-rev"','pri')}</div>`:''}`:''}</div>`;
  const draftBox=d?`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(d.file?.name||d.url||$t('Draf hasil','Result draft'))}</b><small>${$t('Draf · hanya petugas yang bisa melihat','Draft · only the assignee can see it')}</small></span>${can(o,'draft-result')?`<button class="lnk" data-form="draft">${$t('Ganti','Replace')}</button>`:''}</div><div class="hrow">${can(o,'send-result')?btn($t('Kirim ke label ','Send to label ')+ARROW,'data-do="send"','pri'):''}</div>`:`<div class="hrow">${can(o,'draft-result')?btn($t('Simpan draf hasil','Save result draft'),'data-form="draft"','pri'):''}</div>`;
  const draftForm=S.form==='draft'?`<div class="reveal"><label class="fld">${$t('Tautan hasil (https)','Result link (https)')}<input id="f-url" placeholder="https://drive.google.com/…" value="${E(d?.url||'')}"></label><label class="fld">${$t('Catatan · hanya petugas','Note · assignee only')}<textarea id="f-note">${E(d?.note||'')}</textarea></label><div class="hrow">${btn($t('Simpan draf','Save draft'),'data-do="draft"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>${$t('Sedang dikerjakan.','Being worked on.')}${o.dueMs?$t(` Tenggat ${fd(U.iso16(o.dueMs))}.`,` Deadline ${fd(U.iso16(o.dueMs))}.`):''}</p>${S.form==='draft'?'':draftBox}${draftForm}<p class="where">${$t(`Yang dijanjikan: ${E(o.result)}.`,`Promised: ${E(o.result)}.`)}</p>${small(o)}</div>`;}
 if(o.st==='preparing'){const web=o.web,doc=o.documents;return `<div class="nextc"><p>${$t('Dua langkah pengiriman ke WAMI.','Two steps to send to WAMI.')}</p><div class="checks"><div class="ck${web?'':' todo'}"><b>${web?'✓':''}</b>${$t('1 · Pendaftaran dikirim lewat portal WAMI','1 · Registration sent via the WAMI portal')}<small>${$t(`${o.songs.length} lagu`,`${o.songs.length} track${pS(o.songs.length)}`)}</small></div><div class="ck${doc?'':' todo'}"><b>${doc?'✓':''}</b>${$t('2 · Dokumen pendukung dikirim','2 · Supporting documents sent')}<small>${$t('pernyataan hak & KTP pencipta','rights statement & songwriter ID card')}</small></div></div><div class="hrow">${!web&&can(o,'web')?btn($t('Tandai pendaftaran terkirim','Mark registration sent'),'data-do="w-web"','pri'):''}${web&&!doc&&can(o,'documents')?btn($t('Tandai dokumen terkirim','Mark documents sent'),'data-do="w-doc"','pri'):''}</div></div>`;}
 if(o.st==='waiting'){const left=o.songs.filter(x=>x.s!=='done').length,late=o.dueMs&&o.dueMs<ten.now;
  return `<div class="nextc"><p>${$t(`Dikirim ke WAMI. ${left} lagu belum punya nomor.`,`Sent to WAMI. ${left} track${pS(left)} without a number yet.`)}${late?$t(' Sudah lewat jadwal tindak lanjut — tanyakan ke WAMI.',' The follow-up date has passed — ask WAMI.'):''}</p>${songRows(o,'wno')}<div class="hrow">${can(o,'followup')&&!S.form?btn($t('Catat tindak lanjut ke WAMI','Record WAMI follow-up'),'data-form="wfu"',late?'pri':''):''}</div>${S.form==='wfu'?`<div class="reveal"><label class="fld">${$t('Catatan tindak lanjut','Follow-up note')}<textarea id="f-note" placeholder="${$t('Mis. sudah ditanyakan lewat email','E.g. asked by email')}"></textarea></label><label class="fld">${$t('Periksa lagi pada','Check again on')}<input id="f-next" type="date" value="${U.addWork(U.today(),2)}"></label><div class="hrow">${btn($t('Simpan','Save'),'data-do="w-followup"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:''}</div>`;}
 if(o.st==='response'){const last=o.deliveries[o.deliveries.length-1],nl=Math.max(0,o.revMax-o.revUsed);return `<div class="nextc"><p>${$t('Hasil dikirim','Result sent')}${last?.sent?` ${fd(U.iso16(last.sent))}`:''}. ${$t(`Menunggu label menerima atau minta revisi (sisa ${nl} revisi).`,`Waiting for the label to accept or request a revision (${nl} revision${pS(nl)} left).`)}</p>${last?`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(last.file?.name||last.url||$t('Hasil','Result'))}</b><small>${$t('Terlihat oleh label','Visible to the label')}</small></span></div>`:''}<p class="where">${$t('Pengingat otomatis ke label 24 dan 48 jam; di 72 jam menjadi tindak lanjut petugas.','Automatic reminders to the label at 24 and 48 hours; at 72 hours it becomes an assignee follow-up.')}</p></div>`;}
 if(o.st==='done'||o.st==='closed')return `<div class="nextc ok"><p>${o.st==='closed'?$t('Ditutup','Closed'):$t('Selesai','Done')} ${fd(o.done)}.${o.payment==='refunded'?$t(` Biaya dikembalikan ${rp(o.refunded)}.`,` Fee refunded ${rp(o.refunded)}.`):o.payment==='benefit_restored'?$t(' Benefit paket dikembalikan.',' Plan benefit restored.'):''}</p>${w?songRows(o,''):''}</div>`;
 return `<div class="nextc mute"><p>${stl(o.st)}.</p></div>`;}
function steps(o){const w=o.isW,L=w?[$t('Diperiksa','Reviewed'),$t('Persiapan','Preparation'),$t('Dikirim ke WAMI','Sent to WAMI'),$t('Terdaftar','Registered')]:[$t('Pesanan','Order'),$t('Pengerjaan','Work'),$t('Hasil','Result'),$t('Diterima','Accepted')];
 const at=w?{queued:0,review:0,correction:0,preparing:1,waiting:2,done:4}[o.st]:{queued:0,materials:1,working:1,revision:1,resolution:1,response:2,done:4,closed:1}[o.st];const wait=['materials','correction','revision','resolution'].includes(o.st);
 return `<div class="steps" style="--n:4"><i class="prog" style="--w:calc(100% * ${Math.min(at??0,3)} / 4)"></i>${L.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function pane(){const o=items().find(x=>x.id===S.sel[S.tab]);if(!o){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih pesanan','Select an order')}</b>${$t('Rinciannya tampil di sini.','Details appear here.')}</div>`;return;}
 let i=0;const pay=o.tx?`${E(o.payTxt)} · <button class="lnk" data-go="transactions">${E(o.tx)}</button>`:E(o.payTxt);const St=STAFF();
 const ini2=String(o.lab).split(' ').map(z=>z[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?$t('Dalam proses','In progress'):$t('Selesai','Done')}</button><div class="k"><span class="ty">${ICON[o.kind]||ICON.other}</span>${E(o.svcName)} · <span class="mono">${E(o.id)}</span></div><h2>${E(o.title)}</h2><div class="meta">${E(o.artist)}${o.release?`<span class="sep"></span><button class="lnk" data-rel="${E(o.release)}">${$t('Rilisan','Release')}</button>`:''}<span class="sep"></span>${chip(stl(o.st),ST[o.st]?.[1]||'')}</div></div>
 <div class="pb">${sec(i++,isOpen(o)?$t('Langkah berikutnya','Next step'):$t('Keadaan','Status'),next(o),isOpen(o)?dueChip(o):'')}
 ${sec(i++,$t('Tahapan','Stages'),steps(o))}
 ${sec(i++,$t('Pesanan','Order'),`<div class="facts"><span>Label</span><b>${E(o.lab)}</b><span>${$t('Biaya','Fee')}</span><b>${pay}</b><span>${$t('Petugas','Assignee')}</span><b>${o.handler?E(pname(o.handler)):`<span class="noart">${$t('belum ada · terisi saat mulai','none yet · set when work starts')}</span>`}</b><span>${$t('Masuk','Received')}</span><b>${fd(o.created)}</b>${isOpen(o)&&o.dueDate?`<span>${$t('Tenggat','Deadline')}</span><b>${fd(U.iso16(o.dueMs))}${o.isW?$t(' · Persiapan WAMI',' · WAMI preparation'):$t(` · ${o.hours} jam kerja`,` · ${o.hours} working hour${pS(o.hours)}`)}</b>`:''}${!o.isW?`<span>${$t('Revisi','Revisions')}</span><b>${$t(`${o.revUsed} dari ${o.revMax} dipakai · kesalahan petugas tidak mengurangi jatah`,`${o.revUsed} of ${o.revMax} used · assignee errors do not use the allowance`)}</b>`:''}<span>${$t('Yang dijanjikan','Promised')}</span><b>${E(o.result)}</b><span>${$t('Bahan','Materials')}</span><b>${E(o.needs)}</b>${o.internal?`<span>${$t('Catatan petugas','Assignee notes')}</span><b>${E(o.internal)}</b>`:''}</div>`)}
 ${o.songs&&!['review','waiting','correction','done'].includes(o.st)?sec(i++,$t('Lagu','Tracks'),songRows(o,''),$t(o.songs.length+' lagu',o.songs.length+' track'+pS(o.songs.length))):''}
 ${sec(i++,$t('Riwayat','History'),`<div class="hist">${o.hist.slice().reverse().map(([w,x,who,note,pub])=>`<div>${who==='L'?`<span class="mini lbl">${E(ini2)}</span>`:mini(who)}<span>${E(x)}${note?` · ${E(String(note).slice(0,90))}`:''}${pub===false?' <small class="where" style="display:inline">· internal</small>':''}<small style="display:block">${who==='L'?E(o.lab):E(St[who]?.[0]||$t('Petugas','Assignee'))} · ${fd(w)}</small></span></div>`).join('')||`<p class="where">${$t('Belum ada riwayat.','No history yet.')}</p>`}</div>`)}</div>`;}
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
  if(a==='start'){if(!o.handler)runA(o,'claim');runA(o,'start',{checked:true});msg=$t('Dimulai · kamu petugasnya','Started · you are the assignee');}
  else if(a==='ask-mat'){if(!note){toast($t('Tulis bahan yang diminta','Write the materials you need'));return;}runA(o,'materials',{note});msg=$t('Permintaan bahan dikirim ke label','Materials request sent to label');}
  else if(a==='obstacle'){if(!note){toast($t('Tulis kendalanya','Describe the obstacle'));return;}runA(o,'obstacle',{note});msg=$t('Kendala dicatat','Obstacle recorded');}
  else if(a==='propose'){const n=note||o.internal||$t('Pengerjaan tidak dapat diselesaikan sesuai janji.','The work cannot be completed as promised.');runA(o,'resolution',{note:n});msg=$t('Penyelesaian diusulkan · menunggu Super Admin','Resolution suggested · waiting for Super Admin');}
  else if(a==='draft'){const url=val('f-url');if(!/^https:\/\//.test(url)){toast($t('Isi tautan hasil yang diawali https://','Enter a result link starting with https://'));return;}runA(o,'draft-result',{url,note,file:null});msg=$t('Draf tersimpan · belum terlihat label','Draft saved · not visible to the label yet');}
  else if(a==='send'){runA(o,'send-result',{checked:true});msg=$t('Hasil dikirim ke label','Result sent to label');}
  else if(a==='review-rev'){if(!S.rv){toast($t('Pilih keputusan revisi','Choose a revision decision'));return;}if(!note){toast($t('Tulis catatan untuk label','Write a note for the label'));return;}runA(o,'review-revision',{kind:S.rv,note});msg=S.rv==='scope'?$t('Masuk penyelesaian · menunggu Super Admin','Moved to resolution · waiting for Super Admin'):$t('Revisi diterima · lanjut dikerjakan','Revision accepted · work continues');S.rv='';}
  else if(a==='offer'){if(!note){toast($t('Tulis penjelasan untuk label','Write an explanation for the label'));return;}const p={kind:S.offer,note};
   if(S.offer==='refund'){p.amount=o.payment==='paid'&&o.amount>0?Number(String(val('f-amt')).replace(/[^\d]/g,''))||0:0;}
   else{const d=val('f-due');if(!d){toast($t('Pilih tenggat baru','Choose a new deadline'));return;}p.due=Date.parse(d+'T16:00:00+07:00');}
   runA(o,'offer',p);msg=$t('Usulan dikirim · menunggu jawaban label','Suggestion sent · waiting for the label’s answer');}
  else if(a==='refund'){runA(o,'refund',{note:$t('Benefit paket dikembalikan.','Plan benefit restored.'),checked:true});msg=$t('Benefit paket dikembalikan','Plan benefit restored');moved=true;}
  else if(a==='w-start'){for(const s of o.songs)if(s.raw==='queued')runW(s.id,'start');msg=$t('Pemeriksaan dimulai · kamu petugasnya','Review started · you are the assignee');}
  else if(a==='w-ready'){for(const s of o.songs)if(s.raw==='review')runW(s.id,'ready',{checked:true});delete S.ck[o.id];msg=$t('Siap didaftarkan · lakukan dua langkah pengiriman','Ready to register · complete the two sending steps');}
  else if(a==='w-fix'){if(!note){toast($t('Tulis yang perlu diperbaiki','Write what needs fixing'));return;}const ck=S.ck[o.id]||{};const ids=o.songs.filter((s,i)=>s.raw==='review'&&!ck[i]).map(s=>s.id);for(const id of (ids.length?ids:o.songs.filter(s=>s.raw==='review').map(s=>s.id)))runW(id,'correction',{target:'label',note});msg=$t('Permintaan perbaikan dikirim ke label','Correction request sent to label');}
  else if(a==='w-sfix'){if(!note){toast($t('Tulis yang sudah diperbaiki','Write what was fixed'));return;}for(const s of o.songs)if(s.raw==='correction')runW(s.id,'staff-fixed',{note});msg=$t('Perbaikan dicatat · diperiksa lagi','Correction recorded · reviewing again');}
  else if(a==='w-web'){for(const s of o.songs)if(s.raw==='preparing')runW(s.id,'web',{checked:true});msg=$t('Pendaftaran ditandai terkirim','Registration marked as sent');}
  else if(a==='w-doc'){for(const s of o.songs)if(s.raw==='preparing')runW(s.id,'documents',{checked:true});msg=$t('Dokumen terkirim · menunggu WAMI','Documents sent · waiting for WAMI');}
  else if(a==='w-followup'){if(!note){toast($t('Tulis catatan tindak lanjut','Write a follow-up note'));return;}const d=val('f-next')||U.addWork(U.today(),2);const next=Date.parse(d+'T09:00:00+07:00');if(!(next>ten.now)){toast($t('Pilih tanggal setelah hari ini','Choose a date after today'));return;}for(const s of o.songs)if(s.raw==='waiting')runW(s.id,'followup',{note,next});msg=$t(`Tindak lanjut dicatat · periksa lagi ${U.dlabel(d)}`,`Follow-up recorded · check again ${U.dlabel(d)}`);}
  else if(a==='wno'){const s=o.songs[+arg];const n=val('wn-'+arg);if(!n){toast($t('Isi nomor WAMI','Enter the WAMI number'));return;}runW(s.id,'accepted',{note:$t('Nomor WAMI dicatat.','WAMI number recorded.'),reference:n,checked:true});msg=$t(`Nomor dicatat untuk ${s.t}`,`Number recorded for ${s.t}`);if(o.songs.filter(x=>x.s!=='done').length===1){msg=$t('Semua lagu terdaftar · selesai','All tracks registered · done');moved=true;}}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;if(S.stage&&!moved)S.stage=null;lastSig='';lastPane='';
 if(moved){load();const r=items();S.sel[S.tab]=r[0]?.id;}
 render();toast(msg);}
function openRelease(id){try{if(typeof ui105==='object'){ui105.view='detail';ui105.id=id;}}catch(err){}if(!go137('releases'))toast($t('Buka Rilisan','Open Releases'));}
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
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast($t('Buka menu ','Open menu ')+go.dataset.go);return;}
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
const sig=()=>O.map(o=>[o.id,o.st,o.ver,o.h,o.dueDate,o.payment||''].join(':')).join('|')+'|'+U.today()+'|r:'+ten.role+state.user+'|'+state.lang;
const DEF={id:'addons',css:STYLE,html:HTML,
 i18n:{'Layanan Tambahan':'Add-on Services','Kerjakan pesanan jasa label sampai hasilnya diterima: Konten Promosi, Video Visualizer, Smart Link, dan Registrasi WAMI.':'Work on label service orders until the result is accepted: Promotional Content, Video Visualizer, Smart Link, and WAMI Registration.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&['addons','wami'].includes(v4.module)&&!state.preview,
 init(r){root=r;bind();},
 draw(){if(v4.module!==lastMod){S.svc=v4.module==='wami'?'wami':'all';S.stage=null;lastMod=v4.module;lastSig='';}intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Layanan Tambahan */
DEF.sum=function(){load();const P=O.filter(isOpen),raw=Object.fromEntries((ten.addons111?.orders||[]).map(o=>[o.id,o]));
 const I=P.map(o=>{const x=raw[o.id]||{},g=grp(o),res=o.st==='resolution';
  return {id:o.id,src:o.isW?'wami':'service',menu:o.isW?$t('Layanan Tambahan › WAMI','Add-on Services › WAMI'):$t('Layanan Tambahan','Add-on Services'),ic:'spark',t:`${o.svcName} · ${o.title}`,l:o.lab,m:o.member,s:o.st,st:stl(o.st),due:o.due,dueDate:o.dueDate,over:!!(o.dueMs&&o.dueMs<ten.now),who:o.handler,
   wait:res?'Super Admin':g==='wait'?(o.isW?'WAMI':'Label'):g==='mat'?'Label':'',res:res?{by:o.handler||'',note:x.resolutionReason||'',at:U.iso16(x.progress||x.at)}:null,songs:o.isW?o.songs.filter(s=>s.s!=='done').length:0};});
 const late=I.filter(o=>o.over).length,res=I.filter(o=>o.res).length,ws=I.reduce((n,o)=>n+o.songs,0);
 return {P:I,late,res,ws,line:P.length?$t(`${P.length} pesanan · ${late} lewat tenggat${res?` · ${res} menunggu keputusan Super Admin`:''} · WAMI: ${ws} lagu belum bernomor`,`${P.length} order${pS(P.length)} · ${late} overdue${res?` · ${res} awaiting Super Admin decision`:''} · WAMI: ${ws} track${pS(ws)} without a number`):$t('Tidak ada pesanan berjalan','No orders in progress'),tone:late?'r':res?'o':'g'};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
const intercept=name=>{if(typeof window[name]!=='function')return;const before=window[name];window[name]=function(id){if(isLabel10()||state.preview)return before.apply(this,arguments);pending=id;if(DEF.when()){lastSig='';render();}else if(!go137('addons'))return before.apply(this,arguments);};};
intercept('detail111');intercept('detail11');
/* Registrasi WAMI bergabung ke Layanan Tambahan: hapus tombolnya dari sidebar staf & Super Admin. */
const renderBefore=render;render=function(){const out=renderBefore.apply(this,arguments);try{if(!isLabel10())document.querySelectorAll('.side-scroll [data-id="wami"]').forEach(el=>el.remove());}catch(err){}return out;};
})();
