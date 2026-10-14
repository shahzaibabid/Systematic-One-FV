/* Extra premium GSAP motion. Layout and content intentionally unchanged. */
(()=>{'use strict';
 if(!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const gsap=window.gsap, ST=window.ScrollTrigger;
 gsap.registerPlugin(ST);
 const mm=gsap.matchMedia();
 // Keep animations scoped so existing AOS entrance transforms are not overwritten.
 const reveal=(nodes,vars={})=>{
  gsap.utils.toArray(nodes).forEach((el,i)=>{
   gsap.fromTo(el,{autoAlpha:0,y:vars.y??26,scale:vars.scale??1},{autoAlpha:1,y:0,scale:1,duration:vars.duration??.85,ease:'power3.out',delay:(i%(vars.group??3))*.075,overwrite:'auto',scrollTrigger:{trigger:el,start:vars.start??'top 93%',once:true}});
  });
 };
 // Animated editorial dividers: scale just the line, not the section itself.
 gsap.utils.toArray('.so-section-divider span, .agency-section-count i').forEach(el=>{
   gsap.fromTo(el,{scaleX:0,transformOrigin:'left center'},{scaleX:1,duration:1.15,ease:'power3.inOut',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
 });
 // Image reveals with subtle zoom-out, preserved image sizing and responsive crop.
 gsap.utils.toArray('.featured-projects .portfolio-img').forEach((frame,i)=>{
  const image=frame.querySelector('img');
  gsap.fromTo(frame,{clipPath:'inset(0 0 100% 0 round 10px)'},{clipPath:'inset(0 0 0% 0 round 10px)',duration:1.05,ease:'power3.inOut',delay:(i%3)*.11,scrollTrigger:{trigger:frame,start:'top 90%',once:true}});
  if(image)gsap.fromTo(image,{scale:1.1},{scale:1,duration:1.3,ease:'power2.out',delay:(i%3)*.11,scrollTrigger:{trigger:frame,start:'top 90%',once:true}});
 });
 // FAQ items reveal in sequence. They remain fully functional Bootstrap accordions.
 reveal('.faq .accordion-item',{y:20,duration:.72,group:4});
 // Contact form fields and latest news columns enter in a light cascade.
 reveal('.get-in-touch .form-control',{y:18,duration:.65,group:4});
 // Restrict heavier scroll-linked motion to desktop.
 mm.add('(min-width: 992px) and (pointer: fine)',()=>{
  gsap.utils.toArray('.featured-projects .portfolio-img img').forEach(img=>{
   gsap.to(img,{yPercent:-5,ease:'none',scrollTrigger:{trigger:img.closest('.portfolio')||img,start:'top bottom',end:'bottom top',scrub:1.4}});
  });
  // Gentle decorative drift, with no changes to the parent section geometry.
  gsap.utils.toArray('.stats-facts img[src*="stats-facts-bg"]').forEach(img=>{
   gsap.fromTo(img,{y:-16,rotation:-4},{y:22,rotation:3,ease:'none',scrollTrigger:{trigger:'.stats-facts',start:'top bottom',end:'bottom top',scrub:1.5}});
  });
  // Tactile magnetic movement for primary calls-to-action, pointer only.
  gsap.utils.toArray('.so-actions a, .agency-contact-band a').forEach(button=>{
   const move=e=>{const r=button.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/r.width,dy=(e.clientY-(r.top+r.height/2))/r.height;gsap.to(button,{x:dx*10,y:dy*7,duration:.4,ease:'power3.out',overwrite:'auto'});};
   const reset=()=>gsap.to(button,{x:0,y:0,duration:.65,ease:'elastic.out(1,.5)',overwrite:'auto'});
   button.addEventListener('pointermove',move);button.addEventListener('pointerleave',reset);
  });
  return ()=>{};
 });
 // Draw a subtle line as each new section arrives.
 gsap.utils.toArray('.page-wrapper > section').forEach(section=>{
   const badge=section.querySelector('.badge');
   if(badge)gsap.fromTo(badge,{filter:'brightness(.88)'},{filter:'brightness(1)',duration:.8,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 80%',once:true}});
 });
 ST.refresh();
})();
