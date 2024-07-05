import React, { useState, useEffect, useContext } from 'react';
import FormularioCoffee from "../components/formularioCoffee/index.js";
import CoffeQueue from "../components/coffequeue/index.js";
import { AuthContext } from "../services/AuthContext.js";
import { getCoffee } from "../services/api.js";

function GestionCoffee() {
    const [coffeeList, setCoffeeList] = useState([]);
    const { auth } = useContext(AuthContext);

    const fetchCoffeeList = async () => {
        try {
            const coffeeData = await getCoffee(auth.token);
            setCoffeeList(coffeeData);
        } catch (error) {
            console.error("Error fetching coffee data:", error);
        }
    };

    useEffect(() => {
        fetchCoffeeList();
    }, [auth.token]);

    const handleCoffeeAdded = () => {
        fetchCoffeeList();
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <h1>Gestion Coffees</h1>
            <div style={{
                marginTop: "1rem",
                display: "flex",
                padding: "10px"
            }}>
                <FormularioCoffee onCoffeeAdded={handleCoffeeAdded} />
                <CoffeQueue coffeeList={coffeeList} setCoffeeList={setCoffeeList} />
            </div>
        </div>
    );
}

export default GestionCoffee;
