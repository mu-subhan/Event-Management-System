import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Calendar, Home, Menu, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsCount } from "../../redux/actions/events";
import { getAllUsers } from "../../redux/actions/user";
import Loader from "../Shared/Loader";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile
  const collapsed = false; // keep your logic as-is
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <Home size={20} /> },
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
      path: "/admin/vol-stats",
      name: "Volunteer Stats",
      icon: <Calendar size={20} />,
    },
    {
      path: "/admin/edit-profile",
      name: "Profile",
      icon: <Pencil size={20} />,
    },
  ];

  useEffect(() => {
    dispatch(getEventsCount());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      {isLoading === false ? (
        !isAuthenticated || user?.role !== "Admin" ? (
          <Navigate to="/" />
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* Menu icon for mobile */}
            <button
              className="md:hidden fixed top-4 left-4 z-50 text-white bg-indigo-800 p-2 rounded-md shadow-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <AdminSidebar
              className="fixed h-full"
              toggleSidebar={setIsSidebarOpen}
              isOpen={isSidebarOpen}
              menuItems={menuItems}
              collapsed={collapsed}
            />

            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdminLayout;
