import { MISTER_SPEX_CONFIG, MISTER_SPEX_OFFERS } from '../data/misterSpexAffiliate.js';

/**
 * Validiert, ob ein Produkt ein verifiziertes Mister-Spex-Angebot besitzt.
 * Strikter Schutz: Nur exakt die 7 freigegebenen Produkt-IDs werden akzeptiert.
 * 
 * @param {string|Object} productOrId 
 * @returns {boolean}
 */
export function hasMisterSpexOffer(productOrId) {
  if (!productOrId) return false;
  const productId = typeof productOrId === 'string' ? productOrId : productOrId?.id;
  if (!productId || typeof productId !== 'string') return false;
  
  const offer = MISTER_SPEX_OFFERS[productId];
  if (!offer) return false;

  // Prüfe Datenintegrität des Eintrags
  return Boolean(
    offer.verified === true &&
    offer.misterSpexId &&
    offer.productId === productId &&
    offer.affiliateUrl &&
    offer.affiliateUrl.includes(`awinmid=${MISTER_SPEX_CONFIG.advertiserId}`) &&
    offer.affiliateUrl.includes(`awinaffid=${MISTER_SPEX_CONFIG.publisherId}`)
  );
}

/**
 * Gibt das verifizierte Mister-Spex-Angebot für ein Produkt zurück.
 * Liefert null für alle anderen 50 Produkte.
 * 
 * @param {string|Object} productOrId 
 * @returns {Object|null}
 */
export function getMisterSpexOffer(productOrId) {
  if (!hasMisterSpexOffer(productOrId)) return null;
  const productId = typeof productOrId === 'string' ? productOrId : productOrId?.id;
  return MISTER_SPEX_OFFERS[productId] || null;
}

/**
 * Prüft eine Awin-URL auf Richtlinienkonformität und korrekte Partner-IDs
 * 
 * @param {string} url 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateAwinUrl(url) {
  const errors = [];
  if (!url || typeof url !== 'string') {
    return { valid: false, errors: ['Keine URL angegeben'] };
  }

  if (!url.startsWith(MISTER_SPEX_CONFIG.awinBaseUrl)) {
    errors.push(`Ungültige Awin-Basis-URL: muss mit ${MISTER_SPEX_CONFIG.awinBaseUrl} beginnen`);
  }

  if (!url.includes(`awinmid=${MISTER_SPEX_CONFIG.advertiserId}`)) {
    errors.push(`Fehlende oder fehlerhafte Advertiser-ID: erwartet ${MISTER_SPEX_CONFIG.advertiserId}`);
  }

  if (!url.includes(`awinaffid=${MISTER_SPEX_CONFIG.publisherId}`)) {
    errors.push(`Fehlende oder fehlerhafte Publisher-ID: erwartet ${MISTER_SPEX_CONFIG.publisherId}`);
  }

  if (!url.includes('ued=')) {
    errors.push('Fehlender ued-Parameter (Ziel-URL)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
