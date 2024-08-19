import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaDatabase, FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';
import { forexPairs, assetMapping } from './ForexPairs';

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #131a33;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  @media (max-width: 768px) {
    height: 54vh;
  }
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

const Sidebar = ({ setSlideVisible }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

        console.log(pairs)

        const forexDataPromises = pairs.map(async (pair) => {
          // forex: https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/1/day/2023-01-09/2023-01-09?apiKey=h3x4wS45FF6rhfVAOFx0Wdq1dkXAX11R
          // crypto: https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/day/2023-01-09/2023-01-09?apiKey=h3x4wS45FF6rhfVAOFx0Wdq1dkXAX11R
          // indice: https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=h3x4wS45FF6rhfVAOFx0Wdq1dkXAX11R
          // stocks: https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=h3x4wS45FF6rhfVAOFx0Wdq1dkXAX11R
          const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${assetMapping[pair]}/prev?adjusted=true&apiKey=Im5XAoTdOy0Bkj9pncquisPmog0Nmvkd`);
          const data = await response.json();
          
          console.log(assetMapping[pair], data)

          // console.log(data)
          if( data.resultsCount <= 0 ) return null;

          return {
            asset: pair,
            buy: data.results[0]?.c.toFixed(5), // Close price (or another suitable field from your API)
            sell: data.results[0]?.o.toFixed(5), // Open price (or another suitable field from your API)
            spread: Math.abs(data.results[0]?.c - data.results[0]?.o).toFixed(5), // Example spread calculation
            volume: data.results[0]?.v,
            avgPrice: data.results[0]?.vw.toFixed(5),
            number: data.results[0]?.n,
            low: data.results[0]?.l,
            high: data.results[0]?.h,
          };
        });

        const forexData = await Promise.all(forexDataPromises);
        const mainData = forexData.filter(row => row && true);
        setData(mainData);
        const filteredData = mainData.filter(row => row.asset.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filteredData);
        setError('');
      } catch (err) {
        setError('Failed to fetch forex data.');
      }
    };

    fetchForexData();

  }, [selectedCategory]);

  useEffect(() => {
    const filteredData = data.filter(row => row && row.asset.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredData(filteredData);
  }, [searchQuery]);
  
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
              <TableRow key={index} onClick={() => dispatch(selectAsset(row))}>
                <TableCell>{row.asset}</TableCell>
                <TableCell>{row.buy}</TableCell>
                <TableCell>{row.sell}</TableCell>
                <TableCell>{row.spread}</TableCell>
                <TableCell onClick={setSlideVisible}>
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
