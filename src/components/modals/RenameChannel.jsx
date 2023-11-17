/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Form, Field,
} from 'formik';
import {
  Button, Modal,
} from 'react-bootstrap';
import * as yup from 'yup';
import cn from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.jsx';
import { closeModal } from '../../slices/modalSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import i18next from '../../app/locales';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const inputRef = useRef();
  const { channelId } = useSelector((state) => state.modalInfo.extra);
  const renamedChannelName = useSelector(
    (state) => state.channelsInfo.channels.find((channel) => channel.id === channelId).name,
  );
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const RenameChannelSchema = yup.object().shape({
    // prettier-ignore
    channelNewName: yup.string()
      .required()
      .min(3, i18next.t('error.wrongLength'))
      .max(20, i18next.t('error.wrongLength'))
      .notOneOf([channels.map((channel) => channel.name)], i18next.t('error.mustBeUnique')),
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
      initialValues={{ channelNewName: renamedChannelName }}
      validationSchema={RenameChannelSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { resetForm }) => {
        const { channelNewName } = values;

        try {
          await api.renameChannel({ id: channelId, name: channelNewName });
          notify();
          resetForm({ channelNewName: '' });
          handleClose();
        } catch (e) {
          console.log('Error: ', e);
        }
      }}
    >
      {({ errors, touched }) => (
        <Modal show onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{t('channels.renameСhannel')}</Modal.Title>
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
                id="channelNewName"
                name="channelNewName"
                innerRef={inputRef}
                required
                className={cn({
                  'mb-2': true,
                  'form-control': true,
                  'is-invalid': errors.channelNewName,
                })}
              />
              <label className="visually-hidden" htmlFor="channelNewName">Имя канала</label>
              {errors.channelNewName && touched.channelNewName ? (
                <div className="invalid-feedback">{errors.channelNewName}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <Button onClick={handleClose} className="me-2 btn btn-secondary" value="submit">
                  {t('interfaces.cancel')}
                </Button>
                <Button type="submit" className="btn btn-primary" disabled="">
                  {t('interfaces.send')}
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
