import React, { useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, useFormik } from 'formik';
import { Form as BootstrapForm, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import SocketContext from '../../contexts/SocketContext.js';
import { closeModal } from '../../slices/modalSlice.js';
import { renameChannel, fetchData } from '../../app/thunks.jsx';

const AddChannelSchema = yup.object().shape({
  // prettier-ignore
  channelName: yup.string()
    .required(),
});

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  const { channelId } = useSelector((state) => state.modalInfo.extra);
  const renamedChannelName = useSelector(
    (state) => state.channelsInfo.channels.find((channel) => channel.id === channelId).name
  );

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <Formik
      initialValues={{ channelName: renamedChannelName }}
      validationSchema={AddChannelSchema}
      onSubmit={async (values, { resetForm }) => {
        const channelName = values.channelName;

        try {
          const renameNewChannelDispatchResponse = await dispatch(
            renameChannel({ socket, id: channelId, name: channelName })
          );
          resetForm({ channelName: '' });
          if (renameNewChannelDispatchResponse.meta.requestStatus == 'fulfilled') {
            dispatch(fetchData());
          }
          handleClose();
        } catch (err) {
          throw err;
        }
      }}
    >
      {/* {({ errors, touched, handleSubmit }) => ( */}
      {(props) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Переименовать канал</Modal.Title>
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
                // value={formik.values.channelName}
                value={props.values.channelName}
                innerRef={inputRef}
                required
                className="mb-2 form-control"
              />
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
        </Modal>
      )}
    </Formik>
  );
};

export default RemoveChannel;
