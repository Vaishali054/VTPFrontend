import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const buyStock = async (symbol, quantity) => {
  try {
    const res = await axiosInstance.post("/action/buy-stock", {
      symbol,
      quantity,
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data || e.message;
    }
    throw e;
  }
};

export const sellStock = async (symbol, quantity) => {
  try {
    const res = await axiosInstance.post("/action/sell-stock", {
      symbol,
      quantity,
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 404) {
        return;
      }
      return e.response?.data || e.message;
    }
    throw e;
  }
};
