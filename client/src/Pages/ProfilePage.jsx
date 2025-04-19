import { useState } from "react";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import { Home, LogOut } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "../redux/actions/user";
import Loader from "../Components/Shared/Loader";
import Profile from "../Components/Shared/Profile";
import { updateUserInformation } from "../redux/actions/user";
import { toast } from "react-toastify";
const UserProfile = () => {
  // User data state
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { user: userInfo, isLoading } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle array fields (skills/interests)
  const handleArrayChange = (field, value, action) => {
    console.log("field, value, action: ", field, value, action);
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
  const handleSave = async () => {
    try {
      console.log("formData is: ", formData);
      await dispatch(updateUserInformation(formData));
      // await dispatch(loaduser()); // Refresh the user info in Redux
      toast.success("User updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Updation Failed");
    }
    // setUser(userInfo);
    // setIsEditing(false);
  };
  const handleCancel = () => {
    setFormData(userInfo);
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
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default UserProfile;
