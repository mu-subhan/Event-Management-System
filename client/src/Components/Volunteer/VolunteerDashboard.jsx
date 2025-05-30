import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import Events from "./Event";
import Skills from "./Skills";
import VolunteerImpact from "./VolunteerImpact";
import { useSelector, useDispatch } from "react-redux";

const VolunteerDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Get first part of the name (before space)
  const firstName = user?.name?.split(" ")[0] || "Volunteer";
  // Get skills count
  const skillsCount = user?.skills?.length || 0;

  const stats = [
    // { title: "Total Hours", value: "50", color: "from-blue-500 to-blue-600" },
    {
      title: "Events",
      value: user?._count?.roles || 0,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Skills",
      value: skillsCount.toString(),
      color: "from-purple-500 to-purple-600",
    },
    // { title: "Impact", value: "High", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className=" px-4 sm:px-6  py-8">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Welcome Back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {firstName}!
                </span>
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Your volunteering journey continues
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
                <div className="mt-3 h-1 w-full bg-white bg-opacity-30 rounded-full">
                  <div
                    className="h-1 bg-white rounded-full"
                    style={{ width: `${Math.min(100, index * 30 + 40)}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="space-y-12">
          {/* <VolunteerImpact /> */}

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full"
            >
              {user && <Events user={user} />}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <Skills />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VolunteerDashboardWithRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<VolunteerDashboard />} />
    </Routes>
  );
};

export default VolunteerDashboardWithRouter;
