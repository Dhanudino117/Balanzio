import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "../Components/Header";

function BudgetManagement() {
  const [data, setData] = useState([
    { category: "Total Budget", amount: 8500, limit: 11500 },
    { category: "Food", amount: 3200, limit: 5000 },
    { category: "Transportation", amount: 1500, limit: 2000 },
    { category: "Entertainment", amount: 1000, limit: 1500 },
    { category: "Shopping", amount: 2800, limit: 3000 },
  ]);

  const addExpense = () => {
    const category = prompt("Enter category name:");

    const limit = parseFloat(prompt("Enter budget limit:"));
    const amount = parseFloat(prompt("Enter amount:"));

    if (category && !isNaN(amount) && !isNaN(limit)) {
      setData([...data, { category, amount, limit }]);
    }
  };

  const getAlertMessage = (amount, limit) => {
    const percentage = (amount / limit) * 100;
    if (percentage >= 50 && percentage < 90) {
      return {
        message: "You came half of your budget limit!",
        color: "bg-blue-50 border-l-4 border-blue-400 text-blue-700",
      };
    } else if (percentage >= 90) {
      return {
        message:
          "⚠️ You're nearing your budget limit! Consider adjusting your spending.",
        color: "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700",
      };
    }
    return null;
  };

  return (
    <>
    <Header/>
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

        {data.map((item, index) => {
          const percentage = Math.min((item.amount / item.limit) * 100, 100);
          const color = percentage > 90 ? "bg-orange-500" : "bg-green-500";
          const alert = getAlertMessage(item.amount, item.limit);

          return (
            <div key={index}>
              {alert && (
                <div className={`${alert.color} p-4 rounded-lg mb-4`}>
                  {alert.message}
                </div>
              )}
              <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-semibold">{item.category}</span>
                  <span className="text-gray-600">
                    ₹{item.amount} / ₹{item.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`${color} h-4`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 mt-2 block">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BudgetManagement;
