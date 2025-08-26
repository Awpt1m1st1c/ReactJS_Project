// src/components/RecipeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      style={{
        border: '1px solid #eee',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        width: 250,
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <h3 style={{ marginTop: 0 }}>{recipe.title}</h3>
      <p><strong>Cuisine:</strong> {recipe.cuisine || "—"}</p>
      <p><strong>Type:</strong> {recipe.type || "—"}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty || "—"}</p>
    </div>
  );
}

export default RecipeCard;
