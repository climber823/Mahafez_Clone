import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Modal, ChangePasswordContent, PersonalDetailsContent, WithdrawalRequestContent, AccountBalanceContent } from './Modal'; // Import the Modal component
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions';  

const Header = ({ dropdownVisible, setDropdownVisible }) => {
  const userInfo = useSelector(state => state.auth.userInfo);

  const [modalType, setModalType] = useState(null); // Add state for modal type
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();

  const handleLogout = () => {  
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openModal = (type) => {
    setModalType(type);
    setDropdownVisible(false); // Close dropdown when modal is opened
  };

  const closeModal = () => {
    setModalType(null);
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <HeaderContainer dropdownVisible={dropdownVisible}>
      <HeaderLeft>
        <HeaderTitle>Mahafez</HeaderTitle>
      </HeaderLeft>
      <HeaderCenter>
        <HeaderItem>P&L ($): <NegativeValue>{userInfo.p_l.toFixed(2)}$</NegativeValue></HeaderItem>
        <HeaderItem>Balance: <Value>{userInfo.balance.toFixed(2)}$</Value></HeaderItem>
        <HeaderItem>Equity: <Value>{userInfo.equity.toFixed(2)}$</Value></HeaderItem>
        <HeaderItem>Free Margin: <PositiveValue>{userInfo.free_margin.toFixed(2)}$</PositiveValue></HeaderItem>
        <HeaderItem>Used Margin: <Value>{userInfo.used_margin.toFixed(2)}$</Value></HeaderItem>
        <HeaderItem>Margin Level: <Value>{userInfo.margin_level.toFixed(2)}%</Value></HeaderItem>
      </HeaderCenter>
      <HeaderRight>
        <Dropdown ref={dropdownRef}>
          <Welcome onClick={toggleDropdown}>
            Welcome {userInfo.firstname} <ArrowDown />
          </Welcome>
          <DropdownContent visible={dropdownVisible}>
            <DropdownItem href="#" onClick={() => openModal('changePassword')}>Change your password</DropdownItem>
            <DropdownItem href="#" onClick={() => openModal('accountBalance')}>Account Balance</DropdownItem>
            <DropdownItem href="#" onClick={() => openModal('personalDetails')}>Personal Details</DropdownItem>
            <DropdownItem href="#" onClick={() => openModal('withdrawMoney')}>Withdraw Money</DropdownItem>
            <DropdownItem href="#" onClick={() => openModal('language')}>Language</DropdownItem>
            <DropdownItem href="#" onClick={handleLogout}>Logout</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </HeaderRight>

      {modalType && (
        <Modal
          title={
            modalType === 'changePassword' ? 'Change your password' :
            modalType === 'accountBalance' ? 'Account Balance' :
            modalType === 'personalDetails' ? 'Personal Details' :
            modalType === 'withdrawMoney' ? 'Withdrawal Request' :
            modalType === 'language' ? 'Interface Language' :
            'Modal Title'
          }
          onClose={closeModal}
        >
          {modalType === 'changePassword' && <ChangePasswordContent />}
          {modalType === 'accountBalance' && <AccountBalanceContent />}
          {modalType === 'personalDetails' && <PersonalDetailsContent />}
          {modalType === 'withdrawMoney' && <WithdrawalRequestContent />}
          {modalType === 'language' && <p>English</p>}
        </Modal>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.6vh solid grey;
  padding: 10px 10px;
  padding-left: 10px;
  font-size: 14px;
  background-color: rgb(7, 10, 50);
  color: white;
  transition: margin-right 0.3s ease; /* Transition effect for content margin */
  margin-right: ${({ isVisible }) => (isVisible ? '440px' : '0')};
  @media (max-width: 768px) {
    border: none;
    transition: padding-bottom 0.3s ease;
    padding-bottom: ${({ dropdownVisible }) => (dropdownVisible ? '230px' : '10px')};
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  flex: 1;
  text-align: right;
  position: relative;
`;

const HeaderTitle = styled.span`
  font-size: 18px;
  padding-left: 10px;
`;

const HeaderItem = styled.span`
  margin: 0 10px;
`;

const Value = styled.span`
`;

const NegativeValue = styled(Value)`
  color: red;
`;

const PositiveValue = styled(Value)`
  color: green;
`;

const Welcome = styled.span`
  cursor: pointer;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const ArrowDown = styled.i`
  border: solid white;
  border-width: 0 2px 2px 0; /* Reduced the border width for a smaller arrow */
  display: inline-block;
  padding: 2px; /* Reduced the padding to make the arrow smaller */
  transform: rotate(45deg);
  margin-left: 5px;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  background-color: rgb(7, 10, 50);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  margin-top: 5px;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100vw;
    padding-left: 16px;
  }
`;

const DropdownItem = styled.a`
  color: white;
  padding: 10px 14px;
  text-decoration: none;
  display: block;
  font-size: 12px;
  background-color: rgb(7, 10, 50);
  white-space: nowrap;
  text-align: left;

  &:hover {
    background-color: #333;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default Header;
