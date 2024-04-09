import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react'; // Provider imports 'rollbar'
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import App from './components/App.jsx';
import store from './slices/index.js';
import ApiContext from './contexts/ApiContext.js';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './assets/application.scss';
import api from './api/api.js';
import { addMessage } from './slices/messageSlice.js';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice.js';

const init = () => {
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
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const container = document.getElementById('chat');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript

  root.render(
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <ApiContext.Provider value={api(socket)}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApiContext.Provider>
      </Provider>
    </RollbarProvider>,
    container,
  );
};

init();
