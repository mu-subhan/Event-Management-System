import { createReducer, current } from "@reduxjs/toolkit";
const initialstate = {
  isLoading: false,
  role: null,
  roles: null,
  success: false,
  error: null,
};

export const roleReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase("createRole", (state, action) => {
      state.isLoading = true;
    })
    .addCase("createRoleSuccessfull", (state, action) => {
      state.isLoading = false;
      state.role = action.payload;
      state.success = true;
    })
    .addCase("createRoleFailed", (state, action) => {
      state.isLoading = false;
      state.role = action.payload;
      state.success = false;
    })
    .addCase("deleteRole", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteRoleSuccessfull", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("deleteRoleFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
    });
  builder
    .addCase("assignVolunteerToRole", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("assignVolunteerToRoleSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      // Optional: update role/volunteer state here if needed
    })
    .addCase("assignVolunteerToRoleFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state, action) => {
      state.error = action.payload;
      state.success = false;
    });
});
