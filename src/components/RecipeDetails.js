// src/components/RecipeDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes as baseRecipes } from '../data';

function toEmbed(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {}
  return "";
}

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  const allRecipes = [...baseRecipes, ...userRecipes];

  const recipe = allRecipes.find(r => Number(r.id) === Number(id));

  if (!recipe) return <h2 style={{ padding: 20 }}>Recipe not found</h2>;

  const embed = toEmbed(recipe.video);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <button onClick={() => navigate('/home')} style={{ marginBottom: 16 }}>
        ⬅ Back to Home
      </button>

      <h2 style={{ marginBottom: 6 }}>{recipe.title}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisine} &nbsp; | &nbsp; <strong>Type:</strong> {recipe.type} &nbsp; | &nbsp; <strong>Difficulty:</strong> {recipe.difficulty}</p>

      {(recipe.tasteRating || recipe.healthRating) && (
        <p style={{ marginTop: 8 }}>
          <strong>Taste:</strong> {recipe.tasteRating ?? "—"} / 5 &nbsp; | &nbsp;
          <strong>Health:</strong> {recipe.healthRating ?? "—"} / 5
        </p>
      )}

      {recipe.nutrition && Object.values(recipe.nutrition).some(Boolean) && (
        <div style={{ marginTop: 10 }}>
          <h3>Nutrition (per serving)</h3>
          <ul>
            {recipe.nutrition.calories && <li>Calories: {recipe.nutrition.calories}</li>}
            {recipe.nutrition.protein && <li>Protein: {recipe.nutrition.protein}</li>}
            {recipe.nutrition.fat && <li>Fat: {recipe.nutrition.fat}</li>}
            {recipe.nutrition.carbs && <li>Carbs: {recipe.nutrition.carbs}</li>}
          </ul>
        </div>
      )}

      {embed && (
        <div style={{ marginTop: 10 }}>
          <h3>Video Tutorial</h3>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 8 }}>
            <iframe
              src={embed}
              title="Recipe video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <h3>Ingredients</h3>
        <ul>
          {(recipe.ingredients || []).map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: 10 }}>
        <h3>Steps</h3>
        <ol>
          {(recipe.steps || []).map((step, idx) => <li key={idx}>{step}</li>)}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetails;
