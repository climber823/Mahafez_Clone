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
`;

const Container = styled.div`
  display: flex;
  font-size: 12px;
  width: 100vw !important;
  height: 94.5vh;
  border-bottom: 0.6vh solid grey;
`;

const HeaderWrapper = styled.div`
  transition: margin-right 0.3s ease;
  margin-right: ${({ isVisible }) => (isVisible ? '440px' : '0')};
`;

const SidebarWrapper = styled.div`
  width: 400px;
  background-color: #f8f8f8;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  border-right: 0.6vh solid grey;
  transition: margin-right 0.3s ease;
  margin-right: ${({ isVisible }) => (isVisible ? '440px' : '0')};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChartAnalysisContainer = styled.div`
  display: flex;
  border-bottom: 0.6vh grey solid;
`;

const ChartContainer = styled.div`
  flex: 0 0 65%;
  margin: 0px;
`;

const AnalysisContainer = styled.div`
  width: 100%;
  height: 100%;
  border-left: 0.6vh grey solid;
`;

const TradingViewWidget = styled.div`
  width: 100%;
  height: 450px;
  border-right: 0.6vh grey solid;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #fff;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const SidebarButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  cursor: pointer;
`;

// Main Component
const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <AppContainer>
      <HeaderWrapper isVisible={isVisible}>
        <Header /> {/* Keep Header full-width */}
      </HeaderWrapper>
      <Container>
        <SidebarWrapper>
          <Sidebar />
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
      <SidebarButton onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Asset
      </SidebarButton>
    </AppContainer>
  );
};

export default MainPage;
