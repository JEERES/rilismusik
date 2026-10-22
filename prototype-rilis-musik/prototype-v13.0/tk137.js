/* v1.1.0-dev.30 — Tiket Bantuan dirancang ulang (rancangan disetujui 21 Okt 2026, mock tk1).
   Tab Dalam proses · Selesai, pita alur Baru → Ditangani → Menunggu label → Menunggu distributor → Perlu peninjauan,
   3 kelompok kategori, rincian di samping dengan satu langkah berikutnya per tahap, percakapan & catatan internal.
   Data & tindakan: ten.tickets112 lewat run112 / Tickets112.act (fungsi asli), jadi Pesan label, Kotak Masuk,
   Pekerjaan, dan rilisan yang terkait ikut berubah. Pengajuan ganda yang sudah selesai ditampilkan sebagai satu baris. */
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
.tg2{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted);margin:8px 0 2px}
.tg2 input{width:16px;height:16px;accent-color:var(--blue)}
.reveal .f2{grid-template-columns:minmax(0,1fr)}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Tiket Bantuan</h1><div class="sub">Permintaan label untuk rilisan yang sudah terkirim: perubahan, penurunan, YouTube &amp; Content ID, dan masalah lain — sampai hasilnya terkonfirmasi.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,T=[],lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>'),FILE=sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>');
const FAM={rel:sv('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'),yt:sv('<rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9.5 5 2.5-5 2.5z"/>'),other:sv('<circle cx="12" cy="12" r="8"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const CAT={metadata:['Perubahan Metadata','rel'],audio:['Penggantian Audio','rel'],cover:['Penggantian Cover','rel'],takedown:['Penurunan Rilisan','rel'],availability:['Masalah Ketersediaan','rel'],cid:['Ajukan Content ID','yt'],'release-claim':['Lepaskan Klaim Video','yt'],'disable-cid':['Nonaktifkan Content ID','yt'],'royalty-issue':['Masalah Royalti','other'],general:['Permintaan Lainnya','other']};
const ST={new:['Baru','c-bl'],handling:['Ditangani','c-bl'],label:['Menunggu label','c-or'],dist:['Menunggu distributor','c-bl'],review:['Perlu peninjauan · Super Admin','c-red'],done:['Selesai','c-gr']};
const FLOW=[['new','Baru'],['handling','Ditangani'],['label','Menunggu label'],['dist','Menunggu distributor'],['review','Perlu peninjauan']];
const S={tab:'proc',stage:null,fam:'all',q:'',sel:{},read:false,form:null,mode:'reply',align:false,fail:null,to:''};
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const pname=id=>people.find(p=>p.id===id)?.name||'';
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':'Staf']]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="Belum ada petugas">–</span>`;};
const isSA=()=>!!me().super;
const wide=()=>innerWidth>1240;
/* ---------- data asli ---------- */
const stageOf=t=>t.status==='done'?'done':t.escalated?'review':({submitted:'new',handling:'handling',label:'label',distributor:'dist'})[t.status]||'handling';
const CONV={created:1,message:1,complete:1,'report-again':1,extend:1,request:1,send:1,finish:1,internal:1};
function dueOf(t){if(t.status==='distributor'&&t.nextFollowup)return U.isoDay(t.nextFollowup);
 if(t.status==='submitted'){const rl=U.rule('support',['Respons awal tiket','working',1]),base=U.isoDay(t.created);return rl.mode==='nextday'?U.addDay(base,rl.value):U.addWork(base,rl.value);}
 return '';}
function rows(){try{return typeof rows112==='function'?rows112():(Tickets112.init(ten).tickets||[]);}catch(err){return [];}}
function toRow(t,mem){const m=mem[t.member]||{},src=t.source||{},cat=CAT[t.category]||[t.category,'other'],s=stageOf(t),today=U.today();
 const staff=a=>people.some(p=>p.id===a);
 const items=(t.items||[]).map(it=>({id:it.id,label:it.label||it.id,s:it.status==='confirmed'?'ok':it.status==='blocked'?'fail':'wait',note:it.note||'',ref:it.reference||'',before:it.before,after:it.after}));
 const hist=t.history||[];
 const msgs=hist.filter(h=>CONV[h.action]&&String(h.note||'').trim()).map(h=>{const who=staff(h.actor)?ini(h.actor):'L',internal=h.action==='internal'||h.public===false;
  const pre={request:'Mohon lengkapi: ',send:'Diteruskan ke distributor · ',finish:'Selesai · '}[h.action]||'';return [who+(internal?'!':''),pre+h.note,U.iso16(h.at)];});
 const act=hist.map(h=>{const who=staff(h.actor)?ini(h.actor):'L';let x=(typeof events112==='object'&&events112[h.action])||h.action;
  if(h.action==='assign'&&h.note)x+=' · '+String(h.note).slice(0,80);if(['escalate','clear-escalation','followup','results'].includes(h.action)&&h.note)x+=' · '+String(h.note).slice(0,90);return [U.iso16(h.at),x,who];});
 const req=t.request||{};
 const changes=items.filter(i=>i.before!==undefined||i.after!==undefined).map(i=>[i.label,i.before??'—',i.after??'—']);
 const files=[...(req.files||[]).map(f=>f?.name||f),req.audio?.name&&`Audio baru · ${req.audio.name}`,req.cover?.name&&`Cover baru · ${req.cover.name}`].filter(Boolean);
 const dueDate=dueOf(t),due=dueDate?U.workDiff(today,dueDate):null;
 const lastReq=[...hist].reverse().find(h=>h.action==='request');
 return {id:t.id,raw:t.status,s,cat:t.category,fam:cat[1],catName:cat[0],title:src.title||'Permintaan umum',artist:src.artist&&src.artist!=='-'?src.artist:'',lab:m.name||t.account||t.member,member:t.member,
  release:t.release&&!String(t.release).startsWith('account:')?t.release:'',handler:t.handler||'',h:ini(t.handler),ver:t.version||0,created:U.iso16(t.created),sent:U.iso16(t.lastSent||t.sentAt),
  done:U.iso16(t.completed||(t.status==='done'?t.updated:0)),since:U.iso16(lastReq?.at||t.updated),required:t.required||lastReq?.note||'',esc:t.escalationNote||'',reopen:t.reopenRequest||null,reference:t.reference||'',
  req:req.note||'',reason:req.reason||'',items,msgs,act,changes,files,dueDate,due,summary:t.summary||'',merged:0,mergedIds:[]};}
function load(){const mem=Object.fromEntries((ten.members||[]).map(m=>[m.id,m]));const all=rows().map(t=>toRow(t,mem));
 /* Pengajuan ganda yang sudah selesai (rilisan & kategori sama) digabung jadi satu baris — data tidak diubah. */
 const groups={},out=[];
 for(const r of all){if(r.s!=='done'){out.push(r);continue;}const k=(r.release||r.member)+'|'+r.cat;(groups[k]||(groups[k]=[])).push(r);}
 for(const g of Object.values(groups)){g.sort((a,b)=>String(b.done).localeCompare(String(a.done)));const top=g[0];top.merged=g.length-1;top.mergedIds=g.slice(1).map(x=>x.id);out.push(top);}
 T=out;}
/* ---------- izin ---------- */
const PERM={claim:'claim',assign:'assign',request:'request',send:'send',followup:'send',results:'finish',finish:'finish'};
function can(t,a){if(typeof write112==='function'&&!write112())return false;
 if(['assign','clear-escalation'].includes(a)&&!isSA())return false;
 if(a==='claim'){if(!(t.raw==='submitted'&&!t.handler))return false;}
 else if(a!=='message'&&!(isSA()||t.handler===state.user))return false;
 try{return typeof may114!=='function'||may114('tickets',PERM[a]||'handle',t.member);}catch(err){return true;}}
/* ---------- tampilan (port dari mock tk1) ---------- */
const isOpen=t=>t.s!=='done';
const dueTxt=t=>{if(t.due==null)return t.s==='label'?`<span class="duet">sejak ${fd(t.since).split(' · ')[0]}</span>`:'';
 if(t.s==='dist'||t.raw==='distributor')return t.due<0?chip(`Tindak lanjut lewat ${-t.due} hari`,'c-red'):t.due===0?chip('Tindak lanjut hari ini','c-or'):`<span class="duet">tindak lanjut ${U.dlabel(t.dueDate)}</span>`;
 return t.due<0?chip(`Terlambat ${-t.due} hari`,'c-red'):t.due===0?chip('Hari ini','c-or'):`<span class="duet">${U.dlabel(t.dueDate)}</span>`;};
const match=t=>!S.q||[t.id,t.title,t.artist,t.lab,t.catName,...t.mergedIds].join(' ').toLowerCase().includes(S.q);
function items(){let r=T.filter(t=>(S.tab==='proc')===isOpen(t)).filter(match);if(S.fam!=='all')r=r.filter(t=>t.fam===S.fam);if(S.tab==='proc'&&S.stage)r=r.filter(t=>t.s===S.stage);const o=['review','new','handling','label','dist'];
 return S.tab==='proc'?r.sort((a,b)=>o.indexOf(a.s)-o.indexOf(b.s)||(a.due??99)-(b.due??99)):r.sort((a,b)=>String(b.done).localeCompare(String(a.done)));}
function tabs(){$('tabs').innerHTML=[['proc','Dalam proses',T.filter(isOpen).length],['done','Selesai',T.filter(t=>!isOpen(t)).length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=T.filter(isOpen),late=P.filter(t=>t.due!=null&&t.due<0).length,merged=T.reduce((n,t)=>n+(t.merged||0),0);
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Tiket Bantuan · hari ini ${U.todayLabel()}</div><h2>${P.length?`${P.length} tiket berjalan`:'Tidak ada tiket berjalan'}</h2>
  <p>${late} lewat tenggat atau tindak lanjut · ${P.filter(t=>t.s==='review').length} perlu peninjauan Super Admin${merged?` · ${merged} pengajuan ganda sudah digabung`:''}</p>
  <div class="acts">${P.length?`<button class="wbtn" data-urgent>Buka yang berikutnya ${ARROW}</button>`:''}<button class="gbtn" data-std>Standar penanganan</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${P.filter(t=>t.s==='dist').length}</b><span>di distributor</span></div><div class="sbox"><b class="n">${P.filter(t=>t.s==='label').length}</b><span>menunggu label</span></div></div></div>
  <div class="flow">${FLOW.map(([k,t])=>{const g=P.filter(x=>x.s===k),l=g.filter(x=>x.due!=null&&x.due<0).length;return `<button class="fn${l||k==='review'&&g.length?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${k==='review'?(g.length?'keputusan Super Admin':'kosong'):l?l+' lewat tenggat':g.length?'tepat waktu':'kosong'}</span></button>`;}).join('')}</div>`;}
function list(){const r=items();let h='';const base=T.filter(t=>(S.tab==='proc')===isOpen(t)).filter(match),cnt=k=>k==='all'?base.length:base.filter(t=>t.fam===k).length;
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari rilisan, label, atau nomor tiket" value="${E(S.q)}"></label>`;
 h+=`<div class="ch"><h3>${S.tab==='proc'?'Dalam proses':'Selesai'} <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${[['all','Semua'],['rel','Rilisan'],['yt','YouTube & Content ID'],['other','Lainnya']].map(([k,t])=>`<button data-fam="${k}" aria-pressed="${S.fam===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
 if(S.stage&&S.tab==='proc')h+=`<div class="flt"><span>Hanya <b style="font-weight:500">${FLOW.find(f=>f[0]===S.stage)[1]}</b></span><button data-stage-clear>Tampilkan semua</button></div>`;
 let cur='';r.forEach((t,i)=>{const g=S.tab==='proc'?t.s:'done';if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${{new:'blue',handling:'blue',label:'orange',dist:'blue',review:'red',done:'green'}[g]})"></i><b>${g==='done'?'Selesai':FLOW.find(f=>f[0]===g)[1]}</b> · ${r.filter(x=>(S.tab==='proc'?x.s:'done')===g).length}</div>`;}
  const prog=t.items.length>1?` · ${t.items.filter(p=>p.s==='ok').length}/${t.items.length} bagian`:'';
  h+=`<div class="it${S.sel[S.tab]===t.id?' sel':''}" data-id="${E(t.id)}" style="--i:${i}"><span class="ty">${FAM[t.fam]}</span><div style="min-width:0"><div class="t1">${E(t.title)} ${chip(E(t.catName),'')}${t.merged?' '+chip(`${t.merged+1} pengajuan digabung`,'c-bl'):''}</div><div class="t2">${E(t.lab)}${t.artist?' · '+E(t.artist):''} · <span class="mono">${E(t.id)}</span>${prog}</div></div><div class="rgt">${S.tab==='proc'?dueTxt(t)+mini(t.h):`<span class="duet">${fd(String(t.done).slice(0,10))}</span>`}</div></div>`;});
 if(!r.length)h+=`<div class="empty"><b>Tidak ada tiket</b>${S.q||S.fam!=='all'||S.stage?'Coba ubah pencarian atau pil.':S.tab==='proc'?'Semua tiket sudah selesai. Tiket baru dari label (menu Pesan) muncul di sini.':'Belum ada tiket selesai.'}</div>`;
 $('list').innerHTML=h;}
/* ---------- rincian ---------- */
const partRows=(t,edit)=>`<div class="parts">${t.items.map((p,i)=>`<div class="pt"><b class="pb2 ${p.s}">${p.s==='ok'?'✓':p.s==='fail'?'!':''}</b><span><span class="pn">${E(p.label)}</span><small>${p.s==='ok'?`${E(p.note||'Terkonfirmasi')}${p.ref?` · <span class="mono">${E(p.ref)}</span>`:''}`:p.s==='fail'?`Ada kendala · ${E(p.note)}`:'menunggu hasil'}</small></span>${edit&&p.s!=='ok'?`<span class="pa">${btn('Terkonfirmasi',`data-part="${i}|ok"`,'sm')}${p.s==='wait'?btn('Ada kendala',`data-part="${i}|fail"`,'sm ghost dng'):''}</span>`:''}</div>${S.fail===i&&edit?`<div class="reveal" style="margin:2px 0 6px"><label class="fld">Kendala dari distributor<textarea id="f-fail" placeholder="Mis. Believe meminta bukti hak"></textarea></label><div class="hrow">${btn('Catat kendala',`data-part="${i}|blocked"`,'dng')}${btn('Batal','data-cancel-fail')}</div></div>`:''}`).join('')}</div>`;
const escForm=t=>S.form==='esc'?`<div class="reveal"><label class="fld">Alasan eskalasi ke Super Admin · terlihat oleh label<textarea id="f-note"></textarea></label><div class="hrow">${btn('Eskalasi','data-do="escalate"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
const askForm=()=>S.form==='ask'?`<div class="reveal"><label class="fld">Yang perlu dilengkapi label<textarea id="f-note" placeholder="Mis. unggah surat pernyataan hak"></textarea></label><div class="hrow">${btn('Minta kelengkapan','data-do="ask"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
const nextFollow=()=>{const c=U.cal(),n=Number(U.policy()?.ticketDays)||3;return U.addWork(U.today(),n,c);};
function next(t){const all=t.items.length&&t.items.every(p=>p.s==='ok'),anyFail=t.items.some(p=>p.s==='fail');
 const escBtn=S.form||!can(t,'escalate')?'':`<div class="hrow mini2">${btn('Eskalasi ke Super Admin','data-form="esc"','ghost')}</div>`;
 if(t.s==='review'){const who=pname(t.handler);return `<div class="nextc"><p><b>${E(who||'Petugas')}</b> meminta peninjauan Super Admin:</p><p class="quote">${E(t.esc||'—')}</p>${!isSA()?'<p class="where">Menunggu keputusan Super Admin.</p>':S.form==='rev'?`<div class="reveal"><label class="fld">Hasil peninjauan · tercatat di tiket<textarea id="f-note" placeholder="Mis. minta bukti kerja sama tertulis dari label"></textarea></label><div class="hrow">${btn('Catat & lanjutkan penanganan','data-do="reviewed"','pri')}${btn('Batal','data-form=""')}</div></div>`:S.form==='to'?`<div class="reveal"><div class="fld">Alihkan ke<div class="opts">${people.filter(p=>p.id!==t.handler).map(p=>`<button data-to="${p.id}" aria-pressed="${S.to===p.id}">${E(p.name)}<small>${p.super?'Super Admin':'Staf'}</small></button>`).join('')}</div></div><div class="hrow">${btn('Alihkan','data-do="reassign"','pri',!S.to)}${btn('Batal','data-form=""')}</div></div>`:`<div class="hrow">${btn('Catat peninjauan','data-form="rev"','pri')}${btn('Alihkan ke petugas lain','data-form="to"')}</div>`}</div>`;}
 if(t.s==='new')return `<div class="nextc"><p>Permintaan baru dari <b>${E(t.lab)}</b>. Belum ada petugas.</p><div class="hrow">${can(t,'claim')?btn('Mulai penanganan '+ARROW,'data-do="start"','pri'):''}</div><p class="where">Menekan Mulai penanganan menjadikanmu petugasnya.</p></div>`;
 if(t.s==='handling'){if(!can(t,'send')&&!can(t,'request'))return `<div class="nextc"><p>Ditangani oleh <b>${E(pname(t.handler)||'petugas lain')}</b>.</p></div>`;
  const other=t.fam==='other',roy=t.cat==='royalty-issue';
  const fwd=S.form==='fwd'?`<div class="reveal"><div class="f2"><label class="fld">Nomor referensi distributor<input id="f-ref" placeholder="Mis. Believe #4821"></label></div><label class="fld">Catatan · terlihat oleh label<textarea id="f-note">Permintaan diteruskan ke distributor.</textarea></label>${S.align?`<label class="tg2"><input type="checkbox" id="f-align"> Sudah diselaraskan dengan tiket terkait untuk rilisan ini</label>`:''}<p class="where">Tindak lanjut otomatis ${U.dlabel(nextFollow())} (${Number(U.policy()?.ticketDays)||3} hari kerja).</p><div class="hrow">${btn('Teruskan','data-do="forward"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  const ans=S.form==='answer'?`<div class="reveal"><label class="fld">Jawaban ke label<textarea id="f-note" placeholder="${roy?'Mis. laporan Juli memuat 14 label; pendapatan turun karena…':'Tulis jawaban yang jelas'}"></textarea></label><div class="hrow">${btn('Kirim & selesaikan','data-do="answer"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>${other?(roy?'Periksa laporan royalti label ini, lalu jawab.':'Baca permintaannya, lalu jawab.'):'Periksa permintaan dan lampirannya, lalu teruskan ke distributor.'}</p><div class="hrow">${other?(roy?btn('Buka Royalti '+ARROW,'data-go="royalty"'):'')+(S.form?'':btn('Jawab & selesaikan','data-form="answer"','pri')):(S.form?'':btn('Teruskan ke distributor '+ARROW,'data-form="fwd"','pri'))}${S.form||!can(t,'request')?'':btn('Minta kelengkapan','data-form="ask"')}</div>${fwd}${ans}${askForm()}${escForm(t)}${escBtn}</div>`;}
 if(t.s==='label')return `<div class="nextc"><p>Menunggu label sejak ${fd(t.since)}.</p>${t.required?`<p class="quote">${E(t.required)}</p>`:''}<p class="where">Tiket kembali ke Ditangani saat label mengirim kelengkapan dari menu Pesan.</p><div class="hrow">${can(t,'message')?btn('Kirim pengingat','data-do="remind"'):''}</div></div>`;
 if(t.s==='dist'){const edit=can(t,'results');
  const fu=S.form==='fu'?`<div class="reveal"><label class="fld">Catatan tindak lanjut<textarea id="f-note" placeholder="Mis. Believe belum membalas, sudah ditanyakan ulang"></textarea></label><label class="fld">Periksa lagi pada<input id="f-next" type="date" value="${nextFollow()}"></label><div class="hrow">${btn('Simpan tindak lanjut','data-do="followup"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  const fin=S.form==='fin'?`<div class="reveal"><label class="fld">Ringkasan untuk label<textarea id="f-note">Semua bagian sudah terkonfirmasi distributor.</textarea></label><div class="hrow">${btn('Selesaikan tiket','data-do="finish"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>Diteruskan ke distributor ${fd(t.sent)}${t.reference?` · <span class="mono">${E(t.reference)}</span>`:''}. Catat hasil tiap bagian.</p>${partRows(t,edit)}<div class="hrow">${can(t,'finish')&&!S.form?btn('Tandai selesai','data-form="fin"','pri',!all):''}${can(t,'followup')&&!S.form?btn('Catat tindak lanjut ke distributor','data-form="fu"',t.due!=null&&t.due<=0&&!all?'pri':''):''}</div>${anyFail?`<p class="where">Ada bagian dengan kendala — minta kelengkapan ke label atau teruskan ulang setelah diperbaiki.</p>`:''}${!all&&!anyFail?`<p class="where">Selesai aktif setelah semua bagian terkonfirmasi.</p>`:''}${fu}${fin}${askForm()}${escForm(t)}${escBtn}</div>`;}
 return `<div class="nextc ok"><p>Selesai ${fd(t.done)}.${t.merged?` ${t.merged} pengajuan serupa digabung ke baris ini (${t.mergedIds.slice(0,6).join(', ')}${t.mergedIds.length>6?', …':''}).`:''}</p>${t.summary?`<p class="quote">${E(t.summary)}</p>`:''}${t.items.length?partRows(t,false):''}${t.reopen&&can(t,'reopen')?(S.form==='reopen'?`<div class="reveal"><label class="fld">Catatan pembukaan kembali<textarea id="f-note"></textarea></label><div class="hrow">${btn('Buka kembali','data-do="reopen"','pri')}${btn('Batal','data-form=""')}</div></div>`:`<p class="where">Label melaporkan masalah ini berulang.</p><div class="hrow">${btn('Buka kembali · masalah berulang','data-form="reopen"','pri')}</div>`):''}</div>`;}
function steps(t){const L=['Diajukan','Ditangani','Diteruskan','Selesai'],at={new:0,handling:1,label:1,review:1,dist:2,done:4}[t.s],wait=['label','review'].includes(t.s);
 return `<div class="steps" style="--n:4"><i class="prog" style="--w:calc(100% * ${Math.min(at,3)} / 4)"></i>${L.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${i===at&&t.s==='label'?'Menunggu label':i===at&&t.s==='review'?'Peninjauan':s}</span></div>`).join('')}</div>`;}
function convo(t){const St=STAFF(),me2=ini(state.user);const who=w=>w==='L'?['lbl',E(t.lab)]:[w===me2?'me':'them',E(St[w]?.[0]||'Petugas')];
 const canNote=can(t,'internal'),canMsg=can(t,'message')&&t.s!=='done';
 if(!canNote&&S.mode==='note')S.mode='reply';
 return `<div class="thread">${t.msgs.map(([w,x,at])=>{const internal=w.endsWith('!'),[cls,name]=who(w.replace('!',''));return `<div class="bub ${internal?'int':cls==='lbl'?'them':'me2'}"><small class="bw">${internal?'Catatan internal · ':''}${name}</small>${E(x)}<small>${fd(at)}</small></div>`;}).join('')||'<p class="where">Belum ada percakapan.</p>'}</div>
 ${canMsg||canNote?`<div class="comp"><div class="seg2">${canMsg?`<button data-mode="reply" aria-pressed="${S.mode==='reply'}">Balas ke label</button>`:''}${canNote?`<button data-mode="note" aria-pressed="${S.mode==='note'}">Catatan internal</button>`:''}</div><textarea id="f-msg" placeholder="${S.mode==='reply'?'Tulis balasan · terlihat oleh label':'Hanya terlihat oleh tim'}"></textarea><div class="hrow">${btn(S.mode==='reply'?'Kirim ke label':'Simpan catatan','data-do="msg"','pri')}<span class="where">Pesan tidak mengubah status tiket.</span></div></div>`:''}`;}
function pane(){const t=items().find(x=>x.id===S.sel[S.tab]);if(!t){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>Pilih tiket</b>Rinciannya tampil di sini.</div>`;return;}let i=0;
 const links=t.cat==='royalty-issue'?`<button class="lnk" data-go="royalty">Royalti</button>`:t.release?`<button class="lnk" data-rel="${E(t.release)}">Rilisan</button>`:'';
 const ini2=String(t.lab).split(' ').map(z=>z[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?'Dalam proses':'Selesai'}</button><div class="k"><span class="ty">${FAM[t.fam]}</span>${E(t.catName)} · <span class="mono">${E(t.id)}</span></div><h2>${E(t.title)}</h2><div class="meta">${E(t.lab)}${t.artist?`<span class="sep"></span>${E(t.artist)}`:''}${links?`<span class="sep"></span>${links}`:''}<span class="sep"></span>${chip(...ST[t.s])}</div></div>
 <div class="pb">${sec(i++,isOpen(t)?'Langkah berikutnya':'Keadaan',next(t),isOpen(t)?dueTxt(t):'')}
 ${sec(i++,'Tahapan',steps(t))}
 ${sec(i++,'Permintaan',`${t.req?`<p class="para">${E(t.req)}</p>`:''}${t.reason?`<p class="where">Alasan: ${E(t.reason)}</p>`:''}${t.changes.length?`<div class="cmpw" style="margin-top:10px"><table class="cmpt"><thead><tr><th></th><th>Sebelumnya</th><th>Usulan</th></tr></thead><tbody>${t.changes.map(([f,a,b])=>`<tr><th>${E(f)}</th><td class="old">${E(a)}</td><td><span class="new">${E(b)}</span></td></tr>`).join('')}</tbody></table></div>`:''}${t.files.length?`<div class="files">${t.files.map(f=>`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(f)}</b><small>lampiran label</small></span></div>`).join('')}</div>`:''}${!t.req&&!t.changes.length&&!t.files.length?'<p class="where">Tidak ada rincian tambahan.</p>':''}`)}
 ${t.items.length&&!['dist','done'].includes(t.s)?sec(i++,'Hasil per bagian',partRows(t,false),`${t.items.filter(p=>p.s==='ok').length} dari ${t.items.length}`):''}
 ${sec(i++,'Percakapan',convo(t),`${t.msgs.length} pesan`)}
 ${sec(i++,'Aktivitas',`<div class="hist">${t.act.slice().reverse().map(([w,x,who])=>`<div>${who==='L'?`<span class="mini lbl">${E(ini2)}</span>`:mini(who)}<span>${E(x)}<small style="display:block">${who==='L'?E(t.lab):E(STAFF()[who]?.[0]||'Petugas')} · ${fd(w)}</small></span></div>`).join('')}</div>`)}</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea,#pin select').forEach(el=>{if(el.id&&el.type!=='checkbox')vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(x){toast137(DEF,x);}
function open(id,keepStage){S.sel[S.tab]=id;S.form=null;S.fail=null;S.align=false;S.to='';S.read=true;if(!keepStage)S.stage=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
/* ---------- tindakan: run112 (fungsi asli) ---------- */
function msgOf(err){return String(err?.message||err);}
function cur(id){return Tickets112.init(ten).tickets.find(x=>x.id===id);}
function run(kind,t,p={}){run112(kind,{id:t.id,version:cur(t.id)?.version,...p});}
function act(a,arg){const t=T.find(x=>x.id===S.sel[S.tab]);if(!t)return;let msg='',moved=false;const note=val('f-note');
 try{
  if(a==='start'){run('claim',t);msg='Dimulai · kamu petugasnya';}
  else if(a==='forward'){const reference=val('f-ref');if(!reference){toast('Isi nomor referensi dari distributor');return;}if(!note){toast('Tulis catatan untuk label');return;}
   const p={reference,note,checked:true};if(S.align){if(!$('f-align')?.checked){toast('Centang bahwa permintaan terkait sudah diselaraskan');return;}p.aligned=true;}
   try{run('send',t,p);}catch(err){if(/permintaan terkait/i.test(msgOf(err))){S.align=true;repane();toast(msgOf(err));return;}throw err;}
   msg=`Diteruskan · tindak lanjut otomatis ${U.dlabel(nextFollow())}`;}
  else if(a==='ask'){if(!note){toast('Tulis yang perlu dilengkapi');return;}run('request',t,{note});msg='Permintaan kelengkapan dikirim ke label';}
  else if(a==='escalate'){if(!note){toast('Tulis alasan eskalasi');return;}run('escalate',t,{note});msg='Dieskalasikan ke Super Admin';}
  else if(a==='answer'){if(!note){toast('Tulis jawaban');return;}run('message',t,{note,files:[]});const open=(cur(t.id).items||[]).filter(i=>i.status!=='confirmed');
   if(open.length)run('results',t,{checked:true,note:'Dijawab lewat percakapan.',results:open.map(i=>({id:i.id,status:'confirmed',note:'Selesai lewat percakapan.',reference:'Percakapan '+t.id}))});
   run('finish',t,{checked:true,note:'Dijawab dan diselesaikan.'});msg='Terjawab · tiket selesai';moved=true;}
  else if(a==='remind'){run('message',t,{note:'Pengingat: '+(t.required||'mohon lengkapi permintaan ini agar bisa kami lanjutkan.'),files:[]});msg='Pengingat dikirim ke label';}
  else if(a==='part'){const [i,s]=String(arg).split('|');const it=t.items[+i];if(!it)return;
   if(s==='fail'){S.fail=+i;repane();$('f-fail')?.focus();return;}
   if(s==='blocked'){const n=val('f-fail');if(!n){toast('Tulis kendalanya');return;}run('results',t,{checked:true,note:n,results:[{id:it.id,status:'blocked',note:n,reference:''}]});S.fail=null;msg='Kendala dicatat';}
   else{run('results',t,{checked:true,note:'Hasil distributor dicatat.',results:[{id:it.id,status:'confirmed',note:'Terkonfirmasi distributor',reference:t.reference||('Referensi '+t.id)}]});msg=`${it.label}: terkonfirmasi`;}}
  else if(a==='followup'){if(!note){toast('Tulis catatan tindak lanjut');return;}const d=val('f-next');const next=Date.parse((d||nextFollow())+'T09:00:00+07:00');if(!(next>ten.now)){toast('Pilih tanggal setelah hari ini');return;}run('followup',t,{note,next});msg=`Tindak lanjut dicatat · periksa lagi ${U.dlabel(d||nextFollow())}`;}
  else if(a==='finish'){run('finish',t,{checked:true,note:note||'Semua bagian sudah terkonfirmasi distributor.'});msg='Tiket selesai · label diberi tahu';moved=true;}
  else if(a==='reviewed'){if(!note){toast('Tulis hasil peninjauan');return;}run('clear-escalation',t,{note});msg='Peninjauan dicatat · penanganan berlanjut';}
  else if(a==='reassign'){if(!S.to){toast('Pilih petugas');return;}run('assign',t,{handler:S.to,note:`Dialihkan ke ${pname(S.to)} oleh Super Admin.`});msg=`Dialihkan ke ${pname(S.to)}`;S.to='';}
  else if(a==='reopen'){if(!note){toast('Tulis catatan');return;}run('reopen',t,{note});msg='Dibuka kembali · pindah ke Dalam proses';moved=true;S.tab='proc';}
  else if(a==='msg'){const n=val('f-msg');if(!n){toast('Tulis pesan dulu');return;}run(S.mode==='note'?'internal':'message',t,S.mode==='note'?{note:n}:{note:n,files:[]});msg=S.mode==='note'?'Catatan internal disimpan':'Pesan terkirim ke label';}
 }catch(err){toast(msgOf(err));return;}
 S.form=null;S.align=false;S.fail=null;if(S.stage&&!moved)S.stage=null;lastSig='';lastPane='';
 if(moved){load();const r=items();if(a==='reopen'){S.sel.proc=t.id;}else S.sel[S.tab]=r[0]?.id;}
 render();toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.stage=null;paint();return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='proc';S.q='';S.fam='all';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.tab='proc';S.q='';S.fam='all';S.stage=null;const r=items();if(r[0])open(r[0].id);return;}
  const fm2=t.closest('[data-fam]');if(fm2){S.fam=fm2.dataset.fam;paint();return;}
  const md=t.closest('[data-mode]');if(md){S.mode=md.dataset.mode;repane();$('f-msg')?.focus();return;}
  const to=t.closest('[data-to]');if(to){S.to=to.dataset.to;repane();return;}
  if(t.closest('[data-cancel-fail]')){S.fail=null;repane();return;}
  const pt=t.closest('[data-part]');if(pt){act('part',pt.dataset.part);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;S.align=false;repane();(root.querySelector('.reveal input:not([type=checkbox]),.reveal textarea'))?.focus();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const rl=t.closest('[data-rel]');if(rl){openRelease(rl.dataset.rel);return;}
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast('Buka menu '+go.dataset.go);return;}
  if(t.closest('[data-std]')){window.stdTab137='layanan';if(!go137('standards'))toast('Buka Standar & Penanda');return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id,true);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function openRelease(id){try{if(typeof ui105==='object'){ui105.view='detail';ui105.id=id;}}catch(err){}if(!go137('releases'))toast('Buka Rilisan');}
/* Masuk dari Pekerjaan / Kotak Masuk / Studio: detail112(id) memilih tiket di halaman baru. */
let pending=null;
function intake(){if(!pending)return;const id=pending;pending=null;load();const merged=T.find(x=>x.id===id||x.mergedIds.includes(id));if(!merged)return;
 S.tab=isOpen(merged)?'proc':'done';S.stage=null;S.q='';S.fam='all';S.sel[S.tab]=merged.id;S.read=true;S.form=null;lastSig='';}
const sig=()=>T.map(t=>[t.id,t.raw,t.ver,t.h,t.due,t.items.map(i=>i.s).join('')].join(':')).join('|')+'|'+U.today()+'|r:'+ten.role+state.user;
const DEF={id:'tickets',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='tickets'&&!state.preview&&(typeof allowed112!=='function'||allowed112()),
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Tiket Bantuan */
DEF.sum=function(){load();const P=T.filter(isOpen),raw=Object.fromEntries((ten.tickets112?.tickets||[]).map(t=>[t.id,t]));
 const I=P.map(t=>{const x=raw[t.id]||{},esc=[...(x.history||[])].reverse().find(h=>h.action==='escalate');
  return {id:t.id,src:'ticket',menu:'Tiket Bantuan',ic:'ticket',t:x.request?.subject133||`${t.catName} · ${t.title}`,l:t.lab,m:t.member,s:t.s,st:(ST[t.s]||[t.s])[0],due:t.due,dueDate:t.dueDate,over:t.due!=null&&t.due<0,who:t.handler,
   wait:t.s==='label'?'Label':t.s==='dist'?'Distributor':t.s==='review'?'Super Admin':'',esc:t.s==='review'?{by:esc?.actor||t.handler||'',at:esc?U.iso16(esc.at):'',note:t.esc||esc?.note||''}:null};});
 const late=I.filter(t=>t.over).length,rev=I.filter(t=>t.esc).length,merged=T.reduce((n,t)=>n+(t.merged||0),0);
 return {P:I,late,rev,merged,line:P.length?`${P.length} berjalan · ${late} lewat tenggat${rev?` · ${rev} perlu peninjauan Super Admin`:''}${merged?` · ${merged} pengajuan ganda digabung`:''}`:'Tidak ada tiket berjalan',tone:late||rev?'r':'g'};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
if(typeof detail112==='function'){const detBefore=detail112;detail112=function(id){if(isLabel10()||state.preview)return detBefore.apply(this,arguments);pending=id;if(DEF.when()){lastSig='';render();}else if(!go137('tickets'))return detBefore.apply(this,arguments);};}
})();
