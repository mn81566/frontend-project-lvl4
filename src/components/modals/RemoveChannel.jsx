import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form,
} from 'formik';
import {
  Button, Modal,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.jsx';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalSlice.js';
import { removeChannel, fetchData } from '../../app/thunks.jsx';
import 'react-toastify/dist/ReactToastify.css';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const channelId = useSelector((state) => state.modalInfo.extra.channelId);
  const { t } = useTranslation();

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
      onSubmit={async () => {
        // try {
        const removeChannelDispatchResponse = await api.removeChannel({ channelId });
        // resetForm({ channelName: '' });
        if (removeChannelDispatchResponse.meta.requestStatus === 'fulfilled') {
          dispatch(fetchData());
          notify();
        }
        handleClose();
        // } catch (err) {
        //   throw err;
        // }
      }}
    >
      {/* {({ errors, touched, handleSubmit }) => ( */}
      {() => (
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
};

export default RemoveChannel;
