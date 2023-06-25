import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../app/thunks.jsx';

const getChannels = (state, action) => {
  state.channels = [];
  // state.currentChannel = action.payload.currentChannelId;
  action.payload.channels.forEach((channel) => {
    state.channels.push(channel);
  });
};

// const channelsAdapter = createEntityAdapter();
const initialState = {
  channels: [],
  currentChannel: null,
};

// const dispatch = useDispatch();

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      // addNewChannel(payload.channelName);
    },
    // removeChannel: (state) => {
    //   // ...
    //   // setCurrentChannel
    // },
    // changeChannel: (state) => {},
    // renameChannel: (state) => {},
    setCurrentChannel: (state, { payload = 1 }) => {
      if (!payload) {
        payload = 1;
      }
      state.currentChannel = payload;

      // fetchData();
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchData.fulfilled, (state, action) => {
    //   // channelsAdapter.setAll(state, action.payload.channels);
    //   action.payload.channels.forEach((channel) => {
    //     addChanel(channel);
    //   });
    // });
    builder.addCase(fetchData.fulfilled, getChannels);
  },
});

export const { addChannel, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
