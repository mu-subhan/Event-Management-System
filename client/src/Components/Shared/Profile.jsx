import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import { Home, LogOut, User, Edit, X, Check, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  setFormData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([
    { path: "/profile", name: "Profile", icon: <User size={20} /> },
    {
      name: "Logout",
      icon: <LogOut size={20} />,
      callback: () => {
        axios
          .get(`${process.env.REACT_APP_SERVER}/api/user/logout`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              toast.success("Logged out successfully!");
              dispatch(logoutUser());
              navigate("/");
            } else {
              toast.error("Error during logout!");
            }
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
      },
    },
  ]);

  useEffect(() => {
    if (userInfo?.role === "Admin") {
      setMenuItems((prev) => {
        if (!prev.some((item) => item.name === "Dashboard")) {
          return [
            ...prev,
            {
              path: "/admin/dashboard",
              name: "Dashboard",
              icon: <Home size={20} />,
            },
          ];
        }
        return prev;
      });
    }
    setFormData(userInfo);
  }, [userInfo]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="lg:w-64 w-full lg:min-h-screen bg-white shadow-sm">
        <AdminSidebar menuItems={menuItems} />
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-center relative">
              <div className="relative inline-block">
                {userInfo?.profileImage?.url ? (
                  <img
                    src={userInfo.profileImage.url}
                    alt={userInfo.name}
                    className="w-24 h-24 rounded-full border-4 border-white/80 object-cover shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white/80 bg-indigo-400 flex justify-center items-center shadow-md">
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4 text-indigo-600" />
                  </button>
                )}
              </div>
              <h1 className="mt-4 text-2xl font-bold text-white">
                {userInfo?.name}
              </h1>
              <p className="text-indigo-100 mt-1">{userInfo?.email}</p>
            </div>

            <div className="p-6 sm:p-8">
              {isEditing ? (
                <>
                  <div className="space-y-5">
                    <InputField
                      label="Name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Phone"
                      name="contactNumber"
                      value={formData.contactNumber || ""}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Experience (years)"
                      name="experienceYears"
                      type="number"
                      value={formData.experienceYears || ""}
                      onChange={handleChange}
                    />
                    <TagInput
                      label="Skills"
                      tags={formData.skills || []}
                      onAdd={(value) =>
                        handleArrayChange("skills", value, "add")
                      }
                      onRemove={(value) =>
                        handleArrayChange("skills", value, "remove")
                      }
                    />
                    <TagInput
                      label="Interests"
                      tags={formData.interests || []}
                      onAdd={(value) =>
                        handleArrayChange("interests", value, "add")
                      }
                      onRemove={(value) =>
                        handleArrayChange("interests", value, "remove")
                      }
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        value={formData.description || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password || ""}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current"
                    />
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Check className="w-4 h-4 mr-2" /> Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-5">
                    <InfoItem
                      label="Phone"
                      value={userInfo?.contactNumber || "Not specified"}
                    />
                    <InfoItem
                      label="Experience"
                      value={
                        userInfo?.experienceYears
                          ? `${userInfo.experienceYears} years`
                          : "Not specified"
                      }
                    />
                    <InfoItem
                      label="Skills"
                      value={
                        userInfo?.skills?.length > 0
                          ? userInfo.skills.join(", ")
                          : "Not specified"
                      }
                    />
                    <InfoItem
                      label="Interests"
                      value={
                        userInfo?.interests?.length > 0
                          ? userInfo.interests.join(", ")
                          : "Not specified"
                      }
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        About
                      </p>
                      <p className="text-gray-800">
                        {userInfo?.description || "No description provided"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-8 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components

const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
    />
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

const TagInput = ({ label, tags, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-1.5 text-indigo-600 hover:text-indigo-900"
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
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder={`Add ${label.toLowerCase()}`}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
