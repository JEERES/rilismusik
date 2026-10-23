/* v1.1.0-dev.44 — identitas baru: logo RM kaca + wordmark "rilis musik" (markup di v122), header & pita hitam-putih
   (brand144.css), dan tiga momen merek untuk label: sambutan pertama, rilisan terkirim, rilisan tayang.
   Efek kaca + tanda suara ada di fx144.js dan baru dimuat saat momen terjadi (lazy131). Suara bisa dimatikan
   di Profil Label atau langsung dari kartu momen. Staf & Super Admin tidak pernah mendengarnya. */
(function(){
const KEY='rm-sound144';
const soundOn=()=>{try{return localStorage.getItem(KEY)!=='off';}catch(e){return true;}};
const setSound=v=>{try{localStorage.setItem(KEY,v?'on':'off');}catch(e){}};
const dark=()=>document.documentElement.dataset.theme==='dark';
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fx=()=>{try{return window.FX144||null;}catch(e){return null;}};
function fire(attrs){const b=document.createElement('button');b.type='button';b.tabIndex=-1;b.setAttribute('aria-hidden','true');b.style.cssText='opacity:0;width:1px;height:1px;padding:0;border:0;margin:0;overflow:hidden';for(const [k,v] of Object.entries(attrs))b.setAttribute(k,v);document.body.append(b);try{b.click();}finally{b.remove();}}
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
const MUTE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"/><path d="m17 9 5 5M22 9l-5 5"/></svg>';
const X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

/* ---------- kartu momen ---------- */
let card=null,run=null,timer=0;
function close(){clearTimeout(timer);if(run){try{run.stop();}catch(e){}run=null;}if(card){const c=card;card=null;c.classList.remove('on');setTimeout(()=>{try{c.hidePopover();}catch(e){}c.remove();},350);}}
function moment(id,title,sub){close();
 const el=document.createElement('div');el.className='moment144';el.setAttribute('role','status');el.setAttribute('aria-live','polite');
 el.innerHTML=`<span class="mic144"></span><span class="mt144"><b>${E(title)}</b><small>${E(sub||'')}</small></span><button type="button" class="msnd144" aria-pressed="${soundOn()}" title="${$t('Suara momen','Moment sound')}">${soundOn()?SPK:MUTE}</button><button type="button" class="mx144" aria-label="${$t('Tutup','Close')}">${X}</button>`;
 /* lapisan teratas (popover) supaya tetap terlihat di atas dialog yang sedang terbuka */
 el.setAttribute('popover','manual');document.body.append(el);try{el.showPopover();}catch(e){}card=el;requestAnimationFrame(()=>el.classList.add('on'));
 const f=fx();let dur=2.6;if(f){try{run=f.play(id,{host:el.querySelector('.mic144'),dark:dark(),sound:soundOn()});dur=run.dur;}catch(e){run=null;}}
 timer=setTimeout(close,(dur+2.4)*1000);}
window.moment144=moment;/* untuk QA & momen lain di masa depan */
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;
 if(t.closest('.moment144 .mx144')){close();return;}
 const s=t.closest('.moment144 .msnd144');if(s){const v=!soundOn();setSound(v);s.setAttribute('aria-pressed',v);s.innerHTML=v?SPK:MUTE;return;}});
document.addEventListener('change',e=>{const i=e.target.closest?.('[data-snd144]');if(i)setSound(i.checked);});

/* ---------- 1 · sambutan pertama: logo di dialog sambutan beriak dengan tanda suara lengkap ---------- */
const welcomed=new Set();
if(typeof welcome10==='function'){const w=welcome10;welcome10=function(){const out=w.apply(this,arguments);
 try{const btn=document.querySelector('[data-onboard105="active-welcome"]'),box=btn?.closest('.welcome105'),sp=box?.querySelector('.welcome-spark105');
  if(sp&&!sp.classList.contains('glass144')){sp.classList.add('glass144');sp.textContent='';const m=member10?.()?.id||'';
   if(!welcomed.has(m)){welcomed.add(m);setTimeout(()=>{const f=fx();if(f&&sp.isConnected){try{run=f.play('welcome',{host:sp,dark:dark(),sound:soundOn()});}catch(e){}}},260);}}}catch(e){}
 return out;};}

