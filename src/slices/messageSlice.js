import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import axios from 'axios';
import fetchData from '../app/thunks.jsx';

const messagesAdapter = createEntityAdapter();

const messageSlice = createSlice({
  name: 'message',
  initialState: messagesAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      messagesAdapter.setAll(state, action.payload.messages);
    });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.message);

export default messageSlice.reducer;
