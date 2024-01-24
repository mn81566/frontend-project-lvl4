import { io } from 'socket.io-client';

const socket = io();

const api = {
  addNewMessage: (textMessage, currentChannel, callback) => socket.timeout(5000).emit(
    'newMessage',
    { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
    () => {
      callback();
    },
  ),
  addNewChannel: (channelName, callback) => socket.emit(
    'newChannel',
    { name: channelName },
    () => {
      callback();
    },
  ),
  renameChannel: ({ id, name }, callback) => socket.emit(
    'renameChannel',
    { id, name },
    () => {
      callback();
    },
  ),
  removeChannel: ({ id }, callback) => socket.emit(
    'removeChannel',
    { id },
    () => {
      callback();
    },
  ),
};

export default api;