/* ---------- 2 · rilisan terkirim ---------- */
if(typeof run105==='function'){const r=run105;run105=function(action,p){const out=r.apply(this,arguments);
 try{if(action==='submit'&&isLabel10()&&!state.preview){const x=(ten.releases||[]).find(y=>y.id===p?.id)||{},title=x.title||p?.id||'';
  let due='';try{const d=window.due137?.(x)?.due;if(d)due=U137.dlabel(d);}catch(e){}
  setTimeout(()=>moment('sent',$t(`Rilisan terkirim · ${title}`,`Release submitted · ${title}`),due?$t(`Diperiksa tim Rilis Musik paling lambat ${due}`,`Checked by the Rilis Musik team by ${due}`):$t('Tim Rilis Musik segera memeriksanya','The Rilis Musik team will check it soon')),380);}}catch(e){}
 return out;};}

/* ---------- 3 · rilisan tayang: dirayakan sekali per rilisan di perangkat label ---------- */
const LIVE=['live','partial_closed'];
function checkLive(){const m=typeof member10==='function'?member10():null;if(!m)return;
 const ids=(ten.releases||[]).filter(r=>r.member===m.id&&LIVE.includes(r.status)).map(r=>r.id),k='rm-live144:'+m.id;let seen=null;
 try{seen=JSON.parse(localStorage.getItem(k)||'null');}catch(e){}
 const keep=list=>{try{localStorage.setItem(k,JSON.stringify(list));}catch(e){}};
 if(!Array.isArray(seen)){keep(ids);return;}
 const fresh=ids.filter(i=>!seen.includes(i));if(!fresh.length)return;keep([...new Set([...seen,...ids])]);
 const x=(ten.releases||[]).find(r=>r.id===fresh[0])||{},more=fresh.length-1;
 moment('live',$t(`Tayang! ${x.title||x.id} sudah ada di toko musik`,`Live! ${x.title||x.id} is in the music stores`),more?$t(`dan ${more} rilisan lain ikut tayang · lihat di Rilisan`,`and ${more} more release${more>1?'s':''} went live · see Releases`):$t('Lihat tautannya di Rilisan','See the store links in Releases'));}

/* ---------- Profil Label: pengaturan Suara momen; avatar label membuka Profil Label (bukan profil staf) ---------- */
if(typeof openProfile131==='function'){const op=openProfile131;openProfile131=function(){if(isLabel10()){try{closePop();}catch(e){}try{route102('account');}catch(e){fire({'data-ten':'page','data-id':'account'});}return;}return op.apply(this,arguments);};}
function soundRow(){const main=document.querySelector('#main');if(!main||main.querySelector('.snd144'))return;
 const row=document.createElement('section');row.className='snd144';
 row.innerHTML=`<div><b>${$t('Suara momen','Moment sound')}</b><small>${$t('Bunyi singkat saat akun aktif, rilisan terkirim, dan rilisan tayang.','A short sound when your account is activated, a release is submitted and a release goes live.')}</small></div><label class="sw131"><input type="checkbox" role="switch" data-snd144 ${soundOn()?'checked':''} aria-label="${$t('Suara momen','Moment sound')}"><span></span></label>`;
 const head=main.querySelector('.pagehead');head?head.after(row):main.prepend(row);}

const renderBefore144=render;
render=function(){const out=renderBefore144.apply(this,arguments);
 try{const mh=document.querySelector('.masthead124');if(mh)mh.classList.toggle('img144',!!mh.querySelector('.has-image130'));}catch(e){}
 try{if(isLabel10()&&!state.preview&&!document.documentElement.classList.contains('booting131')){checkLive();if(state.page==='module'&&v4.module==='account')soundRow();}}catch(e){console.warn('brand144',e);}
 return out;};
})();
