import React, { useContext, useState, useMemo } from 'react';
import AuthContext from '../contexts/AuthContext.js';
import { useLocalStorage } from './useLocalStorage.jsx';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes.js';

export const AuthContextProvider = ({ children }) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useLocalStorage('user', null);
  console.log('🚀 ~ file: useAuth.jsx ~ line 9 ~ AuthContextProvider ~ user', user);
  console.log('🚀 ~ file: useAuth.jsx ~ line 9 ~ AuthContextProvider ~ user TYPE', typeof user);
  const navigate = useNavigate();

  const logIn = async (token) => {
    // setLoggedIn(true);
    // localStorage.setItem('userId', token);

    setUser(token);
    navigate(ROUTES.root, { replace: true });
  };

  const logOut = () => {
    // setLoggedIn(false);
    // localStorage.removeItem('userId');

    setUser(null);
    navigate(ROUTES.login, { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logIn,
      logOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  // return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
