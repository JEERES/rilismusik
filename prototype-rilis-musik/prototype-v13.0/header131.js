/* v1.1 dev.7 — header sebagai KARTU (bentuknya saja, isi tetap sapaan + Wawasan):
   berjarak dari tepi atas, empat sudut membulat; saat digulir melipat menjadi
   bar penuh kiri–kanan berkaca (gaya di header131.css).
   Lipat saat scroll (histeresis): memakai tombol lipat bawaan
   (.masthead-key124 → jalur v124/v129 yang teruji) begitu halaman digulir
   > 140 px; mengembang lagi hanya saat kembali ke puncak. Lipatan yang
   dilakukan pengguna sendiri tidak diganggu. */
'use strict';
(function(){
  let byScroll=false,ticking=false;
  const key=()=>document.querySelector('.masthead124 .masthead-key124');
  const expanded=()=>{try{return !!ui124.expanded;}catch{return false;}};
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{ticking=false;
      const k=key();if(!k||document.querySelector('.masthead124.is-folding129'))return;
      const y=window.scrollY||document.documentElement.scrollTop||0;
      if(y>140&&expanded()){byScroll=true;k.click();}
      else if(y<=0&&!expanded()&&byScroll){byScroll=false;k.click();}
    });
  }
  addEventListener('scroll',onScroll,{passive:true});
})();


/* dev.26: blok profil di bawah sidebar disembunyikan; nama · peran tampil sebagai tooltip foto di header. */
const renderBeforeWho135=render;
render=function(){const out=renderBeforeWho135.apply(this,arguments);try{const b=document.querySelector('.header .tools [data-action=account]');if(b){const label=isLabel10(),m=label?member10():me();const role=label?T('Label','Label')+(m.plan?` · ${typeof Packages122!=='undefined'?Packages122.tier(ten,m):m.plan}`:''):me().super?'Super Admin':'Admin';const tip=`${m.name} · ${role}`;b.title=tip;b.setAttribute('aria-label',`${T('Menu akun','Account menu')}: ${tip}`);}}catch(e){console.warn('who135',e);}return out;};
