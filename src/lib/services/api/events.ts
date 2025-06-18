import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { client } from './client';
import type { PaginatedResponse } from './client.types';

export type EventResponse = {
  id: number;
  name: string;
  location: string;
  date: string;
  available_spots: number;
  created_at: string;
};

export const index = (
  config?: AxiosRequestConfig
): Promise<AxiosResponse<PaginatedResponse<EventResponse>>> => client.v1.get('/events', config);

export type RegisterToEventRequest = {
  name: string;
  email: string;
};

export type EventRegistrationResponse = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  event: EventResponse;
};

export const register = (
  id: number,
  data: RegisterToEventRequest,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<EventRegistrationResponse>> =>
  client.v1.post(`/events/${id}/register`, data, config);
