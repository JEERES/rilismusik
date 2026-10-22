/* v1.1.0-dev.35 — Pemantauan Keuangan dirancang ulang (rancangan disetujui 22 Okt 2026, mock pk1).
   Satu halaman "Posisi keuangan": kas rekening royalti − kewajiban ke label = cadangan, empat blok yang menautkan ke
   rumah angkanya (Royalti, Penarikan, Transaksi), kalender kas dengan dua skenario, dan rekonsiliasi kas per rekening
   (saldo seharusnya menurut buku dari mutasi; selisih wajib dijelaskan). Angka dari model107/Withdraw108/Transactions113/
   transisi paket lama; catatan kas lewat Monitor121.cashSave (asli). Tab lama dipindah ke Royalti & Manajemen Label. */
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
.shell.noside{grid-template-columns:minmax(0,1fr)!important;padding:20px 28px 60px;max-width:1440px;margin:0 auto;width:100%;box-sizing:border-box}
.ibicon{background:var(--ink);color:var(--onink)}
.eq{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:14px;padding:12px 16px;border-radius:16px;background:#ffffff1c;box-shadow:inset 0 0 0 1px #ffffff2e;width:max-content;max-width:100%}
.eq span{display:grid;gap:2px}.eq small{font-size:11.5px;color:#ffffffc0}.eq b{font-weight:400;font-size:20px}
.eq i{font-style:normal;font-size:20px;color:#ffffffa0}.eq .res b{font-weight:500}
.pkcards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;position:relative}
.pc{display:grid;gap:6px;align-content:start;padding:18px;border-radius:22px;background:var(--card);box-shadow:inset 0 0 0 1px #0000000a,0 1px 2px #0000000a;font-size:13px;color:var(--muted);line-height:1.45;animation:rise .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 70ms)}
:host([data-theme=dark]) .pc{box-shadow:inset 0 0 0 1px #ffffff0f}
.pc small{font-size:12.5px}.pc b{font-weight:300;font-size:28px;color:var(--text);letter-spacing:-.5px}
.pc .lnk{justify-self:start;margin-top:6px;color:var(--text);font-size:13px}
.pkgrid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:start}
.tl2{display:grid;gap:4px;margin-top:8px}
.te{display:grid;grid-template-columns:56px minmax(0,1fr) minmax(120px,38%);gap:12px;align-items:center;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px;animation:rise .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 60ms)}
.te .td{color:var(--muted);font-size:12.5px}.te .tx{display:grid;gap:2px}.te .tx b{font-weight:400}
.te .tx b.pos{color:var(--green)}.te .tx b.neg{color:var(--red)}
.te .tb{display:grid;gap:3px}.te .tb i{display:block;height:6px;border-radius:99px;background:var(--blue);transform-origin:left;animation:grow .7s cubic-bezier(.2,.8,.2,1) both}
.te.out .tb i{background:color-mix(in srgb,var(--blue) 55%,transparent)}.te .tb small{font-size:12px;color:var(--muted);text-align:right}
.te.info{opacity:.75}
.accs{display:grid;gap:6px;margin-top:6px}
.acc{display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;background:var(--soft);text-align:left;font-size:14px;box-shadow:inset 0 0 0 1.5px transparent}
.acc.on{box-shadow:inset 0 0 0 1.5px var(--text);background:var(--white)}
.acc>span:nth-child(2){display:grid;gap:2px;margin-right:auto}.acc b{font-weight:400}.acc small{color:var(--muted);font-size:12px}
.recw{display:grid;gap:4px;margin:10px 0 12px}
.lg.tot{background:var(--white);box-shadow:inset 0 0 0 1px var(--line)}.lg.tot b{font-weight:500}
.mv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.mvi{display:flex;align-items:center;gap:10px;padding:12px;border-radius:14px;background:var(--soft);text-align:left;font-size:13.5px}
.mvi svg{width:14px;height:14px;color:var(--muted);flex:none}.mvi>span:last-child{display:grid;gap:2px}.mvi b{font-weight:400}.mvi small{color:var(--muted);font-size:12px}
.old2{color:var(--muted);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--red) 60%,transparent);white-space:nowrap}
.draft[data-proof]{cursor:pointer;width:100%;text-align:left}
@media (max-width:1240px){.pkcards{grid-template-columns:1fr 1fr}.pkgrid{grid-template-columns:1fr}.mv{grid-template-columns:1fr 1fr}}
@media (max-width:820px){.shell.noside{padding:14px 16px 70px!important}.pkcards,.mv{grid-template-columns:1fr}.te{grid-template-columns:48px minmax(0,1fr)}.te .tb{grid-column:2}.eq{width:auto}.eq b{font-size:17px}}`;const HTML=`<main><main class="pkx">
 <div class="ph rl"><span class="nb">1</span>
  <div><h1>Pemantauan Keuangan</h1><div class="sub">Posisi uang perusahaan: kas di rekening, yang wajib dibayar, dan yang akan masuk — dari satu sumber angka.</div></div>
 </div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="pkcards rl" id="cards"><span class="nb">3</span></div>
 <div class="pkgrid">
  <section class="card rl" id="cal"><span class="nb">4</span></section>
  <section class="card rl" id="rec"><span class="nb">5</span></section>
 </div>
 <section class="card rl" id="moved"><span class="nb">6</span></section></main>`;
let root=null,D=null,lastSig='';
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BANK=sv('<path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z"/>');
const btn=(t,a,cls='',dis=false)=>`<button class="btn ${cls}" ${a}${dis?' disabled':''}>${t}</button>`;
const U=U137,fd=U.fd;
const MS=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],MON=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const fs2=s=>{const [y,m,d]=s.slice(0,10).split('-').map(Number);return `${d} ${MS[m-1]}`;};
const rp=n=>(n<0?'−':'')+'Rp '+Math.round(Math.abs(n||0)).toLocaleString('id-ID');
const rps=n=>{const a=Math.abs(n||0),s=n<0?'−':'';return a>=1e9?`${s}Rp ${(a/1e9).toLocaleString('id-ID',{maximumFractionDigits:2})} M`:a>=1e6?`${s}Rp ${(a/1e6).toLocaleString('id-ID',{maximumFractionDigits:1})} jt`:rp(n);};
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).length===10?String(v)+'T09:00':String(v).slice(0,16);
const month=p=>{if(!p)return '';const [y,m]=String(p).split('-').map(Number);return `${MON[m-1]} ${y}`;};
const pname=id=>people.find(p=>p.id===id)?.name||'Super Admin';
const pini=id=>people.find(p=>p.id===id)?.initials||'SA';
const mname=id=>RM10.getMember(ten,id)?.name||id;
const ACC=[{id:'roy',name:'Rekening royalti',use:'menerima dana Believe, membayar penarikan label'},{id:'ops',name:'Rekening operasional',use:'menerima pembayaran paket, kredit, layanan; membayar pengembalian'}];
const accOf=scope=>/operasional|operational/i.test(scope||'')?'ops':'roy';
const S={acc:'roy',form:false,believe:true,all:true,proof:''};
const isMig=b=>b.fingerprint==='sample131-legacy'||/saldo-awal-migrasi/i.test(b.name||'');
/* ---------- data asli ---------- */
function load(){const r=model107(),W=model108(),M=Monitor121.init(ten),now=U.iso16(ten.now),today=U.today();
 let av=0,pr=0;const ready=[];
 for(const a of W.accounts||[]){const t=Withdraw108.totals(r,a.id),open=(W.requests||[]).some(w=>w.account===a.id&&w.status!=='paid');av+=t.available;pr+=t.processing;if(t.available>=1e6&&!open&&!(W.quarantined||[]).includes(a.id))ready.push([a.name||mname(a.id),t.available]);}
 const openWd=(W.requests||[]).filter(w=>w.status!=='paid').sort((a,b)=>a.id.localeCompare(b.id));
 const batchOf=id=>(r.batches||[]).find(b=>b.id===id),perOf=b=>b?.sample131?.period||b?.rows?.[0]?.period||'';
 const got=new Set((r.receipts||[]).flatMap(x=>[x.batch,...(x.allocations||[]).map(a=>a.batch)]).filter(Boolean));
 const expect=(r.batches||[]).filter(b=>!b.archived&&!isMig(b)&&!got.has(b.id)).map(b=>({id:b.id,period:perOf(b),amount:b.rows.reduce((n,x)=>n+x.amount,0)})).filter(x=>x.amount>0).sort((a,b)=>a.period.localeCompare(b.period));
 const receipts=(r.receipts||[]).filter(x=>!/MIGRASI/i.test(x.reference||'')).map(x=>{const b=batchOf(x.batch||x.allocations?.[0]?.batch);return {at:iso(x.date),ref:x.reference,amount:x.amount,period:perOf(b)};});
 /* mutasi buku per rekening */
 const moves={roy:[],ops:[]};
 for(const x of receipts)moves.roy.push([x.at,`Dana Believe ${month(x.period)} (${x.ref})`,x.amount,'Royalti']);
 const byDay={};for(const w of (W.requests||[]).filter(w=>w.status==='paid'&&w.paid)){const k=iso(w.paid);(byDay[k]||(byDay[k]=[])).push(w);}
 for(const [k,ws] of Object.entries(byDay)){ws.sort((a,b)=>a.id.localeCompare(b.id));moves.roy.push([k,ws.length>1?`${ws.length} pencairan (${ws[0].id}–${ws.at(-1).id})`:`Pencairan ${ws[0].id} · ${ws[0].name||mname(ws[0].account)}`,-ws.reduce((n,w)=>n+w.amount,0),'Penarikan']);}
 const T=Transactions113.init(ten);let svcMonth=0,svcN=0,svcPending=0;
 for(const p of T.provider){if(p.status!=='paid'||p.refund)continue;const o=T.orders.find(x=>x.id===p.order),at=iso(p.at);moves.ops.push([at,o?`Pembayaran ${o.title} · ${mname(o.account)}`:`Dana tanpa transaksi (${p.reference})`,p.amount,'Transaksi']);if(at.slice(0,7)===today.slice(0,7)){svcMonth+=p.amount;svcN++;}}
 for(const o of T.orders)if(o.payment==='pending')svcPending+=o.amount;
 for(const x of T.refunds)if(x.status==='done'&&x.completed)moves.ops.push([iso(x.completed),`Pengembalian ${x.id}`,-x.amount,'Transaksi']);
 let refundOut=0;const refundIds=[];for(const x of T.refunds)if(!['done','closed'].includes(x.status)){const o=T.orders.find(y=>y.id===x.order);let amt=x.amount||x.proposed||0;if(!amt&&o){try{amt=Transactions113.received(ten,o)-(o.payment==='paid'?o.amount:0);}catch(err){}}refundOut+=Math.max(0,amt);refundIds.push(x.id);}
 if(typeof tr132==='function'){const s=tr132();for(const q of s.requests){const l=s.lifetime[q.member];if(!l)continue;if(['submitted','checking','approved'].includes(q.status)){refundOut+=l.amount;refundIds.push(q.id);}if(q.status==='paid'){const h=q.history.find(h=>h.status==='paid');moves.ops.push([iso(h?.at||ten.now),`Refund paket lama ${q.id} · ${typeof memberName132==='function'?memberName132(q.member):q.member}`,-l.amount,'Transaksi']);}}}
 for(const k of Object.keys(moves))moves[k].sort((a,b)=>a[0].localeCompare(b[0]));
 /* catatan kas (Monitor121) per rekening */
 const recs={roy:[],ops:[]};for(const c of M.cash||[])recs[accOf(c.scope)].push(c);for(const k of Object.keys(recs))recs[k].sort((a,b)=>a.asof.localeCompare(b.asof));
 const acc=ACC.map(a=>{const last=recs[a.id].at(-1)||null,lastAt=last?iso(last.asof):'',since=last?moves[a.id].filter(m=>m[0]>lastAt&&m[0]<=now):[],exp=last?last.amount+since.reduce((n,m)=>n+m[2],0):null;
  return {...a,last,lastAt,since,exp,recs:recs[a.id],recent:moves[a.id].filter(m=>m[0]<=now).slice(-5),future:moves[a.id].filter(m=>m[0]>now)};});
 D={av,pr,owe:av+pr,ready,readySum:ready.reduce((n,x)=>n+x[1],0),openWd,expect,expectSum:expect.reduce((n,x)=>n+x.amount,0),svcMonth,svcN,svcPending,refundOut,refundIds,acc,version:M.version,now,today};}
const A=id=>D.acc.find(a=>a.id===id);
/* jendela pencairan berikutnya: pengajuan 1–14, bayar s.d. 20 */
const dueMonth=()=>{const [y,m,d]=D.today.split('-').map(Number);const n=d<=14?[y,m]:m===12?[y+1,1]:[y,m+1];return `${n[0]}-${String(n[1]).padStart(2,'0')}`;};
const endOf=ym=>{const [y,m]=ym.split('-').map(Number);return new Date(Date.UTC(y,m,0)).toISOString().slice(0,10);};
function timeline(){const roy=A('roy'),known=roy.exp!==null,ym=dueMonth(),mo=MS[+ym.slice(5)-1],ev=[[D.today,'Kas rekening royalti hari ini',0,'start']];
 if(ym+'-01'>D.today)ev.push([ym+'-01',`Jendela pengajuan penarikan dibuka (1–14 ${mo})`,0,'info']);
 for(const m of roy.future)if(m[0].slice(0,10)<=endOf(ym))ev.push([m[0].slice(0,10),m[1]+' · tercatat',m[2],m[2]>0?'in':'out']);
 if(S.believe&&D.expect.length)ev.push([ym+'-06',`Perkiraan dana Believe · ${D.expect.map(x=>MON[+x.period.slice(5)-1]).join(' & ')}`,D.expectSum,'in']);
 if(D.openWd.length)ev.push([ym+'-15',`Pencairan ${D.openWd.length} pengajuan berjalan (${D.openWd[0].id}${D.openWd.length>1?'–'+D.openWd.at(-1).id:''})`,-D.pr,'out']);
 if(S.all&&D.ready.length)ev.push([ym+'-20',`Pencairan bila ${D.ready.length} label siap ikut mengajukan`,-D.readySum,'out']);
 ev.push([endOf(ym),`Akhir ${MON[+ym.slice(5)-1]}`,0,'end']);ev.sort((a,b)=>a[0].localeCompare(b[0])||(a[3]==='start'?-1:b[3]==='start'?1:0));
 let bal=known?roy.exp:0,min=bal;return {known,ym,ev:ev.map(e=>{bal+=e[2];min=Math.min(min,bal);return [...e,bal];}),min,start:known?roy.exp:null};}
function status(){const t=timeline(),roy=A('roy');if(!t.known)return ['Kas belum dicatat','c-or'];const cover=D.owe?roy.exp/D.owe:9;return t.min<0?['Kas tidak cukup','c-red']:cover<1.15||t.min<1e7?['Perlu perhatian','c-or']:['Aman','c-gr'];}
function band(){const roy=A('roy'),k=roy.exp,o=D.owe,st=status(),t=timeline(),ym=dueMonth(),mo=MS[+ym.slice(5)-1];
 const head=!t.known?`Kas belum dicatat · kewajiban ke label ${rps(o)}`:k>=o?`${st[0]} · cadangan ${rps(k-o)} di atas kewajiban ke label`:`${st[0]} · kas ${rps(o-k)} di bawah kewajiban ke label`;
 const sub=!t.known?'Catat saldo rekening dari mutasi bank agar cadangan dan kalender kas bisa dihitung.':`Kas dari catatan ${fd(roy.lastAt)} + mutasi buku · titik terendah s.d. akhir ${MON[+ym.slice(5)-1]} ${rps(t.min)}`;
 $('band').innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>Posisi keuangan · hari ini ${E(U.todayLabel())}</div><h2>${head}</h2><p>${sub}</p>
  <div class="eq"><span><small>Kas rekening royalti</small><b class="n">${t.known?rps(k):'belum dicatat'}</b></span><i>−</i><span><small>Kewajiban ke label</small><b class="n">${rps(o)}</b></span><i>=</i><span class="res"><small>Cadangan</small><b class="n">${t.known?rps(k-o):'—'}</b></span></div>
  <div class="acts"><button class="wbtn" data-rec="roy">Catat posisi kas hari ini ${ARROW}</button><button class="gbtn" data-go="cal">Kalender kas</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${rps(D.pr+(S.all?D.readySum:0))}</b><span>wajib dibayar s.d. 20 ${mo}</span></div><div class="sbox"><b class="n">${rps(S.believe?D.expectSum:0)}</b><span>akan masuk (perkiraan)</span></div></div></div>`;}
