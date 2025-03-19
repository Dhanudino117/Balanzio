import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import Header from "../Components/Header";

const transactions = [
  {
    name: "Vikranth S",
    type: "UPI",
    amount: -120,
    date: "5/1/2025",
    icon: <FaRegCreditCard className="text-blue-500" />,
  },
  {
    name: "Dhanush",
    type: "UPI",
    amount: -745,
    date: "5/2/2025",
    icon: <FaRegCreditCard className="text-blue-500" />,
  },
  {
    name: "Santhosh R",
    type: "ATM",
    amount: -500,
    date: "5/2/2025",
    icon: <FaRegCreditCard className="text-blue-500" />,
  },
  {
    name: "Jobin J",
    type: "Bank Transfer",
    amount: 3500,
    date: "5/3/2025",
    icon: <BiTransfer className="text-green-500" />,
  },
  {
    name: "Sathvika",
    type: "Card",
    amount: -250,
    date: "5/4/2025",
    icon: <FaRegCreditCard className="text-yellow-500" />,
  },
  {
    name: "Gautham Ram",
    type: "UPI",
    amount: -100,
    date: "5/5/2025",
    icon: <FaRegCreditCard className="text-blue-500" />,
  },
  {
    name: "Sachu D",
    type: "Bank Transfer",
    amount: +1200,
    date: "5/5/2025",
    icon: <BiTransfer className="text-green-500" />,
  },
];

const TransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Overall");

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "Overall")
      return t.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "UPI")
      return (
        t.type === "UPI" && t.name.toLowerCase().includes(search.toLowerCase())
      );
    if (filter === "Direct")
      return (
        t.type === "Card" && t.name.toLowerCase().includes(search.toLowerCase())
      );
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Bar */}
      <div className="p-4">
        <div className="bg-white flex items-center p-3 rounded-xl shadow-md">
          <IoSearch className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4 px-4 mb-6">
        {["Overall", "UPI", "Direct"].map((type) => (
          <button
            key={type}
            className={`px-5 py-2 rounded-lg font-medium ${
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

        <div className="bg-white p-6 rounded-xl shadow-lg mx-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 "
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-4 rounded-full">{t.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {t.date} - {t.type}
                  </p>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${
                  t.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {t.amount < 0 ? `-₹${Math.abs(t.amount)}` : `+₹${t.amount}`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
