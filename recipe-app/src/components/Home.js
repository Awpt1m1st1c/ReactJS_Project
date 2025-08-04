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

  const recipes = Array.isArray(recipesData) ? recipesData : [];

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType ? r.type === selectedType : true)
  );

  const allTypes = [...new Set(recipes.map(r => r.type))];

  return (
    <div style={{ padding: 20 }}>
      <h2>Recipe Search</h2>
      <input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {allTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
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
                  minWidth: "200px",
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