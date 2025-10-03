import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./deleteBtn.css"
import axios from "axios";

const DeleteBtn = ({ noteId, onDelete }) => {
    const deleteNote = async () => {
        
        const storedUser = JSON.parse(localStorage.getItem("user-storage"));
        const userId = storedUser?.state?.user?.userId;
        
        try {
            await axios.delete(
                `https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/notes/${userId}/${noteId}`
            );            
            onDelete(noteId);
        } catch (err) {
            console.error("Kunde inte ta bort note:", err);
        }
    };

    return (
        <button className="delete-btn" onClick={deleteNote}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export default DeleteBtn;