import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';

const Chart = () => {
  return (
    <div className="tradingview-widget">
      <TradingViewWidget symbol="OANDA:AUDCAD" autosize />
    </div>
  );
};

export default Chart;
