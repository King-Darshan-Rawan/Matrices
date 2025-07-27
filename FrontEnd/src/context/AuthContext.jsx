// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  const value = {
    token,
    userId,
    role,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
