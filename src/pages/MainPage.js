// App.js
import React from 'react';
import Sidebar from '../components/Sidebar';  // Adjust the import path if necessary
import Chart from '../components/Chart';      // Adjust the import path if necessary
import Positions from '../components/Positions';  // Adjust the import path if necessary
import Analysis from '../components/Analysis';  // Import the Analysis component
import Header from '../components/Header';  // Import the Header component
import './Main.css';  // Assuming your CSS file is named App.css

const MainPage = () => {
  return (
    <div className="app-container"> 
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">
          <div className="chart-analysis-container">
            <div className="chart">
              <Chart />
            </div>
            <div className="analysis">
              <Analysis />
            </div>
          </div>
          <Positions />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