function card(i,title,big,lines,link,nav){return `<div class="pc" style="--i:${i}"><small>${title}</small><b class="n">${big}</b>${lines.map(l=>`<span>${l}</span>`).join('')}<button class="lnk" data-nav="${nav}">${E(link)} ${ARROW}</button></div>`;}
function cards(){const roy=A('roy'),ops=A('ops'),known=[roy,ops].filter(a=>a.exp!==null),todayRec=[roy,ops].some(a=>a.lastAt.slice(0,10)===D.today),lastAny=[roy,ops].map(a=>a.lastAt).filter(Boolean).sort().at(-1),mo=MON[+D.today.slice(5,7)-1];
 $('cards').innerHTML=card(0,'Kas & rekonsiliasi',known.length?rps(known.reduce((n,a)=>n+a.exp,0)):'Belum dicatat',[`Royalti ${roy.exp!==null?rps(roy.exp):'belum dicatat'} · Operasional ${ops.exp!==null?rps(ops.exp):'belum dicatat'}`,todayRec?'sudah dicatat hari ini':lastAny?`perkiraan · catatan terakhir ${fs2(lastAny)}`:'belum ada catatan kas sungguhan'],'Rekonsiliasi di bawah','go:rec')+
  card(1,'Kewajiban ke label',rps(D.owe),[`${rps(D.av)} tersedia · ${rps(D.pr)} sedang dicairkan`,D.ready.length?`${D.ready.length} label siap cair belum mengajukan (${rps(D.readySum)})`:'semua saldo ≥ Rp 1 jt sudah diajukan'],'Royalti › Saldo label','royalty:bal')+
  card(2,'Akan masuk',rps(D.expectSum+D.svcPending),[D.expect.length?`Dana Believe ${D.expect.map(x=>MON[+x.period.slice(5)-1]).join(' & ')} ${rps(D.expectSum)} · setelah diterbitkan`:'Tidak ada laporan Believe yang menunggu dana',`Pembayaran layanan menunggu ${rp(D.svcPending)}`],'Royalti › Laporan','royalty:rep')+
  card(3,`Pendapatan layanan ${mo}`,rps(D.svcMonth),[D.svcN?`${D.svcN} pembayaran diterima penyedia`:'belum ada pembayaran bulan ini',D.refundOut?`Pengembalian berjalan ${rps(D.refundOut)} (rekening operasional)`:'tidak ada pengembalian berjalan'],'Transaksi','transactions');}
