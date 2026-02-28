import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login ke waqt
    setUser(state, action) {
      state.user = action.payload.user || action.payload;
      state.token = action.payload.token || null;
      console.log("User set in state:", state.user);
    },

    // 🔥 REAL-TIME PROFILE UPDATE
    updateUser(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload, // updated fields (name, image, etc.)
        };
        console.log("User updated in real-time:", state.user);
      }
    },

    // Logout
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
