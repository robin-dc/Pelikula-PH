import { configureStore } from "@reduxjs/toolkit";
import { tmdbReducer, tmdbReducerPath, tmdbMiddleware } from "../services/tmdb";
import movieCollectionReducer from "../features/MovieCollectionSlice";
import localStorageReducer from "../features/LocalStorageSlice";

const store = configureStore({
    reducer: {
        [tmdbReducerPath]: tmdbReducer,
        MovieCollectionSlice: movieCollectionReducer,
        LocalStorageSlice: localStorageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbMiddleware)
})

export default store
