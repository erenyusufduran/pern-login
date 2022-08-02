import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthenticated } = authSlicer.actions;

export default authSlicer.reducer;
