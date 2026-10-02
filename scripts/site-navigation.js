const fs=require('node:fs'),path=require('node:path');
const links=[['collection/','Collection'],['wedding-dresses-lesotho/','Wedding dresses'],['catalogue.html','Catalogue'],['style-studio/','Style Studio'],['games/','Games'],['client-stories/','Client stories'],['about/','The Atelier'],['designer/','Meet Jane.M'],['booking/','Book a consultation']];
function header(prefix,route){return `<header class="site-header jm-navigation" id="top"><div class="jm-nav-inner"><a class="jm-brand" href="${prefix}index.html" aria-label="Jane.M home"><img src="${prefix}assets/logo-transparent.png" width="1055" height="1491" alt="Jane.M Atelier logo"></a><button type="button" class="jm-nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu <span aria-hidden="true">☰</span></button><nav class="site-nav jm-nav-links" id="site-nav" aria-label="Primary navigation">${links.map(([href,label])=>`<a href="${prefix}${href}"${route===('/'+href)||href==='style-studio/'&&route.startsWith('/style-studio/')||href==='games/'&&['/daily-style/','/atelier-dash/','/pattern-drop/'].includes(route)?' aria-current="page"':''}${href==='booking/'?' class="nav-cta"':''}>${label}</a>`).join('')}</nav></div></header>`;}
function apply(site,routes){for(const route of [...new Set([...routes,'/404.html'])]){const file=route==='/'?'index.html':route.slice(1)+(route.endsWith('/')?'index.html':'');const target=path.join(site,file);let html=fs.readFileSync(target,'utf8');const prefix='../'.repeat(file.split('/').length-1);const nav=header(prefix,route);
 if(/<header\b[\s\S]*?<\/header>/.test(html))html=html.replace(/<header\b[\s\S]*?<\/header>/,nav);else html=html.replace(/<body[^>]*>/,'$&'+nav);
 if(!html.includes('site-navigation.css'))html=html.replace('</head>',`<link rel="stylesheet" href="${prefix}site-navigation.css?v=1"></head>`);
 if(!html.includes('site-navigation.js'))html=html.replace('</body>',`<script src="${prefix}site-navigation.js?v=1"></script></body>`);
 if(!html.includes('theme.js'))html=html.replace('</head>',`<script src="${prefix}theme.js"></script></head>`);
 fs.writeFileSync(target,html);
}}
module.exports={apply,links};
