// src/ThemeContext.js
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ darkMode: false, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    } else if (window.matchMedia) {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(v => !v);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}