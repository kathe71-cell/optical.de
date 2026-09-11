import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const AMAZON_TAG = 'esstri-21';
const AMAZON_SUBID = 'optical.de-21';

const getAmazonLink = (query) => {
  return `https://www.amazon.de/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}&ascsubtag=${AMAZON_SUBID}`;
};

// PRODUKT-DATEN FÜR DIREKTE EMPFEHLUNGEN
const PRODUCTS_DB = {
  biofinity: {
    name: 'CooperVision Biofinity (6er)',
    subtitle: 'Comfilcon A (SiHy) · Dk/t 160 · Entspricht nach Parametern Apollo iWear Oxygen & Fielmann ActiMed',
    price: 'ab 19,90 €',
    dkt: '160 Dk/t',
    query: 'CooperVision Biofinity 6er Packung',
    tag: 'Bestseller Monatslinse'
  },
  biofinityToric: {
    name: 'CooperVision Biofinity Toric (6er)',
    subtitle: 'Optimized Toric Geometry™ · Stabil bei Hornhautverkrümmung (CYL / AXIS)',
    price: 'ab 31,90 €',
    dkt: '160 Dk/t',
    query: 'CooperVision Biofinity Toric 6er',
    tag: 'Torisch Monatslinse'
  },
  biofinityMultifocal: {
    name: 'CooperVision Biofinity Multifocal (6er)',
    subtitle: 'Balanced Progressive® Technology · Scharf in Nähe, Zwischenbereich & Ferne',
    price: 'ab 39,90 €',
    dkt: '160 Dk/t',
    query: 'CooperVision Biofinity Multifocal 6er',
    tag: 'Gleitsicht Monatslinse'
  },
  dailiesTotal1: {
    name: 'Alcon Dailies Total 1 (30er/90er)',
    subtitle: 'Wassergradient (bis zu 80% Wasser an der Oberfläche) · Hoher Oberflächenkomfort',
    price: 'ab 27,90 €',
    dkt: '156 Dk/t',
    query: 'Alcon Dailies Total 1 30er',
    tag: 'Wassergradient-Technologie'
  },
  acuvueMoist: {
    name: '1-Day Acuvue Moist (30er/90er)',
    subtitle: 'Etafilcon A mit LACREON® Feuchtigkeitskissen · UV-Schutz Klasse 2',
    price: 'ab 23,50 €',
    dkt: '33 Dk/t',
    query: '1-Day Acuvue Moist 30er Packung',
    tag: 'Hydrogel Tageslinse'
  },
  acuvueOasys1Day: {
    name: 'Acuvue Oasys 1-Day (30er)',
    subtitle: 'HydraLuxe® Technologie · Silikon-Hydrogel mit UV-Schutz Klasse 1',
    price: 'ab 28,90 €',
    dkt: '121 Dk/t',
    query: 'Acuvue Oasys 1-Day 30er',
    tag: 'SiHy Tageslinse'
  },
  airOptixHydra: {
    name: 'Air Optix Plus HydraGlyde (6er)',
    subtitle: 'SmartShield® gegen Lipide & Ablagerungen · Entspricht nach Parametern Fielmann Atmo',
    price: 'ab 24,90 €',
    dkt: '138 Dk/t',
    query: 'Air Optix Plus HydraGlyde 6er',
    tag: 'SiHy Monatslinse'
  },
  airOptixNightDay: {
    name: 'Air Optix Night & Day Aqua (6er)',
    subtitle: 'Sehr hohe Sauerstofftransmissibilität (Dk/t 175) · Nach Fachberatung für verlängertes Tragen',
    price: 'ab 28,90 €',
    dkt: '175 Dk/t',
    query: 'Air Optix Night and Day Aqua 6er',
    tag: 'Dk/t 175 (Extended Wear)'
  },
  bauschUltra: {
    name: 'Bausch + Lomb Ultra (6er)',
    subtitle: 'MoistureSeal® Technologie · Entspricht nach Parametern Specsavers Opteyes',
    price: 'ab 21,90 €',
    dkt: '163 Dk/t',
    query: 'Bausch + Lomb Ultra Monatslinse 6er',
    tag: 'Referenzprodukt Specsavers'
  },
  clariti1Day: {
    name: 'CooperVision Clariti 1-Day (30er)',
    subtitle: 'Somofilcon A (SiHy) · Sehr atmungsaktive Tageslinse zum günstigen Preis',
    price: 'ab 19,50 €',
    dkt: '86 Dk/t',
    query: 'CooperVision Clariti 1-Day 30er',
    tag: 'Preis-Leistungs-Tipp'
  },
  soflensDaily: {
    name: 'Bausch + Lomb SofLens Daily (30er)',
    subtitle: 'Günstigste Tageslinse im Vergleich · Sehr weich und angenehm einzusetzen',
    price: 'ab 16,50 €',
    dkt: '28 Dk/t',
    query: 'SofLens Daily Disposable 30er',
    tag: 'Spar-Tipp Tageslinse'
  },
  biotrueFluid: {
    name: 'Bausch + Lomb Biotrue All-in-One (2x 300ml)',
    subtitle: 'Inspiriert von der Biologie des Auges · Mit Hyaluronan · Optimaler pH-Wert',
    price: 'ab 19,90 €',
    dkt: 'Pflegemittel',
    query: 'Biotrue All in One 2x300ml',
    tag: 'Kombi-Bestseller'
  },
  optiFreePuremoist: {
    name: 'Alcon Opti-Free PureMoist (2x 300ml)',
    subtitle: 'Speziell für Silikon-Hydrogel-Linsen · HydraGlyde® Feuchtigkeitsmatrix',
    price: 'ab 21,90 €',
    dkt: 'Pflegemittel',
    query: 'Opti-Free PureMoist 2x300ml',
    tag: 'Für SiHy-Linsen'
  },
  aoSept: {
    name: 'Alcon AOSept Plus mit HydraGlyde (2x 360ml)',
    subtitle: 'Konservierungsmittelfreies Peroxidsystem mit Katalysator-Behälter',
    price: 'ab 24,90 €',
    dkt: 'Peroxidsystem',
    query: 'AOSept Plus HydraGlyde 2x360ml',
    tag: 'Allergiker-Tipp'
  },
  hyloComod: {
    name: 'URSAPHARM HYLO-COMOD Tropfen (10ml)',
    subtitle: '0,1% Hyaluronsäure ohne Konservierungsstoffe · Mit allen Linsen verträglich',
    price: 'ab 13,90 €',
    dkt: 'Augentropfen',
    query: 'HYLO COMOD Augentropfen 10ml',
    tag: 'Befeuchtungstropfen'
  }
};

