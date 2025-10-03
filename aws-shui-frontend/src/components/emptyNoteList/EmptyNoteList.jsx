import React from "react";
import './EmptyNoteList.css';
import logo from '../../assets/logo.png';
import NewNoteBtn from "../NewNoteBtn/NewNoteBtn";

const EmptyNoteList = () => {
    return (
        <div>   
            <h2 className="empty-note-list">Du har inga meddelanden att visa</h2>
            <NewNoteBtn />
        </div>
    );
}

export default EmptyNoteList;