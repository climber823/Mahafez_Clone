import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart';
import Positions from '../components/Positions';
import Analysis from '../components/Analysis';
import Header from '../components/Header';
import SlideInComponent from '../components/SlideInComponent';

// Styled Components
const AppContainer = styled.div`
  background-color: #131a33;
  color: white;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  scrollbar-width: none;
  border-bottom: 0.6vh solid grey;
  @media (max-width: 768px) {
    border: 0.6vh solid grey;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    border-top: 0.6vh solid grey;
  }
`;

const HeaderWrapper = styled.div`
  transition: margin-right 0.3s ease;
  margin-right: ${({ isVisible }) => (isVisible ? '320px' : '0')};
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const SidebarWrapper = styled.div`
  width: 360px;
  background-color: #f8f8f8;
  border-left: 0.6vh grey solid;
  border-right: 0.6vh grey solid;

  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  border-right: 0.6vh solid grey;
  transition: margin-right 0.3s ease;
  margin-right: ${({ isVisible }) => (isVisible ? '320px' : '0')};
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-right: 0;
    border: none;
  }
`;

const ChartAnalysisContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.6vh grey solid;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: 40vh;
  }
`;

const ChartContainer = styled.div`
  flex: 0 0 100%;
  margin: 0;
  @media (min-width: 768px) {
    flex: 0 0 65%;
  }
`;

const AnalysisContainer = styled.div`
  width: 100%;
  border-left: 0.6vh grey solid;
  @media (max-width: 768px) {
    display: none;
    border: none;
  }
`;

// Main Component
const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const setSlideVisible = () => {
    setIsVisible(true);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const menuVisibility = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <AppContainer>
      <HeaderWrapper isVisible={isVisible}>
        <Header dropdownVisible={dropdownVisible} setDropdownVisible={menuVisibility}/> {/* Keep Header full-width */}
      </HeaderWrapper>
      <Container>
        <SidebarWrapper>
          <Sidebar setSlideVisible={setSlideVisible}/>
        </SidebarWrapper>
        <ContentWrapper isVisible={isVisible}>
          <ChartAnalysisContainer>
            <ChartContainer>
              <Chart />
            </ChartContainer>
            <AnalysisContainer>
              <Analysis />
            </AnalysisContainer>
          </ChartAnalysisContainer>
          <Positions />
        </ContentWrapper>
        {isVisible && <SlideInComponent isVisible={isVisible} onClose={toggleVisibility} />}
      </Container>
      {/* <SidebarButton onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Asset
      </SidebarButton> */}
    </AppContainer>
  );
};

export default MainPage;
