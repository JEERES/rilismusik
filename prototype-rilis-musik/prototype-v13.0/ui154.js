/* v1.1.0-dev.54 — angka ringkasan menghitung naik saat sebuah menu dibuka (bukan tiap render): kotak ringkas di pita setiap
   halaman (.sbox) dan kartu uang Dashboard (.tile). Membantu mata menangkap besaran sebelum membaca rinciannya.
   Format angka dipertahankan (Rp, jt, %, desimal sesuai bahasa); teks yang bukan angka tunggal (mis. 7/17) dilewati. */
(function(){
const RM=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
const last={};
function parse(t){const m=String(t).trim().match(/^([^\d\-]*?)([\d][\d.,]*)([^\d/]*)$/);if(!m)return null;const en=state.lang==='en',num=m[2];let dec=0,val;
  if(en){const p=num.split('.');if(p.length>2)return null;dec=p[1]?p[1].length:0;val=parseFloat(num.replace(/,/g,''));}
  else{const p=num.split(',');if(p.length>2)return null;dec=p[1]?p[1].length:0;val=parseFloat(num.replace(/\./g,'').replace(',','.'));}
  return Number.isFinite(val)?{pre:m[1],suf:m[3],val,dec,loc:en?'en-US':'id-ID'}:null;}
function count(el){const p=parse(el.textContent);if(!p||p.val===0)return;const t0=performance.now(),dur=750,fm=v=>p.pre+v.toLocaleString(p.loc,{minimumFractionDigits:p.dec,maximumFractionDigits:p.dec})+p.suf,end=el.textContent;
  el.textContent=fm(0);const step=now=>{if(!el.isConnected)return;const q=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-q,3);el.textContent=q<1?fm(p.val*e):end;if(q<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
function run(){if(RM())return;try{for(const d of (typeof M137==='object'&&M137.defs)||[]){if(d.id==='staf152'||!d.root)continue;if(!d.host?.isConnected){delete last[d.id];continue;}
  const k=[d.id,state.page,typeof v4==='object'?v4.module:'',state.mode,state.lang,state.user].join('|');if(last[d.id]===k)continue;last[d.id]=k;
  d.root.querySelectorAll('.sbox b,.tile>b').forEach(count);}}catch(e){console.warn('ui154',e);}}
const base=render;render=function(){const out=base.apply(this,arguments);requestAnimationFrame(run);return out;};
})();
