import { createContext, useContext, useState, useEffect } from "react";

const ScreenContext = createContext()

export const useScreen = () => useContext(ScreenContext)

function ScreenProvider({children}){
    const [width, setWidth] = useState(window.innerWidth)

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [width]);

    return (
        <ScreenContext.Provider value={{width, setWidth}}>
            {children}
        </ScreenContext.Provider>
    )
}

export default ScreenProvider
