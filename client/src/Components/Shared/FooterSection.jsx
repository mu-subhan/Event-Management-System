import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  const socialIcons = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 3c-2.5 0-4.5 2.04-4.5 4.56 0 .36.04.72.11 1.06A12.94 12.94 0 013 4.15a4.65 4.65 0 001.41 6.1 4.41 4.41 0 01-2.05-.57v.06c0 2.22 1.54 4.07 3.58 4.5a4.4 4.4 0 01-2.04.08c.58 1.87 2.26 3.23 4.25 3.26A9 9 0 012 19.54 12.75 12.75 0 008.29 21c7.55 0 11.68-6.46 11.68-12.06 0-.18-.01-.35-.02-.53A8.18 8.18 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.45 20.45h-3.554v-5.568c0-1.328-.472-2.236-1.65-2.236-.899 0-1.433.604-1.668 1.188-.086.209-.108.499-.108.791v5.825H9.909s.047-9.454 0-10.437h3.554v1.479c.472-.728 1.317-1.763 3.203-1.763 2.338 0 4.079 1.532 4.079 4.826v5.895zM5.337 7.433c-1.145 0-1.891.755-1.891 1.747 0 .972.724 1.746 1.847 1.746h.022c1.169 0 1.891-.774 1.891-1.746-.022-.992-.722-1.747-1.869-1.747zm-1.777 13.017h3.554V10.99H3.56v9.46zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    }
  ];

  const links = ["Home", "About", "Contact", "Privacy", "Terms"];

  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Logo and description - full width on mobile */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
          <Link to="/" className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-purple-600"
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
          <p className="text-sm text-gray-400 max-w-xs">
            Create, manage, and join events that matter.
          </p>
        </div>

        {/* Links - centered on mobile, left-aligned on desktop */}
        <div className="w-full md:w-auto grid grid-cols-2 sm:flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          {links.map((link, i) => (
            <Link 
              key={i} 
              to="#" 
              className="text-gray-400 hover:text-white transition whitespace-nowrap"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Social Icons - centered on mobile, right-aligned on desktop */}
        <div className="w-full md:w-auto flex justify-center md:justify-start gap-4">
          {socialIcons.map((social, index) => (
            <Link
              key={index}
              to="#"
              className="text-gray-400 hover:text-white transition"
              aria-label={social.name}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom text - always centered */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} EventPro. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;