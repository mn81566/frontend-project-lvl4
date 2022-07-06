import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.js';

function AuthButton() {
  // const auth = useAuth();
  const location = useLocation();
  const isTokenExists = localStorage.getItem('token');
  const { logOut } = useContext(AuthContext);

  return isTokenExists ? (
    <Button onClick={() => logOut()}>Log out</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Login
    </Button>
  );
}

export default AuthButton;
