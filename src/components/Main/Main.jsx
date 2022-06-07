import React, { Component, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext.js';
import { Provider, useDispatch, useSelector } from 'react-redux';
// import { getChats } from '../../slices/chatSlice.js';
import { fetchChats, selectors } from '../../slices/chatSlice.js';

const Main = () => {
  const { isAuthorized } = useContext(AuthContext);
  const dispatch = useDispatch();
  // console.log('isAuthorized', isAuthorized);
  // const token = localStorage.get('token');

  // const chatsData = useSelector((state) => state.chat.chats);
  const chatsData = useSelector(selectors.selectAll);

  useEffect(() => {
    // dispatch(getChats(chatsData));
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <>
      <div>isAuthorized: {isAuthorized}</div>
      <div>Main page</div>
      <div>
        <h3>Chats</h3>
        {/* <div>{chatsData}</div> */}
      </div>
    </>
  );
};

export default Main;
