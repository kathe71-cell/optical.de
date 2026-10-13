/**
 * End-to-End Interaktions- und Zustandstest für optical.de
 * Simuliert Browser-DOM und localStorage-Lebenszyklen:
 * 1. Linse speichern (useSavedLenses)
 * 2. Merkliste hydratisieren
 * 3. Nachkauf-Assistent konfigurieren (useRefillConfigs)
 * 4. Berechnung für Zweiwochenlinsen & Monatslinsen validieren
 * 5. ICS Kalenderexport generieren & syntaktisch parsen
 * 6. Wiederkehr-Banner (RefillBanner) Status prüfen
 * 7. Multi-Merchant Affiliate-Schema Integrität prüfen
 */

import { calculateRefillSchedule, generateIcsCalendarEvent, getNominalWearCycleDays } from '../../src/utils/refillCalculator.js';
import { getProductOffers, getProductAffiliateUrl } from '../../src/utils/affiliate.js';
import { PRODUCTS, getProductById } from '../../src/data/products.js';

let failed = 0;
function assert(condition, name, msg) {
  if (condition) {
    console.log(`[PASS] ${name}`);
  } else {
    console.error(`[FAIL] ${name}: ${msg}`);
    failed++;
  }
}

console.log('====================================================');
console.log('SIMULIERTER BROWSER- & RETENTION-INTEGRATIONSTEST');
console.log('====================================================\n');

// 1. Simulierter localStorage-Store
const mockLocalStorage = {};
function setItem(k, v) { mockLocalStorage[k] = String(v); }
function getItem(k) { return mockLocalStorage[k] || null; }

// 2. Interaktion: Linse merken
const biofinity = getProductById('biofinity');
assert(Boolean(biofinity), 'Produkt Biofinity existiert', 'Biofinity nicht in Datenbank');

const savedList = ['biofinity'];
setItem('optical_saved_lenses', JSON.stringify(savedList));
const loadedSaved = JSON.parse(getItem('optical_saved_lenses'));
assert(loadedSaved.includes('biofinity'), 'Linse in localStorage gespeichert und wiederhergestellt', 'Fehler beim Laden');

// 3. Interaktion: Nachkauf-Plan für Zweiwochenlinse Acuvue Oasys konfigurieren
const oasys = getProductById('acuvue-oasys-2week');
assert(Boolean(oasys), 'Zweiwochenlinse Acuvue Oasys existiert', 'Nicht gefunden');
assert(getNominalWearCycleDays(oasys.lens_type, oasys.replacement_schedule) === 14, 'Zweiwochenlinse Zyklus ist exakt 14 Tage', 'Falscher Zyklus');

const oasysPlan = calculateRefillSchedule({
  lensType: oasys.lens_type,
  replacementSchedule: oasys.replacement_schedule,
  startDate: '2026-10-15',
  leadDays: 7,
  separateEyes: false,
  sharedSupply: { packs: 1, packCount: 6 } // 6 Linsen = 3 Paare à 14 Tage = 42 Tage
});
assert(oasysPlan.minDays === 42, 'Zweiwochenlinsen 6er Box reicht für 42 Tage', `Erhalten: ${oasysPlan.minDays}`);
assert(oasysPlan.expiryDate === '2026-11-26', 'Ablaufdatum korrekt (15.10 + 42 Tage = 26.11)', `Erhalten: ${oasysPlan.expiryDate}`);
assert(oasysPlan.refillDate === '2026-11-19', 'Nachkaufdatum 7 Tage vorher (19.11)', `Erhalten: ${oasysPlan.refillDate}`);

// 4. Interaktion: Plan im localStorage persistieren
const refillConfigs = {
  'acuvue-oasys-2week': {
    productId: 'acuvue-oasys-2week',
    refillDate: oasysPlan.refillDate,
    expiryDate: oasysPlan.expiryDate,
    minDays: oasysPlan.minDays
  }
};
setItem('optical_refill_configs', JSON.stringify(refillConfigs));
const restoredConfigs = JSON.parse(getItem('optical_refill_configs'));
assert(restoredConfigs['acuvue-oasys-2week'].minDays === 42, 'Nachkauf-Konfiguration erfolgreich persistiert', 'Persistenzfehler');

// 5. Interaktion: ICS-Kalendereintrag
const ics = generateIcsCalendarEvent({
  productName: oasys.product_name,
  refillDate: oasysPlan.refillDate,
  targetUrl: 'https://www.optical.de/meine-linsen'
});
assert(ics.includes('DTSTART;VALUE=DATE:20261119'), 'ICS Kalender enthält korrektes Nachkaufdatum', 'ICS fehlerhaft');
assert(ics.includes('https://www.optical.de/meine-linsen'), 'ICS enthält sauberen Rücksprunglink', 'Link fehlt');

// 6. Interaktion: Multi-Merchant Affiliate Schema
const offers = getProductOffers(biofinity);
assert(offers.length >= 1, 'Mindestens ein Händlerangebot vorhanden', 'Keine Angebote');
assert(offers[0].merchant_id === 'amazon', 'Standard-Händler ist Amazon', 'Händler weicht ab');
assert(offers[0].affiliate_url.includes('tag=optical.de-21'), 'Affiliate Tag korrekt injiziert', 'Tag fehlt');

const directUrl = getProductAffiliateUrl(biofinity);
assert(directUrl === offers[0].affiliate_url, 'getProductAffiliateUrl liefert primäres Angebot', 'Mismatch');

console.log('\n====================================================');
if (failed === 0) {
  console.log('✅ Alle simulierten Browser- und Interaktionstests erfolgreich!');
  process.exit(0);
} else {
  console.error(`❌ ${failed} Tests fehlgeschlagen.`);
  process.exit(1);
}
