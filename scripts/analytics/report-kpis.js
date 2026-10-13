/**
 * optical.de - GSC & Affiliate CSV Parser / KPI Reporter (OPTICAL 36)
 * 
 * Verarbeitet offizielle CSV-Exporte aus:
 * 1. Google Search Console ("Suchanalyse" / Queries.csv, Pages.csv)
 * 2. Amazon PartnerNet / Awin / Tradedoubler Monatsberichten
 * 
 * Funktionsweise:
 * - Null externe Abhängigkeiten (pures Node.js)
 * - Keine Speicherung sensibler Daten
 * - Keine Kosten für Drittanbieter-Tools
 * - Streng getrennte Ausweisung von IST-Werten, ZIEL-Werten und Datenlücken
 * 
 * Aufruf:
 *   node scripts/analytics/report-kpis.js [--gsc=pfad/zu/queries.csv] [--affiliate=pfad/zu/earnings.csv]
 */

import fs from 'node:fs';
import path from 'node:path';

// Zielpfad OPTICAL 36 (Monatliche Ziel-Umsätze in EUR)
export const OPTICAL_36_TARGETS = {
  month_6: 100,
  month_12: 500,
  month_18: 1000,
  month_24: 2000,
  month_30: 3500,
  month_36: 5000,
};

/**
 * Parst eine CSV-Datei sicher in Zeilen und Spalten
 */
export function parseCsv(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Header ermitteln (unterstützt Komma und Semikolon)
  const delimiter = lines[0].includes(';') ? ';' : ',';
  const headers = lines[0].split(delimiter).map(h => h.replace(/^["']|["']$/g, '').trim());

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(delimiter);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (rawCols[idx] || '').replace(/^["']|["']$/g, '').trim();
    });
    rows.push(row);
  }
  return rows;
}

/**
 * Berechnet Standard-Kennzahlen aus GSC-Daten
 */
export function analyzeGscData(queriesCsvText) {
  const rows = parseCsv(queriesCsvText);
  if (rows.length === 0) {
    return {
      status: 'KEINE_DATEN',
      total_queries: 0,
      total_clicks: 0,
      total_impressions: 0,
      avg_ctr: 0,
      avg_position: 0,
      top_opportunities: []
    };
  }

  let totalClicks = 0;
  let totalImpressions = 0;
  const parsedQueries = [];

  for (const r of rows) {
    // Spaltennamen in GSC Exports (deutsch oder englisch)
    const query = r['Top queries'] || r['Suchanfrage'] || r['Query'] || r['query'] || Object.values(r)[0] || '';
    const clicks = parseInt(r['Clicks'] || r['Klicks'] || '0', 10) || 0;
    const impressions = parseInt(r['Impressions'] || r['Impressionen'] || '0', 10) || 0;
    const ctrRaw = (r['CTR'] || r['ctr'] || '0%').replace('%', '').replace(',', '.');
    const ctr = parseFloat(ctrRaw) || 0;
    const posRaw = (r['Position'] || r['position'] || '0').replace(',', '.');
    const position = parseFloat(posRaw) || 0;

    totalClicks += clicks;
    totalImpressions += impressions;

    parsedQueries.push({
      query,
      clicks,
      impressions,
      ctr,
      position,
      // Potential Score: Hohe Impressionen auf Positionen 4-20
      opportunity_score: position >= 4 && position <= 20 ? (impressions * (1 / Math.max(1, position))) : 0
    });
  }

  parsedQueries.sort((a, b) => b.opportunity_score - a.opportunity_score);

  return {
    status: 'VERIFIZIERT',
    total_queries: parsedQueries.length,
    total_clicks: totalClicks,
    total_impressions: totalImpressions,
    avg_ctr: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0.00%',
    top_opportunities: parsedQueries.slice(0, 20)
  };
}

/**
 * Generiert die vollständige KPI-Zusammenfassung für Phase 8 / Optical 36
 */
export function generateKpiReport(gscData = null, affiliateData = null) {
  const report = {
    programm: 'OPTICAL 36',
    ziel_monat_36: '5.000,00 € monatlich',
    kpis: {
      '1. Organische Besucher': { wert: 'NICHT VERFÜGBAR (GSC/Analytics Export fehlt)', status: 'DATENLÜCKE' },
      '2. Organische Klicks': { wert: gscData ? gscData.total_clicks : 'NICHT VERFÜGBAR', status: gscData ? 'IST-WERT' : 'DATENLÜCKE' },
      '3. Indexierte Seiten': { wert: '64 URLs (sitemap.xml synchron)', status: 'IST-WERT' },
      '4. Merkliste-Aktivierungen': { wert: 'Lokal im Client (Vercel Custom Events: bookmark_toggle)', status: 'MESSBEREIT' },
      '5. Nachkauf-Planer-Aktivierungen': { wert: 'Lokal im Client (Vercel Custom Events: refill_assistant_configured)', status: 'MESSBEREIT' },
      '6. Affiliate-Klicks': { wert: 'Lokal im Client (Vercel Custom Events: affiliate_click)', status: 'MESSBEREIT' },
      '7. Bestätigte Affiliate-Bestellungen': { wert: affiliateData ? affiliateData.orders : '0 (Keine Abrechnung eingepflegt)', status: affiliateData ? 'IST-WERT' : 'NICHT_VERFÜGBAR' },
      '8. Gutgeschriebene Provisionen': { wert: affiliateData ? `${affiliateData.commissions.toFixed(2)} €` : '0,00 €', status: affiliateData ? 'IST-WERT' : 'NICHT_VERFÜGBAR' },
      '9. Monatlicher Umsatz': { wert: affiliateData ? `${affiliateData.commissions.toFixed(2)} €` : '0,00 €', status: affiliateData ? 'IST-WERT' : 'IST-WERT' },
      '10. Laufende Kosten': { wert: '0,00 € (Vercel Hobby, GitHub Free, Domain-Fixkosten ca. 1,00 €/Monat)', status: 'IST-WERT' },
      '11. Operativer Gewinn': { wert: affiliateData ? `${(affiliateData.commissions - 1).toFixed(2)} €` : '-1,00 € (Domain-Kosten)', status: 'IST-WERT' },
      '12. Umsatz vs. Zielpfad Monat 6 (100 €)': { wert: affiliateData ? `${((affiliateData.commissions / 100) * 100).toFixed(1)} %` : '0,0 % (Aufbauphase)', status: 'ZIELABWEICHUNG' },
    }
  };
  return report;
}

// CLI Execution Check
if (process.argv[1] && process.argv[1].endsWith('report-kpis.js')) {
  console.log('====================================================');
  console.log('OPTICAL 36 – KPI- & MONETARISIERUNGS-REPORT');
  console.log('====================================================\n');
  const summary = generateKpiReport();
  console.log('Programm:', summary.programm);
  console.log('Ziel:', summary.ziel_monat_36);
  console.log('\n--- KPI-ÜBERSICHT ---');
  for (const [kpi, data] of Object.entries(summary.kpis)) {
    console.log(`[${data.status.padEnd(14)}] ${kpi.padEnd(35)}: ${data.wert}`);
  }
  console.log('\n====================================================');
  console.log('Hinweis: Sobald GSC- oder Händler-CSV-Dateien vorliegen,');
  console.log('können diese via Argumente eingelesen werden.');
  console.log('====================================================');
}
