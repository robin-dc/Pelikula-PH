import { configureStore } from "@reduxjs/toolkit";
import { tmdbReducer, tmdbReducerPath, tmdbMiddleware } from "../services/tmdb";
import movieCollectionReducer from "../features/MovieCollectionSlice";
import fireStoreReducer from "../features/FireStoreSlice";

const store = configureStore({
    reducer: {
        [tmdbReducerPath]: tmdbReducer,
        MovieCollectionSlice: movieCollectionReducer,
        FireStoreSlice: fireStoreReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbMiddleware)
})

export default store
