
(function(){
  var d=document, L=d.documentElement.lang;
  try{localStorage.setItem('lang',L)}catch(e){}
  var burger=d.querySelector('.burger'), nav=d.querySelector('.nav');
  if(burger){burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
    nav.addEventListener('click',function(ev){if(ev.target.tagName==='A'){nav.classList.remove('open');burger.setAttribute('aria-expanded',false)}})}
  // reveal (with a timed fallback so nothing stays hidden in browsers that never fire the observer)
  setTimeout(function(){d.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})},1500);
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
    d.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else{d.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}
  // scroll spy
  var links=[].slice.call(d.querySelectorAll('.nav a[href^="#"]')), secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))}).filter(Boolean);
  function spy(){var y=window.scrollY+120, cur=null;secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});links.forEach(function(a){if(a.getAttribute('href')==='#'+cur)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
  window.addEventListener('scroll',spy,{passive:true});spy();
  // sticky bar hides over the form and footer
  var bar=d.querySelector('.bar'), form=d.getElementById('contact');
  if(bar&&form&&'IntersectionObserver' in window){new IntersectionObserver(function(es){es.forEach(function(x){bar.classList.toggle('hide',x.isIntersecting)})},{threshold:.05}).observe(form)}
  // lightbox
  var lb=d.querySelector('.lb'), lbImg=lb.querySelector('img'), lbCap=lb.querySelector('.cap'), items=[].slice.call(d.querySelectorAll('.gal button')), idx=0;
  function show(i){idx=(i+items.length)%items.length;var b=items[idx];lbImg.src=b.getAttribute('data-full');lbImg.alt=b.getAttribute('data-cap');lbCap.textContent=b.getAttribute('data-cap')}
  function open(i){show(i);lb.classList.add('open');d.body.style.overflow='hidden';lb.querySelector('.x').focus()}
  function close(){lb.classList.remove('open');d.body.style.overflow='';items[idx].focus()}
  items.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
  lb.querySelector('.x').addEventListener('click',close);lb.querySelector('.p').addEventListener('click',function(){show(idx-1)});lb.querySelector('.n').addEventListener('click',function(){show(idx+1)});
  lb.addEventListener('click',function(ev){if(ev.target===lb)close()});
  d.addEventListener('keydown',function(ev){if(!lb.classList.contains('open'))return;if(ev.key==='Escape')close();if(ev.key==='ArrowRight')show(idx+1);if(ev.key==='ArrowLeft')show(idx-1)});
  var sx=null;lb.addEventListener('touchstart',function(ev){sx=ev.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(ev){if(sx===null)return;var dx=ev.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)show(idx+(dx<0?1:-1));sx=null});
  // form
  var f=d.getElementById('lead'), ok=d.querySelector('.ok'), err=d.querySelector('.err'), waBtn=d.getElementById('wa-form'), endpoint=f.getAttribute('data-endpoint'), waNum=f.getAttribute('data-wa');
  function val(n){var el=f.elements[n];return el?(el.value||'').trim():''}
  function compose(){var T=window.__T;var lines=[T.prefill,'',T.name+': '+val('name'),T.phone+': '+val('phone'),T.email+': '+val('email'),T.country+': '+val('country'),T.nat+': '+val('nationality'),T.budget+': '+val('budget'),T.time+': '+val('timeline'),T.cbi+': '+val('citizenship'),T.who+': '+val('buying_as'),T.pay+': '+val('payment')];
    if(val('message'))lines.push(T.msg+': '+val('message'));return 'https://wa.me/'+waNum+'?text='+encodeURIComponent(lines.join('\n'))}
  waBtn.addEventListener('click',function(){window.open(compose(),'_blank','noopener')});
  f.addEventListener('submit',function(ev){ev.preventDefault();if(!f.reportValidity())return;err.classList.remove('show');
    if(!endpoint){window.open(compose(),'_blank','noopener');ok.classList.add('show');f.reset();return}
    var btn=f.querySelector('button[type=submit]'), t=btn.textContent;btn.textContent=window.__T.sending;btn.disabled=true;
    var data={};[].slice.call(f.elements).forEach(function(el){if(el.name)data[el.name]=el.value});data._subject='Obour villa lead: '+val('name')+' / '+val('budget');data.page=location.href;
    fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)}).then(function(r){if(!r.ok)throw 0;ok.classList.add('show');f.reset();ok.scrollIntoView({behavior:'smooth',block:'center'})}).catch(function(){err.classList.add('show')}).finally(function(){btn.textContent=t;btn.disabled=false})});
})();
