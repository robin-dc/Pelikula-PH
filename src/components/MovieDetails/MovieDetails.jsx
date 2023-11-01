import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import {Navbar, MovieHeader, PeopleList, TrailerList} from '..'
import { useGetSingleMovieDetailsQuery } from '../../services/tmdb'
import { useEffect, useState } from 'react'


const MovieDetails = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const newPath = pathname.split('/').filter((path, index) => index == 1 || index == 2).join('/')

  const {data, error, isFetching} = useGetSingleMovieDetailsQuery({pathname: newPath})
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timeout = setTimeout(() => {
      // setIsLoading(false)
      if(!data && newPath.split("/")[0] == "movie"){
        navigate(`/tv/${newPath.split("/")[1]}`)
      }
      else if(!data && newPath.split("/")[0] == "tv"){
        navigate(`/movie/${newPath.split("/")[1]}`)
      }
    }, 1000);

    return () => clearTimeout(timeout)

  }, [data])

  useEffect(()=> {
    // const timeout = setTimeout(() => {
    //   setIsLoading(false)
      window.scrollTo(0, 0);
    // }, 0);

    // return () => clearTimeout(timeout)
  }, [])

  if (isFetching || !data) {
    return (
        <div className='min-h-screen bg-primary flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
            <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
            </div>
        </div>
    )
  }

  if(error){
    // navigate(`/tv/${newPath.split("/")[1]}`)

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
        <TrailerList data={results}/>
        <Outlet/>
    </div>
  )
}

export default MovieDetails
