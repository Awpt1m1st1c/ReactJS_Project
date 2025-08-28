// src/components/AuthPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.className;
    document.body.classList.remove('light', 'dark');
    return () => { document.body.className = prev; };
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('loggedIn', 'true');
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6f61, #ff9068)'
      }}
    >
      <div
        style={{
          width: 380,
          background: '#fff',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 10, textAlign: 'center' }}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ marginTop: 0, marginBottom: 20, textAlign: 'center', color: '#666' }}>
          {isLogin ? 'Login to continue' : 'Sign up to get started'}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              marginBottom: 12,
              boxSizing: 'border-box'
            }}
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              marginBottom: 16,
              boxSizing: 'border-box'
            }}
          />
          <button className="primary" type="submit" style={{ width: '100%', padding: 12, borderRadius: 8 }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}