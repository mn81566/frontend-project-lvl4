import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messageReducer from './messageSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messageReducer,
    modalInfo: modalReducer,
  },
});
