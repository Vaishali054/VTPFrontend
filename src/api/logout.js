import axiosInstance from '../infra/axiosInstance';
import { AxiosError } from 'axios';

export const handleLogout = async () => {
  try {
    const response = await axiosInstance.post('/logout');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};
