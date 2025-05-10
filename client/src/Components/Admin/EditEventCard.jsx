import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import event from "../../Assessts/event.jpg";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEdit2,
  FiX,
  FiSave,
} from "react-icons/fi";
import VolunteerAssignment from "./VolunteerAssignment";

const EditEventCard = ({ event: initialEvent }) => {
  const [event, setEvent] = useState(initialEvent);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [newRole, setNewRole] = useState({
    role_name: "",
    description: "",
    skills: [],
    slots_available: 1,
  });

  // نیچے والا volunteers کا ڈیٹا شامل کیا ہے (اہم تبدیلی)
  const [volunteers] = useState([
    {
      id: "1",
      name: "Ali Khan",
      email: "ali@example.com",
      skills: ["React", "Node.js", "UI Design"],
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Sara Ahmed",
      email: "sara@example.com",
      skills: ["Graphic Design", "Content Writing"],
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Usman Malik",
      email: "usman@example.com",
      skills: ["Backend Development", "Database Management"],
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ]);

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
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

  const handleAddRole = () => {
    if (newRole.role_name.trim()) {
      setEvent((prev) => ({
        ...prev,
        role: [...prev.role, { ...newRole, id: Date.now().toString() }],
      }));
      setNewRole({
        role_name: "",
        description: "",
        skills: [],
        slots_available: 1,
      });
    }
  };

  const handleRemoveRole = (roleId) => {
    setEvent((prev) => ({
      ...prev,
      role: prev.role.filter((role) => role.id !== roleId),
    }));
  };

  const handleSave = async () => {
    try {
      // Add your API call to save the event here
      // await axios.put(`${process.env.REACT_APP_SERVER}/api/event/${event.id}`, event, { withCredentials: true });
      toast.success("Event updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  const handleCancel = () => {
    setEvent(initialEvent);
    setIsEditing(false);
  };

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
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center ${statusColors[event.status.toLowerCase()] || "bg-gray-100 text-gray-800"}`}
                >
                  {event.status}
                </div>
              </div>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-all text-red-600"
                    >
                      <FiX />
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-all text-green-600"
                    >
                      <FiSave />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-all"
                  >
                    <FiEdit2 className="text-gray-800" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
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

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                {isEditing ? (
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
                ) : (
                  <p className="text-gray-900 font-medium">
                    {new Date(event.startTime).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-50 rounded-full">
                <FiClock className="text-green-600 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      value={new Date(event.startTime)
                        .toISOString()
                        .substr(11, 5)}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "startTime",
                            value: new Date(
                              new Date(event.startTime)
                                .toISOString()
                                .split("T")[0] +
                                "T" +
                                e.target.value
                            ).toISOString(),
                          },
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="self-center">to</span>
                    <input
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
                  value={newRole.slots_available}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      slots_available: parseInt(e.target.value) || 1,
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
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    className="flex-1 p-2 border border-gray-300 rounded-l-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Add skill and press Enter"
                  />
                  <button
                    onClick={() => handleAddSkill()}
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
              <div className="p-6">
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
                        value={role.slots_available}
                        onChange={(e) =>
                          handleRoleChange(
                            role.id,
                            "slots_available",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 p-1 border border-gray-300 rounded text-center"
                      />
                    ) : (
                      `${role.slots_available} slots`
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

                {/* یہاں پر اہم تبدیلی کی ہے - VolunteerAssignment کو شامل کیا ہے */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Assign Volunteer
                  </label>
                  <VolunteerAssignment
                    role={role}
                    volunteers={volunteers} // Make sure this is passed
                    assignedVolunteer={selectedVolunteers[role.id] || null}
                    onAssign={(volunteerId) => {
                      console.log("Assigning volunteer:", volunteerId); // Debug log
                      handleSelect(role.id, volunteerId);
                    }}
                    disabled={isEditing}
                  />
                </div>

                {isEditing && (
                  <button
                    onClick={() => handleRemoveRole(role.id)}
                    className="mt-4 w-full py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Remove Role
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default EditEventCard;
