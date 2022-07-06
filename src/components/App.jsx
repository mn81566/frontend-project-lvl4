// const React = require("react");
import React, { useState } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Main from './Main/Main';
import Login from './Login/Login';
import NoMatch from './NoMatch/NoMatch';
import { Button } from 'react-bootstrap';
import { useAuth } from 'react-use-auth';
import AuthContext from '../contexts/AuthContext.js';
import AuthButton from './AuthButton/AuthButton';
import { Provider } from 'react-redux';
import cn from 'classnames';

// import store from '../slices/index.js';

const REACT_VERSION = React.version;

// const logOut = (auth) => {
//   localStorage.removeItem("token");
//   auth.logout();
// };

const AuthContextProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const auth = useAuth();

  const logIn = (token) => {
    setIsAuthorized(true);
    localStorage.setItem('token', token);
    auth.login();
  };
  const logOut = () => {
    setIsAuthorized(false);
    localStorage.removeItem('token');
    auth.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};

// const AuthButton = () => {
//   const auth = useAuth();
//   const location = useLocation();
//   const isTokenExists = localStorage.getItem("token");

//   return isTokenExists ? (
//     <Button onClick={() => logOut(auth)}>Log out</Button>
//   ) : (
//     <Button as={Link} to="/login" state={{ from: location }}>
//       Login
//     </Button>
//   );
// };

const App = () => {
  // Как правильно поработать с контекстом?
  // const AuthContext = React.createContext({});
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
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Routes>
        </div>
      </AuthContextProvider>
      {/* </Provider> */}
    </Router>
  );
};

export default App;
