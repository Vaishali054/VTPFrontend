import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const getStocksList = async () => {
  try {
    const res = await axiosInstance.get(`/stocks/stocksList`);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};
