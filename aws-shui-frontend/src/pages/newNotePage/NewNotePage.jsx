import React from "react";
import './newNotePage.css';
import Logo from "../../components/logo/Logo";
import NewNote from "../../components/newNote/NewNote";
import ReturnBtn from "../../components/returnBtn/ReturnBtn";

function NewNotePage() {
    return (
        <>
            <Logo />
            <div className="return">
                <ReturnBtn />
            </div>
            <NewNote />
        </>
    );
}

export default NewNotePage;