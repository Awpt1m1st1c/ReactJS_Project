// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';
import { ThemeProvider } from './ThemeContext';

function AppRoutes() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const onAuth = location.pathname === '/';

  useEffect(() => {
    if (onAuth) {
      document.body.classList.remove('light', 'dark');
    }
  }, [onAuth]);

  if (onAuth) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/recipe/:id" element={isLoggedIn ? <RecipeDetails /> : <Navigate to="/" />} />
        <Route path="/add-recipe" element={isLoggedIn ? <AddRecipe /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}