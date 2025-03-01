const Header = ({ score, highscore }) => {
    return (
        <header>
            <div className='game-title'>
                <h1>
                    Pokemon Memory Game
                </h1>
                <p>
                    Get point by clicking on an image but dont click on any more than once!
                </p>
            </div>
            <div className='score-board'>
                <p>Point: {score}</p>
                <p>Highscore: {highscore}</p>
            </div>
            <div style={{clear: 'both'}} />
        </header>
    )
}

export default Header