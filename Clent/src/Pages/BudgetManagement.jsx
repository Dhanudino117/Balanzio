// src/pages/BudgetManagement.jsx
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "../Components/Header";
import { getAccounts, addTransaction } from "../api";

function BudgetManagement() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getAccounts()
      .then((accounts) => {
        if (accounts.length) {
          setAccount(accounts[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const addExpense = async () => {
    const category = prompt("Enter category name:");
    const amount = parseFloat(prompt("Enter expense amount:"));

    if (category && !isNaN(amount)) {
      const transaction = {
        date: new Date().toISOString(),
        amount,
        description: category,
        type: "debit",
        category,
        mode: "UPI", // You could allow the user to choose the mode
      };
      try {
        const updatedAccount = await addTransaction(account._id, transaction);
        setAccount(updatedAccount);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  if (!account) return <div>Loading...</div>;

  // Calculate total spent (sum of all debit transactions)
  const totalSpent = account.transactions
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const budgetProgress = Math.min((totalSpent / account.monthlyBudget) * 100, 100);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">Budget Management</h1>
          <button
            onClick={addExpense}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Add Expense
          </button>
        </header>

        {/* Budget Overview */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold">Monthly Budget</span>
            <span className="text-gray-600">₹{account.monthlyBudget}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 ${budgetProgress > 90 ? "bg-orange-500" : "bg-green-500"}`}
              style={{ width: `${budgetProgress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500 mt-2 block">
            {budgetProgress.toFixed(0)}% spent (₹{totalSpent} spent)
          </span>
        </div>

        {/* Expense List */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          {account.transactions.filter(tx => tx.type === "debit").length > 0 ? (
            account.transactions
              .filter((tx) => tx.type === "debit")
              .map((tx, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{tx.description}</h4>
                    <p className="text-gray-500 text-sm">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-red-500">-₹{tx.amount}</p>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No expenses recorded.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BudgetManagement;
