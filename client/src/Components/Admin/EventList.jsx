import React, { useEffect, useState } from "react";
import { Calendar, Clock, Check, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllEvents } from "../../redux/actions/events";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const pagelength = 6;
  // functions
  const pageChange = async (operator) => {
    setLoading(true);
    setCount((prev) => prev + 1);
    if (operator === "+") {
      if (parseInt(totalPages) <= parseInt(page)) {
        toast.error("No More Pages");
        return;
      } else if (allEvents.length / pagelength <= page * pagelength) {
        const nextPage = page + 1;
        dispatch(getAllEvents(nextPage));
        setPage((prev) => {
          console.log("SetPage Run!!!", prev);
          return nextPage;
        });
      }
      // setPage(2);
      // setPage((prev) => {
      //   const valuetoreturn = prev + 1;
      //   console.log("valuetoreturn: ", valuetoreturn);
      //   return valuetoreturn;
      // });
    } else if (operator === "-" && page > 1) {
      setPage((prev) => prev - 1);
    }
    setLoading(false);
  };
  const deleteEventFunc = async (id) => {
    try {
      const response = await dispatch(deleteEvent(id));
      if (response) {
        toast.success("event Deleted Succeessfully!");
      } else {
        toast.error("Error During The deletion of Event!");
      }
      return;
    } catch (error) {
      toast.error("Error During The deletion of Event!");
      console.log("error: ", error);
    }
  };
  // useEffect

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
                              onClick={() => deleteEventFunc(event.id)}
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
    </div>
  );
};

export default EventList;
