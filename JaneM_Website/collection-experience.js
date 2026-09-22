(function(){
 'use strict';
 const looks=window.JaneMLooks, key='janem-saved-looks-v1', $=id=>document.getElementById(id);
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let saved=[], filter='All';
 try {const raw=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(raw))saved=raw.filter(id=>looks.some(l=>l.id===id));}catch{}
 function persist(){try{localStorage.setItem(key,JSON.stringify(saved));return true;}catch{return false;}}
 const grid=$('collection-grid');
 function render(){
  if(!grid)return;
  const prefix=grid.dataset.prefix, visible=looks.filter(l=>filter==='All'||(filter==='Saved'?saved.includes(l.id):l.occasion===filter));
  grid.innerHTML=visible.length?visible.map((l,index)=>`<article class="edit-look"><a class="edit-look__image" href="${prefix}collection/${l.id}/"><img src="${prefix}assets/${l.image}" width="900" height="1600" alt="${esc(l.name)} by Jane.M — ${esc(l.description)}" ${index?'loading="lazy"':''}><span>${esc(l.silhouette)}</span></a><h2><a href="${prefix}collection/${l.id}/">${esc(l.name)}</a></h2><p>${esc(l.description)}</p><p class="exp-muted">${esc(l.colour)} · Made to measure</p><div class="exp-actions"><button class="exp-button" data-save-look="${l.id}" aria-pressed="${saved.includes(l.id)}">${saved.includes(l.id)?'Saved ✓':'Save look'}</button><a class="exp-button exp-button--primary" href="${prefix}booking/#${l.id}">Discuss this design ↗</a></div></article>`).join(''):'<div class="exp-empty"><strong>No saved looks yet.</strong><p>Choose All looks, then save the designs you would like to discuss.</p></div>';
 }
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));render();$('collection-status').textContent=filter==='Saved'?`${saved.length} saved ${saved.length===1?'look':'looks'}.`:filter==='All'?'Showing all three signature looks.':`Showing ${filter.toLowerCase()} inspiration.`;}));
 document.addEventListener('click',e=>{const b=e.target.closest('[data-save-look]');if(!b)return;const id=b.dataset.saveLook;if(!looks.some(l=>l.id===id))return;const existed=saved.includes(id);saved=existed?saved.filter(v=>v!==id):[...saved,id];const ok=persist();render();document.querySelectorAll(`[data-save-look="${id}"]`).forEach(t=>{t.textContent=existed?'Save look':'Saved ✓';t.setAttribute('aria-pressed',String(!existed));});const target=$('collection-status')||$('look-status');if(target)target.textContent=ok?(existed?'Look removed from your shortlist.':'Look saved on this device. Your shortlist will be available in the consultation form.'):'Browser saving is unavailable. Use Discuss this design to carry this look to your request.';window.JaneMAnalytics?.track(existed?'collection_look_unsaved':'collection_look_saved',{look_id:id});});
 render();
 document.querySelectorAll('[data-save-look]').forEach(b=>{if(saved.includes(b.dataset.saveLook)){b.textContent='Saved ✓';b.setAttribute('aria-pressed','true');}});
 const form=$('consultation-form');if(!form)return;
 window.JaneMAnalytics?.track('consultation_request_view');
 const selectedHash=window.location.hash.slice(1);
 const shortlist=$('booking-shortlist');
 shortlist.innerHTML=looks.map(l=>`<label class="exp-check"><input type="checkbox" name="look" value="${l.id}" ${saved.includes(l.id)||l.id===selectedHash?'checked':''}>${esc(l.name)}</label>`).join('');
 const date=form.elements.date;const now=new Date();date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 let message='';
 form.addEventListener('submit',e=>{
  e.preventDefault();const values=new FormData(form);const chosen=values.getAll('look').map(id=>looks.find(l=>l.id===id)?.name).filter(Boolean);
  message=['Hello Jane.M, I would like to arrange a consultation.', '', 'Occasion: '+values.get('occasion'),'Event date: '+(values.get('date')||'Still planning'),'Workmanship budget (fabric separate): '+values.get('budget'),'Looks to discuss: '+(chosen.join(', ')||'I would like guidance'),...(String(values.get('notes')).trim()?['Notes: '+String(values.get('notes')).trim()]:[]),'','Please let me know the consultation arrangements, any consultation fee and available times. I understand the design, quotation and production date need confirmation.'].join('\n');
  $('consultation-message').textContent=message;$('consultation-whatsapp').href='https://wa.me/26662790946?text='+encodeURIComponent(message);form.hidden=true;$('consultation-review').hidden=false;$('consultation-review').focus();$('booking-status').textContent='Your request is ready to review. Nothing has been sent.';window.JaneMAnalytics?.track('consultation_request_prepared');
 });
 $('consultation-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);$('booking-status').textContent='Request copied. Paste it into your conversation with Jane.M.';}catch{$('booking-status').textContent='Copy is unavailable. Select and copy the request above, or continue on WhatsApp.';}});
 $('consultation-edit').addEventListener('click',()=>{form.hidden=false;$('consultation-review').hidden=true;form.elements.occasion.focus();$('booking-status').textContent='Edit your details, then review the request again.';});
})();
