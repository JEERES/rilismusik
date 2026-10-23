/* v1.1.0-dev.36 — Kontrak Label dirancang ulang (rancangan disetujui 21 Okt 2026, mock ct1).
   Tab Status kontrak (per label: Berlaku · Belum disetujui · Diakhiri) · Naskah (CT-1 16 pasal, satu versi untuk semua label;
   Pasal 8 diisi Super Admin) · Penandatangan (badan hukum, penanggung jawab, tanda tangan & stempel — sumber tunggal untuk
   dokumen hukum). Kontrak berlaku selama akun aktif, tanpa tanggal berakhir; satu-satunya cara berhenti: pengakhiran.
   Data: ten.members (contract, contractSignatures102), ten.contracts102 (CT-1), ten.signer137. Hanya Super Admin. */
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
.focus .gbtn{display:inline-flex;align-items:center;gap:6px}.gbtn svg{width:15px;height:15px}
.cps{display:grid;gap:6px}
.cp{display:flex;align-items:center;gap:12px;padding:10px 10px 10px 14px;border-radius:14px;background:var(--white)}
.cp span{display:grid;gap:2px;min-width:0}.cp small{font-size:11.5px;color:var(--muted)}.cp b{font-weight:400;font-size:14.5px;overflow-wrap:anywhere}
.cpb{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:7px 12px;border-radius:99px;background:var(--soft);color:var(--text);flex:none;transition:background .2s}
.cpb svg{width:14px;height:14px}.cpb em{font-style:normal}
.cpb:hover{background:color-mix(in srgb,var(--text) 10%,transparent)}
.cpb.done{background:color-mix(in srgb,var(--green) 18%,transparent)}.cpb.done em::after{content:" ✓"}
.it .t1 .mono{font-size:11.5px;color:var(--faint)}
@media (max-width:820px){.cpb em{display:none}}
.wk.docmode{grid-template-columns:minmax(0,.85fr) minmax(0,1.35fr)}
.meter{height:6px;border-radius:99px;background:var(--line);margin:10px 0 6px;max-width:260px;overflow:hidden}
.meter i{display:block;height:100%;border-radius:99px;background:var(--green)}
.chg{display:grid;gap:8px}
.chg>div{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;line-height:1.45;padding:10px 12px;border-radius:12px;background:var(--soft)}
.chg .chip{margin-top:1px}
.toc{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.toc button{font-size:12px;padding:5px 10px;border-radius:99px;background:var(--soft);color:var(--muted)}
.toc button:hover{color:var(--text)}
.pb.docbody{gap:20px}
.pb.docbody .sec{scroll-margin-top:90px}
.ph4{font-size:15px!important;color:var(--text)!important;font-weight:500!important;margin-bottom:8px!important}
.pb.docbody p{margin:0 0 8px;font-size:14.5px;line-height:1.65;color:var(--text)}
.pb.docbody p b{font-weight:500}
.ayat{color:var(--muted);margin-right:6px;font-variant-numeric:tabular-nums}
.sig-block{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px;border-radius:16px;background:var(--soft);margin-top:6px}
.sig-block.one{grid-template-columns:1fr}
.sig-block>div{display:grid;gap:4px;font-size:13.5px}.sig-block small{color:var(--muted);font-size:12px}.sig-block b{font-weight:400}
.sigimg{display:flex;align-items:center;gap:10px;height:84px}
.pv.sig{font-family:"Brush Script MT","Segoe Script",cursive;font-size:28px;color:#1d3f8f;transform:rotate(-6deg);background:none}
:host([data-theme=dark]) .pv.sig{color:#8fb0ff}
.pv.stamp{width:74px;height:74px;border-radius:50%;border:3px double #3156c8;color:#3156c8;display:grid;place-items:center;font-size:9px;text-align:center;letter-spacing:.5px;opacity:.85;transform:rotate(-12deg);background:none}
.evid{font-size:12px;color:var(--muted);padding:8px 10px;border-radius:10px;border:1px dashed var(--line)}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tile{border-radius:14px;padding:12px;background:var(--soft);display:grid;gap:6px;font-size:13.5px}
.tile .pv{height:84px;border-radius:10px;background:var(--white)!important;display:grid;place-items:center}
.tile .pv.stamp{width:auto;border:0;transform:none}
.tile .pv.stamp span{width:70px;height:70px;border-radius:50%;border:3px double #3156c8;display:grid;place-items:center;transform:rotate(-12deg)}
.tile b{font-weight:400}.tile small{color:var(--muted);font-size:12px}.tile .sbtn{justify-self:start}
.uses{display:grid;gap:8px}
.uses>div{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:12px;background:var(--soft);font-size:13.5px}
.uses svg{width:18px;height:18px;color:var(--muted);flex:none}.uses small{display:block;color:var(--muted);font-size:12px}
.btn svg{width:15px;height:15px}
@media (max-width:1240px){.wk.docmode{grid-template-columns:minmax(0,1fr)}}
@media (max-width:820px){.sig-block{grid-template-columns:1fr}.tiles{grid-template-columns:1fr}}`;const HTML=`<main><div class="ph rl"><span class="nb">1</span>
  <div><h1>Kontrak Label</h1><div class="sub">Naskah yang berlaku, siapa sudah menyetujuinya, dan penandatangan perusahaan.</div></div>
 </div>
 <div class="tabsx" id="tabs"></div>
 <section class="band rv rl" id="band"><span class="nb">2</span></section>
 <div class="wk" id="wk">
  <section class="card list rv rl" id="list"><span class="nb">3</span></section>
  <section class="card pane rl" id="pane"><span class="nb">4</span><div class="pin" id="pin"></div></section>
 </div></main>`;
/* Naskah CT-1 (reset) — draf, perlu tinjauan ahli hukum sebelum produksi */
const CT={id:'CT-1',title:'Perjanjian Distribusi Musik',status:'Naskah baru',date:'21 Okt 2026',pasal:[
['Para Pihak',[
 'Perjanjian ini dibuat secara elektronik antara {{NAME}}, berkedudukan di {{CITY}}, NIB {{NIB}}, yang menjalankan layanan <b>Rilis Musik</b> (“Rilis Musik”), dan pemilik akun label yang namanya tercantum pada akun Rilis Musik (“Label”).',
 'Label menyatakan bahwa orang yang menyetujui Perjanjian ini berwenang mewakili Label, dan bahwa data identitas yang diberikan saat pendaftaran benar.']],
['Definisi',[
 '<b>Materi</b>: rekaman suara, karya musik, sampul, video, lirik, dan metadata yang dikirim Label melalui Rilis Musik.',
 '<b>Toko musik</b>: layanan digital pihak ketiga tempat Materi disalurkan, termasuk layanan streaming, unduhan, video, dan media sosial.',
 '<b>Mitra distribusi</b>: pihak ketiga yang bekerja sama dengan Rilis Musik untuk menyalurkan Materi ke Toko musik dan menerima laporan pendapatan.',
 '<b>Pendapatan bersih</b>: pendapatan dari Toko musik atas Materi yang benar-benar diterima Rilis Musik dari Mitra distribusi, setelah potongan Toko musik dan Mitra distribusi.',
 '<b>Paket</b>: layanan berlangganan atau kredit yang dipilih Label di aplikasi, termasuk masa berlakunya.']],
['Hak yang Diberikan',[
 'Label memberikan kepada Rilis Musik hak <b>non-eksklusif</b> untuk menggandakan, menyalurkan, menampilkan, dan memonetisasi Materi di Toko musik di seluruh dunia, selama Perjanjian berlaku.',
 'Hak cipta dan hak terkait atas Materi tetap milik Label atau pemegang haknya. Perjanjian ini tidak memindahkan kepemilikan apa pun.',
 'Label boleh mendistribusikan Materi yang sama melalui pihak lain, sepanjang tidak menimbulkan klaim ganda atas Materi yang sama di Toko musik yang sama.']],
['Jangka Waktu',[
 'Perjanjian ini berlaku sejak disetujui Label di aplikasi dan <b>tetap berlaku selama akun Label aktif</b>, tanpa tanggal berakhir.',
 'Masa berlaku layanan ditentukan oleh Paket. Berakhirnya Paket tidak mengakhiri Perjanjian, tetapi dapat membatasi pengiriman rilisan baru sampai Paket diperpanjang. Royalti atas Materi yang sudah tayang tetap tercatat.']],
['Kewajiban Rilis Musik',[
 'Menyalurkan Materi yang lolos pemeriksaan ke Toko musik yang dipilih, sesuai standar teknis Toko musik dan Mitra distribusi.',
 'Menyediakan laporan royalti bulanan di aplikasi setelah laporan Mitra distribusi diterima dan diperiksa.',
 'Menjaga kerahasiaan data Label dan menyediakan saluran bantuan melalui menu Pesan.']],
['Kewajiban dan Jaminan Label',[
 'Label menjamin memiliki atau memegang izin yang sah atas seluruh Materi, termasuk sampel, aransemen, dan karya pihak lain di dalamnya.',
 'Label menjamin Materi tidak melanggar hak pihak lain, hukum yang berlaku, atau kebijakan Toko musik, dan tidak menggunakan cara curang untuk menaikkan jumlah putar.',
 'Label wajib memberikan metadata yang akurat (judul, nama artis, pencipta, ISRC/UPC, tanggal rilis) dan memperbaruinya bila ada perubahan.']],
['Pemeriksaan dan Penurunan Materi',[
 'Rilis Musik berhak memeriksa, meminta perbaikan, menunda, atau menolak Materi yang tidak memenuhi standar.',
 'Rilis Musik dapat menurunkan Materi dari Toko musik bila ada klaim hak, perintah hukum, permintaan Toko musik, atau dugaan pelanggaran. Label akan diberi tahu melalui aplikasi.',
 'Label dapat meminta penurunan Materi kapan saja melalui aplikasi. Waktu penurunan mengikuti proses Toko musik.']],
['Royalti',[
 '{{PASAL8}}',
 'Pendapatan dalam mata uang asing dikonversi ke Rupiah dengan kurs yang dicatat Rilis Musik pada saat laporan diterima.']],
['Laporan dan Penarikan',[
 'Saldo royalti dapat ditarik bila mencapai <b>minimal Rp 1.000.000</b>.',
 'Pengajuan penarikan dibuka setiap <b>tanggal 1 sampai 14</b>, dan pembayaran dilakukan pada <b>tanggal 15 sampai 20</b> bulan yang sama ke rekening yang sudah terverifikasi.',
 'Rilis Musik dapat menahan sebagian saldo bila ada klaim, dugaan kecurangan, atau koreksi laporan dari Mitra distribusi, sampai masalah selesai. Penahanan disertai penjelasan di aplikasi.']],
['Paket dan Pembayaran Layanan',[
 'Harga, isi, dan masa berlaku Paket serta kredit mengikuti informasi di aplikasi pada saat pembelian.',
 'Pembayaran Paket tidak dapat dikembalikan, kecuali ditentukan lain oleh Rilis Musik atau diwajibkan hukum.']],
['Data Pribadi dan Kerahasiaan',[
 'Rilis Musik memproses data pribadi Label sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, hanya untuk menjalankan layanan, pembayaran, kepatuhan hukum, dan keamanan akun.',
 'Para pihak wajib menjaga kerahasiaan informasi non-publik yang diperoleh dari pihak lainnya.']],
['Pengakhiran',[
 'Label dapat mengakhiri Perjanjian dengan pemberitahuan melalui aplikasi paling lambat <b>30 hari</b> sebelumnya.',
 'Rilis Musik dapat mengakhiri Perjanjian atau menangguhkan akun bila Label melanggar Perjanjian, melakukan kecurangan, atau diwajibkan oleh hukum atau Toko musik.',
 'Setelah Perjanjian berakhir, Materi diturunkan dari Toko musik, dan royalti yang masih dilaporkan untuk periode sebelum pengakhiran tetap dibayarkan sesuai Pasal Laporan dan Penarikan.']],
['Batas Tanggung Jawab dan Ganti Rugi',[
 'Rilis Musik tidak bertanggung jawab atas keputusan, gangguan, atau perubahan kebijakan Toko musik dan Mitra distribusi.',
 'Label menanggung dan membebaskan Rilis Musik dari klaim pihak ketiga yang timbul karena Materi atau pelanggaran jaminan Label.',
 'Tanggung jawab Rilis Musik terbatas pada jumlah royalti yang belum dibayarkan kepada Label untuk periode terkait.']],
['Keadaan Kahar',[
 'Para pihak tidak bertanggung jawab atas keterlambatan atau kegagalan yang disebabkan keadaan di luar kendali wajar, seperti bencana, gangguan jaringan besar, atau keputusan pemerintah.']],
['Perubahan Perjanjian',[
 'Rilis Musik dapat memperbarui Perjanjian ini. Versi baru diumumkan melalui aplikasi dan diminta persetujuannya dari Label.',
 'Bila Label tidak menyetujui versi baru, Label dapat mengakhiri Perjanjian sesuai Pasal Pengakhiran. Persetujuan atas versi sebelumnya tetap tersimpan sebagai bukti.']],
['Hukum dan Penyelesaian Sengketa',[
 'Perjanjian ini tunduk pada hukum Republik Indonesia. Persetujuan elektronik di aplikasi sah sebagai tanda tangan elektronik sesuai Undang-Undang Informasi dan Transaksi Elektronik.',
 'Sengketa diselesaikan secara musyawarah. Bila tidak tercapai dalam 30 hari, sengketa diselesaikan melalui Pengadilan Negeri di tempat kedudukan Rilis Musik.']]
]};
/* pokok isi — [kunci, teks, kunci EN, teks EN] (ringkasan UI, bukan naskah yang mengikat) */
const SUMMARY=[
 ['Hak','Lisensi distribusi non-eksklusif ke seluruh dunia; hak cipta tetap milik label (Pasal 3).','Rights','Non-exclusive worldwide distribution licence; copyright stays with the label (Article 3).'],
 ['Masa','Berlaku selama akun aktif; masa layanan diatur oleh Paket (Pasal 4).','Term','In effect while the account is active; the service period follows the plan (Article 4).'],
 ['Royalti','Pembagian royalti diisi oleh Super Admin (Pasal 8).','Royalties','The royalty split is filled in by Super Admin (Article 8).'],
 ['Penarikan','Minimal Rp 1.000.000; pengajuan tanggal 1–14, pembayaran tanggal 15–20 (Pasal 9).','Withdrawals','Minimum Rp 1,000,000; requests on days 1–14, payment on days 15–20 (Article 9).'],
 ['Berhenti','Label dapat mengakhiri dengan pemberitahuan 30 hari; royalti periode sebelumnya tetap dibayar (Pasal 12).','Termination','The label can terminate with 30 days’ notice; royalties for earlier periods are still paid (Article 12).'],
 ['Hukum','Data pribadi sesuai UU 27/2022; persetujuan di aplikasi sah sesuai UU ITE (Pasal 11 & 16).','Law','Personal data under Law 27/2022; in-app acceptance is valid under the ITE Law (Articles 11 & 16).']];
const CT_EN={title:'Music Distribution Agreement',note:'This contract is written in Indonesian, which is the binding language. An English translation will be added after legal review.'};

let root=null,lastSig='',L=[];
const $=id=>root.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ARROW=sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),BACK=sv('<path d="m15 6-6 6 6 6"/>'),DOC=sv('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>');
const U=U137,fd=U.fd;
/* dua bahasa: [id,en] → sesuai bahasa saat dipakai; judul naskah di UI; tanggal di salinan unduhan tetap bahasa naskah (Indonesia) */
const T=x=>Array.isArray(x)?x[U.en()?1:0]:x;
const ctTitle=()=>$t(CT.title,CT_EN.title);
const fdID=s=>{if(!U.en())return fd(s);const l=state.lang;state.lang='id';try{return fd(s);}finally{state.lang=l;}};
const iso=v=>!v?'':typeof v==='number'?U.iso16(v):/(Z|[+-]\d\d:\d\d)$/.test(String(v))?U.iso16(Date.parse(v)):String(v).slice(0,16);
const hue=s=>[...String(s)].reduce((h,c)=>(h*31+c.charCodeAt(0))%360,11);
const ini=n=>String(n).split(' ').filter(w=>/^[A-Z0-9]/.test(w)).slice(0,2).map(w=>w[0]).join('')||String(n).slice(0,2).toUpperCase();
const chip=(t,c)=>`<span class="chip ${c||''}"><i></i>${t}</span>`;
const lav=(l,big)=>`<span class="lav${big?' big':''}" style="--h:${hue(l.id)}">${E(ini(l.n))}</span>`;
const sec=(i,h,b,ex='')=>`<div class="sec" style="--k:${i}"><h4>${h}${ex?`<em>${ex}</em>`:''}</h4>${b}</div>`;
const planOf=p=>{try{return String(Packages122.name(p)||p).toUpperCase();}catch(err){return String(p||'').toUpperCase();}};
const pname=id=>people.find(p=>p.id===id)?.name||'Super Admin';
const pini=id=>people.find(p=>p.id===id)?.initials||'SA';
const SA=()=>!!me().super&&!state.preview;
const S={tab:'status',seg:'',q:'',sel:null,read:false,form:null,reason:'label'};
const wide=()=>innerWidth>1240;
const SEG=[['ok',['Berlaku','In effect'],['menyetujui CT-1','accepted CT-1']],['none',['Belum disetujui','Not accepted'],['calon member','prospective members']],['ended',['Diakhiri','Ended'],['tidak berlaku','no longer in effect']]];
const REASON={label:['Atas permintaan label (pemberitahuan 30 hari)','At the label’s request (30 days’ notice)'],breach:['Pelanggaran perjanjian','Breach of agreement'],law:['Kewajiban hukum','Legal obligation']};
/* ---------- penandatangan (sumber tunggal identitas untuk dokumen hukum) ---------- */
function signer(){if(!ten.signer137){const c=(()=>{try{return system115().areas.content?.published?.company||{};}catch(err){return {};}})();
  ten.signer137={entity:{name:'',city:'',address:c.address||'',nib:'',email:c.email||'',phone:c.phone||''},person:'jeck',title:'',signature:null,stamp:null,history:[]};}
 return ten.signer137;}
const filled=v=>String(v||'').trim();
const miss=t=>`<span style="color:var(--muted)">${t}</span>`;
/* ---------- naskah CT-1 ---------- */
const ct1=()=>(ten.contracts102||[]).find(c=>c.id==='CT-1')||null;
function paras(html){const s=signer().entity,c=ct1()||{};const tok={NAME:filled(s.name)?`<b>${E(s.name)}</b>`:'<b>[nama badan hukum]</b>',CITY:filled(s.city)?E(s.city):'[kota kedudukan]',NIB:filled(s.nib)?E(s.nib):'[NIB]',
  PASAL8:filled(c.pasal8)?E(c.pasal8):'<b>[Diisi oleh Super Admin]</b> Pembagian royalti antara Label dan Rilis Musik.'};
 return html.replace(/\{\{(NAME|CITY|NIB|PASAL8)\}\}/g,(m,k)=>tok[k]);}
const plain=h=>h.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
function bodyText(){return CT.pasal.map(([t,ps],i)=>`Pasal ${i+1} · ${t}\n`+ps.map((p,j)=>`${ps.length>1?`(${j+1}) `:''}${plain(paras(p))}`).join('\n')).join('\n\n');}
/* CT-1 lama (3 kalimat) diganti naskah 16 pasal; teks label di aplikasi ikut naskah ini */
function syncCT(){const c=ct1();if(!c)return;const body=bodyText();if(c.body!==body||c.text137!==2){c.title=CT.title;c.titleEn='Music Distribution Agreement';c.body=body;c.bodyEn='The authoritative text of this agreement is in Indonesian. An English translation will follow.';c.text137=2;}}
function download(name,text){try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download=name;document.body.append(a);a.click();a.remove();}catch(err){}}
/* ---------- status per label (data asli) ---------- */
function load(){if(typeof ensureContracts102==='function')ensureContracts102();syncCT();
 L=ten.members.map(m=>{const sig=(m.contractSignatures102||[]).slice().sort((a,b)=>iso(a.at).localeCompare(iso(b.at))),last=sig.at(-1),end=m.contractEnd137||null;
  const st=end?'ended':m.contract?'ok':'none',calon=!sig.length;
  const hist=[...(m.activatedAt?[[iso(m.activatedAt),$t('Akun diaktifkan','Account activated'),'SY']]:[]),...sig.map(s=>[iso(s.at),$t(`Menyetujui ${s.id} · identitas v${s.identityVersion||1}`,`Accepted ${s.id} · identity v${s.identityVersion||1}`),'L']),...(m.contractHistory137||[]).map(h=>[iso(h.at),h.text,pini(h.by)])].sort((a,b)=>a[0].localeCompare(b[0]));
  const reminded=(m.contractHistory137||[]).filter(h=>h.kind==='remind').map(h=>iso(h.at)).sort().at(-1)||'';
  return {id:m.id,m,n:m.name,plan:planOf(m.plan),st,calon,last,at:last?iso(last.at):'',end,hist,reminded,person:m.identity?.person||m.pic||'',active:!!m.active};});}
const ST={ok:[['Berlaku','In effect'],'c-gr'],none:[['Belum disetujui','Not accepted'],'c-bl'],ended:[['Diakhiri','Ended'],'c-red']};
function visible(){let r=L.filter(l=>!S.seg||l.st===S.seg);if(S.q)r=r.filter(l=>(l.n+' '+l.id).toLowerCase().includes(S.q));const o={none:0,ended:1,ok:2};return r.sort((a,b)=>o[a.st]-o[b.st]||a.n.localeCompare(b.n));}
const cnt=k=>L.filter(l=>l.st===k).length;
function tabs(){$('tabs').innerHTML=[['status',$t('Status kontrak','Contract status'),L.length],['naskah',$t('Naskah','Contract text'),''],['ttd',$t('Penandatangan','Signatory'),'']].map(([k,t,n])=>`<button data-tab="${k}" aria-pressed="${S.tab===k}">${t}${n!==''?`<b>${n}</b>`:''}</button>`).join('');}
function band(){const b=$('band');if(S.tab!=='status'){b.style.display='none';return;}b.style.display='';const ok=cnt('ok'),no=cnt('none'),en=cnt('ended');
 b.innerHTML=`<div class="top"><div class="focus"><div class="k"><i></i>${$t('Kondisi kontrak','Contract overview')}</div><h2>${$t(`${ok} label berlaku dengan CT-1`,`${ok} ${ok===1?'label':'labels'} covered by CT-1`)}</h2>
  <p>${$t('Kontrak berlaku selama akun aktif · ','Contracts stay in effect while the account is active · ')}${no?$t(`${no} label belum menyetujui`,`${no} ${no===1?'label has':'labels have'} not accepted`):$t('semua label sudah menyetujui','all labels have accepted')}</p>
  <div class="acts">${no?`<button class="wbtn" data-seg="none">${$t('Lihat yang belum menyetujui','Show labels yet to accept')} ${ARROW}</button>`:''}<button class="gbtn" data-tab="naskah">${$t('Baca naskah CT-1','Read contract CT-1')}</button></div></div>
  <div class="statg"><div class="sbox"><b class="n">${ok}</b><span>${$t('berlaku','in effect')}</span></div><div class="sbox"><b class="n">${no}</b><span>${$t('belum disetujui','not accepted')}</span></div><div class="sbox"><b class="n">${en}</b><span>${$t('diakhiri','ended')}</span></div></div></div>
  <div class="flow" style="grid-template-columns:repeat(3,minmax(0,1fr))">${SEG.map(([k,t,d])=>{const n=cnt(k);return `<button class="fn${k==='ended'&&n?' hot act':''}${n?'':' zero'}" data-seg="${k}" aria-pressed="${S.seg===k}"><span class="dot n">${n}</span><span class="t">${T(t)}</span><span class="d">${T(d)}</span></button>`;}).join('')}</div>`;}
function adopt(){const act=L.filter(l=>l.active&&l.st!=='ended');return [act.filter(l=>l.last?.id==='CT-1'&&l.st==='ok').length,act.length];}
const find=()=>`<label class="find"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="${$t('Cari label','Search labels')}" value="${E(S.q)}"></label>`;
function list(){let h='';
 if(S.tab==='status'){const r=visible();h+=`<div class="ch"><h3>${$t('Status kontrak','Contract status')} <small class="n">${r.length}</small></h3>${find()}</div>`;
  const G=SEG.find(s=>s[0]===S.seg);if(G)h+=`<div class="flt"><span>${$t('Hanya ','Only ')}<b style="font-weight:500">${T(G[1])}</b></span><button data-seg="${G[0]}">${$t('Tampilkan semua','Show all')}</button></div>`;
  r.forEach((l,i)=>{const s=ST[l.st];h+=`<div class="it${S.sel===l.id?' sel':''}" data-id="${E(l.id)}" style="--i:${i}">${lav(l)}<div style="min-width:0"><div class="t1">${E(l.n)}<span class="plan ${l.plan}">${l.plan}</span></div><div class="t2">${l.st==='ended'?`${$t('diakhiri','ended')} ${fd(iso(l.end.at).slice(0,10))}`:l.st==='none'?(l.calon?$t('menunggu aktivasi','awaiting activation'):$t('identitas berubah · perlu persetujuan ulang','identity changed · needs to accept again')):`${E(l.last?.id||'CT-1')} · ${$t('disetujui','accepted')} ${fd(l.at.slice(0,10))}`}</div></div><div class="rgt">${chip(T(s[0]),s[1])}</div></div>`;});
  if(!r.length)h+=`<div class="empty"><b>${$t('Tidak ada label','No labels')}</b>${$t('Coba kata lain atau lepas penyaring.','Try another word or clear the filter.')}</div>`;}
 else if(S.tab==='naskah'){const c=ct1(),[n,t]=adopt();h+=`<div class="ch"><h3>${$t('Naskah yang berlaku','Current contract text')}</h3></div><p class="note" style="margin:0 0 6px">${$t('Disusun dan diperbarui tim pengembang Rilis Musik. Satu versi untuk semua label.','Written and updated by the Rilis Musik development team. One version for all labels.')}</p>
  <div class="it sel" data-ver="CT-1" style="--i:0"><span class="lav" style="--h:150">1</span><div style="min-width:0"><div class="t1">CT-1 · ${E(ctTitle())}</div><div class="t2">${c?fd(iso(c.at).slice(0,10)):''} · ${CT.pasal.length} ${$t('pasal','articles')}</div><div class="meter"><i style="width:${t?n/t*100:0}%"></i></div><div class="t2">${$t(`${n} dari ${t} label aktif menyetujui`,`${n} of ${t} active labels accepted`)}</div></div></div>
  <div class="sec" style="margin-top:18px"><h4>${$t('Pokok isi','Key points')}</h4><div class="chg">${SUMMARY.map(([k,v,ke,ve])=>`<div><span class="chip c-bl"><i></i>${$t(k,ke)}</span><span>${E(k==='Royalti'&&filled(c?.pasal8)?$t('Pembagian royalti sesuai Pasal 8 yang diisi Super Admin.','Royalty split per Article 8 as filled in by Super Admin.'):$t(v,ve))}</span></div>`).join('')}</div></div>`;}
 else{const s=signer(),e=s.entity;h+=`<div class="ch"><h3>${$t('Badan hukum','Legal entity')}</h3></div><div class="facts"><span>${$t('Nama','Name')}</span><b>${filled(e.name)?E(e.name):miss($t('belum diisi','not filled in'))}</b><span>${$t('Kedudukan','Domicile')}</span><b>${filled(e.city)?E(e.city):miss($t('belum diisi','not filled in'))}</b><span>${$t('Alamat','Address')}</span><b>${filled(e.address)?E(e.address):miss($t('belum diisi','not filled in'))}</b><span>NIB</span><b>${filled(e.nib)?E(e.nib):miss($t('belum diisi','not filled in'))}</b><span>Email</span><b>${filled(e.email)?E(e.email):miss($t('belum diisi','not filled in'))}</b><span>${$t('Telepon/WhatsApp','Phone/WhatsApp')}</span><b>${filled(e.phone)?E(e.phone):miss($t('belum diisi','not filled in'))}</b></div>
  <div class="sec" style="margin-top:20px"><h4>${$t('Penanggung jawab penandatangan','Person in charge of signing')}</h4><div class="facts"><span>${$t('Nama','Name')}</span><b>${E(pname(s.person))}</b><span>${$t('Jabatan','Position')}</span><b>${filled(s.title)?E(s.title):miss($t('belum diisi','not filled in'))}</b></div></div>
  <div class="sec" style="margin-top:20px"><h4>${$t('Tanda tangan & stempel','Signature & stamp')}</h4><div class="tiles">${['signature','stamp'].map(k=>{const v=s[k];return `<div class="tile">${v?`<div class="pv ${k==='signature'?'sig':'stamp'}" style="background:none"><img alt="" src="${v.url}" style="max-width:100%;max-height:64px;object-fit:contain"></div>`:`<div class="pv ${k==='signature'?'sig':'stamp'}" style="opacity:.45">${k==='signature'?$t('Tanda tangan','Signature'):`<span>${$t('STEMPEL','STAMP')}</span>`}</div>`}<b>${k==='signature'?$t('Tanda tangan','Signature'):$t('Stempel','Stamp')}</b><small>${v?`${$t('Tersimpan','Saved')} · ${E(v.name)}`:$t('Belum diunggah','Not uploaded')}</small>${SA()?`<label class="sbtn" style="position:relative;overflow:hidden;cursor:pointer">${v?$t('Ganti','Replace'):$t('Unggah','Upload')}<input type="file" accept="image/png,image/jpeg" data-img="${k}" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>`:''}</div>`;}).join('')}</div>
  <p class="note">${$t('Hanya Super Admin yang dapat melihat dan mengganti. Tidak pernah tampil di halaman publik. Gambar diperkecil otomatis.','Only Super Admin can view and replace these. Never shown on public pages. Images are resized automatically.')}</p></div>
  ${SA()?(S.form==='entity'?entityForm():`<div class="sbtns"><button class="sbtn" data-form="entity">${$t('Ubah data','Edit details')}</button></div>`):''}`;}
 $('list').innerHTML=h;}
function entityForm(){const s=signer(),e=s.entity,f=(id,l,v,ph='')=>`<label class="fld">${l}<input id="${id}" value="${E(v)}" placeholder="${E(ph)}"></label>`;
 return `<div class="reveal nextc" style="margin-top:14px">${f('e-name',$t('Nama badan hukum','Legal entity name'),e.name,$t('Mis. PT. Nama Perusahaan','E.g. PT. Company Name'))}${f('e-city',$t('Kedudukan (kota)','Domicile (city)'),e.city,$t('Mis. Sintang, Kalimantan Barat','E.g. Sintang, West Kalimantan'))}${f('e-address',$t('Alamat','Address'),e.address)}${f('e-nib','NIB',e.nib)}${f('e-email','Email',e.email)}${f('e-phone',$t('Telepon/WhatsApp','Phone/WhatsApp'),e.phone)}
  <label class="fld">${$t('Penanggung jawab','Person in charge')}<select id="e-person">${people.filter(p=>p.super).map(p=>`<option value="${p.id}"${p.id===s.person?' selected':''}>${E(p.name)}</option>`).join('')}</select></label>${f('e-title',$t('Jabatan','Position'),s.title,$t('Mis. Direktur','E.g. Director'))}
  <div class="hrow">${`<button class="btn pri" data-do="entity">${$t('Simpan','Save')}</button><button class="btn" data-form="">${$t('Batal','Cancel')}</button>`}</div><p class="where">${$t('Dipakai di Pasal 1 naskah dan blok tanda tangan semua dokumen hukum.','Used in Article 1 of the contract and in the signature block of every legal document.')}</p></div>`;}
/* ---------- rincian ---------- */
function statusPane(l){const s=ST[l.st];let b='',k=0;const sa=SA();
 if(l.st==='none')b+=sec(k++,$t('Perlu perhatian','Needs attention'),`<div class="attn"><div class="o"><i></i>${l.calon?$t('Kontrak disetujui di langkah aktivasi; label belum sampai di langkah itu.','The contract is accepted during activation; this label has not reached that step yet.'):$t('Identitas label berubah sehingga persetujuan lama tidak berlaku lagi; label perlu menyetujui ulang.','The label’s identity changed, so the earlier acceptance no longer applies; the label needs to accept again.')}${sa?(l.reminded.slice(0,10)===U.today()?`<span class="where" style="margin-left:auto">${$t('pengingat terkirim hari ini','reminder sent today')}</span>`:`<button class="sbtn" data-do="remind">${$t('Ingatkan','Remind')}</button>`):''}</div></div>`);
 if(l.st==='ended')b+=sec(k++,$t('Perlu perhatian','Needs attention'),`<div class="attn"><div><i></i>${$t('Kontrak diakhiri','Contract ended')} ${fd(iso(l.end.at))} · ${E(T(REASON[l.end.reason])||l.end.reason)}${l.end.note?` — ${E(l.end.note)}`:''}${$t('. Pengiriman rilisan baru tertahan; royalti periode sebelumnya tetap dibayar.','. New release deliveries are on hold; royalties for earlier periods are still paid.')}${sa?`<button class="sbtn" data-do="restore">${$t('Batalkan pengakhiran','Cancel termination')}</button>`:''}</div></div>`);
 b+=sec(k++,$t('Kontrak','Contract'),`<div class="facts"><span>${$t('Naskah','Text')}</span><b>${l.calon?'—':`${E(l.last?.id||'CT-1')} · ${E(ctTitle())}`}</b><span>${$t('Berlaku','Validity')}</span><b>${l.st==='ended'?$t('tidak berlaku','not in effect'):l.st==='none'?(l.calon?$t('setelah aktivasi','after activation'):$t('setelah disetujui ulang','after it is accepted again')):$t('selama akun aktif','while the account is active')}</b><span>${$t('Masa layanan','Service period')}</span><b>${$t('mengikuti paket','follows the plan')} <span class="plan ${l.plan}" style="vertical-align:1px">${l.plan}</span>${l.m.subscriptionEnd?` · ${$t('s.d.','until')} ${fd(iso(l.m.subscriptionEnd).slice(0,10))}`:''}</b><span>${$t('Tarif royalti','Royalty rate')}</span><b>${l.m.royaltyRate??60}% ${$t('untuk label · tercatat di akun','to the label · recorded on the account')}</b></div>`);
 if(l.last)b+=sec(k++,$t('Bukti persetujuan','Proof of acceptance'),`<div class="facts"><span>${$t('Disetujui','Accepted')}</span><b>${fd(l.at)} WIB</b><span>${$t('Cara','Method')}</span><b>${$t('Centang "Saya telah membaca dan menyetujui kontrak ini" di aplikasi','Ticked "I have read and accept the contract" in the app')}</b><span>${$t('Oleh','By')}</span><b>${$t('Penanggung jawab','Person in charge of')} ${E(l.n)}${l.person?` · ${E(l.person)}`:''}</b><span>${$t('Versi identitas','Identity version')}</span><b>v${l.last.identityVersion||1} ${$t('(tersimpan bersama persetujuan)','(stored with the acceptance)')}${l.m.version!==l.last.identityVersion?$t(' · identitas kini v',' · identity now v')+l.m.version:''}</b></div>`);
 b+=sec(k++,$t('Riwayat','History'),`<div class="tl">${l.hist.length?l.hist.slice().reverse().map(([d,t,w])=>`<div><span class="mini">${E(w==='L'?ini(l.n):w)}</span><span>${E(t)}<small>${fd(d)}</small></span></div>`).join(''):`<div><span class="mini">SY</span><span>${$t('Mendaftar','Registered')}<small>${$t('menunggu aktivasi','awaiting activation')}</small></span></div>`}</div>`);
 if(l.st==='ok'&&sa)b+=sec(k++,$t('Pengakhiran','Termination'),S.form==='end'?`<div class="reveal nextc"><div class="opts">${Object.entries(REASON).map(([v,t])=>`<button data-reason="${v}" aria-pressed="${S.reason===v}">${T(t)}</button>`).join('')}</div><label class="fld">${$t('Catatan · wajib, dikirim ke label','Note · required, sent to the label')}<textarea id="f-note" placeholder="${$t('Mis. label meminta berhenti per 30 Okt 2026 lewat Pesan','E.g. the label asked to stop as of 30 Oct 2026 via Messages')}"></textarea></label><div class="hrow"><button class="btn pri dng" data-do="end">${$t('Akhiri kontrak','End contract')}</button><button class="btn" data-form="">${$t('Batal','Cancel')}</button></div><p class="where">${$t('Pengiriman rilisan baru langsung tertahan. Penurunan materi dari toko musik diminta lewat tiket takedown.','New release deliveries are put on hold immediately. Removing material from music stores is requested through a takedown ticket.')}</p></div>`:`<p class="note" style="margin:0 0 10px">${$t('Label dapat mengakhiri dengan pemberitahuan 30 hari. Rilis Musik mengakhiri bila ada pelanggaran atau kewajiban hukum. Materi diturunkan; royalti periode sebelumnya tetap dibayar.','The label can terminate with 30 days’ notice. Rilis Musik terminates in case of a breach or a legal obligation. Material is taken down; royalties for earlier periods are still paid.')}</p><button class="sbtn dan" data-form="end">${$t('Akhiri kontrak','End contract')}</button>`);
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Status kontrak','Contract status')}</button>
  <div class="hrow" style="margin:0;gap:16px">${lav(l,true)}<div style="min-width:0;margin-right:auto"><h2>${E(l.n)}</h2><div class="meta" style="margin-top:6px"><span class="plan ${l.plan}">${l.plan}</span>${chip(T(s[0]),s[1])}</div></div></div>
  <div class="hrow">${l.last?`<button class="btn pri" data-do="copy">${DOC}${$t('Unduh salinan persetujuan','Download acceptance copy')}</button>`:''}<button class="btn" data-label="${E(l.id)}">${$t('Buka di Manajemen Label','Open in Label Management')}</button></div></div><div class="pb">${b}</div>`;}
/* blok tanda tangan = teks dokumen hukum (bahasa Indonesia); hanya penanda gambar/jabatan kosong yang diterjemahkan */
function sigBlock(one){const s=signer(),e=s.entity,img=k=>s[k]?`<img alt="" src="${s[k].url}" style="max-height:56px;max-width:140px;object-fit:contain">`:'';
 const co=`<div><small>Untuk dan atas nama</small><b>${filled(e.name)?E(e.name):'[nama badan hukum]'}</b><div class="sigimg">${s.signature?img('signature'):`<span class="pv sig" style="opacity:.4">${$t('tanda tangan','signature')}</span>`}${s.stamp?img('stamp'):`<span class="pv stamp" style="opacity:.4"><span>${$t('STEMPEL','STAMP')}</span></span>`}</div><b>${E(pname(s.person))}</b>${one?`<small>${filled(s.title)?E(s.title):$t('Jabatan belum diisi','Position not filled in')}</small>`:''}</div>`;
 return `<div class="sig-block${one?' one':''}">${co}${one?'':`<div><small>Label</small><b>[Nama label]</b><div class="sigimg"><span class="evid">Disetujui secara elektronik<br>[tanggal · jam WIB]</span></div><b>[Penanggung jawab]</b></div>`}</div>`;}
function docPane(){const c=ct1()||{},sa=SA();
 return `<div class="hd"><button class="back" data-back>${BACK}${$t('Naskah','Contract text')}</button><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${DOC}</span>CT-1 · ${c.at?fd(iso(c.at).slice(0,10)):''}</div><h2>${E(ctTitle())}</h2>
  <div class="meta">${chip($t('Berlaku untuk semua label','Applies to all labels'),'c-gr')}${chip($t('Perlu tinjauan hukum sebelum produksi','Needs legal review before production'),'c-or')}<span>${CT.pasal.length} ${$t('pasal','articles')}</span></div>
  <div class="hrow"><button class="btn pri" data-do="doc">${DOC}${$t('Unduh naskah','Download text')}</button></div>
  <div class="toc">${CT.pasal.map((p,i)=>`<button data-jump="${i}">${i+1}. ${E(p[0])}</button>`).join('')}</div></div>
  <div class="pb docbody">${U.en()?`<div class="attn"><div class="o"><i></i>${CT_EN.note}</div></div>`:''}${CT.pasal.map(([t,ps],i)=>`<div class="sec" id="ps${i}"${U.en()?' lang="id"':''} style="--k:${Math.min(i,8)}"><h4 class="ph4">Pasal ${i+1} · ${E(t)}</h4>${ps.map((p,j)=>`<p>${ps.length>1?`<span class="ayat">(${j+1})</span>`:''}${paras(p)}</p>`).join('')}${i===7&&sa?(S.form==='pasal8'?`<div class="reveal nextc"${U.en()?' lang="en"':''}><label class="fld">${$t('Pasal 8 ayat (1) · ditulis Super Admin','Article 8 clause (1) · written by Super Admin')}<textarea id="f-p8" placeholder="${$t('Tulis pembagian royalti antara Label dan Rilis Musik','Write the royalty split between the Label and Rilis Musik (in Indonesian)')}">${E(c.pasal8||'')}</textarea></label><div class="hrow"><button class="btn pri" data-do="pasal8">${$t('Simpan Pasal 8','Save Article 8')}</button><button class="btn" data-form="">${$t('Batal','Cancel')}</button></div><p class="where">${$t('Teks tampil apa adanya di naskah yang dibaca label. Tarif yang dibayar sistem tetap mengikuti tarif di akun tiap label.','The text appears exactly as written in the contract labels read. The rate the system pays still follows the rate on each label’s account.')}</p></div>`:`<div class="hrow"${U.en()?' lang="en"':''}><button class="sbtn" data-form="pasal8">${filled(c.pasal8)?$t('Ubah Pasal 8','Edit Article 8'):$t('Isi Pasal 8','Fill in Article 8')}</button>${c.pasal8By?`<span class="where">${$t('diisi','filled in by')} ${E(pname(c.pasal8By))} · ${fd(iso(c.pasal8At))}</span>`:''}</div>`):''}</div>`).join('')}
  ${sigBlock(false)}</div>`;}
function ttdPane(){const s=signer();return `<div class="hd"><div class="k"><span class="ty" style="width:26px;height:26px;border-radius:8px">${DOC}</span>${$t('Pratinjau','Preview')}</div><h2>${$t('Blok tanda tangan di dokumen','Signature block in documents')}</h2><p class="where">${$t('Tampilan ini dipakai otomatis di dokumen hukum.','This layout is used automatically in legal documents.')}</p></div>
 <div class="pb">${sec(0,$t('Contoh','Example'),sigBlock(true))}
 ${sec(1,$t('Dipakai di','Used in'),`<div class="uses"><div>${DOC}<span>${$t('Perjanjian Distribusi Musik','Music Distribution Agreement')}<small>${$t('naskah dan salinan persetujuan setiap label','the contract text and each label’s acceptance copy')}</small></span></div></div><p class="where" style="margin-top:8px">${$t('Dokumen lain (surat pernyataan hak cipta, izin remix, bukti penarikan) memakai blok yang sama saat dibuat.','Other documents (copyright statements, remix permissions, withdrawal receipts) use the same block when they are created.')}</p>`)}
 ${sec(2,$t('Riwayat perubahan','Change history'),s.history.length?`<div class="tl">${s.history.slice().reverse().slice(0,8).map(h=>`<div><span class="mini">${E(pini(h.by))}</span><span>${E(h.text)}<small>${fd(iso(h.at))}</small></span></div>`).join('')}</div>`:`<p class="where">${$t('Belum ada perubahan.','No changes yet.')}</p>`)}</div>`;}
let lastPane='';
function pane(){let html,key;
 if(S.tab==='status'){const l=L.find(x=>x.id===S.sel);html=l?statusPane(l):null;key='s'+S.sel;}else if(S.tab==='naskah'){html=docPane();key='n';}else{html=ttdPane();key='t';}
 $('pin').innerHTML=html||`<div class="empty" style="padding:60px 20px"><b>${$t('Pilih label','Select a label')}</b>${$t('Rinciannya tampil di sini.','Details appear here.')}</div>`;
 if(key!==lastPane){$('pane').classList.remove('swap','play');void $('pane').offsetWidth;$('pane').classList.add('swap','play');lastPane=key;}}
function stick(){const p=$('pane');p.classList.toggle('stick',wide()&&p.offsetHeight<=innerHeight-110);}
function keep(fn){const a=root.activeElement,vals={};root.querySelectorAll('input:not([type=file]),textarea,select').forEach(el=>{if(el.id)vals[el.id]=el.value;});const id=a?.id,pos=a&&a.type!=='file'&&'selectionStart' in a?a.selectionStart:null;
 fn();for(const [k,v] of Object.entries(vals)){const el=$(k);if(el&&el.value!==v&&k!=='q')el.value=v;}if(id){const el=$(id);if(el){el.focus({preventScroll:true});if(pos!=null&&el.setSelectionRange)try{el.setSelectionRange(pos,pos);}catch(err){}}}}
function paint(){keep(()=>{if(S.tab==='status'){const r=visible();if(wide()&&(!S.sel||!r.some(x=>x.id===S.sel)))S.sel=r[0]?.id||null;}
 tabs();band();list();pane();$('wk').classList.toggle('reading',!wide()&&S.read&&(S.tab!=='status'||!!S.sel));$('wk').classList.toggle('docmode',S.tab!=='status');stick();});}
function toast(t){toast137(DEF,t);}
function open(){S.read=true;S.form=null;paint();if(!wide()||$('pane').getBoundingClientRect().top<80)$('wk').scrollIntoView({behavior:'smooth',block:'start'});}
const val=id=>($(id)?.value||'').trim();
function log(m,kind,text){(m.contractHistory137||(m.contractHistory137=[])).push({kind,text,at:ten.now,by:state.user});}
function evt(kind,target,note){(ten.events||(ten.events=[])).unshift({id:++ten.serial,kind,target,note,actor:ten.role,actorId102:state.user,at:ten.now});}
function notify(member,key){(ten.notifications||(ten.notifications=[])).unshift({id:++ten.serial,member,key,ref:'CT-1',at:ten.now});}
function commit(fn){if(typeof atomic10==='function')atomic10(fn);else{fn();save10();}}
function act(a){const sa=SA();if(!sa&&a!=='copy'&&a!=='doc'){toast($t('Hanya Super Admin','Super Admin only'));return;}let msg='';
 try{
 /* berkas unduhan = naskah yang mengikat → tetap bahasa Indonesia di kedua mode */
 if(a==='doc'){syncCT();download('CT-1-Perjanjian-Distribusi-Musik.txt',`${CT.title}\nCT-1 · Rilis Musik\n\n${bodyText()}\n`);msg=$t('Naskah CT-1 diunduh','CT-1 text downloaded');}
 else if(a==='pasal8'){const t=val('f-p8');if(t.length<10){toast($t('Tulis isi Pasal 8','Write the Article 8 text'));return;}commit(()=>{const c=ct1();c.pasal8=t;c.pasal8At=ten.now;c.pasal8By=state.user;syncCT();evt('contract_text137','CT-1',$t('Pasal 8 diisi','Article 8 filled in'));});msg=$t('Pasal 8 disimpan · naskah label ikut berubah','Article 8 saved · the labels’ contract text is updated too');}
 else if(a==='entity'){const g=k=>val('e-'+k);const s=signer();commit(()=>{s.entity={name:g('name'),city:g('city'),address:g('address'),nib:g('nib'),email:g('email').toLowerCase(),phone:g('phone')};s.person=g('person')||s.person;s.title=g('title');s.history.push({text:$t('Data badan hukum & penanggung jawab diperbarui','Legal entity & person in charge updated'),at:ten.now,by:state.user});syncCT();});msg=$t('Tersimpan · dipakai di naskah dan blok tanda tangan','Saved · used in the contract text and signature block');}
 else{const l=L.find(x=>x.id===S.sel);if(!l)return;const m=l.m;
  if(a==='copy'){syncCT();download(`CT-1-${m.id}.txt`,`${CT.title}\nCT-1 · ${m.name}\n\n${bodyText()}\n\n— Persetujuan —\nLabel: ${m.name}\nDisetujui secara elektronik: ${fdID(l.at)} WIB\nVersi identitas: v${l.last.identityVersion||1}\n\nUntuk dan atas nama ${filled(signer().entity.name)||'[nama badan hukum]'}\n${pname(signer().person)}${filled(signer().title)?' · '+signer().title:''}\n`);msg=$t('Salinan persetujuan diunduh','Acceptance copy downloaded');}
  else if(a==='remind'){commit(()=>{notify(m.id,'contract137');log(m,'remind',$t('Pengingat persetujuan kontrak dikirim','Contract acceptance reminder sent'));evt('contract_remind137',m.id,'');});msg=$t(`Pengingat dikirim ke ${m.name}`,`Reminder sent to ${m.name}`);}
  else if(a==='end'){const note=val('f-note');if(note.length<5){toast($t('Tulis catatan untuk label','Write a note for the label'));return;}commit(()=>{m.contractEnd137={at:ten.now,by:state.user,reason:S.reason,note};m.contract=false;log(m,'end',`${$t('Kontrak diakhiri','Contract ended')} · ${T(REASON[S.reason])} — ${note}`);notify(m.id,'contractend137');evt('contract_end137',m.id,note);});msg=$t('Kontrak diakhiri · label diberi tahu','Contract ended · label notified');S.form=null;}
  else if(a==='restore'){commit(()=>{delete m.contractEnd137;m.contract=!!(m.contractSignatures102||[]).length;log(m,'restore',$t('Pengakhiran dibatalkan · kontrak berlaku lagi','Termination cancelled · contract in effect again'));evt('contract_restore137',m.id,'');});msg=$t('Pengakhiran dibatalkan','Termination cancelled');}}
 }catch(err){toast(String(err?.message||err));return;}
 S.form=null;lastSig='';load();paint();if(msg)toast(msg);}
/* gambar diperkecil di peramban sebelum disimpan, supaya data tetap ringan */
function image(input){const k=input.dataset.img,f=input.files?.[0];if(!f)return;if(!/^image\/(png|jpeg)$/.test(f.type)){toast($t('Gunakan PNG atau JPG','Use PNG or JPG'));return;}
 const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=k==='signature'?[420,160]:[240,240],sc=Math.min(1,max[0]/im.width,max[1]/im.height),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*sc));c.height=Math.max(1,Math.round(im.height*sc));c.getContext('2d').drawImage(im,0,0,c.width,c.height);
  let url=c.toDataURL('image/png');if(url.length>90000)url=c.toDataURL('image/jpeg',.8);if(url.length>120000){toast($t('Gambar terlalu besar setelah diperkecil','The image is still too large after resizing'));return;}
  const nm=k==='signature'?$t('Tanda tangan','Signature'):$t('Stempel','Stamp');
  const s=signer();commit(()=>{s[k]={url,name:f.name,at:ten.now,by:state.user};s.history.push({text:nm+$t(' diunggah · ',' uploaded · ')+f.name,at:ten.now,by:state.user});});lastSig='';paint();toast(nm+$t(' tersimpan',' saved'));};im.onerror=()=>toast($t('Gambar tidak bisa dibaca','The image could not be read'));im.src=r.result;};r.readAsDataURL(f);}
