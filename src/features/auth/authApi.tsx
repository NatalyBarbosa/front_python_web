import { rtkApi } from "../rtkquery";


export const authAPI = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<

            any, { username: string, email: string, password: string }
        >({
            query: ({ username, email, password }) => {
                const data = { username, email, password }
                return {
                    url: "/user/",
                    method: "POST",
                    data,

                };
            },
        }),
        login: builder.mutation<
            any,
            { username: string, password: string }
        >({
            query: ({ username, password }) => {
                const data = { username, password };
                return {
                    url: "/user/token/",
                    method: "POST",
                    data,

                };
            },
        }),
        logout: builder.mutation<
            any,
            void
        >({
            query: () => {
                const data = localStorage.getItem("refreshToken");
                console.log(data);
                return {
                    url: "/user/logout/",
                    method: "POST",
                    data,

                };
            },
        }),
        listUser: builder.query<

            any, void
        >({
            query: () => {

                return {
                    url: "/user/admin/",
                    method: "GET",


                };
            },
        }),
        userAsSuspended: builder.mutation<

            any, { id: string }
        >({
            query: ({ id }) => {

                const data = {

                    suspenso: true,

                }
                return {
                    url: '/user/admin/' + id + "/",
                    method: "PATCH",
                    data,

                };
            },
        }),
        userPending: builder.mutation<

            any, { id: string }
        >({
            query: ({ id }) => {

                const data = {

                    suspenso: false,

                }
                return {
                    url: '/user/admin/' + id + "/",
                    method: "PATCH",
                    data,

                };
            },
        }),





    }),
});