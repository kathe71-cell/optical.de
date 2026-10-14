import assert from 'assert';
import fs from 'fs';
import { PRODUCTS } from '../../src/data/products.js';

console.log('====================================================');
console.log('QA TEST SUITE: PHASE 10.5 DATA INTEGRITY & TRUST');
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

// ----------------------------------------------------
// F01: Produktdaten (Acuvue Oasys Max 1-Day & Acuvue Vita + Verification Map)
// ----------------------------------------------------
it('F01: ACUVUE OASYS MAX 1-Day besitzt verifizierte Spezifikationen (Senofilcon A, BC 8.5/9.0)', () => {
  const p = PRODUCTS.find((x) => x.id === 'acuvue-oasys-max-1day');
  assert(p, 'Produkt acuvue-oasys-max-1day nicht gefunden');
  assert.strictEqual(p.material, 'Senofilcon A (Silikon-Hydrogel)');
  assert.strictEqual(p.material_type, 'silikon-hydrogel');
  assert.strictEqual(p.base_curve, '8.5 mm / 9.0 mm');
  assert.strictEqual(p.diameter, '14.3 mm');
  assert.strictEqual(p.water_content, '38 %');
  assert(p.objective_badges.includes('OptiBlue'), 'OptiBlue Lichtfilter Badge fehlt');

  // Prüffeld-Map
  assert(p.field_verification, 'field_verification fehlt');
  assert.strictEqual(p.field_verification.material, 'VERIFIED');
  assert.strictEqual(p.field_verification.base_curve, 'VERIFIED');
  assert.strictEqual(p.field_verification.diameter, 'VERIFIED');
  assert.strictEqual(p.field_verification.water_content, 'VERIFIED');
});

it('F01: ACUVUE VITA besitzt verifizierte Spezifikationen (Senofilcon C, BC 8.4/8.8)', () => {
  const p = PRODUCTS.find((x) => x.id === 'acuvue-vita');
  assert(p, 'Produkt acuvue-vita nicht gefunden');
  assert.strictEqual(p.material, 'Senofilcon C (Silikon-Hydrogel)');
  assert.strictEqual(p.material_type, 'silikon-hydrogel');
  assert.strictEqual(p.base_curve, '8.4 mm / 8.8 mm');
  assert.strictEqual(p.diameter, '14.0 mm');
  assert.strictEqual(p.water_content, '41 %');

  // Prüffeld-Map
  assert(p.field_verification, 'field_verification fehlt');
  assert.strictEqual(p.field_verification.material, 'VERIFIED');
  assert.strictEqual(p.field_verification.base_curve, 'VERIFIED');
});

it('F01: Alle 57 Produkte besitzen eine vollständige field_verification Struktur', () => {
  assert.strictEqual(PRODUCTS.length, 57, 'Nicht genau 57 Produkte');
  const allowedStatuses = ['VERIFIED', 'UNVERIFIED', 'CONFLICTING', 'NOT_APPLICABLE'];
  const requiredFields = ['material', 'base_curve', 'diameter', 'dk_t', 'water_content', 'sphere_range', 'source_url', 'price'];

  PRODUCTS.forEach((p) => {
    assert(p.field_verification, `field_verification fehlt für ${p.id}`);
    requiredFields.forEach((field) => {
      const status = p.field_verification[field];
      assert(status, `Feld ${field} fehlt in field_verification für ${p.id}`);
      assert(allowedStatuses.includes(status), `Ungültiger Status ${status} für ${p.id}.${field}`);
    });
  });
});

// ----------------------------------------------------
// F02: Jahreskostenberechnung MonatsVsTagesGuide.jsx
// ----------------------------------------------------
it('F02: MonatsVsTagesGuide.jsx besitzt konsistente Tabelle und Textaussagen (Break-Even bei 2-3 Tagen/Woche)', () => {
  const code = fs.readFileSync('src/pages/MonatsVsTagesGuide.jsx', 'utf8');

  // Konsistenzprüfungen der neuen Modellrechnung (mit HTML-Entities wie &euro;)
  assert(code.includes('135 &euro;'), '135 &euro; für 2 Tage/Woche fehlt');
  assert(code.includes('203 &euro;'), '203 &euro; für 3 Tage/Woche fehlt');
  assert(code.includes('190 &euro;'), '190 &euro; Monatslinsen-Jahreskosten fehlen');
  assert(code.includes('1,30 &euro;'), 'Preisbasis 1,30 &euro; pro Tageslinsen-Paar fehlt');

  // Ausschluss alter widersprüchlicher Werte
  assert(!code.includes('5 Tagen pro Woche'), 'Alte widersprüchliche Aussage zu 5 Tagen noch vorhanden');
  assert(!code.includes('183 €'), 'Alter falscher 7-Tage-Tageslinsenpreis noch vorhanden');
  assert(!code.includes('0,50 &euro;'), 'Alter unplausibler Paarpreis 0,50 € noch vorhanden');
});

