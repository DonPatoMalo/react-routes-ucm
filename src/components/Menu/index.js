import { useState } from "react";
import { Link } from 'react-router-dom';

function Menu() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [role, setRole] = useState('admin'); // 'admin' or 'client' default null
    const [error, setError] = useState(null); // To handle login errors

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole(null);
        setError(null); // Clear any existing error
    };

    const commonLinks = [
        { name: 'Inicio', to: '/inicio' },
        { name: 'Coffees', to: '/menu' },
        { name: 'Acerca de', to: '/menu' }
    ];

    const notLoggedInLinks = [
        { name: 'Iniciar Sesion', to: '/login' },
        { name: 'Registrate', to: '/registrate' },
    ]
    const clientLinks = [
        { name: 'Client Dashboard', to: '/client-dashboard' },
        { name: 'Logout', onClick: handleLogout },
    ];

    const adminLinks = [
        { name: 'Gestion Coffees', to: '/gestion-coffees' },
        { name: 'Clientes', to: '/user-management' },
        { name: 'Logout', onClick: handleLogout },
    ];

    let routes = commonLinks;
    if (isLoggedIn) {
        if (role === 'admin') {
            routes = [...routes, ...adminLinks];
        } else if (role === 'client') {
            routes = [...routes, ...clientLinks];
        }
    }else{
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
            </ul>
        </div>
    );
}

export { Menu };
