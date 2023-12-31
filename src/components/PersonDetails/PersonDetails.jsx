import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPersonDetailsQuery } from '../../services/tmdb'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';
import Navbar from '../Navbar/Navbar';
import Movie from '../Movie/Movie';
import { useScreen } from '../../utils/ScreenSizeContext';

const PersonDetails = () => {
    const swiper = useSwiper();
    const [isReachEnd, setIsReachEnd] = useState(false)
    const [isReachStart, setIsReachStart] = useState(true)

    const {id} = useParams()
    const {data, error, isFetching} = useGetPersonDetailsQuery({id})

  const { width } = useScreen()

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

      if (!data) {
        return (
            <div className='min-h-screen bg-primary flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
                <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                    <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
                </div>
            </div>
        )
    }

    const {also_known_as, biography, birthday, deathday, gender, known_for_department, name, place_of_birth, popularity, profile_path, credits: {cast}} = data

    const filteredMovies = cast.filter(movie => movie.poster_path !== null && movie.adult !== true)

    return (
        <>
            <Navbar/>
            <div className="container pt-9 px-[1.3rem] lg:px-0">
                <div className='flex flex-col lg:flex-row gap-2 lg:px-5 justify-center'>
                    <img src={profile_path !== null ? `https://www.themoviedb.org/t/p/original/${profile_path}` : "https://templateresources.usu.edu/_assets/images/directory/USU_Placeholder_Directory_AM_3.png" } alt="actor" className="lg:sticky lg:top-6 lg:w-[29%] bg-[#7e7e7e44] h-fit hover:shadow-2xl hover:shadow-[#38383854] rounded-md mx-2" loading="lazy" title={name}/>
                    <div className=''>
                        <h3 className="text-[2rem] lg:text-[3.5rem] font-semibold">{name}</h3>
                        <p className='text-[0.9rem] lg:text-base'>Also known as: <span className='text-light text-[0.9rem] lg:text-base'>{also_known_as ? also_known_as.join(" • ") : "N/A"}</span></p>
                        <p className='text-[0.9rem] lg:text-base'>Birthdate: <span className='text-light text-[0.9rem] lg:text-base'>{birthday} {deathday && " to " + deathday}</span></p>
                        <p className='text-[0.9rem] lg:text-base'>Birthplace: <span className='text-light text-[0.9rem] lg:text-base'>{place_of_birth ? place_of_birth : "N/A"}</span></p>
                        <p className='text-[0.9rem] lg:text-base'>Gender: <span className='text-light text-[0.9rem] lg:text-base'>{gender == 1 ? "Female" : "Male"}</span></p>
                        <p className='text-[0.9rem] lg:text-base'>Known for: <span className='text-light text-[0.9rem] lg:text-base'>{known_for_department ? known_for_department : "N/A"}</span></p>
                        <p className='text-[0.9rem] lg:text-base'>Popularity: <span className='text-light text-[0.9rem] lg:text-base'>{popularity.toFixed(1)}%</span></p>
                        <p className='text-gray-300 mt-2 text-[0.9rem] lg:text-base'>{biography}</p>
                    </div>

                </div>

                <div className='py-5'>
                    <div className='flex gap-[0.7rem] items-center'>
                        <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                        <h3 className="text-[1.5rem] font-semibold">{name} Movies</h3>
                    </div>

                    {filteredMovies && filteredMovies.length !== 0 ?
                    <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y]}
                    spaceBetween={0}
                    slidesPerView={width < 700 ? 3 : 6}
                    navigation={{
                        prevEl: '.custom-prev-button',
                        nextEl: '.custom-next-button',
                        }}
                        effect='fade'
                    className='z-0 py-2 lg:px-1 relative group'
                    onReachEnd={() => setIsReachEnd(true)}
                    onReachBeginning={() => {
                        setIsReachEnd(false)
                        setIsReachStart(true)
                        }}
                    >
                    <div
                    className='hidden lg:block absolute h-full w-[150px] pointer-events-none bg-gradient-to-r from-primary to-transparent z-10 top-0 left-0 '></div>
                    <div
                    className='hidden lg:block absolute h-full w-[200px] pointer-events-none bg-gradient-to-l from-primary to-transparent z-10 top-0 right-0 '></div>
                    <button
                    className={`custom-prev-button absolute none left-0 top-[50%] translate-y-[-50%] text-light opacity-0 group-hover:opacity-40 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachStart ? 'block' : 'hidden'}`}
                    onClick={() => swiper?.slidePrev()}>
                        <SlArrowLeft/>
                    </button>
                    <button
                    className={`custom-next-button absolute right-0 translate-y-[-50%] top-[50%] text-light opacity-0 group-hover:opacity-40 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachEnd ? 'block' : 'hidden'}`}
                    onClick={() => {
                        swiper?.slideNext()
                        setIsReachStart(false)
                        }}>
                        <SlArrowRight/>
                    </button>
                    <div className='flex overflow-x-scroll'>

                    {filteredMovies.map((movie,index) => (
                        <SwiperSlide key={index} className="h-full" >
                            <Movie {...movie} />
                        </SwiperSlide>
                    ))}

                    </div>


                    </Swiper>
                    :
                        <div className='py-2 flex items-center justify-center'>
                            <p className='text-light'>No data found</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PersonDetails
