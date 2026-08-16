/* Jane.M Style Brief PDF: an editorial, selectable-text consultation document. */
(function exposeStyleBriefPdf(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.JaneMStyleBriefPdf = api;
}(typeof window !== "undefined" ? window : globalThis, function styleBriefPdfFactory() {
  const PAGE = { width: 595, height: 842, left: 54, right: 541, contentTop: 750, contentBottom: 106, footerTop: 76 };
  const PAPER = "0.984 0.965 0.925";
  const SOFT_GOLD = "0.96 0.91 0.82";
  const GOLD = "0.70 0.54 0.27";
  const GOLD_DARK = "0.52 0.35 0.13";
  const INK = "0.10 0.08 0.06";
  const MUTED = "0.38 0.33 0.28";
  const BURGUNDY = "0.24 0.065 0.11";
  const WHITE = "1 0.985 0.955";

  function plain(value) {
    return String(value ?? "")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[^\x20-\x7E]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function escapePdf(value) { return plain(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)"); }
  function wrap(value, characters = 76) {
    const words = plain(value).split(" ").filter(Boolean);
    const lines = []; let line = "";
    words.forEach(word => {
      if (!line) { line = word; return; }
      if ((line + " " + word).length <= characters) line += ` ${word}`;
      else { lines.push(line); line = word; }
    });
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }
  function chunk(values, size) {
    const result = [];
    for (let index = 0; index < values.length; index += size) result.push(values.slice(index, index + size));
    return result.length ? result : [[""]];
  }
  function objectEntries(values) { return Object.entries(values || {}).filter(([, value]) => plain(value) && plain(value) !== "Not specified"); }
  function readableDate(value) {
    const date = value ? new Date(value) : new Date();
    return Number.isNaN(date.valueOf()) ? "Created in Style Studio" : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  function buildStyleBriefPdf(brief, business = {}) {
    if (!brief?.reference || !brief?.profile) throw new Error("A completed Jane.M Style Brief is required before creating a PDF.");
    const pages = [];
    let page; let y;
    const rawText = (value, x, baseline, { font = "F1", size = 9, colour = INK } = {}) => {
      page.push(`BT /${font} ${size} Tf ${colour} rg ${x} ${baseline} Td (${escapePdf(value)}) Tj ET`);
    };
    const fillRect = (x, baseline, width, height, colour) => page.push(`q ${colour} rg ${x} ${baseline} ${width} ${height} re f Q`);
    const strokeRect = (x, baseline, width, height, colour, lineWidth = 0.6) => page.push(`q ${colour} RG ${lineWidth} w ${x} ${baseline} ${width} ${height} re S Q`);
    const line = (x1, y1, x2, y2, colour, lineWidth = 0.6) => page.push(`q ${colour} RG ${lineWidth} w ${x1} ${y1} m ${x2} ${y2} l S Q`);
    const circle = (x, baseline, radius, colour, filled = false) => {
      const k = radius * 0.55228475;
      const path = `${x + radius} ${baseline} m ${x + radius} ${baseline + k} ${x + k} ${baseline + radius} ${x} ${baseline + radius} c ${x - k} ${baseline + radius} ${x - radius} ${baseline + k} ${x - radius} ${baseline} c ${x - radius} ${baseline - k} ${x - k} ${baseline - radius} ${x} ${baseline - radius} c ${x + k} ${baseline - radius} ${x + radius} ${baseline - k} ${x + radius} ${baseline} c`;
      page.push(filled ? `q ${colour} rg ${path} f Q` : `q ${colour} RG 0.8 w ${path} S Q`);
    };
    const startPage = () => {
      page = [];
      pages.push(page);
      fillRect(0, 0, PAGE.width, PAGE.height, PAPER);
      fillRect(0, 790, PAGE.width, 52, BURGUNDY);
      fillRect(0, 788, PAGE.width, 2, GOLD);
      rawText("Jane.M", PAGE.left, 808, { font: "F3", size: 22, colour: WHITE });
      rawText("LESOTHO", 113, 805, { font: "F2", size: 6.8, colour: GOLD });
      rawText("PRIVATE CONSULTATION BRIEF", 365, 805, { font: "F2", size: 6.4, colour: WHITE });
      y = PAGE.contentTop;
    };
    const ensureSpace = height => { if (y - height < PAGE.contentBottom) startPage(); };
    const textBlock = (value, { x = PAGE.left, font = "F1", size = 9.4, colour = INK, leading = 13, characters = 76, after = 0 } = {}) => {
      const lines = wrap(value, characters);
      ensureSpace(lines.length * leading + after);
      lines.forEach(valueLine => { rawText(valueLine, x, y, { font, size, colour }); y -= leading; });
      y -= after;
    };
    const title = value => {
      const lines = wrap(value, 31);
      ensureSpace(lines.length * 29 + 20);
      lines.forEach(valueLine => { rawText(valueLine, PAGE.left, y, { font: "F2", size: 27, colour: BURGUNDY }); y -= 29; });
      y -= 10;
    };
    const sectionHeading = (value, index, openingContentHeight = 0) => {
      const pageCount = pages.length;
      ensureSpace(76 + openingContentHeight);
      circle(PAGE.left + 10, y - 7, 10, GOLD, true);
      rawText(String(index).padStart(2, "0"), PAGE.left + 4.4, y - 9.5, { font: "F2", size: 6.5, colour: INK });
      rawText(value.toUpperCase(), PAGE.left + 28, y - 10, { font: "F2", size: 10.2, colour: BURGUNDY });
      line(PAGE.left + 28, y - 21, PAGE.right, y - 21, GOLD, 0.6);
      y -= 37;
      return pages.length > pageCount;
    };
    const pairList = values => objectEntries(values).forEach(([label, value], rowIndex) => {
      const labelLines = wrap(label.toUpperCase(), 20);
      const valueChunks = chunk(wrap(value, 54), 18);
      valueChunks.forEach((valueLines, chunkIndex) => {
        const continued = chunkIndex > 0;
        const displayedLabel = continued ? [...labelLines, "CONTINUED"] : labelLines;
        const rowHeight = Math.max(displayedLabel.length * 8.4, valueLines.length * 11.5) + 15;
        ensureSpace(rowHeight + 2);
        if ((rowIndex + chunkIndex) % 2 === 0) fillRect(PAGE.left, y - rowHeight + 4, PAGE.right - PAGE.left, rowHeight, SOFT_GOLD);
        strokeRect(PAGE.left, y - rowHeight + 4, PAGE.right - PAGE.left, rowHeight, "0.88 0.82 0.72", 0.35);
        displayedLabel.forEach((labelLine, labelIndex) => rawText(labelLine, PAGE.left + 12, y - 13 - labelIndex * 8.4, { font: "F2", size: 6.5, colour: GOLD_DARK }));
        valueLines.forEach((valueLine, valueIndex) => rawText(valueLine, PAGE.left + 147, y - 14 - valueIndex * 11.5, { font: "F1", size: 8.9, colour: INK }));
        y -= rowHeight + 5;
      });
    });
    const note = (titleText, value) => {
      const lines = wrap(value, 70);
      const height = lines.length * 12 + 28;
      ensureSpace(height + 10);
      fillRect(PAGE.left, y - height + 4, PAGE.right - PAGE.left, height, BURGUNDY);
      fillRect(PAGE.left, y - height + 4, 4, height, GOLD);
      rawText(titleText.toUpperCase(), PAGE.left + 16, y - 16, { font: "F2", size: 7.2, colour: GOLD });
      lines.forEach((valueLine, index) => rawText(valueLine, PAGE.left + 16, y - 31 - index * 12, { font: "F1", size: 8.7, colour: WHITE }));
      y -= height + 13;
    };
    const footer = (pageData, index) => {
      page = pageData;
      line(PAGE.left, PAGE.footerTop, PAGE.right, PAGE.footerTop, GOLD, 0.65);
      rawText("Jane.M", PAGE.left, 51, { font: "F3", size: 14, colour: BURGUNDY });
      rawText("LESOTHO", 102, 49, { font: "F2", size: 5.8, colour: GOLD_DARK });
      rawText("Maseru, Lesotho  |  WhatsApp +266 6279 0946  |  officialjanem@gmail.com", 157, 50, { font: "F1", size: 6.2, colour: MUTED });
      rawText(`STYLE BRIEF  |  ${brief.reference}  |  ${index + 1} / ${pages.length}`, PAGE.left, 32, { font: "F2", size: 6.2, colour: GOLD_DARK });
      rawText("Private consultation document - final design and measurements are confirmed at fitting.", 233, 32, { font: "F1", size: 5.9, colour: MUTED });
    };
    const closingTreatment = () => {
      y -= 48;
      line(PAGE.left, y, PAGE.right, y, GOLD, 0.7);
      rawText("YOUR DIRECTION", PAGE.left, y - 39, { font: "F2", size: 12, colour: GOLD_DARK });
      rawText("is ready.", PAGE.left, y - 83, { font: "F3", size: 32, colour: BURGUNDY });
      rawText("Jane.M will refine every final detail with you.", PAGE.left, y - 110, { font: "F1", size: 9.2, colour: MUTED });
      circle(451, y - 92, 78, GOLD, false);
      rawText("Jane.M", 405, y - 96, { font: "F3", size: 20, colour: BURGUNDY });
      rawText("MASERU", 424, y - 113, { font: "F2", size: 6.4, colour: GOLD_DARK });
      y -= 170;
    };

    startPage();
    rawText("JANE.M STYLE STUDIO", PAGE.left, y, { font: "F2", size: 8.4, colour: GOLD_DARK });
    y -= 25;
    title(brief.profile);
    rawText("YOUR PERSONAL STYLE DIRECTION", PAGE.left, y, { font: "F2", size: 8.7, colour: GOLD_DARK });
    y -= 20;
    textBlock(brief.summary, { font: "F1", size: 10.8, colour: INK, leading: 15, characters: 67, after: 14 });
    fillRect(PAGE.left, y - 35, PAGE.right - PAGE.left, 35, SOFT_GOLD);
    rawText(`REFERENCE  ${brief.reference}`, PAGE.left + 13, y - 14, { font: "F2", size: 7.5, colour: GOLD_DARK });
    rawText(`PREPARED  ${readableDate(brief.createdAt)}`, PAGE.left + 13, y - 26, { font: "F1", size: 7.3, colour: MUTED });
    y -= 53;

    sectionHeading("At a glance", 1);
    pairList(brief.clientPreferences);
    sectionHeading("Your style direction", 2);
    pairList(brief.styleRecommendation);
    if (objectEntries(brief.construction).length) {
      sectionHeading("Fabric and construction", 3);
      pairList(brief.construction);
    }
    sectionHeading("Measurements", 4);
    note("Fitting verification", "Client-provided measurements are a private starting point only. Jane.M verifies every final measurement before cutting or production.");
    pairList(brief.measurements);
    sectionHeading("Inspiration and collection", 5);
    const inspiration = brief.clientPreferences?.["Reference-photo status"] || "No personal reference image was included.";
    textBlock(inspiration, { size: 9.2, leading: 13, characters: 75, after: 10 });
    const suggestions = (brief.collectionSuggestions || []).map(item => item.name || item).filter(Boolean);
    textBlock(suggestions.length ? `Related Jane.M collection directions: ${suggestions.join(", ")}.` : "Jane.M will use your conversation and any reference you choose to share to refine this direction.", { font: "F2", size: 8.9, colour: BURGUNDY, leading: 13, characters: 75, after: 12 });
    sectionHeading("Next steps with Jane.M", 6);
    pairList(brief.atelierDecisions);
    const consultationBeganOnFreshPage = sectionHeading("Consultation note", 7, 100);
    note("A private starting point", brief.disclaimer || "Jane.M will refine the design, confirm availability and issue the final quotation during consultation.");
    textBlock(`Discuss this direction on WhatsApp: ${business.whatsApp || "+266 6279 0946"}`, { font: "F2", size: 9.2, colour: BURGUNDY, leading: 13, characters: 75 });
    if (consultationBeganOnFreshPage) closingTreatment();
    pages.forEach(footer);

    const objects = [];
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    const pageRefs = [];
    let id = 6;
    pages.forEach(content => {
      const contentId = id++; const pageId = id++;
      const stream = content.join("\n");
      objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
      objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.width} ${PAGE.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentId} 0 R >>`;
      pageRefs.push(`${pageId} 0 R`);
    });
    objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pageRefs.length} >>`;
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>";
    objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>";
    let output = "%PDF-1.4\n%JaneM\n";
    const offsets = [0];
    for (let objectId = 1; objectId < objects.length; objectId += 1) {
      if (!objects[objectId]) continue;
      offsets[objectId] = output.length;
      output += `${objectId} 0 obj\n${objects[objectId]}\nendobj\n`;
    }
    const xref = output.length;
    output += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let objectId = 1; objectId < objects.length; objectId += 1) output += `${String(offsets[objectId] || 0).padStart(10, "0")} 00000 n \n`;
    output += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return output;
  }

  function download(brief, business) {
    const pdf = buildStyleBriefPdf(brief, business);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `JaneM-${brief.reference}-Style-Brief.pdf`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return pdf;
  }

  return { buildStyleBriefPdf, download };
}));
