import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = "https://hssapi.test/api";

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { BaseURL };
export default api;
