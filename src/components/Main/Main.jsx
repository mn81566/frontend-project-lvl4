import React, { useEffect, useRef } from 'react';
import {
  useDispatch, useSelector,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import fetchData from '../../app/thunks.jsx';
import Channels from '../Channels/Channels.jsx';
import Messages from '../Messages/Messages.jsx';
import './Main.scss';
import { useAuth } from '../../hooks/useAuth.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const channelsData = useSelector((state) => state.channelsInfo.channels);
  const controller = useRef(new AbortController());
  const { current } = controller;
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchData(user, controller.current, t));

    return () => {
      current.abort();
    };
  }, [dispatch, current, user, t]);

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
