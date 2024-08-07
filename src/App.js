// src/App.js
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import Positions from './components/Positions';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Chart />
        <Positions />
      </div>
    </div>
  );
}

export default App;
