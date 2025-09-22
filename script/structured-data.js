// structured-data.js
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MISH EVENTS",
  "image": "images/flowertable.webp",
  "@id": "https://mish-events.netlify.app/",
  "url": "https://mish-events.netlify.app/",
  "telephone": "+27833147008",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Celebration Street",
    "addressLocality": "Johannesburg",
    "addressRegion": "Gauteng",
    "postalCode": "2000",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -26.2041,
    "longitude": 28.0473
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "R500 - R5000"
};

// Inject into the head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

//google antyst
window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-S0FD4S2MN6');