/* dev.24 — Dashboard Super Admin (rancangan v4, disetujui pemilik 19 Okt 2026).
   Urutan: Sorotan hari ini (header) → Siklus royalti → Perlu keputusan Anda + Kesehatan uang →
   Tim hari ini → Pertumbuhan. Hanya untuk Super Admin, mode Platform, halaman Dashboard; Admin dan
   Label tidak berubah. Angka diambil dari data prototipe (cycle131, withdrawalTotals7, data.tasks,
   data.ops, threads131, data.v9.labels, perf, todayRecords, platformData6). Yang belum ada datanya
   diberi tanda "contoh": posisi kas dan deret 4 bulan awal grafik pertumbuhan.
   Gerak: sekali per sesi saat kartu masuk layar (IntersectionObserver), hormati "kurangi gerakan". */
const d134={tab:'all',open:false,growth:'labels',seen:new Set(),io:null};
const KAS134=92000000; // contoh: posisi kas belum dicatat di Rekonsiliasi Kas
const TEAM134={staff:['cantika'],owners:['jeck','eka']};
const MON134=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const MONS134=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const ICO134={clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',card:'<rect x="4" y="6" width="16" height="13" rx="2"/><path d="M4 10h16M8 15h3"/>',shield:'<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',disc:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',chat:'<path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A8 8 0 0 1 4 12z"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',warn:'<path d="M12 4 3 20h18z"/><path d="M12 10v4M12 17v.5"/>',cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',arrow:'<path d="m9 6 6 6-6 6"/>',check:'<path d="m5 12 5 5 9-10"/>'};
const svg134=(k,w=1.8)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" aria-hidden="true">${ICO134[k]}</svg>`;
const nf134=(n,d=1)=>new Intl.NumberFormat(state.lang==='id'?'id-ID':'en-US',{maximumFractionDigits:d}).format(n);
const jt134=n=>`Rp ${nf134(Math.round(n/1e5)/10)} ${T('jt','M')}`;
const tl134=s=>String(s||'').split(' / ')[state.lang==='id'?0:1]||String(s||'');
const on134=()=>!isLabel10()&&me().super&&state.mode==='platform'&&state.page==='dashboard'&&!state.preview;
const ini134=id=>people.find(p=>p.id===id)?.initials||String(id||'').slice(0,2).toUpperCase();
const pname134=id=>people.find(p=>p.id===id)?.name||id;
const delta134=pct=>{const dir=pct>0.05?'up':pct<-0.05?'down':'flat';return `<span class="delta131" data-trend="${dir}"><svg viewBox="0 0 12 12" aria-hidden="true">${deltaArrow131[dir]}</svg>${dir==='up'?'+':dir==='down'?'−':''}${nf134(Math.abs(pct))}%</span>`;};
const pmonth134=()=>{const p=String(L(cycle131.period)).split(' ');return {m:Math.max(0,MON134.indexOf(p[0])),y:+p[1]||2026};};

/* ---------- model ---------- */
function cycle134(){
  const c=cycle131,d=withdrawalTotals7(),paidIds=new Set((data.ops||[]).filter(x=>x.status==='paid').map(x=>x.id));
  const open=Object.keys(withdrawalAmount7).filter(id=>!paidIds.has(id));
  const max=Math.max(c.eligible.amount,d.total),notReq=Math.max(0,max-d.total),notLabels=Math.max(0,c.eligible.labels-c.requestedLabels);
  const stage=c.today<=c.windowEnd?1:c.today<=c.payDue?2:3,win=c.payDue-c.windowEnd,elapsed=Math.min(win,Math.max(0,c.today-c.windowEnd));
  const {m,y}=pmonth134(),date=new Date(Date.UTC(y,m,c.today)),wd=date.toLocaleDateString(state.lang==='id'?'id-ID':'en-US',{weekday:'long',timeZone:'UTC'});
  return {c,d,open,max,notReq,notLabels,stage,daysPay:c.payDue-c.today,win,elapsed,month:MON134[m],wd,report:String(c.report).replace(/^Believe\s*/,'')};
}
function decisions134(){
  const today=day(),out=[],cy=cycle134();
  (data.tasks||[]).filter(t=>t.stage!=='done').forEach(t=>{
    const late=!!t.due&&t.due<today,fresh=t.stage==='queued'&&!t.handler;if(!late&&!fresh)return;
    out.push({k:late?['late']:['new'],ic:late?'clock':'disc',t:tl134(t.title),chip:late?[T('Lewat tenggat','Overdue'),'red']:[T('Baru','New'),'blue'],
      s:`${E(t.label||'')} · <span class="mono134">${E(t.id)}</span>${t.handler?'':' · '+T('belum ditangani','unassigned')}`,w:t.handler?[t.handler]:[],act:`data-action="task" data-id="${E(t.id)}"`,q:late?T('Tinjau','Review'):T('Ambil','Take'),o:late?0:6});
  });
  if(cy.open.length&&cy.stage<=2)out.push({k:['money','mine'],ic:'card',t:T('Bayar pengajuan penarikan','Pay withdrawal requests'),chip:[cy.daysPay>0?T(`${cy.daysPay} hari lagi`,`${cy.daysPay} days left`):T('Hari ini','Today'),'mustard'],
    s:`<span class="n">${jt134(cy.d.unpaid)}</span> · ${cy.open.length} ${T('pengajuan','requests')} · ${T('jatuh tempo','due')} ${cy.c.payDue} ${cy.month.slice(0,3)}`,w:[me().id],act:'data-action="v6-metric" data-id="withdraw"',q:T('Bayar','Pay'),o:1});
  (data.ops||[]).filter(x=>['pending','approved'].includes(x.status)&&x.kind!=='withdraw').forEach(x=>{
    const rf=String(x.id).startsWith('RF-'),req=rf&&typeof tr132==='function'?tr132().requests.find(r=>r.id===x.id):null;
    out.push({k:rf?['money','mine']:['appr','mine'],ic:rf?'card':'shield',t:L(x.title),chip:rf?[typeof stepName132==='function'?stepName132(req?.status||'submitted'):T('Diajukan','Submitted'),'mustard']:[T('Prioritas','Priority'),'mustard'],
      s:`<span class="mono134">${E(x.id)}</span> · ${E(String(L(x.detail)).split(/\.\s/)[0].slice(0,96))}`,w:[me().id],act:`data-action="op-detail" data-id="${E(x.id)}"`,q:rf?T('Tinjau','Review'):T('Setujui','Approve'),o:rf?2:3});
  });
  const wt=typeof threads131==='function'?threads131().filter(x=>x.type==='ticket'&&x.waiting):[];
  if(wt.length)out.push({k:['ticket'],ic:'chat',t:T(`Pesan menunggu jawaban · ${wt.length} percakapan`,`Messages awaiting reply · ${wt.length}`),chip:[T('Menunggu','Waiting'),'blue'],
    s:wt.slice(0,3).map(x=>E(x.title)).join(', ')+(wt.length>3?` +${wt.length-3}`:''),w:[],act:'data-action="inbox131-page" data-id="c:all"',q:T('Balas','Reply'),o:4});
  const labels=Array.isArray(data.v9?.labels)?data.v9.labels:Object.values(data.v9?.labels||{});
  labels.forEach(l=>{
    if(l.held>0)out.push({k:['risk','money','mine'],ic:'lock',t:T(`Dana ditahan · ${l.name}`,`Funds on hold · ${l.name}`),chip:[T('Perlu keputusan','Decision needed'),'mustard'],s:`<span class="n">${jt134(l.held)}</span>${l.suspended?' · '+T('dibatasi sejak ','restricted since ')+date(l.suspended):''}`,w:[me().id],act:'data-action="nav" data-page="labels9"',q:T('Tinjau','Review'),o:5});
    else if(l.restriction)out.push({k:['risk'],ic:'warn',t:T(`Akses dibatasi · ${l.name}`,`Access restricted · ${l.name}`),chip:[T('Perlu ditinjau','Needs review'),'mustard'],s:l.issue?T('ada laporan masalah','issue reported'):T('akses dibatasi','restricted'),w:[],act:'data-action="nav" data-page="labels9"',q:T('Tinjau','Review'),o:5});
    if(l.expiry&&l.plan!=='Flex'){const days=Math.ceil((Date.parse(l.expiry+'T00:00:00+07:00')-ten.now)/864e5);if(days<=30)out.push({k:['risk'],ic:'cal',t:T(`Paket berakhir · ${l.name}`,`Plan ending · ${l.name}`),chip:[days<0?T(`Berakhir ${-days} hari lalu`,`Ended ${-days} days ago`):T(`${days} hari lagi`,`${days} days left`),days<0?'red':'blue'],s:`${E(typeof Packages122!=='undefined'?Packages122.name(l.plan):l.plan)} · ${date(l.expiry)} · ${T('perpanjang atau turunkan paket','renew or downgrade')}`,w:[],act:'data-action="nav" data-page="labels9"',q:T('Tinjau','Review'),o:days<0?0.5:7});}
  });
  return out.sort((a,b)=>a.o-b.o);
}
function team134(){
  const recs=typeof todayRecords==='function'?todayRecords():[],today=day();
  const att=id=>{try{return timeSummary(id,today)?.record||null}catch{return null}};
  const staff=TEAM134.staff.map(id=>{const tasks=(data.tasks||[]).filter(t=>t.handler===id&&t.stage!=='done'),late=tasks.filter(t=>t.due&&t.due<today).length,p=perf(id),r=att(id);
    return {id,name:pname134(id),active:tasks.length,late,done:recs.filter(x=>x.staff===id).length,on:p.total?Math.round(p.on/p.total*100):0,onN:p.on,total:p.total,in:r?.in||'',online:!!(r?.in&&!r?.out)};});
  const owners=TEAM134.owners.map(id=>{const mine=recs.filter(x=>x.staff===id),last=mine[mine.length-1],r=att(id);return {id,name:pname134(id),in:r?.in||'',done:mine.length,last};});
  return {staff,owners};
}
function growth134(){
  const g=id=>platformData6.find(x=>x[0]===id);
  const seq=[.78,.86,.83,.92,.96];
  const mk=(id,lab,labEn,flow)=>{const x=g(id);if(!x)return null;const cur=x[3],prev=x[4],pct=prev?(cur-prev)/prev*100:0,diff=cur-prev;
    const series=flow?[...seq.slice(0,4).map(k=>Math.max(1,Math.round(diff*k))),Math.max(1,Math.round(diff*seq[4])),diff]:[...seq.slice(0,4).map(k=>prev*k),prev,cur];
    return {id,l:T(lab,labEn),cur,prev,pct,diff,money:!!x[5],flow,series,period:T(x[6],x[7])};};
  return [mk('labels','Label baru','New labels',true),mk('members','Label aktif','Active labels',true),mk('releases','Rilisan baru','New releases',true),mk('artists','Artis baru','New artists',true),mk('royalty','Pendapatan royalti','Royalty income',false),mk('revenue','Pendapatan layanan','Service revenue',false)].filter(Boolean);
}

/* ---------- tampilan ---------- */
function ring134(p,cls,size=52,stroke=5){return `<svg viewBox="0 0 ${size} ${size}" class="${cls}"><circle class="trk" cx="${size/2}" cy="${size/2}" r="${size/2-stroke}"/><circle class="arc" cx="${size/2}" cy="${size/2}" r="${size/2-stroke}" pathLength="100" style="--p:${p.toFixed(1)}"/></svg>`;}
function cycleCard134(){
  const y=cycle134(),{c,d}=y,pct=v=>y.max>0?v/y.max*100:0,step=(i,lab,val,sub)=>`<div class="st134 ${i<y.stage?'done':i===y.stage?'now':'later'}"><div class="b134">${i<y.stage?svg134('check',3):''}</div><div class="t134">${lab}</div><div class="v134 n">${val}</div><div class="d134s">${sub}</div></div>`;
  const ring=y.stage===2?`<div class="cd134" data-tip131="${E(T(`Masa pembayaran ${c.windowEnd+1}–${c.payDue} ${y.month} · hari ke-${y.elapsed} dari ${y.win}`,`Payment window ${c.windowEnd+1}–${c.payDue} · day ${y.elapsed} of ${y.win}`))}">${ring134(y.elapsed/y.win*100,'')}<b class="cu134" data-to="${y.daysPay}">${y.daysPay}</b><div><span>${T('hari lagi','days left')}</span><small>${T('batas bayar','pay by')} ${c.payDue} ${y.month.slice(0,3)}</small></div></div>`:statusBadge111(y.stage===1?T('Masa pengajuan','Request window'):T('Kewajiban royalti','Royalty payable'),y.stage===1?'blue':'mustard');
  return `<section class="d134-card" data-d134="cycle"><div class="ch134"><h2>${T('Siklus royalti','Royalty cycle')} · ${T('Laporan','Report')} ${E(y.report)}</h2>${ring}</div>
   <div class="steps134"><div class="prog134" style="--w:${Math.min(3,y.stage-1+(y.stage===2?y.elapsed/y.win:0))/3*75}%"></div>
    ${step(0,T('Laporan Believe','Believe report'),jt134(c.reportTotal),T('diunggah ','uploaded ')+E(c.uploaded))}
    ${step(1,T('Pengajuan','Requests'),jt134(d.total),`${c.requestedLabels} ${T('dari','of')} ${c.eligible.labels} label · ${nf134(d.total/c.eligible.amount*100)}%`)}
    ${step(2,T('Pembayaran','Payment'),`${jt134(d.paid)} ${T('dibayar','paid')}`,`${y.open.length} ${T('pengajuan tersisa','requests left')}${y.stage===2?' · '+T(`${y.daysPay} hari lagi`,`${y.daysPay} days left`):''}`)}
    ${step(3,T('Kewajiban royalti','Royalty payable'),jt134(y.notReq),`${y.notLabels} ${T('label tidak mengajukan','labels did not request')}`)}</div>
   <div class="bar134"><span class="paid" style="flex:${d.paid}" data-ftip131="${E(`${T('Dibayar','Paid')} · ${money(d.paid)} · ${nf134(pct(d.paid))}% ${T('dari','of')} ${jt134(y.max)}`)}"></span><span class="unpaid" style="flex:${d.unpaid}" data-ftip131="${E(`${T('Belum dibayar','Unpaid')} · ${money(d.unpaid)} · ${y.open.length} ${T('pengajuan','requests')} · ${T('jatuh tempo','due')} ${c.payDue} ${y.month.slice(0,3)}`)}"></span><span class="nreq" style="flex:${y.notReq}" data-ftip131="${E(`${T('Tidak diajukan','Not requested')} · ${money(y.notReq)} · ${y.notLabels} label · ${T('menjadi kewajiban royalti','becomes royalty payable')}`)}"></span></div>
   <div class="barlab134"><div><button type="button" class="lg134" data-action="v6-metric" data-id="withdraw" style="--c:var(--g134)"><i></i>${T('Dibayar','Paid')} <b>${jt134(d.paid)}</b></button><button type="button" class="lg134" data-action="v6-metric" data-id="withdraw" style="--c:var(--b134)"><i></i>${T('Belum dibayar','Unpaid')} <b>${jt134(d.unpaid)}</b></button><button type="button" class="lg134" data-action="payable131-open" style="--c:var(--muted)"><i></i>${T('Tidak diajukan','Not requested')} <b>${jt134(y.notReq)}</b></button></div><span>${jt134(c.below.amount)} ${T('di bawah','below')} ${jt134(c.threshold)} ${T('bergulir','rolls over')} · ${nf134(c.below.labels,0)} label</span></div></section>`;
}
function decisionsCard134(){
  const all=decisions134(),tabs=[['all',T('Semua','All')],['late',T('Terlewat','Overdue')],['mine',T('Saya','Mine')],['appr',T('Persetujuan','Approvals')],['money',T('Uang','Money')],['risk',T('Risiko label','Label risk')],['ticket',T('Pesan','Messages')]];
  const has=(x,f)=>f==='all'||x.k.includes(f),rows=all.filter(x=>has(x,d134.tab)),LIM=7,extra=rows.length-LIM;
  return `<section class="d134-card" data-d134="decide"><div class="ch134"><h2>${T('Perlu keputusan Anda','Needs your decision')} <span class="sub134 n">${all.length}</span></h2><button type="button" class="link134" data-action="nav" data-page="mywork9">${T('Semua pekerjaan','All work')} ${svg134('arrow',2)}</button></div>
   <div class="tabs134">${tabs.map(([f,l])=>{const n=all.filter(x=>has(x,f)).length;return n||f==='all'?`<button type="button" class="${d134.tab===f?'on':''}" data-d134-tab="${f}">${l}<b>${n}</b></button>`:'';}).join('')}</div>
   <div class="list134">${rows.map((x,i)=>`<div class="it134${!d134.open&&i>=LIM?' more134':''}" style="--i:${i}"><span class="ty134">${svg134(x.ic)}</span><div class="mid134"><div class="tt134">${E(x.t)} ${statusBadge111(x.chip[0],x.chip[1])}</div><div class="sub134">${x.s}</div></div><div class="stack134" data-tip131="${E(x.w.length?T('Penanggung jawab: ','Owner: ')+x.w.map(pname134).join(' & '):T('Belum ada penanggung jawab','No owner yet'))}">${x.w.length?x.w.map(w=>`<span class="mini134">${E(ini134(w))}</span>`).join(''):'<span class="mini134 none"></span>'}</div><span class="qa134"><button type="button" class="qbtn134" ${x.act}>${E(x.q)}</button><button type="button" class="go134" ${x.act} aria-label="${T('Buka','Open')}">${svg134('arrow',2)}</button></span></div>`).join('')||`<p class="empty134">${T('Tidak ada yang menunggu keputusan.','Nothing awaits your decision.')}</p>`}</div>
   <div class="foot134">${extra>0?`<button type="button" class="more-btn134" data-d134-more>${d134.open?T('Tampilkan lebih sedikit','Show less'):T(`Tampilkan ${extra} lainnya`,`Show ${extra} more`)}</button>`:'<span></span>'}<span>${T('Urut menurut tenggat','Sorted by deadline')} · ${typeof todayRecords==='function'?todayRecords().length:0} ${T('tahapan selesai hari ini','stages done today')}</span></div></section>`;
}
function moneyCard134(){
  const y=cycle134(),wajib=y.d.unpaid,cov=wajib>0?KAS134/wajib:9,zone=cov<1?['Kurang','red']:cov<1.5?['Tipis','mustard']:['Aman','green'];
  const rv=data.revenue||{},keys=Object.keys(rv).sort(),cur=rv[keys[keys.length-1]]||0,prev=rv[keys[keys.length-2]]||0,mk=keys[keys.length-1]||'',mn=MON134[(+mk.slice(5,7)||1)-1]||'';
  return `<section class="d134-card" data-d134="money"><div class="ch134"><h2>${T('Kesehatan uang','Money health')}</h2><span class="sub134">${E(y.month)} · ${T('mulai ulang tiap bulan','resets monthly')}</span></div>
   <div class="sub134">${T('Cakupan kas untuk pembayaran bulan ini','Cash cover for this month’s payouts')} <span class="ex134">${T('contoh kas','sample cash')}</span></div>
   <div class="gauge134"><svg viewBox="0 0 220 124" data-gauge134="${Math.min(4,cov).toFixed(2)}"></svg><div class="gv134"><span class="big134 n"><span class="cu134" data-to="${Math.min(cov,99).toFixed(1)}" data-dec="1">${nf134(cov)}</span><small>×</small></span>${statusBadge111(T(zone[0],zone[0]==='Aman'?'Safe':zone[0]==='Tipis'?'Thin':'Short'),zone[1])}</div></div>
   <div class="covl134"><span>${T('Wajib dibayar','Due')} ${jt134(wajib)}</span><span>${T('Kas','Cash')} ${jt134(KAS134)}</span></div>
   <div class="mrow134"><span>${T('Kas siap bayar','Cash ready')}</span><div><b class="n">${jt134(KAS134)}</b><em>${T('contoh · catat di Rekonsiliasi Kas','sample · record in Cash Reconciliation')}</em></div></div>
   <div class="mrow134"><span>${T(`Wajib dibayar s.d. ${y.c.payDue} ${y.month.slice(0,3)}`,`Due by ${y.c.payDue}`)}</span><div><b class="n">${jt134(wajib)}</b><em>${y.open.length} ${T('pengajuan','requests')}</em></div></div>
   <div class="mrow134"><span>${T('Tidak diajukan','Not requested')}</span><div><b class="n">${jt134(y.notReq)}</b><em>${T('ikut saldo bulan depan, tidak dijumlah','carried into next month, not added')}</em></div></div>
   <div class="mrow134"><span>${T('Pendapatan layanan','Service revenue')} ${E(mn.slice(0,3))}</span><div><span class="rowv134">${prev?delta134((cur-prev)/prev*100):''}<b class="n">${jt134(cur)}</b></span><em>${T('dibanding bulan sebelumnya','vs previous month')}</em></div></div>
   <div class="foot134"><button type="button" class="link134" data-d134-go="monitor">${T('Pemantauan Keuangan','Financial Monitoring')} ${svg134('arrow',2)}</button></div></section>`;
}
function teamCard134(){
  const t=team134();
  const staff=t.staff.map(s=>{const seg=Array.from({length:6},(_,i)=>i<s.late?'o':i<s.active?'f':'').map(c=>`<i class="${c}"></i>`).join('');
    return `<div class="tm134 sm"><div class="top134"><span class="av134 ${s.online?'on':''}">${E(ini134(s.id))}</span><div><div class="nm134">${E(s.name)}</div><div class="rl134">${T('Staf','Staff')}${s.online?` · <span class="live134">${T('online','online')}</span>`:''}</div></div>${statusBadge111(s.in?T('Hadir ','In ')+s.in:T('Belum tercatat','Not recorded'),s.in?'green':'neutral')}</div>
     <div class="sm134"><div class="kv134"><div>${T('Aktif','Active')}<b>${s.active}${s.late?` · <span class="late134">${s.late} ${T('terlewat','overdue')}</span>`:''}</b></div><div>${T('Selesai hari ini','Done today')}<b class="cu134" data-to="${s.done}">${s.done}</b></div></div>
     <div class="ring134" data-tip131="${E(T(`Tepat waktu ${s.onN} dari ${s.total} pekerjaan`,`On time ${s.onN} of ${s.total}`))}">${ring134(s.on,'',56,4.5)}<b class="cu134" data-to="${s.on}" data-suf="%">${s.on}%</b><small>${T('tepat waktu','on time')}</small></div></div>
     <div class="load134">${seg}</div></div>`;}).join('');
  const own=t.owners.map(o=>`<div class="tm134 own"><div class="top134"><span class="av134">${E(ini134(o.id))}</span><div><div class="nm134">${E(o.name)}</div><div class="rl134">${T('Pengelola','Owner')}</div></div><span class="tag134">${T('tercatat · tidak dinilai','recorded · not scored')}</span></div>
     <div class="kv134 two"><div>${T('Masuk','Signed in')}<b>${E(o.in||'—')}</b></div><div>${T('Selesai hari ini','Done today')}<b>${o.done}</b></div></div>
     <div class="last134"><span>${o.last?T('Terakhir ','Last ')+E(o.last.time):T('Belum ada aktivitas','No activity yet')}</span><span>${o.last?E(tl134(o.last.title)):''}</span></div></div>`).join('');
  return `<section class="d134-card" data-d134="team"><div class="ch134"><h2>${T('Tim hari ini','Team today')}</h2><button type="button" class="link134" data-action="mode" data-mode="staff" data-id="staff">${T('Mode Staff','Staff mode')} ${svg134('arrow',2)}</button></div><div class="team134">${staff}${own}</div></section>`;
}
function growthCard134(){
  const g=growth134();if(!g.find(x=>x.id===d134.growth))d134.growth=g[0]?.id;const m=g.find(x=>x.id===d134.growth)||g[0];if(!m)return '';
  const fmt=(x,v)=>x.money?jt134(v):(x.flow?'+':'')+nf134(v,0),tot=x=>x.money?x.period:x.id==='members'?T(`${nf134(x.cur,0)} dari ${nf134(platformData6.find(r=>r[0]==='labels')[3],0)} label`,`${nf134(x.cur,0)} of all labels`):T('Total ','Total ')+nf134(x.cur,0);
  return `<section class="d134-card" data-d134="growth"><div class="ch134"><h2>${T('Pertumbuhan','Growth')}</h2><span class="sub134">${E(m.period)}</span></div>
   <div class="mts134">${g.map(x=>`<button type="button" class="mt134 ${x.id===m.id?'on':''}" data-d134-growth="${x.id}"><span class="l">${E(x.l)}</span><span class="vr">${fmt(x,x.flow?x.diff:x.cur)} ${delta134(x.pct)}</span><span class="t">${E(tot(x))}</span></button>`).join('')}</div>
   <div class="gh134"><div class="k">${E(m.l)}</div><div class="h n">${fmt(m,m.flow?m.diff:m.cur)} ${delta134(m.pct)}</div><div class="s">${T('Batang terakhir = data prototipe; 4 bulan awal = contoh.','Last bars = prototype data; first 4 months = sample.')}</div></div>
   <div class="chart134" data-chart134="${m.id}"></div></section>`;
}
function page134(){
  return `<div class="d134">${cycleCard134()}<div class="row134">${decisionsCard134()}${moneyCard134()}</div>${teamCard134()}${growthCard134()}</div>`;
}
function hero134(){
  const y=cycle134(),it=decisions134(),pay=it.find(x=>x.k.includes('money')&&x.ic==='card'&&/penarikan|withdrawal/i.test(x.t)),late=it.filter(x=>x.k.includes('late')).length;
  const top=pay?{h:T(`${y.open.length} pengajuan belum dibayar · ${jt134(y.d.unpaid)}`,`${y.open.length} unpaid requests · ${jt134(y.d.unpaid)}`),s:T(`Jatuh tempo ${y.c.payDue} ${y.month}, ${y.daysPay} hari lagi.`,`Due ${y.month} ${y.c.payDue}, in ${y.daysPay} days.`),b:T('Proses pembayaran','Process payments'),act:'data-action="v6-metric" data-id="withdraw"'}
    :it[0]?{h:it[0].t,s:it[0].chip[0],b:it[0].q,act:it[0].act}:{h:T('Tidak ada yang mendesak hari ini.','Nothing urgent today.'),s:T('Semua keputusan sudah diambil.','All decisions are made.'),b:'',act:''};
  const next=pay&&late?T(`Berikutnya: ${late} pekerjaan lewat tenggat`,`Next: ${late} overdue items`):'';
  const stageName=[T('pengajuan','requests'),T('pengajuan','requests'),T('pembayaran','payment'),T('kewajiban royalti','royalty payable')][y.stage];
  return `<section class="dashboard-hero122 hero124 hero134" aria-label="${T('Ringkasan dashboard','Dashboard overview')}"><div class="hero-copy122"><h1>${greeting124()},<br><span>${E(me().name)}.</span></h1><p class="hero-context122">${E(y.wd)}, ${y.c.today} ${E(y.month)} · ${T('siklus royalti','royalty cycle')} ${E(y.report)}, <b>${T('tahap','stage')} ${stageName}</b></p></div>
   <div class="hero-insight-wrap122"><div class="hero-insight122 spot134"><span class="insight-title122">${svg134('spark')}${T('Sorotan hari ini','Today’s highlight')}</span><strong class="spot-h134">${E(top.h)}</strong><small class="spot-s134">${E(top.s)}</small><span class="spot-row134">${top.b?`<button type="button" class="spot-btn134" ${top.act}>${E(top.b)} ${svg134('arrow',2)}</button>`:''}<small>${E(next)}</small></span></div></div></section>`;
}
const hero122Before134=hero122;
hero122=function(){return on134()?hero134():hero122Before134();};

/* ---------- gambar setelah masuk DOM: jarum, grafik, gerak ---------- */
function gauge134(svg){const v=+svg.dataset.gauge134,cx=110,cy=110,r=86,mx=4,ang=x=>Math.PI-(x/mx)*Math.PI,pt=x=>[cx+r*Math.cos(ang(x)),cy-r*Math.sin(ang(x))];
  const arc=(a,b,c)=>{const [x1,y1]=pt(a),[x2,y2]=pt(b);return `<path class="gz134" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" style="stroke:${c}"/>`;};
  const tick=(x,l)=>{const a=ang(x),tx=cx+(r+16)*Math.cos(a),ty=cy-(r+16)*Math.sin(a);return `<text class="gt134" x="${tx.toFixed(1)}" y="${(ty+3).toFixed(1)}" text-anchor="middle">${l}</text>`;};
  svg.innerHTML=arc(0,1,'var(--r134)')+arc(1.02,1.5,'var(--o134)')+arc(1.52,4,'var(--g134)')+tick(0,'0×')+tick(1,'1×')+tick(1.5,'1,5×')+tick(4,'4×')+`<g class="needle134" style="--deg:${(v/mx*180).toFixed(1)}deg"><line x1="${cx}" y1="${cy}" x2="${cx-r+18}" y2="${cy}"/><circle cx="${cx}" cy="${cy}" r="5"/></g>`;}
function chart134(box){const m=growth134().find(x=>x.id===box.dataset.chart134);if(!m)return;const d=m.series,{m:mo}=pmonth134(),mons=d.map((_,i)=>MONS134[(mo-1-(d.length-1-i)+24)%12]);
  const W=box.clientWidth||800,H=170,bw=Math.min(84,W/9),gap=(W-bw*d.length)/(d.length-1),mx=Math.max(...d)*1.15,fmt=v=>m.money?jt134(v):'+'+nf134(v,0);
  box.innerHTML=`<svg viewBox="0 0 ${W} ${H+24}">${[0,.5,1].map(g=>`<line class="grid134" x1="0" x2="${W}" y1="${(H-g*H*.87).toFixed(1)}" y2="${(H-g*H*.87).toFixed(1)}"/>`).join('')}${d.map((v,i)=>{const h=v/mx*H,x=i*(bw+gap),cur=i===d.length-1,sample=i<d.length-2;return `<rect class="bar134g${cur?' cur':''}${sample?' smp':''}" x="${x.toFixed(1)}" y="${(H-h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="8" style="--i:${i}" data-ftip131="${E(`${mons[i]} · ${fmt(v)}${sample?' · '+T('contoh','sample'):''}`)}"/><text class="val134${cur?' cur':''}" x="${(x+bw/2).toFixed(1)}" y="${(H-h-7).toFixed(1)}" text-anchor="middle">${fmt(v)}</text><text class="ax134" x="${(x+bw/2).toFixed(1)}" y="${H+18}" text-anchor="middle">${mons[i]}</text>`;}).join('')}</svg>`;}
const RM134=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
function count134(el){if(el.dataset.done134)return;el.dataset.done134=1;const to=+el.dataset.to,dec=+(el.dataset.dec||0),suf=el.dataset.suf||'',t0=performance.now(),dur=900;const f=v=>(dec?nf134(v,dec):nf134(Math.round(v),0))+suf;const st=n=>{const k=Math.min(1,(n-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=f(to*e);if(k<1)requestAnimationFrame(st);};requestAnimationFrame(st);}
function reveal134(c){c.classList.add('in');d134.seen.add(c.dataset.d134);if(!RM134())c.querySelectorAll('.cu134').forEach(count134);}
function mount134(main){
  main.querySelectorAll('[data-gauge134]').forEach(gauge134);main.querySelectorAll('[data-chart134]').forEach(chart134);
  const cards=[...main.querySelectorAll('.d134-card')];d134.io?.disconnect();
  if(RM134()){cards.forEach(c=>c.classList.add('in','still134'));return;}
  cards.forEach(c=>{if(d134.seen.has(c.dataset.d134))c.classList.add('in','still134');else c.classList.add('rv134');});
  d134.io=new IntersectionObserver(es=>{let k=0;es.forEach(e=>{if(e.isIntersecting){const c=e.target;d134.io.unobserve(c);setTimeout(()=>reveal134(c),90*k++);}});},{threshold:.2});
  cards.filter(c=>!c.classList.contains('in')).forEach(c=>d134.io.observe(c));
}

/* ---------- pasang: ganti isi dashboard Super Admin ---------- */
const renderBefore134=render;
render=function(){
  const out=renderBefore134.apply(this,arguments);
  try{if(on134()){const main=document.querySelector('#main');if(main){main.classList.add('dashboard-main124','dash134-main');main.innerHTML=page134();mount134(main);}}else document.querySelector('#main')?.classList.remove('dash134-main');}catch(err){console.warn('dash134',err);}
  return out;
};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-d134-tab],[data-d134-more],[data-d134-growth],[data-d134-go]');if(!b)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(b.dataset.d134Tab){d134.tab=b.dataset.d134Tab;d134.open=false;}
  else if(b.hasAttribute('data-d134-more'))d134.open=!d134.open;
  else if(b.dataset.d134Growth)d134.growth=b.dataset.d134Growth;
  else if(b.dataset.d134Go==='monitor'){go('liability9','platform');return;}
  render();
},true);
