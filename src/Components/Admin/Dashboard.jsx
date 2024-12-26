import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';


import CreateEventForm from '../Admin/CreateEventForm.jsx';
import EventList from '../Admin/EventList.jsx';
import RoleSuggestionPanel from '../Admin/RoleSuggestionPanel.jsx';

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
              <Link to="/admin-dashboard" className="text-lg text-white hover:text-blue-400">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/create-event" className="text-lg text-white hover:text-blue-400">
                Create Event
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin-dashboard/events" className="text-lg text-white hover:text-blue-400">
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

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-gray-100">
        <Routes>
          <Route path="/admin-dashboard" element={<h2 className="text-2xl font-semibold text-gray-700">Welcome to the Admin Dashboard!</h2>} />
          <Route path="/admin-dashboard/create-event" element={<CreateEventForm />} />
          <Route path="/admin-dashboard/events" element={<EventList />} />
          <Route path="/admin-dashboard/role-suggestions" element={<RoleSuggestionPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
