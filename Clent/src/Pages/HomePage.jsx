import React, { useState } from "react";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../Components/Header";

const transactions = [
  {
    id: 1,
    title: "Rahul",
    method: "UPI",
    amount: -100,
    date: "5/3/2025",
    icon: <FaCreditCard className="text-blue-600" />,
  },
  {
    id: 2,
    title: "Sita",
    method: "Bank Transfer",
    amount: -1200,
    date: "5/1/2025",
    icon: <FaUniversity className="text-red-600" />,
  },
  {
    id: 3,
    title: "Amit",
    method: "UPI",
    amount: -250,
    date: "5/4/2025",
    icon: <FaCreditCard className="text-blue-600" />,
  },
  {
    id: 4,
    title: "Priya",
    method: "Bank Transfer",
    amount: 3500,
    date: "5/2/2025",
    icon: <FaUniversity className="text-red-600" />,
  },
  {
    id: 5,
    title: "Ravi",
    method: "UPI",
    amount: -45,
    date: "5/2/2025",
    icon: <FaCreditCard className="text-blue-600" />,
  },
];

const graphData = [
  { date: "3-Mar", expenditure: 150 },
  { date: "4-Mar", expenditure: 300 },
  { date: "5-Mar", expenditure: 250 },
  { date: "6-Mar", expenditure: 400 },
  { date: "7-Mar", expenditure: 600 },
  { date: "8-Mar", expenditure: 350 },
  { date: "9-Mar", expenditure: 500 },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("Overall");

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "Overall") return true;
    return tx.method === filter;
  });

  const getAmountDisplay = (amount) => {
    return amount < 0 ? (
      <span className="text-red-500 font-bold"> - ₹{Math.abs(amount)}</span>
    ) : (
      <span className="text-green-500 font-bold flex items-center">
        {" "}
        + ₹{amount}
      </span>
    );
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

        {/* Graph Section */}
        <div className="w-full bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-gray-600 mb-4">Last 7 Days Expenditure</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graphData}>
              <defs>
                <linearGradient
                  id="colorExpenditure"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="expenditure"
                stroke="#3b82f6"
                fill="url(#colorExpenditure)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-gray-600 mb-4 text-xl">Transactions</h2>
          <div className="flex gap-6 mb-4">
            {["Overall", "UPI", "Bank Transfer"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">{tx.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{tx.title}</h4>
                  <div className="flex gap-1">
                  <p className="text-gray-500 text-xs">{tx.date}</p>-
                  <p className="text-gray-400 text-sm">{tx.method}</p>
                  </div>
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
