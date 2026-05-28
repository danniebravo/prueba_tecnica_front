import { useCallback, useEffect, useState } from 'react';
import {
  getSession,
  login as loginService,
  logout as logoutService,
} from '../services/authService';

export function useAuth() {
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    const sync = () => setSession(getSession());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const login = useCallback((datos) => {
    const nueva = loginService(datos);
    setSession(nueva);
    return nueva;
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setSession(null);
  }, []);

  return {
    session,
    isAuthenticated: session !== null,
    login,
    logout,
  };
}
