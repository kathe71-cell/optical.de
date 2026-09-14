/**
 * optical.de - DSGVO-konformes Event-Tracking Helper
 * 
 * Sendet strukturierte Interaktionsevents an Vercel Web Analytics,
 * sofern der Nutzer aktiv auf der Plattform interagiert.
 * Erfasst KEINERLEI personenbezogene Daten (keine IP-Adresse, keine E-Mail, kein Cookie).
 */

export const trackEvent = (eventName, properties = {}) => {
  try {
    if (typeof window !== 'undefined') {
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      
      // Dispatch zu Vercel Analytics custom event API
      if (typeof window.va === 'function') {
        window.va('event', {
          name: eventName,
          ...properties
        });
      }
    }
  } catch (err) {
    // Silent fail in environments with strict privacy blockers
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Tracking Event]', eventName, properties);
    }
  }
};

// Spezifische Helper-Funktionen gemäß Anforderungskatalog
export const trackDecoderStarted = (query) => {
  trackEvent('decoder_started', { query_length: query ? query.length : 0 });
};

export const trackDecoderCompleted = (privateLabel, matchedProduct, confidence) => {
  trackEvent('decoder_completed', {
    private_label: privateLabel,
    matched_product: matchedProduct,
    confidence
  });
};

export const trackProductComparisonStarted = (category) => {
  trackEvent('product_comparison_started', { category: category || 'all' });
};

export const trackProductClicked = (productId, productName) => {
  trackEvent('product_clicked', { product_id: productId, product_name: productName });
};

export const trackProductView = (productId, productName) => {
  trackEvent('product_view', { product_id: productId, product_name: productName });
};

export const trackAffiliateClick = (productName, destination = 'amazon', sourceComponent = 'catalog') => {
  trackEvent('affiliate_click', {
    product_name: productName,
    destination,
    source_component: sourceComponent
  });
};

export const trackPriceCalculatorUsed = (lensType, sph) => {
  trackEvent('price_calculator_used', { lens_type: lensType, sph_value: sph });
};

export const trackSearchUsed = (searchQuery) => {
  trackEvent('search_used', { query_term: searchQuery ? searchQuery.substring(0, 30) : '' });
};

export const trackZeroResults = (searchQuery) => {
  trackEvent('zero_results', { query_term: searchQuery ? searchQuery.substring(0, 30) : '' });
};

export const trackFilterUsed = (filterType, filterValue) => {
  trackEvent('filter_used', { filter_type: filterType, filter_value: filterValue });
};

export const trackBookmarkToggle = (productId, isBookmarked) => {
  trackEvent('bookmark_toggle', { product_id: productId, saved: isBookmarked });
};
