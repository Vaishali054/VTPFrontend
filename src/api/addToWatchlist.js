import axiosInstance from '../infra/axiosInstance';
import { AxiosError } from 'axios';

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
