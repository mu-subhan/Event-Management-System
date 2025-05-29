import React, { useEffect, useState } from "react";
import { Calendar, Clock, Check, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEvents } from "../../redux/actions/events";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../Shared/ConfirmDeleteModal";

const EventList = () => {
  // presetvalues
  const events = [
    {
      id: 1,
      name: "Community Cleanup",
      date: "2024-12-30",
      status: "Ongoing",
      location: "Central Park",
      volunteers: 12,
    },
    {
      id: 2,
      name: "Food Bank Drive",
      date: "2024-12-31",
      status: "Upcoming",
      location: "Community Center",
      volunteers: 8,
    },
    {
      id: 3,
      name: "Senior Home Visit",
      date: "2025-01-15",
      status: "Upcoming",
      location: "Sunshine Seniors",
      volunteers: 5,
    },
    {
      id: 4,
      name: "Tree Planting Initiative",
      date: "2024-12-15",
      status: "Completed",
      location: "Riverside",
      volunteers: 20,
    },
  ];

  const dispatch = useDispatch();
  // state
  const {
    allEvents,
    eventsCount,
    totalPages,
    currentPage,
    isLoading,
    success,
  } = useSelector((state) => state.events);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const pagelength = 6;
  // functions
  const pageChange = async (operator) => {
    setLoading(true);

    // Checking if we should go to the next page
    if (operator === "+") {
      if (page >= totalPages) {
        toast.error("No More Pages");
        setLoading(false);
        return;
      }

      const nextPage = page + 1;
      dispatch(getAllEvents(nextPage)); // Fetch events for the next page
      setPage(nextPage);
    }

    // Going to the previous page
    else if (operator === "-" && page > 1) {
      const prevPage = page - 1;
      dispatch(getAllEvents(prevPage)); // Fetch events for the previous page
      setPage(prevPage);
    }

    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const deleteEventFunc = async () => {
    try {
      const response = await dispatch(deleteEvent(eventToDelete));
      if (response) {
        toast.success("Event Deleted Successfully!");
        // Refresh the events list
        dispatch(getAllEvents(page));
      } else {
        toast.error("Error During The deletion of Event!");
      }
    } catch (error) {
      toast.error("Error During The deletion of Event!");
      console.log("error: ", error);
    } finally {
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" /> {status}
          </span>
        );
      case "Upcoming":
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            <Calendar size={12} className="mr-1" /> {status}
          </span>
        );
      case "Completed":
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <Check size={12} className="mr-1" /> {status}
          </span>
        );
      default:
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            <AlertCircle size={12} className="mr-1" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full h-full p-4 sm:p-6 bg-gray-50 mt-10">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto w-full max-w-7xl overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Event Management
            </h2>
            <Link
              to="/admin/create-event"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center whitespace-nowrap"
            >
              <span className="mr-2 text-lg">+</span> Add Event
            </Link>
          </div>

          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-50 ">
                  {[
                    "Event Name",
                    "Date",
                    "Location",
                    "Volunteers",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left font-medium text-gray-800 uppercase tracking-wider whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allEvents?.length > 0 &&
                  allEvents.map((event, index) => {
                    const startIndex = (page - 1) * 6;
                    const endIndex = page * 6;
                    if (index < startIndex || index >= endIndex) return null;

                    return (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 max-w-xs break-words">
                          <div className="font-medium text-gray-900">
                            {event.title}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                          {event?.startTime}
                        </td>
                        <td className="px-4 py-4 max-w-xs break-words text-gray-600">
                          {event.location}
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                          {event.volunteers?.length || 0} Volunteers
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                              to={`/admin/event/${event.id}/edit`} // Changed to match the new route
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteClick(event.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing {Math.min(6, allEvents?.length || 0)} of{" "}
              {allEvents?.length || 0} events
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 border rounded bg-gray-100 text-gray-600 disabled:opacity-50"
                onClick={() => pageChange("-")}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-3 py-1 border rounded bg-indigo-600 text-white">
                {page}
              </span>
              <button
                className="px-3 py-1 border rounded bg-gray-100 text-gray-600 disabled:opacity-50"
                onClick={() => pageChange("+")}
                disabled={currentPage >= (totalPages || 0)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={deleteEventFunc}
      />
    </div>
  );
};

export default EventList;
