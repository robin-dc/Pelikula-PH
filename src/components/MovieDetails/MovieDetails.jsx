import { useNavigate, useParams } from 'react-router-dom'
import {Navbar, MovieHeader} from '..'
import { useGetSingleMovieQuery } from '../../services/tmdb'
import { useEffect } from 'react'

const MovieDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data, error, isFetching} = useGetSingleMovieQuery({id})

  useEffect(()=> {
    const timeout = setTimeout(() => {
        <div className='min-h-screen bg-primary flex justify-center items-center'>
            <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
            </div>
        </div>
    }, 5000);

    return () => clearTimeout(timeout)
  }, [])

  if (isFetching) {
    return (
        <div className='min-h-screen bg-primary flex justify-center items-center'>
            <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
            </div>
        </div>
    )
  }

  if(!data){
    return (
      <div className='min-h-screen bg-primary flex flex-col justify-center items-center'>
            <p className='text-light'>No data found</p>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
  }

  return (
    <div>
        <Navbar/>
        <MovieHeader {...data}/>
    </div>
  )
}

export default MovieDetails
