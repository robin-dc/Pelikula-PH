import React from 'react'
import {Movie, Navbar} from '..'
import { useGetMoviesByGenreQuery } from '../../services/tmdb'


const MoviesCollection = ({type, genre, page}) => {

    const {data, isFetching, error} = useGetMoviesByGenreQuery({type, genre, page})

    return (
        <>
            <Navbar/>
            <div className='container'>
                <div>
                    {data.map((movie) => {
                        <Movie/>
                    })}
                </div>
            </div>
        </>

    )
}

export default MoviesCollection
