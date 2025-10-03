import React, { useState } from "react";
import './user.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = ({ onUserAdded }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("❌ Du måste fylla i både användarnamn och lösenord");
            setSuccess(false);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post("https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/users",
                { username, password }
            );

            if (onUserAdded) onUserAdded(response.data)

            setUsername("");
            setPassword("");
            setSuccess(true);

        } catch (error) {
            console.error(error);
            setError(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    return (
        <div className="user__container">
            <h1 className="user__headline">Registrering</h1>
            <form action="" className="user__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="user__input user__name"
                    placeholder="Användarnamn"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="user__input user__password"
                    placeholder="Lösenord"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="user__btn"
                    disabled={loading}
                >
                    {loading ? "Skapar..." : "Skapa användare"}
                </button>

            </form>

            {error && <p className="user__error">{error}</p>}
            {success && <p className="user__success">Användare skapad!</p>}

            <div className="user__login">
                <p>Har du redan ett konto?</p>
                <button
                    onClick={routeChange}
                    className="login__btn">Logga in</button>
            </div>
        </div>
    )
}

export default CreateUser;