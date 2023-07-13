/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';
import { SignUpSchema } from '../../app/utils/validate.js';
// import { ROUTES } from '../../app/system/routes.js'
import ROUTES from '../../routes.js';

const SignUpForm = () => {
  // eslint-disable-next-line
  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });
  const { logIn } = useContext(AuthContext);
  const [isUserExists, setIsUserExists] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={SignUpSchema}
      onSubmit={async (values) => {
        try {
          const {
            data: { token, username },
          } = await axios.post('/api/v1/signup', {
            username: values.username,
            password: values.password,
          });
          logIn({ token, name: username });
          setIsUserExists(false);
          // const { from } = { from: { pathname: '/' } };
          // navigate(from);
          navigate(ROUTES.root, { replace: true });
        } catch (err) {
          if (err.response.status === 409) {
            setIsUserExists(true);
          }
          throw err;
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signup.title')}</h1>
          <BootstrapForm.Group className="form-floating mb-3">
            <Field
              type="input"
              id="username"
              name="username"
              autoComplete="username"
              required
              className={cn('form-control', {
                'is-invalid': (errors.username && touched.username) || isUserExists,
              })}
            />
            <label htmlFor="username">{t('signup.nameInput')}</label>
            {errors.username && touched.username ? <div placement="right" className="invalid-tooltip">{errors.username}</div> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              required
              className={cn('form-control', {
                'is-invalid': (errors.password && touched.password) || isUserExists,
              })}
            />
            <label className="form-label" htmlFor="password">
              {t('signup.passwordInput')}
            </label>
            {errors.password && touched.password ? <div placement="right" className="invalid-tooltip">{errors.password}</div> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              autoComplete="passwordConfirmation"
              required
              className={cn('form-control', {
                'is-invalid':
                  (errors.passwordConfirmation && touched.passwordConfirmation) || isUserExists,
              })}
            />
            <label className="form-label" htmlFor="passwordConfirmation">
              {t('signup.passwordConfirmationInput')}
            </label>
            {errors.passwordConfirmation && touched.passwordConfirmation ? <div placement="right" className="invalid-tooltip">{errors.passwordConfirmation}</div> : null}
          </BootstrapForm.Group>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {t('signup.signupButton')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
