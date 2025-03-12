import React, { useState, useEffect } from 'react';
import { FaHome, FaUserAlt, FaCalendarAlt, FaListAlt, FaBell, FaChartLine, FaFedex } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import userImage from "../../Assessts/subhanImage.png";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/volunteer/dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // To manage mobile sidebar toggle

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navItems = [
    { path: '/volunteer/dashboard', icon: <FaHome size={20} />, label: 'Dashboard' },
    { path: '/volunteer/profile', icon: <FaUserAlt size={20} />, label: 'Profile' },
    { path: '/volunteer/events', icon: <FaCalendarAlt size={20} />, label: 'Events' },
    { path: '/volunteer/skills', icon: <FaListAlt size={20} />, label: 'Skills' },
    { path: '/volunteer/notification', icon: <FaBell size={20} />, label: 'Notifications' },
    { path: '/volunteer/impact', icon: <FaChartLine size={20} />, label: 'Impact' },
    { path: '/volunteer/feedback', icon: <FaFedex size={20} />, label: 'Feedback' }

  ];

  const currentPath = location.pathname;

  return (
    <div className={`w-72 bg-slate-700 text-white p-6 h-screen sticky top-0 left-0 overflow-y-auto ${isSidebarOpen ? '' : 'hidden'} md:block`}>
      {/* Sidebar on mobile */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button
          className="text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center justify-center mb-10">
        <div className="bg-white p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-3">Volunteer Hub</h2>
      </div>
      
      <div className="mt-2 mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
            <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Muhammad Subhan</p>
          <p className="text-blue-100 text-sm">Dedicated Volunteer</p>
        </div>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  activeLink === item.path 
                    ? 'bg-white text-black font-bold shadow-2xl' 
                    : 'text-white hover:bg-slate-300 hover:text-black'
                }`}
              >
                <span className="text-center w-6">{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.path && (
                  <span className="ml-auto w-1.5 h-6  rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-white rounded-lg p-4 mt-6">
          <p className="text-xl text-black mb-2">Need assistance?</p>
          <button className="w-full py-2 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
