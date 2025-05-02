import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const BaseURL = "https://hssapi.test/api";

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    //const token = await AsyncStorage.getItem("token");
    const token = useAuthStore.getState().token;
    console.log("Token from interceptor:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { BaseURL };
export default api;
