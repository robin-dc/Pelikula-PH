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
                    return `/trending/all/day?api_key=${apiKey}&sort_by=vote_average.desc`
                }
                else if(type == 'kdramas'){
                    return `/tv/on_the_air?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_original_language=ko`
                }
                else if(type == 'animes'){
                    return `/tv/on_the_air?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_original_language=ja&with_genres=16`
                }
                else if(type == 'disney'){
                    return `/movie/popular?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_genres=16&with_companies=6125`
                }
                return `/movie/${type}?page=1&api_key=${apiKey}&include_media_type=true`
            }
        }),
        getTrendingShows: builder.query({
            query: () => `/tv/popular?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_original_language=ko`
        }),
        getSingleMovieDetails: builder.query({
            query: ({pathname}) => `${pathname}?append_to_response=videos,credits&api_key=${apiKey}`
        }),
        getGenres: builder.query({
            query: ({type}) => `/genre/${type}/list?api_key=${apiKey}`
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
    useGetSingleMovieDetailsQuery,
    useGetGenresQuery
} = tmdbApi
