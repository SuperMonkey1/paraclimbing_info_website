import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close submenu when main menu is toggled
    if (!isMenuOpen) {
      setIsSubMenuOpen(false);
    }
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  // Close the submenu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
        setIsSubMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Function to handle menu item clicks
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/assets/logo.png" alt="Paraclimbing.be Logo" className="h-10 w-auto mr-3" />
              <span className="font-bold text-xl text-primary">Paraclimbing.be</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative" ref={subMenuRef}>
              <button 
                onClick={toggleSubMenu}
                className="flex items-center text-dark hover:text-primary transition-colors focus:outline-none"
              >
                <span>Paraclimbing</span>
                <svg className={`ml-1 h-4 w-4 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isSubMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/paraclimbing" 
                    className="block px-4 py-2 text-dark hover:bg-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsSubMenuOpen(false)}
                  >
                    What is Paraclimbing?
                  </Link>
                  <Link 
                    to="/belgian-team" 
                    className="block px-4 py-2 text-dark hover:bg-gray-100 hover:text-primary transition-colors"
                    onClick={() => setIsSubMenuOpen(false)}
                  >
                    Belgian Team
                  </Link>
                </div>
              )}
            </div>
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
              <a href="/" className="text-dark hover:text-primary transition-colors px-4 py-2">
                Home
              </a>
              
              {/* Paraclimbing Section */}
              <div className="px-4 py-2">
                <div 
                  className="flex items-center justify-between text-dark cursor-pointer w-full"
                  onClick={toggleSubMenu}
                >
                  <span>Paraclimbing</span>
                  <svg className={`ml-1 h-4 w-4 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Mobile Submenu with direct links */}
                {isSubMenuOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <div className="py-2">
                      <a href="/paraclimbing" className="block text-dark hover:text-primary transition-colors">
                        What is Paraclimbing?
                      </a>
                    </div>
                    <div className="py-2">
                      <a href="/belgian-team" className="block text-dark hover:text-primary transition-colors">
                        Belgian Team
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="/activities" className="text-dark hover:text-primary transition-colors px-4 py-2">
                Activities
              </a>
              <a href="/support-us" className="text-dark hover:text-primary transition-colors px-4 py-2">
                Support Us
              </a>
              <a href="/contact" className="text-dark hover:text-primary transition-colors px-4 py-2">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
