// src/pages/BudgetManagement.jsx
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { getAccounts } from "../api";

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
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Budget Management</h1>
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
