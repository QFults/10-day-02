import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [gifState, setGifState] = useState({
    search: '',
    gifs: []
  })

  const handleInputChange = ({ target }) => {
    setGifState({ ...gifState, [target.name]: target.value })
  }

  const handleSearchGIPHY = event => {
    event.preventDefault()
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=j6yOF05YP8AGwMifwqeDBZ1RYjr4n0Tj&q=${gifState.search}&limit=10&rating=g`)
      .then(({ data: { data: gifs } }) => {
        console.log(gifs)
        gifs = gifs.map(gif => ({
          id: gif.id,
          name: gif.title,
          animated: gif.images.original.url,
          still: gif.images.original_still.url,
          isAnimated: true
        }))
        setGifState({ ...gifState, gifs })
      })
      .catch(err => console.error(err))
  }

  const handlePausePlay = id => {
    const gifs = [...gifState.gifs]
    gifs.forEach(gif => {
      if (gif.id === id) {
        gif.isAnimated = !gif.isAnimated
      }
    })
    setGifState({ ...gifState, gifs })
  }

  return (
    <>
      <form>
        <p>
          <label htmlFor='search'>search</label>
          <input
            type='text'
            name='search'
            value={gifState.search}
            onChange={handleInputChange}
          />
        </p>
        <button onClick={handleSearchGIPHY}>Search GIPHY</button>
      </form>
      <div>
        {
          gifState.gifs.map(gif => (
            <img
              key={gif.id}
              src={gif.isAnimated ? gif.animated : gif.still}
              alt={gif.name}
              onClick={() => handlePausePlay(gif.id)}
            />
          ))
        }
      </div>
    </>
  )
}

export default App
