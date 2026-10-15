/**
 * optical.de - Test-Suite für Multi-Merchant-Architektur (Phase 12.2 Konsolidierung)
 * 
 * Umfassende Verifikation:
 * 1. Mehrdimensionales Händlerregister (APPLIED, APPROVED, ACTIVE_PRODUCTION, etc.)
 * 2. Status aller 6 Händler (Amazon, MS, Apollo, Lensbest, Linsenplatz, Lentiamo)
 * 3. Apollo-Pilot: 5 Familien & 10 Packungsvarianten
 * 4. Differenzierte Verifikationsstatus pro Variante
 * 5. Provisionsstatus (commissionRate = null) & Fail-Closed Aktivierungsschutz
 * 6. Netzwerkspezifische Validierung (Amazon, Awin, CJ PENDING_REAL_LINK_VERIFICATION)
 * 7. Schutz vor Aktivierung ohne Programmfreigabe oder ohne Linkverifikation
 * 8. Baseline-Schutz: 57 Amazon-Angebote, 7 Mister-Spex-Angebote
 */

import { 
  MERCHANTS, 
  NETWORKS, 
  MERCHANT_PROGRAM_STATUS, 
  OFFER_LINK_STATUS, 
  EVIDENCE_LEVELS, 
  getMerchantConfig 
} from '../../src/data/merchants.js';
import { 
  APOLLO_CONFIG, 
  APOLLO_PILOT_FAMILIES, 
  APOLLO_PILOT_OFFERS, 
  hasApolloPilotOffer, 
  getApolloPilotOffer,
  getApolloPilotFamily 
} from '../../src/data/apolloPilot.js';
import { 
  validateAmazonUrl, 
  validateAwinUrl, 
  validateCjUrl, 
  validateMerchantOffer 
} from '../../src/utils/multiMerchantValidation.js';
import { 
  getOffersForProduct, 
  buildAmazonOffer, 
  buildMisterSpexOffer, 
  buildApolloOffer 
} from '../../src/utils/multiMerchantManager.js';
import { PRODUCTS, getProductById } from '../../src/data/products.js';
import { MISTER_SPEX_OFFERS } from '../../src/data/misterSpexAffiliate.js';
import { hasMisterSpexOffer } from '../../src/utils/misterSpexValidation.js';
import { AMAZON_PARTNER_TAG, isDirectAsinActive, VERIFIED_ACTIVE_ASINS } from '../../src/utils/affiliate.js';

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
console.log('TEST SUITE: MULTI-MERCHANT CONSOLIDATION (PHASE 12.2)');
console.log('====================================================\n');

// ----------------------------------------------------
// 1. Mehrdimensionales Händlerregister & Status
// ----------------------------------------------------
console.log('--- 1. Händlerregister & Statusprüfung ---');

// Amazon
assert(MERCHANTS.amazon.programStatus === MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION, 'Amazon ist ACTIVE_PRODUCTION');
assert(MERCHANTS.amazon.partnerTag === 'optical.de-21', 'Amazon Partner-Tag ist optical.de-21');

// Mister Spex
assert(MERCHANTS.mister_spex.programStatus === MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION, 'Mister Spex ist ACTIVE_PRODUCTION');
assert(MERCHANTS.mister_spex.advertiserId === '10118', 'Mister Spex Advertiser-ID ist 10118');
assert(MERCHANTS.mister_spex.publisherId === '1676831', 'Mister Spex Publisher-ID ist 1676831');

// Apollo Optik (Bewerbung läuft)
assert(MERCHANTS.apollo.programStatus === MERCHANT_PROGRAM_STATUS.APPLIED, 'Apollo Optik ist APPLIED (Bewerbung läuft)');
assert(MERCHANTS.apollo.advertiserId === '7056395', 'Apollo Optik Advertiser-ID ist 7056395');
assert(MERCHANTS.apollo.commissionRate === null, 'Apollo commissionRate ist strikt null');
assert(MERCHANTS.apollo.commissionStatus === 'UNCONFIRMED', 'Apollo commissionStatus ist UNCONFIRMED');

