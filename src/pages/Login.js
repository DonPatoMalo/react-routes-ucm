import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { login } from "../services/api";
import { AuthContext } from "../services/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate(); // Use useNavigate here

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const resp = await login({ username, password });

            if (resp) {
                console.log(resp);
                setToken(resp);
                navigate("/"); // Redirect to the home page
            } else {
                console.error("Login failed");
            }
            console.log(JSON.parse(localStorage.getItem('token')));
        }
        catch (e) {
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
