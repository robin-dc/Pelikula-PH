import { BsFillPlayFill } from 'react-icons/bs';

const MovieHeader = ({...data}) => {
    if (!data) {
        return (
            <div className='min-h-screen bg-primary flex justify-center items-center'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
        )
      }
    console.log(data)
    const {backdrop_path, genres, homepage, overview, original_language, imdb_id, popularity, poster_path, release_date, revenue, runtime, spoken_languages, status, tagline, title, videos, vote_average, vote_count, name} = data

    const backgroundImage = {
        backgroundImage: data && `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
    }

  return (
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
                        <button className="button bg-secondary flex gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.5rem]'/>
                            <span>Play</span>
                        </button>
                        <button className="button border border-gray-200">Watch Later</button>
                    </div>
                    <div className="w-[40%] py-1">
                        <p className="text-light">Released: {release_date}</p>
                        <p>{overview}</p>
                    </div>
                    <div className='flex gap-[0.5rem]'>
                       {genres.map(genre => (
                        <button className="button border border-gray-200 px-1 flex items-center gap-[0.4rem]" key={genre.id}>
                            {genre.name}
                        </button>
                        )
                    )}
                    </div>

                </div>
            </div>
        </div>
  )
}

export default MovieHeader
