import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react'; // Provider imports 'rollbar'
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import store from './slices/index.js';
import { ApiContext } from './contexts/ApiContext.js';
import { addMessage } from './slices/messageSlice.js';
import { addChannel, setCurrentChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';


import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import './assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '044de159526e4936b4a119af3d11909a',
  environment: 'testenv',
};

const socket = io();
const api = {
  addNewMessage: (textMessage, currentChannel) => socket.emit(
      'newMessage',
      { body: textMessage, channelId: currentChannel, username: JSON.parse(localStorage.getItem('username')) },
  ),
  addNewChannel: ( channelName ) => socket.emit('newChannel', { name: channelName }),
  renameChannel: ( {id, name} ) => socket.emit('renameChannel', { id, name }),
  removeChannel: ({id}) => socket.emit('removeChannel', { id }),
  onAddNewMessage: (dispatch) => socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  }),
  onAddNewChannel: (dispatch) => socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(setCurrentChannel(payload?.id));
  }),
  onRemoveChannel: (dispatch) => socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  }), 
  onRenameChannel: (dispatch) => socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload)); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  }),
}

const container = document.getElementById('chat');
render(
  <RollbarProvider config={rollbarConfig}>
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiContext.Provider>
    </Provider>
  </RollbarProvider>,
  container,
);
