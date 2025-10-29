import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://highway-delight-lemon.vercel.app/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;