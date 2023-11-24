import React, {
  useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApi.js';

const MessageForm = () => {
  const api = useApi();
  const { currentChannel } = useSelector((state) => state.channelsInfo);
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const [isMessageInputDisable, setIsMessageInputDisable] = useState(false);
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const MessageSchema = yup.object().shape({
    // prettier-ignore
    message: yup.string()
      .required(),
  });

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={MessageSchema}
      onSubmit={async (values, { resetForm }) => {
        const textMessage = filter.clean(values.message);

        try {
          await api.addNewMessage(textMessage, currentChannel);
          setIsMessageInputDisable(true);
          resetForm({ message: '' });
          setIsMessageInputDisable(false);
          inputRef.current.focus();
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
    >
      {() => (
        <Form className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field
              type="textarea"
              id="message"
              name="message"
              innerRef={inputRef}
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              required
              className="border-0 p-0 ps-2 form-control"
              disabled={isMessageInputDisable}
            />
            <Button type="submit" className="btn btn-group-vertical" disabled="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">{t('interfaces.sendMessage')}</span>
            </Button>
            <br />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
