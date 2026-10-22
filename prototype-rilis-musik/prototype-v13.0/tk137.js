/* v1.1.0-dev.30 — Tiket Bantuan dirancang ulang (rancangan disetujui 21 Okt 2026, mock tk1).
   Tab Dalam proses · Selesai, pita alur Baru → Ditangani → Menunggu label → Menunggu distributor → Perlu peninjauan,
   3 kelompok kategori, rincian di samping dengan satu langkah berikutnya per tahap, percakapan & catatan internal.
   Data & tindakan: ten.tickets112 lewat run112 / Tickets112.act (fungsi asli), jadi Pesan label, Kotak Masuk,
   Pekerjaan, dan rilisan yang terkait ikut berubah. Pengajuan ganda yang sudah selesai ditampilkan sebagai satu baris. */
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
.pickrow:hover{box-shadow:inset 0 0 0 1px var(--line)}
.parts{display:grid;gap:6px}
.pt{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;background:var(--white);font-size:14px;flex-wrap:wrap}
.pt>span:not(.pa){display:grid;gap:2px;min-width:0;flex:1}.pt small{color:var(--muted);font-size:12px}.pt small .mono{font-size:11px}
.pb2{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:500;flex:none;color:#fff;background:transparent;box-shadow:inset 0 0 0 1.5px var(--faint)}
.pb2.ok{background:var(--green);box-shadow:none}.pb2.fail{background:var(--red);box-shadow:none}
.pa{display:flex;gap:6px;margin-left:auto}
.files{display:grid;gap:6px;margin-top:10px}
.cmpt td.old{color:var(--muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--red) 60%,transparent)}
.thread .bub{max-width:88%}
.bub.me2{justify-self:end;background:color-mix(in srgb,var(--blue) 12%,var(--soft));border-bottom-right-radius:6px}
.bub.int{justify-self:end;background:transparent;box-shadow:inset 0 0 0 1.5px var(--line);border-style:dashed;border-bottom-right-radius:6px}
.bub .bw{display:block;margin:0 0 3px!important;font-size:11.5px;color:var(--muted)}
.comp{display:grid;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.comp textarea{font:inherit;font-size:14px;color:var(--text);background:var(--white);border:0;box-shadow:inset 0 0 0 1px var(--line);border-radius:12px;padding:10px 12px;min-height:64px;resize:vertical;outline:0}
.comp textarea:focus{box-shadow:inset 0 0 0 2px var(--blue)}
.seg2{display:inline-flex;gap:4px;background:var(--soft);border-radius:99px;padding:3px;justify-self:start}
.seg2 button{font-size:12.5px;padding:6px 12px;border-radius:99px;color:var(--muted)}
.seg2 button[aria-pressed=true]{background:var(--white);color:var(--text);box-shadow:0 1px 2px #0000001a}
.tg2{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted);margin:8px 0 2px}
.tg2 input{width:16px;height:16px;accent-color:var(--blue)}
.reveal .f2{grid-template-columns:minmax(0,1fr)}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Tiket Bantuan</h1><div class="sub">Permintaan label untuk rilisan yang sudah terkirim: perubahan, penurunan, YouTube &amp; Content ID, dan masalah lain — sampai hasilnya terkonfirmasi.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
let root=null,T=[],lastPane='',lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),CHECK=sv('<path d="m5 12 5 5 9-10"/>'),FILE=sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>');
const FAM={rel:sv('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'),yt:sv('<rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9.5 5 2.5-5 2.5z"/>'),other:sv('<circle cx="12" cy="12" r="8"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>')};
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const CAT={metadata:['Perubahan Metadata','rel'],audio:['Penggantian Audio','rel'],cover:['Penggantian Cover','rel'],takedown:['Penurunan Rilisan','rel'],availability:['Masalah Ketersediaan','rel'],cid:['Ajukan Content ID','yt'],'release-claim':['Lepaskan Klaim Video','yt'],'disable-cid':['Nonaktifkan Content ID','yt'],'royalty-issue':['Masalah Royalti','other'],general:['Permintaan Lainnya','other']};
/* dev.43 — dua bahasa: nama kategori & peristiwa model (names112/events112) belum punya versi Inggris, jadi dipetakan di sini */
const CAT_EN={metadata:'Metadata change',audio:'Audio replacement',cover:'Cover replacement',takedown:'Release takedown',availability:'Availability issue',cid:'Content ID request','release-claim':'Video claim release','disable-cid':'Disable Content ID','royalty-issue':'Royalty issue',general:'Other request'};
const EVT_EN={created:'Request submitted',claim:'Handling started',assign:'Handling reassigned',request:'More information requested',complete:'More information sent',send:'Forwarded to distributor',followup:'Follow-up recorded',results:'Check results recorded',finish:'Ticket completed',internal:'Internal note',escalate:'Case escalated','clear-escalation':'Review recorded','report-again':'Issue reported again',reopen:'Case reopened','link-new':'Related ticket linked',message:'Message added',extend:'Additional impact reported'};
/* teks tetap dari model / catatan otomatis modul ini (bukan ketikan pengguna) */
const FIX_EN={'Permintaan umum':'General request','Permintaan lainnya':'Other request','Masalah royalti':'Royalty issue','Seluruh rilisan dan semua lagu':'Entire release and all tracks','Cover rilisan':'Release cover','Judul rilisan':'Release title','Judul':'Title','Genre':'Genre','Subgenre':'Subgenre','Tahun':'Year','© Pemilik karya':'© Copyright owner','℗ Pemilik rekaman':'℗ Master owner','Artis utama':'Primary artist','Artis tambahan':'Featured artist','Bahasa lagu':'Song language','Bahasa lirik':'Lyrics language','Lirik':'Lyrics','Komposer':'Composer','Penulis lirik':'Lyricist','Arranger':'Arranger','Produser':'Producer','Konten eksplisit':'Explicit content',
 'Terkonfirmasi distributor':'Confirmed by distributor','Selesai lewat percakapan.':'Completed via conversation.','Kelengkapan diminta.':'More information requested.','Dijawab lewat percakapan.':'Answered via conversation.','Dijawab dan diselesaikan.':'Answered and completed.','Hasil distributor dicatat.':'Distributor results recorded.','Semua bagian sudah terkonfirmasi distributor.':'All parts confirmed by the distributor.','Permintaan diteruskan ke distributor.':'Request forwarded to the distributor.',
 'Revisi Metadata':'Metadata revision','Pindah Aggregator':'Aggregator change','Konflik Hak Cipta':'Copyright conflict','Konflik Internal':'Internal conflict','Pengembalian dana layanan lama':'Legacy service refund'};
