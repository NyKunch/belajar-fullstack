import { useState } from "react"

const Card = ({ id, imgSrc, pokeName, score, handleClick, shuffle, highscore, handleHighscore }) => {
    const [chosenPokemon, setChosenPokemon] = useState([])
    const setHighscore = () => {
        if (highscore < score) {
            handleHighscore(score)
        }
        handleClick(0)
        setChosenPokemon([])
        shuffle()
    }
    
    const onCardClick = ({ target }) => {
        console.log(target.id)
        if (chosenPokemon.includes(target.id)) {
            setHighscore()
        } else {
            setChosenPokemon([...chosenPokemon, target.id])
            handleClick(score + 1)
            shuffle()
        } 
        console.log(chosenPokemon)
    }

    return (
        <div className='card' onClick={onCardClick}>
            <img id={pokeName} src={imgSrc} alt={pokeName}/>
            <h3>{pokeName}</h3>
        </div>
    )
}

export default Card