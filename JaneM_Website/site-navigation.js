/* Shared public navigation; game and Studio controls remain separate. */
(()=>{
 const header=document.querySelector('.jm-navigation'),toggle=header?.querySelector('.jm-nav-toggle'),nav=header?.querySelector('.jm-nav-links');if(!toggle||!nav)return;
 function close(focus=false){nav.classList.remove('jm-open');toggle.setAttribute('aria-expanded','false');if(focus)toggle.focus();}
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('jm-open');toggle.setAttribute('aria-expanded',String(open));});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('jm-open'))close(true);});
 document.addEventListener('click',e=>{if(!header.contains(e.target))close();});
 header.addEventListener('focusout',()=>{queueMicrotask(()=>{if(!header.contains(document.activeElement))close();});});
 window.matchMedia('(min-width: 1201px)').addEventListener?.('change',()=>close());
})();
