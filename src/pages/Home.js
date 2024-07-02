import Presentacion from "../components/Presentacion";

function Home(){
    return <>
        <h3 className={"text-center"}
        style={{
            paddingTop: "10px",
            paddingBottom: "10px"
        }}>Coffee Shop </h3>
        <Presentacion />
    </>
}


export {Home};