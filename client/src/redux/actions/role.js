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
export const deleteRole = (roleId, eventId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteRole" });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/role/delete-role`,
      {
        params: { roleId, eventId },
        withCredentials: true,
      }
    );

    console.log("role delete api response:", data);
    dispatch({ type: "deleteRoleSuccessfull", payload: data });
    return data;
  } catch (error) {
    console.log("error during role deletion!", error);
    dispatch({
      type: "deleteRoleFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};
