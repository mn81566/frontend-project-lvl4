import React, { useEffect, useRef } from 'react';
import {
  useDispatch, useSelector,
} from 'react-redux';
import fetchData from '../../app/thunks.jsx';
import Channels from '../Channels/Channels.jsx';
import Messages from '../Messages/Messages.jsx';
import './Main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const channelsData = useSelector((state) => state.channelsInfo.channels);
  const controller = useRef(new AbortController());
  const { current } = controller;

  useEffect(() => {
    const { signal } = controller.current;

    dispatch(fetchData(signal));

    return () => {
      current.abort();
    };
  }, [dispatch, current]);

  return (
    channelsData && (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    )
  );
};

export default Main;
