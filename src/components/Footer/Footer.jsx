import React from 'react'
import {FiGithub, FiFacebook, FiLinkedin} from 'react-icons/fi'
const Footer = () => {
  return (
    <div className='py-2 bg-[#0d0c0c]'>
        <div className='container flex items-center justify-center flex-col'>
            <h3 className='text-light text-sm'>Thanks to TMDB for providing this free API.</h3>
            <h3 className='text-light text-sm'>For learning purposes only.</h3>
            <h3 className='text-light text-[0.8rem] mt-1 '>Made by Robin Dela Cruz</h3>
            <div className='flex gap-[0.7rem] items-center py-[0.5rem]'>
                <a href="https://www.facebook.com/profile.php?id=61551519297065" target="_blank"><FiFacebook className='text-light text-[1.3rem]'/></a>
                <a href="https://www.linkedin.com/in/robin-dela-cruz-12247023b/" target="_blank"><FiLinkedin className='text-light text-[1.3rem]'/></a>
                <a href="https://github.com/robin-dc" target="_blank"><FiGithub className='text-light text-[1.2rem]'/></a>
            </div>
        </div>
    </div>
  )
}

export default Footer
