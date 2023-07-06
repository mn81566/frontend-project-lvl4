import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext.js';
import { useAuth } from '../../hooks/useAuth.jsx';

const AuthButton = () => {
  const { user } = useAuth();
  // const location = useLocation();
  const { logOut } = useContext(AuthContext);
  const { t } = useTranslation();

  return user && <Button onClick={() => logOut()}>{t('auth.logoutButton')}</Button>;
}

export default AuthButton;
