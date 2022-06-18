import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk('chats/fetchChannels', async () => {
  console.log('ACTUUUAL Token', localStorage.getItem('token'));
  const fetchedData = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return fetchedData.data;
});

export default fetchData;
