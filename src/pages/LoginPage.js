import React from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background-color: #f9f9f9; /* Optional background color */
`;

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <PageContainer>
      <LoginForm onLogin={handleLogin} />
    </PageContainer>
  );
};

export default LoginPage;