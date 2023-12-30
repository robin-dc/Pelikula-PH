import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, A11y, Pagination } from 'swiper/modules';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TrailerList.css';

const TrailerList = ({data}) => {
    const swiper = useSwiper();
    const [isReachEnd, setIsReachEnd] = useState(false)
    const [isReachStart, setIsReachStart] = useState(true)

    if(!data){
        return null;
    }
    const reversedData = [...data].reverse()

    // {name, key, site, size, type, id, published_at}
    const renderCustomBullet = (index, className) => {
        return `<span class="${className} cursor-pointer">${index + 1}</span>`;
      };

    return (
        <div className='px-1 lg:px-0 container'>
            <div className='py-2'>
                <div className='flex gap-[0.7rem] items-center'>
                    <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                    <h3 className="text-[1.5rem] font-semibold">Watch Now</h3>
                </div>
                {data.length !== 0 ?
                <Swiper
                // install Swiper modules
                modules={[Navigation, A11y, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    renderBullet: renderCustomBullet,
                    bulletClass: 'custom-swiper-bullet'
                }}
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
                    {/* gradients */}
                    <div className='hidden lg:block absolute h-full w-[150px] pointer-events-none bg-gradient-to-r from-primary to-transparent z-10 top-0 left-0 '></div>
                    <div className='hidden lg:block absolute h-full w-[200px] pointer-events-none bg-gradient-to-l from-primary to-transparent z-10 top-0 right-0 '></div>

                    {/* custom swiper button */}
                    <button className={`custom-prev-button absolute none left-0 top-[50%] translate-y-[-50%] text-[#f1c40f] opacity-0 group-hover:opacity-100 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachStart ? 'hidden lg:block' : 'hidden'}`}
                    onClick={() => swiper?.slidePrev()}>
                    <SlArrowLeft/>
                    </button>
                    <button
                    className={`custom-next-button absolute right-0 translate-y-[-50%] top-[50%] text-[#f1c40f] opacity-0 group-hover:opacity-100 transition duration-500 text-[2rem] z-[999] cursor-pointer h-full px-1 ${!isReachEnd ? 'hidden lg:block' : 'hidden'}`}
                    onClick={() => {
                    swiper?.slideNext()
                    setIsReachStart(false)
                    }}>
                    <SlArrowRight/>
                    </button>

                    {/* swiper slide */}
                    {reversedData?.map((trailer,index) => (
                    <SwiperSlide key={index} className='h-[400px] lg:h-[450px] lg:w-[80%]'>
                     <iframe
                        frameborder="0"
                        allowfullscreen="1"
                        loading="lazy"
                        className='lg:px-3 w-full h-full'
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        title={`${trailer.name} | ${trailer.type}`}
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&amp;mute=0&amp;controls=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
                        id="widget2`}>
                    </iframe>
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

export default TrailerList
