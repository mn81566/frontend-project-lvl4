import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Main from './Main/Main.jsx';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NoMatch from './NoMatch/NoMatch';
// import { useAuth } from 'react-use-auth';
import { AuthContextProvider, useAuth } from '../hooks/useAuth.jsx';
import AuthContext from '../contexts/AuthContext';
import AuthButton from './AuthButton/AuthButton';
import Modal from './modals/Modal';
import cn from 'classnames';
import ROUTES from '../routes.js';
import '../app/locales/index.js';
import { useTranslation } from 'react-i18next';

const HomeLayout = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={ROUTES.root} />;
  }

  return <Outlet />;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to={ROUTES.login} />;
  }

  return children;
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthContextProvider>
      <div className="d-flex flex-column h-100">
        <nav className={cn('shadow-sm', 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-white')}>
          <div className="container">
            {/* <li>
                  <Link to="/">Main</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li> */}
            <a className="navbar-brand" href="/">
              {t('header.title')}
            </a>
            <AuthButton />
          </div>
        </nav>

        <Routes>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.login} element={<Login />}></Route>
            <Route path={ROUTES.signup} element={<SignUp />}></Route>
          </Route>
          <Route path="*" element={<NoMatch />}></Route>
          <Route
            path={ROUTES.root}
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Modal />
      </div>
    </AuthContextProvider>
  );
};

export default App;
