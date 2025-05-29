import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserAlt,
  FaCalendarAlt,
  FaListAlt,
  FaBell,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/actions/user";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [activeLink, setActiveLink] = useState("/volunteer/dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/user/logout`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(logoutUser());
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout");
    }
  };

  const navItems = [
    {
      path: "/volunteer/dashboard",
      icon: <FaHome size={20} />,
      label: "Dashboard",
    },
    {
      path: "/volunteer/profile",
      icon: <FaUserAlt size={20} />,
      label: "Profile",
    },
    {
      path: "/volunteer/events",
      icon: <FaCalendarAlt size={20} />,
      label: "Events",
    },
    {
      path: "/volunteer/skills",
      icon: <FaListAlt size={20} />,
      label: "Skills",
    },
    {
      path: "/volunteer/notification",
      icon: <FaBell size={20} />,
      label: "Notifications",
    },
    // {
    //   path: "/volunteer/impact",
    //   icon: <FaChartLine size={20} />,
    //   label: "Impact",
    // },
    // { path: '/volunteer/feedback', icon: <FaFedex size={20} />, label: 'Feedback' }
  ];

  const currentPath = location.pathname;

  return (
    <div
      className={`w-72 bg-slate-700 text-white p-6 h-screen sticky top-0 left-0 overflow-y-auto ${
        isSidebarOpen ? "" : "hidden"
      } md:block`}
    >
      {/* Sidebar on mobile */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button
          className="text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* <div className="flex items-center justify-center mb-10">
        <div className="bg-white p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-3">Volunteer</h2>
      </div> */}

      <div className="mt-2 mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">{user?.name || "Guest"}</p>
          <p className="text-blue-100 text-sm">Volunteer</p>
        </div>
      </div>

      <nav className="flex flex-col h-[calc(100vh-350px)] justify-between">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  activeLink === item.path
                    ? "bg-white text-black font-bold shadow-2xl"
                    : "text-white hover:bg-slate-300 hover:text-black"
                }`}
              >
                <span className="text-center w-6">{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.path && (
                  <span className="ml-auto w-1.5 h-6 rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-white hover:bg-red-500 hover:text-white group"
          >
            <span className="text-center w-6">
              <FaSignOutAlt size={20} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* <div className="mt-auto pt-8">
        <div className="bg-white rounded-lg p-4 mt-6">
          <p className="text-xl text-black mb-2">Need assistance?</p>
          <button className="w-full py-2 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
