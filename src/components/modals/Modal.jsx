import React from 'react';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import { useSelector } from 'react-redux';

export const modals = {
  addChannel: AddChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

const Modal = () => {
  const { type, isOpened } = useSelector((state) => state.modalInfo);

  if (!isOpened || !modals[type]) {
    return null;
  }
  const Component = modals[type];
  return <Component />;
};

export default Modal;
