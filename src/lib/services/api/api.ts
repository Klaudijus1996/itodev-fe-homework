import axios from 'axios';

export const eventsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/events`,
  headers: {
    'Content-Type': 'application/json',
  },
});
