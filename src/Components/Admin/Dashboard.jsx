import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin/dashboard" className="text-lg text-white hover:text-blue-400">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/create-event" className="text-lg text-white hover:text-blue-400">
                Create Event
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/event" className="text-lg text-white hover:text-blue-400">
                Event List
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/role-suggestions" className="text-lg text-white hover:text-blue-400">
                Role Suggestions
              </Link>
            </li>
          </ul>
        </nav>
      </div>


      
    </div>
  );
};

export default Dashboard;
