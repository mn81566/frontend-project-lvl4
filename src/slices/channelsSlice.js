import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../app/thunks.jsx';
import DEFAULT_CHANNEL from '../app/common/constants.js';

const getChannels = (state, action) => {
  // eslint-disable-next-line
  state.channels = [];
  action.payload.channels.forEach((channel) => {
    state.channels.push(channel);
  });
};

const initialState = {
  channels: [],
  currentChannel: DEFAULT_CHANNEL,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    // eslint-disable-next-line
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      // eslint-disable-next-line
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      // eslint-disable-next-line
      state.channels.find((channel) => channel.id === payload.id).name = payload.name;
    },
    setCurrentChannel: (state, { payload = DEFAULT_CHANNEL }) => {
      console.log("🚀 ~ payload:", payload)
      // eslint-disable-next-line
      state.currentChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, getChannels);
  },
});

export const {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
