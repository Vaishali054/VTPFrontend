import axiosInstance from '../infra/axiosInstance';
import { AxiosError } from 'axios';

export const handleLogin = async (email_id, password) => {
  try {
    const response = await axiosInstance.post('/login', { email_id, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};
