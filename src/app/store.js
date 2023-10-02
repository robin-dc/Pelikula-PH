import { configureStore } from "@reduxjs/toolkit";
import { tmdbReducer, tmdbReducerPath, tmdbMiddleware } from "../services/tmdb";

const store = configureStore({
    reducer: {
        [tmdbReducerPath]: tmdbReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbMiddleware)
})

export default store
