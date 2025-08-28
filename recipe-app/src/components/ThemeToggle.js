// src/components/ThemeToggle.js
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: 15,
        right: 15,
        padding: "8px 14px",
        border: "none",
        borderRadius: "8px",
        background: darkMode ? "#444" : "#ff6f61",
        color: "white",
        cursor: "pointer",
        fontWeight: "600",
        zIndex: 1100
      }}
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;
