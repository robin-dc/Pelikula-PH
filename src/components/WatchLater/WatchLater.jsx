import React, { useEffect } from 'react'
import { Movie, Navbar } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllWatchList, removeToWatchLater } from '../../features/LocalStorageSlice'
import { LiaTimesSolid } from 'react-icons/lia'


const WatchLater = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const myListStorage = useSelector((state) => state.LocalStorageSlice.value)
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
                        <p className='text-light'>There's no movie here.</p>
                    </div>
                :
                <div className='grid grid-cols-6 py-2 px-1'>
                    {myListStorage?.map((movie,index) => (
                        <div key={index} className='pb-2 relative group '>
                            <button onClick={() => dispatch(removeToWatchLater({id: movie.id, name: movie.name || movie.title}))} className='scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-[#414141f5] absolute right-[-0.2rem] top-[-0.9rem] bg-[#2c2c2cf5] rounded-full p-[6px] z-10'>
                                <LiaTimesSolid className='text-[1.1rem]'/>
                            </button>
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
