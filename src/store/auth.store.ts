import { create } from "zustand"

interface AuthState {
  token: string | null
  login: (token: string) => void
  logout: () => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: (token) => {
    localStorage.setItem("accessToken", token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem("accessToken")
    set({ token: null })
  },
  setToken: (token) => {
    if (token) {
      localStorage.setItem("accessToken", token)
    } else {
      localStorage.removeItem("accessToken")
    }
    set({ token })
  },
}))