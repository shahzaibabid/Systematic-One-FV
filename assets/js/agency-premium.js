/* GSAP-enhanced premium homepage; usable without network/CDN and on reduced motion. */
(function(){'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('.header');
const nav=()=>header?.classList.toggle('agency-scrolled',scrollY>25);
addEventListener('scroll',nav,{passive:true});nav();
if(reduce || !window.gsap || !window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
// Existing AOS and reveal observer remain for backward-compatible fallbacks.
const hero=gsap.timeline({defaults:{ease:'power3.out'}});
hero.from('.so-hero-mini',{autoAlpha:0,y:24,duration:.7})
.from('.so-eyebrow',{autoAlpha:0,y:18,duration:.55},'-=.4')
.from('.agency-line',{autoAlpha:0,y:95,rotate:2,duration:1.15,stagger:.13},'-=.36')
.from('.agency-kicker,.so-hero-dynamic,.so-lead',{autoAlpha:0,y:25,duration:.75,stagger:.09},'-=.65')
.from('.so-actions a,.so-proof',{autoAlpha:0,y:24,duration:.7,stagger:.1},'-=.5');
gsap.fromTo('.so-hero-visual',{autoAlpha:0,x:90,scale:.9},{autoAlpha:1,x:0,scale:1,duration:1.5,ease:'power3.out',delay:.25});
gsap.to('.so-hero-orbit',{rotate:90,ease:'none',scrollTrigger:{trigger:'.so-hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.agency-visual-ring',{rotation:55,ease:'none',scrollTrigger:{trigger:'.so-hero',start:'top top',end:'bottom top',scrub:1}});
gsap.to('.so-hero-copy',{y:-55,ease:'none',scrollTrigger:{trigger:'.so-hero',start:'top top',end:'bottom top',scrub:1}});
gsap.to('.so-hero-visual',{y:55,ease:'none',scrollTrigger:{trigger:'.so-hero',start:'top top',end:'bottom top',scrub:1}});
const sectionSelectors=['.stats-facts','.featured-projects','.services','.why-choose-us','.testimonial','.meet-our-team','.pricing-section','.faq','.Recent-news','.get-in-touch'];
sectionSelectors.forEach(selector=>{const el=document.querySelector(selector);if(!el)return;const heading=el.querySelector('h2');if(heading)gsap.fromTo(heading,{y:45,opacity:.3},{y:0,opacity:1,duration:1,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 89%',once:true}});});
const projects=gsap.utils.toArray('.featured-projects .portfolio');projects.forEach((el,i)=>{gsap.fromTo(el,{y:65,opacity:0},{y:0,opacity:1,duration:.95,delay:i%3*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});});
const cards=gsap.utils.toArray('.pricing-section .card,.services .card');cards.forEach((el,i)=>{gsap.fromTo(el,{y:28,opacity:.3},{y:0,opacity:1,duration:.7,delay:i%4*.05,scrollTrigger:{trigger:el,start:'top 94%',once:true}});});
const contact=document.querySelector('.agency-contact-band a');if(contact)gsap.fromTo(contact,{y:44,opacity:.4},{y:0,opacity:1,duration:1,scrollTrigger:{trigger:contact,start:'top 95%',once:true}});
if(matchMedia('(pointer:fine) and (min-width:992px)').matches){const visual=document.querySelector('.so-hero-visual');const dashboard=document.querySelector('.so-dashboard');if(visual&&dashboard){visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(dashboard,{rotationY:-9+x*7,rotationX:3-y*6,duration:.65,overwrite:'auto',ease:'power2.out'});});visual.addEventListener('pointerleave',()=>gsap.to(dashboard,{rotationY:0,rotationX:0,duration:.8,overwrite:'auto'}));}}
})();