// INTELLIGENTE WISSENS- UND ANTWORT-REGELN
const INTENT_RULES = [
  // 1. GREETINGS & HILFE
  {
    matcher: (q) => /^(hallo|hi|hey|servus|moin|guten tag|guten morgen|wer bist du|was kannst du|hilfe)/i.test(q),
    reply: () => ({
      text: 'Hallo! 👋 Ich bin dein digitaler Kontaktlinsen-Berater auf optical.de. Ich helfe dir, passende Linsen für deine Werte zu vergleichen, Optiker-Eigenmarken (Apollo, Fielmann etc.) transparent nach Parametern zuzuordnen oder Pflegemittel auszuwählen. Was möchtest du wissen?',
      quickReplies: [
        { label: 'Tages- vs. Monatslinsen?', key: 'tages_vs_monat' },
        { label: 'Trockene Augen / PC', key: 'trocken' },
        { label: 'Apollo / Fielmann Linse?', key: 'eigenmarken' },
        { label: 'Hornhautverkrümmung', key: 'toric' }
      ]
    })
  },

  // 2. APOLLO / IWEAR ENTSCHLÜSSELN
  {
    matcher: (q) => /(apollo|iwear|oxygen|activ|harmony)/i.test(q),
    reply: () => ({
      text: '🔍 Apollo iWear Entschlüsselung:\n\n• Apollo iWear Oxygen entspricht nach Hersteller- und Parametervergleich der CooperVision Biofinity (Comfilcon A, Dk/t 160). Das Markenprodukt kostet online ab ca. 19,90 € statt ca. 41,90 € Filialpreis!\n• Apollo iWear Activ entspricht nach Parametern der CooperVision Avaira Vitality\n• Apollo iWear Harmony entspricht nach Parametern der CooperVision Proclear\n\nVerifizierte Parameter im Vergleich:',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.biofinityToric]
    })
  },

  // 3. FIELMANN / ACTIMED ENTSCHLÜSSELN
  {
    matcher: (q) => /(fielmann|actimed|atmo)/i.test(q),
    reply: () => ({
      text: '🔍 Fielmann Eigenmarken Entschlüsselung:\n\n• Fielmann ActiMed Monatslinse entspricht nach Spezifikation der CooperVision Biofinity (spart bis zu 48 % gegenüber dem Filialpreis).\n• Fielmann Atmo Monatslinse entspricht nach Parametern der Alcon Air Optix Plus HydraGlyde (Lotrafilcon B, Dk/t 138).\n\nVerifizierte Markenprodukte im Vergleich:',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.airOptixHydra]
    })
  },

  // 4. MISTER SPEX / TRUE DAY
  {
    matcher: (q) => /(mister spex|true day|misterspex)/i.test(q),
    reply: () => ({
      text: '🔍 Mister Spex Entschlüsselung:\n\n• Mister Spex True Day entspricht nach Spezifikation der Alcon Dailies AquaComfort Plus (Nelfilcon A, Feuchtigkeitskomplex). Online sparst du gegenüber dem Filial-/Listenpreis!',
      products: [PRODUCTS_DB.acuvueMoist, PRODUCTS_DB.dailiesTotal1]
    })
  },

  // 5. SPECSAVERS / EASYVISION
  {
    matcher: (q) => /(specsavers|easyvision|opteyes|umere)/i.test(q),
    reply: () => ({
      text: '🔍 Specsavers / Pearle Entschlüsselung:\n\n• Specsavers Easyvision Opteyes entspricht nach Parametern der Bausch + Lomb Ultra (Samfilcon A, Dk/t 163).\n• Specsavers Umere entspricht nach Parametern der CooperVision Clariti 1-Day.',
      products: [PRODUCTS_DB.bauschUltra, PRODUCTS_DB.clariti1Day]
    })
  },

  // 6. ALLGEMEIN EIGENMARKEN / BAUBARE LINSEN
  {
    matcher: (q) => /(eigenmarke|handelsmarke|baugleich|original|ersatz|alternative)/i.test(q),
    reply: () => ({
      text: '💡 Optikerketten besitzen in der Regel keine eigenen Fertigungsstätten für Kontaktlinsen. Handelsmarken werden von führenden Herstellern (CooperVision, Alcon, Bausch + Lomb) unter Private-Label-Namen vertrieben. Nach technischem Parametervergleich lassen sich die entsprechenden Markenprodukte oft mit deutlicher Preisersparnis online finden:',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.airOptixHydra, PRODUCTS_DB.bauschUltra]
    })
  },

  // 7. SPECIFIC PRODUCT: BIOFINITY
  {
    matcher: (q) => /(biofinity)/i.test(q),
    reply: () => ({
      text: '⭐ CooperVision Biofinity ist eine der meistverkauften Monatslinsen weltweit. Sie besteht aus Comfilcon A mit natürlicher Benetzung (Aquaform®) und einem herausragenden Dk/t-Wert von 160. Perfekt für lange Tragezeiten von morgens bis spät abends:',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.biofinityToric, PRODUCTS_DB.biofinityMultifocal]
    })
  },

  // 8. SPECIFIC PRODUCT: ACUVUE / OASYS / MOIST
  {
    matcher: (q) => /(acuvue|oasys|moist|trueye|vita|johnson)/i.test(q),
    reply: () => ({
      text: '⭐ Johnson & Johnson Acuvue Linsen zeichnen sich durch integrierten UV-Schutz und innovative Tränen-Technologien (HydraLuxe® / LACREON®) aus. Hier sind die beliebtesten Varianten:',
      products: [PRODUCTS_DB.acuvueMoist, PRODUCTS_DB.acuvueOasys1Day]
    })
  },

  // 9. SPECIFIC PRODUCT: AIR OPTIX / DAILIES / ALCON
  {
    matcher: (q) => /(air optix|airoptix|dailies|total 1|total1|alcon|hydraglyde)/i.test(q),
    reply: () => ({
      text: '⭐ Alcon ist führend bei extrem sauerstoffdurchlässigen Linsen und der patentierten Wassergradienten-Technologie:',
      products: [PRODUCTS_DB.dailiesTotal1, PRODUCTS_DB.airOptixHydra, PRODUCTS_DB.airOptixNightDay]
    })
  },

  // 10. SPECIFIC PRODUCT: BAUSCH & LOMB / ULTRA / BIOTRUE
  {
    matcher: (q) => /(bausch|lomb|biotrue|ultra|soflens|purevision)/i.test(q),
    reply: () => ({
      text: '⭐ Bausch + Lomb ist bekannt für Linsen mit extrem hoher Feuchtigkeitsbindung (MoistureSeal®) und vom Auge inspirierte Pflegemittel:',
      products: [PRODUCTS_DB.bauschUltra, PRODUCTS_DB.soflensDaily, PRODUCTS_DB.biotrueFluid]
    })
  },

  // 11. SCHLAFEN MIT KONTAKTLINSEN / EXTENDED WEAR
  {
    matcher: (q) => /(schlafen|über nacht|nachts|im bett|dauertragen|extended wear)/i.test(q),
    reply: () => ({
      text: '⚠️ Mit normalen Kontaktlinsen darf man keinesfalls schlafen, da die Hornhaut bei geschlossenen Lidern sonst erstickt (Gefahr schwerer Infektionen)!\n\nEinzige Ausnahme sind offiziell zugelassene „Continuous Wear“-Linsen wie die Air Optix Night & Day Aqua mit Dk/t 175. Dies sollte jedoch vorab zwingend mit dem Augenarzt abgesprochen werden:',
      products: [PRODUCTS_DB.airOptixNightDay]
    })
  },

  // 12. SCHWIMMEN / WASSER / DUSCHEN / SAUNA
  {
    matcher: (q) => /(schwimmen|duschen|sauna|bad|wasser|pool|meer)/i.test(q),
    reply: () => ({
      text: '💧 Leitungswasser, Pool- und Seewasser enthalten Mikroorganismen (z. B. Akanthamöben), die schwere Hornhautentzündungen auslösen können. Wenn du im Wasser Linsen tragen möchtest, nutze stets Tageslinsen in Kombination mit einer dichten Schwimmbrille und entsorge die Linsen direkt nach dem Schwimmen!',
      products: [PRODUCTS_DB.acuvueMoist, PRODUCTS_DB.clariti1Day]
    })
  },

  // 13. TROCKENE AUGEN / BILDSCHIRMARBEIT / PC / BRENNEN
  {
    matcher: (q) => /(trocken|brennen|bildschirm|office|pc|computer|müde|rote augen|klimaanlage|heizung)/i.test(q),
    reply: () => ({
      text: '👁️ Am Bildschirm blinzelt man bis zu 70 % seltener, wodurch der Tränenfilm abreißt. Für trockene Augen empfehlen wir:\n\n1. Linsen mit Wassergradient (Dailies Total 1)\n2. Moderne Silikon-Hydrogel-Monatslinsen (Biofinity)\n3. Konservierungsmittelfreie Hyalurontropfen zur Befeuchtung zwischendurch (HYLO-COMOD):',
      products: [PRODUCTS_DB.dailiesTotal1, PRODUCTS_DB.biofinity, PRODUCTS_DB.hyloComod]
    })
  },

  // 14. BRILLE VS KONTAKTLINSEN / UMRECHNUNG / STÄRKE
  {
    matcher: (q) => /(brille|umrechnen|brillenpass|brillenwert|unterschied brille)/i.test(q),
    reply: () => ({
      text: '👓 Achtung bei Brillenwerten: Eine Brille sitzt ca. 12 mm vor dem Auge (Hornhaut-Scheitelabstand), Kontaktlinsen liegen direkt auf. Ab ca. +/- 4,00 Dioptrien weichen Linsenwerte von Brillenwerten ab (bei Kurzsichtigkeit meist schwächer, bei Weitsichtigkeit stärker). Bestelle daher nie blind nach dem Brillenpass, sondern nach deinem Kontaktlinsenpass!',
      quickReplies: [
        { label: 'Tageslinsen ansehen', key: 'tag' },
        { label: 'Monatslinsen ansehen', key: 'monat' }
      ]
    })
  },

  // 15. KENNWERTE: BC, DIA, DK/T
  {
    matcher: (q) => /(bc|basiskurve|dia|durchmesser|dk|dkt|sauerstoff|krümmung)/i.test(q),
    reply: () => ({
      text: '📐 Die wichtigsten technischen Linsen-Kennwerte:\n\n• BC (Basiskurve, meist 8.4–8.8 mm): Krümmung der Linse. Zu steil = drückt; zu flach = verrutscht.\n• DIA (Durchmesser, meist 14.0–14.2 mm): Gesamtdurchmesser der Linse.\n• Dk/t (Sauerstofftransmissibilität): Physikalische Sauerstoffdurchlässigkeit des Materials bezogen auf die Mittendicke (Hydrogel ca. 20–40 Dk/t, Silikon-Hydrogel ca. 80–175 Dk/t). Wichtig: Dk/t ist ein technisches Merkmal und kein alleiniges Kaufkriterium. Die Verträglichkeit hängt stets von der individuellen Passform und dem Tränenfilm ab.',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.dailiesTotal1]
    })
  },

  // 16. HORNHAUTVERKRÜMMUNG / ASTIGMATISMUS / TORISCH
  {
    matcher: (q) => /(torisch|toric|astigmatismus|hornhautverkrümmung|zylinder|cyl|achse|axis)/i.test(q),
    reply: () => ({
      text: '🎯 Bei Hornhautverkrümmung benötigt man torische Linsen. Diese besitzen zusätzlich zu SPH (Dioptrien) die Werte CYL (Zylinder) und AXIS (Achse in Grad). Sie sind speziell gewichtet, damit sie sich beim Blinzeln stabil ausrichten:',
      products: [PRODUCTS_DB.biofinityToric, PRODUCTS_DB.acuvueMoist]
    })
  },

  // 17. GLEITSICHT / MULTIFOKAL / PRESBYOPIE
  {
    matcher: (q) => /(gleitsicht|multifokal|multifocal|presbyop|alterssicht|lesen|nah|fern)/i.test(q),
    reply: () => ({
      text: '📖 Ab ca. 40–45 Jahren lässt die Scharfeinstellung im Nahbereich nach (Presbyopie). Multifokallinsen kombinieren mehrere Sehzonen mit einem Additionswert (ADD: Low, Med, High), um scharfes Sehen in der Nähe und Ferne zu ermöglichen:',
      products: [PRODUCTS_DB.biofinityMultifocal, PRODUCTS_DB.dailiesTotal1]
    })
  },

  // 18. REINIGUNG & PFLEGEMITTEL
  {
    matcher: (q) => /(reinigen|pflege|pflegemittel|lösung|kombilösung|peroxid|aufbewahrung|abspülen)/i.test(q),
    reply: () => ({
      text: '🧼 Die richtige Linsenpflege:\n\n• All-in-One Kombilösung: Reinigen, Abspülen, Desinfizieren und Aufbewahren in einem Schritt. Praktisch und alltagstauglich.\n• Peroxidsystem: Gründliche Desinfektion ohne Konservierungsstoffe, oft empfohlen bei empfindlichen Augen. Wichtig: Immer mindestens 6 Stunden im Spezialbehälter vollständig neutralisieren lassen!',
      products: [PRODUCTS_DB.biotrueFluid, PRODUCTS_DB.optiFreePuremoist, PRODUCTS_DB.aoSept]
    })
  },

  // 19. HALTBARKEIT & TRAGEDAUER
  {
    matcher: (q) => /(wie lange|tragedauer|haltbar|anbruch|ablauf|wann wegwerfen)/i.test(q),
    reply: () => ({
      text: '⏱️ Empfehlungen zur Tragedauer:\n\n• Tageslinsen: Nach einem Tragetag fachgerecht entsorgen (nicht wiederverwenden).\n• Monatslinsen: 30 Tage nach Öffnen des Blisters austauschen – unabhängig davon, an wie vielen Einzeltagen sie getragen wurden.\n• Tägliche Tragezeit: Die empfohlene maximale Stundenzahl pro Tag hängt vom Material und individuellen Tränenfilm ab und sollte stets mit deinem Augenarzt oder Optiker abgestimmt werden.',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.acuvueOasys1Day]
    })
  },

  // 20. KOSTEN & PREISVERGLEICH
  {
    matcher: (q) => /(kosten|preis|was kostet|billig|günstig|sparen|ersparnis|teuer)/i.test(q),
    reply: () => ({
      text: '💰 Kostenvergleich im Überblick (Basis: 2 Augen):\n\n• Monatslinsen (z. B. Biofinity): ca. 0,22 € bis 0,32 € pro Tragetag (ab ca. 6,63 €/Monat zzgl. Pflege). Wirtschaftlich am günstigsten bei regelmäßigem Tragen.\n• Tageslinsen (z. B. Clariti oder Acuvue): ca. 1,30 € bis 1,93 € pro Tragetag (2 Linsen). Ideal für Sport & Gelegenheits-Träger, da null Pflegeaufwand anfällt.\n• Bei Optiker-Handelsmarken zeigt der technische Datenvergleich oft deutliche Sparpotenziale beim Online-Kauf der entsprechenden Markenprodukte!',
      products: [PRODUCTS_DB.clariti1Day, PRODUCTS_DB.biofinity, PRODUCTS_DB.soflensDaily]
    })
  },

  // 21. AMAZON & BESTELLUNG
  {
    matcher: (q) => /(amazon|bestellen|lieferung|versand|online kaufen|originalware|sicher)/i.test(q),
    reply: () => ({
      text: '📦 Kontaktlinsen bei Amazon.de:\n\nÜber unsere Vergleichslinks gelangst du direkt zu verifizierten Händler- und Herstellerangeboten auf Amazon.de (Amazon-Partnerlink · Preis kann sich ändern). Du erhältst originale, versiegelte Neuware mit vollständigem Haltbarkeitsdatum.',
      products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.dailiesTotal1]
    })
  },

  // 22. TAGESLINSEN VS MONATSLINSEN DIREKTER VERGLEICH
  {
    matcher: (q) => /(tageslinsen|monatslinsen|unterschied tages|tages oder monats)/i.test(q),
    reply: () => ({
      text: '⚖️ Tageslinsen vs. Monatslinsen (Kosten für 2 Augen):\n\n• Tageslinsen: Höchste Hygiene, kein Pflegemittel, perfekt für Sport & Reisen (ca. 1,30 € – 1,90 € pro Tragetag).\n• Monatslinsen: Sehr günstig bei regelmäßigem Tragen (ab ca. 0,22 €/Tag bzw. 6,63 €/Monat), erfordert 2 Minuten tägliche Pflege.',
      products: [PRODUCTS_DB.dailiesTotal1, PRODUCTS_DB.biofinity, PRODUCTS_DB.acuvueMoist]
    })
  }
];

