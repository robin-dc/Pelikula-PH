import { FaInfoCircle } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';

const MovieHeader = () => {
  return (
    <div className="min-h-screen bg-no-repeat bg-cover w-full relative flex items-center"
        style={{backgroundImage: 'url(/images/hero.jpg)'}}>
            <div className="overlay-1 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className="overlay-2 absolute top-0 left-0 right-0 bottom-0">
            </div>
            <div className='container z-[1]'>
                <div>
                    <h1 className="text-[3rem] font-semibold">Spiderman</h1>
                    <div className="flex gap-1">
                        <button className="button bg-secondary flex gap-[0.3rem] items-center">
                            <BsFillPlayFill className='text-[1.5rem]'/>
                            <span>Play</span>
                        </button>
                        <button className="button border border-gray-200">Watch Later</button>
                    </div>
                    <div className="w-[40%] py-1">
                        <p className="text-light">Released: 2023 - 02 - 23</p>
                        <p>Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes o...</p>
                    </div>
                    <button className="button border border-gray-200 px-1 flex items-center gap-[0.4rem]">
                        Thriller
                    </button>
                </div>
            </div>
        </div>
  )
}

export default MovieHeader
