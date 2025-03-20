const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Account = require("./models/Account");

dotenv.config();

const sampleData = [
  {
    accountHolderName: "Amit Sharma",
    accountNumber: "12345678901",
    ifscCode: "IDIB000A001",
    balance: 30000,
    currency: "INR",
    monthlyBudget: 10000,
    transactions: [
      { date: "2025-02-19T00:00:00Z", amount: -300, description: "Amazon", type: "debit", mode: "UPI" },
      { date: "2025-02-22T00:00:00Z", amount: -150, description: "Best Buy", type: "debit", mode: "Bank Transfer" },
      { date: "2025-02-25T00:00:00Z", amount: 5000, description: "Freelance Payment", type: "credit", mode: "Bank Transfer" },
      { date: "2025-03-01T00:00:00Z", amount: 2000, description: "Alliance University", type: "credit", mode: "Bank Transfer" },
      { date: "2025-03-10T00:00:00Z", amount: -400, description: "Starbucks", type: "debit", mode: "UPI" },
      { date: "2025-03-15T00:00:00Z", amount: 6000, description: "Investment Return", type: "credit", mode: "Bank Transfer" }
    ],
    status: "active",
    lastUpdated: "2025-03-19T16:07:00Z",
    password: "amit123"
  },

  {
    accountHolderName: "Priya Patel",
    accountNumber: "23456789012",
    ifscCode: "IDIB000A002",
    balance: 50000,
    currency: "INR",
    monthlyBudget: 15000,
    transactions: [
      { date: "2025-02-20T00:00:00Z", amount: -400, description: "Grocery", type: "debit", mode: "UPI" },
      { date: "2025-02-23T00:00:00Z", amount: 5000, description: "Bonus", type: "credit", mode: "Bank Transfer" },
      { date: "2025-03-01T00:00:00Z", amount: 3000, description: "Salary", type: "credit", mode: "Bank Transfer" },
      { date: "2025-03-05T00:00:00Z", amount: -150, description: "Movie ticket", type: "debit", mode: "UPI" },
      { date: "2025-03-17T00:00:00Z", amount: 1200, description: "Freelance Work", type: "credit", mode: "Bank Transfer" }
    ],
    status: "active",
    lastUpdated: "2025-03-19T16:07:00Z",
    password: "priya456"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Account.deleteMany({});
    console.log("Old data removed");

    await Account.insertMany(sampleData);
    console.log("Data seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
