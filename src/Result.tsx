import { useGame } from './GameContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const { playerName, gameResult, resetGame } = useGame();
    const navigate = useNavigate();

    const handlePlayAgain = () => {
        navigate('/game');
    };

    const handleNewPlayer = () => {
        resetGame();
        navigate('/login');
    };

    return (
        <div className="result-screen">
            <h2>Game Results</h2>
            <p>Player: {playerName}</p>
            <p>Score: You {gameResult[0]} - {gameResult[1]} Computer</p>
            <button onClick={handlePlayAgain}>Play Again</button>
            <button onClick={handleNewPlayer}>New Player</button>
        </div>
    );
};

export default Result;