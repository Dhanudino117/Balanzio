// backend/routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

// @route   GET /api/accounts
// @desc    Get all accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
});

// @route   GET /api/accounts/:id
// @desc    Get a specific account by ID
router.get("/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch account" });
  }
});

// @route   POST /api/accounts/:id/transactions
// @desc    Add a new transaction to an account
router.post("/:id/transactions", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    account.transactions.push(req.body); // Ensure req.body contains the transaction details
    // Update balance based on transaction type
    if (req.body.type === "debit") {
      account.balance -= req.body.amount;
    } else if (req.body.type === "credit") {
      account.balance += req.body.amount;
    }
    account.lastUpdated = Date.now();
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

module.exports = router;
