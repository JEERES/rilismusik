/* dev.22 — Transisi layanan lama (Annual / Annual VIP "lifetime" era sistem lama).
   Keputusan pemilik (19 Okt 2026):
   - tidak ada layanan lifetime di Rilis Musik; label yang tidak berkenan mendapat PENGEMBALIAN DANA
     PENUH nilai pembelian, berapa pun lama pemakaiannya, lalu pindah ke paket Basic (boleh upgrade);
   - tanpa email: informasi tampil di aplikasi (saat masuk setelah klaim) dan lewat Berita (broadcast)
     dari Super Admin untuk label yang sudah klaim;
   - pengajuan diteruskan ke halaman pesan ke admin (Tiket Bantuan, isian sudah terisi);
   - batas pengajuan 30 hari sejak pemberitahuan DIBACA; hanya Super Admin yang memutuskan.
   Data layanan lama di bawah adalah CONTOH runtime (bukan data sampel), disimpan di ten.transition132. */
const DAY132=864e5;
const LEGACY132={
  S01:{plan:'Annual VIP',bought:'2021-11-02',amount:2500000,ref:'BLV-INV-2111-0207'},
  S02:{plan:'Annual VIP',bought:'2022-06-18',amount:2500000,ref:'BLV-INV-2206-0118'},
  L02:{plan:'Annual',bought:'2023-02-09',amount:1200000,ref:'BLV-INV-2302-0091'}
};
const steps132=[['submitted',['Diajukan','Submitted']],['checking',['Bukti diperiksa','Proof check']],['approved',['Disetujui','Approved']],['paid',['Dibayar · pindah ke Basic','Paid · moved to Basic']]];
const shown132=new Set();
const rp132=n=>'Rp '+Math.round(n||0).toLocaleString('id-ID');
const day132=s=>typeof s==='number'?s:Date.parse(s+'T09:00:00+07:00');
const memberName132=id=>(RM10.getMember(ten,id)||{}).name||id;

function tr132(){
  if(!ten.transition132){
    const sent=Date.parse('2026-10-01T09:00:00+07:00'),read=Date.parse('2026-10-01T09:12:00+07:00'),req=Date.parse('2026-10-03T10:20:00+07:00');
    ten.transition132={serial:1,notices:[],lifetime:structuredClone(LEGACY132),
      news:[{id:'BR-1',kind:'transition',audience:'lifetime',must:true,at:sent,by:'jeck',reads:{S02:read},
        title:['Layanan Anda berubah','Your service has changed'],
        body:['Layanan lama Annual/VIP tanpa batas waktu diganti paket baru gratis 1 tahun. Jika tidak berkenan, nilai pembelian dikembalikan penuh dalam 30 hari sejak pemberitahuan ini dibaca.','Legacy lifetime Annual/VIP service is replaced by a free 1-year plan. If you do not agree, the purchase value is refunded in full within 30 days of reading this notice.']}],
      requests:[{id:'RF-1',member:'S02',ticket:'TKT-0901',status:'submitted',at:req,note:'Kami tidak berkenan dengan perubahan layanan lifetime menjadi 1 tahun.',bank:'BCA •••• 4821 · a.n. Kopi Senja Records',history:[{status:'submitted',at:req,actor:'S02'}]}]};
  }
  return ten.transition132;
}
/* hanya label yang ada di ruang kerja ini (data sampel dimuat setelah seed) */
const life132=(id=ten.member)=>RM10.getMember(ten,id)&&tr132().lifetime[id]||null;
const lifeIds132=()=>Object.keys(tr132().lifetime).filter(id=>RM10.getMember(ten,id));
const transitionNews132=()=>tr132().news.find(n=>n.kind==='transition');
const readAt132=id=>(transitionNews132()?.reads||{})[id]||null;
const deadline132=id=>readAt132(id)?readAt132(id)+30*DAY132:null;
const daysLeft132=id=>{const d=deadline132(id);return d?Math.ceil((d-ten.now)/DAY132):30;};
const request132=id=>tr132().requests.filter(r=>r.member===id).slice(-1)[0]||null;
const stepName132=s=>s==='rejected'?T('Ditolak','Declined'):L((steps132.find(x=>x[0]===s)||steps132[0])[1]);
function audience132(n){return n.audience==='lifetime'?lifeIds132():ten.members.filter(m=>m.active).map(m=>m.id);}
function pendingNews132(id){return tr132().news.filter(n=>n.must&&audience132(n).includes(id)&&!n.reads[id]);}

