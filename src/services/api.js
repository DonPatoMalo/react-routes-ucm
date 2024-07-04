import { jwtDecode } from "jwt-decode";
import axios from "axios";

const extractUserRole = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export async function login({ username, password }) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        const response = await fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then(response => response.json())
        const role = extractUserRole(response.token).sub;
        if (response.token) {
            return {
                token: response.token,
                role: role
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCoffee = async (token) => {
    try {
        const response = await axios.get('http://localhost:8080/api/coffee/coffeeList', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getCoffeeByName = async (name, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/coffee/findByName?name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const getComments = async (coffeeId, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/testimonials/findByCoffeeId/${coffeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
