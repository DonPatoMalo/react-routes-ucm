import React, { useState, useEffect, useContext } from "react";
import Productos from "../components/Productos";
import { getCoffee, getCoffeeByName } from "../services/api";
import { AuthContext } from "../services/AuthContext";

function Coffees() {
    const [searchTerm, setSearchTerm] = useState("");
    const [coffeeList, setCoffeeList] = useState([]);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    
    useEffect(() => {
        const fetchCoffees = async () => {
            try {
                const data = await getCoffee(auth.token);
                setCoffeeList(data);
                setError(null);
            } catch (error) {
                setError('Error al obtener los cafés');
                console.error('Error fetching coffee data:', error);
            }
        };

        fetchCoffees();
    }, [auth.token]);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            try {
                const coffee = await getCoffeeByName(searchTerm, auth.token);
                setCoffeeList([coffee]);
                setError(null);
            } catch (error) {
                setError('Café no encontrado');
                setCoffeeList([]); 
                console.error('Error fetching coffee by name:', error);
            }
        } else {

            const data = await getCoffee(auth.token);
            setCoffeeList(data);
            setError(null);
        }
    };


    const handleClearSearch = async () => {
        setSearchTerm("");
        try {
            const data = await getCoffee(auth.token);
            setCoffeeList(data);
            setError(null);
        } catch (error) {
            setError('Error al obtener los cafés');
            console.error('Error fetching coffee data:', error);
        }
    };

    return (
        <div>
            <h3>Elige tu Café</h3>
            <div>
                <form 
                    className="form-inline my-2 my-lg-0" 
                    style={{ padding: "50px", width: "50%" }} 
                    onSubmit={handleSearchSubmit}
                >
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Nombre Coffee"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary" type="submit">Buscar</button>
                    {searchTerm && (
                        <button 
                            className="btn btn-secondary ml-2" 
                            type="button"
                            onClick={handleClearSearch}
                        >
                            <span aria-hidden="true">&times;</span> {/* X Icon */}
                        </button>
                    )}
                </form>
            </div>
            <div>
                {error && <p>{error}</p>}
                <Productos coffeeList={coffeeList} /> {}
            </div>
        </div>
    );
}

export default Coffees;
