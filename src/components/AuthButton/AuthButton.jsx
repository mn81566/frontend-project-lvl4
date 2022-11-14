import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';
import { useAuth } from '../../hooks/useAuth.jsx';

const AuthButton = () => {
  const { user } = useAuth();
  console.log('🚀 ~ file: AuthButton.jsx ~ line 9 ~ AuthButton ~ user', user);
  console.log('🚀 ~ file: AuthButton.jsx ~ line 9 ~ AuthButton ~ user TYPE', typeof user);
  const location = useLocation();
  const { logOut } = useContext(AuthContext);

  return user && <Button onClick={() => logOut()}>Выйти</Button>;
};

export default AuthButton;
