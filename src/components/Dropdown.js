import React, { useState, useRef, useEffect } from 'react';
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
  min-width: ${props => props.minWidth || 'auto'};
  text-align: left;

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

const Dropdown = ({ onSelectCategory, selectedCategory, onWidthChange }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => setShow(!show);

  const handleSelect = (category) => {
    onSelectCategory(category);
    setShow(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      onWidthChange(buttonRef.current.offsetWidth);
    }
  }, [selectedCategory]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton ref={buttonRef} onClick={toggleDropdown}>
        {selectedCategory} <FaCaretDown style={{ marginLeft: '10px' }} />
      </DropdownButton>
      <DropdownContent show={show}>
        <DropdownItem onClick={() => handleSelect('All')}>All</DropdownItem>
        {/* <DropdownItem onClick={() => handleSelect('Most Popular')}>Most Popular</DropdownItem>
        <DropdownItem onClick={() => handleSelect('My Favorites')}>My Favorites</DropdownItem> */}
        <DropdownItem onClick={() => handleSelect('Currencies')}>Currencies</DropdownItem>
        {/* <DropdownItem onClick={() => handleSelect('Commodities')}>Commodities</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Indices')}>Indices</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Stocks')}>Stocks</DropdownItem> */}
        <DropdownItem onClick={() => handleSelect('Crypto Currencies')}>Crypto Currencies</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
