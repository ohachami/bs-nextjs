import { callAsync } from '@/hooks/useAsync';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsers = () => {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const response = await callAsync(() => axios.get(`/api/users`))
        return response.data;
      }
    })
  }