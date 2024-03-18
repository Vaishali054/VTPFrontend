import { useQuery } from "@tanstack/react-query";
import { getStocksList } from "../api/fetchStocksList";
import { STALE_TIME, RETRY, REFETCH_INTERVAL } from "../constants/constants";

export const useStocksList = () => {
  const query = useQuery({
    queryKey: ["stocks"],
    queryFn: () => getStocksList(),
    staleTime: STALE_TIME,
    retry: RETRY,
    refetchInterval: REFETCH_INTERVAL,
  });
  return query;
};
