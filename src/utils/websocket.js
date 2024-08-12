// Set up WebSocket connection
const API_URL = 'wss://stream-fxtrade.oanda.com/v3/accounts/YOUR_ACCOUNT_ID/pricing?instruments=INSTRUMENTS';

const socket = new WebSocket(API_URL);

export const subscribeToForex = (callback) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Assuming data contains price information
    callback(data);
  };
};

export const closeSocket = () => {
  socket.close();
};
