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
/* v1.1.0-dev.43 — dua bahasa: peta status berisi [id,en] dan diambil sesuai bahasa saat dipakai (L). */
const L=x=>Array.isArray(x)?$t(x[0],x[1]):x;
const ch=a=>chip(L(a[0]),a[1]);
/* catatan & galat dari model: tr113 (salinan Inggris asli) + dua catatan pencocokan yang memuat angka */
const tn=x=>{const s=typeof tr113==='function'?tr113(x):x;if(s!==x||!U.en()||typeof x!=='string')return s;let m;
 if((m=/^Pembayaran penyedia Rp ([\d.]+) diterima untuk harga Rp ([\d.]+)\.$/.exec(x)))return `Provider payment of ${rp(+m[1].replace(/\D/g,''))} received for a price of ${rp(+m[2].replace(/\D/g,''))}.`;
 if((m=/^Dana tanpa transaksi (\S+) dihubungkan ke pembelian ini\.$/.exec(x)))return `Funds without transaction ${m[1]} linked to this purchase.`;return x;};
const BEN={'Kredit harian sesuai standar':'Daily credits per standard','Benefit layanan sesuai paket':'Service benefits per plan'};
const ft=s=>{if(!s)return $t('baru saja','just now');const [y,m,d]=s.slice(0,10).split('-').map(Number);return `${d} ${U.mon(m-1)}`+(s.length>10?` ${U.hm(s.slice(11,16))}`:'');};
const rp=n=>'Rp '+Math.round(n||0).toLocaleString(U.loc());
const rps=n=>n>=1e9?`Rp ${(n/1e9).toLocaleString(U.loc(),{maximumFractionDigits:2})}${$t(' M','B')}`:n>=1e6?`Rp ${(n/1e6).toLocaleString(U.loc(),{maximumFractionDigits:2})}${$t(' jt','M')}`:rp(n);
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const inis=s=>String(s).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(n,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(n)}">${E(inis(n))}</span>`;
const pname=id=>people.find(p=>p.id===id)?.name||'';
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const bankN=b=>!b?'':/central asia|bca/i.test(b)?'BCA':/rakyat|bri/i.test(b)?'BRI':/negara|bni/i.test(b)?'BNI':/syariah|bsi/i.test(b)?'BSI':/mandiri/i.test(b)?'Mandiri':String(b).trim();
const KIND={plan:['Paket','Plan'],credits:['Kredit','Credits'],service:['Layanan','Service'],unknown:['Tanpa transaksi','No transaction']};
const ISS={unfulfilled:[['Dibayar, belum dipenuhi','Paid, not fulfilled'],'c-or'],mismatch:[['Nominal tidak cocok','Amount mismatch'],'c-red'],late:[['Dibayar setelah kedaluwarsa','Paid after expiry'],'c-or'],unsynced:[['Dibayar, status belum diperbarui','Paid, status not updated'],'c-or'],dup:[['Pembayaran ganda','Duplicate payment'],'c-red'],missing:[['Konfirmasi penyedia hilang','Provider confirmation missing'],'c-red'],refundmis:[['Pengembalian belum cocok','Refund mismatch'],'c-red'],info:[['Menunggu info label','Waiting for label info'],'c-or'],reported:[['Dilaporkan label','Reported by label'],'c-or'],unknown:[['Dana tanpa transaksi','Funds without transaction'],'c-red']};
const STS={pending:[['Menunggu bayar','Awaiting payment'],'c-bl'],expired:[['Kedaluwarsa','Expired'],''],paid:[['Dibayar','Paid'],'c-or'],done:[['Dipenuhi','Fulfilled'],'c-gr']};
const PAYN={pending:['Menunggu bayar','Awaiting payment'],paid:['Dibayar','Paid'],expired:['Kedaluwarsa','Expired']};
const RST={eligible:[['Berhak · belum mengajukan','Eligible · not requested'],''],submitted:[['Diajukan','Submitted'],'c-bl'],checking:[['Diperiksa','In review'],'c-bl'],info:[['Menunggu rekening label','Waiting for label bank account'],'c-or'],approved:[['Disetujui','Approved'],'c-or'],processing:[['Sedang dikembalikan','Refunding'],'c-or'],done:[['Selesai','Done'],'c-gr'],rejected:[['Ditolak','Rejected'],''],closed:[['Ditutup tanpa pengembalian','Closed without refund'],'']};
const RK={legacy:['Paket lama','Legacy plan'],eligible:['Paket lama','Legacy plan'],dup:['Pembayaran ganda','Duplicate payment'],over:['Kelebihan bayar','Overpayment'],late:['Dibayar terlambat','Paid late'],unfit:['Layanan tidak dapat dipenuhi','Service cannot be fulfilled'],other:['Pengembalian dana','Refund']};
const EVT={created:['Pembelian dibuat','Purchase created'],paid:['Pembayaran berhasil','Payment successful'],fulfilled:['Pembelian dipenuhi','Purchase fulfilled'],retry:['Pembayaran baru dibuat','New payment created'],synced:['Pembayaran dicocokkan dengan penyedia','Payment reconciled with provider'],review:['Pemeriksaan dibuka','Review opened'],claim:['Penanganan dimulai','Handling started'],assign:['Penanganan dialihkan','Handling reassigned'],'request-info':['Informasi diminta ke label','Information requested from label'],respond:['Label mengirim informasi','Label sent information'],resolve:['Pemeriksaan ditutup','Review closed'],'refund-open':['Pengembalian dibuka','Refund opened'],'refund-info':['Rekening tujuan diminta','Recipient account requested'],'refund-destination':['Rekening dikonfirmasi label','Account confirmed by label'],'refund-approve':['Pengembalian disetujui','Refund approved'],'refund-process':['Pengembalian diproses','Refund in progress'],'refund-done':['Dana dikembalikan','Refunded'],'refund-close':['Pengembalian ditutup tanpa pengembalian','Refund case closed without refund']};
const NOTE={review:1,'request-info':1,respond:1,resolve:1,assign:1,'refund-open':1,'refund-info':1,'refund-approve':1,'refund-close':1};
const S={tab:'tx',stage:null,kind:'all',q:'',sel:{},read:false,form:null,pick:null,route:'origin',routeFor:''};
const wide=()=>innerWidth>1240;
const FLOW=[['unfulfilled',['Belum dipenuhi','Not fulfilled'],t=>t.issue==='unfulfilled'],['match',['Tidak cocok penyedia','Provider mismatch'],t=>['mismatch','late','unsynced','dup','missing','refundmis'].includes(t.issue)],['unknown',['Dana tanpa transaksi','Funds without transaction'],t=>t.issue==='unknown'],['info',['Menunggu info label','Waiting for label info'],t=>['info','reported'].includes(t.issue)]];
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
 const items=o.kind==='credits'?[$t(`${o.credits} kredit Flex`,`${o.credits} Flex credits`),...(o.bonus?[$t(`+ ${o.bonus} kredit penawaran`,`+ ${o.bonus} offer credits`)]:[])]:o.kind==='plan'?(o.benefits||[]).map(x=>typeof x==='string'?U.en()&&BEN[x]||x:(U.en()&&x.en)||x.id||''):(o.items||[]).map(x=>{const n=x&&x.title||x;return o.source?.type==='addon'?$t(`${o.quantity||1} satuan · untuk rilisan "${n}"`,`${o.quantity||1} unit${(o.quantity||1)===1?'':'s'} · for release "${n}"`):o.source?.type==='wami'?$t(`Registrasi untuk "${n}"`,`Registration for "${n}"`):String(n);});
 const pv=ps.find(p=>p.status==='paid')||ps[0],pv2=ps.find(p=>p!==pv);
 const hist=o.history.map(h=>{let x=L(EVT[h.key])||h.key;if(h.note&&(NOTE[h.key]||h.key==='synced'&&!/^Status diperbarui|^Pembayaran simulasi/.test(h.note)))x+=' · '+tn(h.note);if(h.key==='fulfilled'&&o.fulfilled)x+=' · '+result113(o);return [iso(h.at),x,who(h.actor,o)];});
 return {id:o.id,o,lab:name113(o.account),acc:o.account,kind:o.kind,title:title113(o),items,amount:o.amount,created:iso(o.created),due:st==='pending'||st==='expired'?iso(a.expires):'',paidAt:a.paidAt?iso(a.paidAt):'',provAt:pv?iso(pv.at):'',st,issue,
  rm:[L(PAYN[a.status])||a.status,a.id],pv:pv?[pv.status==='paid'?$t('Berhasil','Successful'):$t('Dikembalikan','Refunded'),pv.amount,pv.reference,pv]:null,pv2:pv2?[pv2.status==='paid'?$t('Berhasil','Successful'):$t('Dikembalikan','Refunded'),pv2.amount,pv2.reference]:null,
  refund:m.refunds.find(r=>r.order===o.id)?.id||'',pr:pr?.id||'',rec,back,result:o.fulfilled?result113(o):'',handler:o.handler,ver:o.version,method:o.method,
  prompt:o.case?.prompt||'',report:o.case?.reason||'',asked:o.case&&o.case.status!=='resolved'?iso(o.case.requested):'',hist};}
