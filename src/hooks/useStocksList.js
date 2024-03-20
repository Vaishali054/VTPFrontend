import { useQuery } from "@tanstack/react-query";
import { getStocksList } from "../api/stocks";
import {
  STOCKS_LIST_STALE_TIME,
  STOCKS_LIST_RETRY_ATTEMPTS,
  STOCKS_LIST_REFETCH_INTERVAL,
} from "../constants/constants";

export const useStocksList = () => {
  const query = useQuery({
    queryKey: ["stocks"],
    queryFn: () => getStocksList(),
    staleTime: STOCKS_LIST_STALE_TIME,
    retry: STOCKS_LIST_RETRY_ATTEMPTS,
    refetchInterval: STOCKS_LIST_REFETCH_INTERVAL,
  });
  return query;
};
