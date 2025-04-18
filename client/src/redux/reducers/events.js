import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
  isLoading: false,
  event: null,
  events: null,
  success: false,
  error: null,
  allEvents: null,
};

export const eventReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase("createEvent", (state, action) => {
      // console.log("create Event Run!");
      state.isLoading = true;
    })
    .addCase("createEventSuccessfull", (state, action) => {
      // console.log("create Event Success Run");
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("createEventFailed", (state, action) => {
      // console.log("create EVENT Failed Run");
      state.isLoading = false;
      state.event = action.payload;
      state.success = false;
    })
    .addCase("getEvent", (state, action) => {
      state.isLoading = true;
    })
    .addCase("getEventSuccessfull", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("getEventFailed", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = false;
    })
    .addCase("deleteEvent", (state, action) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
    })
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      console.log("action.paylaod is ", action.payload);
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAlleventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state, action) => {
      state.error = action.payload;
      state.success = false;
    });
});
