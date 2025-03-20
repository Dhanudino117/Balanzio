// src/pages/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { FaRegCreditCard, FaUniversity } from "react-icons/fa";
import Header from "../Components/Header";
import { getAccounts } from "../api";

const TransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Overall");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAccounts()
      .then((accounts) => {
        if (accounts.length) {
          setTransactions(accounts[0].transactions);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "Overall")
      return t.description.toLowerCase().includes(search.toLowerCase());
    if (filter === "UPI")
      return (
        t.mode === "UPI" &&
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    if (filter === "Direct")
      return (
        t.mode === "Bank Transfer" &&
        t.description.toLowerCase().includes(search.toLowerCase())
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
            <div key={index} className="flex justify-between items-center py-4 ">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  {t.mode === "Bank Transfer" ? (
                    <FaUniversity className="text-green-500" />
                  ) : (
                    <FaRegCreditCard className="text-blue-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {t.description}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(t.date).toLocaleDateString()} - {t.mode}
                  </p>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${
                  t.type === "debit" ? "text-red-500" : "text-green-500"
                }`}
              >
                {t.type === "debit" ? `-₹${t.amount}` : `+₹${t.amount}`}
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
