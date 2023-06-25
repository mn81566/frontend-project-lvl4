import { useDispatch, useSelector } from 'react-redux';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { useContext } from 'react';
import { fetchData, addNewMessage } from '../app/thunks.jsx';
import { setCurrentChannel } from './channelsSlice.js';

export const getMessages = (state, action) => {
  // if (!state?.messages) {
  //   return;
  // }
  state.messages = [];
  // action.payload.messages.forEach((message) => {
  //   state.messages.push(message);
  // });

  // const currentChannelId = useSelector((state) => state.channelsInfo.currentChannel);

  // const currentChannelId = action.payload?.currentChannelId;
  // const currentChannelId = state.channelsInfo.currentChannel;
  if (action.payload?.messages) {
    state.messages = action.payload?.messages;
  }
};

// const messagesAdapter = createEntityAdapter();

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messagesInfo',
  // initialState: messagesAdapter.getInitialState(),
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      addNewMessage(payload.message);
    },
    // getMessages: (state, { payload }) => {
    //   // const currentChannelId = payload.currentChannelId;
    //   // state.messages = action.payload.messages.filter((message) => message.channelId == currentChannelId);

    //   state.messages = state.messages.filter((message) => message.channelId == state.currentChannelId);
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchData.fulfilled, (state, action) => {
  //     messagesAdapter.setAll(state, action.payload.messages);
  //   });
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, getMessages);
    // builder.addCase(setCurrentChannel, getMessages);
  },
});

export const { actions } = messageSlice;
// export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;
