import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react'; // Provider imports 'rollbar'
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import store from './slices/index.js';
import ApiContext from './contexts/ApiContext.js';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './assets/application.scss';
import api from './api/api.js';
import { addMessage } from './slices/messageSlice.js';
import DEFAULT_CHANNEL from './app/common/constants.js';
import { addChannel, removeChannel, setCurrentChannel } from './slices/channelsSlice.js';

const socket = io();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '044de159526e4936b4a119af3d11909a',
  environment: 'testenv',
};

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});
socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload));
  store.dispatch(setCurrentChannel(payload?.id));
});
socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload));
  store.dispatch(setCurrentChannel(DEFAULT_CHANNEL));
});
socket.on('renameChannel', (payload) => {
  store.dispatch(setCurrentChannel(payload));
});

const container = document.getElementById('chat');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
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
