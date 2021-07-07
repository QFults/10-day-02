import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [movieState, setMovieState] = useState({
    title: '',
    movie: {},
    movies: []
  })

  const handleInputChange = ({ target }) => {
    setMovieState({ ...movieState, [target.name]: target.value })
  }

  const handleSearchMovie = event => {
    event.preventDefault()
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieState.title}`)
      .then(({ data: movie }) => setMovieState({ ...movieState, movie, title: '' }))
      .catch(err => console.error(err))
  }

  const handleSaveMovie = () => {
    const movies = [...movieState.movies]
    movies.push(movieState.movie)
    setMovieState({ ...movieState, movies, movie: {} })
  }

  useEffect(() => {
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t=Goodfellas')
      .then(({ data: movie }) => setMovieState({ ...movieState, movie, title: '' }))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <form>
        <p>
          <label htmlFor='title'>title</label>
          <input
            type='text'
            name='title'
            value={movieState.title}
            onChange={handleInputChange}
          />
        </p>
        <button onClick={handleSearchMovie}>Search Movie</button>
      </form>
      <div>
        <h1>{movieState.movie.Title}</h1>
        <img src={movieState.movie.Poster} alt={movieState.movie.Title} />
        <button onClick={handleSaveMovie}>Save Movie</button>
      </div>
      <hr />
      <h1>Saved Movies</h1>
      <hr />
      <div>
        {
          movieState.movies.map((movie, i) => (
            <div key={i}>
              <h1>{movie.Title}</h1>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
