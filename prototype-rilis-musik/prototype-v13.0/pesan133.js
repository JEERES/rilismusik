/* dev.23 — Pesan: chat label ↔ Rilis Musik dalam satu pintu (pilihan pemilik, 19 Okt 2026).
   - Label: menu "Tiket Bantuan" menjadi "Pesan" (tampilan chat: daftar · percakapan), ikon chat di header.
     "Pesan baru" untuk topik apa saja; "Permintaan khusus" membuka formulir katalog yang sudah ada.
   - Setiap percakapan tetap tiket Tickets112 di balik layar (status, penanggung jawab, riwayat).
     Linimasa dibangun dari t.history (urutan nyata semua tindakan), bukan data ganda.
   - Super Admin/Admin: Kotak Masuk membaca semua tiket label sebagai percakapan; balasan, catatan
     internal, "Tangani" dan "Tandai selesai" memakai tindakan Tickets112 yang sama. */
const pesan133={sel:null,tab:'all',q:'',compose:null,key:''};
const topics133=[['general','Pertanyaan umum','General question','general'],['account','Akun & profil','Account & profile','general'],['billing','Paket & tagihan','Plans & billing','general'],['royalty','Royalti & penarikan','Royalties & withdrawals','royalty-issue']];
const lstate133={submitted:['Terkirim · menunggu tim','Sent · awaiting the team'],handling:['Sedang ditangani','In progress'],label:['Perlu tanggapanmu','Needs your reply'],distributor:['Menunggu distributor','Awaiting distributor'],done:['Selesai','Done']};
const map131s133={submitted:'submitted',handling:'handling',label:'awaiting_label',distributor:'awaiting_distributor',done:'completed'};
const sys133={claim:['ditangani oleh','is now handled by'],assign:['dialihkan ke','reassigned to'],request:['Tim meminta kelengkapan','The team requested more information'],send:['Diteruskan ke distributor','Forwarded to the distributor'],finish:['Percakapan diselesaikan','Conversation closed'],reopen:['Percakapan dibuka kembali','Conversation reopened']};
const isAccount133=t=>String(t.release||'').startsWith('account:');
const subject133=t=>t.request?.subject133||(isAccount133(t)?names112[t.category]:`${names112[t.category]} · ${t.source?.title||''}`);
const staffName133=id=>{try{return person(id)?.name||id;}catch{return id;}};
const seen133=()=>(ten.pesanSeen133=ten.pesanSeen133||{});
/* indeks entri publik terakhir dari staf (untuk titik "belum dibaca" di sisi label) */
function lastStaff133(t){let k=-1;t.history.forEach((h,i)=>{if(h.public!==false&&h.actor!==t.account&&!RM10.getMember(ten,h.actor)&&h.action!=='created')k=i;});return k;}
const unread133=t=>lastStaff133(t)>=(seen133()[t.id]??0);
function labelRows133(){return rows112().sort((a,b)=>b.updated-a.updated||b.id.localeCompare(a.id));}

/* ---------- linimasa ---------- */
function timeline133(t,forStaff=false){
  const labelName=RM10.getMember(ten,t.account)?.name||t.account,out=[];
  t.history.forEach(h=>{
    const fromLabel=h.actor===t.account||!!RM10.getMember(ten,h.actor),at=date10(h.at,true);
    if(['created','message','complete','report-again'].includes(h.action)&&h.note){out.push({kind:'msg',label:fromLabel,who:fromLabel?labelName:h.actor,text:h.note,at,act:h.action});return;}
    if(h.action==='internal'){if(forStaff)out.push({kind:'note',who:h.actor,text:h.note,at});return;}
    if(h.public===false)return;
    const s=sys133[h.action];if(!s)return;
    const txt=h.action==='claim'||h.action==='assign'?`${L(s)} ${staffName133(h.action==='assign'?t.handler:h.actor)}`:L(s)+(h.note?': '+h.note:'');
    out.push({kind:'sys',text:txt,at});
  });
  return out;
}

