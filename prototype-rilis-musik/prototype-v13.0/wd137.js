/* v1.1.0-dev.33 — Penarikan dirancang ulang (rancangan disetujui 21 Okt 2026, mock wd1).
   Tab Dalam proses · Riwayat, pita siklus (pengajuan 1–14, bayar s.d. 20) dengan tahap Menunggu pemeriksaan → Siap dibayar →
   Sedang ditransfer → Ditunda → Koreksi, pemeriksaan sebelum menyetujui, data salin untuk transfer, hasil transfer
   Berhasil (nomor referensi wajib) / Belum pasti / Gagal, dan Unduh daftar transfer (CSV). Nama bank & kota dirapikan di
   tampilan; pengajuan di luar tanggal 1–14 masuk siklus bulan berikutnya. Data & tindakan: Withdraw108 lewat act108 (asli). */
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
@media (max-width:820px){.cpb em{display:none}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Penarikan</h1><div class="sub">Periksa pengajuan label, transfer ke rekening yang disetujui, dan catat hasilnya sampai dibayar.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,W=[],lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>'),COPY=sv('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),DL=sv('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const MON=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],MS=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const month=p=>{if(!p)return '—';const [y,m]=String(p).split('-').map(Number);return `${MON[m-1]} ${y}`;};
const mshort=p=>{const [y,m]=String(p).split('-').map(Number);return `${MS[m-1]} ${y}`;};
const rp=n=>'Rp '+Math.round(n||0).toLocaleString('id-ID');
const rps=n=>n>=1e9?`Rp ${(n/1e9).toLocaleString('id-ID',{maximumFractionDigits:2})} M`:n>=1e6?`Rp ${(n/1e6).toLocaleString('id-ID',{maximumFractionDigits:1})} jt`:rp(n);
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const inis=s=>String(s).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=(n,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(n)}">${E(inis(n))}</span>`;
const pname=id=>people.find(p=>p.id===id)?.name||'';
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const isSA=()=>!!me().super;
/* tampilan data dirapikan, data asli tidak diubah */
const bankN=b=>!b||b==='-'?'':/central asia|bca/i.test(b)?'BCA':/rakyat|bri/i.test(b)?'BRI':/negara|bni/i.test(b)?'BNI':/syariah|bsi/i.test(b)?'BSI':/mandiri/i.test(b)?'Mandiri':/cimb/i.test(b)?'CIMB Niaga':/permata/i.test(b)?'Permata':/danamon/i.test(b)?'Danamon':String(b).trim();
const bankFull={BCA:'Bank Central Asia',BRI:'Bank Rakyat Indonesia',BNI:'Bank Negara Indonesia',BSI:'Bank Syariah Indonesia',Mandiri:'Bank Mandiri'};
const city=c=>!c||c==='-'||c==='—'?'':String(c).toLowerCase().replace(/(^|\s)\S/g,x=>x.toUpperCase());
const tail=n=>n&&n!=='-'?'••'+String(n).replace(/[^\d]/g,'').slice(-4):'';
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
/* siklus: pengajuan 1–14, bayar s.d. 20; pengajuan di luar jendela masuk siklus bulan berikutnya */
const cycleOf=created=>{const [y,m,d]=String(created).slice(0,10).split('-').map(Number);if(d<=14)return `${y}-${String(m).padStart(2,'0')}`;const n=m===12?[y+1,1]:[y,m+1];return `${n[0]}-${String(n[1]).padStart(2,'0')}`;};
const STG=[['requested','Menunggu pemeriksaan','c-bl'],['ready','Siap dibayar','c-bl'],['processing','Sedang ditransfer','c-or'],['delayed','Ditunda','c-or'],['correction','Koreksi','c-red']];
const stg=k=>STG.find(s=>s[0]===k)||['paid','Dibayar','c-gr'];
const S={tab:'proc',stage:null,q:'',sel:{},read:false,form:null,pick:null,reason:'bank'};
const wide=()=>innerWidth>1240;
const EVT={request:'Diajukan oleh label',approve:'Disetujui',start:'Transfer dimulai',paid:'Dibayar',delay:'Ditunda',resume:'Dilanjutkan',bank:'Rekening diperbarui ke rekening terbaru','resolve-success':'Hasil dipastikan berhasil','resolve-failed':'Hasil dipastikan gagal',correction:'Koreksi diajukan','correction-keep':'Koreksi selesai · tetap dibayar','correction-reopen':'Koreksi · transfer gagal, dibuka lagi'};
const REASON={bank:'rekening bermasalah',service:'menunggu konfirmasi',uncertain:'hasil transfer belum pasti',other:'alasan lain'};
/* ---------- data asli ---------- */
function load(){const s=model108(),r=model107(),batches=r.batches||[];
 const refName=ref=>{const b=batches.find(x=>x.id===ref);if(!b)return ref;if(b.fingerprint==='sample131-legacy'||/saldo-awal-migrasi/i.test(b.name||''))return 'Saldo awal migrasi';return 'Laporan '+month(b.sample131?.period||b.rows[0]?.period);};
 W=(s.requests||[]).map(w=>{const created=iso(w.created),cy=w.status==='paid'?w.cycle:cycleOf(created),b=w.bank||{},bk=bankN(b.bank),acc=Withdraw108.account(r,w.account)||{};
  const ctx=(()=>{try{return context108(acc);}catch(err){return {};}})(),bankOk=!!(b.number&&b.number!=='-')&&!!ctx.bank&&Withdraw108.fingerprint(w.bank)===Withdraw108.fingerprint(ctx.bank);
  const hist=(w.events||[]).filter(e=>!e.internal||isSA()).map(e=>[iso(e.at),(EVT[e.action]||e.action)+(e.action==='delay'&&e.reason?` · ${REASON[e.reason]||e.reason}`:'')+(e.message?` · ${e.message}`:e.note?` · ${e.note}`:''),e.role==='label'?'L':ini(e.actor)||'SA']);
  if(!hist.length){hist.push([created,'Diajukan oleh label','L']);if(['ready','processing','paid'].includes(w.status))hist.push([iso(w.approved||w.started||w.created),'Disetujui',ini(w.handler)||'SA']);if(w.started)hist.push([iso(w.started),'Transfer dimulai',ini(w.handler)||'SA']);if(w.paid)hist.push([iso(w.paid),`Dibayar${w.sample131?.reference?' · referensi '+w.sample131.reference:''}`,ini(w.handler)||'SA']);}
  const openReq=(s.requests||[]).filter(x=>x.account===w.account&&x.id!==w.id&&!['paid'].includes(x.status));
  return {id:w.id,acc:w.account,name:w.name||acc.name||w.account,city:city(w.city),amount:w.amount,parts:(w.parts||[]).map(p=>[refName(p.ref),p.amount,p.member]),memo:w.memo||'',bank:bk,bankRaw:b.bank||'',number:b.number||'',holder:b.holder||'',
   status:w.status,uncertain:!!w.uncertain,reason:w.reason||'',message:w.message||'',cycle:cy,created,started:iso(w.started),paid:iso(w.paid),handler:w.handler||'',ref:w.reference||w.sample131?.reference||'',
   outside:w.status!=='paid'&&cy!==created.slice(0,7),newMemo:`ROYALTI ${mshort(cy).toUpperCase()} ${w.id}`,hist,bankOk,ctxBank:ctx.bank,hold:!!acc.hold,others:openReq.length,bankResolved:!!w.bankResolved};});}
const open_=()=>W.filter(w=>w.status!=='paid'),paidL=()=>W.filter(w=>w.status==='paid');
const dueOf=w=>`20 ${MS[+w.cycle.slice(5)-1]}`;
const lateOf=w=>w.status!=='paid'&&U.today()>w.cycle+'-20';
const match=w=>!S.q||[w.name,w.id,w.bank,w.holder,w.ref].join(' ').toLowerCase().includes(S.q);
function items(){if(S.tab==='proc'){const o=STG.map(s=>s[0]);let r=open_().filter(match);if(S.stage)r=r.filter(w=>w.status===S.stage);return r.sort((a,b)=>o.indexOf(a.status)-o.indexOf(b.status)||a.created.localeCompare(b.created));}
 return paidL().filter(match).sort((a,b)=>(b.paid||'').localeCompare(a.paid||'')||b.id.localeCompare(a.id));}
function tabs(){$('tabs').innerHTML=[['proc','Dalam proses',open_().length],['paid','Riwayat',paidL().length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const O=open_(),tot=O.reduce((n,w)=>n+w.amount,0),ready=O.filter(w=>w.status==='ready'),t=U.today(),cur=t.slice(0,7),inWin=+t.slice(8)<=14;
 const thisPaid=paidL().filter(w=>(w.paid||'').startsWith(cur)),nextCy=inWin?cur:cycleOf(t+'T00:00'),dueTxt=`20 ${MS[+nextCy.slice(5)-1]}`;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Siklus penarikan · hari ini ${U.todayLabel()}</div>
  <h2>${O.length?`${O.length} penarikan sedang berjalan · ${rps(tot)}`:'Tidak ada penarikan berjalan'}</h2>
  <p>${month(cur)}: ${thisPaid.length} dibayar ${rps(thisPaid.reduce((n,w)=>n+w.amount,0))} · ${inWin?`Pengajuan ${month(cur)} dibuka sampai tanggal 14, bayar paling lambat ${dueTxt}`:`Siklus ${month(nextCy)}: pengajuan 1–14, bayar paling lambat ${dueTxt}`}</p>
  <div class="acts"><button class="wbtn" data-urgent>Buka yang berikutnya ${ARROW}</button>${ready.length?`<button class="gbtn" data-csv>${DL} Unduh daftar transfer (${ready.length})</button>`:''}</div></div>
  <div class="statg"><div class="sbox"><b class="n">${rps(tot)}</b><span>wajib dibayar</span></div><div class="sbox"><b class="n">${rps(ready.reduce((n,w)=>n+w.amount,0))}</b><span>siap ditransfer</span></div></div></div>
  <div class="flow">${STG.map(([k,t])=>{const g=O.filter(w=>w.status===k),l=g.filter(lateOf).length;return `<button class="fn${l||k==='correction'&&g.length?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${g.length?rps(g.reduce((n,w)=>n+w.amount,0)):'kosong'}</span></button>`;}).join('')}</div>`;}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Cari label, nomor, bank, referensi" value="${E(S.q)}"></label>`;
const bankLine=w=>w.bank?`${E(w.bank)} ${tail(w.number)}`:'<span class="noart">rekening tidak tercatat · data migrasi</span>';
function list(){const r=items();let h='';
 if(S.tab==='proc'){const ready=open_().filter(w=>w.status==='ready').length;h+=`<div class="ch"><h3>Dalam proses <small class="n">${r.length}</small></h3>${ready?`<button class="btn sm" data-csv>${DL} Daftar transfer</button>`:''}${find()}</div>`;
  if(S.stage)h+=`<div class="flt"><span>Hanya <b style="font-weight:500">${stg(S.stage)[1]}</b></span><button data-stage-clear>Tampilkan semua</button></div>`;
  let cur='';r.forEach((w,i)=>{if(w.status!==cur){cur=w.status;h+=`<div class="gh"><i style="--c:var(--${{'c-bl':'blue','c-or':'orange','c-red':'red'}[stg(cur)[2]]})"></i><b>${stg(cur)[1]}</b> · ${r.filter(x=>x.status===cur).length}</div>`;}
   h+=`<div class="it${S.sel.proc===w.id?' sel':''}" data-id="${E(w.id)}" style="--i:${i}">${lav(w.name)}<div style="min-width:0"><div class="t1">${E(w.name)}${w.outside?' '+chip('Siklus '+MS[+w.cycle.slice(5)-1],'c-bl'):''}${w.uncertain?' '+chip('Perlu konfirmasi','c-or'):''}</div><div class="t2">${bankLine(w)} · diajukan ${fd(w.created.slice(0,10))}</div></div><div class="rgt"><span class="amt n">${rps(w.amount)}</span>${lateOf(w)?chip('Lewat tenggat','c-red'):`<span class="duet">s.d. ${dueOf(w)}</span>`}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${S.q?'Tidak ditemukan':'Tidak ada yang berjalan'}</b>${S.q?(paidL().filter(match).length?`<button class="lnk" data-tab="paid" data-keepq>${paidL().filter(match).length} hasil di Riwayat ${ARROW}</button>`:'Coba kata lain.'):'Semua penarikan sudah dibayar.'}</div>`;}
 else{h+=`<div class="ch"><h3>Riwayat pembayaran <small class="n">${rps(r.reduce((n,w)=>n+w.amount,0))}</small></h3>${find()}</div>`;let cur='';
  r.forEach((w,i)=>{const c=(w.paid||w.created).slice(0,7);if(c!==cur){cur=c;const g=r.filter(x=>(x.paid||x.created).slice(0,7)===c);h+=`<div class="gh"><i style="--c:var(--green)"></i><b>${month(c)}</b> · ${g.length} · ${rps(g.reduce((n,x)=>n+x.amount,0))}</div>`;}
   h+=`<div class="it${S.sel.paid===w.id?' sel':''}" data-id="${E(w.id)}" style="--i:${Math.min(i,20)}">${lav(w.name)}<div style="min-width:0"><div class="t1">${E(w.name)} <span class="mono">${E(w.id)}</span></div><div class="t2">${bankLine(w)} · dibayar ${fd((w.paid||'').slice(0,10))}</div></div><div class="rgt"><span class="amt n">${rps(w.amount)}</span></div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>Tidak ditemukan</b>Coba kata lain.</div>`;}
 $('list').innerHTML=h;}
/* ---------- rincian ---------- */
function checks(w){return [[w.bankOk,'Rekening disetujui & sama dengan pengajuan',w.bankOk?`${w.bank} ${tail(w.number)}`:w.ctxBank?'berbeda dengan rekening yang disetujui':'belum ada rekening disetujui'],[true,'Saldo cukup & sudah dicadangkan',rp(w.amount)],[!w.hold,'Akun tidak ditahan',w.hold?'pencairan ditahan':'aktif'],[w.amount>=1e6,'Minimal Rp 1.000.000',rps(w.amount)],[!w.others,'Tidak ada penarikan lain yang berjalan',w.others?`${w.others} penarikan lain`:'hanya ini'],[!w.outside,'Diajukan tanggal 1–14',w.outside?`${fd(w.created.slice(0,10))} → masuk siklus ${month(w.cycle)}`:'tepat jendela']];}
const copyRow=(k,v,show)=>`<div class="cp"><span><small>${k}</small><b>${show??E(v)}</b></span><button class="cpb" data-copy="${E(v)}" aria-label="Salin ${k}">${COPY}<em>Salin</em></button></div>`;
const canAct=()=>isSA()||(()=>{try{return typeof can108==='function'&&can108();}catch(err){return false;}})();
function next(w){const k=w.status,SA=isSA();
 const tunda=S.form==='delay'?`<div class="reveal"><div class="opts">${[['bank','Rekening bermasalah','tunggu rekening baru disetujui'],['service','Menunggu konfirmasi label','mis. nominal atau penerima'],['other','Alasan lain','tulis di catatan']].map(([v,t,m])=>`<button data-reason="${v}" aria-pressed="${S.reason===v}">${t}<small>${m}</small></button>`).join('')}</div><label class="fld">Catatan · terlihat oleh label<textarea id="f-note" placeholder="Mis. nama penerima tidak sama dengan pemilik akun"></textarea></label><div class="hrow">${btn('Tunda penarikan','data-do="delay"','pri')}${btn('Batal','data-form=""')}</div></div>`:'';
 const tBtn=S.form==='delay'||!canAct()?'':btn('Tunda','data-form="delay"','ghost dng');
 if(k==='requested'){const C=checks(w),ok=C.filter(c=>c[0]).length;return `<div class="nextc"><p>Periksa pengajuan ini. Sistem sudah mengecek ${ok} dari ${C.length} syarat.</p><div class="checks">${C.map(([g,t,m])=>`<div class="ck ${g?'':'warn'}"><b>${g?'✓':'!'}</b>${t}<small>${m}</small></div>`).join('')}</div>${w.outside?`<p class="where">Pengajuan di luar tanggal 1–14 tetap boleh disetujui; tenggat bayarnya ikut siklus ${month(w.cycle)} (${dueOf(w)}).</p>`:''}${!w.bankOk&&w.ctxBank?`<p class="where">Rekening pengajuan berbeda dengan rekening yang disetujui. Tunda dengan alasan rekening, lalu perbarui rekening.</p>`:''}<div class="hrow">${canAct()?btn('Setujui penarikan','data-do="approve"','pri',!w.bankOk):''}${tBtn}</div>${tunda}</div>`;}
 if(k==='ready')return `<div class="nextc"><p>Transfer ke rekening ini dari rekening perusahaan, lalu tekan <b>Mulai transfer</b>.</p><div class="cps">${copyRow('Bank',bankFull[w.bank]||w.bank,`${E(bankFull[w.bank]||w.bank||'—')}${w.bank&&bankFull[w.bank]?` <span class="noart">(${E(w.bank)})</span>`:''}`)}${copyRow('Nomor rekening',w.number)}${copyRow('Nama penerima',w.holder)}${copyRow('Nominal',String(w.amount),rp(w.amount))}${copyRow('Keterangan transfer',w.newMemo,`<span class="mono" style="font-size:13px;color:var(--text)">${E(w.newMemo)}</span>`)}</div>${/•/.test(w.number)?'<p class="where">Nomor rekening disamarkan di data contoh.</p>':''}<div class="hrow">${SA?btn('Mulai transfer '+ARROW,'data-do="start"','pri',!w.bankOk||w.hold):''}${tBtn}</div>${!SA?'<p class="where">Transfer hanya oleh Super Admin.</p>':''}${tunda}</div>`;
 if(k==='processing'){if(w.uncertain)return `<div class="nextc"><p>Hasil transfer <b>belum pasti</b>. Saldo tetap dicadangkan; label tidak bisa mengajukan lagi sampai dipastikan.</p>${SA?`<label class="fld">Catatan · wajib<input id="f-note" placeholder="Mis. sudah dicek di mutasi rekening"></label><div class="hrow">${btn('Ternyata berhasil','data-do="sure-ok"','pri')}${btn('Ternyata gagal','data-do="sure-fail"')}</div>`:''}</div>`;
  const OP=[['ok','Berhasil','sudah masuk mutasi'],['unsure','Belum pasti','bank belum memberi hasil'],['fail','Gagal','dana kembali / ditolak bank']];
  const rv={ok:`<label class="fld">Nomor referensi bank · wajib<input id="f-ref" placeholder="Mis. 2609251234567"></label><div class="hrow">${btn('Tandai dibayar','data-do="paid"','pri')}</div>`,unsure:`<p class="where">Penarikan tetap di Sedang ditransfer dengan tanda "Perlu konfirmasi".</p><label class="fld">Catatan<input id="f-note" placeholder="Mis. bank belum mengirim bukti"></label><div class="hrow">${btn('Tandai belum pasti','data-do="unsure"','pri')}</div>`,fail:`<label class="fld">Alasan gagal · terlihat oleh label<input id="f-note" placeholder="Mis. rekening tidak aktif"></label><div class="hrow">${btn('Tunda · transfer gagal','data-do="fail"','pri')}</div>`}[S.pick]||'';
  return `<div class="nextc"><p>Transfer dimulai oleh <b>${E(pname(w.handler)||'Super Admin')}</b>${w.started?` · ${fd(w.started)}`:''}. Bagaimana hasilnya?</p>${SA&&w.handler===state.user?`<div class="opts">${OP.map(([v,t,m])=>`<button data-pick="${v}" aria-pressed="${S.pick===v}">${t}<small>${m}</small></button>`).join('')}</div>${rv?`<div class="reveal">${rv}</div>`:''}`:'<p class="where">Hasil transfer dicatat oleh Super Admin yang memulai transfer.</p>'}</div>`;}
 if(k==='delayed'){const needBank=w.reason==='bank'&&!w.bankResolved;return `<div class="nextc"><p>Ditunda${w.reason?': '+E(REASON[w.reason]||w.reason):''}.</p>${w.message?`<p class="quote">${E(w.message)}</p>`:''}${needBank?`<p class="where">Perbarui ke rekening yang sudah disetujui sebelum melanjutkan.</p>`:''}<div class="hrow">${SA&&needBank?btn('Pakai rekening terbaru','data-do="bank"','pri'):''}${SA||canAct()?btn('Lanjutkan','data-do="resume"',needBank?'':'pri',needBank):''}</div></div>`;}
 if(k==='correction')return `<div class="nextc"><p>Pencatatan pembayaran sedang diperiksa.</p>${w.message?`<p class="quote">${E(w.message)}</p>`:''}${SA?`<label class="fld">Catatan · wajib<input id="f-note"></label><div class="hrow">${btn('Pembayaran memang berhasil','data-do="keep"','pri')}${btn('Transfer gagal, buka lagi','data-do="reopen"')}</div>`:''}</div>`;
 return `<div class="nextc ok"><p>Dibayar ${fd(w.paid)}${w.handler?` oleh ${E(pname(w.handler))}`:''}${w.ref?` · referensi <span class="mono">${E(w.ref)}</span>`:''}.</p>${!SA?'':S.form==='corr'?`<div class="reveal"><label class="fld">Kenapa perlu dikoreksi?<textarea id="f-note" placeholder="Mis. label melaporkan dana tidak masuk"></textarea></label><div class="hrow">${btn('Ajukan koreksi','data-do="correct"','pri')}${btn('Batal','data-form=""')}</div></div>`:`<div class="hrow">${btn('Ajukan koreksi','data-form="corr"','ghost')}</div>`}</div>`;}
function steps(w){const at={requested:1,ready:2,processing:3,delayed:2,correction:4,paid:5}[w.status],wait=['delayed','correction'].includes(w.status)||w.uncertain,L5=['Diajukan','Diperiksa','Siap dibayar','Ditransfer','Dibayar'];
 return `<div class="steps" style="--n:5"><i class="prog" style="--w:calc(100% * ${Math.min(at,4)} / 5)"></i>${L5.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${i===at&&w.status==='delayed'?'Ditunda':i===at&&w.status==='correction'?'Koreksi':s}</span></div>`).join('')}</div>`;}
function pane(){const w=W.find(x=>x.id===S.sel[S.tab]&&items().includes(x));
 if(!w){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>Pilih penarikan</b>Rinciannya tampil di sini.</div>`;return;}
 const s=stg(w.status);let i=0;const src=w.parts.map(([n,a])=>`<div class="lg"><span>${E(n)}<small>dicadangkan dari saldo</small></span><b class="n">${rp(a)}</b></div>`).join('');
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?'Dalam proses':'Riwayat'}</button><div class="relhd">${lav(w.name,1)}<div style="min-width:0"><div class="k">Penarikan · <span class="mono">${E(w.id)}</span></div><h2>${E(w.name)}</h2><div class="meta"><b class="n" style="font-weight:400;color:var(--text)">${rp(w.amount)}</b><span class="sep"></span>${chip(s[1],s[2])}${w.uncertain?'<span class="sep"></span>'+chip('Perlu konfirmasi','c-or'):''}</div></div></div></div>
 <div class="pb">${sec(i++,w.status==='paid'?'Keadaan':'Langkah berikutnya',next(w),w.status==='paid'?'':lateOf(w)?chip('Lewat tenggat','c-red'):`tenggat ${dueOf(w)}`)}
 ${sec(i++,'Tahapan',steps(w))}
 ${sec(i++,'Rekening tujuan',`<div class="facts"><span>Bank</span><b>${w.bank?E(bankFull[w.bank]||w.bank):'<span class="noart">tidak tercatat · data migrasi</span>'}</b><span>Nomor</span><b>${w.bank?E(w.number):'—'}</b><span>Penerima</span><b>${E(w.holder)}</b><span>Kota</span><b>${w.city||'—'}</b><span>Status</span><b>${w.bankOk?'disetujui · sama dengan rekening akun':w.bank?'berbeda dengan rekening yang disetujui':'—'}</b><span>Keterangan</span><b>${w.status==='paid'?`<span class="mono" style="font-size:12.5px;color:var(--text)">${E(w.memo)}</span> <small class="where" style="display:inline">· tercatat di bank</small>`:`<span class="mono" style="font-size:12.5px;color:var(--text)">${E(w.newMemo)}</span>`}</b></div><p class="where" style="margin-top:10px">Perubahan rekening di profil tidak mengganti rekening pengajuan ini. <button class="lnk" data-label="${E(w.acc)}">Manajemen Label</button></p>`)}
 ${sec(i++,'Sumber saldo',`<div class="ledger">${src||'<p class="where">—</p>'}</div><p class="where" style="margin-top:8px"><button class="lnk" data-go="royalty">Saldo label di Royalti</button></p>`)}
 ${sec(i++,'Riwayat proses',`<div class="hist">${w.hist.slice().reverse().map(([t,x,who])=>`<div>${who==='L'?`<span class="mini lbl">${E(inis(w.name))}</span>`:`<span class="mini">${E(who)}</span>`}<span>${E(x)}<small style="display:block">${who==='L'?E(w.name):E(people.find(p=>p.initials===who)?.name||'Super Admin')} · ${fd(t)}</small></span></div>`).join('')}</div>`)}</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(t){toast137(DEF,t);}
function open(tab,id){S.tab=tab;S.sel[tab]=id;S.form=null;S.pick=null;S.read=true;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
/* ---------- tindakan: act108 → Withdraw108.act (asli) ---------- */
function run(kind,w,p={}){return act108(kind,{id:w.id,version:model108().version,...p});}
function act(a){const w=W.find(x=>x.id===S.sel[S.tab]);if(!w)return;let msg='',moved=false;const note=val('f-note');
 try{
  if(a==='approve'){run('approve',w);msg='Disetujui · siap ditransfer';}
  else if(a==='start'){run('start',w);msg='Transfer dimulai · catat hasilnya setelah dana terkirim';}
  else if(a==='paid'){const ref=val('f-ref');if(!ref){toast('Isi nomor referensi bank');return;}run('paid',w,{note:'Referensi bank: '+ref});const x=model108().requests.find(y=>y.id===w.id);if(x){x.reference=ref;x.memo=w.newMemo;save10();}msg='Dibayar · dipindah ke Riwayat';moved=true;}
  else if(a==='unsure'){run('delay',w,{reason:'uncertain',message:note||'Hasil transfer belum dikonfirmasi bank.'});msg='Ditandai belum pasti · perlu konfirmasi';}
  else if(a==='fail'){if(!note){toast('Tulis alasan gagal');return;}run('delay',w,{reason:'other',message:note,failed:true});msg='Transfer gagal · penarikan ditunda';}
  else if(a==='sure-ok'){if(!note){toast('Tulis catatan');return;}run('resolve-success',w,{note});msg='Dipastikan berhasil · dibayar';moved=true;}
  else if(a==='sure-fail'){if(!note){toast('Tulis catatan');return;}run('resolve-failed',w,{note});msg='Dipastikan gagal · kembali ke Siap dibayar';}
  else if(a==='delay'){run('delay',w,{reason:S.reason,message:note||REASON[S.reason]});msg='Ditunda · label menerima pemberitahuan';}
  else if(a==='bank'){run('bank',w,{note:'Rekening pengajuan diperbarui ke rekening yang disetujui.'});msg='Rekening diperbarui · bisa dilanjutkan';}
  else if(a==='resume'){run('resume',w);msg='Dilanjutkan';}
  else if(a==='correct'){if(!note){toast('Tulis alasan koreksi');return;}run('correction',w,{note});msg='Koreksi diajukan · dipindah ke Dalam proses';moved=true;}
  else if(a==='keep'){if(!note){toast('Tulis catatan');return;}run('correction-keep',w,{note});msg='Tetap tercatat dibayar';moved=true;}
  else if(a==='reopen'){if(!note){toast('Tulis catatan');return;}run('correction-reopen',w,{note,failed:true});msg='Dibuka lagi · siap ditransfer ulang';}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;S.pick=null;if(S.stage&&!moved)S.stage=null;lastSig='';lastPane='';
 if(moved){load();if(a==='correct'){S.tab='proc';S.sel.proc=w.id;}else{const r=items();S.sel[S.tab]=r[0]?.id;}}
 render();toast(msg);}
function csv(){const R=open_().filter(w=>w.status==='ready');const rows=[['Bank','Nomor rekening','Nama penerima','Nominal','Keterangan','Label','Pengajuan'],...R.map(w=>[bankFull[w.bank]||w.bank,w.number,w.holder,w.amount,w.newMemo,w.name,w.id])];
 const text=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n');try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+text],{type:'text/csv'}));a.download=`daftar-transfer-${U.today()}.csv`;document.body.append(a);a.click();a.remove();}catch(e){}
 toast(`Daftar transfer diunduh · ${R.length} penarikan · ${rps(R.reduce((n,w)=>n+w.amount,0))}`);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;if(!tb.hasAttribute('data-keepq'))S.q='';S.read=false;S.form=null;paint();return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='proc';S.q='';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.stage=null;S.q='';S.tab='proc';const r=items();if(r[0])open('proc',r[0].id);else toast('Tidak ada penarikan berjalan');return;}
  if(t.closest('[data-csv]')){csv();return;}
  const cp=t.closest('[data-copy]');if(cp){try{navigator.clipboard?.writeText(cp.dataset.copy)?.catch(()=>{});}catch(err){}cp.classList.add('done');setTimeout(()=>cp.classList.remove('done'),1400);toast('Disalin: '+cp.dataset.copy);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;repane();$('f-note')?.focus();return;}
  const rs=t.closest('[data-reason]');if(rs){S.reason=rs.dataset.reason;root.querySelectorAll('[data-reason]').forEach(b=>b.setAttribute('aria-pressed',b===rs));return;}
  const pk=t.closest('[data-pick]');if(pk){S.pick=S.pick===pk.dataset.pick?null:pk.dataset.pick;repane();root.querySelector('.reveal input')?.focus({preventScroll:true});return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const lb=t.closest('[data-label]');if(lb){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=lb.dataset.label;l136.read=true;}}catch(err){}go137('labels');return;}
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast('Buka menu '+go.dataset.go);return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(S.tab,it.dataset.id);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
/* Masuk dari Pekerjaan / notifikasi / Manajemen Label: route108(id) memilih penarikan di halaman baru. */
function intake(){try{if(typeof ui108==='object'&&ui108.detail){const id=ui108.detail;ui108.detail=null;const w=W.find(x=>x.id===id);if(w){S.tab=w.status==='paid'?'paid':'proc';S.stage=null;S.q='';S.sel[S.tab]=id;S.read=true;S.form=null;S.pick=null;lastSig='';}}}catch(err){}}
const sig=()=>W.map(w=>[w.id,w.status,w.uncertain?1:0,w.handler,w.bankOk?1:0].join(':')).join('|')+'|'+U.today()+'|r:'+ten.role+state.user;
const allowed=()=>{try{return isSA()||(typeof can108==='function'&&can108());}catch(err){return false;}};
const DEF={id:'withdraw',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='withdraw'&&!state.preview&&allowed(),
 init(r){root=r;bind();},
 draw(){load();intake();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: siklus & penarikan sama dengan pita biru Penarikan */
DEF.sum=function(){load();const O=open_(),t=U.today(),cur=t.slice(0,7),inWin=+t.slice(8)<=14,nextCy=inWin?cur:cycleOf(t+'T00:00'),paid=paidL(),thisPaid=paid.filter(w=>(w.paid||'').startsWith(cur));
 return {open:O.map(w=>({id:w.id,name:w.name,amount:w.amount,status:w.status,st:stg(w.status)[1],cycle:w.cycle,created:w.created,late:lateOf(w),acc:w.acc,outside:w.outside})),tot:O.reduce((n,w)=>n+w.amount,0),inWin,cur,nextCy,
  thisPaid:{n:thisPaid.length,sum:thisPaid.reduce((n,w)=>n+w.amount,0),last:thisPaid.map(w=>w.paid).sort().at(-1)||''},paid:paid.map(w=>({id:w.id,amount:w.amount,paid:w.paid,acc:w.acc,cycle:w.cycle}))};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
/* Tenggat: pengajuan di luar tanggal 1–14 ikut siklus berikutnya (sama di Pekerjaan & Dashboard). */
if(typeof Withdraw108==='object'&&Withdraw108.overdue){const ovBefore=Withdraw108.overdue;Withdraw108.overdue=function(w,at){if(!w||w.status==='paid')return false;try{const created=iso(w.created);const cy=created?cycleOf(created):w.cycle;return U.isoDay(at||ten.now)>cy+'-20';}catch(err){return ovBefore.apply(this,arguments);}};}
})();
