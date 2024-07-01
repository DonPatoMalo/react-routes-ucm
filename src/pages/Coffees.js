import React from "react"
import Productos from "../components/Productos";

function Coffees() {






    return (
        <div >
            <h3>Elige tu Cafe</h3>
            <div>
                <form className="form-inline my-2 my-lg-0" style={{
                    padding: "50px",
                    width: "50%",
                }}>
                    <input className={"form-control mr-sm-2"}
                           type={"search"}
                           placeholder={"Nombre Coffee"}/>
                </form>
            </div>

            <div>
                <Productos/>
            </div>
        </div>
    )
}

export default Coffees