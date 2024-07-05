import React, { useContext, useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { FormControl } from "react-bootstrap";
import axios from 'axios';
import { AuthContext } from "../../services/AuthContext";

const CoffeQueue = ({ coffeeList, setCoffeeList }) => {
    const { auth } = useContext(AuthContext);
    const [editRow, setEditRow] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        price: '',
        status: '',
        foto: null,
    });

    const handleEditClick = (row) => {
        setEditRow(row);
        setEditFormData({
            name: row.name,
            description: row.description,
            price: row.price,
            status: row.status,
            foto: null,
        });
    };

    const handleDeleteClick = async (rowId) => {
        try {
            await axios.delete(`http://localhost:8080/api/coffee/deleteCoffee`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                params: { idCoffee: rowId }
            });
            const newData = coffeeList.filter((item) => item.idCoffee !== rowId);
            setCoffeeList(newData);
        } catch (error) {
            console.error("Error deleting coffee:", error);
        }
    };

    const handleEditFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "foto") {
            setEditFormData({
                ...editFormData,
                [name]: files[0],
            });
        } else {
            setEditFormData({
                ...editFormData,
                [name]: value,
            });
        }
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("idCoffee", editRow.idCoffee);
        formDataToSubmit.append("name", editFormData.name);
        formDataToSubmit.append("description", editFormData.description);
        formDataToSubmit.append("price", editFormData.price);
        formDataToSubmit.append("status", editFormData.status);
        if (editFormData.foto) {
            formDataToSubmit.append("foto", editFormData.foto);
        }

        try {
            const response = await axios.put('http://localhost:8080/api/coffee/updateCoffee', formDataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            const updatedData = coffeeList.map((row) =>
                row.idCoffee === editRow.idCoffee ? { ...row, ...response.data } : row
            );
            setCoffeeList(updatedData);
            setEditRow(null);
        } catch (error) {
            console.error('Error updating coffee:', error);
        }
    };

    const handleCancel = () => {
        setEditRow(null);
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acción</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {coffeeList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.idCoffee}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${new Intl.NumberFormat('en-DE').format(item.price)}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button variant="secondary" onClick={() => handleEditClick(item)}>Editar</Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteClick(item.idCoffee)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editRow && (
                <Modal show={true} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Coffee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditFormSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    onChange={handleEditFormChange}
                                    required
                                    name={"name"}
                                    type={"text"}
                                    placeholder={"Nombre de Coffee"}
                                    value={editFormData.name}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    onChange={handleEditFormChange}
                                    required
                                    name={"description"}
                                    type={"text"}
                                    placeholder={"Descripción"}
                                    value={editFormData.description}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    onChange={handleEditFormChange}
                                    required
                                    name={"price"}
                                    type={"number"}
                                    placeholder={"Precio"}
                                    value={editFormData.price}
                                />
                            </FormGroup>
                            <FormGroup controlId="formFile" className={"mb-3"}>
                                <Form.Label>Imagen del Coffee</Form.Label>
                                <Form.Control
                                    type={"file"}
                                    name={"foto"}
                                    onChange={handleEditFormChange}
                                />
                            </FormGroup>
                            <Button variant="primary" type="submit">Guardar</Button>
                            <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default CoffeQueue;
