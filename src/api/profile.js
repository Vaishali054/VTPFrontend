import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

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
