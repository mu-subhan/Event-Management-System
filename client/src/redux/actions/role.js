import axios from "axios";
import { toast } from "react-toastify";

export const createRole = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: "createRole" });
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/role/create-role`,
      roleData,
      { withCredentials: true }
    );
    console.log("role add api call respons eis: ", data);
    dispatch({ type: "createRoleSuccessfull", payload: data });
    return data;
  } catch (error) {
    console.log("error suring event creation!", error);
    dispatch({
      type: "createRoleFailed",
      payload: error.response.data.message,
    });
  }
};
// Delete role action creator
export const deleteRole = (roleId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteRole" });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/role/${roleId}`,
      {
        withCredentials: true,
      }
    );
    if (data.success)
      dispatch({ type: "deleteRoleSuccessfull", payload: data });
    else throw new Error("Event Deletion Failed!");
    toast.success("Deletion SuccessFull!");
    return data;
  } catch (error) {
    toast.error(error?.message || "Deeltion Failed!");
    console.log("error during role deletion!", error);
    dispatch({
      type: "deleteRoleFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
// Assign volunteer to a role
export const assignVolunteerToRole =
  (roleId, eventId, userId) => async (dispatch) => {
    try {
      if (!roleId || !userId || !eventId) {
        toast.error(roleId ? "UserId" : "RoleId", "Not Found!");
        return;
      }
      dispatch({ type: "assignVolunteerToRole" });

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/role/assign-volunteer`,
        { volunteerId: userId, roleId, eventId },
        { withCredentials: true }
      );
      console.log("data is:: ", data);
      if (data.success) {
        dispatch({ type: "assignVolunteerToRoleSuccess", payload: data });
        toast.success("Volunteer assigned successfully!");
      } else {
        throw new Error("Assignment failed!");
      }

      return data;
    } catch (error) {
      console.log("error is :", error);
      toast.error(error?.message || "Assignment failed!");
      dispatch({
        type: "assignVolunteerToRoleFailed",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
