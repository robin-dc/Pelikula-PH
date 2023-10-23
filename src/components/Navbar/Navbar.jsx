
import { Link, NavLink, useLocation } from 'react-router-dom'
import {Dropdown, Menu, Search} from '..'
import { useScroll } from '../../utils/ScrollContext'
import { useState } from 'react'

const Navbar = () => {
  const {isDarkNav} = useScroll()
  const [tvDrop, setTvDrop] = useState(false)
  const [movieDrop, setMovieDrop] = useState(false)
  const {pathname} = useLocation()

  const path = pathname.split('/')[1]

  return (
    <header className={`${isDarkNav && "bg-[#0d0c0c]" } transition duration-500 fixed top-0 left-0 right-0 z-[9999999999999]`}>
        <nav className="px-2 py-[1.4rem] pb-[1.1rem] flex justify-between items-center">
            <img src="/images/pelikulaph.png" className="w-[6.5rem] h-fit" alt="logo" />
            <ul className="flex gap-[1.2rem] flex-1 px-3 text-[1.1rem]">
                <li>
                  <NavLink to="/home" className="text-sm" style={({ isActive, isPending }) => {
                    return {
                        color: isActive ? "white" : "#ffffffa1",
                      };
                    }}>Home
                  </NavLink>
                </li>
                <li className='relative' onMouseOver={() => setTvDrop(true)} onMouseOut={() => setTvDrop(false)} >
                    <Link className={`text-sm ${path !== "tvlist" ? "text-[#ffffffa1]" : "text-white"}`}>TV Shows</Link>
                    <div  onMouseOver={() => setTvDrop(true)}>
                        {tvDrop && <Dropdown type={"tv"} />}
                    </div>
                </li>
                <li className='relative' onMouseOver={() => setMovieDrop(true)} onMouseOut={() => setMovieDrop(false)} >
                    <Link className={`text-sm ${path !== "movielist" ? "text-[#ffffffa1]" : "text-white"}`}>Movies</Link>
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
