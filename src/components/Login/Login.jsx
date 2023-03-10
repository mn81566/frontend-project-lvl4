import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';

import AuthForm from '../AuthForm/AuthForm.jsx';

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="http://localhost:8090/assets/images/login.jpg"
                    className="rounded-circle"
                    alt={t('auth.loginTitle')}
                  ></img>
                </div>
                <AuthForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('auth.noAccount')}</span> <a href="/signup">{t('auth.registration')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