function cal(){const t=timeline(),mx=Math.max(...t.ev.map(e=>Math.abs(e[4])),1),mo=MON[+t.ym.slice(5)-1];
 $('cal').innerHTML=`<div class="ch"><h3>Kalender kas · rekening royalti</h3></div>
 <div class="pills"><button data-sc="believe" aria-pressed="${S.believe}">Dana Believe ${D.expect.length?D.expect.map(x=>MON[+x.period.slice(5)-1]).join(' & '):''} masuk ${S.believe?'✓':''}</button><button data-sc="all" aria-pressed="${S.all}">Semua label siap ikut menarik ${S.all?'✓':''}</button></div>
 <div class="tl2">${t.ev.map((e,i)=>`<div class="te ${e[3]}" style="--i:${i}"><span class="td">${fs2(e[0])}</span><span class="tx">${E(e[1])}${e[2]?`<b class="n ${e[2]<0?'neg':'pos'}">${e[2]>0?'+':''}${rp(e[2])}</b>`:''}</span><span class="tb">${t.known?`<i style="width:${Math.max(2,Math.max(0,e[4])/mx*100)}%"></i><small class="n">${rps(e[4])}</small>`:`<small class="n">${e[2]?(e[2]>0?'+':'')+rps(e[2]):''}</small>`}</span></div>`).join('')}</div>
 ${t.known?`<div class="ck ${t.min<0?'bad':t.min<1e7?'warn':''}" style="margin-top:12px"><b>${t.min<1e7?'!':'✓'}</b>Titik terendah ${rps(t.min)}<small>${t.min<0?'kas tidak cukup sebelum pencairan — siapkan dana sebelum tanggal 15':t.min<1e7?'tipis — pantau sebelum tanggal 15':`aman sampai akhir ${mo}`}</small></div>`:`<div class="ck warn" style="margin-top:12px"><b>!</b>Saldo awal belum ada<small>catat posisi kas rekening royalti untuk melihat titik terendah</small></div>`}
 <p class="where">${D.refundOut?`Pengembalian (${rps(D.refundOut)}${D.refundIds.length?` · ${D.refundIds.slice(0,3).join(', ')}`:''}) dibayar dari rekening operasional.`:'Pengembalian dibayar dari rekening operasional.'}</p>`;}