/* ---------- data staf: antrean keputusan, notifikasi, percakapan ---------- */
function staffSeed132(r){
  if(typeof data==='undefined'||!data.ops)return;
  const l=life132(r.member);if(!l)return;const name=memberName132(r.member);
  if(!data.ops.some(x=>x.id===r.id))data.ops.push({id:r.id,title:[`Pengembalian dana · ${name}`,`Refund · ${name}`],kind:'approval',area:'platform',created:new Date(r.at).toISOString().slice(0,10),status:'pending',
    detail:[`${l.plan} · ${rp132(l.amount)} · dibeli ${date10(day132(l.bought))}. Diajukan lewat ${r.ticket}.`,`${l.plan} · ${rp132(l.amount)} · bought ${date10(day132(l.bought))}. Requested via ${r.ticket}.`],
    policy:{...(data.workRules||[]).find(w=>w.id==='approval')}});
  const live=typeof Tickets112!=='undefined'&&Tickets112.init(ten).tickets.some(t=>t.id===r.ticket);
  if(!live&&typeof threadStore131==='function'){const st=threadStore131();if(!st.tickets.some(x=>x.id===r.ticket))st.tickets.push({id:r.ticket,label:name,subject:['Pengembalian dana layanan lama','Legacy service refund'],obj:r.id,status:'submitted',msgs:[{who:name,text:[r.note,r.note],at:date10(r.at,true),ts:r.at}],notes:[]});}
  if(data.notifications&&!data.notifications.some(n=>n.id==='N-'+r.id))people.filter(p=>p.super).forEach(p=>data.notifications.unshift({id:'N-'+r.id+(p.id==='jeck'?'':'-'+p.id),target:p.id,title:[`Pengajuan pengembalian dana · ${name}`,`Refund request · ${name}`],body:[`${l.plan} · ${rp132(l.amount)}. Perlu keputusan Super Admin.`,`${l.plan} · ${rp132(l.amount)}. Needs a Super Admin decision.`],obj:r.id,time:date10(r.at,true),read:[]}));
}
function ensure132(){tr132().requests.forEach(staffSeed132);}