// ECHTZEIT-SUCHVORSCHLÄGE BEI TASTENANSCHLAG
const SUGGESTIONS_DATABASE = [
  // Eigenmarken
  { text: 'Apollo iWear Oxygen (Original: CooperVision Biofinity)', category: 'Eigenmarke', query: 'Apollo iWear Oxygen' },
  { text: 'Apollo iWear Activ (Original: Avaira Vitality)', category: 'Eigenmarke', query: 'Apollo iWear Activ' },
  { text: 'Apollo iWear Harmony (Original: Proclear)', category: 'Eigenmarke', query: 'Apollo iWear Harmony' },
  { text: 'Fielmann ActiMed (Original: CooperVision Biofinity)', category: 'Eigenmarke', query: 'Fielmann ActiMed' },
  { text: 'Fielmann Atmo (Original: Air Optix HydraGlyde)', category: 'Eigenmarke', query: 'Fielmann Atmo' },
  { text: 'Mister Spex True Day (Original: Dailies AquaComfort)', category: 'Eigenmarke', query: 'Mister Spex True Day' },
  { text: 'Specsavers Opteyes (Original: Bausch + Lomb Ultra)', category: 'Eigenmarke', query: 'Specsavers Opteyes' },

  // Bestseller-Linsen & Marken
  { text: 'CooperVision Biofinity (Monatslinse Dk/t 160)', category: 'Bestseller', query: 'Biofinity' },
  { text: 'CooperVision Biofinity Toric (Hornhautverkrümmung)', category: 'Torisch', query: 'Biofinity Toric' },
  { text: 'CooperVision Biofinity Multifocal (Gleitsicht)', category: 'Gleitsicht', query: 'Biofinity Multifocal' },
  { text: 'Alcon Dailies Total 1 (Wassergradient bis 80%)', category: 'Tageslinse', query: 'Dailies Total 1' },
  { text: '1-Day Acuvue Moist (Klassiker mit Feuchtigkeitskissen)', category: 'Tageslinse', query: 'Acuvue Moist' },
  { text: 'Acuvue Oasys 1-Day (HydraLuxe® Silikon-Hydrogel)', category: 'Tageslinse', query: 'Acuvue Oasys 1-Day' },
  { text: 'Alcon Air Optix Plus HydraGlyde (Monatslinse)', category: 'Monatslinse', query: 'Air Optix HydraGlyde' },
  { text: 'Air Optix Night & Day Aqua (Dauertragen Dk/t 175)', category: 'Extended Wear', query: 'Air Optix Night and Day' },
  { text: 'Bausch + Lomb Ultra (Feuchtigkeit für PC-Arbeit)', category: 'Monatslinse', query: 'Bausch Ultra' },
  { text: 'CooperVision Clariti 1-Day (Günstige SiHy-Linse)', category: 'Tageslinse', query: 'Clariti 1-Day' },
  { text: 'Bausch + Lomb SofLens Daily (Günstigste Tageslinse)', category: 'Tageslinse', query: 'SofLens Daily' },

  // Pflegemittel & Tropfen
  { text: 'Biotrue All-in-One Kombilösung (mit Hyaluronan)', category: 'Pflegemittel', query: 'Biotrue All in One' },
  { text: 'Alcon Opti-Free PureMoist (für SiHy-Linsen)', category: 'Pflegemittel', query: 'Opti-Free PureMoist' },
  { text: 'Alcon AOSept Plus Peroxidsystem (Allergiker)', category: 'Peroxid', query: 'AOSept Plus' },
  { text: 'URSAPHARM HYLO-COMOD Tropfen (Befeuchtung)', category: 'Tropfen', query: 'HYLO COMOD Tropfen' },

  // Wichtige Alltags- und Fachfragen
  { text: 'Trockene Augen am PC / Bildschirmarbeit', category: 'Ratgeber', query: 'Trockene Augen am Bildschirm' },
  { text: 'Darf man mit Kontaktlinsen schlafen?', category: 'Ratgeber', query: 'Darf man mit Kontaktlinsen schlafen?' },
  { text: 'Darf man mit Linsen schwimmen oder duschen?', category: 'Ratgeber', query: 'Schwimmen mit Kontaktlinsen' },
  { text: 'Brillenwerte in Kontaktlinsenwerte umrechnen', category: 'Werte', query: 'Brillenwerte umrechnen' },
  { text: 'Was bedeuten BC, DIA und Dk/t?', category: 'Werte', query: 'Was bedeutet BC DIA Dk/t' },
  { text: 'Hornhautverkrümmung (Astigmatismus / Zylinder / Achse)', category: 'Torisch', query: 'Hornhautverkrümmung Astigmatismus' },
  { text: 'Gleitsichtlinsen (Alterssichtigkeit / Presbyopie)', category: 'Gleitsicht', query: 'Gleitsichtlinsen Alterssichtigkeit' },
  { text: 'Tageslinsen vs. Monatslinsen im Vergleich', category: 'Vergleich', query: 'Unterschied Tageslinsen Monatslinsen' },
  { text: 'Wie reinigt man Kontaktlinsen richtig?', category: 'Pflege', query: 'Wie reinigt man Kontaktlinsen richtig?' },
  { text: 'Wie lange darf man Monatslinsen tragen?', category: 'Tragedauer', query: 'Wie lange darf man Monatslinsen tragen?' },
  { text: 'Was kosten Kontaktlinsen pro Monat / Tag?', category: 'Kosten', query: 'Was kosten Kontaktlinsen?' }
];

