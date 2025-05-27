import axios from "axios";
import { toast } from "react-toastify";
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/user/getuser`,
      {
        withCredentials: true,
      }
    );
    console.log("data.user: ", data.user);
    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    console.log("get User Response is:", error);

    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}shop/getseller`,
      {
        withCredentials: true,
      }
    );
    console.log("seller data : ", data);
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    console.log("Load Seller Failed ", error);
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// error.response.data.message

export const updateUserInformation = (inputData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/user/update-profile`,
      inputData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (data.success) {
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
      
      // Reload user data to ensure we have the latest state
      dispatch(loaduser());
      
      return { success: true };
    } else {
      throw new Error(data.message || 'Update failed');
    }
  } catch (error) {
    console.error("Error updating user:", error);
    dispatch({
      type: "updateUserInfoFailed",
      payload: error?.response?.data?.message || error.message,
    });
    return { error: error?.response?.data?.message || error.message };
  }
};

export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}user/update-user-addresses`,
        { country, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );
      // console.log("data is: ", data);
      dispatch({ type: "updateUserAddressSuccess", payload: data.user });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/user/delete-user/${id}`,
      { withCredentials: true }
    );
    dispatch({ type: "deleteUserSuccess", payload: data.message });
    return { success: true, message: data.message };
  } catch (error) {
    dispatch({
      type: "deleteUserFailed",
      payload: error.response?.data?.message || error.message,
    });
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/user/admin-all-users`,
      {
        withCredentials: true,
      }
    );
    console.log("getAllusers Data Is: ", data);
    dispatch({
      type: "getAllUsersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutUser",
    });
  } catch (error) {
    console.log("Logout user Failed:", error);
  }
};