/* ---------- label: pemberitahuan ---------- */
function markRead132(n,id){if(!n.reads[id]){n.reads[id]=ten.now;save10();}}
function noticeBody132(){
  const m=member10(),l=life132(m.id);if(!l)return '';
  const n=transitionNews132();markRead132(n,m.id);
  const r=request132(m.id),due=deadline132(m.id),over=ten.now>due,plan=typeof Packages122!=='undefined'?Packages122.tier(ten,m):m.plan;
  const until=m.subscriptionEnd?date10(m.subscriptionEnd):T('1 tahun sejak verifikasi','1 year from verification');
  const acts=r?`<div class="tr-status132"><small>${T('Pengajuan pengembalian dana','Refund request')} · ${E(r.id)}</small><b>${stepName132(r.status)}</b>${r.status==='rejected'&&r.reason?`<p>${E(r.reason)}</p>`:''}</div>`
    :over?`<p class="tr-due132">${T('Masa pengajuan berakhir pada','The request window ended on')} <b>${date10(due)}</b>.</p>`
    :`<div class="tr-acts132"><button type="button" class="btn primary" data-tr132="continue">${T('Lanjutkan dengan paket baru','Continue with the new plan')}</button><button type="button" class="btn" data-tr132="refund">${T('Ajukan pengembalian dana','Request a refund')}</button></div>`;
  return `<div class="tr132">
    <p class="tr-lead132">${T(`Sebelumnya <b>${E(m.name)}</b> memakai layanan <b>${E(l.plan)}</b> di sistem lama: rilis tanpa batas dan layanan tambahan, tanpa batas waktu.`,`<b>${E(m.name)}</b> previously used <b>${E(l.plan)}</b> on the old system: unlimited releases and add-on services, with no time limit.`)}</p>
    <div class="tr-cmp132">
      <div><small>${T('Layanan lama','Previous service')}</small><b>${E(l.plan)}</b><span>${T('Rilis tanpa batas · layanan tambahan · tanpa batas waktu','Unlimited releases · add-ons · no time limit')}</span><span>${T('Dibeli','Bought')} ${date10(day132(l.bought))} · ${rp132(l.amount)}</span></div>
      <div><small>${T('Layanan sekarang','Current service')}</small><b>${E(plan)} · ${T('gratis 1 tahun','free for 1 year')}</b><span>${T('Berlaku sampai','Valid until')} ${until}</span></div>
    </div>
    <p>${T(`Kami memahami ini berbeda dari yang Anda beli. Jika Anda tidak berkenan, Rilis Musik <b>mengembalikan nilai pembelian Anda secara penuh (${rp132(l.amount)})</b>, berapa pun lama Anda sudah memakai layanan. Akun tetap aktif dengan paket Basic; rilisan yang sudah tayang tetap tayang, dan saldo royalti tetap milik Anda.`,`We understand this differs from what you bought. If you do not agree, Rilis Musik <b>refunds your purchase in full (${rp132(l.amount)})</b>, however long you have used the service. Your account stays active on the Basic plan; live releases stay live and your royalty balance remains yours.`)}</p>
    ${r||over?'':`<p class="tr-due132">${T('Pengajuan dapat dilakukan sampai','Requests are accepted until')} <b>${date10(due)}</b> · ${T('30 hari sejak pemberitahuan ini dibaca.','30 days after this notice was read.')}</p>`}
    ${acts}</div>`;
}
function openNotice132(){modal10(T('Layanan Anda berubah','Your service has changed'),noticeBody132());}
function openNews132(id){
  const n=tr132().news.find(x=>x.id===id);if(!n)return;
  if(n.kind==='transition')return openNotice132();
  markRead132(n,ten.member);
  modal10(L(n.title),`<div class="tr132"><p class="tr-meta132">${T('Berita dari Rilis Musik','News from Rilis Musik')} · ${date10(n.at)}</p><p>${E(L(n.body)).replace(/\n/g,'<br>')}</p><div class="tr-acts132"><button type="button" class="btn primary" data-ten="close">${T('Saya sudah membaca','I have read this')}</button></div></div>`);
}
function autoNotice132(){
  if(typeof isLabel10!=='function'||!isLabel10()||document.documentElement.classList.contains('booting131'))return;
  const d=document.querySelector('#dialog'),m=member10();if(!d||d.open||!m)return;
  const n=pendingNews132(m.id)[0];if(!n||shown132.has(m.id+n.id))return;
  shown132.add(m.id+n.id);setTimeout(()=>{const dd=document.querySelector('#dialog');if(dd&&!dd.open&&isLabel10()&&ten.member===m.id)openNews132(n.id);},300);
}
function startRefund132(){
  const m=member10(),l=life132(m.id);if(!l)return;
  if(request132(m.id)&&request132(m.id).status!=='rejected')return toast(T('Pengajuan sudah tercatat.','A request already exists.'));
  if(ten.now>deadline132(m.id))return toast(T('Masa pengajuan sudah berakhir.','The request window has ended.'));
  if(typeof closeModal==='function')closeModal();document.querySelector('#dialog')?.close();
  const note=T(`Pengajuan pengembalian dana layanan lama.\nLayanan lama: ${l.plan} (dibeli ${date10(day132(l.bought))}, ${rp132(l.amount)}, ref ${l.ref}).\nAlasan: tidak berkenan dengan perubahan layanan.\nRekening tujuan: (nama bank · nomor rekening · nama pemilik)\nBukti pembelian: lampirkan bila ada.`,`Legacy service refund request.\nPrevious service: ${l.plan} (bought ${date10(day132(l.bought))}, ${rp132(l.amount)}, ref ${l.ref}).\nReason: I do not agree with the service change.\nDestination account: (bank · account number · holder)\nProof of purchase: attach if available.`);
  /* dev.23: langsung ke Pesan (chat label–admin) dengan percakapan baru yang sudah terisi */
  if(typeof pesan133!=='undefined'){module102('tickets');render();pesan133.compose={refund:true,note};render();return;}
  payload112=fresh112('','general');payload112.refund132=true;payload112.note=note;ui112.draft=null;module102('tickets');render();openForm112();
}
/* tiket umum bertanda refund132 → pengajuan pengembalian dana */
const run112Before132=run112;
run112=function(action,p){
  const id=run112Before132(action,p);
  if(action==='create'&&p&&p.refund132&&isLabel10()){
    const s=tr132(),m=ten.member,at=ten.now,r={id:'RF-'+(++s.serial),member:m,ticket:id,status:'submitted',at,note:String(p.note||'').split('\n').slice(0,3).join(' '),bank:T('lihat percakapan','see conversation'),history:[{status:'submitted',at,actor:m}]};
    if(!readAt132(m))transitionNews132().reads[m]=at;
    s.requests.push(r);staffSeed132(r);
    s.notices.unshift({member:m,key:'refund_submitted132',ref:r.id,at});save10();
  }
  return id;
};
/* kartu perhatian di dashboard label */
const attentionBefore132=labelAttention102;
labelAttention102=function(){
  const html=attentionBefore132();if(!isLabel10())return html;
  const m=member10(),l=life132(m.id);if(!l)return html;
  const r=request132(m.id),read=readAt132(m.id),left=daysLeft132(m.id);
  const title=r?T('Pengembalian dana · ','Refund · ')+stepName132(r.status):!read?T('Pemberitahuan perubahan layanan','Service change notice'):left>0?T(`Perubahan layanan · sisa ${left} hari untuk mengajukan pengembalian dana`,`Service change · ${left} days left to request a refund`):T('Masa pengajuan pengembalian dana berakhir','Refund request window ended');
  const sub=r?`${E(r.id)} · ${rp132(l.amount)} · ${T('diajukan','requested')} ${date10(r.at)}`:`${E(l.plan)} → ${T('paket baru gratis 1 tahun','new free 1-year plan')} · ${T('pengembalian penuh','full refund')} ${rp132(l.amount)}`;
  return `<section class="attention9 ${r&&r.status!=='paid'||!r&&left>0?'blue9':''} tr-att132"><div class="spread"><h2><span class="status-dot9"></span>${title}</h2><button type="button" class="btn small" data-tr132="open">${T('Lihat rincian','View details')}</button></div><p>${sub}</p></section>`+html;
};
/* daftar Pembaruan label: berita + perkembangan pengajuan */
const notificationBefore132=notification10;
notification10=function(){
  const base=notificationBefore132();if(!isLabel10())return base;
  const m=ten.member,news=tr132().news.filter(n=>audience132(n).includes(m));
  const keys={refund_submitted132:['Pengajuan pengembalian dana terkirim.','Refund request sent.'],refund_checking132:['Bukti pembelian sedang diperiksa.','Proof of purchase is being checked.'],refund_approved132:['Pengembalian dana disetujui.','Refund approved.'],refund_paid132:['Pengembalian dana dibayar; paket berubah ke Basic.','Refund paid; plan changed to Basic.'],refund_rejected132:['Pengajuan pengembalian dana ditolak.','Refund request declined.']};
  const own=(tr132().notices||[]).filter(n=>n.member===m&&keys[n.key]).slice(0,3).map(n=>`<div class="ten-item"><div><strong>${L(keys[n.key])}</strong><p>${E(n.ref)} · ${date10(n.at,true)}</p></div></div>`);
  const items=news.slice(-2).reverse().map(n=>`<div class="ten-item"><div><strong>${E(L(n.title))}${n.reads[m]?'':` <span class="tr-new132">${T('Baru','New')}</span>`}</strong><p>${T('Berita','News')} · ${date10(n.at)}</p></div><button type="button" class="btn small" data-tr132="news" data-id="${E(n.id)}">${T('Buka','Open')}</button></div>`);
  return own.join('')+items.join('')+base;
};

