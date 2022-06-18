import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import fetchData from '../app/thunks.jsx';

const chatsAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatsAdapter.getInitialState(),
  extraReducers: (builder) => {
    // builder.addCase(fetchData.fulfilled, chatsAdapter.setAll);
    builder.addCase(fetchData.fulfilled, (state, action) => {
      chatsAdapter.setAll(state, action.payload.channels);
    });
  },
});

// export const { getChats } = chatSlice.actions;
export const channelsSelectors = chatsAdapter.getSelectors((state) => state.chat);

export default chatSlice.reducer;
