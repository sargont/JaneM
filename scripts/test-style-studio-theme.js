const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "../JaneM_Website/style-studio/studio.css"), "utf8");
const requiredTokens = [
  "--surface-primary", "--surface-secondary", "--surface-elevated", "--surface-accent",
  "--text-primary", "--text-secondary", "--text-muted", "--text-on-dark", "--text-on-gold",
  "--border-subtle", "--border-strong", "--accent-gold", "--accent-gold-readable", "--accent-green",
  "--button-primary-bg", "--button-primary-text", "--button-secondary-bg", "--button-secondary-text",
  "--input-bg", "--input-text", "--input-placeholder", "--input-border"
];
requiredTokens.forEach(token => assert.match(css, new RegExp(`${token}:`), `${token} must be defined as a semantic theme token`));
assert.match(css, /html\[data-theme="dark"\]\s*\{[\s\S]*--surface-primary:/, "dark mode must define its own semantic palette");
assert.match(css, /html\[data-theme="dark"\][\s\S]*\.result-panel--brand::before[\s\S]*mix-blend-mode:multiply/, "the logo panel needs a dedicated dark-mode treatment");
assert.match(css, /\.choice-card:has\(input:checked\)::after[\s\S]*content:"✓"/, "selected answer cards need an explicit visual indicator");

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .03928 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
}
function contrast(foreground, background) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + .05) / (dark + .05);
}

const darkPairs = [
  ["fff5ea", "15120f", "dark primary text"],
  ["ded0c0", "241d18", "dark secondary text"],
  ["fff8ef", "2a211b", "dark input text"],
  ["ffe4b5", "34271d", "dark validation text"],
  ["fff8ee", "155247", "premium panel text"]
];
darkPairs.forEach(([foreground, background, name]) => assert.ok(contrast(foreground, background) >= 4.5, `${name} must meet WCAG AA; received ${contrast(foreground, background).toFixed(2)}:1`));

console.log("Style Studio semantic theme and key dark-mode contrast tests passed.");
