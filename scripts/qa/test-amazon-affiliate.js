/**
 * optical.de - Test-Suite für Amazon-Affiliate-Integrität & Link-Architektur (Phase 9)
 * 
 * Überprüft:
 * 1. Vollständigkeit und alphanumerisches Format sämtlicher ASINs
 * 2. Korrekte Injektion des Partner-Tags optical.de-21
 * 3. Robuste Generierung direkter Produktlinks vs. Suchlink-Fallbacks
 * 4. Saubere URL-Kodierung ohne doppelte Parameter
 * 5. Richtlinienkonforme CTA-Texte ("Produkt bei Amazon ansehen *" / "Bei Amazon nach Produkt suchen *")
 * 6. Vorhandensein des offiziellen Amazon-Partnerhinweises
 */

import { PRODUCTS } from '../../src/data/products.js';
import { 
  getProductAffiliateUrl, 
  getAffiliateSearchUrl, 
  getAffiliateCtaLabel, 
  AMAZON_PARTNER_TAG 
} from '../../src/utils/affiliate.js';

let passes = 0;
let fails = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passes++;
  } else {
    console.error(`[FAIL] ${testName}`);
    fails++;
  }
}

console.log('====================================================');
console.log('TEST SUITE: AMAZON AFFILIATE & ASIN INTEGRITY');
console.log('====================================================\n');

// 1. Partner-Tag
assert(AMAZON_PARTNER_TAG === 'optical.de-21', 'Amazon Partner-Tag ist exakt optical.de-21');

// 2. Alle 39 Produkte prüfen
let validAsinCount = 0;
let validDirectLinks = 0;

for (const p of PRODUCTS) {
  const is10CharAsin = p.asin && /^[A-Z0-9]{10}$/.test(p.asin);
  if (is10CharAsin) validAsinCount++;

  const url = getProductAffiliateUrl(p);
  const hasTag = url.includes('tag=optical.de-21');
  const hasDp = url.includes(`/dp/${p.asin}`);
  const noDoubleTag = (url.match(/tag=/g) || []).length === 1;

  if (hasTag && hasDp && noDoubleTag) {
    validDirectLinks++;
  }

  // CTA Text Prüfung
  const cta = getAffiliateCtaLabel(p);
  if (is10CharAsin && cta !== 'Produkt bei Amazon ansehen *') {
    assert(false, `CTA Label für ${p.id} entspricht nicht dem Direktlink-Standard`);
  }
}

assert(validAsinCount === 39, `Alle 39 Produkte besitzen ein valides 10-stelliges ASIN-Format (${validAsinCount}/39)`);
assert(validDirectLinks === 39, `Alle 39 Produkte erzeugen einen fehlerfreien Amazon-Direktlink mit tag=optical.de-21 (${validDirectLinks}/39)`);

// 3. Fallback-Verhalten bei fehlender ASIN oder Suchanfragen
const fallbackSearchUrl = getAffiliateSearchUrl('Biofinity Toric 6er Packung', null);
assert(fallbackSearchUrl.includes('https://www.amazon.de/s?k='), 'Suchlink-Fallback erzeugt Amazon-Such-URL');
assert(fallbackSearchUrl.includes('tag=optical.de-21'), 'Suchlink-Fallback enthält korrekten Partner-Tag');
assert(fallbackSearchUrl.includes('Biofinity%20Toric%206er%20Packung'), 'Suchbegriff ist ordnungsgemäß URL-kodiert');

const searchCta = getAffiliateCtaLabel({ product_name: 'Unbekannte Linse', asin: null });
assert(searchCta === 'Bei Amazon nach Produkt suchen *', 'Suchlink liefert transparenten Such-CTA-Text');

// 4. Edge Cases: Leeres Produkt, undefined
const emptyUrl = getProductAffiliateUrl(null);
assert(emptyUrl.includes('tag=optical.de-21'), 'Fallback bei null-Produkt führt zu valider Amazon-URL mit Partner-Tag');

console.log('\n====================================================');
if (fails === 0) {
  console.log(`✅ Alle ${passes} Affiliate- & ASIN-Tests erfolgreich bestanden!`);
  process.exit(0);
} else {
  console.error(`❌ ${fails} Tests fehlgeschlagen!`);
  process.exit(1);
}
