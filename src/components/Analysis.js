import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AnalysisWidget = styled.div`
  background-color: #282c34;
  color: #fff;
  border-radius: 10px;
  text-align: center;
`;

const TimeFrameSelector = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TimeFrameButton = styled.button`
  padding: 5px 10px;
  background-color: #3a3f47;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;

  &.active {
    background-color: #626a74;
  }
`;

const AnalysisResults = styled.div`
  margin-top: 20px;
`;

const Gauge = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  border-radius: 100px 100px 0 0;
  background-color: #3a3f47;
  margin: auto;
`;

const GaugeIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: bottom center;
  width: 4px;
  height: 100%;
  background-color: #4caf50;
`;

const AnalysisSummary = styled.div`
  margin-top: 20px;
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
    <AnalysisWidget>
      <div id="tradingview-widget-container" className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </AnalysisWidget>
  );
};

export default Analysis;
