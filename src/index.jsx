import React, { useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
// import ErrorBoundary from './components/ErrorBoundary.jsx';
import store from './slices/index.js';
// import SocketContext from './contexts/SocketContext.js';
// import app from '../server/plugin.js';
import SocketContext from './contexts/SocketContext.js';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(io());

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

const container = document.getElementById('chat');
render(
  <Provider store={store}>
    <SocketContextProvider>
      {/* <ErrorBoundary> */}
      <App />
      {/* </ErrorBoundary> */}
    </SocketContextProvider>
  </Provider>,
  container
);
