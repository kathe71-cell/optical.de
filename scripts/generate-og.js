import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <radialGradient id="emeraldGlow" cx="200" cy="180" r="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Deep Dark Slate Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  
  <!-- Subtle Emerald Ambient Glow -->
  <rect width="1200" height="630" fill="url(#emeraldGlow)"/>

  <!-- Outer Card Frame with subtle border -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="#0B132B" fill-opacity="0.6" stroke="#334155" stroke-width="1.5"/>

  <!-- Logo Group -->
  <g transform="translate(100, 96)">
    <!-- Eye Icon Badge -->
    <rect x="0" y="0" width="76" height="76" rx="18" fill="#0F172A" stroke="#10B981" stroke-width="2.5"/>
    <circle cx="38" cy="38" r="20" stroke="#10B981" stroke-width="4.5" fill="none"/>
    <circle cx="38" cy="38" r="8" fill="#10B981"/>

    <!-- Brand Typography -->
    <text x="100" y="48" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">optical<tspan fill="#10B981">.de</tspan></text>
  </g>

  <!-- Main Headline & Claim (Exakt nach Vorgabe) -->
  <g transform="translate(100, 230)">
    <text x="0" y="50" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">Deine Kontaktlinsen.</text>
    <text x="0" y="114" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">Einfach wiederfinden.</text>
  </g>

  <!-- Core Function Pillars / Value Propositions (Exakt nach Vorgabe) -->
  <g transform="translate(100, 420)">
    <!-- Pillar 1: Kontaktlinsen finden -->
    <g transform="translate(0, 0)">
      <rect width="300" height="68" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <circle cx="36" cy="34" r="14" fill="#10B981" fill-opacity="0.15"/>
      <circle cx="36" cy="34" r="5" fill="#10B981"/>
      <text x="64" y="41" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700">Kontaktlinsen finden</text>
    </g>

    <!-- Pillar 2: Produktinformationen vergleichen -->
    <g transform="translate(325, 0)">
      <rect width="380" height="68" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <circle cx="36" cy="34" r="14" fill="#10B981" fill-opacity="0.15"/>
      <circle cx="36" cy="34" r="5" fill="#10B981"/>
      <text x="64" y="41" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700">Produktinformationen vergleichen</text>
    </g>

    <!-- Pillar 3: Nachkauf planen -->
    <g transform="translate(730, 0)">
      <rect width="270" height="68" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <circle cx="36" cy="34" r="14" fill="#10B981" fill-opacity="0.15"/>
      <circle cx="36" cy="34" r="5" fill="#10B981"/>
      <text x="64" y="41" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700">Nachkauf planen</text>
    </g>
  </g>

  <!-- Clean Subline / URL Indicator -->
  <text x="100" y="542" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="0.5">https://www.optical.de · Unabhängige Produktübersicht &amp; Nachkauf-Planung</text>
</svg>
`;

const resvg = new Resvg(svgContent, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

const outDir = path.resolve(__dirname, '../public');
fs.mkdirSync(outDir, { recursive: true });

// Write new cache-busted files and update vector source
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v2.png'), pngBuffer);
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v2.svg'), svgContent.trim());

// Also keep legacy name in sync to avoid any 404 if requested directly
fs.writeFileSync(path.join(outDir, 'og-image.png'), pngBuffer);
fs.writeFileSync(path.join(outDir, 'og-image.svg'), svgContent.trim());

console.log('✓ Successfully generated 1200x630 og-optical-brand-v2.png and updated og-image.png');
