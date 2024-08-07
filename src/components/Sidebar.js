import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <input type="text" placeholder="Search" />
      <ul>
        <li>AUD/CAD</li>
        <li>AUD/CHF</li>
        {/* Add more assets */}
      </ul>
    </div>
  );
};

export default Sidebar;
