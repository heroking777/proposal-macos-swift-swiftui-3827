import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthState {
  token: string | null;
  user: any; // Adjust the type based on your user data structure
  isAuthenticated: boolean;
}

const useAuth = (): [AuthState, (token: string) => void, () => void] => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthState({
        token,
        user: jwtDecode(token),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('jwtToken', token);
    setAuthState({
      token,
      user: jwtDecode(token),
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return [authState, login, logout];
};

export default useAuth;