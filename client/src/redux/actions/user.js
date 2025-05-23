import axios from "axios";
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
      `${process.env.REACT_APP_SERVER}/api/user/update-user-info`,
      inputData,
      { withCredentials: true }
    );
    console.log("response of Address updation is:", data);
    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log("error during updatign teh User: ", error);
    dispatch({
      type: "updateUserInfoFailed",
      payload: error?.response?.data?.message,
    });
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
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserAddressRequest" });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch({ type: "deleteUserAddressSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
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
