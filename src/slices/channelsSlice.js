import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../app/thunks.jsx';

const getChannels = (state, action) => {
  // eslint-disable-next-line
  state.channels = [];
  action.payload.channels.forEach((channel) => {
    state.channels.push(channel);
  });
};

const initialState = {
  channels: [],
  currentChannel: 1,
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
    setCurrentChannel: (state, { payload = 1 }) => {
      if (!payload) {
        // eslint-disable-next-line
        payload = 1;
      }
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
