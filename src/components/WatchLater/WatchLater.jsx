import React, { useEffect, useState } from 'react'
import { Movie, Navbar, Toast } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { LiaTimesSolid } from 'react-icons/lia'
import { setList } from '../../features/FireStoreSlice';
import { fetchData, removeToWatchLater } from '../../config/firebase';

const WatchLater = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const dispatch = useDispatch();

    const fetch = async() => {
        const data = await fetchData()
        dispatch(setList(data))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    const data = useSelector((state) => state.FireStoreSlice.value)

    const handleDelete = async (movieId) => {
        await removeToWatchLater(movieId)
        setIsSuccess(true)

        fetch()
    }

    const removeAllWatchList = async() => {
        setIsLoading(true)
        for(let i = 0; i < data.length; i++){
            await removeToWatchLater(data[i].id)
        }
        fetch()
        setIsLoading(true)
        setIsSuccess(true)
    }

    return (
        <>
          <Navbar/>
            <div className='px-1 lg:px-0 min-h-screen bg-primary container mt-6 lg:mt-9'>
            <div className='flex justify-between'>
                {isSuccess !== false &&
                    <Toast variant="success" message="Deleted Successfully" />
                }
                <div className='flex gap-[0.7rem] items-center'>
                    <span className='h-[2.5rem] w-[0.4rem] bg-secondary'></span>
                    <h3 className="text-[1.5rem] font-semibold">Watch Later</h3>
                </div>
                {data?.length !== 0 &&
                    <button
                        className='button border border-gray-200 active:scale-[0.9]'
                        onClick={removeAllWatchList}
                        disabled={isLoading}
                    >
                        {isLoading ? "Removing..." : "Remove All"}
                    </button>}
            </div>

                {data?.length == 0 ?
                    <div className='py-6 flex items-center justify-center'>
                        <p className='text-light'>There's no movie here.</p>
                    </div>
                :
                <div className='grid grid-cols-3 lg:grid-cols-6 py-2 lg:px-1'>
                    {data?.map((movie,index) => (
                        <div key={index} className='pb-2 relative group '>
                            <button onClick={() => handleDelete(movie.id)} className='scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-[#414141f5] absolute right-[-0.2rem] top-[-0.9rem] bg-[#2c2c2cf5] rounded-full p-[6px] z-10'>
                                <LiaTimesSolid className='text-[1.1rem]'/>
                            </button>
                            <Movie type={movie.type} {...movie.data} />
                        </div>
                    ))}
                </div>
                }
            </div>
        </>

    )
}

export default WatchLater
