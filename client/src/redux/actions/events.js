import axios from "axios";

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
      `${process.env.REACT_APP_SERVER}/api/event/events/${id}`,
      {
        widthCredentials: true,
      }
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
    dispatch({ type: "deleteEvent" });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/event/events/${id}`,
      {
        widthCredentials: true,
      }
    );

    dispatch({ type: "deleteEventSuccess", payload: data });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/event/events`
    );
    console.log("all Events Are: ", data);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    // console.log("error during getting all events!", error);
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};
