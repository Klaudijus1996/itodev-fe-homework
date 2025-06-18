import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/services/api';
import type { QueryParams } from '@/lib/services/api/client.types';

type Response = Awaited<ReturnType<typeof api.events.index>>;

export const useEventsIndexQuery = (
  params?: QueryParams,
  config?: Omit<UseQueryOptions<Response>, 'queryFn' | 'queryKey'>
) => {
  return useQuery<Response>({
    queryKey: ['events', params],
    queryFn: ({ signal }) => api.events.index({ signal, params }),
    ...config,
  });
};
