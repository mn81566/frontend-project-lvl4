import { io } from 'socket.io-client';
import store from '../../slices/index.js';
import { addMessage } from '../../slices/messageSlice.js';
import {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} from '../../slices/channelsSlice.js';

const socket = io();

const events = {
  onAddNewMessage: () => socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  }),
  onAddNewChannel: () => socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(setCurrentChannel(payload?.id));
  }),
  onRemoveChannel: () => socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
    store.dispatch(setCurrentChannel(1));
  }),
  onRenameChannel: () => socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  }),
};

export default events;
