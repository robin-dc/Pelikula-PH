import React from 'react'
import { Link } from 'react-router-dom'

const Person = ({...actor}) => {
    const {gender, id, known_for_department, name, original_name, job, popularity, profile_path, cast_id, character, credit_id} = actor
    return (
      <Link to={`/person/${id}`} className="cursor-pointer z-[999999999]">
          <div className='hover:scale-[1.06] transition-all duration-300 relative ml-[0.5rem] lg:ml-0 lg:mx-[0.5rem] lg:w-[9.2rem]'>
          <img src={profile_path !== null ? `https://www.themoviedb.org/t/p/w185/${profile_path}` : "https://templateresources.usu.edu/_assets/images/directory/USU_Placeholder_Directory_AM_3.png" } alt="actor" className="w-full hover:shadow-2xl hover:shadow-[#38383854] rounded-md" loading="lazy" title={name}/>

          <p className="truncate mt-[0.5rem]">{name || original_name}</p>
          <p className="truncate text-light text-sm">{known_for_department == "Acting" && !job && (character || "Cast")}</p>

          <div className='flex flex-col lg:flex-row lg:justify-between mt-[0.5rem] lg:mt-1 lg:gap-[0.5rem]'>
              <p className='text-light text-sm'>{job || known_for_department}</p>
              <p className="text-white text-sm flex flex-row-reverse lg:flex-row gap-[0.2rem] items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  {popularity.toFixed(1)}%
              </p>
          </div>
          </div>
      </Link>
    )
}

export default Person
