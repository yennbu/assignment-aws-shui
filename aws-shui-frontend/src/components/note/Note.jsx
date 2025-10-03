import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './note.css';
import DeleteBtn from "../deleteBtn/DeleteBtn";
import EditBtn from "../editBtn/EditBtn";
import EditNote from "../editNote/EditNote";
import useUserStore from "../../hooks/useUserStore";
import useClickedNoteStore from "../../hooks/useClickedNoteStore";


const Note = ({ note, onDelete, onUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const currentUser = useUserStore((state) => state.user);
    const setClickedNote = useClickedNoteStore((state) => state.setClickedNote);
    const navigate = useNavigate();

    if (isEditing) {
        return (
            <EditNote
                note={note}
                onUpdated={onUpdated}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    const date = new Date(note.createdAt).toLocaleDateString("sv-SE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const handleClick = () => {
        let path = `/notes-for-user`;
        navigate(path);
        setClickedNote(note);
    }


    return (
        <div className="note__container" >
            <section className="note">
                <div className="note__header">
                    <h2 className="note__title">{note.title}</h2>
                    <h3 className="note__date">{date}</h3>
                </div>
                <p>{note.content}</p>
                <div className="note__footer">
                    <p className="note__user-name" onClick={handleClick}>{note.userName}</p>
                    <div className="note__btns">
                        {currentUser?.username === note.userName && (
                            <>
                                <EditBtn onStartEdit={() => setIsEditing(true)} />
                                <DeleteBtn noteId={note.noteId} onDelete={onDelete} />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Note;