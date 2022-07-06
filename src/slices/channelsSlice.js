import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../app/thunks.jsx';

const channelsAdapter = createEntityAdapter();
const initialState = {};

const channelsSlice = createSlice({
  name: 'channel',
  // initialState: channelsAdapter.getInitialState(initialState),
  initialState: channelsAdapter.getInitialState(),
  extraReducers: (builder) => {
    // builder.addCase(fetchData.fulfilled, chatsAdapter.setAll);
    builder.addCase(fetchData.fulfilled, (state, action) => {
      channelsAdapter.setAll(state, action.payload.channels);
      // channelsAdapter.setOne(state, action.payload.channels);
    });
  },
});

// export const { getChats } = chatSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
