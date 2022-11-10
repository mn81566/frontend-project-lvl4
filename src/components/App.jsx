import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Main from './Main/Main';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NoMatch from './NoMatch/NoMatch';
// import { useAuth } from 'react-use-auth';
import useAuth from '../hooks/auth.js';
import AuthContext, { isTokenExists } from '../contexts/AuthContext';
import AuthButton from './AuthButton/AuthButton';
import Modal from './modals/Modal';
import cn from 'classnames';
import { useEffect } from 'react';
import ROUTES from '../routes.js';

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (token) => {
    setLoggedIn(true);
    localStorage.setItem('userId', token);
    // console.log('🚀 ~ file: App.jsx ~ line 28 ~ logIn ~ localStorage', localStorage);
    // auth.login();
  };
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId');
    // console.log('🚀 ~ file: App.jsx ~ line 34 ~ logOut ~ localStorage', localStorage);
    // auth.logout();
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

const App = () => {
  // Как правильно поработать с контекстом?
  // const AuthContext = React.createContext({});
  const auth = useAuth();
  const bolTest = false;

  useEffect(() => {
    console.log('🚀 ~ file: App.jsx ~ line 41 ~ App ~ auth', auth);
    console.log('🚀 ~ file: App.jsx ~ line 53 ~ useEffect ~ auth.loggedIn', auth.loggedIn);
    console.log('🚀 ~ file: App.jsx ~ line 53 ~ useEffect ~ localStorage', localStorage);
    // isAuthorized = auth.isAuthorized();
  }, [auth, localStorage]);

  return (
    <Router>
      {/* <Provider store={store}> */}
      <AuthContextProvider>
        <div className="d-flex flex-column h-100">
          <nav
            className={cn('shadow-sm', 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-white')}
          >
            <div className="container">
              {/* <li>
                  <Link to="/">Main</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li> */}
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <AuthButton />
            </div>
          </nav>

          {/* A <Routes> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
          <Routes>
            {!auth.loggedIn ? (
              <>
                <Route path={ROUTES.login} element={<Login />}></Route>
                <Route path={ROUTES.signup} element={<SignUp />}></Route>
                <Route path="*" element={<Navigate to={ROUTES.login} replace />}></Route>
              </>
            ) : (
              <Route path={ROUTES.root} element={<Main />}>
                <Route path="*" element={<NoMatch />}></Route>
              </Route>
            )}
          </Routes>
          <Modal />
        </div>
      </AuthContextProvider>
      {/* </Provider> */}
    </Router>
  );
};

export default App;
