import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin: auto;
  text-align: right; /* Align text to the right for Arabic */
`;

const Title = styled.h2`
  font-size: 26px;
  margin: 0;
  padding: 10px 0px;
  color: #333;
  text-align: center;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginForm = ({ onLogin  }) => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (clientId && password) {
      onLogin(clientId, password); // Call the onLogin prop to indicate successful login
    }
  };

  return (
    <Container>
      <Title>Customer Portal</Title>
      <Description>Please enter the required data and press the continue button.</Description>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Container>
  );
};

export default LoginForm;