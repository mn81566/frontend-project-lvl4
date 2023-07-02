import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const fetchedData = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
    },
  });

  return fetchedData.data;
});

export const addNewMessage = createAsyncThunk(
  'messages/addNewMessage',
  async ({ socket, textMessage, currentChannel }) => {
    socket.emit(
      'newMessage',
      { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
    );
  },
);

export const addNewChannel = createAsyncThunk(
  'channels/addNewChannel',
  async ({ socket, channelName }) => {
    socket.emit('newChannel', { name: channelName });
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ socket, id, name }) => {
    socket.emit('renameChannel', { id, name });
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ socket, channelId }) => {
    socket.emit('removeChannel', { id: channelId });
  },
);
