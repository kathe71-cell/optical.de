import React from 'react';
import { ExternalLink, Package, ShieldCheck, Info } from 'lucide-react';
import { getOffersForProduct } from '../utils/multiMerchantManager.js';
import { trackMerchantOutboundClick } from '../utils/tracking.js';
import { MERCHANTS } from '../data/merchants.js';

/**
 * MultiMerchantOfferSection (Isolierte UI-Komponente für Phase 12.0)
 * 
 * Barrierearme, mobile-optimierte Übersicht von autorisierten Fachhändlern
 * und Bezugsquellen für ein Kontaktlinsenprodukt.
 * 
 * Richtlinien:
 * - Keine spekulativen Rankings ("Bester Preis", "Testsieger")
 * - Klare Werbekennzeichnung (*)
 * - rel="noopener noreferrer sponsored"
 * - Transparente Packungsgrößen-Informationen
 * - Keine produktive Einbindung in ProductDetailPage vor gesonderter Freigabe
 */
export default function MultiMerchantOfferSection({ product, includePilots = false, className = '' }) {
  if (!product) return null;

  const offers = getOffersForProduct(product, { includePilots });
  if (!offers || offers.length === 0) return null;

  return (
    <section 
      aria-label="Verfügbare Händlerangebote und Bezugsquellen" 
      className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Bezugsquellen &amp; Händleroptionen
          </span>
          <h3 className="text-lg font-black text-slate-950 mt-0.5">
            Geprüfte Händler für {product.product_name}
          </h3>
        </div>

        <span className="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
          Partnerangebote *
        </span>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => {
          const merchant = MERCHANTS[offer.merchantId] || {};
          const isPilot = !offer.isProductionActive;

          return (
            <div 
              key={offer.merchantId}
              className={`p-4 rounded-xl border transition ${
                isPilot 
                  ? 'bg-slate-50/70 border-dashed border-slate-300' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Händlerinfo */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {merchant.shortName || 'OPT'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {merchant.name || offer.merchantName}
                      </h4>
                      {isPilot && (
                        <span className="text-[9px] font-semibold bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded border border-blue-200">
                          Pilot (Inaktiv)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {merchant.trustLabel || merchant.domain}
                    </span>
                  </div>
                </div>

                {/* Packungsgröße Badge */}
                {offer.packSizeText && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg self-start sm:self-center">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    <span>Packung: <strong>{offer.packSizeText}</strong></span>
                  </div>
                )}
              </div>

              {/* Hinweisfeld bei mehreren Packungsgrößen */}
              {offer.requiresSizeSelection && (
                <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Beim Händler sind mehrere Packungsgrößen wählbar (Auswahl direkt im Shop).</span>
                </div>
              )}

              {/* Redaktionelle Anmerkung z.B. bei Eigenmarken-Verknüpfung */}
              {offer.editorialNote && (
                <div className="mt-2 text-[11px] text-slate-500 italic">
                  Hinweis: {offer.editorialNote}
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500 leading-tight">
                  {offer.disclaimer}
                </span>

                {offer.affiliateUrl ? (
                  <a
                    href={offer.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => trackMerchantOutboundClick({
                      productId: product.id,
                      productName: product.product_name,
                      merchant: offer.merchantId,
                      network: merchant.network,
                      sourceComponent: 'multi_merchant_section'
                    })}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition shadow-2xs whitespace-nowrap"
                  >
                    <span>{offer.ctaLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                ) : (
                  <button
                    disabled
                    aria-disabled="true"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-200 text-slate-500 cursor-not-allowed whitespace-nowrap"
                  >
                    <span>Pilotlink in Prüfung</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        * Werbelinks / Partnerlinks. optical.de ist ein unabhängiges Informations- und Vergleichsportal und steht in keinem gesellschaftsrechtlichen Verhältnis zu den genannten Optikern und Marken. Alle Händlerpreise und Lieferzeiten werden direkt beim jeweiligen Anbieter aktualisiert.
      </div>
    </section>
  );
}
