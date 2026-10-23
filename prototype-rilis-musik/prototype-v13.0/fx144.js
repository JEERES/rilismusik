/* v1.1.0-dev.44 — efek momen merek (dimuat belakangan lewat lazy131, hanya saat momen terjadi):
   logo RM di balik kaca cair yang beriak mengikuti tanda suara "da-da-DAAM" (Web Audio, tanpa berkas audio).
   Dipakai di tiga momen label: sambutan pertama, rilisan terkirim, rilisan tayang. GPU bekerja 1–3 detik lalu berhenti. */
(function(){
const VS='attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}';
const FS="precision highp float;varying vec2 v;uniform sampler2D uTex;uniform float uTime,uAmp,uDark,uTile,uAsp;uniform vec4 uRip[8];\nfloat sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}\nvec3 spec(float h){h=fract(h)*5.;vec3 c0=vec3(1.,.62,.04),c1=vec3(1.,.22,.37),c2=vec3(.75,.35,.95),c3=vec3(.37,.36,.92),c4=vec3(.25,.78,.88);if(h<1.)return mix(c0,c1,h);if(h<2.)return mix(c1,c2,h-1.);if(h<3.)return mix(c2,c3,h-2.);if(h<4.)return mix(c3,c4,h-3.);return mix(c4,c0,h-4.);}\nfloat M(vec2 u){if(u.x<0.||u.y<0.||u.x>1.||u.y>1.)return 0.;return texture2D(uTex,u).a;}\nfloat SD(vec2 p){return sdRB(p,vec2(.84),.38);}\nvoid main(){vec2 p=(v-.5)*2.;p.x*=uAsp;vec2 off=vec2(0.);float rip=0.;\n for(int i=0;i<8;i++){vec4 R=uRip[i];if(R.w<=0.)continue;float age=uTime-R.z;if(age<0.||age>3.6)continue;vec2 d=p-R.xy;float r=length(d)+1e-4;float x=r-age*.9;\n  float w=sin(x*24.)*exp(-x*x*12.)*exp(-age*1.2)*R.w;off+=d/r*w*.02;rip+=abs(w);}\n off+=p*uAmp*.01*sin(uTime*8.+length(p)*10.);\n vec2 n=vec2(0.);float e=0.,d=-1.;\n if(uTile>.5){d=SD(p);float h=.003;n=normalize(vec2(SD(p+vec2(h,0.))-SD(p-vec2(h,0.)),SD(p+vec2(0.,h))-SD(p-vec2(0.,h)))+1e-6);e=smoothstep(-.3,0.,d);off+=-n*e*e*.07;}\n vec2 ca=(n*e*.018+off*.55)*(1.+uAmp*1.2);vec2 k=vec2(.5/uAsp,.5);vec2 b=v+off*k,c=ca*k;\n vec3 cov=vec3(M(b-c),M(b),M(b+c));\n if(uTile>.5){bool dk=uDark>.5;float inner=smoothstep(0.,-.12,d);\n  vec3 base=dk?mix(vec3(.018),vec3(.075),smoothstep(-1.,1.,p.y)):mix(vec3(.885),vec3(.99),smoothstep(-1.1,.7,p.y));\n  vec3 col=dk?base+cov*.96:base*(1.-cov*.975);\n  float bev=exp(-abs(d+.04)*40.);col+=dk?vec3(bev*.05):vec3(-bev*.085);\n  float top=smoothstep(-.5,1.,p.y);float rim=exp(-abs(d+.007)*150.);col=mix(col,vec3(1.),rim*(dk?.5:.92)*(.3+.7*top));\n  vec2 pn=normalize(p+1e-5);float c1=pow(max(0.,dot(pn,vec2(.7071,.7071))),7.),c2=pow(max(0.,dot(pn,vec2(-.7071,-.7071))),7.);float cw=c1+c2*.95;\n  float hue=atan(p.y,p.x)/6.28318*3.6+.08+uTime*.03+rip*.12;vec3 sp=spec(hue);\n  float streak=exp(-abs(d+.024)*48.)*cw;float glow=exp(-abs(d+.06)*14.)*cw*.35;\n  col=dk?col+sp*(streak*1.25+glow*.6):mix(col,sp,clamp(streak*1.05+glow*.25,0.,.9));\n  float sheen=clamp(rip*.45,0.,1.)*inner;vec3 lt=mix(vec3(1.),sp,.3);col=dk?col+lt*sheen*.16:mix(col,lt,sheen*.12);\n  float A=1.-smoothstep(-.004,.004,d);float ds=SD(p-vec2(0.,-.07));float sh=dk?0.:exp(-max(ds,0.)*9.)*.18*(1.-A)*smoothstep(1.,.88,max(abs(p.x),abs(p.y)));\n  gl_FragColor=vec4(clamp(col,0.,1.)*A,A+sh);}\n else{float A=max(cov.r,max(cov.g,cov.b));vec3 col=uDark>.5?cov:vec3(A)-cov*.97;gl_FragColor=vec4(col,A);}}\n";
const RM=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
function mark(){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#fff';x.textAlign='center';x.font='700 178px "RM Geist", system-ui, sans-serif';if('letterSpacing' in x)x.letterSpacing='-10px';const m=x.measureText('RM');x.fillText('RM',258,256+(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2);return c;}
class Glass{constructor(canvas,dark){this.c=canvas;this.dark=dark;this.rip=[];this.amp=0;this.hold=false;this.t0=performance.now();this.raf=0;
  const gl=canvas.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:true});this.gl=gl;if(!gl){this.fail=true;return;}
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;};
  const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,VS));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS)){this.fail=true;return;}gl.useProgram(p);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(p,'a');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const tx=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tx);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);[gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR));[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,mark());
  this.U={};['uTime','uAmp','uDark','uTile','uAsp','uRip[0]'].forEach(n=>this.U[n]=gl.getUniformLocation(p,n));}
 now(){return (performance.now()-this.t0)/1000;}
 ripple(x,y,s){this.rip.push([x,y,this.now(),s]);if(this.rip.length>8)this.rip.shift();this.loop();}
 draw(t=this.now()){if(this.fail)return;const gl=this.gl,U=this.U;gl.viewport(0,0,this.c.width,this.c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(U.uTime,t);gl.uniform1f(U.uAmp,this.amp);gl.uniform1f(U.uDark,this.dark?1:0);gl.uniform1f(U.uTile,1);gl.uniform1f(U.uAsp,1);
  const R=new Float32Array(32);this.rip.forEach((r,i)=>R.set(r,i*4));gl.uniform4fv(U['uRip[0]'],R);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
 alive(){const t=this.now();return this.rip.some(r=>t-r[2]<3.6)||this.amp>.002||this.hold;}
 loop(){if(this.raf||this.fail)return;const step=()=>{this.draw();if(this.alive()&&!this.dead)this.raf=requestAnimationFrame(step);else{this.raf=0;this.rip=[];if(!this.dead)this.draw();}};this.raf=requestAnimationFrame(step);}
 free(){this.dead=true;cancelAnimationFrame(this.raf);try{this.gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch(e){}}}
/* ---------- tanda suara ---------- */
let AC=null,AN=null,BUS=null,REV=null;
function audio(){if(AC)return AC;AC=new (window.AudioContext||window.webkitAudioContext)();
 BUS=AC.createGain();BUS.gain.value=.9;const sat=AC.createWaveShaper(),N=1024,cv=new Float32Array(N);for(let i=0;i<N;i++){const x=i/(N-1)*2-1;cv[i]=Math.tanh(2.2*x)/Math.tanh(2.2);}sat.curve=cv;sat.oversample='2x';
 const cmp=AC.createDynamicsCompressor();cmp.threshold.value=-20;cmp.knee.value=8;cmp.ratio.value=4;cmp.attack.value=.004;cmp.release.value=.22;
 const master=AC.createGain();master.gain.value=.95;AN=AC.createAnalyser();AN.fftSize=1024;
 REV=AC.createConvolver();const L=Math.floor(AC.sampleRate*2.2),buf=AC.createBuffer(2,L,AC.sampleRate);for(let ch=0;ch<2;ch++){const d=buf.getChannelData(ch);let lp=0;for(let i=0;i<L;i++){lp=lp*.6+(Math.random()*2-1)*.4;d[i]=lp*Math.pow(1-i/L,2.6);}}REV.buffer=buf;
 const wet=AC.createGain();wet.gain.value=.26;REV.connect(wet);wet.connect(cmp);BUS.connect(sat);sat.connect(cmp);cmp.connect(master);master.connect(AN);AN.connect(AC.destination);return AC;}
const out=(node,pan=0,send=0)=>{const p=AC.createStereoPanner();p.pan.value=pan;node.connect(p);p.connect(BUS);if(send){const s=AC.createGain();s.gain.value=send;node.connect(s);s.connect(REV);}};
function impact(t){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(165,t);o.frequency.exponentialRampToValueAtTime(42,t+.2);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+.004);g.gain.exponentialRampToValueAtTime(.001,t+.55);o.connect(g);out(g);o.start(t);o.stop(t+.6);
 const nb=AC.createBuffer(1,Math.floor(AC.sampleRate*.06),AC.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=(Math.random()*2-1)*Math.pow(1-i/nd.length,4);const ns=AC.createBufferSource();ns.buffer=nb;const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=2600;bp.Q.value=.8;const ng=AC.createGain();ng.gain.value=.35;ns.connect(bp);bp.connect(ng);out(ng,0,.15);ns.start(t);}
function sub(t,f,dur,v=.5){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.setTargetAtTime(.0001,t+dur*.45,dur*.25);o.connect(g);out(g);o.start(t);o.stop(t+dur+.4);}
function pluck(t,f,dur,v=.3,pan=0){const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.004);g.gain.exponentialRampToValueAtTime(.0006,t+dur);
 const lp=AC.createBiquadFilter();lp.type='lowpass';lp.Q.value=2;lp.frequency.setValueAtTime(5200,t);lp.frequency.exponentialRampToValueAtTime(900,t+dur*.6);
 [['triangle',1,.8],['sawtooth',1,.35],['sine',2,.25],['sawtooth',.5,.22]].forEach(([ty,m,a])=>{const o=AC.createOscillator();o.type=ty;o.frequency.value=f*m;const og=AC.createGain();og.gain.value=a;o.connect(og);og.connect(lp);o.start(t);o.stop(t+dur+.05);});lp.connect(g);out(g,pan,.22);}
function chord(t,fs,dur,v=.075){fs.forEach((f,k)=>{[-8,0,8].forEach((ct,j)=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=f;o.detune.value=ct;const lp=AC.createBiquadFilter();lp.type='lowpass';lp.Q.value=1.2;lp.frequency.setValueAtTime(420,t);lp.frequency.exponentialRampToValueAtTime(3600,t+.32);lp.frequency.exponentialRampToValueAtTime(1300,t+dur*.8);
  const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.035);g.gain.setTargetAtTime(v*.6,t+.3,.4);g.gain.setTargetAtTime(.0001,t+dur*.55,dur*.2);o.connect(lp);lp.connect(g);out(g,(j-1)*.45*(k%2?1:-1),.3);o.start(t);o.stop(t+dur+.6);});});}
