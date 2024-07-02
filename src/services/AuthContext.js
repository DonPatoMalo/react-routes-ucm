import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                setAuth({ token: JSON.parse(token) });
            } catch (error) {
                console.error("Error parsing token from localStorage:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null });
    };

    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
