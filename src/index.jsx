import React, { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react'; // Provider imports 'rollbar'
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import store from './slices/index.js';
import SocketContext from './contexts/SocketContext.js';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';
import './assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const SocketContextProvider = ({ children }) => {
  const [socket] = useState(io());

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

const rollbarConfig = {
  accessToken: '044de159526e4936b4a119af3d11909a',
  environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const container = document.getElementById('chat');
render(
  <RollbarProvider config={rollbarConfig}>
    <Provider store={store}>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </Provider>
  </RollbarProvider>,
  container,
);
