import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';

import { authAPI } from "./authApi";

type AuthState = {
    user: any;
    isAuthenticated: boolean;
};
const token = localStorage.getItem("accessToken");

const initialState: AuthState = {
    user: token ? jwt_decode(token) : {},
    isAuthenticated: token ? true : false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: any) => {

            state.isAuthenticated = false;
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
        },
        load: (state: any) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                state.user = jwt_decode(token);
                state.isAuthenticated = true;

            }


        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authAPI.endpoints.register.matchFulfilled,
                (state, { payload }) => {
                    state.user = jwt_decode(payload.tokens.access);
                    state.isAuthenticated = true;
                    localStorage.setItem("refreshToken", payload.tokens.refresh);
                    localStorage.setItem("accessToken", payload.tokens.access);
                }
            )

            .addMatcher(
                authAPI.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.user = jwt_decode(payload.access);
                    state.isAuthenticated = true;
                    localStorage.setItem("refreshToken", payload.refresh);
                    localStorage.setItem("accessToken", payload.access);
                }
            )
            .addMatcher(authAPI.endpoints.login.matchRejected, (state) => {
                state.user = {}
                state.isAuthenticated = false;
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            })

    },
});

export default slice.reducer;
export const authActions = slice.actions;

export const authSelector = (state: { auth: AuthState }) => state.auth;


