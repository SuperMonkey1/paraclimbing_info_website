import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Close mobile menu on language change
  };

  const currentLanguage = i18n.language;


  
  // Function to handle menu item clicks
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={handleMenuItemClick}>
              <img src="/assets/logo.png" alt="Paraclimbing.be Logo" className="h-10 w-auto mr-3" />
              <span className="font-bold text-xl text-primary">Paraclimbing.be</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition-colors">
              {t('navbar.home')}
            </Link>
            <Link to="/paraclimbing" className="text-dark hover:text-primary transition-colors">
              {t('navbar.paraclimbing')}
            </Link>
            <Link to="/activities" className="text-dark hover:text-primary transition-colors">
              {t('navbar.activities')}
            </Link>
            <Link to="/support-us" className="text-dark hover:text-primary transition-colors">
              {t('navbar.support')}
            </Link>
            <Link to="/contact" className="text-dark hover:text-primary transition-colors">
              {t('navbar.contact')}
            </Link>
            
            {/* Language Selector - Desktop */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-dark text-sm rounded-lg focus:ring-primary focus:border-primary p-2"
                aria-label="Select language"
              >
                <option value="en">{t('languages.en')}</option>
                <option value="nl">{t('languages.nl')}</option>
                <option value="fr">{t('languages.fr')}</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-dark focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                {t('navbar.home')}
              </Link>
              <Link to="/paraclimbing" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                {t('navbar.paraclimbing')}
              </Link>
              <Link to="/activities" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                {t('navbar.activities')}
              </Link>
              <Link to="/support-us" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                {t('navbar.support')}
              </Link>
              <Link to="/contact" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                {t('navbar.contact')}
              </Link>
              
              {/* Language Selector - Mobile */}
              <div className="px-4 py-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 text-dark text-sm rounded-lg focus:ring-primary focus:border-primary p-2"
                  aria-label="Select language"
                >
                  <option value="en">{t('languages.en')}</option>
                  <option value="nl">{t('languages.nl')}</option>
                  <option value="fr">{t('languages.fr')}</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
