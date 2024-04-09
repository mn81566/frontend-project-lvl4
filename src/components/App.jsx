import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Main from './Main/Main.jsx';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NoMatch from './NoMatch/NoMatch';
import { AuthContextProvider, useAuth } from '../hooks/useAuth.jsx';
import AuthButton from './AuthButton/AuthButton';
import Modal from './modals/Modal';
import ROUTES from '../routes.js';
import '../app/locales/index.js';

const HomeLayout = () => <Outlet />;

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <HomeLayout /> : <Navigate to={ROUTES.login()} />;
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthContextProvider>
      <div className="d-flex flex-column h-100">
        <nav className={cn('shadow-sm', 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-white')}>
          <div className="container">
            <a className="navbar-brand" href="/">
              {t('header.title')}
            </a>
            <AuthButton />
          </div>
        </nav>
        <Routes>
          <Route path={ROUTES.login()} element={<Login />} />
          <Route path={ROUTES.signup()} element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path={ROUTES.root()}
            element={(<ProtectedRoute />)}
          >
            <Route
              path=""
              element={(<Main />)}
            />
          </Route>
        </Routes>
        <Modal />
      </div>
    </AuthContextProvider>
  );
};

export default App;
