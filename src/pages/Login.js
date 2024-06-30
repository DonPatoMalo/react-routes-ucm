import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import axios from "axios";

const Login = ()  => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit(){
        try{
            const resp =
                await axios.post(
                    'http://localhost:8080/api/auth/login',

                    {
                        username: username,
                        password: password,
                    },
                    {
                        headers:{
                            "Content-Type": "application/json",
                            "Accept": "*/*"
                        }
                    })
            console.log(resp);
        }catch(error){
            console.log(error);
        }

    }

    return (
        <>
            <div className="col-sm-6 offset-md-3">
               <Form>
                   <Form.Group className="mb-3" as={ Col } md="4" controlId={"validationCustom01"}>
                       <Form.Label>Nombre Usuario</Form.Label>
                       <Form.Control
                           onChange={e => setUsername(e.target.value)}
                        required
                        type={"text"}
                       placeholder={"Nombre de Usuario"}
                       defaultValue="administrador"></Form.Control>
                   </Form.Group>
                   <Form.Group className="mb-3" as={ Col } md="4" controlId={"validationCustom01"}>
                       <Form.Label>Contraseña</Form.Label>
                       <Form.Control
                           onChange={e => setPassword(e.target.value)}
                           required
                           type={"password"}
                       ></Form.Control>
                   </Form.Group>
                   <Button
                       onClick={handleSubmit}
                       className="mb-3"
                       type="submit"
                       size={"sm"}>Ingresar</Button>
               </Form>

            </div>
        </>
    )
}

export default Login ;