// src/components/RecipeDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes as baseRecipes } from '../data';

function getYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.replace("/", "");
    }
  } catch {}
  return "";
}

function toEmbed(url = "") {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function toWatchUrl(url = "") {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  const allRecipes = [...baseRecipes, ...userRecipes];

  const recipe = allRecipes.find(r => Number(r.id) === Number(id));
  const isUserRecipe = userRecipes.some(r => Number(r.id) === Number(id));

  if (!recipe) return <h2 style={{ padding: 20 }}>Recipe not found</h2>;

  const embed = toEmbed(recipe.video);
  const watch = toWatchUrl(recipe.video);

  const handleDelete = () => {
    if (!isUserRecipe) return;
    const ok = window.confirm('Delete this recipe? This cannot be undone.');
    if (!ok) return;
    const remaining = userRecipes.filter(r => Number(r.id) !== Number(id));
    localStorage.setItem('recipes', JSON.stringify(remaining));
    alert('Recipe deleted.');
    navigate('/home');
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button onClick={() => navigate('/home')}>⬅ Back to Home</button>
        {isUserRecipe && (
          <button
            onClick={handleDelete}
            style={{
              marginLeft: 'auto',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            Delete Recipe
          </button>
        )}
      </div>

      <div className="recipe-details">
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
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              Video Tutorial
              {watch && (
                <a
                  href={watch}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 14, fontWeight: 600, color: '#2563eb' }}
                  title="Open on YouTube"
                >
                  Watch on YouTube ↗
                </a>
              )}
            </h3>
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
    </div>
  );
}

export default RecipeDetails;