import {jwtDecode} from "jwt-decode";
import axios from "axios";


const extractUserRole = (token) => {
    try {
        return jwtDecode(token); // Adjust based on where the role is stored in the token payload
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export async function login({ username, password }) {
    try{
        console.log({
            username: username,
            password: password,
        })
        const requestOptions = {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                })
        };
        const response = await fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then(response => response.json())
        const role = extractUserRole(response.token).sub;
        if (response.token) {
            console.log("raw response", response);
            return {
                token:response.token,
                role:role
            }
        }

    }catch(error){
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
        return response.data; // Correctly set state with fetched data
    } catch (e) {
        console.log(e);
    }
};

export const getComments = async (coffeeId, token) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/testimonials/findByCoffeeId/${coffeeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        return response.data;
    }catch (e) {
        console.log(e);
        return null;
    }
};
