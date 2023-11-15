import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import useLocalStorage from './useLocalStorage.js';
import ROUTES from '../routes.js';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [username, setUsername] = useLocalStorage('username', null);

  const navigate = useNavigate();

  // eslint-disable-next-line no-shadow
  const logIn = async ({ token, username }) => {
    setUser(token);
    setUsername(username);
  };

  const logOut = () => {
    setUser(null);
    navigate(ROUTES.login, { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      username,
      logIn,
      logOut,
    }),
    [user, username, logIn, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
