import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Paraclimbing.info | Inclusive Climbing For All Abilities',
  description = 'Premier resource for adaptive climbing. Discover paraclimbing competitions, training, events, and support for climbers with disabilities. Join our inclusive climbing community.',
  keywords = 'paraclimbing, adaptive climbing, climbing disabilities, inclusive climbing, climbing competitions, adaptive sports, disability climbing, climbing community, accessible climbing',
  canonical = 'https://paraclimbing.info/',
  image = 'https://paraclimbing.info/assets/og-image.jpg',
  type = 'website',
  children
}) => {
  const siteTitle = 'Paraclimbing.info';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional children elements */}
      {children}
    </Helmet>
  );
};

export default SEO;
