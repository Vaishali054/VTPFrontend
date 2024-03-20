import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const getStocksList = async () => {
  try {
    const res = await axiosInstance.get(`/stocks/stocksList`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};

export const updateBalance = async (balanceData) => {
  try {
    const res = await axiosInstance.post("/auth/update-balance", balanceData);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};

export const fetchTransactions = async () => {
  try {
    const response = await axiosInstance.get("/history");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
