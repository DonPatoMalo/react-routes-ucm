// src/components/AboutPage.js

import React from 'react';

const AboutPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Acerca de nuestras nuevas cafeterías</h1>
            <p style={styles.paragraph}>
                Estamos emocionados de anunciar la apertura de nuevas cafeterías en Talca, San Javier y Linares. Estas ubicaciones fueron elegidas estratégicamente para brindar a nuestros clientes una experiencia de café de alta calidad en lugares accesibles y acogedores.
            </p>
            <p style={styles.paragraph}>
                En Talca, buscamos ofrecer un espacio moderno y cómodo para los estudiantes y profesionales. San Javier, con su encanto histórico, es el lugar perfecto para disfrutar de un café en un ambiente tranquilo y relajado. Finalmente, en Linares, nuestra nueva cafetería está diseñada para ser un punto de encuentro para amigos y familias.
            </p>
            <p style={styles.paragraph}>
                ¡Te invitamos a visitar nuestras nuevas ubicaciones y disfrutar de nuestros deliciosos cafés y pasteles!
            </p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
    },
    header: {
        fontSize: '2em',
        marginBottom: '20px'
    },
    paragraph: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        marginBottom: '20px'
    }
};

export default AboutPage;
