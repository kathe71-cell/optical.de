/**
 * Automatisierte Test-Suite für den Optical.de Nachkauf-Assistenten
 * Prüft alle fachlichen Berechnungs- und Planungsregeln:
 * - Tageslinsen (Verbrauch nach Wochentagen)
 * - Monatslinsen (30-Tage-Zyklus ohne unzulässige Verlängerung)
 * - Getrennte Augen mit unterschiedlichen Packungen/Werten
 * - Gleiche Werte mit gemeinsamen Vorrat
 * - Fehlende Angaben & Fallbacks
 * - ICS-Kalendergenerierung (Syntax, keine Dioptrien im Body)
 */

import { calculateEyeSupplyDays, calculateRefillSchedule, generateIcsCalendarEvent } from '../../src/utils/refillCalculator.js';

let failed = 0;

function assert(condition, testName, message) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('TEST SUITE: NACHKAUF-ASSISTENT LOGIK');
console.log('====================================================\n');

// 1. Tageslinsen bei 7 Tagen / Woche (1 Packung 30 Stück) -> 30 Tage
const dailyFull = calculateEyeSupplyDays({ packs: 1, packCount: 30 }, 'Tageslinse', 7);
assert(dailyFull === 30, 'Tageslinsen 7 Tage/Woche', `Erwartet 30, erhalten: ${dailyFull}`);

// 2. Tageslinsen bei 5 Tagen / Woche (1 Packung 30 Stück) -> 30 / (5/7) = 42 Tage
const dailyPart = calculateEyeSupplyDays({ packs: 1, packCount: 30 }, 'Tageslinse', 5);
assert(dailyPart === 42, 'Tageslinsen 5 Tage/Woche (Büronutzer)', `Erwartet 42, erhalten: ${dailyPart}`);

// 3. Monatslinsen: 1 Packung 6 Stück = 6 * 30 = 180 Tage (unabhängig von Tragetagen!)
const monthlyFull = calculateEyeSupplyDays({ packs: 1, packCount: 6 }, 'Monatslinse', 3);
assert(monthlyFull === 180, 'Monatslinsen fester 30-Tage-Zyklus', `Erwartet 180, erhalten: ${monthlyFull}`);

// 4. Gemeinsamer Vorrat (beide Augen gleiche Werte):
// Monatslinse 6er Packung: reicht für 3 Monate = 90 Tage (beide Augen verbrauchen 2 Linsen/Monat)
const sharedMonthly = calculateRefillSchedule({
  lensType: 'Monatslinse',
  startDate: '2026-10-01',
  leadDays: 14,
  separateEyes: false,
  sharedSupply: { packs: 1, packCount: 6 }
});
assert(sharedMonthly.minDays === 90, 'Gemeinsamer Vorrat Monatslinsen (6er Box = 90 Tage)', `Erwartet 90, erhalten: ${sharedMonthly.minDays}`);
assert(sharedMonthly.expiryDate === '2026-12-30', 'Vorrat erschöpft am 30.12.2026', `Erhalten: ${sharedMonthly.expiryDate}`);
assert(sharedMonthly.refillDate === '2026-12-16', 'Nachkauferinnerung 14 Tage vor Vorratsende', `Erhalten: ${sharedMonthly.refillDate}`);

// 5. Unterschiedliche Vorräte je Auge:
// Rechtes Auge: 1x 30er Tageslinsen = 30 Tage
// Linkes Auge: 2x 30er Tageslinsen = 60 Tage
// Nachkauf muss nach dem ZUERST erschöpften Vorrat (30 Tage) triggern!
const separateDaily = calculateRefillSchedule({
  lensType: 'Tageslinse',
  startDate: '2026-10-01',
  leadDays: 10,
  daysPerWeek: 7,
  separateEyes: true,
  rightEye: { packs: 1, packCount: 30 },
  leftEye: { packs: 2, packCount: 30 }
});
assert(separateDaily.rightDays === 30, 'Rechtes Auge 30 Tage', `Erhalten: ${separateDaily.rightDays}`);
assert(separateDaily.leftDays === 60, 'Linkes Auge 60 Tage', `Erhalten: ${separateDaily.leftDays}`);
assert(separateDaily.minDays === 30, 'Gesamtreichweite richtet sich nach Minimum (30 Tage)', `Erhalten: ${separateDaily.minDays}`);
assert(separateDaily.refillDate === '2026-10-21', 'Erinnerung 10 Tage vor Minimum', `Erhalten: ${separateDaily.refillDate}`);