/* ---------- label: halaman Pesan ---------- */
function rowLabel133(t){
  const tl=timeline133(t).filter(x=>x.kind==='msg'),last=tl[tl.length-1],u=unread133(t)&&t.id!==pesan133.sel;
  return `<button type="button" class="row131 ${t.id===pesan133.sel?'active':''} ${u?'unread':''}" data-p133="sel" data-id="${E(t.id)}"><span class="avatar lead131">${t.status==='done'?'✓':'RM'}</span><span class="row-main131"><span class="row-top131"><strong>${E(subject133(t))}</strong><time>${date10(t.updated)}</time></span><span class="row-meta131"><span class="code131">${E(t.id)}</span>${L(lstate133[t.status]||lstate133.submitted)}</span><span class="row-sub131">${last?(last.label?T('Kamu: ','You: '):'')+E(last.text.split('\n')[0]):''}</span></span>${u?'<i class="udot131"></i>':''}</button>`;
}
function bubble133(m){
  if(m.kind==='sys')return `<div class="sys133"><span>${E(m.text)} · ${E(m.at)}</span></div>`;
  return `<div class="msg131 ${m.label?'mine':''}"><span class="msg-who131">${m.label?T('Kamu','You'):`${T('Tim Rilis Musik','Rilis Musik team')} · ${E(staffName133(m.who))}`} · ${E(m.at)}</span><p>${E(m.text).replace(/\n/g,'<br>')}</p></div>`;
}
function composeLabel133(){
  const c=pesan133.compose,fixed=c.refund;
  return `<article class="cha-mid131"><header class="thread-head131"><span class="avatar lead131 big">RM</span><div class="th-id131"><h2>${fixed?T('Pengembalian dana layanan lama','Legacy service refund'):T('Pesan baru','New message')}</h2><small>${T('Dikirim ke tim Rilis Musik · dibalas di halaman ini','Sent to the Rilis Musik team · replies arrive here')}</small></div></header>
  <form class="new133" data-form="p133-new">${fixed?'':`<label>${T('Topik','Topic')}<select name="topic">${topics133.map(([id,a,b])=>`<option value="${id}" ${c.topic===id?'selected':''}>${T(a,b)}</option>`).join('')}</select></label>`}
  <label>${T('Pesan','Message')}<textarea name="note" rows="${fixed?7:5}" required maxlength="3000" placeholder="${T('Tulis pertanyaan atau kebutuhanmu…','Write your question or request…')}">${E(c.note||'')}</textarea></label>
  ${fixed?`<p class="hint131">${T('Lengkapi rekening tujuan. Bukti pembelian boleh menyusul di percakapan ini.','Fill in the destination account. Proof of purchase can follow in this conversation.')}</p>`:''}
  <div class="tr-acts132"><button type="submit" class="btn primary">${T('Kirim','Send')}</button><button type="button" class="btn" data-p133="cancel">${T('Batal','Cancel')}</button></div></form></article>`;
}
function pesanPage133(){
  if(!allowed112())return denied9();
  const all=labelRows133(),q=pesan133.q.toLowerCase();
  let list=all.filter(t=>pesan133.tab==='all'||pesan133.tab==='reply'&&t.status==='label'||pesan133.tab==='open'&&t.status!=='done'||pesan133.tab==='done'&&t.status==='done');
  if(q)list=list.filter(t=>(subject133(t)+' '+t.id+' '+timeline133(t).map(x=>x.text).join(' ')).toLowerCase().includes(q));
  if(!pesan133.compose&&!list.some(t=>t.id===pesan133.sel))pesan133.sel=list[0]?.id||null;
  const tabs=`<div class="cha-tabs131">${[['all',T('Semua','All'),0],['open',T('Berjalan','Open'),0],['reply',T('Perlu tanggapan','Needs reply'),all.filter(t=>t.status==='label').length],['done',T('Selesai','Done'),0]].map(([id,l,n])=>`<button type="button" class="${pesan133.tab===id?'on':''}" data-p133="tab" data-id="${id}">${l}${n?` <b>${n}</b>`:''}</button>`).join('')}</div>`;
  const left=`<aside class="cha-list131"><header class="cha-lhead131 p-head133"><h2>${T('Pesan','Messages')}</h2><div class="p-new133"><button type="button" class="btn primary small" data-p133="new">${T('Pesan baru','New message')}</button><button type="button" class="btn small" data-p133="special" title="${T('Ubah metadata, ganti audio/cover, takedown, Content ID…','Metadata, audio/cover changes, takedown, Content ID…')}">${T('Permintaan khusus','Special request')}</button></div></header>${tabs}<div class="search131">${svg131('all')}<input type="search" data-p133-search value="${E(pesan133.q)}" placeholder="${T('Cari percakapan…','Search conversations…')}" aria-label="${T('Cari','Search')}"></div><div class="rows131i">${list.map(rowLabel133).join('')||`<p class="hint131 pad131">${T('Belum ada percakapan. Mulai dengan “Pesan baru”.','No conversations yet. Start with “New message”.')}</p>`}</div></aside>`;
  if(pesan133.compose)return `<section class="pesan133">${left}${composeLabel133()}</section>`;
  const t=all.find(x=>x.id===pesan133.sel);
  if(!t)return `<section class="pesan133">${left}<article class="cha-mid131">${empty(T('Belum ada percakapan','No conversation yet'))}</article></section>`;
  if(lastStaff133(t)>=(seen133()[t.id]??0)){seen133()[t.id]=t.history.length;setTimeout(()=>save10(),0);}
  const st=L(lstate133[t.status]||lstate133.submitted),done=t.status==='done',need=t.status==='label';
  const composer=done?`<div class="composer131 p-done133"><p class="hint131">${T('Percakapan ini sudah selesai. Untuk hal baru, mulai “Pesan baru”.','This conversation is closed. Start a “New message” for anything new.')}</p></div>`
    :`<form class="composer131" data-form="p133-reply" data-id="${E(t.id)}" data-version="${t.version}">${need?`<div class="need133">${T('Tim meminta','The team asked')}: ${E(t.required||'')}</div>`:''}<div class="compose-row131"><textarea name="note" rows="2" placeholder="${need?T('Kirim kelengkapan yang diminta…','Send the requested information…'):T('Tulis balasan…','Write a reply…')}" aria-label="${T('Pesan','Message')}"></textarea><button type="submit" class="btn primary small">${T('Kirim','Send')}</button></div></form>`;
  const mid=`<article class="cha-mid131"><header class="thread-head131"><span class="avatar lead131 big">RM</span><div class="th-id131"><h2>${E(subject133(t))}</h2><small><span class="code131">${E(t.id)}</span>${T('Dibuka','Opened')} ${date10(t.created)}${t.handler?` · ${T('ditangani','handled by')} ${E(staffName133(t.handler))}`:''}</small></div><div class="th-ctl131">${statusBadge111(st,done?'green':need?'mustard':t.status==='submitted'?'neutral':'blue')}${isAccount133(t)?'':B112(T('Rincian permintaan','Request details'),'detail',t.id,'small')}</div></header><div class="msgs131">${timeline133(t).map(bubble133).join('')}</div>${composer}</article>`;
  return `<section class="pesan133">${left}${mid}</section>`;
}
const page112Before133=page112;
page112=function(){return isLabel10()?pesanPage133():page112Before133();};

