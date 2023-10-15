import { Footer, Home, Login, MovieDetails, Profiles } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="signin" element={<Login/>}/>
        <Route path="profiles" element={<Profiles/>}/>
        <Route path="users" element={<Home/>}/>
        <Route path="tv/:id" element={<MovieDetails/>}/>
        <Route path="movie/:id" element={<MovieDetails/>}/>
      </Routes>
      <Footer/>
    </>

  )
}

export default App
