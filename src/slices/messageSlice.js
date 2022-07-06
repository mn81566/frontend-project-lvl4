import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, addNewMessage } from '../app/thunks.jsx';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

const messagesAdapter = createEntityAdapter();

const messageSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  // reducers: {
  //   addMessage: messagesAdapter.addOne,
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      messagesAdapter.setAll(state, action.payload.messages);
    });
  },
});

export const { actions } = messageSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;
