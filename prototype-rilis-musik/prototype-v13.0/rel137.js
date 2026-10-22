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
const ST={submitted:['Menunggu pemeriksaan','c-bl'],review:['Dalam pemeriksaan','c-bl'],revision:['Menunggu perbaikan label','c-or'],clarification:['Menunggu jawaban petugas','c-or'],approved:['Siap dikirim','c-bl'],delivered:['Dalam distribusi','c-bl'],followup:['Tindak lanjut Believe','c-or'],partial:['Sebagian tayang','c-or'],cancel_requested:['Permintaan pembatalan','c-or'],live:['Tayang','c-gr'],partial_closed:['Selesai · sebagian tayang','c-gr'],taken_down:['Diturunkan',''],closed:['Ditutup','']};
const FLOW=[['submitted','Diajukan'],['review','Diperiksa'],['revision','Perbaikan label'],['approved','Siap dikirim'],['delivered','Di Believe'],['followup','Tindak lanjut']];
const PROC=new Set(FLOW.map(f=>f[0]));
const CK=[['cover','Sampul','3000 × 3000 px, tanpa logo toko atau teks terlarang'],['audio','Audio','WAV 44,1 kHz, utuh, sesuai judul'],['meta','Metadata & kredit','Judul, artis, pencipta, bahasa, tanda eksplisit'],['rights','Hak & izin','Pernyataan hak, izin sampel atau lagu cover'],['date','Tanggal rilis','Bisa dipenuhi layanan yang dipilih']];
const S={tab:'proc',stage:null,cat:'all',q:'',sel:{},read:false,more:20,form:null,pick:null,edit:false};
const TICK={};// centang pemeriksaan per rilisan (hanya di layar, tidak disimpan)
const MON=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],DAY=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const fd=s=>{if(!s)return '—';const [y,m,d]=String(s).slice(0,10).split('-').map(Number);return `${d} ${MON[m-1]} ${y}`;};
const fdt=s=>{if(!s)return 'Baru saja';const [y,m,d]=s.slice(0,10).split('-').map(Number);return `${d} ${MON[m-1]} ${y}`+(s.length>10?` · ${s.slice(11,16).replace(':','.')}`:'');};
const dlabel=iso=>{const t=new Date(iso+'T00:00:00Z');return `${DAY[t.getUTCDay()]}, ${t.getUTCDate()} ${MON[t.getUTCMonth()]}`;};
const todayLabel=()=>{const t=new Date(day()+'T00:00:00Z');return `${DAY[t.getUTCDay()]}, ${t.getUTCDate()} ${MON[t.getUTCMonth()]} ${t.getUTCFullYear()}`;};
const dueChipR=r=>r.due==null?'':r.due<0?chip(`Terlambat ${-r.due} hari`,'c-red'):r.due===0?chip('Hari ini','c-or'):`<span class="duet">${dlabel(r.dueDate)}</span>`;
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,7);
const cv=(r,big)=>`<span class="cv${big?' big':''}" style="--h:${hue(r.t)}">${NOTE}</span>`;
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':'Staf']]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="Belum ada petugas">–</span>`;};
const art=r=>r.a?E(r.a):'<span class="noart">Artis belum diisi</span>';
const stt=r=>ST[r.raw]||ST[r.s]||[r.raw,''];
const proc=()=>R.filter(r=>PROC.has(r.s)),cat=()=>R.filter(r=>!PROC.has(r.s));
const match=r=>!S.q||[r.t,r.a,r.l,r.upc,r.isrc,r.id].join(' ').toLowerCase().includes(S.q);
const wide=()=>innerWidth>1240;
function items(){if(S.tab==='proc'){let r=proc().filter(match);if(S.stage)r=r.filter(x=>x.s===S.stage);const o=FLOW.map(f=>f[0]);return r.sort((a,b)=>o.indexOf(a.s)-o.indexOf(b.s)||(a.due??99)-(b.due??99)||String(a.dueDate).localeCompare(String(b.dueDate)));}
 let r=cat().filter(match);if(S.cat!=='all')r=r.filter(x=>S.cat==='live'?['live','partial_closed'].includes(x.s):x.s===S.cat);return r.sort((a,b)=>String(b.d).localeCompare(String(a.d))||a.t.localeCompare(b.t));}
