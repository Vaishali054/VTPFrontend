import axiosInstance from '../infra/axiosInstance';
import { AxiosError } from 'axios';

export const togglePortfolio = async () => {
  try {
    const res = await axiosInstance.post(`/portfolio/status`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
