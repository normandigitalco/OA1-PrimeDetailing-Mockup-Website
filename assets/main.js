'use strict';

// ---------- Language (EN / ES) ----------
var LANG='en';
var META={
 en:{title:'OA Prime Detailing | Mobile Detailing in Miami, Broward & the Florida Keys',desc:'Pure luxury, perfectly detailed. OA Prime Detailing is a mobile detailing service for cars, boats, RVs and trucks in Miami-Dade, Broward and the Florida Keys. We come to you. Call or text 786-278-7877. Se habla español.'},
 es:{title:'OA Prime Detailing | Detallado móvil en Miami, Broward y los Florida Keys',desc:'Lujo puro, detallado impecable. OA Prime Detailing es un servicio de detallado móvil para carros, botes, RVs y camiones en Miami-Dade, Broward y los Florida Keys. Vamos hasta donde estés. Llama o escribe al 786-278-7877.'}
};
function applyLang(root){
 root=root||document;
 root.querySelectorAll('[data-es]').forEach(function(el){
  if(!el.hasAttribute('data-en'))el.setAttribute('data-en',el.innerHTML);
  var v=LANG==='es'?el.getAttribute('data-es'):el.getAttribute('data-en');
  if(el.innerHTML!==v)el.innerHTML=v;
 });
 root.querySelectorAll('[data-es-ph]').forEach(function(el){
  if(!el.hasAttribute('data-en-ph'))el.setAttribute('data-en-ph',el.getAttribute('placeholder')||'');
  el.setAttribute('placeholder',LANG==='es'?el.getAttribute('data-es-ph'):el.getAttribute('data-en-ph'));
 });
 root.querySelectorAll('[data-es-aria]').forEach(function(el){
  if(!el.hasAttribute('data-en-aria'))el.setAttribute('data-en-aria',el.getAttribute('aria-label')||'');
  el.setAttribute('aria-label',LANG==='es'?el.getAttribute('data-es-aria'):el.getAttribute('data-en-aria'));
 });
}
function setLang(l,save){
 LANG=(l==='es')?'es':'en';
 document.documentElement.setAttribute('lang',LANG);
 applyLang(document);
 document.querySelectorAll('.lang-t span').forEach(function(s){s.classList.toggle('on',s.getAttribute('data-l')===LANG);});
 if(save){try{localStorage.setItem('oap-lang',LANG);}catch(e){}}
}
function toggleLang(){setLang(LANG==='en'?'es':'en',true);}

// Nav scroll behavior
(function(){
 const nav=document.querySelector('nav');
 window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>40);},{passive:true});
})();

// Gallery - index n maps to img/oaprime-NN.webp
const GALLERY=[
 {n:3,alt:'White Porsche 911 with the door open in a driveway'},
 {n:1,alt:'Black Audi Q8 in a paved driveway with palm trees'},
 {n:4,alt:'Audi wheel with red brake calipers, clean and glossy'},
 {n:2,alt:'Black BMW X7 in a driveway after a detail'},
 {n:5,alt:'BMW wheel with blue calipers, cleaned'},
 {n:10,alt:'Toyota RAV4 cabin after an interior clean'},
 {n:7,alt:'Silver Jeep Compass rinsed in a parking lot'},
 {n:6,alt:'Black Toyota wheel after a detail'},
 {n:8,alt:'Grey Nissan Rogue rinsed in a parking lot'},
 {n:11,alt:'Rear seat of a Toyota RAV4, cleaned'},
 {n:12,alt:'BMW wheel on a white car, cleaned'},
 {n:9,alt:'White BMW 4 Series in a parking space',sq:true}
].map(function(g){const p='/img/oaprime-'+(g.n<10?'0':'')+g.n;g.src=p+'.webp';g.t=p+'-t.webp';return g;});