function tabs(){$('tabs').innerHTML=[['proc','Dalam proses',proc().length],['cat','Katalog',cat().length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=proc(),late=P.filter(r=>r.due!=null&&r.due<0).length,today=P.filter(r=>r.due===0).length,free=P.filter(r=>!r.h).length;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Alur rilisan · hari ini ${todayLabel()}</div>
  <h2>${P.length} rilisan sedang berjalan</h2><p>${late} terlambat · ${today} jatuh tempo hari ini · ${free} belum ada petugas</p>
  <div class="acts"><button class="wbtn" data-urgent>Buka yang paling mendesak ${ARROW}</button><button class="gbtn" data-tab="cat">Lihat katalog</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${R.filter(r=>['live','partial_closed'].includes(r.s)).length}</b><span>tayang</span></div><div class="sbox"><b class="n">${R.filter(r=>r.s==='taken_down').length}</b><span>diturunkan</span></div></div></div>
  <div class="flow f6">${FLOW.map(([k,t])=>{const g=P.filter(r=>r.s===k),l=g.filter(r=>r.due!=null&&r.due<0).length;return `<button class="fn${l?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${l?l+' terlambat':g.length?'tepat waktu':'kosong'}</span></button>`;}).join('')}</div>`;}
function row(r,i,mode){return `<div class="it${S.sel[S.tab]===r.id?' sel':''}" data-id="${E(r.id)}" style="--i:${i}">${cv(r)}<div style="min-width:0"><div class="t1">${E(r.t)}${mode==='cat'||r.raw!==r.s?' '+chip(...stt(r)):''}</div><div class="t2">${art(r)} · ${E(r.l)} · ${mode==='cat'?(r.upc?`<span class="mono">${E(r.upc)}</span>`:'tanpa UPC'):'rilis '+fd(r.d)}</div></div><div class="rgt">${mode==='cat'?`<span class="duet">${fd(r.d)}</span>`:dueChipR(r)+mini(r.h)}</div></div>`;}
function list(){const r=items();let h='';
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari judul, artis, label, UPC, ISRC" value="${E(S.q)}"></label>`;
 if(S.tab==='proc'){h+=`<div class="ch"><h3>Dalam proses <small class="n">${r.length}</small></h3>${find}</div>`;
  if(S.stage)h+=`<div class="flt"><span>Hanya tahap <b style="font-weight:500">${FLOW.find(f=>f[0]===S.stage)[1]}</b></span><button data-stage-clear>Tampilkan semua</button></div>`;
  let cur='',i=0;r.forEach(x=>{if(x.s!==cur){cur=x.s;const n=r.filter(y=>y.s===cur).length;h+=`<div class="gh"><i style="--c:var(${ST[cur][1]==='c-or'?'--orange':'--blue'})"></i><b>${FLOW.find(f=>f[0]===cur)[1]}</b> · ${n}</div>`;}h+=row(x,i++,'proc');});
  if(!r.length){const c=S.q?cat().filter(match).length:0;h+=`<div class="empty"><b>${S.q?'Tidak ada di Dalam proses':'Tahap ini kosong'}</b>${c?`<button class="lnk" data-tab="cat" data-keepq>${c} hasil di Katalog ${ARROW}</button>`:S.q?'Coba kata lain.':'Semua rilisan di tahap ini sudah selesai.'}</div>`;}}
 else{const C=cat().filter(match),cnt=k=>k==='all'?C.length:k==='live'?C.filter(x=>['live','partial_closed'].includes(x.s)).length:C.filter(x=>x.s===k).length;
  h+=`<div class="ch"><h3>Katalog <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${[['all','Semua'],['live','Tayang'],['taken_down','Diturunkan'],['closed','Ditutup']].filter(([k])=>k==='all'||k==='live'||cat().some(x=>x.s===k)).map(([k,t])=>`<button data-cat="${k}" aria-pressed="${S.cat===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
  r.slice(0,S.more).forEach((x,i)=>h+=row(x,i,'cat'));
  if(r.length>S.more)h+=`<button class="more" data-more>Tampilkan ${Math.min(20,r.length-S.more)} lagi · sisa ${r.length-S.more}</button>`;
  if(!r.length){const c=S.q?proc().filter(match).length:0;h+=`<div class="empty"><b>Tidak ditemukan</b>${c?`<button class="lnk" data-tab="proc" data-keepq>${c} hasil di Dalam proses ${ARROW}</button>`:'Coba kata lain.'}</div>`;}}
 $('list').innerHTML=h;}
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const reject=r=>S.form==='reject'?`<div class="reveal"><label class="fld">Alasan penolakan · dikirim ke label<textarea id="f-note" placeholder="Mis. audio bukan milik label, tanggal tidak bisa dipenuhi…"></textarea></label><div class="hrow">${btn('Tolak pengajuan','data-do="reject"','dng')}${btn('Batal','data-form=""')}</div></div>`:'';
const rejBtn=r=>S.form==='reject'||!can(r,'reject')?'':btn('Tolak','data-form="reject"','ghost dng');
const tick=r=>TICK[r.id+':'+r.ver]||(TICK[r.id+':'+r.ver]={});
function codesBlock(r){
 if(r.upc&&!S.edit)return `<div class="codes"><span><small>UPC</small><b class="mono">${E(r.upc)}</b></span><span><small>ISRC</small><b class="mono">${r.isrcList.filter(Boolean).length>1?r.isrcList.filter(Boolean).length+' kode':E(r.isrcList[0]||'—')}</b></span>${can(r,'codes')?'<button class="lnk" data-edit>Ubah</button>':''}</div>`;
 if(!can(r,'codes'))return '<p class="where">UPC & ISRC belum diisi.</p>';
 const isr=r.flow?`<div class="fld">ISRC per lagu${r.tracks.map((x,i)=>`<label class="fld" style="margin-top:6px">${E(x.t)}<input id="f-isrc-${i}" value="${E(x.isrc||'')}" placeholder="12 karakter"></label>`).join('')}</div>`:`<label class="fld">ISRC per lagu (${r.tracks.length})<input id="f-isrc" value="${E(r.isrcList.join(','))}" placeholder="pisahkan dengan koma"></label>`;
 return `<div class="f2"><label class="fld">UPC<input id="f-upc" value="${E(r.upc)}" placeholder="13 digit"></label>${isr}</div><div class="hrow">${btn('Simpan kode','data-do="codes"')}<span class="where">Menyimpan kode tidak mengubah status menjadi Tayang.</span></div>`;}
function next(r){const St=STAFF(),who=r.h&&St[r.h]?St[r.h][0]:'',ck=tick(r),ME=meIni();
 if(r.raw==='cancel_requested')return `<div class="nextc"><p>Label meminta pembatalan rilisan ini. Konfirmasi untuk menutupnya; kredit yang disisihkan dikembalikan ke label.</p><div class="hrow">${can(r,'cancel')?btn('Konfirmasi pembatalan','data-do="cancel"','pri'):''}</div></div>`;
 if(r.raw==='clarification')return `<div class="nextc"><p>Label bertanya sebelum memperbaiki. Waktu perbaikan berhenti sampai pertanyaan dijawab.</p>${r.question?`<p class="quote">${E(r.question)}</p>`:''}${can(r,'answer')?`<label class="fld">Jawaban untuk label<textarea id="f-note" placeholder="Tulis jawaban yang jelas"></textarea></label><div class="hrow">${btn('Kirim jawaban','data-do="answer"','pri')}</div>`:''}</div>`;
 if(r.s==='submitted')return `<div class="nextc"><p>Belum ada yang memeriksa. <b>Mulai pemeriksaan</b> menjadikanmu penanggung jawab rilisan ini.</p><div class="hrow">${can(r,'start')?btn('Mulai pemeriksaan '+ARROW,'data-do="start"','pri'):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='review'){const n=CK.filter(([k])=>ck[k]).length,all=n===CK.length;
  const miss=CK.filter(([k])=>!ck[k]).map(c=>c[1]).join(', ');
  return `<div class="nextc"><p>${r.h===ME?'Kamu sedang memeriksa rilisan ini.':`Sedang diperiksa oleh <b>${E(who||'petugas lain')}</b>. Kamu tetap bisa melanjutkan.`} Centang yang sudah sesuai.</p>
  <div class="checks">${CK.map(([k,t,m])=>`<button class="ck${ck[k]?'':' todo'}" data-ck="${k}" aria-pressed="${!!ck[k]}"><b>${ck[k]?'✓':''}</b><span>${t}<small class="sub">${k==='date'?`${fd(r.d)} · ${E(r.svcName)}`:m}</small></span></button>`).join('')}</div>
  ${S.form==='revise'?`<div class="reveal"><label class="fld">Yang perlu diperbaiki label<textarea id="f-note">${miss?`Mohon perbaiki: ${miss}.`:''}</textarea></label><p class="where">Label punya waktu 24 jam; lewat dari itu pengajuan ditutup otomatis dan kreditnya kembali.</p><div class="hrow">${btn('Kirim ke label','data-do="revise"','pri')}${btn('Batal','data-form=""')}</div></div>`:
  `<div class="hrow">${can(r,'approve')?btn('Setujui rilisan','data-do="approve"','pri',!all):''}${can(r,'revise')?btn('Minta perbaikan','data-form="revise"'):''}${rejBtn(r)}</div>${all||!can(r,'approve')?'':`<p class="where">${CK.length-n} butir belum dicentang · Setujui aktif setelah semua sesuai.</p>`}`}${reject(r)}</div>`;}
 if(r.s==='revision')return `<div class="nextc"><p>Menunggu perbaikan dari label.${r.deadline?` Batas perbaikan <b>${fdt(r.deadline)}</b>; lewat dari itu pengajuan ditutup otomatis.`:''}</p>${r.note?`<p class="quote">${E(r.note)}</p>`:''}<div class="hrow">${can(r,'remind')?btn('Kirim pengingat sekarang','data-do="remind"'):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='approved')return `<div class="nextc"><p>Sudah disetujui. Kirim ke Believe, lalu pastikan tanggalnya sama.</p><div class="checks"><button class="ck${ck.ship?'':' todo'}" data-ck="ship" aria-pressed="${!!ck.ship}"><b>${ck.ship?'✓':''}</b><span>Tanggal di Believe sama dengan permintaan label<small class="sub">${fd(r.d)}${r.od?` · awalnya ${fd(r.od)}`:''}</small></span></button></div><div class="hrow">${can(r,'ship')?btn('Konfirmasi pengiriman','data-do="ship"','pri',!ck.ship):''}${rejBtn(r)}</div>${reject(r)}</div>`;
 if(r.s==='delivered'||r.s==='followup'){const fu=r.s==='followup';
  const OP=[['live','Sudah tayang','Rilisan ditemukan di toko'],['notfound',fu?'Masih belum ditemukan':'Belum ditemukan','Tindak lanjut ke Believe'],['date','Tanggal salah','Tanggal di toko berbeda']].concat(r.canOffer?[['offer','Jadwal pengganti','Tawarkan ke label']]:[]).concat(r.canCloseFailed?[['closefail','Tutup lagu yang gagal','Kredit lagu itu dikembalikan']]:[]).filter(([k])=>can(r,k));
  const rv={live:`<label class="fld">Tautan toko yang diperiksa<input id="f-link" placeholder="https://open.spotify.com/…"></label>${r.upc&&r.isrcList.filter(Boolean).length?'':'<p class="where">Simpan UPC & ISRC dulu sebelum menandai Tayang.</p>'}<div class="hrow">${btn('Tandai Tayang','data-do="live"','pri')}</div>`,
   notfound:`<label class="fld">Catatan tindak lanjut ke Believe<textarea id="f-note">${E(r.followup||'')}</textarea></label><div class="hrow">${btn(fu?'Simpan & periksa lagi 3 hari kerja':'Catat & tindak lanjuti','data-do="notfound"','pri')}</div>`,
   date:`<label class="fld">Tanggal yang tampil di toko<input id="f-note" placeholder="Mis. 13 Okt 2026"></label><div class="hrow">${btn('Laporkan kesalahan tanggal','data-do="dateerr"','pri')}</div>`,
   offer:`<div class="f2"><label class="fld">Layanan pengganti<select id="f-svc">${r.cheaper.map(s=>`<option>${s}</option>`).join('')}</select></label><label class="fld">Tanggal pengganti<input id="f-date" type="date" value="${E(offerDate(r))}"></label></div><div class="hrow">${btn('Kirim tawaran ke label','data-do="offer"','pri')}</div>`,
   closefail:`<label class="fld">Alasan · dikirim ke label<textarea id="f-note" placeholder="Mis. Believe menolak lagu ini"></textarea></label><div class="hrow">${btn('Tutup lagu yang gagal','data-do="closefail"','dng')}</div>`}[S.pick]||'';
  return `<div class="nextc"><p>${fu?(r.raw==='partial'?'Sebagian lagu sudah tayang. Periksa lagu lainnya atau tutup yang gagal.':'Belum ditemukan di toko. Periksa lagi atau tawarkan jadwal pengganti.'):`Sudah dikirim ke Believe. Isi kode, lalu periksa hasilnya di toko.`}</p>
   <div class="sub2"><h5>1 · Kode rilisan</h5>${codesBlock(r)}</div>
   <div class="sub2"><h5>2 · Hasil pemeriksaan di toko</h5><div class="opts">${OP.map(([k,t,m])=>`<button data-pick="${k}" aria-pressed="${S.pick===k}">${t}<small>${m}</small></button>`).join('')}</div>${rv?`<div class="reveal">${rv}</div>`:''}</div>
   <div class="hrow">${rejBtn(r)}</div>${reject(r)}</div>`;}
 if(r.s==='live'||r.s==='partial_closed')return `<div class="nextc ok"><p>${r.d>day()?`Sudah ditemukan di toko · tanggal rilis ${fd(r.d)}.`:`Tayang sejak ${fd(r.d)}.`} Tidak ada yang perlu dilakukan.</p>${r.link?`<p class="where">Tautan yang diperiksa: <a class="lnk" href="${E(r.link)}" target="_blank" rel="noopener">${E(r.link.replace(/^https:\/\//,''))}</a></p>`:''}${!can(r,'correct')?'':S.form==='correct'?`<div class="reveal"><label class="fld">${r.flow?'Alasan koreksi':'Masalah yang ditemukan di toko'}<textarea id="f-note" placeholder="${r.flow?'Mis. ternyata belum muncul di Spotify':'Mis. tanggal di toko 13 Okt, seharusnya 6 Okt'}"></textarea></label><div class="hrow">${btn('Kembalikan ke Tindak lanjut','data-do="correct"','pri')}${btn('Batal','data-form=""')}</div></div>`:`<div class="hrow">${btn(r.flow?'Koreksi penandaan Tayang':'Laporkan masalah di toko','data-form="correct"','ghost')}</div>`}</div>`;
 if(r.s==='taken_down')return `<div class="nextc mute"><p>Diturunkan dari toko${r.takenDown?` pada ${fd(r.takenDown)}`:''}.</p><p class="where">Arsip saja · tidak ada tindakan.</p></div>`;
 if(r.s==='closed')return `<div class="nextc mute"><p>${r.reason==='timeout'?'Ditutup otomatis karena batas perbaikan terlewat.':r.reason==='cancelled'?'Dibatalkan atas permintaan label.':'Pengajuan ditolak.'}</p>${r.reasonNote?`<p class="quote">${E(r.reasonNote)}</p>`:''}<p class="where">Label bisa mengajukan ulang dari sisi label.</p></div>`;
 return '';}
const STEPS=['Diajukan','Diperiksa','Siap dikirim','Di Believe','Tayang'];
function steps(r){const at={submitted:0,review:1,revision:1,approved:2,delivered:3,followup:3,live:5}[r.s];if(at==null)return '';const wait=r.s==='revision'||r.s==='followup';const n=STEPS.length;
 const lab=STEPS.map((s,i)=>i===1&&r.s==='revision'?'Perbaikan label':i===3&&r.s==='followup'?'Tindak lanjut':s);
 return `<div class="steps" style="--n:${n}"><i class="prog" style="--w:calc(100% * ${Math.min(at,n-1)} / ${n})"></i>${lab.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${s}</span></div>`).join('')}</div>`;}
function pane(){const r=R.find(x=>x.id===S.sel[S.tab]&&items().includes(x));
 if(!r){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>Pilih rilisan</b>Rinciannya tampil di sini.</div>`;return;}
 const P=PROC.has(r.s),St=STAFF();let k=0;
 const ini=String(r.l).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?'Dalam proses':'Katalog'}</button>
  <div class="relhd">${cv(r,1)}<div style="min-width:0"><div class="k">Rilisan · <span class="mono">${E(r.id)}</span></div><h2>${E(r.t)}</h2><div class="meta">${art(r)}<span class="sep"></span><button class="lnk" data-label="${E(r.m)}">${E(r.l)}</button><span class="sep"></span>${chip(...stt(r))}</div></div></div></div>
  <div class="pb">${sec(k++,P?'Langkah berikutnya':'Keadaan',next(r),P?dueChipR(r):'')}
  ${steps(r)?sec(k++,'Tahapan',steps(r)):''}
  ${P?sec(k++,'Penanggung jawab & tenggat',`<div class="whoc"><div class="who">${mini(r.h)}<span>${r.h&&St[r.h]?E(St[r.h][0]):'Belum ada petugas'}<small>${r.h&&St[r.h]?St[r.h][1]:'Otomatis terisi saat pemeriksaan dimulai'}</small></span>${r.dueDate?`<span class="dueline">${r.due<0?'Tenggat terlewat':'Tenggat'} <b>${dlabel(r.dueDate)}</b></span>`:''}</div><p class="where">${E(r.rule)} — <button class="lnk" data-std>Aturan waktu</button> · Pembagian tugas diatur di <button class="lnk" data-work>Pekerjaan</button></p></div>`):''}
  ${sec(k++,'Rincian',`<div class="facts"><span>Artis</span><b>${art(r)}</b><span>Label</span><b>${E(r.l)}</b><span>Tanggal rilis</span><b>${fd(r.d)}${r.od&&P?` <small class="where" style="display:inline">· awalnya ${fd(r.od)}</small>`:''}</b><span>Layanan</span><b>${E(r.svcName)}</b><span>UPC</span><b class="mono" style="font-size:13px;color:var(--text)">${E(r.upc)||'—'}</b><span>Kredit pengajuan</span><b>${E(r.credit)}</b>${r.genre?`<span>Genre</span><b>${E(r.genre)}</b>`:''}</div>`)}
  ${sec(k++,'Lagu',`<div class="tracks">${r.tracks.map((x,i)=>`<div class="tr"><span class="num">${i+1}</span><span>${E(x.t)}<small style="display:block">${x.sub?E(x.sub):art(r)}</small></span><span class="mono">${E(x.isrc||'ISRC belum ada')}</span></div>`).join('')}</div>`,r.tracks.length+' lagu')}
  ${sec(k++,'Riwayat',`<div class="hist">${r.hist.slice().reverse().map(([w,t,who])=>`<div>${who==='L'?`<span class="mini lbl">${ini}</span>`:who==='SY'?'<span class="mini none" title="Sistem">S</span>':mini(who)}<span>${E(t)}<small style="display:block">${who==='L'?E(r.l):who==='SY'?'Sistem':St[who]?E(St[who][0]):'Petugas'} · ${fdt(w)}</small></span></div>`).join('')||'<p class="where">Belum ada riwayat.</p>'}</div>`)}</div>`;}
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
  if(t.closest('[data-std]')){if(!go137('standards'))toast('Buka Standar & Penanda › Aturan waktu');return;}
  if(t.closest('[data-work]')){if(!go137('work'))toast('Buka Pekerjaan untuk mengatur petugas');return;}
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
const RULEDEF={release:['Pemeriksaan rilisan','working',2],delivery:['Pengiriman rilisan','working',1],believe:['Pemeriksaan Believe','working',3],approval:['Verifikasi & persetujuan','nextday',1]};
function rule(id){const r=(policy()?.rules||[]).find(x=>x.id===id),d=RULEDEF[id];return {name:r?(Array.isArray(r.name)?r.name[0]:r.name):d[0],mode:r?.mode||d[1],value:Number(r?.value??d[2])};}
const ruleText=x=>x.mode==='nextday'?`${x.name} · hari berikutnya`:`${x.name} · ${x.value} hari kerja`;
const EVT={submit:'Pengajuan dikirim',resubmit:'Perbaikan dikirim label',question:'Label bertanya',cancel:'Label meminta pembatalan',start:'Pemeriksaan dimulai',revision:'Perbaikan diminta ke label',answer:'Pertanyaan label dijawab',approve:'Disetujui',deliver:'Dikirim ke Believe',codes:'Kode UPC/ISRC disimpan',not_found:'Belum ditemukan di toko · ditindaklanjuti ke Believe',date_error:'Kesalahan tanggal dilaporkan ke Believe',followup:'Tindak lanjut ke Believe dicatat',live:'Ditandai Tayang',reject:'Pengajuan ditolak',cancel_confirm:'Pembatalan dikonfirmasi',downgrade_offer:'Jadwal pengganti ditawarkan ke label',downgrade_accept:'Label menerima jadwal pengganti',timeout:'Ditutup otomatis · batas perbaikan lewat',reminder:'Pengingat dikirim ke label',undo_live:'Penandaan Tayang dikoreksi',close_failed:'Lagu yang gagal ditutup',assign:'Petugas diganti',taken_down:'Diturunkan dari toko',
 submitted:'Pengajuan dikirim',under_review:'Pemeriksaan dimulai',need_revision:'Perbaikan diminta ke label',rejected:'Pengajuan ditolak',approved:'Disetujui',delivered:'Dikirim ke Believe'};
const LABELSIDE=new Set(['submit','resubmit','question','cancel','submitted','downgrade_accept']);
const NOTED=new Set(['revision','reject','answer','date_error','followup','not_found','question','undo_live','close_failed']);
function history(x,eventsByTarget){const h=[];
 const who=(actor,id,kind)=>LABELSIDE.has(kind)||actor==='label'?'L':ini(id)||(actor==='import'?ini(x.handler102)||'SY':'SY');
 for(const e of x.history||[]){const kind=e.kind||e.action;if(!kind||kind==='draft')continue;const txt=kind==='ticket-result112'?(e.note||'Hasil tiket dicatat'):EVT[kind];if(!txt)continue;h.push([iso16(e.at),txt+(NOTED.has(kind)&&e.note&&kind!=='ticket-result112'?' · '+String(e.note).slice(0,90):''),who(e.actor,e.actorId102,kind)]);}
 for(const e of eventsByTarget[x.id]||[]){if(e.kind==='draft'||!EVT[e.kind])continue;let txt=EVT[e.kind];if(e.kind==='assign'&&e.note)txt=`Ditugaskan ke ${people.find(p=>p.id===e.note)?.name||e.note}`;else if(NOTED.has(e.kind)&&e.note)txt+=' · '+String(e.note).slice(0,90);h.push([iso16(e.at),txt,who(e.actor,e.actorId102,e.kind)]);}
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
 const tracks=flow?(x.songs||[]).map((t,i)=>({id:t.id,t:t.title||`Lagu ${i+1}`,isrc:t.isrc||'',sub:t.live?'Tayang':''})):
  (x.sample131?.tracks?.length?x.sample131.tracks.map((t,i)=>({t:t.title||`Lagu ${i+1}`,isrc:t.isrc||isrcList[i]||'',sub:[t.composer?`Pencipta ${t.composer}`:'',t.explicit?'Eksplisit':''].filter(Boolean).join(' · ')})):Array.from({length:Number(x.tracks)||1},(_,i)=>({t:Number(x.tracks)>1?`Lagu ${i+1}`:x.title,isrc:isrcList[i]||'',sub:''})));
 const c=calendar(),dueDate=dueOf(x,eventsByTarget)||'',due=dueDate?workDiff(day(),dueDate,c):null,ruleTxt=raw==='revision'?'Menunggu perbaikan label · 24 jam':CLOCK[raw]?ruleText(rule(CLOCK[raw][0])):'';
 const alloc=(x.allocation||[]).reduce((n,a)=>n+(Number(a.amount)||0),0)||(flow?(x.songs||[]).length:Number(x.tracks)||1)*(COST[x.service]||1);
 const credit=`${alloc} kredit · ${({reserved:'disisihkan',consumed:'terpakai',returned:'dikembalikan',none:'belum dipakai'})[x.creditState]||(PROC.has(s)?'disisihkan':'—')}`;
 const cheaper=Object.keys(COST).filter(k=>COST[k]<(COST[x.service]||1));
 return {id:x.id,t:x.title||'Tanpa judul',a,l:m?.name||x.member,m:x.member,s,raw,d:x.date,od:x.originalDate&&x.originalDate!==x.date?x.originalDate:'',h:ini(x.handler102),ver:x.version||0,flow,
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
  if(a==='start'){run(r,'start');msg='Pemeriksaan dimulai · kamu penanggung jawabnya';}
  else if(a==='approve'){run(r,'approve',r.flow?{checked:true}:{});msg='Disetujui · berikutnya kirim ke Believe';}
  else if(a==='revise'){if(!note){toast('Tulis dulu yang perlu diperbaiki');return;}run(r,'revision',r.flow?{notes:[{text:note}]}:{note});msg='Permintaan perbaikan dikirim ke label · batas 24 jam';}
  else if(a==='remind'){remind(r);msg='Pengingat dikirim ke label';}
  else if(a==='reject'){if(!note){toast('Tulis alasan penolakan untuk label');return;}run(r,'reject',{note});msg='Ditolak · label diberi tahu, kredit dikembalikan';}
  else if(a==='ship'){run(r,'deliver',r.flow?{checked:true,date:r.d}:{checked:true});msg='Pengiriman dikonfirmasi · cek hasilnya 3 hari kerja lagi';}
  else if(a==='codes'){const upc=val('f-upc');if(!upc){toast('Isi UPC dulu');return;}
   if(r.flow){const codes={};r.tracks.forEach((t,i)=>{const v=val('f-isrc-'+i);if(v)codes[t.id]=v;});run(r,'codes',{upc,codes});}
   else{const list=val('f-isrc').split(',').map(v=>v.trim()).filter(Boolean);if(list.length!==r.tracks.length){toast(`Isi ${r.tracks.length} ISRC, satu per lagu (sekarang ${list.length})`);return;}run(r,'codes',{upc,isrc:list.join(',')});}
   S.edit=false;msg='Kode tersimpan · status tetap Dalam distribusi';}
  else if(a==='live'){const link=val('f-link');if(!/^https:\/\//.test(link)){toast('Isi tautan toko yang diawali https://');return;}
   if(r.flow){const x=ten.releases.find(y=>y.id===r.id),ids=(x.songs||[]).filter(t=>t.settlement==='reserved'&&!t.live).map(t=>t.id),links=Object.fromEntries(ids.map(id=>[id,link]));run(r,'live',{checked:true,ids,links});}
   else run(r,'live',{link,checked:true});
   msg='Tayang! Label diberi tahu, kredit terpakai';}
  else if(a==='notfound'){if(r.raw==='delivered'){if(r.flow){if(!note){toast('Tulis catatan tindak lanjut');return;}run(r,'not_found',{note});}else{run(r,'not_found');if(note)run(r,'followup',{note});}}
   else{if(!note){toast('Tulis catatan tindak lanjut');return;}run(r,'followup',{note});}
   msg='Dicatat · diperiksa lagi 3 hari kerja';}
  else if(a==='dateerr'){if(!note){toast('Tulis tanggal yang tampil di toko');return;}run(r,'date_error',{note:'Tanggal di toko: '+note});msg='Kesalahan tanggal dilaporkan · label diberi tahu';}
  else if(a==='offer'){const service=val('f-svc'),date=val('f-date');if(!service||!date){toast('Pilih layanan dan tanggal pengganti');return;}run(r,'downgrade_offer',{service,date});msg='Tawaran jadwal pengganti dikirim ke label';}
  else if(a==='closefail'){if(!note){toast('Tulis alasan untuk label');return;}run(r,'close_failed',{checked:true,note});msg='Lagu yang gagal ditutup · kreditnya dikembalikan';}
  else if(a==='correct'){if(!note){toast('Tulis alasannya');return;}
   if(r.flow){const x=ten.releases.find(y=>y.id===r.id),ids=(x.songs||[]).filter(t=>t.settlement==='consumed').map(t=>t.id);run(r,'undo_live',{ids,note});}else run(r,'date_error',{note});
   msg='Dikembalikan ke Tindak lanjut Believe · label diberi tahu';}
  else if(a==='answer'){if(!note){toast('Tulis jawaban untuk label');return;}run(r,'answer',{note});msg='Jawaban dikirim · waktu perbaikan label berjalan lagi';}
  else if(a==='cancel'){run(r,'cancel_confirm',{checked:true});msg='Pembatalan dikonfirmasi · kredit dikembalikan ke label';}
 }catch(err){toast(message(err));return;}
 const moved=['reject','live','cancel'].includes(a);S.form=null;S.pick=null;
 if(!moved&&S.stage)S.stage=null;
 lastPane='';lastSig='';
 if(moved){load();const rest=items();S.sel[S.tab]=rest[0]?.id;}
 render();toast(msg);
 const it=root.querySelector(`.it[data-id="${CSS.escape(r.id)}"]`);if(it)it.classList.add('flash');}
function openLabel(member){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=member;l136.read=true;}}catch(err){}if(!go137('labels'))toast('Buka Manajemen Label');}
/* Masuk dari Pekerjaan / Dashboard / notifikasi: buka rilisan yang diminta (ui105.view='detail'). */
function intake(){if(typeof ui105!=='object'||ui105.view!=='detail'||!ui105.id)return;const id=ui105.id;ui105.view='list';ui105.id=null;load();const r=R.find(x=>x.id===id);if(!r)return;
 S.tab=PROC.has(r.s)?'proc':'cat';S.stage=null;S.q='';S.sel[S.tab]=id;S.read=true;S.form=null;S.pick=null;lastSig='';}
const sig=()=>R.map(r=>[r.id,r.raw,r.ver,r.h,r.due,r.upc,r.hist.length].join(':')).join('|')+'|'+day();
const DEF={id:'releases',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='releases'&&!state.preview,
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
/* Halaman lama tidak digambar lagi saat Rilisan baru aktif (lebih ringan). */
const modBefore137=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore137.apply(this,arguments);};

})();
