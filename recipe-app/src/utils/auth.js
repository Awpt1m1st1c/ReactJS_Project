import { auth } from './api';

export const isAuthenticated = () => {
  return localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('loggedIn', 'true');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.setItem('loggedIn', 'false');
};

export const checkAuth = async () => {
  if (!isAuthenticated()) {
    return false;
  }
  
  try {
    const user = await auth.getCurrentUser();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
  }
  
  logout();
  return false;
};