// "The details make the difference" - muted looping work clips
const CLIPS=[
 {n:1,label:'Foam Wash',cap:'Thick foam lifts road film before a mitt touches the paint.',es:'Lavado con espuma',alt:'Black Infiniti SUV covered in foam and rinsed'},
 {n:2,label:'Interior Reveal',cap:'Seats, seams and vents cleaned panel by panel.',es:'Interior renovado',alt:'A BMW i4 interior with tan leather seats after a detail'},
 {n:3,label:'Boat Polish',cap:'Machine polish brings the hull back to a clean shine.',es:'Pulido de botes',alt:'A Grady-White boat hull being machine polished'},
 {n:4,label:'Fine Detail',cap:"Brushes get into the spots a towel can't reach.",es:'Detalle fino',alt:'A Ferrari steering wheel being brushed clean'},
 {n:5,label:'Truck Scrub',cap:'Heavy-duty trucks get the full foam and scrub treatment.',es:'Lavado de camiones',alt:'A red heavy duty Ram truck being foamed and scrubbed'},
 {n:6,label:'Engine Bay',cap:'Brushed, rinsed and dressed until it looks new.',es:'Motor',alt:'An engine bay being brushed and cleaned'},
 {n:7,label:'Cabin Detail',cap:'Tight, detailed interiors cleaned by hand.',es:'Interior de superdeportivo',alt:'A Lamborghini interior with orange seats being cleaned'},
 {n:8,label:'Floor Mats',cap:'Brushed out until the carpet stands back up.',es:'Tapetes',alt:'A floor mat being brushed clean'}
];
const STAGE=[CLIPS[0],CLIPS[1],CLIPS[2],CLIPS[4]];
function buildClips(){
 const el=document.getElementById('clipsGrid');
 if(!el||el.childElementCount)return;
 el.innerHTML='<div class="cs"><div class="cs-wrap"><div class="cs-stage"><video id="csVid" muted playsinline preload="metadata"></video><div class="cs-bar"><i id="csBar"></i></div></div><p class="cs-capm" id="csCapM"></p></div><ol class="cs-list" id="csList"></ol></div>';
 const v=document.getElementById('csVid'),list=document.getElementById('csList'),bar=document.getElementById('csBar'),capm=document.getElementById('csCapM');
 let cur=0,btns=[];
 STAGE.forEach(function(c,i){
  const li=document.createElement('li'),b=document.createElement('button');
  b.type='button';b.innerHTML='<span class="cs-t"><b>'+c.label+'</b><em>'+c.cap+'</em></span>';
  b.onclick=function(){if(i===cur){b.classList.toggle('on');capm.style.visibility=b.classList.contains('on')?'visible':'hidden';return;}setClip(i,true);};
  li.appendChild(b);list.appendChild(li);btns.push(b);
 });
 function setClip(i,play){
  cur=i;v.poster='/img/oaprime-clip-'+STAGE[i].n+'-poster.webp';v.src='/img/oaprime-clip-'+STAGE[i].n+'.mp4';v.setAttribute('aria-label',STAGE[i].alt);
  bar.style.width='0%';capm.textContent=STAGE[i].cap;capm.style.visibility='visible';
  btns.forEach(function(x,k){x.classList.toggle('on',k===i);});
  
  v.load();if(play)v.play().catch(function(){needTap(v)});
 }
 v.addEventListener('timeupdate',function(){if(v.duration)bar.style.width=(v.currentTime/v.duration*100)+'%';});
 v.addEventListener('ended',function(){setClip((cur+1)%STAGE.length,true);});
 setClip(0,false);
 new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){v.play().catch(function(){needTap(v)});}else{v.pause();}});},{threshold:.4}).observe(v);
}

function buildGrid(items,el,cb){
 items.forEach(function(g,i){
  const d=document.createElement('div');
  d.className='gal-item'+(g.sq?' sq':'');
  d.onclick=function(){cb(i);};
  const img=document.createElement('img');
  img.src=g.t||g.src;img.alt=g.alt;img.loading=i<8?'eager':'lazy';img.decoding='async';if(i<4)img.fetchPriority='high';img.width=640;img.height=g.sq?640:853;img.onload=function(){img.classList.add('ld');};if(img.complete&&img.naturalWidth)img.classList.add('ld');
  const ov=document.createElement('div');ov.className='gal-ov';ov.innerHTML='<span data-es="Ver">View</span>';
  d.appendChild(img);d.appendChild(ov);el.appendChild(d);
 });
 applyLang(el);
}
let galBuilt=false;
function buildGal(){var g=document.getElementById('galGrid');if(galBuilt||!g)return;galBuilt=true;buildGrid(GALLERY,g,openLb);}

