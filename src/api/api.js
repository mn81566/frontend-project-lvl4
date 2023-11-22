import { io } from "socket.io-client";
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messageSlice.js';

const socket = io();

const api = {
    addNewMessage: (textMessage, currentChannel) => socket.emit(
      'newMessage',
      { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
    ),
    addNewChannel: (channelName) => socket.emit('newChannel', { name: channelName }),
    renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
    removeChannel: ({ id }) => socket.emit('removeChannel', { id }),
    onAddNewMessage: (dispatch) => socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    }),
    onAddNewChannel: (dispatch) => socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      dispatch(setCurrentChannel(payload?.id));
    }),
    onRemoveChannel: (dispatch) => socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      dispatch(setCurrentChannel(1));
    }),
    onRenameChannel: (dispatch) => socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    }),
  };

  export default api;
  