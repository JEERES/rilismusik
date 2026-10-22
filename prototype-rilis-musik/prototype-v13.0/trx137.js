/* v1.1.0-dev.34 — Transaksi dirancang ulang (rancangan disetujui 21 Okt 2026, mock trx1).
   Tab Transaksi · Pengembalian, pita biru yang hanya menghitung yang perlu ditangani (Belum dipenuhi · Tidak cocok penyedia ·
   Dana tanpa transaksi · Menunggu info label · Pengembalian berjalan), satu status per transaksi, satu langkah per kasus,
   tabel Rilis Musik vs penyedia, dan antrean pengembalian paket lama (lifetime) sesuai keputusan 19 Okt.
   Data & tindakan: Transactions113 lewat atomic113 (asli) dan transisi paket lama lewat stepRefund132 (asli). */
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
.pickrow:hover{box-shadow:inset 0 0 0 1px var(--line)}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Transaksi</h1><div class="sub">Uang masuk dari label (paket, kredit, layanan), pencocokan dengan penyedia pembayaran, dan pengembalian dana.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,T=[],R=[],CHK=null,SA=false,canW=false,lastPane='',lastSig='',pend=null,first=true;
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>');
const ICON={plan:sv('<path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="m4 7 8 4 8-4M12 11v10"/>'),credits:sv('<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 10.5c0-1 1.3-1.8 3-1.8s3 .8 3 1.8-1.3 1.5-3 1.5-3 .7-3 1.7 1.3 1.8 3 1.8 3-.8 3-1.8"/>'),service:sv('<path d="M12 3v18M3 12h18"/>'),unknown:sv('<circle cx="12" cy="12" r="8"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const MS=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],MON=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const ft=s=>{if(!s)return 'baru saja';const [y,m,d]=s.slice(0,10).split('-').map(Number);return `${d} ${MS[m-1]}`+(s.length>10?` ${s.slice(11,16).replace(':','.')}`:'');};
const rp=n=>'Rp '+Math.round(n||0).toLocaleString('id-ID');
const rps=n=>n>=1e9?`Rp ${(n/1e9).toLocaleString('id-ID',{maximumFractionDigits:2})} M`:n>=1e6?`Rp ${(n/1e6).toLocaleString('id-ID',{maximumFractionDigits:2})} jt`:rp(n);
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const inis=s=>String(s).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(n,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(n)}">${E(inis(n))}</span>`;
const pname=id=>people.find(p=>p.id===id)?.name||'';
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const bankN=b=>!b?'':/central asia|bca/i.test(b)?'BCA':/rakyat|bri/i.test(b)?'BRI':/negara|bni/i.test(b)?'BNI':/syariah|bsi/i.test(b)?'BSI':/mandiri/i.test(b)?'Mandiri':String(b).trim();
const KIND={plan:'Paket',credits:'Kredit',service:'Layanan',unknown:'Tanpa transaksi'};
const ISS={unfulfilled:['Dibayar, belum dipenuhi','c-or'],mismatch:['Nominal tidak cocok','c-red'],late:['Dibayar setelah kedaluwarsa','c-or'],unsynced:['Dibayar, status belum diperbarui','c-or'],dup:['Pembayaran ganda','c-red'],missing:['Konfirmasi penyedia hilang','c-red'],refundmis:['Pengembalian belum cocok','c-red'],info:['Menunggu info label','c-or'],reported:['Dilaporkan label','c-or'],unknown:['Dana tanpa transaksi','c-red']};
const STS={pending:['Menunggu bayar','c-bl'],expired:['Kedaluwarsa',''],paid:['Dibayar','c-or'],done:['Dipenuhi','c-gr']};
const PAYN={pending:'Menunggu bayar',paid:'Dibayar',expired:'Kedaluwarsa'};
const RST={eligible:['Berhak · belum mengajukan',''],submitted:['Diajukan','c-bl'],checking:['Diperiksa','c-bl'],info:['Menunggu rekening label','c-or'],approved:['Disetujui','c-or'],processing:['Sedang dikembalikan','c-or'],done:['Selesai','c-gr'],rejected:['Ditolak',''],closed:['Ditutup tanpa pengembalian','']};
const RK={legacy:'Paket lama',eligible:'Paket lama',dup:'Pembayaran ganda',over:'Kelebihan bayar',late:'Dibayar terlambat',unfit:'Layanan tidak dapat dipenuhi',other:'Pengembalian dana'};
const EVT={created:'Pembelian dibuat',paid:'Pembayaran berhasil',fulfilled:'Pembelian dipenuhi',retry:'Pembayaran baru dibuat',synced:'Pembayaran dicocokkan dengan penyedia',review:'Pemeriksaan dibuka',claim:'Penanganan dimulai',assign:'Penanganan dialihkan','request-info':'Informasi diminta ke label',respond:'Label mengirim informasi',resolve:'Pemeriksaan ditutup','refund-open':'Pengembalian dibuka','refund-info':'Rekening tujuan diminta','refund-destination':'Rekening dikonfirmasi label','refund-approve':'Pengembalian disetujui','refund-process':'Pengembalian diproses','refund-done':'Dana dikembalikan','refund-close':'Pengembalian ditutup tanpa pengembalian'};
const NOTE={review:1,'request-info':1,respond:1,resolve:1,assign:1,'refund-open':1,'refund-info':1,'refund-approve':1,'refund-close':1};
const S={tab:'tx',stage:null,kind:'all',q:'',sel:{},read:false,form:null,pick:null,route:'origin',routeFor:''};
const wide=()=>innerWidth>1240;
const FLOW=[['unfulfilled','Belum dipenuhi',t=>t.issue==='unfulfilled'],['match','Tidak cocok penyedia',t=>['mismatch','late','unsynced','dup','missing','refundmis'].includes(t.issue)],['unknown','Dana tanpa transaksi',t=>t.issue==='unknown'],['info','Menunggu info label',t=>['info','reported'].includes(t.issue)]];
const PRI={mismatch:0,unknown:1,dup:2,late:3,unsynced:4,missing:5,refundmis:6,unfulfilled:7,reported:8,info:9};
/* ---------- data asli ---------- */
const store=()=>Transactions113.init(ten);
const seen=o=>{try{return typeof visibleObject114!=='function'||visibleObject114('transactions',o);}catch(err){return true;}};
const who=(actor,o)=>!actor?'SY':o&&actor===o.account||RM10.getMember(ten,actor)?'L':ini(actor)||'SY';
function load(){const m=store();SA=!!me().super;try{canW=!!write113();}catch(err){canW=false;}CHK=m.check||null;
 let rw=[];try{rw=Transactions113.rows(ten);}catch(err){}
 T=rows113().filter(seen).map(o=>tx(o,rw,m));
 for(const p of m.provider){if(p.refund||m.orders.some(o=>o.id===p.order))continue;if(p.handled113||rw.some(r=>r.provider===p.id&&r.kind==='unrecognized'))T.push(unk(p));}
 R=[...m.refunds.map(r=>rfTx(r,m)).filter(Boolean),...legacy()];}
function tx(o,rw,m){const a=Transactions113.attempt(o),ps=m.provider.filter(p=>p.order===o.id&&!p.refund),pr=Transactions113.pendingRefund(ten,o);
 let rec=0,back=0;try{rec=Transactions113.received(ten,o);back=Transactions113.refunded(ten,o);}catch(err){}
 const mine=rw.filter(r=>r.order===o.id),has=k=>mine.some(r=>r.kind===k);let issue='';
 if(!pr){if(!(back>0&&back>=rec)){issue=has('amount')?'mismatch':has('duplicate')?'dup':has('status')?(a.status==='expired'||o.payment==='expired'?'late':'unsynced'):has('missing')?'missing':has('refund')?'refundmis':'';}
  if(!issue)issue=o.case?.status==='info'?'info':o.case?.status==='review'?'reported':Transactions113.issue(ten,o)==='fulfillment'?'unfulfilled':'';}
 const st=o.payment==='paid'?(o.fulfilled?'done':'paid'):o.payment==='expired'?'expired':'pending';
 const items=o.kind==='credits'?[`${o.credits} kredit Flex`,...(o.bonus?[`+ ${o.bonus} kredit penawaran`]:[])]:o.kind==='plan'?(o.benefits||[]).map(x=>typeof x==='string'?x:x.id||''):(o.items||[]).map(x=>{const n=x&&x.title||x;return o.source?.type==='addon'?`${o.quantity||1} satuan · untuk rilisan "${n}"`:o.source?.type==='wami'?`Registrasi untuk "${n}"`:String(n);});
 const pv=ps.find(p=>p.status==='paid')||ps[0],pv2=ps.find(p=>p!==pv);
 const hist=o.history.map(h=>{let x=EVT[h.key]||h.key;if(h.note&&(NOTE[h.key]||h.key==='synced'&&!/^Status diperbarui|^Pembayaran simulasi/.test(h.note)))x+=' · '+h.note;if(h.key==='fulfilled'&&o.fulfilled)x+=' · '+result113(o);return [iso(h.at),x,who(h.actor,o)];});
 return {id:o.id,o,lab:name113(o.account),acc:o.account,kind:o.kind,title:title113(o),items,amount:o.amount,created:iso(o.created),due:st==='pending'||st==='expired'?iso(a.expires):'',paidAt:a.paidAt?iso(a.paidAt):'',provAt:pv?iso(pv.at):'',st,issue,
  rm:[PAYN[a.status]||a.status,a.id],pv:pv?[pv.status==='paid'?'Berhasil':'Dikembalikan',pv.amount,pv.reference,pv]:null,pv2:pv2?[pv2.status==='paid'?'Berhasil':'Dikembalikan',pv2.amount,pv2.reference]:null,
  refund:m.refunds.find(r=>r.order===o.id)?.id||'',pr:pr?.id||'',rec,back,result:o.fulfilled?result113(o):'',handler:o.handler,ver:o.version,method:o.method,
  prompt:o.case?.prompt||'',report:o.case?.reason||'',asked:o.case&&o.case.status!=='resolved'?iso(o.case.requested):'',hist};}
function unk(p){const h=p.handled113;return {id:p.id,p,lab:'',kind:'unknown',title:'Dana masuk tanpa transaksi',items:[],amount:p.amount,created:iso(p.at),st:h?'done':'review',issue:h?'':'unknown',rm:null,pv:['Berhasil',p.amount,p.reference,p],pv2:null,
  result:h?(h.how==='return'?`Dikembalikan ke pengirim · referensi ${h.reference}`:'Ditangani manual · '+h.note):'',
  hist:[[iso(p.at),'Dana diterima penyedia','SY'],...(CHK?.at&&CHK.at>=p.at?[[iso(CHK.at),'Pencocokan: tidak ada transaksi yang cocok','SY']]:[]),...(h?[[iso(h.at),(h.how==='return'?`Dikembalikan ke pengirim · referensi ${h.reference}`:'Ditandai sudah ditangani')+' · '+h.note,ini(h.actor)||'SA']]:[])]};}
const rkind=s=>/ganda/i.test(s)?'dup':/kedaluwarsa/i.test(s)?'late':/selisih|kelebihan/i.test(s)?'over':/tidak dapat dipenuhi/i.test(s)?'unfit':'other';
function rfTx(r,m){const o=m.orders.find(x=>x.id===r.order);if(!o||!seen(o))return null;
 let rec=0,max=0;try{rec=Transactions113.received(ten,o);max=rec-Transactions113.reserved(ten,o,r.id);}catch(err){}
 const st={review:'checking',info:'info',approved:'approved',processing:'processing',done:'done',closed:'closed'}[r.status]||'checking';
 let sug=r.amount||r.proposed||(o.payment==='paid'?rec-o.amount:rec);if(!(sug>0))sug=max;sug=Math.max(0,Math.min(sug,max));
 const d=r.destination;
 return {id:r.id,src:'tx',r,o,kind:rkind(r.reason),lab:name113(o.account),acc:o.account,origin:o.id,amount:['checking','info'].includes(st)?sug:r.amount,max,st,at:iso(r.created),note:r.note,
  bank:d?`${bankN(d.bank)} ••${String(d.number).slice(-4)} · a.n. ${d.holder}`:'',confirmed:!!r.confirmed,route:r.method,ref:r.reference||'',why:r.resolution||'',prompt:r.prompt||'',
  hist:[[iso(r.created),'Pengembalian dibuka · '+r.note,who(r.handler,o)],...(r.history||[]).map(h=>[iso(h.at),(EVT[h.key]||h.key)+(h.note&&h.key!=='refund-destination'?' · '+h.note:''),who(h.actor,o)])]};}
const LEV={submitted:r=>`Pengembalian diajukan lewat Pesan (${r.ticket})`,checking:()=>'Pemeriksaan dimulai',approved:()=>'Disetujui · refund penuh',paid:()=>'Dibayar · label pindah ke Basic',rejected:()=>'Ditolak'};
function legacy(){if(typeof tr132!=='function')return [];const s=tr132(),news=transitionNews132(),out=[],sent=news?[[iso(news.at),'Pemberitahuan "Layanan Anda berubah" dikirim',ini(news.by)||'SA']]:[];
 for(const r of s.requests){const l=s.lifetime[r.member],m=mem132(r.member);if(!l||!m)continue;const read=readAt132(r.member),due=deadline132(r.member);
  const hist=[...sent,...(read?[[iso(read),'Label membaca pemberitahuan','L']]:[]),...(r.proofAsked?[[iso(r.proofAsked),'Bukti pembayaran lama diminta lewat Pesan','SA']]:[]),...r.history.map(h=>[iso(h.at),(LEV[h.status]?LEV[h.status](r):h.status)+(h.note?' · '+h.note:''),h.actor===r.member||h.actor===m.id?'L':ini(h.actor)||'SA'])].sort((a,b)=>a[0].localeCompare(b[0]));
  out.push({id:r.id,src:'legacy',r,kind:'legacy',key:r.member,lab:m.name,acc:m.id,plan:l.plan,bought:l.bought,amount:l.amount,origin:l.ref,st:r.status==='paid'?'done':r.status,read:read?iso(read):'',due:due?iso(due):'',on:due?r.at<=due:true,at:iso(r.at),ticket:r.ticket,note:r.note,
   bank:/lihat percakapan|see conversation/i.test(r.bank||'')?'':r.bank||'',ref:r.reference||'',why:r.reason||'',asked:r.proofAsked?iso(r.proofAsked):'',hist});}
 for(const k of lifeIds132()){if(s.requests.some(r=>r.member===k))continue;const l=s.lifetime[k],m=mem132(k),read=readAt132(k),due=deadline132(k);
  out.push({id:'EL-'+k,src:'eligible',kind:'eligible',key:k,lab:m.name,acc:m.id,plan:l.plan,bought:l.bought,amount:l.amount,origin:l.ref,st:'eligible',read:read?iso(read):'',due:due?iso(due):'',hist:sent.slice()});}
 return out;}
/* ---------- daftar ---------- */
const openIss=t=>!!t.issue;
const RUN=['submitted','checking','info','approved','processing'],WORK=['submitted','checking','approved','processing'];
const rfOpen=()=>R.filter(r=>RUN.includes(r.st));
const grpTx=t=>openIss(t)?0:t.st==='pending'||t.pr?1:2;
const match=t=>!S.q||[t.id,t.lab,t.title,KIND[t.kind],t.pv?.[2]].join(' ').toLowerCase().includes(S.q);
function items(){if(S.tab==='tx'){let r=T.filter(match);if(S.kind!=='all')r=r.filter(t=>t.kind===S.kind);if(S.stage){const f=FLOW.find(x=>x[0]===S.stage);r=r.filter(f[2]);}
  return r.sort((a,b)=>grpTx(a)-grpTx(b)||(grpTx(a)===0?(PRI[a.issue]??9)-(PRI[b.issue]??9):0)||b.created.localeCompare(a.created));}
 const o=['submitted','checking','approved','processing','info','eligible','done','rejected','closed'];
 return R.filter(r=>!S.q||[r.id,r.lab,r.origin,RK[r.kind]].join(' ').toLowerCase().includes(S.q)).sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||(b.at||'').localeCompare(a.at||''));}
const monthKey=()=>U.today().slice(0,7);
const received=()=>store().provider.filter(p=>!p.refund&&p.status==='paid'&&iso(p.at).slice(0,7)===monthKey()).reduce((n,p)=>n+p.amount,0);
function tabs(){$('tabs').innerHTML=[['tx','Transaksi',T.length],['rf','Pengembalian',R.length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const work=T.filter(openIss).length+R.filter(r=>WORK.includes(r.st)).length,ro=rfOpen().reduce((a,r)=>a+(r.amount||0),0),rec=received(),mon=MON[+monthKey().slice(5)-1];
 const chk=CHK?.at?ft(iso(CHK.at)):'belum ada',fail=CHK?.ok===false;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Uang masuk · hari ini ${E(U.todayLabel())}</div><h2>${work?`${work} hal perlu ditangani`:'Semua transaksi beres'}</h2>
  <p>Diterima penyedia bulan ini ${rps(rec)} · pencocokan otomatis terakhir ${chk}${fail?' · <b style="font-weight:500">data penyedia belum tersedia, cek lagi</b>':''}</p>
  <div class="acts"><button class="wbtn" data-urgent>Buka yang berikutnya ${ARROW}</button>${canW?'<button class="gbtn" data-check>Cek pencocokan sekarang</button>':''}</div></div>
  <div class="statg"><div class="sbox"><b class="n">${rps(rec)}</b><span>diterima ${mon}</span></div><div class="sbox"><b class="n">${rps(ro)}</b><span>pengembalian berjalan</span></div></div></div>
  <div class="flow">${FLOW.map(([k,t,f])=>{const g=T.filter(f);return `<button class="fn${g.length&&['match','unknown'].includes(k)?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='tx'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${g.length?rps(g.reduce((a,x)=>a+x.amount,0)):'kosong'}</span></button>`;}).join('')}
  <button class="fn${rfOpen().length?'':' zero'}" data-tab="rf"><span class="dot n">${rfOpen().length}</span><span class="t">Pengembalian berjalan</span><span class="d">${rfOpen().length?rps(ro):'kosong'}</span></button></div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari label, nomor, atau pembelian" value="${E(S.q)}"></label>`;
function txChip(t){if(t.issue)return chip(...ISS[t.issue]);if(t.pr)return chip('Pengembalian berjalan','c-bl');return chip(...STS[t.st]);}
function list(){const r=items();let h='';
 if(S.tab==='tx'){const all=T.filter(match),cnt=k=>k==='all'?all.length:all.filter(t=>t.kind===k).length;
  h+=`<div class="ch"><h3>Transaksi <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all','Semua'],['plan','Paket'],['credits','Kredit'],['service','Layanan']].map(([k,t])=>`<button data-kind="${k}" aria-pressed="${S.kind===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  if(S.stage)h+=`<div class="flt"><span>Hanya <b style="font-weight:500">${FLOW.find(f=>f[0]===S.stage)[1]}</b></span><button data-stage-clear>Tampilkan semua</button></div>`;
  let cur=-1;r.forEach((t,i)=>{const g=grpTx(t);if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${['orange','blue','green'][g]})"></i><b>${['Perlu ditangani','Menunggu bayar · berjalan','Selesai & kedaluwarsa'][g]}</b> · ${r.filter(x=>grpTx(x)===g).length}</div>`;}
   h+=`<div class="it${S.sel.tx===t.id?' sel':''}" data-id="${E(t.id)}" style="--i:${i}"><span class="ty">${ICON[t.kind]}</span><div style="min-width:0"><div class="t1">${E(t.title)} ${txChip(t)}</div><div class="t2">${t.lab?E(t.lab)+' · ':''}${KIND[t.kind]} · <span class="mono">${E(t.id)}</span></div></div><div class="rgt"><span class="amt n">${rp(t.amount)}</span><span class="duet">${ft(t.paidAt||t.created)}</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>Tidak ada transaksi</b>${S.q||S.kind!=='all'||S.stage?'Coba ubah pencarian atau pil jenis.':'Belum ada pembelian. Pembelian paket, kredit, dan layanan dari label tercatat di sini.'}</div>`;}
 else{h+=`<div class="ch"><h3>Pengembalian <small class="n">${r.length}</small></h3>${find()}</div>`;let cur='';
  const G=x=>RUN.includes(x.st)?'run':x.st==='eligible'?'el':'end';
  r.forEach((x,i)=>{const g=G(x);if(g!==cur){cur=g;const gg=r.filter(y=>G(y)===g);h+=`<div class="gh"><i style="--c:var(--${{run:'blue',el:'faint',end:'green'}[g]})"></i><b>${{run:'Sedang berjalan',el:'Berhak, belum mengajukan · paket lama',end:'Selesai'}[g]}</b> · ${gg.length}${g==='el'?` · paparan ${rps(gg.reduce((a,y)=>a+y.amount,0))}`:''}</div>`;}
   const old=x.kind==='legacy'||x.kind==='eligible',sub=old?`${E(x.plan)} · dibeli ${fd(x.bought)}${x.kind==='legacy'&&x.due&&RUN.includes(x.st)?` · batas ${fd(x.due.slice(0,10))}`:''}`:`dari <span class="mono">${E(x.origin)}</span>`;
   h+=`<div class="it${S.sel.rf===x.id?' sel':''}" data-id="${E(x.id)}" style="--i:${i}">${lav(x.lab)}<div style="min-width:0"><div class="t1">${E(x.lab)} ${chip(RK[x.kind],old?'c-bl':'c-or')}</div><div class="t2">${sub}</div></div><div class="rgt"><span class="amt n">${rp(x.amount)}</span>${x.st==='eligible'?'':chip(...RST[x.st])}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${S.q?'Tidak ditemukan':'Belum ada pengembalian'}</b>${S.q?'Coba kata lain.':'Pengembalian dana dari transaksi dan paket lama tampil di sini.'}</div>`;}
 $('list').innerHTML=h;}
/* ---------- rincian transaksi ---------- */
const lockTx=t=>!canW?'Akses lihat · tindakan membutuhkan izin pembayaran.':t.handler&&t.handler!==state.user&&!SA?`Ditangani ${E(pname(t.handler)||t.handler)}.`:'';
const acts=(t,h)=>{const l=lockTx(t);return l?`<p class="where">${l}</p>`:`<div class="hrow">${h}</div>`;};
const opts=OP=>`<div class="opts">${OP.map(([v,a,m])=>`<button data-pick="${v}" aria-pressed="${S.pick===v}">${a}<small>${m}</small></button>`).join('')}</div>`;
const fulfillLabel=t=>{const o=t.o;return o.kind==='plan'?`Aktifkan paket ${E(o.plan)} · ${o.period==='month'?'1 bulan':'1 tahun'}`:o.kind==='credits'?`Tambahkan ${o.credits+o.bonus} kredit`:o.source?.type==='wami'?'Teruskan ke Registrasi WAMI':'Buat pesanan di Layanan Tambahan';};
const minsLate=t=>{if(!t.due||!t.provAt)return '';const m=Math.round((Date.parse(t.provAt+':00Z')-Date.parse(t.due+':00Z'))/6e4);return m>0&&m<180?` (${m} menit kemudian)`:'';};
function nextTx(t){const lock=lockTx(t);
 if(t.issue==='unfulfilled')return `<div class="nextc"><p>Dibayar <b>${rp(t.rec||t.amount)}</b>${t.paidAt?` pada ${fd(t.paidAt)}`:''}, tetapi pembelian belum dipenuhi. Label belum menerima apa yang dibelinya.</p>${acts(t,btn(fulfillLabel(t)+' '+ARROW,'data-do="fulfill"','pri'))}</div>`;
 if(t.issue==='mismatch'){const pv=t.pv[1],over=pv>t.amount,OP=over?[['accept',`Terima ${rp(pv)} dari penyedia`,`selisih ${rp(pv-t.amount)} otomatis jadi pengembalian`],...(t.asked?[]:[['ask','Tanyakan ke penyedia','status tetap diperiksa']])]:[['refund','Kembalikan dana',`buka pengembalian ${rp(pv)}`],...(t.asked?[]:[['ask','Tanyakan ke penyedia','status tetap diperiksa']])];
  const rv={accept:btn('Terima & lanjut penuhi','data-do="accept"','pri'),ask:btn('Catat: ditanyakan ke penyedia','data-do="ask"','pri'),refund:btn(`Buka pengembalian ${rp(pv)}`,'data-do="refund-all"','pri')}[S.pick];
  return `<div class="nextc"><p>Penyedia mencatat pembayaran <b>${rp(pv)}</b>, sedangkan pesanan ini <b>${rp(t.amount)}</b> dan masih "${E(t.rm[0])}".${over?'':' Nominal kurang dari harga, jadi tidak bisa diterima.'}</p>${t.asked?`<p class="where">Sudah ditanyakan ke penyedia · ${fd(t.asked)}</p>`:''}${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal"><div class="hrow">${rv}</div></div>`:'')}</div>`;}
 if(t.issue==='late'){const pv=t.pv[1],OP=[['accept','Terima & penuhi','dana sudah masuk; label tetap dapat pembeliannya'],['refund','Kembalikan dana','buka pengembalian penuh']];
  const rv={accept:btn('Terima & penuhi','data-do="sync"','pri'),refund:btn(`Buka pengembalian ${rp(pv)}`,'data-do="refund-late"','pri')}[S.pick];
  return `<div class="nextc"><p>Batas bayar lewat ${fd(t.due)}, lalu penyedia mengonfirmasi pembayaran <b>${rp(pv)}</b> pada ${fd(t.provAt)}${minsLate(t)}.</p>${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal"><div class="hrow">${rv}</div></div>`:'')}</div>`;}
 if(t.issue==='unsynced')return `<div class="nextc"><p>Penyedia sudah menerima <b>${rp(t.pv[1])}</b> pada ${fd(t.provAt)}, tetapi status di Rilis Musik masih "${E(t.rm[0])}".</p>${acts(t,btn('Perbarui & penuhi','data-do="sync"','pri'))}</div>`;
 if(t.issue==='dup'){const over=t.rec-t.back-t.amount;return `<div class="nextc"><p>Penyedia menerima dua pembayaran untuk pesanan ini (${rp(t.pv[1])}${t.pv2?` + ${rp(t.pv2[1])}`:''}). Kelebihan <b>${rp(over)}</b> perlu dikembalikan.</p>${acts(t,btn(`Buka pengembalian ${rp(over)}`,'data-do="refund-dup"','pri'))}</div>`;}
 if(t.issue==='missing')return `<div class="nextc"><p>Rilis Musik mencatat pesanan ini dibayar, tetapi penyedia belum punya konfirmasinya.</p>${t.asked?`<p class="where">Sudah ditanyakan ke penyedia · ${fd(t.asked)}</p>`:acts(t,btn('Catat: ditanyakan ke penyedia','data-do="ask"','pri'))}</div>`;
 if(t.issue==='refundmis')return `<div class="nextc"><p>Pengembalian tercatat selesai, tetapi penyedia belum mengonfirmasinya. Periksa lagi setelah pencocokan berikutnya.</p></div>`;
 const paidOpen=t.o&&t.o.payment==='paid'&&!t.o.fulfilled;
 if(t.issue==='info')return `<div class="nextc"><p>Informasi sudah diminta ke label${t.asked?` · ${fd(t.asked)}`:''}. ${paidOpen?'Pembayaran sudah terkonfirmasi; pembelian belum dipenuhi.':'Penyedia belum mengonfirmasi pembayaran.'}</p>${t.prompt?`<p class="quote">${E(t.prompt)}</p>`:''}${acts(t,paidOpen?btn(fulfillLabel(t),'data-do="fulfill"','pri'):btn('Cek ke penyedia sekarang','data-do="ping"','pri')+btn('Tutup: tidak ada pembayaran','data-do="close-none"','ghost dng'))}</div>`;
 if(t.issue==='reported'){const ask=S.form==='ask-info'?`<div class="reveal"><label class="fld">Pertanyaan untuk label · dikirim ke label<textarea id="f-note" placeholder="Mis. kirim waktu bayar dan bukti transfer"></textarea></label><div class="hrow">${btn('Kirim permintaan','data-do="request-info"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>Label mengajukan pemeriksaan pembayaran.</p>${t.report?`<p class="quote">${E(t.report)}</p>`:''}${acts(t,paidOpen?btn(fulfillLabel(t),'data-do="fulfill"','pri'):btn('Cek ke penyedia sekarang','data-do="ping"','pri')+(S.form==='ask-info'?'':btn('Minta info ke label','data-form="ask-info"'))+btn('Tutup: tidak ada pembayaran','data-do="close-none"','ghost dng'))}${ask}</div>`;}
 if(t.issue==='unknown'){const OP=[['link','Hubungkan ke transaksi','cari pesanan dengan nominal sama'],['return','Kembalikan ke pengirim','catat referensi pengembalian'],['manual','Tandai sudah ditangani','wajib catatan']];
  const cand=T.filter(x=>x.kind!=='unknown'&&['pending','expired'].includes(x.st)&&!x.pv),same=cand.filter(x=>x.amount===t.amount);
  const rv={link:same.length?same.map(x=>`<button class="lg pickrow" data-link="${E(x.id)}"><span>${E(x.title)} · ${E(x.lab)}<small>${E(x.id)}</small></span><b class="n">${rp(x.amount)}</b></button>`).join(''):`<p class="where">Tidak ada pesanan menunggu/kedaluwarsa bernominal ${rp(t.amount)}.${cand.length?` Terdekat: ${cand.slice(0,4).map(x=>`${E(x.id)} (${rp(x.amount)})`).join(', ')}.`:''}</p>`,
   return:`<label class="fld">Nomor referensi pengembalian · wajib<input id="f-ref" placeholder="Mis. RFD-2609251234"></label><label class="fld">Catatan · wajib<input id="f-note" placeholder="Mis. dikembalikan ke rekening pengirim"></label><div class="hrow">${btn('Catat dikembalikan','data-do="unknown-return"','pri')}</div>`,
   manual:`<label class="fld">Catatan · wajib<input id="f-note" placeholder="Mis. transfer uji coba dari tim keuangan"></label><div class="hrow">${btn('Tandai sudah ditangani','data-do="manual"','pri')}</div>`}[S.pick]||'';
  return `<div class="nextc"><p>Dana <b>${rp(t.amount)}</b> masuk ke penyedia ${fd(t.created)} tanpa transaksi yang cocok.</p>${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal">${rv}</div>`:'')}</div>`;}
 if(t.kind==='unknown')return `<div class="nextc ok"><p>${E(t.result)}.</p></div>`;
 if(t.pr)return `<div class="nextc mute"><p>Pengembalian ${E(t.pr)} sedang berjalan.${paidOpen?' Pembelian dipenuhi setelah pengembalian selesai atau ditutup.':''}</p><div class="hrow">${btn(`Buka ${E(t.pr)} ${ARROW}`,`data-gorf="${E(t.pr)}"`,'pri')}</div></div>`;
 if(t.st==='pending')return `<div class="nextc mute"><p>Menunggu label membayar · batas ${fd(t.due)}. Tidak perlu tindakan.</p></div>`;
 if(t.st==='expired')return `<div class="nextc mute"><p>${t.back?'Dana sudah dikembalikan. ':''}Kedaluwarsa ${fd(t.due)}${t.pv?'':' tanpa pembayaran'}. Tidak perlu tindakan.</p>${t.refund?`<div class="hrow">${btn(`Buka ${E(t.refund)} ${ARROW}`,`data-gorf="${E(t.refund)}"`)}</div>`:''}</div>`;
 const can=canW&&t.rec>t.back,form=S.form==='open-refund'?`<div class="reveal"><label class="fld">Alasan · wajib<textarea id="f-note" placeholder="Mis. label membatalkan pembelian sebelum dipakai"></textarea></label><div class="hrow">${btn('Buka pengembalian','data-do="open-refund"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
 return `<div class="nextc ok"><p>${E(t.result||'Dipenuhi')}${t.paidAt?` · dibayar ${fd(t.paidAt)}`:''}.</p>${t.pv2?`<p class="where">Penyedia menerima dua pembayaran untuk pesanan ini.</p>`:''}<div class="hrow">${t.refund?btn(`Buka pengembalian ${E(t.refund)} ${ARROW}`,`data-gorf="${E(t.refund)}"`,'pri'):can&&S.form!=='open-refund'?btn('Buka pengembalian','data-form="open-refund"','ghost'):''}</div>${form}</div>`;}
function steps(labels,at,wait){const n=labels.length;return `<div class="steps" style="--n:${n}"><i class="prog" style="--w:calc(100% * ${Math.min(Math.max(at,0),n-1)} / ${n})"></i>${labels.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function cmp(t){const rm=t.rm,cols=[['Rilis Musik',rm?rm[0]:'—',rm?rp(t.amount):'—',rm?rm[1]:'tidak ada'],['Penyedia',t.pv?t.pv[0]:'belum ada',t.pv?rp(t.pv[1]):'—',t.pv?t.pv[2]:'—']];if(t.pv2)cols.push(['Pembayaran kedua',t.pv2[0],rp(t.pv2[1]),t.pv2[2]]);
 const diff=i=>new Set(cols.slice(0,2).map(c=>c[i])).size>1&&cols[1][i]!=='—'&&cols[0][i]!=='—'&&!(i===1&&cols[0][1]==='Dibayar'&&cols[1][1]==='Berhasil');
 return `<div class="cmpw"><table class="cmpt"><thead><tr><th></th>${cols.map(c=>`<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${[['Status',1],['Nominal',2],['Referensi',3]].map(([l,i])=>`<tr><th>${l}</th>${cols.map(c=>`<td class="${i<3&&diff(i)?'df':''}${i===3?' mono':''}">${E(c[i])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
const histH=(h,lab)=>`<div class="hist">${h.slice().reverse().map(([w,x,k])=>`<div>${k==='L'?`<span class="mini lbl">${E(inis(lab||'?'))}</span>`:`<span class="mini">${E(k==='SY'?'SY':k)}</span>`}<span>${E(x)}<small style="display:block">${k==='L'?E(lab||'Label'):k==='SY'?'Sistem':E(people.find(p=>p.initials===k)?.name||'Super Admin')} · ${fd(w)}</small></span></div>`).join('')}</div>`;
function paneTx(t){let i=0;const at=t.st==='done'?3:t.st==='paid'?2:t.pv&&['mismatch','late','unsynced'].includes(t.issue)?1:0;
 return `<div class="hd"><button class="back" data-back>${BACK}Transaksi</button><div class="k"><span class="ty">${ICON[t.kind]}</span>${KIND[t.kind]} · <span class="mono">${E(t.id)}</span></div><h2>${E(t.title)}</h2><div class="meta"><b class="n" style="font-weight:400;color:var(--text)">${rp(t.amount)}</b>${t.lab?`<span class="sep"></span><button class="lnk" data-label="${E(t.acc)}">${E(t.lab)}</button>`:''}<span class="sep"></span>${txChip(t)}${t.handler?`<span class="sep"></span><span>${E(pname(t.handler)||t.handler)}</span>`:''}</div></div>
 <div class="pb">${sec(i++,openIss(t)?'Langkah berikutnya':'Keadaan',nextTx(t))}
 ${t.kind!=='unknown'?sec(i++,'Tahapan',steps(['Dibuat','Dibayar','Dipenuhi'],at,!!t.issue)):''}
 ${sec(i++,'Pembayaran',cmp(t),t.pv&&CHK?.at?'dicocokkan '+ft(iso(CHK.at)):'')}
 ${t.kind!=='unknown'?sec(i++,'Rincian pembelian',`<div class="facts"><span>Label</span><b>${E(t.lab)}</b><span>Isi</span><b>${t.items.length?t.items.map(E).join('<br>'):'—'}</b><span>Harga</span><b>${rp(t.amount)} · disimpan saat membeli</b><span>Dibuat</span><b>${fd(t.created)}</b>${t.due?`<span>Batas bayar</span><b>${fd(t.due)}</b>`:''}<span>Metode</span><b>${E(t.method||'Penyedia pembayaran')}</b></div>`):''}
 ${sec(i++,'Riwayat',histH(t.hist,t.lab))}</div>`;}
/* ---------- rincian pengembalian ---------- */
const left=r=>{if(!r.due)return '';const d=Math.ceil((Date.parse(r.due+':00Z')-Date.parse(U.iso16(ten.now)+':00Z'))/864e5);return d>30?`batas ${fd(r.due.slice(0,10))}`:d>=0?`${d} hari lagi`:'lewat batas';};
function nextRf(r){const legacy=r.kind==='legacy',tx=r.src==='tx',deny=legacy?(SA?'':'Keputusan pengembalian paket lama hanya oleh Super Admin.'):(!canW?'Akses lihat · tindakan membutuhkan izin pembayaran.':'');
 const tolak=S.form==='reject'?`<div class="reveal"><label class="fld">Alasan · dikirim ke label<textarea id="f-note" placeholder="${legacy?'Mis. pembelian tidak ditemukan di catatan lama':'Mis. dana sudah dikembalikan oleh penyedia'}"></textarea></label><div class="hrow">${btn(legacy?'Tolak pengajuan':'Tutup tanpa pengembalian','data-do="reject"','pri dng')}${btn('Batal','data-form=""')}</div></div>`:'';
 const rej=S.form==='reject'||!SA?'':btn(legacy?'Tolak':'Tutup tanpa pengembalian','data-form="reject"','ghost dng');
 if(r.st==='eligible')return `<div class="nextc mute"><p>Berhak atas refund penuh <b>${rp(r.amount)}</b> (${E(r.plan)}, dibeli ${fd(r.bought)}). ${r.read?`Pemberitahuan dibaca ${fd(r.read)}; batas mengajukan ${fd(r.due.slice(0,10))}.`:'Pemberitahuan belum dibaca, jadi batas 30 hari belum berjalan. Pemberitahuan tampil otomatis saat label masuk.'}</p></div>`;
 if(legacy&&r.st==='submitted'){const C=[[true,'Pembelian lama tercatat',`${r.origin} · ${r.plan} · ${rp(r.amount)}`],[r.on,'Diajukan dalam 30 hari sejak dibaca',`${r.read?`dibaca ${ft(r.read)}, `:''}diajukan ${ft(r.at)}${r.due?` · batas ${fd(r.due.slice(0,10))}`:''}`],[!!r.bank,'Rekening tujuan dari label',r.bank||'belum ada · minta lewat percakapan'],[false,'Bukti pembayaran lama',r.asked?`diminta ${ft(r.asked)} · boleh menyusul`:'belum · boleh menyusul']];
  return `<div class="nextc"><p>${E(r.lab)} mengajukan refund penuh paket lama.</p>${r.note?`<p class="quote">${E(r.note)}</p>`:''}<div class="checks">${C.map(([g,t,m])=>`<div class="ck ${g?'':'warn'}"><b>${g?'✓':'!'}</b>${t}<small>${E(m)}</small></div>`).join('')}</div>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${btn('Mulai pemeriksaan','data-do="check"','pri')}${r.asked?'':btn('Minta bukti','data-do="ask-proof"')}${rej}</div>${tolak}`}</div>`;}
 if(legacy&&r.st==='checking')return `<div class="nextc"><p>Refund <b>penuh</b> sesuai keputusan 19 Okt. Setelah dibayar, label pindah ke paket <b>Basic</b>; rilisan tayang dan saldo royalti tetap miliknya.</p><label class="fld">Nominal pengembalian · refund penuh, tidak bisa diubah<input id="f-amt" inputmode="numeric" value="${r.amount.toLocaleString('id-ID')}" readonly></label><p class="where">${r.bank?`Ke ${E(r.bank)} · rekening dari label, bukan rekening royalti otomatis.`:'Rekening tujuan belum ada di pengajuan; minta lewat percakapan.'}</p>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${btn('Setujui pengembalian','data-do="approve"','pri')}${rej}</div>${tolak}`}</div>`;
 if(legacy&&r.st==='approved')return `<div class="nextc"><p>Kembalikan <b>${rp(r.amount)}</b> ke ${E(r.bank||'rekening label')}, lalu catat hasilnya.</p>${deny?`<p class="where">${deny}</p>`:`<label class="fld">Nomor referensi · wajib<input id="f-ref" placeholder="Mis. RFD-2609251234"></label><div class="hrow">${btn('Catat dibayar & pindahkan ke Basic','data-do="paid"','pri')}</div>`}</div>`;
 if(r.st==='done')return `<div class="nextc ok"><p>Selesai · ${rp(r.amount)} dikembalikan${r.ref?` · referensi <span class="mono">${E(r.ref)}</span>`:''}.${legacy?' Label kini memakai paket Basic.':''}</p></div>`;
 if(['rejected','closed'].includes(r.st))return `<div class="nextc mute"><p>${RST[r.st][0]}.</p>${r.why?`<p class="quote">${E(r.why)}</p>`:''}</div>`;
 if(tx&&r.st==='checking'){if(S.routeFor!==r.id){S.route=r.route==='transfer'?'bank':'origin';S.routeFor=r.id;}const bank=S.route==='bank';
  const routeOpts=`<div class="opts two">${[['origin','Jalur pembayaran asal','dikembalikan lewat penyedia'],['bank','Transfer ke rekening label',r.confirmed?'rekening sudah dikonfirmasi':'minta rekening tujuan']].map(([v,a,m])=>`<button data-route="${v}" aria-pressed="${S.route===v}">${a}<small>${m}</small></button>`).join('')}</div>`;
  const ph={dup:'Mis. kredit dari pembayaran kedua tidak diberikan; kelebihan dikembalikan',over:'Mis. pembelian dipenuhi; kelebihan bayar dikembalikan',late:'Mis. pembelian tidak dipenuhi; dana dikembalikan penuh',unfit:'Mis. layanan tidak dikerjakan; dana dikembalikan'}[r.kind]||'Jelaskan bagian yang sudah diberikan dan penyelesaiannya';
  const main=!canW?'':bank&&!r.confirmed?btn('Minta rekening ke label','data-do="ask-bank"','pri'):SA?btn('Setujui pengembalian','data-do="approve"','pri'):'';
  return `<div class="nextc"><p>${E(r.note)}</p><label class="fld">Nominal pengembalian · maks ${rp(r.max)}<input id="f-amt" inputmode="numeric" value="${r.amount.toLocaleString('id-ID')}"></label>${routeOpts}${bank?`<p class="where">${r.confirmed?`Ke ${E(r.bank)} · dikonfirmasi label.`:'Rekening tujuan belum ada. Label mengonfirmasi rekening dulu; rekening royalti tidak dipakai otomatis.'}</p>`:''}<label class="fld">Hasil pemeriksaan · wajib<textarea id="f-disp" placeholder="${ph}"></textarea></label>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${main}${rej}</div>`}<p class="where">Persetujuan pengembalian hanya oleh Super Admin.</p>${tolak}</div>`;}
 if(tx&&r.st==='info')return `<div class="nextc mute"><p>Menunggu label mengonfirmasi rekening tujuan. Setelah dikonfirmasi, pengembalian kembali ke pemeriksaan.</p>${r.prompt?`<p class="quote">${E(r.prompt)}</p>`:''}</div>`;
 if(tx&&['approved','processing'].includes(r.st))return `<div class="nextc"><p>Kembalikan <b>${rp(r.amount)}</b> ${r.route==='transfer'?`ke ${E(r.bank||'rekening label')}`:'lewat penyedia pembayaran (jalur asal)'}, lalu catat hasilnya.</p>${SA?`<label class="fld">Nomor referensi · wajib<input id="f-ref" placeholder="Mis. RFD-2609251234" value="${E(r.ref)}"></label><div class="hrow">${btn('Catat dibayar','data-do="paid"','pri')}</div>`:'<p class="where">Pencatatan pengembalian hanya oleh Super Admin.</p>'}</div>`;
 return `<div class="nextc mute"><p>${RST[r.st]?.[0]||''}.</p></div>`;}
function paneRf(r){let i=0;const old=r.kind==='legacy'||r.kind==='eligible',L4=['Diajukan','Diperiksa','Disetujui',old?'Dibayar · ke Basic':'Dibayar'],at={eligible:-1,submitted:0,checking:1,info:1,approved:2,processing:2,done:4,rejected:1,closed:1}[r.st];
 const ex=r.kind==='legacy'&&RUN.includes(r.st)?left(r):r.st==='eligible'&&r.due?left(r):'';
 return `<div class="hd"><button class="back" data-back>${BACK}Pengembalian</button><div class="relhd">${lav(r.lab,1)}<div style="min-width:0"><div class="k">Pengembalian · <span class="mono">${E(r.src==='eligible'?r.key:r.id)}</span></div><h2>${E(r.lab)}</h2><div class="meta"><b class="n" style="font-weight:400;color:var(--text)">${rp(r.amount)}</b><span class="sep"></span>${chip(RK[r.kind],old?'c-bl':'c-or')}<span class="sep"></span>${chip(...RST[r.st])}</div></div></div></div>
 <div class="pb">${sec(i++,['done','rejected','closed','eligible'].includes(r.st)?'Keadaan':'Langkah berikutnya',nextRf(r),ex)}
 ${at>=0?sec(i++,'Tahapan',steps(L4,at,['rejected','closed','info'].includes(r.st))):''}
 ${sec(i++,'Rincian',`<div class="facts"><span>Asal</span><b>${old?`Pembelian lama <span class="mono">${E(r.origin)}</span> · ${E(r.plan)} · ${fd(r.bought)}`:`Transaksi <button class="lnk" data-gotx="${E(r.origin)}">${E(r.origin)}</button>`}</b><span>Label</span><b><button class="lnk" data-label="${E(r.acc)}">${E(r.lab)}</button></b><span>Nominal</span><b>${rp(r.amount)}${old?' · refund penuh':''}</b>${r.src==='tx'?`<span>Jalur</span><b>${r.route==='transfer'?'Transfer ke rekening label':'Jalur pembayaran asal'}</b>`:''}${r.bank?`<span>Rekening tujuan</span><b>${E(r.bank)}</b>`:''}${r.ref?`<span>Referensi</span><b class="mono">${E(r.ref)}</b>`:''}${r.ticket?`<span>Percakapan</span><b><button class="lnk" data-ticket="${E(r.ticket)}">${E(r.ticket)}</button></b>`:''}${old&&r.read?`<span>Pemberitahuan dibaca</span><b>${fd(r.read)} · batas ${fd(r.due.slice(0,10))}</b>`:''}</div>`)}
 ${r.hist.length?sec(i++,'Riwayat',histH(r.hist,r.lab)):''}</div>`;}
function pane(){const it=items().find(x=>x.id===S.sel[S.tab]);$('pin').innerHTML=it?(S.tab==='tx'?paneTx(it):paneRf(it)):`<div class="empty" style="padding:60px 20px"><b>Pilih item</b>Rinciannya tampil di sini.</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v&&!el.readOnly)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(t){toast137(DEF,t);}
function open(tab,id){S.tab=tab;S.sel[tab]=id;S.form=null;S.pick=null;S.read=true;S.stage=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
/* ---------- tindakan (fungsi asli) ---------- */
function txAct(k,id,p={}){const o=order113(id);if(!o)throw Error('Transaksi tidak ditemukan.');return atomic113(k,{id,version:o.version,...p});}
function chain(fn){const before=structuredClone(ten);try{const r=fn();save10();return r;}catch(err){Object.keys(ten).forEach(k=>delete ten[k]);Object.assign(ten,before);try{save10();}catch(e){}throw err;}}
const claimIf=id=>{const o=order113(id);if(!SA&&!o.handler)txAct('claim',id);};
const fulfill=id=>{claimIf(id);txAct('fulfill',id,{checked:true});};
const propose=(rid,n)=>{const r=store().refunds.find(x=>x.id===rid);if(r&&n>0)r.proposed=n;};
function act(a){let msg='',goRf='',goTx='';
 try{
 if(S.tab==='tx'){const t=T.find(x=>x.id===S.sel.tx);if(!t)return;const id=t.id;
  if(a==='fulfill'){chain(()=>fulfill(id));msg='Dipenuhi · label menerima pembeliannya';}
  else if(a==='accept'){const p=t.pv[3],over=p.amount-t.amount;let rid='';chain(()=>{txAct('accept',id,{provider:p.id});fulfill(id);if(over>0){rid=txAct('refund-open',id,{reason:'Selisih pembayaran',note:`Kelebihan bayar ${rp(over)} dari penyedia (${p.reference}).`});propose(rid,over);}});msg=rid?`Diterima & dipenuhi · kelebihan ${rp(over)} jadi pengembalian ${rid}`:'Diterima & dipenuhi';}
  else if(a==='ask'){txAct('review',id,{note:t.pv?`Ditanyakan ke penyedia: penyedia mencatat ${rp(t.pv[1])}, pesanan ${rp(t.amount)}.`:'Ditanyakan ke penyedia: konfirmasi pembayaran belum ditemukan.'});msg='Dicatat: ditanyakan ke penyedia';}
  else if(a==='sync'){chain(()=>{txAct('sync',id);fulfill(id);});msg='Pembayaran diterima & pembelian dipenuhi';}
  else if(['refund-all','refund-late','refund-dup'].includes(a)){const R0={'refund-all':['Selisih pembayaran','Nominal penyedia berbeda dengan harga; dana dikembalikan penuh.',t.rec],'refund-late':['Pembayaran setelah kedaluwarsa','Dibayar setelah batas bayar; dana dikembalikan penuh.',t.rec],'refund-dup':['Pembayaran ganda','Dua pembayaran diterima untuk pembelian yang sama; kelebihan dikembalikan.',t.rec-t.back-t.amount]}[a];
   const rid=chain(()=>{const r=txAct('refund-open',id,{reason:R0[0],note:R0[1]});propose(r,R0[2]);return r;});msg=`Pengembalian ${rid} dibuka · lanjut di tab Pengembalian`;goRf=rid;}
  else if(a==='ping'){atomic113('check',{from:0,to:ten.now+864e5});load();const n=(CHK?.rows||[]).filter(r=>r.order===id).length;msg=CHK?.ok===false?'Data penyedia belum tersedia · coba lagi nanti':n?'Penyedia punya catatan untuk pesanan ini · periksa perbandingannya':'Penyedia: belum ada pembayaran untuk pesanan ini';}
  else if(a==='close-none'){txAct('resolve',id,{note:'Ditutup: penyedia tidak menerima pembayaran untuk pesanan ini.'});msg='Ditutup · label diberi tahu';}
  else if(a==='request-info'){const note=val('f-note');if(note.length<5){toast('Tulis pertanyaan untuk label');return;}txAct('request-info',id,{note});msg='Permintaan informasi dikirim ke label';}
  else if(a==='unknown-return'){const ref=val('f-ref'),note=val('f-note');if(!ref){toast('Isi nomor referensi');return;}if(note.length<5){toast('Catatan wajib diisi');return;}atomic113('unknown',{how:'return',provider:id,reference:ref,note});msg='Tercatat dikembalikan ke pengirim';}
  else if(a==='manual'){const note=val('f-note');if(note.length<5){toast('Catatan wajib diisi');return;}atomic113('unknown',{how:'manual',provider:id,note});msg='Ditandai sudah ditangani';}
  else if(a==='open-refund'){const note=val('f-note');if(note.length<5){toast('Alasan wajib diisi');return;}const rid=txAct('refund-open',id,{reason:'Alasan lain',note});msg=`Pengembalian ${rid} dibuka`;goRf=rid;}}
 else{const r=R.find(x=>x.id===S.sel.rf);if(!r)return;
  if(r.kind==='legacy'){if(!SA){toast('Keputusan hanya oleh Super Admin');return;}
   if(a==='check'){stepRefund132(r.id,'checking','',{quiet:true});msg='Pemeriksaan dimulai · label diberi tahu';}
   else if(a==='ask-proof'){askProof(r);msg=`Permintaan bukti dikirim lewat Pesan (${r.ticket})`;}
   else if(a==='approve'){stepRefund132(r.id,'approved','',{quiet:true});msg='Disetujui · lanjut kembalikan dana';}
   else if(a==='paid'){const ref=val('f-ref');if(!ref){toast('Isi nomor referensi');return;}stepRefund132(r.id,'paid','',{quiet:true,reference:ref});msg='Refund dibayar · label pindah ke Basic';}
   else if(a==='reject'){const n=val('f-note');if(n.length<5){toast('Alasan wajib diisi');return;}stepRefund132(r.id,'rejected',n,{quiet:true});msg='Ditolak · label diberi tahu';}}
  else if(r.src==='tx'){const oid=r.o.id;
   if(a==='approve'){const n=+val('f-amt').replace(/[^\d]/g,''),disp=val('f-disp');if(!n){toast('Isi nominal pengembalian');return;}if(n>r.max){toast('Nominal melebihi sisa dana '+rp(r.max));return;}if(disp.length<5){toast('Tulis hasil pemeriksaan');return;}
    txAct('refund-approve',oid,{refund:r.id,amount:n,method:S.route==='bank'?'transfer':'origin',disposition:disp,note:disp,checked:true});msg='Disetujui · lanjut kembalikan dana';}
   else if(a==='ask-bank'){txAct('refund-info',oid,{refund:r.id,note:'Konfirmasikan rekening tujuan untuk pengembalian ini. Rekening royalti tidak dipakai otomatis.'});msg='Label diminta mengonfirmasi rekening';}
   else if(a==='paid'){const ref=val('f-ref');if(!ref){toast('Isi nomor referensi');return;}const rr=r.r;
    chain(()=>{if(rr.method==='transfer')txAct('refund-done',oid,{refund:r.id,method:'manual',reference:ref,at:ten.now,note:'Transfer pengembalian ke rekening yang dikonfirmasi label.',checked:true});
     else{const m=store();if(!m.provider.some(x=>x.refund===r.id))m.provider.push({id:'SIM-REF-'+r.id,order:oid,refund:r.id,reference:ref,amount:rr.amount,currency:'IDR',status:'refunded',at:ten.now,simulation:true});txAct('refund-done',oid,{refund:r.id,method:'provider',reference:ref,at:ten.now,note:'Dana dikembalikan lewat penyedia pembayaran.',checked:true});}});
    msg='Pengembalian selesai · label diberi tahu';}
   else if(a==='reject'){const n=val('f-note');if(n.length<5){toast('Alasan wajib diisi');return;}txAct('refund-close',oid,{refund:r.id,note:n});msg='Ditutup tanpa pengembalian · label diberi tahu';}}}
 }catch(err){toast(String(err?.message||err));lastSig='';render();return;}
 S.form=null;S.pick=null;lastSig='';load();
 if(goRf){S.tab='rf';S.sel.rf=goRf;S.read=true;}
 if(S.stage&&S.tab==='tx'){const f=FLOW.find(x=>x[0]===S.stage),cur=T.find(x=>x.id===S.sel.tx);if(!cur||!f[2](cur))S.stage=null;}
 render();toast(msg);}
function askProof(r){const text=`Mohon kirim bukti pembayaran layanan lama (${r.origin}) bila ada — tangkapan layar transfer atau invoice. Pengajuanmu tetap kami proses.`;
 const live=typeof Tickets112==='object'&&Tickets112.init(ten).tickets.find(t=>t.id===r.ticket);
 if(live)run112('message',{id:live.id,version:live.version,note:text});
 else{const tk=typeof threadStore131==='function'&&threadStore131().tickets.find(x=>x.id===r.ticket);if(!tk)throw Error(`Percakapan ${r.ticket} tidak ditemukan.`);const msg={who:me().id,text:[text,text],at:'baru saja',ts:Date.now()};if(tk.chat)(data.chats[tk.chat]=data.chats[tk.chat]||[]).push(msg);else (tk.msgs=tk.msgs||[]).push(msg);}
 r.r.proofAsked=ten.now;save10();}
function openTicket(id){const live=typeof Tickets112==='object'&&Tickets112.init(ten).tickets.some(t=>t.id===id);if(live&&typeof detail112==='function')return detail112(id);
 if(typeof openInbox131==='function'){openInbox131('c:all');inbox131.sel='t:'+id;render();return;}toast('Buka Kotak Masuk › '+id);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.pick=null;paint();if(tb.closest('#band'))$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='tx';S.q='';S.kind='all';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.q='';S.kind='all';const tx=T.filter(openIss).sort((a,b)=>(PRI[a.issue]??9)-(PRI[b.issue]??9))[0];const rf=R.filter(r=>WORK.includes(r.st))[0];if(tx)open('tx',tx.id);else if(rf)open('rf',rf.id);else toast('Tidak ada yang perlu ditangani');return;}
  if(t.closest('[data-check]')){try{atomic113('check',{from:0,to:ten.now+864e5});}catch(err){toast(String(err?.message||err));return;}lastSig='';load();render();toast(CHK?.ok===false?'Data penyedia belum tersedia · coba lagi nanti':`Pencocokan selesai · ${(CHK?.rows||[]).length} perlu diperiksa`);return;}
  const kd=t.closest('[data-kind]');if(kd){S.kind=kd.dataset.kind;paint();return;}
  const gr=t.closest('[data-gorf]');if(gr){S.q='';open('rf',gr.dataset.gorf);return;}
  const gt=t.closest('[data-gotx]');if(gt){S.q='';S.kind='all';open('tx',gt.dataset.gotx);return;}
  const lk=t.closest('[data-link]');if(lk){const lo=order113(lk.dataset.link),id=S.sel.tx;try{atomic113('unknown',{how:'link',provider:id,id:lo.id,version:lo.version});}catch(err){toast(String(err?.message||err));return;}lastSig='';load();S.sel.tx=lo.id;S.pick=null;S.read=true;render();toast(`Dana dihubungkan ke ${lo.id} · lanjut penuhi pembeliannya`);return;}
  const tk=t.closest('[data-ticket]');if(tk){openTicket(tk.dataset.ticket);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;repane();$('f-note')?.focus();return;}
  const pk=t.closest('[data-pick]');if(pk){S.pick=S.pick===pk.dataset.pick?null:pk.dataset.pick;repane();root.querySelector('.reveal input')?.focus({preventScroll:true});return;}
  const ro=t.closest('[data-route]');if(ro){S.route=ro.dataset.route;repane();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const lb=t.closest('[data-label]');if(lb){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=lb.dataset.label;l136.read=true;}}catch(err){}go137('labels');return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(S.tab,it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
/* Masuk dari Dashboard / Pekerjaan / notifikasi / Studio (detail113, route113, opModal & taskModal untuk RF-…). */
function intake(){try{if(typeof ui113==='object'&&ui113.tab&&ui113.tab!=='transactions'){S.tab=ui113.tab==='refunds'?'rf':'tx';S.stage=null;S.read=false;ui113.tab='transactions';lastSig='';}}catch(err){}
 if(first){first=false;if(!T.length&&R.length)S.tab='rf';}
 if(!pend)return;const {tab,id}=pend;pend=null;const ok=(tab==='tx'?T:R).some(x=>x.id===id);if(!ok)return;
 S.tab=tab;S.stage=null;S.q='';S.kind='all';S.sel[tab]=id;S.read=true;S.form=null;S.pick=null;lastSig='';}
const sig=()=>T.map(t=>[t.id,t.issue,t.st,t.ver||0,t.pr].join(':')).join('|')+'#'+R.map(r=>r.id+':'+r.st+':'+(r.asked?1:0)).join('|')+'#'+(CHK?.at||0)+(CHK?.ok===false?'x':'')+'#'+U.today()+(SA?'s':'')+(canW?'w':'');
const allowed=()=>{try{return can113();}catch(err){return false;}};
const DEF={id:'transactions',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&['payments','refunds','recon'].includes(v4.module)&&!state.preview&&allowed(),
 init(r){root=r;bind();},
 draw(){load();intake();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
const staffSide=()=>!isLabel10()&&!state.preview&&state.mode==='platform'&&allowed();
const show=(tab,id)=>{pend={tab,id};try{closeModal();}catch(err){}document.querySelector('#transaction-drawer113')?.close();if(DEF.when()){lastSig='';render();}else route113(tab==='rf'?'refunds':'transactions');};
if(typeof window.detail113==='function'){const before=window.detail113;window.detail113=function(id){if(!staffSide())return before.apply(this,arguments);const o=store().orders.find(x=>x.id===id);if(o&&!seen(o))return toast137(DEF,'Informasi di luar cakupan akun.');show('tx',id);};}
for(const name of ['opModal','taskModal']){if(typeof window[name]!=='function')continue;const before=window[name];window[name]=function(id){if(String(id).startsWith('RF-')&&staffSide()){load();if(R.some(r=>r.id===id))return show('rf',id);}return before.apply(this,arguments);};}
})();
