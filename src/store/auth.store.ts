import { create } from "zustand"

interface AuthState {
  token: string | null
  user: any | null
  login: (token: string, user: any) => void
  logout: () => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => {
    localStorage.setItem("accessToken", token)
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem("accessToken")
    set({ token: null, user: null })
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