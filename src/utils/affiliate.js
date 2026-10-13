/**
 * Zentrale Hilfsfunktion für händlerunabhängige Affiliate- und Partnerlinks.
 * Entkoppelt Präsentationskomponenten von spezifischen Tracking-Netzwerken.
 */

const DEFAULT_AMAZON_TAG = 'optical.de-21';

/**
 * Gibt den primären Partner-Link für ein Produkt zurück.
 * Falls ein `offers`-Array vorliegt, wird das primäre Angebot genutzt.
 * Andernfalls wird ein Fallback-Link erzeugt.
 * 
 * @param {Object} product - Produkt-Objekt
 * @param {string} [merchantId='amazon'] - Bevorzugter Händler
 * @returns {string} Partner-URL
 */
export function getProductAffiliateUrl(product, merchantId = 'amazon') {
  if (!product) return 'https://www.amazon.de/?tag=' + DEFAULT_AMAZON_TAG;

  if (Array.isArray(product.offers) && product.offers.length > 0) {
    const offer = product.offers.find(o => o.merchant_id === merchantId) || product.offers[0];
    if (offer && offer.url) {
      return offer.url;
    }
  }

  if (product.asin) {
    return `https://www.amazon.de/dp/${product.asin}?tag=${DEFAULT_AMAZON_TAG}`;
  }

  const query = product.amazon_query || product.product_name || product.name || '';
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${DEFAULT_AMAZON_TAG}`;
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
