
const MovieList = () => {
  return (
    <div className="py-3">
        <h1 className="text-[1.5rem] font-semibold mb-2">Trending Now</h1>
        <div className="flex gap-[0.7rem]">
           <div className="relative cursor-pointer hover:scale-[1.05] transition duration-500">
                <img src="https://www.themoviedb.org/t/p/original/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="movie" className="w-[12rem]"/>
                <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" />
                <p className="truncate mt-[0.5rem] text-light">Alice in Borderland</p>
            </div>
           <div className="relative cursor-pointer hover:scale-[1.05] transition duration-500">
                <img src="https://www.themoviedb.org/t/p/original/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="movie" className="w-[12rem]"/>
                <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" />
                <p className="truncate mt-[0.5rem] text-light">Alice in Borderland</p>
            </div>
           <div className="relative cursor-pointer hover:scale-[1.05] transition duration-500">
                <img src="https://www.themoviedb.org/t/p/original/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="movie" className="w-[12rem]"/>
                <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" />
                <p className="truncate mt-[0.5rem] text-light">Alice in Borderland</p>
            </div>
           <div className="relative cursor-pointer hover:scale-[1.05] transition duration-500">
                <img src="https://www.themoviedb.org/t/p/original/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="movie" className="w-[12rem]"/>
                <img src="/images/pelikulaicon.png" alt="icon" className="w-[1.7rem] absolute top-[0.5rem] left-[0.2rem]" />
                <p className="truncate mt-[0.5rem] text-light">Alice in Borderland</p>
            </div>
        </div>
    </div>
  )
}

export default MovieList
