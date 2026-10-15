import React from 'react';
import { ExternalLink, Check, Info, Package } from 'lucide-react';
import { getMisterSpexOffer } from '../utils/misterSpexValidation.js';
import { trackAffiliateClick } from '../utils/tracking.js';

/**
 * Händlerkarte für verifizierte Mister-Spex-Angebote auf den 7 freigegebenen Produktseiten.
 * 
 * Richtlinien:
 * - Streng getrennt von der Amazon-ASIN-Logik
 * - Eindeutige Werbe-/Partnerlink-Kennzeichnung (*)
 * - rel="noopener noreferrer sponsored"
 * - Reale Packungsgrößeninformationen
 * - Auswahlhinweis bei mehreren Packungsgrößen
 * - Keine ungeprüften Preise oder Bestandsbehauptungen
 */
export default function MisterSpexOfferCard({ product }) {
  const offer = getMisterSpexOffer(product);
  if (!offer) return null;

  const handleClick = () => {
    trackAffiliateClick(product.product_name, 'mister_spex', 'product_detail_merchant_card');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header mit Händler-Branding & Werbekennzeichnung */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
            MS
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-950 leading-tight">
              Mister Spex
            </h4>
            <span className="text-[10px] text-slate-500 block">
              Zertifizierter Fachhändler · misterspex.de
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
          Partnerangebot *
        </span>
      </div>

      {/* Produkt- und Packungsinformationen */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center text-slate-600">
          <span className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-400" />
            <span>Verfügbare Packungsgrößen:</span>
          </span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
            {offer.packSizeText}
          </span>
        </div>

        {offer.requiresSizeSelection && (
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <span>
              Beim Händler sind mehrere Packungsgrößen wählbar. Bitte gewünschte Packungsgröße direkt auf der Anbieterseite auswählen.
            </span>
          </div>
        )}

        <div className="text-[11px] text-slate-500 pt-1">
          Tagesaktueller Händlerpreis und Lieferzeit direkt bei Mister Spex einsehbar.
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <a
          href={offer.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition group"
        >
          <span>Angebot bei Mister Spex ansehen *</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <div className="text-center mt-2 text-[10px] text-slate-500 leading-tight">
          * Werbelink / Partnerlink (Awin Netzwerk) · Weiterleitung zum zertifizierten Händlerangebot
        </div>
      </div>
    </div>
  );
}
