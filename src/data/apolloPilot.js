/**
 * optical.de - Apollo Optik Pilot-Register (Konsolidierte Phase 12.2)
 * 
 * 5 Produktfamilien mit insgesamt 10 recherchierten Packungsvarianten.
 * 
 * DATENQUALITÄT & SICHERHEITSGATE:
 * - Alle 10 Angebote sind DEAKTIVIERT (affiliateUrl = null, isProductionActive = false).
 * - Programmstatus von Apollo ist APPLIED (noch keine Freigabe).
 * - Verifikationsstatus wird PRO VARIANTE differenziert:
 *   - LIVE_PAGE_VERIFIED: Hauptvariante direkt im Onlineshop mit H1 und HTTP 200 verifiziert.
 *   - CATALOG_FACET_VERIFIED: Im CJ-Katalog und als Packungsfacette/Option im Onlineshop nachgewiesen.
 * - MyDay 90er: Packungsgröße basiert auf der tatsächlichen 90er-Variante (90 Linsen).
 * - Keine URL-Kennung als bestätigte GTIN/SKU gewertet.
 * - Keine automatische Gleichsetzung mit Apollo-iWear-Eigenmarken.
 * - commissionRate = null für alle Varianten (keine Pauschalschätzung).
 * - Preise = null, Verfügbarkeit = UNCONFIRMED.
 */

import { OFFER_LINK_STATUS } from './merchants.js';

export const APOLLO_CONFIG = {
  merchantId: 'apollo',
  merchantName: 'Apollo Optik',
  merchantDomain: 'apollo.de',
  network: 'cj_affiliate',
  advertiserId: '7056395',
  cookieRuntimeDays: 10,
  evidenceStatus: 'UNCONFIRMED',
  activeInProduction: false // Sicherheitsgate: Global und lokal deaktiviert
};

