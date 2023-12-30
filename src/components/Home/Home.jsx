import { FaInfoCircle } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import {Movies, Navbar, Toast} from '..';
import { useGetTrendingShowsQuery } from '../../services/tmdb';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchLater, fetchData } from '../../config/firebase';
import { setList } from '../../features/FireStoreSlice';

const Home = () => {
    const dispatch = useDispatch()
    const {data, error, isFetching} = useGetTrendingShowsQuery()
    const [isSuccess, setIsSuccess] = useState(null)
    const fireStore = useSelector((state) => state.FireStoreSlice.value)

    const fetch = async() => {
        const data = await fetchData()
        dispatch(setList(data))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(null)
        }, 1500)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    const addToList = (randomMovie, media_type) => {
        if(fireStore.length == 0 ) {
            setIsSuccess(true)
            addToWatchLater({data: randomMovie, type: media_type})
            fetch()
        }
        else{
            for (let i = 0; i < fireStore.length; i++) {
                if(fireStore[i].data.backdrop_path == randomMovie.backdrop_path){
                    setIsSuccess(false)
                    return
                }
            }
            setIsSuccess(true)
            addToWatchLater({data: randomMovie, type: media_type})
            fetch()
        }
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
        <div className="px-1 lg:px-0 min-h-screen bg-no-repeat bg-center lg:bg-top bg-cover w-full relative flex items-center"
        style={backgroundImage}>
            <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className='container z-[1]'>
                {isSuccess !== null &&  (isSuccess == false ?
                    <Toast variant="error" message="Already Exists in the Watch Later" />
                    :
                    <Toast variant="success" message="Added to Watch Later" />)
                }
                <div>
                    <h1 className="text-[2.3rem] lg:text-[3rem] leading-[2.5rem] mb-1 lg:leading-normal font-semibold">{title || name}</h1>
                    <div className="flex gap-[0.6rem] lg:gap-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}/play`} className="button bg-secondary flex gap-[0.1rem] lg:gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.2rem] lg:text-[1.5rem]'/>
                            <span className='text-[0.9rem] lg:text-base'>Play</span>
                        </Link>
                        <button className="button border border-gray-200 text-[0.9rem] lg:text-base"
                        onClick={() => addToList(randomMovie, media_type)}>Watch Later</button>
                    </div>
                    <div className="lg:w-[40%] py-1">
                        <p className="text-light text-[0.85rem] lg:text-base">Released: {release_date ? release_date : first_air_date}</p>
                        <p className='text-[0.9rem] lg:text-base'>{overview.substring(0, 180)}...</p>

                    </div>
                    <button className="button border border-gray-200 px-1">
                        <Link to={`/${media_type !== 'movie' ? 'tv' : 'movie'}/${id}`} className='flex items-center gap-[0.3rem] lg:gap-[0.4rem]'>
                            <FaInfoCircle className='text-[1rem] lg:text-[1.1rem]'/>
                            <span className='text-[0.9rem] lg:text-base'>More Details</span>
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
