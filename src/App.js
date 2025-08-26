// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe'; // 👈 NEW

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/recipe/:id" element={isLoggedIn ? <RecipeDetails /> : <Navigate to="/" />} />
        <Route path="/add-recipe" element={isLoggedIn ? <AddRecipe /> : <Navigate to="/" />} /> {/* 👈 NEW */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
