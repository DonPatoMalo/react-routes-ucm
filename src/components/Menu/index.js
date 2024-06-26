import { Link, NavLink } from "react-router-dom";
import {useState} from "react";

function Menu(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }



    const commonLinks = [
        { name: 'Inicio', href:'/' },
        { name: 'Coffee', href:'/page1' },
        { name: 'Acerca de', href:'/page1' },
    ]

    const loggedInLinks = [
        { name: 'Profile', href:'/profile' },
        { name: 'Logout', onClick: handleLogout },
    ]

    const adminLinks = [
        { name: 'Gestionar Coffee', href:'/gestionarcoffee' },
        { name: 'Clientes', href:'/clientes' },
    ]
    const loggedOutLinks = [
        { name: 'Iniciar Secion', onClick: handleLogin },
    ]

    const routes = isLoggedIn ? [...commonLinks, ...loggedInLinks] : [...commonLinks, ...loggedOutLinks];

    return <>
        <h2>Menu</h2>
        <ul>
            {routes.map((link, index) => (
                <li key={index}>
                    {link.href ? (
                        <a href={link.href}>{link.name}</a>
                    ) : (
                        <button onClick={link.onClick}>{link.name}</button>
                    )}
                </li>
            ))}
        </ul>

    </>
}



export {Menu}