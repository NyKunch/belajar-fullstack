import Card from "./Card"

const CardSection = ({ pokemonsData }) => {
    return (
        <div className="card-container">
            {pokemonsData.map((pokemon) => 
                <Card 
                    key={pokemon.id}
                    imgSrc={pokemon.sprites.front_default}
                    pokeName={pokemon.name}
                />
            )}
        </div>
    )
}

export default CardSection