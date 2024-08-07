import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';
import ForexPairs from './ForexPairs';

const SidebarContainer = styled.div`
  width: 470px;
  background-color: #131a33;
  color: #fff;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Header = styled.h2`
  margin: 0 0 10px 0;
  padding: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #1c2749;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1c2749;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #3a3f51;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedAsset = useSelector(state => state.asset.selectedAsset);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchForexData = async () => {
      const forexPairs = [
        "AUD/CAD",
        "AUD/CHF",
        "AUD/HKD",
        "AUD/JPY",
        "AUD/NZD",
        "AUD/SGD",
        "AUD/USD",
        "CAD/CHF",
        "CAD/HKD",
        "CAD/JPY",
        "CAD/SGD",
        "CHF/HKD",
        "CHF/JPY",
        "EUR/AUD",
        "EUR/CAD",
        "EUR/CHF",
        "EUR/CZK",
        "EUR/DKK",
        "EUR/GBP",
        "EUR/HKD",
        "EUR/HUF",
        "EUR/JPY",
        "EUR/NOK",
        "EUR/NZD",
        "EUR/PLN",
        "EUR/SEK",
        "EUR/SGD",
        "EUR/USD",
        "GBP/AUD",
        "GBP/CAD",
        "GBP/CHF",
        "GBP/HKD",
        "GBP/JPY",
        "GBP/NZD",
        "GBP/PLN",
        "GBP/SGD",
        "GBP/USD",
        "HKD/JPY",
        "NZD/CAD",
        "NZD/CHF",
        "NZD/HKD",
        "NZD/JPY",
        "NZD/SGD",
        "NZD/USD",
        "SGD/CHF",
        "SGD/HKD",
        "SGD/JPY",
        "USD/CAD",
        "USD/CHF",
        "USD/CNH",
        "USD/CZK",
        "USD/DKK",
        "USD/HKD",
        "USD/HUF",
        "USD/INR",
        "USD/JPY",
        "USD/MXN",
        "USD/NOK",
        "USD/PLN",
        "USD/SAR",
        "USD/SEK",
        "USD/SGD",
        "USD/THB",
      ];
    
      try {
        // Step 2: Fetch the exchange rates for each base currency
        const baseCurrencies = Array.from(new Set(forexPairs.map(pair => pair.split('/')[0])));
        const forexDataPromises = baseCurrencies.map(async (baseCurrency) => {
          const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
          return response.data;
        });
    
        const exchangeRates = await Promise.all(forexDataPromises);
    
        // Combine the fetched data into a single object
        const ratesMap = {};
        exchangeRates.forEach(rate => {
          ratesMap[rate.base] = rate.rates;
        });
    
        const forexData = forexPairs.map((pair) => {
          const [base, target] = pair.split('/');
          const buy = ratesMap[base][target];
          const sell = 1 / buy;  // Approximating ask price
          
          return {
            asset: pair,
            buy: buy ? buy.toFixed(5) : "null",
            sell: sell ? sell.toFixed(5) : "null",
            spread: buy && sell ? (sell - buy).toFixed(1) : "null"
          };
        });
    
        console.log(forexData);
        setData(forexData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchForexData();
  }, []);

  return (
    <SidebarContainer>
      <Header>Mahafez</Header>
      <SearchBox>
        <Dropdown />
        <SearchInput type="text" placeholder="Search" />
      </SearchBox>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Buy</TableCell>
            <TableCell>Sell</TableCell>
            <TableCell>Spread</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} onClick={() => dispatch(selectAsset(row.asset))}>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.buy}</TableCell>
              <TableCell>{row.sell}</TableCell>
              <TableCell>{row.spread}</TableCell>
              <TableCell>
                <IconWrapper>
                  <FaInfoCircle />
                </IconWrapper>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </SidebarContainer>
  );
};

export default Sidebar;