const fx=s=>{if(!en137()||s==null)return s;const v=String(s);if(FIX_EN[v])return FIX_EN[v];const k=v.lastIndexOf(' · ');return k>0&&FIX_EN[v.slice(k+3)]?v.slice(0,k+3)+FIX_EN[v.slice(k+3)]:v;};
const au=s=>{if(!en137()||s==null)return s;const v=String(s);if(FIX_EN[v])return FIX_EN[v];const m=v.match(/^Dialihkan ke (.+) oleh Super Admin\.$/);if(m)return `Reassigned to ${m[1]} by Super Admin.`;const r=v.match(/^Pengingat: (.*)$/s);if(r)return 'Reminder: '+(r[1]==='mohon lengkapi permintaan ini agar bisa kami lanjutkan.'?'please complete this request so we can continue.':r[1]);return v;};
/* judul percakapan (subject133) → sisi Inggris bila ada pasangannya di model */
const subjL=(t,s)=>{if(!en137()||!s)return s;try{const f=t?.request?.from137,th=f&&typeof threadStore131==='function'?threadStore131().tickets.find(x=>x.id===f):null;if(Array.isArray(th?.subject)&&th.subject[0]===s&&th.subject[1])return th.subject[1];}catch(err){}
 try{const tp=typeof topics133!=='undefined'?topics133.find(x=>x[1]===s):null;if(tp)return tp[2];}catch(err){}return fx(s);};
const pl=(n,one,many)=>`${n} ${n===1?one:many}`;
const ST={new:[['Baru','New'],'c-bl'],handling:[['Ditangani','In progress'],'c-bl'],label:[['Menunggu label','Waiting for label'],'c-or'],dist:[['Menunggu distributor','Waiting for distributor'],'c-bl'],review:[['Perlu peninjauan · Super Admin','Needs review · Super Admin'],'c-red'],done:[['Selesai','Done'],'c-gr']};
const stL=s=>ST[s]?$t(ST[s][0][0],ST[s][0][1]):s;
const FLOW=[['new','Baru','New'],['handling','Ditangani','In progress'],['label','Menunggu label','Waiting for label'],['dist','Menunggu distributor','Waiting for distributor'],['review','Perlu peninjauan','Needs review']];
const flL=f=>$t(f[1],f[2]);
const S={tab:'proc',stage:null,fam:'all',q:'',sel:{},read:false,form:null,mode:'reply',align:false,fail:null,to:''};
const ini=id=>people.find(p=>p.id===id)?.initials||'';
const pname=id=>people.find(p=>p.id===id)?.name||'';
const STAFF=()=>Object.fromEntries(people.map(p=>[p.initials,[p.name,p.super?'Super Admin':$t('Staf','Staff')]]));
const mini=h=>{const s=STAFF()[h];return h&&s?`<span class="mini" title="${E(s[0])}">${h}</span>`:`<span class="mini none" title="${$t('Belum ada petugas','Unassigned')}">–</span>`;};
const isSA=()=>!!me().super;
const wide=()=>innerWidth>1240;
/* ---------- data asli ---------- */
const stageOf=t=>t.status==='done'?'done':t.escalated?'review':({submitted:'new',handling:'handling',label:'label',distributor:'dist'})[t.status]||'handling';
const CONV={created:1,message:1,complete:1,'report-again':1,extend:1,request:1,send:1,finish:1,internal:1};
function dueOf(t){if(t.status==='distributor'&&t.nextFollowup)return U.isoDay(t.nextFollowup);
 if(t.status==='submitted'){const rl=U.rule('support',[['Respons awal tiket','Initial ticket response'],'working',1]),base=U.isoDay(t.created);return rl.mode==='nextday'?U.addDay(base,rl.value):U.addWork(base,rl.value);}
 return '';}
function rows(){try{return typeof rows112==='function'?rows112():(Tickets112.init(ten).tickets||[]);}catch(err){return [];}}
function toRow(t,mem){const m=mem[t.member]||{},src=t.source||{},cat=CAT[t.category]||[t.category,'other'],s=stageOf(t),today=U.today();
 const staff=a=>people.some(p=>p.id===a);
 const items=(t.items||[]).map(it=>({id:it.id,label:fx(it.label||it.id),s:it.status==='confirmed'?'ok':it.status==='blocked'?'fail':'wait',note:it.note||'',ref:it.reference||'',before:it.before,after:it.after}));
 const hist=t.history||[];
 const msgs=hist.filter(h=>CONV[h.action]&&String(h.note||'').trim()).map(h=>{const who=staff(h.actor)?ini(h.actor):'L',internal=h.action==='internal'||h.public===false;
  const pre={request:$t('Mohon lengkapi: ','Please provide: '),send:$t('Diteruskan ke distributor · ','Forwarded to distributor · '),finish:$t('Selesai · ','Done · ')}[h.action]||'';return [who+(internal?'!':''),pre+au(h.note),U.iso16(h.at)];});
 const act=hist.map(h=>{const who=staff(h.actor)?ini(h.actor):'L';let x=(en137()&&EVT_EN[h.action])||(typeof events112==='object'&&events112[h.action])||h.action;
  if(h.action==='assign'&&h.note)x+=' · '+String(au(h.note)).slice(0,80);if(['escalate','clear-escalation','followup','results'].includes(h.action)&&h.note)x+=' · '+String(au(h.note)).slice(0,90);return [U.iso16(h.at),x,who];});
 const req=t.request||{};
 const changes=items.filter(i=>i.before!==undefined||i.after!==undefined).map(i=>[i.label,i.before??'—',i.after??'—']);
 const files=[...(req.files||[]).map(f=>f?.name||f),req.audio?.name&&$t(`Audio baru · ${req.audio.name}`,`New audio · ${req.audio.name}`),req.cover?.name&&$t(`Cover baru · ${req.cover.name}`,`New cover · ${req.cover.name}`)].filter(Boolean);
 const dueDate=dueOf(t),due=dueDate?U.workDiff(today,dueDate):null;
 const lastReq=[...hist].reverse().find(h=>h.action==='request');
 return {id:t.id,raw:t.status,s,cat:t.category,fam:cat[1],catName:(en137()&&CAT_EN[t.category])||cat[0],title:(src.title||'Permintaan umum')==='Permintaan umum'?$t('Permintaan umum','General request'):src.title,artist:src.artist&&src.artist!=='-'?src.artist:'',lab:m.name||t.account||t.member,member:t.member,
  release:t.release&&!String(t.release).startsWith('account:')?t.release:'',handler:t.handler||'',h:ini(t.handler),ver:t.version||0,created:U.iso16(t.created),sent:U.iso16(t.lastSent||t.sentAt),
  done:U.iso16(t.completed||(t.status==='done'?t.updated:0)),since:U.iso16(lastReq?.at||t.updated),required:t.required||lastReq?.note||'',esc:t.escalationNote||'',reopen:t.reopenRequest||null,reference:t.reference||'',
  req:req.note||'',reason:req.reason||'',items,msgs,act,changes,files,dueDate,due,summary:t.summary||'',merged:0,mergedIds:[]};}
