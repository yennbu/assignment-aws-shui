import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import ErrorElement from "./Error/ErrorElement.jsx";
import NewNotePage from "./pages/newNotePage/NewNotePage.jsx";
import CreateUserPage from "./pages/createUserPage/createUserPage.jsx";
import UserLoginPage from "./pages/userLoginPage/UserLoginPage.jsx";
import NotesForUserPage from "./pages/noteForUserPage/NoteForUserPage.jsx";

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />,
        errorElement: <ErrorElement/>
    },
    {
        path: "/new-note",
        element: <NewNotePage />
    },
    {
        path: "/create-user",
        element: <CreateUserPage />
    },
    {
        path: "/login",
        element: <UserLoginPage />
    },
    {
        path: "/notes-for-user",
        element: <NotesForUserPage />
    }
]);

export default router;