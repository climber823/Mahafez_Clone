import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import { selectAsset } from '../redux/actions';
import Dropdown from './Dropdown';

const SidebarContainer = styled.div`
  width: 460px;
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
      const apiKey = '75c46adb935f4fd39d47e76442000afd';
      try {
        const response = await axios.get('https://api.twelvedata.com/forex_pairs', {
          params: {
            apikey: apiKey
          }
        });
        const forexData = response.data.data.map(pair => ({
          asset: pair.symbol,
          buy: pair.bid,
          sell: pair.ask,
          spread: (pair.ask - pair.bid).toFixed(5)
        }));
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