function unk(p){const h=p.handled113,ret=()=>$t(`Dikembalikan ke pengirim · referensi ${h.reference}`,`Returned to sender · reference ${h.reference}`);return {id:p.id,p,lab:'',kind:'unknown',title:$t('Dana masuk tanpa transaksi','Funds received without transaction'),items:[],amount:p.amount,created:iso(p.at),st:h?'done':'review',issue:h?'':'unknown',rm:null,pv:[$t('Berhasil','Successful'),p.amount,p.reference,p],pv2:null,
  result:h?(h.how==='return'?ret():$t('Ditangani manual · ','Handled manually · ')+h.note):'',
  hist:[[iso(p.at),$t('Dana diterima penyedia','Funds received by provider'),'SY'],...(CHK?.at&&CHK.at>=p.at?[[iso(CHK.at),$t('Pencocokan: tidak ada transaksi yang cocok','Reconciliation: no matching transaction'),'SY']]:[]),...(h?[[iso(h.at),(h.how==='return'?ret():$t('Ditandai sudah ditangani','Marked as handled'))+' · '+h.note,ini(h.actor)||'SA']]:[])]};}
const rkind=s=>/ganda/i.test(s)?'dup':/kedaluwarsa/i.test(s)?'late':/selisih|kelebihan/i.test(s)?'over':/tidak dapat dipenuhi/i.test(s)?'unfit':'other';
function rfTx(r,m){const o=m.orders.find(x=>x.id===r.order);if(!o||!seen(o))return null;
 let rec=0,max=0;try{rec=Transactions113.received(ten,o);max=rec-Transactions113.reserved(ten,o,r.id);}catch(err){}
 const st={review:'checking',info:'info',approved:'approved',processing:'processing',done:'done',closed:'closed'}[r.status]||'checking';
 let sug=r.amount||r.proposed||(o.payment==='paid'?rec-o.amount:rec);if(!(sug>0))sug=max;sug=Math.max(0,Math.min(sug,max));
 const d=r.destination;
 return {id:r.id,src:'tx',r,o,kind:rkind(r.reason),lab:name113(o.account),acc:o.account,origin:o.id,amount:['checking','info'].includes(st)?sug:r.amount,max,st,at:iso(r.created),note:r.note,
  bank:d?`${bankN(d.bank)} ••${String(d.number).slice(-4)} · ${$t('a.n.','held by')} ${d.holder}`:'',confirmed:!!r.confirmed,route:r.method,ref:r.reference||'',why:r.resolution||'',prompt:r.prompt||'',
  hist:[[iso(r.created),L(EVT['refund-open'])+' · '+tn(r.note),who(r.handler,o)],...(r.history||[]).map(h=>[iso(h.at),(L(EVT[h.key])||h.key)+(h.note&&h.key!=='refund-destination'?' · '+tn(h.note):''),who(h.actor,o)])]};}