function rec(){const a=A(S.acc),first=!a.last;let h=`<div class="ch"><h3>Rekonsiliasi kas</h3></div>
 <div class="accs">${D.acc.map(x=>`<button class="acc${S.acc===x.id?' on':''}" data-acc="${x.id}"><span class="ty">${BANK}</span><span><b>${x.name}</b><small>${x.last?'dicatat '+fs2(x.lastAt):'belum ada catatan'}</small></span><b class="n">${x.exp!==null?rps(x.exp):'—'}</b></button>`).join('')}</div>
 <p class="where">${E(a.use)}.</p>
 <div class="recw">${a.last?`<div class="lg"><span>Catatan terakhir · ${fd(a.lastAt)}<small>${E(a.last.note)}</small></span><b class="n">${rp(a.last.amount)}</b></div>
 ${a.since.map(m=>`<div class="lg"><span>${E(m[1])}<small>${fd(m[0])} · ${m[3]}</small></span><b class="n ${m[2]<0?'neg':'pos'}">${m[2]>0?'+':''}${rp(m[2])}</b></div>`).join('')}
 <div class="lg tot"><span>Saldo seharusnya menurut buku</span><b class="n">${rp(a.exp)}</b></div>`:`<div class="lg"><span>Belum ada catatan kas<small>catatan pertama menjadi titik awal buku rekening ini</small></span><b class="n">—</b></div>${a.recent.length?`<p class="where" style="margin:6px 0 2px">Mutasi buku terakhir</p>${a.recent.map(m=>`<div class="lg"><span>${E(m[1])}<small>${fd(m[0])} · ${m[3]}</small></span><b class="n ${m[2]<0?'neg':'pos'}">${m[2]>0?'+':''}${rp(m[2])}</b></div>`).join('')}`:''}`}</div>`;
 if(!S.form)h+=`<div class="hrow">${btn('Catat posisi kas '+a.name.toLowerCase(),`data-rec="${a.id}"`,'pri')}</div>`;
 else{const def=U.iso16(ten.now);h+=`<div class="reveal nextc"><div class="f2"><label class="fld">Saldo di mutasi bank (Rp)<input id="f-amt" inputmode="numeric" placeholder="${a.exp!==null?a.exp.toLocaleString('id-ID'):'Mis. 61.500.000'}"></label><label class="fld">Waktu acuan · WIB<input id="f-at" type="datetime-local" value="${def}" max="${def}"></label></div>
  <label class="fld">Bukti<span class="draft" style="position:relative"><span>${S.proof?`<b>${E(S.proof)}</b><small>nama berkas tercatat · berkas tidak diunggah di prototipe</small>`:'<b>Lampirkan mutasi rekening</b><small>PDF / gambar</small>'}</span><input id="f-proof" type="file" accept=".pdf,image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer"></span></label>
  <p class="where" id="f-diff">${first?'Catatan pertama rekening ini menjadi titik awal buku.':'Isi saldo untuk melihat selisih dengan buku.'}</p><label class="fld" id="f-why" style="display:none">Penjelasan selisih · wajib<input id="f-note" placeholder="Mis. biaya transfer 5 × Rp 6.500"></label>
  <div class="hrow">${btn('Simpan catatan kas','data-save','pri')}${btn('Batal','data-cancel')}</div></div>`;}
 if(a.recs.length)h+=`<div class="hist" style="margin-top:12px">${a.recs.slice().reverse().slice(0,6).map(x=>`<div><span class="mini">${E(pini(x.actor))}</span><span>Dicatat ${rp(x.amount)} · ${E(x.note)}<small style="display:block">${E(pname(x.actor))} · posisi ${fd(iso(x.asof))}</small></span></div>`).join('')}</div>`;
 $('rec').innerHTML=h;}
