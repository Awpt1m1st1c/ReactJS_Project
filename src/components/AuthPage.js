// src/components/AuthPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.className;
    document.body.classList.remove('light', 'dark');
    if (isAuthenticated) {
      navigate('/home');
    }
    return () => { document.body.className = prev; };
  }, [isAuthenticated, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(form.email, form.password);
      } else {
        if (!form.name && !isLogin) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        result = await register(form.email, form.password, form.name);
      }

      if (result && !result.success) {
        setError(result.error || 'An error occurred');
      } else if (result && result.success) {
        navigate('/home');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to authenticate. Please try again.';
      setError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
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
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required={!isLogin}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                marginBottom: 12,
                boxSizing: 'border-box'
              }}
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
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
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            minLength="6"
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