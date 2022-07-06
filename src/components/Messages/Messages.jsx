import React from 'react';
import { useSelector } from 'react-redux';
import MessageForm from '../MessageForm/MessageForm.jsx';
import { messagesSelectors } from '../../slices/messageSlice.js';
import { channelsSelectors } from '../../slices/channelsSlice.js';
// import { currentChannelIdSelectors } from '../../slices/currentChannelIdSlice.js';
import _ from 'lodash';

const Messages = () => {
  const messagesData = useSelector(messagesSelectors.selectAll);
  const messagesCount = useSelector(messagesSelectors.selectTotal);
  const currentChannelId = useSelector((state) => state.currentChannelId.currentChannelId);
  const channels = useSelector(channelsSelectors.selectEntities);
  const currentChanelName = _.find(channels, (channel) => channel.id === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChanelName?.name}</b>
            {/* <b># </b> */}
          </p>
          <span className="text-muted">{messagesCount} сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesData.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>: {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Messages;
