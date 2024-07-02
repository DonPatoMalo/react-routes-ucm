import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { login } from "../services/api";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resp = await login({ username, password });
            console.log(resp);
            if (resp && resp.token) {
                console.log(resp);
                setToken(resp.token, resp.role); // Set both token and role
                navigate("/"); // Redirect to the home page
            } else {
                console.error("Login failed");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="col-sm-6 offset-md-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" as={Col} md="4" controlId={"validationCustom01"}>
                    <Form.Label>Nombre Usuario</Form.Label>
                    <Form.Control
                        onChange={e => setUsername(e.target.value)}
                        required
                        type={"text"}
                        placeholder={"Nombre de Usuario"}
                    />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} md="4" controlId={"validationCustom01"}>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        onChange={e => setPassword(e.target.value)}
                        required
                        type={"password"}
                    />
                </Form.Group>
                <Button
                    className="mb-3"
                    type="submit"
                    size={"sm"}
                >
                    Ingresar
                </Button>
            </Form>
        </div>
    );
}

export default Login;
