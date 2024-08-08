import React from 'react';
import './Header.css';  // Importing the CSS for the header component

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <span className="header-title">Mahafez</span>  {/* Add the Mahafez title */}
      </div>
      <div className="header-center">
        <span className="header-item">P&L ($): <span className="value negative">0.00$</span></span>
        <span className="header-item">Balance: <span className="value">1.89$</span></span>
        <span className="header-item">Equity: <span className="value">1.89$</span></span>
        <span className="header-item">Free Margin: <span className="value">1.89$</span></span>
        <span className="header-item">Used Margin: <span className="value">0.00$</span></span>
        <span className="header-item">Margin Level: <span className="value">0.00%</span></span>
      </div>
      <div className="header-right">
        <span className="welcome">Welcome <strong>DareDev</strong></span>
      </div>
    </div>
  );
};

export default Header;
