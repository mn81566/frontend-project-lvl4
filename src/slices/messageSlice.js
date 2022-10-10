import { useDispatch } from 'react-redux';
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, addNewMessage } from '../app/thunks.jsx';
import { useContext } from 'react';

const getMessages = (state, action) => {
  state.messages = [];
  action.payload.messages.forEach((message) => {
    state.messages.push(message);
  });
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
      // state.messages.push(payload.message);
      addNewMessage(payload.message);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchData.fulfilled, (state, action) => {
  //     messagesAdapter.setAll(state, action.payload.messages);
  //   });
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, getMessages);
  },
});

export const { actions } = messageSlice;
// export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;
