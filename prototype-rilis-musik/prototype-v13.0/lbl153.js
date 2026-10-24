/* v1.1.0-dev.53 — label: "Registrasi WAMI" tidak lagi menu sendiri di sidebar (digabung ke Layanan Tambahan, keputusan 21 Okt).
   Layanan Tambahan label mendapat tab "Registrasi WAMI" yang membuka halaman WAMI yang sama (pengajuan, status, perbaikan),
   dan halaman WAMI menampilkan tab Layanan Tambahan di atasnya; sidebar menyorot Layanan Tambahan. Tautan lain ke WAMI
   (notifikasi, rincian rilisan, transaksi) tetap membuka laci rincian WAMI seperti sebelumnya. */
(function(){
const lab=()=>{try{return isLabel10();}catch(e){return false;}};
const WT=()=>T('Registrasi WAMI','WAMI Registration');
const p111=page111;page111=function(){const h=p111.apply(this,arguments);try{if(!lab())return h;
  return h.replace(/(<div class="tabs">[\s\S]*?)(<\/div>)/,(m,a,b)=>a+`<button type="button" class="btn" data-u11="route">${WT()}</button>`+b);}catch(e){return h;}};
/* sisipkan tab Layanan Tambahan tepat setelah kepala halaman WAMI */
function afterHead(h,ins){const i=h.indexOf('<div class="pagehead">');if(i<0)return ins+h;let d=0,j=i;const re=/<div\b|<\/div>/g;re.lastIndex=i;let m;
  while((m=re.exec(h))){d+=m[0]==='</div>'?-1:1;if(d===0){j=m.index+6;break;}}return h.slice(0,j)+ins+h.slice(j);}
const p11=page11;page11=function(){const h=p11.apply(this,arguments);try{if(!lab())return h;
  const tabs=`<div class="tabs">${[['all',T('Pesanan Saya','My Orders')],['catalogue',T('Pilihan Layanan','Service Options')]].map(([id,t])=>`<button type="button" class="btn" data-u153="addons" data-id="${id}">${t}</button>`).join('')}<button type="button" class="btn active" data-u11="route">${WT()}</button></div>`;
  return afterHead(h,tabs);}catch(e){return h;}};
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-u153="addons"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{ui111.tab=b.dataset.id;route111();}catch(err){console.warn('lbl153',err);}},true);
function side(){if(!lab())return;const s=document.querySelector('.side-scroll');if(!s)return;s.querySelectorAll('[data-u11="route"]').forEach(b=>b.remove());
  if(state.page==='module'&&typeof v4==='object'&&v4.module==='wami')s.querySelector('[data-u111="route"]')?.classList.add('active');}
const base=render;render=function(){const out=base.apply(this,arguments);try{side();}catch(e){}return out;};
})();
