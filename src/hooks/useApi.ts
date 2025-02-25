import axios, { AxiosRequestConfig } from "axios";
import { toast } from "./use-toast";
import api from "@/api";


// Define the API response structure
interface ApiResponse<T> {
    success: boolean;
    data: T;
}

// Generic API call function using Axios instance
export async function callApi<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await api.request<ApiResponse<T>>(config);

        if (response.data.success) {
            return response.data.data;
        } else {
            // Handle API errors where success is false
            throw new Error(
                (response.data.data as unknown as { message?: string })?.message || "API error occurred"
            );
        }
    } catch (error) {
        let errorMessage = "An unexpected error occurred.";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.data?.message || error.message || "Network error";
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Show toast notification
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
            duration: 5000,
        });

        console.error(error);
        throw error;
    }
}