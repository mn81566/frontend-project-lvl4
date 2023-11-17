import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const fetchedData = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
      },
    });

    return fetchedData.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      // Запрос был отменен
    } else {
      // Обработка других ошибок
    }
    return null;
  }
});
