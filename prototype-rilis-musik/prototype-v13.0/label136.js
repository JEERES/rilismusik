/* v1.1.0-dev.28 — Manajemen Label (Super Admin): buku induk label.
   Tiga bagian: Semua label · Calon member · Verifikasi. Penyesuaian Data Label tidak lagi
   menjadi menu sendiri (penyaring "Data lama" + bagian di rincian). Data dan aksi memakai
   model prototipe yang sudah ada (ten.members, data.v9.labels, data.ops, modal asli). */
const l136={tab:'all',seg:'',q:'',sel:null,read:false,seen:new Set(),io:null,last:''};
const on136=()=>!isLabel10()&&me().super&&state.mode==='platform'&&state.page==='labels9'&&!state.preview;
const hue136=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const ini136=n=>String(n).split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const lav136=(m,cls='')=>`<span class="lav136 ${cls}" style="--h:${hue136(m.id)}">${E(ini136(m.name))}</span>`;
const v9of136=m=>(data.v9?.labels||[]).find(l=>l.id===m.source9)||null;
const ACC136={normal:'green',limited:'mustard',blocked:'red'};
function info136(m){
  const l=v9of136(m),today=day(),why=[];
  const acc=l?accessLabel9(l):'normal',act=l?activity9(l):(m.active?'active':'new');
  if(l&&m.active){
    if(l.expiry&&l.expiry<today)why.push([T(`Paket berakhir ${fdate135(l.expiry)} · belum diperpanjang`,`Plan ended ${fdate135(l.expiry)}`),'r','renew']);
    else if(l.expiry&&days135(today,l.expiry)<=30)why.push([T(`Paket berakhir ${days135(today,l.expiry)} hari lagi`,`Plan ends in ${days135(today,l.expiry)} days`),'o','renew']);
    if(l.held>0)why.push([T(`Dana ditahan ${jt134(l.held)}`,`Funds on hold ${jt134(l.held)}`),'r','held']);
    if(acc==='blocked'&&!l.held)why.push([T('Akses ditangguhkan','Access suspended'),'r','access']);
    if(act==='dormant')why.push([T('Lama tidak beraktivitas','Dormant'),'o','msg']);
    if(l.issue)why.push([T('Ada laporan masalah','Issue reported'),'o','msg']);
    if(verification9(l).status==='review')why.push([T('Verifikasi dalam peninjauan','Verification under review'),'o','ver']);
  }
  if(m.bank?.pending)why.push([T('Rekening baru menunggu verifikasi','New bank account awaiting review'),'o','ver']);
  if(m.profileChange103?.status==='pending')why.push([T('Perubahan identitas menunggu','Identity change pending'),'o','ver']);
  if(m.documentRequest?.status==='pending')why.push([T('Penggantian dokumen menunggu','Document replacement pending'),'o','ver']);
  if(m.application?.status==='pending')why.push([T('Pendaftaran menunggu pemeriksaan','Application awaiting review'),'o','ver']);
  (data.ops||[]).filter(o=>['pending','approved'].includes(o.status)&&/identitas|identity/i.test(L(o.title))&&String(L(o.title)).includes(m.name)).forEach(()=>why.push([T('Verifikasi identitas menunggu','Identity verification pending'),'o','ver']));
  const legacy=m.active&&!m.identity?.location?.complete;
  return {m,l,acc,act,why,legacy,score:why.reduce((n,w)=>n+(w[1]==='r'?2:1),0)};
}
function all136(){return ten.members.map(info136);}
const SEG136=[['attn',['Butuh perhatian','Needs attention'],['perlu keputusan','needs a decision'],x=>x.why.length],
  ['acc',['Akses dibatasi','Restricted access'],['dibatasi / ditangguhkan','limited / suspended'],x=>x.acc!=='normal'],
  ['end',['Paket berakhir','Plan ending'],['≤ 30 hari','≤ 30 days'],x=>x.m.active&&x.l?.expiry&&days135(day(),x.l.expiry)<=30],
  ['legacy',['Data lama','Legacy data'],['belum diperbarui','not yet updated'],x=>x.legacy],
  ['multi',['Multi-label','Multi-label'],['master & anak','master & children'],x=>!!x.l?.master]];
