import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../services/AuthContext";

function Menu() {
    const { auth, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const commonLinks = [
        { name: 'Inicio', to: '/inicio' },
        { name: 'Coffees', to: '/menu' },
        { name: 'Acerca de', to: '/acerca-de' }
    ];

    const notLoggedInLinks = [
        { name: 'Iniciar Sesion', to: '/login' },
        { name: 'Registrate', to: '/register' },
    ];

    const clientLinks = [
        { name: 'Client Dashboard', to: '/client-dashboard' },
        { name: 'Logout', onClick: handleLogout },
    ];

    const adminLinks = [
        { name: 'Gestion Coffees', to: '/gestion-coffees' },
        { name: 'Clientes', to: '/user-management' },
        { name: 'Logout', onClick: handleLogout },
    ];

    let routes = [...commonLinks];

    if (auth.token) {
        if (auth.role === 'administrador') {
            routes = [...routes, ...adminLinks];
        } else if (auth.role === 'cliente') {
            routes = [...routes, ...clientLinks];
        }
    } else {
        routes = [...routes, ...notLoggedInLinks];
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Inicio</Link>
            <ul className="nav justify-content-center">
                {routes.map((link, index) => (
                    <li key={index} className="nav-item">
                        {link.to ? (
                            <Link to={link.to} onClick={link.onClick} className="nav-link">
                                {link.name}
                            </Link>
                        ) : (
                            <span onClick={link.onClick} className="nav-link" style={{ cursor: 'pointer' }}>
                                {link.name}
                            </span>
                        )}
                    </li>
                ))}
                {
                    auth.token && (
                        <li className="nav-item">
                            <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                                Logout
                            </span>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export { Menu };
