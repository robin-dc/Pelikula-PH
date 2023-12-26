import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Profiles = () => {
  const [photoURL, setPhotoURL] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    window.scrollTo(0,0)
    const userData = JSON.parse(localStorage.getItem('userData'))

    setPhotoURL(userData?.photoURL)
    setName(userData?.displayName)
    setEmail(userData?.email)
  }, [])

  return (
    <div className="min-h-screen">
        <div className="container flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-[2rem] md:text-[3rem]">Who is Watching?</h1>
            <Link to="/home" className="flex flex-col items-center justify-center group">
                <img
                  src={photoURL ? photoURL : "/images/default-red.png"}
                  alt="profile1"
                  className="rounded-md w-8 md:w-10 my-1 md:my-2 group-hover:border-[2px] group-hover:border-white"
                />
                <h2 className="text-light text-[1.1rem] md:text-[1.5rem] group-hover:text-white ">{name || email}</h2>
            </Link>
        </div>

    </div>
  )
}

export default Profiles
