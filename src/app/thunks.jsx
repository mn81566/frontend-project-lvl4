import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchData = createAsyncThunk('data/fetchData', async (user, meta, t) => {
  try {
    const fetchedData = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${user}`,
        signal: meta.signal,
      },
    });

    return fetchedData.data;
  } catch (error) {
    if (!error.isAxiosError) {
      toast.error(t('error.unknown'));
    }
    if (error.name === 'AbortError') {
      toast.error(t('error.abortError'));
    } else {
      toast.error(t('error.network'));
    }
    return null;
  }
});

export default fetchData;
