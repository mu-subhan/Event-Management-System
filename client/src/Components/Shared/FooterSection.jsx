import React from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterSection = () => {

  // Function to get icon color based on scroll state
  const getIconColors = () => {
    return {
      primary: scrolled ? "text-purple-600" : "text-purple-400",
      secondary: scrolled ? "text-indigo-500" : "text-purple-300",
      highlight: scrolled ? "text-purple-700" : "text-white"
    };
  };
  
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Main Content - Stack on mobile, three columns on large screens */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-8 lg:space-y-0">
          {/* Logo and Title Column */}
          <div className="lg:w-1/4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <Link to="/" className="inline-block group">
                <FaRegHandshake 
                  className="h-9 w-9 text-purple-500 transition-all duration-300 transform group-hover:rotate-12"
                />
              </Link>
              <h2 className="text-2xl font-semibold text-purple-500">MatchVolunteers</h2>
            </div>
          </div>

          {/* Description Column */}
          <div className="lg:w-2/5">
            <p className="text-gray-400 text-sm sm:text-base">
            No More Guesswork – Machine Learning Assigns the Perfect Volunteers by Expertise.
            </p>
          </div>

          {/* Contact Info Column */}
          <div className="text-gray-400 text-sm lg:text-right lg:w-1/4">
            <p>Usama | Rehman | Subhan </p>
            <p className="mt-1">Lahore, Pakistan</p>
          </div>
        </div>

        {/* Bottom Section - Divider and Copyright */}
        <div className="space-y-6">
          {/* Divider */}
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>

          {/* Copyright */}
          <div className="text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} MatchVolunteers - All rights reserved.</p>
            <p className="mt-1">Made with ❤️ by the MatchVolunteers Team</p>
            {/* Developed with ❤️ by Trio team</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;