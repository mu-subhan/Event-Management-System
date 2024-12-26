import React from 'react';

import logoImage from '../../Assessts/logo.png';

    import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
   <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Tagline Section */}
          <div className="flex flex-col items-center sm:items-start">
            <img src={logoImage} alt="EventMatch Logo" className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold">Streamline Event Management & Volunteer Matching Effortlessly.</p>
          </div>

          {/* Navigation Links Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/features" className="hover:underline">Features</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul>
              <li>Email: <a href="mailto:support@youreventapp.com" className="hover:underline">support@youreventapp.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:underline">+123 456 7890</a></li>
              <li>Address: 123 Event Street, City, Country</li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-600">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-700">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright and Policies Section */}
        <div className="mt-12 text-center text-sm">
          <p>© 2024 EventMatch. All Rights Reserved.</p>
          <p>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
            <a href="/terms-conditions" className="hover:underline"> Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
