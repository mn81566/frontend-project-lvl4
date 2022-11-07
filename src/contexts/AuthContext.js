import { createContext } from 'react';

const AuthContext = createContext({});

export const isTokenExists = () => localStorage.getItem('userId');

export default AuthContext;
