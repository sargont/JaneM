(function(root) {
  const shapes = {
    wrap:'<path d="M43 18 54 12h12l11 6 8 25-14 6 3 12 22 72H24l22-72 3-12-14-6z"/><path d="m47 18 20 31-20 12m24-41L53 51l21 10M46 62l28-1M52 67l-8 52" fill="none"/>',
    gown:'<path d="m47 13 10 6h6l10-6 5 25-11 19 11 42 18 35H24l18-35 11-42-11-19z"/><path d="m52 58 15 0m-9 6-12 63m17-63 12 63" fill="none"/>',
    lace:'<path d="m43 16 13-5h8l13 5 15 29-16 9-7-10-2 15 25 67H28l25-67-2-15-7 10-16-9z"/><path d="M50 58h20M44 79h33M35 108h50" fill="none"/><g fill="none" opacity=".5"><circle cx="55" cy="31" r="5"/><circle cx="65" cy="42" r="5"/><circle cx="54" cy="50" r="4"/><circle cx="48" cy="95" r="5"/><circle cx="67" cy="88" r="5"/><circle cx="71" cy="115" r="5"/></g>',
    print:'<path d="m44 15 12-4h8l12 4 9 22-14 9-3 13 23 67H29l23-67-3-13-14-9z"/><g fill="#e6d7c0" stroke="#e6d7c0" stroke-width="1.2"><path d="m55 27 5-5 5 5-5 5zm-7 48 6-6 6 6-6 6zm13 21 6-6 6 6-6 6zm-20 20 6-6 6 6-6 6zm26-48 5-5 5 5-5 5z"/></g>',
    jumpsuit:'<path d="m43 15 12-4h10l12 4 12 30-15 5-5-12 1 26 10 67H63l-3-49-3 49H40l10-67 1-26-5 12-15-5z"/><path d="m53 17 7 15 7-15M50 63h20m-10-31v30" fill="none"/>',
    heel:'<path d="M20 80q17 2 30-29l10 11 15 34 27 9q8 5-2 12H30q-15-7-10-37z"/><path d="m27 116 4 21h8l4-20M54 71l15 32m-27 5h48" fill="none"/>',
    flat:'<path d="M18 86q19 12 31-5q7-12 14-11q13 24 35 33q14 16-7 20H32q-20-7-14-37z"/><path d="M19 107q22 15 79 8M50 92l14 5m-7-10v14" fill="none"/>',
    trainer:'<path d="m21 68 23 7 18-8 13 26 25 12q9 6 5 20H23q-11-8-2-57z"/><path d="M22 113h81M49 84l15 0m-11 8h17m-12 7h19" fill="none"/>',
    knit:'<path d="m39 23 15-8h12l15 8 18 57-16 5-9-33 3 78H43l3-78-9 33-16-5z"/><path d="m53 19 7 25 7-25m-7 25v83m-11-38h-4m21 0h7" fill="none"/><g fill="#756451"><circle cx="62" cy="58" r="1.4"/><circle cx="62" cy="72" r="1.4"/><circle cx="62" cy="86" r="1.4"/></g>',
    blazer:'<path d="m40 21 15-7h10l15 7 19 62-17 5-9-34 4 66H43l4-66-9 34-17-5z"/><path d="m54 17-7 25 13 16 13-16-7-25m-6 42v59m-12-31h7m11 0h8" fill="none"/>',
    coat:'<path d="m40 17 15-7h10l15 7 17 65-16 5-9-35 7 83H41l7-83-9 35-16-5z"/><path d="m53 15-7 25 14 17 14-17-7-25m-7 42v73M43 74h33" fill="none"/>',
    shawl:'<path d="M20 41q40-38 80 0l-13 58-17-17-10 52-13-52-15 17z" opacity=".7"/><path d="M23 42q38 9 74 0M40 42l19 74m21-74-20 74" fill="none"/>',
    cuff:'<path d="M35 48q26-13 51 2l-7 60q-24 11-48-2z"/><path d="M35 48q23 16 51 2M31 108q19-17 48 2m-41-44-3 29m43-30-3 28" fill="none"/>',
    earrings:'<g><circle cx="36" cy="60" r="8"/><ellipse cx="36" cy="89" rx="14" ry="18"/><circle cx="84" cy="60" r="8"/><ellipse cx="84" cy="89" rx="14" ry="18"/></g>',
    scarf:'<path d="m23 29 57-9 16 20-33 42 23 49-28 5-15-48-13 36-15-10 22-63z"/><path d="m34 35 41 5-23 37m7-35-6 29m9 36 10 20" fill="none"/>',
    bag:'<rect x="18" y="58" width="84" height="49" rx="5"/><path d="m20 62 40 25 40-25" fill="none"/><rect x="55" y="80" width="10" height="9" fill="#bd9451"/>'
  };
  function svg(piece) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" aria-hidden="true" focusable="false"><g fill="${piece.colour}" stroke="#776858" stroke-width="1.5" stroke-linejoin="round">${shapes[piece.shape]||shapes.gown}</g></svg>`; }
  root.JaneMDailyArt={svg};
})(typeof globalThis !== 'undefined'?globalThis:this);
