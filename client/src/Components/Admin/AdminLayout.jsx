// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import EventList from './EventList';
// import RoleSuggestionPanel from './RoleSuggestionPanel';
// import VolunteerStats from './VolunteerStats';
// import Dashboard from './Dashboard';

// const AdminLayout = () => {
//   const [activePage, setActivePage] = useState('events');

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Sidebar activePage={activePage} />

//       <div className={`ml-64 p-6`}>
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//           <p className="text-gray-600">Manage community events and volunteer roles</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main content area */}
//           <div className="lg:col-span-2 space-y-6">
//             {activePage === 'dashboard' && <Dashboard />}
//             {activePage === 'events' && <EventList />}
//             {activePage === 'volunteers' && <VolunteerStats />}
//             {activePage === 'settings' && (
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Settings</h2>
//                 <p>Configure your admin settings here.</p>
//               </div>
//             )}
//           </div>

//           {/* Sidebar widget area */}
//           <div className="space-y-6">
//             <RoleSuggestionPanel />

//             {/* Quick actions widget */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
//               <div className="space-y-2">
//                 <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
//                   Create New Event
//                 </button>
//                 <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
//                   Assign Volunteers
//                 </button>
//                 <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
//                   Generate Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <Home size={20} /> },
    // { path: '/admin/events', name: 'Events', icon: <Calendar size={20} /> },
    // { path: '/admin/volunteers', name: 'Volunteers', icon: <Users size={20} /> },
    // { path: '/admin/settings', name: 'Settings', icon: <Settings size={20} /> },
    {
      path: "/admin/event-list",
      name: "Event-List",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/create-event",
      name: "Create-Event",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/create-role",
      name: "Create-Role",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/role-suggestion",
      name: "Role-suggestion",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/vol-stats",
      name: "Volunteer Stats",
      icon: <Calendar size={20} />,
    },
  ];

  return (
    <div className="flex">
      <AdminSidebar menuItems={menuItems} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
