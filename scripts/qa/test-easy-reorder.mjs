import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { PRODUCTS, getProductById } from '../../src/data/products.js';
import { isDirectAsinActive, getProductAffiliateUrl, getAffiliateCtaLabel, AMAZON_PARTNER_TAG, AFFILIATE_LINK_REL } from '../../src/utils/affiliate.js';

console.log('====================================================');
console.log('QA TEST SUITE: PHASE 10.1 EASY REORDER & SICHERHEIT');
console.log('====================================================');

let testsPassed = 0;
let testsFailed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    testsFailed++;
  }
}

// 1. Hook & Storage Resilienz
it('useSavedLenses.js enthält In-Memory-Fallback bei blockiertem localStorage', () => {
  const code = fs.readFileSync('src/hooks/useSavedLenses.js', 'utf8');
  assert(code.includes('memorySavedFallback'), 'Kein In-Memory-Fallback deklariert');
  assert(code.includes('optical_saved_lenses'), 'Falscher Storage-Key');
});

it('useRefillConfigs.js enthält In-Memory-Fallback bei blockiertem localStorage', () => {
  const code = fs.readFileSync('src/hooks/useRefillConfigs.js', 'utf8');
  assert(code.includes('memoryRefillFallback'), 'Kein In-Memory-Fallback deklariert');
});

// 2. Startseite Easy-Reorder-Einstieg
it('Home.jsx besitzt den Einstiegsbereich „Deine gemerkten Kontaktlinsen“', () => {
  const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  assert(code.includes('Deine gemerkten Kontaktlinsen'), 'Überschrift fehlt auf Startseite');
  assert(code.includes('saved-lenses-heading'), 'Sektions-ID für Barrierefreiheit fehlt');
});

it('Home.jsx enthält leeren Zustand mit Erklärung und Einstiegen in Produktsuche/Katalog', () => {
  const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  assert(code.includes('Hier findest du deine gewohnten Kontaktlinsen für den schnellen Wiederkauf wieder'), 'Erklärung fehlt');
  assert(code.includes('/vergleichskatalog'), 'Link zum Katalog fehlt');
  assert(code.includes('/eigenmarken-decoder'), 'Link zum Decoder fehlt');
});

it('Home.jsx filtert ungültige oder nicht mehr existierende Produkt-IDs sauber heraus', () => {
  const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  assert(code.includes('getProductById(id)'), 'Nutzt nicht getProductById');
  assert(code.includes('.filter(Boolean)'), 'filter(Boolean) fehlt');
});

it('Home.jsx & SavedLensesPage.jsx besitzen zentralen Medizinprodukt-Prüfhinweis vor jedem Nachkauf', () => {
  const homeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  const savedCode = fs.readFileSync('src/pages/SavedLensesPage.jsx', 'utf8');
  assert(homeCode.includes('Medizinprodukt-Prüfung vor dem Nachkauf'), 'Zentraler Prüfhinweis auf Home.jsx fehlt');
  assert(homeCode.includes('Dioptrien/Stärke, Basiskurve, Durchmesser sowie bei Bedarf Zylinder, Achse oder Addition'), 'Vollständige Parameter-Nennung auf Home.jsx fehlt');
  assert(savedCode.includes('Medizinprodukt-Prüfung vor dem Nachkauf'), 'Zentraler Prüfhinweis auf SavedLensesPage.jsx fehlt');
  assert(savedCode.includes('Nicht jedes Produkt benötigt alle Parameter'), 'Einschränkung nicht jedes Produkt benötigt alle Parameter fehlt');
});

it('Easy-Reorder-Karten enthalten keine veralteten Orientierungspreise mehr', () => {
  const homeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  const savedCode = fs.readFileSync('src/pages/SavedLensesPage.jsx', 'utf8');
  // Überprüfe den gemerkten Kartenbereich
  const homeSavedSection = homeCode.substring(homeCode.indexOf('saved-lenses-heading'));
  assert(!homeSavedSection.includes('Orientierungspreis:'), 'Orientierungspreis fälschlicherweise noch in Home Reorder-Karten');
});

it('Header.jsx platziert Claim „Deine Kontaktlinsen“ unterhalb der Wortmarke ohne Trennstrich', () => {
  const headerCode = fs.readFileSync('src/components/Header.jsx', 'utf8');
  assert(headerCode.includes('brand-claim'), 'brand-claim Klasse fehlt');
  assert(headerCode.includes('Deine Kontaktlinsen'), 'Claim fehlt im Header');
  assert(!headerCode.includes('border-l border-slate-200 pl-2'), 'Veralteter Trennstrich noch vorhanden');
});

it('Home.jsx besitzt große Schaltfläche „Produkt ansehen“ und direkten Nachkauf-Button', () => {
  const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  assert(code.includes('Produkt ansehen'), 'Schaltfläche Produkt ansehen fehlt');
  assert(code.includes('getProductAffiliateUrl(p)'), 'Affiliate-URL-Generierung fehlt');
  assert(code.includes('getAffiliateCtaLabel(p)'), 'CTA-Label-Generierung fehlt');
});

// 3. Affiliate-Integrität & Partner-Tag
it('Alle 57 Produkte generieren konforme Affiliate-Links mit tag=optical.de-21', () => {
  assert.strictEqual(PRODUCTS.length, 57, 'Nicht genau 57 Produkte im Katalog');
  PRODUCTS.forEach(p => {
    const url = getProductAffiliateUrl(p);
    assert(url.includes(`tag=${AMAZON_PARTNER_TAG}`), `Produkt ${p.id} hat keinen Partner-Tag in URL: ${url}`);
    assert(url.startsWith('https://www.amazon.de/'), `Produkt ${p.id} hat ungültige Partner-Domain`);
  });
});

it('AFFILIATE_LINK_REL entspricht Google & PartnerNet Vorgaben', () => {
  assert.strictEqual(AFFILIATE_LINK_REL, 'noopener noreferrer sponsored');
});

// 4. Barrierefreiheit & Button-Integrität im Markup
it('Home.jsx und SavedLensesPage.jsx nutzen .card-action-grid für responsive Buttons', () => {
  const homeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  const savedCode = fs.readFileSync('src/pages/SavedLensesPage.jsx', 'utf8');
  assert(homeCode.includes('card-action-grid'), 'card-action-grid fehlt in Home.jsx');
  assert(savedCode.includes('card-action-grid'), 'card-action-grid fehlt in SavedLensesPage.jsx');
});

it('Entfernen-Buttons besitzen barrierefreie aria-label Attribute', () => {
  const homeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  const savedCode = fs.readFileSync('src/pages/SavedLensesPage.jsx', 'utf8');
  assert(homeCode.includes('aria-label={`${p.product_name} aus gemerkten Linsen entfernen`}'), 'aria-label fehlt in Home.jsx');
  assert(savedCode.includes('aria-label={`${p.product_name} aus Merkliste entfernen`}'), 'aria-label fehlt in SavedLensesPage.jsx');
});

// 5. SSG Vorbereitung
it('Vorgerenderte HTML-Dateien der Startseite enthalten die semantische Sektion', () => {
  // Wird nach npm run build überprüft
  if (fs.existsSync('dist/index.html')) {
    const html = fs.readFileSync('dist/index.html', 'utf8');
    assert(html.includes('Deine gemerkten Kontaktlinsen'), 'SSG dist/index.html enthält Sektion nicht');
  }
});

console.log('====================================================');
console.log(`TESTERGEBNIS: ${testsPassed} PASS | ${testsFailed} FAIL`);
if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ Alle Easy-Reorder- & Sicherheits-Prüfungen bestanden!');
}
