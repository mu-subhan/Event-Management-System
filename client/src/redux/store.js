import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { eventReducer } from "./reducers/events";
import { roleReducer } from "./reducers/role";
const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    role: roleReducer,
  },
});
export default store;
