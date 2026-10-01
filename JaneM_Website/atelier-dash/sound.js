/* Small, original arcade cues, synthesised locally after a player gesture. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.DashSound=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const tunes={start:[[392,0,.1],[523,.1,.1],[659,.2,.15]],stitch:[[740,0,.045]],supply:[[523,0,.09],[659,.08,.09],[784,.16,.16]],shield:[[440,0,.08],[660,.08,.08],[880,.16,.18]],deflect:[[880,0,.08],[1175,.08,.1]],hit:[[220,0,.12],[165,.1,.16],[110,.22,.18]],delivered:[[523,0,.12],[659,.12,.12],[784,.24,.12],[1047,.36,.25]],won:[[523,0,.12],[659,.12,.12],[784,.24,.12],[1047,.36,.18],[784,.56,.1],[1047,.7,.35]],lost:[[330,0,.13],[262,.14,.13],[196,.28,.3]]};
function create(Context){let context=null,enabled=true,voices=new Set();
 function stop(){for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
 function set(on){enabled=!!on;if(!enabled)stop();return enabled;}
 function unlock(){if(!enabled||!Context)return;try{context=context||new Context();if(context.state==='suspended')context.resume().catch(()=>{});}catch{context=null;}}
 function play(kind){if(!enabled||!context||context.state!=='running'||!tunes[kind])return;for(const [hz,delay,length] of tunes[kind]){const osc=context.createOscillator(),gain=context.createGain(),t=context.currentTime+delay;osc.type=kind==='hit'||kind==='lost'?'triangle':'sine';osc.frequency.setValueAtTime(hz,t);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(kind==='stitch'?.028:.065,t+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+length);osc.connect(gain);gain.connect(context.destination);voices.add(osc);osc.onended=()=>{voices.delete(osc);osc.disconnect();gain.disconnect();};osc.start(t);osc.stop(t+length+.02);}}
 return{set,unlock,play,stop};
}
return{create,tunes};
});
