import { BsFillPlayFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { addToWatchLater, fetchData } from '../../config/firebase';
import { setList } from '../../features/FireStoreSlice';
import { useEffect, useState } from 'react';
import { Toast } from '..';
import { useDispatch, useSelector } from 'react-redux';

const MovieHeader = ({...data}) => {
    let location = useLocation();
    const dispatch = useDispatch();
    const type = location.pathname.split('/')[1];

    const [isSuccess, setIsSuccess] = useState(null)
    const fireStore = useSelector((state) => state.FireStoreSlice.value)

    const fetch = async() => {
        const data = await fetchData()
        dispatch(setList(data))
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(null)
        }, 2000)

        return () => clearTimeout(timeout)
     }, [isSuccess])

    if (!data) {
        return (
            <div className='min-h-screen bg-primary flex justify-center items-center'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
        )
    }

    const {first_air_date, backdrop_path, genres, homepage, overview, original_language, imdb_id, popularity, poster_path, release_date, revenue, runtime, spoken_languages, status, tagline, title, videos, vote_average, vote_count, name} = data

    const backgroundImage = {
        backgroundImage: data && `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
    }

    function minutesToHoursAndMinutes(minutes) {
        var hours = Math.floor(minutes / 60);
        var remainingMinutes = minutes % 60;
        return hours + "h " + remainingMinutes + "min";
    }

    const addToList = (data, type) => {
        if(fireStore.length == 0 ) {
            setIsSuccess(true)
            addToWatchLater({data: data, type: type})
            fetch()
        }
        else{
            for (let i = 0; i < fireStore.length; i++) {
                if(fireStore[i].data.backdrop_path == data.backdrop_path){
                    setIsSuccess(false)
                    return
                }
            }
            setIsSuccess(true)
            addToWatchLater({data: data, type: type})
            fetch()
        }
    }
  return (
    <div className="px-1 lg:px-0 min-h-screen bg-no-repeat bg-cover w-full relative flex items-center"
        style={backgroundImage}>
            <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className='container z-[1]'>
                {isSuccess !== null &&  (isSuccess == false ?
                    <Toast variant="error" message="Already exists in the Watch Later" />
                    :
                    <Toast variant="success" message="Added to Watch Later" />)
                }
                <div>
                    <h1 className="text-[2.3rem] lg:text-[3rem] leading-[2.5rem] mb-1 lg:leading-normal font-semibold">{title || name}</h1>
                    <div className="lg:w-[43%] py-1 flex flex-col gap-[0.5rem]">
                        <div>
                            <span className="text-light text-[0.85rem] lg:text-base inline">Released: {release_date ? release_date : first_air_date}</span>
                            <span className="text-light text-[0.85rem] lg:text-base inline">{runtime ? " | " + minutesToHoursAndMinutes(runtime) : ""}</span>
                            <span className="text-light text-[0.85rem] lg:text-base inline"> | {spoken_languages[0].english_name}</span>
                            <Link to={`https://imdb.com/title/${imdb_id}`} target='_blank' className='inline-flex ml-[0.8rem]   lg:ml-1 items-center gap-[0.5rem]'>
                                <img src="/images/imdb_logo.svg" alt="imdb" />
                                <span className="text-light text-[0.85rem] lg:text-base">{vote_average.toFixed(1)}</span>
                            </Link>
                        </div>
                        <p className='text-[0.9rem] lg:text-base'>{overview}</p>
                        <div className='flex gap-[0.5rem] flex-wrap'>
                        <span className='text-light text-[0.85rem] lg:text-base'>Genre: </span>
                        {genres.map((genre, index) => (
                            <button className="text-light text-[0.85rem] lg:text-base button px-0 py-0 flex items-center gap-[0.4rem]" key={genre.id}>
                                {genre.name} {index !== genres.length -1 ? "•" : ""}
                            </button>
                            )
                        )}
                        </div>
                    </div>
                    <div className="flex gap-1 mt-1">
                        {!videos.results.length == 0 && <Link to="play" className="button bg-secondary flex gap-[0.1rem] lg:gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.2rem] lg:text-[1.5rem]'/>
                            <span className='text-[0.9rem] lg:text-base'>Play</span>
                        </Link>}
                        <button className="button border border-gray-200 text-[0.9rem] lg:text-base"
                        onClick={() => addToList(data, type)}>Watch Later</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MovieHeader
