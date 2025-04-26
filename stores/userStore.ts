import { create } from "zustand";
import api from "@/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    const res = await api.post("/login", { email, password });
    set({ user: res.data, loading: false });
  },

  logout: () => {
    set({ user: null });
    api.post("/logout"); // optional
  },

  fetchUser: async () => {
    set({ loading: true });
    const res = await api.get("/me");
    set({ user: res.data, loading: false });
  },

  updateUser: async (updates) => {
    set({ loading: true });
    console.log(updates)
    const res = await api.put("/me", updates);
    set({ user: res.data, loading: false });
  },

  setUser: (user) => set({ user }),
}));
