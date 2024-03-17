import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const deleteProfile = async () => {
  try {
    const res = await axiosInstance.put(`/auth/delete`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
