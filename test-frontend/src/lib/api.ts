import axios from "axios";

/**
 * Centralized Axios instance.
 * - Reads base URL from VITE_API_BASE_URL (override via .env)
 * - Auto-attaches JWT token from localStorage
 * - Handles 401 by clearing session
 */
const baseURL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request interceptor — attach Bearer token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor — handle unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  id: string;
  name: string;
  error: boolean;
  message: string;
  access_token: string;
  role: string;
}

export const authApi = {
  login: (payload: { username: string; password: string }) =>
    api.post<LoginResponse>("/auth/login", payload),
  register: (payload: Record<string, unknown>) =>
    api.post("/auth/register", payload),
  forgotPassword: (payload: { email: string }) =>
    api.post<{ error?: boolean; message?: string }>(
      "/auth/forgot-password",
      payload
    ),
  verifyOtp: (payload: { email: string; otp: string }) =>
    api.post<{ error?: boolean; message?: string; reset_token?: string }>(
      "/auth/verify-otp",
      payload
    ),
  resetPassword: (payload: {
    email: string;
    reset_token?: string;
    otp?: string;
    password: string;
  }) =>
    api.post<{ error?: boolean; message?: string }>(
      "/auth/reset-password",
      payload
    ),
};

export default api;