/* eslint-disable */

const promisify = (socket, eventName, args) => (
  new Promise((resolve, reject) => socket.emit(eventName, args, (response) => {
    if (response.status === 'ok') {
      resolve(response);
    } else {
      reject(response.error);
    }
  })));

const api = (socket) => ({
  addNewMessage: (textMessage, currentChannel) => promisify(
    socket,
    'newMessage',
    { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
  ),
  addNewChannel: (channelName) => promisify(socket, 'newChannel', { name: channelName }),
  renameChannel: ({ id, name }) => promisify(socket, 'renameChannel', { id, name }),
  removeChannel: ({ id }) => promisify(socket, 'removeChannel', { id }),
});

export default api;
