import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
      "symbol": selectedAsset.replace("/", ""),
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
    <div id="tradingview-widget-container" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default Analysis;
