/**
 * Berechnungs- und Planungslogik für den Optical.de Nachkauf-Assistenten.
 * 
 * Unterstützt:
 * - Tageslinsen (Verbrauch nach Nutzungstagen/Woche, getrennt je Auge)
 * - Monatslinsen (30-Tage-Austauschzyklus)
 * - Zweiwochenlinsen (14-Tage-Austauschzyklus)
 * - Angebrochene Vorräte (volle Packungen + einzelne Linsen)
 * - Individuelle Vorräte je Auge (z. B. unterschiedliche Stärken / Packungen)
 * - Schutz vor vergangenen Terminen (Überfälligkeits-Status)
 * - Kalender-Export (.ics) ohne Weitergabe medizinischer Parameter
 */

/**
 * Ermittelt die nominelle Tragedauer einer einzelnen Linse in Tagen
 * basierend auf lens_type und replacement_schedule.
 * 
 * @param {string} lensType 
 * @param {string} replacementSchedule 
 * @returns {number} Tage (1 für Tageslinse, 14 für Zweiwochenlinse, 30 für Monatslinse)
 */
export function getNominalWearCycleDays(lensType = '', replacementSchedule = '') {
  const lt = (lensType || '').toLowerCase();
  const rs = (replacementSchedule || '').toLowerCase();

  if (lt.includes('tag') || rs.includes('1 tag')) {
    return 1;
  }
  if (lt.includes('zweiwoch') || lt.includes('2-woch') || rs.includes('14 tag')) {
    return 14;
  }
  // Standard-Monatslinse
  return 30;
}

/**
 * Berechnet die Reichweite in Tagen für ein Auge
 * 
 * @param {Object} eyeConfig - { packs, packCount, individualLenses }
 * @param {string} lensType - z. B. 'Tageslinse', 'Zweiwochlinse', 'Monatslinse'
 * @param {number} daysPerWeek - Nutzungstage pro Woche (1 bis 7, nur bei Tageslinsen wirksam)
 * @param {string} replacementSchedule - z. B. '14 Tage', '30 Tage'
 * @returns {number} Reichweite in Kalendertagen
 */
export function calculateEyeSupplyDays({ packs = 1, packCount = 30, individualLenses = 0 }, lensType = 'Tageslinse', daysPerWeek = 7, replacementSchedule = '') {
  const totalLenses = (Number(packs) || 0) * (Number(packCount) || 0) + (Number(individualLenses) || 0);
  if (totalLenses <= 0) return 0;

  const cycleDays = getNominalWearCycleDays(lensType, replacementSchedule);

  if (cycleDays === 1) {
    // Bei Tageslinsen: 1 Linse pro Tragetag für dieses Auge.
    // Tragefrequenz: daysPerWeek von 7 Tagen.
    const freq = Math.min(Math.max(Number(daysPerWeek) || 7, 1), 7);
    const usagePerDay = freq / 7;
    return Math.floor(totalLenses / usagePerDay);
  } else {
    // Bei Monatslinsen (30 Tage) und Zweiwochenlinsen (14 Tage):
    // Eine geöffnete Linse muss nach Ablauf der Haltbarkeit entsorgt werden,
    // unabhängig davon, wie oft sie getragen wurde (keine medizinisch unzulässige Verlängerung!).
    return totalLenses * cycleDays;
  }
}

/**
 * Berechnet den empfohlenen Nachkauftermin für den Gesamtvorrat
 * 
 * @param {Object} config - Vollständige Konfiguration
 * @returns {Object} { rightDays, leftDays, minDays, expiryDate, refillDate, leadDays, isOverdue }
 */
