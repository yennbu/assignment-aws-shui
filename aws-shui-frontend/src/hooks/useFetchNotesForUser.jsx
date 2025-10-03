import { useState, useEffect } from "react";
import axios from "axios";

const useFetchNotesForUser = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hämta userId från localStorage (Zustand persist)
        const storedNote = JSON.parse(localStorage.getItem("clicked-note-storage"));
        const userPK = storedNote?.state?.clickedNote?.PK;
        const userId = userPK.substring(5, 9); //Kanske en ful lösning, men det funkar! :D

        const fetchNotes = async () => {
            try {
                const response = await axios.get(
                    `https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/notes/${userId}`
                );

                setNotes(response.data || []);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || "Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return { notes, loading, error };
};

export default useFetchNotesForUser;
