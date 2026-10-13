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
 * Erzeugt einen standardkonformen .ics Kalendereintrag für den Nachkauf
 * 
 * @param {Object} params
 * @param {string} params.productName - Produktname
 * @param {string} params.refillDate - YYYY-MM-DD
 * @param {string} params.targetUrl - Rücksprunglink zu optical.de/meine-linsen
 * @returns {string} ICS Dateistring
 */
export function generateIcsCalendarEvent({ productName, refillDate, targetUrl = 'https://www.optical.de/meine-linsen' }) {
  if (!refillDate) return '';

  const cleanDate = refillDate.replace(/-/g, '');
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `optical-refill-${cleanDate}-${Math.random().toString(36).substring(2, 9)}@optical.de`;

  // Format: Ganztägiges Ereignis (DTSTART;VALUE=DATE:YYYYMMDD)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//optical.de//Nachkauf-Assistent//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${cleanDate}`,
    `SUMMARY:Kontaktlinsen nachbestellen (${productName || 'optical.de'})`,
    `DESCRIPTION:Ihr Kontaktlinsenvorrat geht in Kürze zu Ende. Jetzt Angebote prüfen und rechtzeitig nachbestellen: ${targetUrl}`,
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
  ].join('\r\n');
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
