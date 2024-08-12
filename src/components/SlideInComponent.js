import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchCurrencyData } from '../utils/api';
import { FaArrowLeft } from 'react-icons/fa';

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
  width: 320px;
  height: 100%;
  padding-bottom: 20px;
  overflow: scroll;
  scrollbar-width: none;
  background-color: #f5f5f5;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  animation: ${props => (props.isVisible ? slideIn : null)} 0.3s forwards;
  z-index: 1000;
  @media (max-width: 768px) {
    width: calc(100%);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
  padding: 16px 20px;
  background-color: rgb(7, 10, 50);
  color: white;
`;

const BodyContainer = styled.div`
  padding: 0px 20px;
`

const FlagContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  h3 {
    margin: 0px;
    color: #131722;
    font-size: 34px;
  }
  p {
    color: #6a6d78;
    margin: 0px;
    font-size: 14px;
    font-weight: 400;
  }
`

const SecondTitleContainer = styled.div`
  position: relative;
  padding-left: 80px;
`

const CurrencyImageContainer = styled.div`
  position: relative;
`;

const CurrencyImageBase = styled.img`
  width: 40px;
  height: 40px;
  top: 20px;
  left: 0px;
  border-radius: 50%;
  position: absolute;
  z-index: ${props => (props.isBaseCurrency ? 2 : 1)};
`;

const CurrencyImageQuote = styled.img`
  width: 40px;
  height: 40px;
  left: 20px;
  border-radius: 50%;
  position: absolute;
  z-index: ${props => (props.isBaseCurrency ? 2 : 1)};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 13px;
  margin-left: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 10px;
  background-color: white;
  border: none;
  border-radius: 100px;
  padding: 0px 2px;
  cursor: pointer;
  font-size: 9px;
  color: rgb(7, 10, 50);
`;

const CurrencyInfo = styled.div`
  margin-bottom: 20px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .value {
    font-weight: 500;
    font-size: 16px;
    color: #131722;
  }
  .name {
    font-size: 10px;
    color: #6a6d78;
  }
`

const InfoText2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
`

const BodyHeader = styled.div`
  padding: 10px 10px;
`

const ExchangeRate = styled.div`
  margin: 10px 0;
  color: #333;
  .big-number {
    font-size: 32px;
    font-weight: 700;
  }
  .small-number {
    font-size: 16px;
    font-weight: bold;
  }
  .quote-name {
    font-size: 10px;
    font-weight: 700;
    margin-left: 5px;
  }
  .change-rate {
    font-size: 16px;
    color: #089981;
    margin-left: 10px;
  }
  .market-open {
    font-size: 10px;
    margin-top: 0px;
    color: #42bda8;
    span {
      color: #6a6d78;
    }
  }
`;

const InfoText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: black;
  line-height: 1.5;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
  color: black;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
`;

const Button = styled.button`
  padding: 10px 13px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  background-color: #e9ecef;
  border: 1px solid #ccc;
  font-size: 13px;
  
  color: black;

  &.sell {
    background-color: #d9534f;
    border-radius: 6px;
    color: white;
    &:hover {
      background-color: #bb2d3b;
      border-color: #b02a37;
    }
  }
  &.buy {
    background-color: #5cb85c;
    color: white;
    border-radius: 6px;
    &:hover {
      background-color: #157347;
      border-color: #146c43;
    }
  }
`;

const ActionButton = styled(Button)`
  flex: 1;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const currencyToCountryCode = {
  AUD: 'AU',
  CAD: 'CA',
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
        const data = await fetchCurrencyData("AUD", "CAD");
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
    setter(prev => Math.max(0, prev - 5));
  };

  const assetName = "AUD/CAD";
  const [baseCurrency, quoteCurrency] = assetName.split('/');
  const baseCountryCode = currencyToCountryCode[baseCurrency];
  const quoteCountryCode = currencyToCountryCode[quoteCurrency];
  const imageUrl = `https://s3-symbol-logo.tradingview.com/country/${baseCountryCode}--big.svg`;
  const imageUrl2 = `https://s3-symbol-logo.tradingview.com/country/${quoteCountryCode}--big.svg`;

  if (loading) return <Container isVisible={isVisible}><div>Loading...</div></Container>;
  if (error) return <Container isVisible={isVisible}><div>Error: {error}</div></Container>;

  return (
    <Container isVisible={isVisible}>
      <TitleContainer>
        <BackButton onClick={onClose}><FaArrowLeft /></BackButton>
        <Title>{assetName}</Title>
      </TitleContainer>
      <BodyContainer>
        <BodyHeader>
          <FlagContainer>
            <CurrencyImageContainer>
              <CurrencyImageBase src={imageUrl} alt={`${baseCurrency} Flag`} isBaseCurrency />
              <CurrencyImageQuote src={imageUrl2} alt={`${quoteCurrency} Flag`} />
            </CurrencyImageContainer>
            <SecondTitleContainer>
              <h3>AUDCAD</h3>
              <p>AUSTRALIAN DOLLAR/CANADIAN DOLLAR OANDA</p>
            </SecondTitleContainer>
          </FlagContainer>
          <CurrencyInfo>
            <ExchangeRate>
              <span className='big-number'>0.9054</span>
              <sup className='small-number'>2</sup>
              <span className='quote-name'>CAD</span>
              <span className='change-rate'> +0.00 (+0.36%)</span>
              <p className='market-open'>
                - MARKET OPEN <span>(AS OF 05:42 UTC-5)</span>
              </p>
            </ExchangeRate>
            {/* <InfoText>{currencyData.change} ({currencyData.changePercentage}%)</InfoText>
            <InfoText>MARKET OPEN (AS OF {currencyData.marketClose})</InfoText>
            <InfoText>{currencyData.volume} VOLUME</InfoText> */}
            <PriceContainer>
              <div>
                <div className='value'>0.90228</div>
                <div className='name'>PREV</div>
              </div>
              <div>
                <div className='value'>0.90158</div>
                <div className='name'>OPEN</div>
              </div>
              <div>
                <div className='value'>15.155K</div>
                <div className='name'>VOLUME</div>
              </div>
              <div>
                <div className='value'>0.90158</div>
                <div className='name'>DAY'S RANGE</div>
              </div>
            </PriceContainer>
          </CurrencyInfo>
        </BodyHeader>

        {/* <InfoText>Leverage: {currencyData.leverage}</InfoText>
        <InfoText>Available Amount: {currencyData.availableAmount} AUD</InfoText> */}
        <InfoText2>
          <InfoText>Leverage: 1:100</InfoText>
          <InfoText>Available Amount: 286 AUD</InfoText>
        </InfoText2>
        <InfoText2>
          <InfoText>Amount:</InfoText>
          <InfoText>Required Margin: 65.98$</InfoText>
        </InfoText2>
        
        
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
          {/* <ActionButton className="sell">Sell {currencyData.sellPrice}</ActionButton>
          <ActionButton className="buy">Buy {currencyData.buyPrice}</ActionButton> */}
          <ActionButton className="sell">Sell 0.90219</ActionButton>
          <ActionButton className="buy">Buy 0.90237</ActionButton>
        </InputContainer>
      </BodyContainer>
    </Container>
  );
};

export default SlideInComponent;
