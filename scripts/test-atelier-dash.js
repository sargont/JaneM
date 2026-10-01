const assert=require('node:assert/strict'),fs=require('node:fs');
const C=require('../JaneM_Website/atelier-dash/core'),{JSDOM}=require('jsdom');
const walkable=C.MAP.join('').split('.').length-1;
for(let round=1;round<=3;round++){
 const s=C.create(round);assert.equal(C.distanceMap(s.home).size,walkable,'every corridor is reachable');assert.equal(s.collected.length,0);assert.equal([...s.items.values()].filter(v=>C.supplies.includes(v)).length,4);
 for(const k of s.items.keys())assert.ok(C.pass(...C.coords(k)),'all supplies are on a corridor');
 // Route through every collectible and deliver, exercising actual movement/scoring.
 s.enemies=[];const total=s.remaining;let safety=0;
 function walk(target){while(s.player.x!==target.x||s.player.y!==target.y){assert.ok(++safety<15000);const dist=C.distanceMap(target);const next=C.neighbors(s.player).sort((a,b)=>dist.get(C.key(a.x,a.y))-dist.get(C.key(b.x,b.y)))[0];C.steer(s,next.dir);C.step(s);}}
 for(const k of [...s.items.keys()]){const [x,y]=C.coords(k);walk({x,y});}walk(s.home);
 assert.equal(s.remaining,0);assert.equal(s.collected.length,4);assert.equal(s.score,total*10+4*100+3*25+500);assert.equal(s.status,round===3?'won':'delivered');const score=s.score;C.step(s);assert.equal(s.score,score,'no duplicate delivery');
}
let s=C.create();s.enemies=[];Object.assign(s.player,{x:1,y:1});C.steer(s,'up');C.step(s);assert.deepEqual([s.player.x,s.player.y],[1,1],'walls stop movement');
s=C.create();s.enemies=[{x:10,y:9,home:{x:1,y:3},id:0}];C.steer(s,'right');C.step(s);assert.equal(s.lives,2);assert.equal(s.remaining,s.totalStitches-1,'collected stitches survive a hit');assert.deepEqual([s.player.x,s.player.y],[9,9]);assert.ok(s.invincible>0);
s=C.create();s.shield=15;s.enemies=[{x:10,y:9,home:{x:1,y:3},id:0}];C.steer(s,'right');C.step(s);assert.equal(s.lives,3);assert.equal(s.score,60);assert.equal(s.enemies[0].x,1);
s=C.create();s.lives=1;s.enemies=[{x:10,y:9,home:{x:1,y:3},id:0}];C.steer(s,'right');C.step(s);assert.equal(s.status,'lost');assert.equal(s.lives,0);
const carried=C.create(2,'practice',{score:420,lives:2});assert.equal(carried.mode,'practice');assert.equal(carried.score,420);assert.equal(carried.lives,2);
function app(blocked=false){const dom=new JSDOM(fs.readFileSync('JaneM_Website/atelier-dash/index.html','utf8'),{url:'https://wearjanem.com/atelier-dash/',runScripts:'outside-only'}),w=dom.window;w.matchMedia=()=>({matches:true});w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:()=>()=>{},set:()=>true});if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('blocked');}});else w.localStorage.setItem('janem-daily-style-v1','untouched');for(const f of ['core.js','game.js'])w.eval(fs.readFileSync('JaneM_Website/atelier-dash/'+f,'utf8'));return dom;}
for(const blocked of [false,true]){const dom=app(blocked),d=dom.window.document;d.getElementById('start').click();assert.equal(d.getElementById('overlay').hidden,true);assert.equal(d.getElementById('pause').disabled,false);d.getElementById('pause').click();assert.equal(d.getElementById('overlay').hidden,false);assert.match(d.getElementById('overlay-title').textContent,/paused/);d.getElementById('start').click();assert.equal(d.getElementById('overlay').hidden,true);d.getElementById('maze').dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(d.getElementById('overlay').hidden,false);if(!blocked)assert.equal(dom.window.localStorage.getItem('janem-daily-style-v1'),'untouched');dom.window.close();}
console.log('Atelier Dash passed: every round reachable and completable, supplies, delivery, score, wall movement, collision, shield, lives, pause/resume, blocked storage and Style Spark isolation.');
