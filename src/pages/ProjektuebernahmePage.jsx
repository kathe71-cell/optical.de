import React from 'react';

export default function ProjektuebernahmePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-4">Projektübernahme</h1>
          <p className="text-lg leading-relaxed">
            Eine Übernahme von optical.de als vollständiges Projekt ist grundsätzlich möglich.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border shadow-sm text-black">
          <div>
            <p className="font-semibold mb-4">Gegenstand einer möglichen Übernahme können sein:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Domain optical.de</li>
              <li>vollständiges Website-Projekt</li>
              <li>Quellcode</li>
              <li>bestehende Inhalte</li>
              <li>projektspezifische technische Komponenten</li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-bold mb-2">Interesse an einer Projektübernahme?</h2>
            <p className="mb-5 text-sm">Anfragen bitte per E-Mail an jens@kathe.org.</p>
            <a 
              href="mailto:jens@kathe.org?subject=Projektübernahme%20optical.de"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-sm transition-all"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
