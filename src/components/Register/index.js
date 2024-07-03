import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentsModal = ({ show, handleClose, comments, handleAddComment, idCoffee }) => {
    const [newComment, setNewComment] = useState({
        username: localStorage.getItem('role') || '',
        testimonial: '',
        idCoffee: idCoffee
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddComment(newComment);
        setNewComment({ ...newComment, testimonial: '' });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Opiniones</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments available</p>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="testimonial" className="mb-3">
                        <Form.Label>Comentario:</Form.Label>
                        <Form.Control
                            type="text"
                            name="testimonial"
                            value={newComment.testimonial}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar Comentario
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CommentsModal;
