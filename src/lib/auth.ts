import api from './api';

export const signup = (data: any, p0?: any) => api.post('/auth/signup', data);
export const login = (data: any) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');
export const me = () => api.get('/auth/me');