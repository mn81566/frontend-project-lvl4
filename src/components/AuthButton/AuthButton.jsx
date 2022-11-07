import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AuthContext, { isTokenExists } from '../../contexts/AuthContext.js';

function AuthButton() {
  // const auth = useAuth();
  const location = useLocation();
  // const isTokenExists = localStorage.getItem('userId');
  const { logOut } = useContext(AuthContext);

  return (
    isTokenExists() && (
      <Button onClick={() => logOut()} as={Link} to="/login" state={{ from: location }}>
        Log out
      </Button>
    )
  );
}

export default AuthButton;
