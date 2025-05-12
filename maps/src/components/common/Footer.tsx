import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Unify Giving</h3>
            <p className="text-gray-400 text-sm">
              Connecting donors with trusted charitable organizations making a positive impact around the world.
            </p>
          </div>
          
          {/* Column 2: Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
              <li><Link href="/charities" className="text-gray-400 hover:text-white text-sm">Charities</Link></li>
              <li><Link href="/map" className="text-gray-400 hover:text-white text-sm">Map</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm">How It Works</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/categories/education" className="text-gray-400 hover:text-white text-sm">Education</Link></li>
              <li><Link href="/categories/healthcare" className="text-gray-400 hover:text-white text-sm">Healthcare</Link></li>
              <li><Link href="/categories/environment" className="text-gray-400 hover:text-white text-sm">Environment</Link></li>
              <li><Link href="/categories/animal-welfare" className="text-gray-400 hover:text-white text-sm">Animal Welfare</Link></li>
              <li><Link href="/categories/humanitarian-aid" className="text-gray-400 hover:text-white text-sm">Humanitarian Aid</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white text-sm">Support</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright and links */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Unify Giving. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-4 md:mb-0 md:mr-8">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                <FaGithub size={20} />
              </a>
            </div>
            {/* Links */}
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300">Terms</Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-300">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;