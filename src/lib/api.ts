import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
  baseURL: 'http://localhost:5000', // your NestJS API
  withCredentials: true, // allow cookies
});

// Intercept requests to attach access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to handle 401 and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          '/auth/refresh',
          {},
          { baseURL: 'http://localhost:3000', withCredentials: true }
        );
        useAuthStore.getState().setAccessToken(res.data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        useAuthStore.getState().logout();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;