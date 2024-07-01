import React from 'react';


function Productos() {

    const cards = [
        {
            "idCoffee": 1,
            "name": "Capuchino",
            "description": "Cafe qlo malo",
            "price": 1500,
            "image64": ""
        },
        {
            "idCoffee": 2,
            "name": "Americano",
            "description": "con agua xd",
            "price": 2000,
            "image64": ""
        },
        {
            "idCoffee": 3,
            "name": "Torta",
            "description": "Lorem ipsum dolor sit amet ",
            "price": 4000,
            "image64": ""
        },
        {
            "idCoffee": 1,
            "name": "Capuchino",
            "description": "Cafe qlo malo",
            "price": 1500,
            "image64": ""
        },
        {
            "idCoffee": 2,
            "name": "Americano",
            "description": "con agua xd",
            "price": 2000,
            "image64": ""
        },
        {
            "idCoffee": 3,
            "name": "Torta",
            "description": "Lorem ipsum dolor sit amet ",
            "price": 4000,
            "image64": ""
        }
    ];




    return (
        <>
            <ul className="list-group list-group-horizontal-xl " style={
                {
                    display: 'flex',

                    flexWrap: "wrap"
                }
            }>
                {cards.map((card, index) => (
                    <li key={index} style={
                        {
                            marginBottom: '1rem',
                            padding: "30px"
                        }}>
                        <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={card.link} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title text-center">{card.name}</h5>
                                <p className="card-text justify-content-center">{card.description}</p>
                                <p className="card-text text-center">${new Intl.NumberFormat('en-DE').format(card.price)}</p>
                                <a href={"/"} className="btn btn-light border-dark cent">Opiniones</a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default Productos;