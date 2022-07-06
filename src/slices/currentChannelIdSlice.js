import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../app/thunks.jsx';

const channelsAdapter = createEntityAdapter();
// const initialState = {
//   currentChanelId: '',
// };

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: channelsAdapter.getInitialState(),
  // initialState: channelsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      channelsAdapter.setOne(state, action.payload.currentChannelId);
    });
  },
});

// export const { getChats } = chatSlice.actions;
export const currentChannelIdSelectors = channelsAdapter.getSelectors(
  (state) => state.currentChannelId
);

export default currentChannelIdSlice.reducer;
