import axios from "axios";
import type { LoginCredentials } from "../types/index";

const API_URL = "http://localhost:5156/api/auth";

// export interface LoginRequest {
//   nombreUsuario: string;
//   password: string;
// }

export const authService = {
  login: async (data: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  },
};