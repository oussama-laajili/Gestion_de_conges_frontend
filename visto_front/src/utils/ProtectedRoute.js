import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token, redirect to login page
        return <Navigate to="/" />;
    }

    // If token exists, render the protected component
    return children;
};

export default ProtectedRoute;
