import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from 'react-redux';
import { showModal } from '../../slices/modalSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import cn from 'classnames';
import { useEffect } from 'react';
import { event } from 'jquery';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Channels = () => {
  const dispatch = useDispatch();
  const channelsData = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = useSelector((state) => state.channelsInfo.currentChannel);
  // const [activeButtonId, setActiveButtonId] = useState();
  const { t } = useTranslation();
  const notify = () => toast('Wow so easy!');

  useEffect(() => {
    dispatch(setCurrentChannel(currentChannel));
  }, currentChannel);

  const handleAddChannel = (event) => {
    event.preventDefault();
    dispatch(showModal({ type: 'addChannel' }));
  };

  const handleChannelClick = (id) => {
    setCurrentChannel(id);
    dispatch(setCurrentChannel(id));
  };

  const handleRemoveClick = (id) => {
    dispatch(showModal({ type: 'removeChannel', channelId: id }));
  };

  const handleRenameClick = (id) => {
    dispatch(showModal({ type: 'renameChannel', channelId: id }));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        {/* <button onClick={notify}>W</button> */}
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
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channelsData.map((channel) => (
          // <li key={chanel.id} className="nav-item w-100">
          //   <button
          //     type="button"
          //     key={chanel.id}
          //     className="w-100 rounded-0 text-start text-truncate btn"
          //     onClick={handle}
          //   >
          //     <span className="me-1">#</span>
          //     {chanel.name}
          //   </button>
          // </li>
          <li key={channel.id} className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
              <button
                type="button"
                variant="info"
                // className="w-100 rounded-0 text-start btn"
                className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                  'btn-secondary': channel.id == currentChannel,
                })}
                onClick={() => handleChannelClick(channel.id)}
              >
                {t('channels.tag')} {channel.name}
              </button>
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
                        'btn-secondary': channel.id == currentChannel,
                      }
                    )}
                    variant="link"
                    color="red"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" onClick={() => handleRemoveClick(channel.id)}>
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => handleRenameClick(channel.id)}>
                      Переименовать
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
