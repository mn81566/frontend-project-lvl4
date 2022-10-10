import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, useFormik } from 'formik';
import { Form as BootstrapForm, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import SocketContext from '../../contexts/SocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { addNewChannel, fetchData } from '../../app/thunks.jsx';
import cn from 'classnames';

const AddChannel = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { channels } = useSelector((state) => state.channelsInfo);

  // subscribe new channel
  socket.on('newChannel', (payload) => {
    dispatch(setCurrentChannel(payload.id));
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const AddChannelSchema = yup.object().shape({
    // prettier-ignore
    channelName: yup.string()
      .required()
      .min(3, "От 3 до 20 символов!")
      .max(20, "От 3 до 20 символов!")
      .notOneOf([channels.map((channel) => channel.name)], "Должно быть уникальным"),
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={AddChannelSchema}
      validateOnChange={false}
      onSubmit={async (values, { resetForm }) => {
        const channelName = values.channelName;

        try {
          const addNewChannelDispatchResponse = await dispatch(
            addNewChannel({ socket, channelName })
          );
          resetForm({ channelName: '' });
          if (addNewChannelDispatchResponse.meta.requestStatus == 'fulfilled') {
            dispatch(fetchData());
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
            <Modal.Title>Добавить канал</Modal.Title>
            <Button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></Button>
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
              {errors.channelName && touched.channelName ? (
                <div className="invalid-feedback">{errors.channelName}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  Отменить
                </Button>
                <Button type="submit" className="btn btn-primary" disabled="">
                  Отправить
                </Button>
              </div>
            </Form>
            {/* )} */}
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default AddChannel;