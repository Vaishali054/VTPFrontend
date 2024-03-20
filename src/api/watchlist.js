import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const addToWatchlist = async (symbol) => {
  try {
    const res = await axiosInstance.post(`/watchlist/add`, { symbol });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};

export const deleteFromWatchlist = async (itemId) => {
  try {
    const res = await axiosInstance.delete(`/watchlist/remove`, {
      data: { itemId: itemId },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};

export const fetchWatchlist = async () => {
  try {
    const res = await axiosInstance.get(`/watchlist/get`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
