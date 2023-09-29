import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
  return (
    <div className="hero min-h-screen w-full bg-cover relative bg-no-repeat flex items-center justify-center inter-font">
        <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
        </div>
        <header className="fixed top-0 left-0 right-0 p-2">
            <nav>
                <img src="/images/pelikulaph.png" className="w-10 h-fit" alt="logo" />
            </nav>
        </header>
        <div className="z-10 ">
            <div className="w-[28rem] max-w-md bg-[#000000c7] p-3 rounded-lg">
                <h1 className="text-[2.3rem] font-semibold mb-2 inter-font">Sign In</h1>
                <form className="flex flex-col gap-1">
                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Email address</small>
                        <input type="text" className="bg-transparent outline-none pl-[1.7rem] pt-[0.6rem]"/>
                    </div>
                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Password</small>
                        <input type="text" className="bg-transparent outline-none pl-[1.7rem] pt-[0.6rem]"/>
                    </div>
                    <button
                    className="bg-secondary font-semibold rounded-md py-[0.7rem]"
                    onClick={() => navigate('/authenticated')}>
                        Sign in
                    </button>
                </form>
                <div className="flex flex-col gap-1 py-1">
                   <p className=" text-gray-400 text-center font-light">or continue with</p>
                    <div className="flex gap-1">
                        <button className="bg-white flex rounded-md justify-center items-center py-[0.4rem] w-full"
                        onClick={() => navigate('/authenticated')}>
                            <img src="/images/google.svg" alt="google icon" />
                        </button>
                        <button className="bg-white flex rounded-md justify-center items-center py-[0.4rem] w-full"
                        onClick={() => navigate('/authenticated')}>
                            <img src="/images/github.svg" alt="github icon" />
                        </button>
                    </div>
                   <p className=" text-gray-400 text-center font-light">
                   First time using Pelikula PH?
                   <span className="font-medium text-white">&nbsp; Create an Account</span>
                   </p>
                </div>


            </div>
        </div>

    </div>
  )
}

export default Login
