
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function FormularioCoffee() {


    const initialState = {
        name: null,
        description: null,
        price: null,
        file: null
    }

    const [formData, setFormData] = React.useState(initialState);

    const handleChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="containerformulario"
             style={{
                 width: "15%",
            }}>
            <h3> Nuevo Coffee</h3>
            <FormGroup className="mb-3">
                <FormControl
                    onChange={ handleChange }
                    required
                    name={"name"}
                    type={"text"}
                    placeholder={"Nombre de Coffee"}
                ></FormControl>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormControl
                    onChange={ handleChange }
                    required
                    name={"description"}
                    type={"text"}
                    placeholder={"Descripcion"}
                ></FormControl>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormControl
                    onChange={ handleChange }
                    required
                    name={"price"}
                    type={"number"}
                    placeholder={"Precio"}
                ></FormControl>
            </FormGroup>
            <FormGroup
                controlId="formFile"
                className={"mb-3"}>
                <Form.Label >Coffee</Form.Label>
                <Form.Control type={"file"}
                              name={"file"} />
            </FormGroup>
            <Button
            onClick={handleSubmit}
            >Confirmar</Button>
        </div>
    )
}

export default FormularioCoffee;