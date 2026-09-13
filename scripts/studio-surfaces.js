const {JSDOM}=require('jsdom');
const appHeader=prefix=>`<header class="studio-app-header"><a class="studio-app-brand" href="${prefix}index.html" aria-label="Jane.M home">Jane.M <span>STYLE STUDIO</span></a><nav aria-label="Studio navigation"><a href="${prefix}style-studio/#choose">Change experience</a><a href="${prefix}index.html#collection">Back to the collection ↗</a></nav></header>`;
const appFooter=prefix=>`<footer class="studio-app-footer"><span>Jane.M · Your personal Style Studio</span><a href="${prefix}privacy/">Privacy &amp; your saved data</a></footer>`;
function dailySurface(markup){
 const dom=new JSDOM(markup), d=dom.window.document, root=d.querySelector('.container');
 d.querySelector('.mode-nav')?.remove();
 d.querySelector('.daily-heading__note')?.remove();
 d.querySelector('.daily-heading h1').innerHTML='Dress for <em>today.</em>';
 d.querySelector('.daily-heading p:last-child').textContent='Start with your plans. Find a combination that feels like you.';
 const nav=d.createElement('nav');nav.className='studio-app-tabs';nav.setAttribute('aria-label','Daily Studio');nav.setAttribute('role','tablist');
 const today=d.querySelector('.daily-layout');today.id='today';
 const wardrobe=d.querySelector('#wardrobe'), saved=d.querySelector('#saved-title').closest('section'), week=d.querySelector('#planner-title').closest('section');saved.id='saved';week.id='week';
 [['today','Today',today],['wardrobe','Wardrobe',wardrobe],['saved','Saved outfits',saved],['week','My week',week]].forEach(([id,label,panel],index)=>{nav.insertAdjacentHTML('beforeend',`<button type="button" role="tab" id="tab-${id}" aria-controls="${id}" aria-selected="${index===0}" tabindex="${index===0?0:-1}" data-studio-view="${id}">${label}</button>`);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','tab-'+id);panel.dataset.studioPanel=id;panel.hidden=index!==0;});
 d.querySelector('.daily-heading').after(nav);
 const status=d.querySelector('#daily-status');nav.after(status);
 const controls=d.querySelector('#daily-form .exp-fields'), comfort=d.createElement('details');comfort.className='daily-comfort';comfort.innerHTML='<summary>Comfort &amp; finishing touches</summary><div class="exp-fields"></div>';
 ['footwear','coverage','anchor'].forEach(name=>comfort.lastElementChild.append(d.querySelector(`[name="${name}"]`).closest('label')));
 controls.querySelector('.exp-check').before(comfort);
 const add=d.createElement('details');add.className='wardrobe-add';add.open=true;add.innerHTML='<summary>Add a wardrobe piece <span aria-hidden="true">+</span></summary>';const form=d.querySelector('#wardrobe-form');form.before(add);add.append(form);
 d.querySelector('.daily-atelier')?.remove();wardrobe.append(d.querySelector('.daily-data'));
 d.querySelector('#daily-results-title').textContent='Your outfit ideas';
 d.querySelector('#refresh-outfits').textContent='Another idea ↻';
 d.querySelector('#daily-form button[type="submit"]').textContent='Find my outfit →';
 d.querySelectorAll('.daily-section h2').forEach(h=>h.tabIndex=-1);
 const result=d.body.innerHTML;dom.window.close();return result;
}
module.exports={dailySurface,appHeader,appFooter};
