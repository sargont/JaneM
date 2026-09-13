const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',error=>{throw error;});
const root=path.resolve(__dirname,'../JaneM_Website');
function load(route,scripts){const dom=new JSDOM(fs.readFileSync(path.join(root,route),'utf8'),{url:'https://example.com/'+route,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});const w=dom.window;w.matchMedia=()=>({matches:true});w.CSS={escape:s=>s.replace(/["\\]/g,'\\$&')};w.HTMLElement.prototype.scrollIntoView=function(){};scripts.forEach(s=>w.eval(fs.readFileSync(path.join(root,'style-studio',s),'utf8')));return dom;}
const daily=load('style-studio/today/index.html',['daily-core.js','daily.js','app-navigation.js']);
const d=daily.window.document;
function active(id){assert.equal(d.querySelectorAll('[data-studio-panel]:not([hidden])').length,1);assert.equal(d.getElementById(id).hidden,false);assert.equal(d.getElementById('tab-'+id).getAttribute('aria-selected'),'true');}
active('today');d.getElementById('tab-wardrobe').click();active('wardrobe');
d.getElementById('tab-wardrobe').dispatchEvent(new daily.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));active('saved');
d.getElementById('tab-today').click();d.querySelector('[data-save-outfit="0"]').click();d.querySelector('[data-open-view="saved"]').click();active('saved');
d.querySelector('[data-plan]').dispatchEvent(new daily.window.Event('submit',{bubbles:true,cancelable:true}));active('week');
daily.window.history.replaceState(null,'','#wardrobe');daily.window.dispatchEvent(new daily.window.PopStateEvent('popstate'));active('wardrobe');
const f=d.getElementById('wardrobe-form');f.elements.category.value='Shoes';f.elements.category.dispatchEvent(new daily.window.Event('change'));assert.equal(f.elements.flat.disabled,false);assert.equal(f.elements.coverage.disabled,true);
const occasion=load('style-studio/index.html',['recommendations.js','measurement-review.js','brief-pdf.js','style-card.js','studio.js','app-navigation.js']);const o=occasion.window.document;
assert.equal(o.getElementById('occasion-workspace').hidden,true);o.getElementById('start-occasion').click();assert.equal(o.getElementById('studio-choose').hidden,true);
o.getElementById('nextButton').click();assert.equal(o.getElementById('validationMessage').hidden,false);assert.equal(o.getElementById('stepLabel').textContent,'Step 1 of 4');
for(let i=0;i<4;i++){const section=o.querySelector('.studio-step:not([hidden])');assert.equal(Number(section.dataset.step),i);section.querySelectorAll('[data-required]').forEach(group=>group.querySelector('input').click());o.getElementById('nextButton').click();}
assert.equal(o.getElementById('result').hidden,false);assert.equal(o.getElementById('studioApp').hidden,true);assert.equal(o.querySelector('.journey-rail').hidden,true);assert.match(o.getElementById('quickWhatsApp').href,/wa.me/);
o.getElementById('edit-occasion-answers').click();assert.equal(o.getElementById('result').hidden,true);assert.equal(o.getElementById('stepLabel').textContent,'Step 1 of 4');assert.ok(o.querySelector('[name="occasion"]:checked'));
o.getElementById('nextButton').click();o.getElementById('backButton').click();assert.equal(o.getElementById('stepLabel').textContent,'Step 1 of 4');
for(let i=0;i<4;i++)o.getElementById('nextButton').click();assert.equal(o.getElementById('result').hidden,false);assert.equal(o.getElementById('briefPreview').hidden,true);
occasion.window.history.replaceState(null,'','#choose');occasion.window.dispatchEvent(new occasion.window.PopStateEvent('popstate'));assert.equal(o.getElementById('studio-choose').hidden,false);
[daily,occasion].forEach(dom=>dom.window.close());console.log('Studio navigation passed: tabs, keyboard, save-to-plan transition, browser history, category controls, validation, four-step completion and editing.');
