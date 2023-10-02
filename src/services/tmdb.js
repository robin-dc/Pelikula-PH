import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        // get trending shows
        getTrendingShows: builder.query({
            query: () => `/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`
        }),
        // get genres for movies
        getGenresForMovies: builder.query({
            query: () => `/genre/movie/list?api_key=${apiKey}`
        })
    })
})

export const tmdbReducerPath = tmdbApi.reducerPath
export const tmdbReducer = tmdbApi.reducer
export const tmdbMiddleware = tmdbApi.middleware

export const {
    useGetGenresForMoviesQuery,
    useGetTrendingShowsQuery
} = tmdbApi
