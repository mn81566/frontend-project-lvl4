import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import MessageForm from '../MessageForm/MessageForm.jsx';

const scrollToBottom = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
};

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannel);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChanelName = _.find(channels, (channel) => channel.id === currentChannelId);
  const messages = useSelector((state) => state.messagesInfo.messages)
    .filter((message) => message.channelId === currentChannelId);
  const messageBoxId = 'messages-box';
  useEffect(() => {
    scrollToBottom(messageBoxId);
  }, [messages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {t('channels.tag')}
              {' '}
              {currentChanelName?.name}
            </b>
          </p>
          <span className="text-muted">
            {messages.length}
            {' '}
            {t('messages.messages')}
          </span>
        </div>
        <div id={messageBoxId} className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {message.body}
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
