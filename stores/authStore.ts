import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistConfig } from './PersistConfig'; // relative import
import api from '@/api';

interface AuthState {
  token: string | null;
  user: any | null; // Replace `any` with a specific type if you know the structure of the user object
  loading: boolean;
}

interface AuthActions {
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>; 
  setUser: (user: any | null) => void; // Replace `any` with a specific type if you know the structure of the user object
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: true,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      login: async (username: string, password: string) => {
        try {
          api.post('/login', { username, password })
            .then((response) => {
              const { token, user } = response.data;
              set({ token, user, loading: false });
              // Optionally, you can also call fetchUser here if needed
              // get().fetchUser();
            })
            .catch((error) => {
              console.error('Login error:', error);
              set({ token: null, user: null, loading: false });
            });
        } catch (e) {
          console.error('Login error:', e);
          set({ token: null, user: null, loading: false });
        }
      },
      logout: async () => {
        try {
         // await api.post('/logout');
          set({ token: null, user: null, loading: false });
        } catch (e) {
          console.error('Logout error:', e);
          set({ token: null, user: null, loading: false });
        }
      },
      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          set({ user: null, loading: false });
          return;
        }

        try {
          // your API logic here
        } catch (e) {
          set({ user: null, loading: false });
        }
      },
    }),
    persistConfig
  )
);
