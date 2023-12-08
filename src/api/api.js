import { io } from 'socket.io-client';

const socket = io();

const api = {
  addNewMessage: (textMessage, currentChannel) => socket.emit(
    'newMessage',
    { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
  ),
  addNewChannel: (channelName) => socket.emit('newChannel', { name: channelName }),
  renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
  removeChannel: ({ id }) => socket.emit('removeChannel', { id }),
};

export default api;
