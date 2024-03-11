import { useQuery } from '@tanstack/react-query'
import {getStocksList} from '../api/fetchStocksList'

export const useStocksList = () => {
  const query = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStocksList(),
    staleTime: 1000 * 60,
    retry: 1,
    refetchInterval: 1000 * 60,
  })
  return query
}