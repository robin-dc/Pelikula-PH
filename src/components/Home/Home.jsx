import { FaInfoCircle } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import {Movies, Navbar} from '..';
import { useGetTrendingShowsQuery } from '../../services/tmdb';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToWatchLater, fetchData } from '../../config/firebase';
import { setList } from '../../features/FireStoreSlice';

const Home = () => {
    const dispatch = useDispatch()
    const {data, error, isFetching} = useGetTrendingShowsQuery()

    const fetch = async() => {
        const data = await fetchData()
        dispatch(setList(data))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch()
    }, [])

    const addToList = (randomMovie, media_type) => {
        addToWatchLater({data: randomMovie, type: media_type})
        fetch()
    }

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
        <div className="px-1 md:px-0 min-h-screen bg-no-repeat bg-center md:bg-top bg-cover w-full relative flex items-center"
        style={backgroundImage}>
            <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className='container z-[1]'>
                <div>
                    <h1 className="text-[2.3rem] md:text-[3rem] leading-[2.5rem] mb-1 md:leading-normal font-semibold">{title || name}</h1>
                    <div className="flex gap-[0.6rem] md:gap-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}/play`} className="button bg-secondary flex gap-[0.1rem] md:gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.2rem] md:text-[1.5rem]'/>
                            <span className='text-[0.9rem] md:text-base'>Play</span>
                        </Link>
                        <button className="button border border-gray-200 text-[0.9rem] md:text-base"
                        onClick={() => addToList(randomMovie, media_type)}>Watch Later</button>
                    </div>
                    <div className="md:w-[40%] py-1">
                        <p className="text-light text-[0.85rem] md:text-base">Released: {release_date ? release_date : first_air_date}</p>
                        <p className='text-[0.9rem] md:text-base'>{overview.substring(0, 180)}...</p>

                    </div>
                    <button className="button border border-gray-200 px-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}`} className='flex items-center gap-[0.3rem] md:gap-[0.4rem]'>
                            <FaInfoCircle className='text-[1rem] md:text-[1.1rem]'/>
                            <span className='text-[0.9rem] md:text-base'>More Details</span>
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
