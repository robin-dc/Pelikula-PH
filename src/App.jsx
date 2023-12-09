import { ErrorPage, Footer, Home, SignIn, MovieDetails, MoviesCollection, PersonDetails, Profiles, TrailerPlayer, WatchLater, SignUp, Protected } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Protected/>}>
          <Route path="/" index element={<Profiles/>}/>

          <Route path="home" element={<Home/>}/>
          <Route path="list" element={<WatchLater/>}/>
          <Route path="movielist/:genre" element={<MoviesCollection/>}/>
          <Route path="tvlist/:genre" element={<MoviesCollection />}/>
          <Route path="search/:keyword" element={<MoviesCollection />}/>

          <Route path="tv/:id" element={<MovieDetails/>}>
            <Route path="play" element={<TrailerPlayer/>}/>
          </Route>

          <Route path="movie/:id" element={<MovieDetails/>}>
            <Route path="play" element={<TrailerPlayer/>}/>
          </Route>

          <Route path="person/:id" element={<PersonDetails/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>

        <Route path="signin" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </>

  )
}

export default App
