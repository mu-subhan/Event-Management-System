import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ menuItems, isOpen, toggleSidebar=()=>{}, collapsed }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/admin/dashboard");
  const sidebarRef = useRef();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Close sidebar on outside click (for mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        toggleSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen bg-indigo-800 text-white transition-all duration-300 z-50 shadow-xl
      ${collapsed ? "w-16" : "w-64"} 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:static`}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {!collapsed && <h1 className="text-xl font-bold">Admin Portal</h1>}
        {/* Close icon only on mobile */}
        <div className="md:hidden">
          <button onClick={() => toggleSidebar(false)}>
            <X size={24} />
          </button>
        </div>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <li
                key={item.path}
                onClick={() => {
                  if (item?.callback) item.callback();
                  toggleSidebar(false); // auto-close on mobile when clicking item
                }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    activeLink === item.path
                      ? "bg-black text-white"
                      : "text-indigo-200 hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="mr-3 font-semibold text-white">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="font-semibold text-white">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