/* ---------- Super Admin: keputusan pengembalian dana ---------- */
const opModalBefore132=opModal;
opModal=function(id){if(String(id).startsWith('RF-'))return refundModal132(id);return opModalBefore132(id);};
function refundModal132(id){
  if(!me().super)return;const r=tr132().requests.find(x=>x.id===id);if(!r)return;
  const l=life132(r.member)||{},due=deadline132(r.member),on=due?r.at<=due:true,i=steps132.findIndex(s=>s[0]===r.status);
  const flow=`<ol class="tr-steps132">${steps132.map(([k,n],j)=>`<li class="${r.status==='rejected'?'':j<i?'done':j===i?'now':''}"><i></i><span>${L(n)}</span></li>`).join('')}</ol>`;
  const act=r.status==='submitted'?`<button type="button" class="btn primary" data-tr132="rf-step" data-id="${r.id}" data-to="checking">${t('Mulai periksa bukti','Start proof check')}</button>`
    :r.status==='checking'?`<button type="button" class="btn primary" data-tr132="rf-step" data-id="${r.id}" data-to="approved">${t('Bukti cocok · setujui','Proof matches · approve')}</button><button type="button" class="btn" data-tr132="rf-reject" data-id="${r.id}">${t('Tolak','Decline')}</button>`
    :r.status==='approved'?`<button type="button" class="btn primary" data-tr132="rf-step" data-id="${r.id}" data-to="paid">${t('Catat sudah dibayar','Record as paid')}</button>`:'';
  modal(t('Pengembalian dana','Refund')+' · '+E(memberName132(r.member)),`<div class="tr132">${flow}
    <dl class="tr-facts132"><div><dt>${t('Layanan lama','Previous service')}</dt><dd>${E(l.plan||'—')}</dd></div><div><dt>${t('Nilai dikembalikan','Refund amount')}</dt><dd><b>${rp132(l.amount)}</b></dd></div><div><dt>${t('Tanggal beli','Bought')}</dt><dd>${l.bought?date10(day132(l.bought)):'—'} · ${E(l.ref||'')}</dd></div><div><dt>${t('Diajukan','Requested')}</dt><dd>${date10(r.at,true)} · ${on?t('sebelum batas','within the window'):t('melewati batas','after the window')} ${due?date10(due):''}</dd></div><div><dt>${t('Rekening tujuan','Destination')}</dt><dd>${E(r.bank)}</dd></div><div><dt>${t('Percakapan','Conversation')}</dt><dd><button type="button" class="btn small text" data-tr132="rf-chat" data-id="${E(r.ticket)}">${E(r.ticket)} ↗</button></dd></div></dl>
    ${r.status==='rejected'?`<p class="tr-due132">${t('Ditolak','Declined')}: ${E(r.reason||'')}</p>`:''}
    ${r.status==='paid'?`<p class="tr-due132">${t('Selesai. Label kini memakai paket Basic; rilisan tayang dan saldo royalti tidak berubah.','Done. The label is now on Basic; live releases and royalty balance are unchanged.')}</p>`:''}
    <div id="tr-rej132"></div><div class="tr-acts132">${act}</div>
    <p class="scope-note">${t('Tindakan demo lokal. Tidak ada transfer nyata.','Local demo action. No real transfer.')}</p></div>`);
}
function stepRefund132(id,to,reason=''){
  if(!me().super)return;const r=tr132().requests.find(x=>x.id===id);if(!r)return;
  r.status=to;if(reason)r.reason=reason;r.history.push({status:to,at:ten.now,actor:me().id,note:reason});
  tr132().notices.unshift({member:r.member,key:'refund_'+to+'132',ref:r.id,at:ten.now});
  const op=data.ops.find(x=>x.id===r.id);if(op&&['paid','rejected'].includes(to)){op.status=to==='paid'?'approved-done':'rejected';op.decidedBy=me().id;op.decidedAt=new Date().toISOString();}
  if(to==='paid'){const m=RM10.getMember(ten,r.member);if(m){m.plan='Flex';delete m.previewPlan121;(ten.packages122?.subscriptions||[]).filter(s=>s.member===m.id&&s.status==='active').forEach(s=>s.status='ended');}}
  const tk=typeof threadStore131==='function'&&threadStore131().tickets.find(x=>x.id===r.ticket);
  if(tk){tk.notes.push({who:me().id,text:[`Pengembalian dana: ${stepName132(to)}${reason?' — '+reason:''}.`,`Refund: ${stepName132(to)}${reason?' — '+reason:''}.`],at:t('baru saja','just now'),ts:Date.now()});if(['paid','rejected'].includes(to))tk.status='completed';else if(to!=='submitted')tk.status='handling';}
  save10();render();refundModal132(id);toast(t('Status pengembalian dana diperbarui (simulasi).','Refund status updated (simulation).'));
}

