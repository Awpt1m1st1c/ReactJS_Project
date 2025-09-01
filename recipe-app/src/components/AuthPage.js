// src/components/AuthPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.className;
    document.body.classList.remove('light', 'dark');
    return () => { document.body.className = prev; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Basic validation
    const validationErrors = {};
    if (!form.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.password) {
      validationErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log(`Attempting to ${isLogin ? 'login' : 'register'}...`);
      const authMethod = isLogin ? auth.login : auth.register;
      
      // Prepare credentials based on login/register mode
      const credentials = isLogin 
        ? { 
            email: form.email.trim(), 
            password: form.password
          }
        : { 
            email: form.email.trim(), 
            password: form.password,
            name: form.name?.trim() || form.email.split('@')[0] // Use email prefix as default name if not provided
          };
      
      const response = await authMethod(credentials);
      
      console.log('Auth response:', response);
      
      if (!response || !response.token) {
        throw new Error('Authentication failed: No token received');
      }
      
      // The auth methods now handle localStorage updates
      console.log('Authentication successful, redirecting to /home');
      navigate('/home');
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Default error message
      let errorMessage = 'An error occurred. Please try again.';
      let fieldErrors = {};
      
      // Handle different types of errors
      if (error.message) {
        // Network errors
        if (error.message.includes('NetworkError') || 
            error.message.includes('Failed to fetch') ||
            error.message.includes('Network request failed')) {
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } 
        // Server validation errors
        else if (error.response) {
          const { data } = error.response;
          if (data.error === 'EMAIL_EXISTS') {
            errorMessage = 'This email is already registered. Please use a different email or log in.';
            fieldErrors.email = 'Email already in use';
          } else if (data.error === 'AUTHENTICATION_FAILED') {
            errorMessage = 'Invalid email or password. Please try again.';
            fieldErrors.email = ' '; // Space to maintain form layout
            fieldErrors.password = ' ';
          } else if (data.error === 'VALIDATION_ERROR' && data.fields) {
            errorMessage = 'Please fix the errors in the form.';
            fieldErrors = { ...data.fields };
          } else if (data.message) {
            errorMessage = data.message;
          }
        }
        // Other client-side errors
        else if (error.message.includes('401') || 
                error.message.includes('Invalid credentials') ||
                error.message.includes('Invalid email or password')) {
          errorMessage = 'Invalid email or password. Please try again.';
          fieldErrors.email = ' ';
          fieldErrors.password = ' ';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError({ message: errorMessage, ...fieldErrors });
    } finally {
      setIsLoading(false);
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
        
        {error?.message && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 20,
            textAlign: 'left',
            fontSize: 14,
            borderLeft: '4px solid #dc2626'
          }}>
            {error.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: 16 }}>
              <input
                name="name"
                type="text"
                placeholder="Name (optional)"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: error?.name ? '1px solid #dc2626' : '1px solid #e5e7eb',
                  marginBottom: 4,
                  boxSizing: 'border-box',
                  fontSize: 14,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  backgroundColor: isLoading ? '#f9fafb' : '#fff',
                  ...(error?.name && { borderColor: '#dc2626' })
                }}
              />
              {error?.name && (
                <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                  {error.name}
                </div>
              )}
            </div>
          )}
          
          <div style={{ marginBottom: 16 }}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: error?.email ? '1px solid #dc2626' : '1px solid #e5e7eb',
                marginBottom: 4,
                boxSizing: 'border-box',
                fontSize: 14,
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backgroundColor: isLoading ? '#f9fafb' : '#fff',
                ...(error?.email && { borderColor: '#dc2626' })
              }}
            />
            {error?.email && (
              <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                {error.email}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: error?.password ? '1px solid #dc2626' : '1px solid #e5e7eb',
                marginBottom: 4,
                boxSizing: 'border-box',
                fontSize: 14,
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backgroundColor: isLoading ? '#f9fafb' : '#fff',
                ...(error?.password && { borderColor: '#dc2626' })
              }}
            />
            {error?.password && (
              <div style={{ color: '#dc2626', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
                {error.password}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: 'none',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseOver={e => !isLoading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={e => !isLoading && (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            disabled={isLoading}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#3b82f6',
              cursor: 'pointer',
              fontSize: 14,
              padding: 8,
              textDecoration: 'underline',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}