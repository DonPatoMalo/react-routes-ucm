import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, role: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            try {
                setAuth({ token: JSON.parse(token), role: JSON.parse(role) });
            } catch (error) {
                console.error("Error parsing token or role from localStorage:", error);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }
        }
    }, []);

    const setToken = (token, role) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('role', JSON.stringify(role));
        setAuth({ token, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth({ token: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