/* ---------- Super Admin: Berita (broadcast) di Kotak Masuk ---------- */
const inboxPageBefore132=inboxPage131;
inboxPage131=function(){
  const sup=me().super,bw=sup?`<button type="button" role="tab" aria-selected="${inbox131.view.startsWith('b:')}" class="${inbox131.view.startsWith('b:')?'on':''}" data-action="inbox131-view" data-id="b:all">${t('Berita','News')}</button>`:'';
  if(sup&&inbox131.view.startsWith('b:'))return newsPage132(bw);
  return inboxPageBefore132().replace(/(<div class="cha-switch131"[^>]*>[\s\S]*?)(<\/div>)/,(m,a,b)=>a+bw+b);
};
function newsPage132(bw){
  const s=tr132(),list=s.news.slice().reverse();
  const sw=`<div class="cha-switch131" role="tablist"><button type="button" role="tab" aria-selected="false" data-action="inbox131-view" data-id="c:all">${t('Percakapan','Conversations')}</button><button type="button" role="tab" aria-selected="false" data-action="inbox131-view" data-id="n:all">${t('Notifikasi','Notifications')}</button>${bw}</div>`;
  if(inbox131.sel!=='new'&&!list.some(n=>n.id===inbox131.sel))inbox131.sel=list[0]?.id||'new';
  const rows=list.map(n=>{const aud=audience132(n),rd=aud.filter(id=>n.reads[id]).length;return `<button type="button" class="row131 ${n.id===inbox131.sel?'active':''}" data-action="inbox131-sel" data-id="${n.id}"><span class="kind-ico131">${svg131('support')}</span><span class="row-main131"><span class="row-top131"><strong>${E(L(n.title))}</strong><time>${date10(n.at)}</time></span><span class="row-meta131"><span class="code131">${E(n.id)}</span>${n.audience==='lifetime'?t('Label layanan lama','Legacy-service labels'):t('Semua label aktif','All active labels')}</span><span class="row-sub131">${rd}/${aud.length} ${t('sudah membaca','have read')}</span></span></button>`;}).join('');
  const left=`<aside class="cha-list131"><header class="cha-lhead131">${sw}</header><div class="cha-subhead131"><small>${list.length} ${t('berita','news items')}</small>${btn(t('Tulis berita','Write news'),'inbox131-sel','data-id="new"','small primary')}</div><div class="rows131i">${rows}</div></aside>`;
  if(inbox131.sel==='new')return `<section class="cha131">${left}<article class="cha-mid131 nmid131"><h2 class="detail-title131">${t('Berita baru','New broadcast')}</h2><form data-form="news132" class="form111 tr-form132"><label>${t('Judul','Title')}<input name="title" required maxlength="90"></label><label>${t('Isi','Message')}<textarea name="body" rows="6" required maxlength="1200"></textarea></label><label>${t('Penerima','Recipients')}<select name="audience"><option value="all">${t('Semua label aktif','All active labels')}</option><option value="lifetime">${t('Label layanan lama (Annual/VIP)','Legacy-service labels (Annual/VIP)')}</option></select></label><label class="check11"><input type="checkbox" name="must" checked><span>${t('Tampilkan sebagai jendela yang wajib dibaca saat label masuk','Show as a must-read window when the label signs in')}</span></label><div class="tr-acts132"><button type="submit" class="btn primary">${t('Kirim berita','Send')}</button></div></form><p class="hint131">${t('Berita tampil di aplikasi label, tanpa email. Sistem mencatat siapa yang sudah membaca.','News appears in the label app, without email. The system records who has read it.')}</p></article><aside class="cha-ctx131"></aside></section>`;
  const n=s.news.find(x=>x.id===inbox131.sel),aud=audience132(n),rd=aud.filter(id=>n.reads[id]);
  const reqs=n.kind==='transition'?s.requests:[],exposure=n.kind==='transition'?aud.reduce((a,id)=>a+(s.lifetime[id]?.amount||0),0):0;
  const mid=`<article class="cha-mid131 nmid131"><div class="eyebrow131">${svg131('support')}<span>${n.audience==='lifetime'?t('Label layanan lama','Legacy-service labels'):t('Semua label aktif','All active labels')}</span><span>·</span><time>${date10(n.at,true)}</time></div><h2 class="detail-title131">${E(L(n.title))}</h2><p class="detail-body131">${E(L(n.body))}</p>${n.kind==='transition'?`<p class="hint131">${t('Label melihat rincian layanan lamanya, nilai pembelian, batas 30 hari sejak membaca, serta tombol “Ajukan pengembalian dana” yang membuka Tiket Bantuan terisi otomatis.','Labels see their previous service, purchase value, the 30-day window from reading, and a “Request a refund” button that opens a pre-filled support ticket.')}</p>`:''}</article>`;
  const ctx=`<aside class="cha-ctx131"><section class="ctx-sec131"><h4>${t('Sudah membaca','Read by')}</h4><div class="tr-read132"><b>${rd.length}</b><span>/ ${aud.length} ${t('label','labels')}</span></div><div class="tr-bar132"><i style="width:${aud.length?rd.length/aud.length*100:0}%"></i></div></section>
    ${n.kind==='transition'?`<section class="ctx-sec131"><h4>${t('Pengembalian dana','Refunds')}</h4><dl class="tr-facts132"><div><dt>${t('Pengajuan','Requests')}</dt><dd>${reqs.length}</dd></div><div><dt>${t('Nilai maksimum bila semua mengajukan','Maximum if everyone requests')}</dt><dd><b>${rp132(exposure)}</b></dd></div></dl></section>`:''}
    <section class="ctx-sec131"><h4>${t('Penerima','Recipients')}</h4><div class="tr-who132">${aud.map(id=>{const r=n.kind==='transition'&&request132(id);return `<div><span>${E(memberName132(id))}</span><small>${n.reads[id]?t('dibaca ','read ')+date10(n.reads[id]):t('belum membaca','not read yet')}${r?` · <button type="button" class="btn small text" data-action="op-detail" data-id="${E(r.id)}">${E(r.id)} · ${stepName132(r.status)}</button>`:''}</small></div>`;}).join('')}</div></section></aside>`;
  return `<section class="cha131">${left}${mid}${ctx}</section>`;
}
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-form="news132"]');if(!f)return;e.preventDefault();e.stopImmediatePropagation();if(!me().super)return;
  const v=Object.fromEntries(new FormData(f)),s=tr132(),n={id:'BR-'+(s.news.length+1),kind:'news',audience:v.audience,must:!!v.must,at:ten.now,by:me().id,reads:{},title:[v.title,v.title],body:[v.body,v.body]};
  s.news.push(n);inbox131.sel=n.id;save10();render();toast(t('Berita terkirim ke aplikasi label (simulasi).','News sent to the label app (simulation).'));},true);

