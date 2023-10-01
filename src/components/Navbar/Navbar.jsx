import { useEffect, useState } from 'react'
import {Menu, Search} from '..'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=> {

    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <header className={`${isScrolled && "bg-primary" } transition duration-700 fixed top-0 left-0 right-0 z-[9999999999]`}>
        <nav className="px-2 py-[1.4rem] flex justify-between items-center">
            <img src="/images/pelikulaph.png" className="w-7 h-fit" alt="logo" />
            <ul className="flex gap-1 flex-1 px-3 text-[1.1rem]">
                <li><small className="text-[#ffffffa1]">Home</small></li>
                <li><small className="text-[#ffffffa1]">TV Shows</small></li>
                <li><small className="text-[#ffffffa1]">Movies</small></li>
                <li><small className="text-[#ffffffa1]">My List</small></li>
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
