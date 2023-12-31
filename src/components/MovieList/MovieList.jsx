import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetMoviesQuery, useGetTrendingShowsQuery } from "../../services/tmdb"

import { useState } from 'react';
import {Movie, Skeleton} from '..';
import { useScreen } from '../../utils/ScreenSizeContext';

const MovieList = ({type}) => {
  const swiper = useSwiper();
  const [isReachEnd, setIsReachEnd] = useState(false)
  const [isReachStart, setIsReachStart] = useState(true)
  const {data, error, isFetching} = useGetMoviesQuery({type})
  const {data: trending, isFetching: loading} = useGetTrendingShowsQuery()

  const { width } = useScreen()

  if (!data || !trending || isFetching || loading) {
    return (
        <div className='flex flex-col py-[8.5rem]'>
            <Skeleton/>
        </div>
    )
  }

  const category = type.split('_' || ' ').map(item => item[0].toUpperCase() + item.slice(1)).join(' ')
  const sortedDescending = [...data.results].sort((a, b) => b.vote_average - a.vote_average)
  const sortedDate = [...data.results].sort((a, b) => {
    const dateA = new Date(a.first_air_date || a.release_date);
    const dateB = new Date(b.first_air_date || b.release_date);

    return dateB - dateA;
  });

  const filteredMovies = type === "kdrama" ?
                          sortedDate.filter(movie => movie.poster_path !== null) :
                          sortedDescending.filter(movie => movie.poster_path !== null)

  return (
    <div className="py-1 lg:py-2">
        <h1 className="text-[1.3rem] lg:text-[1.5rem] font-semibold ml-1">{category}</h1>
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
      className='z-0 py-2 px-[0.2rem] lg:px-1 relative group'
      onReachEnd={() => setIsReachEnd(true)}
      onReachBeginning={() => {
        setIsReachEnd(false)
        setIsReachStart(true)
        }}
    >
      {/* // bg gradients */}
      <div
      className='hidden lg:block absolute h-full w-[150px] pointer-events-none bg-gradient-to-r from-primary to-transparent z-10 top-0 left-0 '></div>
      <div
      className='hidden lg:block absolute h-full w-[200px] pointer-events-none bg-gradient-to-l from-primary to-transparent z-10 top-0 right-0 '></div>

      {/* // custom swiper buttons */}

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

      {/* // swiper slide */}

      <div className='flex overflow-x-scroll'>
{filteredMovies.map((movie,index) => (
        <SwiperSlide key={index} className="h-full" >
          <Movie {...movie} type={type} />
        </SwiperSlide>
      ))}
      </div>


    </Swiper>
    </div>
  )
}

export default MovieList
