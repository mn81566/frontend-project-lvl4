import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../app/thunks.jsx';

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // eslint-disable-next-line
      state.messages = action.payload.messages;
    });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
