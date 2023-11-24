import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import useLocalStorage from './useLocalStorage.js';
import ROUTES from '../routes.js';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [username, setUsername] = useLocalStorage('username', null);

  const navigate = useNavigate();

  const logIn = async ({ token, name }) => {
    setUser(token);
    setUsername(name);
  };

  const logOut = () => {
    setUser(null);
    navigate(ROUTES.login, { replace: true });
  };

  const logInCallback = useCallback(logIn, [logIn]);
  const logOutCallback = useCallback(logOut, [logOut]);

  const value = useMemo(
    () => ({
      user,
      username,
      logIn: logInCallback,
      logOut: logOutCallback,
    }),
    [user, username, logInCallback, logOutCallback],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
