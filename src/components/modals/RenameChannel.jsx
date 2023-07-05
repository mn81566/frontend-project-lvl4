import React, { useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form, Field
} from 'formik';
import {
  Form as BootstrapForm, Button, Modal, FormGroup, FormControl,
} from 'react-bootstrap';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../contexts/SocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';
import { renameChannel, fetchData } from '../../app/thunks.jsx';
// import { AddChannelSchema } from '../../app/utils/validate.js';
import 'react-toastify/dist/ReactToastify.css';

function RemoveChannel() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  const { channelId } = useSelector((state) => state.modalInfo.extra);
  const renamedChannelName = useSelector(
    (state) => state.channelsInfo.channels.find((channel) => channel.id === channelId).name,
  );
  const channels = useSelector((state) => state.channelsInfo.channels);
  // const schema = getSchema(channels);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  });

  const RenameChannelSchema = yup.object().shape({
    // prettier-ignore
    channelName: yup.string()
      .required()
      .min(3, 'От 3 до 20 символов!')
      .max(20, 'От 3 до 20 символов!')
      .notOneOf([channels.map((channel) => channel.name)], 'Должно быть уникальным'),
  });

  const handleClose = () => dispatch(closeModal());

  const notify = () => {
    toast.success(t('notifies.renameChannel'), {
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
      initialValues={{ channelName: renamedChannelName }}
      validationSchema={RenameChannelSchema}
      onSubmit={async (values, { resetForm }) => {
        const { channelName } = values;

        // try {
        const renameNewChannelDispatchResponse = await dispatch(
          renameChannel({ socket, id: channelId, name: channelName }),
        );
        resetForm({ channelName: '' });
        if (renameNewChannelDispatchResponse.meta.requestStatus == 'fulfilled') {
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
      // {(props) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Переименовать канал</Modal.Title>
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
                // value={formik.values.channelName}
                // value={props.values.channelName}
                innerRef={inputRef}
                required
                className="mb-2 form-control"
              />
              <label class="visually-hidden" for="name">Имя канала</label>
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
          </Modal.Body>
          <ToastContainer />
        </Modal>
      )}
    </Formik>
  );
}

export default RemoveChannel;
