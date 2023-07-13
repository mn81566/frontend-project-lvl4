import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import useLocalStorage from './useLocalStorage.jsx';
import ROUTES from '../routes.js';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [username, setUsername] = useLocalStorage('username', null);

  // const currentUser = JSON.parse(localStorage.getItem('user'));
  // const [user, setUser] = useState(currentUser);

  const navigate = useNavigate();

  const logIn = async ({ token, name }) => {
    // setLoggedIn(true);
    // localStorage.setItem('userId', token);

    setUser(token);
    setUsername(name);
    // navigate(ROUTES.root, { replace: true });
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
      username,
      logIn,
      logOut,
    }),
    [user, username, logIn, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  // return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
