import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage = '/assets/hero-bg.jpg',
  ctaText,
  ctaLink,
}) => {
  return (
    <div 
      className="hero-section text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-center max-w-3xl mb-8">{subtitle}</p>
        )}
        {ctaText && ctaLink && (
          <Link to={ctaLink} className="btn btn-primary text-lg px-8 py-3">
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
