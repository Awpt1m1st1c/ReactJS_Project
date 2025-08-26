// src/components/AddRecipe.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TYPES = ["Veg", "Non-Veg", "Vegan", "Keto", "Eggetarian"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    cuisine: "",
    type: "",
    difficulty: "",
    tasteRating: "",
    healthRating: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
    video: "",
    ingredients: "",
    steps: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse ingredients (one per line or comma-separated)
    const ingredients = form.ingredients
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);

    // Parse steps (one per line)
    const steps = form.steps
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    const newRecipe = {
      id: Date.now(),
      title: form.title.trim(),
      cuisine: form.cuisine.trim(),
      type: form.type || "Veg",
      difficulty: form.difficulty || "Easy",
      tasteRating: form.tasteRating ? Number(form.tasteRating) : undefined,
      healthRating: form.healthRating ? Number(form.healthRating) : undefined,
      nutrition: {
        calories: form.calories || undefined,
        protein: form.protein || undefined,
        fat: form.fat || undefined,
        carbs: form.carbs || undefined,
      },
      video: form.video || "",
      ingredients,
      steps,
    };

    const saved = JSON.parse(localStorage.getItem("recipes") || "[]");
    localStorage.setItem("recipes", JSON.stringify([...saved, newRecipe]));

    alert("Recipe added successfully!");
    navigate("/home");
  };

  const field = (props) => (
    <input
      {...props}
      onChange={handleChange}
      style={{ width: "100%", padding: 10, marginBottom: 12, boxSizing: "border-box" }}
    />
  );

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 24 }}>
      <h2 style={{ marginBottom: 20 }}>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        {field({ name: "title", placeholder: "Recipe Title *", value: form.title, required: true })}
        {field({ name: "cuisine", placeholder: "Cuisine (e.g., Indian, Italian) *", value: form.cuisine, required: true })}

        <div style={{ display: "flex", gap: 12 }}>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ flex: 1, padding: 10, marginBottom: 12 }}
          >
            <option value="">Type</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            style={{ flex: 1, padding: 10, marginBottom: 12 }}
          >
            <option value="">Difficulty</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {field({ name: "tasteRating", type: "number", min: 0, max: 5, step: 0.5, placeholder: "Taste Rating (0–5)", value: form.tasteRating })}
          {field({ name: "healthRating", type: "number", min: 0, max: 5, step: 0.5, placeholder: "Health Rating (0–5)", value: form.healthRating })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {field({ name: "calories", placeholder: "Calories (e.g., 350 kcal)", value: form.calories })}
          {field({ name: "protein", placeholder: "Protein (e.g., 12g)", value: form.protein })}
          {field({ name: "fat", placeholder: "Fat (e.g., 10g)", value: form.fat })}
          {field({ name: "carbs", placeholder: "Carbs (e.g., 55g)", value: form.carbs })}
        </div>

        {field({ name: "video", placeholder: "YouTube URL (optional)", value: form.video })}

        <textarea
          name="ingredients"
          placeholder={"Ingredients (one per line)\nExample:\n200g spaghetti\n2 cups tomato sauce\n1 tbsp olive oil"}
          value={form.ingredients}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, height: 120, marginBottom: 12, boxSizing: "border-box" }}
        />

        <textarea
          name="steps"
          placeholder={"Steps (one per line)\nExample:\nBoil pasta\nMake the sauce\nCombine & serve"}
          value={form.steps}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, height: 150, marginBottom: 12, boxSizing: "border-box" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
