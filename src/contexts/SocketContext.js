import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export default createContext({
  socket: {},
});
