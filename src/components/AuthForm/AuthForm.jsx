/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';
import { AuthSchema } from '../../app/utils/validate.js';
import ROUTES from '../../routes.js';
import i18next from '../../app/locales/index.js';

const AuthForm = () => {
  // eslint-disable-next-line
  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });
  const { logIn } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hasWrongUsernamePasswordError, setHasWrongUsernamePasswordError] = useState(false);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={async (values) => {
        try {
          setHasWrongUsernamePasswordError(false);
          const {
            data: { token, username },
          } = await axios.post(ROUTES.loginApi(), values);
          logIn({ token, name: username });
          navigate(ROUTES.root(), { replace: true });
        } catch (err) {
          if (err.response.data.statusCode === 401) {
            setHasWrongUsernamePasswordError(true);
          }

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
              className={cn(
                'form-control',
                {
                  'is-invalid': (errors.username && touched.username) || hasWrongUsernamePasswordError,
                },
              )}
            />
            <label htmlFor="username">{t('auth.nameInput')}</label>
            {errors.username && touched.username ? <div placement="right" className="invalid-tooltip">{errors.username}</div> : null}
          </BootstrapForm.Group>
          <BootstrapForm.Group className="form-floating mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              required
              className={cn(
                'form-control',
                {
                  'is-invalid': (errors.password && touched.password) || hasWrongUsernamePasswordError,
                },
              )}
            />
            <label className="form-label" htmlFor="password">
              {t('auth.passwordInput')}
            </label>
            {errors.password && touched.password ? <div placement="right" className="invalid-tooltip">{errors.password}</div> : null}
            {hasWrongUsernamePasswordError ? <div placement="right" className="invalid-tooltip">{i18next.t('error.wrongNameOrPassword')}</div> : null}
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
