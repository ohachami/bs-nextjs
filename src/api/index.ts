import { BASE_API } from "@/utils/routes";
import axios from "axios";

const api = axios.create({
    baseURL: BASE_API,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        console.info(
            `Request: ${config?.method?.toUpperCase()} ${config.baseURL}${config.url}`,
        );
        if (config.params) {
            console.info(`Request Params: ${JSON.stringify(config.params)}`);
        }
        if (config.data) {
            console.info(
                `Request Data: ${JSON.stringify(
                    config.data,
                    (_, v) => (typeof v === 'bigint' ? v.toString() : v),
                    2,
                )}`,
            );
        }
        return config;
    },
    (error) => {
        console.error(`Request Error: ${error.message}`);
        return Promise.reject(error);
    },
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.info(
            `Response: ${response.status} ${response.config.baseURL}${response.config.url}`,
        );
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(
                `Response Error: ${error.response.status} ${error.response.config.baseURL}${error.response.config.url}`,
            );
            console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`Network Error: ${error.message}`);
        }
        return Promise.reject(error);
    },
);


export default api;