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
import { SignUpSchema } from '../../app/utils/validate.js';
import cn from 'classnames';

const SignUpForm = () => {
  // const [isFailedValidation, setIsFailedValidation] = useState(true);
  const [authData, setAuthData] = useState({
    username: 'admin',
    password: 'admin',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { logIn } = useContext(AuthContext);
  const [isUserExists, setIsUserExists] = useState(false);

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={SignUpSchema}
      onSubmit={async (values) => {
        try {
          const {
            data: { token },
          } = await axios.post('/api/v1/signup', {
            username: values.username,
            password: values.password,
          });
          logIn(token);
          setIsUserExists(false);
          const { from } = { from: { pathname: '/' } };
          navigate(from);
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
          <h1 className="text-center mb-4">Регистрация</h1>
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
            <label htmlFor="username">Имя пользователя</label>
            {errors.username && touched.username ? <span>{errors.username}</span> : null}
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
              Пароль
            </label>
            {errors.password && touched.password ? <span>{errors.password}</span> : null}
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
              Подтвердите пароль
            </label>
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <span>{errors.passwordConfirmation}</span>
            ) : null}
          </BootstrapForm.Group>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
