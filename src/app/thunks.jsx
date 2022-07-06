import { useContext } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SocketContext from '../contexts/SocketContext.js';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  console.log('ACTUUUAL Token', localStorage.getItem('token'));
  const fetchedData = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return fetchedData.data;
});

// export const addNewMessage = (socket, textMessage) =>
//   createAsyncThunk('messages/addNewMessage', async () => {
//     console.log('THUNK!!! ', textMessage);

//     socket.emit('newMessage', [textMessage]);
//   })();

export const addNewMessage = createAsyncThunk(
  'messages/addNewMessage',
  async ({ socket, textMessage }) => {
    // let isStatusOk = false;
    socket.emit(
      'newMessage',
      { body: textMessage, channelId: 1, username: 'admin' }
      // (response) => {
      //   console.log('THUNK STAAATUS ', response.status);
      //   if (response.status == 'ok') {
      //     isStatusOk = true;
      //   }
      // }
    );
    // return isStatusOk;
  }
);
