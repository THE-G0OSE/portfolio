import { ApiError, apiRequest } from "@/shared/api";

export const authApi = {
  login: (login: string, password: string) =>
    apiRequest("/auth/login", { method: "POST", body: { login, password } }),

  logout: () => apiRequest("/auth/logout", { method: "POST" }),

  // true when the admin cookie is valid
  checkSession: async () => {
    try {
      await apiRequest("/auth/me");
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return false;
      throw error;
    }
  },
};
