import { useState } from 'react';
import './App.css';
import HomePage from "./pages/homePage/HomePage.jsx";
import UserLoginPage from './pages/userLoginPage/UserLoginPage.jsx';
import useUserStore from './hooks/useUserStore.jsx';

function App() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <>
      {isLoggedIn ? <HomePage /> : <UserLoginPage />}
    </>
  )
}

export default App
