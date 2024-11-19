import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (err) {
        return false;
    }
};


const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;