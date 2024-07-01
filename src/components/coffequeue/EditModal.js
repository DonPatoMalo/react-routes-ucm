import React, { useState } from "react";

const EditModal = ({row, onSave, onCancel}) => {
    const [formData, setFormData] = useState({
        name: row.name,
        description: row.description,
        price: row.price,
        status: row.status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({...row, ...formData});
    };

    return (

    )
}
