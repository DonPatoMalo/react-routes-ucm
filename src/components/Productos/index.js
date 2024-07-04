import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../services/AuthContext';
import { getComments } from '../../services/api';
import CommentsModal from './../coffequeue/CommentsModal.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Productos = ({ coffeeList }) => {
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    const getImageSrc = (image64) => {
        if (!image64) {
            return 'path/to/placeholder/image.jpg';
        }
        return `data:image/jpeg;base64,${image64}`;
    };

    const handleShowComments = async (coffeeId) => {
        try {
            const commentsData = await getComments(coffeeId, auth.token);
            setComments(commentsData);
            setSelectedCoffeeId(coffeeId);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]);
            setError('Error al obtener las opiniones');
        } finally {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setComments([]);
        setSelectedCoffeeId(null);
    };

    const handleAddComment = async (comment) => {
        try {
            const response = await axios.post('http://localhost:8080/api/testimonials/create', comment, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setComments([...comments, response.data]);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
            <ul className="list-group list-group-horizontal-xl" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {coffeeList.length > 0 ? (
                    coffeeList.map((card, index) => (
                        <li key={index} className="list-group-item" style={{ marginBottom: '1rem', padding: '30px' }}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={getImageSrc(card.image64)} alt={card.name} />
                                <div className="card-body">
                                    <h5 className="card-title text-center">{card.name}</h5>
                                    <p className="card-text justify-content-center">{card.description}</p>
                                    <p className="card-text text-center">
                                        ${new Intl.NumberFormat('en-DE').format(card.price)}
                                    </p>
                                    <Button variant="light" className="border-dark cent" onClick={() => handleShowComments(card.idCoffee)}>
                                        Opiniones
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No hay cafés disponibles.</p>
                )}
            </ul>
            <CommentsModal
                show={showModal}
                handleClose={handleCloseModal}
                comments={comments}
                handleAddComment={handleAddComment}
                idCoffee={selectedCoffeeId}
            />
            {error && <p>{error}</p>}
        </>
    );
};

export default Productos;