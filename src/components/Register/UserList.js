import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from "../../services/AuthContext";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { auth } = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/clients', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [auth.token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleBlockUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/block/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                fetchUsers(); // Refresh the user list after updating
            } else {
                alert('Error blocking user');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
            alert('Error blocking user');
        }
    };

    const handleUnlockUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/unblock/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                fetchUsers(); // Refresh the user list after updating
            } else {
                alert('Error unlocking user');
            }
        } catch (error) {
            console.error('Error unlocking user:', error);
            alert('Error unlocking user');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <h2 className="text-center">Lista de Usuarios</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Nombre de Usuario</th>
                            <th>Correo Electrónico</th>
                            <th>Cuenta Bloqueada</th>
                            <th>Cuenta Desactivada</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.locked ? 'Sí' : 'No'}</td>
                                <td>{user.disabled ? 'Sí' : 'No'}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleBlockUser(user.username)}
                                        disabled={user.locked}
                                    >
                                        Bloquear
                                    </Button>
                                    <Button
                                        variant="success"
                                        onClick={() => handleUnlockUser(user.username)}
                                        disabled={!user.locked}
                                        className="ml-2"
                                    >
                                        Desbloquear
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default UserList;
