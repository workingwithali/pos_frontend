// lib/auth.ts
import { api } from "./api";

export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    const { accessToken } = response.data;
    

    return accessToken;
  } catch (err) {
    console.error("Refresh token failed:", err);
    throw err;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout request failed:", err);
  } finally {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
};