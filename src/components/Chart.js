import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TradingViewWidget from 'react-tradingview-widget';
import { tradingViewMapping } from './ForexPairs';

// Styled Container
const WidgetContainer = styled.div`
  width: 100%;
  height: 100%; /* Set the height to 100% */
  display: flex;
  align-items: center; /* Center widget vertically */
  justify-content: center; /* Center widget horizontally */
`;

const Chart = () => {
  const selectedAsset = useSelector(state => state.asset.selectedAsset);

  return (
    <WidgetContainer>
      <TradingViewWidget 
        symbol={tradingViewMapping[selectedAsset]} 
        autosize 
        theme="dark" 
      />
    </WidgetContainer>
  );
};

export default Chart;
