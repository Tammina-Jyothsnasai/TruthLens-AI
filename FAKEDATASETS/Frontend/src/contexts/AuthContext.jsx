import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName') || storedEmail?.split('@')[0];
    if (token && storedEmail) {
      setUser({ email: storedEmail, name: storedName });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (userPayload, authToken) => {
    // Determine email and name cleanly regardless of argument order
    let email = '';
    let name = '';
    let jwtToken = authToken;

    if (typeof userPayload === 'object' && userPayload !== null) {
      email = userPayload.email || '';
      name = userPayload.name || userPayload.fullName || email.split('@')[0];
    } else if (typeof userPayload === 'string') {
      if (userPayload.includes('@')) {
        email = userPayload;
        name = email.split('@')[0];
      } else {
        jwtToken = userPayload;
        email = typeof authToken === 'string' && authToken.includes('@') ? authToken : localStorage.getItem('userEmail') || 'user@truthlens.ai';
        name = email.split('@')[0];
      }
    }

    if (!jwtToken) jwtToken = 'fastapi-jwt-session-' + Date.now();

    localStorage.setItem('token', jwtToken);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    
    setToken(jwtToken);
    setUser({ email, name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);