// INITIALE BEGRÜSSUNG
const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: 'Hallo! 👋 Ich bin dein digitaler Kontaktlinsen-Berater auf optical.de. Frage mich einfach alles zu Linsen, Werten, Trockenheit oder Optiker-Eigenmarken!',
    quickReplies: [
      { label: 'Tages- vs. Monatslinsen?', key: 'tages_vs_monat' },
      { label: 'Trockene Augen / PC', key: 'trocken' },
      { label: 'Apollo / Fielmann Eigenmarke?', key: 'eigenmarken' },
      { label: 'Hornhautverkrümmung', key: 'toric' },
      { label: 'Gleitsicht', key: 'multifocal' },
      { label: 'Pflegemittel', key: 'pflege' }
    ]
  }
];

export default function AdvisorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // ECHTZEIT-ERKENNUNG BEREITS AB DEM ERSTEN BUCHSTABEN
  const trimmedInput = inputValue.trim().toLowerCase();
  const liveSuggestions = trimmedInput.length >= 1
    ? SUGGESTIONS_DATABASE.filter((item) => {
        return (
          item.text.toLowerCase().includes(trimmedInput) ||
          item.query.toLowerCase().includes(trimmedInput) ||
          item.category.toLowerCase().includes(trimmedInput)
        );
      }).slice(0, 4)
    : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // HOCHPRÄZISE SEMANTISCHE SUCHE & INTENT-ERKENNUNG
  const evaluateQuery = (userInput) => {
    const raw = userInput.trim();
    if (!raw) return null;

    // 1. Prüfe Intent-Regeln (präzise Matcher)
    for (const rule of INTENT_RULES) {
      if (rule.matcher(raw)) {
        return rule.reply(raw);
      }
    }

    // 2. Suche nach konkreten Produktnamen in DB
    const lower = raw.toLowerCase();
    const matchedProducts = [];
    if (lower.includes('biofinity')) matchedProducts.push(PRODUCTS_DB.biofinity);
    if (lower.includes('acuvue') || lower.includes('moist')) matchedProducts.push(PRODUCTS_DB.acuvueMoist);
    if (lower.includes('oasys')) matchedProducts.push(PRODUCTS_DB.acuvueOasys1Day);
    if (lower.includes('dailies') || lower.includes('total 1')) matchedProducts.push(PRODUCTS_DB.dailiesTotal1);
    if (lower.includes('air optix')) matchedProducts.push(PRODUCTS_DB.airOptixHydra);
    if (lower.includes('ultra') || lower.includes('biotrue')) matchedProducts.push(PRODUCTS_DB.bauschUltra);
    if (lower.includes('clariti')) matchedProducts.push(PRODUCTS_DB.clariti1Day);
    if (lower.includes('tropfen') || lower.includes('hylo')) matchedProducts.push(PRODUCTS_DB.hyloComod);

    if (matchedProducts.length > 0) {
      return {
        text: `Zu deiner Suchanfrage „${raw}“ habe ich folgende passende Original-Markenprodukte im Katalog gefunden:`,
        products: matchedProducts
      };
    }

    // 3. Intelligenter Keyword-Fallback
    if (lower.includes('tag')) {
      return {
        text: 'Suchst du eine passende Tageslinse? Tageslinsen bieten maximale Frische ohne Reinigungsaufwand:',
        products: [PRODUCTS_DB.dailiesTotal1, PRODUCTS_DB.acuvueMoist, PRODUCTS_DB.clariti1Day]
      };
    }

    if (lower.includes('monat')) {
      return {
        text: 'Suchst du eine günstige Monatslinse? Hier sind die beliebtesten Silikon-Hydrogel-Bestseller:',
        products: [PRODUCTS_DB.biofinity, PRODUCTS_DB.airOptixHydra, PRODUCTS_DB.bauschUltra]
      };
    }

    // 4. Freundlicher, strukturierter Allgemein-Fallback
    return {
      text: `Ich helfe dir gerne bei allen Fragen rund um „${raw}“! Wähle einfach das Thema, das am besten zu deiner Frage passt:`,
      quickReplies: [
        { label: 'Tageslinsen vergleichen', key: 'tag' },
        { label: 'Monatslinsen vergleichen', key: 'monat' },
        { label: 'Trockene Augen / PC', key: 'trocken' },
        { label: 'Eigenmarke entschlüsseln', key: 'eigenmarken' }
      ]
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // 1. User Message
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // 2. Compute Bot Response
    setTimeout(() => {
      const response = evaluateQuery(text);
      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: response.text,
            products: response.products,
            quickReplies: response.quickReplies || [
              { label: 'Tages- vs. Monatslinsen', key: 'tages_vs_monat' },
              { label: 'Trockene Augen', key: 'trocken' },
              { label: 'Optiker-Eigenmarke?', key: 'eigenmarken' }
            ]
          }
        ]);
      }
    }, 150);
  };

  const handleQuickReply = (reply) => {
    if (reply.key === 'reset') {
      setMessages(INITIAL_MESSAGES);
      return;
    }

    // Map quick keys to natural query text
    const keyToQuery = {
      tages_vs_monat: 'Was ist der Unterschied zwischen Tageslinsen und Monatslinsen?',
      tag: 'Tageslinsen im Vergleich anzeigen',
      monat: 'Monatslinsen im Vergleich anzeigen',
      trocken: 'Was hilft bei trockenen Augen am Bildschirm?',
      toric: 'Welche Linsen brauche ich bei Hornhautverkrümmung?',
      multifocal: 'Welche Gleitsichtlinsen gibt es?',
      eigenmarken: 'Wie entschlüsselt man Apollo und Fielmann Eigenmarken?',
      pflege: 'Welches Pflegemittel soll ich nehmen?'
    };

    const queryText = keyToQuery[reply.key] || reply.label;
    handleSend(queryText);
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (GPU-accelerated fixed container against mobile scroll clipping) */}
      {!isOpen && (
        <div 
          className="fixed right-4 sm:right-6 z-[9999] pointer-events-auto"
          style={{ 
            bottom: 'max(1.25rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))',
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)'
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Kontaktlinsen-Berater Chat öffnen"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-colors border border-emerald-400/40 group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span className="text-xs font-black tracking-wide">Linsen-Berater</span>
          </button>
        </div>
      )}

      {/* CHATBOT MODAL WINDOW */}
      {isOpen && (
        <div 
          className="fixed z-[9999] right-3 left-3 sm:left-auto sm:right-6 sm:w-96 max-h-[85vh] sm:max-h-[600px] h-[85vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{ 
            bottom: 'max(1.25rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))',
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)'
          }}
        >
          
          {/* CHAT HEADER */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-black text-xs flex items-center gap-1.5">
                  <span>optical.de Linsen-Berater</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">Live</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Unabhängiger Preis- &amp; Markenvergleich</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Chat zurücksetzen"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Chat schließen"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MEDICAL DISCLAIMER NOTICE */}
          <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[10px] text-amber-950 font-medium flex items-center gap-1.5">
            <HelpCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
            <span>Produktvergleich &amp; Ratgeber. Ersetzt keine augenärztliche Anpassung oder Fachberatung.</span>
          </div>

          {/* CHAT MESSAGE HISTORY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[90%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Product Recommendation Cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    {msg.products.map((prod, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm hover:border-emerald-400 transition"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-extrabold text-slate-900 text-[11px]">{prod.name}</span>
                          <span className="bg-amber-100 text-amber-950 text-[9px] font-black px-1.5 py-0.5 rounded border border-amber-300">
                            {prod.tag}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight mb-2">{prod.subtitle}</p>

                        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                          <div className="text-[11px]">
                            <span className="font-black text-emerald-700">{prod.price}</span>
                            {prod.dkt !== 'Pflegemittel' && prod.dkt !== 'Augentropfen' && prod.dkt !== 'Peroxidsystem' && (
                              <span className="text-slate-400 text-[9px] ml-1.5 font-medium">({prod.dkt})</span>
                            )}
                          </div>
                          <a
                            href={getAmazonLink(prod.query)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] py-1 px-2.5 rounded-md flex items-center gap-1 shadow-sm transition"
                          >
                            <span>Zu Amazon *</span>
                            <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Reply Chips */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.quickReplies.map((qr, qrIdx) => (
                      <button
                        key={qrIdx}
                        onClick={() => handleQuickReply(qr)}
                        className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 hover:border-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs transition"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* ECHTZEIT-SUCHVORSCHLÄGE BEREITS AB DEM ERSTEN BUCHSTABEN */}
          {liveSuggestions.length > 0 && (
            <div className="bg-emerald-50/95 border-t border-emerald-200 p-2 text-xs backdrop-blur">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 mb-1.5 flex items-center justify-between px-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Erkannte Themen &amp; Produkte:
                </span>
                <span className="text-[9px] text-emerald-700 font-normal">Klicken zum Öffnen</span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {liveSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      handleSend(item.query);
                    }}
                    className="w-full text-left bg-white hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-400 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-2 text-[11px] font-medium text-slate-800 transition shadow-2xs group"
                  >
                    <span className="truncate group-hover:text-emerald-900 font-semibold">{item.text}</span>
                    <span className="shrink-0 bg-slate-100 group-hover:bg-emerald-200 text-slate-600 group-hover:text-emerald-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHAT INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-200 flex items-center gap-1.5"
          >
            <input
              type="text"
              placeholder="Frage stellen (z.B. 'Darf man mit Linsen schlafen?')..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2 rounded-xl transition shadow-sm"
              title="Nachricht senden"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
