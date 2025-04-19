import { createReducer, current } from "@reduxjs/toolkit";
const initialstate = {
  isLoading: false,
  event: null,
  events: null,
  success: false,
  error: null,
  allEvents: [],
  eventsCount: null,
  totalPages: null,
  currentPage: null,
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
      state.allEvents = state.allEvents.filter(
        (value, index) => value.id !== action.payload.event.id
      );
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
      if (state.allEvents?.length > 0) {
        state.allEvents.forEach((value) => {
          for (let i = 0; i < action.payload?.events?.length; i++) {
            if (value.id === action.payload?.events[i].id) {
              action.payload.events.splice(i, 1);
            }
          }
        });
        const events = [...state.allEvents, ...action.payload.events];
        state.allEvents = events;
        console.log("state.allEvents: ", state.allEvents);
      } else state.allEvents = action.payload.events;

      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    })
    .addCase("getEventsCountRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getEventsCountSuccess", (state, action) => {
      console.log("action.paylaod is ", action.payload);
      state.isLoading = false;
      state.eventsCount = action.payload;
    })
    .addCase("getEventsCountFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state, action) => {
      state.error = action.payload;
      state.success = false;
    });
});
