import React from 'react';
import RegisterForm from '../components/RegisterForm';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background-color: #f9f9f9; /* Optional background color */
`;

const RegisterPage = () => {

  return (
    <PageContainer>
      <RegisterForm/>
    </PageContainer>
  );
};

export default RegisterPage;