// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';
import { ThemeProvider } from './ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const onAuth = location.pathname === '/';

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (onAuth) {
    if (user) {
      return <Navigate to="/home" replace />;
    }
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
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/recipe/:id" element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        } />
        <Route path="/add-recipe" element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}