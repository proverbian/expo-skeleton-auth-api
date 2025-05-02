import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = {
  name: 'auth-storage',
  getStorage: () => AsyncStorage,
};
// This is a configuration for Zustand's persist middleware.