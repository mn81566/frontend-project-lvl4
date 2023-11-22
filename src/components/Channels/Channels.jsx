import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { showModal } from '../../slices/modalSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from '../../app/thunks.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const channelsData = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = useSelector((state) => state.channelsInfo.currentChannel);
  const { t } = useTranslation();

  const handleAddChannel = (event) => {
    event.preventDefault();
    dispatch(showModal({ type: 'addChannel' }));
  };

  const handleChannelClick = (id) => {
    dispatch(setCurrentChannel(id));
    dispatch(fetchData());
  };

  const handleRemoveClick = (id) => {
    dispatch(showModal({ type: 'removeChannel', channelId: id }));
  };

  const handleRenameClick = (id) => {
    dispatch(showModal({ type: 'renameChannel', channelId: id }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <span>{t('channels.title')}</span>
        <button
          type="button"
          onClick={handleAddChannel}
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('interfaces.add')}</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-23 overflow-auto h-100 d-block">
        {channelsData.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
              <Button
                type="button"
                // eslint-disable-next-line react/no-unknown-property
                variant="info"
                className={cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-truncate', {
                  'btn-secondary': channel.id === currentChannel,
                })}
                onClick={() => handleChannelClick(channel.id)}
              >
                {t('channels.tag')}
                {' '}
                {channel.name}
              </Button>
              {channel.removable && (
                <>
                  <Dropdown.Toggle
                    split
                    id="dropdown-custom-2"
                    className={cn(
                      'flex-grow-0',
                      'dropdown-toggle',
                      'dropdown-toggle-split',
                      'btn',
                      {
                        'btn-secondary': channel.id === currentChannel,
                      },
                    )}
                    variant="link"
                    color="red"
                  >
                    <span className="visually-hidden">{t('channels.manageСhannel')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" onClick={() => handleRemoveClick(channel.id)}>
                      {t('interfaces.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => handleRenameClick(channel.id)}>
                      {t('interfaces.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Channels;
