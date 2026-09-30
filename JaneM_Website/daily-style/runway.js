/* A composed, exportable fashion figure. All four selections are placed on the figure. */
(function(root){
'use strict';
let serial=0;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function outfit(selection,{layerVisible=true}={}){
 const C=root.JaneMDaily,A=root.JaneMDailyArt;
 const selected=Object.fromEntries(C.slots.map(s=>[s,C.pieces.find(p=>p.id===selection[s]&&p.slot===s)]));
 if(Object.values(selected).some(p=>!p))return '';
 const {look,shoes,layer,finish}=selected,id='jm-figure-'+(++serial);
 const group=(slot,content)=>`<g data-outfit-part="${slot}" data-piece="${selected[slot].id}">${content}</g>`;
 const dress=A.svg(look).replace(/<svg[^>]*>/,'').replace('</svg>','').replace(/<ellipse cx="60" cy="141"[^>]*\/>/,'');
 const jacket=layer.shape==='shawl'
 ?'M108 139Q160 159 212 139L231 218 213 240 200 164Q160 180 120 164L101 264 88 248Z'
 :`M117 133 145 120 151 154 143 ${layer.shape==='coat'?340:276} 110 ${layer.shape==='coat'?346:279} 119 186 104 292 85 287 97 171Q102 146 117 133ZM175 120 203 133Q218 145 223 171L235 287 216 292 201 186 210 ${layer.shape==='coat'?346:279} 177 ${layer.shape==='coat'?340:276} 169 154Z`;
 const jacketSeams=layer.shape==='knit'?'M145 127 147 156 139 270M175 127 173 156 181 270M117 245h20M183 245h20':layer.shape==='shawl'?'M106 149Q160 172 214 149M115 170 96 245M207 168 222 220':'M143 125 130 158 139 166 130 180 146 205M177 125 190 158 181 166 190 180 174 205M118 252l20-4M182 248l20 4';
 const feet=[{x:139,mirror:-1},{x:181,mirror:1}].map(({x,mirror})=>{
  const transform=`translate(${x} 484) scale(${mirror} 1)`;
  const heel=shoes.id==='navy-pumps'?'M-8 17h4v17h-3Z':shoes.id==='gold-heels'?'M-10 16h10v16h-9Z':'';
  const path=shoes.shape==='trainer'?'M-10 0 9 0 12 9 23 20Q26 26 17 27L-12 25Z':shoes.shape==='flat'?'M-10 5Q0 20 9 5L21 22Q24 29 15 29L-12 25Z':'M-10 2Q-1 20 8 6L22 25Q25 29 17 30L-12 21Z';
  return `<g transform="${transform}"><path d="${heel}" fill="${shoes.colour}" stroke="#554437" stroke-width=".7"/><path d="${path}" fill="${shoes.colour}" stroke="#554437" stroke-width=".8"/><path d="${path}" fill="url(#${id}-silk)"/>${shoes.shape==='trainer'?'<path d="m-5 9 13 2m-10 3 14 2m-11 3 12 1M-12 24l34 2" stroke="#97866e" fill="none" stroke-width="1.2"/>':shoes.shape==='flat'?'<path d="m-3 17 8 3m-7 1 7-4" stroke="#a48a64" fill="none"/>':'<path d="M-8 9 5 16" stroke="#dac393" stroke-width="1.5"/>'}</g>`;
 }).join('');
 let accessory;
 if(finish.shape==='earrings')accessory=[140,180].map(x=>`<circle cx="${x}" cy="85" r="2" fill="#bb9655"/><circle cx="${x}" cy="91" r="4.3" fill="url(#${id}-pearl)" stroke="#a68d65" stroke-width=".5"/>`).join('');
 if(finish.shape==='cuff')accessory='<path d="m87 280 16 4-3 14-16-4Z" fill="#bd9451" stroke="#987540"/><path d="m89 282 11 3-2 10-11-3" stroke="#f4dfad" fill="none"/>';
 if(finish.shape==='bag')accessory='<g transform="rotate(-9 220 308)"><rect x="194" y="295" width="54" height="30" rx="3" fill="#353232" stroke="#1e1714"/><path d="m196 298 25 15 25-15" fill="none" stroke="#716052"/><rect x="217" y="307" width="8" height="6" fill="#bd9451"/></g>';
 if(finish.shape==='scarf')accessory=`<path d="M146 114Q160 129 176 114L182 133 169 142 187 217 169 221 155 145 141 193 128 187 147 136 137 126Z" fill="${finish.colour}" stroke="#315b59"/><path d="M146 114Q160 129 176 114L182 133 169 142 187 217 169 221 155 145 141 193 128 187 147 136 137 126Z" fill="url(#${id}-print)"/>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 550" role="img" aria-label="${escape('Your outfit: '+C.slots.map(s=>selected[s].name).join(', ')+(layerVisible?'':'. Layer hidden for this view'))}">
 <defs><radialGradient id="${id}-skin" cx=".3" cy=".2" r=".9"><stop stop-color="#be8769"/><stop offset=".65" stop-color="#956347"/><stop offset="1" stop-color="#704b38"/></radialGradient><linearGradient id="${id}-silk"><stop stop-color="#fff" stop-opacity=".03"/><stop offset=".4" stop-color="#fff" stop-opacity=".2"/><stop offset=".8" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient><radialGradient id="${id}-pearl" cx=".3" cy=".25"><stop stop-color="#fff"/><stop offset="1" stop-color="#bcac8e"/></radialGradient><pattern id="${id}-print" width="12" height="14" patternUnits="userSpaceOnUse"><path d="m6 2 4 5-4 5-4-5Z" fill="none" stroke="#edcd93" stroke-width=".7"/></pattern><pattern id="${id}-knit" width="4" height="5" patternUnits="userSpaceOnUse"><path d="m0 0 2 4L4 0" fill="none" stroke="#a18a67" stroke-opacity=".3" stroke-width=".7"/></pattern></defs>
 <ellipse cx="160" cy="526" rx="71" ry="9" fill="#5c4730" opacity=".1"/>
 <g class="outfit-figure">
 <g data-outfit-part="figure"><path d="M146 295 139 484 131 503 149 504 163 320 174 484 169 503 189 504 180 295Z" fill="url(#${id}-skin)"/>
 <path d="M148 98 147 119 118 133Q107 135 102 154L86 239 83 291Q78 302 82 314L89 326 96 322 93 309 100 295 108 246 127 185 131 270Q160 288 189 270L193 185 212 246 220 295 227 309 224 322 231 326 238 314Q242 302 237 291L234 239 218 154Q213 135 202 133L173 119 172 98Z" fill="url(#${id}-skin)" stroke="#80553e" stroke-width=".65"/>
 <path d="M138 83Q122 51 147 44Q170 30 182 53Q194 73 180 103Z" fill="#292019"/><ellipse cx="161" cy="44" rx="18" ry="15" fill="#292019"/>
 <path d="M140 63Q159 70 178 61L181 81Q178 102 161 111Q143 104 139 82Z" fill="url(#${id}-skin)"/>
 <path d="M140 65Q151 69 165 52Q173 57 181 69" fill="#292019"/><path d="m145 81 8 1m14 0 8-1" stroke="#382a23" stroke-width="1.5" stroke-linecap="round"/><path d="m160 83-2 10 4 1" fill="none" stroke="#815139" stroke-width=".8"/><path d="M154 100q7 4 13-1" stroke="#673d38" fill="none" stroke-width="1.6"/>
 </g>
 ${group('shoes',feet)}
 ${group('look',`<g transform="translate(40 94) scale(2 2.4)">${dress}</g>`)}
 <g class="outfit-layer" ${layerVisible?'':'display="none"'}>${group('layer',`<path d="${jacket}" fill="${layer.colour}" stroke="#6e5b49" stroke-width=".8" ${layer.shape==='shawl'?'opacity=".8"':''}/><path d="${jacket}" fill="url(#${id}-silk)"/>${layer.shape==='knit'?`<path d="${jacket}" fill="url(#${id}-knit)"/>`:''}<path d="${jacketSeams}" fill="none" stroke="${layer.shape==='knit'?'#ad9472':'#dac6a4'}" stroke-width="1" stroke-opacity=".6"/>`)}</g>
 ${group('finish',accessory)}
 </g></svg>`;
}
root.JaneMRunway={outfit};
})(typeof globalThis!=='undefined'?globalThis:this);
