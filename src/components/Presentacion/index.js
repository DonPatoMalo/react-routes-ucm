

function Presentacion() {

    const cards = [
        {
            title: "Nuestras Maquinas",
            description: "La última generación de maquinas de café las puedes encontrar aquí",
            textButton:"Conocélas",
            link: "https://www.kitchencenter.cl/cdn/shop/products/cafetera-espresso-perfect-brew-molino-integrado-bvstem7300-oster-2.jpg?v=1717614293&width=823"
        },
        {
            title: "Nuestros Granos",
            description: "Contamos con café de diversos origenes, elige a tu gusto",
            textButton:"Mas informacion",
            link:"https://i.pinimg.com/550x/50/a4/f8/50a4f8a8aaa5804698fd75037f199497.jpg"
        },
        {
            title: "Sucursales",
            description: "Conoce nuestras nuevas sucursales en Talca, San Javier y Linares",
            textButton:"Mas informacion",
            link:"https://lacafeteriatalca.cl/wp-content/uploads/2020/08/carrusel1.jpg"
        }

    ]

    return (
        <>
            <div className="banner fix">
                <img style={{
                    height: "300px",
                    width : "100%",
                    objectFit: "cover",
                }} src={"https://imagenes.eltiempo.com/files/image_1200_600/uploads/2018/07/18/5b4fea0fcb0b3.jpeg"} />
            </div>
            <ul class="" style={{
                display: "flex",
                padding: "10px",
                justifyContent: 'center'
            }}>
                {cards.map((card, index) => (
                    <li key={index} style={{
                        marginBottom: '1rem',


                    }}>
                        <div className="card" style={{width: '18rem'}}>
                            <img className="card-img-top" src={card.link} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.description}</p>
                                <a href={"/"} className="btn btn-primary">{card.textButton}</a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}


export default Presentacion;