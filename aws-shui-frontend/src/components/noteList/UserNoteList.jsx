import useFetchNotesForUser from "../../hooks/useFetchNotesForUser";
import Note from "../note/Note";
import "./noteList.css"

const UserNotes = ({ onDelete, onUpdated }) => {
    const { notes, loading, error } = useFetchNotesForUser();

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li key={note.noteId}>
                    <Note note={note} onDelete={onDelete} onUpdated={onUpdated} />
                </li>
            ))}
        </ul>
    );
};

export default UserNotes;