const MOVED=[['Pemantauan Dana','Royalti › Saldo label','saldo per label, tersedia & sedang dicairkan','royalty:bal'],['Kewajiban Royalti','Royalti › Saldo label','kirim pengingat, sesuaikan saldo','royalty:bal'],['Perkembangan Katalog','Royalti › Analitik','pendapatan per label & per periode','royalty:ana'],['Kredit','Manajemen Label › rincian label','saldo kredit per label','labels'],['Tarif Khusus','Manajemen Label › rincian label','tombol "Ubah tarif"','labels'],['Bonus Kredit','Alat bonus kredit','masih di tampilan lama sampai pindah ke Manajemen Label','tool:bonuses']];
function moved(){$('moved').innerHTML=`<div class="ch"><h3>Dipindah dari halaman ini</h3></div><div class="mv">${MOVED.map(([a,b,c,n])=>`<button class="mvi" data-nav="${n}"><span class="old2">${E(a)}</span>${ARROW}<span><b>${E(b)}</b><small>${E(c)}</small></span></button>`).join('')}</div>`;}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('#rec input:not([type=file])').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&a.type!=='file'&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v)el.value=v;}diff();const w=$('f-why');if(w&&vals['f-note'])$('f-note').value=vals['f-note'];if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{band();cards();cal();rec();moved();});}
function toast(t){toast137(DEF,t);}
const amt=()=>+(($('f-amt')?.value)||'').replace(/[^\d]/g,'');
function diff(){const el=$('f-diff'),w=$('f-why');if(!el||!w)return;const a=A(S.acc),n=amt(),raw=($('f-amt')?.value||'').trim();if(a.exp===null){w.style.display='none';return;}
 if(!raw){el.textContent='Isi saldo untuk melihat selisih dengan buku.';el.classList.remove('warnx');w.style.display='none';return;}
 const d=n-a.exp;el.innerHTML=d?`Selisih <b>${rp(d)}</b> dari saldo seharusnya — wajib dijelaskan.`:'Cocok dengan buku. ✓';el.classList.toggle('warnx',!!d);w.style.display=d?'':'none';}
