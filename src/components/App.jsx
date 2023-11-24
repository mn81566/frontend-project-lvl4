import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Main from './Main/Main.jsx';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NoMatch from './NoMatch/NoMatch';
import { AuthContextProvider, useAuth } from '../hooks/useAuth.jsx';
import AuthButton from './AuthButton/AuthButton';
import Modal from './modals/Modal';
import ROUTES from '../routes.js';
import '../app/locales/index.js';
import useApi from '../hooks/useApi.js';

const HomeLayout = () => <Outlet />;

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.login} />;
  }

  return children;
};

const App = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  api.onAddNewMessage(dispatch);
  api.onAddNewChannel(dispatch);
  api.onRenameChannel(dispatch);
  api.onRemoveChannel(dispatch);

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
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.signup} element={<SignUp />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
          <Route
            path={ROUTES.root}
            element={(
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            )}
          />
        </Routes>
        <Modal />
      </div>
    </AuthContextProvider>
  );
};

export default App;
