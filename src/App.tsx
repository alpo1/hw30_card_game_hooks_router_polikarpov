import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './GameContext';
import Login from './Login';
import GameScreen from './GameScreen';
import Result from './Result';

const App = () => (
    <GameProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<GameScreen />} />
            <Route path="/result" element={<Result />} />
        </Routes>
    </GameProvider>
);5

export default App;