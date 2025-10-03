import React from "react";
import './newNoteBtn.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NewNoteBtn = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/new-note`;
        navigate(path);
    }

    return (
        <>
            <button className="new-note-btn" onClick={routeChange}>
                <FontAwesomeIcon icon={faPencil} className="new-note-btn__pen"/>
                <p>+</p>
            </button>

        </>
    )
}

export default NewNoteBtn;