function save(){const a=A(S.acc),raw=($('f-amt')?.value||'').trim(),n=amt(),at=$('f-at')?.value||'';
 if(!raw){toast('Isi saldo dari mutasi bank');return;}if(!at){toast('Isi waktu acuan');return;}
 const asof=new Date(at+':00+07:00').toISOString();if(Date.parse(asof)>ten.now){toast('Waktu acuan tidak boleh melewati sekarang');return;}
 const d=a.exp===null?0:n-a.exp,why=($('f-note')?.value||'').trim();if(d&&why.length<5){toast('Selisih wajib dijelaskan');return;}
 const note=[S.proof?`Bukti ${S.proof}`:'Tanpa lampiran',a.exp===null?'catatan pertama':d?`selisih ${rp(d)}: ${why}`:'cocok dengan buku'].join(' · ');
 try{atomic10(()=>Monitor121.cashSave(ten,actor121(),{version:Monitor121.init(ten).version,amount:n,asof,scope:a.name,note,checked:true},ten.now));}catch(err){toast(String(err?.message||err));return;}
 S.form=false;S.proof='';lastSig='';load();paint();toast(a.exp===null?'Tersimpan · titik awal buku rekening ini':d?`Tersimpan · selisih ${rp(d)} tercatat dengan penjelasan`:'Tersimpan · cocok dengan buku');}
