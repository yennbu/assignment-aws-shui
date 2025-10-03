import React, { useState, useEffect } from "react";
import useFetchNotes from "../../hooks/useFetchNotes";
import Note from "../note/Note";
import EmptyNoteList from "../emptyNoteList/EmptyNoteList";
import "./noteList.css"

function NoteList() {
    const { notes: fetchedNotes, loading, error } = useFetchNotes();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (fetchedNotes) {
            setNotes(fetchedNotes);
        }
    }, [fetchedNotes]);

    const handleDelete = (noteId) => {
        setNotes((prev) => prev.filter((n) => n.noteId !== noteId));
    };

    const handleUpdate = (updatedNote) => {
        setNotes((prev) =>
            prev.map((n) => (n.noteId === updatedNote.noteId ? updatedNote : n))
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading notes: {error.message}</p>;
    if (notes - length === 0) return <EmptyNoteList />

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.noteId}>
                    <Note
                        note={note}
                        onDelete={handleDelete}
                        onUpdated={handleUpdate}
                    />
                </li>
            ))
            }
        </ul>
    );
}

export default NoteList;

