/**
 * Zentrale Hilfsfunktion für händlerunabhängige Affiliate- und Partnerangebote.
 * Entkoppelt Präsentationskomponenten von spezifischen Tracking-Netzwerken.
 * 
 * Qualitäts- und Sicherheitsgate (Phase 9.3):
 * - Strikte Trennung zwischen verifizierten Direktlinks und Suchlink-Fallbacks.
 * - Keine Auslieferung von bekannten oder unbestätigten 404-ASINs im aktiven Verkaufspfad.
 * - Automatische Umschaltung auf die offizielle Amazon-Suche bei nicht-verifizierten ASINs.
 * - Vollständige Konformität mit Google- und PartnerNet-Richtlinien (rel="noopener noreferrer sponsored").
 */

export const AMAZON_PARTNER_TAG = 'optical.de-21';
const DEFAULT_AMAZON_TAG = AMAZON_PARTNER_TAG;

/**
 * Standard-Attribut für alle Affiliate-Links gemäß Google Webmaster- und PartnerNet-Vorgaben
 */
export const AFFILIATE_LINK_REL = 'noopener noreferrer sponsored';

/**
 * Weißliste von empirisch verifizierten, aktiven Amazon-Direkt-ASINs (HTTP 200, Produktidentität belegt).
 * ASINs, die nicht in dieser Liste geführt werden (oder HTTP 404 zurückgeben), werden
 * im aktiven Verkaufspfad NIEMALS als Direktlink ausgespielt, sondern nutzen den sicheren Suchlink-Fallback.
 */
export const VERIFIED_ACTIVE_ASINS = new Set([
  'B007UITPAQ', // CooperVision Biofinity 6er
  'B01G5LHDUW', // Air Optix Plus HydraGlyde 6er
  'B01HRK8K4S', // Bausch + Lomb Ultra 6er
  'B00ANRZ5R8', // Bausch + Lomb PureVision 2 HD 6er
  'B00D28J31E', // CooperVision Proclear Sphere 6er
  'B008HJR1DU', // Air Optix Night & Day Aqua 6er
  'B00198CDH0', // 1-Day Acuvue Moist 30er
  'B01I13PY6C', // Acuvue Oasys 1-Day HydraLuxe 30er
  'B00FN36Y86', // Alcon Dailies Total 1 30er
  'B0017J4FAO', // Alcon Dailies AquaComfort Plus 30er
  'B007BBUL78', // CooperVision Clariti 1-Day 30er
  'B00EALB1QM', // Bausch + Lomb Biotrue ONEday 30er
  'B00D2AVNEM', // CooperVision Biofinity Toric 6er
  'B07MD1X1Z5', // Air Optix Plus HydraGlyde Toric 6er
  'B01N3YSW2T', // CooperVision Biofinity Multifocal 6er
  'B0055HY2TS', // Bausch + Lomb Biotrue All-in-One 2x300ml
  'B00U7E5IK6', // Alcon AOSept Plus mit HydraGlyde 2x360ml
]);

/**
 * Prüft, ob eine ASIN aktiv und zielverifiziert ist
 * 
 * @param {string} asin 
 * @returns {boolean}
 */
export function isDirectAsinActive(asin) {
  if (!asin || typeof asin !== 'string') return false;
  return VERIFIED_ACTIVE_ASINS.has(asin.trim());
}

/**
 * Normalisiert ein einzelnes Händlerangebot unter Anwendung der Qualitätsprüfung
 * 
 * @param {Object} rawOffer 
 * @param {Object} product 
 * @returns {Object} Vollständig typisiertes Angebot
 */
