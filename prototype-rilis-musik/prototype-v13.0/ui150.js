/* v1.1.0-dev.50 — kartu rekening sesuai bank (disetujui 23–24 Okt): kartu yang sudah ada
   (.bank-card108 di Penarikan label, .payout-card-ui di Profil Label & dialog periksa rekening)
   ditandai data-bank150 dari nama banknya; ui150.css memberi gradasi warna identitas bank. */
(function(){
const RULES=[['bca',/\bbca\b|central asia/i],['mandiri',/mandiri/i],['bri',/\bbri\b|rakyat indonesia/i],['bni',/\bbni\b|negara indonesia/i],['bsi',/\bbsi\b|syariah indonesia/i],['cimb',/cimb/i],['permata',/permata/i],['danamon',/danamon/i],['btn',/\bbtn\b|tabungan negara/i],['jago',/\bjago\b/i]];
const keyOf=name=>{const n=String(name||'').trim();if(!n||/^belum|^no bank|^-$/i.test(n))return '';for(const [k,re] of RULES)if(re.test(n))return k;return 'lain';};
window.bankKey150=keyOf;
function tag(){for(const el of document.querySelectorAll('.bank-card108,.payout-card-ui')){const src=el.matches('.bank-card108')?el.querySelector('small'):el.querySelector('h3');const k=el.classList.contains('empty-ui')?'':keyOf(src&&src.textContent);if((el.dataset.bank150||'')!==k){if(k)el.dataset.bank150=k;else delete el.dataset.bank150;}}}
const base=render;render=function(){const out=base.apply(this,arguments);try{tag();}catch(e){}return out;};
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;try{tag();}catch(e){}});}).observe(document.body,{childList:true,subtree:true});
tag();
})();
