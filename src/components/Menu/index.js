import {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Menu(){



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null); // 'admin' or 'client'
    const [error, setError] = useState(null); // To handle login errors

    const handleLogin = async (userRole) => {
        try {
            const response = await axios.post('localhost:8080/api/auth/login',
                {
                    username: "administrador",
                    password: "administrador",
                });
            console.log(response);
            if (response.data.success) {
                setIsLoggedIn(true);
                setRole(response.data.role);
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole(null);
        setError(null); // Clear any existing error
    };

    const commonLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Ingresar', href: '/Login'},
    ];

    const clientLinks = [
        { name: 'Client Dashboard', href: '/client-dashboard' },
        { name: 'Logout', onClick: handleLogout },
    ];

    const adminLinks = [
        { name: 'Admin Dashboard', href: '/admin-dashboard' },
        { name: 'User Management', href: '/user-management' },
        { name: 'Logout', onClick: handleLogout },
    ];

    const loggedOutLinks = [
        { name: 'Login as Client', onClick: () => handleLogin('client') },
        { name: 'Login as Admin', onClick: () => handleLogin('admin') },
    ];

    let routes = commonLinks;
    if (isLoggedIn) {
        if (role === 'admin') {
            routes = [...routes, ...adminLinks];
        } else if (role === 'client') {
            routes = [...routes, ...clientLinks];
        }
    } else {
        routes = [...routes, ...loggedOutLinks];
    }

    return <div className={"navbar"}>
        <h2>Menu</h2>
        <ul className="navbar-list">
            {routes.map((link, index) => (
                <li key={index} className={"navbar-item"}>
                    {link.href ? (
                        <a href={link.href} className={"navbar-link"}>{link.name}</a>
                    ) : (
                        <button onClick={link.onClick} className={"navbar-button"}>{link.name}</button>
                    )}
                </li>
            ))}
        </ul>

    </div>
}



export {Menu}