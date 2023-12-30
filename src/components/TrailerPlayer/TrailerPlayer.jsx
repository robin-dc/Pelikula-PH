import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGetSingleMovieDetailsQuery } from '../../services/tmdb'
import { LiaTimesSolid } from 'react-icons/lia'
import { BiFullscreen } from 'react-icons/bi'
import { PelikulaIntro } from '..'
// import { useScreen } from '../../utils/ScreenSizeContext';

const TrailerPlayer = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [isZoomIn, setisZoomIn] = useState(false)
  const [isIntro, setIsIntro] = useState(true)

  // const { width } = useScreen()

  // const isMobile = width < 700

  const newPath = pathname.split('/').filter((path, index) => index == 1 || index == 2).join('/')
  const {data, error, isFetching} = useGetSingleMovieDetailsQuery({pathname: newPath})

  useEffect(()=> {
    window.scrollTo(0, 0);
    setIsIntro(true)
    const timeout = setTimeout(()=> {
      setIsIntro(false)
    }, 3350)

    return () => clearTimeout(timeout)
  }, [])

  if (!data || isFetching) {
    return (
        <div className='min-h-screen bg-primary flex justify-center items-center fixed top-0 bottom-0 right-0 left-0'>
            <div className="spinner relative grid place-items-center bg-secondary rounded-full h-[40px] w-[40px]">
                <div className="inner bg-primary w-[85%] h-[85%] rounded-full"></div>
            </div>
        </div>
    )
  }

  if(error){
    return (
      <div className='min-h-screen bg-primary flex flex-col justify-center items-center'>
          <p className='text-light'>No data foundasdad</p>
          <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    )
  }

  const {videos: {results}} = data

  if(results.length == 0 ){
    return (
      isIntro &&
      <div className="fixed transition-all ease-in-out duration-1000 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-1 rounded-xl bg-black border border-[#2c2c2c] z-[99999]">
          Sorry, the video was not provided.
      </div>
    )
  }
  const trailer = results?.filter(videos => videos.type == "Trailer")[0]

  const { type, name, key, published_at, id } = trailer

  const iframeRef = useRef(null);

  const zoomIn = () => {
    const iframe = iframeRef.current;

    if (iframe && !isZoomIn) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  return (

    <div className={`fixed group transition-all ease-in-out duration-1000 ${isZoomIn ? "top-0 bottom-0 left-0 right-0" : "top-[50%] rounded-xl overflow-hidden left-[50%] translate-x-[-50%] translate-y-[-50%] h-[220px] lg:h-[450px] aspect-video"} z-[99999999999] rounded-sm bg-black`}>

    {isIntro ?
      <PelikulaIntro/> :
      (
        <>
            <iframe
              ref={iframeRef}
              frameborder="0"
              allowfullscreen="1"
              loading="lazy"
              className='w-full h-full'
              allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title={`${name} | ${type}`}
              src={`https://www.youtube.com/embed/${key}?autoplay=1&amp;mute=0&amp;loop=1&amp;controls=0&amp;playsinline=0&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=0&amp;enablejsapi=1&amp;widgetid=0"`}
              id="widget2">
            </iframe>

            <img src={`/images/pelikulaicon.png`} alt="icon" className={`hidden group-hover:block absolute top-0 left-0 z-10 w-[3.9rem] lg:w-[4.5rem] ${isZoomIn ? "m-[1.1rem] p-[0.5rem]" : "lg:m-[0.5rem] p-1"} transition-all ease-in-out duration-1000`}/>

            <button onClick={() => {
              setisZoomIn(!isZoomIn)
              zoomIn()
            }} className={`${isZoomIn ? "bottom-[0rem] right-[0.8rem] p-[1.3rem]" : "bottom-0 right-0 p-1"} hidden group-hover:block absolute hover:scale-[1.2] transition duration-500 z-10`}>
            <BiFullscreen className={`${isZoomIn ? "text-[2rem]" : "text-[1.1rem] lg:text-[1.5rem]"}`}/>
            </button>

          {!isZoomIn &&
            <Link to={`/${newPath}`} className='hidden group-hover:block transition duration-500 hover:bg-[#414141f5] absolute right-[0.7rem] top-[0.7rem] bg-[#2c2c2cf5] rounded-full p-[4px] lg:p-[6px] z-10'>
              <LiaTimesSolid className='text-base lg:text-[1.1rem]'/>
            </Link>}
        </>

      )

    }
      <div className={`pointer-events-none h-[30%] ${!isIntro && "hidden group-hover:block"} bg-gradient-to-t from-transparent to-black absolute top-0 right-0 left-0`}></div>
      <div className={`pointer-events-none h-[50%] ${!isIntro && "hidden"} bg-gradient-to-b from-transparent to-black absolute bottom-0 right-0 left-0`}></div>
      <div className={`pointer-events-none w-[20%] ${!isIntro && "hidden"} bg-gradient-to-l from-transparent to-black absolute top-0 left-0 bottom-0`}></div>


      <div className='h-[23%] lg:h-[15%] bg-black absolute top-0 right-0 left-0 w-full'></div>
      <div className='h-[18%] lg:h-[10%] bg-black absolute bottom-0 right-0 left-0'></div>
    </div>
  )
}

export default TrailerPlayer