// ----------------------------------------------------
// F03: Strukturierte FAQ & Keine globale Fehlausspielung
// ----------------------------------------------------
it('F03: Keine globale FAQPage-Ausspielung in index.html; FAQPage nur bei sichtbaren FAQs', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  // Keine globale FAQPage in index.html
  assert(!html.includes('"@type": "FAQPage"'), 'FAQPage darf nicht global in index.html enthalten sein');

  // Prerender-Code prüft gezielte Route
  const prerenderCode = fs.readFileSync('prerender.js', 'utf8');
  assert(prerenderCode.includes("url === '/ratgeber/kontaktlinsen-pflegemittel-vergleich'"), 'FAQPage nur auf Pflegemittel-Ratgeberroute');
  assert(prerenderCode.includes('Kann ich Leitungswasser zum Spülen verwenden?'), 'Sichtbare FAQ 1 fehlt');
  assert(prerenderCode.includes('Wie oft muss ich den Linsenbehälter wechseln?'), 'Sichtbare FAQ 2 fehlt');
  assert(prerenderCode.includes('Was tun wenn die Linsen im Pflegemittel brennen?'), 'Sichtbare FAQ 3 fehlt');
});

// ----------------------------------------------------
// F09: Preisaktualitätsaussagen
// ----------------------------------------------------
it('F09: Keine falschen Behauptungen über tagesaktuelle Live-Preise in Komponenten ohne Live-API', () => {
  const decoderCode = fs.readFileSync('src/components/EigenmarkenDecoder.jsx', 'utf8');
  assert(!decoderCode.includes('den tagesaktuellen Online-Preisen der Referenzprodukte basiert'), 'Falsche Preisaussage in EigenmarkenDecoder');
  assert(decoderCode.includes('den hinterlegten Online-Beispielpreisen (Stand 09/2026)'), 'Präziser Hinweis auf hinterlegte Beispielpreise fehlt');

  const compCode = fs.readFileSync('src/pages/ProductComparisonPage.jsx', 'utf8');
  assert(!compCode.includes('Tagesaktuelle Online-Angebote:'), 'Tagesaktuelle Online-Angebote Überschrift in Vergleichsseite noch vorhanden');
  assert(compCode.includes('Online-Angebote bei Partnern:'), 'Neutrale Partnerangebote-Überschrift fehlt');
});

// ----------------------------------------------------
// F15: Unbelegte Originalzuordnungen (Eigenmarken)
// ----------------------------------------------------
it('F15: Routen, Landingpages und Suchvorschläge nutzen sachlichen "Technischer Abgleich"-Standard', () => {
  const routesCode = fs.readFileSync('src/routes.js', 'utf8');
  assert(!routesCode.includes('– Original-Linse'), 'Routentitel enthalten noch „– Original-Linse“');
  assert(routesCode.includes('– Technischer Abgleich'), 'Routentitel enthalten nicht „– Technischer Abgleich“');

  const privateLabelCode = fs.readFileSync('src/pages/PrivateLabelLanding.jsx', 'utf8');
  assert(!privateLabelCode.includes('Welches Markenprodukt steckt hinter'), 'Unbelegte Aussage „steckt hinter“ in PrivateLabelLanding noch vorhanden');
  assert(!privateLabelCode.includes('– Original-Linse'), '„– Original-Linse“ in PrivateLabelLanding noch vorhanden');
  assert(privateLabelCode.includes('Technischer Abgleich'), '„Technischer Abgleich“ in PrivateLabelLanding fehlt');

  const homeCode = fs.readFileSync('src/pages/Home.jsx', 'utf8');
  assert(!homeCode.includes('Entspricht ${e.original_brand_name}'), 'Unbelegte Gleichsetzung in Home-Suchvorschlägen noch vorhanden');
  assert(homeCode.includes('Technischer Abgleich: ${e.original_brand_name}'), '„Technischer Abgleich“ in Suchvorschlägen fehlt');
});

console.log('====================================================');
console.log(`TESTERGEBNIS: ${testsPassed} PASS | ${testsFailed} FAIL`);
if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ Alle Phase 10.5 Data Integrity & Trust Prüfungen erfolgreich bestanden!');
}
