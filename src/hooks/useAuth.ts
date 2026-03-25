// Hook para manejar autenticación
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services';
import { useAuthStore } from '@/store';
import type { LoginCredentials } from '@/types';

const AUTH_KEY = 'auth';

export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuthStore();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      queryClient.setQueryData([AUTH_KEY, 'user'], data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
}

export function useCurrentUser() {
  const { user, isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: [AUTH_KEY, 'user'],
    queryFn: () => authService.getCurrentUser(),
    initialData: user,
    enabled: isAuthenticated,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: () => authService.forgotPassword(),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: () => authService.changePassword(),
  });
}
