import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, signup, logout, me } from '../lib/auth';
import { useAuthStore } from '../store/auth.store';

export const useSignup = () => {
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  return useMutation({
    mutationFn: (data: any) => signup(data),
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['me'] });
      console.log('Signup successful, access token set');
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  return useMutation({
    mutationFn: (data: any) => login(data),
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logoutStore = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      logoutStore();
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => me(),
    retry: false,
    refetchOnWindowFocus: false,
  });
};