/* v1.1.0-dev.51 — Pulau Dinamis (mock v3 disetujui 23 Okt): hanya notifikasi & chat; SATU baris kecil per kemunculan
   (siapa + apa), tanpa isi detail dan tombol. Pulau tumbuh cair dari ikon Kotak Masuk (Super Admin & staf) atau ikon
   Pesan (label), tampil ±3,6 dtk (berhenti saat disorot), lalu kembali ke ikon. Klik → menu terkait. Bergiliran.
   Sumber: item belum dibaca yang BARU muncul sejak pemeriksaan terakhir — Kotak Masuk (ib137 DEF.feed) untuk tim;
   untuk label: balasan tim di Pesan + notifikasi label. Item yang sudah ada saat pertama dibuka / berganti pengguna
   dianggap lama (tidak muncul); perubahan besar sekaligus (>3, mis. ganti skenario) juga tidak dimunculkan. */
(function(){
const H=40,GAP=6,BOX=560,BR=20,SHOW=3600;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I={quiet:0,state:'idle',cur:null,timer:0,hover:false,q:[],seen:new Set(),key:'',queued:false};
const isLab=()=>{try{return isLabel10();}catch(e){return false;}};
const anchor=()=>isLab()?document.querySelector('.tools [data-p133=open]'):document.querySelector('[data-control126=inbox]');
const BELL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>';
const LN={activated:['akun labelmu aktif','your label account is active'],revision:['perlu diperbaiki','needs a fix'],reminder:['batas revisi semakin dekat','revision deadline is near'],timeout:['pengajuan ditutup','submission closed'],payout137:['saldo royalti bisa dicairkan','royalty balance can be withdrawn'],contract137:['menunggu aktivasi & perjanjian','awaits activation & agreement'],contractend137:['kontrak diakhiri','agreement ended'],news137:['pengumuman wajib baca','a must-read announcement']};
function feedLabel(){const out=[];
  try{for(const t of rows112()){if(!unread133(t))continue;out.push({id:'p:'+t.id+':'+lastStaff133(t),kind:'chat',who:$t('Tim Rilis Musik','Rilis Musik team'),line:$t('membalas pesanmu','replied to your message'),open:()=>{pesan133.sel=t.id;document.querySelector('.tools [data-p133=open]')?.click();}});}}catch(e){}
  try{for(const n of ten.notifications||[]){if(n.member!==ten.member)continue;const rel=n.ref?RM10.getRelease(ten,n.ref):null,w=LN[n.key]||['notifikasi baru','new notification'];
    out.push({id:'ln:'+(n.id??[n.key,n.ref,n.at].join('|')),kind:'notif',who:rel?.title||'Rilis Musik',line:$t(w[0],w[1]),open:()=>{if(rel&&typeof releaseModal10==='function'){releaseModal10(rel.id);return;}document.querySelector('.tools [data-action=notifications]')?.click();}});}}catch(e){}
  return out;}
function feed(){if(isLab())return feedLabel();const d=(typeof M137==='object'&&M137.defs||[]).find(x=>x.id==='inbox');if(!d?.feed)return [];
  return d.feed().map(x=>({...x,open:()=>d.open(x.ref)}));}

/* ---------- lapisan (sekali) ---------- */
let goo,gc,gp,gb,cont,glyph;
function build(){if(goo)return;
  const f=document.createElementNS('http://www.w3.org/2000/svg','svg');f.setAttribute('width','0');f.setAttribute('height','0');f.setAttribute('aria-hidden','true');f.style.position='absolute';
  f.innerHTML='<filter id="goo151" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" result="g"/><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter>';
  goo=document.createElement('div');goo.className='goo151';goo.innerHTML='<i class="gc"></i><i class="gb"></i><i class="gp"></i>';[gc,gb,gp]=goo.children;
  cont=document.createElement('div');cont.className='islc151';cont.setAttribute('role','status');cont.setAttribute('aria-live','polite');
  glyph=document.createElement('div');glyph.className='islg151';
  document.body.append(f,goo,glyph,cont);
  cont.addEventListener('mouseenter',()=>I.hover=true);cont.addEventListener('mouseleave',()=>I.hover=false);
  cont.addEventListener('click',openCur);}

/* ---------- geometri: lingkaran di atas ikon, leher, pil di bawahnya ---------- */
function measure(html){const t=document.createElement('div');t.className='islc151';t.style.cssText='left:-9999px;top:0;height:40px;width:auto;opacity:0';t.innerHTML=`<div class="row">${html}</div>`;document.body.append(t);const w=t.firstChild.scrollWidth;t.remove();return Math.min(w+2,innerWidth-24,340);}
function geo(a){const b=a.getBoundingClientRect(),cx=b.left+b.width/2,L=Math.max(0,Math.min(innerWidth-BOX,cx-BOX/2));
  Object.assign(goo.style,{left:L+'px',top:'0px',width:BOX+'px',height:(b.bottom+GAP+H+30)+'px'});
  const s=Math.max(b.width,b.height);Object.assign(gc.style,{left:(cx-L-s/2)+'px',top:(b.top+b.height/2-s/2)+'px',width:s+'px',height:s+'px'});
  Object.assign(glyph.style,{left:(cx-s/2)+'px',top:(b.top+b.height/2-s/2)+'px',width:s+'px',height:s+'px'});return {b,cx,L,s};}
function pillTo(a,w){const {b,cx,L,s}=geo(a);
  if(!w){Object.assign(gp.style,{left:(cx-L-s/2)+'px',top:(b.top+b.height/2-s/2)+'px',width:s+'px',height:s+'px'});Object.assign(gb.style,{left:(cx-L-BR/2)+'px',top:(b.top+b.height/2)+'px',width:BR+'px',height:'0px'});return;}
  Object.assign(gb.style,{left:(cx-L-BR/2)+'px',top:(b.top+b.height/2)+'px',width:BR+'px',height:(b.height/2+GAP+H/2)+'px'});
  const W=Math.min(w,innerWidth-24),x=Math.max(12,Math.min(innerWidth-12-W,cx-W/2));
  Object.assign(gp.style,{left:(x-L)+'px',top:(b.bottom+GAP)+'px',width:W+'px',height:H+'px'});
  Object.assign(cont.style,{left:x+'px',top:(b.bottom+GAP)+'px',width:W+'px',height:H+'px'});}

/* ---------- siklus: keluar dari ikon → tampil → kembali ke ikon → berikutnya ---------- */
const ini=s=>String(s||'').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const lineHTML=it=>`<span class="ava">${it.kind==='notif'?BELL:esc(ini(it.who))}</span><span class="ln"><b>${esc(it.who)}</b>${it.line?` <span>${esc(it.line)}</span>`:''}</span>`;
function emerge(){const a=anchor();if(!I.cur||!a||!a.getClientRects().length){I.cur=null;I.state='idle';return;}
  build();I.state='show';const html=lineHTML(I.cur);cont.innerHTML=`<button type="button" class="row">${html}</button>`;const w=measure(html);
  glyph.innerHTML=a.querySelector('svg')?.outerHTML||'';goo.classList.remove('out');gp.style.transition=gb.style.transition='none';pillTo(a,0);
  goo.classList.add('on');glyph.classList.add('on');a.style.visibility='hidden';gp.getBoundingClientRect();gp.style.transition=gb.style.transition='';
  requestAnimationFrame(()=>{pillTo(a,w);cont.classList.add('on');});arm();}
function arm(ms=SHOW){clearTimeout(I.timer);I.timer=setTimeout(function t(){if(I.hover){I.timer=setTimeout(t,900);return;}retract(true);},ms);}
function retract(gulp,after){clearTimeout(I.timer);if(!goo||I.state==='idle'){after&&after();return;}I.state='closing';cont.classList.remove('on');goo.classList.add('out');
  setTimeout(()=>{const a=anchor();if(a)pillTo(a,0);},140);
  setTimeout(()=>{goo.classList.remove('on');glyph.classList.remove('on');const a=anchor();if(a){a.style.visibility='';if(gulp){a.classList.remove('gulp151');void a.offsetWidth;a.classList.add('gulp151');}}
    I.state='idle';I.cur=null;I.hover=false;if(after)try{after();}catch(e){console.warn('pulau151',e);}
    if(I.q.length)setTimeout(()=>{if(I.state==='idle'){I.cur=I.q.shift();emerge();}},420);},620);}
function openCur(){const it=I.cur;if(!it||I.state!=='show')return;I.q.length=0;retract(false,()=>{it.open();});}

/* ---------- cari item baru setelah setiap render (digabung per bingkai, murah) ---------- */
function check(){I.queued=false;
  try{if(state.preview||document.hidden)return;}catch(e){return;}
  let list;try{list=feed();}catch(e){return;}
  const k=(isLab()?'L:'+ten.member:'U:'+state.user)+'|'+ten.role;
  if(k!==I.key||I.ten!==ten||I.data!==data||Date.now()<I.quiet){I.ten=ten;I.data=data;I.key=k;I.seen=new Set(list.map(x=>x.id));I.q.length=0;if(I.state==='show')retract(false);return;}
  const fresh=list.filter(x=>!I.seen.has(x.id));fresh.forEach(x=>I.seen.add(x.id));
  if(!fresh.length||fresh.length>3||!anchor())return;
  I.q.push(...fresh);if(I.state==='idle'){I.cur=I.q.shift();emerge();}}
const base=render;render=function(){const out=base.apply(this,arguments);if(!I.queued){I.queued=true;requestAnimationFrame(()=>setTimeout(check,0));}return out;};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&I.state==='show')retract(true);});
addEventListener('resize',()=>{if(I.state==='show'){const a=anchor();if(a)pillTo(a,measure(cont.querySelector('.row').innerHTML));}});
addEventListener('scroll',()=>{if(I.state==='show')retract(true);},{passive:true});
/* ganti skenario / pengguna di Studio Pratinjau = data baru: anggap semua item yang ada sebagai lama */
if(typeof studioStart==='function'){const ss=studioStart;studioStart=function(){I.key='';I.quiet=Date.now()+2500;I.q.length=0;if(I.state==='show')retract(false);return ss.apply(this,arguments);};}
window.pulau151={check,show:it=>{I.q.push(it);if(I.state==='idle'){I.cur=I.q.shift();emerge();}}};
})();
