import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';
import Person from '../Person/Person';
import { useScreen } from '../../utils/ScreenSizeContext';

const PeopleList = ({title, data}) => {
    const swiper = useSwiper();
    const [isReachEnd, setIsReachEnd] = useState(false)
    const [isReachStart, setIsReachStart] = useState(true)

    const { width } = useScreen()

    return (
      <div className='px-1 lg:px-0 container'>
        <div className='border-b-[2px] border-[#4242424d] pt-2 pb-1'>
        <div className='flex gap-[0.7rem] items-center'>
            <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
            <h3 className="text-[1.5rem] font-semibold">{title}</h3>
        </div>
        {data && data.length !== 0 ?
          <Swiper
          // install Swiper modules
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={width < 700 ? 4 : 7}
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
            :
              <div className='py-2 flex items-center justify-center'>
                  <p className='text-light'>No data found</p>
              </div>
              }
        </div>
      </div>
    )
}

export default PeopleList
