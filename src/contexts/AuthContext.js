"use client"

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('appUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData); // Debug log
    setUser(userData);
    sessionStorage.setItem('appUser', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('Logging out user'); // Debug log
    setUser(null);
    sessionStorage.removeItem('appUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('AuthContext:', context); // Debug log
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
