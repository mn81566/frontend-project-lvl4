import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../app/thunks.jsx';

// const channelsAdapter = createEntityAdapter();
const initialState = {
  channels: [],
  currentChannel: null,
};

const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChanel: (state, { payload }) => {
      state.channels.push(payload.channel);
    },
    removeChannel: (state) => {
      // ...
      // setCurrentChannel
    },
    changeChannel: (state) => {},
    renameChannel: (state) => {},
    setCurrentChannel: (state) => {},
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchData.fulfilled, chatsAdapter.setAll);
    builder.addCase(fetchData.fulfilled, (state, action) => {
      channelsAdapter.setAll(state, action.payload.channels);
      // state.currentChannelId = action.payload.currentChannelId;
    });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
