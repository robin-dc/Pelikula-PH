import React, { useEffect } from 'react'
import { Movie, Navbar } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllWatchList } from '../../features/LocalStorageSlice'
const WatchLater = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const myListStorage = useSelector((state) => state.LocalStorageSlice.value)
    console.log(myListStorage)
    return (
        <>
          <Navbar/>
            <div className='min-h-screen bg-primary container mt-9'>
            <div className='flex justify-between'>
                <div className='flex gap-[0.7rem] items-center'>
                    <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                    <h3 className="text-[1.5rem] font-semibold">Watch Later</h3>
                </div>
                {myListStorage.length !== 0 && <button className='button border border-gray-200' onClick={() => dispatch(removeAllWatchList())}>Remove All</button>}
            </div>

                {myListStorage.length == 0 ?
                    <div className='py-6 flex items-center justify-center'>
                        <p className='text-light'>There's no movie yet.</p>
                    </div>
                :
                <div className='grid grid-cols-6 py-2 px-1'>
                    {myListStorage?.map((movie,index) => (
                        <div key={index} className='pb-2'>
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
