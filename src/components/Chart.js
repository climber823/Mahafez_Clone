// src/components/Chart.js
import React, { useEffect } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

const Chart = () => {
  return (
    <div className="chart">
      <TradingViewWidget symbol="OANDA:AUDCAD" />
    </div>
  );
};

export default Chart;