function sendLabel133(f){
  const v=Object.fromEntries(new FormData(f)),note=String(v.note||'').trim();if(!note)return;
  try{
    if(f.dataset.form==='p133-new'){
      const c=pesan133.compose||{},topic=topics133.find(x=>x[0]===v.topic)||topics133[0],cat=c.refund?'general':topic[3];
      const p=fresh112('',cat);p.note=note;p.subject133=c.refund?T('Pengembalian dana layanan lama','Legacy service refund'):T(topic[1],topic[2]);if(c.refund)p.refund132=true;
      const id=run112('create',p);pesan133.compose=null;pesan133.sel=id;pesan133.tab='all';seen133()[id]=(ticket112(id)?.history.length||1);
      toast(T('Pesan terkirim. Balasan tim akan muncul di sini.','Message sent. The team will reply here.'));
    }else{
      const t=ticket112(f.dataset.id);if(!t)return;
      run112(t.status==='label'?'complete':'message',{id:t.id,version:+f.dataset.version,note,files:[]});
    }
    save10();render();const box=document.querySelector('.pesan133 .msgs131');if(box)box.scrollTop=box.scrollHeight;
  }catch(err){toast(err.message||String(err));}
}

/* ---------- Kotak Masuk staf: semua tiket label sebagai percakapan ---------- */
function liveThreads133(){
  if(typeof Tickets112==='undefined'||!allowed112())return [];
  return Tickets112.init(ten).tickets.filter(t=>Tickets112.visible(actor112(),t)).map(t=>{
    const name=RM10.getMember(ten,t.account)?.name||t.account,tl=timeline133(t,true);
    const items=tl.map(x=>x.kind==='sys'?{kind:'sys',who:'',text:[x.text,x.text],at:x.at}:{kind:x.kind,who:x.label?name:x.who,text:[x.text,x.text],at:x.at});
    const pub=tl.filter(x=>x.kind==='msg'),last=pub[pub.length-1];
    return {id:'k:'+t.id,type:'ticket',live:t,tk:{id:t.id,obj:names112[t.category],status:map131s133[t.status]||'submitted',label:name,subject:[subject133(t),subject133(t)],notes:[]},
      time:date10(t.updated),title:name,sub:subject133(t),code:t.id,items,last:last?last.text.split('\n')[0]:'',waiting:!!last&&last.label&&t.status!=='done',k:t.updated};
  }).sort((a,b)=>b.k-a.k);
}
const bubbleBefore133=bubble131;
bubble131=function(m){return m.kind==='sys'?`<div class="sys133"><span>${E(msgText131(m))} · ${E(m.at||'')}</span></div>`:bubbleBefore133(m);};
const threadsBefore133=threads131;
threads131=function(){const base=threadsBefore133(),live=liveThreads133(),ids=new Set(live.map(x=>x.code));return [...live,...base.filter(x=>!ids.has(x.code))];};
const midBefore133=chatMid131;
chatMid131=function(x){const html=midBefore133(x);if(!x.live||x.live.status!=='done')return html;return html.replace(/<form class="composer131[\s\S]*<\/form>/,`<div class="composer131 p-done133"><p class="hint131">${t('Percakapan sudah selesai. Label dapat memulai pesan baru.','Conversation closed. The label can start a new message.')}</p></div>`);};
const ctxBefore133=chatCtx131;
chatCtx131=function(x){
  if(!x.live)return ctxBefore133(x);
  const tk=x.live,idx=ticketSteps131.findIndex(s=>s[0]===x.tk.status),lab=RM10.getMember(ten,tk.account);
  const acts=[tk.status==='submitted'&&!tk.handler?`<button type="button" class="btn small primary" data-p133="claim" data-id="${E(tk.id)}">${t('Tangani','Take it')}</button>`:'',
    isAccount133(tk)&&tk.status!=='done'?`<button type="button" class="btn small" data-p133="finish" data-id="${E(tk.id)}">${t('Tandai selesai','Mark as done')}</button>`:'',
    B112(t('Rincian tiket','Ticket details'),'detail',tk.id,'small')].join('');
  return `<aside class="cha-ctx131">
    <section class="ctx-sec131"><h4>${t('Percakapan','Conversation')}</h4><div class="kv131c"><span>${t('Jenis','Type')}</span><b>${E(names112[tk.category])}</b><span>${t('Topik','Topic')}</span><b>${E(subject133(tk))}</b><span>${t('Dibuka','Opened')}</span><b>${date10(tk.created,true)}</b><span>${t('Penanggung','Owner')}</span><b>${E(tk.handler?staffName133(tk.handler):t('Belum ada','None yet'))}</b></div></section>
    <section class="ctx-sec131"><h4>${t('Tahapan','Stages')}</h4><ol class="vsteps131">${ticketSteps131.map(([k,l],i)=>`<li class="${i<idx?'d':i===idx?'n':''}"><i></i>${L(l)}</li>`).join('')}</ol></section>
    <section class="ctx-sec131"><h4>${t('Tindakan','Actions')}</h4><div class="ctx-acts131">${acts}</div></section>
    <section class="ctx-sec131"><h4>Label</h4><div class="kv131c"><span>${t('Paket','Plan')}</span><b>${E(lab?(typeof Packages122!=='undefined'?Packages122.tier(ten,lab):lab.plan):'—')}</b><span>${t('Percakapan berjalan','Open conversations')}</span><b>${Tickets112.init(ten).tickets.filter(z=>z.account===tk.account&&z.status!=='done').length}</b><span>Email</span><b>${E(lab?.email||'—')}</b></div></section></aside>`;
};
const sendBefore133=sendMessage131;
sendMessage131=function(form){
  const id=inbox131.sel||'';if(!id.startsWith('k:'))return sendBefore133(form);
  const text=form.elements.text.value.trim();if(!text)return;
  try{let t=Tickets112.init(ten).tickets.find(x=>x.id===id.slice(2));if(!t)return;
    const note=inbox131.mode==='note';
    if(!note&&t.status==='submitted'&&!t.handler){run112('claim',{id:t.id,version:t.version});t=Tickets112.init(ten).tickets.find(x=>x.id===t.id);}
    run112(note?'internal':'message',{id:t.id,version:t.version,note:text,files:[]});
    save10();render();const box=document.querySelector('.msgs131');if(box)box.scrollTop=box.scrollHeight;
  }catch(err){toast(err.message||String(err));}
};
function staffAct133(a,id){
  try{let tk=Tickets112.init(ten).tickets.find(x=>x.id===id);if(!tk)return;
    if(a==='claim')run112('claim',{id,version:tk.version});
    else if(a==='finish'){const open=tk.items.filter(i=>i.status!=='confirmed');
      if(open.length){run112('results',{id,version:tk.version,checked:true,note:t('Diselesaikan lewat percakapan.','Resolved in the conversation.'),results:open.map(i=>({id:i.id,status:'confirmed',note:t('Selesai lewat percakapan.','Resolved in the conversation.'),reference:'Percakapan '+id}))});tk=Tickets112.init(ten).tickets.find(x=>x.id===id);}
      run112('finish',{id,version:tk.version,checked:true,note:t('Ditutup lewat Kotak Masuk.','Closed from the Inbox.')});}
    save10();render();toast(t('Percakapan diperbarui (simulasi).','Conversation updated (simulation).'));
  }catch(err){toast(err.message||String(err));}
}

/* ---------- klik, kirim, cari ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-p133]');if(!b)return;const a=b.dataset.p133,id=b.dataset.id;
  e.preventDefault();e.stopImmediatePropagation();
  if(a==='open'){pesan133.compose=null;route112();}
  else if(a==='sel'){pesan133.compose=null;pesan133.sel=id;render();const box=document.querySelector('.pesan133 .msgs131');if(box)box.scrollTop=box.scrollHeight;}
  else if(a==='tab'){pesan133.tab=id;pesan133.sel=null;render();}
  else if(a==='new'){pesan133.compose={topic:'general',note:''};render();document.querySelector('form[data-form="p133-new"] textarea')?.focus();}
  else if(a==='cancel'){pesan133.compose=null;render();}
  else if(a==='special'){new112('','metadata');}
  else if(a==='claim'||a==='finish')staffAct133(a,id);
},true);
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-form="p133-new"],form[data-form="p133-reply"]');if(!f)return;e.preventDefault();e.stopImmediatePropagation();sendLabel133(f);},true);
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&e.target.closest('form[data-form="p133-reply"] textarea')){e.preventDefault();sendLabel133(e.target.form);}});
document.addEventListener('input',e=>{const i=e.target.closest('[data-p133-search]');if(!i)return;pesan133.q=i.value;clearTimeout(pesan133._t);pesan133._t=setTimeout(()=>{const pos=i.selectionStart;render();const n=document.querySelector('[data-p133-search]');if(n){n.focus();n.setSelectionRange(pos,pos);}},180);});

/* ---------- render: nama menu, ikon chat di header label ---------- */
const renderBefore133=render;
render=function(){
  const key=ten.role+':'+ten.member;if(key!==pesan133.key){pesan133.key=key;pesan133.sel=null;pesan133.compose=null;pesan133.tab='all';pesan133.q='';}
  const out=renderBefore133.apply(this,arguments);
  try{if(isLabel10()){
    const link=document.querySelector('.side-scroll [data-t112=route]');if(link&&!link.dataset.p133){link.dataset.p133i='1';const sp=link.querySelector('span');if(sp)sp.textContent=T('Pesan','Messages');const ic=link.querySelector('svg');if(ic)ic.outerHTML=icon('chat');}
    if(state.page==='module'&&v4.module==='tickets'){const path=document.querySelector('.header-path');if(path)path.textContent=T('Label / Pesan','Label / Messages');}
    const bell=document.querySelector('.tools [data-action=notifications]');
    if(bell&&!document.querySelector('.tools [data-p133=open]')){const n=rows112().filter(t=>unread133(t)).length;bell.insertAdjacentHTML('beforebegin',`<button class="iconbtn chat133 ${state.page==='module'&&v4.module==='tickets'?'on':''}" data-p133="open" aria-label="${T('Pesan','Messages')}" title="${T('Pesan','Messages')}">${icon('chat')}${n?'<i class="dot"></i>':''}</button>`);}
  }}catch(err){console.warn('pesan133',err);}
  return out;
};

/* ---------- Studio Pratinjau: skenario dev.23 ---------- */
const studioBefore133=studioStart;
studioStart=async function(id){
  const out=await studioBefore133(id);
  try{
    if(id==='dev23-pesan-label'){role102('label','awan');setTimeout(()=>{if(document.querySelector('#dialog')?.open)closeModal();route112();},400);}
    if(id==='dev23-pesan-super'){openInbox131('c:all');}
  }catch(err){console.warn('scene133',err);}
  return out;
};
