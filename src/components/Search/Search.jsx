import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useGetSearchedMovieQuery } from '../../services/tmdb';


const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const [searchType, setSearchType] = useState("movie")

  const {data, isFetching, error} = useGetSearchedMovieQuery({keyword, type:searchType})


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && keyword !== "") {
      navigate(`/search/${keyword}`);
      setKeyword("")
    }
  };

  if(error){
    return (
      <div className='w-full max-h-[300px] absolute top-[3.5rem] left-0 border-2 border-[#303030af] bg-black rounded-lg px-1 py-[1.5rem] text-[0.9rem]'>
        Suggestions not found
      </div>
    )
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(data?.results.length == 0 && searchType == "movie"){
        // navigate(`/tv/${newPath.split("/")[1]}`)
        setSearchType("tv")
      }
      else if(data?.results.length == 0 && searchType == "tv"){
        // navigate(`/movie/${newPath.split("/")[1]}`)
        setSearchType("movie")
      }
    }, 500);

  return () => clearTimeout(timeout)
  }, [keyword])


  const suggestions = data?.results.filter(movie => movie.poster_path !== null).slice(0, 10)

  return (
    <div className="border-[1px] border-[#fafafa50] flex items-center bg-[#1a1a1a8e] relative">
        <input
          type="text"
          placeholder="Search"
          className="px-[0.9rem] bg-transparent outline-none w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button onClick={() => {
            if(keyword !== ""){
              navigate(`/search/${keyword}`)
            }
          }}
          className='border-l-[1px] border-[#fafafa50]'>
            <BsSearch className='text-[2.4rem] py-[0.5rem] px-[0.3rem]'/>
        </button>

        {isFetching && keyword !== "" &&
          <div className='w-full max-h-[300px] absolute top-[3.5rem] left-0 border-2 border-[#303030af] bg-black rounded-lg px-1 py-[1.5rem] text-[0.9rem] flex items-center justify-center text-light'>
                Searching for {keyword}...
          </div>
        }

        {data?.results.length !== 0 && keyword !== "" &&
          <div className='lg:suggestions overflow-y-scroll overflow-x-hidden w-full max-h-[300px] absolute top-[3.5rem] left-0 flex flex-col divide-y-[1px] divide-[#303030af] border-2 border-[#303030af] bg-black rounded-lg px-1 py-[1.5rem] text-[0.9rem]'>
            {suggestions?.map((suggestion,index) => (
              <Link to={`/${searchType}/${suggestion.id}`}
                    key={index}
                    className='py-[0.5rem] flex items-center gap-1 transition hover:bg-[#30303073]'
                    onClick={() => setKeyword("")}
              >
                <img src={`https://www.themoviedb.org/t/p/original/${suggestion.poster_path}`}  alt="movie poster" className="w-2"/>
                <div>
                  <h3 className='truncate w-4/5 overflow-hidden' title={suggestion.title || suggestion.name}>{suggestion.title || suggestion.name}</h3>
                  <div className='flex gap-[0.4rem] items-center'>
                    <small className='text-light'>
                      {suggestion.release_date?.split('-')[0] || suggestion.first_air_date?.split('-')[0]}
                    </small>
                    <small className="text-light flex gap-[0.2rem] items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                      {suggestion.popularity.toFixed(1)}%
                    </small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }

    </div>
  )
}

export default Search
