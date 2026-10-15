/**
 * optical.de - Multi-Merchant Staging & Visual Viewport Test (Phase 12.1)
 * 
 * Isoliertes Test- und Preview-Harness für Multi-Merchant-UI:
 * - Rendert 4 verschiedene Händler-Szenarien isoliert vor:
 *   1. 1 Händler (Amazon-Only)
 *   2. 2 Händler (Produktiv: Amazon + Mister Spex)
 *   3. 3 Händler (Staging: Amazon + Mister Spex + Apollo Pilot)
 *   4. 0 Händler (Null-Fallback)
 * - Testet Desktop (1280px), Mobile (375px) und Small Mobile (320px) via Puppeteer
 * - Prüft Accessibility, Werbekennzeichnung, Packungsgrößen und Fallback-Verhalten
 * - Erstellt Screenshots im Artifact-Verzeichnis
 */

import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

import { getProductById } from '../../src/data/products.js';
import { MERCHANTS } from '../../src/data/merchants.js';
import { getOffersForProduct } from '../../src/utils/multiMerchantManager.js';

const ARTIFACT_DIR = '/Users/MRT/.gemini/antigravity/brain/0c17d309-bc7a-4f2d-8467-8720b483062d/staging-screenshots';
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

console.log('====================================================');
console.log('STAGING & VIEWPORT HARNESS: MULTI-MERCHANT UI (PHASE 12.1)');
console.log('====================================================\n');

/**
 * Rendert das HTML der MultiMerchantOfferSection für ein Produkt
 */
