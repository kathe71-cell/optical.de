/**
 * optical.de - Test-Suite für Amazon-Affiliate-Integrität & Link-Architektur (Phase 9.3 Hotfix)
 * 
 * Überprüft:
 * 1. Partner-Tag optical.de-21
 * 2. Strikte Freigabelogik: Nur die 17 verifizierten ASINs erzeugen Direktlinks (/dp/{asin})
 * 3. Nicht-verifizierte/404-ASINs (z. B. Acuvue Oasys B000052YP8) werden automatisch auf sichere Suche umgeleitet
 * 4. Korrekte CTA-Texte ("Produkt bei Amazon ansehen *" für verifizierte vs. "Bei Amazon nach Produkt suchen *" für Fallback)
 * 5. Schutz vor defekten 404-Direktlinks im aktiven Verkaufspfad
 * 6. Google & PartnerNet Konformität: rel="noopener noreferrer sponsored"
 */

import { PRODUCTS } from '../../src/data/products.js';
import { 
  getProductAffiliateUrl, 
  getAffiliateSearchUrl, 
  getAffiliateCtaLabel, 
  isDirectAsinActive,
  VERIFIED_ACTIVE_ASINS,
  AFFILIATE_LINK_REL,
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
console.log('TEST SUITE: AMAZON AFFILIATE QUALITY GATE & HOTFIX (PHASE 9.3)');
console.log('====================================================\n');

// 1. Partner-Tag & Rel-Attribut
assert(AMAZON_PARTNER_TAG === 'optical.de-21', 'Amazon Partner-Tag ist exakt optical.de-21');
assert(AFFILIATE_LINK_REL === 'noopener noreferrer sponsored', 'Affiliate rel-Attribut entspricht Google/PartnerNet Vorgabe sponsored');

// 2. Status der 39 Produkte
let verifiedDirectCount = 0;
let safeFallbackCount = 0;

for (const p of PRODUCTS) {
  const isDirect = isDirectAsinActive(p.asin);
  const url = getProductAffiliateUrl(p);
  const cta = getAffiliateCtaLabel(p);

  if (isDirect) {
    verifiedDirectCount++;
    assert(url.includes(`/dp/${p.asin}`), `Verifiziertes Produkt ${p.id} verlinkt direkt auf /dp/${p.asin}`);
    assert(cta === 'Produkt bei Amazon ansehen *', `Verifiziertes Produkt ${p.id} nutzt Direkt-CTA`);
  } else {
    safeFallbackCount++;
    assert(url.includes('/s?k='), `Unverifiziertes Produkt ${p.id} nutzt sicheren Such-Fallback`);
    assert(cta === 'Bei Amazon nach Produkt suchen *', `Unverifiziertes Produkt ${p.id} nutzt Such-CTA`);
    assert(!url.includes(`/dp/${p.asin}`), `Unverifiziertes Produkt ${p.id} erzeugt KEINEN ungeprüften Direktlink`);
  }

  assert(url.includes('tag=optical.de-21'), `Produkt ${p.id} URL enthält korrekten Partner-Tag`);
}

assert(verifiedDirectCount === 17, `Exakt 17 von ${PRODUCTS.length} Produkten sind als aktive Direktlinks freigegeben (${verifiedDirectCount}/${PRODUCTS.length})`);
assert(safeFallbackCount === 40, `Exakt 40 von ${PRODUCTS.length} Produkten nutzen den sicheren Such-Fallback (${safeFallbackCount}/${PRODUCTS.length})`);

// 3. Spezifischer Test des 404-Hotfixes (Acuvue Oasys B000052YP8)
const oasys = PRODUCTS.find(p => p.id === 'acuvue-oasys-2week');
assert(oasys.asin === 'B000052YP8', 'Acuvue Oasys ASIN B000052YP8 identifiziert');
assert(!isDirectAsinActive(oasys.asin), 'Acuvue Oasys ASIN B000052YP8 ist in isDirectAsinActive als DEAKTIVIERT eingestuft');

const oasysUrl = getProductAffiliateUrl(oasys);
assert(!oasysUrl.includes('B000052YP8'), 'Acuvue Oasys URL enthält NICHT die defekte 404-ASIN');
assert(oasysUrl.includes('/s?k='), 'Acuvue Oasys leitet auf sichere Amazon-Suche um');
assert(getAffiliateCtaLabel(oasys) === 'Bei Amazon nach Produkt suchen *', 'Acuvue Oasys nutzt transparenten Such-CTA');

// 4. Edge Cases: getAffiliateSearchUrl
assert(getAffiliateSearchUrl('Biofinity', 'B007UITPAQ').includes('/dp/B007UITPAQ'), 'Freigegebene ASIN B007UITPAQ erzeugt /dp/ Link');
assert(getAffiliateSearchUrl('Acuvue Oasys', 'B000052YP8').includes('/s?k='), 'Nicht freigegebene ASIN B000052YP8 erzeugt /s?k= Suchlink');

// 5. Fallback bei null-Produkt
const emptyUrl = getProductAffiliateUrl(null);
assert(emptyUrl.includes('tag=optical.de-21'), 'Fallback bei null-Produkt führt zu valider Amazon-URL mit Partner-Tag');

console.log('\n====================================================');
if (fails === 0) {
  console.log(`✅ Alle ${passes} Affiliate Quality Gate & Hotfix Tests erfolgreich bestanden!`);
  process.exit(0);
} else {
  console.error(`❌ ${fails} Tests fehlgeschlagen!`);
  process.exit(1);
}
