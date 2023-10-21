import React from 'react'
import { useGetGenresQuery } from '../../services/tmdb'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateGenre } from '../../features/MovieCollectionSlice';

const Dropdown = ({type}) => {
    const dispatch = useDispatch();
    const {data, isFetching, error} = useGetGenresQuery({type})

    if(!data){
        return;
    }
    const firstHalfOfGenres = data.genres.slice(0, data.genres.length/3)
    const secondHalfOfGenres = data.genres.slice(data.genres.length/3 , data.genres.length/3 * 2)
    const thirdHalfOfGenres = data.genres.slice(data.genres.length/3 * 2, data.genres.length)

    return (
        <div className='pt-[1.45rem] absolute left-0'>
            <div className='flex divide-x-[1px] divide-[#303030af] border-2 border-[#303030af] bg-black rounded-lg  px-1 py-[1.5rem] text-[0.9rem]'>
                <ul className='px-1 flex flex-col justify-between'>
                    {firstHalfOfGenres.map((genre,index) =>
                        <NavLink
                            to={`/${type}list/${genre.name}`}
                            onClick={() => dispatch(updateGenre({type: type, genre: genre}))}
                            className='text-light hover:text-white cursor-pointer py-[0.3rem] px-1 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max'
                            key={index}
                            style={({ isActive, isPending }) => {
                                return {
                                    color: isActive ? "white" : "#ffffffa1",
                                }
                            }}>
                                {genre.name}
                        </NavLink>
                    )}
                </ul>
                <ul className='px-1 flex flex-col justify-between'>
                    {secondHalfOfGenres.map((genre,index) =>
                        <NavLink
                            to={`/${type}list/${genre.name}`}
                            onClick={() => dispatch(updateGenre({type: type, genre: genre}))}
                            className='text-light hover:text-white cursor-pointer py-[0.3rem] px-2 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max'
                            key={index}
                            style={({ isActive, isPending }) => {
                                return {
                                    color: isActive ? "white" : "#ffffffa1",
                                }
                            }}>
                                {genre.name}
                        </NavLink>
                    )}
                </ul>
                <ul className='px-1 flex flex-col justify-between'>
                    {thirdHalfOfGenres.map((genre,index) =>
                        <NavLink
                            to={`/${type}list/${genre.name}`}
                            onClick={() => dispatch(updateGenre({type: type, genre: genre}))}
                            className='text-light hover:text-white cursor-pointer py-[0.3rem] px-1 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max'
                            key={index}
                            style={({ isActive, isPending }) => {
                                return {
                                    color: isActive ? "white" : "#ffffffa1",
                                }
                            }}>
                                {genre.name}
                        </NavLink>
                    )}
                </ul>
            </div>
        </div>


    )
}

export default Dropdown
