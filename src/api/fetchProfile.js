import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const fetchProfile = async () => {
  try {
    const res = await axiosInstance.get(`/auth/profile`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
