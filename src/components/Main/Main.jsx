import React, { Component, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext.js';
import { Provider, useDispatch, useSelector, batch } from 'react-redux';
// import { getChats } from '../../slices/chatSlice.js';
import fetchData from '../../app/thunks.jsx';
import { fetchChats, channelsSelectors } from '../../slices/chatSlice.js';
import { fetchMessages, messagesSelectors } from '../../slices/messageSlice.js';
import MessageForm from '../MessageForm/MessageForm.jsx';

import './Main.scss';

const Main = () => {
  // const { isAuthorized } = useContext(AuthContext);
  const dispatch = useDispatch();
  // console.log('isAuthorized', isAuthorized);
  // const token = localStorage.get('token');

  // const chatsData = useSelector((state) => state.chat.chats);
  // const chatsData = useSelector(selectors.selectAll)[0];
  const channelsData = useSelector(channelsSelectors.selectAll);
  const messagesData = useSelector(messagesSelectors.selectAll);
  console.log('channelsData!!!!!!!!!!', channelsData);
  console.log('messagesData!!!!!!!!!!', messagesData);

  useEffect(() => {
    // dispatch(getChats(chatsData));
    batch(() => {
      // Переделать
      dispatch(fetchData());
      // dispatch(fetchChats());
      // dispatch(fetchMessages());
    });
    console.log('channelsData!!!!!!!!!!', channelsData);
    console.log('messagesData!!!!!!!!!!', messagesData);
  }, [dispatch]);

  // if (chatsData.length === 0) {
  //   return;
  // }

  // return <span>asd</span>;
  return (
    channelsData && (
      <>
        {/* <div>isAuthorized: {isAuthorized}</div> */}
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {channelsData.map((chanel) => (
                <li key={chanel.id} className="nav-item w-100">
                  <button
                    type="button"
                    key={chanel.id}
                    className="w-100 rounded-0 text-start text-truncate btn"
                  >
                    <span className="me-1">#</span>
                    {chanel.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># general</b>
                </p>
                <span className="text-muted">111 сообщений</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messagesData.map((message) => (
                  <div key={message.id} className="text-break mb-2">
                    <b>{message.text}</b>: {message.text}
                  </div>
                ))}
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Main;
