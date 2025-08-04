import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 6,
      padding: 16,
      margin: 10,
      width: 250,
      backgroundColor: '#f8f8f8'
    }}>
      <h3>{recipe.title}</h3>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Type:</strong> {recipe.type}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
    </div>
  );
}

export default RecipeCard;
