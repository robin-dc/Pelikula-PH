import { Home, Login, MovieDetails, Profiles } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="signin" element={<Login/>}/>
      <Route path="profiles" element={<Profiles/>}/>
      <Route path="users" element={<Home/>}/>
      <Route path="movie" element={<MovieDetails/>}/>
    </Routes>
  )
}

export default App
