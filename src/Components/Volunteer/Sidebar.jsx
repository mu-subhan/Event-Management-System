import React from 'react';
import { FaHome, FaUserAlt, FaCalendarAlt, FaListAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-custom-blue text-white p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to='/volunteer/dashboard' className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
        <FaHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to ="/volunteer/profile" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
            <FaUserAlt /> <span>Profile</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to ="/volunteer/events" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
            <FaCalendarAlt /> <span>Events</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to ="/volunteer/skills" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
            <FaListAlt /> <span>Skills</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link to ="/volunteer/notification" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
            <FaBell /> <span>Notifications</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