// Lensbest (Bewerbung läuft)
assert(MERCHANTS.lensbest.programStatus === MERCHANT_PROGRAM_STATUS.APPLIED, 'Lensbest ist APPLIED (Bewerbung läuft)');
assert(MERCHANTS.lensbest.advertiserId === '6440401', 'Lensbest Advertiser-ID ist 6440401');
assert(MERCHANTS.lensbest.commissionRate === null, 'Lensbest commissionRate ist strikt null');

// Linsenplatz (Bewerbung läuft)
assert(MERCHANTS.linsenplatz.programStatus === MERCHANT_PROGRAM_STATUS.APPLIED, 'Linsenplatz ist APPLIED (Bewerbung läuft)');
assert(MERCHANTS.linsenplatz.advertiserId === '14469', 'Linsenplatz Advertiser-ID ist 14469');
assert(MERCHANTS.linsenplatz.commissionRate === null, 'Linsenplatz commissionRate ist strikt null');

// Lentiamo (noch nicht verifiziert / Discovered)
assert(MERCHANTS.lentiamo.programStatus === MERCHANT_PROGRAM_STATUS.DISCOVERED, 'Lentiamo ist DISCOVERED');
assert(MERCHANTS.lentiamo.commissionRate === null, 'Lentiamo commissionRate ist strikt null');

// ----------------------------------------------------
// 2. Apollo-Pilot: 5 Familien & 10 Packungsvarianten
// ----------------------------------------------------
console.log('\n--- 2. Apollo-Pilot (5 Familien, 10 Packungsvarianten) ---');
const expectedFamilies = ['biofinity', 'biofinity-toric', 'airoptix-hydraglyde', 'dailies-total-1', 'myday-daily'];

assert(Object.keys(APOLLO_PILOT_FAMILIES).length === 5, 'Exakt 5 Produktfamilien definiert');

let totalVariantsCount = 0;
for (const famId of expectedFamilies) {
  assert(hasApolloPilotOffer(famId), `Familie ${famId} existiert im Pilot-Register`);
  const fam = getApolloPilotFamily(famId);
  assert(Array.isArray(fam.variants) && fam.variants.length === 2, `Familie ${famId} besitzt exakt 2 Packungsvarianten`);

  for (const v of fam.variants) {
    totalVariantsCount++;
    assert(v.targetUrl.startsWith('https://www.apollo.de/kontaktlinsen/p-'), `Variante ${v.variantId} URL beginnt mit https://www.apollo.de/kontaktlinsen/p-`);
    assert(v.affiliateUrl === null, `Variante ${v.variantId} affiliateUrl ist null`);
    assert(v.affiliateLinkStatus === OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL, `Variante ${v.variantId} affiliateLinkStatus ist PENDING_PROGRAM_APPROVAL`);
    assert(v.isProductionActive === false, `Variante ${v.variantId} isProductionActive ist false`);
    assert(v.commissionRate === null, `Variante ${v.variantId} commissionRate ist null`);
    assert(v.price === null, `Variante ${v.variantId} price ist null (keine erfundenen Preise)`);
    assert(v.availability === 'UNCONFIRMED', `Variante ${v.variantId} availability ist UNCONFIRMED`);
    assert(['LIVE_PAGE_VERIFIED', 'CATALOG_FACET_VERIFIED'].includes(v.verificationStatus), `Variante ${v.variantId} hat gültigen Verifikationsstatus (${v.verificationStatus})`);
  }
}
assert(totalVariantsCount === 10, 'Exakt 10 Packungsvarianten über alle 5 Familien konfiguriert');

// Spezifischer Test MyDay 90er
const mydayFam = getApolloPilotFamily('myday-daily');
const myday90 = mydayFam.variants.find(v => v.variantId === 'myday-daily-90er');
assert(myday90.packCount === 90, 'MyDay 90er Packung hat echten packCount = 90');
assert(myday90.packSizeText === '90er-Packung (90 Linsen)', 'MyDay 90er hat bereinigten packSizeText');

// ----------------------------------------------------
// 3. Fail-Closed Aktivierungsschutz
// ----------------------------------------------------
console.log('\n--- 3. Fail-Closed Aktivierungsschutz & Validierung ---');