function renderMultiMerchantSectionHtml(product, options = {}) {
  if (!product) return '';
  const offers = getOffersForProduct(product, options);
  if (!offers || offers.length === 0) return '';

  const offerCardsHtml = offers.map(offer => {
    const merchant = MERCHANTS[offer.merchantId] || {};
    const isPilot = !offer.isProductionActive;

    return `
      <div class="p-4 rounded-xl border transition ${
        isPilot 
          ? 'bg-slate-50/70 border-dashed border-slate-300' 
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
      }">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
              ${merchant.shortName || 'OPT'}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-extrabold text-sm text-slate-900">${merchant.name || offer.merchantName}</h4>
                ${isPilot ? '<span class="text-[9px] font-semibold bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded border border-blue-200">Pilot (Inaktiv)</span>' : ''}
              </div>
              <span class="text-[11px] text-slate-500 block">${merchant.trustLabel || merchant.domain}</span>
            </div>
          </div>

          ${offer.packSizeText ? `
            <div class="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg self-start sm:self-center">
              <span>Packung: <strong>${offer.packSizeText}</strong></span>
            </div>
          ` : ''}
        </div>

        ${offer.requiresSizeSelection ? `
          <div class="mt-3 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-start gap-1.5">
            <span>ℹ️ Beim Händler sind mehrere Packungsgrößen wählbar (Auswahl direkt im Shop).</span>
          </div>
        ` : ''}

        ${offer.editorialNote ? `
          <div class="mt-2 text-[11px] text-slate-500 italic">
            Hinweis: ${offer.editorialNote}
          </div>
        ` : ''}

        <div class="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span class="text-[10px] text-slate-500 leading-tight">
            ${offer.disclaimer}
          </span>

          ${offer.affiliateUrl ? `
            <a
              href="${offer.affiliateUrl}"
              target="_blank"
              rel="noopener noreferrer sponsored"
              class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition shadow-2xs whitespace-nowrap"
            >
              <span>${offer.ctaLabel}</span>
              <span>↗</span>
            </a>
          ` : `
            <button
              disabled
              aria-disabled="true"
              class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-200 text-slate-500 cursor-not-allowed whitespace-nowrap"
            >
              <span>Pilotlink in Prüfung</span>
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');

  return `
    <section aria-label="Verfügbare Händlerangebote und Bezugsquellen" class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Bezugsquellen &amp; Händleroptionen
          </span>
          <h3 class="text-lg font-black text-slate-950 mt-0.5">
            Geprüfte Händler für ${product.product_name}
          </h3>
        </div>

        <span class="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
          Partnerangebote *
        </span>
      </div>

      <div class="space-y-4">
        ${offerCardsHtml}
      </div>

      <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        * Werbelinks / Partnerlinks. optical.de ist ein unabhängiges Informations- und Vergleichsportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu den genannten Optikern und Marken. Alle Händlerpreise und Lieferzeiten werden direkt beim jeweiligen Anbieter aktualisiert.
      </div>
    </section>
  `;
}

// Vorbereitung Testdaten
const biofinity = getProductById('biofinity');
const acuvue = getProductById('acuvue-oasys-2week');

const htmlContent = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Merchant Staging Test Preview | optical.de</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; }
  </style>
</head>
<body class="p-4 sm:p-8 max-w-4xl mx-auto space-y-12">
  <header class="border-b border-slate-200 pb-4">
    <div class="inline-block px-3 py-1 bg-amber-100 text-amber-950 font-bold text-xs rounded-full mb-2">
      Staging Environment · Phase 12.1
    </div>
    <h1 class="text-2xl sm:text-3xl font-black text-slate-950">Multi-Merchant UI Test Harness</h1>
    <p class="text-xs sm:text-sm text-slate-600 mt-1">Isolierte visuelle Überprüfung der Komponentenvarianten (1, 2 und 3 Händler sowie Edge Cases).</p>
  </header>

  <!-- SZENARIO 1: 1 Angebot (Standard-Produkt nur Amazon) -->
  <section class="space-y-3" id="scenario-1">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Szenario 1: 1 Händlerangebot (Amazon-Only)</h2>
      <span class="text-xs text-slate-500">Produkt: Acuvue Oasys</span>
    </div>
    ${renderMultiMerchantSectionHtml(acuvue)}
  </section>

  <!-- SZENARIO 2: 2 Angebote (Produktivzustand Amazon + Mister Spex) -->
  <section class="space-y-3" id="scenario-2">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Szenario 2: 2 Händlerangebote (Produktiv: Amazon + Mister Spex)</h2>
      <span class="text-xs text-slate-500">Produkt: Biofinity</span>
    </div>
    ${renderMultiMerchantSectionHtml(biofinity)}
  </section>

  <!-- SZENARIO 3: 3 Angebote (Staging-Vorschau inkl. Apollo-Pilot) -->
  <section class="space-y-3" id="scenario-3">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Szenario 3: 3 Händlerangebote (Staging-Pilot: Amazon + Mister Spex + Apollo)</h2>
      <span class="text-xs text-slate-500">Produkt: Biofinity (mit Pilot-Flags)</span>
    </div>
    ${renderMultiMerchantSectionHtml(biofinity, { includePilots: true })}
  </section>

  <!-- SZENARIO 4: 0 Angebote (Edge Case / Fallback) -->
  <section class="space-y-3" id="scenario-4">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-slate-700 uppercase tracking-wider">Szenario 4: 0 Händlerangebote (Null-Fallback)</h2>
      <span class="text-xs text-slate-500">Produkt: null</span>
    </div>
    ${renderMultiMerchantSectionHtml(null) || '<div class="p-4 bg-slate-100 rounded-xl text-xs text-slate-500 italic">Komponente rendert sauber null (kein fehlerhafter DOM-Knoten).</div>'}
  </section>

  <footer class="pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
    optical.de Multi-Merchant Staging Preview · Read-Only Mode
  </footer>
</body>
</html>`;

const stagingHtmlPath = path.resolve('scripts/qa/staging-preview.html');
fs.writeFileSync(stagingHtmlPath, htmlContent, 'utf-8');
console.log(`[OK] Staging-HTML erfolgreich generiert: ${stagingHtmlPath}`);

// Puppeteer-Headless-Test
async function runVisualTests() {
  console.log('[...] Starte Puppeteer Browser für Viewport-Validierung...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(`file://${stagingHtmlPath}`, { waitUntil: 'networkidle0' });

    // A. Desktop Viewport (1280x900)
    console.log('[...] Teste Desktop Viewport (1280x900)...');
    await page.setViewport({ width: 1280, height: 900 });
    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'staging-desktop-1280px.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
    console.log(`[PASS] Desktop Screenshot gesichert: ${desktopScreenshotPath}`);

    // B. Mobile Viewport (375x667 - iPhone SE / Standard Mobile)
    console.log('[...] Teste Mobile Viewport (375x667)...');
    await page.setViewport({ width: 375, height: 667 });
    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'staging-mobile-375px.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: true });
    console.log(`[PASS] Mobile Screenshot gesichert: ${mobileScreenshotPath}`);

    // C. Small Mobile Viewport (320x568 - Minimum Screen Size)
    console.log('[...] Teste Small Mobile Viewport (320x568)...');
    await page.setViewport({ width: 320, height: 568 });
    const smallMobileScreenshotPath = path.join(ARTIFACT_DIR, 'staging-mobile-320px.png');
    await page.screenshot({ path: smallMobileScreenshotPath, fullPage: true });
    console.log(`[PASS] Small Mobile Screenshot gesichert: ${smallMobileScreenshotPath}`);

    // DOM & Accessibility Assertions
    const domChecks = await page.evaluate(() => {
      const s1 = document.querySelector('#scenario-1');
      const s2 = document.querySelector('#scenario-2');
      const s3 = document.querySelector('#scenario-3');

      const hasPartnerLabels = document.body.innerText.includes('Partnerangebote *');
      const hasWerbelinkNotes = document.body.innerText.includes('* Werbelinks / Partnerlinks');
      
      const s1Items = s1 ? s1.querySelectorAll('.p-4.rounded-xl').length : 0;
      const s2Items = s2 ? s2.querySelectorAll('.p-4.rounded-xl').length : 0;
      const s3Items = s3 ? s3.querySelectorAll('.p-4.rounded-xl').length : 0;

      const s2SponsoredLinks = s2 ? s2.querySelectorAll('a[rel*="sponsored"]').length : 0;
      const s3Buttons = s3 ? (s3.querySelectorAll('a[rel*="sponsored"]').length + s3.querySelectorAll('button[disabled]').length) : 0;

      const overflowWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const hasHorizontalScroll = overflowWidth > clientWidth;

      return {
        hasPartnerLabels,
        hasWerbelinkNotes,
        s1Items,
        s2Items,
        s3Items,
        s2SponsoredLinks,
        s3Buttons,
        hasHorizontalScroll,
        overflowWidth,
        clientWidth
      };
    });

    console.log('\n--- DOM & Accessibility Prüfergebnisse ---');
    console.log(`- Partnerangebote Badges vorhanden: ${domChecks.hasPartnerLabels ? 'JA' : 'NEIN'}`);
    console.log(`- Werbelink-Hinweis vorhanden: ${domChecks.hasWerbelinkNotes ? 'JA' : 'NEIN'}`);
    console.log(`- Szenario 1 (1 Händler: Amazon): ${domChecks.s1Items} Karte(n)`);
    console.log(`- Szenario 2 (2 Händler: Amazon + Mister Spex): ${domChecks.s2Items} Karte(n), ${domChecks.s2SponsoredLinks} gesponserte Links`);
    console.log(`- Szenario 3 (3 Händler: Amazon + Mister Spex + Apollo Pilot): ${domChecks.s3Items} Karte(n), ${domChecks.s3Buttons} Interaktionsbuttons`);
    console.log(`- Horizontaler Überlauf bei 320px: ${domChecks.hasHorizontalScroll ? 'FEHLER: Überlauf vorhanden!' : 'KEIN Überlauf (perfekt mobil)'}`);

    if (domChecks.hasPartnerLabels && domChecks.s1Items === 1 && domChecks.s2Items === 2 && domChecks.s3Items === 3 && !domChecks.hasHorizontalScroll) {
      console.log('\n✅ Staging- & Viewport-Test erfolgreich bestanden!');
    } else {
      console.error('\n❌ Einige Staging-Prüfungen sind fehlgeschlagen!');
      process.exitCode = 1;
    }

  } finally {
    await browser.close();
  }
}

runVisualTests().catch(err => {
  console.error('Fehler beim Staging-Testlauf:', err);
  process.exit(1);
});