export function calculateRefillSchedule(config) {
  const {
    lensType = 'Tageslinse',
    replacementSchedule = '',
    daysPerWeek = 7,
    startDate = new Date().toISOString().split('T')[0],
    leadDays = 14,
    separateEyes = false,
    sharedSupply = { packs: 1, packCount: 30, individualLenses: 0 },
    rightEye = { packs: 1, packCount: 30, individualLenses: 0 },
    leftEye = { packs: 1, packCount: 30, individualLenses: 0 }
  } = config;

  let rightDays = 0;
  let leftDays = 0;

  const cycleDays = getNominalWearCycleDays(lensType, replacementSchedule);

  if (!separateEyes) {
    // Wenn Werte beider Augen gleich sind, teilen sich beide Augen den gemeinsamen Vorrat.
    // Jedes Auge verbraucht bei beidseitigem Tragen 1 Linse pro Zyklus.
    const totalLenses = (Number(sharedSupply.packs) || 0) * (Number(sharedSupply.packCount) || 0) + (Number(sharedSupply.individualLenses) || 0);
    const freq = Math.min(Math.max(Number(daysPerWeek) || 7, 1), 7);

    if (cycleDays === 1) {
      // 2 Linsen pro Tragetag (Rechts + Links)
      const usagePerCalendarDay = (2 * freq) / 7;
      const days = usagePerCalendarDay > 0 ? Math.floor(totalLenses / usagePerCalendarDay) : 0;
      rightDays = days;
      leftDays = days;
    } else {
      // 2 Linsen pro Zyklus (14 oder 30 Tage) für beide Augen
      const pairs = Math.floor(totalLenses / 2);
      const days = pairs * cycleDays;
      rightDays = days;
      leftDays = days;
    }
  } else {
    // Getrennte Vorräte je Auge
    rightDays = calculateEyeSupplyDays(rightEye, lensType, daysPerWeek, replacementSchedule);
    leftDays = calculateEyeSupplyDays(leftEye, lensType, daysPerWeek, replacementSchedule);
  }

  // Der Nachkauf richtet sich deterministisch nach dem ZUERST erschöpften Vorrat
  const minDays = Math.min(rightDays, leftDays);

  const start = new Date(startDate);
  const expiryDate = new Date(start);
  expiryDate.setDate(expiryDate.getDate() + minDays);

  // Nachkauf-Erinnerungsdatum mit Vorlauf
  const effectiveLeadDays = Math.min(Number(leadDays) || 14, minDays);
  const refillDate = new Date(expiryDate);
  refillDate.setDate(refillDate.getDate() - effectiveLeadDays);

  const todayStr = new Date().toISOString().split('T')[0];
  const refillDateStr = refillDate.toISOString().split('T')[0];
  const isOverdue = refillDateStr <= todayStr;

  return {
    rightDays,
    leftDays,
    minDays,
    cycleDays,
    expiryDate: expiryDate.toISOString().split('T')[0],
    refillDate: refillDateStr,
    leadDays: effectiveLeadDays,
    isOverdue
  };
}

/**
 * Hilfsfunktion zum sauberen Escapen von Textfeldern nach RFC 5545 (iCalendar)
 * Backslash, Semikolon, Komma und Zeilenumbrüche müssen escaped werden.
 */
