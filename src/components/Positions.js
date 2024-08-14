import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const Positions = () => {
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdUntil, setCreatedUntil] = useState("");
  const [closedFrom, setClosedFrom] = useState("");
  const [closedUntil, setClosedUntil] = useState("");

  const [activeTab, setActiveTab] = useState("closedPositions");
  const tableInfo = useSelector(state => state.auth.tableInfo);

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
              {
                tableInfo.openPositions.map((data) => {
                  return (
                    <Tr>
                      <Td>{data.deal_id} / {data.open_time}</Td>
                      <Td>{data.deal_type}</Td>
                      <Td>{data.open_rate} / {data.market_rate}</Td>
                      <Td>{data.p_l}</Td>
                      <Td>{data.stop_loss} / {data.take_profit}</Td>
                      <Td>{data.actions}</Td>
                    </Tr>
                  )
                })
              }
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
              {
                tableInfo.pendingOrders.map((data) => {
                  return (
                    <Tr>
                      <Td>{data.open_time}</Td>
                      <Td>{data.deal_type}</Td>
                      <Td>{data.order_rate} / {data.market_rate}</Td>
                      <Td>{data.stop_loss} / {data.take_profit}</Td>
                      <Td>{data.actions}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        );
      case "closedPositions":

        const filteredClosedPositions = tableInfo.closedPositions.filter((data) => {
          const openTime = new Date(data.open_time);
          const closingDate = new Date(data.closing_date);

          console.log(openTime, new Date(createdUntil))
      
          const isCreatedFromValid = createdFrom ? openTime >= new Date(createdFrom) : true;
          const isCreatedUntilValid = createdUntil ? openTime <= new Date(createdUntil) : true;
          const isClosedFromValid = closedFrom ? closingDate >= new Date(closedFrom) : true;
          const isClosedUntilValid = closedUntil ? closingDate <= new Date(closedUntil) : true;
      
          return isCreatedFromValid && isCreatedUntilValid && isClosedFromValid && isClosedUntilValid;
        });

        return (
          <ClosedPositions>
            <div className="row">
              <div className="col-3">
                <span>Created From: </span>
                <input 
                  type="date" 
                  value={createdFrom} 
                  onChange={(e) => setCreatedFrom(e.target.value)} 
                />
              </div>
              <div className="col-3">
                <span>Created Until: </span>
                <input 
                  type="date" 
                  value={createdUntil} 
                  onChange={(e) => setCreatedUntil(e.target.value)} 
                />
              </div>
              <div className="col-3">
                <span>Closed From: </span>
                <input 
                  type="date" 
                  value={closedFrom} 
                  onChange={(e) => setClosedFrom(e.target.value)} 
                />
              </div>
              <div className="col-3">
                <span>Closed Until: </span>
                <input 
                  type="date" 
                  value={closedUntil} 
                  onChange={(e) => setClosedUntil(e.target.value)} 
                />
              </div>             
            </div>
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
                {
                  filteredClosedPositions.map((data) => {
                    return (
                      <Tr>
                        <Td>{data.deal_id}</Td>
                        <Td>{data.commission}</Td>
                        <Td>{data.asset}</Td>
                        <Td>{data.direction}</Td>
                        <Td>{data.deal_amount}</Td>
                        <Td>{data.open_time}</Td>
                        <Td>{data.closing_date}</Td>
                        <Td>{data.open_rate}</Td>
                        <Td>{data.close_rate}</Td>
                        <Td>{data.p_l}</Td>
                      </Tr>
                    )
                  })
                }
              </Tbody>
            </Table>
          </ClosedPositions>
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
              {
                tableInfo.statements.map((data) => {
                  return (
                    <Tr>
                      <Td>{data.open_time}</Td>
                      <Td>{data.action}</Td>
                      <Td>{data.more_details}</Td>
                      <Td>{data.amount}</Td>
                    </Tr>
                  )
                })
              }
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
                <Th>Cancelled Withdrawals</Th>
                <Th>Closed Trade Profit</Th>
                <Th>Closed Trade Loss</Th>
              </tr>
            </Thead>
            <Tbody>
              {
                tableInfo.accountSummaries.map((data) => {
                  return (
                    <Tr>
                      <Td>{data.deposits}</Td>
                      <Td>{data.withdrawals}</Td>
                      <Td>{data.cancelled_withdrawals}</Td>
                      <Td>{data.closed_trade_profit}</Td>
                      <Td>{data.closed_trade_loss}</Td>
                    </Tr>
                  )
                })
              }
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

const Container = styled.div`
  background-color: #1a1a2e;
  border-radius: 0px;
  overflow: auto;
  @media (max-width: 768px) {
    height: 99vh;
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

  @media (max-width: 768px) {
    padding: 8px 10px;
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

const ClosedPositions = styled.div`
  input {
    padding: 5px 20px;
    margin: 3px 0px;
    font-size: 13px;
    border-radius: 7px;
  }
  span {
    padding: 10px 20px;
    font-size: 13px;
  }
  @media (max-width: 768px) {
      input {
        width: 95%;
        padding: 1px 3px;
        font-size: 12px;
        border-radius: 4px;
      }
      span {
        padding: 0px;
        font-size: 11px;
      }
  }
`;

export default Positions;
