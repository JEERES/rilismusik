/* v1.1.0-dev.29 — Rilisan dirancang ulang (rancangan disetujui 21 Okt 2026, mock rel1).
   Tab Dalam proses · Katalog, pita alur 6 tahap, rincian di samping dengan satu langkah berikutnya per tahap.
   Tampilan: wadah Shadow DOM (mount137.js). Data & tindakan: ten.releases, ten.events, RM10.act / run105 (fungsi asli),
   tenggat dari Pengaturan › Prosedur (policy115) — dipakai juga oleh Pekerjaan & Dashboard (due137). */
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
@media (max-width:820px){.flow.f6{grid-template-columns:repeat(6,minmax(96px,1fr))}.relhd{grid-template-columns:64px minmax(0,1fr);gap:14px}.cv.big{width:64px;height:64px;border-radius:14px}.f2{grid-template-columns:1fr}.dueline{margin-left:0;width:100%}.it .rgt .duet{display:none}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Rilisan</h1><div class="sub">Periksa pengajuan, kirim ke Believe, dan pastikan setiap rilisan tayang. Katalog semua label ada di tab kedua.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
/* ---------- tampilan (port langsung dari mock rel1 yang disetujui) ---------- */
let root=null,R=[],lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),NOTE=sv('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
/* status rilisan: [Indonesia, English, kelas] — dibaca sesuai bahasa saat dipakai (ST(k) → [teks, kelas]) */
const STD={submitted:['Menunggu pemeriksaan','Awaiting review','c-bl'],review:['Dalam pemeriksaan','In review','c-bl'],revision:['Menunggu perbaikan label','Awaiting label revision','c-or'],clarification:['Menunggu jawaban petugas','Awaiting assignee reply','c-or'],approved:['Siap dikirim','Ready to send','c-bl'],delivered:['Dalam distribusi','In distribution','c-bl'],followup:['Tindak lanjut Believe','Believe follow-up','c-or'],partial:['Sebagian tayang','Partly live','c-or'],cancel_requested:['Permintaan pembatalan','Cancellation requested','c-or'],live:['Tayang','Live','c-gr'],partial_closed:['Selesai · sebagian tayang','Done · partly live','c-gr'],taken_down:['Diturunkan','Taken down',''],closed:['Ditutup','Closed','']};
const ST=k=>{const v=STD[k];return v?[$t(v[0],v[1]),v[2]]:undefined;};
const FLOW=[['submitted','Diajukan','Submitted'],['review','Diperiksa','In review'],['revision','Perbaikan label','Label revision'],['approved','Siap dikirim','Ready to send'],['delivered','Di Believe','At Believe'],['followup','Tindak lanjut','Follow-up']];
const fln=k=>{const f=FLOW.find(x=>x[0]===k);return $t(f[1],f[2]);};
const PROC=new Set(FLOW.map(f=>f[0]));
const CK=()=>[['cover',$t('Sampul','Cover art'),$t('3000 × 3000 px, tanpa logo toko atau teks terlarang','3000 × 3000 px, no store logos or prohibited text')],['audio','Audio',$t('WAV 44,1 kHz, utuh, sesuai judul','WAV 44.1 kHz, complete, matches the title')],['meta',$t('Metadata & kredit','Metadata & credits'),$t('Judul, artis, pencipta, bahasa, tanda eksplisit','Title, artist, songwriter, language, explicit flag')],['rights',$t('Hak & izin','Rights & permissions'),$t('Pernyataan hak, izin sampel atau lagu cover','Rights statement, sample or cover song permission')],['date',$t('Tanggal rilis','Release date'),$t('Bisa dipenuhi layanan yang dipilih','Achievable with the chosen service')]];
const pS=n=>n===1?'':'s';
const S={tab:'proc',stage:null,cat:'all',q:'',sel:{},read:false,more:20,form:null,pick:null,edit:false};
const TICK={};// centang pemeriksaan per rilisan (hanya di layar, tidak disimpan)
/* tanggal sesuai bahasa (U137 membaca bahasa saat dipanggil) */
const fd=s=>{if(!s)return '—';const [y,m,d]=String(s).slice(0,10).split('-').map(Number);return `${d} ${U137.mon(m-1)} ${y}`;};
const fdt=s=>U137.fd(s);
const dlabel=iso=>U137.dlabel(iso);
const todayLabel=()=>U137.todayLabel();
const dueChipR=r=>r.due==null?'':r.due<0?chip($t(`Terlambat ${-r.due} hari`,`${-r.due} day${pS(-r.due)} overdue`),'c-red'):r.due===0?chip($t('Hari ini','Today'),'c-or'):`<span class="duet">${dlabel(r.dueDate)}</span>`;
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,7);
const cv=(r,big)=>`<span class="cv${big?' big':''}" style="--h:${hue(r.t)}">${NOTE}</span>`;
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':$t('Staf','Staff')]]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="${$t('Belum ada petugas','Unassigned')}">–</span>`;};
const art=r=>r.a?E(r.a):`<span class="noart">${$t('Artis belum diisi','Artist not filled in')}</span>`;
const stt=r=>ST(r.raw)||ST(r.s)||[r.raw,''];
const proc=()=>R.filter(r=>PROC.has(r.s)),cat=()=>R.filter(r=>!PROC.has(r.s));
const match=r=>!S.q||[r.t,r.a,r.l,r.upc,r.isrc,r.id].join(' ').toLowerCase().includes(S.q);
const wide=()=>innerWidth>1240;
function items(){if(S.tab==='proc'){let r=proc().filter(match);if(S.stage)r=r.filter(x=>x.s===S.stage);const o=FLOW.map(f=>f[0]);return r.sort((a,b)=>o.indexOf(a.s)-o.indexOf(b.s)||(a.due??99)-(b.due??99)||String(a.dueDate).localeCompare(String(b.dueDate)));}
 let r=cat().filter(match);if(S.cat!=='all')r=r.filter(x=>S.cat==='live'?['live','partial_closed'].includes(x.s):x.s===S.cat);return r.sort((a,b)=>String(b.d).localeCompare(String(a.d))||a.t.localeCompare(b.t));}
