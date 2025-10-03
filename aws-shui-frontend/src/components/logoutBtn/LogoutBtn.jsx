import React from "react";
import logoutIMG from "../../assets/logout.PNG";
import "./logoutBtn.css";
import useUserStore from "../../hooks/useUserStore";

const LogoutBtn = () => {
    const logout = useUserStore((state) => state.logout);

    return (
        <button className="logout-btn" onClick={logout}>
            <img src={logoutIMG} alt="logout" />
            <p className="logout--hover">Logga ut</p>
        </button>
    )
}

export default LogoutBtn;