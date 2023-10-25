import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    return (
      <div className='min-h-screen bg-primary flex flex-col justify-center items-center z-10'>
          <img src="/images/pelikulaph.png" alt="" className='w-1/2 mb-2' />
          <div>
              <p className='text-light inline'>Oops! It seems that the URL you provided was not found. </p>
              <button onClick={() => navigate('/home')} className='inline underline'>Go back</button>
          </div>
      </div>
    )
}

export default ErrorPage
