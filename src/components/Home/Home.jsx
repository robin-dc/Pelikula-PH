import { FaInfoCircle } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import {Movies, Navbar} from '..';
import { useGetTrendingShowsQuery } from '../../services/tmdb';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToWatchLater } from '../../features/LocalStorageSlice';

const Home = () => {
    const dispatch = useDispatch()
    const {data, error, isFetching} = useGetTrendingShowsQuery()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

    if (!data) {
        return (
            <div className='min-h-screen bg-primary flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
        )
      }

    const randomNumber = Math.floor(Math.random() * data?.results.length)

    const filteredMovies = data?.results.filter(movie => movie.backdrop_path !== null && movie.backdrop_path !== undefined && movie.backdrop_path !== '' && movie.overview !== '')

    const randomMovie = filteredMovies[randomNumber]
    const {backdrop_path, title, overview, release_date, name, id, media_type, first_air_date} = randomMovie

    const backgroundImage = {
        backgroundImage: data && `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
    }
  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-no-repeat bg-cover w-full relative flex items-center"
        style={backgroundImage}>
            <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className='container z-[1]'>
                <div>
                    <h1 className="text-[3rem] font-semibold">{title || name}</h1>
                    <div className="flex gap-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}/play`} className="button bg-secondary flex gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.5rem]'/>
                            <span>Play</span>
                        </Link>
                        <button className="button border border-gray-200"
                        onClick={() => dispatch(addToWatchLater({data: randomMovie, type: media_type}))}>Watch Later</button>
                    </div>
                    <div className="w-[40%] py-1">
                        <p className="text-light">Released: {release_date ? release_date : first_air_date}</p>
                        <p>{overview.substring(0, 180)}...</p>

                    </div>
                    <button className="button border border-gray-200 px-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}`} className='flex items-center gap-[0.4rem]'>
                            <FaInfoCircle className='text-[1.1rem]'/>
                            <span>More Details</span>
                        </Link>

                    </button>
                </div>
            </div>
        </div>
        <Movies/>
    </>

  )
}

export default Home
