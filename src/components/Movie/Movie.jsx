import React from 'react'

const Movie = () => {
  return (
    <div className="relative cursor-pointer hover:scale-[1.05] transition duration-500 z-[999999999]">
        <img src="https://www.themoviedb.org/t/p/original/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="movie" className="w-[12rem]" loading="lazy"/>
        <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" />
        <p className="truncate mt-[0.5rem] text-light">Alice in Borderland</p>
    </div>
  )
}

export default Movie
