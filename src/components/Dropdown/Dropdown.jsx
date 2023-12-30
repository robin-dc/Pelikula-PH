import React from 'react'
import { useGetGenresQuery } from '../../services/tmdb'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateGenre } from '../../features/MovieCollectionSlice';

const Dropdown = ({type, closeAllDropdown}) => {
    const dispatch = useDispatch();
    const {data, isFetching, error} = useGetGenresQuery({type})

    if(!data){
        return;
    }
    const firstHalfOfGenres = data.genres.slice(0, data.genres.length/3)
    const secondHalfOfGenres = data.genres.slice(data.genres.length/3 , data.genres.length/3 * 2)
    const thirdHalfOfGenres = data.genres.slice(data.genres.length/3 * 2, data.genres.length)

    const handleClick = (type, genre) => {
        dispatch(updateGenre({type: type, genre: genre}))
        closeAllDropdown()
    }

    return (
        <div className='pt-[1.45rem] absolute w-4/5 lg:w-fit left-[50%] translate-x-[-50%] lg:translate-x-0 mt-4 lg:mx-0 lg:mt-0 lg:left-0'>
            <div className='overflow-y-scroll overflow-x-hidden lg:overflow-auto max-h-[300px] flex flex-col lg:flex-row lg:divide-x-[1px] lg:divide-[#303030af] border-2 border-[#303030af] bg-black rounded-lg  px-1 py-[1.5rem] text-[0.9rem]'>
                <ul className='px-1 flex flex-col justify-between'>
                    {firstHalfOfGenres.map((genre,index) =>
                        <NavLink
                            to={`/${type}list/${genre.name}`}
                            onClick={() => handleClick(type, genre)}
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
                            onClick={() => handleClick(type, genre)}
                            className='text-light hover:text-white cursor-pointer py-[0.3rem] px-1 lg:px-2 hover:translate-x-[0.3rem] transition duration-300 hover:bg-[#30303073] min-w-max'
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
                            onClick={() => handleClick(type, genre)}
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
