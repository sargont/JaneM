(function (root) {
  const stages = ['Intake', 'Cutting', 'Sewing', 'Fitting', 'Finishing', 'Quality check', 'Ready', 'Collected'];
  const today = () => new Date().toLocaleDateString('en-CA', {timeZone: 'Africa/Johannesburg'});
  const active = j => j.stage !== 'Collected' && !j.archivedAt && !j.deletedAt;
  function risk(j, date = today()) {
    if(j.deletedAt)return 'In trash';if(j.archivedAt)return 'Archived';if (!active(j)) return 'Complete';
    if (j.due < date) return 'Overdue';
    if (j.blocker) return 'Blocked';
    if (j.due <= new Date(Date.parse(date + 'T12:00:00Z') + 2 * 86400000).toISOString().slice(0, 10)) return 'Due soon';
    return 'On track';
  }
  function load(jobs, name, date) {
    return jobs.filter(active).flatMap(j => j.tasks).filter(t => !t.done && t.owner === name && t.date === date).reduce((n, t) => n + Number(t.hours), 0);
  }
  function rank(j, date = today()) {
    return ({Overdue: 0, Blocked: 1, 'Due soon': 2, 'On track': 3, Complete: 4, Archived:5, 'In trash':6}[risk(j, date)]) * 10 + ({Urgent: 0, High: 1, Normal: 2}[j.priority] || 0);
  }
  const skills = ['Measurements', 'Pattern making', 'Cutting', 'Sewing', 'Fitting', 'Alterations', 'Finishing', 'Quality check'];
  function normalizeSkills(value) {
    return (Array.isArray(value) ? value : String(value || '').split(',')).map(s => s.trim()).filter(Boolean).map(s => skills.find(k => k.toLowerCase() === s.toLowerCase()) || s);
  }
  function parseMessage(text) {
    const result = {brief: text, source: text, priority: 'Normal', deposit: 'Pending', stage: 'Intake', quantity: 1, tasks: []};
    // Only explicitly labelled fields are extracted; conversation dates are never delivery promises.
    const map = {customer:'customer',name:'customer',contact:'contact',phone:'contact',garment:'garment',job:'garment',materials:'materials',measurements:'measurements',notes:'notes'};
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([a-z ]+):\s*(.+)$/i); if (!m) continue;
      const label=m[1].trim().toLowerCase(), value=m[2].trim();
      if(map[label]) result[map[label]]=value;
      if(['due','delivery','event'].includes(label) && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value) result[label==='event'?'event':'due']=value;
      if(label==='quantity' && /^\d+$/.test(value) && +value>0 && +value<=100) result.quantity=+value;
    }
    return result;
  }
  function cents(value) {
    if (!/^\d+(\.\d{1,2})?$/.test(String(value))) throw new Error('Enter a positive amount with at most two decimal places.');
    const [whole, fraction=''] = String(value).split('.');
    const amount=Number(whole)*100+Number(fraction.padEnd(2,'0'));
    if(!Number.isSafeInteger(amount)||amount>100000000000) throw new Error('Amount is too large.');
    return amount;
  }
  function finance(j) {
    const paid=(j.payments||[]).reduce((n,p)=>n+p.amount,0), priced=Number.isSafeInteger(j.priceCents);
    return {paid, value:priced?j.priceCents:0, balance:priced?Math.max(0,j.priceCents-paid):0, status:!priced?'Price needed':paid===j.priceCents?'Fully paid':paid===0?'Unpaid':paid<j.priceCents?'Partially paid':'Overpaid'};
  }
  function receipt(j,p){
    const index=(j.payments||[]).findIndex(x=>x.id===p.id);
    const received=(j.payments||[]).slice(0,index+1).reduce((n,x)=>n+x.amount,0);
    const total=Number.isSafeInteger(p.jobTotalCents)?p.jobTotalCents:j.priceCents;
    const fmt=n=>'LSL '+(n/100).toFixed(2);
    return ['*KimaD — Payment receipt*','Receipt: '+p.id,'Job: '+j.id,'Customer: '+j.customer,'Garment: '+j.garment,'Payment date: '+p.date,'Received: '+fmt(p.amount),'Method: '+p.method,...(p.reference?['Reference: '+p.reference]:[]),'Job total: '+fmt(total),'Total paid after this payment: '+fmt(received),'Balance after this payment: '+fmt(Math.max(0,total-received)),received>=total?'Status: Fully paid':'Status: Partially paid','Thank you for choosing KimaD.'].join('\n');
  }
  const api = {receipt, cents, finance, stages, today, active, risk, load, rank, skills, normalizeSkills, parseMessage};
  if (typeof module !== 'undefined') module.exports = api;
  else root.Workflow = api;
})(typeof window !== 'undefined' ? window : globalThis);
