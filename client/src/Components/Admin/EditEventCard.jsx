import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEdit2,
  FiX,
  FiSave,
} from "react-icons/fi";
import event from "../../Assessts/event.jpg";
import VolunteerAssignment from "./VolunteerAssignment";
import AssignVolunteer from "../Shared/AssignVolunteer";
import { Buttoen } from "../ui/Button";
import {
  createRole,
  deleteRole,
  assignVolunteerToRole,
} from "../../redux/actions/role";
import { useDispatch } from "react-redux";
const EditEventCard = ({ event: initialEvent, onUpdate }) => {
  const dispatch = useDispatch();
  // states
  const [event, setEvent] = useState(initialEvent);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedVolunteers, setSelectedVolunteers] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [newRole, setNewRole] = useState({
    role_name: "",
    description: "",
    skills: [],
    newSkill: "",
    maxVolunteers: 1,
  });
  const [isOpenVolunteerPopup, setIsOpenVolunteerPopup] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    setEvent(initialEvent);
  }, [initialEvent]);

  const handleInputChange = (e) => {
    console.log("Input Change: ", e.target.name, e.target.value);
    const { name, value } = e.target;

    setEvent((prev) => {
      const updatedEvent = { ...prev, [name]: value };

      // Ensure both startTime and endTime are available
      if (name === "startTime" || name === "endTime") {
        const start = new Date(updatedEvent.startTime);
        const end = new Date(updatedEvent.endTime);

        if (start && end && start > end) {
          toast.error("End time must be after start time.");
          return prev; // prevent update
        }
      }

      return updatedEvent;
    });

    // setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (roleId, field, value) => {
    setEvent((prev) => ({
      ...prev,
      role: prev.role.map((role) =>
        role.id === roleId ? { ...role, [field]: value } : role
      ),
    }));
  };

  const handleSelect = (roleId, volunteerId) => {
    setSelectedVolunteers((prev) => ({ ...prev, [roleId]: volunteerId }));
  };

  const handleAddSkill = (roleId) => {
    if (
      newSkill.trim() &&
      !event.role.find((r) => r.id === roleId).skills.includes(newSkill.trim())
    ) {
      setEvent((prev) => ({
        ...prev,
        role: prev.role.map((role) =>
          role.id === roleId
            ? { ...role, skills: [...role.skills, newSkill.trim()] }
            : role
        ),
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (roleId, skill) => {
    setEvent((prev) => ({
      ...prev,
      role: prev.role.map((role) =>
        role.id === roleId
          ? { ...role, skills: role.skills.filter((s) => s !== skill) }
          : role
      ),
    }));
  };

  const handleAddRole = async () => {
    try {
      const { role_name, description, maxVolunteers, skills } = newRole;
      console.log("Adding Role: ", newRole);
      if (
        !role_name.trim() ||
        !description.trim() ||
        !maxVolunteers ||
        isNaN(maxVolunteers) ||
        maxVolunteers <= 0 ||
        event.role.some((r) => r.role_name === role_name.trim()) ||
        skills.length === 0
      ) {
        // Specific field-level error messages
        if (!role_name.trim()) {
          return toast.error("Please enter a valid role name.");
        }

        if (event.role.some((r) => r.role_name === role_name.trim())) {
          return toast.error("Role name already exists.");
        }

        if (!description.trim()) {
          return toast.error("Please enter a description.");
        }

        if (!maxVolunteers || isNaN(maxVolunteers) || maxVolunteers <= 0) {
          return toast.error("Please enter a valid number of volunteers.");
        }

        // Optional skill check
        if (skills.length === 0) {
          return toast.error("Please add at least one skill.");
        }

        return;
      }

      console.log("newRole: ", newRole);
      console.log("event: ", event);
      if (
        newRole.role_name.trim() &&
        event.role.every((r) => r.role_name !== newRole?.role_name)
      ) {
        const data = {
          role_name: newRole.role_name,
          description: newRole.description,
          skills: newRole.skills,
          event_id: event?.id,
          maxVolunteers: newRole?.maxVolunteers,
        };
        const response = await dispatch(createRole(data));
        if (!response || response?.success === false)
          throw new Error("Failed In Creation of New Role!");
        setEvent((prev) => ({
          ...prev,
          role: [...prev.role, response.eventRole],
        }));
        setNewRole({
          role_name: "",
          description: "",
          skills: [],
          slots_available: 1,
        });
        toast.success("Role Added Successfully!");
      } else {
        toast.error(
          role.trim() ? "RoleName is Empty!" : "RoleName Already Exist!"
        );
      }
    } catch (error) {
      toast.error(error?.message || "Role Add fail!");
    }
  };

  const handleRemoveRole = async (roleId) => {
    try {
      const data = await dispatch(deleteRole(roleId));
      setEvent((prev) => ({
        ...prev,
        role: prev.role.filter((role) => role.id !== roleId),
      }));
    } catch (error) {
      console.log("error is: ", error);
    }
  };
  const handleAssignVolunteer = async (roleId, userId) => {
    try {
      const eventId = event.id;
      if (!eventId || !roleId || !userId) {
        toast.error("Assign Volunteer Failed Due to Invalid Input!");
        return;
      }
      await dispatch(assignVolunteerToRole(roleId, eventId, userId));
      // Optionally update local state if needed
      setEvent((prev) => ({
        ...prev,
        role: prev.role.map((role) =>
          role.id === roleId
            ? {
                ...role,
                volunteers: [...(role.volunteers || []), { id: userId }],
              }
            : role
        ),
      }));
      return { success: true };
    } catch (error) {
      console.log("Assignment Error: ", error);
      return { success: false };
    }
  };

  const addVolunteerToRole = (roleId, volunteer) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          // Prevent duplicate volunteers by id
          const exists = role.volunteers.some((v) => v.id === volunteer.id);
          if (!exists) {
            return {
              ...role,
              volunteers: [...role.volunteers, volunteer],
            };
          }
        }
        return role;
      })
    );
  };

  // Remove volunteer by volunteer id from role.volunteers by role id
  const removeVolunteerFromRole = (roleId, volunteerId) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            volunteers: role.volunteers.filter((v) => v.id !== volunteerId),
          };
        }
        return role;
      })
    );
  };

  const handleSave = async () => {
    try {
      console.log("Saving event:", event); // Debug what's being sent
      console.log(
        "Endpoint:",
        `${process.env.REACT_APP_SERVER}/api/event/${event.id}`
      );

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/event/${event.id}`,
        event,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response); // Inspect full response

      if (response.status === 200) {
        toast.success("Event updated successfully!");
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Update error details:", {
        message: error.message,
        response: error.response,
        stack: error.stack,
      });
      toast.error(
        error.response?.data?.message ||
          "Failed to update event. Check console for details."
      );
    }
  };

  const handleCancel = () => {
    setEvent(initialEvent);
    setIsEditing(false);
  };

  // Header buttons component
  const HeaderButtons = () => (
    <div className="flex space-x-2">
      {isEditing ? (
        <>
          <button
            onClick={handleCancel}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-all text-red-600 flex items-center"
          >
            <FiX className="mr-1" /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-all text-green-600 flex items-center"
          >
            <FiSave className="mr-1" /> Save
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 bg-white/90 rounded-full hover:bg-white transition-all flex items-center"
        >
          <FiEdit2 className="text-gray-800 mr-1" /> Edit
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Event Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100"
      >
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={event.image || event}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center justify-between">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleInputChange}
                    className="text-3xl md:text-4xl font-bold text-white bg-transparent border-b border-white/50 focus:border-white focus:outline-none mb-2 w-full"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {event.title}
                  </h1>
                )}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center ${
                    statusColors[event.status.toLowerCase()] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status}
                </div>
              </div>
              <HeaderButtons />
            </div>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          {isEditing ? (
            <textarea
              name="description"
              value={event.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              rows="3"
            />
          ) : (
            <p className="text-gray-700 text-lg mb-6">{event.description}</p>
          )}

          <hr className="my-6 border-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <FiMapPin className="text-blue-600 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{event.location}</p>
                )}
              </div>
            </div>

            {/* <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <FiCalendar className="text-purple-600 text-xl" />
              </div> */}
            {/* <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Date</h3> */}
            {/* {isEditing ? (
                  <input
                    type="date"
                    name="startTime"
                    value={
                      new Date(event.startTime).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: "startTime",
                          value: new Date(e.target.value).toISOString(),
                        },
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : ( */}
            {/* <p className="text-gray-900 font-medium">
                  {new Date(event.startTime).toLocaleDateString()}
                </p>
                {/* )} */}
            {/* </div> */}
            {/* </div> */}

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-50 rounded-full">
                <FiClock className="text-green-600 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="datetime-local"
                      // value={new Date(event.startTime)
                      //   .toISOString()
                      //   .slice(0, 16)} // format as 'YYYY-MM-DDTHH:mm'
                      value={(() => {
                        const d = new Date(event.startTime);
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const day = String(d.getDate()).padStart(2, "0");
                        const hours = String(d.getHours()).padStart(2, "0");
                        const minutes = String(d.getMinutes()).padStart(2, "0");
                        return `${year}-${month}-${day}T${hours}:${minutes}`;
                      })()}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "startTime",
                            value: new Date(e.target.value).toISOString(), // convert back to full ISO format
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <span className="self-center">to</span>
                    {/* <input
                      type="time"
                      value={new Date(event.endTime)
                        .toISOString()
                        .substr(11, 5)}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "endTime",
                            value: new Date(
                              new Date(event.endTime)
                                .toISOString()
                                .split("T")[0] +
                                "T" +
                                e.target.value
                            ).toISOString(),
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    /> */}
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "endTime",
                            value: new Date(e.target.value).toISOString(), // convert back to full ISO format
                          },
                        })
                      }
                      value={(() => {
                        const d = new Date(event.endTime);
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const day = String(d.getDate()).padStart(2, "0");
                        const hours = String(d.getHours()).padStart(2, "0");
                        const minutes = String(d.getMinutes()).padStart(2, "0");
                        return `${year}-${month}-${day}T${hours}:${minutes}`;
                      })()}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900 font-medium">
                    {new Date(event.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Role Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiUsers className="mr-2" /> Event Roles
          </h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {event?.role?.length || 0} Roles
          </span>
        </div>

        {isEditing && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Role
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole.role_name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, role_name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slots Available
                </label>
                <input
                  type="number"
                  min="1"
                  value={newRole.maxVolunteers}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      maxVolunteers: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newRole.newSkill}
                    onChange={(e) =>
                      setNewRole({
                        ...newRole,
                        newSkill: e.target.value,
                      })
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-l-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Add skill and press Enter"
                  />
                  <button
                    onClick={() => {
                      setNewRole((prev) => {
                        if (prev.skills.includes(prev.newSkill)) {
                          toast.error("Skill Already Added");
                          return prev;
                        }
                        return {
                          ...prev,
                          skills: [...prev.skills, prev.newSkill], // create new array
                          newSkill: "", // reset newSkill
                        };
                      });
                    }}
                    className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newRole.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setNewRole({
                            ...newRole,
                            skills: newRole.skills.filter((s) => s !== skill),
                          })
                        }
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddRole}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Role
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event?.role?.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ y: isEditing ? 0 : -5 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6 overflow-x-auto">
                <div className="flex items-start justify-between">
                  {isEditing ? (
                    <input
                      type="text"
                      value={role.role_name}
                      onChange={(e) =>
                        handleRoleChange(role.id, "role_name", e.target.value)
                      }
                      className="text-xl font-semibold text-gray-800 mb-2 w-full p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {role.role_name}
                    </h3>
                  )}
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={role.maxVolunteers}
                        onChange={(e) => {
                          handleRoleChange(
                            role.id,
                            "maxVolunteers",
                            parseInt(e.target.value) || 1
                          );
                        }}
                        className="w-12 p-1 border border-gray-300 rounded text-center"
                      />
                    ) : (
                      `${role.maxVolunteers} slots`
                    )}
                  </span>
                </div>

                {isEditing ? (
                  <textarea
                    value={role.description}
                    onChange={(e) =>
                      handleRoleChange(role.id, "description", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-600 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="2"
                  />
                ) : (
                  <p className="text-gray-600 text-sm mb-4">
                    {role.description}
                  </p>
                )}

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Required Skills:
                  </h4>
                  {isEditing ? (
                    <div>
                      <div className="flex mb-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddSkill(role.id)
                          }
                          className="flex-1 p-2 border border-gray-300 rounded-l-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Add skill"
                        />
                        <button
                          onClick={() => handleAddSkill(role.id)}
                          className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(role.id, skill)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-4 border-gray-200" />
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditRoleId(role?.id);
                      setIsEditing(true);
                      setIsOpenVolunteerPopup(true);
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm sm:text-base"
                  >
                    Assign Volunteer
                  </button>
                )}

                {isEditing && (
                  <div className=" flex flex-col gap-1">
                    <button
                      onClick={() => handleRemoveRole(role.id)}
                      className="mt-4 w-full py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Remove Role
                    </button>
                    <button
                      onClick={() => {
                        setEditRoleId(role?.id);
                        setIsEditing(true);
                        setIsOpenVolunteerPopup(true);
                      }}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm sm:text-base w-full"
                    >
                      Assign Volunteer
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isOpenVolunteerPopup && (
            <AssignVolunteer
              isOpen={isOpenVolunteerPopup}
              setIsOpen={setIsOpenVolunteerPopup}
              roleId={editRoleId}
              eventId={event.id}
              volunteers={
                event.role.find((value) => value.id === editRoleId)
                  ?.volunteers || []
              }
              handleAssignVolunteer={handleAssignVolunteer}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EditEventCard;
