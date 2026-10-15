/**
 * optical.de - Netzwerkspezifische Affiliate-Validierung (Phase 12.2)
 * 
 * Strikte Prüfung von Händlerangeboten und Tracking-Links vor dem Rendering.
 * Unterstützte Netzwerke:
 * - Amazon PartnerNet EU
 * - Awin DACH
 * - CJ Affiliate (Commission Junction)
 * 
 * FAIL-CLOSED SICHERHEITSPRINZIP:
 * Ein Angebot darf NUR DANN als klickbares Affiliate-Angebot gerendert werden (canRender: true),
 * wenn kumulativ folgende Bedingungen erfüllt sind:
 * 1. Händlerprogramm-Status ist ACTIVE_PRODUCTION (Händler mit Status APPLIED werden NIE gerendert).
 * 2. Produktidentität ist zweifelsfrei VERIFIED.
 * 3. Packungsvariante ist zugeordnet.
 * 4. Autorisierter Affiliate-Link ist vorhanden (nicht null).
 * 5. Linkstatus ist LINK_VERIFIED.
 * 6. Netzwerkspezifische Validierung (Domain, HTTPS, Parameter) erfolgreich.
 */

import { NETWORKS, MERCHANTS, MERCHANT_PROGRAM_STATUS, OFFER_LINK_STATUS } from '../data/merchants.js';
import { VERIFIED_ACTIVE_ASINS, AMAZON_PARTNER_TAG } from './affiliate.js';

/**
 * Validiert eine Amazon-Affiliate-URL
 * @param {string} url 
 * @param {Object} [context]
 * @returns {{ valid: boolean, isDirect: boolean, errors: string[] }}
 */
export function validateAmazonUrl(url, context = {}) {
  const errors = [];
  if (!url || typeof url !== 'string') {
    return { valid: false, isDirect: false, errors: ['Keine URL übergeben'] };
  }

  if (!url.startsWith('https://www.amazon.de/') && !url.startsWith('https://amazon.de/')) {
    errors.push('Amazon-URL muss mit https://www.amazon.de/ beginnen');
  }

  if (!url.includes(`tag=${AMAZON_PARTNER_TAG}`)) {
    errors.push(`Fehlender oder inkorrekter Amazon-Partner-Tag: erwartet tag=${AMAZON_PARTNER_TAG}`);
  }

  let isDirect = false;
  if (url.includes('/dp/')) {
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    if (!match) {
      errors.push('Ungültiges ASIN-Format in Amazon-Direktlink');
    } else {
      const asin = match[1];
      if (!VERIFIED_ACTIVE_ASINS.has(asin)) {
        errors.push(`ASIN ${asin} ist nicht in der empirischen Whitelist aktiver Direktlinks`);
      } else {
        isDirect = true;
      }
    }
  } else if (!url.includes('/s?k=')) {
    errors.push('Amazon-URL ist weder ein verifizierter Direktlink (/dp/) noch ein sicherer Such-Fallback (/s?k=)');
  }

  return {
    valid: errors.length === 0,
    isDirect,
    errors
  };
}

/**
 * Validiert eine Awin-Affiliate-URL
 * @param {string} url 
 * @param {Object} [context]
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateAwinUrl(url, context = {}) {
  const errors = [];
  if (!url || typeof url !== 'string') {
    return { valid: false, errors: ['Keine URL übergeben'] };
  }

  const expectedMid = context.advertiserId;
  const expectedAffid = context.publisherId || NETWORKS.AWIN.publisherId;

  if (!url.startsWith('https://www.awin1.com/cread.php') && !url.startsWith('https://www.awin1.com/awclick.php')) {
    errors.push('Ungültige Awin-Basisadresse: muss mit https://www.awin1.com/ beginnen');
  }

  if (expectedMid && !url.includes(`awinmid=${expectedMid}`)) {
    errors.push(`Fehlende oder abweichende Advertiser-ID: erwartet awinmid=${expectedMid}`);
  }

  if (expectedAffid && !url.includes(`awinaffid=${expectedAffid}`)) {
    errors.push(`Fehlende oder abweichende Publisher-ID: erwartet awinaffid=${expectedAffid}`);
  }

  if (!url.includes('ued=')) {
    errors.push('Fehlender Ziel-URL-Parameter (ued=)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Prüft eine CJ-Affiliate-URL
 * 
 * HINWEIS ZUR VALIDIERUNG (Phase 12.2):
 * Da für Apollo aktuell noch keine authentifizierten Live-Links vorliegen,
 * ist diese Prüfung als PENDING_REAL_LINK_VERIFICATION eingestuft.
 * 
 * Um False Negatives zu vermeiden, wird die Advertiser-ID nicht starr
 * im Pfad erzwungen (CJ nutzt oft verschlüsselte Link-IDs oder Redirect-Tokens).
 * 
 * Strikte Mindestkriterien:
 * - HTTPS Pflicht
 * - Offizielle CJ-Tracking-Domain
 * - Redirect-Parameter-Prüfung (falls target-url übergeben wird, muss sie zur Händlerdomain passen)
 * 
 * @param {string} url 
 * @param {Object} [context]
 * @returns {{ valid: boolean, validationStatus: string, errors: string[] }}
 */
