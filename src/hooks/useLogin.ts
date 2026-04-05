
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { LoginCredentials, LoginResponse } from '@/types/index';


export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.exitoso && data.token) {
        // Usar el método login del store (guarda token y actualiza isAuthenticated)
        login(data.usuario, data.token);
        console.log('✅ Login exitoso');
        
        // Redirigir al dashboard
        navigate('/', { replace: true });
      }
    },
    onError: (error: unknown) => {
      console.error('❌ Error en login:', error);
    }
  });
};