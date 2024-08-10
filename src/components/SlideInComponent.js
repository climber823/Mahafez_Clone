import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchCurrencyData } from '../utils/api';
import { FaArrowLeft } from 'react-icons/fa'; // Importing an arrow icon

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: #f7f9fc;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  animation: ${props => (props.isVisible ? slideIn : null)} 0.3s forwards;
  z-index: 1000;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // Center the title and flags
  position: relative; // Allow positioning of the back button
`;

const CurrencyImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const CurrencyImage = styled.img`
  width: 30px; // Adjust size as needed
  height: 30px; // Adjust size as needed
  border-radius: 50%; // Round the flags
  margin-left: -10px; // Overlap the flags
  position: relative;
  z-index: ${props => (props.isBaseCurrency ? 2 : 1)}; // Ensure the base currency flag is on top
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #333;
  margin-left: 10px; // Add margin to space out from the flags
`;

const BackButton = styled.button`
  position: absolute; // Position the back button absolutely
  left: 20px; // Adjust as needed
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
`;

const CurrencyInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ExchangeRate = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0;
`;

const InfoText = styled.div`
  font-size: 16px;
  color: #666;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 5px; // Add margin for spacing
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;

  &.sell {
    background-color: red;
  }
  &.buy {
    background-color: green;
  }
`;

const ActionButton = styled(Button)`
  flex: 1;
  margin: 5px; // Add margin for spacing
`;

const currencyToCountryCode = {
  AUD: 'AU',
  CAD: 'CA',
  // Add more mappings as needed
};

const SlideInComponent = ({ isVisible, onClose }) => {
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(10000);
  const [stopLoss, setStopLoss] = useState(10);
  const [takeProfit, setTakeProfit] = useState(20);
  const [limitOrder, setLimitOrder] = useState(5);

  useEffect(() => {
    const getCurrencyData = async () => {
      setLoading(true);
      try {
        const data = await fetchCurrencyData();
        setCurrencyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      getCurrencyData();
    }
  }, [isVisible]);

  const handleIncrement = (setter) => {
    setter(prev => prev + 5);
  };

  const handleDecrement = (setter) => {
    setter(prev => Math.max(0, prev - 5)); // Prevent negative values
  };

  const assetName = "AUD/CAD"; // The asset name
  const [baseCurrency, quoteCurrency] = assetName.split('/'); // Split the asset name
  const baseCountryCode = currencyToCountryCode[baseCurrency]; // Get country code for AUD
  const quoteCountryCode = currencyToCountryCode[quoteCurrency]; // Get country code for CAD
  const imageUrl = `https://s3-symbol-logo.tradingview.com/country/${baseCountryCode}--big.svg`; // Base currency logo URL
  const imageUrl2 = `https://s3-symbol-logo.tradingview.com/country/${quoteCountryCode}--big.svg`; // Quote currency logo URL

  if (loading) return <Container isVisible={isVisible}><div>Loading...</div></Container>;
  if (error) return <Container isVisible={isVisible}><div>Error: {error}</div></Container>;

  return (
    <Container isVisible={isVisible}>
      <TitleContainer>
        <BackButton onClick={onClose}><FaArrowLeft /></BackButton>
        <CurrencyImageContainer>
          <CurrencyImage src={imageUrl} alt={`${baseCurrency} Flag`} isBaseCurrency />
          <CurrencyImage src={imageUrl2} alt={`${quoteCurrency} Flag`} />
        </CurrencyImageContainer>
        <Title>{assetName}</Title>
      </TitleContainer>
      <CurrencyInfo>
        <div>{baseCurrency} / {quoteCurrency}</div>
        <ExchangeRate>{currencyData.rate} CAD</ExchangeRate>
        <InfoText>{currencyData.change} ({currencyData.changePercentage}%)</InfoText>
        <InfoText>MARKET CLOSED (AS OF {currencyData.marketClose})</InfoText>
        <InfoText>{currencyData.volume} VOLUME</InfoText>
      </CurrencyInfo>
      <p>Leverage: {currencyData.leverage}</p>
      <p>Available Amount: {currencyData.availableAmount} AUD</p>

      <Label>Amount:</Label>
      <InputContainer>
        <Button onClick={() => handleDecrement(setAmount)}>-</Button>
        <Input type="number" value={amount} readOnly />
        <Button onClick={() => handleIncrement(setAmount)}>+</Button>
      </InputContainer>

      <Label>Stop Loss ($):</Label>
      <InputContainer>
        <Button onClick={() => handleDecrement(setStopLoss)}>-</Button>
        <Input type="number" value={stopLoss} readOnly />
        <Button onClick={() => handleIncrement(setStopLoss)}>+</Button>
      </InputContainer>

      <Label>Take Profit ($):</Label>
      <InputContainer>
        <Button onClick={() => handleDecrement(setTakeProfit)}>-</Button>
        <Input type="number" value={takeProfit} readOnly />
        <Button onClick={() => handleIncrement(setTakeProfit)}>+</Button>
      </InputContainer>

      <Label>Limit Order:</Label>
      <InputContainer>
        <Button onClick={() => handleDecrement(setLimitOrder)}>-</Button>
        <Input type="number" value={limitOrder} readOnly />
        <Button onClick={() => handleIncrement(setLimitOrder)}>+</Button>
      </InputContainer>

      <InputContainer style={{ justifyContent: 'space-between' }}>
        <ActionButton className="sell">Sell {currencyData.sellPrice}</ActionButton>
        <ActionButton className="buy">Buy {currencyData.buyPrice}</ActionButton>
      </InputContainer>
    </Container>
  );
};

export default SlideInComponent;
