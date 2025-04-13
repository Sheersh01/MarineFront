import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#121A27] text-white">
      <div className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Agency Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Agency Name</h3>
            <p className="text-gray-300 mb-4">Your trusted partner for digital solutions and creative services.</p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@agencyname.com" className="text-gray-300 hover:text-white transition">
                  info@agencyname.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-gray-300">
                  123 Business Street<br />
                  City, State 12345
                </span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 py-6 bg-[#0c121f] text-center">
          <p className="text-cyan-400">
          © 2014–2025. Stark Shipping | Site developed by SOLAR Digital
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;