import React, { useEffect } from 'react'
import {Movie, Navbar} from '..'
import { useGetMoviesByGenreQuery } from '../../services/tmdb'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const MoviesCollection = () => {
    const navigate = useNavigate()
    const {genre, type, page} = useSelector((state) => state.MovieCollectionSlice)

    const genreId = genre.id
    const genreName = genre.name
    const {data, isFetching, error} = useGetMoviesByGenreQuery({type, genreId, page})

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    if(!data){
        return (
            <div className='min-h-screen bg-primary flex justify-center items-center z-10'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
        )
    }
    if(error){
        return (
            <div className='min-h-screen bg-primary flex flex-col justify-center items-center z-10'>
                <p className='text-light'>No data found</p>
                <button onClick={() => navigate('/home')}>Go back</button>
            </div>
        )
    }
    const filteredMovies = data?.results.filter(movie => movie.poster_path !== null);

    return (
        <>
            <Navbar/>
            {!isFetching ?
            <div className='container mt-9'>
                <div className='flex gap-[0.7rem] items-center'>
                    <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                    <h3 className="text-[1.5rem] font-semibold">{genreName} {type == 'tv' ? "TV Series" : "Movies"}</h3>
                </div>
                <div className='grid grid-cols-6 py-2 px-1'>
                    {filteredMovies.map(movie => (
                        <div key={movie} className='pb-2'>
                            <Movie type={type} {...movie} />
                        </div>
                    ))}
                </div>
            </div>
            :
            <div className='min-h-screen bg-primary flex justify-center items-center z-10'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
            }
        </>

    )
}

export default MoviesCollection
