// src/components/Positions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setPositions(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="positions">
      <h2>Open Positions</h2>
      <table>
        <thead>
          <tr>
            <th>Deal ID</th>
            <th>Asset</th>
            <th>Direction</th>
            <th>Open Rate</th>
            <th>Close Rate</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map(position => (
            <tr key={position.id}>
              <td>{position.dealId}</td>
              <td>{position.asset}</td>
              <td>{position.direction}</td>
              <td>{position.openRate}</td>
              <td>{position.closeRate}</td>
              <td>{position.pl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Positions;