function load(){const mem=Object.fromEntries((ten.members||[]).map(m=>[m.id,m]));const all=rows().map(t=>toRow(t,mem));
 /* Pengajuan ganda yang sudah selesai (rilisan & kategori sama) digabung jadi satu baris — data tidak diubah. */
 const groups={},out=[];
 for(const r of all){if(r.s!=='done'){out.push(r);continue;}const k=(r.release||r.member)+'|'+r.cat;(groups[k]||(groups[k]=[])).push(r);}
 for(const g of Object.values(groups)){g.sort((a,b)=>String(b.done).localeCompare(String(a.done)));const top=g[0];top.merged=g.length-1;top.mergedIds=g.slice(1).map(x=>x.id);out.push(top);}
 T=out;}
/* ---------- izin ---------- */
const PERM={claim:'claim',assign:'assign',request:'request',send:'send',followup:'send',results:'finish',finish:'finish'};
function can(t,a){if(typeof write112==='function'&&!write112())return false;
 if(['assign','clear-escalation'].includes(a)&&!isSA())return false;
 if(a==='claim'){if(!(t.raw==='submitted'&&!t.handler))return false;}
 else if(a!=='message'&&!(isSA()||t.handler===state.user))return false;
 try{return typeof may114!=='function'||may114('tickets',PERM[a]||'handle',t.member);}catch(err){return true;}}
/* ---------- tampilan (port dari mock tk1) ---------- */
const isOpen=t=>t.s!=='done';
const dueTxt=t=>{if(t.due==null)return t.s==='label'?`<span class="duet">${$t('sejak','since')} ${fd(t.since).split(' · ')[0]}</span>`:'';
 if(t.s==='dist'||t.raw==='distributor')return t.due<0?chip($t(`Tindak lanjut lewat ${-t.due} hari`,`Follow-up overdue by ${pl(-t.due,'day','days')}`),'c-red'):t.due===0?chip($t('Tindak lanjut hari ini','Follow-up due today'),'c-or'):`<span class="duet">${$t('tindak lanjut','follow-up')} ${U.dlabel(t.dueDate)}</span>`;
 return t.due<0?chip($t(`Terlambat ${-t.due} hari`,`Overdue by ${pl(-t.due,'day','days')}`),'c-red'):t.due===0?chip($t('Hari ini','Due today'),'c-or'):`<span class="duet">${U.dlabel(t.dueDate)}</span>`;};
const match=t=>!S.q||[t.id,t.title,t.artist,t.lab,t.catName,...t.mergedIds].join(' ').toLowerCase().includes(S.q);
function items(){let r=T.filter(t=>(S.tab==='proc')===isOpen(t)).filter(match);if(S.fam!=='all')r=r.filter(t=>t.fam===S.fam);if(S.tab==='proc'&&S.stage)r=r.filter(t=>t.s===S.stage);const o=['review','new','handling','label','dist'];
 return S.tab==='proc'?r.sort((a,b)=>o.indexOf(a.s)-o.indexOf(b.s)||(a.due??99)-(b.due??99)):r.sort((a,b)=>String(b.done).localeCompare(String(a.done)));}
function tabs(){$('tabs').innerHTML=[['proc',$t('Dalam proses','In progress'),T.filter(isOpen).length],['done',$t('Selesai','Done'),T.filter(t=>!isOpen(t)).length]].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}<b>${n}</b></button>`).join('');}
function band(){const P=T.filter(isOpen),late=P.filter(t=>t.due!=null&&t.due<0).length,merged=T.reduce((n,t)=>n+(t.merged||0),0);
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Tiket Bantuan · hari ini','Support Tickets · today')} ${U.todayLabel()}</div><h2>${P.length?$t(`${P.length} tiket berjalan`,`${pl(P.length,'ticket','tickets')} in progress`):$t('Tidak ada tiket berjalan','No tickets in progress')}</h2>
  <p>${$t(`${late} lewat tenggat atau tindak lanjut`,`${late} overdue (deadline or follow-up)`)} · ${$t(`${P.filter(t=>t.s==='review').length} perlu peninjauan Super Admin`,`${P.filter(t=>t.s==='review').length} need Super Admin review`)}${merged?$t(` · ${merged} pengajuan ganda sudah digabung`,` · ${pl(merged,'duplicate request','duplicate requests')} merged`):''}</p>
  <div class="acts">${P.length?`<button class="wbtn" data-urgent>${$t('Buka yang berikutnya','Open the next one')} ${ARROW}</button>`:''}<button class="gbtn" data-std>${$t('Standar penanganan','Handling standards')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${P.filter(t=>t.s==='dist').length}</b><span>${$t('di distributor','at distributor')}</span></div><div class="sbox"><b class="n">${P.filter(t=>t.s==='label').length}</b><span>${$t('menunggu label','waiting for label')}</span></div></div></div>
  <div class="flow">${FLOW.map(f=>{const k=f[0],t=flL(f),g=P.filter(x=>x.s===k),l=g.filter(x=>x.due!=null&&x.due<0).length;return `<button class="fn${l||k==='review'&&g.length?' hot':''}${g.length?'':' zero'}" data-stage="${k}" aria-pressed="${S.tab==='proc'&&S.stage===k}"><span class="dot n">${g.length}</span><span class="t">${t}</span><span class="d">${k==='review'?(g.length?$t('keputusan Super Admin','Super Admin decision'):$t('kosong','empty')):l?l+$t(' lewat tenggat',' overdue'):g.length?$t('tepat waktu','on time'):$t('kosong','empty')}</span></button>`;}).join('')}</div>`;}
