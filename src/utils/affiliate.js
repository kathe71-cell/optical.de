/**
 * Zentrale Hilfsfunktion für händlerunabhängige Affiliate- und Partnerangebote.
 * Entkoppelt Präsentationskomponenten von spezifischen Tracking-Netzwerken.
 * 
 * Unterstützte Angebotsstruktur (Multi-Merchant-Ready):
 * - merchant_id: Eindeutige Kennung (z. B. 'amazon', 'misterspex', 'linsenplatz')
 * - merchant_name: Lesbarer Name ('Amazon.de', 'Mister Spex', etc.)
 * - product_id: ID des Produkts
 * - product_variant: Spezifische Variante (z. B. 'standard', 'toric', 'multifocal')
 * - package_size: Packungsgröße (z. B. '6er Packung', '30er Packung')
 * - affiliate_url: Valide Partner-URL
 * - price: Optionaler numerischer Preis (sofern verifiziert)
 * - shipping_cost: Optionale Versandkosten
 * - currency: Währungskürzel ('EUR')
 * - availability: Verfügbarkeitsstatus ('IN_STOCK', 'UNKNOWN', 'OUT_OF_STOCK')
 * - last_verified_at: Zeitstempel der letzten Überprüfung
 * - source: Herkunft des Angebots ('AFFILIATE_DIRECT', 'AWIN_FEED', etc.)
 * - is_primary: Kennzeichnet das Hauptangebot
 */

const DEFAULT_AMAZON_TAG = 'optical.de-21';

/**
 * Normalisiert ein einzelnes Händlerangebot
 * 
 * @param {Object} rawOffer 
 * @param {Object} product 
 * @returns {Object} Vollständig typisiertes Angebot
 */
export function normalizeMerchantOffer(rawOffer = {}, product = {}) {
  return {
    merchant_id: rawOffer.merchant_id || 'amazon',
    merchant_name: rawOffer.merchant_name || 'Amazon.de',
    product_id: product.id || rawOffer.product_id || '',
    product_variant: rawOffer.product_variant || product.correction_type || 'standard',
    package_size: rawOffer.package_size || product.pack_size || '',
    affiliate_url: rawOffer.url || rawOffer.affiliate_url || (product.asin ? `https://www.amazon.de/dp/${product.asin}?tag=${DEFAULT_AMAZON_TAG}` : `https://www.amazon.de/s?k=${encodeURIComponent(product.amazon_query || product.product_name || '')}&tag=${DEFAULT_AMAZON_TAG}`),
    price: typeof rawOffer.price === 'number' ? rawOffer.price : null,
    shipping_cost: typeof rawOffer.shipping_cost === 'number' ? rawOffer.shipping_cost : null,
    currency: rawOffer.currency || 'EUR',
    availability: rawOffer.availability || 'UNKNOWN',
    last_verified_at: rawOffer.last_verified_at || null,
    source: rawOffer.source || (rawOffer.type === 'AFFILIATE' ? 'AFFILIATE_DIRECT' : 'AFFILIATE_PARTNER'),
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
 * 
 * @param {Object} product - Produkt-Objekt
 * @param {string} [merchantId='amazon'] - Bevorzugter Händler
 * @returns {string} Partner-URL
 */
export function getProductAffiliateUrl(product, merchantId = 'amazon') {
  if (!product) return 'https://www.amazon.de/?tag=' + DEFAULT_AMAZON_TAG;

  const offers = getProductOffers(product);
  const matched = offers.find(o => o.merchant_id === merchantId) || offers.find(o => o.is_primary) || offers[0];

  return matched?.affiliate_url || `https://www.amazon.de/s?k=${encodeURIComponent(product.product_name || '')}&tag=${DEFAULT_AMAZON_TAG}`;
}

/**
 * Gibt den primären Partner-Link für ein Suchwort oder eine ASIN zurück.
 * 
 * @param {string} queryOrAsin 
 * @param {string} [asin] 
 * @returns {string} Partner-URL
 */
export function getAffiliateSearchUrl(queryOrAsin, asin) {
  if (asin && /^[A-Z0-9]{10}$/.test(asin)) {
    return `https://www.amazon.de/dp/${asin}?tag=${DEFAULT_AMAZON_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(queryOrAsin || '')}&tag=${DEFAULT_AMAZON_TAG}`;
}