function sparkle(t,f,v=.09){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0005,t+.9);o.connect(g);out(g,(Math.random()-.5)*.8,.45);o.start(t);o.stop(t+1);}
const D2=73.42,A3=220,D4=293.66,FS4=369.99,A4=440,E5=659.25,D3=146.83;
const MOT={
 welcome:{dur:2.6,notes:[[0,'drop'],[0,A3,.5,.3],[.16,D4,.5,.3],[.36,D4,2.2,.5,'c']],play(t){impact(t);pluck(t,A3,.5,.32,-.25);pluck(t+.16,D4,.55,.32,.25);sub(t+.36,D2,2.2,.55);chord(t+.36,[D3,A3,D4,FS4,E5],2.2);pluck(t+.36,A4,1.2,.22);}},
 sent:{dur:1.3,notes:[[0,A3,.4,.28],[.14,D4,.45,.3],[.3,D4,1,.4,'c']],play(t){pluck(t,A3,.4,.28,-.2);pluck(t+.14,D4,.45,.3,.2);sub(t+.3,D2,1,.38);chord(t+.3,[D4,FS4,A4],1.0,.06);}},
 live:{dur:3.1,notes:[[0,'drop'],[0,A3,.5,.3],[.16,D4,.5,.3],[.36,D4,2.6,.5,'c'],[.95,587.33,.9,.16],[1.07,739.99,.9,.14],[1.19,880,.9,.13],[1.31,1174.66,1,.12]],play(t){impact(t);pluck(t,A3,.5,.32,-.25);pluck(t+.16,D4,.55,.32,.25);sub(t+.36,D2,2.6,.55);chord(t+.36,[D3,A3,D4,FS4,E5],2.6);pluck(t+.36,A4,1.3,.22);[587.33,739.99,880,1174.66].forEach((f,i)=>sparkle(t+.95+i*.12,f,.1-i*.012));}}};
