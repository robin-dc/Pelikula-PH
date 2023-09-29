import { FaInfoCircle } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import {Navbar} from '..';

const Home = () => {
  return (
    <>
        <Navbar/>
           <div className="min-h-screen bg-no-repeat bg-cover w-full hero relative flex items-center">
    <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
    </div>
    <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
    </div>
    <div className='container z-[1]'>
        <div>
            <h1 className="text-[3rem] font-semibold">Spider-Man: Across the Spider-Verse</h1>
            <div className="flex gap-1">
                <button className="button bg-secondary flex gap-[0.3rem] items-center">
                    <BsFillPlayFill className='text-[1.5rem]'/>
                    <span>Play</span>
                </button>
                <button className="button border border-gray-200">Watch Later</button>
            </div>
            <div className="w-[40%] py-1">
                <p className="text-light">Released: 2021-09-03</p>
                <p>After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the S...</p>

            </div>
            <button className="button border border-gray-200 px-1 flex items-center gap-[0.4rem]">
                <FaInfoCircle className='text-[1.1rem]'/>
                <span>More Details</span>
            </button>
        </div>
    </div>

    </div>
    </>

  )
}

export default Home
