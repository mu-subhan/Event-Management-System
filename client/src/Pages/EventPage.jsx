import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getEventsBYId } from "../redux/actions/events";
import Loader from "../Components/Shared/Loader";
export default function EventDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // states
  // const [event, setEvent] = useState(null);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState({});
  const { event, isLoading } = useSelector((state) => state.events);
  useEffect(() => {
    dispatch(getEventsBYId(id));
    // Sample static data (replace with fetch logic later)
    // setEvent({
    //   title: "Charity Cleanup Drive",
    //   description: "Join us to clean up the neighborhood park.",
    //   location: "Central Park",
    //   startTime: "2025-04-20T10:00:00",
    //   endTime: "2025-04-20T14:00:00",
    //   status: "UPCOMING",
    // });

    // setRoles([
    //   {
    //     id: "r1",
    //     role_name: "Team Leader",
    //     skills: ["Leadership", "Communication"],
    //     description: "Manage volunteers and assign tasks.",
    //   },
    //   {
    //     id: "r2",
    //     role_name: "Photographer",
    //     skills: ["Photography"],
    //     description: "Capture moments during the event.",
    //   },
    // ]);

    // setUsers([
    //   { id: "u1", name: "Alice", email: "alice@example.com" },
    //   { id: "u2", name: "Bob", email: "bob@example.com" },
    //   { id: "u3", name: "Charlie", email: "charlie@example.com" },
    // ]);
  }, [id]);

  const handleSelect = (roleId, userId) => {
    setSelectedVolunteers((prev) => ({
      ...prev,
      [roleId]: userId,
    }));
  };

  if (!event)
    return (
      <div className="text-center mt-10 text-gray-500">Loading Event...</div>
    );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        event && (
          <>
            <Navbar scroll={false} />
            <div className="max-w-6xl mx-auto px-6 py-10 ">
              {/* Event Header */}
              <div className="bg-white shadow-md rounded-xl p-6 my-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h1>
                <p className="text-gray-600 text-lg">{event.description}</p>
                <div className="mt-4 space-y-1 text-gray-500">
                  <div>
                    📍 <span className="font-medium">{event.location}</span>
                  </div>
                  <div>
                    🕒 {new Date(event.startTime).toLocaleString()} —{" "}
                    {new Date(event.endTime).toLocaleString()}
                  </div>
                  <div>
                    Status:{" "}
                    <span className="text-blue-600 font-semibold">
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role Cards */}
              <div>
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                  Event Roles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition p-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {role.role_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {role.description}
                      </p>
                      <p className="text-sm text-gray-700 mb-4">
                        <strong>Skills:</strong> {role.skills.join(", ")}
                      </p>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Assign Volunteer
                        </label>
                        <select
                          value={selectedVolunteers[role.id] || ""}
                          onChange={(e) =>
                            handleSelect(role.id, e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">-- Select Volunteer --</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
