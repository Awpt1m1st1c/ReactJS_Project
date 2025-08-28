// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAddPage = location.pathname === '/add-recipe';

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 700 }}>Recipe App</span>
        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        {!isAddPage && (
          <button
            onClick={() => navigate('/add-recipe')}
            style={{ marginLeft: 6, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            + Add
          </button>
        )}
      </div>
      <div>
        <button onClick={toggleTheme}>
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}