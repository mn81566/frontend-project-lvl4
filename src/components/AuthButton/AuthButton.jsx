import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext.js';
import { useAuth } from '../../hooks/useAuth.jsx';

const AuthButton = () => {
  const { user } = useAuth();
  const { logOut } = useContext(AuthContext);
  const { t } = useTranslation();

  return user && <Button onClick={() => logOut()}>{t('auth.logoutButton')}</Button>;
};

export default AuthButton;
