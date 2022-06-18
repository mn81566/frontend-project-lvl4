import React, { useContext } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useState } from 'react';
// import routes from "../../../server/routes.js";
import axios from 'axios';
import { useAuth } from 'react-use-auth';
import { useLocation, useNavigate } from 'react-router-dom';
// import AuthContext from '../../contexts/AuthContext.js';

const MessageForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const auth = useAuth();
  // const { logIn } = useContext(AuthContext);

  const AuthSchema = yup.object().shape({
    // prettier-ignore
    message: yup.string()
      .required()
      .max(9999, "Too Long!"),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        try {
          console.log('values', values);
          const {
            data: { token },
          } = await axios.post('/api/v1/login', values);
          const { from } = { from: { pathname: '/' } };
          navigate(from);
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field
              type="input"
              id="message"
              name="message"
              autoComplete="message"
              required
              className="border-0 p-0 ps-2 form-control"
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
                ></path>
              </svg>
              <span className="visually-hidden">Отправить</span>
            </Button>
            <br />
            {errors.message && touched.message ? <span>{errors.message}</span> : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
