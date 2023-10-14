import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';
import Person from '../Person/Person';

const PeopleList = ({title, data}) => {
    const swiper = useSwiper();
    const [isReachEnd, setIsReachEnd] = useState(false)
    const [isReachStart, setIsReachStart] = useState(true)
  return (
    <div className='container'>
    <div className='border-b-[2px] border-[#4242424d] mb-2'>
    <h3 className="text-[1.5rem] font-semibold">{title}</h3>
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
    onReachBeginning={() => {
      setIsReachEnd(false)
      setIsReachStart(true)
      }}
  >
      {/* <div
        className='absolute h-full w-[150px] pointer-events-none bg-gradient-to-r from-primary to-transparent z-10 top-0 left-0 '></div>
        <div
        className='absolute h-full w-[200px] pointer-events-none bg-gradient-to-l from-primary to-transparent z-10 top-0 right-0 '></div> */}
        <button
        className={`custom-prev-button absolute none left-0 top-[50%] translate-y-[-50%] text-[#f1c40f] opacity-0 group-hover:opacity-100 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachStart ? 'block' : 'hidden'}`}
        onClick={() => swiper?.slidePrev()}>
          <SlArrowLeft/>
        </button>
        <button
        className={`custom-next-button absolute right-0 translate-y-[-50%] top-[50%] text-[#f1c40f] opacity-0 group-hover:opacity-100 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachEnd ? 'block' : 'hidden'}`}
        onClick={() => {
          swiper?.slideNext()
          setIsReachStart(false)
          }}>
          <SlArrowRight/>
        </button>
        {data?.map((actor,index) => (
          <SwiperSlide key={index} >
            <Person {...actor}/>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  </div>
  )
}

export default PeopleList