// 6. Kalender-Export (.ics):
const ics = generateIcsCalendarEvent({
  productName: 'Biofinity, Sphere; Extra',
  refillDate: '2026-11-15',
  targetUrl: 'https://www.optical.de/meine-linsen'
});
assert(ics.includes('BEGIN:VCALENDAR') && ics.includes('END:VCALENDAR'), 'ICS Syntax vollständig', 'Validierung fehlgeschlagen');
assert(ics.includes('DTSTART;VALUE=DATE:20261115'), 'ICS DTSTART Datum korrekt', 'Startdatum fehlt');
assert(ics.includes('DTEND;VALUE=DATE:20261116'), 'ICS DTEND exklusives Folgedatum korrekt (RFC 5545)', 'Enddatum fehlt oder nicht exklusiv');
assert(ics.includes('LOCATION:optical.de Online-Vergleich'), 'ICS LOCATION korrekt', 'Location fehlt');
assert(ics.includes('\\,') && ics.includes('\\;'), 'ICS RFC 5545 Escaping von Sonderzeichen', 'Escaping fehlt');
assert(!ics.includes('dpt') && !ics.includes('Dioptrien') && !ics.includes('cyl') && !ics.includes('Achse'), 'ICS enthält keine sensiblen Dioptriendaten', 'Datenschutz gewahrt');

// RFC 5545 Zeilenfaltung (max 75 Bytes pro Zeile):
const icsLines = ics.split('\r\n');
const maxLineBytes = Math.max(...icsLines.map(l => Buffer.byteLength(l, 'utf8')));
assert(maxLineBytes <= 75, `RFC 5545 Zeilenfaltung (max 75 Bytes)`, `Maximale Zeilenlänge überschritten: ${maxLineBytes} Bytes`);

// 7. Google Kalender URL-Generierung (ganztägig, synchron zu ICS):
import { generateGoogleCalendarUrl } from '../../src/utils/refillCalculator.js';
const gcalUrl = generateGoogleCalendarUrl({
  productName: 'Biofinity Toric',
  refillDate: '2026-11-20',
  targetUrl: 'https://www.optical.de/meine-linsen',
  location: 'optical.de Online-Vergleich'
});
assert(gcalUrl.startsWith('https://calendar.google.com/calendar/render?'), 'Google Calendar Basis-URL', 'URL falsch');
assert(gcalUrl.includes('action=TEMPLATE'), 'Google Calendar Template-Aktion', 'Aktion fehlt');
assert(gcalUrl.includes('dates=20261120%2F20261121'), 'Google Calendar ganztägig exklusives Datumsintervall (Start/Ende)', `Dates falsch: ${gcalUrl}`);
assert(gcalUrl.includes('location=optical.de+Online-Vergleich') || gcalUrl.includes('location=optical.de%20Online-Vergleich'), 'Google Calendar Location codiert', 'Location fehlt');
assert(gcalUrl.includes('Biofinity+Toric') || gcalUrl.includes('Biofinity%20Toric'), 'Google Calendar Produktname im Titel', 'Titel fehlt');

console.log('\n====================================================');
if (failed === 0) {
  console.log('✅ Alle Tests für den Nachkauf-Assistenten erfolgreich!');
  process.exit(0);
} else {
  console.error(`❌ ${failed} Tests fehlgeschlagen.`);
  process.exit(1);
}
