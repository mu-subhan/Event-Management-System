import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEdit2,
  FiX,
  FiSave,
  FiImage,
  FiTrash2,
  FiTag,
  FiUserPlus,
  FiInfo,
  FiGrid,
  FiUserCheck,
} from "react-icons/fi";
// import event from "../../Assessts/event.jpg";
import VolunteerAssignment from "./VolunteerAssignment";
import AssignVolunteer from "../Shared/AssignVolunteer";
import { Buttoen } from "../ui/Button";
import {
  createRole,
  deleteRole,
  assignVolunteerToRole,
} from "../../redux/actions/role";
import { useDispatch } from "react-redux";
import ConfirmDeleteModal from "../Shared/ConfirmDeleteModal";

const EditEventCard = ({ event: initialEvent, onUpdate }) => {
  const dispatch = useDispatch();
  // states
  const [event, setEvent] = useState(initialEvent);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedVolunteers, setSelectedVolunteers] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [eventImages, setEventImages] = useState(initialEvent.images || []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
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

  // Add this helper function at the top level of the component
  // const formatDateForInput = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
  // };
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (initialEvent) {
      setEvent({
        ...initialEvent,
        startTime: formatDateForInput(initialEvent.startTime),
        endTime: formatDateForInput(initialEvent.endTime),
      });
    }
  }, [initialEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => {
      let updatedEvent = { ...prev, [name]: value };

      // Validate dates when either date field changes
      if (name === "startTime" || name === "endTime") {
        const start = new Date(updatedEvent.startTime);
        const end = new Date(updatedEvent.endTime);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start > end) {
          toast.error("End time must be after start time");
          return prev; // Keep previous state if validation fails
        }
      }

      return updatedEvent;
    });
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
      const response = await dispatch(
        assignVolunteerToRole(roleId, eventId, userId)
      );
      if (!response || response?.success === false) {
        return { success: false };
      }
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
  const validateRole = (role) => {
    const { role_name, description, maxVolunteers, skills } = role;

    if (!role_name?.trim()) {
      toast.error("Please enter a valid role name.");
      return false;
    }

    // Check for duplicates excluding the current role by ID
    const isDuplicate = event.role
      .filter((r) => r.id !== role.id)
      .some((r) => r.role_name.trim() === role_name.trim());

    if (isDuplicate) {
      toast.error(`Role name "${role_name}" already exists.`);
      return false;
    }

    if (!description?.trim()) {
      toast.error(`Please enter a description for role "${role_name}".`);
      return false;
    }

    if (!maxVolunteers || isNaN(maxVolunteers) || maxVolunteers <= 0) {
      toast.error(
        `Please enter a valid number of volunteers for "${role_name}".`
      );
      return false;
    }

    if (!skills || skills.length === 0) {
      toast.error(`Please add at least one skill for role "${role_name}".`);
      return false;
    }

    return true;
  };
  const handleEventDetailsUpdate = async () => {
    try {
      console.log("Updating event details:", event);
      // Validate required fields
      if (
        !event.title ||
        !event.description ||
        !event.location ||
        !event.startTime ||
        !event.endTime
      ) {
        toast.error("Please fill in all required fields");
        return;
      }
      for (const role of event.role) {
        if (!validateRole(role)) {
          return; // Stop the save process if any role is invalid
        }
      }

      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);
      const now = new Date();

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        toast.error("Please enter valid start and end dates");
        return;
      }

      if (endDate < startDate) {
        toast.error("End time must be after start time");
        return;
      }

      // Determine event status based on dates
      let status = "UPCOMING";
      if (now >= startDate && now < endDate) {
        status = "ONGOING";
      } else if (now >= endDate) {
        status = "COMPLETED";
      }
      console.log("startTime: ", startDate);
      console.log("endTime: ", endDate);
      const eventData = {
        id: event.id,
        title: event.title.trim(),
        description: event.description.trim(),
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location.trim(),
        createdAt: new Date(event.createdAt).toISOString(),
        updatedAt: new Date().toISOString(),
        role:
          event.role?.map((role) => ({
            id: role.id,
            role_name: role.role_name,
            description: role.description,
            maxVolunteers: parseInt(role.maxVolunteers) || 1,
            skills: Array.isArray(role.skills) ? role.skills : [],
          })) || [],
      };

      console.log("Sending event update data:", eventData);

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/event/${event.id}`,
        eventData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("respose is: ", response);
      // const response = { data: { success: true, event: eventData } };
      if (response.data.success) {
        toast.success("Event details updated successfully!");
        setIsEditing(false);

        // Update local state with the returned data
        if (response.data.event) {
          const updatedEvent = {
            ...response.data.event,
            startTime: formatDateForInput(response.data.event.startTime),
            endTime: formatDateForInput(response.data.event.endTime),
          };
          setEvent((prev) => ({
            ...prev,
            ...updatedEvent,
          }));
          if (onUpdate) onUpdate(updatedEvent);
        }
      } else {
        throw new Error(response.data.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update event details";
      toast.error(errorMessage);
    }
  };

  const handleRoleUpdate = async (roleId, updatedRole) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/role/${roleId}`,
        {
          ...updatedRole,
          event_id: event.id,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        toast.success("Role updated successfully!");
        // Update the local state with the new role data
        setEvent((prev) => ({
          ...prev,
          role: prev.role.map((r) =>
            r.id === roleId ? { ...r, ...response.data } : r
          ),
        }));
      }
    } catch (error) {
      console.error("Role update error:", error);
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleSave = async () => {
    try {
      switch (activeTab) {
        case "details":
          await handleEventDetailsUpdate();
          break;
        case "media":
          // Media updates are already handled by handleImageUpload and handleDeleteImage
          setIsEditing(false);
          break;
        case "roles":
          await handleEventDetailsUpdate();
          // Role updates are handled individually by handleRoleUpdate
          // setIsEditing(false);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    setEvent(initialEvent);
    setIsEditing(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    console.log("Files to upload:", files);

    if (eventImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("eventId", event.id);

    console.log("Event ID being sent:", event.id);
    console.log("Number of files being sent:", files.length);

    try {
      console.log(
        "Sending request to:",
        `${process.env.REACT_APP_SERVER}/api/event/upload-file`
      );

      // const response = await axios.post(
      //   `${process.env.REACT_APP_SERVER}/api/event/upload-file`,
      //   formData,
      //   {
      //     withCredentials: true,
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/event/upload-file`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response.data.success) {
        // Update the eventImages state with the new images
        setEventImages((prevImages) => [
          ...prevImages,
          ...response.data.images,
        ]);
        toast.success("Images uploaded successfully!");
      } else {
        throw new Error(response.data.message || "Failed to upload images");
      }
    } catch (error) {
      console.error("Upload error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to upload images");
    }
  };

  const handleDeleteImageClick = (imageId) => {
    setImageToDelete(imageId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/event/delete-file`,
        {
          withCredentials: true,
          data: {
            images: [{ public_id: imageId }],
          },
        }
      );

      if (response.data.success) {
        setEventImages((prevImages) =>
          prevImages.filter((img) => img.publicId !== imageId)
        );
        toast.success("Image deleted successfully!");
      } else {
        throw new Error(response.data.message || "Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete image");
    }
  };

  const handleConfirmDelete = async () => {
    if (imageToDelete) {
      await handleDeleteImage(imageToDelete);
      setImageToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setImageToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
        activeTab === id
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </motion.button>
  );

  const HeaderButtons = () => (
    <div className="flex items-center gap-3">
      {activeTab !== "media" &&
        (isEditing ? (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-all text-red-600 flex items-center gap-2 shadow-sm border border-gray-200"
            >
              <FiX className="w-4 h-4" /> Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <FiSave className="w-4 h-4" />
              {activeTab === "details"
                ? "Save Event Details"
                : "Save Role Changes"}
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <FiEdit2 className="w-4 h-4" />
            {activeTab === "details" ? "Edit Event Details" : "Edit Roles"}
          </motion.button>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-colors w-full"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {event.title}
                  </h1>
                )}
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[event.status.toLowerCase()]
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
              <HeaderButtons />
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-gray-200 -mx-6 px-6">
              <TabButton id="details" label="Event Details" icon={FiInfo} />
              <TabButton id="media" label="Media Gallery" icon={FiGrid} />
              <TabButton
                id="roles"
                label="Role Management"
                icon={FiUserCheck}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "details" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Event Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 required">
                          Title
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        ) : (
                          <p className="text-gray-800">{event.title}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 required">
                          Start Time
                        </label>
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            name="startTime"
                            value={event.startTime}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiCalendar className="w-4 h-4" />
                            {new Date(event.startTime).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 required">
                          End Time
                        </label>
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            name="endTime"
                            value={event.endTime}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiClock className="w-4 h-4" />
                            {new Date(event.endTime).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 required">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={event.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiMapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Event Description
                    </h3>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={event.description}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[200px]"
                        placeholder="Enter event description..."
                        required
                      />
                    ) : (
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "media" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Media Gallery
                  </h3>
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <FiImage className="w-4 h-4" />
                    <span>Add Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </motion.label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventImages.map((image, index) => (
                    <motion.div
                      key={image.publicId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <img
                        src={image.url}
                        alt={`Event ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteImageClick(image.publicId)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm hover:bg-red-600"
                      >
                        <FiTrash2 size={14} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {eventImages.length === 0 && (
                  <div className="text-center py-12">
                    <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No images uploaded yet</p>
                    <p className="text-gray-400 text-sm">
                      Click "Add Images" to upload event photos
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "roles" && (
              <div className="space-y-6">
                {/* Add New Role Section */}
                {isEditing && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Add New Role
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={newRole.role_name}
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              role_name: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter role name..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Volunteers
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
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={newRole.description}
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          rows="3"
                          placeholder="Enter role description..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Skills
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newRole.newSkill}
                            onChange={(e) =>
                              setNewRole({
                                ...newRole,
                                newSkill: e.target.value,
                              })
                            }
                            className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter skill and press Add"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (newRole.newSkill.trim()) {
                                setNewRole((prev) => ({
                                  ...prev,
                                  skills: [
                                    ...prev.skills,
                                    prev.newSkill.trim(),
                                  ],
                                  newSkill: "",
                                }));
                              }
                            }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
                          >
                            Add
                          </motion.button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {newRole.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                            >
                              {skill}
                              <button
                                onClick={() =>
                                  setNewRole({
                                    ...newRole,
                                    skills: newRole.skills.filter(
                                      (s) => s !== skill
                                    ),
                                  })
                                }
                                className="hover:text-red-500 transition-colors"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddRole}
                      className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm flex items-center gap-2"
                    >
                      <FiUserPlus className="w-4 h-4" /> Add Role
                    </motion.button>
                  </div>
                )}

                {/* Existing Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event?.role?.map((role) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={role.role_name}
                            onChange={(e) => {
                              const updatedRoles = event.role.map((r) =>
                                r.id === role.id
                                  ? { ...r, role_name: e.target.value }
                                  : r
                              );
                              setEvent((prev) => ({
                                ...prev,
                                role: updatedRoles,
                              }));
                            }}
                            className="text-lg font-semibold text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-colors"
                          />
                        ) : (
                          <h3 className="text-lg font-semibold text-gray-900">
                            {role.role_name}
                          </h3>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                          <FiUsers className="w-4 h-4" />
                          {role.maxVolunteers} slots
                        </span>
                      </div>

                      {isEditing ? (
                        <textarea
                          value={role.description}
                          // onChange={(e) => {
                          // const updatedRole = {
                          //   ...role,
                          //   description: e.target.value,
                          // };
                          // handleRoleUpdate(role.id, updatedRole);

                          // }}
                          onChange={(e) => {
                            const updatedRoles = event.role.map((r) =>
                              r.id === role.id
                                ? { ...r, description: e.target.value }
                                : r
                            );
                            setEvent((prev) => ({
                              ...prev,
                              role: updatedRoles,
                            }));
                          }}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                          rows="3"
                        />
                      ) : (
                        <p className="text-gray-600 mb-4">{role.description}</p>
                      )}

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <FiTag className="w-4 h-4" /> Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setEditRoleId(role?.id);
                            setIsEditing(true);
                            setIsOpenVolunteerPopup(true);
                          }}
                          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <FiUserPlus className="w-4 h-4" /> Assign Volunteer
                        </motion.button>
                        {isEditing && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRemoveRole(role.id)}
                            className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                          >
                            <FiTrash2 className="w-4 h-4" /> Remove Role
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />

        {isOpenVolunteerPopup && (
          <AssignVolunteer
            isOpen={isOpenVolunteerPopup}
            setIsOpen={setIsOpenVolunteerPopup}
            roleId={editRoleId}
            eventId={event.id}
            volunteers={
              event.role.find((value) => value.id === editRoleId)?.volunteers ||
              []
            }
            handleAssignVolunteer={handleAssignVolunteer}
          />
        )}
      </div>
    </div>
  );
};

export default EditEventCard;
