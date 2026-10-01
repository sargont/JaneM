/* Original Jane.M maze game. No dependency on Style Spark or its saved progress. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.AtelierDash=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const MAP=[
'###################',
'#.....#.....#.....#',
'#.###.#.###.#.###.#',
'#.................#',
'#.###.###.###.###.#',
'#...#...#.#...#...#',
'###.#.#.#.#.#.#.###',
'#.....#.....#.....#',
'#.###.###.###.###.#',
'#...#.........#...#',
'#.#.#.###.###.#.#.#',
'#.#.....#.#.....#.#',
'#.###.#.#.#.#.###.#',
'#.....#.....#.....#',
'#.###.###.###.###.#',
'#.................#',
'#.###.#.###.#.###.#',
'#.....#.....#.....#',
'###################'];
const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}, supplies=['fabric','pattern','thread','trim'];
const key=(x,y)=>x+','+y, coords=k=>k.split(',').map(Number);
function pass(x,y){return !!MAP[y]&&MAP[y][x]==='.';}
function neighbors(p){return Object.entries(DIRS).map(([dir,[dx,dy]])=>({x:p.x+dx,y:p.y+dy,dir})).filter(p=>pass(p.x,p.y));}
function distanceMap(target){const dist=new Map([[key(target.x,target.y),0]]),q=[target];for(let i=0;i<q.length;i++)for(const p of neighbors(q[i])){const k=key(p.x,p.y);if(!dist.has(k)){dist.set(k,dist.get(key(q[i].x,q[i].y))+1);q.push(p);}}return dist;}
function create(round=1,mode='classic',carry={}){
 round=Math.min(3,Math.max(1,round));mode=mode==='practice'?'practice':'classic';
 const items=new Map();MAP.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='.')items.set(key(x,y),'stitch');}));
 const spots=round===2?[[5,5],[13,5],[5,13],[13,13]]:round===3?[[9,1],[1,9],[17,9],[9,17]]:[[1,1],[17,1],[1,17],[17,17]];
 spots.forEach(([x,y],i)=>items.set(key(x,y),supplies[i]));
 [[3,7],[15,11],[9,3]].forEach(([x,y])=>items.set(key(x,y),'shield'));
 const home={x:9,y:9};items.delete(key(home.x,home.y));
 const player={...home,dir:null,want:null};
 const enemies=[{x:1,y:3},{x:17,y:15},...(round>1?[{x:17,y:3}]:[])].map((p,i)=>({...p,home:{...p},id:i,prev:null}));
 return {round,mode,items,player,enemies,home,collected:[],remaining:[...items.values()].filter(v=>v==='stitch').length,score:carry.score||0,lives:carry.lives??3,ticks:0,shield:0,invincible:0,status:'playing',enemyClock:0,events:[],totalStitches:[...items.values()].filter(v=>v==='stitch').length};
}
function steer(s,dir){if(DIRS[dir])s.player.want=dir;}
function resetActors(s){Object.assign(s.player,s.home,{dir:null,want:null});s.enemies.forEach(e=>Object.assign(e,e.home,{prev:null}));s.enemyClock=0;}
function collide(s){if(s.invincible>0)return false;const e=s.enemies.find(e=>e.x===s.player.x&&e.y===s.player.y);if(!e)return false;
 if(s.shield>0){s.score+=50;Object.assign(e,e.home,{prev:null});s.events.push('deflect');return false;}
 s.lives--;s.events.push('hit');if(s.lives<=0){s.status='lost';s.events.push('lost');}else{resetActors(s);s.invincible=18;}return true;
}
function step(s){if(s.status!=='playing')return s; s.events=[];s.ticks++;s.shield=Math.max(0,s.shield-1);s.invincible=Math.max(0,s.invincible-1);
 const p=s.player;let d=DIRS[p.want];if(d&&pass(p.x+d[0],p.y+d[1]))p.dir=p.want;d=DIRS[p.dir];if(d&&pass(p.x+d[0],p.y+d[1])){p.x+=d[0];p.y+=d[1];}
 const k=key(p.x,p.y),item=s.items.get(k);if(item){s.items.delete(k);if(item==='stitch'){s.remaining--;s.score+=10;}else if(item==='shield'){s.shield=40;s.score+=25;s.events.push('shield');}else{s.collected.push(item);s.score+=100;s.events.push('supply');}}
 if(s.remaining===0&&s.collected.length===4&&p.x===s.home.x&&p.y===s.home.y){s.score+=500;s.status=s.round===3?'won':'delivered';s.events.push(s.status);return s;}
 if(collide(s)||s.status!=='playing')return s;
 s.enemyClock++;
 const interval=s.mode==='practice'?5:Math.max(1,4-s.round);
 if(s.enemyClock>=interval){s.enemyClock=0;
  for(const e of s.enemies){
   const scatter=Math.floor(s.ticks/60)%3===0;
   const targets=[{x:1,y:1},{x:17,y:17},{x:17,y:1}];
   const target=scatter?targets[e.id]:p;
   const dist=distanceMap(target);let options=neighbors(e);const forward=options.filter(n=>key(n.x,n.y)!==e.prev);if(forward.length)options=forward;
   options.sort((a,b)=>{const da=dist.get(key(a.x,a.y))??999,db=dist.get(key(b.x,b.y))??999;return s.shield>0?db-da:da-db;});
   if(options.length){e.prev=key(e.x,e.y);Object.assign(e,{x:options[0].x,y:options[0].y});}
   if(collide(s)||s.status!=='playing')break;
  }
 }
 return s;
}
return {MAP,DIRS,supplies,key,coords,pass,neighbors,distanceMap,create,steer,step};
});
