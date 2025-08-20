// src/components/RecipeDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes } from '../data';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{recipe.title}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Type:</strong> {recipe.type}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step, idx) => <li key={idx}>{step}</li>)}
      </ol>

      <button onClick={() => navigate('/home')} style={{ marginTop: 20 }}>
        ⬅ Back to Home
      </button>
    </div>
  );
}

export default RecipeDetails; 
