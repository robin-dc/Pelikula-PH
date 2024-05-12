import { Link, useNavigate } from "react-router-dom"
import { signInWithGoogle, signUpWithCredentials } from "../../config/firebase"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Loader, Toast } from '..'

const SignUp = () => {
    const token = localStorage.getItem("token")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setError
    } = useForm({
        defaultValues: {
            name: "",
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    const authenticate = async (formValues) => {
        setIsLoading(true)
        try {
            const user = await signUpWithCredentials(getValues("name"), formValues.email, formValues.password)
            if (user) {
                setIsSuccess(true)
                setTimeout(() => {
                    setIsLoading(false)
                    navigate("/")
                    reset()
                }, 2500)
            }
        } catch (error) {
            setIsLoading(false)
            if (error.code === "auth/email-already-in-use") {
                setError("email", {
                    type: "custom",
                    message: "Email already in use"
                });
            } else {
                console.error("Authentication failed with error:", error.message);
            }
        }
    }

    const authenticateWithGoogle = async () => {
        const user = await signInWithGoogle()
        if (user) {
            navigate("/")
        }
    }

    // handle email already in used
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
            {isSuccess !== false &&
                <Toast variant="success" message="Account Created Successfully" />
            }
            <div className="w-full md:max-w-[28rem] bg-[#000000c7] p-2 lg:p-3 rounded-lg">
                <h1 className="text-[2.3rem] font-semibold mb-2">Sign Up, It's Free</h1>

                <form
                    className="flex flex-col gap-1"
                    noValidate
                    onSubmit={handleSubmit(authenticate)}
                >

                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Name</small>
                        <input
                            type="text"
                            className="bg-transparent outline-none w-full pl-[1.7rem] pt-[0.6rem]"
                            {...register("name", {
                                required: "Name is Required",
                            })}
                            autocomplete="off"
                        />
                    </div>
                    {errors.name && <small className="leading-[0px] text-secondary">{errors.name.message}</small>}


                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Email</small>
                        <input
                            type="email"
                            className="bg-transparent outline-none w-full pl-[1.7rem] pt-[0.6rem]"
                            {...register("email", {
                                required: "Email is Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Invalid Email Format'
                                }
                            })}
                            autocomplete="off"
                        />
                    </div>
                    {errors.email && <small className="leading-[0px] text-secondary">{errors.email.message}</small>}

                    <div className="rounded-md bg-[#404040] w-full pt-1 pb-[0.2rem] relative">
                        <small className="absolute top-[0.5rem] left-[1.7rem] text-light">Password</small>
                        <input
                            type="password"
                            className="bg-transparent outline-none pl-[1.7rem] pt-[0.6rem]"
                            {...register("password", {
                                required: "Password is required",
                                validate: (fieldValue) => {
                                    return fieldValue.length >= 8 || "Password must be at least 8 characters long"
                                }
                            })}
                            autocomplete="off"
                        />
                    </div>
                    {errors.password && <small className="leading-[0px] text-secondary">{errors.password.message}</small>}

                    <button
                        className={`${token || isLoading ? "bg-gray-500" : "bg-secondary"} font-semibold rounded-md py-[0.7rem]`}
                        disabled={token || isLoading}
                    >
                        {isLoading ? <Loader/> : "Register"}
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
                    <div className="flex flex-col items-center">
                        <p className=" text-gray-400 font-light lato-font">
                            Already have an account in Pelikula PH?
                        </p>
                        <p>
                          <Link to="/signin" className="font-medium text-white ">&nbsp; Sign In</Link>
                        </p>

                    </div>

                </div>
            </div>
        </div>

    </div>
  )
}

export default SignUp
