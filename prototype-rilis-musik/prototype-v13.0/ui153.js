/* v1.1.0-dev.53 — aturan penanda tenang untuk halaman Shadow DOM (*137, st152): satu lembar gaya tambahan dipasang paling
   akhir di setiap halaman. Status = teks (merah hanya untuk terlambat/bermasalah, tebal untuk perlu tindakan, selain itu abu);
   pil kaca hanya di judul rincian (.hd .meta) tanpa titik kecuali merah; titik warna Kondisi menu & kelompok daftar dihapus;
   tahapan & centang satu warna tanpa denyut; ikon inisial flat tanpa bayangan; sampul tanpa bayangan. */
(function(){
const PILL='background:linear-gradient(180deg,var(--kp-t) 0%,transparent 26%,transparent 62%,var(--kp-b) 100%),linear-gradient(90deg,var(--kp-0) 0%,var(--kp-1) 13%,var(--kp-2) 35%,var(--kp-3) 62%,var(--kp-2) 88%,var(--kp-1) 100%)!important;box-shadow:inset 0 1px 0 var(--kp-rt),inset 0 -1.5px 0 var(--kp-rb),0 0 0 .5px var(--kp-ol),var(--kp-sh)!important';
const CSS=`
.chip.chip{display:inline!important;position:static!important;isolation:auto!important;height:auto!important;min-height:0!important;padding:0!important;gap:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;border:0!important;font-size:12.5px!important;font-weight:400!important;line-height:inherit!important;color:var(--muted)!important;vertical-align:baseline;max-width:none}
.chip.chip::before,.chip.chip::after{content:none!important;display:none!important}
.chip.chip i{display:none!important}
.chip.chip.c-red{color:var(--red)!important;font-weight:500!important}
.chip.chip.c-or{color:var(--text)!important;font-weight:500!important}
.hd .meta .chip.chip,.bigchip.bigchip{display:inline-flex!important;align-items:center;gap:5px!important;height:22px!important;padding:0 9px!important;border-radius:99px!important;font-size:11.5px!important;font-weight:400!important;color:var(--text)!important;${PILL}}
.hd .meta .chip.chip.c-red i,.bigchip.bigchip.c-red i{display:block!important;width:5px;height:5px;border-radius:50%;background:var(--red)}
.kr{grid-template-columns:minmax(0,1fr) 14px!important}
.kr .kdot{display:none!important}
.kr:has(.kdot.r) small{color:var(--red)!important}
.kr:has(.kdot.o) small{color:var(--text)!important}
.gh i{display:none!important}
.udot,.ldot{background:var(--text)!important;box-shadow:none!important}
.attn>div.o i{display:none!important}
.steps:before,.steps .prog{top:10px!important}
.steps .prog{background:var(--text)!important}
.st .b{width:22px!important;height:22px!important;background:var(--card)!important;box-shadow:inset 0 0 0 1.5px var(--line)!important}
.st.done .b{background:var(--text)!important;box-shadow:none!important;color:var(--card)!important}
.st.now .b{box-shadow:inset 0 0 0 2px var(--text)!important}.st.now .b:after{background:var(--text)!important}
.st.wait .b{box-shadow:inset 0 0 0 2px var(--muted)!important}.st.wait .b:after{background:var(--muted)!important}
.st.now .b:before{display:none!important;animation:none!important}
.st.now span{font-weight:500}
.cs .cd{box-shadow:inset 0 0 0 1.5px var(--line)!important}
.cs.now .cd,.cs.now.act .cd{box-shadow:inset 0 0 0 2px var(--text)!important}.cs.now .cd:after,.cs.now.act .cd:after{background:var(--text)!important}
.cs.now small,.cs.now.act small{color:var(--text)!important}
.cs.now.warn .cd{box-shadow:inset 0 0 0 2px var(--red)!important}.cs.now.warn .cd:after{background:var(--red)!important}
.s3 i{box-shadow:inset 0 0 0 1.5px var(--line)!important}
.s3.done i{background:var(--text)!important;color:var(--card)!important;box-shadow:none!important}
.s3.now i{box-shadow:inset 0 0 0 2px var(--text)!important}
.ck b{background:color-mix(in srgb,var(--text) 10%,transparent)!important;color:var(--text)!important;box-shadow:none!important}
.ck.warn b{background:transparent!important;box-shadow:inset 0 0 0 1.5px var(--text)!important}
.ck.bad b{background:var(--red)!important;color:#fff!important}
.ck b.no,.ck.todo b{background:transparent!important;box-shadow:inset 0 0 0 1.5px var(--faint)!important;color:var(--faint)!important}
.pb2.ok{background:color-mix(in srgb,var(--text) 10%,transparent)!important;color:var(--text)!important}
.lav,.lav.big{background:color-mix(in srgb,var(--text) 9%,var(--card))!important;color:var(--text)!important;box-shadow:none!important;font-weight:500}
.cv.big,.lav.big{box-shadow:none!important}
`;
let sheet=null;
function make(){if(sheet)return sheet;try{sheet=new CSSStyleSheet();sheet.replaceSync(CSS);}catch(e){sheet=false;}return sheet;}
function apply(){try{for(const d of (typeof M137==='object'&&M137.defs)||[]){const r=d.root;if(!r)continue;const s=make();
  if(s){if(!r.adoptedStyleSheets.includes(s))r.adoptedStyleSheets=[...r.adoptedStyleSheets,s];}
  else if(!r.querySelector('style[data-u153]')){const st=document.createElement('style');st.dataset.u153='';st.textContent=CSS;r.append(st);}}}catch(e){console.warn('ui153',e);}}
const base=render;render=function(){const out=base.apply(this,arguments);apply();return out;};
apply();
})();
