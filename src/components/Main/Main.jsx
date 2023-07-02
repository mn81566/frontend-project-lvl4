import React, { Component, useContext, useEffect } from 'react';
import {
  Provider, useDispatch, useSelector, batch,
} from 'react-redux';
import AuthContext from '../../contexts/AuthContext.js';
// import { getChats } from '../../slices/chatSlice.js';
import { fetchData } from '../../app/thunks.jsx';
// import { channelsSelectors } from '../../slices/channelsSlice.js';
import Channels from '../Channels/Channels.jsx';
import Messages from '../Messages/Messages.jsx';

import './Main.scss';
// import SocketContext from '../../contexts/SocketContext.js';

function Main() {
  const dispatch = useDispatch();
  // const channelsData = useSelector(channelsSelectors.selectAll);
  const channelsData = useSelector((state) => state.channelsInfo.channels);

  useEffect(() => {
    batch(() => {
      dispatch(fetchData());
    });
  }, [dispatch]);

  return (
    channelsData && (
      <>
        {/* <div>isAuthorized: {isAuthorized}</div> */}
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      </>
    )
  );
}

export default Main;
