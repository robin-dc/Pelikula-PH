import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Toast from "../Toast/Toast"

const Profiles = () => {
  const [photoURL, setPhotoURL] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isLoggedFirst = JSON.parse(localStorage.getItem('loggedUser'))

    setPhotoURL(userData?.photoURL)
    setName(userData?.displayName)
    setEmail(userData?.email)

    if(isLoggedFirst){
      setIsVisible(true)
    }

    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen">
        {isVisible && <Toast variant="success" message="Login Successfully"/>}
        <div className="container flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-[2rem] lg:text-[3rem]">Who is Watching?</h1>
            <Link to="/home" onClick={() => localStorage.removeItem('loggedUser')} className="flex flex-col items-center justify-center group">
                <img
                  src={photoURL ? photoURL : "/images/default-red.png"}
                  alt="profile1"
                  className="rounded-md w-8 lg:w-10 my-1 lg:my-2 group-hover:border-[2px] group-hover:border-white"
                />
                <h2 className="text-light text-[1.1rem] lg:text-[1.5rem] group-hover:text-white ">{name || email}</h2>
            </Link>
        </div>

    </div>
  )
}

export default Profiles
