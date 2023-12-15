import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk('data/fetchData', async () => {
  // const { getToken } = useAuth();

  try {
    const fetchedData = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
      },
    });
    console.log("🚀 ~ file: thunks.jsx:13 ~ fetchData ~ JSON.parse(localStorage.getItem('user')):", JSON.parse(localStorage.getItem('user')));

    return fetchedData.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Запрос был отменен
      console.log('🚀 ~ file: thunks.jsx:15 ~ fetchData ~ error.name:', error.name);
    } else {
      // Обработка других ошибок
      console.log('fetch data error');
    }
    return null;
  }
});

export default fetchData;
