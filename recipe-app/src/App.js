import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import Navbar from './components/Navbar';
import { ThemeProvider } from './ThemeContext';
import { checkAuth, isAuthenticated } from './utils/auth';

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const isUserAuthenticated = await checkAuth();
      setIsAuth(isUserAuthenticated);
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuth ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/';

  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.remove('light', 'dark');
    }
  }, [isAuthPage]);

  if (isAuthPage) {
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
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recipe/:id" 
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-recipe" 
          element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/"} />} />
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