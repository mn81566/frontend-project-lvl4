import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form,
} from 'formik';
import {
  Button, Modal,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { closeModal } from '../../slices/modalSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import DEFAULT_CHANNEL from '../../app/common/constants.js';

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
        api.removeChannel({ id: channelId })
          .then(() => {
            dispatch(setCurrentChannel(DEFAULT_CHANNEL));
            notify();
            handleClose();
          });
      }}
    >
      {() => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{t('channels.deleteСhannel')}</Modal.Title>
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
              <p className="lead">{t('interfaces.sure')}</p>
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  {t('interfaces.cancel')}
                </Button>
                <Button type="submit" className="btn btn-danger" disabled="">
                  {t('interfaces.delete')}
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
