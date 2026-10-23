/* v1.1.0-dev.49 — tandai badge paket lama (.package104) dengan nama paketnya agar ui149.css bisa memberi warna final.
   Badge ini dibuat di banyak tempat (header label, Manajemen Label, dialog paket, profil) dan diwarnai ulang oleh mountPackages122;
   kita cukup menambahkan data-plan149 dari teksnya setiap kali ada badge baru. */
(function(){
const PLANS={BASIC:'basic',FLEX:'basic',STUDIO:'studio',GO:'studio',PRO:'pro',BUSINESS:'business'};
function tag(root){const list=root.querySelectorAll?root.querySelectorAll('.package104'):[];for(const el of list){const k=PLANS[el.textContent.trim().toUpperCase()];if(k&&el.dataset.plan149!==k)el.dataset.plan149=k;}}
const base=render;render=function(){const out=base.apply(this,arguments);try{tag(document);}catch(e){}return out;};
/* dialog & popover dibuka di luar render: amati penambahan node saja, murah */
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;try{tag(document);}catch(e){}});}).observe(document.body,{childList:true,subtree:true});
tag(document);
})();
