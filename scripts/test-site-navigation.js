const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom'),{links}=require('./site-navigation');
const root=path.resolve('JaneM_Website');
const routes=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
for(const route of [...routes,'/404.html']){
 const file=route==='/'?'index.html':route.slice(1)+(route.endsWith('/')?'index.html':'');
 const dom=new JSDOM(fs.readFileSync(path.join(root,file),'utf8'),{url:'https://wearjanem.com'+route,runScripts:'outside-only'}),w=dom.window,d=w.document;
 assert.equal(d.querySelectorAll('header.jm-navigation').length,1,file+' has one shared header');
 assert.deepEqual([...d.querySelectorAll('.jm-nav-links>a')].map(a=>new URL(a.href).pathname),links.map(([href])=>'/'+href),file+' shares all destinations');
 assert.equal(d.querySelectorAll('#site-nav').length,1);
 w.matchMedia=()=>({addEventListener(){}});w.eval(fs.readFileSync(path.join(root,'site-navigation.js'),'utf8'));
 const toggle=d.querySelector('.jm-nav-toggle'),nav=d.querySelector('#site-nav');toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'true');assert.ok(nav.classList.contains('jm-open'));
 d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(toggle.getAttribute('aria-expanded'),'false');assert.equal(d.activeElement,toggle);
 toggle.click();d.body.click();assert.equal(toggle.getAttribute('aria-expanded'),'false');
 assert.equal(d.querySelectorAll('script[src*="site-navigation.js"]').length,1);
 dom.window.close();
}
console.log(`Shared navigation verified on ${routes.length} public pages and the 404 page: destinations, one header, toggle, Escape and outside dismissal.`);
