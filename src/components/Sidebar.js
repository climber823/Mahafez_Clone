import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';
import forexPairs from './ForexPairs';
import { fetchCurrencyData } from '../utils/api';
import { toContainElement } from '@testing-library/jest-dom/matchers';

const SidebarContainer = styled.div`
  width: 100%;
  background-color: #131a33;
  color: #fff;
  padding: 10px;
  height: 94.5vh;
  box-sizing: border-box;
  overflow-y: auto;
  border-left: 0.6vh grey solid;
  border-right: 0.6vh grey solid;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  flex-grow: 1;
  min-width: ${props => props.minWidth || '100px'};
  transition: min-width 0.3s ease;
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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedAsset = useSelector(state => state.asset.selectedAsset);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [dropdownWidth, setDropdownWidth] = useState('100px');

  const getCategory = (name) => {
    switch(name) {
      case "All": return "all";
      case "Most Popular": return "popular";
      case "My Favorites": return "favorites";
      case "Currencies": return "currencies";
      case "Commodities": return "commodities";
      case "Indices": return "indices";
      case "Stocks": return "stocks";
      case "Crypto Currencies": return "crypto";
      default: return "all";
    }
  }

  useEffect(() => {
    const fetchForexData = async () => {
      try {
        const category = getCategory(selectedCategory);
        const pairs = forexPairs[category] || forexPairs.all;

        const baseCurrencies = Array.from(new Set(pairs.map(pair => pair.split('/')[0])));
        const forexDataPromises = pairs.map(async (pair) => {
          try {
            // const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            const from_currency = pair.split('/')[0]
            const to_currency = pair.split('/')[1] ? pair.split('/')[1] : "USD"
            const apiKey = 'N5DPQO87W3JVK201'; 
            console.log("from_currency", from_currency)
            console.log("to_currency", to_currency)
            const response = await fetchCurrencyData(from_currency, to_currency);
            return response["Realtime Currency Exchange Rate"];
          } catch (err) {
            // console.error(`Error fetching data for ${pair}:`, err);
            return null;
          }
        });

        // const exchangeRates = await Promise.all(forexDataPromises);

        // console.log("forexDataPromises", forexDataPromises)

        // const buyMap = {};
        // const sellMap = {};
        // exchangeRates.forEach(rate => {
        //   if (rate) {
        //     buyMap[rate["1. From_Currency Code"]] = rate["9. Ask Price"];
        //     sellMap[rate["1. From_Currency Code"]] = rate["8. Bid Price"]
        //   }
        // });

        // const forexData = pairs.map((pair) => {
        //   const [base, target] = pair.split('/');
        //   const buy = buyMap[base] ? buyMap[base] : null;
        //   const sell = sellMap[base] ? sellMap[base] : null;

        //   return {
        //     asset: pair,
        //     buy: buy ? buy.toFixed(5) : "null",
        //     sell: sell ? sell.toFixed(5) : "null",
        //     spread: buy && sell ? (sell - buy).toFixed(1) : "null"
        //   };
        // });

        // setData(forexData);
        setError(''); // Clear error if data is fetched successfully
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Clear existing data
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchForexData();
  }, [selectedCategory]);

  const filteredData = data.filter(row => row.asset.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SidebarContainer>
      <SearchBox>
        <Dropdown 
          onSelectCategory={setSelectedCategory} 
          selectedCategory={selectedCategory} 
          onWidthChange={setDropdownWidth}
        />
        <SearchInput 
          type="text" 
          placeholder="Search" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          minWidth={dropdownWidth}
        />
      </SearchBox>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No data available</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </SidebarContainer>
  );
};

export default Sidebar;
