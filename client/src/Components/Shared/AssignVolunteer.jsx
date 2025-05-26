import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function VolunteerAssignPopup({
  isOpen,
  setIsOpen,
  roleId,
  eventId,
  volunteers,
  handleAssignVolunteer,
}) {
  // Search input state
  const [search, setSearch] = useState("");
  // Search results list (from search API)
  const [searchResults, setSearchResults] = useState([]);
  // Suggested volunteers list (from suggest API)
  const [suggestedVolunteers, setSuggestedVolunteers] = useState([]);
  // Track assigned volunteer IDs
  const [assigned, setAssigned] = useState([]);
  const [suggestedVolunteersLoading, setSuggestedVolunteersLoading] =
    useState(false);
  const [searchVolunteersLoading, setSearchVolunteersLoading] = useState(false);

  // Fetch suggested volunteers once when modal opens or roleId changes
  useEffect(() => {
    if (!roleId || !isOpen) {
      setSuggestedVolunteers([]);
      return;
    }
    const fetchSuggested = async () => {
      try {
        setSuggestedVolunteersLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/role-suggest/${roleId}`
        );
        console.log("data response of suggested volunteer !", data);
        if (data.success && Array.isArray(data.suggestedUsers)) {
          setSuggestedVolunteers(
            data.suggestedUsers
              ?.filter(
                (user) =>
                  !volunteers.some((volunteer) => volunteer.id === user.id)
              )
              .map((user) => ({
                id: user.id,
                name: user.name,
                description: user.description,
                skills: user.skills || [],
                interests: user.interests || [],
                picture: user.profileImage || "https://via.placeholder.com/64",
              }))
          );
        } else {
          setSuggestedVolunteers([]);
        }
      } catch (error) {
        console.error("Failed to fetch suggested volunteers:", error);
        setSuggestedVolunteers([]);
      } finally {
        setSuggestedVolunteersLoading(false);
      }
    };

    fetchSuggested();
  }, [roleId]);

  // Search volunteers when `search` changes, with debounce
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchSearchResults = async () => {
        try {
          console.log("eventId: ", eventId);
          setSearchVolunteersLoading(true);
          const { data } = await axios.get(
            `${
              process.env.REACT_APP_SERVER
            }/api/user/search-volunteer?name=${encodeURIComponent(
              search
            )}&event_id=${eventId}`
          );

          if (Array.isArray(data?.users)) {
            setSearchResults(
              data?.users
                ?.filter(
                  (user) =>
                    !volunteers.some((volunteer) => volunteer.id === user.id)
                )
                .map((user) => ({
                  id: user.id,
                  name: user.name,
                  description: user.description || "",
                  skills: user.skills || [],
                  interests: user.interests || [],
                  picture:
                    user.profileImage || "https://via.placeholder.com/64",
                }))
            );
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Failed to fetch search volunteers:", error);
          setSearchResults([]);
        } finally {
          setSearchVolunteersLoading(false);
        }
      };

      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleAssign = (volunteer) => {
    const userId = volunteer.id;
    handleAssignVolunteer(roleId, userId);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6">Assign Volunteers</h2>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search volunteers by name..."
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />

            {/* Search Results */}
            {search.trim() &&
              (searchVolunteersLoading ? (
                <Spinner />
              ) : (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Search Results</h3>
                  {searchResults.length > 0 ? (
                    <div className="space-y-4 max-h-56 overflow-y-auto">
                      {searchResults.map((volunteer) => (
                        <VolunteerCard
                          key={volunteer.id}
                          volunteer={volunteer}
                          assigned={assigned.includes(volunteer.id)}
                          onAssign={() => handleAssign(volunteer)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No volunteers found.</p>
                  )}
                </div>
              ))}

            {/* Suggested Volunteers */}
            <div>
              <h3 className="text-lg font-medium mb-2">Suggested Volunteers</h3>
              {suggestedVolunteersLoading ? (
                <Spinner className={"h-auto"} />
              ) : suggestedVolunteers.length > 0 ? (
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {suggestedVolunteers.map((volunteer) => (
                    <VolunteerCard
                      key={volunteer.id}
                      volunteer={volunteer}
                      assigned={assigned.includes(volunteer.id)}
                      onAssign={() => handleAssign(volunteer)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No suggested volunteers available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VolunteerCard({ volunteer, assigned, onAssign }) {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 shadow-sm">
      <img
        src={volunteer.picture}
        alt={volunteer.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{volunteer.name}</h4>
        <p className="text-gray-600 text-sm mb-1">{volunteer.description}</p>
        <p className="text-xs text-gray-500">
          <strong>Skills:</strong> {volunteer.skills.join(", ")}
        </p>
        <p className="text-xs text-gray-500">
          <strong>Interests:</strong> {volunteer.interests.join(", ")}
        </p>
      </div>
      <button
        onClick={onAssign}
        disabled={assigned}
        className={`px-3 py-1 rounded text-white ${
          assigned
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {assigned ? "Assigned" : "Assign"}
      </button>
    </div>
  );
}
