// Dropdown.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #1c2749;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #3a3f51;
  }
`;

const DropdownContent = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: #1c2749;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  min-width: 160px;
`;

const DropdownItem = styled.a`
  color: white;
  padding: 10px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #3a3f51;
  }
`;

const Dropdown = () => {
  const [show, setShow] = useState(false);

  const toggleDropdown = () => setShow(!show);

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        All <FaCaretDown style={{ marginLeft: '10px' }} />
      </DropdownButton>
      <DropdownContent show={show}>
        <DropdownItem href="#">Most Popular</DropdownItem>
        <DropdownItem href="#">My Favorites</DropdownItem>
        <DropdownItem href="#">Currencies</DropdownItem>
        <DropdownItem href="#">Commodities</DropdownItem>
        <DropdownItem href="#">Indices</DropdownItem>
        <DropdownItem href="#">Stocks</DropdownItem>
        <DropdownItem href="#">Crypto Currencies</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
