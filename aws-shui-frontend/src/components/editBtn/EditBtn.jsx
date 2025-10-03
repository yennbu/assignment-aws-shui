import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import "./editBtn.css";

const EditBtn = ({ onStartEdit }) => {


    return(
        <>
        <button className="edit-btn" onClick={onStartEdit}>
            <FontAwesomeIcon icon={faPencil}/>
        </button>
        </>
    )
};

export default EditBtn;