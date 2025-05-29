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
  FaBrain,
  FaHandshake,
  FaChartLine,
  FaLightbulb,
  FaUsers
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
                <div className="flex items-center space-x-3">
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
                </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Features - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Machine Learning Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FaBrain className="text-2xl text-purple-600" />
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-800">
                      Machine Learning Integration
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Intelligent Skill Analysis</h4>
                        <p className="text-gray-600 text-sm">
                          Our ML algorithms analyze volunteer profiles and skills to identify the best matches for each event role, ensuring optimal team composition.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Role-Based Matching</h4>
                        <p className="text-gray-600 text-sm">
                          Advanced pattern recognition to match volunteers with roles that best suit their experience and expertise levels.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">How It Works</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div className="text-sm text-gray-600">
                          <span className="block text-purple-600 font-medium mb-1">1. Profile Analysis</span>
                          Processes volunteer profiles and skills
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="block text-purple-600 font-medium mb-1">2. Skill Mapping</span>
                          Maps skills to event requirements
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="block text-purple-600 font-medium mb-1">3. Match Generation</span>
                          Generates optimal volunteer-role matches
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* System Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaLightbulb className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-800">
                      System Benefits
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Time Efficiency</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Automated volunteer matching</li>
                        <li>• Quick role assignments</li>
                        <li>• Streamlined event planning</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Better Outcomes</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Higher volunteer satisfaction</li>
                        <li>• Improved event success rates</li>
                        <li>• Reduced management overhead</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaChartBar className="text-indigo-500 mr-2" />
                    Key Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">Match Accuracy</h4>
                      <p className="text-sm text-gray-600">
                        Precision in matching volunteers to suitable roles
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">Processing Speed</h4>
                      <p className="text-sm text-gray-600">
                        Quick and efficient volunteer assignment
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">Role Coverage</h4>
                      <p className="text-sm text-gray-600">
                        Optimal distribution of volunteer skills
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Management Tools */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaHandshake className="text-purple-500 mr-2" />
                    Management Tools
                  </h3>
                  <div className="space-y-3">
                    <Link
                      to="/admin/create-event"
                      className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <div>
                        <span className="text-sm font-medium text-purple-700">Event Creation</span>
                        <p className="text-xs text-purple-600 mt-1">Set up new volunteer opportunities</p>
                      </div>
                      <FaPlus className="text-purple-700" />
                    </Link>
                    <Link
                      to="/admin/vol-stats"
                      className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <div>
                        <span className="text-sm font-medium text-blue-700">Volunteer Database</span>
                        <p className="text-xs text-blue-600 mt-1">Access volunteer profiles and history</p>
                      </div>
                      <FaUsers className="text-blue-700" />
                    </Link>
                  </div>
                </motion.div>
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
