import React, { useState } from "react";
import { FaWallet, FaUtensils, FaHome, FaMoneyBillWave, FaCar } from "react-icons/fa";
import Header from "../Components/Header";
import { MdOutlineArrowOutward } from "react-icons/md"; 

const transactions = [
  { id: 1, title: "Phone Bill", category: "Utilities", method: "UPI", amount: -100, date: "5/3/2023", icon: <FaWallet className="text-blue-500" /> },
  { id: 2, title: "Rent", category: "Housing", method: "Bank Transfer", amount: -1200, date: "5/1/2023", icon: <FaHome className="text-red-500" /> },
  { id: 3, title: "Restaurant", category: "Food", method: "Card", amount: -250, date: "5/4/2023", icon: <FaUtensils className="text-yellow-500" /> },
  { id: 4, title: "Salary", category: "Income", method: "Bank Transfer", amount: 3500, date: "5/2/2023", icon: <FaMoneyBillWave className="text-green-500" /> },
  { id: 5, title: "Uber Ride", category: "Transportation", method: "UPI", amount: -45, date: "5/2/2023", icon: <FaCar className="text-purple-500" /> },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("Overall");

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "Overall") return true;
    if (filter === "UPI") return tx.method === "UPI";
    if (filter === "Direct") return tx.method === "Card";
    return false;
  });

  const getAmountDisplay = (amount) => {
    if (amount < 0) {
      return <span className="text-red-500 font-bold"> - ₹{Math.abs(amount)}</span>;
    } else {
      return <span className="text-green-500 font-bold flex items-center"> + ₹{amount}</span>;
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h1>

        {/* Current Balance Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200">
          <h2 className="text-gray-600">Current Balance</h2>
          <p className="text-4xl font-bold text-green-600">₹25,750.00</p>
          <p className="text-gray-400">Updated on 19/03/2025</p>
        </div> 
        <div className="w-full h-30 bg-blue-200 mb-10 mt-10">
          <h1>Graph section will goes here</h1>
        </div>

        {/* Budget Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200">
          <h2 className="text-gray-600 mb-4">Budget Overview</h2>
          <p className="text-gray-800">Shopping: ₹2,800 of ₹3,000</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div className="bg-yellow-400 h-3 rounded-full" style={{ width: "93%" }}></div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-gray-600 mb-4 text-xl">Transactions</h2>
          <div className="flex gap-6 mb-4">
            {["Overall", "UPI", "Direct"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg font-medium ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">{tx.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{tx.title}</h4>
                  <p className="text-gray-400 text-sm">{tx.category} • {tx.method}</p>
                </div>
              </div>
              {getAmountDisplay(tx.amount)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