let lbCur=0;
function openLb(i){lbCur=i;document.getElementById('lbImg').src=GALLERY[i].src;document.getElementById('lbImg').alt=GALLERY[i].alt;document.getElementById('lb').classList.add('open');document.body.style.overflow='hidden';}
function closeLb(){document.getElementById('lb').classList.remove('open');document.getElementById('lbImg').removeAttribute('src');document.body.style.overflow='';}
function moveLb(d){lbCur=(lbCur+d+GALLERY.length)%GALLERY.length;document.getElementById('lbImg').src=GALLERY[lbCur].src;document.getElementById('lbImg').alt=GALLERY[lbCur].alt;}
var _lb=document.getElementById('lb');if(_lb)_lb.addEventListener('click',function(e){if(e.target===e.currentTarget)closeLb();});
document.addEventListener('keydown',function(e){
 if(!_lb||!_lb.classList.contains('open'))return;
 if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')moveLb(-1);if(e.key==='ArrowRight')moveLb(1);
});

const PAGES=['home','services','about','gallery','contact'];
const URLS={home:'/',services:'/services/',about:'/about/',gallery:'/gallery/',contact:'/contact/'};
const _cur=document.body.getAttribute('data-page')||'home';
// Multi-page: each page is its own HTML file. showPage just navigates.
function showPage(id,_fromPop,anchor){
 if(!URLS[id])id='home';
 if(typeof closeMenu==='function')closeMenu();
 if(id===_cur&&!anchor){window.scrollTo(0,0);return;}
 if(id===_cur&&anchor){var t=document.getElementById(anchor);if(t){t.scrollIntoView({block:'start'});return;}}
 location.href=URLS[id]+(anchor?'#'+anchor:'');
}
function toggleMenu(){
 var mob=document.getElementById('mob'),ham=document.getElementById('ham'),nav=document.querySelector('nav');
 if(mob.classList.contains('closing'))return;
 if(mob.classList.contains('open')){
  mob.classList.add('closing');ham.classList.remove('open');nav.classList.remove('menu-open');document.body.style.overflow='';
  setTimeout(function(){mob.classList.remove('open','closing');},240);
 }else{
  mob.classList.add('open');ham.classList.add('open');nav.classList.add('menu-open');document.body.style.overflow='hidden';
 }
}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.getElementById('mob').classList.contains('open'))toggleMenu();});
function closeMenu(){if(document.getElementById('mob').classList.contains('open'))toggleMenu();}
window.addEventListener('pageshow',closeMenu);window.addEventListener('resize',function(){if(window.innerWidth>880)closeMenu();});
function mnav(id){showPage(id);closeMenu();}
function goHome(){if(document.getElementById('mob').classList.contains('open'))toggleMenu();showPage('home');}

function selectSvc(id){
 var on=document.querySelector('.sx-btn.on'),same=on&&on.getAttribute('data-for')===id;
 document.querySelectorAll('.sx-btn.on,.sx-panel.on').forEach(function(x){x.classList.remove('on');});
 var isMobile=window.matchMedia('(max-width:880px)').matches;
 if(same&&isMobile){return;}
 var b=document.querySelector('.sx-btn[data-for="'+id+'"]'),p=document.getElementById('p-'+id);
 if(b)b.classList.add('on');if(p)p.classList.add('on');
 if(isMobile&&b){setTimeout(function(){var y=b.getBoundingClientRect().top+window.scrollY-110;window.scrollTo({top:y,behavior:'smooth'});},60);}
}
function openSvc(id){showPage('services',false,'svc-'+id);}
function luScroll(d){var t=document.getElementById('luTrack');if(t)t.scrollBy({left:d*350,behavior:'smooth'});}
function toggleSvc(id){
 const card=document.getElementById(id);
 const isOpen=card.classList.contains('open');
 document.querySelectorAll('.svc-card.open').forEach(function(c){c.classList.remove('open');});
 if(!isOpen)card.classList.add('open');
}
function toggleFaq(id){
 const item=document.getElementById(id);
 const isOpen=item.classList.contains('open');
 document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');});
 if(!isOpen)item.classList.add('open');
}

