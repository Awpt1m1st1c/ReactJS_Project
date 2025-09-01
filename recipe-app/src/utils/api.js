// src/utils/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get default fetch options
const getFetchOptions = (method = 'GET', body = null, requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add Authorization header if required and token exists
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
    credentials: 'include', // Important for cookies
    mode: 'cors', // Enable CORS mode
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  return options;
};

export const auth = {
  login: async (credentials) => {
    try {
      const { email, password } = credentials;
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // Create an error object with the response data
        const error = new Error(responseData.message || 'Login failed');
        error.response = { data: responseData };
        throw error;
      }
      
      // Store token and user data
      if (responseData.token && responseData.user) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('loggedIn', 'true');
      }
      
      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (credentials) => {
    try {
      const { email, password, name } = credentials;
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        }
      );
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // Create an error object with the response data
        const error = new Error(responseData.message || 'Registration failed');
        error.response = { data: responseData };
        throw error;
      }
      
      // Store token and user data
      if (responseData.token && responseData.user) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('loggedIn', 'true');
      }
      
      return responseData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      const response = await fetch(
        `${API_BASE_URL}/auth/me`,
        getFetchOptions('GET', null, true) // Add requiresAuth flag
      );
      
      if (!response.ok) {
        // If token is invalid, clear it
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.setItem('loggedIn', 'false');
        }
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};

// Add more API calls here as needed
export const recipes = {
  // Example:
  // getAll: async () => {
  //   const response = await fetch(
  //     `${API_BASE_URL}/recipes`,
  //     getFetchOptions('GET')
  //   );
  //   return handleResponse(response);
  // }
};

// Request interceptor to include token in all requests
const originalFetch = window.fetch;
window.fetch = async (url, options = {}) => {
  // Only add token for same-origin requests
  if (typeof url === 'string' && url.startsWith('/')) {
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }
  }
  return originalFetch(url, options);
};