const POS=[[-.55,-.1],[-.25,.25],[.1,-.2],[.35,.2],[0,0],[.5,.45],[-.45,.5],[.2,-.5]];
/* host: elemen yang menampung kanvas (ukuran mengikuti elemen) */
function play(id,{host,dark=false,sound=true}={}){const m=MOT[id]||MOT.sent;let g=null;
 if(host){const r=host.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),c=document.createElement('canvas');c.width=c.height=Math.max(64,Math.round(Math.max(r.width,r.height)*d));c.className='fx144';host.append(c);g=new Glass(c,dark);if(g.fail){c.remove();g=null;}else{g.draw(1.2);host.classList.add('has-fx144');}}
 if(sound){try{audio();if(AC.state==='suspended')AC.resume();m.play(AC.currentTime+.04);}catch(e){}}
 if(!g||RM())return {dur:m.dur,stop(){g&&g.free();}};
 g.hold=true;const start=performance.now()+40;let ni=0;
 const env=t=>{let a=0;m.notes.forEach(n=>{const dt=t-n[0];if(dt>=0)a+=Math.exp(-dt*3.2)*(n[1]==='drop'?.6:(n[3]||.3)*2.2);});return Math.min(1,a);};
 const tick=()=>{if(g.dead)return;const t=(performance.now()-start)/1000;
  while(ni<m.notes.length&&t>=m.notes[ni][0]){const n=m.notes[ni];const big=n[1]==='drop'||n[3]>=.38;const p=n[1]==='drop'||n[4]==='c'?[0,0]:POS[ni%POS.length];g.ripple(p[0],p[1]*.8,n[4]==='c'?1.55:big?1.2:.75);ni++;}
  let amp;if(sound&&AN){const d=new Uint8Array(AN.fftSize);AN.getByteTimeDomainData(d);let s=0;for(const v of d){const x=(v-128)/128;s+=x*x;}amp=Math.min(1,Math.sqrt(s/d.length)*2.4);}else amp=env(t)*.8;
  g.amp=amp;if(t<m.dur+.3)requestAnimationFrame(tick);else{g.amp=0;g.hold=false;g.loop();}if(!g.raf)g.loop();};
 requestAnimationFrame(tick);return {dur:m.dur,stop(){g.free();}};}
window.FX144={play};
})();
