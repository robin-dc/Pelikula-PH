import { Link, useNavigate } from "react-router-dom"
import { signInWithGoogle, signUpWithCredentials } from "../../config/firebase"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

const SignUp = () => {
    const token = localStorage.getItem("token")
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

    const authenticate = async (formValues) => {
        try {
            const user = await signUpWithCredentials(getValues("name"), formValues.email, formValues.password)
            console.log(user)
            if (user) {
                navigate("/")
            }
            reset()
        } catch (error) {
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
    <div className="hero min-h-screen w-full bg-cover relative bg-no-repeat flex items-center justify-center">
        <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
        </div>
        <header className="fixed top-0 left-0 right-0 p-2">
            <nav>
                <img src="/images/pelikulaph.png" className="w-10 h-fit" alt="logo" />
            </nav>
        </header>
        <div className="z-10 ">
            <div className="w-[28rem] max-w-md bg-[#000000c7] p-3 rounded-lg">
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
                                    return fieldValue.length == 8 || "Password must be at least 8 characters long"
                                }
                            })}
                        />
                    </div>
                    {errors.password && <small className="leading-[0px] text-secondary">{errors.password.message}</small>}

                    <button
                        className={`${token ? "bg-gray-500" : "bg-secondary"} font-semibold rounded-md py-[0.7rem]`}
                        disabled={token}
                    >
                        Register
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
                   Already have an account in Pelikula PH?
                   <Link to="/signin" className="font-medium text-white">&nbsp; Sign In</Link>
                   </p>
                </div>


            </div>
        </div>

    </div>
  )
}

export default SignUp