function bind(){
 root.addEventListener('click',e=>{const t=e.target;
  const tb=t.closest('[data-tab]');if(tb){S.tab=tb.dataset.tab;S.read=false;S.seg='';S.form=null;paint();return;}
  const sg=t.closest('[data-seg]');if(sg){S.tab='status';S.seg=S.seg===sg.dataset.seg?'':sg.dataset.seg;S.read=false;paint();return;}
  const fm=t.closest('[data-form]');if(fm){S.form=fm.dataset.form||null;paint();($('f-note')||$('f-p8')||$('e-name'))?.focus({preventScroll:true});return;}
  const rs=t.closest('[data-reason]');if(rs){S.reason=rs.dataset.reason;root.querySelectorAll('[data-reason]').forEach(b=>b.setAttribute('aria-pressed',b===rs));return;}
  const dd=t.closest('[data-do]');if(dd){act(dd.dataset.do);return;}
  const jp=t.closest('[data-jump]');if(jp){$('ps'+jp.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  const lb=t.closest('[data-label]');if(lb){try{if(typeof l136==='object'){l136.tab='all';l136.seg='';l136.q='';l136.sel=lb.dataset.label;l136.read=true;}}catch(err){}go137('labels');return;}
  if(t.closest('[data-ver]')){open();return;}
  if(t.closest('[data-back]')){S.read=false;S.form=null;paint();$('wk').scrollIntoView({block:'start'});return;}
  const it=t.closest('.it[data-id]');if(it){S.sel=it.dataset.id;open();return;}
 });
 root.addEventListener('input',e=>{if(e.target.id==='q'){S.q=e.target.value.toLowerCase();paint();}});
 root.addEventListener('change',e=>{if(e.target.dataset?.img)image(e.target);});
 let wasWide=wide();addEventListener('resize',()=>{if(!DEF.host?.isConnected)return;if(wide()!==wasWide){wasWide=wide();paint();}stick();});
 const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:0,rootMargin:'0px 0px -60px 0px'}):null;
 root.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));}
