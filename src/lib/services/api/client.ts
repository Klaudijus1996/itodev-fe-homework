import axios from 'axios';

export const client = {
  v1: axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/v1`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }),
};
