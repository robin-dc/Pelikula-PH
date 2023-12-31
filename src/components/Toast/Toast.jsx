import React, { useEffect, useState } from 'react'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useScreen } from '../../utils/ScreenSizeContext';

const Toast = ({message, variant}) => {
    const [isVisible, setIsVisible] = useState(false)
    const { width } = useScreen()
    const isMobile = width < 800

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => {
            setIsVisible(false)
            clearTimeout(timeout)
        }
    }, [])

    return (
            <div className={`transition-all ease-in-out duration-100 ${!isVisible ? "translate-x-[50rem]" : "translate-x-0"} z-[999999999999999999] p-[0.7rem] px-1 bg-primary border border-[#303030af] rounded-md flex items-center gap-[0.3rem] fixed ${isMobile ? "bottom-1 right-1 left-1" : "top-[5.5rem] right-2"}`}>
                {variant == "error" ? <MdError className='fill-red-700 text-[1.3rem]'/> : <FaCheckCircle className='fill-green-700 text-[1.3rem]'/>}
                <h4 className='text-base text-light'>{message}</h4>
            </div>
    )
}

export default Toast