// Tap-to-play fallback: Low Power Mode and some data-saver browsers block muted autoplay. The poster image stays as the fallback and a play button appears.
function needTap(v){
 var p=v.id==='heroVid'?document.querySelector('.hero'):v.parentElement;
 if(!p||p.querySelector(':scope>.tap-play'))return;
 var b=document.createElement('button');b.type='button';b.className='tap-play'+(v.id==='heroVid'?' tap-hero':'');b.setAttribute('aria-label','Play video');
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
 b.addEventListener('click',function(e){e.stopPropagation();v.muted=true;v.play().then(function(){b.remove();}).catch(function(){});});
 v.addEventListener('playing',function(){if(b.parentNode)b.remove();},{once:true});
 p.appendChild(b);
}
// Shared muted-video autoplay/pause-on-scroll controller - hero video + every clip
var _bgVideos=[];
var _bgIO=('IntersectionObserver' in window)?new IntersectionObserver(function(entries){
 entries.forEach(function(e){if(e.isIntersecting)playVisible(e.target);else e.target.pause();});
},{threshold:0.15}):null;
function playVisible(v){if(v.offsetParent!==null)v.play().catch(function(){needTap(v)});}
function registerBgVideo(v){
 _bgVideos.push(v);
 // if the first play() was blocked or came too early, try again as soon as the browser has data
 ['loadeddata','canplay'].forEach(function(t){v.addEventListener(t,function(){if(v.paused&&document.visibilityState==='visible')playVisible(v);});});
 if(_bgIO)_bgIO.observe(v);else playVisible(v);
}
(function(){
 const vids=[document.getElementById('heroVid'),document.getElementById('aboutVid')].filter(Boolean);
 vids.forEach(function(v){registerBgVideo(v);playVisible(v);});
 let _ul=false;
 function _unlock(){if(_ul)return;_ul=true;setTimeout(function(){_bgVideos.forEach(playVisible);},450);}
 ['touchend','click','keydown'].forEach(function(t){document.addEventListener(t,_unlock,{passive:true,once:true});});
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')_bgVideos.forEach(function(v){if(v.offsetParent!==null)playVisible(v);});});
 window.addEventListener('pageshow',function(e){if(e.persisted)_bgVideos.forEach(function(v){if(v.offsetParent!==null)playVisible(v);});});
})();
// Hero: one full-bleed portrait clip on every screen size
(function(){
 var v=document.getElementById('heroVid');
 if(!v)return;
 var src='/img/oaprime-hero-v4.mp4';
 if(v.getAttribute('data-src')!==src){v.setAttribute('data-src',src);v.poster='/img/oaprime-hero-v4-poster.webp';v.src=src;v.load();}
 playVisible(v);
})();
buildClips();
buildReel();
document.querySelectorAll('.fs-card video').forEach(function(v){registerBgVideo(v);});
(function(){var els=document.querySelectorAll('[data-count]');if(!('IntersectionObserver' in window)){return;}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,t=parseFloat(el.getAttribute('data-count')),d=parseInt(el.getAttribute('data-dec')||'0',10),s=null;if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){return;}function step(ts){if(s===null)s=ts;var p=Math.min((ts-s)/1100,1),v=t*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d);if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);});},{threshold:.6});els.forEach(function(el){io.observe(el);});})();

// Language: English only for now. Spanish strings and setLang() are kept so a toggle can be switched back on later.
setLang('en',false);

// Page start: nav highlight, gallery, and a one-time correction when arriving on an anchor
(function(){
 document.querySelectorAll('.nav-links a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-nav')===_cur);});
 document.querySelectorAll('.mob-links a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-m')===_cur);});
 if(_cur==='gallery')buildGal();
 // Arriving from a service link: the browser scrolls to the card natively; just open it
 var h=location.hash.replace('#','');
 if(/^svc-s\d$/.test(h)){var _c=document.getElementById(h);if(_c)_c.classList.add('open');}
})();

function handleForm(e){
 e.preventDefault();
 const form=e.target,btn=form.querySelector('.f-submit');
 const sending=LANG==='es'?'Enviando...':'Sending...',sent=LANG==='es'?'Enviado':'Sent',err=LANG==='es'?'Error - Intenta de nuevo':'Error - Try Again';
 btn.textContent=sending;btn.disabled=true;
 fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
 .then(function(r){if(r.ok){form.reset();form.querySelector('.f-ok').style.display='block';btn.textContent=sent;}else{btn.textContent=err;btn.disabled=false;}})
 .catch(function(){btn.textContent=err;btn.disabled=false;});
}

