import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    return (
      <div className='min-h-screen bg-primary flex flex-col justify-center items-center z-10'>
          <div className='relative w-1/2 p-3 mb-1'>
            <img src="/images/pelikulaph.png" alt="pelikula logo" className='w-full'/>
            <img src="/images/anger.png" alt="anger" className='w-2/5 absolute bottom-0 left-[50%] translate-x-[-50%]' />
          </div>

          <div>
              <p className='text-light inline '>Oops! It seems that the URL you provided was not found. </p>
              <button onClick={() => navigate('/')} className='inline underline'>Go back</button>
          </div>
      </div>
    )
}

export default ErrorPage
