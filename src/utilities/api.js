/**
 * API utility for making authenticated requests to the backend
 * Automatically adds JWT token to requests
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Get JWT token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Save JWT token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem('adminToken', token);
};

/**
 * Remove JWT token from localStorage (logout)
 */
export const removeToken = () => {
  localStorage.removeItem('adminToken');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Login user and save token
 */
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const data = await response.json();
  saveToken(data.token);
  return data;
};

/**
 * Logout user
 */
export const logout = () => {
  removeToken();
};

/**
 * Make authenticated API request
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If token is invalid or expired, logout user
  if (response.status === 401 || response.status === 403) {
    logout();
    window.location.href = '/admin'; // Redirect to login
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text();
};

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default api;
