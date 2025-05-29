import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import EventList from "./EventList";
import RoleSuggestionPanel from "./RoleSuggestionPanel";
import {
  FaChartBar,
  FaListAlt,
  FaUserShield,
  FaBell,
  FaSearch,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
// import userImage from "../../Assessts/subhanImage.png";
import CreateEventPage from "../ui/CreatetesEvent";
import { getEventsCount } from "../../redux/actions/events";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { motion } from "framer-motion";
import Spinner from "../Shared/Spinner";

const AdminDashboard = () => {
  const location = useLocation();
  const { eventsCount, isLoading } = useSelector((state) => state.events);
  const { roleCounts, user } = useSelector((state) => state.user);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!eventsCount) dispatch(getEventsCount());
    if (!roleCounts) dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    console.log("roleCounts: ", roleCounts);
  }, [roleCounts]);
  const getCountByStatus = (status) => {
    return eventsCount?.find((item) => item.status === status)?.count || 0;
  };

  const toggleCreateEvent = () => {
    setShowCreateEvent(!showCreateEvent);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isLoading === false ? (
        <div className="min-h-screen bg-gray-50">
          {/* Top Header */}
          <header className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-16 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center">
              <button
                className="mr-4 lg:hidden text-gray-600"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-40 md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Search..."
                />
              </div>
              <button className="p-2 relative rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-3">
                  <img
                    src={user?.profileImage?.url}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500"
                    alt="Admin"
                  />
                  <div className="text-right hidden md:block">
                    <p className="font-medium text-gray-800 truncate max-w-[150px]">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-md py-2 px-4 absolute w-full z-40">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Search..."
                />
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="font-medium text-blue-700">Dashboard</span>
                </button>
                <button className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <span className="font-medium text-purple-700">Events</span>
                </button>
                <button className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="font-medium text-green-700">Users</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-7xl">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Welcome back, Admin!
              </h2>
              <p className="text-sm sm:text-base opacity-90">
                Here's what's happening with your organization today.
              </p>
            </motion.div>

            {/* Dashboard Overview */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                  Overview
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Upcoming Events Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-3 sm:p-4 rounded-xl">
                      <FaListAlt className="text-blue-500 text-xl sm:text-2xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Upcoming Events
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {getCountByStatus("UPCOMING")}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center text-xs sm:text-sm text-green-600">
                      <span className="font-medium">+4%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                {/* Active Volunteers Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-purple-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-3 sm:p-4 rounded-xl">
                      <FaUserShield className="text-purple-500 text-xl sm:text-2xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Active Volunteers
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {roleCounts?.Volunteer || 0}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center text-xs sm:text-sm text-green-600">
                      <span className="font-medium">+12%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                {/* Events Completed Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-3 sm:p-4 rounded-xl">
                      <FaChartBar className="text-green-500 text-xl sm:text-2xl" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Events Completed
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {getCountByStatus("COMPLETED")}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center text-xs sm:text-sm text-green-600">
                      <span className="font-medium">+25%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="lg:col-span-2">
                {/* Event List Section */}
                {/* <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
                      Event Management
                    </h2>
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleCreateEvent}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 sm:px-4 rounded-md flex items-center justify-center sm:justify-start"
                    >
                      <FaPlus className="mr-2" />
                      {showCreateEvent ? "Hide Form" : "Create bbb Event"}
                    </motion.button> */}
                {/* </div>
                  <EventList />
                </div> */}{" "}
                {/* */}
                {/* Create Event Section - Only shown when toggled */}
                {showCreateEvent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden mb-4 sm:mb-6"
                  >
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Create New Event
                      </h3>
                      <CreateEventPage />
                    </div>
                  </motion.div>
                )}
              </div>

              <div>
                {/* Role Suggestions Section */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Role Suggestions
                  </h3>
                  <RoleSuggestionPanel />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {/* <button 
                      className="w-full flex items-center justify-between p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      onClick={toggleCreateEvent}
                    >
                      <span className="text-sm sm:text-base font-medium text-blue-700">Create New Event</span>
                      <span className="bg-blue-100 text-blue-700 p-1 rounded-lg">
                        <FaPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </button> */}
                    <Link
                      to="/admin/create-event"
                      className="w-full flex items-center justify-between p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm sm:text-base font-medium text-blue-700">
                        Create New Event
                      </span>
                      <span className="bg-blue-100 text-blue-700 p-1 rounded-lg">
                        <FaPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>

                    <Link
                      to="/admin/vol-stats"
                      className="w-full flex items-center justify-between p-2 sm:p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <span className="text-sm sm:text-base font-medium text-purple-700">
                        Manage Users
                      </span>
                      <span className="bg-purple-100 text-purple-700 p-1 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                        </svg>
                      </span>
                    </Link>
                    {/* <button className="w-full flex items-center justify-between p-2 sm:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <span className="text-sm sm:text-base font-medium text-green-700">Generate Reports</span>
                      <span className="bg-green-100 text-green-700 p-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const DashboardWithRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default DashboardWithRouter;
