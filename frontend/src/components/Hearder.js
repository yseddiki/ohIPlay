import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Rue Saint Quentin 36 – AKVMOVE</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+32 XXX XX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>info@OH-I-PLAY.be</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors">
            🌿 OH ! PLAY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`font-medium transition-colors ${
                isActive('/services') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/bootcamps" 
              className={`font-medium transition-colors ${
                isActive('/bootcamps') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Bootcamps
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Social Media Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              Facebook
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Services
              </Link>
              <Link 
                to="/bootcamps" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Bootcamps
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Contact
              </Link>
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-600 hover:text-green-700"
                >
                  Instagram
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  Facebook
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;