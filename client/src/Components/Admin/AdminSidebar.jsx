import React, { useState, useEffect } from 'react';
import { Home, Calendar, Users, Settings, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/admin/dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    // { path: '/admin/events', name: 'Events', icon: <Calendar size={20} /> },
    // { path: '/admin/volunteers', name: 'Volunteers', icon: <Users size={20} /> },
    // { path: '/admin/settings', name: 'Settings', icon: <Settings size={20} /> },
    { path: '/admin/event-list', name: 'Event-List', icon: <Calendar size={20} /> },
    { path: '/admin/create-event', name: 'Create-Event', icon: <Calendar size={20} /> },
    { path: '/admin/role-suggestion', name: 'Role-suggestion', icon: <Calendar size={20} /> },
    { path: '/admin/vol-stats', name: 'Volunteer Stats', icon: <Calendar size={20} /> },


  ];

  const currentPath = location.pathname;

  return (
    <div className={`fixed left-0 top-0 h-full bg-indigo-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} shadow-xl z-10`}>
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {!collapsed && <h1 className="text-xl font-bold">Admin Portal</h1>}
        
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  activeLink === item.path
                    ? 'bg-black text-white'
                    : 'text-indigo-200 hover:bg-black hover:text-white'
                }`}
              >
                <span className="mr-3 font-semibold text-white">{item.icon}</span>
                {!collapsed && <span className='font-semibold text-white'>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
