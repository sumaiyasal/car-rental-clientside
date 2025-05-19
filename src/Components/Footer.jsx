import React from 'react';
import { Link } from 'react-router-dom';
import car from '../assets/car.jpg';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
           
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              DriveSwiift
            </span>
          </div>
          <p className="text-gray-400">Your reliable partner for quick and easy car rentals.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/availablecars" className="hover:text-orange-400">Available Cars</Link></li>
            <li><Link to="/addcar" className="hover:text-orange-400">Add Car</Link></li>
            <li><Link to="/mycars" className="hover:text-orange-400">My Cars</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Email: @driveswiift.com</li>
            <li>Phone: 01356172945</li>
            <li>Location: 2126 Nasirabad, Chattogram</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-5 items-center">
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.162 2H17.7l-4.7 6.246L8.3 2H2.05l6.514 9.122L2 22h4.47l5.07-6.732L16.526 22H22L15.15 12.42 22.162 2z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-orange-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.6 3.2c-3.6-.3-11.6-.3-15.2 0-3.9.3-4.4 2.7-4.4 8.8s.5 8.5 4.4 8.8c3.6.3 11.6.3 15.2 0 3.9-.3 4.4-2.7 4.4-8.8s-.5-8.5-4.4-8.8zM10 15.5v-7l6 3.5-6 3.5z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.1-1.3H20V0h-3.8C12.6 0 11 1.6 11 4.6V8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 border-t border-gray-800 pt-4 text-sm">
        &copy; {new Date().getFullYear()} DriveSwiift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
