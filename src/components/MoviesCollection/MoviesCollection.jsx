import React, { useEffect, useState } from 'react'
import {Movie, Navbar} from '..'
import { useGetMoviesByGenreQuery, useGetSearchedMovieQuery} from '../../services/tmdb'
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from 'react-router-dom'

const MoviesCollection = () => {
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState("movie")
    const {pathname} = useLocation()

    const firstPath = pathname.split('/')[1]
    const keyword = pathname.split('/')[2]
    const cleanKeyword = keyword.split('%20')
                                .map(word => word[0].toUpperCase() + word.slice(1))
                                .join(" ")

    const {genre, type, page} = useSelector((state) => state.MovieCollectionSlice)

    const genreId = genre ? genre.id : pathname.split('/')[2]
    const genreName = genre ? genre.name : pathname.split('/')[2]
    const typeList = type ? type : (firstPath == "tvlist" ? "tv" : "movie")

    const {data, isFetching, error} = firstPath == "search" ?
                            useGetSearchedMovieQuery({keyword: cleanKeyword, type:searchType})
                            : useGetMoviesByGenreQuery({type: typeList, genreId, page})

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setSearchType("movie")
    }, [pathname])

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

    if(firstPath == "search" && searchType == "movie" && data?.results.length == 0) {
        setSearchType("tv")
    }


    const filteredMovies = data?.results.filter(movie => movie.poster_path !== null);

    return (
        <>
            <Navbar/>
            {!isFetching ?
            <div className='px-1 lg:px-0 container mt-6 lg:mt-9 min-h-screen'>
                <div className='flex gap-[0.7rem] items-center'>
                    <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                    {firstPath == "search" ?
                        <h3 className="text-[1.5rem] font-semibold">
                            Search for {cleanKeyword}:
                        </h3>
                        :
                        <h3 className="text-[1.3rem] lg:text-[1.5rem] font-semibold">
                            {genreName} {type == 'tv' ? "TV Series" : "Movies"}
                        </h3>
                    }
                </div>

                {firstPath == "search" && data?.results == 0 &&
                    <div className='py-9 bg-primary flex flex-col justify-center items-center z-10'>
                        <p className='text-light'>No data was found for {cleanKeyword}...</p>
                    </div>
                }

                <div className='grid grid-cols-3 lg:grid-cols-6 py-2 lg:px-1'>
                    {filteredMovies.map((movie, index) => (
                        <div key={index} className='pb-2'>
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
