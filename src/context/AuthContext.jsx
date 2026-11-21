import React, { createContext, useState, useEffect, useCallback } from 'react';
import { LicentraDB } from '../services/db';

export const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return LicentraDB.getCurrentUser();
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleAuthState = () => {
      setUser(LicentraDB.getCurrentUser());
    };

    window.addEventListener('licentra:authstate', handleAuthState);
    return () => {
      window.removeEventListener('licentra:authstate', handleAuthState);
    };
  }, []);

  const login = useCallback(async (email, password, rememberMe = true) => {
    setLoading(true);
    try {
      const foundUser = LicentraDB.findUserByEmail(email);
      if (!foundUser) {
        throw new Error('No citizen account found with this email address.');
      }

      if (foundUser.passwordHash !== password && foundUser.password !== password) {
        throw new Error('Incorrect password. Please verify your credentials.');
      }

      LicentraDB.setCurrentUser(foundUser, rememberMe);
      setUser(foundUser);
      return foundUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const existing = LicentraDB.findUserByEmail(userData.email);
      if (existing) {
        throw new Error('An account with this email address already exists.');
      }

      const existingNid = LicentraDB.findUserByNationalId(userData.nationalId);
      if (existingNid) {
        throw new Error('An account with this National ID already exists.');
      }

      const newUser = LicentraDB.createUser({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        nationalId: userData.nationalId,
        password: userData.password,
        role: userData.role || 'citizen',
      });

      LicentraDB.setCurrentUser(newUser, true);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    LicentraDB.clearCurrentUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return;
    const updated = LicentraDB.updateUser(user.id, updates);
    if (updated) {
      LicentraDB.setCurrentUser(updated);
      setUser({ ...updated });
    }
    return updated;
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

