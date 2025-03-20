// backend/models/Account.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ["debit", "credit"], required: true },
  category: { type: String },
  mode: { type: String },
});

const accountSchema = new mongoose.Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  ifscCode: { type: String, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  monthlyBudget: { type: Number },
  transactions: [transactionSchema],
  status: { type: String, default: "active" },
  lastUpdated: { type: Date, default: Date.now },
  password: { type: String, required: true }, // In production, hash your passwords!
});

module.exports = mongoose.model("Account", accountSchema);
