/* Pattern Drop: deterministic falling fabric puzzle, independent of other games. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PatternDrop=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const W=8,H=16,TARGET=24;
const FABRICS=[
 {name:'Silk ribbon',color:'#7caeb5',cells:[[1,1,1,1]]},
 {name:'Golden square',color:'#d2ac68',cells:[[1,1],[1,1]]},
 {name:'Rose dart',color:'#c78392',cells:[[0,1,0],[1,1,1]]},
 {name:'Sage fold',color:'#87ab8d',cells:[[0,1,1],[1,1,0]]},
 {name:'Coral fold',color:'#d28f75',cells:[[1,1,0],[0,1,1]]},
 {name:'Indigo seam',color:'#909bbd',cells:[[1,0,0],[1,1,1]]},
 {name:'Ivory seam',color:'#ded1b6',cells:[[0,0,1],[1,1,1]]}
];
const empty=()=>Array.from({length:H},()=>Array(W).fill(0));
function dayKey(date=new Date()){return new Date(date.getTime()+7200000).toISOString().slice(0,10);}
function seed(text){let n=2166136261;for(const c of String(text))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0||1;}
function random(s){s.rng^=s.rng<<13;s.rng^=s.rng>>>17;s.rng^=s.rng<<5;return(s.rng>>>0)/4294967296;}
function refill(s){const bag=FABRICS.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(random(s)*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}s.queue.push(...bag);}
function collides(s,cells,x,y){for(let r=0;r<cells.length;r++)for(let c=0;c<cells[r].length;c++)if(cells[r][c]&&(x+c<0||x+c>=W||y+r>=H||(y+r>=0&&s.board[y+r][x+c])))return true;return false;}
function spawn(s){while(s.queue.length<4)refill(s);const id=s.queue.shift(),cells=FABRICS[id].cells.map(r=>r.slice());s.active={id,cells,x:Math.floor((W-cells[0].length)/2),y:0};s.fallMs=0;s.lockMs=0;s.resets=0;if(collides(s,cells,s.active.x,s.active.y)){s.status='lost';s.events.push({type:'lost'});}}
function create(day=dayKey(),mode='classic'){const s={board:empty(),queue:[],rng:seed(day),day,mode:mode==='relaxed'?'relaxed':'classic',score:0,rows:0,combo:0,level:1,status:'playing',fallMs:0,lockMs:0,resets:0,events:[],active:null};spawn(s);return s;}
function grounded(s){return collides(s,s.active.cells,s.active.x,s.active.y+1);}
function resetLock(s,wasGrounded){if(wasGrounded&&s.resets<8){s.lockMs=0;s.resets++;}}
function move(s,dx,dy=0){if(s.status!=='playing')return false;const a=s.active,ground=grounded(s);if(collides(s,a.cells,a.x+dx,a.y+dy))return false;a.x+=dx;a.y+=dy;if(dx)resetLock(s,ground);return true;}
function rotate(s,direction=1){if(s.status!=='playing')return false;const a=s.active,ground=grounded(s),old=a.cells;const cells=old[0].map((_,i)=>old.map(row=>row[i]).reverse());if(direction<0){cells.reverse();cells.forEach(r=>r.reverse());}
 for(const [dx,dy] of [[0,0],[-1,0],[1,0],[-2,0],[2,0],[-3,0],[3,0],[0,-1],[0,-2],[0,-3]])if(!collides(s,cells,a.x+dx,a.y+dy)){a.cells=cells;a.x+=dx;a.y+=dy;resetLock(s,ground);return true;}return false;}
function ghostY(s){let y=s.active.y;while(!collides(s,s.active.cells,s.active.x,y+1))y++;return y;}
function interval(s){return s.mode==='relaxed'?1400:Math.max(180,850-(s.level-1)*135);}
function lock(s){if(s.status!=='playing')return;const a=s.active;if(a.cells.some((r,y)=>r.some((v,x)=>v&&a.y+y<0))){s.status='lost';s.events.push({type:'lost'});return;}
 a.cells.forEach((r,y)=>r.forEach((v,x)=>{if(v)s.board[a.y+y][a.x+x]=a.id+1;}));const full=s.board.map((r,i)=>r.every(Boolean)?i:-1).filter(i=>i>=0);
 if(full.length){s.board=s.board.filter((_,i)=>!full.includes(i));while(s.board.length<H)s.board.unshift(Array(W).fill(0));s.combo++;const points=[0,100,300,500,800][full.length]*s.level+50*(s.combo-1);s.score+=points;s.rows+=full.length;s.level=1+Math.floor(s.rows/4);s.events.push({type:'clear',count:full.length,combo:s.combo,points,lines:full});if(s.rows>=TARGET){s.status='won';s.score+=1000;s.events.push({type:'won'});return;}}
 else{s.combo=0;s.events.push({type:'lock'});}spawn(s);
}
function hardDrop(s){if(s.status!=='playing')return 0;const y=ghostY(s),distance=y-s.active.y;s.active.y=y;s.score+=distance*2;lock(s);return distance;}
function softDrop(s){if(move(s,0,1)){s.score++;s.fallMs=0;return true;}return false;}
function tick(s,ms){if(s.status!=='playing')return;ms=Math.max(0,Math.min(ms,100));s.fallMs+=ms;while(s.fallMs>=interval(s)){s.fallMs-=interval(s);move(s,0,1);}if(grounded(s)){s.lockMs+=ms;if(s.lockMs>=450)lock(s);}else s.lockMs=0;}
return{W,H,TARGET,FABRICS,empty,dayKey,create,collides,move,rotate,ghostY,interval,lock,hardDrop,softDrop,tick,grounded};
});
