
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log("Payload:", payload);
      state.user = payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    isAuthReady: (state)=>{
      state.authReady = true
    }
  }
});

export const { login, logOut, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