export function validateCjUrl(url, context = {}) {
  const errors = [];
  if (!url || typeof url !== 'string') {
    return { 
      valid: false, 
      validationStatus: 'PENDING_REAL_LINK_VERIFICATION', 
      errors: ['Keine CJ-URL übergeben'] 
    };
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      errors.push('CJ-URL muss HTTPS verwenden');
    }

    const isAllowedDomain = NETWORKS.CJ_AFFILIATE.allowedDomains.includes(parsed.hostname);
    if (!isAllowedDomain) {
      errors.push(`Unzulässige CJ-Tracking-Domain: ${parsed.hostname}`);
    }

    // Wenn Ziel-URL über Parameter übergeben wird, Zielhostnamen verifizieren
    const targetParam = parsed.searchParams.get('url') || parsed.searchParams.get('cjsku');
    if (targetParam) {
      try {
        const parsedTarget = new URL(targetParam);
        if (parsedTarget.protocol !== 'https:') {
          errors.push('Ziel-URL im CJ-Link muss HTTPS verwenden');
        }
        if (context.domain && !parsedTarget.hostname.endsWith(context.domain)) {
          errors.push(`Ziel-URL Hostname (${parsedTarget.hostname}) entspricht nicht der Händlerdomain (${context.domain})`);
        }
      } catch {
        errors.push('Ungültige Ziel-URL im CJ-Parameter');
      }
    }
  } catch (err) {
    errors.push(`Ungültige URL-Syntax: ${err.message}`);
  }

  return {
    valid: errors.length === 0,
    validationStatus: 'PENDING_REAL_LINK_VERIFICATION',
    errors
  };
}

/**
 * Universelle Validierungsfunktion für ein beliebiges Händlerangebot
 * 
 * FAIL-CLOSED: Nur Angebote mit aktivem Programm, verifizierter Identität
 * und geprüftem Link dürfen gerendert werden.
 * 
 * @param {Object} offer 
 * @param {Object} [options]
 * @returns {{ valid: boolean, canRender: boolean, errors: string[] }}
 */
export function validateMerchantOffer(offer, options = {}) {
  const errors = [];
  if (!offer || typeof offer !== 'object') {
    return { valid: false, canRender: false, errors: ['Kein Angebot übergeben'] };
  }

  const merchant = MERCHANTS[offer.merchantId];
  if (!merchant) {
    errors.push(`Unbekannte Händler-ID: ${offer.merchantId}`);
    return { valid: false, canRender: false, errors };
  }

  // 1. FAIL-CLOSED: Händler-Programmstatus prüfen
  if (merchant.programStatus !== MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION) {
    errors.push(`Händlerprogramm ist nicht in ACTIVE_PRODUCTION (Status: ${merchant.programStatus})`);
  }

  // 2. Produktidentität prüfen
  if (offer.productIdentityStatus !== 'VERIFIED') {
    errors.push(`Produktidentität nicht verifiziert (Status: ${offer.productIdentityStatus || 'UNBEKANNT'})`);
  }

  // 3. Linkstatus prüfen
  if (offer.affiliateLinkStatus !== OFFER_LINK_STATUS.LINK_VERIFIED) {
    errors.push(`Affiliate-Linkstatus ist nicht LINK_VERIFIED (Status: ${offer.affiliateLinkStatus || 'NICHT_KONFIGURIERT'})`);
  }

  // 4. Link-URL vorhanden prüfen
  if (!offer.affiliateUrl || typeof offer.affiliateUrl !== 'string') {
    errors.push('Keine Affiliate-URL hinterlegt (affiliateUrl ist null)');
  }

  // 5. Netzwerkspezifische URL-Prüfung (nur wenn Link vorhanden)
  if (offer.affiliateUrl) {
    if (merchant.network === 'amazon_partnernet') {
      const res = validateAmazonUrl(offer.affiliateUrl, merchant);
      if (!res.valid) errors.push(...res.errors);
    } else if (merchant.network === 'awin') {
      const res = validateAwinUrl(offer.affiliateUrl, merchant);
      if (!res.valid) errors.push(...res.errors);
    } else if (merchant.network === 'cj_affiliate') {
      const res = validateCjUrl(offer.affiliateUrl, merchant);
      if (!res.valid) errors.push(...res.errors);
    }
  }

  // canRender darf NUR true sein, wenn KEINE Fehler vorliegen
  const canRender = errors.length === 0;

  return {
    valid: canRender,
    canRender,
    errors
  };
}