function ver136(){
  const out=[];
  ten.members.forEach(m=>{
    if(m.application?.status==='pending')out.push({id:'app:'+m.id,m,kind:T('Pendaftaran','Application'),t:T('Pemeriksaan identitas pendaftar','Applicant identity review'),act:`data-ten="identity" data-id="${E(m.id)}"`});
    if(m.bank?.pending)out.push({id:'bank:'+m.id,m,kind:T('Rekening','Bank account'),t:T('Rekening penerima baru','New payout account'),act:`data-ten="bank_review" data-id="${E(m.id)}"`,old:m.bank.approved,nw:m.bank.pending});
    if(m.profileChange103?.status==='pending')out.push({id:'prof:'+m.id,m,kind:T('Identitas','Identity'),t:T('Perubahan data identitas','Identity data change'),act:`data-v103="review" data-id="${E(m.id)}"`,fields:typeof changedFieldsUI==='function'?changedFieldsUI(m.profileChange103).map(([,a,b])=>T(a,b)):[]});
    if(m.documentRequest?.status==='pending')out.push({id:'doc:'+m.id,m,kind:T('Dokumen','Document'),t:T('Penggantian KTP penanggung jawab','Representative ID replacement'),act:`data-pending="document-review" data-id="${E(m.id)}"`});
  });
  (data.ops||[]).filter(o=>['pending','approved'].includes(o.status)&&/identitas|identity/i.test(L(o.title))).forEach(o=>{
    const m=ten.members.find(x=>String(L(o.title)).includes(x.name));if(!m)return;
    out.push({id:'op:'+o.id,m,op:o,kind:T('Identitas','Identity'),t:String(L(o.title)).split(' · ')[0],act:`data-action="op-detail" data-id="${E(o.id)}"`});});
  return out;
}
const plan136=m=>typeof badge104==='function'?badge104(m.plan):`<span class="plan9">${E(m.plan)}</span>`;
const accChip136=x=>statusBadge111(x.l?labelStatus9('access',x.acc):T('Normal','Normal'),ACC136[x.acc]||'neutral');
const actTxt136=x=>x.l?labelStatus9('activity',x.act):(x.m.active?T('Aktif','Active'):T('Belum aktif','Not active'));
function visible136(){
  if(l136.tab==='calon')return all136().filter(x=>!x.m.active);
  if(l136.tab==='ver')return ver136();
  const seg=SEG136.find(s=>s[0]===l136.seg);
  let r=all136().filter(x=>!seg||seg[3](x));
  if(l136.q)r=r.filter(x=>(x.m.name+' '+x.m.id+' '+x.m.email).toLowerCase().includes(l136.q));
  return r.sort((a,b)=>b.score-a.score);
}
/* ---------- tampilan ---------- */
function tabs136(){const v=ver136().length;return `<div class="tabs136" role="group">${[['all',T('Semua label','All labels'),ten.members.length],['calon',T('Calon member','Prospective members'),ten.members.filter(m=>!m.active).length],['ver',T('Verifikasi','Verification'),v]].map(([k,t,n])=>`<button type="button" data-l136-tab="${k}" aria-pressed="${l136.tab===k}" class="${k==='ver'&&n?'hot':''}">${t}<b>${n}</b></button>`).join('')}</div>`;}
function band136(){
  const all=all136(),at=all.filter(x=>x.why.length).sort((a,b)=>b.score-a.score),v=ver136().length;
  return `<section class="band135 rv135" data-l136="band"><div class="top135"><div class="focus135"><div class="k135"><i></i>${T('Kondisi label hari ini','Label health today')}</div>
    <h2>${at.length?T(`${at.length} label butuh perhatian`,`${at.length} labels need attention`):T('Semua label dalam kondisi baik','All labels look healthy')}</h2>
    <p>${at.slice(0,3).map(x=>`${E(x.m.name)} · ${E(x.why[0][0].split(' · ')[0].toLowerCase())}`).join(' · ')}</p>
    <div class="acts135">${at.length?`<button type="button" class="wbtn135" data-l136-seg="attn">${T('Tampilkan semuanya','Show them all')} ${svg135('arrow',2)}</button>`:''}${v?`<button type="button" class="gbtn135" data-l136-tab="ver">${T('Verifikasi menunggu','Verification waiting')} · ${v}</button>`:''}</div></div>
    <div class="stat135"><div><b class="n">${all.filter(x=>x.m.active).length}</b><span>${T('label aktif','active labels')}</span></div><div><b class="n">${all.filter(x=>x.act==='active').length}</b><span>${T('aktif 90 hari','active 90 days')}</span></div><div><b class="n">${all.filter(x=>!x.m.active).length}</b><span>${T('calon member','prospects')}</span></div></div></div>
   <div class="flow135">${SEG136.map(([k,t,d,fn])=>{const n=all.filter(fn).length;return `<button type="button" class="fn135${k==='attn'&&n?' hot act':''}${n?'':' zero'}" data-l136-seg="${k}" aria-pressed="${l136.seg===k}"><span class="dot135 n">${n}</span><span class="t">${L(t)}</span><span class="d">${L(d)}</span></button>`;}).join('')}</div></section>`;
}
function list136(){
  const r=visible136();let h='';
  if(l136.tab==='all'){
    const G=SEG136.find(s=>s[0]===l136.seg);
    h+=`<div class="ch135"><h2>${T('Semua label','All labels')} <small class="n">${r.length}</small></h2><label class="find135">${svg135('search',2)}<input data-l136-q placeholder="${T('Cari nama, kode, atau email','Search name, code or email')}" value="${E(l136.q)}"></label></div>`;
    if(G)h+=`<div class="flt135"><span>${T('Hanya','Only')} <b>${L(G[1])}</b></span><button type="button" data-l136-seg="${G[0]}">${T('Tampilkan semua','Show all')}</button></div>`;
    h+=r.map((x,i)=>`<div class="it135 it136${l136.sel===x.m.id?' sel':''}" data-l136-row="${E(x.m.id)}" style="--i:${i}">${lav136(x.m)}<div class="mid135"><div class="tt135">${E(x.m.name)} ${plan136(x.m)}</div><div class="sub135">${E(x.m.id)}${x.l?.master?' · '+T('Master multi-label','Multi-label master'):''} · ${E(String(actTxt136(x)).toLowerCase())}</div>${x.why.map(w=>`<div class="why136 ${w[1]}">${E(w[0])}</div>`).join('')}</div><div class="rt135">${x.acc==='normal'?'':accChip136(x)}</div></div>`).join('')||`<div class="empty135"><b>${T('Tidak ada label','No labels')}</b>${T('Coba kata lain atau lepas penyaring.','Try another word or clear the filter.')}</div>`;
  }else if(l136.tab==='calon'){
    h+=`<div class="ch135"><h2>${T('Calon member','Prospective members')} <small class="n">${r.length}</small></h2></div><p class="note136">${T('Label yang sudah mendaftar tapi belum aktif penuh.','Labels that signed up but are not fully active yet.')}</p>`;
    h+=r.map((x,i)=>{const c=activationCount10(x.m);return `<div class="it135 it136${l136.sel===x.m.id?' sel':''}" data-l136-row="${E(x.m.id)}" style="--i:${i}">${lav136(x.m)}<div class="mid135"><div class="tt135">${E(x.m.name)} ${plan136(x.m)}</div><div class="sub135">${x.m.paid?T('Sudah dibayar','Paid'):T('Belum dibayar','Unpaid')} · ${E(x.m.email)}</div><div class="minis136">${[0,1,2,3,4,5].map(j=>`<i class="${j<=Math.min(c,4)?'d':j===Math.min(c,4)+1?'n':''}"></i>`).join('')}</div></div><div class="rt135">${x.m.application?.status==='pending'?`<button type="button" class="qbtn135" data-ten="identity" data-id="${E(x.m.id)}">${T('Periksa','Review')}</button>`:`<button type="button" class="qbtn135" data-l136-remind="${E(x.m.id)}">${T('Ingatkan','Remind')}</button>`}</div></div>`;}).join('')||`<div class="empty135"><b>${T('Semua calon member sudah aktif','All prospects are active')} ✓</b></div>`;
  }else{
    h+=`<div class="ch135"><h2>${T('Verifikasi','Verification')} <small class="n">${r.length}</small></h2></div><p class="note136">${T('Identitas, rekening, dokumen, dan pendaftaran yang menunggu keputusan.','Identity, bank, document and application reviews awaiting a decision.')}</p>`;
    h+=r.map((v,i)=>`<div class="it135 it136${l136.sel===v.id?' sel':''}" data-l136-row="${E(v.id)}" style="--i:${i}">${lav136(v.m)}<div class="mid135"><div class="tt135">${E(v.t)} ${statusBadge111(v.kind,'blue')}</div><div class="sub135">${E(v.m.name)}${v.op?` · ${T('dari Pekerjaan','from Work')} ${E(v.op.id)}`:''}</div></div><div class="rt135"><button type="button" class="qbtn135" ${v.act}>${T('Periksa','Review')}</button></div></div>`).join('')||`<div class="empty135"><b>${T('Semua sudah diverifikasi','All verified')} ✓</b>${T('Tidak ada yang menunggu.','Nothing is waiting.')}</div>`;
  }
  return `<section class="d134-card list135 rv135" data-l136="list">${h}</section>`;
}
const sec136=(k,h,b,ex='')=>`<div class="sec135" style="--k:${k}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
function history136(x){
  const m=x.m,ev=[];
  (ten.cleanupHistory||[]).filter(h=>h.member===m.id).forEach(h=>ev.push([h.at,'SY',T('Data identitas atau rekening diperbarui','Identity or bank data updated')]));
  (data.v9?.audit||[]).filter(a=>a.id===x.l?.id).forEach(a=>ev.push([a.date,'JR',a.kind==='renewal-preview'?T('Pratinjau perpanjangan paket','Plan renewal preview'):String(a.kind||'')]));
  (m.contractSignatures102||[]).forEach(s=>ev.push([s.at||m.activatedAt,ini136(m.name),T('Menyetujui kontrak','Accepted the contract')]));
  if(m.activatedAt)ev.push([m.activatedAt,'SY',T('Akun diaktifkan','Account activated')]);
  if(m.joined)ev.push([m.joined,'SY',T('Mendaftar','Signed up')]);
  return ev.filter(e=>e[0]).sort((a,b)=>String(b[0]).localeCompare(String(a[0]))).slice(0,6);
}
function labelPane136(x){
  const m=x.m,l=x.l,rels=(ten.releases||[]).filter(r=>r.member===m.id).length;let k=0,b='';
  b+=sec136(k++,T('Ringkasan','Summary'),`<div class="stats136"><div><b class="n">${l?jt134(l.periodIncome||0):'—'}</b><span>${T('royalti periode terakhir','last period royalty')}</span></div><div><b class="n">${rels}</b><span>${T('rilisan','releases')}</span></div><div><b class="n">${l?.held?jt134(l.held):'—'}</b><span>${T('dana ditahan','funds on hold')}</span></div><div><b>${l?.last?fdate135(l.last):'—'}</b><span>${T('aktivitas terakhir','last activity')}</span></div></div>
    <div class="sbtns136"><button type="button" class="sbtn136" data-action="v4-module" data-id="releases">${T('Rilisan','Releases')} ${svg135('arrow',2)}</button><button type="button" class="sbtn136" data-action="v4-module" data-id="withdraw">${T('Penarikan','Withdrawals')} ${svg135('arrow',2)}</button><button type="button" class="sbtn136" data-action="inbox131-page" data-id="c:all">${T('Pesan','Messages')} ${svg135('arrow',2)}</button></div>`);
  if(x.why.length)b+=sec136(k++,T('Perlu perhatian','Needs attention'),`<div class="attn136">${x.why.map(w=>{const btn=w[2]==='renew'&&l?`data-action="renew9" data-id="${E(l.id)}"`:w[2]==='held'?`data-action="nav" data-page="liability9"`:w[2]==='ver'?`data-l136-tab="ver"`:w[2]==='access'&&l?`data-action="label-detail9" data-id="${E(l.id)}"`:`data-action="inbox131-page" data-id="c:all"`;
      const lab=w[2]==='renew'?T('Perpanjang paket','Renew plan'):w[2]==='held'?T('Buka pemantauan','Open monitoring'):w[2]==='ver'?T('Buka Verifikasi','Open Verification'):w[2]==='access'?T('Tinjau akses','Review access'):T('Kirim pesan','Send message');
      return `<div class="${w[1]}"><i></i><span>${E(w[0])}</span><button type="button" class="sbtn136" ${btn}>${lab}</button></div>`;}).join('')}</div>`);
  b+=sec136(k++,T('Identitas & dokumen','Identity & documents'),`<div class="raw136">${identityDetails102(m)}</div>`);
  b+=sec136(k++,T('Rekening penerima','Payout account'),`<div class="raw136">${String(payoutCardUI(m.bank.approved)).replace(/Pemilik rekening/g,T('Nama di rekening','Account name'))}</div><p class="note136">${T('Perubahan rekening selalu lewat Verifikasi.','Bank changes always go through Verification.')}</p>`);
  b+=sec136(k++,T('Kontrak','Contract'),`<div class="raw136">${contractSummary102(m)}</div>`);
  b+=sec136(k++,T('Paket, kredit & tarif','Plan, credits & rate'),`<div class="facts135"><span>${T('Paket','Plan')}</span><b>${plan136(m)}</b><span>${T('Masa paket','Plan period')}</span><b>${expiry103(m)}</b><span>${T('Kredit tersedia','Available credits')}</span><b>${availablePending(m)}</b><span>${T('Tarif royalti','Royalty rate')}</span><b>${m.royaltyRate??60}% ${T('untuk label','to label')}</b></div>
    <div class="sbtns136">${l?`<button type="button" class="sbtn136" data-action="renew9" data-id="${E(l.id)}">${T('Perpanjang paket','Renew plan')}</button>`:''}<button type="button" class="sbtn136" data-v104="rate-edit" data-id="${E(m.id)}">${T('Ubah tarif','Change rate')}</button></div>`);
  b+=sec136(k++,T('Akses & tindakan','Access & actions'),`<div class="facts135"><span>${T('Akses','Access')}</span><b>${accChip136(x)}</b><span>${T('Aktivitas','Activity')}</span><b>${E(actTxt136(x))}</b>${l?`<span>${T('Verifikasi','Verification')}</span><b>${E(verification9(l).status==='verified'?T('Terverifikasi','Verified'):verification9(l).status==='review'?T('Dalam peninjauan','Under review'):T('Belum terverifikasi','Not verified'))}</b>`:''}</div>
    <div class="sbtns136">${l?`<button type="button" class="sbtn136" data-action="label-detail9" data-id="${E(l.id)}">${T('Detail pemantauan','Monitoring detail')}</button>`:''}<button type="button" class="sbtn136" data-l136-soon="${T('Batasi atau tangguhkan akses','Restrict or suspend access')}">${x.acc==='normal'?T('Batasi akses','Restrict access'):T('Pulihkan akses','Restore access')}</button><button type="button" class="sbtn136 dan" data-l136-soon="Blacklist">Blacklist</button></div>
    <p class="note136">${T('Blacklist mengakhiri semua sesi label dan selalu lewat persetujuan Super Admin.','Blacklisting ends every session and always needs Super Admin approval.')}</p>`);
  const kids=l?.master?(l.children||[]).map(c=>(data.v9.labels||[]).find(y=>y.id===c.id)).filter(Boolean):[];
  b+=sec136(k++,T('Akun & multi-label','Account & multi-label'),`<div class="facts135"><span>${T('Email login','Login email')}</span><b>${E(m.email)}</b><span>Status</span><b>${l?.master?T('Master multi-label','Multi-label master'):T('Label tunggal','Single label')}</b></div>${kids.length?`<div class="kids136">${kids.map(c=>`<div>${lav136({id:c.id,name:c.name})}<span>${E(c.name)}</span><small>${E(c.id)}</small></div>`).join('')}</div>`:''}
    <div class="sbtns136"><button type="button" class="sbtn136" data-l136-soon="${T('Ganti email','Change email')}">${T('Ganti email','Change email')}</button><button type="button" class="sbtn136" data-l136-soon="${T('Pindah, ganti nama, atau gabung','Move, rename or merge')}">${T('Pindah, ganti nama, atau gabung','Move, rename or merge')}</button></div>`);
  if(x.legacy)b+=sec136(k++,T('Data lama','Legacy data'),`<div class="facts135"><span>${T('Lokasi operasional','Operating location')}</span><b>${statusBadge111(T('Belum lengkap','Incomplete'),'mustard')}</b><span>${T('Batas pembaruan','Update window')}</span><b>${T('30 hari sejak login pertama','30 days from first login')}</b></div><div class="sbtns136"><button type="button" class="sbtn136" data-pending="cleanup-open" data-id="${E(m.id)}">${T('Periksa data','Review details')}</button></div><p class="note136">${T('Tidak ada penonaktifan otomatis.','No automatic deactivation.')}</p>`);
  const ev=history136(x);
  b+=sec136(k++,T('Riwayat perubahan','Change history'),ev.length?`<div class="tl136">${ev.map(([at,who,t])=>`<div><span class="mini134">${E(who)}</span><span>${E(t)}<small>${fdate135(String(at).slice(0,10))}</small></span></div>`).join('')}</div>`:`<p class="note136">${T('Belum ada perubahan tercatat.','No changes recorded yet.')}</p>`);
  return `<div class="hd135"><button type="button" class="back135" data-l136-back>${svg135('back',2)}${T('Semua label','All labels')}</button>
    <div class="head136">${lav136(m,'big')}<div><h2>${E(m.name)}</h2><div class="meta135">${plan136(m)}${accChip136(x)}<span>${E(actTxt136(x))}</span></div></div></div>
    <p class="where135">${E(m.id)} · ${E(m.email)}</p></div><div class="pb135">${b}</div>`;
}
function calonPane136(x){
  const m=x.m,c=activationCount10(m),steps=[T('Daftar','Sign up'),T('Bayar','Pay'),T('Identitas','Identity'),T('Rekening','Bank'),T('Kontrak','Contract'),T('Aktif','Active')],at=Math.min(c,4)+1;
  const need=[[T('Pembayaran paket','Plan payment'),!!m.paid],[T('Dokumen identitas','Identity document'),!!m.identity?.document],[T('Rekening penerima','Payout account'),!!m.bank?.approved],[T('Persetujuan kontrak','Contract acceptance'),!!(m.contractSignatures102||[]).length]];
  return `<div class="hd135"><button type="button" class="back135" data-l136-back>${svg135('back',2)}${T('Calon member','Prospective members')}</button>
    <div class="head136">${lav136(m,'big')}<div><h2>${E(m.name)}</h2><div class="meta135">${plan136(m)}<span>${m.paid?T('Sudah dibayar','Paid'):T('Belum dibayar','Unpaid')}</span><i></i><span>${E(m.email)}</span></div></div></div>
    <div class="hrow135">${m.application?.status==='pending'?`<button type="button" class="pbtn135" data-ten="identity" data-id="${E(m.id)}">${T('Periksa pendaftaran','Review application')} ${svg135('arrow',2)}</button>`:`<button type="button" class="pbtn135" data-l136-remind="${E(m.id)}">${T('Ingatkan label','Remind label')} ${svg135('arrow',2)}</button>`}<button type="button" class="obtn135" data-action="inbox131-page" data-id="c:all">${T('Kirim pesan','Send message')}</button></div></div>
    <div class="pb135">${sec136(0,T('Tahapan','Stages'),`<div class="steps135" style="--n:${steps.length}"><i class="prog135" style="--w:calc(100% * ${at} / ${steps.length})"></i>${steps.map((s,i)=>`<div class="st135 ${i<at?'done':i===at?'now':''}" style="--j:${i}"><span class="b135">${i<at?svg135('check',2.6):''}</span><span>${s}</span></div>`).join('')}</div>`)}
    ${sec136(1,T('Yang masih kurang','Still missing'),`<div class="checks136">${need.map(([t,ok])=>`<div class="${ok?'ok':''}"><b>${ok?svg135('check',2.6):'·'}</b>${t}<small>${ok?T('Selesai','Done'):T('Belum','Not yet')}</small></div>`).join('')}</div>`,`${need.filter(n=>n[1]).length} ${T('dari','of')} ${need.length}`)}
    ${sec136(2,T('Data pendaftaran','Sign-up data'),`<div class="facts135"><span>Email</span><b>${E(m.email)}</b><span>${T('Paket dipilih','Chosen plan')}</span><b>${plan136(m)}</b><span>${T('Kode','Code')}</span><b>${E(m.id)}</b>${m.joined?`<span>${T('Mendaftar','Signed up')}</span><b>${fdate135(m.joined)}</b>`:''}</div>`)}</div>`;
}
function verPane136(v){
  let b='',k=0;const mask=n=>n?'•••• '+String(n).slice(-4):'—',bank=x=>x?`${E(typeof directoryBankDisplay==='function'?directoryBankDisplay(x.bank):x.bank)}<br><small>${mask(x.number)} · a.n. ${E(x.holder||'')}</small>`:'—';
  if(v.nw)b+=sec136(k++,T('Lama → baru','Old → new'),`<div class="cmp136"><div><small>${T('Rekening sekarang','Current account')}</small>${bank(v.old)}</div>${svg135('arrow',2)}<div class="nw"><small>${T('Rekening baru','New account')}</small>${bank(v.nw)}</div></div>`);
  if(v.fields?.length)b+=sec136(k++,T('Data yang diubah','Changed fields'),`<div class="chips135">${v.fields.map(f=>statusBadge111(f,'blue')).join('')}</div>`);
  if(v.op)b+=sec136(k++,T('Rincian','Details'),`<p class="para135">${E(L(v.op.detail))}</p>${v.op.policy?`<p class="fine135"><b>${E(L(v.op.policy.name))}</b> · ${E(L(v.op.policy.desc))}</p>`:''}`);
  if(v.m.application?.snapshot&&v.id.startsWith('app:'))b+=sec136(k++,T('Data pendaftar','Applicant data'),`<div class="facts135"><span>${T('Penanggung jawab','Representative')}</span><b>${E(v.m.application.snapshot.person||'')}</b><span>${T('Alamat','Address')}</span><b>${E(v.m.application.snapshot.address||'')}</b></div>`);
  const x=info136(v.m);
  b+=sec136(k++,'Label',`<button type="button" class="lbl136" data-l136-open="${E(v.m.id)}">${lav136(v.m)}<span><b>${E(v.m.name)}</b><small>${E(String(x.l?labelStatus9('access',x.acc):'Normal'))} · ${E(actTxt136(x))}</small></span>${svg135('arrow',2)}</button>`);
  return `<div class="hd135"><button type="button" class="back135" data-l136-back>${svg135('back',2)}${T('Verifikasi','Verification')}</button>
    <div class="k135"><span class="ty134">${svg135('appr')}</span>${E(v.kind)}${v.op?` · <span class="mono134">${E(v.op.id)}</span>`:''}</div><h2>${E(v.t)}</h2>
    <div class="meta135">${statusBadge111(T('Menunggu keputusan','Awaiting decision'),'mustard')}<span>${E(v.m.name)}</span></div>
    <div class="hrow135"><button type="button" class="pbtn135" ${v.act}>${T('Periksa & putuskan','Review & decide')} ${svg135('arrow',2)}</button></div>
    <p class="where135">${T('Keputusan dibuat di jendela pemeriksaan; hasilnya tercatat di riwayat label.','Decide in the review window; the outcome is recorded in the label history.')}</p></div><div class="pb135">${b}</div>`;
}
function pane136(){
  if(l136.tab==='ver'){const v=ver136().find(x=>x.id===l136.sel);return v?verPane136(v):null;}
  const m=ten.members.find(x=>x.id===l136.sel);if(!m)return null;const x=info136(m);return l136.tab==='calon'?calonPane136(x):labelPane136(x);
}
function page136(){
  return `<div class="d134 w135 l136"><div class="ph135"><div><h1>${T('Manajemen Label','Label Management')}</h1><div class="sub135">${T('Buku induk label: siapa labelnya, bagaimana kondisinya, dan semua perubahan akunnya.','The label register: who they are, how they are doing and every account change.')}</div></div></div>
    ${tabs136()}${l136.tab==='all'?band136():''}
    <div class="wk135">${list136()}<section class="d134-card pane135" data-l136="pane"><div class="pin135">${pane136()||`<div class="empty135" style="padding:60px 20px"><b>${l136.tab==='ver'?T('Pilih pengajuan','Pick a request'):T('Pilih label','Pick a label')}</b>${T('Rinciannya tampil di sini.','Its details show here.')}</div>`}</div></section></div></div>`;
}
/* ---------- pasang ---------- */
function draw136(){
  const main=document.querySelector('#main');if(!main)return;
  const r=visible136(),key=x=>x.id||x.m?.id;
  if(wide135()&&(!l136.sel||!r.some(x=>key(x)===l136.sel)))l136.sel=r[0]?key(r[0]):null;
  const focusQ=document.activeElement?.matches?.('[data-l136-q]');
  main.classList.add('dashboard-main124','work135-main','label136-main');main.innerHTML=page136();
  main.querySelector('.wk135')?.classList.toggle('reading135',!wide135()&&l136.read&&!!l136.sel);
  l136.io?.disconnect();const cards=[...main.querySelectorAll('.rv135')];
  if(RM135())cards.forEach(c=>c.classList.add('in'));
  else{cards.forEach(c=>{if(l136.seen.has(c.dataset.l136))c.classList.add('in','still135');});
    l136.io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){l136.io.unobserve(e.target);e.target.classList.add('in');l136.seen.add(e.target.dataset.l136);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'});
    cards.filter(c=>!c.classList.contains('in')).forEach(c=>l136.io.observe(c));}
  const p=main.querySelector('.pane135');if(p){p.classList.toggle('stick135',wide135()&&p.offsetHeight<=innerHeight-110);
    const k=l136.tab+':'+l136.sel;if(k!==l136.last&&!RM135()){l136.last=k;p.classList.remove('play135');void p.offsetWidth;p.classList.add('play135');}}
  if(focusQ){const q=main.querySelector('[data-l136-q]');q?.focus();q?.setSelectionRange(q.value.length,q.value.length);}
}
const renderBefore136=render;
render=function(){
  const out=renderBefore136.apply(this,arguments);
  try{
    if(!isLabel10()&&me().super)document.querySelectorAll('.side-scroll [data-pending="cleanup-page"],.side-scroll [data-id="cleanup-page"]').forEach(el=>el.remove());
    if(on136())draw136();else document.querySelector('#main')?.classList.remove('label136-main');
  }catch(err){console.warn('label136',err);}
  return out;
};
function open136(id){l136.sel=id;l136.read=true;draw136();const wk=document.querySelector('.label136-main .wk135'),pane=document.querySelector('.label136-main .pane135');
  if(!wide135()||(pane&&pane.getBoundingClientRect().top<80))wk?.scrollIntoView({behavior:RM135()?'auto':'smooth',block:'start'});}
document.addEventListener('click',e=>{
  if(!on136())return;
  const t=e.target,hit=t.closest('[data-l136-tab],[data-l136-seg],[data-l136-remind],[data-l136-soon],[data-l136-open],[data-l136-back],[data-l136-row]');
  if(!hit)return;
  if(hit.matches('[data-l136-row]')&&t.closest('button'))return; // tombol aksi asli di dalam baris
  e.preventDefault();e.stopImmediatePropagation();
  if(hit.dataset.l136Tab){l136.tab=hit.dataset.l136Tab;l136.sel=null;l136.read=false;l136.seg='';draw136();scrollTo({top:0,behavior:RM135()?'auto':'smooth'});return;}
  if(hit.dataset.l136Seg){l136.seg=l136.seg===hit.dataset.l136Seg?'':hit.dataset.l136Seg;l136.read=false;draw136();return;}
  if(hit.dataset.l136Remind){const m=ten.members.find(x=>x.id===hit.dataset.l136Remind);say135(T(`Pengingat dikirim ke ${m?.name} (simulasi)`,`Reminder sent to ${m?.name} (simulation)`));return;}
  if(hit.dataset.l136Soon){say135(T(`${hit.dataset.l136Soon}: mengikuti alur produksi (pengajuan → persetujuan Super Admin); belum disimulasikan di prototipe.`,`${hit.dataset.l136Soon}: follows the production flow; not simulated in the prototype yet.`));return;}
  if(hit.dataset.l136Open){l136.tab='all';l136.seg='';l136.sel=hit.dataset.l136Open;draw136();return;}
  if(hit.hasAttribute('data-l136-back')){l136.read=false;draw136();document.querySelector('.label136-main .wk135')?.scrollIntoView({block:'start'});return;}
  if(hit.dataset.l136Row){open136(hit.dataset.l136Row);return;}
},true);
document.addEventListener('input',e=>{if(on136()&&e.target.matches?.('[data-l136-q]')){l136.q=e.target.value.toLowerCase();draw136();}});
addEventListener('resize',()=>{if(on136())draw136();});
