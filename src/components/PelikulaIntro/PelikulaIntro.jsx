import React, { useEffect } from 'react'
import tudum from '/audio/tudum.mp3'

const PelikulaIntro = () => {
  useEffect(() => {
    const audio = new Audio(tudum); // Create an Audio object with your audio file

    // Function to play the audio
    const playAudio = () => {
      audio.play().catch(error => {
        // Handle any errors that might occur while trying to play the audio
        console.error('Failed to play the audio:', error);
      });
    };

    playAudio(); // Call the function to play the audio when the component mounts

    // Clean up the audio when the component is unmounted
    return () => {
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  }, [])

  return (
    <div className='h-full lg:p-10 w-full flex justify-center'>
          <img src={`/images/pelikulaicon.png`} alt="icon" className=' intro-animation'/>
    </div>
  )
}

export default PelikulaIntro
