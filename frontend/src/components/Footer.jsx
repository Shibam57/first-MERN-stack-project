import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo/Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MyReactApp</h2>
          <p className="text-sm text-gray-400">Explore tools and features with a simple UI.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Pages</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/password" className="hover:underline">Password</Link></li>
            <li><Link to="/color" className="hover:underline">Color</Link></li>
            <li><Link to="/currency" className="hover:underline">Currency</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} MyReactApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;