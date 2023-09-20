
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";




interface AxiosQueryArgs {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];

}

interface AxiosBaseQueryProps {
    baseURL: string;
}

const axiosBaseQuery =
    (
        { baseURL }: AxiosBaseQueryProps = { baseURL: "" }
    ): BaseQueryFn<AxiosQueryArgs, unknown, unknown> =>
        async (
            { url, method = "get", data, params },
            api
        ) => {
            const token = await localStorage.getItem("accessToken");
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["token"] = `${token}`;
            }


            const axiosClient = axios.create({
                baseURL,
                headers,
            });

            axiosClient.defaults.withCredentials = false;

            try {
                const result = await axiosClient({ url, method, data, params });

                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError as AxiosError;

                if (err?.response?.statusText === "Unauthorized") {
                    localStorage.removeItem("accessToken");

                }
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export const baseQuery = axiosBaseQuery({
    baseURL: "http://127.0.0.1:8000/",
});

const baseQueryWithRefresh: BaseQueryFn<
    AxiosQueryArgs,
    unknown,
    unknown
> = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    const error = result.error as { status: number; data: any };
    // && error?.data["code"] === "token_not_valid"
    if (error?.status === 403) {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResult = await baseQuery(
            {
                url: "token/refresh/",
                method: "POST",
                data: { refresh: refreshToken },
            },
            api,
            extraOptions
        );
        if (refreshResult.data) {
            const data = refreshResult.data as { access: string };
            localStorage.setItem("accessToken", data["access"]);

            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
export const rtkApi = createApi({
    baseQuery: baseQueryWithRefresh,
    reducerPath: "rtkquery",
    endpoints: () => ({}),
});