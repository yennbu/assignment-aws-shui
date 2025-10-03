import React from "react";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import "./logo.css"

const Logo = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <div className="logo__container">
            <img src={logo} alt="logo" className="logo" onClick={routeChange} />
        </div>
    );
};

export default Logo;