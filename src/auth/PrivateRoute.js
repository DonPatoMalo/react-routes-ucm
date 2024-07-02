import {AuthContext} from "../services/AuthContext";
import {Navigate, useLocation} from "react-router-dom";
import React  from "react";

function PrivateRoute({children}){

    const { auth } = React.useContext(AuthContext);
    const location = useLocation();

    return (
        auth.token?(children):<Navigate to={"/login"} replace state={{path: location.pathname}}></Navigate>
    )

}


export { PrivateRoute };