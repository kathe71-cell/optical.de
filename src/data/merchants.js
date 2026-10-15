/**
 * optical.de - Zentrales Händlerregister (Multi-Merchant Registry)
 * 
 * Verwaltet Händleridentitäten, Netzwerkzugehörigkeit, Provisionskonditionen
 * und mehrdimensionale Integrationsstatus für das Kontaktlinsen-Portal.
 * 
 * Stand: 15.10.2026 (Phase 12.2 Konsolidierung)
 * 
 * Architektur-Prinzip:
 * Strikte Trennung zwischen:
 * 1. Programmstatus des Händlers (z. B. APPLIED vs APPROVED)
 * 2. Status einzelner Produkt- und Affiliate-Links (z. B. PENDING_PROGRAM_APPROVAL)
 */

export const MERCHANT_PROGRAM_STATUS = {
  DISCOVERED: 'DISCOVERED',               // Händler identifiziert, noch keine Bewerbung
  APPLIED: 'APPLIED',                     // Bewerbung im Partnernetzwerk eingereicht (läuft)
  APPROVED: 'APPROVED',                   // Programmfreigabe durch Händler erteilt
  LINK_VERIFIED: 'LINK_VERIFIED',         // Freigegeben & mindestens 1 Link verifiziert
  ACTIVE_PRODUCTION: 'ACTIVE_PRODUCTION', // Produktiv im aktiven Frontend freigeschaltet
  REJECTED: 'REJECTED',                   // Bewerbung abgelehnt
  SUSPENDED: 'SUSPENDED'                  // Programm pausiert / beendet
};

export const OFFER_LINK_STATUS = {
  NOT_CONFIGURED: 'NOT_CONFIGURED',
  PENDING_PROGRAM_APPROVAL: 'PENDING_PROGRAM_APPROVAL', // Wartet auf Händler-Freigabe
  PENDING_LINK_GENERATION: 'PENDING_LINK_GENERATION',   // Programm freigegeben, Linkerzeugung ausstehend
  LINK_PROVIDED_UNVERIFIED: 'LINK_PROVIDED_UNVERIFIED', // Link vorliegend, technische Prüfung ausstehend
  LINK_VERIFIED: 'LINK_VERIFIED',                       // Link erfolgreich verifiziert & klickbar
  LINK_REJECTED: 'LINK_REJECTED'                        // Link fehlerhaft oder abgewiesen
};

export const EVIDENCE_LEVELS = {
  VERIFIED_ACCOUNT: 'VERIFIED_ACCOUNT',
  VERIFIED_PUBLIC: 'VERIFIED_PUBLIC',
  UNCONFIRMED: 'UNCONFIRMED',
  NOT_AVAILABLE: 'NOT_AVAILABLE'
};

export const NETWORKS = {
  AMAZON_PARTNERNET: {
    id: 'amazon_partnernet',
    name: 'Amazon PartnerNet EU',
    baseUrl: 'https://www.amazon.de',
    trackingParam: 'tag',
    cookieRuntimeDays: 1, // 24 Stunden Session
  },
  AWIN: {
    id: 'awin',
    name: 'Awin DACH',
    baseUrl: 'https://www.awin1.com/cread.php',
    publisherId: '1676831',
    cookieRuntimeDays: 30,
  },
  CJ_AFFILIATE: {
    id: 'cj_affiliate',
    name: 'CJ Affiliate (Commission Junction)',
    allowedDomains: [
      'www.tkqlhce.com', 'tkqlhce.com',
      'www.anrdoezrs.net', 'anrdoezrs.net',
      'www.kqzyfj.com', 'kqzyfj.com',
      'www.dpbolvw.net', 'dpbolvw.net',
      'www.jdoqocy.com', 'jdoqocy.com',
      'www.emjcd.com', 'emjcd.com',
      'www.qksrv.net', 'qksrv.net',
      'www.awltovhc.com', 'awltovhc.com'
    ],
    cookieRuntimeDays: 10,
  }
};

