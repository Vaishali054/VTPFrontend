import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const deleteFromWatchlist = async (itemId) => {
  try {
    const res = await axiosInstance.delete(`/watchlist/remove`,{itemId});
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
