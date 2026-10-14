(function(){'use strict';
const root=document.getElementById('creativeServices');if(!root)return;
const items=[...root.querySelectorAll('.creative-service-item')];const visuals=[...root.querySelectorAll('.creative-visual-slide')];const counter=root.querySelector('.creative-current');let current=0;
function activate(n){if(n===current&&items[n].classList.contains('is-active'))return;current=n;items.forEach((el,i)=>{const active=i===n;el.classList.toggle('is-active',active);el.querySelector('button').setAttribute('aria-expanded',String(active));});visuals.forEach((el,i)=>el.classList.toggle('is-active',i===n));counter.innerHTML=String(n+1).padStart(2,'0')+' <small>/ 04</small>';if(window.gsap&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const target=visuals[n].querySelector('img');gsap.fromTo(target,{scale:1.12,xPercent:2},{scale:1,xPercent:0,duration:1.1,ease:'power3.out',overwrite:true});gsap.fromTo(items[n].querySelector('.creative-service-title'),{y:9,opacity:.65},{y:0,opacity:1,duration:.5,ease:'power2.out',overwrite:true});}}
items.forEach((item,i)=>item.querySelector('button').addEventListener('click',()=>activate(i)));
if(window.gsap&&window.ScrollTrigger&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){gsap.registerPlugin(ScrollTrigger);gsap.from('.creative-testimonial-header > *',{scrollTrigger:{trigger:'.creative-testimonial-header',start:'top 88%',once:true},y:35,opacity:0,stagger:.12,duration:.8,ease:'power3.out'});gsap.from('.creative-featured-quote, .creative-insight',{scrollTrigger:{trigger:'.creative-testimonial-layout',start:'top 88%',once:true},y:42,opacity:0,stagger:.12,duration:.85,ease:'power3.out'});}

const quoteWrap=document.querySelector('.creative-featured-quote');
if(quoteWrap){
 const slides=[...quoteWrap.querySelectorAll('.creative-quote-slide')];
 const prev=quoteWrap.querySelector('.creative-quote-prev');
 const next=quoteWrap.querySelector('.creative-quote-next');
 const count=quoteWrap.querySelector('.creative-quote-count');
 let qIndex=0,qTimer;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function renderQuote(n){
   qIndex=(n+slides.length)%slides.length;
   slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===qIndex));
   if(count) count.textContent=String(qIndex+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
   if(window.gsap && !reduced){
     const active=slides[qIndex];
     const quote=active.querySelector('blockquote');
     const meta=active.querySelector('.creative-quote-bottom');
     gsap.fromTo([quote,meta],{y:16,opacity:0},{y:0,opacity:1,duration:.45,stagger:.08,ease:'power2.out',overwrite:true});
   }
 }
 function startAuto(){ if(reduced || slides.length<2) return; stopAuto(); qTimer=setInterval(()=>renderQuote(qIndex+1),5000); }
 function stopAuto(){ if(qTimer){ clearInterval(qTimer); qTimer=null; } }
 prev && prev.addEventListener('click',()=>{renderQuote(qIndex-1); startAuto();});
 next && next.addEventListener('click',()=>{renderQuote(qIndex+1); startAuto();});
 quoteWrap.addEventListener('mouseenter',stopAuto);
 quoteWrap.addEventListener('mouseleave',startAuto);
 renderQuote(0); startAuto();
}
})();
