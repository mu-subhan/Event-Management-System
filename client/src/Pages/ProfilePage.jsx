import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import { Home, LogOut } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "../redux/actions/user";
import Loader from "../Components/Shared/Loader";
import Profile from "../Components/Shared/Profile";
const UserProfile = () => {
  // User data state
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "••••••••", // Masked for display
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    contactNumber: "+1 (555) 123-4567",
    skills: ["React", "Node.js", "UI/UX"],
    interests: ["Open Source", "Mentoring", "Hiking"],
    experienceYears: 5,
    description:
      "Full-stack developer passionate about creating intuitive user experiences.",
  });

  const dispatch = useDispatch();
  const { user: userInfo, isLoading } = useSelector((state) => state.user);

  //   const menuItems = [
  //     { path: "/profile", name: "Dashboard", icon: <Home size={20} /> },
  //     {
  //       path: "/admin/dashboard",
  //       name: "Event-List",
  //       icon: <Calendar size={20} />,
  //     }
  //   ];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle array fields (skills/interests)
  const handleArrayChange = (field, value, action) => {
    if (action === "add" && value && !formData[field].includes(value)) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    } else if (action === "remove") {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    }
  };

  // Save or cancel edits
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <>
      {isLoading || !userInfo ? (
        <Loader />
      ) : (
        <Profile
          user={user}
          userInfo={userInfo}
          setUser={setUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          formData={formData}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleArrayChange={handleArrayChange}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default UserProfile;
