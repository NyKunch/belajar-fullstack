const Card = ({ imgSrc, pokeName }) => {
    return (
        <div className='card'>
            <img src={imgSrc} alt={pokeName}/>
            <h3>
                {pokeName}
            </h3>
        </div>
    )
}

export default Card