import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VercelAnalytics from './components/VercelAnalytics';
import Home from './pages/Home';
import RechnerEmbed from './pages/RechnerEmbed';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import PrivateLabelLanding from './pages/PrivateLabelLanding';
import CategoryLanding from './pages/CategoryLanding';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductComparisonPage from './pages/ProductComparisonPage';

export default function App() {
  return (
    <Router>
      <VercelAnalytics />
      <Routes>
        {/* Hauptseite & Sektionen als saubere URLs */}
        <Route path="/" element={<Home />} />
        <Route path="/eigenmarken-decoder" element={<Home activeSection="decoder" />} />
        <Route path="/vergleichskatalog" element={<Home activeSection="vergleich" />} />
        <Route path="/preisrechner" element={<Home activeSection="rechner" />} />
        <Route path="/transparenz" element={<Home activeSection="trust" />} />
        <Route path="/faq" element={<Home activeSection="faq" />} />

        {/* Saubere Kurz-URLs & Weiterleitungen ohne Hash */}
        <Route path="/decoder" element={<Navigate to="/eigenmarken-decoder" replace />} />
        <Route path="/vergleich" element={<Navigate to="/vergleichskatalog" replace />} />
        <Route path="/rechner" element={<Navigate to="/preisrechner" replace />} />

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
        <Route path="/biofinity-vs-air-optix" element={<ProductComparisonPage />} />

        {/* Rechtliches & Tools */}
        <Route path="/rechner-embed" element={<RechnerEmbed />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
