import { useEffect } from 'react';

/**
 * Dynamische Verwaltung von Title, Meta-Description, Canonical Link und OpenGraph Tags.
 * Verhindert Canonical- & Title-Bleed auf Unterseiten in React Router SPAs.
 */
export default function MetaTags({
  title = 'optical.de – Deine Kontaktlinsen. Einfach wiederfinden.',
  description = 'Finde deine gewohnten Kontaktlinsen, prüfe verfügbare Angebote und merke sie dir für deinen nächsten Kauf. Unabhängig & verifiziert.',
  canonical = 'https://www.optical.de/',
  ogType = 'website',
  robots = 'index, follow'
}) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = robots;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonical;

    // OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonical;

    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) ogTypeMeta.content = ogType;

    // Twitter Cards
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = title;

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.content = description;
  }, [title, description, canonical, ogType, robots]);

  return null;
}
