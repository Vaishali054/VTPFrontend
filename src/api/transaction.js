// transactionApi.js

import axiosInstance from './api';

export const fetchTransactions = async () => {
  try {
    const response = await axiosInstance.get('/history');
    return response.data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};
