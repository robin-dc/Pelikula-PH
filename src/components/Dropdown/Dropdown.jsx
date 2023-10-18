import React from 'react'
import { useGetGenresQuery } from '../../services/tmdb'

const Dropdown = ({type}) => {
    const {data, isFetching, error} = useGetGenresQuery({type})

    if(!data){
        return;
    }
    const firstHalfOfGenres = data.genres.slice(0, data.genres.length/3)
    const secondHalfOfGenres = data.genres.slice(data.genres.length/3 , data.genres.length/3 * 2)
    const thirdHalfOfGenres = data.genres.slice(data.genres.length/3 * 2, data.genres.length)
    return (
        <div className='pt-[1.3rem] absolute left-0'>
            <div className='flex divide-x-[1px] divide-[#303030af] border-2 border-[#303030af] bg-black rounded-lg  px-1 py-[1.5rem] text-[0.9rem]'>
                <ul className='px-1 flex flex-col justify-between'>
                    {firstHalfOfGenres.map((genre,index) =>
                        <li className='text-light hover:text-white cursor-pointer py-[0.3rem] px-1 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max' key={index} >{genre.name}</li>
                    )}
                </ul>
                <ul className='px-1 flex flex-col justify-between'>
                    {secondHalfOfGenres.map((genre,index) =>
                        <li className='text-light hover:text-white cursor-pointer py-[0.3rem] px-2 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max' key={index}>{genre.name}</li>
                    )}
                </ul>
                <ul className='px-1 flex flex-col justify-between'>
                    {thirdHalfOfGenres.map((genre,index) =>
                        <li className='text-light hover:text-white cursor-pointer py-[0.3rem] px-1 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max' key={index}>{genre.name}</li>
                    )}
                </ul>
            </div>
        </div>


    )
}

export default Dropdown
