import React, { useEffect } from 'react'
import { Movie, Navbar } from '..';

const WatchLater = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const myListStorage = JSON.parse(localStorage.getItem('watchLater'));

    return (
        <>
          <Navbar/>
            <div className='min-h-screen bg-primary container mt-9'>
            <div className='flex gap-[0.7rem] items-center'>
                <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                <h3 className="text-[1.5rem] font-semibold">Watch Later</h3>
            </div>
                {!myListStorage ?
                    <div className='py-6 flex items-center justify-center'>
                        <p className='text-light'>There's no movie yet.</p>
                    </div>
                :
                <div className='grid grid-cols-6 py-2 px-1'>
                    {myListStorage?.map(movie => (
                        <div key={movie} className='pb-2'>
                            <Movie type={movie.type} {...movie} />
                        </div>
                    ))}
                </div>
                }
            </div>
        </>

    )
}

export default WatchLater
