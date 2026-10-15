/**
 * optical.de - Produktspezifische Fachprofile & redaktionelle Spezifikationen
 *
 * Datenstand: Oktober 2026
 * Qualitätsstandard:
 * - Rein faktenbasierte Hersteller-Deklarationen (CooperVision Inc., Alcon Vision Care)
 * - Keine erfundenen Produkteigenschaften, keine medizinischen Eignungsversprechen
 * - Keine Empfehlungen zum Übernachttragen
 * - Vollständige Neutralität gemäß Transparenzstandard von optical.de
 */

export const PRODUCT_PROFILES = {
  'biofinity': {
    productId: 'biofinity',
    sectionTitle: 'Produktdetails & Materialeigenschaften',
    summary: 'CooperVision Biofinity ist eine sphärische Monats-Kontaktlinse aus dem Silikon-Hydrogel-Material Comfilcon A. Durch die Aquaform® Technology bindet das Material Feuchtigkeit im gesamten Linsenkörper, ohne dass eine Oberflächenbeschichtung oder benetzende Zusätze in der Blisterlösung erforderlich sind.',
    characteristics: [
      {
        title: 'Material & Sauerstofffluss',
        description: 'Mit einer Sauerstofftransmissibilität von 160 Dk/t (bei -3.00 dpt) und 48 % Wassergehalt kombiniert Comfilcon A einen hohen Sauerstoffdurchgang mit einem flexiblen Tragekomfort.'
      },
      {
        title: 'Aquaform® Technology',
        description: 'Lange Silikonketten leiten Sauerstoff effizient durch die Linse. Wasserstoffbrücken binden Wassermoleküle direkt an das Linsenpolymer, was die natürliche Benetzung über den Tragezeitraum unterstützt.'
      },
      {
        title: 'Tragerhythmus & Pflege',
        description: 'Vorgesehen für das tägliche Tragen bei einem monatlichen Austauschzyklus (30 Tage). Nach jedem Tragetag ist eine sachgemäße Reinigung und Desinfektion erforderlich.'
      }
    ],
    faqs: [
      {
        question: 'Welche Packungsgrößen sind für Biofinity marktüblich?',
        answer: 'Biofinity ist im Fach- und Versandhandel üblicherweise als 3er- oder 6er-Packung erhältlich. Bei beidseitig gleicher Stärke deckt eine 6er-Box einen Zeitraum von drei Monaten ab.'
      },
      {
        question: 'Welche Varianten umfasst die Biofinity-Produktfamilie?',
        answer: 'Neben der sphärischen Monatslinse führt der Hersteller die Varianten Biofinity Toric (bei Hornhautverkrümmung), Biofinity Multifocal (bei Presbyopie) sowie Biofinity XR für erweiterte Dioptrienbereiche.'
      },
      {
        question: 'Welches Pflegemittel eignet sich für Comfilcon-A-Linsen?',
        answer: 'Silikon-Hydrogel-Linsen aus Comfilcon A können mit All-in-One-Kombilösungen für moderne Weichlinsen oder mit konservierungsmittelfreien Peroxidsystemen gereinigt werden. Die Wahl des Systems sollte mit dem Anpasser abgestimmt werden.'
      }
    ],
    relatedLinks: [
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Vergleichstabelle aller verifizierten Monatslinsen mit Kostenkalkulation.'
      },
      {
        label: 'Biofinity vs. Air Optix HydraGlyde',
        href: '/biofinity-vs-air-optix',
        description: 'Direkter 1:1-Parametervergleich zweier marktgängiger Silikon-Hydrogel-Monatslinsen.'
      },
      {
        label: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Ablauf der optometrischen Anpassung und Bedeutung von BC- und DIA-Werten.'
      }
    ]
  },

  'biofinity-toric': {
    productId: 'biofinity-toric',
    sectionTitle: 'Produktdetails & Geometriemerkmale',
    summary: 'CooperVision Biofinity Toric ist eine torische Silikon-Hydrogel-Monatslinse zur optischen Korrektur von Hornhautverkrümmungen (Astigmatismus). Sie basiert auf dem Comfilcon-A-Polymer und nutzt eine optimierte Linsengeometrie für eine stabile Ausrichtung auf der Hornhaut.',
    characteristics: [
      {
        title: 'Optimised Toric Lens Geometry™',
        description: 'Einheitliche Randdicken im horizontalen Verlauf minimieren unerwünschte Linsenrotationen bei Blinzelschlägen und unterstützen einen zügigen Orientierungsaufbau auf dem Auge.'
      },
      {
        title: 'Große optische Zone',
        description: 'Das torische Design stellt über den gesamten Stärkenbereich (Sphäre, Zylinder und Achse) eine breite optische Zone für eine scharfe Abbildung bereit.'
      },
      {
        title: 'Material Comfilcon A',
        description: 'Mit 160 Dk/t Sauerstoffdurchlässigkeit und 48 % Wassergehalt bietet die torische Variante dieselben Materialeigenschaften wie die sphärische Standardlinse.'
      }
    ],
    faqs: [
      {
        question: 'Wie unterscheidet sich die torische von der sphärischen Biofinity?',
        answer: 'Die sphärische Biofinity korrigiert reine Kurz- oder Weitsichtigkeit. Die Biofinity Toric enthält zusätzlich Werte für den Zylinder (CYL von -0.75 bis -2.25 dpt) und die Achslage (AXIS von 10° bis 180°), um eine ungleiche Hornhautwölbung auszugleichen.'
      },
      {
        question: 'Wie stabilisiert sich die Linse bei Blickbewegungen?',
        answer: 'Die Optimised Toric Lens Geometry™ sorgt dafür, dass die Linse durch den Druck des Ober- und Unterlids beim Blinzeln in der exakt berechneten Achsposition gehalten wird.'
      },
      {
        question: 'In welchen Packungsgrößen wird Biofinity Toric angeboten?',
        answer: 'Biofinity Toric wird überwiegend in Packungsgrößen zu 3 oder 6 Linsen pro Box vertrieben.'
      }
    ],
    relatedLinks: [
      {
        label: 'Torische Kontaktlinsen Übersicht',
        href: '/torische-kontaktlinsen',
        description: 'Übersicht torischer Kontaktlinsen, Zylinder- und Achsenbereiche.'
      },
      {
        label: 'Ratgeber: Astigmatismus & Kontaktlinsen',
        href: '/ratgeber/astigmatismus-kontaktlinsen',
        description: 'Erklärung zu Zylinder, Achse und Stabilisationsmechanismen.'
      },
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Monatslinsen verschiedener Hersteller und Materialien im tabellarischen Überblick.'
      }
    ]
  },

  'biofinity-multifocal': {
    productId: 'biofinity-multifocal',
    sectionTitle: 'Produktdetails & Mehrzonen-Technologie',
    summary: 'CooperVision Biofinity Multifocal ist eine Gleitsicht-Monatslinse aus Comfilcon A zur Korrektur von Alterssichtigkeit (Presbyopie). Sie ermöglicht stufenloses Sehen in Ferne, Zwischenbereich und Nähe durch ein progressives Mehrzonensystem.',
    characteristics: [
      {
        title: 'Balanced Progressive® Technology',
        description: 'Zwei unterschiedliche optische Designs (D-Linse für das dominante Auge mit Fernzone im Zentrum, N-Linse für das nicht-dominante Auge mit Nahzone im Zentrum) arbeiten zusammen, um eine simultane Schärfe in allen Entfernungen zu ermöglichen.'
      },
      {
        title: 'Vier abgestufte Additionsstufen',
        description: 'Erhältlich in den Additionsstufen +1.00, +1.50, +2.00 und +2.50 dpt, jeweils als D- und N-Ausführung für eine präzise Abstimmung auf das Sehprofil.'
      },
      {
        title: 'Comfilcon A mit Aquaform®',
        description: '160 Dk/t Sauerstofftransmissibilität und 48 % Wassergehalt sichern eine hohe Sauerstoffversorgung des Auges über den monatlichen Tragezyklus.'
      }
    ],
    faqs: [
      {
        question: 'Was bedeuten das D- und N-Linsendesign bei Biofinity Multifocal?',
        answer: 'Das D-Design („Dominant“) priorisiert im optischen Mittelpunkt den Fernbereich, während das N-Design („Non-Dominant“) den Nahbereich ins Zentrum stellt. Der Anpasser ermittelt die Linsenkombination anhand der individuellen Augendominanz.'
      },
      {
        question: 'Welche Eingewöhnungszeit ist bei multifokalen Linsen üblich?',
        answer: 'Da das Gehirn lernen muss, simultan dargebotene Sehzonen (Nah, Zwischenbereich, Fern) situativ auszuwählen, kann die Gewöhnung je nach Träger einige Tage bis zwei Wochen in Anspruch nehmen.'
      },
      {
        question: 'Welche Packungsgrößen sind verfügbar?',
        answer: 'Biofinity Multifocal wird regulär im 6er-Pack angeboten.'
      }
    ],
    relatedLinks: [
      {
        label: 'Multifokale Kontaktlinsen Übersicht',
        href: '/multifokale-kontaktlinsen',
        description: 'Vergleich multifokaler Linsen bei einsetzender Alterssichtigkeit.'
      },
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Monatslinsen-Sortiment nach Dk/t, Material und Kostenkalkulation.'
      },
      {
        label: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Notwendigkeit optometrischer Vermessung und Nachkontrolle.'
      }
    ]
  },

  'airoptix-hydraglyde': {
    productId: 'airoptix-hydraglyde',
    sectionTitle: 'Produktdetails & Oberflächentechnologien',
    summary: 'Air Optix Plus HydraGlyde von Alcon ist eine Silikon-Hydrogel-Monatslinse aus dem Material Lotrafilcon B. Sie kombiniert eine schützende Oberflächenbehandlung gegen Lipidablagerungen mit einer feuchtigkeitsbindenden Polymermatrix.',
    characteristics: [
      {
        title: 'SmartShield® Technology',
        description: 'Eine ultradünne Schutzschicht minimiert die Exposition von Silikon auf der Oberfläche und schützt die Linse vor fettigen Lipid- und Kosmetikablagerungen.'
      },
      {
        title: 'HydraGlyde® Moisture Matrix',
        description: 'Ein spezielles Benetzungsmolekül lagert sich an die Linsenoberfläche an, um Wasser zu binden und den Feuchtigkeitsfilm vom Einsetzen bis zum Ende des Tragetags stabil zu halten.'
      },
      {
        title: 'Lotrafilcon B mit 138 Dk/t',
        description: 'Mit einer Sauerstoffdurchlässigkeit von 138 Dk/t und einem Wassergehalt von 33 % erfüllt das Material hohe Anforderungen an den Sauerstofffluss bei langen täglichen Tragezeiten.'
      }
    ],
    faqs: [
      {
        question: 'Worin liegt der Unterschied zwischen der klassischen Air Optix Aqua und HydraGlyde?',
        answer: 'Air Optix Plus HydraGlyde ist die Weiterentwicklung der früheren Air Optix Aqua. Sie ergänzt die bewährte SmartShield®-Schicht um die HydraGlyde® Moisture Matrix zur verbesserten Benetzung der Linsenoberfläche.'
      },
      {
        question: 'Welche Packungsgrößen sind im Handel erhältlich?',
        answer: 'Air Optix Plus HydraGlyde ist üblicherweise in Packungen zu 3 oder 6 Kontaktlinsen erhältlich.'
      },
      {
        question: 'Welches Austauschintervall ist vorgegeben?',
        answer: 'Die Linse ist für einen Austauschzyklus von 30 Tagen bei täglichem Tragen und täglicher Desinfektion konzipiert.'
      }
    ],
    relatedLinks: [
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Monatslinsen im tabellarischen Dk/t- und Preisvergleich.'
      },
      {
        label: 'Biofinity vs. Air Optix HydraGlyde',
        href: '/biofinity-vs-air-optix',
        description: 'Direkter Parameter- und Materialvergleich beider Silikon-Hydrogel-Linsen.'
      },
      {
        label: 'Ratgeber: Pflegemittel-Vergleich',
        href: '/ratgeber/kontaktlinsen-pflegemittel-vergleich',
        description: 'All-in-One- vs. Peroxidlösungen für Silikon-Hydrogel-Materialien.'
      }
    ]
  },

  'airoptix-toric': {
    productId: 'airoptix-toric',
    sectionTitle: 'Produktdetails & Stabilisationsgeometrie',
    summary: 'Air Optix Plus HydraGlyde for Astigmatism von Alcon korrigiert Hornhautverkrümmungen bei Trägern torischer Kontaktlinsen. Sie verbindet das Lotrafilcon-B-Material mit dem Precision Balance 8|4® Stabilisationsdesign.',
    characteristics: [
      {
        title: 'Precision Balance 8|4® Design',
        description: 'Zwei Verdickungs- und Stabilisierungszonen bei 4 Uhr und 8 Uhr sorgen für eine schnelle Linsenausrichtung und verhindern ein Verrutschen beim Blinzeln. Die 6-Uhr-Position bleibt dünn, um die mechanische Wechselwirkung mit dem Unterlid zu reduzieren.'
      },
      {
        title: 'SmartShield® & HydraGlyde®',
        description: 'Wie bei der sphärischen Variante sorgen die Schutzschicht gegen Lipide und die feuchtigkeitsbindende Matrix für langanhaltende Benetzung und Beständigkeit gegen Ablagerungen.'
      },
      {
        title: 'Parameterbereich',
        description: 'Mit 108 Dk/t Sauerstoffdurchlässigkeit, Zylinderwerten von -0.75 bis -2.25 dpt und Achsen von 10° bis 180° in 10°-Schritten wird ein breiter Astigmatismus-Bereich abgedeckt.'
      }
    ],
    faqs: [
      {
        question: 'Wie funktioniert das Precision Balance 8|4® Stabilisationsdesign?',
        answer: 'Anstatt die Linse an der Unterkante zu beschweren (Prismenballast), setzt Alcon zwei Stabilisierungspunkte auf 4 und 8 Uhr. Der Lidschlag drückt die Linse bei jeder Augenbewegung in die vorgesehene Achse zurück.'
      },
      {
        question: 'In welchen Packungsgrößen wird die torische Air Optix angeboten?',
        answer: 'Air Optix Plus HydraGlyde for Astigmatism ist standardmäßig in der 6er-Packung im Fach- und Versandhandel verfügbar.'
      },
      {
        question: 'Können torische Linsen ohne Anpassung gewechselt werden?',
        answer: 'Nein. Da die Stabilisierung und Achslage auf der individuellen Hornhautform aufliegt, muss jede torische Kontaktlinse vor dem Tragen von einem Optiker oder Augenarzt überprüft werden.'
      }
    ],
    relatedLinks: [
      {
        label: 'Torische Kontaktlinsen Übersicht',
        href: '/torische-kontaktlinsen',
        description: 'Vergleich torischer Linsen, Zylinder- und Achsenbereiche.'
      },
      {
        label: 'Ratgeber: Astigmatismus & Kontaktlinsen',
        href: '/ratgeber/astigmatismus-kontaktlinsen',
        description: 'Erklärung zu Zylinder, Achse und Stabilisationsmechanismen.'
      },
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Monatslinsen verschiedener Hersteller und Materialien im tabellarischen Überblick.'
      }
    ]
  },

  'proclear-sphere': {
    productId: 'proclear-sphere',
    sectionTitle: 'Produktdetails & Biokompatibles Hydrogel',
    summary: 'CooperVision Proclear Sphere ist eine Hydrogel-Monatslinse aus dem biokompatiblen Material Omafilcon B. Sie nutzt die patentierte PC Technology™, bei der synthetische Phosphorylcholin-Moleküle Wasser anziehen und binden.',
    characteristics: [
      {
        title: 'PC Technology™ (Phosphorylcholin)',
        description: 'Das Material enthält Moleküle, die körpereigenen Zellmembranen ähneln. Sie ziehen Wassermoleküle an und binden sie fest an der Linsenoberfläche, wodurch eine wasserbindende Schutzbarriere entsteht.'
      },
      {
        title: 'Klassisches Hydrogel mit 62 % Wassergehalt',
        description: 'Mit einem hohen Wasseranteil von 62 % und einer Sauerstofftransmissibilität von 42 Dk/t ist Omafilcon B eine bewährte Hydrogel-Option für Kontaktlinsenträger, die kein Silikon-Hydrogel tragen.'
      },
      {
        title: 'Breitester Dioptrienbereich',
        description: 'Proclear Sphere deckt ein außergewöhnlich großes Stärkenspektrum von +20.00 bis -20.00 Dioptrien ab und eignet sich daher auch für ausgeprägte Fehlsichtigkeiten.'
      }
    ],
    faqs: [
      {
        question: 'Was unterscheidet Omafilcon B von Silikon-Hydrogel-Materialien?',
        answer: 'Omafilcon B ist ein reines Hydrogel ohne Silikonanteil. Es transportiert Sauerstoff primär über den enthaltenen Wassergehalt (62 %), weshalb der Dk/t-Wert mit 42 niedriger liegt als bei Silikon-Hydrogelen. Es wird oft von Trägern gewählt, die Silikon-Materialien nicht vertragen.'
      },
      {
        question: 'Welche Packungsgrößen sind im Handel erhältlich?',
        answer: 'Proclear Sphere wird regulär in Packungen mit 6 Kontaktlinsen vertrieben.'
      },
      {
        question: 'Welches Pflegemittel wird für Proclear empfohlen?',
        answer: 'Für Omafilcon-B-Hydrogele eignen sich sanfte All-in-One-Lösungen für weiche Kontaktlinsen oder Einstufen-Peroxidsysteme.'
      }
    ],
    relatedLinks: [
      {
        label: 'Monatslinsen-Vergleich',
        href: '/monatslinsen-vergleich',
        description: 'Vergleichstabelle aller verifizierten Monatslinsen mit Kostenkalkulation.'
      },
      {
        label: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Ablauf der optometrischen Anpassung und Parameter-Bedeutung.'
      },
      {
        label: 'Ratgeber: Pflegemittel-Vergleich',
        href: '/ratgeber/kontaktlinsen-pflegemittel-vergleich',
        description: 'Pflegesysteme für klassische Hydrogele und Silikon-Hydrogele.'
      }
    ]
  },

  'myday-daily': {
    productId: 'myday-daily',
    sectionTitle: 'Produktdetails & Smart Silicone™ Material',
    summary: 'CooperVision MyDay Daily Disposable ist eine Silikon-Hydrogel-Tageslinse aus dem Werkstoff Stenfilcon A. Durch die Smart Silicone™ Technologie kombiniert sie eine hohe Sauerstofftransmissibilität mit einem weichen Materialgefüge.',
    characteristics: [
      {
        title: 'Smart Silicone™ Technologie',
        description: 'Silikonmoleküle werden in chemischen Kanälen strukturiert, sodass nur ein Silikonanteil von 4,4 % ausreicht, um 100 Dk/t Sauerstoffdurchlässigkeit zu erreichen.'
      },
      {
        title: 'Niedriger Modulus & hoher Wassergehalt',
        description: 'Durch den reduzierten Silikonanteil weist Stenfilcon A einen niedrigen Elastizitätsmodul von 0,4 MPa und einen Wassergehalt von 54 % auf. Die Linse fühlt sich dadurch spürbar weich und anpassungsfähig an.'
      },
      {
        title: 'Tägliche Einwegnutzung',
        description: 'Als Tageslinse wird MyDay morgens frisch eingesetzt und abends entsorgt. Es entsteht kein Aufwand für Reinigungslösungen, Behälter oder Desinfektion.'
      }
    ],
    faqs: [
      {
        question: 'Was ist der Vorteil von Smart Silicone™ gegenüber herkömmlichen Silikon-Hydrogelen?',
        answer: 'Frühe Silikon-Hydrogele waren aufgrund des hohen Silikongehalts oft steifer (höherer Modulus). Smart Silicone™ leitet Sauerstoff über optimierte Kanäle und benötigt weniger Silikon, wodurch die Linse weich bleibt und einen höheren Wassergehalt bietet.'
      },
      {
        question: 'Welche Packungsgrößen sind für MyDay Daily Disposable erhältlich?',
        answer: 'MyDay Daily Disposable ist typischerweise in Packungsgrößen zu 30 Stück oder als Vorratspackung zu 90 Stück im Handel.'
      },
      {
        question: 'Für wen eignen sich Tageslinsen besonders?',
        answer: 'Tageslinsen eignen sich für Gelegenheitsträger, Sportler, auf Reisen oder für Träger, die auf tägliche Hygiene ohne Pflegemittelaufwand Wert legen.'
      }
    ],
    relatedLinks: [
      {
        label: 'Tageslinsen-Vergleich',
        href: '/tageslinsen-vergleich',
        description: 'Tageslinsen im tabellarischen Dk/t-, Wassergehalts- und Preisvergleich.'
      },
      {
        label: 'Ratgeber: Tages- vs. Monatslinsen Kosten',
        href: '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
        description: 'Kostenvergleich beider Tragekonzepte inklusive Pflegemittel.'
      },
      {
        label: 'Ratgeber: Kontaktlinsen anpassen',
        href: '/ratgeber/kontaktlinsen-anpassen',
        description: 'Ablauf der optometrischen Anpassung und Parameter-Bedeutung.'
      }
    ]
  }
};

/**
 * Ruft das verifizierte Fachprofil für ein bestimmtes Produkt ab.
 * @param {string} productId
 * @returns {object|null}
 */
export function getProductProfile(productId) {
  if (!productId) return null;
  return PRODUCT_PROFILES[productId] || null;
}