const LEV={submitted:r=>$t(`Pengembalian diajukan lewat Pesan (${r.ticket})`,`Refund requested via Messages (${r.ticket})`),checking:()=>$t('Pemeriksaan dimulai','Review started'),approved:()=>$t('Disetujui · refund penuh','Approved · full refund'),paid:()=>$t('Dibayar · label pindah ke Basic','Paid · label moved to Basic'),rejected:()=>$t('Ditolak','Rejected')};
function legacy(){if(typeof tr132!=='function')return [];const s=tr132(),news=transitionNews132(),out=[],sent=news?[[iso(news.at),$t('Pemberitahuan "Layanan Anda berubah" dikirim','Notice "Your service has changed" sent'),ini(news.by)||'SA']]:[];
 for(const r of s.requests){const l=s.lifetime[r.member],m=mem132(r.member);if(!l||!m)continue;const read=readAt132(r.member),due=deadline132(r.member);
  const hist=[...sent,...(read?[[iso(read),$t('Label membaca pemberitahuan','Label read the notice'),'L']]:[]),...(r.proofAsked?[[iso(r.proofAsked),$t('Bukti pembayaran lama diminta lewat Pesan','Legacy payment proof requested via Messages'),'SA']]:[]),...r.history.map(h=>[iso(h.at),(LEV[h.status]?LEV[h.status](r):h.status)+(h.note?' · '+h.note:''),h.actor===r.member||h.actor===m.id?'L':ini(h.actor)||'SA'])].sort((a,b)=>a[0].localeCompare(b[0]));
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
const match=t=>!S.q||[t.id,t.lab,t.title,L(KIND[t.kind]),t.pv?.[2]].join(' ').toLowerCase().includes(S.q);
function items(){if(S.tab==='tx'){let r=T.filter(match);if(S.kind!=='all')r=r.filter(t=>t.kind===S.kind);if(S.stage){const f=FLOW.find(x=>x[0]===S.stage);r=r.filter(f[2]);}
  return r.sort((a,b)=>grpTx(a)-grpTx(b)||(grpTx(a)===0?(PRI[a.issue]??9)-(PRI[b.issue]??9):0)||b.created.localeCompare(a.created));}
 const o=['submitted','checking','approved','processing','info','eligible','done','rejected','closed'];
 return R.filter(r=>!S.q||[r.id,r.lab,r.origin,L(RK[r.kind])].join(' ').toLowerCase().includes(S.q)).sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||(b.at||'').localeCompare(a.at||''));}
const monthKey=()=>U.today().slice(0,7);
const received=()=>store().provider.filter(p=>!p.refund&&p.status==='paid'&&iso(p.at).slice(0,7)===monthKey()).reduce((n,p)=>n+p.amount,0);
function tabs(){$('tabs').innerHTML=[['tx',$t('Transaksi','Transactions'),T.length],['rf',$t('Pengembalian','Refunds'),R.length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const work=T.filter(openIss).length+R.filter(r=>WORK.includes(r.st)).length,ro=rfOpen().reduce((a,r)=>a+(r.amount||0),0),rec=received(),mon=U.month(+monthKey().slice(5)-1);
 const chk=CHK?.at?ft(iso(CHK.at)):$t('belum ada','none yet'),fail=CHK?.ok===false,none=$t('kosong','none');
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Uang masuk · hari ini','Money in · today')} ${E(U.todayLabel())}</div><h2>${work?$t(`${work} hal perlu ditangani`,`${work} ${work===1?'item needs':'items need'} attention`):$t('Semua transaksi beres','All transactions settled')}</h2>
  <p>${$t('Diterima penyedia bulan ini','Received by the provider this month')} ${rps(rec)} · ${$t('pencocokan otomatis terakhir','last automatic reconciliation')} ${chk}${fail?` · <b style="font-weight:500">${$t('data penyedia belum tersedia, cek lagi','provider data unavailable, check again')}</b>`:''}</p>
  <div class="acts"><button class="wbtn" data-urgent>${$t('Buka yang berikutnya','Open next')} ${ARROW}</button>${canW?`<button class="gbtn" data-check>${$t('Cek pencocokan sekarang','Reconcile now')}</button>`:''}</div></div>
  <div class="statg"><div class="sbox"><b class="n">${rps(rec)}</b><span>${$t(`diterima ${mon}`,`received in ${mon}`)}</span></div><div class="sbox"><b class="n">${rps(ro)}</b><span>${$t('pengembalian berjalan','refunds in progress')}</span></div></div></div>
  <div class="flow">${FLOW.map(([k,t,f])=>{const g=T.filter(f);return `<button class="fn${g.length&&['match','unknown'].includes(k)?' hot act':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='tx'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${L(t)}</span><span class="d">${g.length?rps(g.reduce((a,x)=>a+x.amount,0)):none}</span></button>`;}).join('')}
  <button class="fn${rfOpen().length?'':' zero'}" data-tab="rf"><span class="dot n">${rfOpen().length}</span><span class="t">${$t('Pengembalian berjalan','Refunds in progress')}</span><span class="d">${rfOpen().length?rps(ro):none}</span></button></div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari label, nomor, atau pembelian','Search label, number, or purchase')}" value="${E(S.q)}"></label>`;
function txChip(t){if(t.issue)return ch(ISS[t.issue]);if(t.pr)return chip($t('Pengembalian berjalan','Refund in progress'),'c-bl');return ch(STS[t.st]);}
function list(){const r=items();let h='';
 if(S.tab==='tx'){const all=T.filter(match),cnt=k=>k==='all'?all.length:all.filter(t=>t.kind===k).length;
  h+=`<div class="ch"><h3>${$t('Transaksi','Transactions')} <small class="n">${r.length}</small></h3>${find()}</div><div class="pills">${[['all',['Semua','All']],['plan',['Paket','Plans']],['credits',['Kredit','Credits']],['service',['Layanan','Services']]].map(([k,t])=>`<button data-kind="${k}" aria-pressed="${S.kind===k}">${L(t)}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  if(S.stage)h+=`<div class="flt"><span>${$t('Hanya','Only')} <b style="font-weight:500">${L(FLOW.find(f=>f[0]===S.stage)[1])}</b></span><button data-stage-clear>${$t('Tampilkan semua','Show all')}</button></div>`;
  let cur=-1;r.forEach((t,i)=>{const g=grpTx(t);if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${['orange','blue','green'][g]})"></i><b>${L([['Perlu ditangani','Needs attention'],['Menunggu bayar · berjalan','Awaiting payment · in progress'],['Selesai & kedaluwarsa','Done & expired']][g])}</b> · ${r.filter(x=>grpTx(x)===g).length}</div>`;}
   h+=`<div class="it${S.sel.tx===t.id?' sel':''}" data-id="${E(t.id)}" style="--i:${i}"><span class="ty">${ICON[t.kind]}</span><div style="min-width:0"><div class="t1">${E(t.title)} ${txChip(t)}</div><div class="t2">${t.lab?E(t.lab)+' · ':''}${L(KIND[t.kind])} · <span class="mono">${E(t.id)}</span></div></div><div class="rgt"><span class="amt n">${rp(t.amount)}</span><span class="duet">${ft(t.paidAt||t.created)}</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada transaksi','No transactions')}</b>${S.q||S.kind!=='all'||S.stage?$t('Coba ubah pencarian atau pil jenis.','Try a different search or type filter.'):$t('Belum ada pembelian. Pembelian paket, kredit, dan layanan dari label tercatat di sini.','No purchases yet. Plan, credit, and service purchases from labels appear here.')}</div>`;}
 else{h+=`<div class="ch"><h3>${$t('Pengembalian','Refunds')} <small class="n">${r.length}</small></h3>${find()}</div>`;let cur='';
  const G=x=>RUN.includes(x.st)?'run':x.st==='eligible'?'el':'end';
  r.forEach((x,i)=>{const g=G(x);if(g!==cur){cur=g;const gg=r.filter(y=>G(y)===g);h+=`<div class="gh"><i style="--c:var(--${{run:'blue',el:'faint',end:'green'}[g]})"></i><b>${L({run:['Sedang berjalan','In progress'],el:['Berhak, belum mengajukan · paket lama','Eligible, not yet requested · legacy plan'],end:['Selesai','Done']}[g])}</b> · ${gg.length}${g==='el'?` · ${$t('paparan','exposure')} ${rps(gg.reduce((a,y)=>a+y.amount,0))}`:''}</div>`;}
   const old=x.kind==='legacy'||x.kind==='eligible',sub=old?`${E(x.plan)} · ${$t('dibeli','bought')} ${fd(x.bought)}${x.kind==='legacy'&&x.due&&RUN.includes(x.st)?` · ${$t('batas','deadline')} ${fd(x.due.slice(0,10))}`:''}`:`${$t('dari','from')} <span class="mono">${E(x.origin)}</span>`;
   h+=`<div class="it${S.sel.rf===x.id?' sel':''}" data-id="${E(x.id)}" style="--i:${i}">${lav(x.lab)}<div style="min-width:0"><div class="t1">${E(x.lab)} ${chip(L(RK[x.kind]),old?'c-bl':'c-or')}</div><div class="t2">${sub}</div></div><div class="rgt"><span class="amt n">${rp(x.amount)}</span>${x.st==='eligible'?'':ch(RST[x.st])}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${S.q?$t('Tidak ditemukan','Not found'):$t('Belum ada pengembalian','No refunds yet')}</b>${S.q?$t('Coba kata lain.','Try another word.'):$t('Pengembalian dana dari transaksi dan paket lama tampil di sini.','Refunds from transactions and legacy plans appear here.')}</div>`;}
 $('list').innerHTML=h;}
/* ---------- rincian transaksi ---------- */
const viewOnly=()=>$t('Akses lihat · tindakan membutuhkan izin pembayaran.','View access · actions require payment permission.');
const lockTx=t=>!canW?viewOnly():t.handler&&t.handler!==state.user&&!SA?$t(`Ditangani ${E(pname(t.handler)||t.handler)}.`,`Handled by ${E(pname(t.handler)||t.handler)}.`):'';
const acts=(t,h)=>{const l=lockTx(t);return l?`<p class="where">${l}</p>`:`<div class="hrow">${h}</div>`;};
const opts=OP=>`<div class="opts">${OP.map(([v,a,m])=>`<button data-pick="${v}" aria-pressed="${S.pick===v}">${a}<small>${m}</small></button>`).join('')}</div>`;
const fulfillLabel=t=>{const o=t.o;return o.kind==='plan'?$t(`Aktifkan paket ${E(o.plan)} · ${o.period==='month'?'1 bulan':'1 tahun'}`,`Activate ${E(o.plan)} plan · ${o.period==='month'?'1 month':'1 year'}`):o.kind==='credits'?$t(`Tambahkan ${o.credits+o.bonus} kredit`,`Add ${o.credits+o.bonus} credits`):o.source?.type==='wami'?$t('Teruskan ke Registrasi WAMI','Forward to WAMI Registration'):$t('Buat pesanan di Layanan Tambahan','Create an order in Add-on Services');};
const minsLate=t=>{if(!t.due||!t.provAt)return '';const m=Math.round((Date.parse(t.provAt+':00Z')-Date.parse(t.due+':00Z'))/6e4);return m>0&&m<180?$t(` (${m} menit kemudian)`,` (${m} min later)`):'';};
const asked=t=>`<p class="where">${$t('Sudah ditanyakan ke penyedia','Already asked the provider')} · ${fd(t.asked)}</p>`;
const ASK=()=>['ask',$t('Tanyakan ke penyedia','Ask the provider'),$t('status tetap diperiksa','status stays in review')];
function nextTx(t){const lock=lockTx(t);
 if(t.issue==='unfulfilled')return `<div class="nextc"><p>${$t(`Dibayar <b>${rp(t.rec||t.amount)}</b>${t.paidAt?` pada ${fd(t.paidAt)}`:''}, tetapi pembelian belum dipenuhi. Label belum menerima apa yang dibelinya.`,`Paid <b>${rp(t.rec||t.amount)}</b>${t.paidAt?` on ${fd(t.paidAt)}`:''}, but the purchase is not fulfilled yet. The label has not received what it bought.`)}</p>${acts(t,btn(fulfillLabel(t)+' '+ARROW,'data-do="fulfill"','pri'))}</div>`;
 if(t.issue==='mismatch'){const pv=t.pv[1],over=pv>t.amount,OP=over?[['accept',$t(`Terima ${rp(pv)} dari penyedia`,`Accept ${rp(pv)} from the provider`),$t(`selisih ${rp(pv-t.amount)} otomatis jadi pengembalian`,`the ${rp(pv-t.amount)} difference becomes a refund automatically`)],...(t.asked?[]:[ASK()])]:[['refund',$t('Kembalikan dana','Refund'),$t(`buka pengembalian ${rp(pv)}`,`open a ${rp(pv)} refund`)],...(t.asked?[]:[ASK()])];
  const rv={accept:btn($t('Terima & lanjut penuhi','Accept & fulfill'),'data-do="accept"','pri'),ask:btn($t('Catat: ditanyakan ke penyedia','Record: asked the provider'),'data-do="ask"','pri'),refund:btn($t(`Buka pengembalian ${rp(pv)}`,`Open ${rp(pv)} refund`),'data-do="refund-all"','pri')}[S.pick];
  return `<div class="nextc"><p>${$t(`Penyedia mencatat pembayaran <b>${rp(pv)}</b>, sedangkan pesanan ini <b>${rp(t.amount)}</b> dan masih "${E(t.rm[0])}".${over?'':' Nominal kurang dari harga, jadi tidak bisa diterima.'}`,`The provider recorded a payment of <b>${rp(pv)}</b>, while this order is <b>${rp(t.amount)}</b> and still "${E(t.rm[0])}".${over?'':' The amount is below the price, so it cannot be accepted.'}`)}</p>${t.asked?asked(t):''}${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal"><div class="hrow">${rv}</div></div>`:'')}</div>`;}
 if(t.issue==='late'){const pv=t.pv[1],OP=[['accept',$t('Terima & penuhi','Accept & fulfill'),$t('dana sudah masuk; label tetap dapat pembeliannya','funds received; the label still gets its purchase')],['refund',$t('Kembalikan dana','Refund'),$t('buka pengembalian penuh','open a full refund')]];
  const rv={accept:btn($t('Terima & penuhi','Accept & fulfill'),'data-do="sync"','pri'),refund:btn($t(`Buka pengembalian ${rp(pv)}`,`Open ${rp(pv)} refund`),'data-do="refund-late"','pri')}[S.pick];
  return `<div class="nextc"><p>${$t(`Batas bayar lewat ${fd(t.due)}, lalu penyedia mengonfirmasi pembayaran <b>${rp(pv)}</b> pada ${fd(t.provAt)}${minsLate(t)}.`,`The payment deadline passed on ${fd(t.due)}, then the provider confirmed a payment of <b>${rp(pv)}</b> on ${fd(t.provAt)}${minsLate(t)}.`)}</p>${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal"><div class="hrow">${rv}</div></div>`:'')}</div>`;}
 if(t.issue==='unsynced')return `<div class="nextc"><p>${$t(`Penyedia sudah menerima <b>${rp(t.pv[1])}</b> pada ${fd(t.provAt)}, tetapi status di Rilis Musik masih "${E(t.rm[0])}".`,`The provider received <b>${rp(t.pv[1])}</b> on ${fd(t.provAt)}, but the status in Rilis Musik is still "${E(t.rm[0])}".`)}</p>${acts(t,btn($t('Perbarui & penuhi','Update & fulfill'),'data-do="sync"','pri'))}</div>`;
 if(t.issue==='dup'){const over=t.rec-t.back-t.amount;return `<div class="nextc"><p>${$t(`Penyedia menerima dua pembayaran untuk pesanan ini (${rp(t.pv[1])}${t.pv2?` + ${rp(t.pv2[1])}`:''}). Kelebihan <b>${rp(over)}</b> perlu dikembalikan.`,`The provider received two payments for this order (${rp(t.pv[1])}${t.pv2?` + ${rp(t.pv2[1])}`:''}). The <b>${rp(over)}</b> excess needs to be refunded.`)}</p>${acts(t,btn($t(`Buka pengembalian ${rp(over)}`,`Open ${rp(over)} refund`),'data-do="refund-dup"','pri'))}</div>`;}
 if(t.issue==='missing')return `<div class="nextc"><p>${$t('Rilis Musik mencatat pesanan ini dibayar, tetapi penyedia belum punya konfirmasinya.','Rilis Musik recorded this order as paid, but the provider has no confirmation yet.')}</p>${t.asked?asked(t):acts(t,btn($t('Catat: ditanyakan ke penyedia','Record: asked the provider'),'data-do="ask"','pri'))}</div>`;
 if(t.issue==='refundmis')return `<div class="nextc"><p>${$t('Pengembalian tercatat selesai, tetapi penyedia belum mengonfirmasinya. Periksa lagi setelah pencocokan berikutnya.','The refund is recorded as done, but the provider has not confirmed it. Check again after the next reconciliation.')}</p></div>`;
 const paidOpen=t.o&&t.o.payment==='paid'&&!t.o.fulfilled;
 const ping=()=>btn($t('Cek ke penyedia sekarang','Check with the provider now'),'data-do="ping"','pri'),none=()=>btn($t('Tutup: tidak ada pembayaran','Close: no payment'),'data-do="close-none"','ghost dng');
 if(t.issue==='info')return `<div class="nextc"><p>${$t('Informasi sudah diminta ke label','Information requested from the label')}${t.asked?` · ${fd(t.asked)}`:''}. ${paidOpen?$t('Pembayaran sudah terkonfirmasi; pembelian belum dipenuhi.','Payment confirmed; the purchase is not fulfilled yet.'):$t('Penyedia belum mengonfirmasi pembayaran.','The provider has not confirmed the payment.')}</p>${t.prompt?`<p class="quote">${E(t.prompt)}</p>`:''}${acts(t,paidOpen?btn(fulfillLabel(t),'data-do="fulfill"','pri'):ping()+none())}</div>`;
 if(t.issue==='reported'){const ask=S.form==='ask-info'?`<div class="reveal"><label class="fld">${$t('Pertanyaan untuk label · dikirim ke label','Question for the label · sent to the label')}<textarea id="f-note" placeholder="${$t('Mis. kirim waktu bayar dan bukti transfer','E.g. send the payment time and transfer proof')}"></textarea></label><div class="hrow">${btn($t('Kirim permintaan','Send request'),'data-do="request-info"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>${$t('Label mengajukan pemeriksaan pembayaran.','The label requested a payment review.')}</p>${t.report?`<p class="quote">${E(t.report)}</p>`:''}${acts(t,paidOpen?btn(fulfillLabel(t),'data-do="fulfill"','pri'):ping()+(S.form==='ask-info'?'':btn($t('Minta info ke label','Ask the label for info'),'data-form="ask-info"'))+none())}${ask}</div>`;}
 if(t.issue==='unknown'){const OP=[['link',$t('Hubungkan ke transaksi','Link to a transaction'),$t('cari pesanan dengan nominal sama','find an order with the same amount')],['return',$t('Kembalikan ke pengirim','Return to sender'),$t('catat referensi pengembalian','record the refund reference')],['manual',$t('Tandai sudah ditangani','Mark as handled'),$t('wajib catatan','note required')]];
  const cand=T.filter(x=>x.kind!=='unknown'&&['pending','expired'].includes(x.st)&&!x.pv),same=cand.filter(x=>x.amount===t.amount),near=cand.slice(0,4).map(x=>`${E(x.id)} (${rp(x.amount)})`).join(', ');
  const noteF=ph=>`<label class="fld">${$t('Catatan · wajib','Note · required')}<input id="f-note" placeholder="${ph}"></label>`;
  const rv={link:same.length?same.map(x=>`<button class="lg pickrow" data-link="${E(x.id)}"><span>${E(x.title)} · ${E(x.lab)}<small>${E(x.id)}</small></span><b class="n">${rp(x.amount)}</b></button>`).join(''):`<p class="where">${$t(`Tidak ada pesanan menunggu/kedaluwarsa bernominal ${rp(t.amount)}.${cand.length?` Terdekat: ${near}.`:''}`,`No awaiting or expired order for ${rp(t.amount)}.${cand.length?` Closest: ${near}.`:''}`)}</p>`,
   return:`<label class="fld">${$t('Nomor referensi pengembalian · wajib','Refund reference number · required')}<input id="f-ref" placeholder="${$t('Mis. RFD-2609251234','E.g. RFD-2609251234')}"></label>${noteF($t('Mis. dikembalikan ke rekening pengirim','E.g. returned to the sender’s account'))}<div class="hrow">${btn($t('Catat dikembalikan','Record as returned'),'data-do="unknown-return"','pri')}</div>`,
   manual:`${noteF($t('Mis. transfer uji coba dari tim keuangan','E.g. test transfer from the finance team'))}<div class="hrow">${btn($t('Tandai sudah ditangani','Mark as handled'),'data-do="manual"','pri')}</div>`}[S.pick]||'';
  return `<div class="nextc"><p>${$t(`Dana <b>${rp(t.amount)}</b> masuk ke penyedia ${fd(t.created)} tanpa transaksi yang cocok.`,`Funds of <b>${rp(t.amount)}</b> reached the provider on ${fd(t.created)} without a matching transaction.`)}</p>${lock?`<p class="where">${lock}</p>`:opts(OP)+(rv?`<div class="reveal">${rv}</div>`:'')}</div>`;}
 if(t.kind==='unknown')return `<div class="nextc ok"><p>${E(t.result)}.</p></div>`;
 if(t.pr)return `<div class="nextc mute"><p>${$t(`Pengembalian ${E(t.pr)} sedang berjalan.`,`Refund ${E(t.pr)} is in progress.`)}${paidOpen?$t(' Pembelian dipenuhi setelah pengembalian selesai atau ditutup.',' The purchase is fulfilled after the refund is done or closed.'):''}</p><div class="hrow">${btn(`${$t('Buka','Open')} ${E(t.pr)} ${ARROW}`,`data-gorf="${E(t.pr)}"`,'pri')}</div></div>`;
 if(t.st==='pending')return `<div class="nextc mute"><p>${$t(`Menunggu label membayar · batas ${fd(t.due)}. Tidak perlu tindakan.`,`Waiting for the label to pay · deadline ${fd(t.due)}. No action needed.`)}</p></div>`;
 if(t.st==='expired')return `<div class="nextc mute"><p>${t.back?$t('Dana sudah dikembalikan. ','Funds already refunded. '):''}${$t('Kedaluwarsa','Expired')} ${fd(t.due)}${t.pv?'':$t(' tanpa pembayaran',' without payment')}. ${$t('Tidak perlu tindakan.','No action needed.')}</p>${t.refund?`<div class="hrow">${btn(`${$t('Buka','Open')} ${E(t.refund)} ${ARROW}`,`data-gorf="${E(t.refund)}"`)}</div>`:''}</div>`;
 const can=canW&&t.rec>t.back,form=S.form==='open-refund'?`<div class="reveal"><label class="fld">${$t('Alasan · wajib','Reason · required')}<textarea id="f-note" placeholder="${$t('Mis. label membatalkan pembelian sebelum dipakai','E.g. the label cancelled the purchase before using it')}"></textarea></label><div class="hrow">${btn($t('Buka pengembalian','Open refund'),'data-do="open-refund"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
 return `<div class="nextc ok"><p>${E(t.result||$t('Dipenuhi','Fulfilled'))}${t.paidAt?` · ${$t('dibayar','paid')} ${fd(t.paidAt)}`:''}.</p>${t.pv2?`<p class="where">${$t('Penyedia menerima dua pembayaran untuk pesanan ini.','The provider received two payments for this order.')}</p>`:''}<div class="hrow">${t.refund?btn(`${$t('Buka pengembalian','Open refund')} ${E(t.refund)} ${ARROW}`,`data-gorf="${E(t.refund)}"`,'pri'):can&&S.form!=='open-refund'?btn($t('Buka pengembalian','Open refund'),'data-form="open-refund"','ghost'):''}</div>${form}</div>`;}
function steps(labels,at,wait){const n=labels.length;return `<div class="steps" style="--n:${n}"><i class="prog" style="--w:calc(100% * ${Math.min(Math.max(at,0),n-1)} / ${n})"></i>${labels.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function cmp(t){const rm=t.rm,cols=[['Rilis Musik',rm?rm[0]:'—',rm?rp(t.amount):'—',rm?rm[1]:$t('tidak ada','none')],[$t('Penyedia','Provider'),t.pv?t.pv[0]:$t('belum ada','none yet'),t.pv?rp(t.pv[1]):'—',t.pv?t.pv[2]:'—']];if(t.pv2)cols.push([$t('Pembayaran kedua','Second payment'),t.pv2[0],rp(t.pv2[1]),t.pv2[2]]);
 const diff=i=>new Set(cols.slice(0,2).map(c=>c[i])).size>1&&cols[1][i]!=='—'&&cols[0][i]!=='—'&&!(i===1&&cols[0][1]===L(PAYN.paid)&&cols[1][1]===$t('Berhasil','Successful'));
 return `<div class="cmpw"><table class="cmpt"><thead><tr><th></th>${cols.map(c=>`<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${[[['Status','Status'],1],[['Nominal','Amount'],2],[['Referensi','Reference'],3]].map(([l,i])=>`<tr><th>${L(l)}</th>${cols.map(c=>`<td class="${i<3&&diff(i)?'df':''}${i===3?' mono':''}">${E(c[i])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
const histH=(h,lab)=>`<div class="hist">${h.slice().reverse().map(([w,x,k])=>`<div>${k==='L'?`<span class="mini lbl">${E(inis(lab||'?'))}</span>`:`<span class="mini">${E(k==='SY'?'SY':k)}</span>`}<span>${E(x)}<small style="display:block">${k==='L'?E(lab||'Label'):k==='SY'?$t('Sistem','System'):E(people.find(p=>p.initials===k)?.name||'Super Admin')} · ${fd(w)}</small></span></div>`).join('')}</div>`;
const NEXT=()=>$t('Langkah berikutnya','Next step'),STATE=()=>$t('Keadaan','Status');
function paneTx(t){let i=0;const at=t.st==='done'?3:t.st==='paid'?2:t.pv&&['mismatch','late','unsynced'].includes(t.issue)?1:0;
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Transaksi','Transactions')}</button><div class="k"><span class="ty">${ICON[t.kind]}</span>${L(KIND[t.kind])} · <span class="mono">${E(t.id)}</span></div><h2>${E(t.title)}</h2><div class="meta"><b class="n" style="font-weight:400;color:var(--text)">${rp(t.amount)}</b>${t.lab?`<span class="sep"></span><button class="lnk" data-label="${E(t.acc)}">${E(t.lab)}</button>`:''}<span class="sep"></span>${txChip(t)}${t.handler?`<span class="sep"></span><span>${E(pname(t.handler)||t.handler)}</span>`:''}</div></div>
 <div class="pb">${sec(i++,openIss(t)?NEXT():STATE(),nextTx(t))}
 ${t.kind!=='unknown'?sec(i++,$t('Tahapan','Stages'),steps([$t('Dibuat','Created'),$t('Dibayar','Paid'),$t('Dipenuhi','Fulfilled')],at,!!t.issue)):''}
 ${sec(i++,$t('Pembayaran','Payment'),cmp(t),t.pv&&CHK?.at?$t('dicocokkan ','reconciled ')+ft(iso(CHK.at)):'')}
 ${t.kind!=='unknown'?sec(i++,$t('Rincian pembelian','Purchase details'),`<div class="facts"><span>Label</span><b>${E(t.lab)}</b><span>${$t('Isi','Contents')}</span><b>${t.items.length?t.items.map(E).join('<br>'):'—'}</b><span>${$t('Harga','Price')}</span><b>${rp(t.amount)} · ${$t('disimpan saat membeli','saved at purchase')}</b><span>${$t('Dibuat','Created')}</span><b>${fd(t.created)}</b>${t.due?`<span>${$t('Batas bayar','Payment deadline')}</span><b>${fd(t.due)}</b>`:''}<span>${$t('Metode','Method')}</span><b>${E(tn(t.method)||$t('Penyedia pembayaran','Payment provider'))}</b></div>`):''}
 ${sec(i++,$t('Riwayat','History'),histH(t.hist,t.lab))}</div>`;}
/* ---------- rincian pengembalian ---------- */
const left=r=>{if(!r.due)return '';const d=Math.ceil((Date.parse(r.due+':00Z')-Date.parse(U.iso16(ten.now)+':00Z'))/864e5);return d>30?`${$t('batas','deadline')} ${fd(r.due.slice(0,10))}`:d>=0?$t(`${d} hari lagi`,`${d} ${d===1?'day':'days'} left`):$t('lewat batas','overdue');};
const REF=()=>`<label class="fld">${$t('Nomor referensi · wajib','Reference number · required')}<input id="f-ref" placeholder="${$t('Mis. RFD-2609251234','E.g. RFD-2609251234')}"`;
function nextRf(r){const legacy=r.kind==='legacy',tx=r.src==='tx',deny=legacy?(SA?'':$t('Keputusan pengembalian paket lama hanya oleh Super Admin.','Only Super Admin decides legacy plan refunds.')):(!canW?viewOnly():'');
 const tolak=S.form==='reject'?`<div class="reveal"><label class="fld">${$t('Alasan · dikirim ke label','Reason · sent to the label')}<textarea id="f-note" placeholder="${legacy?$t('Mis. pembelian tidak ditemukan di catatan lama','E.g. purchase not found in the old records'):$t('Mis. dana sudah dikembalikan oleh penyedia','E.g. the provider already refunded the funds')}"></textarea></label><div class="hrow">${btn(legacy?$t('Tolak pengajuan','Reject request'):$t('Tutup tanpa pengembalian','Close without refund'),'data-do="reject"','pri dng')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
 const rej=S.form==='reject'||!SA?'':btn(legacy?$t('Tolak','Reject'):$t('Tutup tanpa pengembalian','Close without refund'),'data-form="reject"','ghost dng');
 if(r.st==='eligible')return `<div class="nextc mute"><p>${$t(`Berhak atas refund penuh <b>${rp(r.amount)}</b> (${E(r.plan)}, dibeli ${fd(r.bought)}). `,`Eligible for a full refund of <b>${rp(r.amount)}</b> (${E(r.plan)}, bought ${fd(r.bought)}). `)}${r.read?$t(`Pemberitahuan dibaca ${fd(r.read)}; batas mengajukan ${fd(r.due.slice(0,10))}.`,`Notice read ${fd(r.read)}; request deadline ${fd(r.due.slice(0,10))}.`):$t('Pemberitahuan belum dibaca, jadi batas 30 hari belum berjalan. Pemberitahuan tampil otomatis saat label masuk.','Notice not read yet, so the 30-day deadline has not started. The notice shows automatically when the label signs in.')}</p></div>`;
 if(legacy&&r.st==='submitted'){const C=[[true,$t('Pembelian lama tercatat','Legacy purchase on record'),`${r.origin} · ${r.plan} · ${rp(r.amount)}`],[r.on,$t('Diajukan dalam 30 hari sejak dibaca','Requested within 30 days of reading'),`${r.read?$t(`dibaca ${ft(r.read)}, `,`read ${ft(r.read)}, `):''}${$t('diajukan','requested')} ${ft(r.at)}${r.due?` · ${$t('batas','deadline')} ${fd(r.due.slice(0,10))}`:''}`],[!!r.bank,$t('Rekening tujuan dari label','Recipient account from label'),r.bank||$t('belum ada · minta lewat percakapan','none yet · ask in the conversation')],[false,$t('Bukti pembayaran lama','Legacy payment proof'),r.asked?$t(`diminta ${ft(r.asked)} · boleh menyusul`,`requested ${ft(r.asked)} · may follow later`):$t('belum · boleh menyusul','not yet · may follow later')]];
  return `<div class="nextc"><p>${$t(`${E(r.lab)} mengajukan refund penuh paket lama.`,`${E(r.lab)} requested a full legacy plan refund.`)}</p>${r.note?`<p class="quote">${E(r.note)}</p>`:''}<div class="checks">${C.map(([g,t,m])=>`<div class="ck ${g?'':'warn'}"><b>${g?'✓':'!'}</b>${t}<small>${E(m)}</small></div>`).join('')}</div>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${btn($t('Mulai pemeriksaan','Start review'),'data-do="check"','pri')}${r.asked?'':btn($t('Minta bukti','Request proof'),'data-do="ask-proof"')}${rej}</div>${tolak}`}</div>`;}
 if(legacy&&r.st==='checking')return `<div class="nextc"><p>${$t('Refund <b>penuh</b> sesuai keputusan 19 Okt. Setelah dibayar, label pindah ke paket <b>Basic</b>; rilisan tayang dan saldo royalti tetap miliknya.','<b>Full</b> refund per the 19 Oct decision. Once paid, the label moves to the <b>Basic</b> plan; its live releases and royalty balance stay its own.')}</p><label class="fld">${$t('Nominal pengembalian · refund penuh, tidak bisa diubah','Refund amount · full refund, cannot be changed')}<input id="f-amt" inputmode="numeric" value="${r.amount.toLocaleString(U.loc())}" readonly></label><p class="where">${r.bank?$t(`Ke ${E(r.bank)} · rekening dari label, bukan rekening royalti otomatis.`,`To ${E(r.bank)} · account from the label, not the automatic royalty account.`):$t('Rekening tujuan belum ada di pengajuan; minta lewat percakapan.','No recipient account in the request; ask in the conversation.')}</p>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${btn($t('Setujui pengembalian','Approve refund'),'data-do="approve"','pri')}${rej}</div>${tolak}`}</div>`;
 if(legacy&&r.st==='approved')return `<div class="nextc"><p>${$t(`Kembalikan <b>${rp(r.amount)}</b> ke ${E(r.bank||'rekening label')}, lalu catat hasilnya.`,`Refund <b>${rp(r.amount)}</b> to ${E(r.bank||'the label bank account')}, then record the result.`)}</p>${deny?`<p class="where">${deny}</p>`:`${REF()}></label><div class="hrow">${btn($t('Catat dibayar & pindahkan ke Basic','Record paid & move to Basic'),'data-do="paid"','pri')}</div>`}</div>`;
 if(r.st==='done')return `<div class="nextc ok"><p>${$t(`Selesai · ${rp(r.amount)} dikembalikan`,`Done · ${rp(r.amount)} refunded`)}${r.ref?` · ${$t('referensi','reference')} <span class="mono">${E(r.ref)}</span>`:''}.${legacy?$t(' Label kini memakai paket Basic.',' The label is now on the Basic plan.'):''}</p></div>`;
 if(['rejected','closed'].includes(r.st))return `<div class="nextc mute"><p>${L(RST[r.st][0])}.</p>${r.why?`<p class="quote">${E(r.why)}</p>`:''}</div>`;
 if(tx&&r.st==='checking'){if(S.routeFor!==r.id){S.route=r.route==='transfer'?'bank':'origin';S.routeFor=r.id;}const bank=S.route==='bank';
  const routeOpts=`<div class="opts two">${[['origin',$t('Jalur pembayaran asal','Original payment method'),$t('dikembalikan lewat penyedia','refunded through the provider')],['bank',$t('Transfer ke rekening label','Transfer to label bank account'),r.confirmed?$t('rekening sudah dikonfirmasi','account confirmed'):$t('minta rekening tujuan','request a recipient account')]].map(([v,a,m])=>`<button data-route="${v}" aria-pressed="${S.route===v}">${a}<small>${m}</small></button>`).join('')}</div>`;
  const ph=L({dup:['Mis. kredit dari pembayaran kedua tidak diberikan; kelebihan dikembalikan','E.g. no credits granted for the second payment; excess refunded'],over:['Mis. pembelian dipenuhi; kelebihan bayar dikembalikan','E.g. purchase fulfilled; overpayment refunded'],late:['Mis. pembelian tidak dipenuhi; dana dikembalikan penuh','E.g. purchase not fulfilled; full refund'],unfit:['Mis. layanan tidak dikerjakan; dana dikembalikan','E.g. service not delivered; funds refunded']}[r.kind])||$t('Jelaskan bagian yang sudah diberikan dan penyelesaiannya','Explain what was already delivered and how it is resolved');
  const main=!canW?'':bank&&!r.confirmed?btn($t('Minta rekening ke label','Request account from label'),'data-do="ask-bank"','pri'):SA?btn($t('Setujui pengembalian','Approve refund'),'data-do="approve"','pri'):'';
  return `<div class="nextc"><p>${E(tn(r.note))}</p><label class="fld">${$t('Nominal pengembalian · maks','Refund amount · max')} ${rp(r.max)}<input id="f-amt" inputmode="numeric" value="${r.amount.toLocaleString(U.loc())}"></label>${routeOpts}${bank?`<p class="where">${r.confirmed?$t(`Ke ${E(r.bank)} · dikonfirmasi label.`,`To ${E(r.bank)} · confirmed by the label.`):$t('Rekening tujuan belum ada. Label mengonfirmasi rekening dulu; rekening royalti tidak dipakai otomatis.','No recipient account yet. The label confirms an account first; the royalty account is not used automatically.')}</p>`:''}<label class="fld">${$t('Hasil pemeriksaan · wajib','Review outcome · required')}<textarea id="f-disp" placeholder="${ph}"></textarea></label>${deny?`<p class="where">${deny}</p>`:`<div class="hrow">${main}${rej}</div>`}<p class="where">${$t('Persetujuan pengembalian hanya oleh Super Admin.','Only Super Admin approves refunds.')}</p>${tolak}</div>`;}
 if(tx&&r.st==='info')return `<div class="nextc mute"><p>${$t('Menunggu label mengonfirmasi rekening tujuan. Setelah dikonfirmasi, pengembalian kembali ke pemeriksaan.','Waiting for the label to confirm the recipient account. Once confirmed, the refund returns to review.')}</p>${r.prompt?`<p class="quote">${E(r.prompt)}</p>`:''}</div>`;
 if(tx&&['approved','processing'].includes(r.st))return `<div class="nextc"><p>${$t(`Kembalikan <b>${rp(r.amount)}</b> ${r.route==='transfer'?`ke ${E(r.bank||'rekening label')}`:'lewat penyedia pembayaran (jalur asal)'}, lalu catat hasilnya.`,`Refund <b>${rp(r.amount)}</b> ${r.route==='transfer'?`to ${E(r.bank||'the label bank account')}`:'through the payment provider (original method)'}, then record the result.`)}</p>${SA?`${REF()} value="${E(r.ref)}"></label><div class="hrow">${btn($t('Catat dibayar','Record paid'),'data-do="paid"','pri')}</div>`:`<p class="where">${$t('Pencatatan pengembalian hanya oleh Super Admin.','Only Super Admin records refunds.')}</p>`}</div>`;
 return `<div class="nextc mute"><p>${L(RST[r.st]?.[0])||''}.</p></div>`;}
function paneRf(r){let i=0;const old=r.kind==='legacy'||r.kind==='eligible',L4=[$t('Diajukan','Submitted'),$t('Diperiksa','Reviewed'),$t('Disetujui','Approved'),old?$t('Dibayar · ke Basic','Paid · to Basic'):$t('Dibayar','Paid')],at={eligible:-1,submitted:0,checking:1,info:1,approved:2,processing:2,done:4,rejected:1,closed:1}[r.st];
 const ex=r.kind==='legacy'&&RUN.includes(r.st)?left(r):r.st==='eligible'&&r.due?left(r):'';
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Pengembalian','Refunds')}</button><div class="relhd">${lav(r.lab,1)}<div style="min-width:0"><div class="k">${$t('Pengembalian','Refund')} · <span class="mono">${E(r.src==='eligible'?r.key:r.id)}</span></div><h2>${E(r.lab)}</h2><div class="meta"><b class="n" style="font-weight:400;color:var(--text)">${rp(r.amount)}</b><span class="sep"></span>${chip(L(RK[r.kind]),old?'c-bl':'c-or')}<span class="sep"></span>${ch(RST[r.st])}</div></div></div></div>
 <div class="pb">${sec(i++,['done','rejected','closed','eligible'].includes(r.st)?STATE():NEXT(),nextRf(r),ex)}
 ${at>=0?sec(i++,$t('Tahapan','Stages'),steps(L4,at,['rejected','closed','info'].includes(r.st))):''}
 ${sec(i++,$t('Rincian','Details'),`<div class="facts"><span>${$t('Asal','Origin')}</span><b>${old?`${$t('Pembelian lama','Legacy purchase')} <span class="mono">${E(r.origin)}</span> · ${E(r.plan)} · ${fd(r.bought)}`:`${$t('Transaksi','Transaction')} <button class="lnk" data-gotx="${E(r.origin)}">${E(r.origin)}</button>`}</b><span>Label</span><b><button class="lnk" data-label="${E(r.acc)}">${E(r.lab)}</button></b><span>${$t('Nominal','Amount')}</span><b>${rp(r.amount)}${old?$t(' · refund penuh',' · full refund'):''}</b>${r.src==='tx'?`<span>${$t('Jalur','Method')}</span><b>${r.route==='transfer'?$t('Transfer ke rekening label','Transfer to label bank account'):$t('Jalur pembayaran asal','Original payment method')}</b>`:''}${r.bank?`<span>${$t('Rekening tujuan','Recipient account')}</span><b>${E(r.bank)}</b>`:''}${r.ref?`<span>${$t('Referensi','Reference')}</span><b class="mono">${E(r.ref)}</b>`:''}${r.ticket?`<span>${$t('Percakapan','Conversation')}</span><b><button class="lnk" data-ticket="${E(r.ticket)}">${E(r.ticket)}</button></b>`:''}${old&&r.read?`<span>${$t('Pemberitahuan dibaca','Notice read')}</span><b>${fd(r.read)} · ${$t('batas','deadline')} ${fd(r.due.slice(0,10))}</b>`:''}</div>`)}
 ${r.hist.length?sec(i++,$t('Riwayat','History'),histH(r.hist,r.lab)):''}</div>`;}
function pane(){const it=items().find(x=>x.id===S.sel[S.tab]);$('pin').innerHTML=it?(S.tab==='tx'?paneTx(it):paneRf(it)):`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih item','Select an item')}</b>${$t('Rinciannya tampil di sini.','Its details appear here.')}</div>`;}
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
function txAct(k,id,p={}){const o=order113(id);if(!o)throw Error($t('Transaksi tidak ditemukan.','Transaction not found.'));return atomic113(k,{id,version:o.version,...p});}
function chain(fn){const before=structuredClone(ten);try{const r=fn();save10();return r;}catch(err){Object.keys(ten).forEach(k=>delete ten[k]);Object.assign(ten,before);try{save10();}catch(e){}throw err;}}
const claimIf=id=>{const o=order113(id);if(!SA&&!o.handler)txAct('claim',id);};
const fulfill=id=>{claimIf(id);txAct('fulfill',id,{checked:true});};
const propose=(rid,n)=>{const r=store().refunds.find(x=>x.id===rid);if(r&&n>0)r.proposed=n;};
function act(a){let msg='',goRf='',goTx='';
 try{
 if(S.tab==='tx'){const t=T.find(x=>x.id===S.sel.tx);if(!t)return;const id=t.id;
  const needRef=()=>$t('Isi nomor referensi','Enter the reference number'),needNote=()=>$t('Catatan wajib diisi','A note is required'),needWhy=()=>$t('Alasan wajib diisi','A reason is required'),noProv=()=>$t('Data penyedia belum tersedia · coba lagi nanti','Provider data unavailable · try again later');
  if(a==='fulfill'){chain(()=>fulfill(id));msg=$t('Dipenuhi · label menerima pembeliannya','Fulfilled · the label received its purchase');}
  else if(a==='accept'){const p=t.pv[3],over=p.amount-t.amount;let rid='';chain(()=>{txAct('accept',id,{provider:p.id});fulfill(id);if(over>0){rid=txAct('refund-open',id,{reason:'Selisih pembayaran',note:$t(`Kelebihan bayar ${rp(over)} dari penyedia (${p.reference}).`,`Overpayment of ${rp(over)} from the provider (${p.reference}).`)});propose(rid,over);}});msg=rid?$t(`Diterima & dipenuhi · kelebihan ${rp(over)} jadi pengembalian ${rid}`,`Accepted & fulfilled · the ${rp(over)} excess became refund ${rid}`):$t('Diterima & dipenuhi','Accepted & fulfilled');}
  else if(a==='ask'){txAct('review',id,{note:t.pv?$t(`Ditanyakan ke penyedia: penyedia mencatat ${rp(t.pv[1])}, pesanan ${rp(t.amount)}.`,`Asked the provider: provider recorded ${rp(t.pv[1])}, order ${rp(t.amount)}.`):$t('Ditanyakan ke penyedia: konfirmasi pembayaran belum ditemukan.','Asked the provider: payment confirmation not found.')});msg=$t('Dicatat: ditanyakan ke penyedia','Recorded: asked the provider');}
  else if(a==='sync'){chain(()=>{txAct('sync',id);fulfill(id);});msg=$t('Pembayaran diterima & pembelian dipenuhi','Payment accepted & purchase fulfilled');}
  else if(['refund-all','refund-late','refund-dup'].includes(a)){const R0={'refund-all':['Selisih pembayaran',$t('Nominal penyedia berbeda dengan harga; dana dikembalikan penuh.','Provider amount differs from the price; full refund.'),t.rec],'refund-late':['Pembayaran setelah kedaluwarsa',$t('Dibayar setelah batas bayar; dana dikembalikan penuh.','Paid after the payment deadline; full refund.'),t.rec],'refund-dup':['Pembayaran ganda',$t('Dua pembayaran diterima untuk pembelian yang sama; kelebihan dikembalikan.','Two payments received for the same purchase; excess refunded.'),t.rec-t.back-t.amount]}[a];
   const rid=chain(()=>{const r=txAct('refund-open',id,{reason:R0[0],note:R0[1]});propose(r,R0[2]);return r;});msg=$t(`Pengembalian ${rid} dibuka · lanjut di tab Pengembalian`,`Refund ${rid} opened · continue in the Refunds tab`);goRf=rid;}
  else if(a==='ping'){atomic113('check',{from:0,to:ten.now+864e5});load();const n=(CHK?.rows||[]).filter(r=>r.order===id).length;msg=CHK?.ok===false?noProv():n?$t('Penyedia punya catatan untuk pesanan ini · periksa perbandingannya','The provider has a record for this order · check the comparison'):$t('Penyedia: belum ada pembayaran untuk pesanan ini','Provider: no payment for this order yet');}
  else if(a==='close-none'){txAct('resolve',id,{note:$t('Ditutup: penyedia tidak menerima pembayaran untuk pesanan ini.','Closed: the provider received no payment for this order.')});msg=$t('Ditutup · label diberi tahu','Closed · label notified');}
  else if(a==='request-info'){const note=val('f-note');if(note.length<5){toast($t('Tulis pertanyaan untuk label','Write a question for the label'));return;}txAct('request-info',id,{note});msg=$t('Permintaan informasi dikirim ke label','Information request sent to the label');}
  else if(a==='unknown-return'){const ref=val('f-ref'),note=val('f-note');if(!ref){toast(needRef());return;}if(note.length<5){toast(needNote());return;}atomic113('unknown',{how:'return',provider:id,reference:ref,note});msg=$t('Tercatat dikembalikan ke pengirim','Recorded as returned to sender');}
  else if(a==='manual'){const note=val('f-note');if(note.length<5){toast(needNote());return;}atomic113('unknown',{how:'manual',provider:id,note});msg=$t('Ditandai sudah ditangani','Marked as handled');}
  else if(a==='open-refund'){const note=val('f-note');if(note.length<5){toast(needWhy());return;}const rid=txAct('refund-open',id,{reason:'Alasan lain',note});msg=$t(`Pengembalian ${rid} dibuka`,`Refund ${rid} opened`);goRf=rid;}}
 else{const r=R.find(x=>x.id===S.sel.rf);if(!r)return;
  const needRef=()=>$t('Isi nomor referensi','Enter the reference number'),needWhy=()=>$t('Alasan wajib diisi','A reason is required'),approved=()=>$t('Disetujui · lanjut kembalikan dana','Approved · proceed with the refund');
  if(r.kind==='legacy'){if(!SA){toast($t('Keputusan hanya oleh Super Admin','Only Super Admin can decide'));return;}
   if(a==='check'){stepRefund132(r.id,'checking','',{quiet:true});msg=$t('Pemeriksaan dimulai · label diberi tahu','Review started · label notified');}
   else if(a==='ask-proof'){askProof(r);msg=$t(`Permintaan bukti dikirim lewat Pesan (${r.ticket})`,`Proof request sent via Messages (${r.ticket})`);}
   else if(a==='approve'){stepRefund132(r.id,'approved','',{quiet:true});msg=approved();}
   else if(a==='paid'){const ref=val('f-ref');if(!ref){toast(needRef());return;}stepRefund132(r.id,'paid','',{quiet:true,reference:ref});msg=$t('Refund dibayar · label pindah ke Basic','Refund paid · label moved to Basic');}
   else if(a==='reject'){const n=val('f-note');if(n.length<5){toast(needWhy());return;}stepRefund132(r.id,'rejected',n,{quiet:true});msg=$t('Ditolak · label diberi tahu','Rejected · label notified');}}
  else if(r.src==='tx'){const oid=r.o.id;
   if(a==='approve'){const n=+val('f-amt').replace(/[^\d]/g,''),disp=val('f-disp');if(!n){toast($t('Isi nominal pengembalian','Enter the refund amount'));return;}if(n>r.max){toast($t('Nominal melebihi sisa dana ','Amount exceeds the remaining funds ')+rp(r.max));return;}if(disp.length<5){toast($t('Tulis hasil pemeriksaan','Write the review outcome'));return;}
    txAct('refund-approve',oid,{refund:r.id,amount:n,method:S.route==='bank'?'transfer':'origin',disposition:disp,note:disp,checked:true});msg=approved();}
   else if(a==='ask-bank'){txAct('refund-info',oid,{refund:r.id,note:$t('Konfirmasikan rekening tujuan untuk pengembalian ini. Rekening royalti tidak dipakai otomatis.','Confirm the recipient account for this refund. The royalty account is not used automatically.')});msg=$t('Label diminta mengonfirmasi rekening','Label asked to confirm the account');}
   else if(a==='paid'){const ref=val('f-ref');if(!ref){toast(needRef());return;}const rr=r.r;
    chain(()=>{if(rr.method==='transfer')txAct('refund-done',oid,{refund:r.id,method:'manual',reference:ref,at:ten.now,note:$t('Transfer pengembalian ke rekening yang dikonfirmasi label.','Refund transfer to the account confirmed by the label.'),checked:true});
     else{const m=store();if(!m.provider.some(x=>x.refund===r.id))m.provider.push({id:'SIM-REF-'+r.id,order:oid,refund:r.id,reference:ref,amount:rr.amount,currency:'IDR',status:'refunded',at:ten.now,simulation:true});txAct('refund-done',oid,{refund:r.id,method:'provider',reference:ref,at:ten.now,note:$t('Dana dikembalikan lewat penyedia pembayaran.','Funds refunded through the payment provider.'),checked:true});}});
    msg=$t('Pengembalian selesai · label diberi tahu','Refund done · label notified');}
   else if(a==='reject'){const n=val('f-note');if(n.length<5){toast(needWhy());return;}txAct('refund-close',oid,{refund:r.id,note:n});msg=$t('Ditutup tanpa pengembalian · label diberi tahu','Closed without refund · label notified');}}}
 }catch(err){toast(tn(String(err?.message||err)));lastSig='';render();return;}
 S.form=null;S.pick=null;lastSig='';load();
 if(goRf){S.tab='rf';S.sel.rf=goRf;S.read=true;}
 if(S.stage&&S.tab==='tx'){const f=FLOW.find(x=>x[0]===S.stage),cur=T.find(x=>x.id===S.sel.tx);if(!cur||!f[2](cur))S.stage=null;}
 render();toast(msg);}
function askProof(r){const text=`Mohon kirim bukti pembayaran layanan lama (${r.origin}) bila ada — tangkapan layar transfer atau invoice. Pengajuanmu tetap kami proses.`,textEn=`Please send proof of payment for the legacy service (${r.origin}) if you have it — a transfer screenshot or invoice. We are still processing your request.`;
 const live=typeof Tickets112==='object'&&Tickets112.init(ten).tickets.find(t=>t.id===r.ticket);
 if(live)run112('message',{id:live.id,version:live.version,note:$t(text,textEn)});
 else{const tk=typeof threadStore131==='function'&&threadStore131().tickets.find(x=>x.id===r.ticket);if(!tk)throw Error($t(`Percakapan ${r.ticket} tidak ditemukan.`,`Conversation ${r.ticket} not found.`));const msg={who:me().id,text:[text,textEn],at:$t('baru saja','just now'),ts:Date.now()};if(tk.chat)(data.chats[tk.chat]=data.chats[tk.chat]||[]).push(msg);else (tk.msgs=tk.msgs||[]).push(msg);}
 r.r.proofAsked=ten.now;save10();}
function openTicket(id){const live=typeof Tickets112==='object'&&Tickets112.init(ten).tickets.some(t=>t.id===id);if(live&&typeof detail112==='function')return detail112(id);
 if(typeof openInbox131==='function'){openInbox131('c:all');inbox131.sel='t:'+id;render();return;}toast($t('Buka Kotak Masuk › ','Open Inbox › ')+id);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.pick=null;paint();if(tb.closest('#band'))$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='tx';S.q='';S.kind='all';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.q='';S.kind='all';const tx=T.filter(openIss).sort((a,b)=>(PRI[a.issue]??9)-(PRI[b.issue]??9))[0];const rf=R.filter(r=>WORK.includes(r.st))[0];if(tx)open('tx',tx.id);else if(rf)open('rf',rf.id);else toast($t('Tidak ada yang perlu ditangani','Nothing needs attention'));return;}
  if(t.closest('[data-check]')){try{atomic113('check',{from:0,to:ten.now+864e5});}catch(err){toast(tn(String(err?.message||err)));return;}lastSig='';load();render();toast(CHK?.ok===false?$t('Data penyedia belum tersedia · coba lagi nanti','Provider data unavailable · try again later'):$t(`Pencocokan selesai · ${(CHK?.rows||[]).length} perlu diperiksa`,`Reconciliation done · ${(CHK?.rows||[]).length} to review`));return;}
  const kd=t.closest('[data-kind]');if(kd){S.kind=kd.dataset.kind;paint();return;}
  const gr=t.closest('[data-gorf]');if(gr){S.q='';open('rf',gr.dataset.gorf);return;}
  const gt=t.closest('[data-gotx]');if(gt){S.q='';S.kind='all';open('tx',gt.dataset.gotx);return;}
  const lk=t.closest('[data-link]');if(lk){const lo=order113(lk.dataset.link),id=S.sel.tx;try{atomic113('unknown',{how:'link',provider:id,id:lo.id,version:lo.version});}catch(err){toast(tn(String(err?.message||err)));return;}lastSig='';load();S.sel.tx=lo.id;S.pick=null;S.read=true;render();toast($t(`Dana dihubungkan ke ${lo.id} · lanjut penuhi pembeliannya`,`Funds linked to ${lo.id} · now fulfill the purchase`));return;}
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
const sig=()=>T.map(t=>[t.id,t.issue,t.st,t.ver||0,t.pr].join(':')).join('|')+'#'+R.map(r=>r.id+':'+r.st+':'+(r.asked?1:0)).join('|')+'#'+(CHK?.at||0)+(CHK?.ok===false?'x':'')+'#'+U.today()+(SA?'s':'')+(canW?'w':'')+state.lang;
const allowed=()=>{try{return can113();}catch(err){return false;}};
const DEF={id:'transactions',css:STYLE,html:HTML,
 i18n:{'Transaksi':'Transactions','Uang masuk dari label (paket, kredit, layanan), pencocokan dengan penyedia pembayaran, dan pengembalian dana.':'Money in from labels (plans, credits, services), reconciliation with the payment provider, and refunds.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&['payments','refunds','recon'].includes(v4.module)&&!state.preview&&allowed(),
 init(r){root=r;bind();},
 draw(){load();intake();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Transaksi */
DEF.sum=function(){load();const iss=T.filter(openIss),rf=R.filter(r=>WORK.includes(r.st)),byM={};
 for(const p of store().provider){if(p.refund||p.status!=='paid')continue;const k=iso(p.at).slice(0,7);byM[k]=(byM[k]||0)+p.amount;}
 return {work:iss.length+rf.length,iss:iss.map(t=>({id:t.id,issue:t.issue,name:L((ISS[t.issue]||[t.issue])[0]),amount:t.amount||0,lab:t.lab})),
  rf:rf.map(r=>({id:r.id,src:r.src,lab:r.lab,amount:r.amount||0,st:r.st,stn:L((RST[r.st]||[r.st])[0]),kind:L(RK[r.kind])||'',plan:r.plan||'',due:r.due||'',origin:r.origin||''})),
  rfOpen:{n:rfOpen().length,sum:rfOpen().reduce((a,r)=>a+(r.amount||0),0)},rec:received(),byM,chk:CHK?.at?iso(CHK.at):''};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
const staffSide=()=>!isLabel10()&&!state.preview&&state.mode==='platform'&&allowed();
const show=(tab,id)=>{pend={tab,id};try{closeModal();}catch(err){}document.querySelector('#transaction-drawer113')?.close();if(DEF.when()){lastSig='';render();}else route113(tab==='rf'?'refunds':'transactions');};
if(typeof window.detail113==='function'){const before=window.detail113;window.detail113=function(id){if(!staffSide())return before.apply(this,arguments);const o=store().orders.find(x=>x.id===id);if(o&&!seen(o))return toast137(DEF,$t('Informasi di luar cakupan akun.','Information outside your account scope.'));show('tx',id);};}
for(const name of ['opModal','taskModal']){if(typeof window[name]!=='function')continue;const before=window[name];window[name]=function(id){if(String(id).startsWith('RF-')&&staffSide()){load();if(R.some(r=>r.id===id))return show('rf',id);}return before.apply(this,arguments);};}
})();
