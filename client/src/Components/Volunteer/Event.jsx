import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaHourglassHalf,
  FaCalendarCheck,
  FaPlayCircle,
  FaQuestion,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents, requestJoinEvent } from "../../redux/actions/events";
import Spinner from "../Shared/Spinner";

const Events = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { allEvents: events = [], isLoading } = useSelector(
    (state) => state.events
  );
  const [showAll, setShowAll] = useState(false);

  console.log("events in event component", events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  // Fallback image URL
  const fallbackImage =
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  // Display only first 4 events if not showing all
  const displayedEvents = showAll ? events : events.slice(0, 4);

  if (isLoading) {
    return (
      <div className="col-span-2 text-center py-8">
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Events</h2>
            <p className="text-gray-600 mt-1">
              Find your next volunteering opportunity
            </p>
          </div>
          {events.length > 4 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              {showAll ? "Show Less" : "View All"}{" "}
              <FaArrowRight
                className={`ml-1 transform transition-transform ${
                  showAll ? "rotate-90" : ""
                }`}
              />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {displayedEvents && displayedEvents.length > 0 ? (
              displayedEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={
                        event.images && event.images.length > 0
                          ? event.images[0]
                          : fallbackImage
                      }
                      alt={event.title || "Event"}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {event.title || "Untitled Event"}
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {event.startTime
                              ? new Date(event.startTime).toLocaleDateString()
                              : "Date TBD"}
                          </p>
                          <p className="text-xs">
                            {event.startTime && event.endTime
                              ? `${new Date(
                                  event.startTime
                                ).toLocaleTimeString()} - ${new Date(
                                  event.endTime
                                ).toLocaleTimeString()}`
                              : "Time TBD"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <p className="text-sm font-medium">
                          {event.location || "Location TBD"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {event.status === "COMPLETED" && (
                          <FaCheckCircle className="text-green-500" />
                        )}
                        {event.status === "PENDING" && (
                          <FaHourglassHalf className="text-yellow-500" />
                        )}
                        {event.status === "UPCOMING" && (
                          <FaCalendarCheck className="text-blue-500" />
                        )}
                        {event.status === "ONGOING" && (
                          <FaPlayCircle className="text-purple-500" />
                        )}
                        {!event.status && (
                          <FaQuestion className="text-gray-500" />
                        )}
                        <p className="text-sm font-medium">
                          {event.status || "Status not available"}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full mt-4 py-2.5 transition-all shadow-md ${
                        event.status == "UPCOMING"
                          ? `bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 ${
                              loading ? "cursor-not-allowed" : ""
                            }`
                          : "bg-gray-100 text-gray-800 rounded-lg cursor-not-allowed"
                      }`}
                      disabled={event.status == "UPCOMING" ? false : true}
                      onClick={async () => {
                        setLoading(true);
                        await dispatch(requestJoinEvent(event.id, user.id));
                        setLoading(false);
                      }}
                    >
                      Request to Join
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500">No upcoming events available.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Events;
