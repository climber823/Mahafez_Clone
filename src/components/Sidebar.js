import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaDatabase, FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';
import { forexPairs, assetMapping, mainSubMapping, extraSubMapping, nameToPairMapping, typeMapping } from './ForexPairs';

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
  transition: background-color 0.5s ease;
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

let newData = {}
const today = new Date().toISOString().split('T')[0];

const Sidebar = ({ setSlideVisible }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [dropdownWidth, setDropdownWidth] = useState('100px');
  const assetInfo = useSelector(state => state.asset.assetInfo);
  
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


        const forexDataPromises = pairs.map(async (pair) => {
          const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${assetMapping[pair]}/range/1/day/${today}/${today}?adjusted=true&apiKey=Im5XAoTdOy0Bkj9pncquisPmog0Nmvkd`);
          const data = await response.json();
          
          if (data.resultsCount <= 0) return null;

          let spread = (Math.abs(data.results[0]?.c - data.results[0]?.o)).toFixed(1)
          
          if (typeMapping[pair] == "currencies") spread = (Math.abs(data.results[0]?.c - data.results[0]?.o) * 10000).toFixed(1)

          const pairName = nameToPairMapping[pair] ? nameToPairMapping[pair] : pair
          const newPair = {
            asset: pair,
            buy: data.results[0]?.c.toFixed(5),
            sell: data.results[0]?.o.toFixed(5),
            spread: spread,
            volume: data.results[0]?.v,
            avgPrice: data.results[0]?.vw.toFixed(5),
            number: data.results[0]?.n,
            low: data.results[0]?.l,
            high: data.results[0]?.h,
          }
          newData[pairName] = newPair

          return newPair;
        });

        const forexData = await Promise.all(forexDataPromises);
        const mainData = forexData.filter(row => row && true);
        setData(mainData);
        const filteredData = mainData.filter(row => row.asset.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filteredData);
        // setError('');
      } catch (err) {
        setError('Failed to fetch forex data.');
      }
    };

    fetchForexData();
  }, [selectedCategory]);

  useEffect(() => {  
    const filteredData = data.filter(row => row && row.asset.toLowerCase().includes(searchQuery.toLowerCase()));
    for (let row of data) {
      if(row.asset == assetInfo.asset) {
        if(assetInfo?.buy == row?.buy) break;
        dispatch(selectAsset(row))
        // console.log("dispatch", row)
        break;
      }
    }
    setFilteredData(filteredData);
  }, [searchQuery, data]);

  useEffect(() => {
    const pairs = forexPairs.all;
    const wsForex = new WebSocket('wss://socket.polygon.io/forex');
    const wsCrypto = new WebSocket('wss://socket.polygon.io/crypto');
    const mainSub = pairs.map(pair => mainSubMapping[pair]).join(',');
    const extraSub = pairs.map(pair => extraSubMapping[pair]).join(',');
    
    wsForex.onopen = () => {
      wsForex.send(JSON.stringify({ action: 'auth', params: '34qaQl1z0G3wJmaFcQg1u90HgRugSLHs' }));
      wsForex.send(JSON.stringify({ action: 'subscribe', params: mainSub }));
      wsForex.send(JSON.stringify({ action: 'subscribe', params: extraSub }));
    };

    wsForex.onmessage = (event) => {
      const message = JSON.parse(event.data);
      for (let item of message) {
        if(item.ev == "C") {
          newData[item.p] = {
            ...newData[item.p],
            buy: item.a.toFixed(5),
            sell: item.b.toFixed(5),
            spread: (Math.abs(item.a - item.b) * 10000).toFixed(1)
          }
        }
        else if(item.ev == "CAS") {
          newData[item.pair] = {
            ...newData[item.pair],
            open: item.o.toFixed(5),
            close: item.c.toFixed(5),
            // volume: item.v,
            avgPrice: ((parseFloat(newData[item.pair].buy) + parseFloat(newData[item.pair].sell)) / 2).toFixed(5),
            // low: item.l.toFixed(5),
            // high: item.h.toFixed(5),
          }
        }
      }
      // console.log("newData", newData)
    };

    wsForex.onerror = (err) => {
      // setError('WebSocket error: ' + err.message);
    };

    wsForex.onclose = () => {
      // setError('Forex WebSocket connection closed');
    };

    wsCrypto.onopen = () => {
      wsCrypto.send(JSON.stringify({ action: 'auth', params: 'Im5XAoTdOy0Bkj9pncquisPmog0Nmvkd' }));
      wsCrypto.send(JSON.stringify({ action: 'subscribe', params: mainSub }));
      wsCrypto.send(JSON.stringify({ action: 'subscribe', params: extraSub }));
    };

    wsCrypto.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      for (let item of message) {
        if(item.ev == "XQ") {
          console.log(item)
          newData[item.pair] = {
            ...newData[item.pair],
            buy: item.ap.toFixed(5),
            sell: item.bp.toFixed(5),
            spread: Math.abs(item.ap - item.bp).toFixed(1)
          }
        } else if(item.ev == "XAS") {
          console.log(item)
          newData[item.pair] = {
            ...newData[item.pair],
            open: item.o.toFixed(5),
            close: item.c.toFixed(5),
            avgPrice: item.vw.toFixed(5),
            // volume: item.v,
            // low: item.l.toFixed(5),
            // high: item.h.toFixed(5),
          }
        }
      }
    };

    wsCrypto.onerror = (err) => {
      // setError('WebSocket error: ' + err.message);
    };

    wsCrypto.onclose = () => {
      // setError('Crypto WebSocket connection closed');
    };

    const dataUpdateInterval = setInterval(() => {
      setData(prevData => prevData.map(row => {
        const pairName = nameToPairMapping[row.asset] ? nameToPairMapping[row.asset] : row.asset

        if (newData[pairName]) {

          const newSpread = parseFloat(newData[pairName].spread)
          const prevSpread = parseFloat(row.spread)
          const delta = Math.abs(newSpread - prevSpread)
          const rowColor = prevSpread && delta > 0.3 ? (newSpread > prevSpread ? 'red' : newSpread < prevSpread ? 'green' : '#fff') : '#fff';
        
          const updateRow = {
            ...row,
            ...newData[pairName],
            rowColor,
          }

          return updateRow
        }
        return row;
      }));

      setTimeout(() => {
        setData(prevData => prevData.map(row => {
          return {
            ...row,
            rowColor: '#fff'
          }
        }))
      }, 1500)
    }, 5000);

    return () => {
      wsForex.close();
      clearInterval(dataUpdateInterval); // Clean up the interval on component unmount
    };

  }, []);

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
              <TableRow 
                key={index} 
                onClick={() => dispatch(selectAsset(row))}
                style={{ color: row.rowColor || '#fff' }}
              >
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
