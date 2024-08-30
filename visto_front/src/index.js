import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setAuthToken } from './utils/jwt';

// Check for token
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Find the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
