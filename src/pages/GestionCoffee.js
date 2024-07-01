import React from 'react';
import FormularioCoffee from "../components/formularioCoffee";
import CoffeQueue from "../components/coffequeue";


function GestionCoffee() {
    return (
        <div style={{
            marginTop: "1rem",
        }}>
            <h1>Gestion Coffees</h1>
            <div style={{
                marginTop: "1rem",
                display: "flex",
                padding: "10"
            }}>
                <FormularioCoffee />
                <CoffeQueue />
            </div>

        </div>
    )
}


export default GestionCoffee;