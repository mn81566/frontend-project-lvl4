import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../app/thunks.jsx';

// export const getMessages = (state, action) => {
//   // eslint-disable-next-line
//   state.messages = [];

//   if (action.payload?.messages) {
//     // eslint-disable-next-line
//     state.messages = action.payload?.messages;
//   }
// };

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
