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

// Spezifische Helper-Funktionen gemäß Datenschutz- & Datensparsamkeits-Standard

/**
 * Erfasst den Start des Eigenmarken-Decoders (ausschließlich Längen-Metrik, kein Klartext)
 */
export const trackDecoderStarted = (query) => {
  const len = typeof query === 'string' ? query.trim().length : 0;
  trackEvent('decoder_started', { query_length: len });
};

/**
 * Erfasst den erfolgreichen Abschluss einer Dekodierung anhand strukturierter IDs
 */
export const trackDecoderCompleted = (privateLabel, matchedProduct, confidence) => {
  trackEvent('decoder_completed', {
    private_label_slug: typeof privateLabel === 'string' ? privateLabel.toLowerCase().replace(/[^a-z0-9_-]/g, '_') : 'unknown',
    matched_product_id: matchedProduct || 'unmatched',
    confidence: confidence || 'unverified'
  });
};

/**
 * Erfasst den Start eines Produktvergleichs
 */
export const trackProductComparisonStarted = (category) => {
  trackEvent('product_comparison_started', { category: category || 'all' });
};

/**
 * Erfasst Klicks auf Produktkarten zu Detailseiten
 */
export const trackProductClicked = (productId, productName) => {
  trackEvent('product_clicked', {
    product_id: productId || 'unknown',
    product_name: productName || 'unknown'
  });
};

/**
 * Erfasst Aufrufe von Produktdetailseiten
 */
export const trackProductView = (productId, productName) => {
  trackEvent('product_view', {
    product_id: productId || 'unknown',
    product_name: productName || 'unknown'
  });
};

/**
 * Erfasst ausgehende Affiliate-Klicks datensparsam und strukturiert
 *
 * Schema:
 * - merchant: 'amazon' | 'mister_spex' | 'partner'
 * - product_id: kanonische ID aus Katalog (z. B. 'biofinity')
 * - placement: Platzierungsort auf der Seite (z. B. 'product_detail_merchant_grid')
 *
 * Übermittelt KEINE vollen Affiliate-URLs, keine ASINs, keine Nutzerdaten.
 */
export const trackAffiliateClick = (productIdOrName, destination = 'amazon', sourceComponent = 'catalog') => {
  trackEvent('affiliate_click', {
    product_id: productIdOrName || 'unknown',
    merchant: destination || 'unknown',
    placement: sourceComponent || 'unknown'
  });
};

/**
 * Erfasst die Nutzung des Preisrechners ohne Übermittlung sensibler Sehstärken
 * Übermittelt lediglich den Linsentyp (monat/tag) und die Nutzungskategorie.
 */
export const trackPriceCalculatorUsed = (lensType, usageLabel) => {
  trackEvent('price_calculator_used', {
    lens_type: lensType || 'unknown',
    usage_frequency: usageLabel || 'standard'
  });
};

/**
 * Erfasst Suchen datensparsam: Übermittelt KEINE personenbezogenen Freitexte,
 * sondern lediglich die Zeichenlänge der Suche, um Intent zu messen.
 */
export const trackSearchUsed = (searchQuery) => {
  const len = typeof searchQuery === 'string' ? searchQuery.trim().length : 0;
  trackEvent('search_used', { query_length: len });
};

/**
 * Erfasst Null-Treffer-Suchen datensparsam ohne Klartext
 */
export const trackZeroResults = (searchQuery) => {
  const len = typeof searchQuery === 'string' ? searchQuery.trim().length : 0;
  trackEvent('zero_results', { query_length: len });
};

/**
 * Erfasst Filter-Interaktionen im Katalog
 */
export const trackFilterUsed = (filterType, filterValue) => {
  trackEvent('filter_used', {
    filter_type: filterType || 'unknown',
    filter_value: typeof filterValue === 'string' ? filterValue : 'custom'
  });
};

/**
 * Erfasst das Merken / Entfernen von Linsen
 */
export const trackBookmarkToggle = (productId, isBookmarked) => {
  trackEvent('bookmark_toggle', {
    product_id: productId || 'unknown',
    saved: Boolean(isBookmarked)
  });
};
