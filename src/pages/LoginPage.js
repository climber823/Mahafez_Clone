import React from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background-color: #f9f9f9; /* Optional background color */
`;

const LoginPage = () => {
  const dispatch = useDispatch();
 
  const handleLogin = async (id, pwd) => {
    // axios.post(`${process.env.REACT_APP_API_URL_DEPLOY}/api/auth/login`, {
    axios.post(`https://mahafez-server.onrender.com/api/auth/login`, {
      account_id: id, 
      password: pwd
    })
    .then(response => {
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token in localStorage

      dispatch(login(response.data.user, response.data.tableInfo));
    })
    .catch(error => {
      console.log(error)
      // console.log(error.response.data.message)
    });
  };

  return (
    <PageContainer>
      <LoginForm onLogin={handleLogin} />
    </PageContainer>
  );
};

export default LoginPage;