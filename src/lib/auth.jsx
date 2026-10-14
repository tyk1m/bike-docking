import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from './api';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    apiRequest('/auth/me')
      .then((result) => { if (active) setUser(result.user); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setUser(result.user);
    return result.user;
  }, []);

  const signUp = useCallback(async (fullName, email, phoneNumber, password) => {
    return apiRequest('/auth/register', { method: 'POST', body: JSON.stringify({ fullName, email, phoneNumber, password }) });
  }, []);

  const verifyEmail = useCallback(async (email, code) => {
    const result = await apiRequest('/auth/verify-email', { method: 'POST', body: JSON.stringify({ email, code }) });
    setUser(result.user);
    return result.user;
  }, []);

  const signInWithGoogle = useCallback(async (credential, phoneNumber) => {
    const result = await apiRequest('/auth/google', { method: 'POST', body: JSON.stringify({ credential, phoneNumber }) });
    setUser(result.user);
    return result.user;
  }, []);

  const signOut = useCallback(async () => {
    await apiRequest('/auth/logout', { method: 'POST' });
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, signIn, signUp, verifyEmail, signInWithGoogle, signOut }), [user, loading, signIn, signUp, verifyEmail, signInWithGoogle, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
