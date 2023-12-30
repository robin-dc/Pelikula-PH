import {MovieList} from ".."


const Movies = () => {

  return (
    <div className="container lg:py-1">
        <MovieList type={'trending'}/>
        <MovieList type={'kdrama'}/>
        <MovieList type={'anime'}/>
        <MovieList type={'disney'}/>
        <MovieList type={'popular'}/>
        <MovieList type={'top_rated'}/>
        <MovieList type={'upcoming'}/>
    </div>
  )
}

export default Movies
