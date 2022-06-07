import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  chats: [],
};

const chatsAdapter = createEntityAdapter();

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
  console.log('ACTUUUAL Token', localStorage.getItem('token'));
  const chats = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return chats.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatsAdapter.getInitialState({ chats: [] }),
  reducers: {
    // getChats: (state, action) => {
    //   const fetchData = async () => {
    //     console.log('state.chats', state.chats);
    //     // state.chats = [...state.chats, chats.data.channels];
    //     // state.chats.push(chats.data.channels);
    //   };
    //   fetchData();
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchChats.fulfilled, (state, action) => {
    //   chatsAdapter.addMany(state, action.payload);
    // });
    builder.addCase(fetchChats.fulfilled, chatsAdapter.addMany);
  },
});

// export const { getChats } = chatSlice.actions;
export const selectors = chatsAdapter.getSelectors((state) => state.chats);

export default chatSlice.reducer;
