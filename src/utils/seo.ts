// SEO utility functions for generating structured data and meta tags

export const generateEventStructuredData = (event: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: event.country || 'BE'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Paraclimbing.info',
      url: 'https://paraclimbing.info'
    },
    image: event.image || 'https://paraclimbing.info/assets/default-event.jpg',
    url: `https://paraclimbing.info/activities#${event.id}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
  };
};

export const generatePersonStructuredData = (person: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.bio,
    image: person.image,
    url: `https://paraclimbing.info/belgian-team#${person.id}`,
    nationality: person.nationality || 'BE',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Paraclimber'
    },
    memberOf: {
      '@type': 'SportsTeam',
      name: 'Belgian Paraclimbing Team',
      url: 'https://paraclimbing.info/belgian-team'
    }
  };
};

export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Paraclimbing.info',
    url: 'https://paraclimbing.info',
    logo: 'https://paraclimbing.info/assets/logo.png',
    description: "Premier resource for adaptive climbing and paraclimbing competitions",
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Paraclimbing Belgium Team'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE'
    },
    sameAs: [
      'https://www.facebook.com/paraclimbing.info',
      'https://www.instagram.com/paraclimbing.info'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32-XXX-XXX-XXX',
      contactType: 'Customer Service',
      email: 'info@paraclimbing.info'
    }
  };
};

export const getPageTitle = (pageTitle: string, includePrefix: boolean = true) => {
  const siteTitle = 'Paraclimbing.info';
  
  if (!includePrefix) return pageTitle;
  
  return pageTitle.includes(siteTitle) ? pageTitle : `${pageTitle} | ${siteTitle}`;
};

export const truncateDescription = (description: string, maxLength: number = 160) => {
  if (description.length <= maxLength) return description;
  
  return description.substring(0, maxLength - 3).trim() + '...';
};

export const generateKeywords = (baseKeywords: string[], additionalKeywords: string[] = []) => {
  const defaultKeywords = [
    'paraclimbing',
    'adaptive climbing',
    'climbing disabilities',
    'inclusive climbing',
    'climbing competitions',
    'adaptive sports'
  ];
  
  const allKeywords = [...defaultKeywords, ...baseKeywords, ...additionalKeywords];
  const uniqueKeywords = Array.from(new Set(allKeywords));
  return uniqueKeywords.join(', ');
};
