import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faLanguage } from '@fortawesome/free-solid-svg-icons';

export const ChangePasswordContent = ({ onClose }) => (
  <FormContainer>
    <InputField type="password" placeholder="Current password" />
    <InputField type="password" placeholder="New Password" />
  </FormContainer>
);

export const PersonalDetailsContent = () => {
  const userInfo = useSelector(state => state.auth.userInfo);

  return (
    <PersonalDetails>
      <p className='row'>
        <p className='col-4'>First Name</p>
        <p className='col-8'>{userInfo.firstname}</p>
      </p>
      <p className='row'>
        <p className='col-4'>Last Name</p>
        <p className='col-8'>{userInfo.lastname}</p>
      </p>
      <p className='row'>
        <p className='col-4'>Email</p>
        <p className='col-8'>{userInfo.email}</p>
      </p>
      <p className='row'>
        <p className='col-4'>Phone Number</p>
        <p className='col-8'>{userInfo.phone}</p>
      </p>
    </PersonalDetails>
  )
};


export const AccountBalanceContent = () => {
  const userInfo = useSelector(state => state.auth.userInfo);

  return (
    <PersonalDetails>
      <p className='row'>
        <p className='col-7'>P & L</p>
        <p className='col-5'>{userInfo.p_l}$</p>
      </p>
      <p className='row'>
        <p className='col-7'>Balance</p>
        <p className='col-5'>{userInfo.balance}$</p>
      </p>
      <p className='row'>
        <p className='col-7'>Equity</p>
        <p className='col-5'>{userInfo.equity}$</p>
      </p>
      <p className='row'>
        <p className='col-7'>Free Margin</p>
        <p className='col-5'>{userInfo.free_margin}$</p>
      </p>
      <p className='row'>
        <p className='col-7'>Used Margin</p>
        <p className='col-5'>{userInfo.used_margin}$</p>
      </p>
      <p className='row'>
        <p className='col-7'>Margin Level</p>
        <p className='col-5'>{userInfo.margin_level}%</p>
      </p>
    </PersonalDetails>
  )
};

export const WithdrawalRequestContent = () => (
  <div>
    <p>You don't have enough margin for withdrawal</p>
  </div>
);

export const Modal = ({ title, children, onClose }) => (
  <ModalOverlay>
    <ModalContainer>
      <ModalTitle>
        { title === "Change your password" && <FontAwesomeIcon icon={faKey} aria-hidden="true" /> }
        { title === "Personal Details" && <FontAwesomeIcon icon={faUser} aria-hidden="true" /> }
        { title === "Interface Language" && <FontAwesomeIcon icon={faLanguage} aria-hidden="true" /> }
        {" "}
        {title}
      </ModalTitle>
      <ModalContent>{children}</ModalContent>
      {
        title === "Change your password" && 
        <ButtonContainer>
          <ContinueButton>Continue</ContinueButton>
          <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
        </ButtonContainer>
      }
      {
        title !== "Change your password" && 
        <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
      }
    </ModalContainer>
  </ModalOverlay>
);

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgb(7, 10, 50);
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 600px;
  margin-bottom: 50vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ModalTitle = styled.h5`
  margin-top: 0;
  color: white;
`;

const ModalContent = styled.div`
  margin: 20px 0;
  color: white;
`;

const ModalCloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  float: right;

  &:hover {
    background: #0056b3;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  background: #1a1b36;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContinueButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #218838;
  }
`;

const PersonalDetails = styled.div`
  p {
    margin-bottom: 2px;
  }
`
