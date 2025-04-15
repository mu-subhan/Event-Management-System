import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import { Home, LogOut } from "lucide-react";

const Profile = ({
  user,
  userInfo,
  setUser,
  isEditing,
  setIsEditing,
  formData,
  handleCancel,
  handleSave,
  handleArrayChange,
  handleChange,
}) => {
  // preset Values
  const [menuItems, setMenuItems] = useState([
    { path: "/profile", name: "Profile", icon: <Home size={20} /> },
    {
      //   path: "/Logout",
      name: "Logout",
      icon: <LogOut size={20} />,
      calback: () => {
        axios
          .get(`${process.env.REACT_APP_SERVER}/api/user/logout`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              toast.success("Logout SUccessfully!");
              dispatch(logoutUser());
            } else {
              toast.error("Error During Logout!");
              console.log(res.data);
              // console.log(res);
            }
          })
          .catch((error) => {
            console.log("Something Went Wrong", error);
          });
      },
    },
  ]);
  //   useEffect
  useEffect(() => {
    console.log("useEffect Run : ", menuItems);
    if (
      userInfo?.role === "Admin" &&
      !menuItems.some((item) => item.name === "Dashboard")
    ) {
      setMenuItems((prev) => [
        ...prev,
        {
          path: "/admin/dashboard",
          name: "Dashboard",
          icon: <Home size={20} />,
        },
      ]);
    }
  }, [menuItems]);
  return (
    <div className="flex">
      <div className="w-[30%]">
        <AdminSidebar menuItems={menuItems} />
      </div>
      <div className="flex-1 p-6 w-[70%]">
        <div className="max-w-md mx-auto my-8 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-center">
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              )}
            </div>
            <h1 className="mt-4 text-xl font-bold text-white">{user.name}</h1>
            <p className="text-indigo-200">{user.email}</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <>
                <div className="space-y-4">
                  <InputField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Phone"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Experience (years)"
                    name="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={handleChange}
                  />

                  <TagInput
                    label="Skills"
                    tags={formData.skills}
                    onAdd={(value) => handleArrayChange("skills", value, "add")}
                    onRemove={(value) =>
                      handleArrayChange("skills", value, "remove")
                    }
                  />

                  <TagInput
                    label="Interests"
                    tags={formData.interests}
                    onAdd={(value) =>
                      handleArrayChange("interests", value, "add")
                    }
                    onRemove={(value) =>
                      handleArrayChange("interests", value, "remove")
                    }
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      About
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <InfoItem label="Phone" value={user.contactNumber} />
                  <InfoItem
                    label="Experience"
                    value={`${user.experienceYears} years`}
                  />
                  <InfoItem label="Skills" value={user.skills.join(", ")} />
                  <InfoItem
                    label="Interests"
                    value={user.interests.join(", ")}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">About</p>
                    <p className="text-gray-900 mt-1">{user.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable sub-components
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-gray-900 mt-1">{value || "Not specified"}</p>
  </div>
);

const TagInput = ({ label, tags, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-2 text-indigo-600 hover:text-indigo-900"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          //   onKeyPress={(e) => e.key === 'Enter' && (onAdd(inputValue), setInputValue('')}
          placeholder={`Add ${label.toLowerCase()}`}
          className="flex-1 border border-gray-300 rounded-l-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={() => {
            onAdd(inputValue);
            setInputValue("");
          }}
          className="px-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Profile;
