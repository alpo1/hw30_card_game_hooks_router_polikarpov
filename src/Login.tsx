import { useGame } from './GameContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const { setPlayerName } = useGame();
    const navigate = useNavigate();
    const [inputName, setInputName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.trim()) {
            setPlayerName(inputName);
            navigate('/game');
        }
    };

    return (
        <div className="login-container">
            <h1>Enter Your Name</h1>
            <form onSubmit={handleSubmit}> 
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Your name..."
                    required
                    minLength={2}
                />
                <button type="submit">Start Game</button>
            </form>
        </div>
    );
};

export default Login;