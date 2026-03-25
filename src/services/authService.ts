// Servicio de Autenticación
import type { User, LoginCredentials, AuthResponse } from '@/types';

export const authService = {
  // Login de usuario
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulación de login - Reemplazar con llamada real a API
    // return apiRequest<AuthResponse>('post', '/auth/login', credentials);
    
    // Mock para desarrollo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@escuela.com' && credentials.password === 'admin123') {
          const user: User = {
            id: '1',
            email: credentials.email,
            name: 'Administrador',
            role: 'admin',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          };
          const token = 'mock_jwt_token_' + Date.now();
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve({ user, token });
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 500);
    });
  },

  // Logout
  logout: async (): Promise<void> => {
    // await apiRequest<void>('post', '/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<User | null> => {
    // return apiRequest<User>('get', '/auth/me');
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si hay sesión activa
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Recuperar contraseña
  forgotPassword: async (): Promise<void> => {
    // return apiRequest<void>('post', '/auth/forgot-password', { email });
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },

  // Cambiar contraseña
  changePassword: async (): Promise<void> => {
    // return apiRequest<void>('post', '/auth/change-password', { oldPassword, newPassword });
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },
};
