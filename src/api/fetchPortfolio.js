import axiosInstance from '../infra/axiosInstance';
import { AxiosError } from 'axios';

export const fetchPortfolio = async (userId) => {
  try {
    const res = await axiosInstance.get(`/portfolio/get?userId=${userId}`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
