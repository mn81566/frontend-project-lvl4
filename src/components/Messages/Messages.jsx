import React from 'react';
import { useSelector } from 'react-redux';
import MessageForm from '../MessageForm/MessageForm.jsx';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesInfo.messages);
  const messagesCount = useSelector((state) => state.messagesInfo.length);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannel);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChanelName = _.find(channels, (channel) => channel.id === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {t('channels.tag')} {currentChanelName?.name}
            </b>
            {/* <b># </b> */}
          </p>
          <span className="text-muted">
            {messagesCount} {t('messages.messages')}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
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
