// src/components/RecipeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

function toWatchUrl(url = "") {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

function toThumbUrl(url = "") {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const thumb = toThumbUrl(recipe.video);
  const watch = toWatchUrl(recipe.video);

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      style={{
        border: '1px solid #eee',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        width: 250,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      {thumb && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.open(watch, '_blank', 'noopener,noreferrer');
          }}
          style={{
            position: 'relative',
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 10
          }}
          title="Watch tutorial on YouTube"
        >
          <img
            src={thumb}
            alt="Recipe tutorial thumbnail"
            style={{ width: '100%', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.25)'
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff0000',
                fontSize: 22,
                fontWeight: 700
              }}
            >
              ▶
            </div>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 0 }}>{recipe.title}</h3>
      <p><strong>Cuisine:</strong> {recipe.cuisine || "—"}</p>
      <p><strong>Type:</strong> {recipe.type || "—"}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty || "—"}</p>

      {watch && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(watch, '_blank', 'noopener,noreferrer');
          }}
          className="primary"
          style={{ marginTop: 8, width: '100%' }}
        >
          ▶ Watch Tutorial
        </button>
      )}
    </div>
  );
}

export default RecipeCard;