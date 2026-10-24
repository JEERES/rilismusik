/* v1.1.0-dev.39 — Kotak Masuk dirancang ulang (rancangan disetujui 21 Okt 2026, mock ib1).
   Satu aliran "untukmu": Perlu jawaban (tiket yang menunggu balasanmu) · Disebut & ditugaskan (eskalasi, penyelesaian
   layanan, penugasan, sebutan @nama) · Notifikasi (hilang sendiri saat pekerjaannya selesai), dengan Belum/Sudah dibaca.
   Satu sistem percakapan: obrolan lama (T-…) menjadi tiket "Permintaan lainnya" sehingga balasan sampai ke label.
   Balasan & catatan internal tersimpan di tiketnya (run112); keputusan tetap di menu asal. Lonceng & chat dilebur ke
   ikon Kotak Masuk dengan satu angka. Tab Berita sudah pindah ke Pembaruan › Pengumuman. */
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
.shell.noside{grid-template-columns:minmax(0,1fr)!important;padding:18px 28px 18px}
.ibicon{position:relative;background:var(--ink);color:var(--onink)}
.hb{position:absolute;top:-4px;right:-6px;min-width:18px;height:18px;padding:0 5px;border-radius:99px;background:#ff4d6a;color:#fff;font-size:10.5px;font-weight:500;display:grid;place-items:center;box-shadow:0 0 0 2px var(--card)}
main.ibx{height:calc(100vh - 66px - 36px);gap:14px}
html.notes main.ibx{height:auto}
html.notes .ibgrid{height:calc(100vh - 66px - 36px - 110px)}
.ibstrip{display:flex;align-items:center;gap:18px;padding:14px 18px;border-radius:20px;color:#fff;background:linear-gradient(115deg,#0b3fbf,#2a73ff 60%,#4b8bff);box-shadow:0 16px 34px -22px #0b3fbf;flex-wrap:wrap}
.ibstrip .sl{display:grid;gap:2px;margin-right:auto}
.ibstrip .k{display:flex;align-items:center;gap:8px;font-size:12px;color:#ffffffd0}.ibstrip .k i{width:8px;height:8px;border-radius:50%;background:#ff8aa5;box-shadow:0 0 0 4px #ff8aa533}
.ibstrip b{font-weight:400;font-size:20px}.ibstrip span{font-size:13px;color:#ffffffd0}
.ibstrip .pills{margin:0}
.ibstrip .pills button{background:#ffffff1f;color:#fff}.ibstrip .pills button b{color:#ffffffb0;font-size:12px}
.ibstrip .pills button[aria-pressed=true]{background:#fff;color:#0d3fae}.ibstrip .pills button[aria-pressed=true] b{color:#0d3fae}
.ibgrid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(300px,380px) minmax(0,1fr) 300px;gap:14px}
.ibgrid>.card{min-height:0;display:flex;flex-direction:column;padding:14px}
.iblist .find{width:100%;flex:none;margin-bottom:6px}
.ibl{overflow-y:auto;min-height:0;margin:0 -6px;padding:0 6px 6px}
.ib{display:grid;grid-template-columns:40px minmax(0,1fr) 10px;gap:12px;align-items:start;width:100%;text-align:left;padding:12px 10px;border-radius:14px;position:relative}
.ib:hover{background:color-mix(in srgb,var(--text) 4%,transparent)}
.ib.sel{background:color-mix(in srgb,var(--text) 6%,transparent)}
.ib .ty{width:40px;height:40px;border-radius:12px}.ib .ty svg{width:17px;height:17px}
.lav.sm2{width:40px;height:40px;border-radius:12px;font-size:13px}
.ibt{display:grid;gap:4px;min-width:0}
.r1{display:flex;align-items:baseline;gap:8px}.r1 b{font-weight:400;font-size:14.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.r1 small{margin-left:auto;color:var(--muted);font-size:12px;white-space:nowrap}
.ib.un .r1 b{font-weight:500}
.r2{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--text);min-width:0}.r2>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.r3{font-size:12.5px;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.45}
.udot{width:8px;height:8px;border-radius:50%;background:#ff4d6a;margin-top:6px}
.ibconv{gap:0}
.ch2{display:flex;align-items:center;gap:12px;padding:4px 4px 12px;border-bottom:1px solid var(--line);flex:none}
.ch2>div{display:grid;gap:2px;margin-right:auto}.ch2 b{font-weight:400;font-size:17px}.ch2 small{color:var(--muted);font-size:12.5px}
.ch2 .ty{width:40px;height:40px;border-radius:12px}
.cbody{flex:1;min-height:0;overflow-y:auto;padding:16px 4px}
.cfoot{flex:none;padding-top:10px;border-top:1px solid var(--line);display:grid;gap:8px}
.cfoot .comp{margin:0;padding:0;border:0}
.nbox{display:grid;gap:6px;padding:16px;border-radius:16px;background:var(--soft);font-size:14.5px;line-height:1.55}.nbox b{font-weight:500}.nbox p{margin:0}.nbox small{color:var(--muted);font-size:12px}
.cx{display:grid;gap:12px}.cx h5{margin:0;font-size:12.5px;font-weight:400;color:var(--muted)}
.home{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:14px;background:var(--ink);color:var(--onink);font-size:14px;text-align:left}.home svg{width:15px;height:15px;margin-left:auto}.home .mono{color:inherit;opacity:.75}
.ibctx .facts{grid-template-columns:auto 1fr;font-size:13.5px}
.cfoot .cx{margin-top:10px;padding-top:12px;border-top:1px solid var(--line)}
@media (max-width:1240px){.ibgrid{grid-template-columns:minmax(280px,340px) minmax(0,1fr)}.ibctx{display:none!important}}
.ch2 .back{display:none!important}
@media (max-width:820px){.ch2 .back{display:flex!important}main.ibx,html.notes main.ibx{height:auto}.ibgrid,html.notes .ibgrid{grid-template-columns:1fr;height:auto}.ibgrid .ibconv{display:none}.ibgrid.reading .iblist{display:none}.ibgrid.reading .ibconv{display:flex}.ibl,.cbody{overflow:visible}.ibstrip .pills{width:100%}.shell.noside{padding:14px 16px 70px!important}.ch2 .chip{display:none}}`;const HTML=`<main><main class="ibx">
 <section class="ibstrip rl" id="strip"><span class="nb">1</span></section>
 <div class="ibgrid" id="wk">
  <section class="card iblist rl" id="list"><span class="nb">2</span></section>
  <section class="card ibconv rl" id="conv"><span class="nb">3</span></section>
  <section class="card ibctx rl" id="ctx"><span class="nb">4</span></section>
 </div></main>`;
let root=null,lastSig='',I=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),AT=sv('<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>'),BELL=sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),FLAG=sv('<path d="M5 21V4h11l-1.5 4L16 12H5"/>');
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):/^\d{4}-\d\d-\d\d/.test(String(v))?String(v).slice(0,16):'';
const ago=s=>{if(!s)return '';const d=s.slice(0,10),t=U.today();return d===t?U.hm(s.slice(11,16)):d===U.addDay(t,-1)?$t('Kemarin','Yesterday'):fd(d);};
/* dev.43 — dua bahasa. Waktu notifikasi tersimpan sebagai teks Indonesia ("3 Oktober 2026 pukul 10.20", "10.45", "01 Sep"):
   dalam bahasa Inggris ditulis ulang dengan U137 (hanya tampilan). */
const MF_ID=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],MS_ID=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const ntime=s=>{if(!s||!en137())return s;const v=String(s).trim();let m=v.match(/^(\d{1,2}) (\S+) (\d{4})(?:,? (?:pukul )?(\d{1,2})[.:](\d{2}))?$/);
 if(m){const i=MF_ID.indexOf(m[2])>=0?MF_ID.indexOf(m[2]):MS_ID.indexOf(m[2]);if(i>=0)return `${Number(m[1])} ${U.mon(i)} ${m[3]}`+(m[4]?` · ${m[4].padStart(2,'0')}:${m[5]}`:'');}
 m=v.match(/^(\d{1,2}) (\S+)$/);if(m){const i=MS_ID.indexOf(m[2]);if(i>=0)return `${m[1]} ${U.mon(i)}`;}
 m=v.match(/^(\d{1,2})\.(\d{2})$/);if(m)return `${m[1]}:${m[2]}`;return v;};
/* nama kategori tiket (names112 belum punya versi Inggris) */
const NAMES_EN={metadata:'Metadata change',audio:'Audio replacement',cover:'Cover replacement',takedown:'Release takedown',cid:'Content ID request','release-claim':'Video claim release','disable-cid':'Disable Content ID',availability:'Release availability issue','royalty-issue':'Royalty issue',general:'Other request'};
const catL=c=>(en137()&&NAMES_EN[c])||(typeof names112==='object'&&names112[c])||'';
/* judul percakapan → sisi Inggris bila model punya pasangannya (obrolan lama, topik Pesan) */
function subjOf(t){const s=typeof subject133==='function'?subject133(t):t.id;if(!en137())return s;const q=t.request?.subject133;
 if(q){try{const th=t.request?.from137&&typeof threadStore131==='function'?threadStore131().tickets.find(x=>x.id===t.request.from137):null;if(Array.isArray(th?.subject)&&th.subject[0]===q&&th.subject[1])return th.subject[1];}catch(err){}
  try{const tp=typeof topics133!=='undefined'?topics133.find(x=>x[1]===q):null;if(tp)return tp[2];}catch(err){}return q==='Pengembalian dana layanan lama'?'Legacy service refund':q;}
 const n=NAMES_EN[t.category];if(!n)return s;return String(t.release||'').startsWith('account:')?n:`${n} · ${t.source?.title||''}`;}
const pair=a=>{const x=a||[];return en137()?(x[1]||x[0]):x[0];};
const pl=(n,one,many)=>`${n} ${n===1?one:many}`;
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const inis=s=>String(s).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
const lav=n=>`<span class="lav sm2" style="--h:${hue(n)}">${E(inis(n))}</span>`;
const pname=id=>people.find(p=>p.id===id)?.name||id||'';
const mname=id=>RM10.getMember(ten,id)?.name||id||'';
const SA=()=>!!me().super;
const KIND={reply:[['Perlu jawaban','Needs reply'],'c-or'],mention:[['Disebut','Mentioned'],'c-bl'],assign:[['Ditugaskan','Assigned'],'c-red'],notif:[['Notifikasi','Notification'],'']};
const kchip=k=>chip($t(KIND[k][0][0],KIND[k][0][1]),KIND[k][1]);
const PILL=[['all','Semua','All'],['reply','Perlu jawaban','Needs reply'],['me','Disebut & ditugaskan','Mentions & assignments'],['notif','Notifikasi','Notifications']];
const S={pill:'all',q:'',sel:null,read:false,mode:'reply'};
const wide=()=>innerWidth>1240,narrow=()=>innerWidth<=820;
const inbox=()=>{ten.inbox137??={read:{},moved:{}};ten.inbox137.read[state.user]??={};return ten.inbox137;};
/* ---------- satu sistem percakapan: obrolan lama → tiket "Permintaan lainnya" ---------- */
function migrate(){if(typeof threadStore131!=='function'||typeof Tickets112!=='object'||!ten?.members)return false;const st=threadStore131(),m=Tickets112.init(ten),moved=(ten.inbox137??={read:{},moved:{}}).moved,staff=people.map(p=>p.id);let changed=false;
 for(const th of st.tickets.slice()){if(moved[th.id])continue;const mem=ten.members.find(x=>x.name===th.label);if(!mem)continue;
  const msgs=(th.chat?(data.chats?.[th.chat]||[]):(th.msgs||[])).map(x=>({who:x.who,text:(x.text||[])[0]||''})).filter(x=>x.text),isL=w=>w===th.label;
  const now=ten.now,id='TKT-'+String(++m.serial).padStart(4,'0'),src={id:'account:'+mem.id,member:mem.id,title:'Permintaan umum',artist:'',cover:null,release:{},songs:[]},subject=(th.subject||[])[0]||'Percakapan',first=msgs.find(x=>isL(x.who));
  const t={id,account:mem.id,member:mem.id,release:'account:'+mem.id,category:'general',source:src,request:{category:'general',release:'',source:src,note:first?.text||subject,subject133:subject,from137:th.id,obj137:th.obj||''},items:[{id:'request',label:'Permintaan lainnya',status:'pending'}],status:'submitted',handler:null,created:now,updated:now,version:1,history:[],messages:[],internal:[],escalated:false,reopenRequest:null};
  const H=(actor,action,note,pub=true)=>t.history.push({at:now,actor,action,note,public:pub});
  H(mem.id,'created',first?.text||subject);
  const handler=[...msgs.filter(x=>!isL(x.who)).map(x=>x.who),...(th.notes||[]).map(n=>n.who)].find(w=>staff.includes(w))||null;
  if(handler&&th.status!=='submitted'){t.handler=handler;H(handler,'claim','');}
  for(const x of msgs){if(x===first)continue;const actor=isL(x.who)?mem.id:staff.includes(x.who)?x.who:(handler||'jeck');H(actor,'message',x.text);t.messages.push({at:now,actor,note:x.text,files:[]});}
  for(const n of th.notes||[]){const tx=(n.text||[])[0]||'';if(!tx)continue;H(n.who,'internal',tx,false);t.internal.push({at:now,actor:n.who,note:tx});}
  if(th.status==='handling')t.status='handling';
  else if(th.status==='awaiting_distributor'){t.status='distributor';const ref=(th.notes||[]).map(n=>(n.text||[])[0]||'').join(' ').match(/#\s?\d+/);t.reference=ref?ref[0]:'diteruskan';t.sentAt=now;t.lastSent=now;try{t.nextFollowup=Wami11.addBusinessDays(now,(policy115().ticketDays||3),calendar11());}catch(err){t.nextFollowup=now+3*864e5;}}
  else if(th.status==='awaiting_label'){t.status='label';t.resumeStatus='handling';const last=msgs.filter(x=>!isL(x.who)).at(-1);t.required=last?.text||'Kelengkapan diminta.';if(!t.handler&&handler){t.handler=handler;}}
  m.tickets.push(t);moved[th.id]=id;
  if(typeof tr132==='function')for(const r of tr132().requests)if(r.ticket===th.id)r.ticket=id;
  changed=true;}
 return changed;}
/* obrolan lama tetap tersimpan (tidak dihapus) tetapi disembunyikan dari daftar percakapan & hitungan Dashboard */
if(typeof threads131==='function'){const tb=threads131;threads131=function(){const mv=ten?.inbox137?.moved||{};return tb.apply(this,arguments).filter(x=>!(x.type==='ticket'&&x.code&&mv[x.code]));};}
/* ---------- aliran "untukmu" dari data asli ---------- */
const CONV=['created','message','complete','report-again'];
function lastTalk(t){for(let i=t.history.length-1;i>=0;i--){const h=t.history[i];if(CONV.includes(h.action)&&h.public!==false&&h.note)return {h,label:h.actor===t.account||!!RM10.getMember(ten,h.actor)};}return null;}
const tstate=s=>(en137()?{submitted:'Submitted',handling:'In progress',label:'Waiting for label',distributor:'Waiting for distributor',done:'Done'}:{submitted:'Diajukan',handling:'Dalam penanganan',label:'Menunggu label',distributor:'Menunggu distributor',done:'Selesai'})[s]||s;
function resolved(n){const o=String(n.obj||'');try{if(o.startsWith('RF-')){const r=tr132().requests.find(x=>x.id===o);if(r)return ['paid','rejected'].includes(r.status);const c=Transactions113.init(ten).refunds.find(x=>x.id===o);return !!c&&['done','closed'].includes(c.status);}
 const rel=RM10.getRelease(ten,o);if(rel)return ['live','closed','taken_down','rejected','cancelled'].includes(rel.status);const tk=data.tasks?.find(x=>x.id===o);if(tk)return tk.stage==='done';}catch(err){}return false;}
function load(){const me_=state.user,R=inbox().read[me_],out=[];
 try{const T=Tickets112.init(ten).tickets.filter(t=>t.status!=='done'&&Tickets112.visible({role:ten.role},t));
  for(const t of T){const lt=lastTalk(t),label=mname(t.account),subj=subjOf(t);
   if(lt?.label&&(t.handler===me_||!t.handler)){const mark=t.history.length;out.push({id:'k:'+t.id,kind:'reply',t,who:label,at:iso(lt.h.at),title:subj,type:catL(t.category)||$t('Tiket','Ticket'),snip:lt.h.note,unread:(R['k:'+t.id]||0)<mark,mark});}
   if(t.escalated&&SA()){const esc=[...t.history].reverse().find(h=>h.action==='escalate');out.push({id:'e:'+t.id,kind:'assign',t,who:pname(esc?.actor)||$t('Tim','Team'),at:iso(esc?.at||t.updated),title:subj+' · '+label,type:$t('Eskalasi ke Super Admin','Escalated to Super Admin'),snip:esc?.note||$t('Perlu peninjauan Super Admin.','Needs Super Admin review.'),home:[$t('Tiket Bantuan','Support Tickets'),t.id],unread:!R['e:'+t.id+':'+t.version],mark:t.version});}
   const asg=[...t.history].reverse().find(h=>h.action==='assign');if(asg&&t.handler===me_&&asg.actor!==me_&&!(lt?.label)){const an=en137()&&asg.note?String(asg.note).replace(/^Dialihkan ke (.+) oleh Super Admin\.$/,'Reassigned to $1 by Super Admin.'):asg.note;out.push({id:'a:'+t.id,kind:'assign',t,who:pname(asg.actor),at:iso(asg.at),title:subj+' · '+label,type:$t('Ditugaskan kepadamu','Assigned to you'),snip:an||$t('Tiket dialihkan kepadamu.','Ticket reassigned to you.'),home:[$t('Tiket Bantuan','Support Tickets'),t.id],unread:!R['a:'+t.id+':'+t.version],mark:t.version});}}}catch(err){}
 if(SA())for(const o of ten.addons111?.orders||[]){if(o.status!=='resolution')continue;out.push({id:'s:'+o.id,kind:'assign',o,who:pname(o.handler)||$t('Tim layanan','Service team'),at:iso(o.progress||o.at),title:`${o.title||o.service?.name||o.id} · ${mname(o.member)}`,type:$t('Penyelesaian perlu keputusan','Resolution needs a decision'),snip:o.resolutionReason||$t('Usulan penyelesaian menunggu keputusan Super Admin.','Resolution suggestion awaiting a Super Admin decision.'),home:[$t('Layanan Tambahan','Add-on Services'),o.id],unread:!R['s:'+o.id+':'+(o.version||0)],mark:o.version||0});}
 const myName=(people.find(p=>p.id===me_)?.name||'').split(' ')[0];
 if(myName)(data.chats?.internal||[]).forEach((x,i)=>{const tx=(x.text||[])[0]||'';if(x.who===me_||!new RegExp('@'+myName,'i').test(tx))return;out.push({id:'m:'+i,kind:'mention',msg:x,idx:i,who:pname(x.who),at:x.ts?iso(x.ts):'',title:$t('Catatan internal tim','Team internal notes'),type:$t('Disebut di catatan internal','Mentioned in an internal note'),snip:en137()?((x.text||[])[1]||tx):tx,home:[$t('Catatan internal','Internal notes'),'tim'],unread:!R['m:'+i],mark:1});});
 for(const n of (typeof visibleNotifications==='function'?visibleNotifications():[])){if(resolved(n))continue;out.push({id:'n:'+n.id,kind:'notif',n,who:n.obj?String(n.obj).startsWith('RF-')?$t('Transaksi','Transactions'):RM10.getRelease(ten,n.obj)?$t('Rilisan','Releases'):$t('Sistem','System'):$t('Sistem','System'),at:'',time:n.time||'',title:pair(n.title)||$t('Notifikasi','Notification'),type:$t('Notifikasi','Notification'),snip:pair(n.body)||'',unread:!(n.read||[]).includes(me_)});}
 I=out;}
const inPill=(x,p)=>p==='all'||(p==='reply'&&x.kind==='reply')||(p==='me'&&['mention','assign'].includes(x.kind))||(p==='notif'&&x.kind==='notif');
const match=x=>!S.q||[x.who,x.title,x.snip,x.type,x.id].join(' ').toLowerCase().includes(S.q);
function items(){return I.filter(x=>inPill(x,S.pill)&&match(x)).sort((a,b)=>(b.unread-a.unread)||(b.at||'').localeCompare(a.at||''));}
const unreadN=()=>I.filter(x=>x.unread).length;
function strip(){const c=k=>I.filter(x=>x.unread&&inPill(x,k)).length;
 $('strip').innerHTML=`<div class="sl"><div class="k"><i></i>${$t('Untukmu','For you')} · ${E(U.todayLabel())}</div><b>${unreadN()?$t(`${unreadN()} belum dibaca`,`${unreadN()} unread`):$t('Semua sudah dibaca','All caught up')}</b><span>${$t(`${c('reply')} pesan menunggu jawabanmu · ${c('me')} sebutan &amp; penugasan · ${c('notif')} notifikasi`,`${pl(c('reply'),'message','messages')} awaiting your reply · ${pl(c('me'),'mention or assignment','mentions &amp; assignments')} · ${pl(c('notif'),'notification','notifications')}`)}</span></div>
 <div class="pills">${PILL.map(([k,t,te])=>`<button data-pill="${k}" aria-pressed="${S.pill===k}">${$t(t,te)}<b class="n">${I.filter(x=>inPill(x,k)).length}</b></button>`).join('')}</div>`;}
function icon(x){return x.kind==='notif'?`<span class="ty">${BELL}</span>`:x.kind==='mention'?`<span class="ty">${AT}</span>`:x.kind==='assign'?`<span class="ty">${FLAG}</span>`:lav(x.who);}
function list(){const r=items();let h=`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari label, topik, nomor','Search label, topic, number')}" value="${E(S.q)}"></label><div class="ibl">`;
 let cur=null;r.forEach(x=>{if(x.unread!==cur){cur=x.unread;h+=`<div class="gh"><i style="--c:var(--${cur?'red':'faint'})"></i><b>${cur?$t('Belum dibaca','Unread'):$t('Sudah dibaca','Read')}</b> · ${r.filter(y=>y.unread===cur).length}</div>`;}
  h+=`<button class="ib${S.sel===x.id?' sel':''}${x.unread?' un':''}" data-id="${E(x.id)}">${icon(x)}<span class="ibt"><span class="r1"><b>${E(x.who)}</b><small>${E(x.at?ago(x.at):ntime(x.time)||'')}</small></span><span class="r2">${kchip(x.kind)}<span>${E(x.title)}</span></span><span class="r3">${E(x.snip)}</span></span>${x.unread?'<i class="udot"></i>':''}</button>`;});
 if(!r.length)h+=`<div class="empty"><b>${$t('Kosong','Empty')}</b>${S.q?$t('Coba kata lain.','Try another word.'):$t('Tidak ada yang menunggumu di sini.','Nothing is waiting for you here.')}</div>`;
 h+='</div>';$('list').innerHTML=h;}
function bubbles(x){const tl=typeof timeline133==='function'?timeline133(x.t,true):[];
 /* timeline133 memformat waktu dengan bahasa ten.lang; dalam bahasa Inggris waktu diambil dari riwayat yang sama (urutan sama) */
 const hs=en137()?(x.t.history||[]).filter(h=>(CONV.includes(h.action)&&h.note)||h.action==='internal'):null;let k=0;
 return `<div class="thread">${tl.filter(e=>e.kind==='msg'||e.kind==='note').map(e=>{const internal=e.kind==='note',name=e.label?x.who:pname(e.who),hh=hs?hs[k++]:null,at=hh?.at?fd(U.iso16(hh.at)):(e.at||'');return `<div class="bub ${internal?'int':e.label?'them':'me2'}"><small class="bw">${internal?$t('Catatan internal · ','Internal note · '):''}${E(name)}</small>${E(e.text)}<small>${E(at)}</small></div>`;}).join('')}</div>`;}
function ctxFacts(x){if(x.t){const t=x.t,mem=RM10.getMember(ten,t.account),f=[[$t('Tiket','Ticket'),`${t.id} · ${tstate(t.status)}`],[$t('Petugas','Assignee'),t.handler?pname(t.handler):$t('belum ada','unassigned')],['Label',`${mname(t.account)}${mem?.plan?$t(' · paket ',' · plan ')+(()=>{try{return Packages122.name(mem.plan);}catch(err){return mem.plan;}})():''}`]];if(t.request?.obj137)f.push([$t('Terkait','Related'),t.request.obj137]);return f;}
 if(x.o)return [[$t('Pesanan','Order'),`${x.o.id} · ${$t('Penyelesaian','Resolution')}`],['Label',mname(x.o.member)],[$t('Keputusan','Decision'),$t('Setujui / Tolak — di Layanan Tambahan','Approve / Decline — in Add-on Services')]];
 if(x.n)return [[$t('Objek','Item'),x.n.obj||x.n.page||'—'],[$t('Waktu','Time'),ntime(x.time)||'—']];return [];}
function homeBtn(x){if(x.t){const obj=x.t.request?.obj137||'';return `<button class="home" data-home="ticket">${$t('Tiket Bantuan','Support Tickets')} · <span class="mono">${E(x.t.id)}</span> ${ARROW}</button>${obj?`<button class="home" data-obj="${E(obj)}" style="margin-top:6px">${obj.startsWith('RF-')?$t('Transaksi › Pengembalian','Transactions › Refunds'):$t('Rilisan','Releases')} · <span class="mono">${E(obj)}</span> ${ARROW}</button>`:''}`;}
 if(x.o)return `<button class="home" data-home="addon">${$t('Layanan Tambahan','Add-on Services')} · <span class="mono">${E(x.o.id)}</span> ${ARROW}</button>`;
 if(x.n&&x.n.obj)return `<button class="home" data-obj="${E(x.n.obj)}">${String(x.n.obj).startsWith('RF-')?$t('Transaksi › Pengembalian','Transactions › Refunds'):$t('Buka objek','Open item')} · <span class="mono">${E(x.n.obj)}</span> ${ARROW}</button>`;
 if(x.n&&x.n.page)return `<button class="home" data-page="${E(x.n.page)}">${$t('Buka halaman terkait','Open related page')} ${ARROW}</button>`;return '';}
function ctxHtml(x){const from=x.t?.request?.from137;return `<div class="cx"><h5>${$t('Rumahnya','Where it lives')}</h5>${homeBtn(x)}<div class="facts">${ctxFacts(x).map(([k,v])=>`<span>${E(k)}</span><b>${E(v)}</b>`).join('')}</div>${from?`<p class="where">${$t('Dulu percakapan','Formerly conversation')} <span class="mono">${E(from)}</span>${$t('; sejak satu sistem, isinya pindah ke tiket ini dan terlihat oleh label di Pesan.','; since the move to one system, its content lives in this ticket and the label sees it in Messages.')}</p>`:''}</div>`;}
function conv(){const x=I.find(z=>z.id===S.sel);if(!x){$('conv').innerHTML=`<div class="empty" style="padding:80px 20px"><b>${$t('Pilih pesan','Select a message')}</b>${$t('Isinya tampil di sini.','Its content appears here.')}</div>`;$('ctx').innerHTML='';return;}
 const code=x.t?x.t.id:x.o?x.o.id:x.n?x.n.id:'';let h=`<div class="ch2"><button class="back" data-back>${BACK}${$t('Kotak Masuk','Inbox')}</button>${icon(x)}<div style="min-width:0"><b>${E(x.title)}</b><small>${E(x.who)} · ${E(x.type)}${code?` · <span class="mono">${E(code)}</span>`:''}</small></div>${kchip(x.kind)}</div><div class="cbody">`;
 if(x.kind==='reply')h+=bubbles(x);
 else if(x.kind==='mention')h+=`<div class="thread"><div class="bub int"><small class="bw">${$t('Catatan internal · ','Internal note · ')}${E(x.who)}</small>${E(x.snip)}</div></div>`;
 else h+=`<div class="nbox"><b>${E(x.title)}</b><p>${E(x.snip)}</p><small>${E(x.at?fd(x.at):ntime(x.time)||'')}</small></div>${x.kind==='notif'?`<p class="where">${$t('Membaca notifikasi tidak menyelesaikan pekerjaan terkait. Notifikasi ini hilang sendiri setelah pekerjaannya selesai di menu asal.','Reading a notification does not complete the related work. It disappears on its own once that work is done in its original menu.')}</p>`:''}`;
 h+=`</div><div class="cfoot">`;
 if(x.kind==='reply'){const canNote=SA()||x.t.handler===state.user||!x.t.handler;h+=`<div class="comp"><div class="seg2"><button data-mode="reply" aria-pressed="${S.mode==='reply'}">${$t('Balas ke label','Reply to label')}</button>${canNote?`<button data-mode="note" aria-pressed="${S.mode==='note'}">${$t('Catatan internal','Internal note')}</button>`:''}</div><textarea id="f-msg" placeholder="${S.mode==='reply'?$t('Tulis balasan · tersimpan di ','Write a reply · saved in ')+x.t.id:$t('Hanya terlihat oleh tim','Only visible to the team')}"></textarea><div class="hrow">${btn(S.mode==='reply'?$t('Kirim ke label','Send to label'):$t('Simpan catatan','Save note'),'data-do="send"','pri')}${btn($t('Tandai dibaca','Mark as read'),'data-do="read"')}</div></div>`;}
 else if(x.kind==='mention')h+=`<div class="comp"><textarea id="f-msg" placeholder="${$t('Balas di catatan internal tim','Reply in the team internal notes')}"></textarea><div class="hrow">${btn($t('Balas catatan','Reply to note'),'data-do="note-reply"','pri')}${btn($t('Tandai dibaca','Mark as read'),'data-do="read"')}</div></div>`;
 else if(x.kind==='assign')h+=`<div class="hrow">${btn($t(`Buka &amp; putuskan di ${E(x.home[0])} ${ARROW}`,`Open &amp; decide in ${E(x.home[0])} ${ARROW}`),`data-home="${x.o?'addon':'ticket'}"`,'pri')}${btn($t('Tandai dibaca','Mark as read'),'data-do="read"')}</div><p class="where">${$t('Keputusannya tetap diambil di menunya supaya tercatat di satu tempat.','The decision is still made in its own menu so it is recorded in one place.')}</p>`;
 else h+=`<div class="hrow">${x.n.obj||x.n.page?btn($t(`Buka ${E(x.n.obj||'halaman terkait')} ${ARROW}`,`Open ${E(x.n.obj||'related page')} ${ARROW}`),x.n.obj?`data-obj="${E(x.n.obj)}"`:`data-page="${E(x.n.page)}"`,'pri'):''}${btn(x.unread?$t('Tandai dibaca','Mark as read'):$t('Tandai belum dibaca','Mark as unread'),'data-do="toggle"')}</div>`;
 h+=`${!wide()?ctxHtml(x):''}</div>`;$('conv').innerHTML=h;$('ctx').innerHTML=ctxHtml(x);
 const th=$('conv').querySelector('.cbody');if(th)requestAnimationFrame(()=>{th.scrollTop=th.scrollHeight;});}
function keep(fn){const a=root.activeElement,v=$('f-msg')?.value,id=a?.id,pos=a&&'selectionStart' in a?a.selectionStart:null;fn();if(v&&$('f-msg'))$('f-msg').value=v;if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{const r=items();if(!narrow()&&(!S.sel||!r.some(z=>z.id===S.sel)))S.sel=r[0]?.id||null;strip();list();conv();$('wk').classList.toggle('reading',narrow()&&S.read&&!!S.sel);});badge();}
function toast(t){toast137(DEF,t);}
const val=id=>($(id)?.value||'').trim();
function markRead(x,on=true){const R=inbox().read[state.user];if(x.kind==='notif'){const r=x.n.read||(x.n.read=[]);if(on&&!r.includes(state.user))r.push(state.user);if(!on)x.n.read=r.filter(z=>z!==state.user);}else{const key=x.kind==='reply'||x.kind==='mention'?x.id:x.id+':'+x.mark;if(on)R[key]=x.mark;else delete R[key];}}
function act(a){const x=I.find(z=>z.id===S.sel);if(!x)return;let msg='';
 try{
 if(a==='send'){const n=val('f-msg');if(!n){toast($t('Tulis pesan dulu','Write a message first'));return;}const t=x.t,note=S.mode==='note';const cur=()=>Tickets112.init(ten).tickets.find(z=>z.id===t.id);
  if(!note&&cur().status==='submitted'&&!cur().handler)run112('claim',{id:t.id,version:cur().version});
  run112(note?'internal':'message',{id:t.id,version:cur().version,note:n,files:[]});
  inbox().read[state.user][x.id]=cur().history.length;msg=note?$t(`Catatan tersimpan di ${t.id}`,`Note saved in ${t.id}`):$t(`Terkirim ke ${x.who} · tersimpan di ${t.id}${note?'':' · keluar dari "Perlu jawaban"'}`,`Sent to ${x.who} · saved in ${t.id}${note?'':' · removed from "Needs reply"'}`);}
 else if(a==='note-reply'){const n=val('f-msg');if(!n){toast($t('Tulis catatan dulu','Write a note first'));return;}(data.chats.internal||(data.chats.internal=[])).push({who:state.user,text:[n,n],at:'baru saja',ts:ten.now});markRead(x);msg=$t('Tersimpan di catatan internal tim','Saved in the team internal notes');}
 else if(a==='read'){markRead(x);msg=$t('Ditandai dibaca · status pekerjaan tidak berubah','Marked as read · work status unchanged');}
 else if(a==='toggle'){markRead(x,!x.unread);msg=x.unread?$t('Ditandai dibaca','Marked as read'):$t('Ditandai belum dibaca','Marked as unread');}
 save10();}catch(err){toast(String(err?.message||err));return;}
 lastSig='';load();if(!I.some(z=>z.id===S.sel))S.sel=null;paint();toast(msg);}
function openHome(kind,x){try{if(kind==='ticket'&&x.t){markRead(x);save10();detail112(x.t.id);return;}if(kind==='addon'&&x.o){markRead(x);save10();detail111(x.o.id);return;}}catch(err){toast(String(err?.message||err));}}
function openObj(obj,x){if(x)markRead(x);try{save10();}catch(err){}
 if(String(obj).startsWith('RF-')){opModal(obj);return;}
 if(RM10.getRelease(ten,obj)){try{ui105.view='detail';ui105.id=obj;}catch(err){}if(!go137('releases'))taskModal(obj);return;}
 try{taskModal(obj);}catch(err){toast($t('Objek tidak tersedia','Item not available'));}}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const pl=t.closest('[data-pill]');if(pl){S.pill=pl.dataset.pill;S.read=false;paint();return;}
  const md=t.closest('[data-mode]');if(md){S.mode=md.dataset.mode;conv();return;}
  const dd=t.closest('[data-do]');if(dd){act(dd.dataset.do);return;}
  const x=I.find(z=>z.id===S.sel);
  const hm=t.closest('[data-home]');if(hm&&x){openHome(hm.dataset.home,x);return;}
  const ob=t.closest('[data-obj]');if(ob){openObj(ob.dataset.obj,x);return;}
  const pg=t.closest('[data-page]');if(pg&&x){markRead(x);save10();try{go(pg.dataset.page,'staff');}catch(err){toast($t('Buka halaman terkait','Open the related page'));}return;}
  if(t.closest('[data-back]')){S.read=false;paint();return;}
  const it=t.closest('.ib[data-id]');if(it){S.sel=it.dataset.id;S.read=true;S.mode='reply';const y=I.find(z=>z.id===S.sel);if(y&&y.unread&&y.kind==='notif'){markRead(y);try{save10();}catch(err){}load();}paint();return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 root.addEventListener('keydown',e=>{if(e.target.id==='f-msg'&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();const b=root.querySelector('[data-do="send"],[data-do="note-reply"]');b?.click();}});
 addEventListener('resize',()=>{if(DEF.host?.isConnected)paint();});}
/* ---------- satu pintu di header: angka belum dibaca di ikon Kotak Masuk; lonceng & chat dilebur ---------- */
function badge(){try{const b=document.querySelector('[data-control126=inbox]');if(!b)return;if(!DEF.host?.isConnected){load();}const n=I.filter(x=>x.unread).length;let s=b.querySelector('.ibn137');if(!s){s=document.createElement('span');s.className='ibn137';s.style.cssText='position:absolute;top:2px;right:0;min-width:16px;height:16px;padding:0 4px;border-radius:99px;background:#e5484d;color:#fff;font:600 10px/16px system-ui;text-align:center;pointer-events:none';if(getComputedStyle(b).position==='static')b.style.position='relative';b.append(s);}s.textContent=n>99?'99+':String(n);s.style.display=n?'':'none';b.title=n?$t(`Kotak Masuk · ${n} belum dibaca`,`Inbox · ${n} unread`):$t('Kotak Masuk','Inbox');b.classList.remove('has-dot131');}catch(err){}}
function merge(){if(isLabel10()||!me().super)return;document.querySelectorAll('[data-action="notifications"],[data-action="chat"]').forEach(el=>{if(!el.closest('#main,dialog'))el.style.display='none';});}
const sig=()=>I.map(x=>x.id+(x.unread?1:0)+(x.t?.history.length||'')).join('|')+'#'+U.today()+ten.role+state.user+'|'+state.lang;
const DEF={id:'inbox',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='inbox131'&&!state.preview,
 init(r){root=r;bind();},
 draw(){load();const s=sig();if(s===lastSig&&root.querySelector('#strip .sl'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan strip Kotak Masuk */
DEF.sum=function(){load();const u=I.filter(x=>x.unread),c=k=>u.filter(x=>inPill(x,k));
 return {unread:u.length,reply:c('reply').sort((a,b)=>(a.at||'').localeCompare(b.at||'')).map(x=>({id:x.id,who:x.who,title:x.title,at:x.at})),me:c('me').length,notif:c('notif').length};};
/*feed151 — Pulau Dinamis (dev.51): item belum dibaca sebagai satu baris "siapa + apa"; id berubah bila ada pesan baru di tiket yang sama */
const ACT151={reply:['membalas tiket','replied to a ticket'],a:['menugaskan tiket kepadamu','assigned you a ticket'],e:['meneruskan tiket ke Super Admin','escalated a ticket'],s:['mengusulkan penyelesaian layanan','proposed a service resolution'],mention:['menyebutmu di catatan internal','mentioned you in an internal note']};
DEF.feed=function(){load();return I.filter(x=>x.unread).map(x=>{const a=x.kind==='reply'?ACT151.reply:x.kind==='mention'?ACT151.mention:x.kind==='assign'?ACT151[x.id[0]]:null;
 return {id:x.id+'#'+(x.mark??''),ref:x.id,kind:x.kind==='notif'?'notif':'chat',who:x.kind==='notif'?x.title:x.who,line:a?$t(a[0],a[1]):''};});};
DEF.open=function(ref){load();const x=I.find(z=>z.id===ref);
 if(x&&(x.kind==='reply'||x.kind==='assign')&&x.t)return openHome('ticket',x);
 if(x&&x.kind==='assign'&&x.o)return openHome('addon',x);
 if(x&&x.kind==='notif'&&x.n.obj)return openObj(x.n.obj,x);
 if(x&&x.kind==='notif'&&x.n.page){markRead(x);try{save10();go(x.n.page,'staff');return;}catch(err){}}
 if(x){S.sel=x.id;S.read=true;S.pill='all';}try{openInbox131();}catch(err){go137('inbox');}};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
if(typeof inboxPage131==='function'){const ib=inboxPage131;inboxPage131=function(){if(DEF.when())return '';return ib.apply(this,arguments);};}
const renderBefore=render;render=function(){try{if(!document.documentElement.classList.contains('booting131')&&typeof ten==='object'&&ten)migrate();}catch(err){console.warn('ib137 migrate',err);}
 const out=renderBefore.apply(this,arguments);try{if(DEF.when())document.body.classList.add('nosidebar131');if(!isLabel10()&&me().super){merge();load();badge();}}catch(err){}return out;};
})();
