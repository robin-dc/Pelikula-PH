
import { NavLink } from 'react-router-dom'
import {Menu, Search} from '..'
import { useScroll } from '../../utils/ScrollContext'

const Navbar = () => {
  const {isDarkNav} = useScroll()


  return (
    <header className={`${isDarkNav && "bg-primary" } transition duration-500 fixed top-0 left-0 right-0 z-[9999999999]`}>
        <nav className="px-2 py-[1.4rem] flex justify-between items-center">
            <img src="/images/pelikulaph.png" className="w-7 h-fit" alt="logo" />
            <ul className="flex gap-1 flex-1 px-3 text-[1.1rem]">
                <li><NavLink to="/users" className="text-sm" style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "white" : "#ffffffa1",
                    };
                  }}>Home</NavLink></li>
                <li><NavLink to="/tvshows" className="text-sm"style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "white" : "#ffffffa1",
                    };
                  }}>TV Shows</NavLink></li>
                <li><NavLink to="/movies" className="text-sm"style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "white" : "#ffffffa1",
                    };
                  }}>Movies</NavLink></li>
                <li><NavLink to="/list" className="text-sm"style={({ isActive, isPending }) => {
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
