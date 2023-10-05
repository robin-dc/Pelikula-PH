import { BsSearch } from 'react-icons/bs';


const Search = () => {
  return (
    <div className="border-[1px] border-[#fafafa50] flex items-center bg-[#1a1a1a8e]">
        <input type="text" placeholder="Search" className="px-[0.9rem] bg-transparent outline-none" />
        <button className='border-l-[1px] border-[#fafafa50]'>
            <BsSearch className='text-[2.4rem] py-[0.5rem] px-[0.3rem]'/>
        </button>
    </div>
  )
}

export default Search