export const APOLLO_PILOT_FAMILIES = {
  // A. BIOFINITY
  'biofinity': {
    productId: 'biofinity',
    productName: 'CooperVision Biofinity',
    manufacturer: 'CooperVision',
    lensType: 'Monatslinse',
    replacementSchedule: '30 Tage',
    material: 'Comfilcon A',
    editorialNote: 'Wird bei Apollo auch unter der Eigenmarke iWear Oxygen geführt. Medizinisch eigenständiges Produkt.',
    variants: [
      {
        variantId: 'biofinity-3er',
        packCount: 3,
        packSizeText: '3er-Packung (3 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-biofinity-3-3-grp10438099/4723353950153',
        verificationStatus: 'CATALOG_FACET_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      },
      {
        variantId: 'biofinity-6er',
        packCount: 6,
        packSizeText: '6er-Packung (6 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-biofinity-3-3-grp10438099/4723353900162',
        verificationStatus: 'LIVE_PAGE_VERIFIED', // Direkt auf H1 & HTTP 200 geprüft
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      }
    ]
  },

  // B. BIOFINITY TORIC
  'biofinity-toric': {
    productId: 'biofinity-toric',
    productName: 'CooperVision Biofinity Toric',
    manufacturer: 'CooperVision',
    lensType: 'Torische Monatslinse',
    replacementSchedule: '30 Tage',
    material: 'Comfilcon A',
    editorialNote: 'Zugeordnete Eigenmarke bei Apollo: iWear Oxygen Astigmatism.',
    variants: [
      {
        variantId: 'biofinity-toric-3er',
        packCount: 3,
        packSizeText: '3er-Packung (3 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-biofinity-toric-3-3-grp10445459/4723353950297',
        verificationStatus: 'CATALOG_FACET_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      },
      {
        variantId: 'biofinity-toric-6er',
        packCount: 6,
        packSizeText: '6er-Packung (6 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-biofinity-toric-3-3-grp10445459/4723353900163',
        verificationStatus: 'LIVE_PAGE_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      }
    ]
  },

  // C. AIR OPTIX PLUS HYDRAGLYDE
  'airoptix-hydraglyde': {
    productId: 'airoptix-hydraglyde',
    productName: 'Air Optix Plus HydraGlyde',
    manufacturer: 'Alcon',
    lensType: 'Monatslinse',
    replacementSchedule: '30 Tage',
    material: 'Lotrafilcon B',
    editorialNote: 'Original Alcon Markenlinse mit SmartShield- und HydraGlyde-Technologie.',
    variants: [
      {
        variantId: 'airoptix-hydraglyde-3er',
        packCount: 3,
        packSizeText: '3er-Packung (3 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-air-optix-plus-hydraglyde-3-3-grp10445301/4723353950288',
        verificationStatus: 'LIVE_PAGE_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      },
      {
        variantId: 'airoptix-hydraglyde-6er',
        packCount: 6,
        packSizeText: '6er-Packung (6 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-air-optix-plus-hydraglyde-3-3-grp10445301/4723353950291',
        verificationStatus: 'CATALOG_FACET_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      }
    ]
  },

  // D. DAILIES TOTAL 1
  'dailies-total-1': {
    productId: 'dailies-total-1',
    productName: 'Alcon Dailies Total 1',
    manufacturer: 'Alcon',
    lensType: 'Tageslinse',
    replacementSchedule: '1 Tag',
    material: 'Delefilcon A',
    editorialNote: 'Premium-Tageslinse mit Wassergradienten-Technologie von Alcon.',
    variants: [
      {
        variantId: 'dailies-total-1-30er',
        packCount: 30,
        packSizeText: '30er-Packung (30 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-dailies-total-1-1-30-grp10195495/4723353900609',
        verificationStatus: 'LIVE_PAGE_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      },
      {
        variantId: 'dailies-total-1-90er',
        packCount: 90,
        packSizeText: '90er-Packung (90 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-dailies-total-1-1-30-grp10195495/4723353900610',
        verificationStatus: 'CATALOG_FACET_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      }
    ]
  },

  // E. MYDAY DAILY DISPOSABLE
  'myday-daily': {
    productId: 'myday-daily',
    productName: 'CooperVision MyDay Daily Disposable',
    manufacturer: 'CooperVision',
    lensType: 'Tageslinse',
    replacementSchedule: '1 Tag',
    material: 'Stenfilcon A',
    editorialNote: 'Zugeordnete Apollo-Eigenmarke: iWear Harmony (CooperVision Stenfilcon A).',
    variants: [
      {
        variantId: 'myday-daily-30er',
        packCount: 30,
        packSizeText: '30er-Packung (30 Linsen)',
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-myday-30er-1-30-grp10195522/4723353953394',
        verificationStatus: 'LIVE_PAGE_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      },
      {
        variantId: 'myday-daily-90er',
        packCount: 90,
        packSizeText: '90er-Packung (90 Linsen)', // Bereinigt: Tatsächliche 90er-Variante
        targetUrl: 'https://www.apollo.de/kontaktlinsen/p-myday-30er-1-30-grp10195522/4723353950050',
        verificationStatus: 'CATALOG_FACET_VERIFIED',
        verificationDate: '2026-10-15',
        affiliateUrl: null,
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        isProductionActive: false,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED',
        commissionEvidence: 'CJ_DIRECTORY_UNVERIFIED',
        commissionVerifiedAt: null,
        price: null,
        availability: 'UNCONFIRMED'
      }
    ]
  }
};

/**
 * Kompatibilitäts-Mapping für aggregierte Familien-Angebote
 */
export const APOLLO_PILOT_OFFERS = Object.fromEntries(
  Object.entries(APOLLO_PILOT_FAMILIES).map(([id, fam]) => {
    const primaryVariant = fam.variants.find(v => v.verificationStatus === 'LIVE_PAGE_VERIFIED') || fam.variants[0];
    const packSizes = fam.variants.map(v => String(v.packCount));
    const packSizeText = fam.variants.map(v => `${v.packCount}er`).join('- & ') + '-Box';

    return [
      id,
      {
        productId: id,
        merchantId: 'apollo',
        productName: fam.productName,
        manufacturer: fam.manufacturer,
        lensType: fam.lensType,
        replacementSchedule: fam.replacementSchedule,
        packSizes,
        packSizeText,
        requiresSizeSelection: fam.variants.length > 1,
        targetUrl: primaryVariant.targetUrl,
        variants: fam.variants,
        verificationStatus: primaryVariant.verificationStatus,
        verificationDate: primaryVariant.verificationDate,
        productIdentityStatus: 'VERIFIED',
        affiliateLinkStatus: OFFER_LINK_STATUS.PENDING_PROGRAM_APPROVAL,
        affiliateUrl: null,
        editorialNote: fam.editorialNote,
        commissionRate: null,
        commissionStatus: 'UNCONFIRMED'
      }
    ];
  })
);

export function hasApolloPilotOffer(productId) {
  if (!productId || typeof productId !== 'string') return false;
  return Boolean(APOLLO_PILOT_FAMILIES[productId]);
}

export function getApolloPilotFamily(productId) {
  if (!hasApolloPilotOffer(productId)) return null;
  return APOLLO_PILOT_FAMILIES[productId];
}

export function getApolloPilotOffer(productId) {
  if (!hasApolloPilotOffer(productId)) return null;
  return APOLLO_PILOT_OFFERS[productId];
}
