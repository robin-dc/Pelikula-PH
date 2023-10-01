import { Link } from "react-router-dom"

const Profiles = () => {
  return (
    <div className="min-h-screen">
        <div className="container flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-[3rem]">Who is Watching?</h1>
            <Link to="/users" className="flex flex-col items-center justify-center group">
                <img src="/images/default-red.png" alt="profile1" className="rounded-md w-10 my-2 group-hover:border-[2px] group-hover:border-white" />
                <h2 className="text-light text-[1.5rem] group-hover:text-white ">Dela Cruz, Robin T.</h2>
            </Link>
        </div>

    </div>
  )
}

export default Profiles
