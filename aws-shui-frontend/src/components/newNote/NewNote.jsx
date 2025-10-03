import React, { useState } from "react";
import './newNote.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewNote({ onNoteAdded }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("❌ Du måste fylla i både rubrik och innehåll");
            setSuccess(false);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        const storedUser = JSON.parse(localStorage.getItem("user-storage"));
        const userId = storedUser?.state?.user?.userId;

        try {
            const response = await axios.post(`https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/notes/${userId}`,
                { title, content }
            );

            if (onNoteAdded) onNoteAdded(response.data)

            setTitle("");
            setContent("");
            setSuccess(true);

        } catch (error) {
            console.error(error);
            setError("Kunde inte lägga till meddelande")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="new-note__container">
            <form action="" className="new-note__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="new-note__title"
                    placeholder="Rubrik"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    type="text"
                    className="new-note__content"
                    placeholder="Skriv din anteckning här"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="new-note__btn"
                    disabled={loading}
                >
                    {loading ? "Publicerar..." : "Publicera"}
                </button>
            </form>

            {success && <p className="new-note__success">Ditt meddelande är publicerat! 🐎</p>}
            {error && <p className="new-note__error">{error}</p>}
        </div>
    );
}

export default NewNote;