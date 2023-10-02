import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';

import Movie from '../Movie/Movie';
import { useState } from 'react';

const MovieList = () => {
  const swiper = useSwiper();
  const [isReachEnd, setIsReachEnd] = useState(false)

  return (
    <div className="py-3">
        <h1 className="text-[1.5rem] font-semibold mb-2">Trending Now</h1>
        <Swiper
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={0}
      slidesPerView={6}
      navigation={{
          prevEl: '.custom-prev-button',
          nextEl: '.custom-next-button',
        }}
        effect='fade'
      className='z-0 py-2 px-1 relative group'
      onReachEnd={() => setIsReachEnd(true)}
      onReachBeginning={() => setIsReachEnd(false)}
    >
      <div
      className='absolute h-full w-[150px] pointer-events-none bg-gradient-to-r from-primary to-transparent z-10 top-0 left-0 '></div>
      <div
      className='absolute h-full w-[200px] pointer-events-none bg-gradient-to-l from-primary to-transparent z-10 top-0 right-0 '></div>
      <button
      className={`custom-prev-button absolute none left-0 top-[50%] translate-y-[-50%] text-light opacity-0 group-hover:opacity-40 transition duration-500 text-[2rem] z-[999] cursor-pointer ${isReachEnd ? 'block' : 'hidden'}`}
      onClick={() => swiper?.slidePrev()}>
        <SlArrowLeft/>
      </button>
      <button
      className={`custom-next-button absolute right-0 translate-y-[-50%] top-[50%] text-light opacity-0 group-hover:opacity-40 transition duration-500 text-[2rem] z-[999] cursor-pointer  ${!isReachEnd ? 'block' : 'hidden'}`}
      onClick={() => swiper?.slideNext()}>
        <SlArrowRight/>
      </button>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
      <SwiperSlide>
        <Movie/>
      </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default MovieList
