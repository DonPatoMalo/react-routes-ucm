import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../services/AuthContext.js";

function FormularioCoffee() {
    const initialState = {
        name: '',
        description: '',
        price: '',
        foto: null
    };

    const [formData, setFormData] = useState(initialState);
    const { auth } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "foto") {
            setFormData({
                ...formData,
                [name]: files[0], // Corrected: handle file input
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createCoffee(formData);
        console.log(response);
    };

    const createCoffee = async (coffee) => {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", coffee.name);
        formDataToSubmit.append("desc", coffee.description);
        formDataToSubmit.append("price", coffee.price);
        formDataToSubmit.append("foto", coffee.foto);
        console.log({
            name: coffee.name,
            desc: coffee.description,
            price:coffee.price,
            foto: coffee.foto
        });
        try {
            const response = await fetch('http://localhost:8080/api/coffee/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                body: {
                    name : coffee.name,
                    desc: coffee.description,
                    price:parseInt(coffee.price, 10),
                    foto: coffee.foto
                }
            });
            if (!response.ok) {
                console.log("error", response);
                throw new Error('Error creating coffee');

            }
            return await response.json();
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    return (
        <div className="containerformulario" style={{ width: "50%", margin: 'auto' }}>
            <h3>Nuevo Coffee</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <FormControl
                        onChange={handleChange}
                        required
                        name={"name"}
                        type={"text"}
                        placeholder={"Nombre de Coffee"}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormControl
                        onChange={handleChange}
                        required
                        name={"description"}
                        type={"text"}
                        placeholder={"Descripcion"}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormControl
                        onChange={handleChange}
                        required
                        name={"price"}
                        type={"number"}
                        placeholder={"Precio"}
                    />
                </FormGroup>
                <FormGroup controlId="formFile" className={"mb-3"}>
                    <Form.Label>Imagen del Coffee</Form.Label>
                    <Form.Control
                        type={"file"}
                        name={"foto"}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit">Confirmar</Button>
            </Form>
        </div>
    );
}

export default FormularioCoffee;
