import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { tradingViewMapping } from './ForexPairs';

const AnalysisWidget = styled.div`
  background-color: #282c34;
  color: #fff;
  border-radius: 10px;
  text-align: center;
`;

const Analysis = () => {
  const selectedAsset = useSelector(state => state.asset.selectedAsset);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "interval": "1D",
      "width": "100%",
      "isTransparent": false,
      "height": 450,
      "symbol": tradingViewMapping[selectedAsset],
      "showIntervalTabs": true,
      "locale": "en",
      "colorTheme": "dark",
      "studies": [
        "MACD@tv-basicstudies",
        "StochasticRSI@tv-basicstudies",
        "RSI@tv-basicstudies"
      ]
    });

    const container = document.getElementById("tradingview-widget-container");
    // Clear previous widget
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(script);
  }, [selectedAsset]);

  return (
    <AnalysisWidget>
      <div id="tradingview-widget-container" className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </AnalysisWidget>
  );
};

export default Analysis;