/* ---------- klik ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-tr132]');if(!b)return;const a=b.dataset.tr132,id=b.dataset.id;
  e.preventDefault();e.stopImmediatePropagation();
  if(a==='open')openNotice132();
  else if(a==='news')openNews132(id);
  else if(a==='continue'){document.querySelector('#dialog')?.close();toast(T('Anda melanjutkan dengan paket baru. Pengajuan tetap bisa dilakukan sampai batas waktu.','You continue with the new plan. You can still request a refund until the deadline.'));}
  else if(a==='refund')startRefund132();
  else if(a==='rf-step')stepRefund132(id,b.dataset.to);
  else if(a==='rf-reject'){const box=document.querySelector('#tr-rej132');if(box)box.innerHTML=`<form data-form="rf-reject132" data-id="${E(id)}" class="form111"><label>${t('Alasan penolakan (terlihat oleh label)','Reason (visible to the label)')}<textarea name="reason" rows="2" required></textarea></label><div class="tr-acts132"><button type="submit" class="btn">${t('Tolak pengajuan','Decline request')}</button></div></form>`;}
  else if(a==='rf-chat'){if(typeof closeModal==='function')closeModal();openInbox131('c:all');inbox131.sel='t:'+id;render();}
},true);
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-form="rf-reject132"]');if(!f)return;e.preventDefault();e.stopImmediatePropagation();stepRefund132(f.dataset.id,'rejected',new FormData(f).get('reason'));},true);

/* ---------- render: siapkan data & tampilkan pemberitahuan wajib ---------- */
const renderBefore132=render;
render=function(){try{ensure132();}catch(err){console.warn('transition132',err);}const out=renderBefore132.apply(this,arguments);try{autoNotice132();}catch(err){console.warn('transition132',err);}return out;};

/* ---------- Studio Pratinjau: skenario dev.22 ---------- */
const scenes132={
  'dev22-transition-label':()=>{role102('label','S01');},
  'dev22-news-super':()=>{openInbox131('b:all');inbox131.sel='BR-1';render();},
  'dev22-refund-super':()=>{render();opModal('RF-1');}
};
const studioBefore132=studioStart;
studioStart=async function(id){const out=await studioBefore132(id);if(scenes132[id]){try{scenes132[id]();}catch(err){console.warn('scene132',err);}}return out;};
