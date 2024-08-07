// App.js
import React from 'react';
import Sidebar from './components/Sidebar';  // Adjust the import path if necessary
import Chart from './components/Chart';      // Adjust the import path if necessary
import Positions from './components/Positions';  // Adjust the import path if necessary
import './App.css';  // Assuming your CSS file is named App.css

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Chart />
        <Positions />
      </div>
    </div>
  );
};

export default App;
