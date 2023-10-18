import {MovieList} from ".."


const Movies = () => {

  return (
    <div className="container py-1">
        <MovieList type={'trending'}/>
        <MovieList type={'kdramas'}/>
        <MovieList type={'animes'}/>
        <MovieList type={'disney'}/>
        <MovieList type={'popular'}/>
        <MovieList type={'top_rated'}/>
        <MovieList type={'upcoming'}/>
    </div>
  )
}

export default Movies
