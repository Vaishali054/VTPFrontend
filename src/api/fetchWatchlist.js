import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

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
