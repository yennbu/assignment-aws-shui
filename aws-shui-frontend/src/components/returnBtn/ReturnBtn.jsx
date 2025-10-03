import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './returnBtn.css';

const ReturnBtn = () => {
    const navigate = useNavigate();
    function routeChange() {
        let path = "/"
        navigate(path);
    };

    return(
        <button className="return-btn" onClick={routeChange}>
            <FontAwesomeIcon icon={faArrowLeft} className="return-btn__icon"/>
        </button>
    )
}; 

export default ReturnBtn;