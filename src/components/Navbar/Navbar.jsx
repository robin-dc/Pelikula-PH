
import { Link, NavLink } from 'react-router-dom'
import {Dropdown, Menu, Search} from '..'
import { useScroll } from '../../utils/ScrollContext'
import { useState } from 'react'

const Navbar = () => {
  const {isDarkNav} = useScroll()
  const [tvDrop, setTvDrop] = useState(false)
  const [movieDrop, setMovieDrop] = useState(false)

  return (
    <header className={`${isDarkNav && "bg-primary" } transition duration-300 fixed top-0 left-0 right-0 z-[9999999999]`}>
        <nav className="px-2 py-[1.4rem] flex justify-between items-center">
            <img src="/images/pelikulaph.png" className="w-7 h-fit" alt="logo" />
            <ul className="flex gap-1 flex-1 px-3 text-[1.1rem]">
                <li>
                  <NavLink to="/users" className="text-sm" style={({ isActive, isPending }) => {
                    return {
                        color: isActive ? "white" : "#ffffffa1",
                      };
                    }}>Home
                  </NavLink>
                </li>
                <li className='relative' onMouseOver={() => setTvDrop(true)} onMouseOut={() => setTvDrop(false)} >
                    <Link className="text-sm text-[#ffffffa1]">TV Shows</Link>
                    <div  onMouseOver={() => setTvDrop(true)}>
                        {tvDrop && <Dropdown type={"tv"} />}
                    </div>
                </li>
                <li className='relative' onMouseOver={() => setMovieDrop(true)} onMouseOut={() => setMovieDrop(false)} >
                    <Link className="text-sm text-[#ffffffa1]">Movies</Link>
                    <div  onMouseOver={() => setMovieDrop(true)}>
                        {movieDrop && <Dropdown type={"movie"} />}
                    </div>
                </li>

                <li><NavLink to="/list" className="text-sm" style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "white" : "#ffffffa1",
                    };
                  }}>My List</NavLink></li>
            </ul>
            <div className='flex items-center gap-1'>
              <Search/>
              <Menu/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
