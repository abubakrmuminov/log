import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Auth/AuthSlice";

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});