
import { Link, NavLink, useLocation } from 'react-router-dom'
import {Dropdown, Menu, Search} from '..'
import { useScroll } from '../../utils/ScrollContext'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {isDarkNav} = useScroll()
  const [tvDrop, setTvDrop] = useState(false)
  const [movieDrop, setMovieDrop] = useState(false)
  const {pathname} = useLocation()

  const path = pathname.split('/')[1]

  const fireStore = useSelector((state) => state.FireStoreSlice.value.length)

  return (
    <header className={`${isDarkNav && "bg-[#0d0c0c]" } transition duration-500 fixed top-0 left-0 right-0 z-[9999999999999]`}>
        <nav className="p-1 md:px-2 md:py-[1.4rem] pb-[1.1rem] flex justify-between items-center">
            <img src="/images/pelikulaph.png" className="w-[6.5rem] h-fit" alt="logo" />
            <ul className="hidden md:flex gap-[1.2rem] flex-1 px-3 text-[1.1rem]">
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

                <li><NavLink to="/list"
                  className="text-sm relative"
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "white" : "#ffffffa1",
                    };
                  }}>My List
                  <span className='text-light ml-[0.3rem] bg-[#2c2c2c] rounded-full text-[0.72rem] px-[0.55em] absolute top-[50%] translate-y-[-50%] text-center'>{fireStore}</span>
                  </NavLink></li>
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