function escapeIcsText(text = '') {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Berechnet das exklusive Folgedatum (DTEND = Startdatum + 1 Tag) für ein ganztägiges Ereignis.
 * Format: YYYYMMDD
 */
function getExclusiveNextDay(dateStr) {
  // dateStr im Format YYYY-MM-DD
  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const dateObj = new Date(Date.UTC(year, month, day));
  dateObj.setUTCDate(dateObj.getUTCDate() + 1);

  const nextY = dateObj.getUTCFullYear();
  const nextM = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const nextD = String(dateObj.getUTCDate()).padStart(2, '0');
  return `${nextY}${nextM}${nextD}`;
}

/**
 * Faltet eine iCalendar-Zeile gemäß RFC 5545 (Section 3.1):
 * Zeilen dürfen maximal 75 Oktette (Bytes) lang sein. Längere Zeilen werden
 * durch CRLF gefolgt von einem einzelnen Leerzeichen fortgesetzt.
 */
function foldIcsLine(line) {
  const buf = Buffer.from(line, 'utf8');
  if (buf.length <= 75) {
    return line;
  }

  const chunks = [];
  let currentStart = 0;
  let isFirst = true;

  while (currentStart < line.length) {
    // Erstes Segment darf bis zu 75 Bytes lang sein, Folgezeilen bis zu 74 Bytes (da 1 Byte für führendes Leerzeichen reserviert ist)
    const maxBytes = isFirst ? 75 : 74;
    let end = currentStart;
    let validEnd = currentStart;

    while (end < line.length) {
      const candidate = line.slice(currentStart, end + 1);
      if (Buffer.byteLength(candidate, 'utf8') <= maxBytes) {
        validEnd = end + 1;
        end++;
      } else {
        break;
      }
    }

    if (validEnd === currentStart) {
      // Sicherheits-Fallback falls ein einzelnes Zeichen > maxBytes ist
      validEnd = currentStart + 1;
    }

    const chunk = line.slice(currentStart, validEnd);
    chunks.push(isFirst ? chunk : ` ${chunk}`);
    isFirst = false;
    currentStart = validEnd;
  }

  return chunks.join('\r\n');
}

/**
 * Erzeugt einen standardkonformen .ics Kalendereintrag für den Nachkauf
 * Ganztägiges Ereignis nach RFC 5545 mit inclusive DTSTART und exclusive DTEND.
 * 
 * @param {Object} params
 * @param {string} params.productName - Produktname
 * @param {string} params.refillDate - YYYY-MM-DD
 * @param {string} [params.targetUrl] - Rücksprunglink zu optical.de/meine-linsen
 * @param {string} [params.location] - Ort / Plattform
 * @returns {string} ICS Dateistring
 */
export function generateIcsCalendarEvent({
  productName,
  refillDate,
  targetUrl = 'https://www.optical.de/meine-linsen',
  location = 'optical.de Online-Vergleich'
}) {
  if (!refillDate) return '';

  const cleanStartDate = refillDate.replace(/-/g, '');
  const cleanEndDate = getExclusiveNextDay(refillDate);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `optical-refill-${cleanStartDate}-${Math.random().toString(36).substring(2, 9)}@optical.de`;
  const prod = productName || 'optical.de';

  const summary = escapeIcsText(`Kontaktlinsen nachbestellen (${prod})`);
  const description = escapeIcsText(`Ihr Kontaktlinsenvorrat (${prod}) geht in Kürze zu Ende. Jetzt Angebote prüfen und rechtzeitig nachbestellen: ${targetUrl}`);
  const escapedLocation = escapeIcsText(location);

  // RFC 5545 konformes ganztägiges Ereignis mit Zeilenfaltung:
  // DTSTART;VALUE=DATE:YYYYMMDD
  // DTEND;VALUE=DATE:YYYYMMDD (exklusiv = nächster Tag)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//optical.de//Nachkauf-Assistent//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${cleanStartDate}`,
    `DTEND;VALUE=DATE:${cleanEndDate}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapedLocation}`,
    `URL:${targetUrl}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Erinnerung: Kontaktlinsen nachbestellen',
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return lines.map(foldIcsLine).join('\r\n');
}

/**
 * Erzeugt eine vorausgefüllte Google Calendar URL für das ganztägige Nachkaufereignis.
 * Google Calendar erwartet für ganztägige Events: dates=YYYYMMDD/YYYYMMDD (Start/Ende exklusiv)
 * 
 * @param {Object} params
 * @param {string} params.productName - Produktname
 * @param {string} params.refillDate - YYYY-MM-DD
 * @param {string} [params.targetUrl] - Rücksprunglink
 * @param {string} [params.location] - Ort (Default: 'optical.de Online-Vergleich')
 * @returns {string} Vollständige Google Calendar Web-URL
 */
export function generateGoogleCalendarUrl({
  productName,
  refillDate,
  targetUrl = 'https://www.optical.de/meine-linsen',
  location = 'optical.de Online-Vergleich'
}) {
  if (!refillDate) return '';

  const cleanStartDate = refillDate.replace(/-/g, '');
  const cleanEndDate = getExclusiveNextDay(refillDate);
  const prod = productName || 'optical.de';
  const title = `Kontaktlinsen nachbestellen (${prod})`;
  const details = `Ihr Kontaktlinsenvorrat (${prod}) geht in Kürze zu Ende. Jetzt Angebote prüfen und rechtzeitig nachbestellen: ${targetUrl}`;

  // Ganztägiges Ereignis in Google Calendar: dates=YYYYMMDD/YYYYMMDD (ohne 'T' und Uhrzeit)
  const datesParam = `${cleanStartDate}/${cleanEndDate}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details: details,
    location: location
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Startet den Browser-Download einer ICS-Datei
 * 
 * @param {string} icsContent 
 * @param {string} filename 
 */
export function downloadIcsFile(icsContent, filename = 'kontaktlinsen-nachbestellen.ics') {
  if (typeof window === 'undefined' || !icsContent) return;
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
