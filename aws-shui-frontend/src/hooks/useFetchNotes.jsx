import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetchNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/')
            .then((response) => {
                setNotes(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { notes, loading, error };
}

export default useFetchNotes;