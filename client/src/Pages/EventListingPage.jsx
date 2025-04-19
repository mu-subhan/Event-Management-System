import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Shared/Navbar";
import Layout from "../Components/Shared/Layout";

const EventListingPage = () => {
  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2023",
      description: "Annual technology conference with industry leaders",
      date: "2023-11-15",
      time: "09:00",
      type: "past",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Design Workshop",
      description: "Hands-on UI/UX design workshop",
      date: "2023-12-05",
      time: "14:00",
      type: "ongoing",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "New Year Hackathon",
      description: "48-hour coding competition with prizes",
      date: "2024-01-10",
      time: "10:00",
      type: "upcoming",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    // Add more events as needed
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [isHovered, setIsHovered] = useState(null);

  // Categorize events
  const pastEvents = events.filter((event) => event.type === "past");
  const ongoingEvents = events.filter((event) => event.type === "ongoing");
  const upcomingEvents = events.filter((event) => event.type === "upcoming");

  // Get current events based on active tab
  const getCurrentEvents = () => {
    switch (activeTab) {
      case "past":
        return pastEvents;
      case "ongoing":
        return ongoingEvents;
      case "upcoming":
        return upcomingEvents;
      default:
        return events;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      {/* <Navbar scroll={false} /> */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Event Calendar
            </h1>
            <p className="text-xl text-gray-600">
              Discover and join exciting events
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {["all", "upcoming", "ongoing", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab} {tab !== "all" && `(${getCurrentEvents().length})`}
              </button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {getCurrentEvents().map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setIsHovered(event.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`relative overflow-hidden rounded-xl shadow-lg ${
                    event.type === "ongoing" ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  {/* Event Image */}
                  <div className="h-48 overflow-hidden">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isHovered === event.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Event Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      event.type === "past"
                        ? "bg-gray-500 text-white"
                        : event.type === "ongoing"
                        ? "bg-green-500 text-white"
                        : "bg-indigo-500 text-white"
                    }`}
                  >
                    {event.type === "ongoing" ? "Happening Now" : event.type}
                  </div>

                  {/* Event Content */}
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex items-center text-gray-500 mb-4">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center text-gray-500 mb-6">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {event.time} {event.time > "12:00" ? "PM" : "AM"}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2 rounded-md font-medium ${
                        event.type === "past"
                          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                      disabled={event.type === "past"}
                    >
                      {event.type === "past" ? "Event Ended" : "Register Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {getCurrentEvents().length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No {activeTab} events found
              </h3>
              <p className="text-gray-500">Check back later for new events</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EventListingPage;
