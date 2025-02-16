import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trades');
        setTrades(response.data);
      } catch (err) {
        console.error('Failed to fetch trades', err);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade._id}>
              <td>{trade.symbol}</td>
              <td>{trade.price}</td>
              <td>{trade.quantity}</td>
              <td>{trade.action}</td>
              <td>{new Date(trade.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;