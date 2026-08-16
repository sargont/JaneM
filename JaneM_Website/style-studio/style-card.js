/* Jane.M Style Card: branded, privacy-safe visual profile for download and sharing. */
(function exposeStyleCard(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.JaneMStyleCard = api;
}(typeof window !== "undefined" ? window : globalThis, function styleCardFactory() {
  function escapeXml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" }[character]));
  }
  function split(value, limit) {
    return String(value ?? "").trim().match(new RegExp(`.{1,${limit}}(?:\\s|$)|.{1,${limit}}`, "g")) || [];
  }
  function buildStyleCardSvg({ recommendation, publicUrl }) {
    if (!recommendation?.profile || !recommendation?.palette?.colours) throw new Error("A completed Jane.M style direction is required to create a Style Card.");
    const descriptionLines = split(recommendation.summary, 48).slice(0, 3);
    const silhouetteLines = split(recommendation.silhouette, 47).slice(0, 2);
    const profileLines = split(recommendation.profile, 25).slice(0, 3);
    const swatches = recommendation.palette.colours.map(([, colour], index) => `<rect x="${112 + index * 86}" y="1034" width="68" height="68" rx="2" fill="${escapeXml(colour)}"/><rect x="${112 + index * 86}" y="1034" width="68" height="68" rx="2" fill="none" stroke="#f5eadc" stroke-opacity=".34"/>`).join("");
    const profileText = profileLines.map((line, index) => `<text x="112" y="${346 + index * 74}" class="title">${escapeXml(line.trim())}</text>`).join("");
    const summaryText = descriptionLines.map((line, index) => `<text x="112" y="${598 + index * 33}" fill="#f3e8da" class="body">${escapeXml(line.trim())}</text>`).join("");
    const silhouetteText = silhouetteLines.map((line, index) => `<text x="112" y="${786 + index * 31}" fill="#f3e8da" class="detail">${escapeXml(line.trim())}</text>`).join("");
    const displayUrl = String(publicUrl ?? "janem.ls/style-studio").replace(/^https?:\/\//, "");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-label="Jane.M Style Studio profile card"><style>.brand{font:italic 58px Georgia,'Times New Roman',serif}.location{font:700 13px Arial,sans-serif;letter-spacing:5px}.eyebrow{font:700 17px Arial,sans-serif;letter-spacing:5px}.title{font:600 72px Georgia,'Times New Roman',serif}.body{font:400 25px Arial,sans-serif}.detail{font:500 24px Arial,sans-serif}.small{font:700 15px Arial,sans-serif;letter-spacing:2.5px}.footer{font:600 15px Arial,sans-serif;letter-spacing:1.2px}</style><rect width="1080" height="1350" fill="#15120f"/><rect x="72" y="72" width="936" height="1206" fill="none" stroke="#d9ad60" stroke-opacity=".55"/><path d="M1080 0H760C678 144 680 380 810 502c72 68 164 105 270 110Z" fill="#b38a45" opacity=".16"/><circle cx="900" cy="200" r="236" fill="none" stroke="#d9ad60" stroke-opacity=".45" stroke-width="2"/><text x="112" y="162" fill="#fff6eb" class="brand">Jane.M</text><text x="340" y="153" fill="#d9ad60" class="location">LESOTHO</text><path d="M112 191H968" stroke="#d9ad60" stroke-width="1" opacity=".7"/><text x="112" y="240" fill="#e0bd7d" class="eyebrow">JANE.M STYLE STUDIO</text>${profileText}<text x="112" y="${profileLines.length > 1 ? 570 : 495}" fill="#d9cfc5" class="small">YOUR PERSONAL STYLE DIRECTION</text>${summaryText}<path d="M112 706H968" stroke="#d9ad60" stroke-width="1" opacity=".6"/><text x="112" y="750" fill="#e0bd7d" class="small">SILHOUETTE</text>${silhouetteText}<path d="M112 882H968" stroke="#d9ad60" stroke-width="1" opacity=".6"/><text x="112" y="930" fill="#e0bd7d" class="small">COLOUR STORY - ${escapeXml(String(recommendation.palette.name).toUpperCase())}</text>${swatches}<path d="M112 1162H968" stroke="#d9ad60" stroke-width="1" opacity=".6"/><text x="112" y="1210" fill="#f3e8da" class="footer">JANE.M LESOTHO  |  MASERU  |  WHATSAPP +266 6279 0946</text><text x="112" y="1242" fill="#d9ad60" class="footer">officialjanem@gmail.com  |  ${escapeXml(displayUrl)}</text></svg>`;
  }
  return { buildStyleCardSvg };
}));
