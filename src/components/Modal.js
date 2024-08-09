import React from 'react';
import styled from 'styled-components';

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
`;

const ModalTitle = styled.h2`
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
  font-size: 16px;
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
  font-size: 16px;

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
  font-size: 16px;

  &:hover {
    background: #218838;
  }
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

export const ChangePasswordContent = ({ onClose }) => (
  <FormContainer>
    <InputField type="password" placeholder="Current password" />
    <InputField type="password" placeholder="New Password" />
    {/* <ButtonContainer>
      <ContinueButton>Continue</ContinueButton>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ButtonContainer> */}
  </FormContainer>
);

export const PersonalDetailsContent = () => (
  <div>
    <p>First Name: أحمد شعلان</p>
    <p>Last Name: حسن</p>
    <p>Email: alhdydyabwshhdalhdydy@gmail.com</p>
    <p>Phone Number: 9647738449970</p>
  </div>
);

export const WithdrawalRequestContent = () => (
  <div>
    <p>You don't have enough margin for withdrawal</p>
  </div>
);

export const Modal = ({ title, children, onClose }) => (
  <ModalOverlay>
    <ModalContainer>
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{children}</ModalContent>
      {
        title == "Change your password" && 
        <ButtonContainer>
          <ContinueButton>Continue</ContinueButton>
          <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
        </ButtonContainer>
      }
      {
        title != "Change your password" && 
        <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
      }
    </ModalContainer>
  </ModalOverlay>
);
