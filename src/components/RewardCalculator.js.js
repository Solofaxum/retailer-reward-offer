import React, { useEffect, useState } from "react";
import "../Styles/RewardCalculator.css";

const RewardCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardData, setRewardData] = useState({});

  useEffect(() => {
    // Simulate an asynchronous API call to fetch data
    const fetchData = async () => {
      try {
        // Simulated API response
        const response = await fetch("http://localhost:3002/transactions");
        const data = await response.json();
        console.log(`this is my data ${data}`);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate reward points when transactions data changes
    const calculateRewards = () => {
      const newData = {};
let points;
      transactions.forEach((transaction) => {
        const { customer, month, amount } = transaction;
        if (amount <= 50) {
          // No reward for purchases of $50 or less
          points= 0;
        } else if (amount <= 100) {
          // 1 point for every dollar spent over $50
          points= amount - 50;
        } else {
          // 2 points for every dollar spent over $100
          points= (2 * (amount - 100)) + 50;
        }

        if (!newData[customer]) {
          newData[customer] = {};
        }

        if (!newData[customer][month]) {
          newData[customer][month] = 0;
        }

        newData[customer][month] += points;
      });

      setRewardData(newData);
    };

    calculateRewards();
  }, [transactions]);

  return (
    <div>
      <h2>Reward Points Calculator</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
             <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rewardData).map((customer) =>
            Object.keys(rewardData[customer]).map((month) => (
              <tr key={`${customer}-${month}`}>
                <td>{customer}</td>
                <td>{month}</td>
                <td>{rewardData[customer][month]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RewardCalculator;
