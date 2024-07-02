import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Dropdown, DropdownDivider} from "react-bootstrap";
import {DropdownButton} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

const CoffeQueue = () => {
    const [data, setData] = useState([
        { id: 1, name: 'Capicchino1', description: 'Capicchino33', price: 100000, status: 'active' },
        { id: 2, name: 'Capicchino2', description: 'Capicchino22', price: 200000, status: 'pending' },
        { id: 3, name: 'Capicchino3', description: 'Capicchino33', price: 300000, status: 'deleted' }
    ]);

    const [editRow, setEditRow] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        price: null,
        status: null,
    });

    const handleEditClick = (row) => {
        setEditRow(row);
        setEditFormData({
            name: row.name,
            description: row.description,
            price: row.price,
            status: row.status,
        });
    };

    const handleDeleteClick = (rowId) => {
        const newData = data.filter((item) => item.id !== rowId);
        setData(newData);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        const updatedData = data.map((row) =>
            row.id === editRow.id ? { ...row, ...editFormData } : row
        );
        setData(updatedData);
        setEditRow(null);
    };
    const handleStatusChange = (status) => {
        setEditFormData((prev) => ({
            ...prev, status: status
        }));
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
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${new Intl.NumberFormat('en-DE').format(item.price)}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button variant="secondary" onClick={() => handleEditClick(item)}>Editar</Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteClick(item.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editRow && (
                <Modal show={true} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditFormSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditFormChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditFormChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleEditFormChange}
                                />
                            </Form.Group>
                            <Form.Label>Estado</Form.Label>
                            <InputGroup className="mb-3">

                                <DropdownButton
                                    variant="outline-secondary"
                                    title={editFormData.status || "Seleccione un estado" }
                                    id="input-group-dropdown-1"
                                    onSelect={handleStatusChange}
                                >
                                    <Dropdown.Item eventKey={"En espera"}>En espera</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Procesando"}>Procesando</Dropdown.Item>
                                    <Dropdown.Item eventKey={"Listo"}>Listo</Dropdown.Item>
                                    <DropdownDivider />
                                    <Dropdown.Item eventKey={"Eliminado"}>Eliminado</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
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