function nav(n){const [k,v]=n.split(':');
 if(k==='go'){$(v)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(k==='royalty'){window.royTab137=v;if(!go137('royalty'))toast('Buka menu Royalti');return;}
 if(k==='tool'){ui121.monitor=v;pendingUI.tab=v;render();scrollTo({top:0,behavior:'instant'});return;}
 if(!go137(k))toast('Buka menu '+k);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const rc=t.closest('[data-rec]');if(rc){S.acc=rc.dataset.rec||S.acc;S.form=true;S.proof='';paint();$('rec').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>$('f-amt')?.focus({preventScroll:true}),350);return;}
  const ac=t.closest('[data-acc]');if(ac){S.acc=ac.dataset.acc;S.form=false;S.proof='';paint();return;}
  if(t.closest('[data-cancel]')){S.form=false;S.proof='';paint();return;}
  if(t.closest('[data-save]')){save();return;}
  const sc=t.closest('[data-sc]');if(sc){S[sc.dataset.sc]=!S[sc.dataset.sc];paint();return;}
  const go=t.closest('[data-go]');if(go){$(go.dataset.go)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  const nv=t.closest('[data-nav]');if(nv){nav(nv.dataset.nav);return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='f-amt')diff();});
 root.addEventListener('change',e=>{if(e.target.id==='f-proof'){S.proof=e.target.files?.[0]?.name||'';paint();}});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
