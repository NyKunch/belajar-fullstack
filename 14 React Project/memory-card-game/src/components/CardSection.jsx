import Card from "./Card"

const CardSection = ({ pokemonsData, score, handleScore, shuffle, handleHighscore, highscore }) => {
    return (
        <div className="card-container">
            {pokemonsData.map((pokemon) => 
                <Card 
                    key={pokemon.id}
                    id={pokemon.id}
                    imgSrc={pokemon.sprites.front_default}
                    pokeName={pokemon.name}
                    score={score}
                    handleClick={handleScore}
                    highscore={highscore}
                    handleHighscore={handleHighscore}
                    shuffle={shuffle}
                />
            )}
        </div>
    )
}

export default CardSection