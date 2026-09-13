(function(){
 'use strict';
 const D=window.JaneMDaily, key='janem-daily-studio-v1', $=id=>document.getElementById(id);
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let state=D.normalise(), turn=0, current=[], storageOk=true, undoItem=null;
 try { state=D.normalise(JSON.parse(localStorage.getItem(key)||'{}')); } catch { storageOk=false; }
 const form=$('daily-form');
 function status(message,id='daily-status'){ $(id).textContent=message; }
 function persist(){
   try {localStorage.setItem(key,JSON.stringify(state)); storageOk=true;return true;}
   catch {storageOk=false;status('This browser cannot save right now. Your changes work for this visit; download a backup to keep them.');status('Saving is unavailable. Download a backup below to keep your changes.','data-status');return false;}
 }
 function event(name){window.JaneMAnalytics?.track(name);}
 function setPreferences(p){Object.entries(D.preferences(p)).forEach(([k,v])=>{if(form.elements[k])form.elements[k].value=v;});}
 function getPreferences(){return D.preferences(Object.fromEntries(new FormData(form)));}
 function paintAnchor(){const selected=form.elements.anchor.value; $('anchor-piece').innerHTML='<option value="">Surprise me</option>'+state.wardrobe.filter(i=>i.available).map(i=>`<option value="${esc(i.id)}">${esc(i.name)}</option>`).join('');if(state.wardrobe.some(i=>i.id===selected&&i.available))form.elements.anchor.value=selected;}
 function remember(){if($('remember-preferences').checked){state.preferences=getPreferences();persist();}else if(state.preferences){state.preferences=null;persist();}}
 function itemMarkup(i){return `<li><span class="outfit-swatch" style="--swatch:${D.colours[i.colour]}" aria-hidden="true"></span><span><strong>${esc(i.name)}</strong><small>${esc(i.colour)} · ${i.owned?'From your wardrobe':'Suggestion · add if you own it'}</small></span></li>`;}
 function renderResults(){
   const p=getPreferences();
   current=D.generate(p,state.wardrobe,state.history,turn);
   const selected=state.wardrobe.find(i=>i.id===p.anchor);
   const omitted=selected&&!current.some(o=>o.items.some(i=>i.id===selected.id));
   $('daily-context').textContent=`${p.occasion} · ${p.mood} · ${p.weather} weather${omitted?' — Your selected piece conflicts with your comfort settings. Choose another piece or adjust your preferences.':state.wardrobe.length?' — Owned pieces are labelled below.':' — These are starting ideas. Add your own pieces below to make the combinations yours.'}`;
   $('daily-outfits').innerHTML=current.map((o,index)=>`<article class="outfit-card"><div class="outfit-card__heading"><span class="outfit-number">0${index+1}</span><div><p class="eyebrow">${esc(o.occasion)} · ${esc(p.mood)}</p><h3>${esc(o.title)}</h3></div></div><ul class="outfit-pieces">${o.items.map(itemMarkup).join('')}</ul><p class="outfit-reason">${esc(o.reason)}</p><div class="exp-actions"><button class="exp-button exp-button--primary" data-save-outfit="${index}">${state.saved.some(s=>s.id===o.id)?'Saved to my outfits ✓':'Save this outfit'}</button><button class="exp-button" data-wore-outfit="${index}">I wore this today</button></div></article>`).join('');
 }
 function renderWardrobe(){
   $('wardrobe-count').textContent=`${state.wardrobe.length} ${state.wardrobe.length===1?'piece':'pieces'}`;
   $('wardrobe-list').innerHTML=state.wardrobe.length?state.wardrobe.map(i=>`<article class="wardrobe-piece"><span class="outfit-swatch" style="--swatch:${D.colours[i.colour]}" aria-hidden="true"></span><div><strong>${esc(i.name)}</strong><p>${esc(i.category)} · ${esc(i.colour)}${i.flat?' · Flat shoes':''}${i.coverage?' · More coverage':''}${i.warm?' · Warm fabric':''}</p></div><div class="wardrobe-piece__actions"><button class="exp-button" data-available="${esc(i.id)}" aria-pressed="${!i.available}" aria-label="${i.available?'Mark unavailable':'Make available'}: ${esc(i.name)}">${i.available?'Available':'In the laundry'}</button><button class="exp-button" data-remove-piece="${esc(i.id)}" aria-label="Remove ${esc(i.name)}">Remove</button></div></article>`).join(''):'<div class="exp-empty"><strong>Begin with what you love wearing.</strong><p>Even a few pieces are enough to start making new combinations.</p></div>';
   paintAnchor();
 }
 function renderSaved(){
   const min=D.dateKey();const maxDate=new Date();maxDate.setDate(maxDate.getDate()+6);const max=D.dateKey(maxDate);
   $('saved-outfits').innerHTML=state.saved.length?state.saved.map((o,index)=>`<article class="saved-outfit exp-panel"><div class="saved-swatches" aria-hidden="true">${o.items.map(i=>`<span style="background:${D.colours[i.colour]}"></span>`).join('')}</div><h3>${esc(o.title)}</h3><p>${o.items.map(i=>esc(i.name)).join(' + ')}</p><form data-plan="${index}" class="plan-form"><label class="exp-field">Wear it on<input type="date" name="date" min="${min}" max="${max}" value="${min}" required></label><button class="exp-button exp-button--primary" type="submit">Plan outfit</button></form><button class="text-button" data-unsave="${index}">Remove saved outfit</button></article>`).join(''):'<div class="exp-empty"><strong>Your favourites belong here.</strong><p>Save a combination you’d like to wear again.</p></div>';
 }
 function renderPlanner(){
   $('week-planner').innerHTML=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i);const date=D.dateKey(d);const plan=state.plans.find(p=>p.date===date);return `<article class="plan-day"><p class="eyebrow">${i===0?'Today':d.toLocaleDateString('en-GB',{weekday:'short'})}</p><time datetime="${date}">${d.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</time>${plan?`<p>${plan.items.map(item=>esc(item.name)).join(' + ')}</p><button class="text-button" data-unplan="${date}" aria-label="Clear outfit for ${date}">Clear plan</button>`:'<p class="exp-muted">Open for inspiration</p>'}</article>`}).join('');
   $('wear-history').innerHTML=state.history.length?state.history.slice(0,14).map(o=>`<p><strong>${esc(o.date)}</strong> · ${o.items.map(i=>esc(i.name)).join(' + ')}</p>`).join(''):'<p>No outfits recorded yet. Choose “I wore this today” on a combination.</p>';
 }
 function refreshAll(){renderWardrobe();renderResults();renderSaved();renderPlanner();}
 form.addEventListener('submit',e=>{e.preventDefault();turn=0;remember();renderResults();status('Your combinations are ready. Save a favourite or try a different pairing.');event('daily_outfits_generated');if(matchMedia('(max-width:760px)').matches)$('daily-results-title').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});});
 $('remember-preferences').addEventListener('change',()=>{remember();status($('remember-preferences').checked&&storageOk?'Preferences saved on this device.':!$('remember-preferences').checked?'Your preferences will not be remembered.':'Preferences are available for this visit only.');});
 $('refresh-outfits').addEventListener('click',()=>{turn++;renderResults();status(state.wardrobe.length?'Your combinations have been refreshed. Add more available pieces for more variety.':'Add wardrobe pieces to unlock more combinations.');});
 $('wardrobe-form').addEventListener('submit',e=>{
   e.preventDefault();const f=e.target,v=Object.fromEntries(new FormData(f));
   if(!String(v.name).trim()){f.elements.name.setCustomValidity('Please enter a piece name.');f.elements.name.reportValidity();return;}
   if(state.wardrobe.length>=100){status('Your wardrobe holds up to 100 pieces. Remove an unused piece to add another.','wardrobe-status');return;}
   const item=D.wardrobeItem({...v,id:'w-'+crypto.randomUUID(),coverage:v.coverage?'More coverage':'Balanced',flat:!!v.flat,warm:!!v.warm});
   state.wardrobe.push(item);const saved=persist();f.reset();refreshAll();status(saved?`${item.name} added to your wardrobe on this device.`:'Piece added for this visit. Download a backup to keep it.','wardrobe-status');event('wardrobe_piece_added');
 });
 $('wardrobe-form').elements.name.addEventListener('input',e=>e.target.setCustomValidity(''));
 document.addEventListener('click',e=>{
   const b=e.target.closest('button');if(!b)return;
   if(b.dataset.saveOutfit!==undefined){const o=current[Number(b.dataset.saveOutfit)];if(!state.saved.some(s=>s.id===o.id)){if(state.saved.length>=40){status('You can keep 40 outfits. Remove one saved outfit to make space.');return;}state.saved.unshift({...o});const ok=persist();renderSaved();renderResults();status(ok?'Outfit saved.':'Outfit saved for this visit.');$('daily-status').insertAdjacentHTML('beforeend',' <button type="button" class="text-button" data-open-view="saved">Plan this outfit →</button>');event('daily_outfit_saved');}else status('This outfit is already in My saved outfits.');}
   if(b.dataset.woreOutfit!==undefined){const o=current[Number(b.dataset.woreOutfit)];const date=D.dateKey();state.history=[{...o,date},...state.history.filter(h=>!(h.date===date&&h.id===o.id))].slice(0,90);const ok=persist();renderPlanner();status(ok?'Recorded for today. Future combinations will favour other pieces when available.':'Recorded for this visit. Download a backup to keep your history.');event('daily_outfit_worn');}
   if(b.dataset.removePiece){const id=b.dataset.removePiece;undoItem=state.wardrobe.find(i=>i.id===id);state.wardrobe=state.wardrobe.filter(i=>i.id!==id);persist();refreshAll();$('wardrobe-status').innerHTML='Piece removed. <button class="text-button" id="undo-piece">Undo</button>';}
   if(b.id==='undo-piece'&&undoItem){state.wardrobe.push(undoItem);undoItem=null;persist();refreshAll();status('Piece restored.','wardrobe-status');}
   if(b.dataset.available){const item=state.wardrobe.find(i=>i.id===b.dataset.available);item.available=!item.available;persist();refreshAll();status(item.available?'Piece is available for new combinations.':'Piece is excluded from new combinations while in the laundry.','wardrobe-status');}
   if(b.dataset.unsave!==undefined){state.saved.splice(Number(b.dataset.unsave),1);persist();renderSaved();status('Saved outfit removed. Any existing weekly plan is kept.');}
   if(b.dataset.unplan){state.plans=state.plans.filter(p=>p.date!==b.dataset.unplan);persist();renderPlanner();status('Plan cleared.');}
 });
 $('saved-outfits').addEventListener('submit',e=>{const f=e.target;if(f.dataset.plan===undefined)return;e.preventDefault();const date=f.elements.date.value;const o=state.saved[Number(f.dataset.plan)];state.plans=[{...o,date},...state.plans.filter(p=>p.date!==date)].slice(0,35);const ok=persist();renderPlanner();status(ok?'Outfit planned. Your seven-day planner is updated.':'Outfit planned for this visit. Download a backup to keep it.');event('daily_outfit_planned');window.dispatchEvent(new CustomEvent('janem:studio-view',{detail:'week'}));});
 $('export-daily').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='janem-my-wardrobe-'+D.dateKey()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Backup downloaded. Keep it somewhere private.','data-status');});
 $('import-daily').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>500000)throw Error();const raw=JSON.parse(await file.text());if(raw.version!==1||!Array.isArray(raw.wardrobe)||!Array.isArray(raw.saved))throw Error();const backup=D.normalise(raw);state.wardrobe=[...state.wardrobe,...backup.wardrobe.filter(i=>!state.wardrobe.some(w=>w.id===i.id))].slice(0,100);state.saved=[...state.saved,...backup.saved.filter(i=>!state.saved.some(w=>w.id===i.id))].slice(0,40);state.history=[...state.history,...backup.history.filter(i=>!state.history.some(w=>w.id===i.id&&w.date===i.date))].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,90);state.plans=[...state.plans,...backup.plans.filter(i=>!state.plans.some(w=>w.date===i.date))].slice(0,35);if(!state.preferences)state.preferences=backup.preferences;const ok=persist();refreshAll();setPreferences(state.preferences||D.defaults);$('remember-preferences').checked=!!state.preferences;renderResults();status(ok?'Backup restored. Existing pieces and plans have been kept.':'Backup restored for this visit; browser saving is unavailable.','data-status');}catch{status('That file could not be restored. Choose a Jane.M daily Studio JSON backup under 500 KB.','data-status');}e.target.value='';});
 $('clear-daily').addEventListener('click',()=>$('clear-dialog').showModal());$('cancel-clear').addEventListener('click',()=>$('clear-dialog').close());
 $('confirm-clear').addEventListener('click',()=>{state=D.normalise();turn=0;undoItem=null;persist();setPreferences(D.defaults);$('remember-preferences').checked=false;refreshAll();$('clear-dialog').close();status(storageOk?'Daily Studio data cleared from this browser.':'Could not clear browser storage. Use your browser’s site data controls.','data-status');});
 $('today-date').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+' · Your everyday Style Studio';
 renderWardrobe();setPreferences(state.preferences||D.defaults);$('remember-preferences').checked=!!state.preferences;renderResults();renderSaved();renderPlanner();
 if(!storageOk)status('Saved data could not be read. You can use the Studio for this visit or restore a backup.');
 window.addEventListener('storage',e=>{if(e.key!==key)return;try{state=D.normalise(JSON.parse(e.newValue||'{}'));refreshAll();status('Saved pieces, outfits and plans updated from your other tab.','data-status');}catch{status('Could not read the update from your other tab. Download a backup before reloading.','data-status');}});
})();
