import CardSection from "./components/CardSection"
import Header from "./components/Header"
import { useState, useEffect } from "react"

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then((response) => response.json())
      .then((data) => {
        Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        ).then((pokemonDetails) => setPokemons(pokemonDetails))
      })
      .catch((error) => console.error('Error fetching data: ', error))
  }, [])

  const shufflePokemon = () => {
    setPokemons([...pokemons].sort(() => Math.random() - 0.5))
  }

  return (
    <div className='container'>
      <Header 
        score={score} 
        highscore={highscore}
      />
      <CardSection 
        pokemonsData={pokemons} 
        score={score}
        handleScore={setScore}
        highscore={highscore}
        handleHighscore={setHighscore}
        shuffle={shufflePokemon}
      />
    </div>
  )
}

export default App