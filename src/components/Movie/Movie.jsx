import { Link } from 'react-router-dom'

const Movie = ({...movie}) => {
  const { title, poster_path, vote_average, name, id } = movie

  return (
    <Link to={`/movie/${id}`} className="relative cursor-pointer z-[999999999]">
        {poster_path && <div className='hover:scale-[1.06] transition duration-300'>
          <img src={`https://www.themoviedb.org/t/p/original/${poster_path}`} alt="movie" className="w-[12rem] hover:shadow-2xl hover:shadow-[#4747475b]" loading="lazy" title={title}/>
          <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" loading="lazy" />
          <p className="truncate mt-[0.5rem] text-light pr-2" title={title}>{title || name}</p>
          <p className=" mt-[0.5rem] text-white absolute right-[1.7rem] bottom-[2.4rem]" style={{ textShadow: "0px 2px 5px black"}} >{vote_average}</p>
        </div>}
    </Link>
  )
}

export default Movie
