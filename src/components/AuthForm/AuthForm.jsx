import React, { useContext } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useState } from 'react';
// import routes from "../../../server/routes.js";
import axios from 'axios';
import { useAuth } from 'react-use-auth';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';
import { AuthSchema } from '../../app/utils/validate.js';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
  // const [isFailedValidation, setIsFailedValidation] = useState(true);
  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { logIn } = useContext(AuthContext);
  const { t } = useTranslation();

  // const AuthSchema = yup.object().shape({
  //   // prettier-ignore
  //   username: yup.string()
  //     .required()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!"),
  //   // prettier-ignore
  //   password: yup.string()
  //     .required()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!"),
  // });

  // const TestSchema = getSchema([]);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        try {
          const {
            data: { token, username },
          } = await axios.post('/api/v1/login', values);
          // const res = await axios.post('/api/v1/login', values);
          // localStorage.setItem('userId', JSON.stringify(token));
          logIn({token, username});
          // const { from } = { from: { pathname: '/' } };
          // navigate(from);
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('auth.loginTitle')}</h1>
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              type="input"
              id="username"
              name="username"
              autoComplete="username"
              required
              className="form-control"
            />
            <label htmlFor="username">{t('auth.nameInput')}</label>
            {errors.username && touched.username ? <span>{errors.username}</span> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              required
              className="form-control"
            />
            <label className="form-label" htmlFor="password">
              {t('auth.passwordInput')}
            </label>
            {errors.password && touched.password ? <span>{errors.password}</span> : null}
          </BootstrapForm.Group>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {t('auth.loginFormButton')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