const sig=()=>L.map(l=>l.id+':'+l.st+':'+(l.last?.id||'')+':'+l.reminded).join('|')+'#'+JSON.stringify(signer().entity)+signer().title+(signer().signature?.at||0)+(signer().stamp?.at||0)+'#'+(ct1()?.pasal8At||0)+U.today()+state.lang;
const DEF={id:'contracts',css:STYLE,html:HTML,
 i18n:{'Kontrak Label':'Label Contracts','Naskah yang berlaku, siapa sudah menyetujuinya, dan penandatangan perusahaan.':'The contract text in force, who has accepted it, and the company signatory.'},
 when:()=>!isLabel10()&&state.mode==='platform'&&state.page==='module'&&typeof v4==='object'&&v4.module==='contracts'&&!!me().super,
 init(r){root=r;bind();},
 draw(){if(window.ctTab137){S.tab=window.ctTab137;S.read=false;S.form=null;window.ctTab137=null;lastSig='';}load();const s=sig();if(s===lastSig&&root.querySelector('#tabs button'))return;lastSig=s;paint();}};
/*sum137 — ringkasan untuk Dashboard: sama dengan pita biru Kontrak Label */
DEF.sum=function(){load();const ok=cnt('ok'),no=cnt('none'),en=cnt('ended');return {ok,none:no,ended:en,line:$t(`${ok} berlaku${no?` · ${no} label belum menyetujui`:' · semua label sudah menyetujui'}${en?` · ${en} diakhiri`:''}`,`${ok} in effect${no?` · ${no} ${no===1?'label has':'labels have'} not accepted`:' · all labels have accepted'}${en?` · ${en} ended`:''}`),tone:no?'b':'g'};};
page137(DEF);
const modBefore=modulePage;modulePage=function(){if(DEF.when())return '';return modBefore.apply(this,arguments);};
/* naskah label (modal Kontrak di sisi label) memakai teks CT-1 yang sama */
if(typeof ensureContracts102==='function'){const before=ensureContracts102;ensureContracts102=function(){const r=before.apply(this,arguments);try{if(ten.contracts102&&ten.members)syncCT();}catch(err){}return r;};}
})();
