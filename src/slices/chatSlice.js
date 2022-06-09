import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const chatsAdapter = createEntityAdapter();

export const fetchChats = createAsyncThunk('chats/fetchChannels', async () => {
  console.log('ACTUUUAL Token', localStorage.getItem('token'));
  const chats = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return chats.data.channels;
});

// export const fetchMessages = createAsyncThunk('chats/fetchMessages', async () => {
//   console.log('ACTUUUAL Token', localStorage.getItem('token'));
//   const chats = await axios.get('/api/v1/data', {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });
//   return chats.data.messages;
// });

const chatSlice = createSlice({
  name: 'chat',
  // initialState,
  initialState: chatsAdapter.getInitialState(),
  extraReducers: (builder) => {
    // builder.addCase(fetchChats.fulfilled, (state, action) => {
    //   chatsAdapter.addMany(state, action.payload);
    //   chatsAdapter.addMany(state, action.payload);
    // });
    builder.addCase(fetchChats.fulfilled, chatsAdapter.addMany);
    // builder.addCase(fetchMessages.fulfilled, chatsAdapter.addMany);

    // builder.addCase(fetchChats.fulfilled, chatsAdapter.addOne);
    // builder.addCase(fetchChats.fulfilled, (state, action) => {
    //   chatsAdapter.addMany(state, action.payload.channels);
    //   chatsAdapter.addMany(state, action.payload.messages);
    // });
  },
});

// export const { getChats } = chatSlice.actions;
export const channelsSelectors = chatsAdapter.getSelectors((state) => state.chat);

export default chatSlice.reducer;
