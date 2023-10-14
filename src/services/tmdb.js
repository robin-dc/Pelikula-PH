import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        // get genres for movies
        getGenresForMovies: builder.query({
            query: () => `/genre/movie/list?api_key=${apiKey}`
        }),
        // get genres for tvshows
        getGenresForTv: builder.query({
            query: () => `/genre/tv/list?api_key=${apiKey}`
        }),
        // get movies by type of list
        getMovies: builder.query({
            query: ({type}) => {
                if(type == 'trending') {
                    return `/trending/all/day?&api_key=${apiKey}`
                }
                return `/movie/${type}?page=1&api_key=${apiKey}`
            }
        }),
        getTrendingShows: builder.query({
            query: () => `/trending/all/day?api_key=${apiKey}`
        }),
        getSingleMovieDetails: builder.query({
            query: ({pathname}) => `${pathname}?append_to_response=videos,credits&api_key=${apiKey}`
        })
    })

})

export const tmdbReducerPath = tmdbApi.reducerPath
export const tmdbReducer = tmdbApi.reducer
export const tmdbMiddleware = tmdbApi.middleware

export const {
    useGetGenresForMoviesQuery,
    useGetTrendingShowsQuery,
    useGetGenresForTvQuery,
    useGetMoviesQuery,
    useGetSingleMovieDetailsQuery
} = tmdbApi
