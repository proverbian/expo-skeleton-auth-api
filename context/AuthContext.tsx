// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/me")
    //.then((res) => console.log('test', res.data))
    .then((res) => setUser(res.data))
  },[]);

  const updateUser = async (updatedData: object) => {
    const res = await api.put("/me", updatedData);
    setUser(res.data);
    return res.data;
  }

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
