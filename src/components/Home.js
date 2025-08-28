// src/components/Home.js
import React, { useState } from 'react';
import { recipes as recipesData } from '../data';
import RecipeCard from './RecipeCard';

function getTypeColor(type) {
  switch (type) {
    case "Veg": return "#2ecc40";
    case "Non-Veg": return "#ff4136";
    case "Vegan": return "#b2ff66";
    case "Keto": return "#a259e6";
    case "Eggetarian": return "#ff9800";
    default: return "#888";
  }
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const userRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  const recipes = [...recipesData, ...userRecipes];

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType ? r.type === selectedType : true)
  );

  const allTypes = [...new Set(recipes.map(r => r.type).filter(Boolean))];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Recipe Search</h2>
        {/* Add button is in Navbar; intentionally no extra button here */}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />
        <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ padding: 8 }}>
          <option value="">All Types</option>
          {allTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        {filtered.length === 0 ? (
          <p>🚫 No recipes found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "flex-start"
            }}
          >
            {filtered.map(recipe => (
              <div
                key={recipe.id}
                style={{
                  flex: "1 0 18%",
                  maxWidth: "18%",
                  minWidth: "220px",
                  boxSizing: "border-box",
                  border: `3px solid ${getTypeColor(recipe.type)}`,
                  borderRadius: "10px",
                  padding: "8px",
                  background: "#fff"
                }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;