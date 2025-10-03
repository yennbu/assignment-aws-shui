import React, { useState } from "react";
import axios from "axios";
import './editNote.css'

const EditNote = ({ note, onUpdated, onCancel }) => { 
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSave = async (e) => {
        e.preventDefault();
        
        const storedUser = JSON.parse(localStorage.getItem("user-storage"));
        const userId = storedUser?.state?.user?.userId;
        
        try {
            const res = await axios.put(
                `https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/notes/${userId}/${note.noteId}`,
                { title, content }
            );
            onUpdated(res.data);
            onCancel();
        } catch (err) {
            console.error("Kunde inte uppdatera note:", err);
        }
    };
    
    return (
        <div className="edit-note__container">
            <form
                onSubmit={handleSave}
                className="edit-note"
            >
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="edit-note__title" />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="edit-note__content" />
                <div className="edit-note__btns">
                    <button
                        type="submit"
                        className="edit-note__btn edit-save">Spara</button>
                    <button
                        type="button"
                        className="edit-note__btn edit-cancel"
                        onClick={onCancel}>Avbryt</button>
                </div>
            </form>
        </div>
    )
}

export default EditNote;