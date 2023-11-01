import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({

        // get movies by type of list : for recommendations on homepage
        getMovies: builder.query({
            query: ({type}) => {
                if(type == 'trending') {
                    return `/trending/all/day?api_key=${apiKey}&include_adult=false&sort_by=vote_average.desc`
                }
                else if(type == 'kdrama'){
                    return `/discover/tv?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_original_language=ko`
                }
                else if(type == 'anime'){
                    return `/discover/tv?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_original_language=ja&with_genres=16`
                }
                else if(type == 'disney'){
                    return `/discover/movie?api_key=${apiKey}&append_to_response=media_type&include_adult=false&include_video=true&language=en-US&with_genres=16&with_companies=6125`
                }
                return `/movie/${type}?page=1&api_key=${apiKey}&include_media_type=true&include_adult=false`
            }
        }),

        // get movies based on genre
        getMoviesByGenre: builder.query({
            query: ({type, genreId, page}) => `/discover/${type}?with_genres=${genreId}&include_adult=false&page=${page}&api_key=${apiKey}`
        }),


        // made for home header
        getTrendingShows: builder.query({
            query: () => `/trending/all/day?api_key=${apiKey}&append_to_response=media_type,videos&include_adult=false&include_video=true&language=en-US&with_original_language=ko`
        }),

        // get movie detail
        getSingleMovieDetails: builder.query({
            query: ({pathname}) => `${pathname}?append_to_response=videos,credits&api_key=${apiKey}`
        }),

        // get genres
        getGenres: builder.query({
            query: ({type}) => `/genre/${type}/list?api_key=${apiKey}`
        }),

        // get person details
        getPersonDetails: builder.query({
            query: ({id}) => `/person/${id}?append_to_response=videos,credits&language=en-US&api_key=${apiKey}`
        }),

        getSearchedMovie: builder.query({
            query: ({keyword, type}) =>
                `/search/${type}?api_key=${apiKey}&query=${keyword}&include_adult=false&append_to_response=media_type&language=en-US&page=1`
        })

    })

})

export const tmdbReducerPath = tmdbApi.reducerPath
export const tmdbReducer = tmdbApi.reducer
export const tmdbMiddleware = tmdbApi.middleware

export const {
    useGetTrendingShowsQuery,
    useGetMoviesQuery,
    useGetSingleMovieDetailsQuery,
    useGetGenresQuery,
    useGetMoviesByGenreQuery,
    useGetPersonDetailsQuery,
    useGetSearchedMovieQuery
} = tmdbApi
