import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form, Field, useFormik,
} from 'formik';
import {
  Form as BootstrapForm, Button, Modal, FormGroup, FormControl,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../contexts/SocketContext.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalSlice.js';
import { removeChannel, fetchData } from '../../app/thunks.jsx';
import 'react-toastify/dist/ReactToastify.css';

function RemoveChannel() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const channelId = useSelector((state) => state.modalInfo.extra.channelId);
  const { t } = useTranslation();

  // subscribe remove channel
  socket.on('removeChannel', (payload) => {
    dispatch(setCurrentChannel(1));
  });

  const handleClose = () => dispatch(closeModal());

  const notify = () => {
    toast.success(t('notifies.removeChannel'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <Formik
      initialValues={{ id: '' }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const removeChannelDispatchResponse = await dispatch(
            removeChannel({ socket, channelId }),
          );
          // resetForm({ channelName: '' });
          if (removeChannelDispatchResponse.meta.requestStatus == 'fulfilled') {
            dispatch(fetchData());
            notify();
          }
          handleClose();
        } catch (err) {
          throw err;
        }
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Удалить канал</Modal.Title>
            <Button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            />
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  Отменить
                </Button>
                <Button type="submit" className="btn btn-danger" disabled="">
                  Удалить
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <ToastContainer />
        </Modal>
      )}
    </Formik>
  );
}

export default RemoveChannel;
