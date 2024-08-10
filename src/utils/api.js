// api.js
export const fetchCurrencyData = async (from_currency, to_currency) => {
  const apiKey = 'N5DPQO87W3JVK201'; // Replace with your actual API key
  const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${apiKey}`);
          
  if (!response.ok) {
    throw new Error('Failed to fetch currency data');
  }
  return response.json();
};
