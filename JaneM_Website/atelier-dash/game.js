(function(){
'use strict';
const C=window.AtelierDash,$=id=>document.getElementById(id),canvas=$('maze'),ctx=canvas.getContext('2d'),STEP=150,CELL=32,STORE='janem-atelier-dash-v1';
if(!ctx){$('overlay-copy').textContent='Your browser cannot draw this game. Try Style Spark instead.';$('start').disabled=true;return;}
let state=C.create(),running=false,frame=0,last=0,acc=0,previous=null,bests={classic:0,practice:0},endRecorded=false;
try{const data=JSON.parse(localStorage.getItem(STORE)||'{}');for(const mode of ['classic','practice'])if(Number.isSafeInteger(data[mode])&&data[mode]>=0)bests[mode]=data[mode];}catch{$('save-note').textContent='Best-score saving is unavailable. You can still play this session.';}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const track=(event,detail={})=>window.JaneMAnalytics?.track(event,{game:'atelier_dash',mode:state.mode,round:state.round,...detail});
function announce(text){$('announcement').textContent=text;}
function best(){bests[state.mode]=Math.max(bests[state.mode],state.score);try{localStorage.setItem(STORE,JSON.stringify(bests));}catch{$('save-note').textContent='Your best score is kept for this session only; browser storage is unavailable.';}$('best').textContent=bests[state.mode].toLocaleString();}
function sync(){
 $('round').textContent=state.round+' / 3';$('score').textContent=state.score.toLocaleString();$('lives').textContent=state.lives;$('best').textContent=bests[state.mode].toLocaleString();
 $('look-title').textContent=['The evening edit.','A garden occasion.','The golden finale.'][state.round-1];
 const colors=['#a34854','#397e70','#b78c48'];$('dress-fabric').setAttribute('fill',colors[state.round-1]);
 C.supplies.forEach(item=>{const li=document.querySelector('[data-supply="'+item+'"]'),found=state.collected.includes(item);li.classList.toggle('found',found);li.querySelector('b').textContent=found?'✓ Found':'To find';$('dress-'+item).setAttribute('opacity',found?'1':item==='fabric'?'.12':'0');});
 $('stitches').max=state.totalStitches;$('stitches').value=state.totalStitches-state.remaining;$('stitch-count').textContent=(state.totalStitches-state.remaining)+' / '+state.totalStitches;
 const ready=state.remaining===0&&state.collected.length===4;
 $('objective').textContent=ready?'Dress ready! Return to the centre mannequin.':state.remaining+' stitches · '+(4-state.collected.length)+' supplies to find';
 $('dress-caption').textContent=state.collected.length===4?'Your look is ready. Finish the stitches.':'Four supplies. One finished look.';
 $('shield-status').textContent=state.shield>0?'Shield on · '+Math.ceil(state.shield*STEP/1000)+'s':'Blue thimble = 6s shield';
}
function capture(){return {player:{...state.player},enemies:state.enemies.map(e=>({...e}))};}
function lerp(p,old,t){if(!old||Math.abs(p.x-old.x)+Math.abs(p.y-old.y)>1)return p;return{x:old.x+(p.x-old.x)*t,y:old.y+(p.y-old.y)*t};}
function rounded(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
function icon(type,x,y){ctx.save();ctx.translate(x,y);ctx.lineWidth=1.5;
 if(type==='stitch'){ctx.strokeStyle='#dbc18b';ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-1.6,0);ctx.lineTo(1.6,0);ctx.stroke();}
 else if(type==='shield'){ctx.fillStyle='#92ceda';ctx.beginPath();ctx.moveTo(-8,8);ctx.lineTo(-6,-6);ctx.quadraticCurveTo(0,-15,6,-6);ctx.lineTo(8,8);ctx.closePath();ctx.fill();ctx.strokeStyle='#315b63';ctx.beginPath();ctx.moveTo(-7,5);ctx.lineTo(7,5);ctx.stroke();ctx.fillStyle='#315b63';for(let i=-3;i<=3;i+=6){ctx.fillRect(i,-4,1.5,1.5);ctx.fillRect(i,0,1.5,1.5);}}
 else{const palette={fabric:'#a9cdbb',pattern:'#e4d6b5',thread:'#d9a99d',trim:'#ddbd76'};rounded(-11,-11,22,22,5,palette[type]);ctx.fillStyle='#202a25';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 14px Arial';ctx.fillText({fabric:'F',pattern:'P',thread:'T',trim:'✦'}[type],0,1);}
 ctx.restore();}
function spool(p,t){ctx.save();ctx.translate(p.x*CELL+16,p.y*CELL+16);if(state.invincible>0&&state.invincible%4<2)ctx.globalAlpha=.45;
 if(state.shield>0){ctx.strokeStyle='#9ce1e8';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.stroke();}
 ctx.rotate(({left:-.2,right:.2,up:0,down:0}[state.player.dir]||0));rounded(-8,-9,16,18,3,'#c69648');ctx.strokeStyle='#ffe6ad';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-10,-10);ctx.lineTo(10,-10);ctx.moveTo(-10,10);ctx.lineTo(10,10);ctx.stroke();ctx.lineWidth=1;for(let y=-5;y<=5;y+=3){ctx.beginPath();ctx.moveTo(-6,y);ctx.lineTo(6,y-2);ctx.stroke();}ctx.restore();}
function scissors(p,id){ctx.save();ctx.translate(p.x*CELL+16,p.y*CELL+16);ctx.rotate(-.3+id*.4);ctx.strokeStyle=state.shield>0?'#91b8bb':['#f0907f','#c4a1d7','#efb070'][id];ctx.lineWidth=2.8;ctx.lineCap='round';ctx.beginPath();ctx.arc(-5,6,4,0,Math.PI*2);ctx.moveTo(9,6);ctx.arc(5,6,4,0,Math.PI*2);ctx.moveTo(-3,3);ctx.lineTo(7,-10);ctx.moveTo(3,3);ctx.lineTo(-7,-10);ctx.stroke();ctx.restore();}
function draw(t=1){ctx.clearRect(0,0,608,608);ctx.fillStyle='#18211e';ctx.fillRect(0,0,608,608);ctx.lineWidth=1;
 C.MAP.forEach((row,y)=>[...row].forEach((c,x)=>{if(c==='#'){rounded(x*CELL+2,y*CELL+2,28,28,5,'#27322b');ctx.strokeStyle='#667153';ctx.beginPath();if(C.pass(x,y-1)){ctx.moveTo(x*CELL+3,y*CELL+3);ctx.lineTo(x*CELL+29,y*CELL+3);}if(C.pass(x,y+1)){ctx.moveTo(x*CELL+3,y*CELL+29);ctx.lineTo(x*CELL+29,y*CELL+29);}if(C.pass(x-1,y)){ctx.moveTo(x*CELL+3,y*CELL+3);ctx.lineTo(x*CELL+3,y*CELL+29);}if(C.pass(x+1,y)){ctx.moveTo(x*CELL+29,y*CELL+3);ctx.lineTo(x*CELL+29,y*CELL+29);}ctx.stroke();}}));
 for(const [k,item] of state.items){const [x,y]=C.coords(k);icon(item,x*CELL+16,y*CELL+16);}
 const home=state.home,ready=!state.remaining&&state.collected.length===4;ctx.save();ctx.translate(home.x*CELL+16,home.y*CELL+16);ctx.strokeStyle=ready?'#ffe0a0':'#958468';ctx.fillStyle=ready?'#7c6140':'#27322b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,-9);ctx.lineTo(5,-9);ctx.lineTo(4,0);ctx.lineTo(10,9);ctx.lineTo(-10,9);ctx.lineTo(-4,0);ctx.closePath();ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(0,-9);ctx.moveTo(0,9);ctx.lineTo(0,14);ctx.stroke();ctx.restore();
 for(let i=0;i<state.enemies.length;i++)scissors(lerp(state.enemies[i],previous?.enemies[i],t),i);
 spool(lerp(state.player,previous?.player,t));
}
function stop(){running=false;cancelAnimationFrame(frame);last=0;acc=0;previous=null;$('pause').disabled=true;draw();}
function showOverlay(title,copy,kicker,action){$('overlay-title').textContent=title;$('overlay-copy').textContent=copy;$('overlay-kicker').textContent=kicker;$('start').textContent=action;$('overlay').hidden=false;$('mode-label').hidden=true;$('restart').hidden=true;$('share').hidden=true;$('share-status').textContent='';}
function finish(){stop();best();if(!endRecorded){track(state.status==='delivered'?'atelier_dash_round_complete':state.status==='won'?'atelier_dash_complete':'atelier_dash_game_over',{score:state.score});endRecorded=true;}
 if(state.status==='delivered'){showOverlay('Beautifully delivered.','Your '+['evening dress','garden dress'][state.round-1]+' is complete. Next: a new supply route and faster scissors. You keep your score and remaining lives.','ROUND '+state.round+' COMPLETE','Next round →');}
 else{const won=state.status==='won';showOverlay(won?'Collection complete.':'Every designer starts again.',won?'Three looks delivered. That was quite a run. Your final score: '+state.score.toLocaleString()+'.':'You scored '+state.score.toLocaleString()+' on round '+state.round+'. Try turning early at junctions and save a thimble for a tight corner.',won?'THREE ROUNDS · THREE LOOKS':'RUN FINISHED','Play again →');$('mode-label').hidden=false;$('share').hidden=false;}
 announce($('overlay-title').textContent+' '+$('overlay-copy').textContent);$('start').focus({preventScroll:true});
}
function loop(time){if(!running)return;if(!last)last=time;acc+=Math.min(time-last,300);last=time;
 while(acc>=STEP&&running){previous=capture();C.step(state);acc-=STEP;sync();for(const e of state.events){if(e==='hit')announce('Scissors caught you. '+state.lives+' lives left. Supplies kept.');if(e==='supply')announce(state.collected.at(-1)+' collected. '+state.collected.length+' of four supplies.');if(e==='shield')announce('Thimble collected. Six seconds of protection.');}if(state.status!=='playing'){finish();return;}}
 draw(reduced.matches?1:Math.min(1,acc/STEP));frame=requestAnimationFrame(loop);
}
function begin(){if(running)return;if(state.status==='delivered')state=C.create(state.round+1,state.mode,{score:state.score,lives:state.lives});else if(state.status!=='playing'||!$('mode-label').hidden)state=C.create(1,$('mode').value);
 endRecorded=false;sync();$('overlay').hidden=true;$('pause').disabled=false;running=true;last=0;acc=0;previous=null;canvas.focus({preventScroll:true});document.querySelector('.play-panel').scrollIntoView?.({block:'start',behavior:'instant'});track('atelier_dash_start',{resumed:state.ticks>0});announce('Round '+state.round+'. Use arrows or swipe to move.');frame=requestAnimationFrame(loop);
}
function pause(reason='Take a breather.'){if(!running)return;stop();showOverlay('Workroom paused.',reason+' Your score and supplies are safe while you stay here.','YOUR RUN IS ON HOLD','Resume →');$('restart').hidden=false;announce('Game paused.');$('start').focus({preventScroll:true});track('atelier_dash_pause');}
$('start').addEventListener('click',begin);$('restart').addEventListener('click',()=>{state=C.create(1,$('mode').value);begin();});$('pause').addEventListener('click',()=>pause());
$('mode').addEventListener('change',()=>{$('best').textContent=bests[$('mode').value].toLocaleString();});
const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
canvas.addEventListener('keydown',e=>{const dir=keys[e.key]||keys[e.key.toLowerCase()];if(dir&&running){e.preventDefault();C.steer(state,dir);}if((e.key===' '||e.key==='Escape')&&running){e.preventDefault();pause();}});
for(const button of document.querySelectorAll('[data-dir]')){button.addEventListener('pointerdown',e=>{if(running){e.preventDefault();C.steer(state,button.dataset.dir);canvas.focus({preventScroll:true});}});button.addEventListener('click',()=>{if(running)C.steer(state,button.dataset.dir);});}
let swipe=null;canvas.addEventListener('pointerdown',e=>{if(!running)return;swipe={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointermove',e=>{if(!swipe||!running)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.max(Math.abs(dx),Math.abs(dy))<12)return;C.steer(state,Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');swipe={x:e.clientX,y:e.clientY};});for(const event of ['pointerup','pointercancel'])canvas.addEventListener(event,()=>{swipe=null;});
canvas.addEventListener('blur',()=>{if(running)pause('Paused while you use another control.');});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('Paused while you were away.');});window.addEventListener('blur',()=>pause('Paused while you were away.'));
$('share').addEventListener('click',async()=>{const text='I scored '+state.score+' in Jane.M Atelier Dash ('+state.mode+'), reaching round '+state.round+'! Can you deliver all three looks? https://wearjanem.com/atelier-dash/';try{await navigator.clipboard.writeText(text);$('share-status').textContent='Score copied. Paste it into your chat.';track('atelier_dash_share',{score:state.score});}catch{$('share-status').textContent=text;}});
sync();draw();
})();
