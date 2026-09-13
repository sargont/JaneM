(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const tabs=[...document.querySelectorAll('[data-studio-view]')];
 const panels=[...document.querySelectorAll('[data-studio-panel]')];
 function setView(id,{focus=false,historyEntry=true}={}){
   if(!tabs.some(t=>t.dataset.studioView===id))id='today';
   tabs.forEach(t=>{const selected=t.dataset.studioView===id;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
   panels.forEach(p=>p.hidden=p.dataset.studioPanel!==id);
   if(historyEntry&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
   if(focus){const panel=panels.find(p=>p.dataset.studioPanel===id);const heading=panel?.querySelector('h2');heading?.focus({preventScroll:true});document.querySelector('.studio-app-tabs').scrollIntoView({block:'start',behavior:'auto'});}
 }
 if(tabs.length){
   tabs.forEach((tab,index)=>{
     tab.addEventListener('click',()=>setView(tab.dataset.studioView));
     tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next===undefined)return;e.preventDefault();tabs[next].focus();setView(tabs[next].dataset.studioView);});
   });
   document.addEventListener('click',e=>{const trigger=e.target.closest('[data-open-view]');if(trigger){setView(trigger.dataset.openView,{focus:true});}});
   window.addEventListener('janem:studio-view',e=>setView(e.detail,{focus:true}));
   window.addEventListener('popstate',()=>setView(location.hash.slice(1),{historyEntry:false}));
   window.addEventListener('hashchange',()=>setView(location.hash.slice(1),{historyEntry:false}));
   setView(location.hash.slice(1),{historyEntry:false});
   const category=$('wardrobe-form').elements.category;
   function updateFlags(){const f=$('wardrobe-form');for(const name of ['flat','coverage','warm']){const input=f.elements[name];const relevant=name==='flat'?category.value==='Shoes':name==='coverage'?['Top','Dress'].includes(category.value):['Top','Bottom','Dress','Layer'].includes(category.value);input.disabled=!relevant;input.closest('label').hidden=!relevant;}}
   category.addEventListener('change',updateFlags);updateFlags();
 }
 const choose=$('studio-choose'),workspace=$('occasion-workspace');
 if(choose&&workspace){
   function occasionRoute(){const open=['occasion','quick-match'].includes(location.hash.slice(1));choose.hidden=open;workspace.hidden=!open;if(!open)$('choose-title')?.focus({preventScroll:true});}
   $('start-occasion').addEventListener('click',()=>{history.pushState(null,'','#occasion');occasionRoute();workspace.querySelector('.studio-step:not([hidden]) input')?.focus({preventScroll:true});workspace.scrollIntoView({block:'start',behavior:'auto'});});
   if(document.querySelector('#quickForm input:checked'))$('occasion-entry-label').textContent='Continue my direction →';
   $('choose-title').tabIndex=-1;
   window.addEventListener('hashchange',occasionRoute);window.addEventListener('popstate',occasionRoute);occasionRoute();
 }
})();
