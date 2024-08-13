import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';
import forexPairs from './ForexPairs';
import { subscribeToForex, closeSocket } from '../utils/websocket';

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
    const fetchForexData = () => {
      const category = getCategory(selectedCategory);
      const pairs = forexPairs[category] || forexPairs.all;

      // Subscribe to WebSocket and update data
      subscribeToForex((newData) => {
        const formattedData = pairs.map(pair => {
          const [base, target] = pair.split('/');
          const priceData = newData.prices.find(p => p.instrument === pair);
          return {
            asset: pair,
            buy: priceData ? priceData.bid : 'N/A',
            sell: priceData ? priceData.ask : 'N/A',
            spread: priceData ? (priceData.ask - priceData.bid).toFixed(5) : 'N/A'
          };
        });
        setData(formattedData);
        setError(''); // Clear error if data is fetched successfully
      });
    };

    fetchForexData();

    return () => {
      // Clean up WebSocket connection
      closeSocket();
    };
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
