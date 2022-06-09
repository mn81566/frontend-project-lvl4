import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice.js';
import messageReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    chat: chatReducer,
    message: messageReducer,
  },
});
