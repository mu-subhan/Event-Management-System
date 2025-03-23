// components/FooterSection.jsx
import React from 'react';

const FooterSection = () => {
  const socialIcons = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-6h2v6zm-1-7a1 1 0 110-2 1 1 0 010 2zm8 7h-2v-4c0-.5-.5-1-1-1s-1 .5-1 1v4h-2v-6h2v1c.4-.6 1.2-1 2-1 1.7 0 3 1.3 3 3v3z" />
        </svg>
      ),
    },
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: ["Home", "Features", "How It Works", "Pricing", "FAQ"],
    },
    {
      title: "Resources",
      links: ["Blog", "Guides", "Success Stories", "Community", "Events"],
    },
    {
      title: "Company",
      links: ["About Us", "Team", "Careers", "Contact Us", "Press"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR", "Accessibility"],
    },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="ml-2 text-xl font-bold">EventPro</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your all-in-one platform to create, manage, and join events that matter. Connect with like-minded individuals and make an impact together.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EventPro. All rights reserved.
            </p>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6 w-full md:w-auto">
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2 rounded-l-md text-gray-900 w-full focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;