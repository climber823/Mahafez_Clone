// App.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
// import './App.css'

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    console.log(isLoggedIn)
  }, []);

  return (
    <div>
      {isLoggedIn ? <MainPage /> : <LoginPage />}
    </div>
  );
};

export default App;