export function normalizeMerchantOffer(rawOffer = {}, product = {}) {
  const asin = rawOffer.asin || product.asin;
  const isDirectVerified = isDirectAsinActive(asin);

  let affiliateUrl;
  if (isDirectVerified) {
    affiliateUrl = rawOffer.url || rawOffer.affiliate_url || `https://www.amazon.de/dp/${asin}?tag=${DEFAULT_AMAZON_TAG}`;
  } else {
    const query = product.amazon_query || product.product_name || rawOffer.query || '';
    affiliateUrl = `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${DEFAULT_AMAZON_TAG}`;
  }

  return {
    merchant_id: rawOffer.merchant_id || 'amazon',
    merchant_name: rawOffer.merchant_name || 'Amazon.de',
    product_id: product.id || rawOffer.product_id || '',
    product_variant: rawOffer.product_variant || product.correction_type || 'standard',
    package_size: rawOffer.package_size || product.pack_size || '',
    affiliate_url: affiliateUrl,
    is_direct_verified: isDirectVerified,
    price: typeof rawOffer.price === 'number' ? rawOffer.price : null,
    shipping_cost: typeof rawOffer.shipping_cost === 'number' ? rawOffer.shipping_cost : null,
    currency: rawOffer.currency || 'EUR',
    availability: rawOffer.availability || (isDirectVerified ? 'IN_STOCK' : 'UNKNOWN'),
    last_verified_at: rawOffer.last_verified_at || '2026-10-13',
    source: isDirectVerified ? 'AFFILIATE_DIRECT' : 'AFFILIATE_SEARCH_FALLBACK',
    is_primary: Boolean(rawOffer.is_primary ?? true)
  };
}

/**
 * Gibt alle verfügbaren Händlerangebote für ein Produkt zurück
 * 
 * @param {Object} product 
 * @returns {Array<Object>} Liste von normalisierten Angeboten
 */
export function getProductOffers(product) {
  if (!product) return [];

  if (Array.isArray(product.offers) && product.offers.length > 0) {
    return product.offers.map(o => normalizeMerchantOffer(o, product));
  }

  // Automatischer Fallback auf das primäre Amazon-Angebot
  return [normalizeMerchantOffer({}, product)];
}

/**
 * Gibt den primären Partner-Link für ein Produkt zurück.
 * Schaltet bei unbestätigten oder fehlerhaften ASINs sicher auf die Produktsuche um.
 * 
 * @param {Object} product - Produkt-Objekt
 * @param {string} [merchantId='amazon'] - Bevorzugter Händler
 * @returns {string} Partner-URL
 */
export function getProductAffiliateUrl(product, merchantId = 'amazon') {
  if (!product) return `https://www.amazon.de/?tag=${DEFAULT_AMAZON_TAG}`;

  const offers = getProductOffers(product);
  const matched = offers.find(o => o.merchant_id === merchantId) || offers.find(o => o.is_primary) || offers[0];

  if (matched?.affiliate_url) {
    return matched.affiliate_url;
  }

  const query = product.amazon_query || product.product_name || '';
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${DEFAULT_AMAZON_TAG}`;
}

/**
 * Gibt den primären Partner-Link für ein Suchwort oder eine ASIN zurück.
 * Schützt vor unbestätigten Direkt-URLs: Nur freigegebene ASINs werden direkt verlinkt.
 * 
 * @param {string} queryOrAsin 
 * @param {string} [asin] 
 * @returns {string} Partner-URL
 */
export function getAffiliateSearchUrl(queryOrAsin, asin) {
  const targetAsin = (asin && typeof asin === 'string') ? asin : (typeof queryOrAsin === 'string' && /^[A-Z0-9]{10}$/.test(queryOrAsin) ? queryOrAsin : null);
  
  if (targetAsin && isDirectAsinActive(targetAsin)) {
    return `https://www.amazon.de/dp/${targetAsin}?tag=${DEFAULT_AMAZON_TAG}`;
  }

  const query = (typeof queryOrAsin === 'string' && !/^[A-Z0-9]{10}$/.test(queryOrAsin)) 
    ? queryOrAsin 
    : '';

  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${DEFAULT_AMAZON_TAG}`;
}

/**
 * Liefert den präzisen, richtlinienkonformen CTA-Text für einen Affiliate-Link.
 * Unterscheidet strikt zwischen verifiziertem Produktlink und generischer Produktsuche.
 * 
 * @param {Object|string} productOrAsin 
 * @returns {string} CTA-Label
 */
export function getAffiliateCtaLabel(productOrAsin) {
  const asin = typeof productOrAsin === 'string' 
    ? productOrAsin 
    : productOrAsin?.asin;

  if (asin && isDirectAsinActive(asin)) {
    return 'Produkt bei Amazon ansehen *';
  }
  return 'Bei Amazon nach Produkt suchen *';
}