function tabs(){$('tabs').innerHTML=[['proc',$t('Dalam proses','In progress'),proc().length],['cat',$t('Katalog','Catalogue'),cat().length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=proc(),late=P.filter(r=>r.due!=null&&r.due<0).length,today=P.filter(r=>r.due===0).length,free=P.filter(r=>!r.h).length;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Alur rilisan · hari ini','Release flow · today')} ${todayLabel()}</div>
  <h2>${$t(`${P.length} rilisan sedang berjalan`,`${P.length} release${pS(P.length)} in progress`)}</h2><p>${$t(`${late} terlambat · ${today} jatuh tempo hari ini · ${free} belum ada petugas`,`${late} overdue · ${today} due today · ${free} unassigned`)}</p>
  <div class="acts"><button class="wbtn" data-urgent>${$t('Buka yang paling mendesak','Open the most urgent')} ${ARROW}</button><button class="gbtn" data-tab="cat">${$t('Lihat katalog','View catalogue')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${R.filter(r=>['live','partial_closed'].includes(r.s)).length}</b><span>${$t('tayang','live')}</span></div><div class="sbox"><b class="n">${R.filter(r=>r.s==='taken_down').length}</b><span>${$t('diturunkan','taken down')}</span></div></div></div>
  <div class="flow f6">${FLOW.map(([k,ti,te])=>{const g=P.filter(r=>r.s===k),l=g.filter(r=>r.due!=null&&r.due<0).length;return `<button class="fn${l?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${$t(ti,te)}</span><span class="d">${l?$t(l+' terlambat',l+' overdue'):g.length?$t('tepat waktu','on time'):$t('kosong','empty')}</span></button>`;}).join('')}</div>`;}
function row(r,i,mode){return `<div class="it${S.sel[S.tab]===r.id?' sel':''}" data-id="${E(r.id)}" style="--i:${i}">${cv(r)}<div style="min-width:0"><div class="t1">${E(r.t)}${mode==='cat'||r.raw!==r.s?' '+chip(...stt(r)):''}</div><div class="t2">${art(r)} · ${E(r.l)} · ${mode==='cat'?(r.upc?`<span class="mono">${E(r.upc)}</span>`:$t('tanpa UPC','no UPC')):$t('rilis ','release ')+fd(r.d)}</div></div><div class="rgt">${mode==='cat'?`<span class="duet">${fd(r.d)}</span>`:dueChipR(r)+mini(r.h)}</div></div>`;}
function list(){const r=items();let h='';
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari judul, artis, label, UPC, ISRC','Search title, artist, label, UPC, ISRC')}" value="${E(S.q)}"></label>`;
 if(S.tab==='proc'){h+=`<div class="ch"><h3>${$t('Dalam proses','In progress')} <small class="n">${r.length}</small></h3>${find}</div>`;
  if(S.stage)h+=`<div class="flt"><span>${$t('Hanya tahap','Showing only')} <b style="font-weight:500">${fln(S.stage)}</b></span><button data-stage-clear>${$t('Tampilkan semua','Show all')}</button></div>`;
  let cur='',i=0;r.forEach(x=>{if(x.s!==cur){cur=x.s;const n=r.filter(y=>y.s===cur).length;h+=`<div class="gh"><i style="--c:var(${STD[cur][2]==='c-or'?'--orange':'--blue'})"></i><b>${fln(cur)}</b> · ${n}</div>`;}h+=row(x,i++,'proc');});
  if(!r.length){const c=S.q?cat().filter(match).length:0;h+=`<div class="empty"><b>${S.q?$t('Tidak ada di Dalam proses','Nothing in In progress'):$t('Tahap ini kosong','This stage is empty')}</b>${c?`<button class="lnk" data-tab="cat" data-keepq>${$t(`${c} hasil di Katalog`,`${c} result${pS(c)} in Catalogue`)} ${ARROW}</button>`:S.q?$t('Coba kata lain.','Try another word.'):$t('Semua rilisan di tahap ini sudah selesai.','All releases in this stage are done.')}</div>`;}}
 else{const C=cat().filter(match),cnt=k=>k==='all'?C.length:k==='live'?C.filter(x=>['live','partial_closed'].includes(x.s)).length:C.filter(x=>x.s===k).length;
  h+=`<div class="ch"><h3>${$t('Katalog','Catalogue')} <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${[['all',$t('Semua','All')],['live',$t('Tayang','Live')],['taken_down',$t('Diturunkan','Taken down')],['closed',$t('Ditutup','Closed')]].filter(([k])=>k==='all'||k==='live'||cat().some(x=>x.s===k)).map(([k,t])=>`<button data-cat="${k}" aria-pressed="${S.cat===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  r.slice(0,S.more).forEach((x,i)=>h+=row(x,i,'cat'));
  if(r.length>S.more)h+=`<button class="more" data-more>${$t(`Tampilkan ${Math.min(20,r.length-S.more)} lagi · sisa ${r.length-S.more}`,`Show ${Math.min(20,r.length-S.more)} more · ${r.length-S.more} left`)}</button>`;
  if(!r.length){const c=S.q?proc().filter(match).length:0;h+=`<div class="empty"><b>${$t('Tidak ditemukan','No matches')}</b>${c?`<button class="lnk" data-tab="proc" data-keepq>${$t(`${c} hasil di Dalam proses`,`${c} result${pS(c)} in In progress`)} ${ARROW}</button>`:$t('Coba kata lain.','Try another word.')}</div>`;}}
 $('list').innerHTML=h;}
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const reject=r=>S.form==='reject'?`<div class="reveal"><label class="fld">${$t('Alasan penolakan · dikirim ke label','Rejection reason · sent to the label')}<textarea id="f-note" placeholder="${$t('Mis. audio bukan milik label, tanggal tidak bisa dipenuhi…','E.g. the audio is not the label’s, the date cannot be met…')}"></textarea></label><div class="hrow">${btn($t('Tolak pengajuan','Reject request'),'data-do="reject"','dng')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
const rejBtn=r=>S.form==='reject'||!can(r,'reject')?'':btn($t('Tolak','Reject'),'data-form="reject"','ghost dng');
const tick=r=>TICK[r.id+':'+r.ver]||(TICK[r.id+':'+r.ver]={});
function codesBlock(r){
 if(r.upc&&!S.edit)return `<div class="codes"><span><small>UPC</small><b class="mono">${E(r.upc)}</b></span><span><small>ISRC</small><b class="mono">${r.isrcList.filter(Boolean).length>1?r.isrcList.filter(Boolean).length+$t(' kode',' codes'):E(r.isrcList[0]||'—')}</b></span>${can(r,'codes')?`<button class="lnk" data-edit>${$t('Ubah','Edit')}</button>`:''}</div>`;
 if(!can(r,'codes'))return `<p class="where">${$t('UPC & ISRC belum diisi.','UPC & ISRC not filled in yet.')}</p>`;
 const isr=r.flow?`<div class="fld">${$t('ISRC per lagu','ISRC per track')}${r.tracks.map((x,i)=>`<label class="fld" style="margin-top:6px">${E(x.t)}<input id="f-isrc-${i}" value="${E(x.isrc||'')}" placeholder="${$t('12 karakter','12 characters')}"></label>`).join('')}</div>`:`<label class="fld">${$t('ISRC per lagu','ISRC per track')} (${r.tracks.length})<input id="f-isrc" value="${E(r.isrcList.join(','))}" placeholder="${$t('pisahkan dengan koma','separate with commas')}"></label>`;
 return `<div class="f2"><label class="fld">UPC<input id="f-upc" value="${E(r.upc)}" placeholder="${$t('13 digit','13 digits')}"></label>${isr}</div><div class="hrow">${btn($t('Simpan kode','Save codes'),'data-do="codes"')}<span class="where">${$t('Menyimpan kode tidak mengubah status menjadi Tayang.','Saving codes does not change the status to Live.')}</span></div>`;}
function next(r){const St=STAFF(),who=r.h&&St[r.h]?St[r.h][0]:'',ck=tick(r),ME=meIni();
 if(r.raw==='cancel_requested')return `<div class="nextc"><p>${$t('Label meminta pembatalan rilisan ini. Konfirmasi untuk menutupnya; kredit yang disisihkan dikembalikan ke label.','The label asked to cancel this release. Confirm to close it; the reserved credits go back to the label.')}</p><div class="hrow">${can(r,'cancel')?btn($t('Konfirmasi pembatalan','Confirm cancellation'),'data-do="cancel"','pri'):''}</div></div>`;
 if(r.raw==='clarification')return `<div class="nextc"><p>${$t('Label bertanya sebelum memperbaiki. Waktu perbaikan berhenti sampai pertanyaan dijawab.','The label asked a question before revising. The revision clock stops until it is answered.')}</p>${r.question?`<p class="quote">${E(r.question)}</p>`:''}${can(r,'answer')?`<label class="fld">${$t('Jawaban untuk label','Answer for the label')}<textarea id="f-note" placeholder="${$t('Tulis jawaban yang jelas','Write a clear answer')}"></textarea></label><div class="hrow">${btn($t('Kirim jawaban','Send answer'),'data-do="answer"','pri')}</div>`:''}</div>`;
 if(r.s==='submitted')return `<div class="nextc"><p>${$t('Belum ada yang memeriksa. <b>Mulai pemeriksaan</b> menjadikanmu penanggung jawab rilisan ini.','Nobody is reviewing yet. <b>Start review</b> makes you the assignee for this release.')}</p><div class="hrow">${can(r,'start')?btn($t('Mulai pemeriksaan ','Start review ')+ARROW,'data-do="start"','pri'):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='review'){const C=CK(),n=C.filter(([k])=>ck[k]).length,all=n===C.length;
  const miss=C.filter(([k])=>!ck[k]).map(c=>c[1]).join(', ');
  return `<div class="nextc"><p>${r.h===ME?$t('Kamu sedang memeriksa rilisan ini.','You are reviewing this release.'):$t(`Sedang diperiksa oleh <b>${E(who||'petugas lain')}</b>. Kamu tetap bisa melanjutkan.`,`Being reviewed by <b>${E(who||'another assignee')}</b>. You can still continue.`)} ${$t('Centang yang sudah sesuai.','Tick each item that checks out.')}</p>
  <div class="checks">${C.map(([k,t,m])=>`<button class="ck${ck[k]?'':' todo'}" data-ck="${k}" aria-pressed="${!!ck[k]}"><b>${ck[k]?'✓':''}</b><span>${t}<small class="sub">${k==='date'?`${fd(r.d)} · ${E(r.svcName)}`:m}</small></span></button>`).join('')}</div>
  ${S.form==='revise'?`<div class="reveal"><label class="fld">${$t('Yang perlu diperbaiki label','What the label needs to fix')}<textarea id="f-note">${miss?$t(`Mohon perbaiki: ${miss}.`,`Please fix: ${miss}.`):''}</textarea></label><p class="where">${$t('Label punya waktu 24 jam; lewat dari itu pengajuan ditutup otomatis dan kreditnya kembali.','The label has 24 hours; after that the request closes automatically and the credits are returned.')}</p><div class="hrow">${btn($t('Kirim ke label','Send to label'),'data-do="revise"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:
  `<div class="hrow">${can(r,'approve')?btn($t('Setujui rilisan','Approve release'),'data-do="approve"','pri',!all):''}${can(r,'revise')?btn($t('Minta perbaikan','Request revision'),'data-form="revise"'):''}${rejBtn(r)}</div>${all||!can(r,'approve')?'':`<p class="where">${$t(`${C.length-n} butir belum dicentang · Setujui aktif setelah semua sesuai.`,`${C.length-n} item${pS(C.length-n)} not ticked · Approve unlocks once everything checks out.`)}</p>`}`}${reject(r)}</div>`;}
 if(r.s==='revision')return `<div class="nextc"><p>${$t('Menunggu perbaikan dari label.','Waiting for the label’s revision.')}${r.deadline?$t(` Batas perbaikan <b>${fdt(r.deadline)}</b>; lewat dari itu pengajuan ditutup otomatis.`,` Revision deadline <b>${fdt(r.deadline)}</b>; after that the request closes automatically.`):''}</p>${r.note?`<p class="quote">${E(r.note)}</p>`:''}<div class="hrow">${can(r,'remind')?btn($t('Kirim pengingat sekarang','Send reminder now'),'data-do="remind"'):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='approved')return `<div class="nextc"><p>${$t('Sudah disetujui. Kirim ke Believe, lalu pastikan tanggalnya sama.','Approved. Send it to Believe, then make sure the date matches.')}</p><div class="checks"><button class="ck${ck.ship?'':' todo'}" data-ck="ship" aria-pressed="${!!ck.ship}"><b>${ck.ship?'✓':''}</b><span>${$t('Tanggal di Believe sama dengan permintaan label','Date at Believe matches the label’s request')}<small class="sub">${fd(r.d)}${r.od?$t(` · awalnya ${fd(r.od)}`,` · originally ${fd(r.od)}`):''}</small></span></button></div><div class="hrow">${can(r,'ship')?btn($t('Konfirmasi pengiriman','Confirm delivery'),'data-do="ship"','pri',!ck.ship):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='delivered'||r.s==='followup'){const fu=r.s==='followup';
  const OP=[['live',$t('Sudah tayang','Already live'),$t('Rilisan ditemukan di toko','Release found in stores')],['notfound',fu?$t('Masih belum ditemukan','Still not found'):$t('Belum ditemukan','Not found yet'),$t('Tindak lanjut ke Believe','Follow up with Believe')],['date',$t('Tanggal salah','Wrong date'),$t('Tanggal di toko berbeda','Store date differs')]].concat(r.canOffer?[['offer',$t('Jadwal pengganti','Replacement schedule'),$t('Tawarkan ke label','Offer to the label')]]:[]).concat(r.canCloseFailed?[['closefail',$t('Tutup lagu yang gagal','Close failed tracks'),$t('Kredit lagu itu dikembalikan','Their credits are returned')]]:[]).filter(([k])=>can(r,k));
  const rv={live:`<label class="fld">${$t('Tautan toko yang diperiksa','Store link checked')}<input id="f-link" placeholder="https://open.spotify.com/…"></label>${r.upc&&r.isrcList.filter(Boolean).length?'':`<p class="where">${$t('Simpan UPC & ISRC dulu sebelum menandai Tayang.','Save the UPC & ISRC before marking Live.')}</p>`}<div class="hrow">${btn($t('Tandai Tayang','Mark Live'),'data-do="live"','pri')}</div>`,
   notfound:`<label class="fld">${$t('Catatan tindak lanjut ke Believe','Follow-up note for Believe')}<textarea id="f-note">${E(r.followup||'')}</textarea></label><div class="hrow">${btn(fu?$t('Simpan & periksa lagi 3 hari kerja','Save & check again in 3 working days'):$t('Catat & tindak lanjuti','Record & follow up'),'data-do="notfound"','pri')}</div>`,
   date:`<label class="fld">${$t('Tanggal yang tampil di toko','Date shown in stores')}<input id="f-note" placeholder="${$t('Mis. 13 Okt 2026','E.g. 13 Oct 2026')}"></label><div class="hrow">${btn($t('Laporkan kesalahan tanggal','Report date error'),'data-do="dateerr"','pri')}</div>`,
   offer:`<div class="f2"><label class="fld">${$t('Layanan pengganti','Replacement service')}<select id="f-svc">${r.cheaper.map(s=>`<option>${s}</option>`).join('')}</select></label><label class="fld">${$t('Tanggal pengganti','Replacement date')}<input id="f-date" type="date" value="${E(offerDate(r))}"></label></div><div class="hrow">${btn($t('Kirim tawaran ke label','Send offer to label'),'data-do="offer"','pri')}</div>`,
   closefail:`<label class="fld">${$t('Alasan · dikirim ke label','Reason · sent to the label')}<textarea id="f-note" placeholder="${$t('Mis. Believe menolak lagu ini','E.g. Believe rejected this track')}"></textarea></label><div class="hrow">${btn($t('Tutup lagu yang gagal','Close failed tracks'),'data-do="closefail"','dng')}</div>`}[S.pick]||'';
  return `<div class="nextc"><p>${fu?(r.raw==='partial'?$t('Sebagian lagu sudah tayang. Periksa lagu lainnya atau tutup yang gagal.','Some tracks are live. Check the others or close the failed ones.'):$t('Belum ditemukan di toko. Periksa lagi atau tawarkan jadwal pengganti.','Not found in stores yet. Check again or offer a replacement schedule.')):$t(`Sudah dikirim ke Believe. Isi kode, lalu periksa hasilnya di toko.`,`Sent to Believe. Fill in the codes, then check the result in stores.`)}</p>
   <div class="sub2"><h5>${$t('1 · Kode rilisan','1 · Release codes')}</h5>${codesBlock(r)}</div>
   <div class="sub2"><h5>${$t('2 · Hasil pemeriksaan di toko','2 · Store check result')}</h5><div class="opts">${OP.map(([k,t,m])=>`<button data-pick="${k}" aria-pressed="${S.pick===k}">${t}<small>${m}</small></button>`).join('')}</div>${rv?`<div class="reveal">${rv}</div>`:''}</div>
   <div class="hrow">${rejBtn(r)}</div>${reject(r)}</div>`;}
 if(r.s==='live'||r.s==='partial_closed')return `<div class="nextc ok"><p>${r.d>day()?$t(`Sudah ditemukan di toko · tanggal rilis ${fd(r.d)}.`,`Found in stores · release date ${fd(r.d)}.`):$t(`Tayang sejak ${fd(r.d)}.`,`Live since ${fd(r.d)}.`)} ${$t('Tidak ada yang perlu dilakukan.','Nothing to do.')}</p>${r.link?`<p class="where">${$t('Tautan yang diperiksa:','Link checked:')} <a class="lnk" href="${E(r.link)}" target="_blank" rel="noopener">${E(r.link.replace(/^https:\/\//,''))}</a></p>`:''}${!can(r,'correct')?'':S.form==='correct'?`<div class="reveal"><label class="fld">${r.flow?$t('Alasan koreksi','Correction reason'):$t('Masalah yang ditemukan di toko','Issue found in stores')}<textarea id="f-note" placeholder="${r.flow?$t('Mis. ternyata belum muncul di Spotify','E.g. it turns out it is not on Spotify yet'):$t('Mis. tanggal di toko 13 Okt, seharusnya 6 Okt','E.g. store date is 13 Oct, should be 6 Oct')}"></textarea></label><div class="hrow">${btn($t('Kembalikan ke Tindak lanjut','Return to follow-up'),'data-do="correct"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:`<div class="hrow">${btn(r.flow?$t('Koreksi penandaan Tayang','Correct Live marking'):$t('Laporkan masalah di toko','Report store issue'),'data-form="correct"','ghost')}</div>`}</div>`;
 if(r.s==='taken_down')return `<div class="nextc mute"><p>${$t('Diturunkan dari toko','Taken down from stores')}${r.takenDown?$t(` pada ${fd(r.takenDown)}`,` on ${fd(r.takenDown)}`):''}.</p><p class="where">${$t('Arsip saja · tidak ada tindakan.','Archive only · no action.')}</p></div>`;
 if(r.s==='closed')return `<div class="nextc mute"><p>${r.reason==='timeout'?$t('Ditutup otomatis karena batas perbaikan terlewat.','Closed automatically because the revision deadline passed.'):r.reason==='cancelled'?$t('Dibatalkan atas permintaan label.','Cancelled at the label’s request.'):$t('Pengajuan ditolak.','Request rejected.')}</p>${r.reasonNote?`<p class="quote">${E(r.reasonNote)}</p>`:''}<p class="where">${$t('Label bisa mengajukan ulang dari sisi label.','The label can resubmit from their side.')}</p></div>`;
 return '';}
const STEPS=()=>[$t('Diajukan','Submitted'),$t('Diperiksa','In review'),$t('Siap dikirim','Ready to send'),$t('Di Believe','At Believe'),$t('Tayang','Live')];
function steps(r){const at={submitted:0,review:1,revision:1,approved:2,delivered:3,followup:3,live:5}[r.s];if(at==null)return '';const wait=r.s==='revision'||r.s==='followup';const SP=STEPS(),n=SP.length;
 const lab=SP.map((s,i)=>i===1&&r.s==='revision'?$t('Perbaikan label','Label revision'):i===3&&r.s==='followup'?$t('Tindak lanjut','Follow-up'):s);
 return `<div class="steps" style="--n:${n}"><i class="prog" style="--w:calc(100% * ${Math.min(at,n-1)} / ${n})"></i>${lab.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function pane(){const r=R.find(x=>x.id===S.sel[S.tab]&&items().includes(x));
 if(!r){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih rilisan','Select a release')}</b>${$t('Rinciannya tampil di sini.','Details appear here.')}</div>`;return;}
 const P=PROC.has(r.s),St=STAFF();let k=0;
 const ini=String(r.l).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?$t('Dalam proses','In progress'):$t('Katalog','Catalogue')}</button>
  <div class="relhd">${cv(r,1)}<div style="min-width:0"><div class="k">${$t('Rilisan','Release')} · <span class="mono">${E(r.id)}</span></div><h2>${E(r.t)}</h2><div class="meta">${art(r)}<span class="sep"></span><button class="lnk" data-label="${E(r.m)}">${E(r.l)}</button><span class="sep"></span>${chip(...stt(r))}</div></div></div></div>
  <div class="pb">${sec(k++,P?$t('Langkah berikutnya','Next step'):$t('Keadaan','Status'),next(r),P?dueChipR(r):'')}
  ${steps(r)?sec(k++,$t('Tahapan','Stages'),steps(r)):''}
  ${P?sec(k++,$t('Penanggung jawab & tenggat','Assignee & deadline'),`<div class="whoc"><div class="who">${mini(r.h)}<span>${r.h&&St[r.h]?E(St[r.h][0]):$t('Belum ada petugas','Unassigned')}<small>${r.h&&St[r.h]?St[r.h][1]:$t('Otomatis terisi saat pemeriksaan dimulai','Filled in automatically when review starts')}</small></span>${r.dueDate?`<span class="dueline">${r.due<0?$t('Tenggat terlewat','Deadline passed'):$t('Tenggat','Deadline')} <b>${dlabel(r.dueDate)}</b></span>`:''}</div><p class="where">${E(r.rule)} — <button class="lnk" data-std>${$t('Aturan waktu','Time rule')}</button> · ${$t('Pembagian tugas diatur di','Assignments are managed in')} <button class="lnk" data-work>${$t('Pekerjaan','Work')}</button></p></div>`):''}
  ${sec(k++,$t('Rincian','Details'),`<div class="facts"><span>${$t('Artis','Artist')}</span><b>${art(r)}</b><span>Label</span><b>${E(r.l)}</b><span>${$t('Tanggal rilis','Release date')}</span><b>${fd(r.d)}${r.od&&P?` <small class="where" style="display:inline">${$t(`· awalnya ${fd(r.od)}`,`· originally ${fd(r.od)}`)}</small>`:''}</b><span>${$t('Layanan','Service')}</span><b>${E(r.svcName)}</b><span>UPC</span><b class="mono" style="font-size:13px;color:var(--text)">${E(r.upc)||'—'}</b><span>${$t('Kredit pengajuan','Request credits')}</span><b>${E(r.credit)}</b>${r.genre?`<span>Genre</span><b>${E(r.genre)}</b>`:''}</div>`)}
  ${sec(k++,$t('Lagu','Tracks'),`<div class="tracks">${r.tracks.map((x,i)=>`<div class="tr"><span class="num">${i+1}</span><span>${E(x.t)}<small style="display:block">${x.sub?E(x.sub):art(r)}</small></span><span class="mono">${E(x.isrc||$t('ISRC belum ada','No ISRC yet'))}</span></div>`).join('')}</div>`,$t(r.tracks.length+' lagu',r.tracks.length+' track'+pS(r.tracks.length)))}
  ${sec(k++,$t('Riwayat','History'),`<div class="hist">${r.hist.slice().reverse().map(([w,t,who])=>`<div>${who==='L'?`<span class="mini lbl">${ini}</span>`:who==='SY'?`<span class="mini none" title="${$t('Sistem','System')}">S</span>`:mini(who)}<span>${E(t)}<small style="display:block">${who==='L'?E(r.l):who==='SY'?$t('Sistem','System'):St[who]?E(St[who][0]):$t('Petugas','Assignee')} · ${fdt(w)}</small></span></div>`).join('')||`<p class="where">${$t('Belum ada riwayat.','No history yet.')}</p>`}</div>`)}</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
/* Isian yang sedang diketik tetap ada walau halaman digambar ulang (jam simulasi prototipe menggambar ulang tiap menit). */
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea,#pin select,#q').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v&&k!=='q')el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(t){toast137(DEF,t);}
function open(id){S.sel[S.tab]=id;S.form=null;S.pick=null;S.edit=false;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){const keepq=tb.hasAttribute('data-keepq');S.tab=tb.dataset.tab;if(!keepq)S.q='';S.read=false;S.form=null;S.pick=null;paint();if(tb.closest('#band'))$('wk').scrollIntoView({behavior:'smooth',block:'start'});return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='proc';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.tab='proc';S.stage=null;S.q='';const u=proc().sort((a,b)=>(a.due??99)-(b.due??99)||String(a.dueDate).localeCompare(String(b.dueDate)))[0];if(u)open(u.id);return;}
  const ct=t.closest('[data-cat]');if(ct){S.cat=ct.dataset.cat;S.more=20;paint();return;}
  if(t.closest('[data-more]')){S.more+=20;keep(list);return;}
  const r=R.find(x=>x.id===S.sel[S.tab]);
  const ck=t.closest('[data-ck]');if(ck&&r){const c=tick(r);c[ck.dataset.ck]=!c[ck.dataset.ck];repane();return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;repane();const n=$('f-note');if(n)n.focus();return;}
  const pk=t.closest('[data-pick]');if(pk){S.pick=S.pick===pk.dataset.pick?null:pk.dataset.pick;repane();const f=root.querySelector('.reveal input,.reveal textarea');if(f)f.focus({preventScroll:true});return;}
  if(t.closest('[data-edit]')){S.edit=true;repane();return;}
  const dd=t.closest('[data-do]');if(dd&&r&&!dd.disabled){act(r,dd.dataset.do);return;}
  const lb=t.closest('[data-label]');if(lb){openLabel(lb.dataset.label);return;}
  if(t.closest('[data-std]')){window.stdTab137='waktu';if(!go137('standards'))toast($t('Buka Standar & Penanda › Aturan waktu','Open Standards & Indicators › Time rules'));return;}
  if(t.closest('[data-work]')){if(!go137('work'))toast($t('Buka Pekerjaan untuk mengatur petugas','Open Work to set the assignee'));return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();S.more=20;paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));
}

/* ---------- data asli: ten.releases, ten.events, aturan waktu Pengaturan › Prosedur ---------- */
const HOUR=3600000;
const iso16=ms=>ms?new Date(Number(ms)+7*HOUR).toISOString().slice(0,16):'';
const isoDay=ms=>iso16(ms).slice(0,10);
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const meIni=()=>ini(state.user);
const policy=()=>{try{return typeof policy115==='function'?policy115():null;}catch(err){return null;}};
const calendar=()=>{const c=policy()?.calendar||{};return {days:c.days||[1,2,3,4,5],holidays:c.holidays||[]};};
const isWork=(d,c)=>c.days.includes(new Date(d+'T00:00:00Z').getUTCDay())&&!c.holidays.includes(d);
const addDay=(d,n)=>{const t=new Date(d+'T00:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10);};
function addWork(d,n,c){let x=d,k=n;while(k>0){x=addDay(x,1);if(isWork(x,c))k--;}return x;}
function workDiff(from,to,c){if(from===to)return 0;const dir=to>from?1:-1;let d=from,k=0;while(d!==to){d=addDay(d,dir);if(isWork(d,c))k++;}return dir*Math.max(1,k);}
/* tahap tampilan · status asli */
const STAGE={submitted:'submitted',review:'review',revision:'revision',clarification:'revision',approved:'approved',delivered:'delivered',followup:'followup',partial:'followup',live:'live',partial_closed:'partial_closed',taken_down:'taken_down',closed:'closed'};
/* aturan waktu per tahap (id aturan di Prosedur) dan kejadian yang memulai jamnya */
const CLOCK={submitted:['release',['submit','resubmit']],review:['release',['submit','resubmit']],clarification:['approval',['question']],approved:['delivery',['approve']],delivered:['believe',['deliver']],followup:['believe',['not_found','date_error','followup','undo_live']],partial:['believe',['live','not_found','date_error','followup']],cancel_requested:['approval',['cancel']]};
const RULEDEF={release:[['Pemeriksaan rilisan','Release review'],'working',2],delivery:[['Pengiriman rilisan','Release delivery'],'working',1],believe:[['Pemeriksaan Believe','Believe check'],'working',3],approval:[['Verifikasi & persetujuan','Verification & approval'],'nextday',1]};
const rule=id=>U137.rule(id,RULEDEF[id]);
const ruleText=x=>x.mode==='nextday'?$t(`${x.name} · hari berikutnya`,`${x.name} · next day`):$t(`${x.name} · ${x.value} hari kerja`,`${x.name} · ${x.value} working day${pS(x.value)}`);
/* nama kejadian riwayat: EVT (Indonesia, juga dipakai untuk memeriksa jenis kejadian) · EVT_EN (English) */
const EVT_EN={submit:'Request submitted',resubmit:'Revision sent by label',question:'Label asked a question',cancel:'Label requested cancellation',start:'Review started',revision:'Revision requested from label',answer:'Label’s question answered',approve:'Approved',deliver:'Sent to Believe',codes:'UPC/ISRC codes saved',not_found:'Not found in stores · followed up with Believe',date_error:'Date error reported to Believe',followup:'Believe follow-up recorded',live:'Marked Live',reject:'Request rejected',cancel_confirm:'Cancellation confirmed',downgrade_offer:'Replacement schedule offered to label',downgrade_accept:'Label accepted replacement schedule',timeout:'Closed automatically · revision deadline passed',reminder:'Reminder sent to label',undo_live:'Live marking corrected',close_failed:'Failed tracks closed',assign:'Assignee changed',taken_down:'Taken down from stores',
 submitted:'Request submitted',under_review:'Review started',need_revision:'Revision requested from label',rejected:'Request rejected',approved:'Approved',delivered:'Sent to Believe'};
const evt=k=>$t(EVT[k],EVT_EN[k]||EVT[k]);
const EVT={submit:'Pengajuan dikirim',resubmit:'Perbaikan dikirim label',question:'Label bertanya',cancel:'Label meminta pembatalan',start:'Pemeriksaan dimulai',revision:'Perbaikan diminta ke label',answer:'Pertanyaan label dijawab',approve:'Disetujui',deliver:'Dikirim ke Believe',codes:'Kode UPC/ISRC disimpan',not_found:'Belum ditemukan di toko · ditindaklanjuti ke Believe',date_error:'Kesalahan tanggal dilaporkan ke Believe',followup:'Tindak lanjut ke Believe dicatat',live:'Ditandai Tayang',reject:'Pengajuan ditolak',cancel_confirm:'Pembatalan dikonfirmasi',downgrade_offer:'Jadwal pengganti ditawarkan ke label',downgrade_accept:'Label menerima jadwal pengganti',timeout:'Ditutup otomatis · batas perbaikan lewat',reminder:'Pengingat dikirim ke label',undo_live:'Penandaan Tayang dikoreksi',close_failed:'Lagu yang gagal ditutup',assign:'Petugas diganti',taken_down:'Diturunkan dari toko',
 submitted:'Pengajuan dikirim',under_review:'Pemeriksaan dimulai',need_revision:'Perbaikan diminta ke label',rejected:'Pengajuan ditolak',approved:'Disetujui',delivered:'Dikirim ke Believe'};
const LABELSIDE=new Set(['submit','resubmit','question','cancel','submitted','downgrade_accept']);
const NOTED=new Set(['revision','reject','answer','date_error','followup','not_found','question','undo_live','close_failed']);
function history(x,eventsByTarget){const h=[];
 const who=(actor,id,kind)=>LABELSIDE.has(kind)||actor==='label'?'L':ini(id)||(actor==='import'?ini(x.handler102)||'SY':'SY');
 for(const e of x.history||[]){const kind=e.kind||e.action;if(!kind||kind==='draft')continue;const txt=kind==='ticket-result112'?(e.note||$t('Hasil tiket dicatat','Ticket result recorded')):EVT[kind]&&evt(kind);if(!txt)continue;h.push([iso16(e.at),txt+(NOTED.has(kind)&&e.note&&kind!=='ticket-result112'?' · '+String(e.note).slice(0,90):''),who(e.actor,e.actorId102,kind)]);}
 for(const e of eventsByTarget[x.id]||[]){if(e.kind==='draft'||!EVT[e.kind])continue;let txt=evt(e.kind);if(e.kind==='assign'&&e.note)txt=$t(`Ditugaskan ke ${people.find(p=>p.id===e.note)?.name||e.note}`,`Assigned to ${people.find(p=>p.id===e.note)?.name||e.note}`);else if(NOTED.has(e.kind)&&e.note)txt+=' · '+String(e.note).slice(0,90);h.push([iso16(e.at),txt,who(e.actor,e.actorId102,e.kind)]);}
 h.sort((a,b)=>a[0].localeCompare(b[0]));
 const out=[];for(const v of h){const last=out[out.length-1];if(last&&last[1].replace(/ · ×\d+$/,'')===v[1]){const n=(Number((last[1].match(/ · ×(\d+)$/)||[])[1])||1)+1;last[1]=v[1]+' · ×'+n;last[0]=v[0];}else out.push(v.slice());}
 return out;}
function clockStart(x,kinds,eventsByTarget){let at=0;for(const e of eventsByTarget[x.id]||[])if(kinds.includes(e.kind)&&e.at>at)at=e.at;
 for(const e of x.history||[]){const k=e.kind||e.action;if(kinds.includes(k)&&e.at>at)at=e.at;}
 if(!at&&x.systemStage115?.stage===x.status)at=x.systemStage115.started;
 if(!at)at=x.status==='delivered'?x.delivered:x.status==='followup'?(x.followupAt||x.checkedAt||x.delivered):x.sent;
 return at||ten.now;}
const COST={Standard:1,Express:2,MAX:3};
function dueOf(x,eventsByTarget){const raw=x.status;if(raw==='revision')return x.deadline?isoDay(x.deadline):null;if(!CLOCK[raw])return null;const [rid,kinds]=CLOCK[raw],rl=rule(rid),base=isoDay(clockStart(x,kinds,eventsByTarget));return rl.mode==='nextday'?addDay(base,rl.value):addWork(base,rl.value,calendar());}
function toRow(x,eventsByTarget,mem){
 const raw=x.status,s=raw==='cancel_requested'?(STAGE[x.previousStatus]||'submitted'):STAGE[raw];if(!s)return null;
 const flow=!!x.flow105,m=mem[x.member];
 const artist=flow?[...(x.primary||[]),...(x.featured||[])].map(a=>a?.name||a).filter(Boolean).join(', '):String(x.artist||'');
 const a=!artist||artist==='-'||/^Penanggung jawab/.test(artist)?'':artist;
 const isrcList=flow?(x.songs||[]).map(t=>t.isrc||''):String(x.isrc||'').split(',').map(v=>v.trim());
 const tracks=flow?(x.songs||[]).map((t,i)=>({id:t.id,t:t.title||$t(`Lagu ${i+1}`,`Track ${i+1}`),isrc:t.isrc||'',sub:t.live?$t('Tayang','Live'):''})):
  (x.sample131?.tracks?.length?x.sample131.tracks.map((t,i)=>({t:t.title||$t(`Lagu ${i+1}`,`Track ${i+1}`),isrc:t.isrc||isrcList[i]||'',sub:[t.composer?$t(`Pencipta ${t.composer}`,`Songwriter ${t.composer}`):'',t.explicit?$t('Eksplisit','Explicit'):''].filter(Boolean).join(' · ')})):Array.from({length:Number(x.tracks)||1},(_,i)=>({t:Number(x.tracks)>1?$t(`Lagu ${i+1}`,`Track ${i+1}`):x.title,isrc:isrcList[i]||'',sub:''})));
 const c=calendar(),dueDate=dueOf(x,eventsByTarget)||'',due=dueDate?workDiff(day(),dueDate,c):null,ruleTxt=raw==='revision'?$t('Menunggu perbaikan label · 24 jam','Awaiting label revision · 24 hours'):CLOCK[raw]?ruleText(rule(CLOCK[raw][0])):'';
 const alloc=(x.allocation||[]).reduce((n,a)=>n+(Number(a.amount)||0),0)||(flow?(x.songs||[]).length:Number(x.tracks)||1)*(COST[x.service]||1);
 const CS=$t({reserved:'disisihkan',consumed:'terpakai',returned:'dikembalikan',none:'belum dipakai'},{reserved:'reserved',consumed:'used',returned:'returned',none:'not used yet'});
 const credit=`${alloc} ${$t('kredit',alloc===1?'credit':'credits')} · ${CS[x.creditState]||(PROC.has(s)?$t('disisihkan','reserved'):'—')}`;
 const cheaper=Object.keys(COST).filter(k=>COST[k]<(COST[x.service]||1));
 return {id:x.id,t:x.title||$t('Tanpa judul','Untitled'),a,l:m?.name||x.member,m:x.member,s,raw,d:x.date,od:x.originalDate&&x.originalDate!==x.date?x.originalDate:'',h:ini(x.handler102),ver:x.version||0,flow,
  upc:x.upc||'',isrc:isrcList.join(','),isrcList,tracks,due,dueDate,rule:ruleTxt,deadline:x.deadline?iso16(x.deadline):'',note:x.note||'',question:x.question||'',followup:x.followup||x.incidentNote||'',
  reason:x.reason||'',reasonNote:x.reason&&!['timeout','cancelled','rejected'].includes(x.reason)?x.reason:'',link:x.link||'',takenDown:x.takenDownAt?isoDay(x.takenDownAt):'',genre:x.genre||x.sample131?.subgenre||'',
  svcName:`Rilis Musik ${x.service||'Standard'}`,credit,cheaper,canOffer:!flow&&cheaper.length>0&&['followup','delivered'].includes(raw),canCloseFailed:flow&&!!me().super&&['partial','followup','delivered'].includes(raw),
  hist:history(x,eventsByTarget)};}
function load(){const eventsByTarget={};for(const e of ten.events||[])(eventsByTarget[e.target]||(eventsByTarget[e.target]=[])).push(e);
 const mem=Object.fromEntries((ten.members||[]).map(m=>[m.id,m]));
 R=(ten.releases||[]).filter(x=>x.status!=='draft').map(x=>toRow(x,eventsByTarget,mem)).filter(Boolean);}
/* tenggat yang sama dipakai Pekerjaan & Dashboard (lihat syncTasks102) */
let evCache={key:'',map:{}};const evMap=()=>{const key=(ten.events||[]).length+':'+ten.now;if(evCache.key!==key){const map={};for(const e of ten.events||[])(map[e.target]||(map[e.target]=[])).push(e);evCache={key,map};}return evCache.map;};
window.due137=function(x){try{const d=dueOf(x,evMap());return d?{due:d,overdue:d<day()}:{due:x.date,overdue:false};}catch(err){return {due:x.date,overdue:x.status==='followup'};}};
/* ---------- izin & tindakan ---------- */
const PERM={start:'review',revise:'request',approve:'approve',ship:'deliver',codes:'finish',live:'finish',notfound:'finish',dateerr:'review',offer:'review',reject:'review',remind:'review',correct:'finish',answer:'review',cancel:'review',closefail:'finish'};
function can(r,a){if(['correct','closefail'].includes(a)&&r.flow&&!me().super)return false;
 if(a==='reject'&&(r.flow?!['submitted','review'].includes(r.raw):['live','closed','taken_down','partial','partial_closed','cancel_requested'].includes(r.raw)))return false;
 if(a==='revise'&&r.flow&&r.raw!=='review')return false;
 try{return typeof may114!=='function'||may114('releases',PERM[a]||'review',r.m);}catch(err){return true;}}
const offerDate=r=>{try{const d=RM10.earliest?.(ten,r.cheaper[0]);return d&&d>r.d?d:(d||r.d);}catch(err){return r.d;}};
function message(err){const code=String(err?.message||err);try{if(typeof error10==='function'){const t=error10(code);if(t&&t!==code)return t;}}catch(e){}return code;}
function run(r,kind,p={}){
 if(r.flow){run105(kind,{id:r.id,version:ten.releases.find(x=>x.id===r.id)?.version,...p});if(typeof persist105==='function')persist105();}
 else{const fn=()=>RM10.act(ten,kind,{id:r.id,...p});typeof atomic10==='function'?atomic10(fn):fn();save10();}}
function remind(r){ten.notifications.unshift({id:++ten.serial,member:r.m,key:'reminder',ref:r.id,at:ten.now});
 ten.events.unshift({id:++ten.serial,kind:'reminder',target:r.id,note:'',actor:ten.role,actorId102:state.user,at:ten.now});save10();}
window.assignRelease137=function(id,person){const x=(ten.releases||[]).find(r=>r.id===id);if(!x||x.handler102===person)return false;
 (x.handoffs114||(x.handoffs114=[])).push({from:x.handler102||null,to:person,actor:state.user,at:ten.now});x.handler102=person;
 ten.events.unshift({id:++ten.serial,kind:'assign',target:id,note:person,actor:ten.role,actorId102:state.user,at:ten.now});save10();return true;};
function act(r,a){let msg='';const note=val('f-note');
 try{
  if(a==='start'){run(r,'start');msg=$t('Pemeriksaan dimulai · kamu penanggung jawabnya','Review started · you are the assignee');}
  else if(a==='approve'){run(r,'approve',r.flow?{checked:true}:{});msg=$t('Disetujui · berikutnya kirim ke Believe','Approved · next, send it to Believe');}
  else if(a==='revise'){if(!note){toast($t('Tulis dulu yang perlu diperbaiki','Write what needs fixing first'));return;}run(r,'revision',r.flow?{notes:[{text:note}]}:{note});msg=$t('Permintaan perbaikan dikirim ke label · batas 24 jam','Revision request sent to label · 24-hour limit');}
  else if(a==='remind'){remind(r);msg=$t('Pengingat dikirim ke label','Reminder sent to label');}
  else if(a==='reject'){if(!note){toast($t('Tulis alasan penolakan untuk label','Write the rejection reason for the label'));return;}run(r,'reject',{note});msg=$t('Ditolak · label diberi tahu, kredit dikembalikan','Rejected · label notified, credits returned');}
  else if(a==='ship'){run(r,'deliver',r.flow?{checked:true,date:r.d}:{checked:true});msg=$t('Pengiriman dikonfirmasi · cek hasilnya 3 hari kerja lagi','Delivery confirmed · check the result in 3 working days');}
  else if(a==='codes'){const upc=val('f-upc');if(!upc){toast($t('Isi UPC dulu','Fill in the UPC first'));return;}
   if(r.flow){const codes={};r.tracks.forEach((t,i)=>{const v=val('f-isrc-'+i);if(v)codes[t.id]=v;});run(r,'codes',{upc,codes});}
   else{const list=val('f-isrc').split(',').map(v=>v.trim()).filter(Boolean);if(list.length!==r.tracks.length){toast($t(`Isi ${r.tracks.length} ISRC, satu per lagu (sekarang ${list.length})`,`Enter ${r.tracks.length} ISRC${pS(r.tracks.length)}, one per track (now ${list.length})`));return;}run(r,'codes',{upc,isrc:list.join(',')});}
   S.edit=false;msg=$t('Kode tersimpan · status tetap Dalam distribusi','Codes saved · status stays In distribution');}
  else if(a==='live'){const link=val('f-link');if(!/^https:\/\//.test(link)){toast($t('Isi tautan toko yang diawali https://','Enter a store link starting with https://'));return;}
   if(r.flow){const x=ten.releases.find(y=>y.id===r.id),ids=(x.songs||[]).filter(t=>t.settlement==='reserved'&&!t.live).map(t=>t.id),links=Object.fromEntries(ids.map(id=>[id,link]));run(r,'live',{checked:true,ids,links});}
   else run(r,'live',{link,checked:true});
   msg=$t('Tayang! Label diberi tahu, kredit terpakai','Live. Label notified, credits used');}
  else if(a==='notfound'){if(r.raw==='delivered'){if(r.flow){if(!note){toast($t('Tulis catatan tindak lanjut','Write a follow-up note'));return;}run(r,'not_found',{note});}else{run(r,'not_found');if(note)run(r,'followup',{note});}}
   else{if(!note){toast($t('Tulis catatan tindak lanjut','Write a follow-up note'));return;}run(r,'followup',{note});}
   msg=$t('Dicatat · diperiksa lagi 3 hari kerja','Recorded · checked again in 3 working days');}
  else if(a==='dateerr'){if(!note){toast($t('Tulis tanggal yang tampil di toko','Write the date shown in stores'));return;}run(r,'date_error',{note:$t('Tanggal di toko: ','Store date: ')+note});msg=$t('Kesalahan tanggal dilaporkan · label diberi tahu','Date error reported · label notified');}
  else if(a==='offer'){const service=val('f-svc'),date=val('f-date');if(!service||!date){toast($t('Pilih layanan dan tanggal pengganti','Choose a replacement service and date'));return;}run(r,'downgrade_offer',{service,date});msg=$t('Tawaran jadwal pengganti dikirim ke label','Replacement schedule offer sent to label');}
  else if(a==='closefail'){if(!note){toast($t('Tulis alasan untuk label','Write a reason for the label'));return;}run(r,'close_failed',{checked:true,note});msg=$t('Lagu yang gagal ditutup · kreditnya dikembalikan','Failed tracks closed · their credits returned');}
  else if(a==='correct'){if(!note){toast($t('Tulis alasannya','Write the reason'));return;}
   if(r.flow){const x=ten.releases.find(y=>y.id===r.id),ids=(x.songs||[]).filter(t=>t.settlement==='consumed').map(t=>t.id);run(r,'undo_live',{ids,note});}else run(r,'date_error',{note});
   msg=$t('Dikembalikan ke Tindak lanjut Believe · label diberi tahu','Returned to Believe follow-up · label notified');}
  else if(a==='answer'){if(!note){toast($t('Tulis jawaban untuk label','Write an answer for the label'));return;}run(r,'answer',{note});msg=$t('Jawaban dikirim · waktu perbaikan label berjalan lagi','Answer sent · the label’s revision clock runs again');}
  else if(a==='cancel'){run(r,'cancel_confirm',{checked:true});msg=$t('Pembatalan dikonfirmasi · kredit dikembalikan ke label','Cancellation confirmed · credits returned to label');}
 }catch(err){toast(message(err));return;}
 const moved=['reject','live','cancel'].includes(a);S.form=null;S.pick=null;
 if(!moved&&S.stage)S.stage=null;
 lastPane='';lastSig='';
 if(moved){load();const rest=items();S.sel[S.tab]=rest[0]?.id;}
 render();toast(msg);
 const it=root.querySelector(`.it[data-id="${CSS.escape(r.id)}"]`);if(it)it.classList.add('flash');}
function openLabel(member){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=member;l136.read=true;}}catch(err){}if(!go137('labels'))toast($t('Buka Manajemen Label','Open Label Management'));}
/* Masuk dari Pekerjaan / Dashboard / notifikasi: buka rilisan yang diminta (ui105.view='detail'). */
function intake(){if(typeof ui105!=='object'||ui105.view!=='detail'||!ui105.id)return;const id=ui105.id;ui105.view='list';ui105.id=null;load();const r=R.find(x=>x.id===id);if(!r)return;
 S.tab=PROC.has(r.s)?'proc':'cat';S.stage=null;S.q='';S.sel[S.tab]=id;S.read=true;S.form=null;S.pick=null;lastSig='';}
const sig=()=>R.map(r=>[r.id,r.raw,r.ver,r.h,r.due,r.upc,r.hist.length].join(':')).join('|')+'|'+day()+'|r:'+ten.role+state.user+'|'+state.lang;
const DEF={id:'releases',css:STYLE,html:HTML,
 i18n:{'Rilisan':'Releases','Periksa pengajuan, kirim ke Believe, dan pastikan setiap rilisan tayang. Katalog semua label ada di tab kedua.':'Review requests, send them to Believe, and make sure every release goes live. The catalogue of all labels is in the second tab.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='releases'&&!state.preview,
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: tahap & tenggat sama dengan pita biru Rilisan (tanpa riwayat agar ringan) */
DEF.sum=function(){const ev=evMap(),c=calendar(),today=day(),mem=Object.fromEntries((ten.members||[]).map(m=>[m.id,m]));
 const all=(ten.releases||[]).filter(x=>x.status!=='draft').map(x=>{const raw=x.status,s=raw==='cancel_requested'?(STAGE[x.previousStatus]||'submitted'):STAGE[raw];if(!s)return null;
  const p=PROC.has(s),dueDate=p?(dueOf(x,ev)||''):'',due=dueDate?workDiff(today,dueDate,c):null;
  return {id:x.id,src:'release',menu:$t('Rilisan','Releases'),ic:'disc',t:x.title||$t('Tanpa judul','Untitled'),l:mem[x.member]?.name||x.member,m:x.member,s,raw,p,st:(ST(raw)||ST(s)||[raw])[0],d:x.date,due,dueDate,over:due!=null&&due<0,who:x.handler102||'',wait:s==='revision'?'Label':''};}).filter(Boolean);
 const P=all.filter(r=>r.p),late=P.filter(r=>r.over).length,free=P.filter(r=>!r.who).length;
 return {all,P,late,today:P.filter(r=>r.due===0).length,free,line:P.length?$t(`${P.length} berjalan · ${late} terlambat · ${free} belum ada petugas`,`${P.length} in progress · ${late} overdue · ${free} unassigned`):$t('Tidak ada rilisan berjalan','No releases in progress'),tone:late?'r':free?'o':'g'};};
page137(DEF);
/* Halaman lama tidak digambar lagi saat Rilisan baru aktif (lebih ringan). */
const modBefore137=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore137.apply(this,arguments);};

})();
