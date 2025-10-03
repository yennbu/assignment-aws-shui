import React, { useState } from "react";
import './user.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../hooks/useUserStore";

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const login = useUserStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!username || !password) {
            setError("❌ Du måste fylla i både användarnamn och lösenord");
            setSuccess(false);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(
                "https://747yyi0lz8.execute-api.eu-north-1.amazonaws.com/login",
                { username, password }
            );

            const user = response.data.user;
            login(user);

            localStorage.setItem("user", JSON.stringify(user));
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("❌ Fel användarnamn eller lösenord");
        } finally {
            setLoading(false);
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/create-user`;
        navigate(path);
    }

    return (
        <div className="user__container">
            <h1 className="user__headline">Logga in</h1>
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
                    {loading ? "Loggar in..." : "Logga in"}
                </button>

            </form>

            {error && <p className="user__error">{error}</p>}

            <div className="user__login">
                <p>Har du inget konto?</p>
                <button
                    className="login__btn"
                    onClick={routeChange}
                >Registrera</button>
            </div>
        </div>
    )
}

export default UserLogin;