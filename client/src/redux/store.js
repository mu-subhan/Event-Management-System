import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { eventReducer } from "./reducers/events";

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
  },
});
export default store;
