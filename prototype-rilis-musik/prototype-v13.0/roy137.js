/* v1.1.0-dev.32 — Royalti dirancang ulang (rancangan disetujui 21 Okt 2026, mock roy1).
   Tab Laporan · Saldo label · Analitik. Laporan = siklus Perlu diperiksa → Siap diterbitkan → Menunggu dana → Selesai
   (Terbitkan / Catat dana diterima, pemeriksaan otomatis termasuk "periode sebelumnya belum terbit"). Saldo label =
   saldo per akun pencairan (Kirim pengingat, Sesuaikan saldo dengan alasan wajib). Analitik = per periode, platform,
   label, dan lagu teratas + pencarian lagu/artis (pengganti Pendapatan Artis). Satu sumber angka: model107 (laporan,
   buku saldo, penerimaan dana) dan Withdraw108 (akun & penarikan). Saldo awal migrasi bukan pendapatan periode mana pun. */
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
@media (max-width:1240px){.narrow{display:inline-flex!important}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Royalti</h1><div class="sub">Terima laporan Believe, terbitkan pendapatan ke label, catat dana masuk, dan jaga saldo setiap label.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,B=[],L=[],ANA={},lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),DOC=sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),NOTE=sv('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>'),CHART=sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137;
/* dev.43 — dua bahasa: bulan, angka, dan rupiah lewat U137 (membaca state.lang saat dipanggil) */
const month=p=>p?U.monthP(p):'—';
const fd=U.fd;
const rp=n=>U.rp(n),rps=n=>U.rps(n);
const num=n=>Number(n||0).toLocaleString(U.loc());
const pct=x=>U.num(x,1);
const pl=(n,w,ws)=>`${n} ${n===1?w:(ws||w+'s')}`;
const nlab=n=>$t(`${n} label`,pl(n,'label'));
/* "Baris lainnya (28.263 baris)" dari data contoh → jumlah baris untuk teks bahasa Inggris */
/* nama platform tetap buatan data contoh ("Gabungan platform", "Lainnya") → tampilan bahasa Inggris */
const platT=n=>n==='Gabungan platform'?$t(n,'Combined platforms'):n==='Lainnya'?$t(n,'Other'):n;
const otherRows=t=>{const m=/^Baris lainnya \(([\d.]+) baris\)$/.exec(String(t));return m?U.num(+m[1].replace(/\./g,'')):null;};
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const inis=s=>String(s).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(n,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(n)}">${E(inis(n))}</span>`;
const isSA=()=>!!me().super;
const THR=1e6;
const STG=[['review','Perlu diperiksa','c-or','Needs review'],['ready','Siap diterbitkan','c-bl','Ready to publish'],['funds','Menunggu dana','c-or','Awaiting funds'],['done','Selesai','c-gr','Done'],['mig','Saldo awal','','Opening balance']];
const stg=k=>{const s=STG.find(x=>x[0]===k);return s&&[s[0],$t(s[1],s[3]),s[2]];};
const S={tab:'rep',stage:null,q:'',sel:{rep:null,bal:null,ana:null},read:false,form:null,period:'',adj:'+',adjMember:''};
const wide=()=>innerWidth>1240;
/* ---------- data asli ---------- */
const isMig=b=>b.fingerprint==='sample131-legacy'||/saldo-awal-migrasi/i.test(b.name||'');
const mname=id=>(ten.members||[]).find(m=>m.id===id)?.name||id;
const role=a=>a==='super'?'Super Admin':a==='admin'?'Staf':a==='label'?'Label':'Sistem';
const roleT=w=>w==='Staf'?$t('Staf','Staff'):w==='Sistem'?$t('Sistem','System'):w;
const HK={import:['Diimpor','Imported'],match:['Baris dicocokkan','Rows matched'],publish:['Diterbitkan','Published'],receive:['Dana diterima','Funds received'],archive:['Diarsipkan','Archived'],correct:['Koreksi diterapkan','Correction applied'],replace:['File diganti','File replaced'],'unmatched-receipt':['Dana tanpa laporan dicatat','Funds without a report recorded'],allocate:['Dana dicocokkan ke laporan','Funds matched to report'],adjust:['Saldo disesuaikan','Balance adjusted']};
const hk=k=>HK[k]?$t(HK[k][0],HK[k][1]):k;
function load(){const m=model107(),led=m.ledger||[];
 const pendingOf=id=>led.filter(l=>l.ref===id&&l.bucket==='pending').reduce((n,l)=>n+l.amount,0);
 B=(m.batches||[]).filter(b=>!b.archived).map(b=>{const per={};let unmatched=0;for(const r of b.rows){if(r.member)per[r.member]=(per[r.member]||0)+r.amount;if(!r.matched||!r.member)unmatched++;}
  const members=Object.keys(per),posted=members.length&&members.every(x=>b.posted.includes(x)),mig=isMig(b),rc=(m.receipts||[]).find(r=>(r.allocations||[]).some(a=>a.batch===b.id)||r.batch===b.id);
  const pend=pendingOf(b.id),st=mig?'mig':!posted?(unmatched?'review':'ready'):pend>0?'funds':'done';
  const period=b.sample131?.period||b.rows[0]?.period||'';
  const hist=(m.history||[]).filter(h=>h.ref===b.id).map(h=>[String(h.at).slice(0,16),`${hk(h.kind)}${h.note?` · ${String(h.note).slice(0,80)}`:''}`,role(h.actor)]);
  return {id:b.id,file:b.name,period,rate:b.rate,lines:b.sample131?.lines||b.rows.length,rows:b.rows.length,unmatched,members,unposted:members.filter(x=>!b.posted.includes(x)),
   labels:Object.entries(per).map(([k,v])=>[k,mname(k),v]).sort((a,b)=>b[2]-a[2]),total:Object.values(per).reduce((n,v)=>n+v,0),pending:pend,kind:mig?'migrasi':'',st,replace:b.sample131?.status==='replacement_preview',
   imported:String(b.at||'').slice(0,16),receipt:rc?{ref:rc.reference,date:rc.date,amount:rc.amount}:null,hist,version:b.version};});
 /* saldo per akun pencairan (satu akun bisa berisi beberapa label) */
 const W=model108();L=(W.accounts||[]).map(a=>{const t=Withdraw108.totals(m,a.id),ls=led.filter(l=>a.members.includes(l.member));
  const cr={};for(const l of ls.filter(l=>['published','adjustment'].includes(l.kind)&&l.bucket!=='paid')){const k=l.kind==='adjustment'?l.id:l.ref;(cr[k]||(cr[k]={ref:l.ref,amount:0,adj:l.kind==='adjustment'?(l.note||$t('Penyesuaian','Adjustment')):''})).amount+=l.amount;}
  const wd=(W.requests||[]).filter(w=>w.account===a.id).map(w=>[w.id,w.amount,w.status==='paid',w.status]);
  return {id:a.id,n:a.name||mname(a.id),members:a.members,av:t.available,pe:t.pending,pr:t.processing,paid:t.paid,cr:Object.values(cr),wd,hold:!!a.hold};}).filter(l=>l.av||l.pe||l.pr||l.paid||l.cr.length);
 /* analitik dari laporan yang sudah terbit (Royalty107.rows sudah tanpa saldo awal migrasi) */
 ANA={};const rows=safeRows();const byP={},oth=$t('Lainnya','Other');for(const r of rows){(byP[r.period]||(byP[r.period]=[])).push(r);}
 for(const [p,rs] of Object.entries(byP)){const plat={},lab={},tr={},art=new Set();for(const r of rs){plat[r.platform||oth]=(plat[r.platform||oth]||0)+r.amount;lab[r.member]=(lab[r.member]||0)+r.amount;const k=r.member+'|'+(r.isrc||r.track||r.title);if(!tr[k])tr[k]={t:r.title||'—',a:r.artist||'',l:mname(r.member),m:r.member,v:0,p:new Set()};tr[k].v+=r.amount;tr[k].p.add(r.platform);if(r.artist)art.add(r.artist);}
  ANA[p]={total:rs.reduce((n,r)=>n+r.amount,0),plat:Object.entries(plat).sort((a,b)=>b[1]-a[1]),lab:Object.entries(lab).map(([k,v])=>[k,mname(k),v]).sort((a,b)=>b[2]-a[2]),tracks:Object.keys(tr).length,artists:art.size,top:Object.values(tr).sort((a,b)=>b.v-a.v).slice(0,200).map(x=>[x.t,x.a,x.l,x.v,x.p.size,x.m])};}
 const ps=Object.keys(ANA).sort();if(!S.period||!ANA[S.period])S.period=ps[ps.length-1]||'';}
