import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Login = ()  => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit(){
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    })
            };
            const response = await fetch('http://localhost:8080/api/auth/login', requestOptions)
                .then(response => response.json())

            console.log(response)

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