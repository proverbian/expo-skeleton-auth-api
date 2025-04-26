import { create } from "zustand";
import api from "@/api";

type AuthState = {
  token: string | null;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  loading: true,

  login: async (username, password) => {
    const res = await api.post("/login", { username, password });
    const token = res.data.token;

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const userRes = await api.get("/me");

    set({
      token,
      user: userRes.data,
      loading: false,
    });
  },

  logout: () => {
    api.defaults.headers.common.Authorization = "";
    set({ token: null, user: null, loading: false });
  },

  // stores/authStore.tsx
fetchUser: async () => {
    const token = get().token;
    
    // Immediately set loading to false if no token exists
    if (!token) {
      set({ user: null, loading: false }); // 👈 Set both user and loading
      return;
    }
  
    try {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await api.get("/me");
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ user: null, loading: false }); // 👈 Ensure error case updates loading
    }
  },
}));