// Test A: Händler mit Status APPLIED darf NIE gerendert werden
const apolloOffer = getApolloPilotOffer('biofinity');
const apolloVal = validateMerchantOffer(apolloOffer);
assert(!apolloVal.canRender, 'Apollo-Angebot darf bei programStatus APPLIED NICHT gerendert werden (canRender === false)');
assert(apolloVal.errors.some(e => e.includes('ACTIVE_PRODUCTION')), 'Fehlermeldung weist auf fehlenden ACTIVE_PRODUCTION Status hin');

// Test B: Simulierte Link-Injektion bei Status APPLIED wird abgewiesen
const simulatedInjectedOffer = {
  ...apolloOffer,
  affiliateUrl: 'https://www.anrdoezrs.net/click-12345-7056395?url=https%3A%2F%2Fwww.apollo.de%2Fkontaktlinsen',
  affiliateLinkStatus: OFFER_LINK_STATUS.LINK_VERIFIED
};
const injectedVal = validateMerchantOffer(simulatedInjectedOffer);
assert(!injectedVal.canRender, 'Injected Link bei Status APPLIED wird vom Fail-Closed Gate abgewiesen');

// Test C: CJ-Validierung Kennzeichnung
const cjCheck = validateCjUrl('https://www.anrdoezrs.net/click-12345-7056395?url=https%3A%2F%2Fwww.apollo.de%2Ftest', { domain: 'apollo.de' });
assert(cjCheck.validationStatus === 'PENDING_REAL_LINK_VERIFICATION', 'CJ-Validierung hat Status PENDING_REAL_LINK_VERIFICATION');
assert(cjCheck.valid === true, 'Konforme CJ-URL passiert strukturelle Basisprüfung');

// Test D: CJ Phishing-Domain Abweisung
const cjPhish = validateCjUrl('https://www.phishing-fake.com/click?url=https%3A%2F%2Fwww.apollo.de');
assert(!cjPhish.valid, 'CJ Validator weist unautorisierte Domain ab');

// ----------------------------------------------------
// 4. Baseline-Schutz: Amazon & Mister Spex
// ----------------------------------------------------
console.log('\n--- 4. Baseline-Schutz (Amazon & Mister Spex) ---');
assert(PRODUCTS.length === 57, 'Exakt 57 Produkte im Katalog');

let validAmzCount = 0;
let validMsCount = 0;

for (const p of PRODUCTS) {
  const prodOffers = getOffersForProduct(p.id, { includePilots: false });
  
  // Amazon Prüfung
  const amz = prodOffers.find(o => o.merchantId === 'amazon');
  assert(Boolean(amz), `Produkt ${p.id} hat valides Amazon-Angebot`);
  if (amz) validAmzCount++;

  // Mister Spex Prüfung
  const ms = prodOffers.find(o => o.merchantId === 'mister_spex');
  const shouldHaveMs = hasMisterSpexOffer(p.id);
  assert(Boolean(ms) === shouldHaveMs, `Produkt ${p.id} Mister Spex Präsenz korrekt (${Boolean(ms)} === ${shouldHaveMs})`);
  if (ms) validMsCount++;

  // Apollo Prüfung (darf in Produktiv-Einstellung NIE gerendert werden)
  const ap = prodOffers.find(o => o.merchantId === 'apollo');
  assert(!ap, `Apollo ist für Produkt ${p.id} im Produktiv-Modus nicht vorhanden`);
}

assert(validAmzCount === 57, 'Exakt 57 Amazon-Angebote aktiv');
assert(validMsCount === 7, 'Exakt 7 Mister-Spex-Angebote aktiv');

// ----------------------------------------------------
// 5. Gesamtergebnis
// ----------------------------------------------------
console.log('\n====================================================');
if (fails === 0) {
  console.log(`✅ Alle ${passes} Multi-Merchant Konsolidierungstests erfolgreich bestanden!`);
  process.exit(0);
} else {
  console.error(`❌ ${fails} Tests fehlgeschlagen!`);
  process.exit(1);
}