function safeRows(){try{return Royalty107.rows(model107(),{role:ten.role,member:null});}catch(err){return [];}}
const lagOf=b=>B.filter(x=>!x.kind&&x.st!=='done'&&x.st!=='funds'&&x.period<b.period);
const lagging=()=>B.filter(b=>!b.kind&&['review','ready'].includes(b.st)&&B.some(x=>!x.kind&&['funds','done'].includes(x.st)&&x.period>b.period));
const refName=ref=>{const b=B.find(x=>x.id===ref);return !b?ref:b.kind?$t('Saldo awal migrasi','Migration opening balance'):$t('Laporan '+month(b.period),month(b.period)+' report');};
const bst=l=>l.pr>0?[$t('Sedang dicairkan','Payout in progress'),'c-bl','proc']:l.av>=THR?[$t('Siap dicairkan','Ready for payout'),'c-or','ready']:[$t('Di bawah ambang','Below threshold'),'','low'];
function items(){const q=S.q;
 if(S.tab==='rep'){const o=STG.map(s=>s[0]);let r=B.filter(b=>!q||[b.file,month(b.period),b.id].join(' ').toLowerCase().includes(q));if(S.stage)r=r.filter(b=>b.st===S.stage);return r.sort((a,b)=>o.indexOf(a.st)-o.indexOf(b.st)||(['review','ready','funds'].includes(a.st)?String(a.period).localeCompare(String(b.period)):String(b.period).localeCompare(String(a.period)))).map(b=>({id:b.id,b}));}
 if(S.tab==='bal'){const o=['ready','proc','low'];return L.filter(l=>!q||l.n.toLowerCase().includes(q)).sort((a,b)=>o.indexOf(bst(a)[2])-o.indexOf(bst(b)[2])||(b.av+b.pr)-(a.av+a.pr)).map(l=>({id:l.id,l}));}
 const A=ANA[S.period];if(!A)return [];return A.top.map((t,i)=>({id:'t'+i,t,i})).filter(o=>!q||o.t.slice(0,3).join(' ').toLowerCase().includes(q)).slice(0,q?60:20);}
function tabs(){$('tabs').innerHTML=[['rep',$t('Laporan','Reports'),B.length],['bal',$t('Saldo label','Label balances'),L.length],['ana',$t('Analitik','Analytics'),'']].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}${n!==''?`<b>${n}</b>`:''}</button>`).join('');}
function band(){const R=B.filter(b=>!b.kind),c=k=>R.filter(b=>b.st===k).length,lag=lagging(),done=R.filter(b=>b.st==='done').sort((a,b)=>String(b.period).localeCompare(String(a.period)))[0];
 const av=L.reduce((n,l)=>n+l.av,0),pr=L.reduce((n,l)=>n+l.pr,0);
 const nr=k=>pl(c(k),'report'),h2=c('review')?$t(`${c('review')} laporan perlu diperiksa`,`${nr('review')} need${c('review')===1?'s':''} review`):c('ready')?$t(`${c('ready')} laporan siap diterbitkan`,`${nr('ready')} ready to publish`):c('funds')?$t(`${c('funds')} laporan menunggu dana`,`${nr('funds')} awaiting funds`):$t('Semua laporan sudah selesai','All reports are done');
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Siklus royalti · hari ini','Royalty cycle · today')} ${U.todayLabel()}</div><h2>${h2}</h2>
  <p>${lag.length?$t(`${lag.map(b=>month(b.period)).join(', ')} tertinggal · periode sesudahnya sudah terbit · `,`${lag.map(b=>month(b.period)).join(', ')} behind · later periods already published · `):''}${$t('terakhir selesai:','last completed:')} ${done?month(done.period):'—'}</p>
  <div class="acts"><button class="wbtn" data-urgent>${$t('Buka laporan berikutnya','Open next report')} ${ARROW}</button><button class="gbtn" data-tab="bal">${$t('Saldo label','Label balances')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${rps(av)}</b><span>${$t('saldo label tersedia','available label balance')}</span></div><div class="sbox"><b class="n">${rps(pr)}</b><span>${$t('sedang dicairkan','being paid out')}</span></div></div></div>
  <div class="flow f4">${STG.slice(0,4).map(([k,ti,,te])=>{const t=$t(ti,te),n=c(k),hot=k==='ready'&&lag.length;return `<button class="fn${hot?' hot':''}${n?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='rep'&&S.stage===k}"><span class="dot n">${n}</span><span class="t">${t}</span><span class="d">${{review:n?$t('baris belum cocok','unmatched rows'):$t('semua cocok','all matched'),ready:hot?lag.length+$t(' tertinggal',' behind'):n?$t('tinggal terbitkan','just publish'):$t('kosong','empty'),funds:n?$t('catat dana masuk','record incoming funds'):$t('kosong','empty'),done:$t('dana diterima','funds received')}[k]}</span></button>`;}).join('')}</div>`;}
