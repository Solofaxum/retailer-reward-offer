// import './App.css';
// import Retailer from './retailer'

// function App() {
//   return (
//     <div >
//       <Retailer />
//     </div>
//   );
// }

// export default App;
import React from "react";
import "./Styles/App.css";
import RewardCalculator from "./components/RewardCalculator.js.js";
import PurchaseInput from "./components/PurchaseInput";

function App() {
  return (
    <div className="App">
      <PurchaseInput />
      <RewardCalculator />
    </div>
  );
}

export default App;
