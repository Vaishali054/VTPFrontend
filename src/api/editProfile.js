import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const editProfile = async (profileData) => {
  try {
    const res = await axiosInstance.post(`/auth/profile-update`, profileData);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
