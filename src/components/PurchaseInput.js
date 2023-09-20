import React, { useState } from "react";
import "../Styles/PurchaseInput.css";

const validMonthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const PurchaseInput = () => {
  const [newPurchase, setNewPurchase] = useState({
    customer: "",
    month: "",
    amount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase({ ...newPurchase, [name]: value });
  };

  const handleAddPurchase = async (e) => {
    const { name, value } = e.target;

      // Validate input fields (e.g., customer, month, amount)
    if ((name === 'month' && !validMonthNames.includes(value)) || 
      !newPurchase.customer ||
      !newPurchase.month ||
      newPurchase.amount <= 0
    ) {
      alert("Please fill in all fields with valid data.");
      return;
    }
  
    // Perform API POST request to add the new purchase
    try {
      const response = await fetch("http://localhost:3002/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchase),
      });

      if (response.ok) {
        alert("Purchase added successfully!");
        setNewPurchase({
          customer: "",
          month: "",
          amount: 0,
        });
      } else {
        alert("Failed to add purchase.");
      }
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  return (
    <div className="purchase-input">
      <h2>Add New Purchase</h2>
      <div>
        <label>Customer:</label>
        <input
          type="text"
          name="customer"
          value={newPurchase.customer}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Month:</label>
        <input
          type="text"
          name="month"
          value={newPurchase.month}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newPurchase.amount}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddPurchase}>Add</button>
    </div>
  );
};

export default PurchaseInput;