// Before/after slider (single real pair) with a one-time nudge so people know to drag
(function(){
 var el=document.getElementById('baSlider');
 if(!el)return;
 var after=document.getElementById('baAfter'),handle=document.getElementById('baHandle'),dragging=false,cur=50,touched=false,hinted=false;
 function setPct(pct){
  pct=Math.max(0,Math.min(100,pct));cur=pct;
  after.style.clipPath='inset(0 0 0 '+pct+'%)';
  handle.style.left=pct+'%';
  el.setAttribute('aria-valuenow',Math.round(pct));
 }
 // Relative drag only: a tap never jumps the divider, and a vertical scroll that starts on the photo never moves it
 var sx=0,sy=0,startPct=50,armed=false;
 function begin(x,y){touched=true;sx=x;sy=y;startPct=cur;armed=true;dragging=false;}
 function track(x,y){
  if(!armed)return;
  var dx=x-sx,dy=y-sy;
  if(!dragging){
   if(Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)){armed=false;return;}
   if(Math.abs(dx)>6&&Math.abs(dx)>=Math.abs(dy))dragging=true;else return;
  }
  var w=el.getBoundingClientRect().width;
  setPct(startPct+(dx/w)*100);
 }
 function end(){armed=false;dragging=false;}
 el.addEventListener('mousedown',function(e){begin(e.clientX,e.clientY);e.preventDefault();});
 window.addEventListener('mousemove',function(e){track(e.clientX,e.clientY);});
 window.addEventListener('mouseup',end);
 el.addEventListener('touchstart',function(e){begin(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
 el.addEventListener('touchmove',function(e){track(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
 el.addEventListener('touchend',end);
 el.addEventListener('touchcancel',end);
 el.addEventListener('keydown',function(e){
  touched=true;
  if(e.key==='ArrowLeft'){setPct(cur-5);e.preventDefault();}
  if(e.key==='ArrowRight'){setPct(cur+5);e.preventDefault();}
 });
 setPct(50);
 // nudge: 50 -> 34 -> 66 -> 50 once, the first time the slider is mostly on screen
 function nudge(){
  if(hinted||touched||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  hinted=true;
  var keys=[[0,50],[450,34],[1150,66],[1650,50]],t0=null;
  function ease(a,b,t){t=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;return a+(b-a)*t;}
  function step(ts){
   if(touched)return;
   if(t0===null)t0=ts;
   var t=ts-t0,i=1;
   while(i<keys.length-1&&t>keys[i][0])i++;
   var a=keys[i-1],b=keys[i],p=Math.min(1,Math.max(0,(t-a[0])/(b[0]-a[0])));
   setPct(ease(a[1],b[1],p));
   if(t<keys[keys.length-1][0])requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
 }
 if('IntersectionObserver' in window){
  var hio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){nudge();hio.disconnect();}});},{threshold:0.6});
  hio.observe(el);
 }
})();

// Scroll reveal
(function(){
 if(!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});return;}
 var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
 },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
 document.querySelectorAll('.page:not(#home) .sec-h,.page:not(#home) .about-row-h').forEach(function(el){el.classList.add('reveal');});
 function observe(){document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){io.observe(el);});}
 observe();
 var _origShow=window.showPage;
 window.showPage=function(){_origShow.apply(this,arguments);setTimeout(observe,50);};
})();
function rvScroll(btn,d){
 var g=btn.parentNode.querySelector('.rv-grid');var c=g.querySelector('.rv-card');if(!g||!c)return;
 var max=g.scrollWidth-g.clientWidth;if(max<=4)return;
 var step=c.offsetWidth+14,x=g.scrollLeft,t;
 // loop: past the last card goes back to the first, before the first goes to the last
 if(d>0&&x>=max-6)t=0;else if(d<0&&x<=24)t=max;else t=Math.max(0,Math.min(max,(Math.round(x/step)+d)*step));
 g.scrollTo({left:t,behavior:'smooth'});
}

function toggleSc(id){document.getElementById(id).classList.toggle('open');}

function buildReel(){
 const t=document.getElementById('reelTrack');
 if(!t||t.childElementCount)return;
 const _vis=new Set();
 const io=new IntersectionObserver(function(es){es.forEach(function(e){const v=e.target.querySelector('video');if(e.isIntersecting){_vis.add(v);v.play().catch(function(){});}else{_vis.delete(v);v.pause();}});},{threshold:.15});
 // retry: any visible reel video that is not moving gets nudged every 1.5s, so none stay on a still picture
 setInterval(function(){_vis.forEach(function(v){if(v.paused&&!v.ended&&document.visibilityState==='visible')v.play().catch(function(){});});},1500);
 for(let r=0;r<2;r++){
  CLIPS.forEach(function(c){
   const d=document.createElement('div');d.className='reel-card';
   if(r)d.setAttribute('aria-hidden','true');
   const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload='metadata';
   v.poster='/img/oaprime-clip-'+c.n+'-poster.webp';if(!r)v.setAttribute('aria-label',c.alt);
   v.src='/img/oaprime-clip-'+c.n+'.mp4';
   const s=document.createElement('span');s.textContent=c.label;
   d.appendChild(v);d.appendChild(s);t.appendChild(d);io.observe(d);
  });
 }
}
