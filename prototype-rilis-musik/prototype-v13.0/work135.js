/* v1.1.0-dev.27 — Pekerjaan (Super Admin): satu daftar semua pekerjaan dari semua menu.
   Halaman lama (myWork9 + integrasi WAMI, layanan, tiket, transaksi, penarikan) tetap
   menjadi sumber data: barisnya dibaca lalu ditampilkan ulang, dan tombol "Buka" memakai
   atribut aksi aslinya sehingga modal/halaman tujuan tidak berubah. */
const w135={g:'',q:'',p:'',sel:null,read:false,done:false,seen:new Set(),io:null,last:''};
const on135=()=>!isLabel10()&&me().super&&state.mode==='platform'&&state.page==='mywork9'&&!state.preview;
const RM135=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const wide135=()=>innerWidth>1240;
const ICO135={rel:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',claim:'<path d="M4 7h16M4 12h10M4 17h7"/><path d="m16 15 2 2 4-4"/>',appr:'<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',money:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',msg:'<path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A8 8 0 0 1 4 12z"/>',wami:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',addon:'<path d="M12 4v16M4 12h16"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>',check:'<path d="m5 12 5 5 9-10"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'};
const svg135=(k,w=1.8)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO135[k]}</svg>`;
const TYPE135={rel:['Rilisan','Release'],claim:['Klaim','Claim'],appr:['Persetujuan','Approval'],money:['Uang','Money'],msg:['Pesan','Message'],wami:['WAMI','WAMI'],addon:['Layanan tambahan','Add-on']};
const GR135=[['late',['Terlambat','Overdue'],['perlu ditangani dulu','handle first'],'var(--r134)'],['today',['Hari ini','Today'],['jatuh tempo hari ini','due today'],'var(--o134)'],
  ['week',['7 hari ke depan','Next 7 days'],['belum mendesak','not urgent yet'],'var(--b134)'],['later',['Nanti','Later'],['tanpa tenggat dekat','no near deadline'],'var(--muted)'],['wait',['Menunggu pihak lain','Waiting on others'],['bola di pihak lain','ball is elsewhere'],'var(--muted)']];
const TEAM135=()=>[...TEAM134.owners,...TEAM134.staff];
const role135=id=>TEAM134.owners.includes(id)?'Super Admin':T('Staf','Staff');
const days135=(a,b)=>Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/864e5);
const fdate135=d=>{if(!d)return '';const [y,m,dd]=String(d).slice(0,10).split('-');return `${+dd} ${MONS134[(+m||1)-1]}${y&&y!==String(day()).slice(0,4)?' '+y:''}`;};
const say135=s=>{if(typeof toast==='function')toast(s);};
/* dev.53: batas bayar penarikan dari ringkasan Penarikan (siklus YYYY-MM → bayar paling lambat tanggal 20) */
const wdOpen135=id=>{try{return M137.defs.find(d=>d.id==='withdraw')?.sum?.()?.open?.find(x=>x.id===id)||null;}catch(e){return null;}};
const hue135=id=>[...String(id)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,7);

/* ---------- data: baca baris halaman lama ---------- */
// Pil di halaman lama baru menjadi pil kaca setelah tampil; nadanya dibaca dari kelasnya.
function tone135(c){if(c.dataset.tone)return c.dataset.tone;const k=c.className;
  if(/red/.test(k))return 'red';if(/amber|mustard|orange|warn/.test(k))return 'mustard';if(/green|ok/.test(k))return 'green';if(/blue/.test(k))return 'blue';
  return typeof badgeTone111==='function'?badgeTone111(c.textContent.trim(),{matches:()=>false}):'neutral';}
function rows135(){
  const keep=v9.work;v9.work='all';let html='';
  try{html=myWork9();}catch(err){console.warn('work135 source',err);}finally{v9.work=keep;}
  const box=document.createElement('div');box.innerHTML=html;const out=[],seen=new Set();
  box.querySelectorAll('button[data-id]').forEach(b=>{
    const id=b.dataset.id,row=b.closest('article,.action-row,li')||b.parentElement,strong=row?.querySelector('strong');
    if(!id||seen.has(id)||!strong)return;seen.add(id);
    const chips=[...row.querySelectorAll('.status111,.badge,.pill107')].map(c=>[c.textContent.trim(),tone135(c)]).filter(c=>c[0]);
    const tn=strong.cloneNode(true);tn.querySelectorAll('div,span').forEach(x=>x.remove());
    const steps=[...row.querySelectorAll('.step9')].map(s=>({t:(s.querySelector('.step-label-full128')||s.querySelector('small'))?.textContent.trim()||'',done:s.classList.contains('done'),now:s.classList.contains('current')}));
    const act=[...b.attributes].filter(a=>a.name.startsWith('data-')&&!/arrow/.test(a.name)).map(a=>`${a.name}="${E(a.value)}"`).join(' ');
    out.push(item135({id,title:tn.textContent.trim(),chips,sub:row.querySelector('small')?.textContent.trim()||'',steps,sec:row.closest('section')?.querySelector('h2')?.textContent.trim()||'',act}));
  });
  return out;
}
function item135(r){
  const today=day(),task=operationalTasks().find(x=>x.id===r.id),op=(data.ops||[]).find(x=>x.id===r.id),chipTxt=r.chips.map(c=>c[0]).join(' ');
  const [head,tail]=String(r.title).split(' · ');
  let ty='appr',go=T('Persetujuan','Approvals'),label=tail||'',title=tail?head:r.title,handler=null,due=null,stages=r.steps;
  if(task){ty=task.kind==='release'?'rel':task.kind==='claim'?'claim':'msg';go=ty==='rel'?T('Rilisan','Releases'):ty==='claim'?T('Manajemen Label','Label Management'):T('Pesan','Messages');
    title=tl134(task.title);label=task.label||'';handler=task.handler||null;due=task.due||null;}
  else if(op){const rf=String(op.id).startsWith('RF-');ty=rf?'money':'appr';go=rf?T('Pesan','Messages'):T('Persetujuan','Approvals');handler=me().id;
    due=op.created?new Date(Date.parse(op.created+'T00:00:00Z')+864e5).toISOString().slice(0,10):null;}
  else if(/Penarikan/i.test(r.sec)){ty='money';go=T('Penarikan','Withdrawals');handler=me().id;title=T('Transfer penarikan','Withdrawal payout');const o=wdOpen135(r.id);if(o?.cycle)due=o.cycle+'-20';}
  else if(/WAMI/i.test(r.sec)){ty='wami';go='Registrasi WAMI';}
  else if(/Layanan/i.test(r.sec)){ty='addon';go=T('Layanan Tambahan','Add-on Services');}
  else if(/Tiket/i.test(r.sec)){ty='msg';go=T('Pesan','Messages');}
  else if(/Transaksi/i.test(r.sec)){ty='money';go=T('Transaksi','Transactions');}
  const lateChip=/lewat tenggat|terlewat|overdue/i.test(chipTxt),waitChip=/menunggu (label|perbaikan|distributor|believe)|waiting/i.test(chipTxt);
  let g;
  if(task?.overdue||lateChip||(due&&due<today&&!task?.legacy&&task?.stage&&task.stage!=='believe'))g='late';
  else if((task&&task.stage==='believe')||waitChip)g='wait';
  // Keputusan (aturan "nextday") menjadi prioritas sejak tanggal berganti: masuk Hari ini.
  else if(due&&(due===today||(op&&due<today)))g='today';
  else if(due&&due>today&&days135(today,due)<=7)g='week';
  else g='later';
  if(!stages.length){const base=ty==='money'?[T('Diajukan','Submitted'),T('Diverifikasi','Verified'),T('Dibayar','Paid')]:[T('Diajukan','Submitted'),T('Diperiksa','Reviewed'),T('Diputuskan','Decided')];
    const at=/pembayaran|payment/i.test(chipTxt)?2:1;stages=base.map((t,i)=>({t,done:i<at,now:i===at}));}
  let verb=T('Buka','Open');
  if(task&&!task.handler)verb=T('Ambil','Take');
  else if(ty==='rel')verb=task?.stage==='believe'?T('Pantau','Track'):task?.stage==='correction'?T('Tinjau','Review'):T('Periksa','Check');
  else if(ty==='appr'||op)verb=T('Tinjau','Review');
  else if(ty==='money')verb=/pembayaran|payment/i.test(chipTxt)?T('Bayar','Pay'):T('Periksa','Check');
  else if(ty==='msg')verb=T('Balas','Reply');
  return {...r,task,op,ty,go,title,label,handler,due,g,stages,verb};
}
function due135(w){
  const today=day();
  if(w.g==='wait')return (w.chips.find(c=>/menunggu|tindak lanjut believe|waiting/i.test(c[0]))||[T('menunggu pihak lain','waiting')])[0].toLowerCase();
  if(w.g==='late')return w.due&&w.due<today?T(`terlambat ${days135(w.due,today)} hari`,`${days135(w.due,today)} days late`):T('lewat tenggat','overdue');
  if(w.g==='today')return w.op&&w.due<today?T('prioritas hari ini','priority today'):T('hari ini','today');
  if(w.due&&w.due>today){const n=days135(today,w.due);return n===1?T('besok','tomorrow'):n<=7?T(`${n} hari lagi`,`in ${n} days`):T(`tenggat ${fdate135(w.due)}`,`due ${fdate135(w.due)}`);}
  return T('tanpa tenggat aktif','no active deadline');
}
const dueCls135=w=>w.g==='late'?'late135':w.g==='today'?'soon135':'';
const order135=GR135.map(g=>g[0]);
const sort135=r=>r.slice().sort((a,b)=>order135.indexOf(a.g)-order135.indexOf(b.g)||String(a.due||'9').localeCompare(String(b.due||'9')));
const mini135=id=>id?`<span class="mini134" title="${E(pname134(id))} · ${E(role135(id))}">${E(ini134(id))}</span>`:`<span class="mini134 none" title="${T('Belum ada penanggung jawab','Unassigned')}">+</span>`;

/* dev.51 — pita tim (disetujui 25 Okt): foto tim menggantung di lekukan tengah tepi atas kartu "Berikutnya untukmu".
   Angka = pekerjaan terbuka orang itu; warna = status paling mendesak (merah terlambat · oranye hari ini · biru semua
   menunggu pihak lain · abu tidak mendesak); + = tidak memegang. Lingkaran putus-putus = belum dipegang siapa pun.
   Klik foto → daftar & alur waktu hanya untuk orang itu. Bentuk lekukan diukur dari referensi (dalam 80, dinding 64 — bahu bulat, dinding tegak, kaki bulat). */
const inP135=w=>!w135.p||(w135.p==='none'?!w.handler:w.handler===w135.p);
function load135(all,k){const L=all.filter(w=>k==='none'?!w.handler:w.handler===k),g=new Set(L.map(w=>w.g));
  return {n:L.length,late:L.filter(w=>w.g==='late').length,tone:!L.length?'add':g.has('late')?'red':g.has('today')?'orange':[...g].every(v=>v==='wait')?'blue':'grey'};}
function loadTxt135(l,k){if(!l.n)return k==='none'?T('Semua pekerjaan sudah ada yang memegang','Every item has an owner'):T('Tidak memegang pekerjaan terbuka','No open work');
  return T(`${l.n} pekerjaan`,`${l.n} item${l.n>1?'s':''}`)+(l.late?T(` · ${l.late} terlambat`,` · ${l.late} late`):l.tone==='orange'?T(' · jatuh tempo hari ini',' · due today'):l.tone==='blue'?T(' · menunggu pihak lain',' · waiting on others'):'');}
const BAY135='M0,0H64V80C42,80 37.3,62 32,40C26.7,18 22,0 0,0Z';
function bay135(all){
  const plus='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>',
    person='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>';
  const one=(k,inner,cls)=>{const l=load135(all,k),nm=k==='none'?T('Belum dipegang','Unassigned'):pname134(k)+(k===me().id?T(' (kamu)',' (you)'):''),tip=`${nm} · ${loadTxt135(l,k)}`;
    return `<button type="button" class="ba151${cls?' '+cls:''}" data-w135-p="${E(k)}" aria-pressed="${w135.p===k}" title="${E(tip)}" aria-label="${E(tip)}"><span class="c">${inner}</span><span class="n ${l.tone}">${l.n||plus}</span></button>`;};
  const wall=r=>`<svg class="w${r?' r':''}" viewBox="0 0 64 80" aria-hidden="true"><path d="${BAY135}"/></svg>`;
  return `<div class="bay151">${wall()}<div class="bf" role="group" aria-label="${T('Saring menurut orang','Filter by person')}">${TEAM135().map(id=>one(id,E(ini134(id)))).join('')}${one('none',person,'none')}</div>${wall(1)}</div>`;}

/* ---------- tampilan ---------- */
function band135(all,ring){
  const next=sort135(all.filter(w=>w.g!=='wait'&&(w.handler===me().id||!w.handler)))[0],c=k=>all.filter(w=>w.g===k&&inP135(w)).length;
  return `<section class="band135 rv135 pita151" data-w135="band">${bay135(all)}<div class="top135"><div class="focus135">
    <div class="k135"><i></i>${T('Berikutnya untukmu','Next for you')}</div>
    <h2>${next?E(next.title)+(next.label?` · ${E(next.label)}`:''):T('Semua beres','All clear')}</h2>
    <p>${next?`${E(next.chips[0]?.[0]||'')}${next.chips.length?' · ':''}${E(due135(next))} · ${T('dikerjakan di menu','handled in')} ${E(next.go)}`:T('Tidak ada pekerjaan yang menunggumu.','Nothing is waiting for you.')}</p>
    ${next?`<div class="acts135"><button type="button" class="wbtn135" data-w135-open="${E(next.id)}">${T('Lihat rincian','View details')} ${svg135('arrow',2)}</button>${next.task&&!next.handler?`<button type="button" class="gbtn135" data-w135-take="${E(next.id)}">${T('Ambil','Take')}</button>`:''}</div>`:''}
   </div>${ring}</div>
   <div class="flow135">${GR135.map(([k,l,h])=>`<button type="button" class="fn135${k==='late'&&c(k)?' hot':''}${c(k)?'':' zero'}" data-w135-g="${k}" aria-pressed="${w135.g===k}"><span class="dot135 n">${c(k)}</span><span class="t">${L(l)}</span><span class="d">${L(h)}</span></button>`).join('')}</div></section>`;
}
function list135(all){
  let r=all.filter(w=>inP135(w)&&(!w135.g||w.g===w135.g));
  if(w135.q)r=r.filter(w=>(w.title+' '+w.label+' '+w.id).toLowerCase().includes(w135.q));
  r=sort135(r);
  const G=GR135.find(g=>g[0]===w135.g),P=w135.p,recs=typeof todayRecords==='function'?todayRecords():[];
  const ttl=!P?T('Semua pekerjaan','All work'):P==='none'?T('Belum dipegang','Unassigned'):P===me().id?T('Pekerjaanku','My work'):T('Pekerjaan ','Work of ')+String(pname134(P)).split(' ')[0];
  let h=`<section class="d134-card list135 rv135" data-w135="list"><div class="ch135"><h2>${ttl} <small class="n">${all.filter(inP135).length}</small></h2><label class="find135">${svg135('search',2)}<input data-w135-q placeholder="${T('Cari judul, label, kode','Search title, label, code')}" value="${E(w135.q)}"></label></div>`;
  if(G||P)h+=`<div class="flt135"><span>${T('Hanya','Only')} <b>${[P?(P==='none'?T('belum dipegang','unassigned'):E(pname134(P))):'',G?L(G[1]):''].filter(Boolean).join(' · ')}</b></span><button type="button" data-w135-clear>${T('Tampilkan semua','Show all')}</button></div>`;
  let cur='',i=0;
  r.forEach(w=>{if(w.g!==cur){cur=w.g;const g=GR135.find(x=>x[0]===cur);h+=`<div class="gh135" style="--c:${g[3]}"><i></i><b>${L(g[1])}</b> · ${r.filter(x=>x.g===cur).length}</div>`;}
    h+=`<div class="it135${w135.sel===w.id?' sel':''}" data-w135-row="${E(w.id)}" style="--i:${i++}"><span class="ty134">${svg135(w.ty)}</span><div class="mid135"><div class="tt135">${E(w.title)} ${w.chips.slice(0,1).map(c=>statusBadge111(c[0],c[1])).join('')}</div><div class="sub135">${w.label?E(w.label)+' · ':''}${E(w.go)} · <span class="${dueCls135(w)}">${E(due135(w))}</span></div></div>
      <div class="rt135">${w.task&&!w.handler?`<button type="button" class="qbtn135" data-w135-take="${E(w.id)}">${T('Ambil','Take')}</button>`:`<button type="button" class="qbtn135" ${w.act}>${E(w.verb)}</button>`}${mini135(w.handler)}</div></div>`;});
  const idle=P&&P!=='none'&&!w135.g&&!w135.q,nUn=load135(all,'none').n;
  if(!r.length)h+=idle?`<div class="empty135"><b>${T(`${E(pname134(P))} tidak memegang pekerjaan terbuka`,`${E(pname134(P))} holds no open work`)}</b>${nUn?`<button type="button" class="qbtn135" data-w135-p="none">${T(`Lihat ${nUn} yang belum dipegang`,`See ${nUn} unassigned`)}</button>`:''}</div>`:`<div class="empty135"><b>${T('Semua beres','All clear')} ✓</b>${T('Tidak ada pekerjaan di kelompok ini.','Nothing in this group.')}</div>`;
  if(!w135.g&&!w135.q&&recs.length)h+=`<button type="button" class="doneh135" data-w135-done aria-expanded="${w135.done}"><span>${svg135('check',2.6)}</span>${T('Selesai hari ini','Done today')} · ${recs.length}${svg135('down',2)}</button>${w135.done?`<div class="donel135">${recs.map(x=>`<div>${mini135(x.staff)}<span>${E(tl134(x.title))}</span><small>${E(x.time||'')}</small></div>`).join('')}</div>`:''}`;
  return h+'</section>';
}
function sec135(i,h,body,extra=''){return `<div class="sec135" style="--k:${i}"><h4>${h}${extra?`<em>${extra}</em>`:''}</h4>${body}</div>`;}
function pane135(w){
  if(!w)return `<div class="empty135" style="padding:60px 20px"><b>${T('Pilih pekerjaan','Pick a work item')}</b>${T('Rinciannya tampil di sini.','Its details show here.')}</div>`;
  const n=w.stages.length,at=Math.max(0,w.stages.findIndex(s=>s.now)),k=[0];const nx=()=>++k[0];
  let b=sec135(0,T('Tahapan','Stages'),`<div class="steps135" style="--n:${n}"><i class="prog135" style="--w:calc(100% * ${w.stages.filter(s=>s.done).length} / ${n})"></i>${w.stages.map((s,i)=>`<div class="st135 ${s.done?'done':s.now?(w.g==='wait'?'wait':'now'):''}" style="--j:${i}"><span class="b135">${s.done?svg135('check',2.6):''}</span><span>${E(s.t)}</span></div>`).join('')}</div>`);
  if(w.ty==='rel'&&w.task){const rel=(ten.releases||[]).find(x=>x.id===w.id)||{};
    b+=sec135(nx(),T('Rilisan','Release'),`<div class="relb135"><div class="cover135" style="--h:${hue135(w.id)}"><span>${E(w.title)}</span></div><div class="facts135">${[[T('Artis','Artist'),rel.artist],[T('Layanan','Service'),rel.service],[T('Jumlah lagu','Tracks'),rel.tracks],[T('Tanggal rilis','Release date'),fdate135(rel.date)],[T('Label','Label'),w.label]].filter(x=>x[1]).map(([a,v])=>`<span>${a}</span><b>${E(v)}</b>`).join('')}</div></div>`);}
  if(w.op){const det=String(L(w.op.detail)||''),m=det.match(/^([^:]+):\s*(.+?)\s*→\s*(.+?)\.(?:\s|$)/);
    if(m)b+=sec135(nx(),T('Lama → baru','Old → new'),`<table class="tbl135"><thead><tr><th>${T('Bagian','Field')}</th><th>${T('Lama','Old')}</th><th>${T('Baru','New')}</th></tr></thead><tbody><tr><td>${E(m[1])}</td><td class="old135">${E(m[2])}</td><td><span class="new135">${E(m[3])}</span></td></tr></tbody></table><p class="fine135">${E(det.slice(m[0].length).trim())}</p>`);
    else b+=sec135(nx(),T('Rincian','Details'),`<p class="para135">${E(det)}</p>`);
    if(w.op.policy)b+=sec135(nx(),T('Aturan waktu','Timing rule'),`<p class="para135"><b>${E(L(w.op.policy.name))}</b> · ${E(L(w.op.policy.desc))}</p>`);}
  if(w.ty==='money'&&!w.op){const y=cycle134(),amount=(w.sub.match(/Rp[\s ][\d.]+/)||[''])[0];
    b+=sec135(nx(),T('Transfer','Payout'),`<div class="facts135">${[[T('Label','Label'),w.label],[T('Kode','Code'),w.sub.split(' · ')[0]],[T('Jumlah','Amount'),amount],[T('Batas bayar','Pay by'),(()=>{const o=wdOpen135(w.id);return o?.cycle?fdate135(o.cycle+'-20')+(o.late?T(' · terlambat',' · late'):''):'—';})()]].filter(x=>x[1]).map(([a,v])=>`<span>${a}</span><b>${E(v)}</b>`).join('')}</div><div class="cash135">${T('Sisa kas setelah semua pembayaran bulan ini','Cash left after this month’s payouts')} <span class="ex134">${T('contoh kas','sample cash')}</span><b class="n">${jt134(KAS134-y.d.unpaid)}</b></div>`);}
  if(w.task&&w.ty!=='rel'){const reason=w.task.reason?L(w.task.reason):'';
    b+=sec135(nx(),T('Rincian','Details'),`<div class="facts135">${[[T('Label','Label'),w.label],[T('Kode','Code'),w.id],[T('Dibuat','Created'),fdate135(w.task.created)],[T('Tenggat','Due'),fdate135(w.task.due)]].filter(x=>x[1]).map(([a,v])=>`<span>${a}</span><b>${E(v)}</b>`).join('')}</div>${reason?`<p class="fine135">${E(reason)}</p>`:''}`);}
  if(w.ty==='rel'&&w.task?.reason&&!/^tindak lanjut rilisan/i.test(L(w.task.reason)))b+=sec135(nx(),T('Catatan','Note'),`<p class="para135">${E(L(w.task.reason))}</p>`);
  if(!w.task&&!w.op&&w.ty!=='money')b+=sec135(nx(),T('Rincian','Details'),`<div class="facts135"><span>${T('Kode','Code')}</span><b>${E(w.id)}</b>${w.sub?`<span>${T('Keterangan','Note')}</span><b>${E(w.sub)}</b>`:''}</div>`);
  if(w.chips.length>1)b+=sec135(nx(),T('Status','Status'),`<div class="chips135">${w.chips.map(c=>statusBadge111(c[0],c[1])).join('')}</div>`);
  const last=w.task?.last?String(w.task.last).slice(0,10):null;
  b+=sec135(nx(),T('Riwayat','History'),`<div class="hist135"><div>${mini135(w.handler)}<span>${w.handler?`${E(pname134(w.handler))} ${T('menangani pekerjaan ini','handles this work')}`:T('Masuk antrean, belum ada penanggung jawab','Queued, no one assigned yet')}${last?`<br><small>${T('terakhir diperbarui','last updated')} ${fdate135(last)}</small>`:''}</span></div>${w.task?.created||w.op?.created?`<div><span class="mini134">SY</span><span>${T('Dibuat otomatis dari menu','Created from')} ${E(w.go)}<br><small>${fdate135(w.task?.created||w.op?.created)}</small></span></div>`:''}</div>`);
  const canAssign=!!w.task;
  return `<div class="hd135"><button type="button" class="back135" data-w135-back>${svg135('back',2)}${T('Semua pekerjaan','All work')}</button>
    <div class="k135"><span class="ty134">${svg135(w.ty)}</span>${L(TYPE135[w.ty])} · <span class="mono134">${E(w.id)}</span></div>
    <h2>${E(w.title)}</h2>
    <div class="meta135">${w.chips[0]?statusBadge111(w.chips[0][0],w.chips[0][1]):''}${w.label?`<span>${E(w.label)}</span><i></i>`:''}<span class="${dueCls135(w)}">${E(due135(w))}</span></div>
    <div class="hrow135"><span class="own135">${canAssign?`<button type="button" data-w135-assign>${mini135(w.handler)}${w.handler?`${E(pname134(w.handler))} <small>· ${E(role135(w.handler))}</small>`:T('Tugaskan ke…','Assign to…')}${svg135('down',2)}</button><div class="pop135" data-w135-pop></div>`:`<span class="ro135">${mini135(w.handler)}${w.handler?`${E(pname134(w.handler))} <small>· ${E(role135(w.handler))}</small>`:'—'}</span>`}</span>${w.task&&!w.handler?`<button type="button" class="obtn135" data-w135-take="${E(w.id)}">${T('Ambil','Take')}</button>`:''}<button type="button" class="pbtn135" ${w.act}>${w.ty==='msg'?T('Balas di Pesan','Reply in Messages'):`${T('Buka di','Open in')} ${E(w.go)}`} ${svg135('arrow',2)}</button></div>
    <p class="where135">${w.handler||!w.task?`${T('Dikerjakan di menu','Handled in')} ${E(w.go)}; ${T('tombol di atas langsung membuka pekerjaan ini.','the button opens this item directly.')}`:T('Belum ada yang menangani. Ambil sendiri atau tugaskan.','No one is on it yet. Take it or assign it.')}</p></div>
    <div class="pb135">${b}</div>`;
}
function page135(all){
  const y=cycle134(),recs=typeof todayRecords==='function'?todayRecords():[],done=recs.length,total=done+all.length;
  /* dev.51: cincin "selesai hari ini" pindah ke kanan kartu atas (kotak 3 untukmu · 6 belum ditangani · 10 aktif di tim → pita tim) */
  const ring=`<div class="donecard135" title="${T('Pekerjaan selesai hari ini','Work finished today')}"><div class="dring135"><svg viewBox="0 0 36 36"><circle class="trk" cx="18" cy="18" r="15.9"/><circle class="arc" cx="18" cy="18" r="15.9" pathLength="100" style="--p:${total?Math.round(done/total*100):0}"/></svg><b>${svg135('check',2.6)}</b></div><div><div class="big135 n">${done}<small>/${total}</small></div><div class="lb135">${T('selesai hari ini','done today')}<br>${T(`${all.length} masih terbuka`,`${all.length} still open`)}</div></div></div>`;
  return `<div class="d134 w135"><div class="ph135"><div><h1>${T('Pekerjaan','Work')}</h1><div class="sub135">${E(new Date(day()+'T00:00:00Z').toLocaleDateString(state.lang==='id'?'id-ID':'en-US',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}))} · ${T('semua pekerjaan dari semua menu','all work from every menu')}</div></div></div>
    ${band135(all,ring)}
    <div class="wk135">${list135(all)}<section class="d134-card pane135" data-w135="pane"><div class="pin135">${pane135(all.find(w=>w.id===w135.sel))}</div></section></div></div>`;
}

/* ---------- pasang ---------- */
function stick135(main){const p=main.querySelector('.pane135');if(p)p.classList.toggle('stick135',wide135()&&p.offsetHeight<=innerHeight-110);}
function play135(main){const p=main.querySelector('.pane135');if(!p||RM135())return;p.classList.remove('play135');void p.offsetWidth;p.classList.add('play135');}
function mount135(main){
  w135.io?.disconnect();const cards=[...main.querySelectorAll('.rv135')];
  if(RM135()){cards.forEach(c=>c.classList.add('in'));return;}
  cards.forEach(c=>{if(w135.seen.has(c.dataset.w135))c.classList.add('in','still135');});
  w135.io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){w135.io.unobserve(e.target);e.target.classList.add('in');w135.seen.add(e.target.dataset.w135);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'});
  cards.filter(c=>!c.classList.contains('in')).forEach(c=>w135.io.observe(c));
}
function draw135(){
  const main=document.querySelector('#main');if(!main)return;
  const all=rows135(),vis=all.filter(w=>inP135(w)&&(!w135.g||w.g===w135.g)&&(!w135.q||(w.title+' '+w.label+' '+w.id).toLowerCase().includes(w135.q)));
  if(wide135()&&(!w135.sel||!vis.some(w=>w.id===w135.sel)))w135.sel=sort135(vis)[0]?.id||null;
  const focusQ=document.activeElement?.matches?.('[data-w135-q]');
  main.classList.add('dashboard-main124','work135-main');main.innerHTML=page135(all);
  main.querySelector('.wk135')?.classList.toggle('reading135',!wide135()&&w135.read&&!!w135.sel);
  mount135(main);stick135(main);
  if(w135.sel!==w135.last){w135.last=w135.sel;play135(main);}
  if(focusQ){const q=main.querySelector('[data-w135-q]');q?.focus();q?.setSelectionRange(q.value.length,q.value.length);}
}
const renderBefore135=render;
render=function(){
  const out=renderBefore135.apply(this,arguments);
  try{
    const link=document.querySelector('.side-scroll [data-page="mywork9"]');const sp=link&&[...link.querySelectorAll('span')].find(s=>/Pekerjaan Saya|My Work/.test(s.textContent));if(sp)sp.textContent=T('Pekerjaan','Work');
    if(on135())draw135();else document.querySelector('#main')?.classList.remove('work135-main');
  }catch(err){console.warn('work135',err);}
  return out;
};
const pagesBefore135=pages;pages=function(){const p=pagesBefore135.apply(this,arguments);if(p&&p.mywork9)p.mywork9=T('Pekerjaan','Work');return p;};
function open135(id){w135.sel=id;w135.read=true;draw135();const wk=document.querySelector('.wk135'),pane=document.querySelector('.pane135');
  if(!wide135()||(pane&&pane.getBoundingClientRect().top<80))wk?.scrollIntoView({behavior:RM135()?'auto':'smooth',block:'start'});}
document.addEventListener('click',e=>{
  if(!on135())return;
  const t=e.target,hit=t.closest('[data-w135-p],[data-w135-clear],[data-w135-g],[data-w135-done],[data-w135-take],[data-w135-open],[data-w135-assign],[data-w135-to],[data-w135-back],[data-w135-row]');
  if(!hit){if(!t.closest('[data-w135-pop]'))document.querySelectorAll('.pop135.on').forEach(p=>p.classList.remove('on'));return;}
  if(hit.matches('[data-w135-row]')&&t.closest('button'))return; // tombol aksi asli di dalam baris
  e.preventDefault();e.stopImmediatePropagation();
  if(hit.hasAttribute('data-w135-p')){const k=hit.dataset.w135P;w135.p=w135.p===k?'':k;w135.g='';w135.read=false;draw135();return;}
  if(hit.hasAttribute('data-w135-clear')){w135.p='';w135.g='';w135.read=false;draw135();return;}
  if(hit.dataset.w135G){w135.g=w135.g===hit.dataset.w135G?'':hit.dataset.w135G;w135.read=false;draw135();return;}
  if(hit.hasAttribute('data-w135-done')){w135.done=!w135.done;draw135();return;}
  if(hit.dataset.w135Take){const x=(data.tasks||[]).find(x=>x.id===hit.dataset.w135Take);if(x){x.handler=me().id;if(typeof assignRelease137==='function')assignRelease137(x.id,me().id);say135(T(`${tl134(x.title)} sekarang kamu yang tangani`,`You now handle ${tl134(x.title)}`));}w135.sel=hit.dataset.w135Take;render();return;}
  if(hit.dataset.w135Open){open135(hit.dataset.w135Open);return;}
  if(hit.hasAttribute('data-w135-assign')){const pop=document.querySelector('[data-w135-pop]');if(!pop)return;if(pop.classList.contains('on')){pop.classList.remove('on');return;}
    pop.innerHTML=`<small>${T('Tugaskan ke','Assign to')}</small>`+TEAM135().map(id=>`<button type="button" data-w135-to="${E(id)}">${mini135(id)}<span>${E(pname134(id))}<small>${E(role135(id))}</small></span><em>${operationalTasks().filter(x=>x.handler===id).length} ${T('aktif','active')}</em></button>`).join('');pop.classList.add('on');return;}
  if(hit.dataset.w135To){const x=(data.tasks||[]).find(x=>x.id===w135.sel);if(x){x.handler=hit.dataset.w135To;if(typeof assignRelease137==='function')assignRelease137(x.id,x.handler);say135(T(`${tl134(x.title)} ditugaskan ke ${pname134(x.handler)}`,`${tl134(x.title)} assigned to ${pname134(x.handler)}`));}render();return;}
  if(hit.hasAttribute('data-w135-back')){w135.read=false;draw135();document.querySelector('.wk135')?.scrollIntoView({block:'start'});return;}
  if(hit.dataset.w135Row){open135(hit.dataset.w135Row);return;}
},true);
document.addEventListener('input',e=>{if(on135()&&e.target.matches?.('[data-w135-q]')){w135.q=e.target.value.toLowerCase();draw135();}});
let wide135was=wide135();addEventListener('resize',()=>{if(!on135())return;if(wide135()!==wide135was){wide135was=wide135();draw135();}else{const m=document.querySelector('#main');if(m)stick135(m);}});
