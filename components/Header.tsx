import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from './Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-deep-navy/90 backdrop-blur-sm text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <Logo className="h-12" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `font-semibold hover:text-bitcoin-orange transition-colors duration-300 ${isActive ? 'text-bitcoin-orange' : 'text-white'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button to="/partnership" variant="secondary">Become a Sponsor</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-deep-navy transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="flex flex-col items-center py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-semibold hover:text-bitcoin-orange transition-colors duration-300 ${isActive ? 'text-bitcoin-orange' : 'text-white'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button to="/partnership" variant="secondary" onClick={() => setIsOpen(false)}>Become a Sponsor</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
