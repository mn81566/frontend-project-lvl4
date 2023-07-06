import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field
} from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import cn from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../contexts/SocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { addNewChannel, fetchData } from '../../app/thunks.jsx';
import 'react-toastify/dist/ReactToastify.css';

const AddChannel = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { channels } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  // subscribe new channel
  socket.on('newChannel', (payload) => {
    dispatch(setCurrentChannel(payload.id));
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const AddChannelSchema = yup.object().shape({
    // prettier-ignore
    channelName: yup.string()
      .required()
      .min(3, 'От 3 до 20 символов!')
      .max(20, 'От 3 до 20 символов!')
      .notOneOf([channels.map((channel) => channel.name)], 'Должно быть уникальным'),
  });

  const handleClose = () => dispatch(closeModal());

  const notify = () => {
    toast.success(t('notifies.addChannel'), {
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
      initialValues={{ channelName: '' }}
      validationSchema={AddChannelSchema}
      validateOnChange={false}
      onSubmit={async (values, { resetForm }) => {
        const { channelName } = values;

        // try {
          const addNewChannelDispatchResponse = await dispatch(
            addNewChannel({ socket, channelName }),
          );
          resetForm({ channelName: '' });
          if (addNewChannelDispatchResponse.meta.requestStatus === 'fulfilled') {
            dispatch(fetchData());
            notify();
          }
          handleClose();
        // } catch (err) {
        //   throw err;
        // }
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Добавить канал</Modal.Title>
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
              <Field
                type="input"
                id="channelName"
                name="channelName"
                innerRef={inputRef}
                required
                className={cn({
                  'mb-2': true,
                  'form-control': true,
                  'is-invalid': errors.channelName,
                })}
              />
              <label className="visually-hidden" for="name">Имя канала</label>
              {errors.channelName && touched.channelName ? (
                <div className="invalid-feedback">{errors.channelName}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  Отменить
                </Button>
                <Button
                  type="submit"
                  lassName="btn btn-primary"
                  disabled=""
                >
                  Отправить
                </Button>
              </div>
            </Form>
            {/* )} */}
          </Modal.Body>
          <ToastContainer />
        </Modal>
      )}

    </Formik>
  );
}

export default AddChannel;
