/* Carry only validated game selections into a real consultation. No personal data. */
(function(root){
'use strict';
function read(search,core){
 const params=new URLSearchParams(search);if(params.get('from')!=='style-spark'||!core)return null;
 const date=params.get('spark_day');if(!Number.isFinite(core.dayNumber(date)))return null;
 const picks=core.selection(Object.fromEntries(core.slots.map(s=>[s,params.get('spark_'+s)])));
 if(Object.keys(picks).length!==4)return null;
 return {date,picks,description:core.challenge(date).title+' — '+core.slots.map(s=>core.pieces.find(p=>p.id===picks[s]).name).join(', ')};
}
root.JaneMSparkHandoff={read};
})(typeof globalThis!=='undefined'?globalThis:this);
