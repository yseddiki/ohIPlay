import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">🌿 OH ! PLAY</h3>
              <p className="text-gray-300 mb-4">
                Unleash your inner warrior with epic adventure bootcamps that challenge your body, 
                mind, and spirit. Join our community of adventurers and discover what you're truly capable of.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-green-400" />
                <span>Rue Saint Quentin 36 – AKVMOVE, Belgium</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-green-400" />
                <span>+32 XXX XX XX XX</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-green-400" />
                <span>info@OH-I-PLAY.be</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-green-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/bootcamps" className="text-gray-300 hover:text-green-400 transition-colors">
                  Bootcamps
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Bootcamp Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Bootcamp Types</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/bootcamps?category=military" className="text-gray-300 hover:text-green-400 transition-colors">
                  Military Style
                </Link>
              </li>
              <li>
                <Link to="/bootcamps?category=koh-lanta" className="text-gray-300 hover:text-green-400 transition-colors">
                  Koh Lanta
                </Link>
              </li>
              <li>
                <Link to="/bootcamps?category=adventure" className="text-gray-300 hover:text-green-400 transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link to="/bootcamps?category=team-building" className="text-gray-300 hover:text-green-400 transition-colors">
                  Team Building
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Follow Our Adventures</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg hover:shadow-lg transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-2">Ready for Adventure?</h4>
              <Link
                to="/bootcamps"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} OH ! PLAY. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
