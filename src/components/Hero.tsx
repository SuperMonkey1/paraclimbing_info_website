import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  backgroundImage = '/assets/group_slc.jpg',
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
          ctaLink.startsWith('#') ? (
            <button 
              onClick={() => {
                const element = document.querySelector(ctaLink);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="btn btn-primary text-lg px-8 py-3"
            >
              {ctaText}
            </button>
          ) : (
            <Link to={ctaLink} className="btn btn-primary text-lg px-8 py-3">
              {ctaText}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
