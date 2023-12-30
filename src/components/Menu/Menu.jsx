import { useEffect, useState } from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import {AiOutlineUserSwitch} from 'react-icons/ai'
import {GoSignOut} from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { useScroll } from '../../utils/ScrollContext'
import { logOut } from '../../config/firebase'
import { useDispatch } from 'react-redux'
import { removeList } from '../../features/FireStoreSlice'


const Menu = () => {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLogout, setIsLogout] = useState(false)
    const {isScrolled} = useScroll()
    const [photoURL, setPhotoURL] = useState(null)
    const [name, setName] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'))

      setPhotoURL(userData?.photoURL)
      setName(userData?.displayName)
    }, [])

    useEffect(() => {
        setIsDropdownOpen(false)
    }, [isScrolled])

    useEffect(() => {
        function handleClick(){
            setIsDropdownOpen(false)
        }

        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
    }, [])

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setIsDropdownOpen(prevState => !prevState)
    }

    const handleSignout = () => {
        setIsLogout(true)
        setTimeout(() => {
            localStorage.removeItem("userData")
            localStorage.removeItem("token")
            logOut()
            dispatch(removeList())
            setIsLogout(false)
            navigate("/signin")
        }, 2000)
    }
  return (
    <div className='relative'>
        {isLogout && <div className='min-h-screen bg-[#0000005b] flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
            <svg  width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#E9292C" stroke-width="6" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>}
        <div className="flex gap-[0.3rem] lg:gap-[0.5rem] items-center cursor-pointer" onClick={toggleDropdown}>
            <img src="/images/default-red.png" alt="users" className='rounded-md w-[2.1rem] lg:w-[2.5rem]'/>
            <IoIosArrowDown className={`${isDropdownOpen && "rotate-[180deg]"} transition-all duration-200 text-[1rem] lg:text-[1.2rem]`}/>
        </div>

        {isDropdownOpen && <div className='border-2 border-[#303030af] bg-black rounded-lg absolute mt-1 right-0 min-w-[230px] text-[0.9rem]'>
           <div className='py-[1.5rem] flex flex-col gap-[1.5rem]'>
            <div className='w-full px-[1.5rem] flex gap-[0.6rem] items-center'>
                <img src={photoURL ? photoURL : "/images/user-1.jpg"} alt="user" className='w-[1.8rem] rounded-full' />
                <p>{name}</p>
            </div>
            <Link to='/' className='w-full px-[1.5rem] flex gap-[0.6rem] items-center'>
                <AiOutlineUserSwitch className='text-[1.5rem]'/>
                <p>Switch Profiles</p>
            </Link>
        </div>
            <button onClick={handleSignout} className='w-full p-[1.5rem] flex gap-[0.6rem] items-center border-t-[1px] border-[#7c7c7c59]'>
                <GoSignOut className='text-[1.5rem]'/>
                <p>Sign out to Pelikula</p>
            </button>
        </div>}

    </div>

  )
}

export default Menu
