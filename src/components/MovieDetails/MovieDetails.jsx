import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {Navbar, MovieHeader, PeopleList, Trailer} from '..'
import { useGetSingleMovieDetailsQuery } from '../../services/tmdb'
import { useEffect, useState } from 'react'


const MovieDetails = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {data, error, isFetching} = useGetSingleMovieDetailsQuery({pathname})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    const timeout = setTimeout(() => {
      setIsLoading(false)
      window.scrollTo(0, 0);
    }, 1400);

    return () => clearTimeout(timeout)
  }, [])

  if (!data || isLoading || isFetching) {
    return (
        <div className='min-h-screen bg-primary flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
            <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
            </div>
        </div>
    )
  }

  if(error){
    return (
      <div className='min-h-screen bg-primary flex flex-col justify-center items-center'>
          <p className='text-light'>No data found</p>
          <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    )
  }

  const {first_air_date, backdrop_path, genres, homepage, overview, original_language, imdb_id, popularity, poster_path, release_date, revenue, runtime, spoken_languages, status, tagline, title, videos: {results}, vote_average, vote_count, name, credits: {cast,crew}} = data


  const filteredCrew = crew.filter(person => person.profile_path !== null);
  const filteredCast = cast.filter(person => person.profile_path !== null);

  return (
    <div>
        <Navbar/>
        <MovieHeader {...data}/>
        <PeopleList title={"Top Billed Cast"} data={filteredCast}/>
        <PeopleList title={"Production Cast"} data={filteredCrew}/>
        <Trailer data={results}/>
    </div>
  )
}

export default MovieDetails
