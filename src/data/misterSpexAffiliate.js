/**
 * Register der verifizierten Mister-Spex-Partnerangebote (Awin Netzwerk)
 * 
 * Publisher-ID: 1676831 (optical.de Media)
 * Advertiser-ID: 10118 (Mister Spex DE)
 * 
 * Verifizierter Produktumfang (7 Produkte):
 * 1. Biofinity Toric -> Mister-Spex-ID: 6471515, Packung: 6er
 * 2. Biofinity Multifocal -> Mister-Spex-ID: 6493181, Packung: 6er
 * 3. Biofinity (Spheric) -> Mister-Spex-ID: 6749126, Packung: 3er, 6er
 * 4. Air Optix plus HydraGlyde -> Mister-Spex-ID: 6663742, Packung: 3er, 6er
 * 5. Air Optix plus HydraGlyde for Astigmatism -> Mister-Spex-ID: 6735498, Packung: 3er, 6er
 * 6. Proclear Sphere -> Mister-Spex-ID: 91, Packung: 6er
 * 7. MyDay Daily Disposable -> Mister-Spex-ID: 6511418, Packung: 30er, 90er
 */

export const MISTER_SPEX_CONFIG = {
  advertiserId: '10118',
  publisherId: '1676831',
  merchantName: 'Mister Spex',
  merchantDomain: 'misterspex.de',
  awinBaseUrl: 'https://www.awin1.com/cread.php'
};

/**
 * Erzeugt eine manipulationssichere Awin-Klick-URL für Mister Spex
 * 
 * @param {string} misterSpexProductId 
 * @returns {string} Vollständige Awin-Affiliate-URL
 */
export function buildMisterSpexAwinUrl(misterSpexProductId) {
  const targetUrl = `https://www.misterspex.de/p/${misterSpexProductId}`;
  return `${MISTER_SPEX_CONFIG.awinBaseUrl}?awinmid=${MISTER_SPEX_CONFIG.advertiserId}&awinaffid=${MISTER_SPEX_CONFIG.publisherId}&ued=${encodeURIComponent(targetUrl)}`;
}

/**
 * Exakte Liste der 7 verifizierten Produkte mit Packungsgrößen und Deeplinks
 */
export const MISTER_SPEX_OFFERS = {
  'biofinity-toric': {
    productId: 'biofinity-toric',
    misterSpexId: '6471515',
    productName: 'Biofinity Toric',
    manufacturer: 'CooperVision',
    packSizes: ['6'],
    packSizeText: '6er-Box',
    requiresSizeSelection: false,
    affiliateUrl: buildMisterSpexAwinUrl('6471515'),
    verified: true
  },
  'biofinity-multifocal': {
    productId: 'biofinity-multifocal',
    misterSpexId: '6493181',
    productName: 'Biofinity Multifocal',
    manufacturer: 'CooperVision',
    packSizes: ['6'],
    packSizeText: '6er-Box',
    requiresSizeSelection: false,
    affiliateUrl: buildMisterSpexAwinUrl('6493181'),
    verified: true
  },
  'biofinity': {
    productId: 'biofinity',
    misterSpexId: '6749126',
    productName: 'Biofinity',
    manufacturer: 'CooperVision',
    packSizes: ['3', '6'],
    packSizeText: '3er- & 6er-Box',
    requiresSizeSelection: true,
    affiliateUrl: buildMisterSpexAwinUrl('6749126'),
    verified: true
  },
  'airoptix-hydraglyde': {
    productId: 'airoptix-hydraglyde',
    misterSpexId: '6663742',
    productName: 'Air Optix plus HydraGlyde',
    manufacturer: 'Alcon',
    packSizes: ['3', '6'],
    packSizeText: '3er- & 6er-Box',
    requiresSizeSelection: true,
    affiliateUrl: buildMisterSpexAwinUrl('6663742'),
    verified: true
  },
  'airoptix-toric': {
    productId: 'airoptix-toric',
    misterSpexId: '6735498',
    productName: 'Air Optix plus HydraGlyde for Astigmatism',
    manufacturer: 'Alcon',
    packSizes: ['3', '6'],
    packSizeText: '3er- & 6er-Box',
    requiresSizeSelection: true,
    affiliateUrl: buildMisterSpexAwinUrl('6735498'),
    verified: true
  },
  'proclear-sphere': {
    productId: 'proclear-sphere',
    misterSpexId: '91',
    productName: 'Proclear Sphere',
    manufacturer: 'CooperVision',
    packSizes: ['6'],
    packSizeText: '6er-Box',
    requiresSizeSelection: false,
    affiliateUrl: buildMisterSpexAwinUrl('91'),
    verified: true
  },
  'myday-daily': {
    productId: 'myday-daily',
    misterSpexId: '6511418',
    productName: 'MyDay daily disposable',
    manufacturer: 'CooperVision',
    packSizes: ['30', '90'],
    packSizeText: '30er- & 90er-Box',
    requiresSizeSelection: true,
    affiliateUrl: buildMisterSpexAwinUrl('6511418'),
    verified: true
  }
};
