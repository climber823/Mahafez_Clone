// App.js
import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn ? <MainPage /> : <LoginPage />}
    </div>
  );
};

export default App;
