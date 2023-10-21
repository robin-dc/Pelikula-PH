import { configureStore } from "@reduxjs/toolkit";
import { tmdbReducer, tmdbReducerPath, tmdbMiddleware } from "../services/tmdb";
import movieCollectionReducer from "../features/MovieCollectionSlice";

const store = configureStore({
    reducer: {
        [tmdbReducerPath]: tmdbReducer,
        MovieCollectionSlice: movieCollectionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbMiddleware)
})

export default store
