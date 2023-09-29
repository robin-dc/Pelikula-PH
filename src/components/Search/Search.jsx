import { AiOutlineSearch } from 'react-icons/ai';


const Search = () => {
  return (
    <div className="border-[1px] border-[#fafafa50] flex items-center bg-[#1a1a1ae0]">
        <input type="text" placeholder="Search" className="px-[0.5rem] bg-transparent outline-none" />
        <button className='border-l-[1px] border-[#fafafa50]'>
            <AiOutlineSearch className='text-[2.5rem] font-bold py-[0.3rem] px-[0.2rem]'/>
        </button>
    </div>
  )
}

export default Search
