'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { authAPI } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
  const savedToken = localStorage.getItem('auth_token');
  const savedUser = localStorage.getItem('auth_user');

  if (savedToken && savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
    } catch {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  } else {
    // 🔥 IMPORTANT: ensure clean state
    setUser(null);
    setToken(null);
  }

  setIsLoading(false);
}, []);

  const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const data = await authAPI.login(email, password);

    const { user, token } = data;

    setUser(user);
    setToken(token);

    // 🔥 STORE BOTH (NO CONFUSION EVER AGAIN)
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    console.log('LOGIN STORED TOKEN:', token);

  } finally {
    setIsLoading(false);
  }
};

  const register = async (email: string, password: string, name: string) => {
  setIsLoading(true);
  try {
    const data = await authAPI.register(email, password, name);

    const { user, token } = data;

    setUser(user);
    setToken(token);

    localStorage.setItem('auth_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));

  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
  setUser(null);
  setToken(null);

  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  localStorage.removeItem('token'); // 🔥 important
};

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
