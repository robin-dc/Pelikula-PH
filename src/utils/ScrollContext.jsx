import { useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";

const ScrollContext = createContext()

export const useScroll = () => useContext(ScrollContext)

function ScrollProvider({children}){
    const [isDarkNav, setIsDarkNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(0)

    useEffect(()=> {

        const handleScroll = () => {

            if(window.scrollY > 0) {
                setIsDarkNav(true)
                setIsScrolled(window.scrollY)
            }
            else {
                setIsDarkNav(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [])

    return (
        <ScrollContext.Provider value={{isScrolled, isDarkNav}}>
            {children}
        </ScrollContext.Provider>
    )
}

export default ScrollProvider
