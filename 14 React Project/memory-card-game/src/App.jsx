import CardSection from "./components/CardSection"
import Header from "./components/Header"
import { useState, useEffect } from "react"

const App = () => {
  const [pokemons, setPokemons] = useState([])

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

  console.log(pokemons);

  return (
    <div className='container'>
      <Header />
      <CardSection pokemonsData={pokemons} />
    </div>
  )
}

export default App