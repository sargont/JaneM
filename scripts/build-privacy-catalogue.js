const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourceDirectory = path.join(root, "private-assets/restricted-catalogue/catalogue-pages");
const outputDirectory = path.join(root, "JaneM_Website/assets/catalogue-pages");

// Manually reviewed face/head regions in the 720 × 1019 page renders: [x, y, width, height].
// Broad clothing, dress and layout areas are intentionally excluded.
const standardFaceBox = [280, 180, 180, 260];
const standardFacePages = [5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 30, 31, 32, 33, 34, 35, 36, 37, 38, 42];
const faceBoxes = Object.fromEntries(standardFacePages.map((page) => [page, [standardFaceBox]]));
Object.assign(faceBoxes, {
  1: [[45, 70, 130, 150], [285, 70, 130, 150], [530, 70, 130, 150]],
  27: [[145, 210, 130, 180], [420, 210, 130, 180]],
  41: [[115, 200, 130, 180], [455, 200, 130, 180]]
});

fs.mkdirSync(outputDirectory, { recursive: true });
for (let page = 1; page <= 49; page += 1) {
  const number = String(page).padStart(2, "0");
  const input = path.join(sourceDirectory, `page-${number}.jpg`);
  const output = path.join(outputDirectory, `page-${number}.jpg`);
  const boxes = faceBoxes[page] || [];
  if (!boxes.length) {
    fs.copyFileSync(input, output);
    continue;
  }
  const filters = boxes.flatMap((box, index) => {
    const [x, y, width, height] = box;
    const inputLabel = index === 0 ? "base" : `base${index}`;
    const outputLabel = index === boxes.length - 1 ? "out" : `base${index + 1}`;
    return index === 0
      ? [`[0:v]split=2[base][crop${index}]`, `[crop${index}]crop=${width}:${height}:${x}:${y},gblur=sigma=28[blur${index}]`, `[base][blur${index}]overlay=${x}:${y}[${outputLabel}]`]
      : [`[${inputLabel}]split=2[base${index}][crop${index}]`, `[crop${index}]crop=${width}:${height}:${x}:${y},gblur=sigma=28[blur${index}]`, `[base${index}][blur${index}]overlay=${x}:${y}[${outputLabel}]`];
  });
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", input, "-filter_complex", filters.join(";"), "-map", "[out]", "-q:v", "2", output]);
}
console.log("Built 49 face-only privacy derivatives.");
