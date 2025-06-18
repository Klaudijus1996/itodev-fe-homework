import { api } from '@/lib/services/api';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

type Response = api.events.EventRegistrationResponse;
type Params = Parameters<typeof api.events.register>;

export const useRegisterToEventMutation = (
  config?: Omit<UseMutationOptions<Response, Error, Params, unknown>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (params: Params) => api.events.register(...params),
    ...(config ?? {}),
  });
};
