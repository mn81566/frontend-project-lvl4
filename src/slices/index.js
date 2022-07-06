import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messageReducer from './messageSlice.js';
import currentChannelIdReducer from './currentChannelIdSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messageReducer,
    currentChannelId: currentChannelIdReducer,
  },
});
