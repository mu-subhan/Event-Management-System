import React, { useEffect, useState } from "react";
import {
  Plus,
  UserCheck,
  UserPlus,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import VolunteerForm from "./VolunteerForm";
import VolunteerAssignment from "./VolunteerAssignment";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/actions/user";
const VolunteerStats = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { eventsCount } = useSelector((state) => state.events);
  //states
  const [volunteers, setVolunteers] = useState([]);

  const [availableVolunteers] = useState([
    {
      id: "1",
      name: "Ali Khan",
      email: "ali@example.com",
      skills: ["Event Organizer", "Cleanup Crew"],
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Sara Ahmed",
      email: "sara@example.com",
      skills: ["Food Distribution", "Cleanup Crew"],
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Usman Malik",
      email: "usman@example.com",
      skills: ["Event Organizer", "Food Distribution"],
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ]);

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignedVolunteers, setAssignedVolunteers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const volunteersPerPage = 5;

  // Calculate pagination
  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(
    indexOfFirstVolunteer,
    indexOfLastVolunteer
  );
  const totalPages = Math.ceil(volunteers.length / volunteersPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle volunteer actions
  const handleAddVolunteer = () => {
    setEditingVolunteer(null);
    setShowForm(true);
  };

  const handleEditVolunteer = (volunteer) => {
    setEditingVolunteer(volunteer);
    setShowForm(true);
  };

  const handleDeleteVolunteer = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this volunteer?")) {
        const response = await dispatch(deleteUser(id));
        if (response.success) {
          toast.success("Volunteer deleted successfully!");
          const filterUsers = volunteers.filter(
            (volunteer) => volunteer.id !== id
          );
          setVolunteers(filterUsers);
        } else {
          toast.error("Failed to delete volunteer.");
        }
      }
    } catch (error) {}
  };

  const handleSaveVolunteer = (volunteerData) => {
    if (editingVolunteer) {
      setVolunteers(
        volunteers.map((v) =>
          v.id === editingVolunteer.id ? { ...v, ...volunteerData } : v
        )
      );
    } else {
      const newId = Math.max(...volunteers.map((v) => v.id)) + 1;
      setVolunteers([...volunteers, { ...volunteerData, id: newId }]);
    }
    setShowForm(false);
  };

  const handleAssignVolunteer = (roleId, volunteerId) => {
    setAssignedVolunteers((prev) => ({
      ...prev,
      [roleId]: volunteerId,
    }));
  };

  const handleSaveAssignments = () => {
    // Here you would typically send the assignments to your backend
    console.log("Saved assignments:", assignedVolunteers);
    setShowAssignmentModal(false);
    // You might want to update your volunteers state here
  };
  // useEffect
  useEffect(() => {
    if (users && users.length > 0) {
      const formattedVolunteers = users.map((user, index) => ({
        id: user.id,
        name: user.name || "Unknown Volunteer",
        role: user.role || "Volunteer",
        hours: user.hours || 0,
        events: user.events || 0,
        status: user.status || "Active",
        createdAt: user.createdAt || new Date().toISOString(),
        updatedAt: user.updatedAt || new Date().toISOString(),
      }));
      setVolunteers(formattedVolunteers);
    }
  }, [users]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Active Volunteers */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Volunteers
                </p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {volunteers.filter((v) => v.status === "Active").length}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  +12% from last month
                </p>
              </div>
            </div>
          </div>

          {/* New This Month */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <UserPlus size={20} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  New This Month
                </p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {" "}
                  {volunteers?.length > 0 &&
                    volunteers.filter((vol) => {
                      console.log("vol: ", vol);
                      console.log("vol.createdAt: ", vol.createdAt);
                      const createdAt = new Date(vol.createdAt);
                      console.log("createdAt: ", createdAt);
                      const now = new Date();
                      console.log("now: ", now);
                      return (
                        vol.role === "Volunteer" &&
                        createdAt.getMonth() === now.getMonth() &&
                        createdAt.getFullYear() === now.getFullYear()
                      );
                    }).length}
                </p>
                <p className="text-xs text-blue-600 mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                  +3 from last month
                </p>
              </div>
            </div>
          </div>

          {/* Total Hours */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Hours</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {volunteers.reduce(
                    (sum, volunteer) => sum + volunteer.hours,
                    0
                  )}
                </p>
                <p className="text-xs text-purple-600 mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                  +234 this quarter
                </p>
              </div>
            </div>
          </div>

          {/* Avg. Events */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-50">
                <Award size={20} className="text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {" "}
                  Total Events:{" "}
                </p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  {eventsCount?.length > 0 &&
                    eventsCount.reduce((sum, event) => sum + event.count, 0)}
                </p>
                <p className="text-xs text-amber-600 mt-1 flex items-center">
                  <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Volunteers Button */}
        {/* <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAssignmentModal(true)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Plus size={16} className="mr-2" />
            Assign Volunteers
          </button>{" "}
        </div> */}

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Volunteers
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                List of all volunteers
              </p>
            </div>
            {/* <button 
              onClick={handleAddVolunteer}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Add Volunteer ??
            </button> */}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Headers */}
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Volunteer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Events
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteers.map((volunteer) => (
                  <tr
                    key={volunteer.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {volunteer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{volunteer.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{volunteer.hours}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{volunteer.events}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          volunteer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* <button 
                        onClick={() => handleEditVolunteer(volunteer)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center"
                      >
                        <Pencil size={16} className="mr-1" /> Edit
                      </button> */}
                      <button
                        onClick={() => handleDeleteVolunteer(volunteer.id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{indexOfFirstVolunteer + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastVolunteer, volunteers.length)}
              </span>{" "}
              of <span className="font-medium">{volunteers.length}</span>{" "}
              volunteers
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3.5 py-2 rounded-md border ${
                      currentPage === number
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Volunteer Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <VolunteerForm
                volunteer={editingVolunteer}
                onSave={handleSaveVolunteer}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Volunteer Assignment Modal */}
        {showAssignmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Assign Volunteers to Roles
                </h3>

                {/* Sample roles for demonstration */}
                {[
                  {
                    id: "role1",
                    name: "Event Organizer",
                    skills: ["Event Organizer"],
                  },
                  {
                    id: "role2",
                    name: "Cleanup Crew",
                    skills: ["Cleanup Crew"],
                  },
                  {
                    id: "role3",
                    name: "Food Distribution",
                    skills: ["Food Distribution"],
                  },
                ].map((role) => (
                  <div key={role.id} className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {role.name} (Requires: {role.skills.join(", ")})
                    </h4>
                    <VolunteerAssignment
                      role={role}
                      volunteers={availableVolunteers}
                      assignedVolunteer={assignedVolunteers[role.id]}
                      onAssign={(volunteerId) =>
                        handleAssignVolunteer(role.id, volunteerId)
                      }
                    />
                  </div>
                ))}

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAssignmentModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAssignments}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Save Assignments
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerStats;