const TOOLS=['credits','rates','bonuses'];
const sig=()=>[D.owe,D.readySum,D.expectSum,D.svcMonth,D.svcPending,D.refundOut,D.version,D.today,...D.acc.map(a=>a.exp+':'+a.lastAt+':'+a.since.length)].join('|');
const DEF={id:'finance',css:STYLE,html:HTML,
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='liability9'&&ten.role==='super'&&(()=>{try{return super114();}catch(err){return false;}})()&&!(typeof ui121==='object'&&TOOLS.includes(ui121.monitor)),
 init(r){root=r;bind();},
 draw(){load();const s=sig();if(s===lastSig&&root.querySelector('#band .top'))return;lastSig=s;paint();}};
page137(DEF);
const liabBefore=liabilityPage9;liabilityPage9=function(){if(DEF.when())return '';return liabBefore.apply(this,arguments);};
/* Tombol Keuangan di header selalu membuka halaman baru; tombol bonus lama tetap membuka alat bonus. */
if(typeof goControl126==='function'){const before=goControl126;goControl126=function(id){if(id==='finance'&&typeof ui121==='object'&&TOOLS.includes(ui121.monitor))ui121.monitor='funds';return before.apply(this,arguments);};}
const haBefore=handleAction;handleAction=async function(b){if(b?.dataset?.action==='bonus-nav'&&typeof ui121==='object')ui121.monitor='bonuses';return haBefore.apply(this,arguments);};
})();
