import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Exact Light Theme matching optical.de website (Warm Alabaster / Slate-50 / White Card / Emerald Accent)
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="bgLight" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
    <filter id="cardShadow" x="20" y="20" width="1160" height="590" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0F172A" flood-opacity="0.06"/>
    </filter>
    <filter id="tileShadow" x="-10" y="-10" width="350" height="110" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.04"/>
    </filter>
  </defs>

  <!-- Background Canvas: Clean Light Alabaster (optical.de bg-slate-50) -->
  <rect width="1200" height="630" fill="url(#bgLight)"/>

  <!-- Main Floating Card Container (like website hero) -->
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" filter="url(#cardShadow)"/>

  <!-- Top Header / Brand Logo: Exact match to website Header -->
  <g transform="translate(90, 85)">
    <!-- Slate-900 Box with Eye Icon -->
    <rect x="0" y="0" width="68" height="68" rx="18" fill="#0F172A"/>
    <!-- Lucide Eye Icon in Emerald-400 (#34D399) -->
    <g transform="translate(14, 14)">
      <path d="M2 20C2 20 8.5 7 20 7C31.5 7 38 20 38 20C38 20 31.5 33 20 33C8.5 33 2 20 2 20Z" stroke="#34D399" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="20" cy="20" r="6.5" stroke="#34D399" stroke-width="3.5" fill="none"/>
    </g>

    <!-- Brand Wordmark -->
    <text x="88" y="48" fill="#020617" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="900" letter-spacing="-1">optical<tspan fill="#059669">.de</tspan></text>
    
    <!-- Subtitle / Tagline Divider (exact match to header) -->
    <line x1="335" y1="20" x2="335" y2="48" stroke="#E2E8F0" stroke-width="2"/>
    <text x="350" y="42" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="600">Deine Kontaktlinsen</text>
  </g>

  <!-- Eyebrow Badge (Exact match to Hero section) -->
  <g transform="translate(90, 185)">
    <rect width="395" height="36" rx="18" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
    <!-- Little Eye Icon in badge -->
    <path d="M18 18C18 18 21 12 26 12C31 12 34 18 34 18C34 18 31 24 26 24C21 24 18 18 18 18Z" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="26" cy="18" r="2.5" fill="#059669"/>
    <text x="44" y="23" fill="#065F46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="800" letter-spacing="1">KONTAKTLINSEN FINDEN &amp; NACHKAUF PLANEN</text>
  </g>

  <!-- Hero Headline (Exact match to website H1) -->
  <g transform="translate(90, 250)">
    <text x="0" y="52" fill="#020617" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5">Deine Kontaktlinsen.</text>
    <text x="0" y="112" fill="#059669" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="900" letter-spacing="-1.5">Einfach wiederfinden.</text>
  </g>

  <!-- Subtitle Description (Exact match to Hero paragraph) -->
  <text x="90" y="405" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="21" font-weight="400">Finde deine gewohnten Kontaktlinsen, vergleiche Produktinformationen</text>
  <text x="90" y="435" fill="#475569" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="21" font-weight="400">und plane deinen nächsten Nachkauf.</text>

  <!-- 3 Interactive Function Action Tiles (Exact styling of website cards) -->
  <g transform="translate(90, 465)">
    <!-- Tile 1: Kontaktlinsen finden (Primary Emerald Button look) -->
    <g transform="translate(0, 0)">
      <rect width="315" height="64" rx="14" fill="#059669"/>
      <!-- Layers Icon -->
      <g transform="translate(24, 20)">
        <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <polyline points="2 12 12 17 22 12" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <polyline points="2 17 12 22 22 17" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </g>
      <text x="60" y="38" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="800">Kontaktlinsen finden</text>
    </g>

    <!-- Tile 2: Produktinfos vergleichen (White Card look) -->
    <g transform="translate(340, 0)">
      <rect width="315" height="64" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="36" cy="32" r="14" fill="#ECFDF5"/>
      <circle cx="36" cy="32" r="5" fill="#059669"/>
      <text x="62" y="38" fill="#0F172A" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="800">Produktinfos vergleichen</text>
    </g>

    <!-- Tile 3: Nachkauf planen (White Card look) -->
    <g transform="translate(680, 0)">
      <rect width="315" height="64" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="36" cy="32" r="14" fill="#ECFDF5"/>
      <circle cx="36" cy="32" r="5" fill="#059669"/>
      <text x="62" y="38" fill="#0F172A" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="800">Nachkauf planen</text>
    </g>
  </g>

  <!-- Clean Bottom Footer Note -->
  <text x="90" y="562" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600">https://www.optical.de · Unabhängige Produktübersicht &amp; Nachkauf-Planung</text>
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

// Write v3 cache-busted files
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v3.png'), pngBuffer);
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v3.svg'), svgContent.trim());

// Keep v2 and legacy in sync
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v2.png'), pngBuffer);
fs.writeFileSync(path.join(outDir, 'og-optical-brand-v2.svg'), svgContent.trim());
fs.writeFileSync(path.join(outDir, 'og-image.png'), pngBuffer);
fs.writeFileSync(path.join(outDir, 'og-image.svg'), svgContent.trim());

// Optionally copy to artifacts directory if it exists locally
const artifactDir = '/Users/MRT/.gemini/antigravity/brain/0c17d309-bc7a-4f2d-8467-8720b483062d';
if (fs.existsSync(artifactDir)) {
  fs.writeFileSync(path.join(artifactDir, 'og-optical-brand-v3.png'), pngBuffer);
}

console.log('✓ Successfully generated 1200x630 light-theme og-optical-brand-v3.png');
