import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChats: (state, action) => {},
  },
});

export const { getChats } = chatSlice.actions;

export default chatSlice.reducer;
