import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../app/thunks.jsx';

const channelsAdapter = createEntityAdapter();
const initialState = {
  currentChannelId: '',
};

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  // initialState: channelsAdapter.getInitialState(),
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // channelsAdapter.setOne(state, action.payload.currentChannelId);
      state.currentChannelId = action.payload.currentChannelId;
    });
  },
});

// export const { getChats } = chatSlice.actions;
// export const currentChannelIdSelectors = channelsAdapter.getSelectors(
//   (state) => state.currentChannelId
// );

export default currentChannelIdSlice.reducer;
