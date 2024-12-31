import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaListAlt, FaUserShield, FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // To handle sidebar collapse state

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`w-${isSidebarCollapsed ? '16' : '64'} bg-custom-blue text-white p-4 transition-all`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isSidebarCollapsed ? 'hidden' : ''}`}>Admin Dashboard</h2>
          <button
            className="text-white"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '>' : '<'}
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin/dashboard" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
                <FaHome className="text-xl" />
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>Dashboard</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/create-event" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
                <FaPlusCircle className="text-xl" />
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>Create Event</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/event" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
                <FaListAlt className="text-xl" />
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>Event List</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/role-suggestions" className="flex items-center space-x-2 text-lg hover:bg-black text-white p-2 rounded">
                <FaUserShield className="text-xl" />
                <span className={`${isSidebarCollapsed ? 'hidden' : ''}`}>Role Suggestions</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Dashboard Overview */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Overview</h3>
          <div className="flex space-x-6 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex-1">
              <h4 className="font-semibold">Upcoming Events</h4>
              <p className="text-xl">15</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex-1">
              <h4 className="font-semibold">Active Volunteers</h4>
              <p className="text-xl">50</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex-1">
              <h4 className="font-semibold">Events Completed</h4>
              <p className="text-xl">5</p>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Event List</h3>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center mb-4">
              <input type="text" placeholder="Search events..." className="p-2 border rounded" />
              <button className="bg-blue-500 text-white p-2 rounded">Add New Event</button>
            </div>
            <ul>
              {/* List events with status badges */}
              <li className="flex justify-between p-3 border-b">
                <span>Event 1</span>
                <span className="bg-green-200 p-1 rounded text-green-800">Upcoming</span>
              </li>
              <li className="flex justify-between p-3 border-b">
                <span>Event 2</span>
                <span className="bg-red-200 p-1 rounded text-red-800">Ongoing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Role Suggestions */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Role Suggestions</h3>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <ul>
              <li className="flex justify-between p-3 border-b">
                <span>Volunteer 1</span>
                <span className="text-gray-600">Suggested for Event 1</span>
              </li>
              <li className="flex justify-between p-3 border-b">
                <span>Volunteer 2</span>
                <span className="text-gray-600">Suggested for Event 2</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
