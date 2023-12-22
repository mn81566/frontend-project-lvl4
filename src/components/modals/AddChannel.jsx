/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field,
} from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import cn from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';
import { closeModal } from '../../slices/modalSlice.js';
import 'react-toastify/dist/ReactToastify.css';

const AddChannel = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const { channels } = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const AddChannelSchema = yup.object().shape({
    // prettier-ignore
    channelName: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .notOneOf([channels.map((channel) => channel.name)], t('error.mustBeUnique')),
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
      validateOnBlur={false}
      onSubmit={async (values, { resetForm }) => {
        const { channelName } = values;
        api.addNewChannel(channelName);
        resetForm({ channelName: '' });
        notify();
        handleClose();
      }}
    >
      {({ errors, touched }) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{t('channels.addСhannel')}</Modal.Title>
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
              <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
              {errors.channelName && touched.channelName ? (
                <div className="invalid-feedback">{errors.channelName}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  {t('interfaces.cancel')}
                </Button>
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled=""
                >
                  {t('interfaces.send')}
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
};

export default AddChannel;
