
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

function FormularioCoffee() {



    return (
        <>
            <FormGroup controlId="formFile" className={"mb-3"}>
                <Form.Label >Coffee</Form.Label>
                <Form.Control type={"file"} />
            </FormGroup>
        </>
    )
}

export default FormularioCoffee;