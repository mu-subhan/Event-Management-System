import axios from "axios";
import { toast } from "react-toastify";

export const createevent = (eventdata) => async (dispatch) => {
  try {
    dispatch({ type: "createEvent" });
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/event/create-event`,
      eventdata,
      { withCredentials: true }
    );
    dispatch({ type: "createEventSuccessfull", payload: data });
  } catch (error) {
    console.log("error suring event creation!", error);
    dispatch({
      type: "createEventFailed",
      payload: error.response.data.message,
    });
  }
};

export const getEventsBYId = (id) => async (dispatch) => {
  try {
    // console.log("get All Events Funtion run!");
    dispatch({ type: "getEvent" });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/event/${id}`,
      { withCredentials: true }
    );
    dispatch({ type: "getEventSuccessfull", payload: data.events });
    console.log("data of Events Get  :: ", data.events);
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "getEventFailed",
      payload: error.response.data.message,
    });
  }
};
export const deleteEvent = (id) => async (dispatch) => {
  try {
    console.log("deleet Event func", id);
    dispatch({ type: "deleteEvent" });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/event/events/${id}`,
      { withCredentials: true }
    );
    console.log("delete event data: ", data);
    dispatch({ type: "deleteEventSuccess", payload: data });

    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
    return false;
  }
};

// get all events
export const getAllEvents =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAlleventsRequest",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/event/events/?page=${page}`
      );
      console.log("all Events before dispatch Are: ", data);
      dispatch({
        type: "getAlleventsSuccess",
        payload: data,
      });
      console.log("all Events after dispatch Are: ", data);
    } catch (error) {
      console.log("error during getting all events!", error);
      dispatch({
        type: "getAlleventsFailed",
        payload: error?.response?.data?.message,
      });
    }
  };
// get all events
export const getEventsCount = () => async (dispatch) => {
  try {
    dispatch({
      type: "getEventsCountRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/event/status-counts`
    );
    console.log("all Events COunt  Are: ", data);
    dispatch({
      type: "getEventsCountSuccess",
      payload: data.eventsCount,
    });
  } catch (error) {
    // console.log("error during getting all events!", error);
    dispatch({
      type: "getEventsCountFailed",
      payload: error.response.data.message,
    });
  }
};

export const requestJoinEvent = (eventId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "requestJoinEvent" });

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/event/request-join`,
      { eventId, userId },
      { withCredentials: true }
    );

    dispatch({ type: "requestJoinEventSuccess", payload: data });
    toast.success("Join request sent successfully!");
    return { success: true, message: "Join request sent successfully!" };
  } catch (error) {
    console.error("Error sending join request!", error);
    dispatch({
      type: "requestJoinEventFailed",
      payload: error.response?.data?.error || error.message,
    });
    toast.error("Error sending join request!");
    return {
      success: false,
      message: error.response?.data?.error || error.message,
    };
  }
};
