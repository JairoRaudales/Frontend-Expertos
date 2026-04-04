
import axios from "axios";
import type { LoginCredentials, LoginResponse } from "../types/index";

const API_URL = "http://localhost:5156/api/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    
    const payload = {

     // Si el método es 'email', asigna el identificador a 'email', de lo contrario null
    email: credentials.method === 'email' ? credentials.identifier : "",
    
    // Si el método es 'username', asigna el identificador a 'nombreUsuario', de lo contrario null
    nombreUsuario: credentials.method === 'username' ? credentials.identifier : "",
    
    password: credentials.password
    };

    console.log('Enviando a API:', payload);

    const response = await axios.post(`${API_URL}/login`, payload);

    // Guardar token automáticamente si existe
    if (response.data.exitoso && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }

    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};