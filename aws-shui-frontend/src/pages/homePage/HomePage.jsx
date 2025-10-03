import React from "react";
import './HomePage.css';
import NewNoteBtn from "../../components/NewNoteBtn/NewNoteBtn";
import Logo from "../../components/logo/Logo";
import NoteList from "../../components/noteList/NoteList";
import LogoutBtn from "../../components/logoutBtn/LogoutBtn";

export default function HomePage() {
    return (
        <div className="noteList">
            <LogoutBtn />
            <Logo />   
            <NoteList />
            <NewNoteBtn />
        </div>
    );
}