const find=ph=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${ph}" value="${E(S.q)}"></label>`;
function list(){const r=items();let h='';
 if(S.tab==='rep'){h+=`<div class="ch"><h3>${$t('Laporan Believe','Believe reports')} <small class="n">${r.length}</small></h3>${canImport()?`<button class="btn sm" data-import>${$t('+ Impor laporan','+ Import report')}</button>`:''}</div>`;
  if(S.stage)h+=`<div class="flt"><span>${$t('Hanya','Only')} <b style="font-weight:500">${stg(S.stage)[1]}</b></span><button data-stage-clear>${$t('Tampilkan semua','Show all')}</button></div>`;
  let cur='';const lag=lagging();r.forEach((o,i)=>{const b=o.b,k=b.st;if(k!==cur){cur=k;h+=`<div class="gh"><i style="--c:var(--${{'c-or':'orange','c-bl':'blue','c-gr':'green','':'faint'}[stg(k)[2]]})"></i><b>${k==='mig'?$t('Saldo awal · bukan pendapatan','Opening balance · not revenue'):stg(k)[1]}</b> · ${r.filter(x=>x.b.st===k).length}</div>`;}
   h+=`<div class="it${S.sel.rep===b.id?' sel':''}" data-id="${E(b.id)}" style="--i:${i}"><span class="ty">${DOC}</span><div style="min-width:0"><div class="t1">${b.kind?$t('Saldo awal migrasi','Migration opening balance'):month(b.period)}${b.replace?' '+chip($t('File pengganti','Replacement file'),'c-bl'):''}${lag.includes(b)?' '+chip($t('Tertinggal','Behind'),'c-red'):''}</div><div class="t2">${E(b.file)} · ${nlab(b.labels.length)} · ${$t('kurs','rate')} ${rp(b.rate)}/EUR</div></div><div class="rgt"><span class="amt n">${rps(b.total)}</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada laporan','No reports')}</b>${S.stage?$t('Tahap ini kosong.','This stage is empty.'):$t('Impor laporan Believe untuk memulai.','Import a Believe report to start.')}</div>`;}
 else if(S.tab==='bal'){const tot=L.reduce((n,l)=>n+l.av+l.pr+l.pe,0);h+=`<div class="ch"><h3>${$t('Saldo label','Label balances')} <small class="n">${rps(tot)}</small></h3>${find($t('Cari label','Search labels'))}</div>`;let cur='';
  r.forEach((o,i)=>{const l=o.l,s=bst(l);if(s[2]!==cur){cur=s[2];h+=`<div class="gh"><i style="--c:var(--${{ready:'orange',proc:'blue',low:'faint'}[cur]})"></i><b>${{ready:$t('Siap dicairkan · belum diajukan','Ready for payout · not requested'),proc:$t('Sedang dicairkan','Payout in progress'),low:$t('Di bawah ambang Rp 1 jt',`Below the ${rps(THR)} threshold`)}[cur]}</b> · ${r.filter(x=>bst(x.l)[2]===cur).length}</div>`;}
   h+=`<div class="it${S.sel.bal===l.id?' sel':''}" data-id="${E(l.id)}" style="--i:${i}">${lav(l.n)}<div style="min-width:0"><div class="t1">${E(l.n)}${l.members.length>1?' '+chip(nlab(l.members.length),''):''}</div><div class="t2">${l.pr?`${rps(l.pr)} ${$t('sedang dicairkan','being paid out')} · `:''}${l.pe?`${rps(l.pe)} ${$t('menunggu dana','awaiting funds')} · `:''}${$t('dibayar total','total paid')} ${rps(l.paid)}</div></div><div class="rgt"><span class="amt n">${rps(l.av)}</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ditemukan','Not found')}</b>${$t('Coba nama label lain.','Try another label name.')}</div>`;}
 else{const A=ANA[S.period],ps=Object.keys(ANA).sort().reverse();
  h+=`<div class="ch"><h3>${$t('Lagu teratas','Top tracks')} <small class="n">${month(S.period)}</small></h3><button class="btn sm narrow" data-sum>${$t('Ringkasan periode','Period summary')}</button>${find($t('Cari lagu, artis, atau label','Search tracks, artists or labels'))}</div><div class="pills">${ps.map(p=>`<button data-period="${p}" aria-pressed="${S.period===p}">${month(p)}</button>`).join('')}</div>`;
  if(S.q&&r.length){const t=r.reduce((n,o)=>n+o.t[3],0);h+=`<div class="flt"><span>${$t(`${r.length} lagu cocok`,`${pl(r.length,'track')} match${r.length===1?'es':''}`)} “${E(S.q)}” · total <b style="font-weight:500">${rp(t)}</b></span><button data-clearq>${$t('Hapus','Clear')}</button></div>`;}
  r.forEach((o,k)=>{const [t,a,l,v,p]=o.t,other=/^Baris lainnya/.test(t),on=other?otherRows(t):null;h+=`<div class="it${S.sel.ana===o.id?' sel':''}" data-id="${o.id}" style="--i:${k}"><span class="rank n">${o.i+1}</span><div style="min-width:0"><div class="t1">${other?$t('Lagu lain','Other tracks')+' <span class="noart">· '+E($t(t.replace(/^Baris lainnya \((.*)\)$/,'gabungan $1'),on!=null?`${on} rows combined`:t))+'</span>':E(t)}</div><div class="t2">${other?$t('beberapa artis','various artists'):E(a||$t('Artis belum diisi','No artist yet'))} · ${E(l)} · ${$t(`${p} platform`,pl(p,'platform'))}</div></div><div class="rgt"><span class="amt n">${rps(v)}</span><span class="duet">${A&&A.total?pct(v/A.total*100):0}%</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${A?$t('Tidak ditemukan','Not found'):$t('Belum ada laporan terbit','No published reports yet')}</b>${A?$t('Pencarian mencakup 200 lagu teratas periode ini.','Search covers the top 200 tracks of this period.'):$t('Analitik muncul setelah laporan diterbitkan.','Analytics appear after a report is published.')}</div>`;}
 $('list').innerHTML=h;}
/* ---------- rincian laporan ---------- */
function checks(b){const lag=['funds','done'].includes(b.st)?[]:lagOf(b);const C=[[!b.unmatched,$t('Baris cocok dengan katalog','Rows match the catalogue'),b.unmatched?$t(`${num(b.unmatched)} dari ${num(b.rows)} baris belum cocok`,`${num(b.unmatched)} of ${num(b.rows)} rows unmatched`):$t(`${num(b.rows)} baris prototipe cocok · ${num(b.lines)} baris laporan`,`${num(b.rows)} prototype rows matched · ${num(b.lines)} report rows`)],[!!b.rate,$t('Kurs terisi','Exchange rate set'),`${rp(b.rate)} / EUR`],[true,$t('File tidak ganda','No duplicate file'),$t('sidik file unik','unique file fingerprint')],[b.labels.length>0,$t('Semua label terdaftar','All labels registered'),nlab(b.labels.length)]];
 if(!b.kind)C.push([!lag.length,$t('Periode sebelumnya sudah terbit','Earlier periods published'),lag.length?$t(`${lag.map(x=>month(x.period)).join(', ')} belum terbit`,`${lag.map(x=>month(x.period)).join(', ')} not published yet`):$t('urutan benar','in order')]);return C;}
const canImport=()=>{try{return isSA()||(typeof may114==='function'&&may114('royalty','import'));}catch(err){return false;}};
function nextRep(b){const n=b.unposted.length||b.labels.length;
 if(b.st==='review')return `<div class="nextc"><p>${$t(`${num(b.unmatched)} baris belum cocok dengan katalog. Cocokkan dulu sebelum diterbitkan.`,`${num(b.unmatched)} rows don't match the catalogue yet. Match them before publishing.`)}</p><div class="hrow">${btn($t('Cocokkan baris ','Match rows ')+ARROW,`data-legacy="${E(b.id)}"`,'pri')}</div><p class="where">${$t('Pencocokan baris memakai layar impor yang lama (per baris, dengan katalog label).','Row matching uses the old import screen (row by row, against the label catalogue).')}</p></div>`;
 if(b.st==='ready'){const lag=lagOf(b);return `<div class="nextc"><p>${b.replace?$t(`File pengganti untuk ${month(b.period)}. `,`Replacement file for ${month(b.period)}. `):''}${$t(`Semua pemeriksaan siap. Terbitkan agar <b>${n} label</b> melihat pendapatan ${month(b.period)}. Saldo baru bisa dicairkan setelah dana dicatat.`,`All checks passed. Publish so <b>${pl(n,'label')}</b> can see ${month(b.period)} revenue. Balances can be paid out only after the funds are recorded.`)}</p>${lag.length?`<p class="quote">${$t(`${lag.map(x=>month(x.period)).join(', ')} belum terbit. Sebaiknya terbitkan yang lebih lama dulu agar urutan saldo label benar.`,`${lag.map(x=>month(x.period)).join(', ')} not published yet. Publish the older one first so label balances stay in order.`)}</p>`:''}<div class="hrow">${isSA()?btn($t(`Terbitkan ke ${n} label`,`Publish to ${pl(n,'label')}`),'data-do="publish"','pri'):''}${lag.length?btn($t(`Buka ${month(lag[0].period)}`,`Open ${month(lag[0].period)}`),`data-open="${E(lag[0].id)}"`):''}${isSA()?btn($t('Arsipkan','Archive'),'data-form="archive"','ghost dng'):''}</div>${!isSA()?`<p class="where">${$t('Penerbitan hanya oleh Super Admin.','Only Super Admin can publish.')}</p>`:''}${S.form==='archive'?`<div class="reveal"><label class="fld">${$t('Alasan diarsipkan','Reason for archiving')}<textarea id="f-note" placeholder="${$t('Mis. file salah periode','E.g. file for the wrong period')}"></textarea></label><div class="hrow">${btn($t('Arsipkan laporan','Archive report'),'data-do="archive"','dng')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:''}</div>`;}
 if(b.st==='funds'){const ref='BELIEVE-'+String(b.period).replace('-','');return `<div class="nextc"><p>${$t('Sudah terbit. Saat dana dari Believe masuk ke rekening, catat di sini agar saldo label bisa dicairkan.','Published. When the Believe funds reach the bank account, record them here so label balances can be paid out.')}</p>${isSA()?`<div class="f3"><label class="fld">${$t('Referensi','Reference')}<input id="f-ref" value="${E(ref)}"></label><label class="fld">${$t('Tanggal diterima','Date received')}<input id="f-date" type="date" value="${U.today()}"></label><label class="fld">${$t('Jumlah (Rp)','Amount (Rp)')}<input id="f-amt" inputmode="numeric" value="${num(b.pending)}"></label></div><p class="where" id="f-diff">${$t(`Minimal sama dengan hak label yang menunggu dana (${rp(b.pending)}).`,`At least the label share awaiting funds (${rp(b.pending)}).`)}</p><div class="hrow">${btn($t('Catat dana diterima','Record funds received'),'data-do="receive"','pri')}</div>`:`<p class="where">${$t('Pencatatan dana hanya oleh Super Admin.','Only Super Admin can record funds.')}</p>`}</div>`;}
 if(b.st==='done')return `<div class="nextc ok"><p>${$t('Selesai.','Done.')}${b.receipt?$t(` Dana <b>${rp(b.receipt.amount)}</b> diterima ${fd(String(b.receipt.date))} · <span class="mono">${E(b.receipt.ref)}</span>.`,` Funds of <b>${rp(b.receipt.amount)}</b> received ${fd(String(b.receipt.date))} · <span class="mono">${E(b.receipt.ref)}</span>.`):''}${$t(' Saldo label sudah bisa dicairkan di Penarikan.',' Label balances can now be paid out in Withdrawals.')}</p>${isSA()?`<div class="hrow">${btn($t('Ajukan koreksi','Request correction'),`data-legacy="${E(b.id)}"`)}${btn($t('Ganti file','Replace file'),`data-legacy="${E(b.id)}"`,'ghost')}</div><p class="where">${$t('Koreksi dan penggantian file memakai layar impor yang lama; perubahan yang mengurangi saldo yang sudah dicairkan ditahan untuk ditinjau.','Corrections and file replacements use the old import screen; changes that reduce balances already paid out are held for review.')}</p>`:''}</div>`;
 return `<div class="nextc mute"><p>${$t(`Saldo awal dari sistem lama untuk ${b.labels.length} label. <b>Tidak dihitung sebagai pendapatan</b> periode mana pun, termasuk Analitik.`,`Opening balance from the old system for ${pl(b.labels.length,'label')}. <b>Not counted as revenue</b> for any period, including Analytics.`)}</p></div>`;}
function stepsRep(b){if(b.st==='mig')return '';const at={review:1,ready:2,funds:3,done:4}[b.st],wait=b.st==='review'||b.st==='funds',S4=en137()?['Imported','Matched','Published','Funds received']:['Diimpor','Dicocokkan','Diterbitkan','Dana diterima'];
 return `<div class="steps" style="--n:4"><i class="prog" style="--w:calc(100% * ${Math.min(at,3)} / 4)"></i>${S4.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
const bars=(rows,tot,click)=>rows.length?`<div class="bars">${rows.map(([id,n,v])=>`<${click&&id?`button data-golabel="${E(id)}"`:'div'} class="br"><span class="bn">${E(n)}</span><b class="n">${rps(v)}</b><i class="bt"><i style="width:${Math.max(1.5,v/rows[0][2]*100)}%"></i></i><small class="n">${tot?pct(v/tot*100):0}%</small></${click&&id?'button':'div'}>`).join('')}</div>`:`<p class="where">${$t('Belum ada data.','No data yet.')}</p>`;
const acctOf=member=>L.find(l=>l.members.includes(member))?.id||'';
function paneRep(b){const C=checks(b),ok=C.filter(c=>c[0]).length;let i=0;
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Laporan','Reports')}</button><div class="k"><span class="ty">${DOC}</span>${$t('Laporan Believe','Believe report')} · <span class="mono">${E(b.id)}</span></div><h2>${b.kind?$t('Saldo awal migrasi','Migration opening balance'):month(b.period)}</h2><div class="meta"><span>${E(b.file)}</span><span class="sep"></span>${chip(stg(b.st)[1],stg(b.st)[2])}</div></div>
 <div class="pb">${sec(i++,b.kind?$t('Keadaan','Status'):$t('Langkah berikutnya','Next step'),nextRep(b),rps(b.total))}
 ${stepsRep(b)?sec(i++,$t('Tahapan','Stages'),stepsRep(b)):''}
 ${sec(i++,$t('Pemeriksaan otomatis','Automatic checks'),`<div class="checks">${C.map(([g,t,m])=>`<div class="ck ${g?'':'warn'}"><b>${g?'✓':'!'}</b>${t}<small>${m}</small></div>`).join('')}</div>`,$t(`${ok} dari ${C.length} lolos`,`${ok} of ${C.length} passed`))}
 ${sec(i++,$t('Ringkasan','Summary'),`<div class="facts"><span>File</span><b>${E(b.file)}</b><span>${$t('Periode','Period')}</span><b>${b.kind?$t('Pembukaan saldo','Opening balance'):month(b.period)}</b><span>${$t('Kurs','Exchange rate')}</span><b>${rp(b.rate)} / EUR</b><span>${$t('Baris laporan','Report rows')}</span><b>${num(b.lines)}</b><span>${$t('Hak label','Label share')}</span><b>${rp(b.total)}</b><span>${$t('Diimpor','Imported')}</span><b>${fd(b.imported)}</b></div>`)}
 ${sec(i++,$t(`Hak label per label`,'Label share by label'),bars(b.labels.map(([id,n,v])=>[acctOf(id),n,v]),b.total,true),nlab(b.labels.length))}
 ${sec(i++,$t('Riwayat','History'),`<div class="hist">${b.hist.slice().reverse().map(([w,t,who])=>`<div><span class="mini">${who==='Super Admin'?'SA':who==='Staf'?'ST':'—'}</span><span>${E(t)}<small style="display:block">${E(roleT(who))} · ${fd(w)}</small></span></div>`).join('')||`<p class="where">${$t('Belum ada riwayat.','No history yet.')}</p>`}</div>`)}</div>`;}
/* ---------- rincian saldo ---------- */
function paneBal(l){const s=bst(l);let i=0;const many=l.members.length>1;
 let nx='';if(s[2]==='ready')nx=`<p>${$t(`Saldo <b>${rp(l.av)}</b> sudah bisa dicairkan tetapi belum diajukan.`,`A balance of <b>${rp(l.av)}</b> can be paid out but hasn't been requested.`)}</p><div class="hrow">${btn($t('Kirim pengingat','Send reminder'),'data-do="remind"','pri')}${isSA()?btn($t('Sesuaikan saldo','Adjust balance'),'data-form="adj"'):''}</div>`;
 else if(s[2]==='proc')nx=`<p>${$t(`Penarikan <b>${rp(l.pr)}</b> sedang diproses${l.av?`; sisa saldo ${rp(l.av)} masih tersedia`:''}.`,`A withdrawal of <b>${rp(l.pr)}</b> is being processed${l.av?`; the remaining ${rp(l.av)} is still available`:''}.`)}</p><div class="hrow">${btn($t('Buka di Penarikan ','Open in Withdrawals ')+ARROW,'data-go="withdraw"','pri')}${isSA()?btn($t('Sesuaikan saldo','Adjust balance'),'data-form="adj"'):''}</div>`;
 else nx=`<p>${l.av<THR?$t(`Perlu <b>${rp(THR-l.av)}</b> lagi untuk mencapai ambang pencairan Rp 1.000.000. Tidak perlu tindakan.`,`Needs <b>${rp(THR-l.av)}</b> more to reach the ${rp(THR)} payout threshold. No action needed.`):''}</p><div class="hrow">${isSA()?btn($t('Sesuaikan saldo','Adjust balance'),'data-form="adj"'):''}</div>`;
 if(S.form==='adj'&&isSA())nx+=`<div class="reveal adj"><div class="opts two"><button data-adj="+" aria-pressed="${S.adj==='+'}">${$t('Tambah saldo','Add to balance')}<small>${$t('mis. koreksi laporan','e.g. report correction')}</small></button><button data-adj="-" aria-pressed="${S.adj==='-'}">${$t('Kurangi saldo','Deduct from balance')}<small>${$t('mis. pengembalian dana','e.g. refund')}</small></button></div>${many?`<label class="fld">Label<select id="f-mem">${l.members.map(x=>`<option value="${E(x)}">${E(mname(x))}</option>`).join('')}</select></label>`:''}<label class="fld">${$t('Jumlah (Rp)','Amount (Rp)')}<input id="f-amt" inputmode="numeric" placeholder="0"></label><label class="fld">${$t('Alasan · wajib, tercatat di buku saldo','Reason · required, recorded in the balance ledger')}<textarea id="f-note" placeholder="${$t('Mis. selisih kurs laporan Agustus','E.g. exchange-rate difference in the August report')}"></textarea></label><div class="hrow">${btn($t('Simpan penyesuaian','Save adjustment'),'data-do="adjust"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`;
 const ins=l.cr.slice().map(x=>{const b=B.find(y=>y.id===x.ref);const stx=x.adj?$t('penyesuaian','adjustment'):!b?'':b.kind?$t('pembukaan saldo','opening balance'):b.st==='done'?$t('dana diterima','funds received'):$t('menunggu dana','awaiting funds');return `<div class="lg"><span>${x.adj?E($t('Penyesuaian · ','Adjustment · ')+x.adj):refName(x.ref)}<small>${stx}</small></span><b class="n ${x.amount<0?'neg':'pos'}">${x.amount<0?'':'+'}${rp(x.amount)}</b></div>`;}).join('');
 const WST={requested:['menunggu pemeriksaan','awaiting review'],ready:['siap dibayar','ready to pay'],processing:['sedang ditransfer','transferring'],delayed:['ditunda','delayed'],correction:['koreksi','correction']};
 const outs=l.wd.slice().reverse().map(([w,a,paid,st])=>`<div class="lg"><span>${$t('Penarikan','Withdrawal')} <span class="mono">${E(w)}</span><small>${paid?$t('dibayar','paid'):(WST[st]?$t(WST[st][0],WST[st][1]):st)}</small></span><b class="n">−${rp(a)}</b></div>`).join('');
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Saldo label','Label balances')}</button><div class="relhd">${lav(l.n,1)}<div style="min-width:0"><div class="k">${$t('Saldo label','Label balance')}${many?$t(` · ${l.members.length} label dalam satu akun pencairan`,` · ${l.members.length} labels in one payout account`):''}</div><h2>${E(l.n)}</h2><div class="meta">${chip(s[0],s[1])}${l.hold?'<span class="sep"></span>'+chip($t('Pencairan ditahan','Payout on hold'),'c-red'):''}<span class="sep"></span><button class="lnk" data-label="${E(l.members[0])}">${$t('Manajemen Label','Label Management')}</button></div></div></div></div>
 <div class="pb">${sec(i++,$t('Langkah berikutnya','Next step'),`<div class="nextc${s[2]==='low'?' mute':''}">${nx}</div>`,rps(l.av))}
 ${sec(i++,$t('Saldo','Balance'),`<div class="facts"><span>${$t('Tersedia','Available')}</span><b>${rp(l.av)}</b>${l.pe?`<span>${$t('Menunggu dana','Awaiting funds')}</span><b>${rp(l.pe)}</b>`:''}<span>${$t('Sedang dicairkan','Being paid out')}</span><b>${rp(l.pr)}</b><span>${$t('Sudah dibayar','Paid')}</span><b>${rp(l.paid)}</b><span>${$t('Ambang pencairan','Payout threshold')}</span><b>${$t('Rp 1.000.000',rp(THR))}</b>${many?`<span>Label</span><b>${l.members.map(x=>E(mname(x))).join(', ')}</b>`:''}</div>`)}
 ${sec(i++,$t('Masuk','In'),`<div class="ledger">${ins||`<p class="where">${$t('Belum ada.','None yet.')}</p>`}</div>`,$t(l.cr.length+' catatan',pl(l.cr.length,'entry','entries')))}
 ${l.wd.length?sec(i++,$t('Keluar','Out'),`<div class="ledger">${outs}</div>`,$t(l.wd.length+' penarikan',pl(l.wd.length,'withdrawal'))):''}</div>`;}
/* ---------- analitik ---------- */
function paneAna(){const A=ANA[S.period],ps=Object.keys(ANA).sort(),idx=ps.indexOf(S.period),prev=ps[idx-1];let i=0;
 if(!A)return `<div class="empty" style="padding:60px 20px"><b>${$t('Belum ada laporan terbit','No published reports yet')}</b>${$t('Analitik dihitung dari laporan yang sudah diterbitkan.','Analytics are calculated from published reports.')}</div>`;
 const o=S.sel.ana&&items().find(x=>x.id===S.sel.ana);
 if(o){const [t,a,l,v,p,mid]=o.t,other=/^Baris lainnya/.test(t),acc=acctOf(mid),on=other?otherRows(t):null;return `<div class="hd"><button class="back" data-anaback>${BACK}${$t(`Ringkasan ${month(S.period)}`,`${month(S.period)} summary`)}</button><div class="relhd"><span class="cv big" style="--h:${hue(t)}">${NOTE}</span><div style="min-width:0"><div class="k">${$t(`Lagu · peringkat ${o.i+1}`,`Track · rank ${o.i+1}`)}</div><h2>${other?$t('Lagu lain','Other tracks'):E(t)}</h2><div class="meta">${other?$t('gabungan banyak lagu kecil','many small tracks combined'):E(a||$t('Artis belum diisi','No artist yet'))}<span class="sep"></span>${E(l)}</div></div></div></div>
  <div class="pb">${sec(i++,$t('Pendapatan '+month(S.period),month(S.period)+' revenue'),`<div class="big n">${rp(v)}</div><p class="where">${$t(`${pct(v/A.total*100)}% dari pendapatan label periode ini · ${p} platform`,`${pct(v/A.total*100)}% of label revenue this period · ${pl(p,'platform')}`)}</p>`)}
  ${other?sec(i++,$t('Apa ini?','What is this?'),`<p class="para">${$t(`${E(t)} di laporan Believe digabung karena nilainya kecil per lagu. Tidak bisa dirinci lebih jauh.`,`${on!=null?`${on} other rows`:E(t)} in the Believe report are combined because each track earns very little. They can't be broken down further.`)}</p>`):''}
  ${sec(i++,'Label',`<div class="hrow">${acc?btn($t('Buka saldo '+E(l)+' ',`Open ${E(l)} balance `)+ARROW,`data-golabel="${E(acc)}"`):''}<button class="btn" data-artist="${E(other?l:(a||l))}">${$t('Cari semua lagu','Search all tracks by')} ${E(other?l:(a||l))}</button></div>`)}</div>`;}
 const consecutive=prev&&((+S.period.slice(0,4))*12+(+S.period.slice(5)))-((+prev.slice(0,4))*12+(+prev.slice(5)))===1;
 const ch=consecutive&&ANA[prev].total?(A.total-ANA[prev].total)/ANA[prev].total*100:null;
 const unpub=B.filter(b=>!b.kind&&['review','ready'].includes(b.st)).map(b=>month(b.period));
 const per=ps.map(p=>[p,month(p),ANA[p].total]);const mx=Math.max(...per.map(x=>x[2]),1);
 return `<div class="hd"><div class="k"><span class="ty">${CHART}</span>${$t('Analitik · seluruh platform','Analytics · all platforms')}</div><h2>${month(S.period)}</h2><div class="meta">${nlab(A.lab.length)}<span class="sep"></span>${$t(`${num(A.tracks)} lagu`,`${num(A.tracks)} track${A.tracks===1?'':'s'}`)}<span class="sep"></span>${$t(`${num(A.artists)} artis`,`${num(A.artists)} artist${A.artists===1?'':'s'}`)}</div></div>
 <div class="pb">${sec(i++,$t('Pendapatan label','Label revenue'),`<div class="big n">${rp(A.total)}</div><p class="where">${ch==null?(prev?$t('Periode tepat sebelumnya belum terbit · perbandingan ditunda.','The previous period is not published yet · comparison on hold.'):$t('Periode terlama yang sudah terbit.','Oldest published period.')):`<span class="${ch<0?'down':'up'}">${ch<0?'▼':'▲'} ${pct(Math.abs(ch))}%</span> ${$t('dibanding','vs')} ${month(prev)}`}</p>`)}
 ${sec(i++,$t('Per periode','By period'),`<div class="cols">${per.map(([p,n,v])=>`<button class="col${p===S.period?' on':''}" data-period="${p}"><i style="height:${Math.max(6,v/mx*100)}%"></i><small>${n.replace(/^(\w{3})\w*/,'$1')}</small><b class="n">${rps(v)}</b></button>`).join('')}</div><p class="where">${$t(`Hanya laporan yang sudah terbit${unpub.length?`; ${unpub.join(', ')} menunggu diterbitkan`:''}. Saldo awal migrasi tidak dihitung.`,`Published reports only${unpub.length?`; ${unpub.join(', ')} awaiting publication`:''}. The migration opening balance is not counted.`)}</p>`)}
 ${sec(i++,$t('Per platform','By platform'),bars(A.plat.slice(0,6).map(([n,v])=>['',platT(n),v]),A.total,false),$t(A.plat.length+' platform',pl(A.plat.length,'platform')))}
 ${sec(i++,$t('Per label','By label'),bars(A.lab.map(([id,n,v])=>[acctOf(id),n,v]),A.total,true),nlab(A.lab.length))}</div>`;}
function pane(){let h='';
 if(S.tab==='rep'){const b=B.find(x=>x.id===S.sel.rep&&items().some(o=>o.id===x.id));h=b?paneRep(b):'';}
 else if(S.tab==='bal'){const l=L.find(x=>x.id===S.sel.bal&&items().some(o=>o.id===x.id));h=l?paneBal(l):'';}
 else h=paneAna();
 $('pin').innerHTML=h||`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih item','Select an item')}</b>${$t('Rinciannya tampil di sini.','Details appear here.')}</div>`;}
function play(){const key=S.tab+S.sel[S.tab]+(S.tab==='ana'?S.period:'');const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea,#pin select').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(S.tab!=='ana'&&wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&(S.tab==='ana'||!!S.sel[S.tab]));stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(t){toast137(DEF,t);}
function open(tab,id){S.tab=tab;S.sel[tab]=id;S.form=null;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim(),amt=id=>+val(id).replace(/[^\d]/g,'');
/* ---------- tindakan: Royalty107.act lewat atomic10 (fungsi asli) ---------- */
function post(action,p){const fn=()=>Royalty107.act(model107(),actor107(),action,p);return typeof atomic10==='function'?atomic10(fn):fn();}
function act(a){let msg='';
 try{
  if(S.tab==='rep'){const b=B.find(x=>x.id===S.sel.rep);if(!b)return;
   if(a==='publish'){post('publish',{id:b.id,members:b.unposted.length?b.unposted:b.members});const n=b.unposted.length||b.labels.length;msg=$t(`Diterbitkan · ${n} label kini melihat pendapatan ${month(b.period)}`,`Published · ${pl(n,'label')} can now see ${month(b.period)} revenue`);}
   if(a==='archive'){const note=val('f-note');if(!note){toast($t('Tulis alasan','Write a reason'));return;}post('archive',{id:b.id,note});msg=$t('Laporan diarsipkan · tidak pernah terlihat label','Report archived · never shown to labels');S.sel.rep=null;}
   if(a==='receive'){const n=amt('f-amt'),ref=val('f-ref'),date=val('f-date');if(!n){toast($t('Isi jumlah dana yang diterima','Enter the amount received'));return;}if(!ref){toast($t('Isi referensi','Enter the reference'));return;}
    post('receive',{id:b.id,expectedVersion:model107().version,reference:ref,date:date||U.today(),amount:n,note:$t('Dicatat dari menu Royalti.','Recorded from the Royalties menu.'),members:b.members.filter(x=>(model107().ledger||[]).some(l=>l.ref===b.id&&l.member===x&&l.bucket==='pending')),checked:true});msg=$t('Dana dicatat · saldo label kini bisa dicairkan','Funds recorded · label balances can now be paid out');}
   if(S.stage&&a!=='archive')S.stage=null;}
  else if(S.tab==='bal'){const l=L.find(x=>x.id===S.sel.bal);if(!l)return;
   if(a==='remind'){for(const m of l.members.slice(0,1)){ten.notifications.unshift({id:++ten.serial,member:m,key:'payout137',ref:l.id,at:ten.now});}ten.events.unshift({id:++ten.serial,kind:'payout-reminder',target:l.id,note:rp(l.av),actor:ten.role,actorId102:state.user,at:ten.now});save10();msg=$t(`Pengingat pencairan dikirim ke ${l.n}`,`Payout reminder sent to ${l.n}`);}
   if(a==='adjust'){const n=amt('f-amt'),why=val('f-note');if(!n){toast($t('Isi jumlah penyesuaian','Enter the adjustment amount'));return;}if(!why){toast($t('Alasan wajib diisi','Reason is required'));return;}const v=S.adj==='-'?-n:n;const member=val('f-mem')||l.members[0];
    post('adjust',{member,amount:v,reason:why});S.form=null;msg=$t('Penyesuaian tersimpan di buku saldo','Adjustment saved to the balance ledger');}}
 }catch(err){toast(String(err?.message||err));return;}
 lastSig='';lastPane='';render();toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;paint();if(tb.closest('#band'))$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='rep';S.q='';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.stage=null;S.q='';const lag=lagging()[0],nx=lag||B.find(b=>b.st==='review')||B.find(b=>b.st==='ready')||B.find(b=>b.st==='funds');if(nx)open('rep',nx.id);else toast($t('Tidak ada laporan yang menunggu','No reports waiting'));return;}
  const op=t.closest('[data-open]');if(op){open('rep',op.dataset.open);return;}
  const gl=t.closest('[data-golabel]');if(gl&&gl.dataset.golabel){S.q='';open('bal',gl.dataset.golabel);return;}
  const pd=t.closest('[data-period]');if(pd){S.period=pd.dataset.period;S.sel.ana=null;paint();return;}
  if(t.closest('[data-sum]')){S.sel.ana=null;S.read=true;paint();$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(t.closest('[data-anaback]')){S.sel.ana=null;if(!wide())S.read=false;paint();return;}
  const ar=t.closest('[data-artist]');if(ar){S.q=ar.dataset.artist.toLowerCase();S.sel.ana=null;S.read=false;paint();$('list').scrollIntoView({behavior:'smooth',block:'start'});return;}
  if(t.closest('[data-clearq]')){S.q='';paint();return;}
  if(t.closest('[data-import]')){try{importDialog107();}catch(err){toast(String(err?.message||err));}return;}
  const lg=t.closest('[data-legacy]');if(lg){const id=lg.dataset.legacy;try{royaltyRoute107('imports');ui107.batch=id;ui107.detailTab='review';render();}catch(err){toast(String(err?.message||err));}return;}
  const lb=t.closest('[data-label]');if(lb){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=lb.dataset.label;l136.read=true;}}catch(err){}go137('labels');return;}
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast($t('Buka menu ','Open menu ')+go.dataset.go);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;repane();($('f-amt')||$('f-note'))?.focus();return;}
  const aj=t.closest('[data-adj]');if(aj){S.adj=aj.dataset.adj;root.querySelectorAll('[data-adj]').forEach(b=>b.setAttribute('aria-pressed',b===aj));return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(S.tab,it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();if(S.tab==='ana')S.sel.ana=null;paint();return;}
  if(e.target.id==='f-amt'&&S.tab==='rep'){const b=B.find(x=>x.id===S.sel.rep),d=amt('f-amt')-(b?.pending||0),el=$('f-diff');if(el){el.textContent=d<0?$t(`Kurang ${rp(-d)} dari hak label yang menunggu dana · dana harus mencukupi seluruh hak label.`,`${rp(-d)} short of the label share awaiting funds · the funds must cover the full label share.`):d>0?$t(`Lebih ${rp(d)} dari hak label · tetap bisa dicatat.`,`${rp(d)} more than the label share · can still be recorded.`):$t('Jumlah sama dengan hak label.','Amount equals the label share.');el.classList.toggle('warnx',d<0);}}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function intake(){try{if(window.royTab137){S.tab=window.royTab137;S.stage=null;S.q='';S.read=false;window.royTab137=null;lastSig='';}}catch(err){}try{if(typeof ui107==='object'&&ui107.batch&&B.some(b=>b.id===ui107.batch)){S.tab='rep';S.stage=null;S.sel.rep=ui107.batch;S.read=true;ui107.batch=null;lastSig='';}}catch(err){}}
const sig=()=>B.map(b=>[b.id,b.st,b.version,b.pending].join(':')).join('|')+'#'+L.map(l=>[l.id,l.av,l.pr,l.paid,l.cr.length].join(':')).join('|')+'#'+U.today()+'|r:'+ten.role+state.user+'|'+state.lang;
const allowed=()=>{try{return isSA()||(typeof may114==='function'&&may114('royalty'));}catch(err){return false;}};
const DEF={id:'royalty',css:STYLE,html:HTML,
 i18n:{'Royalti':'Royalties','Terima laporan Believe, terbitkan pendapatan ke label, catat dana masuk, dan jaga saldo setiap label.':'Receive Believe reports, publish revenue to labels, record incoming funds and keep every label balance in check.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='analytics'&&!state.preview&&allowed(),
 init(r){root=r;bind();},
 draw(){load();intake();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: laporan & saldo sama dengan pita biru Royalti */
DEF.sum=function(){load();const R=B.filter(b=>!b.kind),pick=k=>R.filter(b=>b.st===k).sort((a,b)=>String(a.period).localeCompare(String(b.period))).map(b=>({id:b.id,period:b.period,month:month(b.period),total:b.total}));
 const done=R.filter(b=>b.st==='done'||b.st==='funds').sort((a,b)=>String(b.period).localeCompare(String(a.period))).map(b=>({id:b.id,period:b.period,month:month(b.period),total:b.total,st:b.st,rc:b.receipt}));
 return {review:pick('review'),ready:pick('ready'),funds:pick('funds'),lag:lagging().map(b=>month(b.period)),done,rep:R.map(b=>({period:b.period,total:b.total,st:b.st})),
  av:L.reduce((n,l)=>n+l.av,0),pr:L.reduce((n,l)=>n+l.pr,0)};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
/* Satu sumber angka: saldo awal migrasi bukan pendapatan periode mana pun (analitik, laporan label, Pemantauan). */
if(typeof Royalty107==='object'){
 const rowsBefore=Royalty107.rows;Royalty107.rows=function(s){const mig=new Set((s?.batches||[]).filter(isMig).map(b=>b.id));return rowsBefore.apply(this,arguments).filter(r=>!mig.has(r.batch));};
 /* Sesuaikan saldo (Super Admin, alasan wajib): catatan buku saldo jenis "adjustment" di bucket available. */
 const actBefore=Royalty107.act;Royalty107.act=function(s,a,action,p={}){if(action!=='adjust')return actBefore.apply(this,arguments);
  if(a?.role!=='super')throw Error($t('Penyesuaian saldo hanya oleh Super Admin.','Only Super Admin can adjust balances.'));const amount=Math.round(Number(p.amount)||0),reason=String(p.reason||'').trim();
  if(!amount)throw Error($t('Isi jumlah penyesuaian.','Enter the adjustment amount.'));if(!reason)throw Error($t('Alasan wajib diisi.','Reason is required.'));if(!p.member)throw Error($t('Pilih label.','Select a label.'));
  const avail=(s.ledger||[]).filter(l=>l.member===p.member&&l.bucket==='available').reduce((n,l)=>n+l.amount,0);if(avail+amount<0)throw Error($t('Saldo tidak boleh menjadi minus.','Balance cannot go below zero.'));
  const at=new Date(ten.now||Date.now()).toISOString(),id='ADJ-'+(++s.serial);s.ledger.push({id,ref:id,member:p.member,amount,bucket:'available',kind:'adjustment',note:reason,at});
  (s.history||(s.history=[])).push({kind:'adjust',ref:id,actor:a.role,note:`${p.member} · ${amount<0?'−':'+'}Rp ${Math.abs(amount).toLocaleString('id-ID')} · ${reason}`,at});s.version++;return id;};
}
})();
