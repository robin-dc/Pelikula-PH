
import { Link, NavLink, useLocation } from 'react-router-dom'
import {Dropdown, Menu, Search} from '..'
import { useScroll } from '../../utils/ScrollContext'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RiMenuSearchLine } from "react-icons/ri";
import { useScreen } from '../../utils/ScreenSizeContext';

const Navbar = () => {
  const {isDarkNav, isScrolled} = useScroll()
  const [tvDrop, setTvDrop] = useState(false)
  const [movieDrop, setMovieDrop] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const {pathname} = useLocation()
  const { width } = useScreen()

  const path = pathname.split('/')[1]

  const fireStore = useSelector((state) => state.FireStoreSlice.value.length)
  const isMobile = width < 700

  useEffect(() => {
    if(isMobile){
      closeAllDropdown()
    }
  }, [isScrolled])

  useEffect(() => {
    if(!isMobile){
      setIsDropdownOpen(true)
    }
    else{
      setIsDropdownOpen(false)
    }
  }, [width])

  const closeAllDropdown = () => {
    setTvDrop(false)
    setMovieDrop(false)
    if(isMobile){
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(prevState => !prevState)
}
  return (
    <header className={`${isDarkNav && "bg-[#0d0c0c]" } transition duration-500 fixed top-0 left-0 right-0 z-[9999999]`}>
        <nav className="relative p-1 lg:px-2 lg:py-[1.4rem] pb-[1.1rem] flex justify-between items-center">
            <Link to="/home">
              <img src="/images/pelikulaph.png" className="w-7 h-fit" alt="logo" />
            </Link>
            {isDropdownOpen &&
            <div className='flex-1 lg:px-5'>
              <div className={`${isMobile && "py-[1.5rem] lg:py-0 border-2 border-[#303030af] bg-black rounded-lg absolute mt-2 right-0 left-0 mx-1 lg:static"}`}>
                <ul className="px-3 flex justify-around lg:justify-start lg:gap-[1.2rem] text-[1.1rem] ">
                      <li>
                        <NavLink to="/home" className="text-sm" style={({ isActive, isPending }) => {
                          return {
                              color: isActive ? "white" : "#ffffffa1",
                            };
                          }}>Home
                        </NavLink>
                      </li>
                      <li className='lg:relative' onMouseOver={() => setTvDrop(true)} onMouseOut={() => setTvDrop(false)} >
                          <Link className={`text-sm ${path !== "tvlist" ? "text-[#ffffffa1]" : "text-white"}`}>TV Shows</Link>
                          <div  onMouseOver={() => setTvDrop(true)}>
                              {tvDrop && <Dropdown type={"tv"} closeAllDropdown={closeAllDropdown}/>}
                          </div>
                      </li>
                      <li className='lg:relative' onMouseOver={() => setMovieDrop(true)} onMouseOut={() => setMovieDrop(false)} >
                          <Link className={`text-sm ${path !== "movielist" ? "text-[#ffffffa1]" : "text-white"}`}>Movies</Link>
                          <div  onMouseOver={() => setMovieDrop(true)}>
                              {movieDrop && <Dropdown type={"movie"} closeAllDropdown={closeAllDropdown}/>}
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
                  <div className='px-[1.5rem] mt-2 lg:hidden'>
                    <Search/>
                  </div>
              </div>
            </div>
            }
            <div className='flex items-center gap-[0.8rem] lg:gap-1'>
              <div className='hidden lg:block'>
                <Search/>
              </div>
              <RiMenuSearchLine className='text-[2.2rem] text-light lg:hidden' onClick={toggleDropdown}/>
              <Menu/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
