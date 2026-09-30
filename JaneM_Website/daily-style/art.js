/* Self-contained fashion illustrations: the same artwork is used in the game and saved cards. */
(function(root) {
  'use strict';
  let serial=0;
  const outlines={
    wrap:'M42 18 53 13 60 23 67 13 78 18 90 43 77 50 72 40 69 60Q77 91 92 126Q65 143 27 128L49 61 47 40 41 50 28 43Z',
    gown:'M47 15 52 15 54 28Q60 34 66 28L68 15 73 15 77 37Q76 49 68 58Q71 83 79 103L93 136Q60 143 27 136L41 103Q49 83 52 58Q44 49 43 37Z',
    column:'M47 15 52 15 53 29Q60 35 67 29L68 15 73 15 77 37Q74 51 68 59L76 136 62 138 58 107 53 138 41 136 52 59Q46 51 43 37Z',
    lace:'M42 19 51 13Q60 20 69 13L78 19 88 45 76 51 71 39 68 60Q78 94 86 123Q60 134 34 123L52 60 49 39 44 51 32 45Z',
    print:'M43 17 51 13 55 28 65 28 69 13 77 17 84 39 73 45 69 59 89 126Q60 136 31 126L51 59 47 45 36 39Z',
    jumpsuit:'M43 18 53 13 60 27 67 13 77 18 88 44 75 49 71 38 69 60 78 134 62 135 59 82 56 135 39 134 51 60 49 38 45 49 32 44Z',
    knit:'M40 23 53 16Q60 21 67 16L80 23 97 83 82 88 72 51 75 126Q60 131 45 126L48 51 38 88 23 83Z',
    blazer:'M40 24 53 16 67 16 80 24 96 86 81 90 72 51 77 122 62 125 58 120 43 122 48 51 39 90 24 86Z',
    coat:'M40 19 53 12 67 12 80 19 96 82 81 87 72 51 80 137 61 138 57 133 40 137 48 51 39 87 24 82Z',
    shawl:'M21 37Q60 16 99 37L91 103 71 88 63 136 48 87 28 107Z',
    heel:'M19 81Q26 85 41 77L57 54 67 63 75 95Q82 101 99 105Q108 112 101 117L53 118Q43 115 34 106L29 116 20 112Z',
    flat:'M18 88Q30 97 46 79Q52 68 60 76Q64 90 93 100Q113 108 103 119Q96 127 65 121L31 118Q13 114 18 88Z',
    trainer:'M20 70 35 79 56 67 66 75 74 94 100 104Q111 109 104 124L25 124Q16 119 18 107Z',
    cuff:'M31 48Q59 31 89 48L84 105Q59 122 32 106Z',
    scarf:'M27 22 77 18 94 35 66 76 88 131 58 138 43 88 29 123 14 116 38 51Z',
    bag:'M21 59Q21 54 27 54H94Q100 54 100 61L97 106Q96 112 90 112H27Q21 112 20 105Z'
  };
  const seams={
    wrap:'M52 16 68 52 50 61M70 17 55 49 69 60M48 61Q61 65 71 60M53 69Q46 97 36 124M65 70Q68 104 79 128M68 62Q83 67 84 84M69 63Q66 85 73 97',
    gown:'M53 32Q60 36 67 32M52 58Q60 62 68 58M56 63Q56 102 42 133M64 63Q64 103 80 135M60 78V138',
    column:'M53 32Q60 36 67 32M52 59Q60 61 68 59M56 64 48 132M64 65 69 132M58 107 62 138',
    lace:'M51 17Q60 24 69 17M51 58Q60 62 69 58M52 64 41 121M60 64V128M68 64 80 122',
    print:'M53 31Q60 36 67 31M51 59Q60 63 69 59M54 66 41 126M60 66V130M66 66 79 126',
    jumpsuit:'M53 16 60 34 67 16M60 34V59M50 61H70M54 67 47 130M64 67 69 130M59 82 61 64M45 74 52 71M74 74 68 71',
    knit:'M53 19Q53 38 58 47L57 128M67 19Q67 38 62 47L63 128M47 93H54V108H46M67 93H73V108H67M26 80 38 85M82 85 94 80M46 121H56M65 121H73',
    blazer:'M53 18 48 40 54 42 51 48 60 66 72 44 65 41 69 34 67 18M60 66 58 120M46 91 55 90M65 90 75 92M72 57 75 88',
    coat:'M53 15 46 38 55 44 51 49 62 66 74 44 66 38 68 27 67 15M62 66 60 135M43 76Q60 81 76 76M45 96 53 92M67 92 75 96',
    shawl:'M24 39Q60 54 96 39M31 40Q37 66 32 98M43 44 61 127M77 45 65 121M87 40 87 96',
    heel:'M22 83Q38 89 56 62M60 62 72 97M35 105Q57 116 100 111',
    flat:'M20 91Q34 105 53 82Q60 99 79 102M20 111Q48 120 96 117M52 96l11 5m-9 0 9-5',
    trainer:'M23 75 25 106M30 81 42 94 62 86M48 78 62 82M52 85 66 89M56 93 71 97M23 111Q62 114 104 110M38 105 52 103M86 100 84 110',
    cuff:'M33 48Q61 62 87 48M33 104Q58 89 84 105M39 61 39 98M80 60 77 95',
    scarf:'M28 25 76 24 86 35 57 76 78 130M40 52 52 80 30 116M42 30 65 37 50 66',
    bag:'M23 60 59 85 98 60M25 103H92M28 62V99M92 63V99'
  };
  function svg(p) {
    const id='jm-art-'+(++serial), shape=p.id==='navy-column'?'column':p.shape;
    const line='#2e211d', body=outlines[shape];
    const texture=shape==='lace'?'lace':shape==='print'||shape==='scarf'?'print':shape==='knit'?'knit':null;
    const defs=`<defs>
      <linearGradient id="${id}-fabric" x1="0" y1="0" x2="1" y2=".35"><stop stop-color="${p.colour}"/><stop offset=".22" stop-color="${p.colour}"/><stop offset=".4" stop-color="#fff" stop-opacity=".5"/><stop offset=".52" stop-color="${p.colour}"/><stop offset=".77" stop-color="#19121c" stop-opacity=".65"/><stop offset="1" stop-color="${p.colour}"/></linearGradient>
      <linearGradient id="${id}-light" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity=".06"/><stop offset=".36" stop-color="#fff" stop-opacity=".05"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>
      <radialGradient id="${id}-pearl" cx=".3" cy=".25" r=".75"><stop stop-color="#fff"/><stop offset=".45" stop-color="#fff4df"/><stop offset=".8" stop-color="#c9bda8"/><stop offset="1" stop-color="#897d69"/></radialGradient>
      <radialGradient id="${id}-shadow"><stop stop-color="#241915" stop-opacity=".19"/><stop offset="1" stop-color="#241915" stop-opacity="0"/></radialGradient>
      <pattern id="${id}-lace" width="12" height="12" patternUnits="userSpaceOnUse"><g stroke="#a48b69" stroke-width=".5" fill="none" opacity=".65"><path d="M6 1Q12 6 6 11Q0 6 6 1ZM1 6H11M6 1V11"/><circle cx="6" cy="6" r="2"/></g></pattern>
      <pattern id="${id}-print" width="16" height="19" patternUnits="userSpaceOnUse"><g fill="none" stroke="#f5dba9" stroke-width=".65"><path d="M8 2 13 9 8 16 3 9ZM8 6 10 9 8 12 6 9Z"/><circle cx="0" cy="0" r="2"/><circle cx="16" cy="19" r="2"/></g></pattern>
      <pattern id="${id}-knit" width="3" height="4" patternUnits="userSpaceOnUse"><path d="m0 0 1.5 3L3 0" stroke="#9a8565" stroke-opacity=".24" stroke-width=".55" fill="none"/></pattern>
    </defs>`;
    let content;
    if(shape==='earrings')content=[38,82].map(x=>`<circle cx="${x}" cy="63" r="4" fill="#c09b5d"/><path d="M${x} 65v10" stroke="#b38a45" stroke-width="2"/><circle cx="${x}" cy="85" r="12" fill="url(#${id}-pearl)" stroke="#aa9472" stroke-width=".45"/><circle cx="${x-3}" cy="81" r="2.5" fill="#fff" opacity=".6"/>`).join('');
    else content=`${shape==='heel'?`<path d="M21 108h${p.id==='navy-pumps'?'8l-2 27h-3':'17l-4 27H23'}Z" fill="${p.colour}" stroke="${line}" stroke-width=".6"/>`:''}<path d="${body}" fill="${p.colour}"/><path d="${body}" fill="url(#${id}-fabric)" opacity="${['cuff','gown','heel'].includes(shape)?'.14':'.06'}"/>${texture?`<path d="${body}" fill="url(#${id}-${texture})"/>`:''}<path d="${body}" fill="url(#${id}-light)" stroke="${line}" stroke-opacity="1" stroke-width="1.6"/><path d="${seams[shape]||''}" fill="none" stroke="${['knit','lace'].includes(shape)?'#9a8565':'#241d22'}" stroke-opacity=".7" stroke-width=".9" stroke-linecap="round"/>${['blazer','coat','knit'].includes(shape)?[70,83,96].map(y=>`<circle cx="61" cy="${y}" r="1.3" fill="#c4a36d"/>`).join(''):''}${shape==='bag'?'<rect x="55" y="79" width="10" height="7" rx="1" fill="#c4a36d"/><path d="M57 82h6" stroke="#fff0cd" stroke-width=".7"/>':''}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" aria-hidden="true" focusable="false">${defs}<ellipse cx="60" cy="141" rx="41" ry="5" fill="url(#${id}-shadow)"/><g stroke-linejoin="round">${content}</g></svg>`;
  }
  root.JaneMDailyArt={svg};
})(typeof globalThis!=='undefined'?globalThis:this);
