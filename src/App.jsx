import { ErrorPage, Footer, Home, Login, MovieDetails, MoviesCollection, PersonDetails, Profiles, TrailerPlayer, WatchLater } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="signin" element={<Login/>}/>
        <Route path="profiles" element={<Profiles/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="list" element={<WatchLater/>}/>
        <Route path="movielist/:genre" element={<MoviesCollection/>}/>
        <Route path="tvlist/:genre" element={<MoviesCollection />}/>

        <Route path="tv/:id" element={<MovieDetails/>}>
          <Route path="play" element={<TrailerPlayer/>}/>
        </Route>

        <Route path="movie/:id" element={<MovieDetails/>}>
          <Route path="play" element={<TrailerPlayer/>}/>
        </Route>

        <Route path="person/:id" element={<PersonDetails/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </>

  )
}

export default App
