import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Main Content - Stack on mobile, three columns on large screens */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-8 lg:space-y-0">
          {/* Logo and Title Column */}
          <div className="lg:w-1/4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <Link to="/" className="inline-block">
                <svg
                  className="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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