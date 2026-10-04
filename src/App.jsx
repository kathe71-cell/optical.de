import AnpassungGuidePage from './pages/AnpassungGuidePage';
import AstigmatismusGuide from './pages/AstigmatismusGuide';
import MonatsVsTagesGuide from './pages/MonatsVsTagesGuide';
import PflegemittelGuide from './pages/PflegemittelGuide';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import VercelAnalytics from './components/VercelAnalytics';
import Home from './pages/Home';
import VergleichskatalogPage from './pages/VergleichskatalogPage';
import PreisrechnerPage from './pages/PreisrechnerPage';
import DecoderPage from './pages/DecoderPage';
import SavedLensesPage from './pages/SavedLensesPage';
import NotFoundPage from './pages/NotFoundPage';
import RechnerEmbed from './pages/RechnerEmbed';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import PrivateLabelLanding from './pages/PrivateLabelLanding';
import CategoryLanding from './pages/CategoryLanding';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductComparisonPage from './pages/ProductComparisonPage';
import TransparencyPage from './pages/TransparencyPage';

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function AppRoutes() {
  return (
    <>
      <VercelAnalytics />
      <ScrollToTopOnNav />
      <Routes>
        {/* Hauptseite mit Nachkauf-Fokus */}
        <Route path="/" element={<Home />} />

        {/* ECHTE STANDALONE-SEITEN (Keine Startseiten-Klone mehr) */}
        <Route path="/vergleichskatalog" element={<VergleichskatalogPage />} />
        <Route path="/preisrechner" element={<PreisrechnerPage />} />
        <Route path="/eigenmarken-decoder" element={<DecoderPage />} />
        <Route path="/meine-linsen" element={<SavedLensesPage />} />

        {/* Saubere Kurz-URLs & Weiterleitungen */}
        <Route path="/decoder" element={<Navigate to="/eigenmarken-decoder" replace />} />
        <Route path="/vergleich" element={<ProductComparisonPage />} />
        <Route path="/rechner" element={<Navigate to="/preisrechner" replace />} />
        <Route path="/bookmarks" element={<Navigate to="/meine-linsen" replace />} />

        {/* Transparenz-Standard & FAQ */}
        <Route path="/transparenz" element={<TransparencyPage />} />
        <Route path="/faq" element={<Navigate to="/#trust" replace />} />

        {/* SEO-Landingpages: Handelsmarken / Private Labels */}
        <Route path="/apollo-iwear-oxygen" element={<PrivateLabelLanding slugOverride="apollo-iwear-oxygen" />} />
        <Route path="/fielmann-actimed" element={<PrivateLabelLanding slugOverride="fielmann-actimed" />} />
        <Route path="/fielmann-atmo" element={<PrivateLabelLanding slugOverride="fielmann-atmo" />} />
        <Route path="/mister-spex-true-day" element={<PrivateLabelLanding slugOverride="mister-spex-true-day" />} />
        <Route path="/specsavers-easyvision-opteyes" element={<PrivateLabelLanding slugOverride="specsavers-easyvision-opteyes" />} />
        <Route path="/apollo-iwear-harmony" element={<PrivateLabelLanding slugOverride="apollo-iwear-harmony" />} />

        {/* SEO-Landingpages: Kategorien & Preisvergleich */}
        <Route path="/tageslinsen-vergleich" element={<CategoryLanding categorySlugOverride="tageslinsen-vergleich" />} />
        <Route path="/monatslinsen-vergleich" element={<CategoryLanding categorySlugOverride="monatslinsen-vergleich" />} />
        <Route path="/torische-kontaktlinsen" element={<CategoryLanding categorySlugOverride="torische-kontaktlinsen" />} />
        <Route path="/multifokale-kontaktlinsen" element={<CategoryLanding categorySlugOverride="multifokale-kontaktlinsen" />} />
        <Route path="/kontaktlinsen-preisvergleich" element={<CategoryLanding categorySlugOverride="kontaktlinsen-preisvergleich" />} />

        {/* SEO-Landingpages: Einzelprodukt & Direktvergleich */}
        <Route path="/biofinity" element={<ProductDetailPage productIdOverride="biofinity" />} />
        <Route path="/produkt/:productId" element={<ProductDetailPage />} />
        <Route path="/biofinity-vs-air-optix" element={<ProductComparisonPage />} />

        {/* Rechtliches & Tools */}
        <Route path="/rechner-embed" element={<RechnerEmbed />} />
        <Route path="/ratgeber/kontaktlinsen-anpassen" element={<AnpassungGuidePage />} />
        <Route path="/ratgeber/astigmatismus-kontaktlinsen" element={<AstigmatismusGuide />} />
        <Route path="/ratgeber/tageslinsen-vs-monatslinsen-kosten" element={<MonatsVsTagesGuide />} />
        <Route path="/ratgeber/kontaktlinsen-pflegemittel-vergleich" element={<PflegemittelGuide />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />

        {/* ECHTER 404 FEHLER-ROUTENFALLBACK (Kein Pseudo-Home Redirect) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
