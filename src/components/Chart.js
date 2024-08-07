import React from 'react';
import { useSelector } from 'react-redux';
import TradingViewWidget from 'react-tradingview-widget';

const Chart = () => {
  const selectedAsset = useSelector(state => state.asset.selectedAsset);

  return (
    <div className="tradingview-widget">
      <TradingViewWidget symbol={selectedAsset.replace("/", "")} autosize />
    </div>
  );
};

export default Chart;
