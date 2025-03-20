// src/api.js
import axios from "axios";

// Set the base URL of your backend API
const API_BASE_URL = "http://localhost:5000/api";

export const getAccounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const addTransaction = async (accountId, transactionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/accounts/${accountId}/transactions`, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};