export const MERCHANTS = {
  amazon: {
    id: 'amazon',
    name: 'Amazon.de',
    network: 'amazon_partnernet',
    partnerTag: 'optical.de-21',
    domain: 'amazon.de',
    programStatus: MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION,
    evidenceLevel: EVIDENCE_LEVELS.VERIFIED_PUBLIC,
    trustLabel: 'Marktplatz mit Prime-Versand',
    badgeText: 'Amazon',
    shortName: 'AMZ',
    commissionRate: '1,00 % - 3,00 %',
    commissionStatus: 'VERIFIED_PUBLIC',
    cookieRuntime: '24 Stunden',
    isPrimaryFallback: true
  },
  mister_spex: {
    id: 'mister_spex',
    name: 'Mister Spex',
    network: 'awin',
    advertiserId: '10118',
    publisherId: '1676831',
    domain: 'misterspex.de',
    programStatus: MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION,
    evidenceLevel: EVIDENCE_LEVELS.VERIFIED_ACCOUNT,
    trustLabel: 'Zertifizierter Fachoptiker & Online-Shop',
    badgeText: 'Mister Spex',
    shortName: 'MS',
    commissionRate: 'Neukunde 7,00-8,00 %, Bestandskunde 2,00-3,00 %',
    commissionStatus: 'VERIFIED_ACCOUNT',
    cookieRuntime: '30 Tage',
    isPrimaryFallback: false
  },
  apollo: {
    id: 'apollo',
    name: 'Apollo Optik',
    network: 'cj_affiliate',
    advertiserId: '7056395',
    domain: 'apollo.de',
    programStatus: MERCHANT_PROGRAM_STATUS.APPLIED, // Status: APPLIED (Bewerbung läuft, noch keine Programmfreigabe)
    evidenceLevel: EVIDENCE_LEVELS.UNCONFIRMED,
    trustLabel: 'Deutschlands filialstärkster Optiker (über 900 Stores)',
    badgeText: 'Apollo',
    shortName: 'APO',
    commissionRate: null, // Streng null: Keine unbestätigten Pauschalen
    commissionStatus: 'UNCONFIRMED',
    commissionEvidence: 'CJ_DIRECTORY_UNCONFIRMED',
    commissionVerifiedAt: null,
    cookieRuntime: '10 Tage (Verzeichnisangabe)',
    isPrimaryFallback: false
  },
  lensbest: {
    id: 'lensbest',
    name: 'Lensbest',
    network: 'cj_affiliate',
    advertiserId: '6440401',
    domain: 'lensbest.de',
    programStatus: MERCHANT_PROGRAM_STATUS.APPLIED, // Status: APPLIED (Bewerbung läuft)
    evidenceLevel: EVIDENCE_LEVELS.UNCONFIRMED,
    trustLabel: 'Kontaktlinsen- und Pflegemittel-Fachversand',
    badgeText: 'Lensbest',
    shortName: 'LB',
    commissionRate: null,
    commissionStatus: 'UNCONFIRMED',
    commissionEvidence: 'CJ_DIRECTORY_UNCONFIRMED',
    commissionVerifiedAt: null,
    cookieRuntime: '30 Tage (Verzeichnisangabe)',
    isPrimaryFallback: false
  },
  linsenplatz: {
    id: 'linsenplatz',
    name: 'Linsenplatz.de',
    network: 'awin',
    advertiserId: '14469',
    domain: 'linsenplatz.de',
    programStatus: MERCHANT_PROGRAM_STATUS.APPLIED, // Status: APPLIED (Bewerbung läuft)
    evidenceLevel: EVIDENCE_LEVELS.VERIFIED_PUBLIC,
    trustLabel: 'Spezialisierter deutscher Kontaktlinsen-Versand',
    badgeText: 'Linsenplatz',
    shortName: 'LP',
    commissionRate: null,
    commissionStatus: 'UNCONFIRMED',
    commissionEvidence: 'AWIN_DIRECTORY_UNCONFIRMED',
    commissionVerifiedAt: null,
    cookieRuntime: '60 Tage (Verzeichnisangabe)',
    isPrimaryFallback: false
  },
  lentiamo: {
    id: 'lentiamo',
    name: 'Lentiamo',
    network: 'unassigned',
    domain: 'lentiamo.de',
    programStatus: MERCHANT_PROGRAM_STATUS.DISCOVERED, // Status: NOT_VERIFIED / DISCOVERED
    evidenceLevel: EVIDENCE_LEVELS.UNCONFIRMED,
    trustLabel: 'Europäischer Fachhändler für Kontaktlinsen',
    badgeText: 'Lentiamo',
    shortName: 'LEN',
    commissionRate: null,
    commissionStatus: 'UNCONFIRMED',
    commissionEvidence: null,
    commissionVerifiedAt: null,
    cookieRuntime: 'Unbekannt',
    isPrimaryFallback: false
  }
};

/**
 * Gibt die Händlerkonfiguration für eine Händler-ID zurück
 * @param {string} merchantId 
 * @returns {Object|null}
 */
export function getMerchantConfig(merchantId) {
  if (!merchantId || typeof merchantId !== 'string') return null;
  return MERCHANTS[merchantId.toLowerCase()] || null;
}

/**
 * Liefert alle registrierten Händler
 * @returns {Array<Object>}
 */
export function getAllMerchants() {
  return Object.values(MERCHANTS);
}
