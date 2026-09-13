(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.JaneMDaily = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const colours = { Black:'#242322', Cream:'#eee3cf', White:'#faf8f1', Navy:'#303f56', Brown:'#7d543e', Grey:'#8b8b8a', Blue:'#6c8fa9', Green:'#64765a', Burgundy:'#7c3547', Pink:'#cc999c', Gold:'#b58c45', Other:'#b9a398' };
  const categories = ['Top','Bottom','Dress','Layer','Shoes','Bag'];
  const defaults = { occasion:'Work', mood:'Polished', weather:'Mild', footwear:'Flats', coverage:'Balanced', anchor:'' };
  const clean = value => String(value || '').trim().slice(0, 80);
  function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function preferences(raw = {}) {
    const options = { occasion:['Work','Campus','Errands','Lunch','Evening out','Weekend'], mood:['Polished','Relaxed','Expressive'], weather:['Mild','Warm','Cold'], footwear:['Flats','Any'], coverage:['Balanced','More coverage'] };
    const safe = { ...defaults, anchor:clean(raw.anchor) };
    Object.entries(options).forEach(([key, values]) => { if (values.includes(raw[key])) safe[key] = raw[key]; });
    return safe;
  }
  function wardrobeItem(raw) {
    if (!raw || !categories.includes(raw.category) || !clean(raw.name) || !clean(raw.id)) return null;
    return { id:clean(raw.id), name:clean(raw.name), category:raw.category, colour:Object.hasOwn(colours,raw.colour) ? raw.colour : 'Other', coverage:raw.coverage === 'More coverage' || raw.coverage === true, flat:raw.flat === true, warm:raw.warm === true, available:raw.available !== false };
  }
  function normalise(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const list = (value, limit) => Array.isArray(value) ? value.slice(0,limit) : [];
    const outfit = o => {
      if (!o || !Array.isArray(o.items) || !o.id) return null;
      const items = o.items.slice(0,6).map(i => i && ({id:clean(i.id),name:clean(i.name),category:categories.includes(i.category)?i.category:'Top',colour:Object.hasOwn(colours,i.colour)?i.colour:'Other',owned:i.owned===true})).filter(i=>i&&i.id&&i.name);
      return items.length ? { id:clean(o.id),title:clean(o.title),occasion:clean(o.occasion),items,reason:String(o.reason||'').slice(0,500), date:/^\d{4}-\d{2}-\d{2}$/.test(o.date)?o.date:'' } : null;
    };
    return {version:1, preferences:source.preferences?preferences(source.preferences):null, wardrobe:list(source.wardrobe,100).map(wardrobeItem).filter(Boolean), saved:list(source.saved,40).map(outfit).filter(Boolean), history:list(source.history,90).map(outfit).filter(Boolean), plans:list(source.plans,35).map(outfit).filter(o=>o&&o.date)};
  }
  function generate(rawPreferences, wardrobe = [], history = [], turn = 0) {
    const p = preferences(rawPreferences);
    const eligible = wardrobe.map(wardrobeItem).filter(i=>i && i.available && !(i.category==='Shoes' && p.footwear==='Flats' && !i.flat) && !(p.weather==='Warm' && i.warm) && !(p.weather==='Cold' && i.category==='Layer' && !i.warm) && !(p.coverage==='More coverage' && ['Top','Dress'].includes(i.category) && !i.coverage));
    const anchor = eligible.find(i=>i.id===p.anchor);
    const fallback = category => {
      const relaxed = p.mood==='Relaxed' || ['Campus','Errands','Weekend'].includes(p.occasion);
      const choices = {
        Top:[p.coverage==='More coverage'?'Long-sleeve cotton shirt':relaxed?'Cotton T-shirt':'Soft blouse',p.mood==='Expressive'?'Burgundy':'Cream'],
        Bottom:[relaxed?'Straight-leg jeans':'Tailored trousers',relaxed?'Blue':'Black'],
        Dress:[p.coverage==='More coverage'?'Long-sleeve midi dress':p.occasion==='Evening out'?'Simple evening midi dress':'Easy midi dress',p.mood==='Expressive'?'Green':'Navy'],
        Layer:[p.weather==='Cold'?'Warm coat':relaxed?'Light cardigan':'Light blazer',p.weather==='Cold'?'Brown':'Cream'],
        Shoes:[p.footwear==='Flats'?(relaxed?'Comfortable trainers':'Flat loafers'):'Comfortable dress shoes',relaxed?'White':'Black'],
        Bag:['Small everyday bag','Brown']
      };
      return {id:'idea-'+category,name:choices[category][0],category,colour:choices[category][1],owned:false};
    };
    function choose(category, offset, used) {
      if (anchor?.category===category) return {...anchor,owned:true};
      const pool=eligible.filter(i=>i.category===category);
      const recent = new Set(history.slice(0,3).flatMap(h=>h.items.map(i=>i.id)));
      pool.sort((a,b)=>(Number(recent.has(a.id))*2+Number(used.has(a.id)))-(Number(recent.has(b.id))*2+Number(used.has(b.id))));
      const fresh=pool.filter(i=>!recent.has(i.id)&&!used.has(i.id));
      const options=fresh.length?fresh:pool;
      return options.length?{...options[(turn+offset)%options.length],owned:true}:fallback(category);
    }
    const used=new Set();
    return [0,1].map(index=>{
      let base = index===0 ? ['Top','Bottom'] : ['Dress'];
      if (anchor?.category==='Dress') base=['Dress'];
      if (['Top','Bottom'].includes(anchor?.category)) base=['Top','Bottom'];
      const slots=[...base,...(p.weather==='Cold'||anchor?.category==='Layer'?['Layer']:[]),'Shoes','Bag'];
      const items=slots.map(category=>choose(category,index,used));
      items.forEach(i=>used.add(i.id));
      let hash=2166136261; for (const c of items.map(i=>[i.id,i.name,i.colour].join(':')).join('|')) hash=Math.imul(hash^c.charCodeAt(0),16777619); const id='outfit-'+(hash>>>0).toString(36);
      const title=index===0?(p.mood==='Expressive'?'A little colour, a clear silhouette':p.mood==='Relaxed'?'Comfort, thoughtfully put together':'Everyday, with polish'):'A different way to wear the day';
      const reason=`${p.weather==='Cold'?'A warm layer for a cold day. ':p.weather==='Warm'?'Keep fabrics light for warm weather. ':''}${p.footwear==='Flats'?'Flat shoes keep the day comfortable. ':''}${p.coverage==='More coverage'?'More coverage in your base outfit. ':''}${p.mood==='Expressive'?'Let one colour lead; keep accessories simple.':p.mood==='Relaxed'?'Keep the fit easy and the finishing simple.':'A clean silhouette with a considered finishing detail.'}`;
      return {id,title,occasion:p.occasion,items,reason};
    }).filter((o,index,all)=>all.findIndex(a=>a.id===o.id)===index);
  }
  return {colours,categories,defaults,preferences,wardrobeItem,normalise,generate,dateKey};
}));
