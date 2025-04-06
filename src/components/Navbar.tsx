import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  
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
              Home
            </Link>
            <Link to="/paraclimbing" className="text-dark hover:text-primary transition-colors">
              What is Paraclimbing?
            </Link>
            <Link to="/activities" className="text-dark hover:text-primary transition-colors">
              Activities
            </Link>
            <Link to="/support-us" className="text-dark hover:text-primary transition-colors">
              Support Us
            </Link>
            <Link to="/contact" className="text-dark hover:text-primary transition-colors">
              Contact
            </Link>
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
                Home
              </Link>
              <Link to="/paraclimbing" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                What is Paraclimbing?
              </Link>
              <Link to="/activities" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Activities
              </Link>
              <Link to="/support-us" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Support Us
              </Link>
              <Link to="/contact" className="text-dark hover:text-primary transition-colors px-4 py-2" onClick={handleMenuItemClick}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
