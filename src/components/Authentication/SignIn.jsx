import { Link, useNavigate } from "react-router-dom"
import { signInWithGoogle, signInWithCredentials } from "../../config/firebase"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Loader } from '..'

const SignIn = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    useEffect(() => {
        window.scrollTo(0,0)
        if(token){
            navigate("/")
        }
    }, [])

    const authenticate = async (formValues) => {
        setIsLoading(true)
        try {
            const user = await signInWithCredentials(formValues.email, formValues.password)
            if (user) {
                setIsLoading(false)
                navigate("/")
            }
            reset()
        } catch (error) {
            setIsLoading(false)
            if (error.code === "auth/invalid-login-credentials") {
                setError("password", {
                    type: "custom",
                    message: "Username or password is incorrect"
                });
            } else {
                console.error("Authentication failed with error:", error.message);
            }
        }
    }

    const authenticateWithGoogle = async () => {
        try {
            const user = await signInWithGoogle()
            if (user) {
                localStorage.setItem("loggedUser", true)
                navigate("/")
            }
        } catch (error) {
            console.error("Authentication failed with error:", error.message);
        }
    }

  return (
    <div className="h-screen lg:h-fit min-h-screen w-full bg-cover relative bg-no-repeat flex flex-col items-center" style={{backgroundImage: "url('images/hero.jpg')"}}>
        <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
        </div>
        <header className="z-[999] w-full pt-1 px-1 lg:pt-2 lg:px-2">
            <nav>
                <img src="/images/pelikulaph.png" className="w-9 lg:w-10 h-fit" alt="logo" />
            </nav>
        </header>

        <div className="z-10 w-full px-[0.6rem] lg:px-0 pb-2 mt-1 flex justify-center items-center h-[100%]">
            <div className="max-w-[28rem] bg-[#000000c7] p-2 lg:p-3 rounded-lg">
                <h1 className="text-[2.3rem] font-semibold mb-2">Sign In</h1>

                <form
                    className="flex flex-col gap-1"
                    noValidate
                    onSubmit={handleSubmit(authenticate)}
                >
                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Email</small>
                        <input
                            type="email"
                            className="bg-[#404040] outline-none w-full pl-[1.7rem] pt-[0.6rem] placeholder:text-[#ffffff3f]"
                            {...register("email", {
                                required: "Email is Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Invalid Email Format'
                                }
                            })}
                            placeholder="demo acc: admin@gmail.com"
                            autocomplete="off"
                        />
                    </div>
                    {errors.email && <small className="leading-[0px] text-secondary">{errors.email.message}</small>}

                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Password</small>
                        <input
                            type="password"
                            className="bg-[#404040] w-full outline-none pl-[1.7rem] pt-[0.6rem] placeholder:text-[#ffffff3f]"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            placeholder="demo acc: admin123"
                            autocomplete="off"
                        />
                    </div>
                    {errors.password && <small className="leading-[0px] text-secondary">{errors.password.message}</small>}

                    <button
                        className={`${token || isLoading ? "bg-gray-500" : "bg-secondary"} font-semibold rounded-md py-[0.7rem]`}
                        disabled={token || isLoading}
                    >
                        {isLoading ? <Loader/> : "Sign In"}
                    </button>
                </form>

                <div className="flex flex-col gap-1 py-1">
                   <p className=" text-gray-400 text-center font-light lato-font">or continue with</p>
                    <div className="flex gap-1">
                        <button className="bg-white flex rounded-md justify-center items-center py-[0.4rem] w-full"
                        onClick={authenticateWithGoogle}>
                            <img src="/images/google.svg" alt="google icon" />
                        </button>
                        <button className="bg-white flex rounded-md justify-center items-center py-[0.4rem] w-full"
                        onClick={authenticateWithGoogle}>
                            <img src="/images/github.svg" alt="github icon" />
                        </button>
                    </div>
                   <p className=" text-gray-400 text-center font-light lato-font">
                   First time using Pelikula PH?
                   <Link to="/signup" className="font-medium text-white">&nbsp; Create an Account</Link>
                   </p>
                </div>


            </div>
        </div>

    </div>
  )
}

export default SignIn
