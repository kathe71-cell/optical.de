/**
 * optical.de - Multi-Merchant Offer Manager (Phase 12.2)
 * 
 * Aggregiert und normalisiert Angebote mehrerer Partner-Händler für ein Produkt.
 * 
 * Trennt strikt:
 * - Produktive Angebote (Amazon, Mister Spex für die 7 verifizierten Produkte)
 * - Pilot-Angebote (Apollo Optik für die 5 verifizierten Pilot-Familien / 10 Varianten)
 */

import { MERCHANTS, MERCHANT_PROGRAM_STATUS, OFFER_LINK_STATUS } from '../data/merchants.js';
import { getProductById } from '../data/products.js';
import { getMisterSpexOffer, hasMisterSpexOffer } from './misterSpexValidation.js';
import { getProductAffiliateUrl, getAffiliateCtaLabel, isDirectAsinActive, AMAZON_PARTNER_TAG } from './affiliate.js';
import { getApolloPilotOffer, hasApolloPilotOffer, getApolloPilotFamily } from '../data/apolloPilot.js';
import { validateMerchantOffer } from './multiMerchantValidation.js';

/**
 * Erzeugt das normalisierte Amazon-Angebot für ein Produkt
 * @param {Object} product 
 * @returns {Object}
 */
export function buildAmazonOffer(product) {
  if (!product) return null;
  const isDirect = isDirectAsinActive(product.asin);
  const affiliateUrl = getProductAffiliateUrl(product);
  const ctaLabel = getAffiliateCtaLabel(product);

  return {
    merchantId: 'amazon',
    merchantName: MERCHANTS.amazon.name,
    productName: product.product_name,
    productId: product.id,
    targetUrl: affiliateUrl,
    affiliateUrl,
    affiliateLinkStatus: OFFER_LINK_STATUS.LINK_VERIFIED,
    productIdentityStatus: 'VERIFIED',
    packSizes: [product.pack_size],
    packSizeText: product.pack_size,
    requiresSizeSelection: false,
    isDirect,
    ctaLabel,
    disclaimer: 'Amazon-Partnerlink · Tagesaktueller Preis auf Amazon.de einsehbar · Preise können abweichen',
    programStatus: MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION,
    isProductionActive: true
  };
}

/**
 * Erzeugt das normalisierte Mister-Spex-Angebot für ein Produkt (sofern verifiziert)
 * @param {Object} product 
 * @returns {Object|null}
 */
export function buildMisterSpexOffer(product) {
  if (!hasMisterSpexOffer(product)) return null;
  const msData = getMisterSpexOffer(product);
  if (!msData) return null;

  return {
    merchantId: 'mister_spex',
    merchantName: MERCHANTS.mister_spex.name,
    productName: msData.productName,
    productId: msData.productId,
    targetUrl: `https://www.misterspex.de/p/${msData.misterSpexId}`,
    affiliateUrl: msData.affiliateUrl,
    affiliateLinkStatus: OFFER_LINK_STATUS.LINK_VERIFIED,
    productIdentityStatus: 'VERIFIED',
    packSizes: msData.packSizes,
    packSizeText: msData.packSizeText,
    requiresSizeSelection: msData.requiresSizeSelection,
    ctaLabel: 'Angebot bei Mister Spex ansehen *',
    disclaimer: 'Awin-Partnerlink · Tagesaktueller Preis direkt bei Mister Spex einsehbar',
    programStatus: MERCHANT_PROGRAM_STATUS.ACTIVE_PRODUCTION,
    isProductionActive: true
  };
}

/**
 * Erzeugt das normalisierte Apollo-Pilot-Angebot für ein Produkt (sofern im 5-Familien-Pilot)
 * @param {Object} product 
 * @returns {Object|null}
 */
export function buildApolloOffer(product) {
  if (!product || !hasApolloPilotOffer(product.id)) return null;
  const apolloData = getApolloPilotOffer(product.id);
  if (!apolloData) return null;

  return {
    merchantId: 'apollo',
    merchantName: MERCHANTS.apollo.name,
    productName: apolloData.productName,
    productId: apolloData.productId,
    targetUrl: apolloData.targetUrl,
    affiliateUrl: apolloData.affiliateUrl, // null im Pilot-Modus
    affiliateLinkStatus: apolloData.affiliateLinkStatus, // PENDING_PROGRAM_APPROVAL
    productIdentityStatus: apolloData.productIdentityStatus, // VERIFIED
    packSizes: apolloData.packSizes,
    packSizeText: apolloData.packSizeText,
    requiresSizeSelection: apolloData.requiresSizeSelection,
    ctaLabel: 'Angebot bei Apollo ansehen *',
    disclaimer: 'CJ-Partnerlink (in Vorbereitung) · Tagesaktueller Händlerpreis direkt bei Apollo einsehbar',
    editorialNote: apolloData.editorialNote,
    programStatus: MERCHANTS.apollo.programStatus, // APPLIED
    isProductionActive: false // Bewusst FALSE: Pilot ist nicht produktiv aktiv
  };
}

/**
 * Gibt alle relevanten Händlerangebote für ein Produkt zurück
 * 
 * @param {string|Object} productOrId 
 * @param {{ includePilots?: boolean }} [options]
 * @returns {Array<Object>}
 */
export function getOffersForProduct(productOrId, options = {}) {
  const { includePilots = false } = options;
  const product = typeof productOrId === 'string' ? getProductById(productOrId) : productOrId;
  if (!product) return [];

  const offers = [];

  // 1. Amazon (Standard-Händler für alle 57 Produkte)
  const amazonOffer = buildAmazonOffer(product);
  if (amazonOffer) {
    const val = validateMerchantOffer(amazonOffer);
    if (val.canRender) {
      offers.push(amazonOffer);
    }
  }

  // 2. Mister Spex (Aktiv für 7 verifizierte Produkte)
  const msOffer = buildMisterSpexOffer(product);
  if (msOffer) {
    const val = validateMerchantOffer(msOffer);
    if (val.canRender) {
      offers.push(msOffer);
    }
  }

  // 3. Apollo Pilot (Nur wenn explizit angefragt z. B. in QA/Pilot-Tests)
  if (includePilots) {
    const apolloOffer = buildApolloOffer(product);
    if (apolloOffer) {
      offers.push(apolloOffer);
    }
  }

  return offers;
}
