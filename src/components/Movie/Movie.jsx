import { Link } from 'react-router-dom'

const Movie = ({type, ...movie}) => {
  const { title, poster_path, vote_average, name, id, media_type } = movie

  return (
    <Link to={`/${type == "kdrama" || type == "anime" || media_type == 'tv' || type == 'tv' ? 'tv' : 'movie'}/${id}`} className="cursor-pointer z-[999999999] h-full">
        <div className='hover:scale-[1.06] transition-all duration-300 relative mx-[0.3rem] lg:mx-[0.5rem] h-full'>
          <img
            src={`https://www.themoviedb.org/t/p/original/${poster_path}`}
            alt="movie"
            className="min-h-[8rem] lg:min-h-[18.5rem] w-full hover:shadow-2xl hover:shadow-[#38383875] rounded-md"
            loading="lazy"
            title={title || name}

          />
          <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.3rem] lg:w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" loading="lazy" />
          <p className="truncate mt-[0.5rem] text-light lg:pr-2 text-[0.8rem] lg:text-base" title={title || name}>{title || name}</p>
          <p className=" mt-[0.5rem] text-[0.8rem] lg:text-base text-white absolute right-[0.5rem] lg:right-[1rem] bottom-[2rem] lg:bottom-[2.4rem]" style={{ textShadow: "0px 2px 5px black"}} >{vote_average?.toFixed(1)}</p>
        </div>
    </Link>
  )
}

export default Movie
