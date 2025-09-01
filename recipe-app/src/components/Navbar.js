// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAddPage = location.pathname === '/add-recipe';

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', 'false');
    
    // Redirect to login page
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(255, 99, 71, 0.8)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 99, 71, 1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 99, 71, 0.8)'}
        >
          Logout
        </button>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontWeight: '500'
          }}
        >
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}