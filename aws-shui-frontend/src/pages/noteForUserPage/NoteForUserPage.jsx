import React from "react";
import NewNoteBtn from "../../components/NewNoteBtn/NewNoteBtn";
import Logo from "../../components/logo/Logo";
import LogoutBtn from "../../components/logoutBtn/LogoutBtn";
import UserNotes from "../../components/noteList/UserNoteList";
import ReturnBtn from "../../components/returnBtn/ReturnBtn";
import './noteForUserPage.css';

export default function NotesForUserPage() {
    const storedNote = JSON.parse(localStorage.getItem("clicked-note-storage"));
    const username = storedNote?.state?.clickedNote?.userName;
    const text = <>
        <span className="username-highlight">{username}</span> :s anteckningar
    </>;

    return (
        <div>
            <LogoutBtn />
            <Logo />
            <div className="user-noteboard">
                <div className="user-noteboard__header">
                    <ReturnBtn/>
                    <h2 className="user-noteboard__h2"> {text} </h2>
                </div>
                <UserNotes />
            </div>
            <NewNoteBtn />
        </div>
    );
}