// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import Header from "../Components/Header";

// const data = [
//   { name: "Feb 18", expenditure: 300 },
//   { name: "Feb 19", expenditure: 250 },
//   { name: "Feb 20", expenditure: 600 },
//   { name: "Feb 21", expenditure: 450 },
//   { name: "Feb 22", expenditure: 800 },
//   { name: "Feb 23", expenditure: 400 },
//   { name: "Feb 24", expenditure: 900 },
//   { name: "Feb 25", expenditure: 300 },
//   { name: "Feb 26", expenditure: 700 },
//   { name: "Feb 27", expenditure: 650 },
//   { name: "Feb 28", expenditure: 500 },
//   { name: "Mar 1", expenditure: 800 },
//   { name: "Mar 2", expenditure: 900 },
//   { name: "Mar 3", expenditure: 600 },
//   { name: "Mar 4", expenditure: 750 },
//   { name: "Mar 5", expenditure: 400 },
//   { name: "Mar 6", expenditure: 850 },
//   { name: "Mar 7", expenditure: 450 },
//   { name: "Mar 8", expenditure: 700 },
//   { name: "Mar 9", expenditure: 300 },
// ];

// const pieData = [
//   { name: "UPI", value: 60, color: "#9b5de5" },
//   { name: "Bank Transactions", value: 40, color: "#f4a261" }
// ];

// const Expenditure = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="p-4 md:p-6">
//         <h1 className="text-xl md:text-2xl font-semibold mb-4">Expenditure Analysis</h1>

//         {/* Area Chart Section */}
//         <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
//           <h2 className="text-gray-600 mb-4 text-lg md:text-xl">Monthly Expenditure Trend</h2>
//           <div className="w-full h-72 md:h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <defs>
//                   <linearGradient id="colorExpenditure" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <Area
//                   type="monotone"
//                   dataKey="expenditure"
//                   stroke="#3b82f6"
//                   fill="url(#colorExpenditure)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart Section */}
//         <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
//           <h2 className="text-gray-600 mb-4 text-lg md:text-xl">Expenditure by Category</h2>
//           <div className="w-full h-72">
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius="80%"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Legend layout="horizontal" verticalAlign="bottom" align="center" />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Expenditure;

// src/pages/Expenditure.jsx
// src/pages/Expenditure.jsx
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Header from "../Components/Header";
import { getAccounts } from "../api";

const Expenditure = () => {
  const [account, setAccount] = useState(null);
  const [areaChartData, setAreaChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    getAccounts()
      .then((accounts) => {
        if (accounts.length) {
          const acc = accounts[0];
          setAccount(acc);

          const aggregated = {};
          acc.transactions.forEach((tx) => {
            if (tx.type === "debit") {
              const dateKey = new Date(tx.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              aggregated[dateKey] = (aggregated[dateKey] || 0) + tx.amount;
            }
          });
          const areaData = Object.entries(aggregated).map(
            ([date, expenditure]) => ({
              date,
              expenditure,
            })
          );
          setAreaChartData(areaData);

          const modeTotals = { UPI: 0, "Bank Transfer": 0 };
          acc.transactions.forEach((tx) => {
            if (
              tx.type === "debit" &&
              (tx.mode === "UPI" || tx.mode === "Bank Transfer")
            ) {
              modeTotals[tx.mode] += tx.amount;
            }
          });

          const totalExpenditure = modeTotals.UPI + modeTotals["Bank Transfer"];

          const pieData = Object.entries(modeTotals).map(([name, value]) => ({
            name,
            value: totalExpenditure ? (value / totalExpenditure) * 100 : 0,
            color: name === "UPI" ? "#9b5de5" : "#f4a261",
          }));
          setPieChartData(pieData);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          Expenditure Analysis
        </h1>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-gray-600 mb-4 text-lg md:text-xl">
            Monthly Expenditure Trend
          </h2>
          <div className="w-full h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
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
                <Area
                  type="monotone"
                  dataKey="expenditure"
                  stroke="#3b82f6"
                  fill="url(#colorExpenditure)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
          <h2 className="text-gray-600 mb-4 text-lg md:text-xl">
            Expenditure by Mode
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenditure;
