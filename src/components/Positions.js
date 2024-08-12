import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1a1a2e;
  border-radius: 8px;
  overflow-x: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tabs = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? "#0f3460" : "#16213e")};
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0f3460;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
`;

const Thead = styled.thead`
  background-color: #0f3460;
`;

const Th = styled.th`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Tbody = styled.tbody`
  background-color: #16213e;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #1f4068;
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Positions = () => {
  const [activeTab, setActiveTab] = useState("closedPositions");

  const renderTableContent = () => {
    switch (activeTab) {
      case "openPositions":
        return (
          <Table>
            <Thead>
              <tr>
                <Th>Deal Id / Open Time</Th>
                <Th>Deal Type</Th>
                <Th>Open / Market Rate</Th>
                <Th>P&L ($)</Th>
                <Th>Stop Loss / Take Profit</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>12034</Td>
                <Td>0.00</Td>
                <Td>EUR_USD</Td>
                <Td>Sell</Td>
                <Td>5000</Td>
                <Td>2024-07-25 10:15:00</Td>
              </Tr>
              <Tr>
                <Td>11873</Td>
                <Td>0.00</Td>
                <Td>GBP_USD</Td>
                <Td>Buy</Td>
                <Td>10000</Td>
                <Td>2024-07-20 09:12:00</Td>
              </Tr>
            </Tbody>
          </Table>
        );
      case "pendingOrders":
        return (
          <Table>
            <Thead>
              <tr>
                <Th>Open Time</Th>
                <Th>Deal Type</Th>
                <Th>Order / Market Rate</Th>
                <Th>Stop Loss / Take Profit</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>8764</Td>
                <Td>USD_JPY</Td>
                <Td>Buy</Td>
                <Td>7000</Td>
                <Td>2024-07-29 08:12:00</Td>
              </Tr>
              <Tr>
                <Td>8652</Td>
                <Td>USD_CAD</Td>
                <Td>Sell</Td>
                <Td>1.245</Td>
                <Td>Pending</Td>
              </Tr>
            </Tbody>
          </Table>
        );
      case "closedPositions":
        return (
          <Table>
            <Thead>
              <tr>
                <Th>Deal Id</Th>
                <Th>Commission</Th>
                <Th>Asset</Th>
                <Th>Direction</Th>
                <Th>Deal Amount</Th>
                <Th>Open Time</Th>
                <Th>Closing Date</Th>
                <Th>Open Rate</Th>
                <Th>Close Rate</Th>
                <Th>P&L ($)</Th>
              </tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>15245</Td>
                <Td>0.00</Td>
                <Td>AUD_USD</Td>
                <Td>Buy</Td>
                <Td>10000</Td>
                <Td>2024-07-24 17:13:21</Td>
                <Td>2024-07-31 03:30:12</Td>
                <Td>0.66037</Td>
                <Td>0.650490</Td>
                <Td>-98.80</Td>
              </Tr>
              <Tr>
                <Td>15086</Td>
                <Td>0.00</Td>
                <Td>AUD_USD</Td>
                <Td>Buy</Td>
                <Td>10000</Td>
                <Td>2024-07-22 17:09:58</Td>
                <Td>2024-07-23 18:02:39</Td>
                <Td>0.66146</Td>
                <Td>0.661750</Td>
                <Td>2.90</Td>
              </Tr>
            </Tbody>
          </Table>
        );
      case "statements":
        return (
          <Table>
            <Thead>
              <tr>
                <Th>Open Time</Th>
                <Th>Action</Th>
                <Th>More Details</Th>
                <Th>Amount</Th>
              </tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>5001</Td>
                <Td>2024-07-15</Td>
                <Td>Deposit</Td>
                <Td>Completed</Td>
              </Tr>
              <Tr>
                <Td>5002</Td>
                <Td>2024-07-18</Td>
                <Td>Withdrawal</Td>
                <Td>Completed</Td>
              </Tr>
            </Tbody>
          </Table>
        );
      case "accountSummary":
        return (
          <Table>
            <Thead>
              <tr>
                <Th>Deposits</Th>
                <Th>Withdrawals</Th>
                <Th>Canceled Withdrawals</Th>
                <Th>Closed Trade Profit</Th>
                <Th>Closed Trade Loss</Th>
              </tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1001</Td>
                <Td>$10,000</Td>
                <Td>$9,800</Td>
                <Td>$1,000</Td>
                <Td>$8,800</Td>
              </Tr>
            </Tbody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Tabs>
        <TabButton
          active={activeTab === "openPositions"}
          onClick={() => setActiveTab("openPositions")}
        >
          Open Positions
        </TabButton>
        <TabButton
          active={activeTab === "pendingOrders"}
          onClick={() => setActiveTab("pendingOrders")}
        >
          Pending Orders
        </TabButton>
        <TabButton
          active={activeTab === "closedPositions"}
          onClick={() => setActiveTab("closedPositions")}
        >
          Closed Positions
        </TabButton>
        <TabButton
          active={activeTab === "statements"}
          onClick={() => setActiveTab("statements")}
        >
          Statements
        </TabButton>
        <TabButton
          active={activeTab === "accountSummary"}
          onClick={() => setActiveTab("accountSummary")}
        >
          Account Summary
        </TabButton>
      </Tabs>
      <div>{renderTableContent()}</div>
    </Container>
  );
};

export default Positions;