function list(){const r=items();let h='';const base=T.filter(t=>(S.tab==='proc')===isOpen(t)).filter(match),cnt=k=>k==='all'?base.length:base.filter(t=>t.fam===k).length;
 const find=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari rilisan, label, atau nomor tiket','Search releases, labels or tickets')}" value="${E(S.q)}"></label>`;
 h+=`<div class="ch"><h3>${S.tab==='proc'?$t('Dalam proses','In progress'):$t('Selesai','Done')} <small class="n">${r.length}</small></h3>${find}</div><div class="pills">${[['all',$t('Semua','All')],['rel',$t('Rilisan','Releases')],['yt','YouTube & Content ID'],['other',$t('Lainnya','Other')]].map(([k,t])=>`<button data-fam="${k}" aria-pressed="${S.fam===k}">${t}<b class="n">${cnt(k)}</b></button>`).join('')}</div>`;
 if(S.stage&&S.tab==='proc')h+=`<div class="flt"><span>${$t('Hanya','Only')} <b style="font-weight:500">${flL(FLOW.find(f=>f[0]===S.stage))}</b></span><button data-stage-clear>${$t('Tampilkan semua','Show all')}</button></div>`;
 let cur='';r.forEach((t,i)=>{const g=S.tab==='proc'?t.s:'done';if(g!==cur){cur=g;h+=`<div class="gh"><i style="--c:var(--${{new:'blue',handling:'blue',label:'orange',dist:'blue',review:'red',done:'green'}[g]})"></i><b>${g==='done'?$t('Selesai','Done'):flL(FLOW.find(f=>f[0]===g))}</b> · ${r.filter(x=>(S.tab==='proc'?x.s:'done')===g).length}</div>`;}
  const prog=t.items.length>1?` · ${t.items.filter(p=>p.s==='ok').length}/${t.items.length} ${$t('bagian','parts')}`:'';
  h+=`<div class="it${S.sel[S.tab]===t.id?' sel':''}" data-id="${E(t.id)}" style="--i:${i}"><span class="ty">${FAM[t.fam]}</span><div style="min-width:0"><div class="t1">${E(t.title)} ${chip(E(t.catName),'')}${t.merged?' '+chip($t(`${t.merged+1} pengajuan digabung`,`${t.merged+1} requests merged`),'c-bl'):''}</div><div class="t2">${E(t.lab)}${t.artist?' · '+E(t.artist):''} · <span class="mono">${E(t.id)}</span>${prog}</div></div><div class="rgt">${S.tab==='proc'?dueTxt(t)+mini(t.h):`<span class="duet">${fd(String(t.done).slice(0,10))}</span>`}</div></div>`;});
 if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada tiket','No tickets')}</b>${S.q||S.fam!=='all'||S.stage?$t('Coba ubah pencarian atau pil.','Try changing the search or filter.'):S.tab==='proc'?$t('Semua tiket sudah selesai. Tiket baru dari label (menu Pesan) muncul di sini.','All tickets are done. New tickets from labels (Messages menu) appear here.'):$t('Belum ada tiket selesai.','No completed tickets yet.')}</div>`;
 $('list').innerHTML=h;}
