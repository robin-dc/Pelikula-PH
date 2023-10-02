import { useEffect, useState } from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import {AiOutlineUserSwitch} from 'react-icons/ai'
import {GoSignOut} from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useScroll } from '../../utils/ScrollContext'


const Menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const {isScrolled} = useScroll()

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
  return (
    <div className='relative'>
        <div className="flex gap-[0.5rem] items-center cursor-pointer" onClick={toggleDropdown}>
            <img src="/images/default-red.png" alt="users" className='rounded-md w-[2.5rem]'/>
            <IoIosArrowDown className={`${isDropdownOpen && "rotate-[180deg]"} transition-all duration-200 text-[1.2rem]`}/>
        </div>

        {isDropdownOpen && <div className='border-2 border-[#303030af] bg-black rounded-lg absolute -bottom-[13.5rem] right-0 min-w-[230px] text-[0.9rem]'>
           <div className=' py-[1.5rem] flex flex-col gap-[1.5rem]'>
            <div className='w-full px-[1.5rem] flex gap-[0.6rem] items-center'>
                <img src="https://robin-dc.github.io/Facebook-UI-Clone/images/robin.png" alt="user" className='w-[1.8rem] rounded-full' />
                <p>Dela Cruz, Robin T.</p>
            </div>
            <Link to='/profiles' className='w-full px-[1.5rem] flex gap-[0.6rem] items-center'>
                <AiOutlineUserSwitch className='text-[1.5rem]'/>
                <p>Switch Profiles</p>
            </Link>
        </div>
            <Link to='/signin' className='w-full p-[1.5rem] flex gap-[0.6rem] items-center border-t-[1px] border-[#7c7c7c59]'>
                <GoSignOut className='text-[1.5rem]'/>
                <p>Sign out to Pelikula</p>
            </Link>
        </div>}

    </div>

  )
}

export default Menu