/* ---------- rincian ---------- */
const partRows=(t,edit)=>`<div class="parts">${t.items.map((p,i)=>`<div class="pt"><b class="pb2 ${p.s}">${p.s==='ok'?'✓':p.s==='fail'?'!':''}</b><span><span class="pn">${E(p.label)}</span><small>${p.s==='ok'?`${E(p.note?au(p.note):$t('Terkonfirmasi','Confirmed'))}${p.ref?` · <span class="mono">${E(p.ref)}</span>`:''}`:p.s==='fail'?`${$t('Ada kendala','Issue')} · ${E(p.note)}`:$t('menunggu hasil','awaiting result')}</small></span>${edit&&p.s!=='ok'?`<span class="pa">${btn($t('Terkonfirmasi','Confirmed'),`data-part="${i}|ok"`,'sm')}${p.s==='wait'?btn($t('Ada kendala','Issue found'),`data-part="${i}|fail"`,'sm ghost dng'):''}</span>`:''}</div>${S.fail===i&&edit?`<div class="reveal" style="margin:2px 0 6px"><label class="fld">${$t('Kendala dari distributor','Issue from the distributor')}<textarea id="f-fail" placeholder="${$t('Mis. Believe meminta bukti hak','E.g. Believe asks for proof of rights')}"></textarea></label><div class="hrow">${btn($t('Catat kendala','Record issue'),`data-part="${i}|blocked"`,'dng')}${btn($t('Batal','Cancel'),'data-cancel-fail')}</div></div>`:''}`).join('')}</div>`;
const escForm=t=>S.form==='esc'?`<div class="reveal"><label class="fld">${$t('Alasan eskalasi ke Super Admin · terlihat oleh label','Reason for escalating to Super Admin · visible to the label')}<textarea id="f-note"></textarea></label><div class="hrow">${btn($t('Eskalasi','Escalate'),'data-do="escalate"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
const askForm=()=>S.form==='ask'?`<div class="reveal"><label class="fld">${$t('Yang perlu dilengkapi label','What the label needs to provide')}<textarea id="f-note" placeholder="${$t('Mis. unggah surat pernyataan hak','E.g. upload a rights statement letter')}"></textarea></label><div class="hrow">${btn($t('Minta kelengkapan','Request more information'),'data-do="ask"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
const nextFollow=()=>{const c=U.cal(),n=Number(U.policy()?.ticketDays)||3;return U.addWork(U.today(),n,c);};
function next(t){const all=t.items.length&&t.items.every(p=>p.s==='ok'),anyFail=t.items.some(p=>p.s==='fail');
 const escBtn=S.form||!can(t,'escalate')?'':`<div class="hrow mini2">${btn($t('Eskalasi ke Super Admin','Escalate to Super Admin'),'data-form="esc"','ghost')}</div>`;
 if(t.s==='review'){const who=pname(t.handler);return `<div class="nextc"><p><b>${E(who||$t('Petugas','Assignee'))}</b> ${$t('meminta peninjauan Super Admin:','asked for a Super Admin review:')}</p><p class="quote">${E(t.esc||'—')}</p>${!isSA()?`<p class="where">${$t('Menunggu keputusan Super Admin.','Awaiting a Super Admin decision.')}</p>`:S.form==='rev'?`<div class="reveal"><label class="fld">${$t('Hasil peninjauan · tercatat di tiket','Review result · recorded on the ticket')}<textarea id="f-note" placeholder="${$t('Mis. minta bukti kerja sama tertulis dari label','E.g. ask the label for written proof of the partnership')}"></textarea></label><div class="hrow">${btn($t('Catat & lanjutkan penanganan','Record & continue handling'),'data-do="reviewed"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:S.form==='to'?`<div class="reveal"><div class="fld">${$t('Alihkan ke','Reassign to')}<div class="opts">${people.filter(p=>p.id!==t.handler).map(p=>`<button data-to="${p.id}" aria-pressed="${S.to===p.id}">${E(p.name)}<small>${p.super?'Super Admin':$t('Staf','Staff')}</small></button>`).join('')}</div></div><div class="hrow">${btn($t('Alihkan','Reassign'),'data-do="reassign"','pri',!S.to)}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:`<div class="hrow">${btn($t('Catat peninjauan','Record review'),'data-form="rev"','pri')}${btn($t('Alihkan ke petugas lain','Reassign to another assignee'),'data-form="to"')}</div>`}</div>`;}
 if(t.s==='new')return `<div class="nextc"><p>${$t('Permintaan baru dari','New request from')} <b>${E(t.lab)}</b>. ${$t('Belum ada petugas.','Unassigned.')}</p><div class="hrow">${can(t,'claim')?btn($t('Mulai penanganan ','Start handling ')+ARROW,'data-do="start"','pri'):''}</div><p class="where">${$t('Menekan Mulai penanganan menjadikanmu petugasnya.','Pressing Start handling makes you the assignee.')}</p></div>`;
 if(t.s==='handling'){if(!can(t,'send')&&!can(t,'request'))return `<div class="nextc"><p>${$t('Ditangani oleh','Handled by')} <b>${E(pname(t.handler)||$t('petugas lain','another assignee'))}</b>.</p></div>`;
  const other=t.fam==='other',roy=t.cat==='royalty-issue';
  const fwd=S.form==='fwd'?`<div class="reveal"><div class="f2"><label class="fld">${$t('Nomor referensi distributor','Distributor reference number')}<input id="f-ref" placeholder="${$t('Mis. Believe #4821','E.g. Believe #4821')}"></label></div><label class="fld">${$t('Catatan · terlihat oleh label','Note · visible to the label')}<textarea id="f-note">${$t('Permintaan diteruskan ke distributor.','Request forwarded to the distributor.')}</textarea></label>${S.align?`<label class="tg2"><input type="checkbox" id="f-align"> ${$t('Sudah diselaraskan dengan tiket terkait untuk rilisan ini','Aligned with the related tickets for this release')}</label>`:''}<p class="where">${$t('Tindak lanjut otomatis','Automatic follow-up')} ${U.dlabel(nextFollow())} (${Number(U.policy()?.ticketDays)||3} ${$t('hari kerja','working days')}).</p><div class="hrow">${btn($t('Teruskan','Forward'),'data-do="forward"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  const ans=S.form==='answer'?`<div class="reveal"><label class="fld">${$t('Jawaban ke label','Answer to the label')}<textarea id="f-note" placeholder="${roy?$t('Mis. laporan Juli memuat 14 label; pendapatan turun karena…','E.g. the July report covers 14 labels; revenue fell because…'):$t('Tulis jawaban yang jelas','Write a clear answer')}"></textarea></label><div class="hrow">${btn($t('Kirim & selesaikan','Send & complete'),'data-do="answer"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>${other?(roy?$t('Periksa laporan royalti label ini, lalu jawab.',"Check this label's royalty report, then answer."):$t('Baca permintaannya, lalu jawab.','Read the request, then answer.')):$t('Periksa permintaan dan lampirannya, lalu teruskan ke distributor.','Check the request and its attachments, then forward it to the distributor.')}</p><div class="hrow">${other?(roy?btn($t('Buka Royalti ','Open Royalties ')+ARROW,'data-go="royalty"'):'')+(S.form?'':btn($t('Jawab & selesaikan','Answer & complete'),'data-form="answer"','pri')):(S.form?'':btn($t('Teruskan ke distributor ','Forward to distributor ')+ARROW,'data-form="fwd"','pri'))}${S.form||!can(t,'request')?'':btn($t('Minta kelengkapan','Request more information'),'data-form="ask"')}</div>${fwd}${ans}${askForm()}${escForm(t)}${escBtn}</div>`;}
 if(t.s==='label')return `<div class="nextc"><p>${$t('Menunggu label sejak','Waiting for label since')} ${fd(t.since)}.</p>${t.required?`<p class="quote">${E(au(t.required))}</p>`:''}<p class="where">${$t('Tiket kembali ke Ditangani saat label mengirim kelengkapan dari menu Pesan.','The ticket returns to In progress when the label sends the information from the Messages menu.')}</p><div class="hrow">${can(t,'message')?btn($t('Kirim pengingat','Send reminder'),'data-do="remind"'):''}</div></div>`;
 if(t.s==='dist'){const edit=can(t,'results');
  const fu=S.form==='fu'?`<div class="reveal"><label class="fld">${$t('Catatan tindak lanjut','Follow-up note')}<textarea id="f-note" placeholder="${$t('Mis. Believe belum membalas, sudah ditanyakan ulang','E.g. Believe has not replied, asked again')}"></textarea></label><label class="fld">${$t('Periksa lagi pada','Check again on')}<input id="f-next" type="date" value="${nextFollow()}"></label><div class="hrow">${btn($t('Simpan tindak lanjut','Save follow-up'),'data-do="followup"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  const fin=S.form==='fin'?`<div class="reveal"><label class="fld">${$t('Ringkasan untuk label','Summary for the label')}<textarea id="f-note">${$t('Semua bagian sudah terkonfirmasi distributor.','All parts confirmed by the distributor.')}</textarea></label><div class="hrow">${btn($t('Selesaikan tiket','Complete ticket'),'data-do="finish"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:'';
  return `<div class="nextc"><p>${$t('Diteruskan ke distributor','Forwarded to the distributor')} ${fd(t.sent)}${t.reference?` · <span class="mono">${E(t.reference)}</span>`:''}. ${$t('Catat hasil tiap bagian.','Record the result of each part.')}</p>${partRows(t,edit)}<div class="hrow">${can(t,'finish')&&!S.form?btn($t('Tandai selesai','Mark as done'),'data-form="fin"','pri',!all):''}${can(t,'followup')&&!S.form?btn($t('Catat tindak lanjut ke distributor','Record distributor follow-up'),'data-form="fu"',t.due!=null&&t.due<=0&&!all?'pri':''):''}</div>${anyFail?`<p class="where">${$t('Ada bagian dengan kendala — minta kelengkapan ke label atau teruskan ulang setelah diperbaiki.','A part has an issue — request more information from the label or forward again once it is fixed.')}</p>`:''}${!all&&!anyFail?`<p class="where">${$t('Selesai aktif setelah semua bagian terkonfirmasi.','Mark as done becomes available once all parts are confirmed.')}</p>`:''}${fu}${fin}${askForm()}${escForm(t)}${escBtn}</div>`;}
 return `<div class="nextc ok"><p>${$t('Selesai','Done')} ${fd(t.done)}.${t.merged?$t(` ${t.merged} pengajuan serupa digabung ke baris ini (${t.mergedIds.slice(0,6).join(', ')}${t.mergedIds.length>6?', …':''}).`,` ${pl(t.merged,'similar request','similar requests')} merged into this row (${t.mergedIds.slice(0,6).join(', ')}${t.mergedIds.length>6?', …':''}).`):''}</p>${t.summary?`<p class="quote">${E(au(t.summary))}</p>`:''}${t.items.length?partRows(t,false):''}${t.reopen&&can(t,'reopen')?(S.form==='reopen'?`<div class="reveal"><label class="fld">${$t('Catatan pembukaan kembali','Reopening note')}<textarea id="f-note"></textarea></label><div class="hrow">${btn($t('Buka kembali','Reopen'),'data-do="reopen"','pri')}${btn($t('Batal','Cancel'),'data-form=""')}</div></div>`:`<p class="where">${$t('Label melaporkan masalah ini berulang.','The label reported that this issue happened again.')}</p><div class="hrow">${btn($t('Buka kembali · masalah berulang','Reopen · recurring issue'),'data-form="reopen"','pri')}</div>`):''}</div>`;}
function steps(t){const L=en137()?['Submitted','In progress','Forwarded','Done']:['Diajukan','Ditangani','Diteruskan','Selesai'],at={new:0,handling:1,label:1,review:1,dist:2,done:4}[t.s],wait=['label','review'].includes(t.s);
 return `<div class="steps" style="--n:4"><i class="prog" style="--w:calc(100% * ${Math.min(at,3)} / 4)"></i>${L.map((s,i)=>`<div class="st ${i<at?'done':i===at?(wait?'wait':'now'):''}"><span class="b">${i<at?CHECK:''}</span><span>${i===at&&t.s==='label'?$t('Menunggu label','Waiting for label'):i===at&&t.s==='review'?$t('Peninjauan','Review'):s}</span></div>`).join('')}</div>`;}
function convo(t){const St=STAFF(),me2=ini(state.user);const who=w=>w==='L'?['lbl',E(t.lab)]:[w===me2?'me':'them',E(St[w]?.[0]||$t('Petugas','Assignee'))];
 const canNote=can(t,'internal'),canMsg=can(t,'message')&&t.s!=='done';
 if(!canNote&&S.mode==='note')S.mode='reply';
 return `<div class="thread">${t.msgs.map(([w,x,at])=>{const internal=w.endsWith('!'),[cls,name]=who(w.replace('!',''));return `<div class="bub ${internal?'int':cls==='lbl'?'them':'me2'}"><small class="bw">${internal?$t('Catatan internal · ','Internal note · '):''}${name}</small>${E(x)}<small>${fd(at)}</small></div>`;}).join('')||`<p class="where">${$t('Belum ada percakapan.','No conversation yet.')}</p>`}</div>
 ${canMsg||canNote?`<div class="comp"><div class="seg2">${canMsg?`<button data-mode="reply" aria-pressed="${S.mode==='reply'}">${$t('Balas ke label','Reply to label')}</button>`:''}${canNote?`<button data-mode="note" aria-pressed="${S.mode==='note'}">${$t('Catatan internal','Internal note')}</button>`:''}</div><textarea id="f-msg" placeholder="${S.mode==='reply'?$t('Tulis balasan · terlihat oleh label','Write a reply · visible to the label'):$t('Hanya terlihat oleh tim','Only visible to the team')}"></textarea><div class="hrow">${btn(S.mode==='reply'?$t('Kirim ke label','Send to label'):$t('Simpan catatan','Save note'),'data-do="msg"','pri')}<span class="where">${$t('Pesan tidak mengubah status tiket.','Messages do not change the ticket status.')}</span></div></div>`:''}`;}
function pane(){const t=items().find(x=>x.id===S.sel[S.tab]);if(!t){$('pin').innerHTML=`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih tiket','Select a ticket')}</b>${$t('Rinciannya tampil di sini.','Its details appear here.')}</div>`;return;}let i=0;
 const links=t.cat==='royalty-issue'?`<button class="lnk" data-go="royalty">${$t('Royalti','Royalties')}</button>`:t.release?`<button class="lnk" data-rel="${E(t.release)}">${$t('Rilisan','Release')}</button>`:'';
 const ini2=String(t.lab).split(' ').map(z=>z[0]).join('').slice(0,2).toUpperCase();
 $('pin').innerHTML=`<div class="hd"><button class="back" data-back>${BACK}${S.tab==='proc'?$t('Dalam proses','In progress'):$t('Selesai','Done')}</button><div class="k"><span class="ty">${FAM[t.fam]}</span>${E(t.catName)} · <span class="mono">${E(t.id)}</span></div><h2>${E(t.title)}</h2><div class="meta">${E(t.lab)}${t.artist?`<span class="sep"></span>${E(t.artist)}`:''}${links?`<span class="sep"></span>${links}`:''}<span class="sep"></span>${chip(stL(t.s),ST[t.s][1])}</div></div>
 <div class="pb">${sec(i++,isOpen(t)?$t('Langkah berikutnya','Next step'):$t('Keadaan','Status'),next(t),isOpen(t)?dueTxt(t):'')}
 ${sec(i++,$t('Tahapan','Stages'),steps(t))}
 ${sec(i++,$t('Permintaan','Request'),`${t.req?`<p class="para">${E(t.req)}</p>`:''}${t.reason?`<p class="where">${$t('Alasan:','Reason:')} ${E(au(t.reason))}</p>`:''}${t.changes.length?`<div class="cmpw" style="margin-top:10px"><table class="cmpt"><thead><tr><th></th><th>${$t('Sebelumnya','Before')}</th><th>${$t('Usulan','Suggested')}</th></tr></thead><tbody>${t.changes.map(([f,a,b])=>`<tr><th>${E(f)}</th><td class="old">${E(a)}</td><td><span class="new">${E(b)}</span></td></tr>`).join('')}</tbody></table></div>`:''}${t.files.length?`<div class="files">${t.files.map(f=>`<div class="draft"><span class="ty">${FILE}</span><span><b>${E(f)}</b><small>${$t('lampiran label','label attachment')}</small></span></div>`).join('')}</div>`:''}${!t.req&&!t.changes.length&&!t.files.length?`<p class="where">${$t('Tidak ada rincian tambahan.','No additional details.')}</p>`:''}`)}
 ${t.items.length&&!['dist','done'].includes(t.s)?sec(i++,$t('Hasil per bagian','Results per part'),partRows(t,false),$t(`${t.items.filter(p=>p.s==='ok').length} dari ${t.items.length}`,`${t.items.filter(p=>p.s==='ok').length} of ${t.items.length}`)):''}
 ${sec(i++,$t('Percakapan','Conversation'),convo(t),$t(`${t.msgs.length} pesan`,pl(t.msgs.length,'message','messages')))}
 ${sec(i++,$t('Aktivitas','Activity'),`<div class="hist">${t.act.slice().reverse().map(([w,x,who])=>`<div>${who==='L'?`<span class="mini lbl">${E(ini2)}</span>`:mini(who)}<span>${E(x)}<small style="display:block">${who==='L'?E(t.lab):E(STAFF()[who]?.[0]||$t('Petugas','Assignee'))} · ${fd(w)}</small></span></div>`).join('')}</div>`)}</div>`;}
function play(){const key=S.tab+S.sel[S.tab];const p=$('pane');if(key!==lastPane){p.classList.remove('swap','play');void p.offsetWidth;p.classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#pin input,#pin textarea,#pin select').forEach(el=>{if(el.id&&el.type!=='checkbox')vals[el.id]=el.value;});const id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(wide()&&(!S.sel[S.tab]||!r.some(z=>z.id===S.sel[S.tab])))S.sel[S.tab]=r[0]?.id;tabs();band();list();pane();play();$('wk').classList.toggle('reading',!wide()&&S.read&&!!S.sel[S.tab]);stick();});}
function repane(){$('pane').classList.remove('play','swap');keep(pane);stick();}
function toast(x){toast137(DEF,x);}
function open(id,keepStage){S.sel[S.tab]=id;S.form=null;S.fail=null;S.align=false;S.to='';S.read=true;if(!keepStage)S.stage=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<70)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
/* ---------- tindakan: run112 (fungsi asli) ---------- */
function msgOf(err){return String(err?.message||err);}
function cur(id){return Tickets112.init(ten).tickets.find(x=>x.id===id);}
function run(kind,t,p={}){run112(kind,{id:t.id,version:cur(t.id)?.version,...p});}
function act(a,arg){const t=T.find(x=>x.id===S.sel[S.tab]);if(!t)return;let msg='',moved=false;const note=val('f-note');
 try{
  if(a==='start'){run('claim',t);msg=$t('Dimulai · kamu petugasnya','Started · you are the assignee');}
  else if(a==='forward'){const reference=val('f-ref');if(!reference){toast($t('Isi nomor referensi dari distributor','Enter the distributor reference number'));return;}if(!note){toast($t('Tulis catatan untuk label','Write a note for the label'));return;}
   const p={reference,note,checked:true};if(S.align){if(!$('f-align')?.checked){toast($t('Centang bahwa permintaan terkait sudah diselaraskan','Tick to confirm the related requests are aligned'));return;}p.aligned=true;}
   try{run('send',t,p);}catch(err){if(/permintaan terkait/i.test(msgOf(err))){S.align=true;repane();toast(msgOf(err));return;}throw err;}
   msg=$t(`Diteruskan · tindak lanjut otomatis ${U.dlabel(nextFollow())}`,`Forwarded · automatic follow-up ${U.dlabel(nextFollow())}`);}
  else if(a==='ask'){if(!note){toast($t('Tulis yang perlu dilengkapi','Write what needs to be provided'));return;}run('request',t,{note});msg=$t('Permintaan kelengkapan dikirim ke label','Information request sent to the label');}
  else if(a==='escalate'){if(!note){toast($t('Tulis alasan eskalasi','Write the escalation reason'));return;}run('escalate',t,{note});msg=$t('Dieskalasikan ke Super Admin','Escalated to Super Admin');}
  else if(a==='answer'){if(!note){toast($t('Tulis jawaban','Write an answer'));return;}run('message',t,{note,files:[]});const open=(cur(t.id).items||[]).filter(i=>i.status!=='confirmed');
   if(open.length)run('results',t,{checked:true,note:$t('Dijawab lewat percakapan.','Answered via conversation.'),results:open.map(i=>({id:i.id,status:'confirmed',note:$t('Selesai lewat percakapan.','Completed via conversation.'),reference:$t('Percakapan ','Conversation ')+t.id}))});
   run('finish',t,{checked:true,note:$t('Dijawab dan diselesaikan.','Answered and completed.')});msg=$t('Terjawab · tiket selesai','Answered · ticket done');moved=true;}
  else if(a==='remind'){run('message',t,{note:$t('Pengingat: ','Reminder: ')+(t.required||$t('mohon lengkapi permintaan ini agar bisa kami lanjutkan.','please complete this request so we can continue.')),files:[]});msg=$t('Pengingat dikirim ke label','Reminder sent to the label');}
  else if(a==='part'){const [i,s]=String(arg).split('|');const it=t.items[+i];if(!it)return;
   if(s==='fail'){S.fail=+i;repane();$('f-fail')?.focus();return;}
   if(s==='blocked'){const n=val('f-fail');if(!n){toast($t('Tulis kendalanya','Describe the issue'));return;}run('results',t,{checked:true,note:n,results:[{id:it.id,status:'blocked',note:n,reference:''}]});S.fail=null;msg=$t('Kendala dicatat','Issue recorded');}
   else{run('results',t,{checked:true,note:$t('Hasil distributor dicatat.','Distributor results recorded.'),results:[{id:it.id,status:'confirmed',note:$t('Terkonfirmasi distributor','Confirmed by distributor'),reference:t.reference||($t('Referensi ','Reference ')+t.id)}]});msg=$t(`${it.label}: terkonfirmasi`,`${it.label}: confirmed`);}}
  else if(a==='followup'){if(!note){toast($t('Tulis catatan tindak lanjut','Write a follow-up note'));return;}const d=val('f-next');const next=Date.parse((d||nextFollow())+'T09:00:00+07:00');if(!(next>ten.now)){toast($t('Pilih tanggal setelah hari ini','Choose a date after today'));return;}run('followup',t,{note,next});msg=$t(`Tindak lanjut dicatat · periksa lagi ${U.dlabel(d||nextFollow())}`,`Follow-up recorded · check again ${U.dlabel(d||nextFollow())}`);}
  else if(a==='finish'){run('finish',t,{checked:true,note:note||$t('Semua bagian sudah terkonfirmasi distributor.','All parts confirmed by the distributor.')});msg=$t('Tiket selesai · label diberi tahu','Ticket done · label notified');moved=true;}
  else if(a==='reviewed'){if(!note){toast($t('Tulis hasil peninjauan','Write the review result'));return;}run('clear-escalation',t,{note});msg=$t('Peninjauan dicatat · penanganan berlanjut','Review recorded · handling continues');}
  else if(a==='reassign'){if(!S.to){toast($t('Pilih petugas','Choose an assignee'));return;}run('assign',t,{handler:S.to,note:$t(`Dialihkan ke ${pname(S.to)} oleh Super Admin.`,`Reassigned to ${pname(S.to)} by Super Admin.`)});msg=$t(`Dialihkan ke ${pname(S.to)}`,`Reassigned to ${pname(S.to)}`);S.to='';}
  else if(a==='reopen'){if(!note){toast($t('Tulis catatan','Write a note'));return;}run('reopen',t,{note});msg=$t('Dibuka kembali · pindah ke Dalam proses','Reopened · moved to In progress');moved=true;S.tab='proc';}
  else if(a==='msg'){const n=val('f-msg');if(!n){toast($t('Tulis pesan dulu','Write a message first'));return;}run(S.mode==='note'?'internal':'message',t,S.mode==='note'?{note:n}:{note:n,files:[]});msg=S.mode==='note'?$t('Catatan internal disimpan','Internal note saved'):$t('Pesan terkirim ke label','Message sent to the label');}
 }catch(err){toast(msgOf(err));return;}
 S.form=null;S.align=false;S.fail=null;if(S.stage&&!moved)S.stage=null;lastSig='';lastPane='';
 if(moved){load();const r=items();if(a==='reopen'){S.sel.proc=t.id;}else S.sel[S.tab]=r[0]?.id;}
 render();toast(msg);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.q='';S.read=false;S.form=null;S.stage=null;paint();return;}
  const sg=t.closest('[data-stage]');if(sg){const k=sg.dataset.stage;S.tab='proc';S.q='';S.fam='all';S.stage=S.stage===k?null:k;S.read=false;paint();return;}
  if(t.closest('[data-stage-clear]')){S.stage=null;paint();return;}
  if(t.closest('[data-urgent]')){S.tab='proc';S.q='';S.fam='all';S.stage=null;const r=items();if(r[0])open(r[0].id);return;}
  const fm2=t.closest('[data-fam]');if(fm2){S.fam=fm2.dataset.fam;paint();return;}
  const md=t.closest('[data-mode]');if(md){S.mode=md.dataset.mode;repane();$('f-msg')?.focus();return;}
  const to=t.closest('[data-to]');if(to){S.to=to.dataset.to;repane();return;}
  if(t.closest('[data-cancel-fail]')){S.fail=null;repane();return;}
  const pt=t.closest('[data-part]');if(pt){act('part',pt.dataset.part);return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;S.align=false;repane();(root.querySelector('.reveal input:not([type=checkbox]),.reveal textarea'))?.focus();return;}
  const dd=t.closest('[data-do]');if(dd&&!dd.disabled){act(dd.dataset.do);return;}
  const rl=t.closest('[data-rel]');if(rl){openRelease(rl.dataset.rel);return;}
  const go=t.closest('[data-go]');if(go){if(!go137(go.dataset.go))toast($t('Buka menu ','Open the menu ')+go.dataset.go);return;}
  if(t.closest('[data-std]')){window.stdTab137='layanan';if(!go137('standards'))toast($t('Buka Standar & Penanda','Open Standards & Indicators'));return;}
  if(t.closest('[data-back]')){S.read=false;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){open(it.dataset.id,true);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
function openRelease(id){try{if(typeof ui105==='object'){ui105.view='detail';ui105.id=id;}}catch(err){}if(!go137('releases'))toast($t('Buka Rilisan','Open Releases'));}
/* Masuk dari Pekerjaan / Kotak Masuk / Studio: detail112(id) memilih tiket di halaman baru. */
let pending=null;
function intake(){if(!pending)return;const id=pending;pending=null;load();const merged=T.find(x=>x.id===id||x.mergedIds.includes(id));if(!merged)return;
 S.tab=isOpen(merged)?'proc':'done';S.stage=null;S.q='';S.fam='all';S.sel[S.tab]=merged.id;S.read=true;S.form=null;lastSig='';}
const sig=()=>T.map(t=>[t.id,t.raw,t.ver,t.h,t.due,t.items.map(i=>i.s).join('')].join(':')).join('|')+'|'+U.today()+'|r:'+ten.role+state.user+'|'+state.lang;
const DEF={id:'tickets',css:STYLE,html:HTML,
 i18n:{'Tiket Bantuan':'Support Tickets','Permintaan label untuk rilisan yang sudah terkirim: perubahan, penurunan, YouTube & Content ID, dan masalah lain — sampai hasilnya terkonfirmasi.':'Label requests for releases already delivered: changes, takedowns, YouTube & Content ID, and other issues — until the result is confirmed.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='tickets'&&!state.preview&&(typeof allowed112!=='function'||allowed112()),
 init(r){root=r;bind();},
 draw(){intake();load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Tiket Bantuan */
DEF.sum=function(){load();const P=T.filter(isOpen),raw=Object.fromEntries((ten.tickets112?.tickets||[]).map(t=>[t.id,t]));
 const I=P.map(t=>{const x=raw[t.id]||{},esc=[...(x.history||[])].reverse().find(h=>h.action==='escalate');
  return {id:t.id,src:'ticket',menu:$t('Tiket Bantuan','Support Tickets'),ic:'ticket',t:subjL(x,x.request?.subject133)||`${t.catName} · ${t.title}`,l:t.lab,m:t.member,s:t.s,st:ST[t.s]?stL(t.s):t.s,due:t.due,dueDate:t.dueDate,over:t.due!=null&&t.due<0,who:t.handler,
   wait:t.s==='label'?'Label':t.s==='dist'?'Distributor':t.s==='review'?'Super Admin':'',esc:t.s==='review'?{by:esc?.actor||t.handler||'',at:esc?U.iso16(esc.at):'',note:t.esc||esc?.note||''}:null};});
 const late=I.filter(t=>t.over).length,rev=I.filter(t=>t.esc).length,merged=T.reduce((n,t)=>n+(t.merged||0),0);
 return {P:I,late,rev,merged,line:P.length?$t(`${P.length} berjalan · ${late} lewat tenggat${rev?` · ${rev} perlu peninjauan Super Admin`:''}${merged?` · ${merged} pengajuan ganda digabung`:''}`,`${P.length} in progress · ${late} overdue${rev?` · ${rev} need Super Admin review`:''}${merged?` · ${pl(merged,'duplicate request','duplicate requests')} merged`:''}`):$t('Tidak ada tiket berjalan','No tickets in progress'),tone:late||rev?'r':'g'};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
if(typeof detail112==='function'){const detBefore=detail112;detail112=function(id){if(isLabel10()||state.preview)return detBefore.apply(this,arguments);pending=id;if(DEF.when()){lastSig='';render();}else if(!go137('tickets'))return detBefore.apply(this,arguments);};}
})();
